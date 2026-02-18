import StudentLayout from '@/Layouts/StudentLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, BookOpen, Heart, Lock, Eye, EyeOff, Check, AlertCircle, Flame, TrendingUp, Award, Zap, Calendar, MapPin, Link as LinkIcon, Phone, Shield, AlertTriangle } from 'lucide-react';
import Lottie from 'lottie-react';
import Fire_1 from '../../../../public/Streak/Fire_1.json';
import Fire_2 from '../../../../public/Streak/Fire_2.json';
import Fire_3 from '../../../../public/Streak/Fire_3.json';
import Fire_4 from '../../../../public/Streak/Fire_4.json';
import Fire_5 from '../../../../public/Streak/Fire_5.json';
import HeroAnimation from '../../../../public/Mascot/Hero.json';

export default function Profile({ auth = { user: {} }, user = {}, status, stats = {} }) {
    const currentUser = user || auth?.user || {};
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // Default stats dari dashboard
    const defaultStats = {
        level: 12,
        xp: 2450,
        xpToNextLevel: 3000,
        coins: 1250,
        stars: 145,
        streak: 7,
        rank: 'Bintang Kelas',
        rankProgress: 65,
        weeklyActivities: [
            { day: 'S', active: true },
            { day: 'S', active: true },
            { day: 'R', active: false },
            { day: 'K', active: true },
            { day: 'J', active: true },
            { day: 'S', active: true },
            { day: 'M', active: true },
        ],
        ...stats
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const streakAnimation = useMemo(() => {
        const s = defaultStats.streak;
        if (s >= 101) return Fire_5;
        if (s >= 31) return Fire_4;
        if (s >= 8) return Fire_3;
        if (s >= 4) return Fire_2;
        if (s >= 1) return Fire_1;
        return null;
    }, [defaultStats.streak]);

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        post(route('student.profile.updatePassword'), {
            onSuccess: () => {
                reset();
                setShowPasswordForm(false);
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

    const xpPercentage = (defaultStats.xp / defaultStats.xpToNextLevel) * 100;

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <StudentLayout user={currentUser}>
            <Head title="Profil Saya - Si Hebat" />

            <div className="min-h-screen relative bg-gradient-to-b from-indigo-100 via-purple-50 to-pink-50 p-4 md:p-8 pb-24 overflow-hidden">
                {/* Main Background Decoration - Hero Character */}
                <div className="absolute bottom-0 right-0 w-full flex justify-end pointer-events-none z-0">
                    <motion.div
                        className="
                            w-full
                            scale-75
                            md:scale-100
                            lg:scale-125
                            -translate-y-20
                            md:translate-y-0
                        "
                        animate={{
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Lottie animationData={HeroAnimation} loop />
                    </motion.div>
                </div>

                {/* Decorative Background Elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                    {/* Floating Achievement Icons */}
                    <motion.div
                        className="absolute top-10 left-10 text-5xl opacity-25"
                        animate={{ y: [0, -25, 0], rotate: [0, 360] }}
                        transition={{ duration: 8, repeat: Infinity }}
                    >
                        ⭐
                    </motion.div>
                    <motion.div
                        className="absolute top-1/4 left-1/4 text-4xl opacity-20"
                        animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
                        transition={{ duration: 7, repeat: Infinity }}
                    >
                        🎯
                    </motion.div>
                    <motion.div
                        className="absolute top-32 right-20 text-4xl opacity-20"
                        animate={{ y: [0, 15, 0], rotate: [0, -15, 0] }}
                        transition={{ duration: 6, repeat: Infinity }}
                    >
                        ✨
                    </motion.div>
                    <motion.div
                        className="absolute bottom-40 left-1/3 text-6xl opacity-15"
                        animate={{ scale: [1, 1.15, 1], rotate: [0, 360] }}
                        transition={{ duration: 10, repeat: Infinity }}
                    >
                        🏅
                    </motion.div>

                    {/* Floating Clouds - Multiple for depth */}
                    <motion.div
                        className="absolute top-20 left-1/5 text-6xl opacity-25"
                        animate={{ x: [0, 50, 0], y: [0, -15, 0] }}
                        transition={{ duration: 9, repeat: Infinity }}
                    >
                        ☁️
                    </motion.div>
                    <motion.div
                        className="absolute top-2/3 right-1/4 text-5xl opacity-20"
                        animate={{ x: [0, -40, 0], y: [0, 20, 0] }}
                        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                    >
                        ☁️
                    </motion.div>
                    <motion.div
                        className="absolute top-1/3 right-10 text-4xl opacity-15"
                        animate={{ x: [0, 35, 0], y: [0, -10, 0] }}
                        transition={{ duration: 7, repeat: Infinity, delay: 2 }}
                    >
                        ☁️
                    </motion.div>

                    {/* Gradient Background Orbs */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-400/25 to-pink-400/20 rounded-full blur-3xl -mr-48 -mt-48"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-indigo-400/15 rounded-full blur-3xl -ml-40 -mb-40"></div>
                    <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-tl from-purple-300/15 to-pink-300/10 rounded-full blur-3xl"></div>

                    {/* Decorative Mountain/Wave SVG */}
                    <svg className="absolute bottom-0 left-0 w-full h-56 opacity-8" viewBox="0 0 1200 300" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#a78bfa', stopOpacity: 0.3 }} />
                                <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 0.1 }} />
                            </linearGradient>
                        </defs>
                        <polygon points="0,150 150,80 300,150 0,300 300,300" fill="url(#mountainGrad)" />
                        <polygon points="250,160 500,50 750,160 250,300 750,300" fill="url(#mountainGrad)" />
                        <polygon points="700,150 900,90 1100,150 700,300 1100,300" fill="url(#mountainGrad)" />
                    </svg>

                    {/* Floating Victory Pose - Large background silhouette */}
                    <motion.div
                        className="absolute top-0 left-1/2 -translate-x-1/2 opacity-5 mt-10"
                        animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }}
                        transition={{ duration: 7, repeat: Infinity }}
                    >
                        <div className="text-9xl">🏆</div>
                    </motion.div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="max-w-2xl mx-auto relative z-10"
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-black text-gray-900 flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                <User size={24} className="text-white" />
                            </div>
                            Profil Saya
                        </h1>
                        <p className="text-gray-500 mt-2">Kelola informasi akun dan keamanan Anda</p>
                    </motion.div>

                    {/* Success Message */}
                    {(showSuccessMessage || status) && (
                        <motion.div
                            className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg flex items-center gap-3"
                        >
                            <Check size={20} className="text-green-600" />
                            <div>
                                <p className="font-semibold text-green-800">Berhasil!</p>
                                <p className="text-green-700 text-sm">{status || 'Password berhasil diubah!'}</p>
                            </div>
                        </motion.div>
                    )}

                    {/* Main Card Header - Gradient Background */}
                    <motion.div
                        variants={itemVariants}
                        className="relative bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 rounded-3xl p-8 shadow-lg overflow-hidden mb-6"
                    >
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>

                        <div className="relative z-10">
                            {/* Header Top - Last 7 days badge */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2 bg-white/30 backdrop-blur-sm rounded-full px-3 py-1">
                                    <Calendar size={14} className="text-white" />
                                    <span className="text-xs font-semibold text-white">Last 7 days</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/30 backdrop-blur-sm rounded-full px-3 py-1">
                                    <span className="text-xs font-semibold text-white">Level {defaultStats.level}</span>
                                </div>
                            </div>

                            {/* Profile Image */}
                            <div className="flex flex-col items-center mb-6">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="relative mb-4"
                                >
                                    <div className="w-28 h-28 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                                        <img
                                            src={currentUser?.avatar || `https://ui-avatars.com/api/?name=${currentUser?.full_name}&background=10b981&color=fff&bold=true&size=120`}
                                            alt={currentUser?.full_name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full w-10 h-10 flex items-center justify-center border-3 border-white text-sm font-black text-white shadow-lg">
                                        {defaultStats.level}
                                    </div>
                                </motion.div>

                                <h1 className="text-2xl font-black text-white text-center">{currentUser?.full_name || 'User'}</h1>
                                <p className="text-sm text-white/80">{currentUser?.class_id || 'Kelas'}</p>
                            </div>

                            {/* Quick Stats Grid */}
                            <div className="grid grid-cols-3 gap-3">
                                {/* XP */}
                                <motion.div
                                    whileHover={{ y: -4 }}
                                    className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/30"
                                >
                                    <div className="flex items-center justify-center gap-1 mb-2">
                                        <Zap size={16} className="text-yellow-300" />
                                    </div>
                                    <p className="text-2xl font-black text-white">{defaultStats.xp}</p>
                                    <p className="text-xs text-white/70 mt-1">XP</p>
                                </motion.div>

                                {/* Streak */}
                                <motion.div
                                    whileHover={{ y: -4 }}
                                    className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/30"
                                >
                                    <div className="flex items-center justify-center mb-2">
                                        {streakAnimation ? (
                                            <Lottie animationData={streakAnimation} loop={true} className="w-6 h-6" />
                                        ) : (
                                            <Flame size={16} className="text-orange-300" />
                                        )}
                                    </div>
                                    <p className="text-2xl font-black text-white">{defaultStats.streak}</p>
                                    <p className="text-xs text-white/70 mt-1">Hari</p>
                                </motion.div>

                                {/* Rank */}
                                <motion.div
                                    whileHover={{ y: -4 }}
                                    className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/30"
                                >
                                    <Award size={16} className="text-amber-300 mx-auto mb-2" />
                                    <p className="text-xs font-black text-white">{defaultStats.rank}</p>
                                    <p className="text-xs text-white/70 mt-1">Rank</p>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Activities Card Section */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white rounded-3xl p-6 shadow-lg mb-6"
                    >
                        <h2 className="text-xl font-black text-gray-900 mb-4">Aktivitas Minggu Ini</h2>

                        {/* XP Progress */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-semibold text-gray-600">Progress XP</span>
                                <span className="text-sm font-bold text-purple-600">{defaultStats.xp} / {defaultStats.xpToNextLevel} XP</span>
                            </div>
                            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${xpPercentage}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full"
                                />
                            </div>
                        </div>

                        {/* Weekly Map */}
                        <div className="mb-6">
                            <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">Konsistensi Harian</p>
                            <div className="grid grid-cols-7 gap-2">
                                {defaultStats.weeklyActivities.map((day, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ scale: 1.1 }}
                                        className={`flex items-center justify-center h-10 rounded-lg font-semibold text-sm ${day.active
                                            ? 'bg-gradient-to-br from-blue-400 to-cyan-400 text-white shadow-md'
                                            : 'bg-gray-100 text-gray-400'
                                            }`}
                                    >
                                        {day.day}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Route Card */}
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-gray-600 mb-1">Rute Target</p>
                                    <p className="text-2xl font-black text-blue-600">7 hari →</p>
                                    <p className="text-xs text-gray-500 mt-2">Perjalanan menuju kebiasaan terbaik</p>
                                </div>
                                <MapPin size={32} className="text-blue-500" strokeWidth={1.5} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Profile Information Card */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white rounded-3xl shadow-lg p-6 mb-6"
                    >
                        <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                            <User size={24} className="text-blue-600" />
                            Informasi Akun
                        </h2>

                        <div className="space-y-5">
                            {/* NIS */}
                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">NIS</p>
                                        <p className="text-lg font-black text-gray-900 mt-1">{currentUser?.nis || '-'}</p>
                                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><Lock size={12} /> Nomor Induk Siswa Tidak Dapat Diubah</p>
                                    </div>
                                    <Lock size={28} className="text-blue-500" strokeWidth={1.5} />
                                </div>
                            </div>

                            {/* Full Name */}
                            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-4 border border-emerald-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama Lengkap</p>
                                        <p className="text-lg font-black text-gray-900 mt-1">{currentUser?.full_name || '-'}</p>
                                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><Phone size={12} /> Hubungi admin untuk mengubah</p>
                                    </div>
                                    <User size={28} className="text-emerald-500" strokeWidth={1.5} />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-4 border border-pink-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</p>
                                        <p className="text-lg font-black text-gray-900 mt-1 truncate">{currentUser?.email || '-'}</p>
                                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><Mail size={12} /> Email Tidak Dapat Diubah</p>
                                    </div>
                                    <Mail size={28} className="text-pink-500" strokeWidth={1.5} />
                                </div>
                            </div>

                            {/* Religion */}
                            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Agama</p>
                                        <p className="text-lg font-black text-gray-900 mt-1">{getReligionLabel(currentUser?.religion)}</p>
                                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><LinkIcon size={12} /> Terintegrasi dengan sistem</p>
                                    </div>
                                    <Heart size={28} className="text-amber-500" strokeWidth={1.5} fill="currentColor" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Security Card */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white rounded-3xl shadow-lg p-6"
                    >
                        <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                            <Lock size={24} className="text-blue-600" />
                            Keamanan Akun
                        </h2>
                        {!showPasswordForm ? (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowPasswordForm(true)}
                                className="w-full relative overflow-hidden px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-2xl font-semibold transition-all duration-300 flex items-center justify-between group"
                            >
                                <span className="flex items-center gap-2">
                                    <Lock size={18} />
                                    Ubah Password
                                </span>
                                <span className="text-sm opacity-75">Keamanan adalah prioritas</span>
                            </motion.button>
                        ) : (
                            <motion.form
                                onSubmit={handlePasswordSubmit}
                                className="space-y-5"
                            >
                                {/* Current Password */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Password Saat Ini</label>
                                    <div className="relative">
                                        <input
                                            type={showCurrentPassword ? 'text' : 'password'}
                                            value={data.current_password}
                                            onChange={(e) => setData('current_password', e.target.value)}
                                            placeholder="Masukkan password saat ini"
                                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                                        >
                                            {showCurrentPassword ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </button>
                                    </div>
                                    {errors.current_password && (
                                        <p className="text-sm text-red-500 flex items-center gap-1">
                                            <AlertCircle size={14} />
                                            {errors.current_password}
                                        </p>
                                    )}
                                </div>

                                {/* New Password */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Password Baru</label>
                                    <div className="relative">
                                        <input
                                            type={showNewPassword ? 'text' : 'password'}
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Minimal 8 karakter"
                                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                                        >
                                            {showNewPassword ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-sm text-red-500 flex items-center gap-1">
                                            <AlertCircle size={14} />
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">
                                        Konfirmasi Password Baru
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            placeholder="Ulangi password baru"
                                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password_confirmation && (
                                        <p className="text-sm text-red-500 flex items-center gap-1">
                                            <AlertCircle size={14} />
                                            {errors.password_confirmation}
                                        </p>
                                    )}
                                </div>

                                {/* Info Box */}
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
                                    <p className="font-semibold mb-2 flex items-center gap-2"><Shield size={16} /> Tips Keamanan Password:</p>
                                    <ul className="space-y-1 text-xs">
                                        <li>✓ Gunakan minimal 8 karakter</li>
                                        <li>✓ Campurkan huruf besar, kecil, angka, dan simbol</li>
                                        <li>✓ Jangan gunakan informasi pribadi</li>
                                        <li>✓ Jangan bagikan password dengan siapa pun</li>
                                    </ul>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white rounded-xl font-semibold transition-colors"
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan Password'}
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="button"
                                        onClick={() => {
                                            setShowPasswordForm(false);
                                            reset();
                                        }}
                                        className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-colors"
                                    >
                                        Batal
                                    </motion.button>
                                </div>
                            </motion.form>
                        )}

                        {/* Password Guide */}
                        <motion.div className="mt-8 pt-6 border-t border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2"><BookOpen size={16} /> Panduan Keamanan</h3>
                            <div className="space-y-3 text-sm text-gray-600">
                                <p className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold mt-0.5">✓</span>
                                    Jangan pernah membagikan password Anda kepada siapa pun
                                </p>
                                <p className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold mt-0.5">✓</span>
                                    Gunakan password yang kuat dan unik untuk akun Anda
                                </p>
                                <p className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold mt-0.5">✓</span>
                                    Ubah password secara berkala untuk keamanan maksimal
                                </p>
                                <p className="flex items-start gap-2">
                                    <span className="text-green-500 font-bold mt-0.5">✓</span>
                                    Logout dari semua perangkat setelah mengubah password
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Footer Note */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-800"
                    >
                        <p className="font-semibold mb-2 flex items-center gap-2"><AlertTriangle size={18} /> Informasi Penting</p>
                        <p>
                            Untuk mengubah data seperti NIS, nama, email, atau agama, silakan hubungi bagian administrasi sekolah.
                            Data-data tersebut terintegrasi dengan sistem utama sekolah.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </StudentLayout>
    );
}
