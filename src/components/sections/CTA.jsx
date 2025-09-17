import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AnimatedBorderButton from '@/components/ui/animated-border-button';
import AnimatedVideoIcon from '@/components/ui/animated-video-icon';

const CTA = ({ handleNotImplemented, handleNavigate }) => {
  const { t } = useTranslation();
  const calendlyUrl = 'https://calendly.com/arthurlemire-summity/30min';

  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="bg-primary text-primary-foreground rounded-2xl p-12 lg:p-16 text-center shadow-lg"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <AnimatedBorderButton
              onClick={() => handleNavigate(calendlyUrl)}
              size="lg"
              className="bg-[hsl(var(--royal-blue-dark))] text-primary-foreground border-transparent"
            >
              <AnimatedVideoIcon />
              {t('cta.button_appointment')}
            </AnimatedBorderButton>
            <AnimatedBorderButton
              onClick={handleNotImplemented}
              size="lg"
              variant="secondary"
              className="bg-white text-primary border-transparent"
            >
              {t('cta.button_quote')}
            </AnimatedBorderButton>
            <AnimatedBorderButton
              onClick={() => handleNavigate(calendlyUrl)}
              className="border-white/50 text-white"
            >
              {t('cta.button_call')}
            </AnimatedBorderButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;