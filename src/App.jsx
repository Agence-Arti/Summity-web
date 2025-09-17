import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { PopupModal } from 'react-calendly';
import { useTranslation, Trans } from 'react-i18next';

import Intro from '@/components/Intro';
import Header from '@/components/sections/Header';
import Hero from '@/components/sections/Hero';
import TrustedBy from '@/components/sections/TrustedBy';
import Projets from '@/components/sections/Projets';
import Offre from '@/components/sections/Offre';
import ProcessusFormation from '@/components/sections/ProcessusFormation';
import CalendlySection from '@/components/sections/Calendly';
import Footer from '@/components/sections/Footer';
import LegalModal from '@/components/LegalModal';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';

function App() {
  const { t } = useTranslation();
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [legalModalState, setLegalModalState] = useState({ isOpen: false, contentKey: null });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntroVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const { toast } = useToast();

  const handleNotImplemented = () => {
    toast({
      title: t('toast.notImplemented_title'),
      description: t('toast.notImplemented_description'),
      duration: 4000,
    });
  };

  const handleNavigate = (url) => {
    if (url.includes('calendly.com')) {
      setIsCalendlyOpen(true);
    } else {
      if (isNavigating) return;
      setIsNavigating(true);
      setTimeout(() => {
        window.open(url, '_blank', 'noopener,noreferrer');
        setIsNavigating(false);
      }, 500);
    }
  };

  const handleOpenLegalModal = (contentKey) => {
    setLegalModalState({ isOpen: true, contentKey });
  };

  const handleCloseLegalModal = () => {
    setLegalModalState({ isOpen: false, contentKey: null });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100; // Increased offset for better spacing
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
      });
    }
  };

  const mainContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.6,
        ease: "easeInOut"
      } 
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta property="og:title" content={t('meta.title')} />
        <meta property="og:description" content={t('meta.description')} />
      </Helmet>
      
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            className="fixed inset-0 bg-background z-[200]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isIntroVisible ? (
          <Intro key="intro" />
        ) : (
          <div className="min-h-screen bg-background text-foreground">
            <Header scrollToSection={scrollToSection} handleNotImplemented={handleNotImplemented} handleNavigate={handleNavigate} />
            <motion.main
              variants={mainContentVariants}
              initial="hidden"
              animate="visible"
            >
              <Hero handleNotImplemented={handleNotImplemented} handleNavigate={handleNavigate} scrollToSection={scrollToSection} />
              <TrustedBy />
              <Projets handleNotImplemented={handleNotImplemented} />
              <Offre handleNavigate={handleNavigate} />
              <ProcessusFormation handleNotImplemented={handleNotImplemented} handleNavigate={handleNavigate} />
              {/* <Testimonials /> */}
              <CalendlySection />
            </motion.main>
            <Footer handleNotImplemented={handleNotImplemented} handleOpenLegalModal={handleOpenLegalModal} scrollToSection={scrollToSection} />
            <Toaster />
          </div>
        )}
      </AnimatePresence>
      <PopupModal
        url="https://calendly.com/arthurlemire-summity/30min"
        onModalClose={() => setIsCalendlyOpen(false)}
        open={isCalendlyOpen}
        rootElement={document.getElementById('root')}
      />
      <LegalModal 
        isOpen={legalModalState.isOpen}
        onClose={handleCloseLegalModal}
        contentKey={legalModalState.contentKey}
      />
    </>
  );
}

export default App;