import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Intro = () => {
  const { t } = useTranslation();
  const sloganText = t('intro.slogan');
  const letters = Array.from(sloganText);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: 0.5 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 12, stiffness: 200 },
    },
  };
  
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
    >
      <div className="flex flex-col items-center gap-6 text-center px-4">
        <motion.div
          variants={logoVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.img
            src="https://horizons-cdn.hostinger.com/f7346e70-63d8-482a-b6ef-6d16c7218e17/4caa48601687c20a87180d94148870e1.png"
            alt={t('intro.logoAlt')}
            className="w-80 md:w-96 h-auto"
          />
        </motion.div>
        
        <motion.h2
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-xl md:text-2xl text-muted-foreground"
          aria-label={sloganText}
        >
          {letters.map((letter, index) => (
            <motion.span 
              key={index} 
              variants={letterVariants}
              className={letter === ' ' ? 'inline-block mr-1' : ''}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.h2>
      </div>
    </motion.div>
  );
};

export default Intro;