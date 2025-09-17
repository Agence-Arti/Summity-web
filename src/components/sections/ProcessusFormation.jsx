import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
const ProcessusFormation = ({
  handleNavigate
}) => {
  const {
    t
  } = useTranslation();
  const calendlyUrl = 'https://calendly.com/arthurlemire-summity/30min';
  const cardsData = useMemo(() => [{
    id: 1,
    gridClass: "md:col-start-1 md:col-span-3",
    title: t('processus.card1_title'),
    subtitle: t('processus.card1_subtitle'),
    description: t('processus.card1_desc')
  }, {
    id: 2,
    gridClass: "md:col-start-5 md:col-span-3",
    title: t('processus.card2_title'),
    subtitle: t('processus.card2_subtitle'),
    description: t('processus.card2_desc')
  }, {
    id: 3,
    gridClass: "md:col-start-5 md:col-span-3 md:row-start-2",
    title: t('processus.card3_title'),
    subtitle: t('processus.card3_subtitle'),
    description: t('processus.card3_desc')
  }, {
    id: 4,
    gridClass: "md:col-start-9 md:col-span-3 md:row-start-2",
    title: t('processus.card4_title'),
    subtitle: t('processus.card4_subtitle'),
    description: t('processus.card4_desc')
  }, {
    id: 5,
    gridClass: "md:col-start-9 md:col-span-3 md:row-start-3",
    title: t('processus.card5_title'),
    subtitle: t('processus.card5_subtitle'),
    description: t('processus.card5_desc')
  }, {
    id: 6,
    gridClass: "md:col-start-9 md:col-span-3 md:row-start-4",
    title: t('processus.card6_title'),
    subtitle: t('processus.card6_subtitle'),
    description: t('processus.card6_desc')
  }, {
    id: 7,
    gridClass: "md:col-start-9 md:col-span-3 md:row-start-5",
    subtitle: t('processus.card7_subtitle')
  }], [t]);
  const triggerRef = useRef(null);
  const inView = useInView(triggerRef, {
    once: true,
    amount: 0.2
  });
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const [lines, setLines] = useState([]);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const cc1 = useAnimation();
  const cc2 = useAnimation();
  const cc3 = useAnimation();
  const cc4 = useAnimation();
  const cc5 = useAnimation();
  const cc6 = useAnimation();
  const cc7 = useAnimation();
  const cardControls = useRef([cc1, cc2, cc3, cc4, cc5, cc6, cc7]);
  const lc1 = useAnimation();
  const lc2 = useAnimation();
  const lc3 = useAnimation();
  const lc4 = useAnimation();
  const lc5 = useAnimation();
  const lc6 = useAnimation();
  const lineControls = useRef([lc1, lc2, lc3, lc4, lc5, lc6]);
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, cardsData.length);
  }, [cardsData]);
  const calculateLines = useCallback(() => {
    if (!containerRef.current || cardRefs.current.some(ref => !ref || !ref.getBoundingClientRect)) {
      return;
    }
    const containerRect = containerRef.current.getBoundingClientRect();
    const newLines = [];
    for (let i = 0; i < cardsData.length - 1; i++) {
      const startNode = cardRefs.current[i];
      const endNode = cardRefs.current[i + 1];
      if (startNode && endNode) {
        const startRect = startNode.getBoundingClientRect();
        const endRect = endNode.getBoundingClientRect();
        const startX = startRect.left - containerRect.left;
        const startY = startRect.top - containerRect.top;
        const endX = endRect.left - containerRect.left;
        const endY = endRect.top - containerRect.top;
        let path;
        if (i === 0) {
          path = `M ${startX + startRect.width} ${startY + startRect.height / 2} L ${endX} ${endY + endRect.height / 2}`;
        } else if (i === 1) {
          path = `M ${startX + startRect.width / 2} ${startY + startRect.height} L ${endX + endRect.width / 2} ${endY}`;
        } else if (i === 2) {
          path = `M ${startX + startRect.width} ${startY + startRect.height / 2} L ${endX} ${endY + endRect.height / 2}`;
        } else if (i === 3) {
          path = `M ${startX + startRect.width / 2} ${startY + startRect.height} L ${endX + endRect.width / 2} ${endY}`;
        } else if (i === 4) {
          path = `M ${startX + startRect.width / 2} ${startY + startRect.height} L ${endX + endRect.width / 2} ${endY}`;
        } else if (i === 5) {
          path = `M ${startX + startRect.width / 2} ${startY + startRect.height} L ${endX + endRect.width / 2} ${endY}`;
        }
        if (path) {
          newLines.push({
            d: path
          });
        }
      }
    }
    setLines(newLines);
    setIsLayoutReady(true);
  }, [cardsData]);
  useEffect(() => {
    const handleResize = () => {
      setIsLayoutReady(false);
      setTimeout(calculateLines, 50);
    };
    const timeoutId = setTimeout(calculateLines, 100);
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateLines]);
  useEffect(() => {
    if (inView && isLayoutReady) {
      const sequence = async () => {
        for (let i = 0; i < cardsData.length; i++) {
          await cardControls.current[i].start("visible");
          if (i < lineControls.current.length) {
            await lineControls.current[i].start("visible");
          }
        }
      };
      sequence();
    }
  }, [inView, isLayoutReady, cardsData.length]);
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };
  const lineVariants = {
    hidden: {
      pathLength: 0
    },
    visible: {
      pathLength: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };
  const CardContent = ({
    card
  }) => <div className="bg-white rounded-xl p-4 shadow-lg h-full">
      {card.title && <span className="font-bold text-sm text-[hsl(var(--royal-blue))]">{card.title}</span>}
      <h3 className="text-lg md:text-xl font-bold text-primary mt-1">{card.subtitle}</h3>
      {card.description && <p className="text-primary/80 text-xs sm:text-sm mt-1">{card.description}</p>}
    </div>;
  return <section id="processus-formation" className="section-padding bg-primary text-white overflow-hidden relative">
      <motion.div className="hidden md:flex flex-col items-center text-center absolute top-1/2 -translate-y-1/2 left-8 lg:left-16 max-w-xs z-10" initial={{
      opacity: 0,
      x: -50
    }} animate={inView ? {
      opacity: 1,
      x: 0
    } : {}} transition={{
      duration: 1,
      ease: "easeOut",
      delay: 0.8
    }}>
        <img src="https://horizons-cdn.hostinger.com/f7346e70-63d8-482a-b6ef-6d16c7218e17/gemini_generated_image_b9vppwb9vppwb9vp-XpVTb.png" alt={t('processus.side_img_alt')} className="rounded-full w-32 h-32 object-cover mb-4 border-2 border-white/50 shadow-lg" />
        <p className="text-xl italic text-white/70">
          {t('processus.side_text')}
        </p>
      </motion.div>
      <div ref={triggerRef} className="container-custom text-center">
        <motion.h2 className="text-3xl sm:text-4xl font-extrabold mb-4" initial={{
        opacity: 0,
        y: -20
      }} animate={inView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.7,
        ease: "easeOut"
      }}>
          {t('processus.title')}
        </motion.h2>
        <motion.p className="text-base md:text-lg text-white/80 mb-12 md:mb-16 max-w-3xl mx-auto" initial={{
        opacity: 0,
        y: -20
      }} animate={inView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.7,
        delay: 0.2,
        ease: "easeOut"
      }}>
          {t('processus.subtitle')}
        </motion.p>
        
        <div ref={containerRef} className="relative min-h-0 md:min-h-[800px]">
          <div className="hidden md:grid grid-cols-12 gap-x-2 gap-y-4 items-start text-left" style={{
          opacity: 0,
          pointerEvents: 'none'
        }}>
            {cardsData.map((card, i) => <div key={`placeholder-${card.id}`} ref={el => cardRefs.current[i] = el} className={card.gridClass}>
                <CardContent card={card} />
              </div>)}
          </div>

          <div className="grid grid-cols-1 gap-y-4 md:hidden">
            {cardsData.map((card, i) => (
              <motion.div key={`mobile-${card.id}`} variants={cardVariants} initial="hidden" animate={inView ? "visible" : "hidden"} custom={i}>
                <CardContent card={card} />
              </motion.div>
            ))}
          </div>

          <div className="hidden md:block">
            {isLayoutReady && cardsData.map((card, i) => {
            const isLastCard = i === cardsData.length - 1;
            return <motion.div key={card.id} className="absolute" style={{
              top: cardRefs.current[i]?.offsetTop ?? 0,
              left: cardRefs.current[i]?.offsetLeft ?? 0,
              width: cardRefs.current[i]?.offsetWidth ?? 'auto'
            }} variants={cardVariants} initial="hidden" animate={cardControls.current[i]}>
                  {isLastCard ? <motion.div animate={{
                y: [0, -8, 0]
              }} transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: cardsData.length * 0.4
              }}>
                      <CardContent card={card} />
                    </motion.div> : <CardContent card={card} />}
                </motion.div>;
          })}

            {isLayoutReady && <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                {lines.map((line, i) => <motion.path key={i} d={line.d} fill="none" stroke="white" strokeWidth="2" strokeDasharray="4 4" variants={lineVariants} initial="hidden" animate={lineControls.current[i]} />)}
              </svg>}
          </div>
        </div>

        <motion.button className="mt-12 md:mt-16 bg-white text-primary font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out" initial={{
        opacity: 0,
        y: 20
      }} animate={inView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.7,
        delay: 0.5,
        ease: "easeOut"
      }} onClick={() => handleNavigate(calendlyUrl)}>
          {t('processus.button_start')}
        </motion.button>
      </div>
    </section>;
};
export default ProcessusFormation;