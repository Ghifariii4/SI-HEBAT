import React, { useState, useEffect, useMemo } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, Moon, Sun, Cloud, Heart, Star,
    Check, Plus, Clock, Info, Save, MessageCircle,
    Zap, Award, TrendingUp, Sparkles
} from 'lucide-react';
import StudentLayout from '@/Layouts/StudentLayout';
import confetti from 'canvas-confetti';

export default function Sholat({ auth }) {
    const user = auth?.user || {};
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedPrayer, setSelectedPrayer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Status state for each prayer
    const [prayerStatus, setPrayerStatus] = useState({
        subuh: { completed: false, sunnah: [], notes: '' },
        dzuhur: { completed: false, sunnah: [], notes: '' },
        ashar: { completed: false, sunnah: [], notes: '' },
        maghrib: { completed: false, sunnah: [], notes: '' },
        isya: { completed: false, sunnah: [], notes: '' },
    });

    const prayers = [
        { id: 'subuh', name: 'Subuh', time: '04:30 - 05:20', icon: Cloud, sunnah: ['Qobliyah'], xp: 50 },
        { id: 'dzuhur', name: 'Dzuhur', time: '11:50 - 14:00', icon: Sun, sunnah: ['Qobliyah', "Ba'diyah"], xp: 50 },
        { id: 'ashar', name: 'Ashar', time: '15:10 - 17:30', icon: Sun, sunnah: ['Qobliyah'], xp: 50 },
        { id: 'maghrib', name: 'Maghrib', time: '18:00 - 18:45', icon: Moon, sunnah: ['Qobliyah', "Ba'diyah"], xp: 50 },
        { id: 'isya', name: 'Isya', time: '19:10 - 03:00', icon: Moon, sunnah: ['Qobliyah', "Ba'diyah"], xp: 50 },
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

    const activePrayerId = useMemo(() => {
        const currentMins = currentTime.getHours() * 60 + currentTime.getMinutes();

        for (const p of prayers) {
            const [start, end] = p.time.split(' - ');
            const [sH, sM] = start.split(':').map(Number);
            const [eH, eM] = end.split(':').map(Number);

            let startMins = sH * 60 + sM;
            let endMins = eH * 60 + eM;

            if (endMins < startMins) { // Midnight crossing
                if (currentMins >= startMins || currentMins < endMins) return p.id;
            } else {
                if (currentMins >= startMins && currentMins < endMins) return p.id;
            }
        }
        return null;
    }, [currentTime]);

    const handleOpenModal = (prayer) => {
        setSelectedPrayer(prayer);
        setIsModalOpen(true);
    };

    const handleSave = () => {
        setPrayerStatus(prev => ({
            ...prev,
            [selectedPrayer.id]: {
                ...prev[selectedPrayer.id],
                completed: true
            }
        }));

        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#10b981', '#fbbf24', '#ffffff']
        });

        setIsModalOpen(false);
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
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-40 right-20 text-white"
                    >
                        <Star size={32} fill="white" />
                    </motion.div>
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-40 left-20 text-white"
                    >
                        <Star size={24} fill="white" />
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

                            return (
                                <motion.div
                                    key={prayer.id}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleOpenModal(prayer)}
                                    className={`relative group cursor-pointer rounded-3xl p-5 border-2 transition-all duration-300 ${status.completed
                                        ? 'bg-white border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.2)]'
                                        : isActive
                                            ? 'bg-white border-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.3)] animate-pulse shadow-emerald-400/20'
                                            : 'bg-white/80 backdrop-blur-md border-transparent hover:border-white/50 shadow-lg'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-5">
                                            {/* Icon */}
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-inner ${status.completed
                                                ? 'bg-green-100 text-green-600 rotate-[360deg]'
                                                : isActive
                                                    ? 'bg-emerald-500 text-white shadow-emerald-200'
                                                    : 'bg-gray-100 text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-500'
                                                }`}>
                                                <prayer.icon size={28} />
                                            </div>

                                            {/* Details */}
                                            <div>
                                                <h3 className={`font-black text-lg ${status.completed ? 'text-green-700' : 'text-gray-800'}`}>
                                                    {prayer.name}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500'
                                                        }`}>
                                                        {prayer.time}
                                                    </span>
                                                    {status.completed && (
                                                        <span className="text-[10px] font-bold bg-green-100 text-green-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                                                            <Award size={10} /> +{prayer.xp} XP
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status Indicator */}
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${status.completed
                                            ? 'bg-green-500 border-green-500 text-white scale-110 shadow-lg shadow-green-200'
                                            : isActive
                                                ? 'border-emerald-400 text-emerald-500 bg-emerald-50'
                                                : 'border-gray-200 text-gray-300'
                                            }`}>
                                            {status.completed ? <Check size={20} className="stroke-[3]" /> : <Plus size={20} />}
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
                                                <p className="text-xs text-gray-500 font-bold">Dapatkan +{selectedPrayer.xp} XP</p>
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
                                        <div className="flex items-center gap-4 p-4 bg-gray-50 border-2 border-gray-100 rounded-3xl opacity-60">
                                            <MessageCircle size={20} className="text-gray-400" />
                                            <input
                                                disabled
                                                type="text"
                                                placeholder="Tambah catatan (Contoh: Berjamaah)"
                                                className="bg-transparent border-none focus:ring-0 text-sm font-bold w-full cursor-not-allowed"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-10 flex gap-3">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 py-4 px-6 bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold rounded-2xl transition-all"
                                    >
                                        Nanti Saja
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

        </StudentLayout>
    );
}
