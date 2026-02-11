import React, { useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

const Landing = () => {
  const smoothScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <Head title="Si Hebat - 7 Kebiasaan Anak Indonesia Hebat" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }

        body {
          scroll-behavior: smooth;
        }

        .gradient-text {
          background: linear-gradient(to right, rgb(34, 197, 94), rgb(22, 163, 74));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .safe-nav {
          background-color: #ffffff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .habit-card {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          border-radius: 16px;
        }

        .habit-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
        }

        .habit-card::before {
          content: '';
          position: absolute;
          bottom: -50%;
          right: -50%;
          width: 160px;
          height: 160px;
          background: white;
          border-radius: 50%;
          opacity: 0.15;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        .float-animation {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }

        .float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }

        .glow-animation {
          animation: glow 4s ease-in-out infinite;
        }

        .duolingo-green {
          color: #1cb0f6;
        }

        .hero-bg {
          background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
        }
      `}</style>

      <div className="bg-white text-zinc-900 scroll-smooth">
        {/* NAVBAR */}
        <nav className="fixed top-0 left-0 right-0 z-50 safe-nav">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between h-20">
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition" 
              onClick={() => smoothScroll('hero')}
            >
              <img src="/images/smkn8.jpeg" alt="SMKN 8 Jakarta" className="h-12 w-auto object-contain" />
              <div>
                <div className="text-xl font-black text-green-600">Si Hebat</div>
                <div className="text-xs font-semibold text-zinc-500">7 Kebiasaan Anak Indonesia</div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => smoothScroll('hero')} className="font-semibold text-zinc-700 hover:text-green-600 transition">Beranda</button>
              <button onClick={() => smoothScroll('habits')} className="font-semibold text-zinc-700 hover:text-green-600 transition">Kebiasaan</button>
              <button onClick={() => smoothScroll('cta')} className="font-semibold text-zinc-700 hover:text-green-600 transition">Mulai</button>
            </div>
          </div>
        </nav>

        {/* HERO SECTION */}
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
          
          {/* Subtle blur effect */}
          <div className="absolute inset-0 -z-10 backdrop-blur-[1px]"></div>

          <div className="max-w-4xl mx-auto w-full">
            {/* Text Content */}
            <div className="space-y-8 text-white">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-black leading-tight drop-shadow-lg">
                  Bangun Karakter Hebat Sejak Dini
                </h1>

                <p className="text-xl md:text-2xl leading-relaxed max-w-2xl drop-shadow-md">
                  Platform edukasi interaktif untuk membentuk anak Indonesia yang disiplin, jujur, dan berkarakter melalui 7 kebiasaan positif.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={() => router.get('/login')} 
                  className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 text-center block"
                >
                  Mulai Jadi Hebat Sekarang
                </button>

                <button 
                  onClick={() => router.get('/login')} 
                  className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-2xl text-lg hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl text-center block"
                >
                  Lihat 7 Kebiasaan
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* HABITS SECTION */}
        <section id="habits" className="py-20 px-4 bg-zinc-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-green-600 font-bold text-lg mb-4">TELUSURI</p>
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-zinc-900">7 Kebiasaan Anak Indonesia Hebat</h2>
              <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
                Setiap kebiasaan adalah langkah menuju masa depan yang lebih baik. Mulai dari yang kamu minati!
              </p>
            </div>

            {/* Habits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Habit 1 */}
              <div className="habit-card p-6 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-3xl shadow-lg cursor-pointer">
                <div className="text-6xl mb-4 float-animation">🌅</div>
                <h3 className="text-xl font-black text-white mb-3">Bangun Pagi</h3>
                <p className="text-white text-sm leading-relaxed opacity-95">Memulai hari dengan segar, ceria, dan disiplin.</p>
                <div className="mt-6 flex items-center gap-2 text-white font-bold">
                  <span>Pelajari</span>
                  <span className="text-xl">→</span>
                </div>
              </div>

              {/* Habit 2 */}
              <div className="habit-card p-6 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-3xl shadow-lg cursor-pointer">
                <div className="text-6xl mb-4 float-animation" style={{ animationDelay: '0.3s' }}>🤲</div>
                <h3 className="text-xl font-black text-white mb-3">Beribadah</h3>
                <p className="text-white text-sm leading-relaxed opacity-95">Selalu berdoa dan mendekatkan diri pada Tuhan.</p>
                <div className="mt-6 flex items-center gap-2 text-white font-bold">
                  <span>Pelajari</span>
                  <span className="text-xl">→</span>
                </div>
              </div>

              {/* Habit 3 */}
              <div className="habit-card p-6 bg-gradient-to-br from-red-400 to-pink-400 rounded-3xl shadow-lg cursor-pointer">
                <div className="text-6xl mb-4 float-animation" style={{ animationDelay: '0.6s' }}>⚽</div>
                <h3 className="text-xl font-black text-white mb-3">Berolahraga</h3>
                <p className="text-white text-sm leading-relaxed opacity-95">Menjaga kebugaran fisik dan kesehatan mental.</p>
                <div className="mt-6 flex items-center gap-2 text-white font-bold">
                  <span>Pelajari</span>
                  <span className="text-xl">→</span>
                </div>
              </div>

              {/* Habit 4 */}
              <div className="habit-card p-6 bg-gradient-to-br from-green-400 to-emerald-400 rounded-3xl shadow-lg cursor-pointer">
                <div className="text-6xl mb-4 float-animation" style={{ animationDelay: '0.9s' }}>🥗</div>
                <h3 className="text-xl font-black text-white mb-3">Makan Sehat & Bergizi</h3>
                <p className="text-white text-sm leading-relaxed opacity-95">Memenuhi nutrisi tubuh agar kuat dan sehat.</p>
                <div className="mt-6 flex items-center gap-2 text-white font-bold">
                  <span>Pelajari</span>
                  <span className="text-xl">→</span>
                </div>
              </div>

              {/* Habit 5 */}
              <div className="habit-card p-6 bg-gradient-to-br from-purple-400 to-violet-400 rounded-3xl shadow-lg cursor-pointer">
                <div className="text-6xl mb-4 float-animation">📚</div>
                <h3 className="text-xl font-black text-white mb-3">Gemar Belajar</h3>
                <p className="text-white text-sm leading-relaxed opacity-95">Meningkatkan pengetahuan dan kemampuan.</p>
                <div className="mt-6 flex items-center gap-2 text-white font-bold">
                  <span>Pelajari</span>
                  <span className="text-xl">→</span>
                </div>
              </div>

              {/* Habit 6 */}
              <div className="habit-card p-6 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-3xl shadow-lg cursor-pointer">
                <div className="text-6xl mb-4 float-animation" style={{ animationDelay: '0.3s' }}>🤝</div>
                <h3 className="text-xl font-black text-white mb-3">Bermasyarakat</h3>
                <p className="text-white text-sm leading-relaxed opacity-95">Peduli, gotong royong, dan aktif dalam kehidupan sosial.</p>
                <div className="mt-6 flex items-center gap-2 text-white font-bold">
                  <span>Pelajari</span>
                  <span className="text-xl">→</span>
                </div>
              </div>

              {/* Habit 7 */}
              <div className="habit-card p-6 bg-gradient-to-br from-slate-400 to-zinc-400 rounded-3xl shadow-lg cursor-pointer">
                <div className="text-6xl mb-4 float-animation" style={{ animationDelay: '0.6s' }}>😴</div>
                <h3 className="text-xl font-black text-white mb-3">Tidur Cukup</h3>
                <p className="text-white text-sm leading-relaxed opacity-95">Istirahat konsisten untuk memaksimalkan tumbuh kembang.</p>
                <div className="mt-6 flex items-center gap-2 text-white font-bold">
                  <span>Pelajari</span>
                  <span className="text-xl">→</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section id="cta" className="py-20 px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-12 md:p-16 text-white text-center shadow-lg">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Yuk, Ciptakan Anak Indonesia Hebat
            </h2>

            <p className="text-lg md:text-xl mb-8 opacity-95 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan siswa SMKN 8 Jakarta dan mulai transformasi karaktermu hari ini. Masa depan cerah menunggu!
            </p>

            <button 
              onClick={() => router.get('/login')} 
              className="px-10 py-4 bg-white text-green-600 font-bold rounded-2xl text-lg hover:bg-zinc-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Mulai Menjadi Si Hebat Sekarang
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-zinc-900 text-white py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Main footer content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 pb-12 border-b border-zinc-700">
              {/* Brand Section */}
              <div className="space-y-4">
                <h3 className="text-3xl font-black gradient-text">Si Hebat</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Platform edukasi interaktif untuk membentuk karakter anak Indonesia yang hebat melalui 7 kebiasaan positif.
                </p>
                <div className="pt-4">
                  <img src="/images/smkn8.jpeg" alt="SMKN 8 Jakarta" className="h-12 object-contain rounded" />
                </div>
              </div>

              {/* Contact Section */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white mb-6">Kontak Sekolah</h4>
                <a href="tel:+622179996493" className="flex items-center gap-3 text-zinc-400 hover:text-green-400 transition">
                  <span>📞</span>
                  <span>+62 21-7996493</span>
                </a>
                <a href="mailto:info@smkn8jakarta.sch.id" className="flex items-center gap-3 text-zinc-400 hover:text-green-400 transition">
                  <span>📧</span>
                  <span>info@smkn8jakarta.sch.id</span>
                </a>
                <a href="https://smkn8jakarta.sch.id" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-400 hover:text-green-400 transition">
                  <span>🌐</span>
                  <span>smkn8jakarta.sch.id</span>
                </a>
              </div>

              {/* Tech Stack Section */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white mb-6">Tech Stack</h4>
                <div className="grid grid-cols-2 gap-3 text-sm text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">▸</span>
                    <span>Laravel 12</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">▸</span>
                    <span>React.js</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">▸</span>
                    <span>Inertia.js</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">▸</span>
                    <span>Shadcn UI</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">▸</span>
                    <span>Tailwind CSS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">▸</span>
                    <span>Framer Motion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">▸</span>
                    <span>PostgreSQL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">▸</span>
                    <span>Docker Sail</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Section */}
            <div className="mb-12 pb-12 border-b border-zinc-700">
              <h4 className="text-xl font-bold text-white mb-6">Tim Pengembang</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-zinc-800 rounded-2xl hover:bg-zinc-700 transition">
                  <p className="font-bold text-green-400 mb-1">Ahmad Ghifari</p>
                  <p className="text-sm text-zinc-400"></p>
                </div>
                <div className="p-4 bg-zinc-800 rounded-2xl hover:bg-zinc-700 transition">
                  <p className="font-bold text-green-400 mb-1">Junior Ferdiansyah</p>
                  <p className="text-sm text-zinc-400"></p>
                </div>
                <div className="p-4 bg-zinc-800 rounded-2xl hover:bg-zinc-700 transition">
                  <p className="font-bold text-green-400 mb-1">Alfarisi Azmir</p>
                  <p className="text-sm text-zinc-400"></p>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-zinc-500 text-sm">
              <p className="mb-2">© 2025 Tim 7 Kebiasaan Anak Indonesia Hebat</p>
              <p className="text-xs text-zinc-600">
                Dibangun dengan ❤️ untuk membentuk generasi Indonesia yang hebat
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Landing;