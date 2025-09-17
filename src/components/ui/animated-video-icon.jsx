import React from 'react';
import { motion } from 'framer-motion';
import { Video } from 'lucide-react';

const AnimatedVideoIcon = () => {
  return (
    <motion.div
      className="bg-[hsl(var(--royal-blue))] rounded-full p-1.5 mr-2 flex-shrink-0"
      animate={{
        rotate: [0, -15, 15, -10, 10, 0],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
        repeatDelay: 2,
      }}
    >
      <Video className="w-4 h-4 text-primary-foreground" />
    </motion.div>
  );
};

export default AnimatedVideoIcon;