import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const logos = [
  { name: 'TechCorp Logo', src: 'https://images.unsplash.com/photo-1558798516-8f5a6bbfab8c' },
  { name: 'InnovateCo Logo', src: 'https://images.unsplash.com/photo-1558798516-8f5a6bbfab8c' },
  { name: 'SolutionsPro Logo', src: 'https://images.unsplash.com/photo-1558798516-8f5a6bbfab8c' },
  { name: 'GlobalNet Logo', src: 'https://images.unsplash.com/photo-1558798516-8f5a6bbfab8c' },
  { name: 'ApexDigital Logo', src: 'https://images.unsplash.com/photo-1558798516-8f5a6bbfab8c' },
];

const SocialProof = () => {
  const { t } = useTranslation();

  return (
    <section className="pb-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-center text-muted-foreground mb-8">
            {t('socialProof.text')}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {logos.map((logo, index) => (
              <img  
                key={index}
                alt={logo.name}
                src={logo.src}
                className="h-8 object-contain filter grayscale opacity-60 hover:opacity-100 hover:filter-none transition-all duration-300"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;