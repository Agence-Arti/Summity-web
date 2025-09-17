import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Quote, Star } from 'lucide-react';
import WavyText from '@/components/ui/WavyText';

const TestimonialCard = ({ quoteKey, nameKey, titleKey, avatarDesc, variants, whileHover, transition }) => {
    const { t } = useTranslation();
    return (
        <motion.div
            className="bg-card p-6 md:p-8 rounded-2xl shadow-lg border border-border/50 flex flex-col h-full"
            variants={variants}
            whileHover={whileHover}
            transition={transition}
        >
            <Quote className="w-8 h-8 md:w-10 md:h-10 text-primary/50 mb-4" />
            <p className="text-base md:text-lg text-muted-foreground italic flex-grow">"{t(quoteKey)}"</p>
            <div className="flex items-center mt-6">
                <img 
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover mr-4 border-2 border-primary/20"
                    alt={t(nameKey)}
                 src="https://images.unsplash.com/photo-1691398495617-18457fbf826d" />
                <div>
                    <p className="font-bold text-primary text-base md:text-lg">{t(nameKey)}</p>
                    <p className="text-sm md:text-base text-muted-foreground">{t(titleKey)}</p>
                </div>
            </div>
            <div className="flex mt-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                ))}
            </div>
        </motion.div>
    );
};

const Testimonials = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };
  
  const hoverProps = {
    whileHover: { y: -10, scale: 1.03, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' },
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  };

  return (
    <section id="testimonials" ref={ref} className="section-padding bg-background">
      <div className="container-custom">
        <WavyText
          text={t('testimonials.title')}
          className="text-3xl sm:text-4xl font-extrabold text-center mb-12 md:mb-16 text-primary"
        />
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
            <TestimonialCard
                quoteKey="testimonials.testimonial1_quote"
                nameKey="testimonials.testimonial1_name"
                titleKey="testimonials.testimonial1_title"
                avatarDesc="Portrait of a smiling man in a business suit"
                variants={itemVariants}
                {...hoverProps}
            />
            <TestimonialCard
                quoteKey="testimonials.testimonial2_quote"
                nameKey="testimonials.testimonial2_name"
                titleKey="testimonials.testimonial2_title"
                avatarDesc="Portrait of a woman with glasses in an office setting"
                variants={itemVariants}
                {...hoverProps}
            />
            <TestimonialCard
                quoteKey="testimonials.testimonial3_quote"
                nameKey="testimonials.testimonial3_name"
                titleKey="testimonials.testimonial3_title"
                avatarDesc="Portrait of a young man in a casual shirt"
                variants={itemVariants}
                {...hoverProps}
            />
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;