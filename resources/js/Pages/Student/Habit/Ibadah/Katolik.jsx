import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, Cross, Heart, Book,
    Check, Plus, Clock, Save,
    Users, Award, Sparkles, Flame
} from 'lucide-react';
import StudentLayout from '@/Layouts/StudentLayout';
import confetti from 'canvas-confetti';

export default function Katolik({ auth }) {
    const user = auth?.user || {};
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [worshipStatus, setWorshipStatus] = useState({
        misa_kudus: { completed: false, xp: 100 },
        doa_rosario: { completed: false, xp: 50 },
        baca_kitab_suci: { completed: false, xp: 50 },
        angelus: { completed: false, xp: 30 },
    });

    const activities = [
        {
            id: 'misa_kudus',
            name: 'Misa Kudus',
            time: 'Minggu / Harian',
            icon: Users,
            desc: 'Merayakan Ekaristi Kudus di Gereja',
            xp: 100
        },
        {
            id: 'doa_rosario',
            name: 'Doa Rosario',
            time: 'Fleksibel',
            icon: Heart,
            desc: 'Merenungkan misteri keselamatan bersama Bunda Maria',
            xp: 50
        },
        {
            id: 'baca_kitab_suci',
            name: 'Baca Kitab Suci',
            time: 'Fleksibel',
            icon: Book,
            desc: 'Mendengarkan Sabda Tuhan hari ini',
            xp: 50
        },
        {
            id: 'angelus',
            name: 'Doa Malaikat Tuhan',
            time: '06:00, 12:00, 18:00',
            icon: Flame,
            desc: 'Berdoa Angelus (Malaikat Tuhan)',
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
            colors: ['#8b5cf6', '#a78bfa', '#ffffff']
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
            <Head title="Jurnal Ibadah Katolik - Si Hebat" />

            <div className="min-h-screen bg-gradient-to-br from-purple-700 via-violet-800 to-indigo-900 relative overflow-hidden">
                {/* Spiritual Decorations */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                    <motion.div
                        animate={{
                            scale: [1, 1.15, 1],
                            rotate: [0, -5, 0]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-10 left-10 text-white"
                    >
                        <Cross size={100} fill="white" />
                    </motion.div>
                    <motion.div
                        animate={{
                            y: [0, -40, 0],
                            opacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-40 right-10 text-white"
                    >
                        <Sparkles size={64} fill="white" />
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
                            <h1 className="text-white font-black text-xl drop-shadow-md">Ekaristi & Doa</h1>
                            <p className="text-purple-100 text-xs font-bold">Membangun iman yang teguh 🕯️</p>
                        </div>
                    </div>
                </nav>

                <div className="max-w-xl mx-auto px-6 pb-24 relative z-10">
                    {/* Welcome Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-[3rem] p-8 mb-8 text-center text-white shadow-2xl relative"
                    >
                        <div className="relative z-10">
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 text-purple-200">Saat Ini</div>
                            <div className="text-5xl font-black mb-1">{timeString}</div>
                            <p className="text-purple-100/70 text-sm font-medium italic mt-2">
                                "Tuhan adalah gembalaku, aku tidak akan kekurangan."
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
                                    className={`relative group cursor-pointer rounded-[2rem] p-5 border-2 transition-all duration-300 ${status.completed
                                            ? 'bg-white border-purple-400 shadow-[0_0_20px_rgba(167,139,250,0.3)]'
                                            : 'bg-white/95 backdrop-blur-md border-transparent hover:border-white/50 shadow-lg'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-5">
                                            {/* Icon */}
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-inner ${status.completed
                                                    ? 'bg-purple-100 text-purple-600 rotate-[360deg]'
                                                    : 'bg-purple-600 text-white shadow-purple-200'
                                                }`}>
                                                <activity.icon size={28} />
                                            </div>

                                            {/* Details */}
                                            <div>
                                                <h3 className={`font-black text-lg ${status.completed ? 'text-purple-700' : 'text-gray-800'}`}>
                                                    {activity.name}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full flex items-center gap-1">
                                                        <Clock size={10} /> {activity.time}
                                                    </span>
                                                    {status.completed && (
                                                        <span className="text-[10px] font-black bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                                                            <Award size={10} /> +{activity.xp} XP
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status Indicator */}
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${status.completed
                                                ? 'bg-purple-600 border-purple-600 text-white scale-110 shadow-lg shadow-purple-200'
                                                : 'border-purple-200 text-purple-400 bg-purple-50'
                                            }`}>
                                            {status.completed ? <Check size={20} strokeWidth={3} /> : <Plus size={20} />}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Footer Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-12 text-center"
                    >
                        <p className="text-[10px] text-purple-200/50 font-black uppercase tracking-widest">
                            Ad Maiorem Dei Gloriam
                        </p>
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
                            className="absolute inset-0 bg-purple-950/70 backdrop-blur-sm"
                        ></motion.div>

                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            transition={{ type: "spring", damping: 30, stiffness: 200 }}
                            className="bg-white w-full max-w-lg rounded-t-[3rem] sm:rounded-[3rem] shadow-2xl relative z-10 overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-8 text-white relative">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <selectedTask.icon size={120} />
                                </div>
                                <div className="relative flex items-center gap-6">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
                                        <selectedTask.icon size={32} />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black">{selectedTask.name}</h2>
                                        <p className="text-purple-100 font-bold opacity-80 mt-1">
                                            {selectedTask.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="space-y-6">
                                    <p className="text-gray-600 font-medium text-center">
                                        Apakah kamu sudah melakukan kegiatan **{selectedTask.name}**?
                                    </p>

                                    {/* Confirmation Box */}
                                    <div
                                        onClick={handleSave}
                                        className="p-6 bg-purple-50 border-2 border-purple-100 rounded-[2.5rem] flex items-center justify-between cursor-pointer hover:bg-purple-100 hover:border-purple-200 transition-all group active:scale-95"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-purple-600 shadow-sm border border-purple-50">
                                                <Sparkles size={24} fill="currentColor" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-gray-800">Ya, Selesai</h4>
                                                <p className="text-xs text-purple-500 font-bold">Dapatkan +{selectedTask.xp} XP</p>
                                            </div>
                                        </div>
                                        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-purple-200">
                                            <Check size={20} strokeWidth={3} />
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-10 flex gap-3">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 py-4 bg-gray-100 text-gray-500 font-black rounded-2xl hover:bg-gray-200 transition-all"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="flex-[2] py-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-black rounded-2xl shadow-xl shadow-purple-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
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
