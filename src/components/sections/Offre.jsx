import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import AnimatedBorderButton from '@/components/ui/animated-border-button';
import AnimatedVideoIcon from '@/components/ui/animated-video-icon';

const Offre = ({ handleNavigate }) => {
  const { t } = useTranslation();
  const calendlyUrl = 'https://calendly.com/arthurlemire-summity/30min';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };
  
  const leftPanelVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] },
    },
  };
  
  const rightPanelVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] },
    },
  };

  const cardContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.4
      },
    },
  };

  const bubbleVariants = {
    animate: {
      y: [0, -4, 0, 4, 0],
      scale: [1, 1.05, 1, 1.05, 1],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: 'easeInOut',
        repeatDelay: 1,
      },
    },
  };

  return (
    <section id="offre" ref={ref} className="section-padding bg-background overflow-x-hidden">
      <motion.div
        className="container-custom"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground text-center mb-12 md:mb-16"
          variants={itemVariants}
        >
          {t('offre.title')}
        </motion.h2>

        <motion.div
          className="w-full md:w-3/5 lg:w-1/2"
          variants={leftPanelVariants}
        >
          <div className="bg-primary text-primary-foreground p-6 md:p-10 rounded-3xl shadow-xl">
            <p className="text-base md:text-lg leading-relaxed">
              <Trans i18nKey="offre.box1_text">
                Chez Summity, nous croyons en une tarification transparente. Chaque projet est unique, mais pour vous donner une idée claire de l'investissement, nos projets de vidéo de formation débutent à partir de <span className="font-bold text-white">700$ CAD</span> par minute produite.
              </Trans>
            </p>
          </div>
        </motion.div>

        <motion.div
          className="w-full md:w-3/5 lg:w-1/2 ml-auto mt-4 md:mt-8"
          variants={rightPanelVariants}
        >
          <div className="bg-secondary text-secondary-foreground p-6 md:p-10 rounded-3xl shadow-xl">
            <p className="text-base md:text-lg leading-relaxed">
              <Trans i18nKey="offre.box2_text">
                La majorité de nos partenaires, des PME québécoises, investissent entre <span className="font-bold text-primary">3 500$ et 8 000$</span> pour une série complète de capsules de formation qui répond à l'ensemble de leurs besoins d'intégration (onboarding) ou de formation continue.
              </Trans>
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={cardContainerVariants}
        >
          <motion.div 
            className="bg-muted p-8 rounded-2xl h-full flex flex-col justify-between cursor-pointer" 
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            onClick={() => handleNavigate(calendlyUrl)}
          >
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-4 text-primary">{t('offre.package1_title')}</h3>
              <p className="text-sm md:text-base text-muted-foreground">{t('offre.package1_desc')}</p>
            </div>
          </motion.div>

          <motion.div 
            className="relative border-2 border-[hsl(var(--royal-blue))] bg-muted p-8 rounded-2xl h-full flex flex-col justify-between cursor-pointer" 
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            onClick={() => handleNavigate(calendlyUrl)}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[hsl(var(--royal-blue))] text-white px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
              {t('offre.popular')}
            </div>
            <motion.div
              className="absolute -top-4 right-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transform translate-x-1/2"
              variants={bubbleVariants}
              animate="animate"
            >
              {t('offre.discount15')}
            </motion.div>
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-4 text-primary">{t('offre.package2_title')}</h3>
              <p className="text-sm md:text-base text-muted-foreground">{t('offre.package2_desc')}</p>
            </div>
          </motion.div>

          <motion.div 
            className="relative bg-muted p-8 rounded-2xl h-full flex flex-col justify-between cursor-pointer" 
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            onClick={() => handleNavigate(calendlyUrl)}
          >
            <motion.div
              className="absolute -top-4 right-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transform translate-x-1/2"
              variants={bubbleVariants}
              animate="animate"
            >
              {t('offre.discount25')}
            </motion.div>
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-4 text-primary">{t('offre.package3_title')}</h3>
              <p className="text-sm md:text-base text-muted-foreground">{t('offre.package3_desc')}</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8 md:mt-12 flex justify-center"
          variants={itemVariants}
        >
          <AnimatedBorderButton onClick={() => handleNavigate(calendlyUrl)} size="lg">
            <AnimatedVideoIcon /> {t('offre.button_quote')}
          </AnimatedBorderButton>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Offre;