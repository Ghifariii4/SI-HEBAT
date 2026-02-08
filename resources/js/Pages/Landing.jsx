import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
=======
import { router } from '@inertiajs/react'; // Use Inertia router instead of react-router-dom
>>>>>>> 24cc638 (Initial setup: Laravel Sail, React, Inertia, and Shadcn UI)
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import HabitCard from '../Components/HabitCard';
import NavBar from '../Components/NavBar';
import FooterSection from '../Components/FooterSection';

const Landing = () => {
<<<<<<< HEAD
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
=======
    // Use Inertia navigation
    const navigate = (url) => router.visit(url);
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
        <div className="scroll-smooth bg-white text-zinc-900 font-sans antialiased">
            {/* Navigation Bar */}
            <NavBar
                scrolled={scrolled}
                scrollToSection={scrollToSection}
            />

            {/* ===== HERO SECTION ===== */}
            <section
                id="hero"
                className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-20"
            >
                {/* Background Image with Parallax Effect */}
                <div
                    className="absolute inset-0 z-0 scale-105"
                    style={{
                        backgroundImage: "url('/images/smkn8senja.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'brightness(0.9)',
                    }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-green-900/80 to-teal-900/60 z-0 mix-blend-multiply" />

                {/* Content */}
                <motion.div
                    className="max-w-5xl mx-auto w-full relative z-10 text-center text-white space-y-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Badge */}
                    <motion.div variants={itemVariants} className="inline-block mb-4">
                        <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold tracking-wide uppercase text-green-100 shadow-sm">
                            ✨ Membangun Generasi Emas
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight drop-shadow-xl bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-green-100"
                        variants={itemVariants}
                    >
                        Bangun Karakter <br className="hidden md:block" /> Hebat Sejak Dini
                    </motion.h1>

                    <motion.p
                        className="text-lg md:text-2xl leading-relaxed text-green-50 max-w-3xl mx-auto drop-shadow-md font-medium"
                        variants={itemVariants}
                    >
                        Platform edukasi interaktif untuk membentuk anak Indonesia yang disiplin, jujur, dan berkarakter melalui 7 kebiasaan positif sehari-hari.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-5 justify-center pt-8 items-center"
                        variants={itemVariants}
                    >
                        <motion.button
                            onClick={() => navigate('/login')}
                            className="group relative px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-full text-lg shadow-[0_10px_20px_-10px_rgba(22,163,74,0.5)] hover:shadow-[0_20px_25px_-5px_rgba(22,163,74,0.6)] transition-all duration-300 overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="relative z-10">Mulai Jadi Hebat Sekarang</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                        </motion.button>

                        <motion.button
                            onClick={() => scrollToSection('habits')}
                            className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 font-bold rounded-full text-lg transition-all duration-300 flex items-center gap-2 group"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span>Lihat 7 Kebiasaan</span>
                            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                >
                    <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
                    <ChevronDown className="w-6 h-6" />
                </motion.div>
            </section>

            {/* ===== HABITS SECTION ===== */}
            <section id="habits" className="py-24 px-4 bg-zinc-50 relative">
                <div className="absolute inset-0 bg-[url('/img/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        className="text-center mb-20"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider mb-4">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Telusuri
                        </motion.div>

                        <motion.h2
                            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-zinc-900 tracking-tight"
                            variants={itemVariants}
                        >
                            7 Kebiasaan Anak <span className="text-green-600">Indonesia Hebat</span>
                        </motion.h2>

                        <motion.p
                            className="text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed"
                            variants={itemVariants}
                        >
                            Setiap kebiasaan adalah langkah kecil menuju masa depan yang gemilang.
                            Mulailah dari satu kebiasaan yang paling kamu minati hari ini!
                        </motion.p>
                    </motion.div>

                    {/* Habits Grid */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {habitsList.map((habit) => (
                            <HabitCard key={habit.id} habit={habit} />
                        ))}

                        {/* Last card spans 2 columns on large screens to make grid even if 7 items, or create a 'more' card */}
                        <motion.div
                            className="p-8 rounded-3xl border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center text-center hover:border-green-300 hover:bg-green-50 transition-all cursor-pointer group"
                            whileHover={{ scale: 1.02 }}
                            onClick={() => navigate('/login')}
                        >
                            <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mb-4 group-hover:bg-white group-hover:shadow-md transition-all text-2xl">
                                ✨
                            </div>
                            <h3 className="text-xl font-bold text-zinc-400 group-hover:text-green-600 transition-colors">Dan Banyak Lagi...</h3>
                            <p className="text-sm text-zinc-400 mt-2">Gabung untuk melihat progresmu!</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ===== FINAL CTA SECTION ===== */}
            <section id="cta" className="py-24 px-4 bg-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-zinc-50 to-white" />

                <motion.div
                    className="max-w-5xl mx-auto relative z-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-[2.5rem] p-12 md:p-20 text-white text-center shadow-2xl overflow-hidden"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Decorative Circles */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-400/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

                    <motion.h2
                        className="text-4xl md:text-6xl font-black mb-6 leading-tight relative z-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        Yuk, Ciptakan <br /> Anak Indonesia Hebat!
                    </motion.h2>

                    <motion.p
                        className="text-lg md:text-2xl mb-10 text-green-50 max-w-2xl mx-auto leading-relaxed relative z-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        Bergabunglah dengan ribuan siswa SMKN 8 Jakarta dan mulai transformasi karaktermu hari ini. Masa depan cerah menanti di depan mata.
                    </motion.p>

                    <motion.button
                        onClick={() => navigate('/login')}
                        className="relative z-10 px-12 py-5 bg-white text-green-600 font-black rounded-full text-lg hover:bg-zinc-50 transition-all duration-300 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] hover:shadow-lg hover:-translate-y-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        Mulai Menjadi Si Hebat
                    </motion.button>
                </motion.div>
            </section>

            {/* Footer */}
            <FooterSection />
        </div>
    );
>>>>>>> 24cc638 (Initial setup: Laravel Sail, React, Inertia, and Shadcn UI)
};

export default Landing;
