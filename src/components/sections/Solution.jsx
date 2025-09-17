import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, Users, Award, Zap } from 'lucide-react';

const services = [
    {
      icon: <Users className="w-10 h-10 text-blue-500" />,
      title: "E-learning Interactif",
      description: "Modules en ligne avec animations et interactions pour maximiser l'apprentissage."
    },
    {
      icon: <Award className="w-10 h-10 text-purple-500" />,
      title: "Formations Entreprise",
      description: "Vidéos sur mesure pour onboarding, compliance et développement des compétences."
    },
    {
      icon: <Zap className="w-10 h-10 text-green-500" />,
      title: "Motion Graphics",
      description: "Animations percutantes pour expliquer des concepts complexes de manière simple."
    }
  ];

const Solution = ({ handleNotImplemented }) => {
  return (
    <section id="solution" className="section-padding bg-background">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Notre solution créative
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Summity transforme vos contenus de formation en expériences visuelles captivantes grâce au motion design.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="bg-card rounded-2xl p-8 shadow-sm border border-border text-center"
                >
                    <div className="mb-6 inline-block">{service.icon}</div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">{service.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                    <Button onClick={handleNotImplemented} variant="secondary">
                        En savoir plus
                    </Button>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Solution;