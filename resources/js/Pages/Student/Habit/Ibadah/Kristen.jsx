import React, { useState, useEffect, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, Cross, Heart, Book,
    Check, Plus, Clock, Save,
    Music, Users, Award, Sparkles,
    Calendar, Sun
} from 'lucide-react';
import StudentLayout from '@/Layouts/StudentLayout';
import confetti from 'canvas-confetti';

export default function Kristen({ auth }) {
    const user = auth?.user || {};
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Status state for each worship activity
    const [worshipStatus, setWorshipStatus] = useState({
        saat_teduh: { completed: false, xp: 50 },
        baca_alkitab: { completed: false, xp: 50 },
        ibadah_mingguan: { completed: false, xp: 100 },
        doa_malam: { completed: false, xp: 30 },
    });

    const activities = [
        {
            id: 'saat_teduh',
            name: 'Saat Teduh',
            time: '05:00 - 08:00',
            icon: Sun,
            desc: 'Waktu pribadi dengan Tuhan di pagi hari',
            xp: 50
        },
        {
            id: 'baca_alkitab',
            name: 'Baca Alkitab',
            time: 'Fleksibel',
            icon: Book,
            desc: 'Merenungkan Firman Tuhan hari ini',
            xp: 50
        },
        {
            id: 'ibadah_mingguan',
            name: 'Ibadah Mingguan',
            time: 'Minggu',
            icon: Users,
            desc: 'Bersekutu bersama di Gereja',
            xp: 100
        },
        {
            id: 'doa_malam',
            name: 'Doa Malam',
            time: '20:00 - 23:00',
            icon: Heart,
            desc: 'Mengucap syukur sebelum beristirahat',
            xp: 30
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const timeString = currentTime.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const handleOpenModal = (activity) => {
        setSelectedTask(activity);
        setIsModalOpen(true);
    };

    const handleSave = () => {
        setWorshipStatus(prev => ({
            ...prev,
            [selectedTask.id]: {
                ...prev[selectedTask.id],
                completed: true
            }
        }));

        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#3b82f6', '#818cf8', '#ffffff']
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
            <Head title="Jurnal Ibadah Kristen - Si Hebat" />

            <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-violet-800 relative overflow-hidden">
                {/* Spiritual Decorations */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 10, 0]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-20 right-10 text-white"
                    >
                        <Cross size={80} fill="white" />
                    </motion.div>
                    <motion.div
                        animate={{
                            y: [0, 30, 0],
                            opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-20 left-10 text-white"
                    >
                        <Heart size={48} fill="white" />
                    </motion.div>
                </div>

                {/* Navbar */}
                <nav className="p-6 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('student.habit.beribadah')}
                            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition border border-white/30"
                        >
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-white font-black text-xl drop-shadow-md">Saat Teduh & Ibadah</h1>
                            <p className="text-blue-100 text-xs font-bold">Bertumbuh dalam kasih Tuhan 🕊️</p>
                        </div>
                    </div>
                </nav>

                <div className="max-w-xl mx-auto px-6 pb-24 relative z-10">
                    {/* Welcome Card */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-[2.5rem] p-8 mb-8 text-center text-white shadow-2xl overflow-hidden relative"
                    >
                        <div className="relative z-10">
                            <div className="text-xs font-black uppercase tracking-[0.2em] mb-3 text-blue-200">Waktu Sekarang</div>
                            <div className="text-5xl font-black mb-2">{timeString}</div>
                            <p className="text-blue-100/80 text-sm font-medium italic">
                                "Kasih setia-Mu, ya Tuhan, sampai ke langit..."
                            </p>
                        </div>
                    </motion.div>

                    {/* Activities Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-4"
                    >
                        {activities.map((activity) => {
                            const status = worshipStatus[activity.id];

                            return (
                                <motion.div
                                    key={activity.id}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleOpenModal(activity)}
                                    className={`relative group cursor-pointer rounded-3xl p-5 border-2 transition-all duration-300 ${status.completed
                                            ? 'bg-white border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                                            : 'bg-white/90 backdrop-blur-md border-transparent hover:border-white/50 shadow-lg'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-5">
                                            {/* Icon */}
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-inner ${status.completed
                                                    ? 'bg-blue-100 text-blue-600 rotate-[360deg]'
                                                    : 'bg-blue-500 text-white shadow-blue-200'
                                                }`}>
                                                <activity.icon size={28} />
                                            </div>

                                            {/* Details */}
                                            <div>
                                                <h3 className={`font-black text-lg ${status.completed ? 'text-blue-700' : 'text-gray-800'}`}>
                                                    {activity.name}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full flex items-center gap-1">
                                                        <Clock size={10} /> {activity.time}
                                                    </span>
                                                    {status.completed && (
                                                        <span className="text-[10px] font-black bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                                                            <Award size={10} /> +{activity.xp} XP
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status Indicator */}
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${status.completed
                                                ? 'bg-blue-500 border-blue-500 text-white scale-110 shadow-lg shadow-blue-200'
                                                : 'border-blue-200 text-blue-400 bg-blue-50'
                                            }`}>
                                            {status.completed ? <Check size={20} className="stroke-[3]" /> : <Plus size={20} />}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Footer Quote */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-12 text-center"
                    >
                        <div className="inline-block p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                            <p className="text-xs text-blue-100/60 font-medium">
                                "Sebab di mana dua atau tiga orang berkumpul dalam nama-Ku, di situ Aku ada di tengah-tengah mereka."
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Input Modal */}
            <AnimatePresence>
                {isModalOpen && selectedTask && (
                    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-blue-950/60 backdrop-blur-sm"
                        ></motion.div>

                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="bg-white w-full max-w-lg rounded-t-[3rem] sm:rounded-[3rem] shadow-2xl relative z-10 overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white relative">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <selectedTask.icon size={120} />
                                </div>
                                <div className="relative flex items-center gap-6">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
                                        <selectedTask.icon size={32} />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black">{selectedTask.name}</h2>
                                        <p className="text-blue-100 font-bold flex items-center gap-2 mt-1 lowercase">
                                            {selectedTask.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="space-y-6">
                                    <p className="text-gray-600 font-medium text-center px-4">
                                        Sudahkah kamu menyelesaikan kegiatan **{selectedTask.name}** hari ini?
                                    </p>

                                    {/* Action Options */}
                                    <div className="grid grid-cols-1 gap-4">
                                        <div
                                            onClick={handleSave}
                                            className="p-6 bg-blue-50 border-2 border-blue-100 rounded-[2.5rem] flex items-center justify-between cursor-pointer hover:bg-blue-100 hover:border-blue-200 transition-all group shadow-sm"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-50">
                                                    <Sparkles size={24} fill="currentColor" />
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-gray-800">Ya, Sudah Selesai</h4>
                                                    <p className="text-xs text-blue-500 font-bold">Dapatkan +{selectedTask.xp} XP</p>
                                                </div>
                                            </div>
                                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-200">
                                                <Check size={20} strokeWidth={3} />
                                            </div>
                                        </div>

                                        <div className="p-4 bg-gray-50 border-2 border-gray-100 rounded-[2rem] flex items-center gap-3 opacity-60">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400">
                                                <Music size={20} />
                                            </div>
                                            <span className="text-sm font-bold text-gray-500">Puji-pujian / Lagu Rohani</span>
                                            <span className="ml-auto text-[10px] font-black bg-white px-2 py-1 rounded-full text-blue-500">+10 XP</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="mt-10 flex gap-3">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 py-4 px-6 bg-gray-100 text-gray-500 font-black rounded-2xl hover:bg-gray-200 transition-all"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="flex-[2] py-4 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-blue-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
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
