import React from 'react';
<<<<<<< HEAD
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
=======
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

const NavBar = ({ scrolled, scrollToSection }) => {
    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-zinc-100 py-3'
                    : 'bg-transparent py-5'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center w-full">
                <div
                    onClick={() => scrollToSection ? scrollToSection('hero') : window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="cursor-pointer flex items-center gap-3 group"
                >
                    <div className="w-10 h-10 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:rotate-6 transition-transform">
                        H
                    </div>
                    <span className={`font-black text-xl tracking-tight transition-colors ${scrolled ? 'text-zinc-800' : 'text-white drop-shadow-md'
                        }`}>
                        SI-HEBAT
                    </span>
                </div>

                <div className="items-center gap-6 hidden md:flex">
                    <nav className="flex items-center gap-6">
                        <button
                            onClick={() => scrollToSection('hero')}
                            className={`text-sm font-semibold transition-colors hover:text-green-400 ${scrolled ? 'text-zinc-600' : 'text-zinc-100'
                                }`}
                        >
                            Beranda
                        </button>
                        <button
                            onClick={() => scrollToSection('habits')}
                            className={`text-sm font-semibold transition-colors hover:text-green-400 ${scrolled ? 'text-zinc-600' : 'text-zinc-100'
                                }`}
                        >
                            7 Kebiasaan
                        </button>
                    </nav>

                    <Link
                        href="/login"
                        className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 ${scrolled
                                ? 'bg-green-600 text-white hover:bg-green-700 ring-2 ring-green-600 ring-offset-2'
                                : 'bg-white text-emerald-700 hover:bg-zinc-50'
                            }`}
                    >
                        Masuk
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
>>>>>>> 24cc638 (Initial setup: Laravel Sail, React, Inertia, and Shadcn UI)
};

export default NavBar;
