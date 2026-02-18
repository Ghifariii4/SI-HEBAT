import StudentLayout from '@/Layouts/StudentLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Activity,
    Flame,
    Clock,
    CheckCircle,
    Trophy,
    TrendingUp,
    Coins,
    Upload,
    X,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const SPORTS_DATA = [
    { id: 'lari', name: 'Lari / Jogging', icon: '🏃', intensity: 8, emoji: '🏃‍♂️' },
    { id: 'bola', name: 'Sepak Bola', icon: '⚽', intensity: 9, emoji: '⚽' },
    { id: 'basket', name: 'Basket', icon: '🏀', intensity: 8, emoji: '🏀' },
    { id: 'sepeda', name: 'Sepeda', icon: '🚴', intensity: 6, emoji: '🚴‍♂️' },
    { id: 'renang', name: 'Renang', icon: '🏊', intensity: 9, emoji: '🏊‍♂️' },
    { id: 'badminton', name: 'Badminton', icon: '🏸', intensity: 7, emoji: '🏸' },
    { id: 'senam', name: 'Senam / SKJ', icon: '🤸', intensity: 5, emoji: '🤸‍♀️' },
    { id: 'yoga', name: 'Yoga', icon: '🧘', intensity: 3, emoji: '🧘‍♀️' },
    { id: 'tenis', name: 'Tenis', icon: '🎾', intensity: 8, emoji: '🎾' },
    { id: 'lainnya', name: 'Lainnya', icon: '⚙️', intensity: 5, emoji: '⚙️' },
];

const XP_TABLE = [
    { min: 5, max: 14, xp: 10, coin: 5 },
    { min: 15, max: 29, xp: 20, coin: 10 },
    { min: 30, max: 59, xp: 35, coin: 18 },
    { min: 60, max: 90, xp: 50, coin: 25 },
    { min: 91, max: 120, xp: 60, coin: 30 },
];

const calculateReward = (duration) => {
    const normalized = Math.min(Math.max(duration, 0), 120);
    const row = XP_TABLE.find((item) => normalized >= item.min && normalized <= item.max);
    return row ? { xp: row.xp, coin: row.coin } : { xp: 0, coin: 0 };
};

