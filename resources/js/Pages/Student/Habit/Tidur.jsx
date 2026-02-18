import StudentLayout from '@/Layouts/StudentLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Moon,
    Sun,
    AlarmClock,
    ShieldAlert,
    BookOpenCheck,
    CheckCircle,
} from 'lucide-react';

const REASONS = [
    'Tugas Sekolah',
    'Belajar',
    'Acara Keluarga',
    'Sakit',
    'Main Game / Sosial Media',
    'Lainnya',
];

const buildStars = (count) =>
    Array.from({ length: count }).map((_, idx) => ({
        id: `star-${idx}`,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 4,
    }));

const getTimeStatus = (hours, minutes) => {
    const total = hours * 60 + minutes;

    if (total >= 180 && total < 1140) {
        return { key: 'early', label: 'Belum Waktunya', xp: null };
    }

    if (total >= 1140 && total < 1320) {
        return { key: 'ideal', label: 'Waktunya Tidur', xp: 50 };
    }

    if (total >= 1320 && total < 1380) {
        return { key: 'late-light', label: 'Terlambat', xp: 40 };
    }

    if (total >= 1380 && total < 1440) {
        return { key: 'late-mid', label: 'Begadang Sedang', xp: 30 };
    }

    if (total >= 0 && total < 120) {
        return { key: 'late-heavy', label: 'Begadang Berat', xp: 15 };
    }

    if (total >= 120 && total < 180) {
        return { key: 'late-very', label: 'Sangat Larut', xp: 0 };
    }

    return { key: 'early', label: 'Belum Waktunya', xp: null };
};

