import React from 'react';
import { motion } from 'framer-motion';

const NavBar = ({ scrolled, scrollToSection }) => {
  const navLinks = [
    { label: 'Beranda', id: 'hero' },
    { label: 'Kebiasaan', id: 'habits' },
    { label: 'Mulai', id: 'cta' }
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? 'shadow-md' : ''
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between h-20">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => scrollToSection('hero')}
        >
          <img src="/images/smkn8.jpeg" alt="Logo SMKN 8 Jakarta" className="h-12 w-auto object-contain" />
          <div>
            <div className="text-xl font-black text-green-600">Si Hebat</div>
            <span className="text-xs font-semibold text-zinc-500">7 Kebiasaan Anak Indonesia</span>
          </div>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="font-semibold text-zinc-700 hover:text-green-600 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              {link.label}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
