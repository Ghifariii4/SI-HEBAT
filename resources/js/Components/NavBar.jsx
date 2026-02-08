import React from 'react';
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
};


export default NavBar;
