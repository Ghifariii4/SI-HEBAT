import React, { useState, useEffect } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import {
    ArrowLeft, Heart, Book, Check, Plus, Clock,
    Save, Award, Sparkles, Sun, Flower, Trees
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

export default function Buddha({ auth }) {
    const user = auth?.user || {};
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [earnedRewards, setEarnedRewards] = useState({ xp: 0, coin: 0 });

    const [worshipStatus, setWorshipStatus] = useState({
        puja_bakti: { completed: false, xp: 50 },
        meditasi: { completed: false, xp: 60 },
        baca_sutta: { completed: false, xp: 40 },
        dana_punna: { completed: false, xp: 50 },
    });

    const { data, setData, post, processing } = useForm({
        religion: 'buddha',
        tasks: [],
    });

    // Activity windows: start, end in 'HH:MM', graceMins = minutes before start allowed
    const activityWindows = {
        puja_bakti: [
            { start: '05:00', end: '09:00', graceMins: 30 },
            { start: '17:00', end: '21:00', graceMins: 30 }
        ]
    };

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

    // Returns 'active' | 'not_yet' | 'passed'
    const getActivityAvailability = (taskId) => {
        const windows = activityWindows[taskId];
        if (!windows) return 'active'; // Flexible tasks

        const now = currentTime;
        const nowMins = now.getHours() * 60 + now.getMinutes();

        // Check each window
        let isFuture = true;
        for (const win of windows) {
            const [sH, sM] = win.start.split(':').map(Number);
            const [eH, eM] = win.end.split(':').map(Number);
            const startMins = sH * 60 + sM;
            const endMins   = eH * 60 + eM;
            const allowedFrom = startMins - win.graceMins;

            if (nowMins >= allowedFrom && nowMins < endMins) return 'active';
            if (nowMins < allowedFrom) isFuture = isFuture && true;
            else isFuture = false;
        }
        
        return isFuture ? 'not_yet' : 'passed';
    };

    const handleOpenModal = (activity) => {
        if (worshipStatus[activity.id].completed) return;

        const availability = getActivityAvailability(activity.id);
        if (availability === 'not_yet') {
            Swal.fire({
                icon: 'info',
                title: `Belum Waktunya`,
                text: `Waktu ${activity.name} belum tiba. Mari meditasi sejenak menanti waktu Puja! ☸️`,
                confirmButtonColor: '#f59e0b',
            });
            return;
        }
        if (availability === 'passed') {
            Swal.fire({
                icon: 'warning',
                title: `Waktu Sudah Lewat`,
                text: `Waktu ${activity.name} sudah berakhir hari ini. Tetap jaga kesadaran diri! ✨`,
                confirmButtonColor: '#f59e0b',
            });
            return;
        }

        setSelectedTask(activity);
        setIsModalOpen(true);
    };

    const handleSave = () => {
        const updatedTasks = [...data.tasks, selectedTask.id];
        
        router.post(route('student.habit.store', 'beribadah'), {
            religion: 'buddha',
            tasks: updatedTasks,
        }, {
            onStart: () => {
                setIsModalOpen(false);
                Swal.fire({
                    title: 'Menyimpan Jurnal...',
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
                setWorshipStatus(prev => ({
                    ...prev,
                    [selectedTask.id]: { ...prev[selectedTask.id], completed: true }
                }));
                setData('tasks', updatedTasks);

                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#f59e0b', '#fbbf24', '#ffffff']
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
                        className="grid grid-cols-1 gap-4"
                    >
                        {activities.map((activity) => {
                            const status = worshipStatus[activity.id];
                            const availability = getActivityAvailability(activity.id);
                            const isLocked = !status.completed && availability === 'not_yet';
                            const isPassed = !status.completed && availability === 'passed';

                            return (
                                <motion.div
                                    key={activity.id}
                                    variants={itemVariants}
                                    whileHover={!status.completed && !isLocked ? { scale: 1.02, x: 5 } : {}}
                                    whileTap={!status.completed && !isLocked ? { scale: 0.98 } : {}}
                                    onClick={() => handleOpenModal(activity)}
                                    className={`relative group cursor-pointer rounded-3xl p-5 border-2 transition-all duration-300 ${
                                        status.completed
                                            ? 'bg-white border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                                            : isLocked
                                                ? 'bg-white/50 border-gray-100 opacity-60'
                                                : isPassed
                                                    ? 'bg-white/40 border-red-100 opacity-50'
                                                    : 'bg-white shadow-xl border-transparent hover:border-amber-200'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                                                status.completed 
                                                    ? 'bg-amber-500 text-white rotate-[360deg]' 
                                                    : isLocked || isPassed
                                                        ? 'bg-gray-100 text-gray-300'
                                                        : 'bg-amber-50 text-amber-600 group-hover:bg-amber-100'
                                            }`}>
                                                <activity.icon size={28} />
                                            </div>
                                            <div>
                                                <h3 className={`font-bold text-lg ${status.completed ? 'text-amber-700' : isLocked || isPassed ? 'text-gray-400' : 'text-slate-800'}`}>
                                                    {activity.name}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider bg-slate-50 px-2 py-0.5 rounded-full">
                                                        {activity.time}
                                                    </span>
                                                    {isLocked && (
                                                        <span className="text-[10px] font-bold bg-amber-50 text-amber-500 px-2 py-0.5 rounded-full">
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
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                                            status.completed 
                                                ? 'bg-amber-500 border-amber-500 text-white' 
                                                : isLocked || isPassed
                                                    ? 'border-gray-100 text-gray-200'
                                                    : 'border-amber-100 text-amber-300 group-hover:border-amber-300 group-hover:text-amber-500'
                                        }`}>
                                            {status.completed ? <Check size={20} strokeWidth={3} /> : <Plus size={20} />}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
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
                                    <p className="text-gray-600 font-bold text-center">
                                        Apakah kamu sudah bermeditasi atau melakukan <span className="text-yellow-600 font-black">{selectedTask.name}</span>?
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
                                                <p className="text-xs text-yellow-500 font-bold">Dapatkan XP & Koin</p>
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
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10 pointer-events-none"
                            >
                                <div className="w-full h-full bg-[conic-gradient(from_0deg,transparent_0deg,yellow_10deg,transparent_20deg)]" />
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
                                    SADHU! SADHU!
                                </motion.h2>

                                <motion.p 
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="text-slate-500 font-bold text-sm mb-6"
                                >
                                    Semoga semua makhluk berbahagia!
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
                                    className="w-full py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-black rounded-2xl shadow-xl shadow-yellow-200 transition-all active:scale-95"
                                >
                                    SADHU
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </StudentLayout>
    );
}
