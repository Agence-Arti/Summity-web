import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AnimatedBorderButton from '@/components/ui/animated-border-button';
import { Award } from 'lucide-react';
import AnimatedVideoIcon from '@/components/ui/animated-video-icon';

const bubbleVariants = {
  initial: {
    scale: 1,
    x: 0,
    zIndex: 1,
    borderColor: 'hsl(220 13% 91%)', // --border
    backgroundColor: 'hsla(220, 14.3%, 95.9%, 0.5)', // --muted/50
    color: 'hsla(224, 71.4%, 4.1%, 0.9)' // --foreground/90
  },
  active: {
    scale: 1.2,
    x: 0,
    zIndex: 10,
    borderColor: 'hsl(var(--royal-blue))', // Royal Blue border
    backgroundColor: 'hsl(var(--primary))', // --primary (navy blue)
    color: 'hsl(210 20% 98%)' // --primary-foreground (white)
  },
  left: {
    scale: 0.9,
    x: -20,
    zIndex: 1,
    borderColor: 'hsl(220 13% 91%)', // --border
    backgroundColor: 'hsla(220, 14.3%, 95.9%, 0.5)', // --muted/50
    color: 'hsla(224, 71.4%, 4.1%, 0.9)' // --foreground/90
  },
  right: {
    scale: 0.9,
    x: 20,
    zIndex: 1,
    borderColor: 'hsl(220 13% 91%)', // --border
    backgroundColor: 'hsla(220, 14.3%, 95.9%, 0.5)', // --muted/50
    color: 'hsla(224, 71.4%, 4.1%, 0.9)' // --foreground/90
  },
};

const AnimatedCheck = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <motion.path
        d="M20 6 9 17l-5-5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
      />
    </motion.svg>
  );
};

const RotatingBubble = ({ currentItem, animateState }) => {
  const isActive = animateState === 'active';
  return (
    <motion.div
      variants={bubbleVariants}
      initial="initial"
      animate={animateState}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="flex items-center justify-center border-2 rounded-full font-medium text-sm sm:text-base"
    >
      <div className="flex items-center justify-center gap-x-2 px-4 py-2 sm:px-6">
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <AnimatedCheck />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative overflow-hidden h-6">
          <AnimatePresence>
            <motion.span
              key={currentItem}
              className="whitespace-nowrap block"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15, position: 'absolute' }}
              transition={{
                y: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 }
              }}
            >
              {currentItem}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const Hero = ({ handleNotImplemented, handleNavigate, scrollToSection }) => {
  const { t } = useTranslation();
  const title = t('hero.title');
  const words = title.split(" ");
  const calendlyUrl = 'https://calendly.com/arthurlemire-summity/30min';

  const bubbleData = useMemo(() => [
    [t('hero.bubble1_1'), t('hero.bubble1_2'), t('hero.bubble1_3')],
    [t('hero.bubble2_1'), t('hero.bubble2_2'), t('hero.bubble2_3')],
    [t('hero.bubble3_1'), t('hero.bubble3_2')]
  ], [t]);

  const [textIndices, setTextIndices] = useState([0, 0, 0]);
  const [activeBubbleIndex, setActiveBubbleIndex] = useState(-1);

  useEffect(() => {
    let cycleTimeoutId;
    let loopCount = 0;

    const runAnimationCycle = () => {
      const currentBubbleIndex = loopCount % bubbleData.length;

      if (loopCount >= bubbleData.length) {
          setTextIndices(prevIndices => {
            const newIndices = [...prevIndices];
            newIndices[currentBubbleIndex] = (newIndices[currentBubbleIndex] + 1) % bubbleData[currentBubbleIndex].length;
            return newIndices;
          });
      }

      setActiveBubbleIndex(currentBubbleIndex);

      loopCount++;
      cycleTimeoutId = setTimeout(runAnimationCycle, 2000);
    };

    const startTimeout = setTimeout(runAnimationCycle, 1500);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(cycleTimeoutId);
    };
  }, [bubbleData]);

  const getBubbleVariant = (bubbleIndex, activeIndex) => {
    if (activeIndex === -1) return "initial";
    if (bubbleIndex === activeIndex) return "active";
    if (bubbleIndex < activeIndex) return "left";
    return "right";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const bubblesContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 1.4
      }
    }
  }

  return (
    <section id="hero" className="section-padding pt-40 sm:pt-48 md:pt-56 pb-16 bg-background">
      <div className="container-tight text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 border border-border rounded-full px-3 py-1 text-sm text-muted-foreground mb-6"
        >
          <Award className="w-4 h-4 text-yellow-500" />
          <span>{t('hero.badge')}</span>
        </motion.div>

        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-foreground mb-8 leading-tight md:leading-snug tracking-normal"
        >
          {words.map((word, index) => (
            <span key={index} className="inline-block mr-2 sm:mr-3">
              <motion.span
                variants={wordVariants}
                className="gradient-text"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="text-base md:text-lg text-muted-foreground mb-8 max-w-3xl mx-auto"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          variants={bubblesContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center gap-4 mb-12 min-h-[5rem]"
        >
          {bubbleData.map((items, i) => (
            <RotatingBubble
              key={i}
              currentItem={items[textIndices[i]]}
              animateState={getBubbleVariant(i, activeBubbleIndex)}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <AnimatedBorderButton
            onClick={() => handleNavigate(calendlyUrl)}
            variant="default"
            size="lg"
          >
            <AnimatedVideoIcon />
            {t('hero.button_appointment')}
          </AnimatedBorderButton>
          <AnimatedBorderButton onClick={() => scrollToSection('projets')}>
            {t('hero.button_projects')}
          </AnimatedBorderButton>
        </motion.div>
      </div>
    </section>
  );
};
export default Hero;