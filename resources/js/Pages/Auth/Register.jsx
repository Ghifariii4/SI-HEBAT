import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowLeft, Loader2, UserPlus, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    full_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    // nis_anak is kept as UI for now, logic can be added later if needed
    nis_anak: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <div className="min-h-screen bg-white flex overflow-hidden font-sans selection:bg-green-500/30">
      <Head title="Daftar Orang Tua - Si Hebat" />

      {/* LEFT SIDE: Image & Text */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden bg-green-900">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/smkn8senja.png')" }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="relative z-20 w-full h-full flex flex-col justify-end p-16 text-white text-left">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="text-6xl font-black tracking-tighter mb-4 leading-none">
              Bergabung <br /> <span className="text-green-400">Si Hebat.</span>
            </h1>
            <p className="text-xl text-white/80 font-medium max-w-md">
              Daftar sebagai orang tua untuk memantau perkembangan dan prestasi harian anak Anda.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-12 flex items-center gap-4 text-white/40 text-sm font-bold uppercase tracking-widest"
          >
            <div className="w-12 h-[2px] bg-white/20" />
            <span>Si Hebat Platform</span>
          </motion.div>
        </div>
      </div>

      {/* RIGHT SIDE: Register Form */}
      <div className="w-full lg:w-[480px] xl:w-[520px] relative bg-white flex items-center justify-center p-6 md:p-12 overflow-y-auto shadow-[-20px_0_50px_rgba(0,0,0,0.05)] z-20">
        <div
          className="lg:hidden absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/smkn8senja.png')" }}
        />
        <div className="lg:hidden absolute inset-0 z-1 bg-black/60 backdrop-blur-md" />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 w-full max-w-sm bg-white lg:bg-transparent rounded-3xl lg:rounded-none shadow-2xl lg:shadow-none p-8 lg:p-0 border border-gray-100 lg:border-none"
        >
          {/* Header */}
          <div className="mb-10 text-center lg:text-left">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex lg:flex items-center justify-center lg:justify-start gap-3 mb-6"
            >
              <img src="/images/logohebat.svg" alt="Logo SI HEBAT" className="w-12 h-12 object-contain" />
              <h2 className="text-2xl font-black tracking-tighter text-gray-900">SI HEBAT</h2>
            </motion.div>
            <h3 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Daftar Orang Tua</h3>
            <p className="text-gray-500 font-medium">Lengkapi data diri Anda untuk membuat akun baru.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  value={data.full_name}
                  onChange={e => setData('full_name', e.target.value)}
                  className={`w-full bg-gray-50 border-2 pl-12 pr-4 py-3.5 rounded-2xl text-gray-900 font-bold placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/10 transition-all ${errors.full_name ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-green-500'}`}
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              {errors.full_name && <p className="text-xs text-red-500 font-bold ml-1">{errors.full_name}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Aktif</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={data.email}
                  onChange={e => setData('email', e.target.value)}
                  className={`w-full bg-gray-50 border-2 pl-12 pr-4 py-3.5 rounded-2xl text-gray-900 font-bold placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/10 transition-all ${errors.email ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-green-500'}`}
                  placeholder="email@contoh.com"
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 font-bold ml-1">{errors.email}</p>}
            </div>

            {/* NIS Anak (UI Only) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 text-green-700/60 flex items-center gap-1.5">
                NIS Anak <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-md">PENTING</span>
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors">
                  <ShieldCheck size={18} />
                </div>
                <input
                  type="text"
                  value={data.nis_anak}
                  onChange={e => setData('nis_anak', e.target.value)}
                  className={`w-full bg-gray-50 border-2 pl-12 pr-4 py-3.5 rounded-2xl text-gray-900 font-bold placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/10 transition-all border-transparent focus:border-green-500 opacity-90`}
                  placeholder="Contoh: 0012345678"
                />
              </div>
              <p className="text-[10px] text-gray-400 font-medium ml-1">NIS akan digunakan untuk menghubungkan akun Anda dengan data anak.</p>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Kata Sandi</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={data.password}
                  onChange={e => setData('password', e.target.value)}
                  className={`w-full bg-gray-50 border-2 pl-12 pr-12 py-3.5 rounded-2xl text-gray-900 font-bold placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/10 transition-all ${errors.password ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-green-500'}`}
                  placeholder="Minimal 8 karakter"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 font-bold ml-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Konfirmasi Sandi</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={data.password_confirmation}
                  onChange={e => setData('password_confirmation', e.target.value)}
                  className={`w-full bg-gray-50 border-2 pl-12 pr-12 py-3.5 rounded-2xl text-gray-900 font-bold placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/10 transition-all border-transparent focus:border-green-500`}
                  placeholder="Ketik ulang sandi"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={processing}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4.5 rounded-2xl shadow-xl shadow-green-200 transition-all disabled:opacity-70 flex items-center justify-center gap-3 group"
            >
              {processing ? (
                <Loader2 className="animate-spin" size={40} />
              ) : (
                <>
                  <span>BUAT AKUN SEKARANG</span>
                  <UserPlus size={20} className="group-hover:scale-110 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm font-bold text-gray-400">
              Sudah punya akun?{' '}
              <Link href={route('login')} className="text-green-600 hover:text-green-700 underline underline-offset-4 decoration-2">
                Login di sini
              </Link>
            </p>
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-black text-gray-400 hover:text-green-600 uppercase tracking-widest transition-colors">
              <ArrowLeft size={14} /> Beranda
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
