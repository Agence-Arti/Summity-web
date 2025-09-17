import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Zap } from 'lucide-react';

const problems = [
  {
    icon: <Target className="w-10 h-10 text-destructive" />,
    title: "Contenu ennuyeux",
    description: "Les formations traditionnelles peinent à captiver l'attention et maintenir l'engagement."
  },
  {
    icon: <TrendingUp className="w-10 h-10 text-orange-500" />,
    title: "Faible rétention",
    description: "Les informations transmises par des méthodes classiques sont rapidement oubliées."
  },
  {
    icon: <Zap className="w-10 h-10 text-yellow-500" />,
    title: "Manque d'impact",
    description: "Les investissements en formation ne se traduisent pas par des changements durables."
  }
];

const Probleme = () => {
  return (
    <section id="probleme" className="section-padding bg-secondary">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Les défis de la formation moderne
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Les entreprises font face à des obstacles majeurs pour engager leurs équipes dans l'apprentissage.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true, amount: 0.5 }}
              className="bg-card rounded-2xl p-8 shadow-sm border border-border"
            >
              <div className="mb-6">{problem.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{problem.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Probleme;