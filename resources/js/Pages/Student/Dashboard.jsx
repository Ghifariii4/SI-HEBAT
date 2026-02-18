import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Sun, Dumbbell, Apple, BookOpen, Users, Moon, Heart,
    TrendingUp, Flame, Crown, Coins, Target, Award,
    Calendar, Star, Zap, ChevronRight, Bell
} from 'lucide-react';
import { useState, useMemo } from 'react';
import StudentLayout from '@/Layouts/StudentLayout';
import Lottie from 'lottie-react';

// Import Animations
import Fire_1 from '../../../../public/Streak/Fire_1.json';
import Fire_2 from '../../../../public/Streak/Fire_2.json';
import Fire_3 from '../../../../public/Streak/Fire_3.json';
import Fire_4 from '../../../../public/Streak/Fire_4.json';
import Fire_5 from '../../../../public/Streak/Fire_5.json';
import MascotAnimation from '../../../../public/Mascot/main_character.json';

export default function Dashboard({ auth = { user: {} }, stats = {}, leaderboard = [], tasks = [] }) {
    const [chartPeriod, setChartPeriod] = useState('week');

    // Pastikan user ada
    const user = auth?.user || {};

    // Default stats
    const defaultStats = {
        level: 12,
        xp: 2450,
        xpToNextLevel: 3000,
        coins: 1250,
        stars: 145,
        streak: 7,
        todayXP: 150,
        weeklyXP: [120, 180, 150, 200, 170, 220, 150],
        monthlyXP: [850, 920, 1100, 1050],
        rank: 'Bintang Kelas',
        rankProgress: 65,
        ...stats
    };

    const streakAnimation = useMemo(() => {
        const s = defaultStats.streak;
        if (s >= 101) return Fire_5;
        if (s >= 31) return Fire_4;
        if (s >= 8) return Fire_3;
        if (s >= 4) return Fire_2;
        if (s >= 1) return Fire_1;
        return null;
    }, [defaultStats.streak]);

    const habits = [
        {
            name: 'Bangun Pagi',
            icon: Sun,
            color: 'from-orange-400 to-yellow-400',
            href: '/siswa/habit/bangun',
            description: 'Mulai hari dengan segar',
            completed: true,
            xp: 50
        },
        {
            name: 'Beribadah',
            icon: Heart,
            color: 'from-blue-400 to-cyan-400',
            href: '/siswa/habit/beribadah',
            description: 'Dekat dengan Tuhan',
            completed: true,
            xp: 50
        },
        {
            name: 'Olahraga',
            icon: Dumbbell,
            color: 'from-red-400 to-pink-400',
            href: '/siswa/habit/olahraga',
            description: 'Jaga kesehatan fisik',
            completed: false,
            xp: 0
        },
        {
            name: 'Makan Sehat',
            icon: Apple,
            color: 'from-green-400 to-emerald-400',
            href: '/siswa/habit/makan',
            description: 'Nutrisi seimbang',
            completed: true,
            xp: 25
        },
        {
            name: 'Gemar Belajar',
            icon: BookOpen,
            color: 'from-purple-400 to-violet-400',
            href: '/siswa/habit/belajar',
            description: 'Tingkatkan pengetahuan',
            completed: false,
            xp: 0
        },
        {
            name: 'Sosial',
            icon: Users,
            color: 'from-indigo-400 to-blue-400',
            href: '/siswa/habit/sosial',
            description: 'Peduli sesama',
            completed: false,
            xp: 0
        },
        {
            name: 'Tidur Cukup',
            icon: Moon,
            color: 'from-slate-600 to-zinc-600',
            href: '/siswa/habit/tidur',
            description: 'Istirahat optimal',
            completed: false,
            xp: 0
        },
    ];

    const streakDays = [
        { day: 'S', status: 'complete' },
        { day: 'S', status: 'complete' },
        { day: 'R', status: 'missed' },
        { day: 'K', status: 'partial' },
        { day: 'J', status: 'complete' },
        { day: 'S', status: 'complete' },
        { day: 'M', status: 'today' },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    // Calculate XP percentage
    const xpPercentage = (defaultStats.xp / defaultStats.xpToNextLevel) * 100;
    const completedHabits = habits.filter(h => h.completed).length;

    return (
        <StudentLayout user={user}>
            <Head title="Dashboard - Si Hebat" />

            <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
                {/* Header Stats Bar */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white border-b border-green-100 sticky top-0 z-30 shadow-sm"
                >
                    <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                            {/* User Info */}
                            <Link href={route('student.profile')} className="flex items-center gap-4 group cursor-pointer">
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 p-0.5 group-hover:scale-105 transition-transform">
                                        <img
                                            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.full_name}&background=10b981&color=fff`}
                                            className="w-full h-full rounded-2xl object-cover"
                                            alt={user?.full_name}
                                        />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                        <span className="text-[10px] font-black text-white">{defaultStats.level}</span>
                                    </div>
                                </div>
                                <div className="group-hover:translate-x-1 transition-transform">
                                    <h2 className="font-black text-gray-900 text-lg">Halo, {user?.full_name?.split(' ')[0]}! 👋</h2>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Level {defaultStats.level}</span>
                                        <span className="text-xs text-gray-500">{defaultStats.rank}</span>
                                    </div>
                                </div>
                            </Link>

                            {/* Quick Stats */}
                            <div className="flex items-center gap-3">
                                <Link href={route('student.shop')} className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 px-4 py-2 rounded-xl hover:shadow-md transition group">
                                    <Coins className="text-yellow-500 group-hover:rotate-12 transition-transform" size={20} />
                                    <span className="font-black text-gray-700">{defaultStats.coins.toLocaleString()}</span>
                                </Link>

                                <div className="flex items-center gap-2 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 px-4 py-2 rounded-xl">
                                    <Star className="text-purple-500 fill-purple-500" size={20} />
                                    <span className="font-black text-gray-700">{defaultStats.stars}</span>
                                </div>

                                <div className="flex items-center gap-2 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 px-4 py-2 rounded-xl">
                                    <div className="w-6 h-6 flex items-center justify-center">
                                        {streakAnimation ? (
                                            <Lottie animationData={streakAnimation} loop={true} className="w-10 h-10" />
                                        ) : (
                                            <Flame className="text-gray-400" size={20} />
                                        )}
                                    </div>
                                    <span className="font-black text-gray-700">{defaultStats.streak} hari</span>
                                </div>
                            </div>
                        </div>

                        {/* XP Progress Bar */}
                        <div className="mt-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-gray-600">Progress ke Level {defaultStats.level + 1}</span>
                                <span className="text-xs font-bold text-green-600">{defaultStats.xp} / {defaultStats.xpToNextLevel} XP</span>
                            </div>
                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${xpPercentage}%` }}
                                    transition={{ duration: 1, delay: 0.3 }}
                                    className="h-full bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-full relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto p-4 md:p-6 pb-24">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                    >
                        {/* Left Column - Main Content */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Today's Progress Card */}
                            <motion.div variants={item} className="bg-white rounded-3xl p-6 shadow-lg border border-green-100">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="font-black text-xl text-gray-900 flex items-center gap-2">
                                            <Target className="text-green-500" size={24} />
                                            Progress Hari Ini
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {completedHabits} dari 7 kebiasaan selesai
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-black text-green-600">+{defaultStats.todayXP}</div>
                                        <div className="text-xs text-gray-500">XP Hari Ini</div>
                                    </div>
                                </div>

                                {/* Circular Progress */}
                                <div className="flex items-center justify-center mb-6">
                                    <div className="relative w-40 h-40">
                                        <svg className="transform -rotate-90 w-40 h-40">
                                            <circle
                                                cx="80"
                                                cy="80"
                                                r="70"
                                                stroke="currentColor"
                                                strokeWidth="12"
                                                fill="transparent"
                                                className="text-gray-100"
                                            />
                                            <motion.circle
                                                cx="80"
                                                cy="80"
                                                r="70"
                                                stroke="currentColor"
                                                strokeWidth="12"
                                                fill="transparent"
                                                strokeDasharray={`${2 * Math.PI * 70}`}
                                                initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                                                animate={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - completedHabits / 7) }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                className="text-green-500"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="text-4xl font-black text-gray-900">{Math.round((completedHabits / 7) * 100)}%</div>
                                                <div className="text-xs text-gray-500">Selesai</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Habit Quick Links */}
                                <div className="grid grid-cols-7 gap-2">
                                    {habits.map((habit, idx) => (
                                        <a
                                            key={idx}
                                            href={habit.href}
                                            className="group relative"
                                        >
                                            <div className={`aspect-square rounded-2xl bg-gradient-to-br ${habit.color} p-3 flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg ${habit.completed ? 'opacity-100' : 'opacity-40'}`}>
                                                <habit.icon className="text-white" size={20} />
                                            </div>
                                            {habit.completed && (
                                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                                    <span className="text-white text-xs">✓</span>
                                                </div>
                                            )}
                                        </a>
                                    ))}
                                </div>
                            </motion.div>

                            {/* XP Chart */}
                            <motion.div variants={item} className="bg-white rounded-3xl p-6 shadow-lg border border-green-100">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h3 className="font-black text-lg text-gray-900 flex items-center gap-2">
                                            <TrendingUp className="text-green-500" size={20} />
                                            Statistik XP
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1">Perkembangan perolehan XP kamu</p>
                                    </div>
                                    <div className="flex bg-gray-100 p-1 rounded-xl gap-1">
                                        <button
                                            onClick={() => setChartPeriod('week')}
                                            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${chartPeriod === 'week'
                                                ? 'bg-white shadow-sm text-green-600'
                                                : 'text-gray-500 hover:text-gray-700'
                                                }`}
                                        >
                                            Minggu
                                        </button>
                                        <button
                                            onClick={() => setChartPeriod('month')}
                                            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${chartPeriod === 'month'
                                                ? 'bg-white shadow-sm text-green-600'
                                                : 'text-gray-500 hover:text-gray-700'
                                                }`}
                                        >
                                            Bulan
                                        </button>
                                    </div>
                                </div>

                                {/* Line Chart */}
                                <div className="relative h-64">
                                    <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                                        {/* Grid Lines */}
                                        {[0, 1, 2, 3, 4].map((i) => (
                                            <line
                                                key={i}
                                                x1="0"
                                                y1={i * 50}
                                                x2="400"
                                                y2={i * 50}
                                                stroke="#f0f0f0"
                                                strokeWidth="1"
                                            />
                                        ))}

                                        {/* Line Chart Path */}
                                        {chartPeriod === 'week' && (
                                            <>
                                                <motion.path
                                                    d={`M 0,${200 - (defaultStats.weeklyXP[0] / 250) * 200} 
                                                        L 66.67,${200 - (defaultStats.weeklyXP[1] / 250) * 200} 
                                                        L 133.33,${200 - (defaultStats.weeklyXP[2] / 250) * 200} 
                                                        L 200,${200 - (defaultStats.weeklyXP[3] / 250) * 200} 
                                                        L 266.67,${200 - (defaultStats.weeklyXP[4] / 250) * 200} 
                                                        L 333.33,${200 - (defaultStats.weeklyXP[5] / 250) * 200} 
                                                        L 400,${200 - (defaultStats.weeklyXP[6] / 250) * 200}`}
                                                    fill="none"
                                                    stroke="url(#gradient)"
                                                    strokeWidth="3"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    initial={{ pathLength: 0 }}
                                                    animate={{ pathLength: 1 }}
                                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                                />
                                                <motion.path
                                                    d={`M 0,${200 - (defaultStats.weeklyXP[0] / 250) * 200} 
                                                        L 66.67,${200 - (defaultStats.weeklyXP[1] / 250) * 200} 
                                                        L 133.33,${200 - (defaultStats.weeklyXP[2] / 250) * 200} 
                                                        L 200,${200 - (defaultStats.weeklyXP[3] / 250) * 200} 
                                                        L 266.67,${200 - (defaultStats.weeklyXP[4] / 250) * 200} 
                                                        L 333.33,${200 - (defaultStats.weeklyXP[5] / 250) * 200} 
                                                        L 400,${200 - (defaultStats.weeklyXP[6] / 250) * 200}
                                                        L 400,200 L 0,200 Z`}
                                                    fill="url(#gradientFill)"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 1, delay: 0.5 }}
                                                />
                                                {defaultStats.weeklyXP.map((xp, idx) => (
                                                    <motion.circle
                                                        key={idx}
                                                        cx={(idx * 400) / 6}
                                                        cy={200 - (xp / 250) * 200}
                                                        r="5"
                                                        fill="#10b981"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ duration: 0.3, delay: 0.5 + idx * 0.1 }}
                                                    />
                                                ))}
                                            </>
                                        )}

                                        {chartPeriod === 'month' && (
                                            <>
                                                <motion.path
                                                    d={`M 0,${200 - (defaultStats.monthlyXP[0] / 1200) * 200} 
                                                        L 133.33,${200 - (defaultStats.monthlyXP[1] / 1200) * 200} 
                                                        L 266.67,${200 - (defaultStats.monthlyXP[2] / 1200) * 200} 
                                                        L 400,${200 - (defaultStats.monthlyXP[3] / 1200) * 200}`}
                                                    fill="none"
                                                    stroke="url(#gradient)"
                                                    strokeWidth="3"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    initial={{ pathLength: 0 }}
                                                    animate={{ pathLength: 1 }}
                                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                                />
                                                <motion.path
                                                    d={`M 0,${200 - (defaultStats.monthlyXP[0] / 1200) * 200} 
                                                        L 133.33,${200 - (defaultStats.monthlyXP[1] / 1200) * 200} 
                                                        L 266.67,${200 - (defaultStats.monthlyXP[2] / 1200) * 200} 
                                                        L 400,${200 - (defaultStats.monthlyXP[3] / 1200) * 200}
                                                        L 400,200 L 0,200 Z`}
                                                    fill="url(#gradientFill)"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 1, delay: 0.5 }}
                                                />
                                                {defaultStats.monthlyXP.map((xp, idx) => (
                                                    <motion.circle
                                                        key={idx}
                                                        cx={(idx * 400) / 3}
                                                        cy={200 - (xp / 1200) * 200}
                                                        r="5"
                                                        fill="#10b981"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ duration: 0.3, delay: 0.5 + idx * 0.1 }}
                                                    />
                                                ))}
                                            </>
                                        )}

                                        {/* Gradient Definitions */}
                                        <defs>
                                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#10b981" />
                                                <stop offset="100%" stopColor="#14b8a6" />
                                            </linearGradient>
                                            <linearGradient id="gradientFill" x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                                                <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
                                            </linearGradient>
                                        </defs>
                                    </svg>

                                    {/* X-Axis Labels */}
                                    <div className="flex justify-between mt-2 px-2">
                                        {chartPeriod === 'week'
                                            ? ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day, idx) => (
                                                <span key={idx} className="text-xs font-bold text-gray-400">{day}</span>
                                            ))
                                            : ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'].map((week, idx) => (
                                                <span key={idx} className="text-xs font-bold text-gray-400">{week}</span>
                                            ))
                                        }
                                    </div>
                                </div>
                            </motion.div>

                            {/* 7 Habits Grid */}
                            <motion.div variants={item}>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-black text-lg text-gray-900 flex items-center gap-2">
                                        <Zap className="text-green-500" size={20} />
                                        7 Kebiasaan Hebat
                                    </h3>
                                    <span className="text-xs text-gray-500">{completedHabits}/7 selesai hari ini</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {habits.map((habit, idx) => (
                                        <motion.div
                                            key={idx}
                                            variants={item}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <a
                                                href={habit.href}
                                                className="block bg-white rounded-2xl p-5 border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${habit.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                                        <habit.icon className="text-white" size={24} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-black text-gray-900">{habit.name}</h4>
                                                        <p className="text-xs text-gray-500 mt-0.5">{habit.description}</p>
                                                        {habit.completed && (
                                                            <div className="flex items-center gap-1 mt-1">
                                                                <span className="text-xs font-bold text-green-600">+{habit.xp} XP</span>
                                                                <span className="text-green-500">✓</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <ChevronRight className="text-gray-300 group-hover:text-green-500 transition-colors" size={20} />
                                                </div>
                                            </a>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="space-y-6">

                            {/* Streak Card */}
                            <motion.div variants={item} className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-6 text-white shadow-lg overflow-hidden relative">
                                <div className="absolute -right-4 -top-4 w-32 h-32 opacity-20 transform rotate-12">
                                    {streakAnimation && <Lottie animationData={streakAnimation} loop={true} />}
                                </div>
                                <div className="flex items-center justify-between mb-4 relative z-10">
                                    <h3 className="font-black text-lg flex items-center gap-2">
                                        {streakAnimation ? (
                                            <div className="w-8 h-8 flex items-center justify-center">
                                                <Lottie animationData={streakAnimation} loop={true} className="w-12 h-12" />
                                            </div>
                                        ) : (
                                            <Flame size={20} />
                                        )}
                                        Streak
                                    </h3>
                                    <div className="text-3xl font-black">{defaultStats.streak}</div>
                                </div>
                                <p className="text-sm opacity-90 mb-4 relative z-10">Hari berturut-turut kamu konsisten!</p>

                                {/* Streak Calendar */}
                                <div className="grid grid-cols-7 gap-2">
                                    {streakDays.map((day, idx) => (
                                        <div key={idx} className="text-center">
                                            <div className="text-[10px] font-bold opacity-70 mb-1">{day.day}</div>
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold ${day.status === 'complete' ? 'bg-white/30 border-2 border-white' :
                                                    day.status === 'today' ? 'bg-white text-orange-500 border-2 border-white' :
                                                        day.status === 'partial' ? 'bg-white/10 border border-white/30' :
                                                            'bg-white/5 border border-white/20'
                                                    }`}
                                            >
                                                {day.status === 'complete' ? '✓' :
                                                    day.status === 'today' ? '●' :
                                                        day.status === 'partial' ? '◐' : '○'}
                                            </motion.div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Rank Card */}
                            <motion.div variants={item} className="bg-white rounded-3xl p-6 shadow-lg border border-green-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-black text-gray-900 flex items-center gap-2">
                                        <Award className="text-green-500" size={20} />
                                        Rank Semester
                                    </h3>
                                </div>
                                <div className="text-center mb-4">
                                    <div className="text-2xl font-black text-green-600 mb-1">{defaultStats.rank}</div>
                                    <div className="text-xs text-gray-500">Progress ke tier berikutnya</div>
                                </div>
                                <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${defaultStats.rankProgress}%` }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                                    />
                                </div>
                                <div className="text-xs text-gray-500 text-center">{defaultStats.rankProgress}% menuju Siswa Teladan</div>
                            </motion.div>

                            {/* Leaderboard */}
                            <motion.div variants={item} className="bg-white rounded-3xl p-6 shadow-lg border border-green-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-black text-gray-900 flex items-center gap-2">
                                        <Crown className="text-yellow-500" size={20} />
                                        Top Hari Ini
                                    </h3>
                                    <Link href={route('student.leaderboard')} className="text-xs font-bold text-green-600 hover:underline flex items-center gap-1">
                                        Lihat Semua <ChevronRight size={14} />
                                    </Link>
                                </div>

                                <div className="space-y-3">
                                    {/* Top 1 */}
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200">
                                        <div className="font-black text-yellow-500 text-lg w-6">1</div>
                                        <div className="relative">
                                            <img src="https://ui-avatars.com/api/?name=Siti+Aminah&background=eab308&color=fff" className="w-10 h-10 rounded-xl" alt="Top 1" />
                                            <Crown className="text-yellow-500 absolute -top-2 -right-1" size={14} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-gray-800">Dedi Dambudi</p>
                                            <p className="text-xs text-gray-500">+450 XP</p>
                                        </div>
                                    </div>

                                    {/* Top 2 */}
                                    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition">
                                        <div className="font-bold text-gray-400 text-sm w-6">2</div>
                                        <img src="https://ui-avatars.com/api/?name=Rizky+B&background=6366f1&color=fff" className="w-10 h-10 rounded-xl" alt="Top 2" />
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-gray-800">Rizky B.</p>
                                            <p className="text-xs text-gray-500">+320 XP</p>
                                        </div>
                                    </div>

                                    {/* User Position */}
                                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-200">
                                        <div className="font-bold text-green-600 text-sm w-6">5</div>
                                        <img src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.full_name}&background=10b981&color=fff`} className="w-10 h-10 rounded-xl" alt="You" />
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-gray-800">Kamu</p>
                                            <p className="text-xs text-gray-500">+{defaultStats.todayXP} XP</p>
                                        </div>
                                        <TrendingUp className="text-green-500" size={16} />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Shop Promo */}
                            <motion.div
                                variants={item}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link
                                    href={route('student.shop')}
                                    className="block bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
                                    <div className="relative">
                                        <div className="text-4xl mb-3">🎨</div>
                                        <h4 className="font-black text-lg mb-2">Toko Kustomisasi</h4>
                                        <p className="text-sm opacity-90 mb-4">Beli border, banner, dan avatar keren dengan koin kamu!</p>
                                        <div className="inline-flex items-center gap-2 bg-white text-purple-600 px-4 py-2 rounded-xl font-bold text-sm hover:scale-105 transition">
                                            Belanja Sekarang <ChevronRight size={16} />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
            {/* Mascot Sticky */}
            <div className="fixed bottom-20 md:bottom-2 left-2 md:left-[16.2rem] z-[40]">
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 1 }}
                    className="relative group cursor-pointer"
                >
                    {/* Speech Bubble */}
                    <div className="absolute -top-16 left-12 w-48 bg-white p-3 rounded-2xl shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform -translate-y-2 group-hover:translate-y-0">
                        <p className="text-xs font-bold text-gray-700 leading-tight">
                            Semangat belajarnya hari ini, {user?.full_name?.split(' ')[0]}! Ayo selesaikan tantanganmu!
                        </p>
                        {/* Triangle for Bubble */}
                        <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white border-b border-r border-gray-100 rotate-45"></div>
                    </div>

                    {/* Mascot Lottie */}
                    <div className="w-32 h-32 transform group-hover:scale-110 transition-transform">
                        <Lottie
                            animationData={MascotAnimation}
                            loop={true}
                        />
                    </div>
                </motion.div>
            </div>
        </StudentLayout>
    );
}
