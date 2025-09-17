import React from 'react';
import { InlineWidget } from 'react-calendly';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const CalendlySection = () => {
    const { t } = useTranslation();

    return (
        <section id="appointment" className="section-padding bg-secondary">
            <div className="container-custom">
                <motion.h2 
                    className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-primary"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    {t('calendly.title')}
                </motion.h2>
                <motion.div 
                    className="rounded-2xl overflow-hidden shadow-2xl border border-border/50 max-w-4xl mx-auto"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <InlineWidget 
                        url="https://calendly.com/arthurlemire-summity/30min"
                        styles={{
                            height: '700px',
                            width: '100%'
                        }}
                        pageSettings={{
                            backgroundColor: 'f5f7fa', // secondary color
                            hideEventTypeDetails: false,
                            hideLandingPageDetails: false,
                            primaryColor: '0a2342', // primary color
                            textColor: '0a2342' // primary color
                        }}
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default CalendlySection;