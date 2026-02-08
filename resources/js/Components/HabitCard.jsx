import React from 'react';
import { motion } from 'framer-motion';

const HabitCard = ({ habit }) => {
<<<<<<< HEAD
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
=======
    return (
        <motion.div
            className={`p-6 rounded-3xl bg-gradient-to-br ${habit.color} shadow-lg text-white relative overflow-hidden group hover:shadow-2xl transition-all duration-300`}
            whileHover={{ y: -5, scale: 1.02 }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-8xl">
                {habit.icon}
            </div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="text-4xl mb-4 bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    {habit.icon}
                </div>

                <h3 className="text-2xl font-bold mb-2">{habit.title}</h3>
                <p className="text-white/90 font-medium leading-relaxed">
                    {habit.description}
                </p>
            </div>
        </motion.div>
    );
>>>>>>> 24cc638 (Initial setup: Laravel Sail, React, Inertia, and Shadcn UI)
};

export default HabitCard;
