import StudentLayout from '@/Layouts/StudentLayout';
import { Head, useForm } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Sun,
    Sunrise,
    Moon,
    Droplet,
    Apple,
    Salad,
    Fish,
    Wheat,
    CheckCircle,
    X,
    Upload,
    TrendingUp,
} from 'lucide-react';

const MEAL_TYPES = [
    {
        key: 'pagi',
        title: 'Makan Pagi',
        label: 'Pagi',
        desc: 'Sarapan',
        icon: Sunrise,
        accent: 'from-yellow-300 to-yellow-500',
        badge: 'bg-yellow-100 text-yellow-700',
    },
    {
        key: 'siang',
        title: 'Makan Siang',
        label: 'Siang',
        desc: 'Energi Penuh',
        icon: Sun,
        accent: 'from-orange-300 to-orange-500',
        badge: 'bg-orange-100 text-orange-700',
    },
    {
        key: 'malam',
        title: 'Makan Malam',
        label: 'Malam',
        desc: 'Istirahat',
        icon: Moon,
        accent: 'from-indigo-300 to-indigo-500',
        badge: 'bg-indigo-100 text-indigo-700',
    },
];

const NUTRIENTS = [
    {
        key: 'karbo',
        label: 'Karbohidrat',
        icon: Wheat,
        placeholder: 'Nasi / Roti / Kentang',
        color: 'text-orange-500',
    },
    {
        key: 'protein',
        label: 'Lauk Pauk',
        icon: Fish,
        placeholder: 'Ayam / Ikan / Tahu',
        color: 'text-red-500',
    },
    {
        key: 'sayur',
        label: 'Sayuran',
        icon: Salad,
        placeholder: 'Bayam / Sop / Brokoli',
        color: 'text-green-500',
    },
    {
        key: 'buah',
        label: 'Buah',
        icon: Apple,
        placeholder: 'Pisang / Jeruk / Apel',
        color: 'text-rose-500',
    },
];

const getMealXp = (filledCount) => {
    if (filledCount < 2) return 0;
    if (filledCount === 2) return 10;
    if (filledCount === 3) return 15;
    return 20;
};

const getWaterXp = (count) => {
    if (count >= 8) return 25;
    if (count >= 6) return 15;
    if (count >= 4) return 10;
    return 0;
};

