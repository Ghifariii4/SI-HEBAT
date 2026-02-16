import { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Lock, ArrowLeft, Loader2, ShieldCheck, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

export default function ConfirmPassword() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-white flex overflow-hidden font-sans selection:bg-green-500/30">
            <Head title="Konfirmasi Kata Sandi - Si Hebat" />

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
                            Area <br /> <span className="text-green-400">Terproteksi.</span>
                        </h1>
                        <p className="text-xl text-white/80 font-medium max-w-md">
                            Silakan konfirmasi kata sandi Anda untuk mengakses fitur keamanan tingkat lanjut.
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

            {/* RIGHT SIDE: Confirm Password Form */}
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
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                            <ShieldCheck size={14} />
                            Verifikasi Identitas
                        </div>
                        <h3 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Konfirmasi Sandi</h3>
                        <p className="text-gray-500 font-medium">Ini adalah area aman. Harap masukkan kata sandi Anda sebelum melanjutkan.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Kata Sandi</label>
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
                                    autoComplete="current-password"
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
                                    <span>KONFIRMASI SEKARANG</span>
                                    <CheckCircle2 size={18} className="group-hover:scale-110 transition-transform" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Footer Section */}
                    <div className="mt-12 text-center lg:text-left space-y-6">
                        <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                            <Link href={route('login')} className="inline-flex items-center gap-2 text-xs font-black text-gray-400 hover:text-green-600 uppercase tracking-widest transition-colors">
                                <ArrowLeft size={14} />
                                Kembali
                            </Link>
                            <div className="w-2 h-2 rounded-full bg-green-200" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
