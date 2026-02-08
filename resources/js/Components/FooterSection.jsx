import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Globe } from 'lucide-react';

const FooterSection = () => {
  const founders = [
    { name: 'Ahmad Ghifari', role: 'Lead Developer' },
    { name: 'Junior Ferdiansyah', role: 'Frontend (React / Shadcn)' },
    { name: 'Alfarisi Azmir', role: 'Backend & Database' }
  ];

  const teamVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <footer className="bg-white border-t border-zinc-200 text-zinc-900 py-16 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 pb-12 border-b border-zinc-700"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Brand Section */}
          <motion.div className="space-y-4" variants={teamVariants}>
            <h3 className="text-3xl font-black text-green-600">
              Si Hebat
            </h3>
            <p className="text-zinc-600 leading-relaxed">
              Platform edukasi interaktif untuk membentuk karakter anak Indonesia yang hebat melalui 7 kebiasaan positif.
            </p>
            <div className="pt-4">
              <img
                src="/images/smkn8.jpeg"
                alt="SMKN 8 Jakarta"
                className="h-12 object-contain rounded"
              />
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div className="space-y-4" variants={teamVariants}>
            <h4 className="text-xl font-bold text-zinc-900 mb-6">Kontak Sekolah</h4>
            <motion.a
              href="tel:+622179996493"
              className="flex items-center gap-3 text-zinc-600 hover:text-green-600 transition-colors duration-300"
              whileHover={{ x: 4 }}
            >
              <Phone size={20} className="text-green-600" />
              <span>+62 21-7996493</span>
            </motion.a>
            <motion.a
              href="mailto:info@smkn8jakarta.sch.id"
              className="flex items-center gap-3 text-zinc-600 hover:text-green-600 transition-colors duration-300"
              whileHover={{ x: 4 }}
            >
              <Mail size={20} className="text-green-600" />
              <span>info@smkn8jakarta.sch.id</span>
            </motion.a>
            <motion.a
              href="https://smkn8jakarta.sch.id"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-zinc-600 hover:text-green-600 transition-colors duration-300"
              whileHover={{ x: 4 }}
            >
              <Globe size={20} className="text-green-600" />
              <span>smkn8jakarta.sch.id</span>
            </motion.a>
          </motion.div>

          {/* Tech Stack Section */}
          <motion.div className="space-y-4" variants={teamVariants}>
            <h4 className="text-xl font-bold text-zinc-900 mb-6">Tech Stack</h4>
            <div className="grid grid-cols-2 gap-3 text-sm text-zinc-600">
              <div className="flex items-center gap-2">
                <span className="text-green-600 text-lg">▸</span>
                <span>Laravel 12</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600 text-lg">▸</span>
                <span>React.js</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600 text-lg">▸</span>
                <span>Inertia.js</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600 text-lg">▸</span>
                <span>Shadcn UI</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600 text-lg">▸</span>
                <span>Tailwind CSS</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600 text-lg">▸</span>
                <span>Framer Motion</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600 text-lg">▸</span>
                <span>PostgreSQL</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600 text-lg">▸</span>
                <span>Docker Sail</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          className="mb-12 pb-12 border-b border-zinc-200"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h4 className="text-xl font-bold text-zinc-900 mb-6">Tim Pengembang</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {founders.map((person, idx) => (
              <motion.div
                key={idx}
                className="p-4 bg-zinc-50 rounded-2xl hover:bg-zinc-100 transition-colors duration-300 border border-zinc-200"
                variants={teamVariants}
                whileHover={{ y: -4 }}
              >
                <p className="font-bold text-green-600 mb-1">{person.name}</p>
                <p className="text-sm text-zinc-600">{person.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="text-center text-zinc-600 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2">© 2025 Tim 7 Kebiasaan Anak Indonesia Hebat</p>
          <p className="text-xs text-zinc-500">
            Dibangun dengan ❤️ untuk membentuk generasi Indonesia yang hebat
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
