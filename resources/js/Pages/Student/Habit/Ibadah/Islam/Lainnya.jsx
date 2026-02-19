import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, BookOpen, Heart,
    Sparkles, ChevronRight, X,
    Save, Moon, Sun, Book,
    Award, Camera, Info, AlertCircle
} from 'lucide-react';
import StudentLayout from '@/Layouts/StudentLayout';
import confetti from 'canvas-confetti';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Lottie from 'lottie-react';
import CountUp from 'react-countup';
import { Lightning, Coins } from '@phosphor-icons/react';

// Import Animations
import MedalSuccess from '../../../../../../../public/Success-Animation/MedalSuccess.json';

const MySwal = withReactContent(Swal);

export default function Lainnya({ auth }) {
    const user = auth?.user || {};
    const [activeModal, setActiveModal] = useState(null); // 'quran' | 'puasa' | 'haid' | null
    const [isHaidEnabled, setIsHaidEnabled] = useState(false);

    // Quran Logic
    const quranForm = useForm({
        surah_start: '',
        surah_end: '',
        ayat_start: '',
        ayat_end: ''
    });

    const handleSaveQuran = (e) => {
        e.preventDefault();
        quranForm.post(route('student.habit.ibadah.islam.quran.store'), {
            onSuccess: (page) => {
                celebrate();
                setActiveModal(null);
                quranForm.reset();
                const flash = page.props.flash || {};
                showSuccessPopup(flash.message, flash.xp_earned, flash.koin_earned);
            },
            onError: (err) => showErrorPopup(err)
        });
    };

    // Puasa Logic
    const puasaForm = useForm({ type: '' });
    const handleSavePuasa = (type) => {
        puasaForm.setData('type', type);
        puasaForm.post(route('student.habit.ibadah.islam.puasa.store'), {
            onSuccess: (page) => {
                celebrate();
                setActiveModal(null);
                const flash = page.props.flash || {};
                showSuccessPopup(flash.message, flash.xp_earned, flash.koin_earned);
            },
            onError: (err) => showErrorPopup(err)
        });
    };

    // Haid Logic
    const haidForm = useForm({
        activity: '',
        photo: null
    });

    const handleSaveHaid = (activity) => {
        // We'll use a hidden file input for photo if needed, but for now simple selection
        haidForm.setData('activity', activity);
        // Normally requires photo, so we open a sub-modal or prompt
        Swal.fire({
            title: 'Upload Bukti',
            text: 'Silakan ambil foto kegiatanmu',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Pilih Foto'
        }).then((result) => {
            if (result.isConfirmed) {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = (e) => {
                    const file = e.target.files[0];
                    haidForm.setData({
                        activity: activity,
                        photo: file
                    });

                    // Post immediately after photo choice
                    haidForm.post(route('student.habit.ibadah.islam.alternative.store'), {
                        onSuccess: (page) => {
                            celebrate();
                            setActiveModal(null);
                            const flash = page.props.flash || {};
                            showSuccessPopup(flash.message, flash.xp_earned, flash.koin_earned);
                        },
                        onError: (err) => showErrorPopup(err),
                        forceFormData: true
                    });
                };
                input.click();
            }
        });
    };

    const showSuccessPopup = (message, xpEarned, koinEarned) => {
        MySwal.fire({
            html: (
                <div className="flex flex-col items-center p-4 text-slate-800 font-outfit">
                    <div className="text-[10px] font-black tracking-[0.3em] text-emerald-400 uppercase mb-2">IBADAH TERJAGA</div>
                    <h3 className="text-3xl font-black tracking-tight text-slate-900 leading-tight mb-1 uppercase text-center">
                        AMALAN DICATAT!
                    </h3>
                    <p className="text-slate-400 font-bold text-sm mb-8 text-center px-4">
                        {message || 'Alhamdulillah, amalanmu telah berhasil dicatat.'}
                    </p>

                    <div className="relative mb-10 w-64 h-64 flex items-center justify-center">
                        <div className="absolute inset-0 border-[3px] border-dashed border-emerald-100 rounded-full animate-[spin_30s_linear_infinite]"></div>
                        <div className="w-48 h-48 relative z-10">
                            <Lottie animationData={MedalSuccess} loop={false} />
                        </div>
                        <div className="absolute top-4 right-4 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-black text-xs shadow-lg shadow-emerald-200 border-4 border-white z-20">
                            <Sparkles size={14} fill="white" />
                        </div>
                    </div>

                    <div className="flex gap-8 w-full justify-center mb-4">
                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center shadow-lg shadow-yellow-200">
                                    <Lightning weight="fill" className="text-white" size={18} />
                                </div>
                                <span className="text-2xl font-black text-slate-800">
                                    +<CountUp end={xpEarned} duration={2} />
                                </span>
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">EX POINTS</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200">
                                    <Coins weight="fill" className="text-white" size={18} />
                                </div>
                                <span className="text-2xl font-black text-slate-800">
                                    +<CountUp end={koinEarned} duration={2} />
                                </span>
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">FIT COINS</p>
                        </div>
                    </div>
                </div>
            ),
            showConfirmButton: true,
            confirmButtonText: 'MANTAP, TERIMA KASIH!',
            buttonsStyling: false,
            customClass: {
                popup: 'rounded-[3.5rem] border-0 shadow-2xl overflow-hidden',
                confirmButton: 'w-[calc(100%-4rem)] mx-8 mb-8 py-5 rounded-3xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg transition-all active:scale-95 shadow-xl shadow-emerald-100'
            },
            allowOutsideClick: false,
        });
    };

    const showErrorPopup = (errors) => {
        const firstError = Object.values(errors)[0];
        MySwal.fire({
            html: (
                <div className="flex flex-col items-center p-4 text-slate-800 font-outfit">
                    <div className="text-[10px] font-black tracking-[0.3em] text-red-400 uppercase mb-2">GAGAL MENCATAT</div>
                    <h3 className="text-3xl font-black tracking-tight text-slate-900 leading-tight mb-1 uppercase text-center">
                        ADA KENDALA!
                    </h3>
                    <p className="text-slate-400 font-bold text-sm mb-8 text-center px-4">
                        {firstError || 'Terjadi kesalahan saat mencoba mencatat amalanmu.'}
                    </p>

                    <div className="relative mb-10 w-64 h-64 flex items-center justify-center opacity-50 grayscale">
                        <div className="absolute inset-0 border-[3px] border-dashed border-red-100 rounded-full"></div>
                        <div className="w-48 h-48 relative z-10">
                            <Lottie animationData={MedalSuccess} loop={false} />
                        </div>
                    </div>

                    <div className="bg-red-50 p-4 rounded-2xl border-2 border-red-100 w-full text-center">
                        <p className="text-xs font-black text-red-600 uppercase tracking-widest">Pesan Kesalahan</p>
                        <p className="text-sm font-bold text-red-500 mt-1">{firstError}</p>
                    </div>
                </div>
            ),
            showConfirmButton: true,
            confirmButtonText: 'COBA LAGI NANTI',
            buttonsStyling: false,
            customClass: {
                popup: 'rounded-[3.5rem] border-0 shadow-2xl',
                confirmButton: 'w-[calc(100%-4rem)] mx-8 mb-8 py-5 rounded-3xl bg-red-500 hover:bg-red-600 text-white font-black text-lg transition-all active:scale-95 shadow-xl shadow-red-100'
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
                            onClick={() => !isHaidEnabled && setActiveModal('puasa')}
                            className={`bg-white rounded-[2.5rem] p-8 shadow-2xl transition-all relative overflow-hidden ${isHaidEnabled ? 'opacity-50 grayscale cursor-not-allowed' : 'cursor-pointer group'}`}
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
                                    {isHaidEnabled ? 'Terkunci (Sedang Haid)' : 'Pilih Puasa'} <ChevronRight size={18} />
                                </div>
                            </div>
                        </motion.div>

                        {/* Special Haid Section for Females */}
                        <div className="mt-4 p-8 bg-pink-50 rounded-[2.5rem] border-2 border-pink-100 relative overflow-hidden">
                            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div>
                                    <div className="flex items-center gap-2 text-pink-600 mb-1">
                                        <AlertCircle size={18} />
                                        <span className="text-xs font-black uppercase tracking-widest">Khusus Perempuan</span>
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900">Sedang Berhalangan (Haid)?</h3>
                                    <p className="text-sm text-gray-500 font-bold max-w-sm">Aktifkan sytem ini agar streak tetap terjaga dan ganti dengan ibadah alternatif.</p>
                                </div>
                                <button
                                    onClick={() => setIsHaidEnabled(!isHaidEnabled)}
                                    className={`px-8 py-4 rounded-3xl font-black transition-all shadow-lg ${isHaidEnabled
                                        ? 'bg-pink-500 text-white shadow-pink-200'
                                        : 'bg-white text-gray-500 hover:text-pink-500 border-2 border-pink-100 shadow-sm'}`}
                                >
                                    {isHaidEnabled ? 'ON - SEDANG BERHALANGAN' : 'OFF - TIDAK BERHALANGAN'}
                                </button>
                            </div>

                            {isHaidEnabled && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    className="mt-8 pt-8 border-t border-pink-200 grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10"
                                >
                                    {[
                                        { id: 'dzikir', name: 'Dzikir', xp: 15 },
                                        { id: 'doa', name: 'Doa', xp: 20 },
                                        { id: 'kajian', name: 'Kajian/Tafsir', xp: 20 },
                                        { id: 'sedekah', name: 'Sedekah', xp: 25 },
                                    ].map((alt) => (
                                        <button
                                            key={alt.id}
                                            onClick={() => handleSaveHaid(alt.id)}
                                            className="bg-white p-4 rounded-2xl border-2 border-pink-100 hover:border-pink-500 transition-all group text-center"
                                        >
                                            <div className="text-xs font-black text-pink-500 mb-1 group-hover:scale-110 transition-transform">+{alt.xp} XP</div>
                                            <div className="text-sm font-bold text-gray-700">{alt.name}</div>
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </div>
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
                                            value={quranForm.data.surah_start}
                                            onChange={e => quranForm.setData('surah_start', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Sampai Surah</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Nama Surah"
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold focus:border-emerald-500 focus:ring-0 transition-all"
                                            value={quranForm.data.surah_end}
                                            onChange={e => quranForm.setData('surah_end', e.target.value)}
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
                                            value={quranForm.data.ayat_start}
                                            onChange={e => quranForm.setData('ayat_start', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">Sampai Ayat</label>
                                        <input
                                            required
                                            type="number"
                                            placeholder="0"
                                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-sm font-bold focus:border-emerald-500 focus:ring-0 transition-all"
                                            value={quranForm.data.ayat_end}
                                            onChange={e => quranForm.setData('ayat_end', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={quranForm.processing}
                                    className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-200 hover:scale-[1.02] transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    <Save size={20} /> {quranForm.processing ? 'Menyimpan...' : 'Simpan Tilawah'}
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
