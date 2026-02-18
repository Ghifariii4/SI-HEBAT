import StudentLayout from '@/Layouts/StudentLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    BookOpen,
    Bookmark,
    Rocket,
    Globe,
    Lightbulb,
    Save,
    X,
    Upload,
    TrendingUp,
} from 'lucide-react';

const MENU_CONFIG = {
    catatan: {
        title: 'Catatan Pelajaran',
        icon: BookOpen,
        colorClass: 'from-blue-100 to-blue-50',
        textColor: 'text-blue-600',
        bgColor: 'bg-blue-100',
        emoji: '📓',
        description: 'Ringkasan materi sekolah',
        fields: [
            {
                name: 'subject',
                label: 'Mata Pelajaran / Judul',
                type: 'text',
                placeholder: 'Contoh: Matematika - Aljabar',
                required: true,
            },
            {
                name: 'duration',
                label: 'Durasi (menit)',
                type: 'number',
                placeholder: '30',
                required: true,
                min: 15,
                max: 120,
                col: 'col-span-1',
            },
            {
                name: 'summary',
                label: 'Ringkasan (min 30 karakter)',
                type: 'textarea',
                placeholder: 'Poin penting apa yang kamu catat?',
                rows: 3,
                minLength: 30,
            },
        ],
        bonus: 5,
    },
    buku: {
        title: 'Baca Buku',
        icon: Bookmark,
        colorClass: 'from-yellow-100 to-yellow-50',
        textColor: 'text-yellow-600',
        bgColor: 'bg-yellow-100',
        emoji: '📚',
        description: 'Literasi & wawasan',
        fields: [
            {
                name: 'bookTitle',
                label: 'Judul Buku',
                type: 'text',
                placeholder: 'Contoh: Laskar Pelangi',
                required: true,
            },
            {
                name: 'pageFrom',
                label: 'Dari Halaman',
                type: 'number',
                placeholder: '10',
                col: 'col-span-1',
            },
            {
                name: 'pageTo',
                label: 'Sampai Halaman',
                type: 'number',
                placeholder: '25',
                col: 'col-span-1',
            },
            {
                name: 'duration',
                label: 'Durasi (menit)',
                type: 'number',
                placeholder: '30',
                required: true,
                min: 15,
                max: 120,
            },
            {
                name: 'information',
                label: 'Informasi / Moral (min 30 karakter)',
                type: 'textarea',
                placeholder: 'Apa pelajaran moralnya?',
                rows: 2,
                minLength: 30,
            },
        ],
        bonus: 5,
    },
    karya: {
        title: 'Karya & Proyek',
        icon: Rocket,
        colorClass: 'from-purple-100 to-purple-50',
        textColor: 'text-purple-600',
        bgColor: 'bg-purple-100',
        emoji: '🎨',
        description: 'Proyek & kreativitas',
        fields: [
            {
                name: 'projectName',
                label: 'Nama Karya',
                type: 'text',
                placeholder: 'Contoh: Lukisan Pemandangan / Robot Kardus',
                required: true,
            },
            {
                name: 'duration',
                label: 'Durasi (menit)',
                type: 'number',
                placeholder: '60',
                required: true,
                min: 15,
                max: 120,
            },
            {
                name: 'projectDesc',
                label: 'Deskripsi Karya (min 30 karakter)',
                type: 'textarea',
                placeholder: 'Ceritakan sedikit tentang karyamu...',
                rows: 3,
                minLength: 30,
            },
        ],
        bonus: 10,
    },
    lainnya: {
        title: 'Eksplorasi Lain',
        icon: Globe,
        colorClass: 'from-emerald-100 to-emerald-50',
        textColor: 'text-emerald-600',
        bgColor: 'bg-emerald-100',
        emoji: '🌍',
        description: 'Belajar hal baru',
        fields: [
            {
                name: 'topic',
                label: 'Topik Belajar',
                type: 'text',
                placeholder: 'Contoh: Belajar Coding HTML / Sejarah Majapahit',
                required: true,
            },
            {
                name: 'duration',
                label: 'Durasi (menit)',
                type: 'number',
                placeholder: '30',
                required: true,
                min: 15,
                max: 120,
            },
            {
                name: 'source',
                label: 'Sumber Belajar',
                type: 'text',
                placeholder: 'Link Youtube / Artikel / Nama Mentor',
            },
            {
                name: 'notes',
                label: 'Ringkasan (min 30 karakter)',
                type: 'textarea',
                placeholder: 'Apa yang menarik?',
                rows: 2,
                minLength: 30,
            },
        ],
        bonus: 5,
    },
};

const calculateBelajarXP = (duration, bonus) => {
    const minutes = Math.min(Math.max(duration, 0), 120);
    let base = 0;
    if (minutes >= 91) base = 60;
    else if (minutes >= 60) base = 45;
    else if (minutes >= 30) base = 30;
    else if (minutes >= 15) base = 15;
    return base + bonus;
};

