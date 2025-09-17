import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '@/components/ui/Modal';
import { motion } from 'framer-motion';

const LegalModal = ({ isOpen, onClose, contentKey }) => {
  const { t } = useTranslation();

  if (!contentKey) return null;

  const title = t(`${contentKey}.title`);
  const sections = t(`${contentKey}.sections`, { returnObjects: true });

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 15 }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-primary text-primary-foreground rounded-2xl p-6 md:p-8 w-full h-[80vh] flex flex-col shadow-2xl">
        <motion.h1
            className="text-2xl md:text-3xl font-bold mb-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
        >
            {title}
        </motion.h1>
        <motion.div
            className="overflow-y-auto flex-grow pr-4 space-y-6"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
        >
          {Array.isArray(sections) && sections.map((section, index) => (
            <motion.div key={index} variants={itemVariants} className="space-y-2">
              <h2 className="font-bold text-lg md:text-xl text-white">{section.title}</h2>
              {Array.isArray(section.content) ? (
                section.content.map((item, itemIndex) => (
                  <p key={itemIndex} className="text-white/80 text-sm md:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
                ))
              ) : (
                <p className="text-white/80 text-sm md:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: section.content }} />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Modal>
  );
};

export default LegalModal;