import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Loader2, Send, Info, LogOut, CheckCircle } from 'lucide-react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <div className="min-h-screen bg-white flex overflow-hidden font-sans selection:bg-green-500/30">
            <Head title="Verifikasi Email - Si Hebat" />

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
                            Satu Langkah <br /> <span className="text-green-400">Terakhir.</span>
                        </h1>
                        <p className="text-xl text-white/80 font-medium max-w-md">
                            Verifikasi email Anda untuk mengaktifkan seluruh fitur di platform Si Hebat.
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

            {/* RIGHT SIDE: Verify Email Form */}
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
                        <h3 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Verifikasi Email</h3>
                        <p className="text-gray-500 font-medium">Terima kasih telah mendaftar! Sebelum memulai, harap verifikasi email Anda melalui tautan yang baru saja kami kirimkan.</p>
                    </div>

                    {status === 'verification-link-sent' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-8 p-4 bg-green-50 border border-green-100 rounded-2xl flex items-start gap-3 text-green-800"
                        >
                            <CheckCircle size={20} className="mt-0.5 shrink-0" />
                            <p className="text-sm font-bold leading-relaxed">Tautan verifikasi baru telah dikirimkan ke alamat email yang Anda berikan saat pendaftaran.</p>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
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
                                    <span>KIRIM ULANG VERIFIKASI</span>
                                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Footer Section */}
                    <div className="mt-12 text-center lg:text-left space-y-6">
                        <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="inline-flex items-center gap-2 text-xs font-black text-gray-400 hover:text-red-600 uppercase tracking-widest transition-colors"
                            >
                                <LogOut size={14} />
                                Keluar
                            </Link>
                            <div className="w-2 h-2 rounded-full bg-green-200" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
