import React, { useState, useEffect, useMemo } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import {
    ArrowLeft, Moon, Sun, Cloud, Heart, Star,
    Check, Plus, Clock, Info, Save, MessageCircle,
    Zap, Award, TrendingUp, Sparkles
} from 'lucide-react';
import StudentLayout from '@/Layouts/StudentLayout';
import confetti from 'canvas-confetti';
import Swal from 'sweetalert2';
import Lottie from 'lottie-react';
import MedalAnimation from '../../../../../../../public/Success-Animation/MedalSuccess.json';

// Simple Counter Component for the Popup
const Counter = ({ from, to, duration = 2 }) => {
    const [count, setCount] = useState(from);

    useEffect(() => {
        const controls = animate(from, to, {
            duration,
            onUpdate(value) {
                setCount(Math.floor(value));
            },
        });
        return () => controls.stop();
    }, [from, to, duration]);

    return <span>{count}</span>;
};

export default function Sholat({ auth }) {
    const user = auth?.user || {};
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedPrayer, setSelectedPrayer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [earnedRewards, setEarnedRewards] = useState({ xp: 0, coin: 0 });

    const [prayerStatus, setPrayerStatus] = useState({
        subuh: { completed: false, sunnah: [], notes: '' },
        dzuhur: { completed: false, sunnah: [], notes: '' },
        ashar: { completed: false, sunnah: [], notes: '' },
        maghrib: { completed: false, sunnah: [], notes: '' },
        isya: { completed: false, sunnah: [], notes: '' },
    });

    const { data, setData, post, processing } = useForm({
        religion: 'islam',
        tasks: [],
        sunnah: [],
    });

    // Prayer windows: start, end in 'HH:MM', graceMins = minutes before start allowed
    const prayerWindows = {
        subuh:   { start: '04:00', end: '05:30', graceMins: 30 },
        dzuhur:  { start: '11:30', end: '14:30', graceMins: 30 },
        ashar:   { start: '14:45', end: '18:00', graceMins: 30 },
        maghrib: { start: '17:45', end: '19:30', graceMins: 30 },
        isya:    { start: '19:00', end: '03:30', graceMins: 30 }, // crosses midnight
    };

    const prayers = [
        { id: 'subuh',   name: 'Subuh',   time: '04:30 - 05:30', icon: Cloud, sunnah: ['Qobliyah'],                xp: 50 },
        { id: 'dzuhur',  name: 'Dzuhur',  time: '11:30 - 14:30', icon: Sun,   sunnah: ['Qobliyah', "Ba'diyah"],   xp: 50 },
        { id: 'ashar',   name: 'Ashar',   time: '14:45 - 18:00', icon: Sun,   sunnah: ['Qobliyah'],                xp: 50 },
        { id: 'maghrib', name: 'Maghrib', time: '17:45 - 19:30', icon: Moon,  sunnah: ['Qobliyah', "Ba'diyah"],   xp: 50 },
        { id: 'isya',    name: 'Isya',    time: '19:00 - 03:30', icon: Moon,  sunnah: ['Qobliyah', "Ba'diyah"],   xp: 50 },
    ];

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const timeString = currentTime.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    // Returns 'active' | 'not_yet' | 'passed'
    const getPrayerAvailability = (prayerId) => {
        const win = prayerWindows[prayerId];
        if (!win) return 'active';

        const now = currentTime;
        const nowMins = now.getHours() * 60 + now.getMinutes();

        const [sH, sM] = win.start.split(':').map(Number);
        const [eH, eM] = win.end.split(':').map(Number);
        const startMins = sH * 60 + sM;
        const endMins   = eH * 60 + eM;
        const allowedFrom = startMins - win.graceMins;

        // Midnight-crossing window (e.g. Isya 19:00 - 03:30)
        if (endMins < startMins) {
            if (nowMins >= allowedFrom || nowMins < endMins) return 'active';
            if (nowMins < allowedFrom) return 'not_yet';
            return 'passed';
        }

        if (nowMins >= allowedFrom && nowMins < endMins) return 'active';
        if (nowMins < allowedFrom) return 'not_yet';
        return 'passed';
    };

    const activePrayerId = useMemo(() => {
        const currentMins = currentTime.getHours() * 60 + currentTime.getMinutes();
        for (const p of prayers) {
            if (getPrayerAvailability(p.id) === 'active' && !prayerStatus[p.id].completed) {
                return p.id;
            }
        }
        return null;
    }, [currentTime, prayerStatus]);

    const handleOpenModal = (prayer) => {
        if (prayerStatus[prayer.id].completed) return;

        const availability = getPrayerAvailability(prayer.id);
        if (availability === 'not_yet') {
            Swal.fire({
                icon: 'info',
                title: `Belum Waktunya`,
                text: `Waktu sholat ${prayer.name} belum tiba. Buka aplikasi saat waktunya tiba ya! 🕌`,
                confirmButtonColor: '#10b981',
            });
            return;
        }
        if (availability === 'passed') {
            Swal.fire({
                icon: 'warning',
                title: `Waktu Sudah Lewat`,
                text: `Waktu sholat ${prayer.name} sudah berakhir. Semoga bisa lebih tepat waktu besok! 💪`,
                confirmButtonColor: '#10b981',
            });
            return;
        }

        setSelectedPrayer(prayer);
        setIsModalOpen(true);
    };

    const handleSave = () => {
        const updatedTasks = [...data.tasks, selectedPrayer.id];
        
        router.post(route('student.habit.store', 'beribadah'), {
            religion: 'islam',
            tasks: updatedTasks,
            sunnah: data.sunnah, // Option, for now just empty or handled via tri-state
        }, {
            onStart: () => {
                setIsModalOpen(false);
                Swal.fire({
                    title: 'Mencatat Ibadah...',
                    allowOutsideClick: false,
                    didOpen: () => { Swal.showLoading(); }
                });
            },
            onSuccess: (page) => {
                Swal.close();
                const flash = page.props.flash || {};
                const xp = flash.xp_earned || 0;
                const coin = flash.koin_earned || 0;
                
                setEarnedRewards({ xp, coin });
                setPrayerStatus(prev => ({
                    ...prev,
                    [selectedPrayer.id]: {
                        ...prev[selectedPrayer.id],
                        completed: true
                    }
                }));
                setData('tasks', updatedTasks);

                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#10b981', '#fbbf24', '#ffffff']
                });

                setShowSuccessPopup(true);
            },
            onError: (errors) => {
                Swal.close();
                Swal.fire('Gagal', errors.error || 'Terjadi kesalahan', 'error');
            }
        });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <StudentLayout user={user}>
            <Head title="Jurnal Ibadah Islam - Si Hebat" />

            <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 relative overflow-hidden">
                {/* Spiritual Decorations */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, 0]
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-20 left-10 text-white"
                    >
                        <Moon size={64} fill="white" />
                    </motion.div>
                </div>

                {/* Navbar */}
                <nav className="p-6 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('student.habit.ibadah.islam')}
                            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition border border-white/30"
                        >
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-white font-black text-xl drop-shadow-md">Ibadah Sholat</h1>
                            <p className="text-emerald-100 text-xs font-bold">Jaga hubunganmu dengan Allah ✨</p>
                        </div>
                    </div>
                </nav>

                <div className="max-w-xl mx-auto px-6 pb-24 relative z-10">
                    {/* Live Clock Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-3xl p-8 mb-8 text-center text-white shadow-2xl relative overflow-hidden group"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-50"></div>
                        <div className="text-xs font-bold uppercase tracking-[0.2em] mb-2 text-emerald-200">Waktu Saat Ini</div>
                        <div className="text-5xl font-black tracking-tighter drop-shadow-lg mb-1">{timeString}</div>
                        <div className="text-xs font-medium text-white/60">Waktu Indonesia Barat (WIB)</div>

                        {/* Current Prayer Indicator */}
                        {activePrayerId && (
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="mt-6 inline-flex items-center gap-2 bg-emerald-500/30 border border-emerald-400/30 px-4 py-2 rounded-2xl text-emerald-50 font-bold text-sm"
                            >
                                <Sparkles size={16} className="animate-pulse" />
                                Waktunya Sholat {prayers.find(p => p.id === activePrayerId)?.name}
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Prayer Cards Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-4"
                    >
                        {prayers.map((prayer) => {
                            const status = prayerStatus[prayer.id];
                            const isActive = activePrayerId === prayer.id;
                            const availability = getPrayerAvailability(prayer.id);
                            const isLocked = !status.completed && availability === 'not_yet';
                            const isPassed = !status.completed && availability === 'passed';

                            return (
                                <motion.div
                                    key={prayer.id}
                                    variants={itemVariants}
                                    whileHover={!status.completed && !isLocked ? { scale: 1.02, x: 5 } : {}}
                                    whileTap={!status.completed && !isLocked ? { scale: 0.98 } : {}}
                                    onClick={() => handleOpenModal(prayer)}
                                    className={`relative group cursor-pointer rounded-3xl p-5 border-2 transition-all duration-300 ${
                                        status.completed
                                            ? 'bg-white border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.2)]'
                                            : isActive
                                                ? 'bg-white border-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.3)] animate-pulse shadow-emerald-400/20'
                                                : isLocked
                                                    ? 'bg-white/50 backdrop-blur-md border-gray-200 opacity-70'
                                                    : isPassed
                                                        ? 'bg-white/40 backdrop-blur-md border-red-100 opacity-60'
                                                        : 'bg-white/80 backdrop-blur-md border-transparent hover:border-white/50 shadow-lg'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-5">
                                            {/* Icon */}
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-inner ${
                                                status.completed
                                                    ? 'bg-green-100 text-green-600 rotate-[360deg]'
                                                    : isActive
                                                        ? 'bg-emerald-500 text-white shadow-emerald-200'
                                                        : isLocked
                                                            ? 'bg-gray-100 text-gray-300'
                                                            : isPassed
                                                                ? 'bg-red-50 text-red-300'
                                                                : 'bg-gray-100 text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-500'
                                            }`}>
                                                <prayer.icon size={28} />
                                            </div>

                                            {/* Details */}
                                            <div>
                                                <h3 className={`font-black text-lg ${status.completed ? 'text-green-700' : isLocked || isPassed ? 'text-gray-400' : 'text-gray-800'}`}>
                                                    {prayer.name}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                                        isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500'
                                                    }`}>
                                                        {prayer.time}
                                                    </span>
                                                    {status.completed && (
                                                        <span className="text-[10px] font-bold bg-green-100 text-green-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                                                            <Award size={10} /> +{prayer.xp} XP
                                                        </span>
                                                    )}
                                                    {isLocked && (
                                                        <span className="text-[10px] font-bold bg-blue-50 text-blue-400 px-2 py-0.5 rounded-full">
                                                            🔒 Belum Waktunya
                                                        </span>
                                                    )}
                                                    {isPassed && (
                                                        <span className="text-[10px] font-bold bg-red-50 text-red-400 px-2 py-0.5 rounded-full">
                                                            ⏰ Sudah Lewat
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status Indicator */}
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                                            status.completed
                                                ? 'bg-green-500 border-green-500 text-white scale-110 shadow-lg shadow-green-200'
                                                : isActive
                                                    ? 'border-emerald-400 text-emerald-500 bg-emerald-50'
                                                    : isLocked
                                                        ? 'border-gray-200 text-gray-200 bg-gray-50'
                                                        : isPassed
                                                            ? 'border-red-100 text-red-200 bg-red-50'
                                                            : 'border-gray-200 text-gray-300'
                                        }`}>
                                            {status.completed ? <Check size={20} strokeWidth={3} /> : <Plus size={20} />}
                                        </div>
                                    </div>

                                    {/* Active Pulse Glow */}
                                    {isActive && !status.completed && (
                                        <div className="absolute -inset-1 rounded-[2.2rem] bg-emerald-400 opacity-20 blur-md pointer-events-none"></div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>

            {/* Input Modal */}
            <AnimatePresence>
                {isModalOpen && selectedPrayer && (
                    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-emerald-950/60 backdrop-blur-sm"
                        ></motion.div>

                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="bg-white w-full max-w-lg rounded-t-[3rem] sm:rounded-[3rem] shadow-2xl relative z-10 overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-8 text-white relative">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <selectedPrayer.icon size={120} />
                                </div>
                                <div className="relative flex items-center gap-6">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
                                        <selectedPrayer.icon size={32} />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black">Sholat {selectedPrayer.name}</h2>
                                        <p className="text-emerald-100 font-bold flex items-center gap-2 mt-1">
                                            <Clock size={16} /> {selectedPrayer.time} WIB
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="space-y-6">
                                    {/* Main Checkbox */}
                                    <div
                                        onClick={() => handleSave()}
                                        className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-6 flex items-center justify-between cursor-pointer hover:bg-emerald-100 hover:border-emerald-300 transition-all group scale-100 hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100 group-hover:scale-110 transition-transform">
                                                <Zap size={24} fill="currentColor" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-gray-800">Sholat Tepat Waktu</h4>
                                                <p className="text-xs text-gray-500 font-bold">Dapatkan XP & Koin</p>
                                            </div>
                                        </div>
                                        <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                                            <Check size={20} strokeWidth={3} />
                                        </div>
                                    </div>

                                    {/* Additional Options */}
                                    <div className="grid grid-cols-1 gap-3">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-2">Opsi Tambahan</label>
                                        {selectedPrayer.sunnah.map((s, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl cursor-not-allowed opacity-60">
                                                <div className="w-5 h-5 border-2 border-gray-300 rounded-lg"></div>
                                                <span className="text-sm font-bold text-gray-600">Sholat Sunnah {s}</span>
                                                <span className="ml-auto text-xs font-black text-emerald-500">+10 XP</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-10 flex gap-3">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 py-4 px-6 bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold rounded-2xl transition-all"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="flex-[2] py-4 px-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-200 hover:scale-[1.02] transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                                    >
                                        <Save size={20} /> Simpan Jurnal
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Success Popup */}
            <AnimatePresence>
                {showSuccessPopup && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.5, opacity: 0, y: 50 }}
                            className="bg-white rounded-[3rem] p-8 w-full max-w-sm relative z-10 text-center shadow-2xl overflow-hidden"
                        >
                            {/* Animated Background Rays */}
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5 pointer-events-none"
                            >
                                <div className="w-full h-full bg-[conic-gradient(from_0deg,transparent_0deg,emerald_10deg,transparent_20deg)]" />
                            </motion.div>

                            <div className="relative z-10">
                                <div className="w-48 h-48 mx-auto -mt-10 mb-2">
                                    <Lottie animationData={MedalAnimation} loop={false} />
                                </div>

                                <motion.h2 
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-3xl font-black text-slate-800 mb-2"
                                >
                                    MISI BERHASIL!
                                </motion.h2>

                                <motion.p 
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="text-slate-500 font-bold text-sm mb-6"
                                >
                                    Alhamdulillah, ibadahmu tercatat!
                                </motion.p>

                                <div className="flex gap-4 justify-center mb-8">
                                    <motion.div 
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.8 }}
                                        className="bg-yellow-50 p-4 rounded-[2rem] border-2 border-yellow-200 flex flex-col items-center min-w-[100px]"
                                    >
                                        <span className="text-3xl mb-1">⚡</span>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">XP Earned</p>
                                        <p className="text-2xl font-black text-slate-800">
                                            +<Counter from={0} to={earnedRewards.xp} />
                                        </p>
                                    </motion.div>

                                    <motion.div 
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 1 }}
                                        className="bg-blue-50 p-4 rounded-[2rem] border-2 border-blue-200 flex flex-col items-center min-w-[100px]"
                                    >
                                        <span className="text-3xl mb-1">🪙</span>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Coins</p>
                                        <p className="text-2xl font-black text-slate-800">
                                            +<Counter from={0} to={earnedRewards.coin} />
                                        </p>
                                    </motion.div>
                                </div>

                                <motion.button
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 1.2 }}
                                    onClick={() => router.visit(route('student.dashboard'))}
                                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-200 transition-all active:scale-95"
                                >
                                    MANA LAGI?
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </StudentLayout>
    );
}
