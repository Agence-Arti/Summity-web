import React from 'react';
import { motion } from 'framer-motion';

const companies = [
  "Mitsubishi Electric",
  "IndalCom",
  "ecoQR.es",
  "Numen Art Showcase",
  "Padel Link",
  "Final Beautiful Space"
];

const Marquee = ({ children, duration = 30 }) => {
  return (
    <div className="w-full overflow-hidden">
      <motion.div
        className="flex"
        animate={{
          x: ['0%', '-100%'],
        }}
        transition={{
          ease: 'linear',
          duration: duration,
          repeat: Infinity,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const TrustedBy = () => {
  const repeatedCompanies = [...companies, ...companies];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-trusted-gradient">
      <div className="container-tight mx-auto">
        <h2 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground mb-10">
          Ils nous ont fait confiance
        </h2>
        <Marquee>
          {repeatedCompanies.map((name, index) => (
            <div key={index} className="flex-shrink-0 mx-6 sm:mx-10 md:mx-14">
              <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default TrustedBy;