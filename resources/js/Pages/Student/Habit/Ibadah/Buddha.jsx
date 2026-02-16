import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, Heart, Book, Check, Plus, Clock,
    Save, Award, Sparkles, Sun, Flower, Trees
} from 'lucide-react';
import StudentLayout from '@/Layouts/StudentLayout';
import confetti from 'canvas-confetti';

export default function Buddha({ auth }) {
    const user = auth?.user || {};
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [worshipStatus, setWorshipStatus] = useState({
        puja_bakti: { completed: false, xp: 50 },
        meditasi: { completed: false, xp: 60 },
        baca_sutta: { completed: false, xp: 40 },
        dana_punna: { completed: false, xp: 50 },
    });

    const activities = [
        {
            id: 'puja_bakti',
            name: 'Puja Bakti',
            time: 'Pagi / Sore',
            icon: Flower,
            desc: 'Penghormatan kepada Triratna',
            xp: 50
        },
        {
            id: 'meditasi',
            name: 'Meditasi',
            time: 'Fleksibel',
            icon: Sun,
            desc: 'Melatih ketenangan dan kesadaran diri',
            xp: 60
        },
        {
            id: 'baca_sutta',
            name: 'Baca Sutta',
            time: 'Fleksibel',
            icon: Book,
            desc: 'Mempelajari Sabda Buddha',
            xp: 40
        },
        {
            id: 'dana_punna',
            name: 'Dana Punna',
            time: 'Fleksibel',
            icon: Heart,
            desc: 'Berbuat baik dan berderma',
            xp: 50
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
            colors: ['#f59e0b', '#fbbf24', '#ffffff']
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
            <Head title="Jurnal Ibadah Buddha - Si Hebat" />

            <div className="min-h-screen bg-gradient-to-br from-yellow-500 via-amber-600 to-orange-700 relative overflow-hidden">
                {/* Spiritual Decorations */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-10 left-10 text-white"
                    >
                        <Flower size={140} strokeWidth={1} />
                    </motion.div>
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-20 right-10 text-white"
                    >
                        <Trees size={100} strokeWidth={1} />
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
                            <h1 className="text-white font-black text-xl drop-shadow-md">Dhamma & Meditasi</h1>
                            <p className="text-yellow-100 text-xs font-bold">Menemukan kedamaian batin ☸️</p>
                        </div>
                    </div>
                </nav>

                <div className="max-w-xl mx-auto px-6 pb-24 relative z-10">
                    {/* Welcome Card */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-[3rem] p-8 mb-8 text-center text-white shadow-2xl"
                    >
                        <div className="relative z-10">
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 text-yellow-200">Waktu Sekarang</div>
                            <div className="text-5xl font-black mb-1">{timeString}</div>
                            <p className="text-yellow-100/70 text-sm font-medium italic mt-2 text-balance">
                                "Kebencian tidak akan pernah berakhir jika dibalas dengan kebencian."
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
                                    whileHover={{ scale: 1.02, y: -4 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleOpenModal(activity)}
                                    className={`relative group cursor-pointer rounded-[2rem] p-5 border-2 transition-all duration-300 ${status.completed
                                            ? 'bg-white border-yellow-500 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                                            : 'bg-white/95 backdrop-blur-md border-transparent hover:border-white/50 shadow-lg'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-5">
                                            {/* Icon */}
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-inner ${status.completed
                                                    ? 'bg-yellow-100 text-yellow-600 rotate-[360deg]'
                                                    : 'bg-yellow-500 text-white shadow-yellow-200'
                                                }`}>
                                                <activity.icon size={28} />
                                            </div>

                                            {/* Details */}
                                            <div>
                                                <h3 className={`font-black text-lg ${status.completed ? 'text-yellow-700' : 'text-gray-800'}`}>
                                                    {activity.name}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full flex items-center gap-1">
                                                        <Clock size={10} /> {activity.time}
                                                    </span>
                                                    {status.completed && (
                                                        <span className="text-[10px] font-black bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                                                            <Award size={10} /> +{activity.xp} XP
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status Indicator */}
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${status.completed
                                                ? 'bg-yellow-500 border-yellow-500 text-white scale-110 shadow-lg shadow-yellow-200'
                                                : 'border-yellow-200 text-yellow-400 bg-yellow-50'
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
                        <p className="text-[10px] text-yellow-200/50 font-black uppercase tracking-widest">
                            Sabbe Satta Bhavantu Sukhitatta
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
                            className="absolute inset-0 bg-yellow-950/70 backdrop-blur-sm"
                        ></motion.div>

                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            transition={{ type: "spring", damping: 30, stiffness: 200 }}
                            className="bg-white w-full max-w-lg rounded-t-[3rem] sm:rounded-[3rem] shadow-2xl relative z-10 overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-yellow-500 to-amber-600 p-8 text-white relative">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <selectedTask.icon size={120} />
                                </div>
                                <div className="relative flex items-center gap-6">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
                                        <selectedTask.icon size={32} />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black">{selectedTask.name}</h2>
                                        <p className="text-yellow-100 font-bold opacity-80 mt-1">
                                            {selectedTask.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="space-y-6">
                                    <p className="text-gray-600 font-medium text-center">
                                        Apakah kamu sudah bermeditasi atau melakukan **{selectedTask.name}**?
                                    </p>

                                    {/* Confirmation Box */}
                                    <div
                                        onClick={handleSave}
                                        className="p-6 bg-yellow-50 border-2 border-yellow-100 rounded-[2.5rem] flex items-center justify-between cursor-pointer hover:bg-yellow-100 hover:border-yellow-200 transition-all group active:scale-95"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-yellow-600 shadow-sm border border-yellow-50">
                                                <Sparkles size={24} fill="currentColor" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-gray-800">Ya, Selesai</h4>
                                                <p className="text-xs text-yellow-500 font-bold">Dapatkan +{selectedTask.xp} XP</p>
                                            </div>
                                        </div>
                                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-yellow-200">
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
                                        className="flex-[2] py-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-black rounded-2xl shadow-xl shadow-yellow-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
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
