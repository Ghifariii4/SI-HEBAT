import React from 'react';
import { motion } from 'framer-motion';

const HabitCard = ({ habit }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <motion.div
      className="h-full group"
      variants={itemVariants}
    >
      <motion.div
        className={`relative h-full p-6 bg-gradient-to-br ${habit.color} rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden`}
        whileHover={{
          scale: 1.05,
          y: -8
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Card background glow effect */}
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Icon */}
          <motion.div
            className="text-6xl mb-4"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
          >
            {habit.icon}
          </motion.div>

          {/* Title */}
          <h3 className="text-xl font-black text-white mb-3 leading-tight">
            {habit.title}
          </h3>

          {/* Description */}
          <p className="text-white text-sm leading-relaxed opacity-95 flex-grow">
            {habit.description}
          </p>

          {/* CTA Arrow */}
          <motion.div
            className="mt-6 flex items-center gap-2 text-white font-bold"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>Pelajari</span>
            <span className="text-xl">→</span>
          </motion.div>
        </div>

        {/* Decorative circle back */}
        <motion.div
          className="absolute -bottom-12 -right-12 w-40 h-40 bg-white opacity-10 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
};

export default HabitCard;
