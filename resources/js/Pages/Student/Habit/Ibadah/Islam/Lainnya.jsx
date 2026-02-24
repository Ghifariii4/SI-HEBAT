import React, { useState, useEffect } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import {
    ArrowLeft, BookOpen, Heart,
    Sparkles, ChevronRight, X,
    Save, Moon, Sun, Book,
    Award
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

export default function Lainnya({ auth }) {
    const user = auth?.user || {};
    const [activeModal, setActiveModal] = useState(null); // 'quran' | 'puasa' | null
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [earnedRewards, setEarnedRewards] = useState({ xp: 0, coin: 0 });

    const { data, setData, post, processing } = useForm({
        religion: 'islam',
        tasks: [], // will contain 'tilawah' or 'puasa'
        quran: {
            surahStart: '',
            surahEnd: '',
            ayatStart: '',
            ayatEnd: ''
        },
        fasting_type: null,
    });

    const handleSaveQuran = (e) => {
        e.preventDefault();
        
        const updatedTasks = [...new Set([...data.tasks, 'tilawah'])];
        
        router.post(route('student.habit.store', 'beribadah'), {
            religion: 'islam',
            tasks: updatedTasks,
            quran: data.quran,
        }, {
            onStart: () => {
                setActiveModal(null);
                Swal.fire({
                    title: 'Mencatat Tilawah...',
                    allowOutsideClick: false,
                    didOpen: () => { Swal.showLoading(); }
                });
            },
            onSuccess: (page) => {
                Swal.close();
                const flash = page.props.flash || {};
                setEarnedRewards({ xp: flash.xp_earned || 0, coin: flash.koin_earned || 0 });
                setData('tasks', updatedTasks);
                celebrate();
                setShowSuccessPopup(true);
            },
            onError: (errors) => {
                Swal.close();
                Swal.fire('Gagal', errors.error || 'Terjadi kesalahan', 'error');
            }
        });
    };

    const handleSavePuasa = (type) => {
        const updatedTasks = [...new Set([...data.tasks, 'puasa'])];

        router.post(route('student.habit.store', 'beribadah'), {
            religion: 'islam',
            tasks: updatedTasks,
            fasting_type: type,
        }, {
            onStart: () => {
                setActiveModal(null);
                Swal.fire({
                    title: 'Mencatat Puasa...',
                    allowOutsideClick: false,
                    didOpen: () => { Swal.showLoading(); }
                });
            },
            onSuccess: (page) => {
                Swal.close();
                const flash = page.props.flash || {};
                setEarnedRewards({ xp: flash.xp_earned || 0, coin: flash.koin_earned || 0 });
                setData('tasks', updatedTasks);
                celebrate();
                setShowSuccessPopup(true);
            },
            onError: (errors) => {
                Swal.close();
                Swal.fire('Gagal', errors.error || 'Terjadi kesalahan', 'error');
            }
        });
    };

    const celebrate = () => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#10b981', '#fbbf24', '#ffffff']
        });
    };

    return (
        <StudentLayout user={user}>
            <Head title="Ibadah Lainnya - Si Hebat" />

            <div className="min-h-screen bg-gradient-to-br from-teal-500 via-emerald-600 to-green-700 p-6 relative overflow-hidden">
                {/* Spiritual Decorations */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-20 -right-20 text-white"
                    >
                        <Sparkles size={300} />
                    </motion.div>
                </div>

                <div className="max-w-2xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-10">
                        <Link
                            href={route('student.habit.ibadah.islam')}
                            className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-white/30 transition border border-white/30"
                        >
                            <ArrowLeft size={24} />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-black text-white tracking-tight font-outfit">Ibadah Lainnya</h1>
                            <p className="text-emerald-100 font-bold">Lengkapi amalan harianmu 🌿</p>
                        </div>
                    </div>

                    {/* Selection Cards */}
                    <div className="grid grid-cols-1 gap-6">
                        {/* Quran Card */}
                        <motion.div
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveModal('quran')}
                            className="bg-white rounded-[2.5rem] p-8 shadow-2xl cursor-pointer group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 text-emerald-50 group-hover:scale-110 transition-transform duration-500">
                                <BookOpen size={120} strokeWidth={1} />
                            </div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                                    <BookOpen size={32} />
                                </div>
                                <h2 className="text-2xl font-black text-gray-900 mb-2">Baca Al-Quran</h2>
                                <p className="text-gray-500 font-bold max-w-xs">Catat progres tilawah harianmu dan kumpulkan berkah.</p>
                                <div className="mt-6 flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-sm">
                                    Buka Jurnal <ChevronRight size={18} />
                                </div>
                            </div>
                        </motion.div>

                        {/* Puasa Card */}
                        <motion.div
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveModal('puasa')}
                            className="bg-white rounded-[2.5rem] p-8 shadow-2xl cursor-pointer group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 text-emerald-50 group-hover:scale-110 transition-transform duration-500">
                                <Moon size={120} strokeWidth={1} />
                            </div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                                    <Moon size={32} />
                                </div>
                                <h2 className="text-2xl font-black text-gray-900 mb-2">Puasa Sunnah</h2>
                                <p className="text-gray-500 font-bold max-w-xs">Latih kesabaran dan ketaatan melalui puasa sunnah.</p>
                                <div className="mt-6 flex items-center gap-2 text-orange-600 font-black uppercase tracking-widest text-sm">
                                    Pilih Puasa <ChevronRight size={18} />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Footer Quote */}
                <div className="max-w-xl mx-auto mt-16 text-center">
                    <p className="text-emerald-100 italic font-medium opacity-80">
                        "Bacalah Al-Quran, karena ia akan datang pada hari kiamat sebagai syafaat bagi pembacanya." (HR. Muslim)
                    </p>
                </div>
            </div>

            {/* Modals */}
            <AnimatePresence>
                {activeModal === 'quran' && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveModal(null)}
                            className="absolute inset-0 bg-emerald-950/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl relative z-10 overflow-hidden"
                        >
                            <div className="bg-emerald-600 p-8 text-white relative">
                                <button
                                    onClick={() => setActiveModal(null)}
                                    className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition"
                                >
                                    <X size={20} />
                                </button>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                                        <Book size={24} />
                                    </div>
                                    <h3 className="text-2xl font-outfit font-black">Jurnal Tilawah</h3>
                                </div>
                            </div>

                            <form onSubmit={handleSaveQuran} className="p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Dari Surah</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Nama Surah"
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold focus:border-emerald-500 focus:ring-0 transition-all"
                                            value={data.quran.surahStart}
                                            onChange={e => setData('quran', { ...data.quran, surahStart: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Sampai Surah</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Nama Surah"
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold focus:border-emerald-500 focus:ring-0 transition-all"
                                            value={data.quran.surahEnd}
                                            onChange={e => setData('quran', { ...data.quran, surahEnd: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Dari Ayat</label>
                                        <input
                                            required
                                            type="number"
                                            placeholder="0"
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold focus:border-emerald-500 focus:ring-0 transition-all"
                                            value={data.quran.ayatStart}
                                            onChange={e => setData('quran', { ...data.quran, ayatStart: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Sampai Ayat</label>
                                        <input
                                            required
                                            type="number"
                                            placeholder="0"
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold focus:border-emerald-500 focus:ring-0 transition-all"
                                            value={data.quran.ayatEnd}
                                            onChange={e => setData('quran', { ...data.quran, ayatEnd: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-200 hover:scale-[1.02] transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                                >
                                    <Save size={20} /> Simpan Tilawah
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}

                {activeModal === 'puasa' && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveModal(null)}
                            className="absolute inset-0 bg-emerald-950/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white w-full max-w-sm rounded-[3rem] shadow-2xl relative z-10 overflow-hidden"
                        >
                            <div className="bg-orange-500 p-8 text-white relative">
                                <button
                                    onClick={() => setActiveModal(null)}
                                    className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition"
                                >
                                    <X size={20} />
                                </button>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                                        <Moon size={24} />
                                    </div>
                                    <h3 className="text-2xl font-outfit font-black">Pilih Puasa</h3>
                                </div>
                            </div>

                            <div className="p-8 space-y-4">
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => handleSavePuasa('senin-kamis')}
                                    className="p-6 bg-orange-50 border-2 border-orange-100 rounded-3xl cursor-pointer hover:border-orange-300 transition-all flex items-center justify-between group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm border border-orange-100">
                                            <Sun size={20} />
                                        </div>
                                        <span className="font-black text-gray-800">Senin - Kamis</span>
                                    </div>
                                    <Award className="text-orange-400 group-hover:text-orange-600 transition-colors" size={24} />
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => handleSavePuasa('daud')}
                                    className="p-6 bg-emerald-50 border-2 border-emerald-100 rounded-3xl cursor-pointer hover:border-emerald-300 transition-all flex items-center justify-between group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm border border-orange-100">
                                            <Sparkles size={20} />
                                        </div>
                                        <span className="font-black text-gray-800">Puasa Daud</span>
                                    </div>
                                    <Award className="text-emerald-400 group-hover:text-emerald-600 transition-colors" size={24} />
                                </motion.div>
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
                                    BARAKALLAH!
                                </motion.h2>

                                <motion.p 
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="text-slate-500 font-bold text-sm mb-6"
                                >
                                    Amalan tambahanmu luar biasa!
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
                                    SAMA-SAMA
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </StudentLayout>
    );
}
