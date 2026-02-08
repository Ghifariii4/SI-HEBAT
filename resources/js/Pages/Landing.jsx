import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import HabitCard from '../Components/HabitCard';
import NavBar from '../Components/NavBar';
import FooterSection from '../Components/FooterSection';

const Landing = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    // Removed dark mode logic - using light theme only
  }, []);

  // Save dark mode preference and apply to DOM
  useEffect(() => {
    // Light theme only
  }, []);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const habitsList = [
    {
      id: 1,
      title: 'Bangun Pagi',
      description: 'Memulai hari dengan segar, ceria, dan disiplin.',
      icon: '🌅',
      color: 'from-orange-400 to-yellow-400'
    },
    {
      id: 2,
      title: 'Beribadah',
      description: 'Selalu berdoa dan mendekatkan diri pada Tuhan.',
      icon: '🤲',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      id: 3,
      title: 'Berolahraga',
      description: 'Menjaga kebugaran fisik dan kesehatan mental.',
      icon: '⚽',
      color: 'from-red-400 to-pink-400'
    },
    {
      id: 4,
      title: 'Makan Sehat & Bergizi',
      description: 'Memenuhi nutrisi tubuh agar kuat dan sehat.',
      icon: '🥗',
      color: 'from-green-400 to-emerald-400'
    },
    {
      id: 5,
      title: 'Gemar Belajar',
      description: 'Meningkatkan pengetahuan dan kemampuan.',
      icon: '📚',
      color: 'from-purple-400 to-violet-400'
    },
    {
      id: 6,
      title: 'Bermasyarakat',
      description: 'Peduli, gotong royong, dan aktif dalam kehidupan sosial.',
      icon: '🤝',
      color: 'from-indigo-400 to-blue-400'
    },
    {
      id: 7,
      title: 'Tidur Cukup',
      description: 'Istirahat konsisten untuk memaksimalkan tumbuh kembang.',
      icon: '😴',
      color: 'from-slate-400 to-zinc-400'
    }
  ];

  // Smooth scroll helper
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80; // navbar height
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <div className="scroll-smooth">
      <div className="min-h-screen bg-white text-zinc-900">
        {/* Navigation Bar */}
        <NavBar 
          scrolled={scrolled}
          scrollToSection={scrollToSection}
        />

        {/* ===== HERO SECTION ===== */}
        <section 
          id="hero" 
          className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-4 overflow-hidden"
          style={{
            backgroundImage: "url('/images/smkn8senja.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Dark Green Gradient Overlay (60-70%) */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-emerald-800/50 to-transparent -z-10"></div>

          {/* Subtle blur effect on background */}
          <div className="absolute inset-0 backdrop-blur-[1px] -z-10"></div>

          {/* Content */}
          <motion.div
            className="max-w-4xl mx-auto w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Text Content */}
            <motion.div className="space-y-8 text-white" variants={itemVariants}>
              <motion.div variants={itemVariants} className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-black leading-tight drop-shadow-lg">
                  Bangun Karakter Hebat Sejak Dini
                </h1>

                <p className="text-xl md:text-2xl leading-relaxed drop-shadow-md max-w-2xl">
                  Platform edukasi interaktif untuk membentuk anak Indonesia yang disiplin, jujur, dan berkarakter melalui 7 kebiasaan positif.
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div className="flex flex-col sm:flex-row gap-4 pt-4" variants={itemVariants}>
                <motion.button
                  onClick={() => navigate('/login')}
                  className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Mulai Jadi Hebat Sekarang
                </motion.button>

                <motion.button
                  onClick={() => navigate('/login')}
                  className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-2xl text-lg hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Lihat 7 Kebiasaan
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* ===== HABITS SECTION ===== */}
        <section id="habits" className="py-20 px-4 bg-zinc-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.p 
                className="text-green-600 font-bold text-lg mb-4"
                variants={itemVariants}
              >
                TELUSURI
              </motion.p>
              <motion.h2 
                className="text-4xl md:text-5xl font-black mb-6 text-zinc-900"
                variants={itemVariants}
              >
                7 Kebiasaan Anak Indonesia Hebat
              </motion.h2>
              <motion.p 
                className="text-xl text-zinc-600 max-w-2xl mx-auto"
                variants={itemVariants}
              >
                Setiap kebiasaan adalah langkah menuju masa depan yang lebih baik. Mulai dari yang kamu minati!
              </motion.p>
            </motion.div>

            {/* Habits Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {habitsList.map((habit) => (
                <HabitCard key={habit.id} habit={habit} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== FINAL CTA SECTION ===== */}
        <section id="cta" className="py-20 px-4">
          <motion.div
            className="max-w-4xl mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-12 md:p-16 text-white text-center shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-black mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Yuk, Ciptakan Anak Indonesia Hebat
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl mb-8 opacity-95 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Bergabunglah dengan ribuan siswa SMKN 8 Jakarta dan mulai transformasi karaktermu hari ini. Masa depan cerah menunggu!
            </motion.p>

            <motion.button
              className="px-10 py-4 bg-white text-green-600 font-bold rounded-2xl text-lg hover:bg-zinc-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Mulai Menjadi Si Hebat Sekarang
            </motion.button>
          </motion.div>
        </section>

        {/* Footer */}
        <FooterSection />
      </div>
    </div>
  );
};

export default Landing;