export default function Olahraga({ auth = { user: {} } }) {
    const user = auth?.user || {};
    const [selectedSport, setSelectedSport] = useState(null);
    const [duration, setDuration] = useState(30);
    const [customSport, setCustomSport] = useState('');
    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [earnedXP, setEarnedXP] = useState(0);
    const [earnedCoin, setEarnedCoin] = useState(0);

    const form = useForm({
        sport_type: '',
        duration: 30,
        intensity: 5,
        timestamp: new Date().toISOString(),
        photo: null,
    });

    // Kalori calculation dengan formula sederhana
    const estimatedCalories = useMemo(() => {
        if (!selectedSport) return 0;
        const sport = SPORTS_DATA.find((s) => s.id === selectedSport);
        return Math.round(duration * (sport?.intensity || 5) * 0.8);
    }, [selectedSport, duration]);

    const selectedSportData = useMemo(() => {
        return SPORTS_DATA.find((s) => s.id === selectedSport);
    }, [selectedSport]);

    const reward = useMemo(() => calculateReward(duration), [duration]);

    const handleSelectSport = (sportId) => {
        setSelectedSport(sportId);
        setCustomSport('');
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            setPhotoPreview(event.target?.result || null);
            setPhotoFile(file);
        };
        reader.readAsDataURL(file);
    };

    const isTimeValid = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const totalMinutes = hours * 60 + minutes;
        const minTime = 4 * 60 + 30;
        const maxTime = 21 * 60 + 30;
        return totalMinutes >= minTime && totalMinutes <= maxTime;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedSport) {
            alert('Pilih olahraga dulu!');
            return;
        }

        if (!isTimeValid()) {
            alert('Olahraga hanya bisa diinput antara jam 04:30 - 21:30!');
            return;
        }

        if (duration < 5) {
            alert('Minimal durasi olahraga adalah 5 menit!');
            return;
        }

        setIsSubmitting(true);

        const sportName =
            selectedSport === 'lainnya' && customSport
                ? customSport
                : selectedSportData?.name;

        setEarnedXP(reward.xp);
        setEarnedCoin(reward.coin);

        // Trigger confetti
        confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#0ea5e9', '#ef4444', '#facc15'],
        });

        // Update form data
        form.setData({
            sport_type: sportName,
            duration,
            intensity: selectedSportData?.intensity || 5,
            timestamp: new Date().toISOString(),
            photo: photoFile,
        });

        // Simulasi submit (jika ada route habit.store, uncomment line di bawah)
        // form.post(route('student.habit.store'), {
        //     onSuccess: () => {
        //         setShowSuccess(true);
        //         setTimeout(() => {
        //             window.location.href = route('student.dashboard');
        //         }, 2500);
        //     },
        //     onError: () => setIsSubmitting(false),
        // });

        // For now, show success modal
        setShowSuccess(true);
        setIsSubmitting(false);
        setTimeout(() => {
            window.history.back();
        }, 2500);
    };

    return (
        <StudentLayout user={user}>
            <Head title="Jurnal Olahraga - Si Hebat" />

            <div className="min-h-screen bg-gradient-to-br from-sky-400 to-blue-600 p-4 md:p-8 pb-24 relative overflow-hidden">
                {/* Floating Background Elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] border-[30px] md:border-[60px] border-white/5 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] border-2 border-dashed border-white/20 rounded-full" />

                    <motion.div
                        className="absolute top-20 right-10 opacity-30 text-white text-6xl md:text-8xl"
                        animate={{ y: [0, -30, 0], rotate: [0, 360] }}
                        transition={{ duration: 8, repeat: Infinity }}
                    >
                        🏀
                    </motion.div>
                    <motion.div
                        className="absolute bottom-32 left-10 opacity-30 text-white text-5xl md:text-7xl"
                        animate={{ y: [0, 30, 0], rotate: [0, -360] }}
                        transition={{ duration: 9, repeat: Infinity, delay: 2 }}
                    >
                        ⚽
                    </motion.div>
                    <motion.div
                        className="absolute top-40 left-20 opacity-25 text-white text-4xl md:text-5xl"
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 7, repeat: Infinity }}
                    >
                        🎾
                    </motion.div>
                </div>

                {/* Navigation */}
                <motion.nav
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 mb-6 relative z-20"
                >
                    <motion.button
                        onClick={() => window.history.back()}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition border border-white/30"
                    >
                        <ArrowLeft size={20} />
                    </motion.button>
                    <div className="text-white">
                        <h1 className="font-black text-lg md:text-2xl drop-shadow-md">Jurnal Olahraga</h1>
                        <p className="text-sky-100 text-xs md:text-sm font-medium">Sehat pangkal cerdas! 💪</p>
                    </div>
                </motion.nav>

                {/* Main Card */}
                <motion.main
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative z-10 w-full max-w-3xl mx-auto"
                >
                    <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] md:rounded-[2.5rem] shadow-2xl p-6 md:p-8 overflow-hidden">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-center mb-8"
                        >
                            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-bold mb-3 shadow-sm">
                                <Flame size={16} className="animate-pulse" /> Ayo Gerak!
                            </div>
                            <h2 className="text-xl md:text-3xl font-black text-slate-800 mb-2">Olahraga apa hari ini?</h2>
                            <p className="text-slate-500 text-sm md:text-base">Pilih aktivitasmu dan catat kesehatanmu bersama kami.</p>
                        </motion.div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Sport Selection Grid */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <label className="block text-xs md:text-sm font-black text-slate-400 uppercase tracking-wider mb-4">
                                    Pilihan Aktivitas
                                </label>
                                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                                    {SPORTS_DATA.map((sport) => (
                                        <motion.button
                                            key={sport.id}
                                            type="button"
                                            onClick={() => handleSelectSport(sport.id)}
                                            whileHover={{ y: -4 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`relative p-4 rounded-2xl border-2 transition-all duration-300 h-24 md:h-28 flex flex-col items-center justify-center gap-2 ${selectedSport === sport.id
                                                ? 'border-sky-500 bg-sky-50 shadow-lg shadow-sky-400/40'
                                                : 'border-slate-200 bg-white hover:border-sky-300 hover:shadow-md'
                                                }`}
                                        >
                                            <div className="text-3xl md:text-4xl">{sport.emoji}</div>
                                            <span className="text-xs md:text-sm font-bold text-center leading-tight text-slate-700 line-clamp-2">
                                                {sport.name}
                                            </span>
                                            {selectedSport === sport.id && (
                                                <motion.div
                                                    layoutId="activeIndicator"
                                                    className="absolute top-2 right-2 bg-sky-500 text-white rounded-full p-1"
                                                >
                                                    <CheckCircle size={14} />
                                                </motion.div>
                                            )}
                                        </motion.button>
                                    ))}
                                </div>

                                {/* Custom Sport Input */}
                                <AnimatePresence>
                                    {selectedSport === 'lainnya' && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mt-4 overflow-hidden"
                                        >
                                            <input
                                                type="text"
                                                value={customSport}
                                                onChange={(e) => setCustomSport(e.target.value)}
                                                placeholder="Tulis nama olahraga lain..."
                                                className="w-full px-4 py-3 rounded-xl border border-sky-200 focus:border-sky-500 focus:outline-none bg-sky-50 text-sm"
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            {/* Duration & Calorie Slider */}
                            {selectedSport && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-6 border border-sky-100"
                                >
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                        <div>
                                            <label className="block text-xs md:text-sm font-black text-slate-400 uppercase tracking-wider mb-2">
                                                Durasi Latihan
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Clock size={18} className="text-sky-600" />
                                            <div className="text-2xl md:text-3xl font-black text-sky-600 font-mono bg-white px-4 md:px-5 py-2 rounded-lg shadow-md border border-sky-100">
                                                {duration}{' '}
                                                <span className="text-sm md:text-lg text-slate-500">menit</span>
                                            </div>
                                        </div>
                                    </div>

                                    <input
                                        type="range"
                                        min="5"
                                        max="120"
                                        step="5"
                                        value={duration}
                                        onChange={(e) => setDuration(parseInt(e.target.value))}
                                        className="w-full mb-3 accent-sky-500"
                                    />

                                    <div className="flex justify-between text-xs text-slate-400 font-bold px-1 mb-6">
                                        <span>5 mnt</span>
                                        <span>60 mnt</span>
                                        <span>120 mnt</span>
                                    </div>

                                    {/* Calorie & Intensity Badge */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <motion.div
                                            initial={{ scale: 0.9 }}
                                            animate={{ scale: 1 }}
                                            className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl px-4 py-3"
                                        >
                                            <Flame size={20} className="text-orange-500" />
                                            <div>

                                                <div className="grid grid-cols-2 gap-4 mt-4">
                                                    <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3">
                                                        <TrendingUp size={18} className="text-yellow-600" />
                                                        <div>
                                                            <p className="text-xs text-yellow-700 font-semibold">XP Reward</p>
                                                            <p className="text-lg font-black text-yellow-700">{reward.xp}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl px-4 py-3">
                                                        <Coins size={18} className="text-orange-600" />
                                                        <div>
                                                            <p className="text-xs text-orange-700 font-semibold">Koin</p>
                                                            <p className="text-lg font-black text-orange-700">{reward.coin}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-orange-600 font-semibold">Estimasi Bakar</p>
                                                <p className="text-lg md:text-xl font-black text-orange-600">

                                                    {selectedSport && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.6 }}
                                                            className="bg-white rounded-2xl p-6 border border-slate-100"
                                                        >
                                                            <div className="flex items-center justify-between mb-4">
                                                                <div>
                                                                    <p className="text-sm font-black text-slate-700">Foto Bukti (Opsional)</p>
                                                                    <p className="text-xs text-slate-500">Bonus +10 XP jika disetujui guru.</p>
                                                                </div>
                                                                <div className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-bold">
                                                                    Max 1 foto/hari
                                                                </div>
                                                            </div>

                                                            {!photoPreview ? (
                                                                <motion.label
                                                                    whileHover={{ scale: 1.02 }}
                                                                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition"
                                                                >
                                                                    <Upload size={24} className="text-slate-400 mb-2" />
                                                                    <p className="text-xs text-slate-500">Klik untuk upload foto</p>
                                                                    <input
                                                                        type="file"
                                                                        accept="image/*"
                                                                        onChange={handlePhotoChange}
                                                                        className="hidden"
                                                                    />
                                                                </motion.label>
                                                            ) : (
                                                                <div className="relative">
                                                                    <img
                                                                        src={photoPreview}
                                                                        alt="Preview"
                                                                        className="w-full h-32 object-cover rounded-2xl border border-slate-200"
                                                                    />
                                                                    <motion.button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setPhotoPreview(null);
                                                                            setPhotoFile(null);
                                                                        }}
                                                                        whileHover={{ scale: 1.05 }}
                                                                        whileTap={{ scale: 0.95 }}
                                                                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5"
                                                                    >
                                                                        <X size={14} />
                                                                    </motion.button>
                                                                </div>
                                                            )}
                                                        </motion.div>
                                                    )}
                                                    {estimatedCalories}{' '}
                                                    <span className="text-xs">kkal</span>
                                                </p>
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            initial={{ scale: 0.9 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.1 }}
                                            className="flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-xl px-4 py-3"
                                        >
                                            <Activity size={20} className="text-purple-500" />
                                            <div>
                                                <p className="text-xs text-purple-600 font-semibold">Intensitas</p>
                                                <p className="text-lg md:text-xl font-black text-purple-600">
                                                    {selectedSportData?.intensity}/10
                                                </p>
                                            </div>
                                        </motion.div>
                                    </div>

                                </motion.div>
                            )}

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={!selectedSport || isSubmitting}
                                whileHover={{ scale: !selectedSport || isSubmitting ? 1 : 1.02 }}
                                whileTap={{ scale: !selectedSport || isSubmitting ? 1 : 0.98 }}
                                className="w-full py-4 md:py-5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 disabled:from-slate-300 disabled:to-slate-300 text-white font-black rounded-2xl shadow-lg shadow-sky-500/30 transition-all text-base md:text-lg flex items-center justify-center gap-2"
                            >
                                <Trophy size={20} />
                                {isSubmitting ? 'Menyimpan...' : 'Catat Aktivitas'}
                            </motion.button>
                        </form>
                    </div>
                </motion.main>

                {/* Success Modal */}
                <AnimatePresence>
                    {showSuccess && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                        >
                            <motion.div
                                initial={{ scale: 0.8, y: 50 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.8, y: 50 }}
                                className="bg-white rounded-3xl p-8 max-w-sm w-full text-center relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-blue-50 z-0" />
                                <div className="relative z-10">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                                    >
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, delay: 0.3 }}
                                            className="text-5xl"
                                        >
                                            🏆
                                        </motion.div>
                                    </motion.div>
                                    <h3 className="text-3xl md:text-4xl font-black text-slate-800 mb-2">
                                        Kerja Bagus!
                                    </h3>
                                    <p className="text-slate-500 mb-4 text-base md:text-lg">
                                        Durasi tercatat. XP dan koin sudah dihitung.
                                    </p>
                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                                            <p className="text-xs font-semibold text-yellow-700">XP</p>
                                            <p className="text-xl font-black text-yellow-700">{earnedXP}</p>
                                        </div>
                                        <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
                                            <p className="text-xs font-semibold text-orange-700">Koin</p>
                                            <p className="text-xl font-black text-orange-700">{earnedCoin}</p>
                                        </div>
                                    </div>
                                    {photoFile && (
                                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-4">
                                            <p className="text-xs font-semibold text-emerald-700">
                                                Bonus foto +10 XP menunggu persetujuan.
                                            </p>
                                        </div>
                                    )}
                                    <div className="bg-sky-100 rounded-xl p-4 mb-4">
                                        <p className="text-sm font-semibold text-sky-700">
                                            ✨ Kamu semakin sehat dan kuat!
                                        </p>
                                    </div>
                                    <p className="text-xs text-slate-400">
                                        Kembali ke dashboard dalam beberapa detik...
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </StudentLayout>
    );
}