export default function Makan({ auth = { user: {} } }) {
    const user = auth?.user || {};
    const [activeModal, setActiveModal] = useState(null);
    const [activeMeal, setActiveMeal] = useState(null);
    const [mealValues, setMealValues] = useState({});
    const [mealLogged, setMealLogged] = useState({});
    const [waterCount, setWaterCount] = useState(0);
    const [waterSaved, setWaterSaved] = useState(false);
    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const form = useForm({
        meal_type: '',
        nutrients: {},
        water_count: 0,
        photo: null,
    });

    const filledNutrients = useMemo(() => {
        return NUTRIENTS.filter((item) =>
            (mealValues[item.key] || '').trim().length > 0
        ).length;
    }, [mealValues]);

    const mealXp = useMemo(() => getMealXp(filledNutrients), [filledNutrients]);
    const waterXp = useMemo(() => getWaterXp(waterCount), [waterCount]);

    const loggedMealsCount = Object.keys(mealLogged).length;
    const fullMealsCount = Object.values(mealLogged).filter((meal) => meal.filled === 4).length;
    const perfectBonus = fullMealsCount === 3 && waterCount === 8 ? 15 : 0;

    const totalMealXp = Object.values(mealLogged).reduce((sum, meal) => sum + meal.xp, 0);
    const totalXp = totalMealXp + waterXp + perfectBonus;

    const openMealModal = (mealKey) => {
        if (mealLogged[mealKey]) {
            alert('Sesi makan ini sudah tercatat.');
            return;
        }
        if (loggedMealsCount >= 3) {
            alert('Maksimal 3 kali makan per hari.');
            return;
        }
        setActiveMeal(mealKey);
        setMealValues({});
        setActiveModal('meal');
    };

    const openWaterModal = () => {
        setActiveModal('water');
    };

    const closeModal = () => {
        setActiveModal(null);
        setActiveMeal(null);
        setMealValues({});
    };

    const handleMealInput = (key, value) => {
        setMealValues((prev) => ({ ...prev, [key]: value }));
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

    const saveMeal = (e) => {
        e.preventDefault();
        if (filledNutrients < 2) {
            alert('Minimal 2 unsur gizi wajib diisi.');
            return;
        }

        const xp = getMealXp(filledNutrients);
        setMealLogged((prev) => ({
            ...prev,
            [activeMeal]: {
                nutrients: { ...mealValues },
                filled: filledNutrients,
                xp,
            },
        }));

        form.setData({
            meal_type: activeMeal,
            nutrients: { ...mealValues },
            photo: photoFile,
        });

        if (typeof window !== 'undefined' && window.confetti) {
            window.confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#0ea5e9', '#fbbf24', '#f43f5e'],
            });
        }

        setSuccessMessage('Jurnal makan tersimpan');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 1500);
        closeModal();
    };

    const saveWater = () => {
        setWaterSaved(true);
        form.setData('water_count', waterCount);
        setSuccessMessage('Catatan air minum tersimpan');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 1500);
        setActiveModal(null);
    };

    return (
        <StudentLayout user={user}>
            <Head title="Jurnal Gizi - Si Hebat" />

            <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100 relative overflow-x-hidden">
                <div className="absolute top-20 left-10 opacity-60 pointer-events-none">
                    <Apple className="text-orange-400" size={72} />
                </div>
                <div className="absolute top-32 right-12 opacity-60 pointer-events-none">
                    <Apple className="text-red-400" size={64} />
                </div>
                <div className="absolute top-1/3 left-1/2 opacity-40 pointer-events-none">
                    <Salad className="text-green-400" size={48} />
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
                        className="w-10 h-10 bg-white/30 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/50 transition border border-white/40 shadow-sm"
                    >
                        <ArrowLeft size={20} />
                    </motion.button>
                    <div className="text-white">
                        <h1 className="font-black text-lg md:text-2xl drop-shadow-md">Jurnal Gizi</h1>
                        <p className="text-sky-100 text-xs md:text-sm font-medium">Nutrisi seimbang, tubuh kuat!</p>
                    </div>
                </motion.nav>

                <main className="px-4 pb-32 relative z-20 w-full max-w-3xl mx-auto">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl md:text-3xl font-black text-white drop-shadow-md mb-2">
                            Waktu Makan Apa Sekarang?
                        </h2>
                        <p className="text-sky-100 text-sm font-medium">Catat setiap sesi makanmu.</p>
                    </div>

                    <div className="bg-white/80 border border-white/50 rounded-2xl p-4 mb-6 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600">
                            <div className="flex items-center gap-2">
                                <CheckCircle size={16} className="text-slate-400" />
                                Minimal 2 unsur gizi agar dihitung.
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle size={16} className="text-slate-400" />
                                Maksimal 3x makan per hari.
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle size={16} className="text-slate-400" />
                                Target air minum 8 gelas.
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {MEAL_TYPES.map((meal) => (
                            <motion.button
                                key={meal.key}
                                onClick={() => openMealModal(meal.key)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-lg text-center"
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-4 mx-auto bg-gradient-to-br ${meal.accent}`}>
                                    <meal.icon size={26} />
                                </div>
                                <h3 className="font-black text-slate-700 text-lg">{meal.label}</h3>
                                <p className="text-xs text-slate-400">{meal.desc}</p>
                                {mealLogged[meal.key] && (
                                    <span className={`mt-2 inline-block text-[10px] font-bold px-2 py-1 rounded-full ${meal.badge}`}>
                                        +{mealLogged[meal.key].xp} XP
                                    </span>
                                )}
                            </motion.button>
                        ))}
                        <motion.button
                            onClick={openWaterModal}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-lg text-center"
                        >
                            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-500 mb-4 mx-auto">
                                <Droplet size={26} />
                            </div>
                            <h3 className="font-black text-slate-700 text-lg">Air Minum</h3>
                            <p className="text-xs text-slate-400">Target 8 Gelas</p>
                            {waterSaved && (
                                <span className="mt-2 inline-block text-[10px] font-bold px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                                    +{waterXp} XP
                                </span>
                            )}
                        </motion.button>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white/90 rounded-2xl p-4 border border-white/60 shadow-sm">
                            <p className="text-xs text-slate-500">Makan Tercatat</p>
                            <p className="text-2xl font-black text-slate-700">{loggedMealsCount}/3</p>
                        </div>
                        <div className="bg-white/90 rounded-2xl p-4 border border-white/60 shadow-sm">
                            <p className="text-xs text-slate-500">Air Minum</p>
                            <p className="text-2xl font-black text-slate-700">{waterCount}/8</p>
                        </div>
                        <div className="bg-white/90 rounded-2xl p-4 border border-white/60 shadow-sm">
                            <p className="text-xs text-slate-500">Total XP Hari Ini</p>
                            <p className="text-2xl font-black text-slate-700">+{totalXp}</p>
                        </div>
                    </div>
                    {perfectBonus > 0 && (
                        <div className="mt-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl p-4 text-sm font-bold">
                            Bonus hari sempurna +15 XP aktif!
                        </div>
                    )}
                </main>

                <div className="fixed bottom-0 w-full pointer-events-none">
                    <svg className="w-full h-auto text-sky-200" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentColor" fillOpacity="0.8" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
                    </svg>
                    <svg className="absolute bottom-0 w-full h-auto text-sky-400" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                        <path fill="currentColor" fillOpacity="1" d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
                    </svg>
                </div>

                <AnimatePresence>
                    {activeModal === 'meal' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={closeModal}
                                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, y: '100%' }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                className="relative bg-white w-full max-w-lg rounded-t-[2rem] sm:rounded-[2rem] p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
                            >
                                <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />
                                <motion.button
                                    onClick={closeModal}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full"
                                >
                                    <X size={18} />
                                </motion.button>

                                <h3 className="text-2xl font-black text-center text-slate-800 mb-1">
                                    {MEAL_TYPES.find((meal) => meal.key === activeMeal)?.title}
                                </h3>
                                <p className="text-center text-slate-400 text-sm mb-6">
                                    Centang minimal 2 unsur gizi.
                                </p>

                                <form onSubmit={saveMeal} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {NUTRIENTS.map((item) => (
                                            <div key={item.key} className="bg-white border-2 border-slate-100 rounded-2xl p-4">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <item.icon className={item.color} size={20} />
                                                    <span className="font-bold text-slate-700">{item.label}</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder={item.placeholder}
                                                    value={mealValues[item.key] || ''}
                                                    onChange={(e) => handleMealInput(item.key, e.target.value)}
                                                    className="w-full text-sm px-3 py-2 bg-slate-50 border rounded-lg"
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 flex items-center justify-between">
                                        <div className="text-xs text-slate-500">XP Makan</div>
                                        <div className="text-sm font-black text-slate-700">+{mealXp} XP</div>
                                    </div>

                                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <p className="text-sm font-bold text-slate-700">Foto Makan (Opsional)</p>
                                            <span className="text-[10px] font-bold text-slate-500">Max 1 foto/hari</span>
                                        </div>
                                        {!photoPreview ? (
                                            <motion.label
                                                whileHover={{ scale: 1.02 }}
                                                className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer bg-white"
                                            >
                                                <Upload size={20} className="text-slate-400 mb-2" />
                                                <p className="text-xs text-slate-500">Klik untuk upload foto</p>
                                                <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
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
                                    </div>

                                    <motion.button
                                        type="submit"
                                        className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-black rounded-xl shadow-lg transition"
                                    >
                                        Simpan Jurnal Makan
                                    </motion.button>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {activeModal === 'water' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={closeModal}
                                className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, y: '100%' }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                className="relative bg-white w-full max-w-sm rounded-t-[2rem] sm:rounded-[2rem] p-6 text-center"
                            >
                                <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />
                                <h3 className="text-2xl font-black text-slate-800">Target Air Minum</h3>
                                <p className="text-slate-500 text-sm mb-4">Masukkan jumlah gelas yang kamu minum.</p>

                                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-4">
                                    <div className="text-3xl font-black text-blue-600">{waterCount}</div>
                                    <p className="text-xs text-blue-600">dari 8 gelas</p>
                                </div>

                                <input
                                    type="range"
                                    min="0"
                                    max="8"
                                    value={waterCount}
                                    onChange={(e) => setWaterCount(parseInt(e.target.value, 10))}
                                    className="w-full accent-sky-500 mb-4"
                                />
                                <div className="flex justify-between text-xs text-slate-400 mb-4">
                                    <span>0</span>
                                    <span>4</span>
                                    <span>8</span>
                                </div>

                                <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-blue-700">
                                        <TrendingUp size={18} /> XP Air
                                    </div>
                                    <span className="text-sm font-black text-blue-700">+{waterXp} XP</span>
                                </div>

                                <motion.button
                                    onClick={saveWater}
                                    className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl"
                                >
                                    Simpan Catatan Air
                                </motion.button>
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
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 40 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 40 }}
                                className="bg-white rounded-3xl p-8 max-w-sm w-full text-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle size={26} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-800 mb-2">Tersimpan</h3>
                                <p className="text-sm text-slate-500">{successMessage}</p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </StudentLayout>
    );
}
