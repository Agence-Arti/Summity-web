import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "Summity a révolutionné notre approche de la formation. Nos employés sont enfin engagés et retiennent vraiment les informations importantes.",
    author: "Marie Dubois",
    role: "DRH, TechCorp",
    rating: 5
  },
  {
    quote: "Les vidéos créées par Summity ont transformé notre onboarding. Le feedback de nos nouvelles recrues est exceptionnel !",
    author: "Pierre Martin",
    role: "Directeur Formation, InnovateCo",
    rating: 5
  }
];

const Preuve = ({ handleNotImplemented }) => {
  return (
    <section id="preuve" className="section-padding bg-secondary">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Nos résultats parlent d'eux-mêmes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez comment nos clients ont transformé leurs formations grâce à nos vidéos.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
              className="bg-card rounded-2xl p-8 shadow-sm border border-border"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-foreground mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
              <div>
                <div className="font-bold text-foreground">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Preuve;