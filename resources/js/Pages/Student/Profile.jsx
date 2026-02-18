import StudentLayout from '@/Layouts/StudentLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Mail, Heart, Lock, Eye, EyeOff, Check,
    AlertCircle, Award, Zap, Camera, Pencil,
    Shield, ArrowLeft, Coins, Crown
} from 'lucide-react';

export default function Profile({ auth = { user: {} }, user = {}, status, stats = {} }) {
    const currentUser = user || auth?.user || {};
    const [activeTab, setActiveTab] = useState('overview');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // Visibility states for password fields
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Default stats (will be overridden by props if present)
    const displayStats = {
        level: 12,
        xp: 3500,
        xpToNextLevel: 5000,
        coins: 1250,
        streak: 24,
        rank: 'Cendekiawan',
        ...stats
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        post(route('student.profile.updatePassword'), {
            onSuccess: () => {
                reset();
                setShowSuccessMessage(true);
                setTimeout(() => setShowSuccessMessage(false), 5000);
            },
        });
    };

    const getReligionLabel = (religion) => {
        const labels = {
            islam: '🕌 Islam',
            kristen: '✝️ Kristen',
            katolik: '✝️ Katolik',
            hindu: '🕉️ Hindu',
            buddha: '☸️ Buddha',
            konghucu: '☯️ Konghucu',
        };
        return labels[religion?.toLowerCase()] || religion || '-';
    };

    const xpPercentage = (displayStats.xp / displayStats.xpToNextLevel) * 100;

    return (
        <StudentLayout user={currentUser}>
            <Head>
                <title>Profil Saya - Si Hebat</title>
                <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Teko:wght@500;600;700&display=swap" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-24 font-sans selection:bg-blue-100">
                {/* Navbar / Header Area (Mobile only as StudentLayout has desktop sidebar) */}
                <div className="glass-nav sticky top-0 z-50 px-4 py-3 flex items-center justify-between shadow-sm md:hidden">
                    <button onClick={() => window.history.back()} className="p-2 text-slate-600">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="font-bold text-slate-800">PROFIL GAME</h1>
                    <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
                        <Coins size={16} className="text-yellow-500 fill-yellow-500" />
                        <span className="font-bold text-slate-700 text-sm">{displayStats.coins}</span>
                    </div>
                </div>

                <main className="max-w-4xl mx-auto mt-6 md:mt-10 px-4 relative">
                    {/* Background Decorative Blobs */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute top-1/2 -left-20 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />

                    {/* Main Profile Card */}
                    <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-2xl border border-white/60 overflow-hidden relative transition-all duration-500 card-wave-gold lg:card-wave-none">

                        {/* Banner Section */}
                        <div className="relative h-48 md:h-64 bg-slate-200 group overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974"
                                className="w-full h-full object-cover"
                                alt="Banner"
                            />
                            <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay" />
                        </div>

                        {/* Avatar & Info Content */}
                        <div className="px-6 md:px-10 pb-10 relative">
                            <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-20 mb-8 gap-4 md:gap-8">
                                {/* Avatar with Frame */}
                                <div className="relative group">
                                    <div className="avatar-frame frame-legend w-32 h-32 md:w-44 md:h-44 bg-white rounded-full shadow-lg">
                                        <div className="frame-ring" />
                                        <img
                                            src={currentUser?.avatar || `https://ui-avatars.com/api/?name=${currentUser?.full_name}&background=10b981&color=fff&bold=true&size=120`}
                                            className="w-full h-full object-cover rounded-full border-4 border-white relative z-10"
                                            alt="Avatar"
                                        />
                                    </div>
                                    <button className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-30 border-4 border-white transition transform hover:scale-110">
                                        <Camera size={20} />
                                    </button>
                                </div>

                                {/* Identity & Progress */}
                                <div className="flex-1 text-center md:text-left md:mb-4">
                                    <div className="flex flex-col md:flex-row items-center gap-2 mb-2">
                                        <h2 className="text-2xl md:text-4xl font-black text-slate-800 tracking-tight uppercase">
                                            {currentUser?.full_name || 'SISWA HEBAT'}
                                        </h2>
                                        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
                                            <Crown size={12} fill="currentColor" /> {displayStats.rank}
                                        </div>
                                    </div>

                                    <p className="text-slate-500 font-bold mb-4 flex items-center justify-center md:justify-start gap-2">
                                        <span>Level {displayStats.level}</span>
                                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                        <span>NIS: {currentUser?.nis || '000000'}</span>
                                    </p>

                                    {/* Game Style XP Bar */}
                                    <div className="w-full md:w-80 bg-blue-50 h-5 rounded-full overflow-hidden border border-blue-100 relative shadow-inner">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${xpPercentage}%` }}
                                            className="h-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 relative rounded-full"
                                        >
                                            <div className="absolute inset-0 bg-white/30 animate-shimmer" />
                                        </motion.div>
                                        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-blue-900 uppercase tracking-tighter drop-shadow-sm">
                                            {displayStats.xp} / {displayStats.xpToNextLevel} XP
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setActiveTab('edit')}
                                    className="hidden md:flex items-center gap-2 py-3 px-6 bg-white border-2 border-blue-100 hover:border-blue-500 hover:text-blue-600 text-slate-600 font-black rounded-2xl transition shadow-sm md:mb-4 uppercase text-sm"
                                >
                                    <Pencil size={16} /> Edit Profil
                                </button>
                            </div>

                            {/* Tab System */}
                            <div className="flex bg-slate-50/80 rounded-2xl p-1 mb-10 border border-slate-100">
                                {['overview', 'inventory', 'edit'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-1 py-3 text-sm font-black uppercase tracking-wider transition-all rounded-xl ${activeTab === tab
                                                ? 'bg-white text-blue-600 shadow-md transform scale-[1.02]'
                                                : 'text-slate-400 hover:text-slate-600'
                                            }`}
                                    >
                                        {tab === 'overview' && 'Ringkasan'}
                                        {tab === 'inventory' && 'Koleksi'}
                                        {tab === 'edit' && 'Pengaturan'}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content Area */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="min-h-[300px]"
                                >
                                    {activeTab === 'overview' && (
                                        <div className="space-y-10">
                                            {/* Big Stats Grid */}
                                            <div className="grid grid-cols-3 gap-3 md:gap-4">
                                                <div className="bg-gradient-to-br from-white to-blue-50 p-4 md:p-6 rounded-3xl border border-blue-100 text-center shadow-sm group hover:scale-105 transition-transform">
                                                    <h4 className="text-3xl md:text-4xl font-game font-bold text-blue-600 mb-1">{displayStats.level}</h4>
                                                    <p className="text-[8px] md:text-[10px] text-blue-400 uppercase tracking-widest font-black">Level</p>
                                                </div>
                                                <div className="bg-gradient-to-br from-white to-orange-50 p-4 md:p-6 rounded-3xl border border-orange-100 text-center shadow-sm group hover:scale-105 transition-transform">
                                                    <h4 className="text-3xl md:text-4xl font-game font-bold text-orange-500 mb-1">{displayStats.streak}</h4>
                                                    <p className="text-[8px] md:text-[10px] text-orange-400 uppercase tracking-widest font-black">Streak</p>
                                                </div>
                                                <div className="bg-gradient-to-br from-white to-emerald-50 p-4 md:p-6 rounded-3xl border border-emerald-100 text-center shadow-sm group hover:scale-105 transition-transform">
                                                    <h4 className="text-3xl md:text-4xl font-game font-bold text-emerald-500 mb-1">Top 5</h4>
                                                    <p className="text-[8px] md:text-[10px] text-emerald-400 uppercase tracking-widest font-black">Rank</p>
                                                </div>
                                            </div>

                                            {/* Badges Section */}
                                            <div>
                                                <div className="flex items-center justify-between mb-8">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-1.5 h-8 bg-blue-500 rounded-full" />
                                                        <h3 className="font-black text-lg md:text-xl text-slate-800 uppercase italic">Lencana Pencapaian</h3>
                                                    </div>
                                                    <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black border border-blue-100">
                                                        3 / 8 TERBUKA
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                                                    <div className="bg-white p-6 rounded-[2rem] border-2 border-slate-50 hover:border-blue-200 transition-all cursor-help hover:bg-blue-50/30 group">
                                                        <div className="text-5xl mb-4 group-hover:scale-125 transition-transform">🌅</div>
                                                        <span className="block text-sm font-black text-slate-700 uppercase">Pejuang Subuh</span>
                                                        <p className="text-[10px] text-slate-400 font-bold mt-1">Bangun Pagi 30 Hari</p>
                                                    </div>
                                                    <div className="bg-white p-6 rounded-[2rem] border-2 border-slate-50 hover:border-blue-200 transition-all cursor-help hover:bg-blue-50/30 group">
                                                        <div className="text-5xl mb-4 group-hover:scale-125 transition-transform">📖</div>
                                                        <span className="block text-sm font-black text-slate-700 uppercase">Kutu Buku</span>
                                                        <p className="text-[10px] text-slate-400 font-bold mt-1">Belajar 50 Sesi</p>
                                                    </div>
                                                    <div className="bg-white/50 p-6 rounded-[2rem] border-2 border-dashed border-slate-200 opacity-60">
                                                        <div className="relative inline-block grayscale">
                                                            <div className="text-5xl mb-4 opacity-40">🏃</div>
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <Lock size={20} className="text-slate-400" />
                                                            </div>
                                                        </div>
                                                        <span className="block text-sm font-black text-slate-400 uppercase italic">Atlet Sekolah</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'inventory' && (
                                        <div className="space-y-10">
                                            <div>
                                                <div className="flex items-center gap-3 mb-8">
                                                    <div className="w-1.5 h-8 bg-amber-500 rounded-full" />
                                                    <h3 className="font-black text-lg md:text-xl text-slate-800 uppercase italic">Bingkai Avatar</h3>
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                                                    <div className="bg-blue-50 md:p-6 p-4 rounded-[2.5rem] border-4 border-blue-200 flex flex-col items-center group relative overflow-hidden ring-4 ring-offset-4 ring-blue-500/20">
                                                        <div className="w-16 h-16 rounded-full bg-slate-200 border-4 border-white mb-4 shadow-md" />
                                                        <span className="text-xs font-black text-blue-800 uppercase">AKTIF</span>
                                                    </div>
                                                    <div className="bg-slate-50 md:p-6 p-4 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center group opacity-50 grayscale hover:grayscale-0 transition-all cursor-not-allowed">
                                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 mb-4 shadow-md flex items-center justify-center">
                                                            <Lock size={20} className="text-white" />
                                                        </div>
                                                        <span className="text-xs font-black text-slate-500 uppercase">TERKUNCI</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'edit' && (
                                        <div className="max-w-xl mx-auto space-y-8 p-4">
                                            {/* Security Box */}
                                            <div className="bg-slate-50/80 rounded-[2rem] p-6 md:p-8 border border-white shadow-inner">
                                                <h3 className="font-black text-slate-800 uppercase italic mb-6 flex items-center gap-2">
                                                    <Shield size={20} className="text-blue-500" /> Ubah Password
                                                </h3>

                                                {showSuccessMessage && (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl flex items-center gap-3 text-sm font-bold"
                                                    >
                                                        <Check size={18} /> Password Berhasil Diubah!
                                                    </motion.div>
                                                )}

                                                <form onSubmit={handlePasswordSubmit} className="space-y-5">
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Password Saat Ini</label>
                                                        <div className="relative">
                                                            <input
                                                                type={showCurrentPassword ? 'text' : 'password'}
                                                                value={data.current_password}
                                                                onChange={(e) => setData('current_password', e.target.value)}
                                                                className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 text-slate-800 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold placeholder:text-slate-300"
                                                                placeholder="••••••••"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500"
                                                            >
                                                                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                            </button>
                                                        </div>
                                                        {errors.current_password && <p className="text-xs text-red-500 font-bold ml-4 mt-1">{errors.current_password}</p>}
                                                    </div>

                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Password Baru</label>
                                                        <div className="relative">
                                                            <input
                                                                type={showNewPassword ? 'text' : 'password'}
                                                                value={data.password}
                                                                onChange={(e) => setData('password', e.target.value)}
                                                                className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 text-slate-800 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold placeholder:text-slate-300"
                                                                placeholder="Min. 8 karakter"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500"
                                                            >
                                                                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                            </button>
                                                        </div>
                                                        {errors.password && <p className="text-xs text-red-500 font-bold ml-4 mt-1">{errors.password}</p>}
                                                    </div>

                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Konfirmasi Password</label>
                                                        <div className="relative">
                                                            <input
                                                                type={showConfirmPassword ? 'text' : 'password'}
                                                                value={data.password_confirmation}
                                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                                className="w-full bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 text-slate-800 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold placeholder:text-slate-300"
                                                                placeholder="Ketik ulang"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500"
                                                            >
                                                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <button
                                                        type="submit"
                                                        disabled={processing}
                                                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-3xl transition shadow-xl shadow-blue-200 disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
                                                    >
                                                        {processing ? 'Menyimpan...' : (
                                                            <>
                                                                <Lock size={18} /> Simpan Password Baru
                                                            </>
                                                        )}
                                                    </button>
                                                </form>
                                            </div>

                                            {/* Read-Only Info */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email Siswa</span>
                                                    <span className="font-bold text-slate-700 truncate italic">{currentUser?.email || '-'}</span>
                                                </div>
                                                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status Agama</span>
                                                    <span className="font-bold text-slate-700 italic">{getReligionLabel(currentUser?.religion)}</span>
                                                </div>
                                            </div>

                                            <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100 text-center">
                                                <p className="text-xs font-bold text-blue-800 leading-relaxed italic">
                                                    *Untuk mengubah data utama (Nama, NIS, Email), silakan hubungi Guru Wali Kelas Anda.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-12 text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] italic">
                        SI HEBAT &bull; PELAJAR BERKARAKTER &bull; {new Date().getFullYear()}
                    </div>
                </main>
            </div>
        </StudentLayout>
    );
}
