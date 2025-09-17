import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import AnimatedBorderButton from '@/components/ui/animated-border-button';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const NavLink = ({ onClick, children, className = '' }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative text-foreground px-4 py-2 rounded-full ${className}`}
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 border-2 border-[hsl(var(--royal-blue))] rounded-full"
        variants={{
          rest: { scale: 0.9, opacity: 0 },
          hover: { scale: 1, opacity: 1 },
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </motion.button>
  );
};

const Header = ({ scrollToSection, handleNavigate }) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const calendlyUrl = 'https://calendly.com/arthurlemire-summity/30min';

  const navItems = [
    { id: 'projets', labelKey: 'header.navProjects' },
    { id: 'offre', labelKey: 'header.navPackages' },
    { id: 'processus-formation', labelKey: 'header.navProcess' },
    { id: 'testimonials', labelKey: 'header.navTestimonials' },
  ];

  const contentVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.4 } }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 p-2 sm:p-4"
    >
      <div className="container-custom mx-auto bg-[hsl(var(--header-background))] rounded-full shadow-4xl h-16 flex items-center justify-between px-4 sm:px-6 border border-[hsl(var(--header-border))]">
        <div className="flex items-center gap-2 sm:gap-4">
          <motion.div 
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center cursor-pointer overflow-hidden h-full"
              onClick={() => scrollToSection('hero')}
          >
            <img
              src="https://horizons-cdn.hostinger.com/f7346e70-63d8-482a-b6ef-6d16c7218e17/4427c59bfe036b2360792174d182bd9f.png"
              alt="Summity Logo"
              className="h-12 w-auto object-contain"
            />
          </motion.div>

          <motion.nav 
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center gap-1"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-base"
              >
                {t(item.labelKey)}
              </NavLink>
            ))}
          </motion.nav>
        </div>

        <div className="flex items-center gap-2">
          <motion.div 
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center gap-2"
          >
            <LanguageSwitcher />
            <AnimatedBorderButton onClick={() => handleNavigate(calendlyUrl)} className="px-6 py-3 text-base text-primary-foreground bg-primary">
              {t('header.contact')}
            </AnimatedBorderButton>
          </motion.div>

          <motion.button
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label={t('header.toggleMenu')}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>
      
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-[hsl(var(--header-background))] mt-2 rounded-lg shadow-4xl mx-auto w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] border border-[hsl(var(--header-border))]"
        >
          <nav className="flex flex-col items-center p-4 gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setIsMenuOpen(false);
                }}
                className="text-lg"
              >
                {t(item.labelKey)}
              </NavLink>
            ))}
             <div className="flex items-center justify-center gap-4 my-2">
                <LanguageSwitcher />
            </div>
            <AnimatedBorderButton onClick={() => { handleNavigate(calendlyUrl); setIsMenuOpen(false); }} className="w-full mt-2 text-base text-primary-foreground bg-primary">
              {t('header.contact')}
            </AnimatedBorderButton>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;