import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, BookOpen, Heart,
    Sparkles, ChevronRight, X,
    Save, Moon, Sun, Book,
    Award
} from 'lucide-react';
import StudentLayout from '@/Layouts/StudentLayout';
import confetti from 'canvas-confetti';

export default function Lainnya({ auth }) {
    const user = auth?.user || {};
    const [activeModal, setActiveModal] = useState(null); // 'quran' | 'puasa' | null

    // Quran State
    const [quranData, setQuranData] = useState({
        surahStart: '',
        surahEnd: '',
        ayatStart: '',
        ayatEnd: ''
    });

    // Puasa State
    const [selectedPuasa, setSelectedPuasa] = useState(null); // 'senin-kamis' | 'daud'

    const handleSaveQuran = (e) => {
        e.preventDefault();
        // Logika simpan quran disini
        celebrate();
        setActiveModal(null);
    };

    const handleSavePuasa = (type) => {
        setSelectedPuasa(type);
        // Logika simpan puasa disini
        celebrate();
        setActiveModal(null);
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
                                            value={quranData.surahStart}
                                            onChange={e => setQuranData({ ...quranData, surahStart: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Sampai Surah</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Nama Surah"
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold focus:border-emerald-500 focus:ring-0 transition-all"
                                            value={quranData.surahEnd}
                                            onChange={e => setQuranData({ ...quranData, surahEnd: e.target.value })}
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
                                            value={quranData.ayatStart}
                                            onChange={e => setQuranData({ ...quranData, ayatStart: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Sampai Ayat</label>
                                        <input
                                            required
                                            type="number"
                                            placeholder="0"
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold focus:border-emerald-500 focus:ring-0 transition-all"
                                            value={quranData.ayatEnd}
                                            onChange={e => setQuranData({ ...quranData, ayatEnd: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
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
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100">
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
        </StudentLayout>
    );
}