export default function Tidur({ auth = { user: {} } }) {
    const user = auth?.user || {};
    const [now, setNow] = useState(new Date());
    const [showPrayerPrompt, setShowPrayerPrompt] = useState(false);
    const [prayerConfirmed, setPrayerConfirmed] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [earnedXP, setEarnedXP] = useState(0);
    const [stars] = useState(() => buildStars(60));

    const form = useForm({
        note: '',
        reason: '',
        timestamp: '',
    });

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const timeInfo = useMemo(() => {
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const status = getTimeStatus(hours, minutes);
        return {
            hours,
            minutes,
            status,
            displayTime: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`,
            displayDate: now.toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'short',
            }),
        };
    }, [now]);

    const isLate = timeInfo.status.key.startsWith('late');
    const isEarly = timeInfo.status.key === 'early';

    const calculateXP = () => {
        if (timeInfo.status.xp === null) return 0;
        if (!isLate) return timeInfo.status.xp;
        if (!form.data.reason) return Math.max(0, timeInfo.status.xp - 10);
        return timeInfo.status.xp;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEarly) {
            return;
        }

        if (!prayerConfirmed) {
            setShowPrayerPrompt(true);
            return;
        }

        const xp = calculateXP();
        setEarnedXP(xp);
        setSubmitted(true);
        setShowSuccess(true);
        form.setData('timestamp', now.toISOString());

        if (typeof window !== 'undefined' && window.confetti) {
            window.confetti({
                particleCount: 120,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#6366f1', '#a855f7', '#ffffff'],
            });
        }

        setTimeout(() => {
            setShowSuccess(false);
        }, 1800);
    };

    return (
        <StudentLayout user={user}>
            <Head title="Jurnal Tidur - Si Hebat" />

            <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
                <style>{`
                    .star {
                        position: absolute;
                        background: white;
                        border-radius: 9999px;
                        animation: twinkle var(--duration) ease-in-out infinite;
                    }
                    @keyframes twinkle {
                        0% { opacity: 0.3; transform: scale(0.8); }
                        100% { opacity: 1; transform: scale(1.2); }
                    }
                    @keyframes shooting {
                        0% { transform: translateX(0) translateY(0) rotate(-45deg); opacity: 1; }
                        100% { transform: translateX(-400px) translateY(400px) rotate(-45deg); opacity: 0; }
                    }
                `}</style>

                <div className="absolute inset-0 pointer-events-none">
                    {stars.map((star) => (
                        <div
                            key={star.id}
                            className="star"
                            style={{
                                left: `${star.left}%`,
                                top: `${star.top}%`,
                                width: `${star.size}px`,
                                height: `${star.size}px`,
                                animationDuration: `${star.duration}s`,
                                animationDelay: `${star.delay}s`,
                            }}
                        />
                    ))}
                    <div
                        className="absolute top-10 right-20 w-1 h-1 bg-white rounded-full"
                        style={{ animation: 'shooting 5s linear infinite', animationDelay: '1s' }}
                    />
                    <div
                        className="absolute top-24 right-10 w-1 h-1 bg-white rounded-full"
                        style={{ animation: 'shooting 6s linear infinite', animationDelay: '3s' }}
                    />
                    <div className="absolute top-8 right-8 w-20 h-20 rounded-full bg-yellow-100/90 shadow-[0_0_60px_rgba(253,224,71,0.6)]" />
                </div>

                <motion.nav
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 md:p-6 flex items-center gap-4 relative z-20"
                >
                    <motion.button
                        onClick={() => window.history.back()}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition border border-white/20 shadow-lg"
                    >
                        <ArrowLeft size={20} />
                    </motion.button>
                    <div>
                        <h1 className="font-black text-lg md:text-2xl drop-shadow-md">Jurnal Tidur</h1>
                        <p className="text-indigo-200 text-xs md:text-sm font-medium">Istirahat cukup untuk esok yang cerah</p>
                    </div>
                </motion.nav>

                <main className="px-4 pb-24 relative z-20 w-full max-w-lg mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-6"
                    >
                        <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 px-8 py-5 rounded-3xl shadow-2xl">
                            <div className="flex items-center justify-end">
                                <span className="text-[10px] font-bold bg-black/30 px-2 py-1 rounded-full text-indigo-200">
                                    {timeInfo.status.label}
                                </span>
                            </div>
                            <div className="text-5xl md:text-6xl font-black tracking-widest text-indigo-100 drop-shadow-[0_0_10px_rgba(165,180,252,0.8)]">
                                {timeInfo.displayTime}
                            </div>
                            <div className="text-indigo-300 text-xs md:text-sm font-medium mt-1 tracking-wide uppercase">
                                {timeInfo.displayDate}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`border rounded-[2.5rem] p-6 md:p-8 shadow-2xl transition-all ${isLate
                                ? 'bg-red-950/40 border-red-500/30'
                                : 'bg-white/10 border-white/20'
                            }`}
                    >
                        <div className="text-center mb-6">
                            <h2 className={`text-2xl font-black mb-2 ${isLate ? 'text-red-400' : 'text-white'}`}>
                                {isLate ? 'Jangan Begadang!' : 'Selamat Malam'}
                            </h2>
                            <p className="text-indigo-200 text-sm">
                                Target tidur: <strong>19:00 - 22:00</strong> WIB
                            </p>
                        </div>

                        {isLate && (
                            <div className="bg-red-500/20 border border-red-500/50 p-4 rounded-xl flex items-start gap-3 mb-4">
                                <ShieldAlert size={20} className="text-red-300 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-red-100 text-sm">Kamu Begadang!</h4>
                                    <p className="text-xs text-red-200/80">Tidur larut menurunkan fokus dan energi.</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!isLate && (
                                <div>
                                    <label className="block text-sm font-bold text-indigo-100 mb-2">Catatan (Opsional)</label>
                                    <textarea
                                        rows={2}
                                        placeholder="Apa yang kamu syukuri hari ini?"
                                        value={form.data.note}
                                        onChange={(e) => form.setData('note', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-black/20 border border-indigo-500/30 text-white placeholder-indigo-300/50 focus:border-indigo-300 focus:outline-none transition resize-none"
                                    />
                                </div>
                            )}

                            {isLate && (
                                <div>
                                    <label className="block text-sm font-bold text-red-100 mb-2">
                                        Alasan Begadang {form.data.reason ? '' : '(Wajib)'}
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={form.data.reason}
                                            onChange={(e) => form.setData('reason', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-black/30 border border-red-500/30 text-white focus:border-red-400 focus:outline-none appearance-none"
                                        >
                                            <option value="">Pilih alasan...</option>
                                            {REASONS.map((reason) => (
                                                <option key={reason} value={reason}>{reason}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {!form.data.reason && (
                                        <p className="text-xs text-red-200/80 mt-2">
                                            Jika tidak memilih alasan, XP akan berkurang 10.
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="flex items-center justify-between bg-black/20 border border-indigo-500/30 rounded-xl px-4 py-3">
                                <div className="flex items-center gap-2 text-sm text-indigo-100">
                                    <AlarmClock size={18} />
                                    XP didapat
                                </div>
                                <span className="text-sm font-black text-white">+{calculateXP()} XP</span>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isEarly || submitted}
                                whileHover={{ scale: isEarly || submitted ? 1 : 1.02 }}
                                whileTap={{ scale: isEarly || submitted ? 1 : 0.98 }}
                                className={`w-full py-4 rounded-2xl font-black shadow-lg transition flex items-center justify-center gap-2 text-lg ${isEarly || submitted
                                        ? 'bg-slate-700/60 text-slate-300 cursor-not-allowed'
                                        : isLate
                                            ? 'bg-red-600 hover:bg-red-700'
                                            : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500'
                                    }`}
                            >
                                <Moon size={20} />
                                {isLate ? 'Lapor & Tidur' : 'Selamat Tidur'}
                            </motion.button>

                            {submitted && (
                                <div className="text-xs text-indigo-200 flex items-center gap-2 justify-center">
                                    <BookOpenCheck size={16} />
                                    Mode tidur aktif sampai pukul 03:00 (simulasi)
                                </div>
                            )}
                        </form>
                    </motion.div>
                </main>

                <AnimatePresence>
                    {showPrayerPrompt && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 30 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 30 }}
                                className="bg-slate-900 border border-indigo-500/40 rounded-3xl p-6 max-w-sm w-full text-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-indigo-900 text-indigo-200 flex items-center justify-center mx-auto mb-4">
                                    <Sun size={26} />
                                </div>
                                <h3 className="text-xl font-black text-white mb-2">Sudahkah kamu berdoa?</h3>
                                <p className="text-sm text-indigo-200 mb-5">Konfirmasi sebelum tidur agar lebih tenang.</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => {
                                            setPrayerConfirmed(true);
                                            setShowPrayerPrompt(false);
                                        }}
                                        className="py-2.5 rounded-xl bg-indigo-500 text-white font-bold"
                                    >
                                        Sudah
                                    </button>
                                    <button
                                        onClick={() => setShowPrayerPrompt(false)}
                                        className="py-2.5 rounded-xl bg-white/10 text-indigo-100 font-bold"
                                    >
                                        Ingatkan
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isEarly && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                        >
                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.9 }}
                                className="bg-indigo-950 border border-indigo-500/40 rounded-3xl p-6 max-w-sm w-full text-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-indigo-900 text-yellow-300 flex items-center justify-center mx-auto mb-4">
                                    <Sun size={26} />
                                </div>
                                <h3 className="text-xl font-black text-white mb-2">Belum waktunya tidur</h3>
                                <p className="text-sm text-indigo-200 mb-5">Jurnal tidur bisa diisi mulai pukul 19:00 WIB.</p>
                                <button
                                    onClick={() => window.history.back()}
                                    className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-bold"
                                >
                                    Kembali
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {showSuccess && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 30 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 30 }}
                                className="bg-white rounded-3xl p-8 max-w-sm w-full text-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle size={26} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-800 mb-2">Selamat tidur!</h3>
                                <p className="text-sm text-slate-500 mb-4">Laporan tidur tercatat.</p>
                                <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                                    <span className="text-sm font-black text-slate-800">+{earnedXP} XP</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </StudentLayout>
    );
}