export default function Belajar({ auth = { user: {} } }) {
    const user = auth?.user || {};
    const [activeModal, setActiveModal] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [earnedXP, setEarnedXP] = useState(0);

    const form = useForm({
        type: '',
        data: {},
    });

    const currentConfig = activeModal ? MENU_CONFIG[activeModal] : null;
    const Icon = currentConfig?.icon;

    const handleOpenModal = (type) => {
        setActiveModal(type);
        form.reset();
        setPhotoPreview(null);
    };

    const handleCloseModal = () => {
        setActiveModal(null);
        form.reset();
        setPhotoPreview(null);
    };

    const handleInputChange = (fieldName, value) => {
        form.setData('data', {
            ...form.data.data,
            [fieldName]: value,
        });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            setPhotoPreview(event.target?.result || null);
            handleInputChange('photo', file);
        };
        reader.readAsDataURL(file);
    };

    const validateForm = () => {
        const data = form.data.data || {};
        if (!data.photo) {
            alert('Foto bukti belajar wajib diupload.');
            return false;
        }

        for (const field of currentConfig.fields) {
            if (field.required && (!data[field.name] || data[field.name].toString().trim() === '')) {
                alert(`"${field.label}" wajib diisi!`);
                return false;
            }
            if (field.minLength && data[field.name] && data[field.name].length < field.minLength) {
                alert(`"${field.label}" minimal ${field.minLength} karakter.`);
                return false;
            }
        }

        const duration = parseInt(data.duration || 0, 10);
        if (duration < 15) {
            alert('Minimal durasi belajar adalah 15 menit.');
            return false;
        }
        if (duration > 120) {
            alert('Maksimal durasi belajar adalah 120 menit.');
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const duration = parseInt(form.data.data?.duration || 0, 10);
        const xp = calculateBelajarXP(duration, currentConfig.bonus || 0);
        setEarnedXP(xp);

        setIsSubmitting(true);
        form.setData('type', activeModal);

        setTimeout(() => {
            setIsSubmitting(false);
            handleCloseModal();
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 1800);
        }, 1200);
    };

    return (
        <StudentLayout user={user}>
            <Head title="Gemar Belajar - Si Hebat" />

            <div className="min-h-screen bg-gradient-to-b from-sky-200 via-white to-sky-50 p-4 md:p-8 pb-24 relative overflow-hidden">
                {/* Floating Background Elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <motion.div
                        className="absolute top-20 left-10 opacity-40 text-sky-600 text-6xl md:text-8xl"
                        animate={{ y: [0, -25, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 6, repeat: Infinity }}
                    >
                        📖
                    </motion.div>
                    <motion.div
                        className="absolute top-32 right-12 opacity-30 text-indigo-500 text-7xl md:text-9xl"
                        animate={{ y: [0, -30, 0] }}
                        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
                    >
                        🧠
                    </motion.div>
                    <motion.div
                        className="absolute bottom-40 left-16 opacity-30 text-orange-400 text-5xl md:text-7xl"
                        animate={{ y: [0, 25, 0], rotate: [0, -5, 0] }}
                        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
                    >
                        ✏️
                    </motion.div>
                    <motion.div
                        className="absolute bottom-20 right-20 opacity-30 text-slate-500 text-6xl md:text-8xl"
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 6, repeat: Infinity }}
                    >
                        💻
                    </motion.div>
                </div>

                {/* Navigation */}
                <motion.nav
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 mb-8 md:mb-12 relative z-20"
                >
                    <motion.button
                        onClick={() => window.history.back()}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 bg-white/50 backdrop-blur-md rounded-xl flex items-center justify-center text-sky-600 hover:bg-white transition border border-white/60 shadow-sm"
                    >
                        <ArrowLeft size={20} />
                    </motion.button>
                    <div>
                        <h1 className="font-black text-lg md:text-2xl text-slate-800 drop-shadow-sm">
                            Jurnal Belajar
                        </h1>
                        <p className="text-slate-500 text-xs md:text-sm font-medium">
                            Buka wawasanmu setiap hari
                        </p>
                    </div>
                </motion.nav>

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-10 md:mb-14 relative z-20"
                >
                    <div className="inline-flex items-center gap-2 bg-white/80 border border-sky-100 px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-bold text-sky-600 mb-4 shadow-sm">
                        <Lightbulb size={16} className="text-yellow-400" />
                        Apa yang kamu pelajari hari ini?
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black text-slate-800 leading-tight">
                        Ilmu adalah Harta
                        <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
                            yang Tak Akan Habis
                        </span>
                    </h2>
                </motion.div>

                {/* Menu Grid */}
                <div className="max-w-4xl mx-auto relative z-20">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
                        {Object.entries(MENU_CONFIG).map(([key, config], idx) => {
                            const MenuIcon = config.icon;
                            return (
                                <motion.button
                                    key={key}
                                    onClick={() => handleOpenModal(key)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + idx * 0.1 }}
                                    whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative overflow-hidden bg-white p-5 md:p-6 rounded-2xl md:rounded-3xl border border-slate-100 shadow-lg hover:shadow-xl transition-all group text-left h-full flex flex-col"
                                >
                                    {/* Decorative Corner */}
                                    <div
                                        className={`absolute top-0 right-0 w-20 md:w-24 h-20 md:h-24 rounded-bl-[2rem] md:rounded-bl-[4rem] -mr-3 md:-mr-4 -mt-3 md:-mt-4 transition-transform group-hover:scale-110 z-0 bg-gradient-to-br ${config.colorClass}`}
                                    />

                                    <div className="relative z-10">
                                        <div
                                            className={`w-12 h-12 md:w-14 md:h-14 ${config.bgColor} ${config.textColor} rounded-2xl flex items-center justify-center text-xl md:text-2xl mb-3 md:mb-4 shadow-sm`}
                                        >
                                            <MenuIcon size={24} />
                                        </div>
                                        <h3 className="font-black text-slate-800 text-base md:text-lg leading-snug">
                                            {config.title}
                                        </h3>
                                        <p className="text-xs md:text-sm text-slate-400 mt-1 font-medium">
                                            {config.description}
                                        </p>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Modal */}
                <AnimatePresence>
                    {activeModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
                        >
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={handleCloseModal}
                                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                            />

                            {/* Modal Card */}
                            <motion.div
                                initial={{ opacity: 0, y: '100%' }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: '100%' }}
                                transition={{
                                    type: 'spring',
                                    damping: 25,
                                    stiffness: 300,
                                }}
                                className="relative bg-white w-full max-w-lg rounded-t-3xl sm:rounded-[2.5rem] p-6 md:p-8 shadow-2xl"
                            >
                                {/* Drag Indicator */}
                                <div className="hidden sm:flex w-16 h-1.5 bg-slate-200 rounded-full mx-auto mb-6" />

                                {/* Close Button */}
                                <motion.button
                                    onClick={handleCloseModal}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition"
                                >
                                    <X size={20} />
                                </motion.button>

                                {/* Header */}
                                <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                                    <div
                                        className={`w-12 md:w-14 h-12 md:h-14 rounded-2xl flex items-center justify-center text-xl md:text-2xl shadow-sm border border-slate-100 ${currentConfig.bgColor} ${currentConfig.textColor}`}
                                    >
                                        <Icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-black text-slate-800">
                                            {currentConfig.title}
                                        </h3>
                                        <p className="text-xs md:text-sm text-slate-400 font-medium">
                                            Isi jurnalmu dengan jujur ya!
                                        </p>
                                    </div>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                                    <div className="grid grid-cols-2 gap-4 md:gap-5">
                                        {currentConfig.fields.map((field) => (
                                            <div
                                                key={field.name}
                                                className={field.col || 'col-span-2'}
                                            >
                                                <label className="block text-sm md:text-base font-bold text-slate-700 mb-1 md:mb-2">
                                                    {field.label}
                                                    {field.required && (
                                                        <span className="text-red-500 ml-1">*</span>
                                                    )}
                                                </label>

                                                {field.type === 'textarea' ? (
                                                    <textarea
                                                        rows={field.rows || 3}
                                                        placeholder={field.placeholder}
                                                        minLength={field.minLength}
                                                        value={
                                                            form.data.data?.[field.name] || ''
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                field.name,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full px-3 md:px-4 py-2 md:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-sky-500 focus:outline-none transition resize-none text-sm md:text-base"
                                                    />
                                                ) : (
                                                    <input
                                                        type={field.type}
                                                        placeholder={field.placeholder}
                                                        required={field.required}
                                                        min={field.min}
                                                        max={field.max}
                                                        value={
                                                            form.data.data?.[field.name] || ''
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                field.name,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full px-3 md:px-4 py-2 md:py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-sky-500 focus:outline-none transition text-sm md:text-base"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div>
                                        <label className="block text-sm md:text-base font-bold text-slate-700 mb-2">
                                            Foto Bukti (Wajib)
                                        </label>
                                        {!photoPreview ? (
                                            <motion.label
                                                whileHover={{ scale: 1.02 }}
                                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition"
                                            >
                                                <Upload size={22} className="text-slate-400 mb-2" />
                                                <p className="text-xs text-slate-500">Klik untuk upload foto belajar</p>
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
                                                        handleInputChange('photo', null);
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

                                    {form.data.data?.duration && (
                                        <div className="flex items-center justify-between bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3">
                                            <div className="flex items-center gap-2 text-sm text-yellow-700">
                                                <TrendingUp size={18} /> XP didapat
                                            </div>
                                            <span className="text-sm font-black text-yellow-700">
                                                +{calculateBelajarXP(
                                                    parseInt(form.data.data.duration || 0, 10),
                                                    currentConfig.bonus || 0
                                                )} XP
                                            </span>
                                        </div>
                                    )}

                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                        className="w-full mt-6 md:mt-8 py-3 md:py-4 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-300 text-white font-bold rounded-2xl shadow-lg shadow-sky-500/30 transition-all flex items-center justify-center gap-2 text-base md:text-lg"
                                    >
                                        <Save size={18} />
                                        {isSubmitting ? 'Menyimpan...' : 'Simpan ke Jurnal'}
                                    </motion.button>
                                </form>
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
                                    <TrendingUp size={26} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-800 mb-2">Tercatat!</h3>
                                <p className="text-sm text-slate-500 mb-4">Aktivitas belajarmu berhasil disimpan.</p>
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
