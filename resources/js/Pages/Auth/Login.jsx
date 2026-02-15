import { useState, useEffect } from 'react';
import { Link, useForm, Head } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, GraduationCap, Users, ShieldCheck, Lock, Mail, ArrowLeft, Loader2, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
  const [role, setRole] = useState('siswa');
  const [guruType, setGuruType] = useState('pns');
  const [showPassword, setShowPassword] = useState(false);

  const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
    role: 'siswa',
    nis: '',
    nip: '',
    full_name: '',
    email: '',
    password: '',
    guru_type: null,
    remember: true,
  });

  // Function to handle tab switch clearly
  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setData(prev => ({
      ...prev,
      role: newRole,
      // Clear specific identifiers to prevent cross-role validation leakage
      nis: '',
      nip: '',
      full_name: '',
      email: '',
      guru_type: newRole === 'guru' ? 'pns' : null,
    }));
    clearErrors();
  };

  const handleGuruTypeChange = (type) => {
    setGuruType(type);
    setData('guru_type', type);
    clearErrors();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <div className="min-h-screen bg-white flex overflow-hidden font-sans selection:bg-green-500/30">
      <Head title="Masuk - Si Hebat" />

      {/* LEFT SIDE: Image & Welcome Text (Hidden on Mobile) */}
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
              Selamat Datang <br /> <span className="text-green-400">Kembali.</span>
            </h1>
            <p className="text-xl text-white/80 font-medium max-w-md">
              Teruslah melangkah dan jadilah kebanggaan bangsa melalui 7 kebiasaan anak Indonesia hebat.
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

      {/* RIGHT SIDE: Login Form */}
      <div className="w-full lg:w-[480px] xl:w-[520px] relative bg-white flex items-center justify-center p-6 md:p-12 overflow-y-auto shadow-[-20px_0_50px_rgba(0,0,0,0.05)] z-20">
        {/* Mobile Background (Shown only on small screens) */}
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
          {/* Header Section with SVG Logo */}
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
            <h3 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Login ke Akun Anda</h3>
            <p className="text-gray-500 font-medium">Pilih peran dan masukkan identitas Anda untuk melanjutkan.</p>
          </div>

          {/* Role Selection Tabs */}
          <div className="flex p-1 bg-gray-100 rounded-2xl mb-8 relative">
            {[
              { id: 'siswa', label: 'Siswa' },
              { id: 'guru', label: 'Guru' },
              { id: 'orang_tua', label: 'Orang Tua' }
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleRoleChange(r.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all relative z-10 ${role === r.id ? 'text-green-700' : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {r.id === 'siswa' && <User size={16} />}
                {r.id === 'guru' && <GraduationCap size={16} />}
                {r.id === 'orang_tua' && <Users size={16} />}
                <span className="capitalize">{r.label}</span>
                {role === r.id && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-white shadow-sm rounded-xl z-[-1]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={role + guruType}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Type Selector if Guru - Changed to Green Background */}
                {role === 'guru' && (
                  <div className="flex gap-2 p-1 bg-gray-50 border border-gray-100 rounded-xl font-bold">
                    <button
                      type="button"
                      onClick={() => handleGuruTypeChange('pns')}
                      className={`flex-1 py-3 rounded-lg text-xs transition-all ${guruType === 'pns' ? 'bg-green-600 text-white shadow-md' : 'text-gray-400'
                        }`}
                    >
                      PNS
                    </button>
                    <button
                      type="button"
                      onClick={() => handleGuruTypeChange('honorer')}
                      className={`flex-1 py-3 rounded-lg text-xs transition-all ${guruType === 'honorer' ? 'bg-green-600 text-white shadow-md' : 'text-gray-400'
                        }`}
                    >
                      HONORER
                    </button>
                  </div>
                )}

                {/* Role Specific Inputs */}
                {role === 'siswa' && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">NIS Siswa</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors">
                        <ShieldCheck size={18} />
                      </div>
                      <input
                        type="text"
                        value={data.nis}
                        onChange={e => setData('nis', e.target.value)}
                        className={`w-full bg-gray-50 border-2 pl-12 pr-4 py-4 rounded-2xl text-gray-900 font-bold placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/10 transition-all ${errors.nis ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-green-500'
                          }`}
                        placeholder="0012345678"
                      />
                    </div>
                    {errors.nis && <p className="text-xs text-red-500 font-bold ml-1 mt-1">{errors.nis}</p>}
                  </div>
                )}

                {role === 'guru' && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                      {guruType === 'pns' ? 'NIP Guru' : 'Nama Lengkap'}
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors">
                        {guruType === 'pns' ? <ShieldCheck size={18} /> : <User size={18} />}
                      </div>
                      <input
                        type="text"
                        value={guruType === 'pns' ? data.nip : data.full_name}
                        onChange={e => setData(guruType === 'pns' ? 'nip' : 'full_name', e.target.value)}
                        className={`w-full bg-gray-50 border-2 pl-12 pr-4 py-4 rounded-2xl text-gray-900 font-bold placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/10 transition-all ${errors[guruType === 'pns' ? 'nip' : 'full_name'] ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-green-500'
                          }`}
                        placeholder={guruType === 'pns' ? "19870101..." : "Masukkan nama lengkap"}
                      />
                    </div>
                    {errors[guruType === 'pns' ? 'nip' : 'full_name'] && (
                      <p className="text-xs text-red-500 font-bold ml-1 mt-1">{errors[guruType === 'pns' ? 'nip' : 'full_name']}</p>
                    )}
                  </div>
                )}

                {role === 'orang_tua' && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Alamat Email</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors">
                        <Mail size={18} />
                      </div>
                      <input
                        type="email"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        className={`w-full bg-gray-50 border-2 pl-12 pr-4 py-4 rounded-2xl text-gray-900 font-bold placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/10 transition-all ${errors.email ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-green-500'
                          }`}
                        placeholder="orangtua@email.com"
                      />
                    </div>
                    {errors.email && <p className="text-xs text-red-500 font-bold ml-1 mt-1">{errors.email}</p>}
                  </div>
                )}

                {/* Password Input */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Kata Sandi</label>
                    {canResetPassword && (
                      <Link href={route('password.request')} className="text-xs font-black text-green-600 hover:text-green-700 transition-colors">Lupa sandi?</Link>
                    )}
                  </div>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={data.password}
                      onChange={e => setData('password', e.target.value)}
                      className={`w-full bg-gray-50 border-2 pl-12 pr-12 py-4 rounded-2xl text-gray-900 font-bold placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/10 transition-all ${errors.password ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-green-500'
                        }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-red-500 font-bold ml-1 mt-1">{errors.password}</p>}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Remember Me */}
            <div className="flex items-center px-1">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={data.remember}
                  onChange={e => setData('remember', e.target.checked)}
                  className="w-5 h-5 rounded-lg border-gray-300 text-green-600 focus:ring-green-500/50 transition-all cursor-pointer shadow-sm"
                />
                <span className="text-sm font-bold text-gray-500 group-hover:text-gray-800 transition-colors tracking-tight">Tetap masuk di perangkat ini</span>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={processing}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-green-200 transition-all disabled:opacity-70 flex items-center justify-center gap-3 group"
            >
              {processing ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span>MASUK SEKARANG</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="text-white" size={20} />
                  </motion.div>
                </>
              )}
            </motion.button>
          </form>

          {/* Footer Section */}
          <div className="mt-12 text-center lg:text-left space-y-6">
            {role === 'orang_tua' && (
              <p className="text-sm font-bold text-gray-400">
                Belum memiliki akun orang tua?{' '}
                <Link href={route('register')} className="text-green-600 hover:text-green-700 underline underline-offset-4 decoration-2">
                  Daftar Segera
                </Link>
              </p>
            )}

            <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
              <Link href="/" className="inline-flex items-center gap-2 text-xs font-black text-gray-400 hover:text-green-600 uppercase tracking-widest transition-colors">
                <ArrowLeft size={14} />
                Beranda
              </Link>
              <div className="w-2 h-2 rounded-full bg-green-200" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
