import React from 'react';
import { motion } from 'framer-motion';

const HabitCard = ({ habit }) => {
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
};

export default HabitCard;
