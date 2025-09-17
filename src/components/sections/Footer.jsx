import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

const Footer = ({
  handleNotImplemented,
  handleOpenLegalModal,
  scrollToSection
}) => {
  const {
    t
  } = useTranslation();
  const footerVariants = {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };
  const navItems = [{
    id: 'projets',
    labelKey: 'header.navProjects'
  }, {
    id: 'offre',
    labelKey: 'header.navPackages'
  }, {
    id: 'processus-formation',
    labelKey: 'header.navProcess'
  }, {
    id: 'testimonials',
    labelKey: 'header.navTestimonials'
  }];
  return <motion.footer className="bg-secondary text-secondary-foreground py-12" initial="hidden" whileInView="visible" viewport={{
    once: true,
    amount: 0.3
  }} variants={footerVariants}>
      <div className="container-custom grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <h3 className="text-lg font-bold mb-4">{t('footer.aboutUsTitle')}</h3>
          <p className="text-sm md:text-base leading-relaxed">
            {t('footer.aboutUsDescription')}
          </p>
        </div>

        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <h3 className="text-lg font-bold mb-4">{t('footer.quickLinksTitle')}</h3>
          <nav className="flex flex-col space-y-3">
            {navItems.map(item => <button key={item.id} onClick={() => scrollToSection(item.id)} className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-left w-full hover:bg-royal-blue-dark transition-colors duration-300">
                {t(item.labelKey)}
              </button>)}
          </nav>
        </div>

        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <h3 className="text-lg font-bold mb-4">{t('footer.contactTitle')}</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm md:text-base">
              <Mail size={18} className="text-primary" />
              <a href="mailto:info@summity.ca" className="hover:text-primary transition-colors">arthurlemire@summity.ca</a>
            </li>
            <li className="flex items-center gap-2 text-sm md:text-base">
              <Phone size={18} className="text-primary" />
              <a href="tel:+15146160000" className="hover:text-primary transition-colors">+1 (514) 953-8013</a>
            </li>
            <li className="flex items-start gap-2 text-sm md:text-base">
              <MapPin size={18} className="text-primary mt-1" />
              <span>{t('footer.address')}</span>
            </li>
          </ul>
        </div>

        <div className="col-span-1 md:col-span-3 lg:col-span-1">
          <h3 className="text-lg font-bold mb-4">{t('footer.followUsTitle')}</h3>
          <div className="flex space-x-4">
            <a href="https://www.linkedin.com/in/arthur-lemire-b32a01378/" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground hover:text-primary transition-colors" aria-label="LinkedIn Profile">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="container-custom border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-xs sm:text-sm">
        <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
        <div className="flex justify-center space-x-4 mt-2">
          <button onClick={() => handleOpenLegalModal('legalNotice')} className="hover:text-primary transition-colors">
            {t('footer.legalNotice')}
          </button>
          <button onClick={() => handleOpenLegalModal('termsOfUse')} className="hover:text-primary transition-colors">
            {t('footer.termsOfUse')}
          </button>
        </div>
      </div>
    </motion.footer>;
};
export default Footer;