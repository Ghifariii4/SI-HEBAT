import StudentLayout from '@/Layouts/StudentLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Trash2,
    Users,
    HandHeart,
    MapPin,
    MessageSquare,
    ClipboardList,
    Camera,
    Upload,
    X,
    CheckCircle,
} from 'lucide-react';

const SOCIAL_CONFIG = {
    lingkungan: {
        title: 'Bersih Lingkungan',
        description: 'Kerja bakti, buang sampah, atau rapikan area sekitar.',
        theme: 'emerald',
        cardGradient: 'from-emerald-50 to-emerald-100',
        badgeBg: 'bg-emerald-100 text-emerald-700',
        iconBg: 'bg-emerald-100 text-emerald-600',
        icon: Trash2,
        xp: 35,
        photoRequired: true,
        fields: [
            {
                name: 'activity',
                label: 'Jenis Kegiatan',
                placeholder: 'Contoh: Kerja bakti, pungut sampah',
                required: true,
            },
            {
                name: 'location',
                label: 'Lokasi / Tempat',
                placeholder: 'Contoh: Halaman sekolah / Selokan jalan',
                required: true,
                icon: MapPin,
            },
            {
                name: 'description',
                label: 'Deskripsi (min 30 karakter)',
                placeholder: 'Ceritakan apa yang kamu lakukan...',
                required: true,
                type: 'textarea',
                minLength: 30,
                rows: 3,
            },
        ],
    },
    sosialisasi: {
        title: 'Bersosialisasi',
        description: 'Diskusi, ngobrol santai, acara keluarga, atau komunitas.',
        theme: 'orange',
        cardGradient: 'from-orange-50 to-orange-100',
        badgeBg: 'bg-orange-100 text-orange-700',
        iconBg: 'bg-orange-100 text-orange-600',
        icon: Users,
        xp: 25,
        photoRequired: false,
        fields: [
            {
                name: 'activity',
                label: 'Jenis Kegiatan',
                placeholder: 'Contoh: Rapat RT / Ngobrol santai',
                required: true,
            },
            {
                name: 'withWho',
                label: 'Dengan Siapa',
                placeholder: 'Contoh: Teman kelas / Tetangga',
                required: true,
                icon: Users,
            },
            {
                name: 'description',
                label: 'Deskripsi (min 40 karakter)',
                placeholder: 'Apa yang dibahas? Siapa saja hadir?',
                required: true,
                type: 'textarea',
                minLength: 40,
                rows: 4,
            },
        ],
    },
    membantu: {
        title: 'Membantu Orang',
        description: 'Membantu orang tua, guru, teman, atau tetangga.',
        theme: 'blue',
        cardGradient: 'from-sky-50 to-blue-100',
        badgeBg: 'bg-sky-100 text-sky-700',
        iconBg: 'bg-sky-100 text-sky-600',
        icon: HandHeart,
        xp: 30,
        photoRequired: false,
        fields: [
            {
                name: 'activity',
                label: 'Jenis Bantuan',
                placeholder: 'Contoh: Membantu guru / Menjadi panitia',
                required: true,
            },
            {
                name: 'withWho',
                label: 'Kepada Siapa',
                placeholder: 'Contoh: Orang tua / Teman / Tetangga',
                required: true,
                icon: HandHeart,
            },
            {
                name: 'description',
                label: 'Deskripsi (min 40 karakter)',
                placeholder: 'Ceritakan bantuanmu hari ini...',
                required: true,
                type: 'textarea',
                minLength: 40,
                rows: 4,
            },
        ],
    },
};

export default function Sosial({ auth = { user: {} } }) {
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

    const currentConfig = activeModal ? SOCIAL_CONFIG[activeModal] : null;
    const Icon = currentConfig?.icon;

    const openModal = (type) => {
        setActiveModal(type);
        setPhotoPreview(null);
        form.reset();
    };

    const closeModal = () => {
        setActiveModal(null);
        setPhotoPreview(null);
        form.reset();
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

        if (currentConfig.photoRequired && !data.photo) {
            alert('Foto bukti wajib diupload untuk kegiatan ini.');
            return false;
        }

        return true;
    };

    const calculateXP = () => {
        const data = form.data.data || {};
        const hasPhotoBonus = (activeModal === 'sosialisasi' || activeModal === 'membantu') && data.photo;
        return currentConfig.xp + (hasPhotoBonus ? 10 : 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        form.setData('type', activeModal);
        setEarnedXP(calculateXP());

        if (typeof window !== 'undefined' && window.confetti) {
            const colors = currentConfig.theme === 'orange'
                ? ['#f97316', '#fb923c', '#ffffff']
                : currentConfig.theme === 'blue'
                    ? ['#0ea5e9', '#38bdf8', '#ffffff']
                    : ['#10b981', '#34d399', '#ffffff'];
            window.confetti({
                particleCount: 120,
                spread: 80,
                origin: { y: 0.6 },
                colors,
            });
        }

        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                closeModal();
            }, 1600);
        }, 800);
    };

    return (
        <StudentLayout user={user}>
            <Head title="Jurnal Sosial - Si Hebat" />

            <div className="min-h-screen bg-sky-50 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                'url(https://media.istockphoto.com/id/1149263420/id/vektor/ilustrasi-kartun-orang-berjalan-di-taman-kota.jpg?s=170667a&w=0&k=20&c=iNvkd_EIsSpQXnI9rJUTH8VteVsNll__ptxiNnaDq40=)',
                        }}
                    />
                    <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px]" />
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
                        className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-xl flex items-center justify-center text-sky-600 hover:bg-white transition border border-white/60 shadow-sm"
                    >
                        <ArrowLeft size={20} />
                    </motion.button>
                    <div>
                        <h1 className="font-black text-lg md:text-2xl text-slate-800 drop-shadow-sm">
                            Jurnal Sosial
                        </h1>
                        <p className="text-slate-600 text-xs md:text-sm font-medium">
                            Peduli lingkungan, dekat dengan sesama
                        </p>
                    </div>
                </motion.nav>

                <main className="px-4 pb-28 relative z-20 w-full max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8 md:mb-10"
                    >
                        <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-2 drop-shadow-sm">
                            Apa kontribusimu hari ini?
                        </h2>
                        <p className="text-slate-600 font-medium text-sm md:text-base">
                            Pilih jenis kegiatan sosial yang kamu lakukan.
                        </p>
                    </motion.div>

                    <div className="bg-white/90 border border-slate-100 rounded-2xl p-4 md:p-5 shadow-sm mb-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm">
                            <div className="flex items-center gap-2 text-slate-700">
                                <ClipboardList size={18} className="text-slate-500" />
                                Maksimal 2 aktivitas per hari (tidak bisa 3 sekaligus).
                            </div>
                            <div className="flex items-center gap-2 text-slate-700">
                                <CheckCircle size={18} className="text-slate-500" />
                                Deskripsi wajib minimal 30-40 karakter.
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
                        {Object.entries(SOCIAL_CONFIG).map(([key, config], idx) => {
                            const CardIcon = config.icon;
                            return (
                                <motion.button
                                    key={key}
                                    onClick={() => openModal(key)}
                                    whileHover={{ y: -6 }}
                                    whileTap={{ scale: 0.98 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group relative bg-white/90 backdrop-blur-sm rounded-[2rem] p-6 border-2 border-slate-100 hover:shadow-xl transition-all text-left"
                                >
                                    <div className={`absolute top-0 right-0 w-28 h-28 rounded-bl-[100%] ${config.cardGradient} transition-transform group-hover:scale-110`} />
                                    <div className="relative z-10 flex flex-col gap-4">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${config.iconBg} shadow-sm`}>
                                            <CardIcon size={28} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-slate-800 mb-1">
                                                {config.title}
                                            </h3>
                                            <p className="text-sm text-slate-500">
                                                {config.description}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${config.badgeBg}`}>
                                                +{config.xp} XP
                                            </span>
                                            <span className="text-xs text-slate-400">Buka form</span>
                                        </div>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                </main>

                <AnimatePresence>
                    {activeModal && (
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
                                className="relative bg-white w-full max-w-lg rounded-t-[2.5rem] sm:rounded-[2.5rem] p-6 md:p-8 shadow-2xl"
                            >
                                <div className="hidden sm:flex w-16 h-1.5 bg-slate-200 rounded-full mx-auto mb-6" />

                                <motion.button
                                    onClick={closeModal}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition"
                                >
                                    <X size={20} />
                                </motion.button>

                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${currentConfig.iconBg} border border-slate-100`}>
                                        <Icon size={22} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-slate-800">{currentConfig.title}</h3>
                                        <p className="text-xs text-slate-400">Ceritakan pengalaman baikmu hari ini.</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {currentConfig.fields.map((field) => (
                                        <div key={field.name}>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                                {field.label}
                                                {field.required && <span className="text-red-500 ml-1">*</span>}
                                            </label>
                                            {field.type === 'textarea' ? (
                                                <textarea
                                                    rows={field.rows || 3}
                                                    placeholder={field.placeholder}
                                                    value={form.data.data?.[field.name] || ''}
                                                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-sky-500 focus:outline-none transition resize-none"
                                                />
                                            ) : (
                                                <div className="relative">
                                                    {field.icon && (
                                                        <field.icon size={18} className="absolute left-3 top-3.5 text-slate-400" />
                                                    )}
                                                    <input
                                                        type="text"
                                                        placeholder={field.placeholder}
                                                        value={form.data.data?.[field.name] || ''}
                                                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                                                        className={`w-full ${field.icon ? 'pl-10' : 'pl-4'} pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-sky-500 focus:outline-none transition`}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">
                                            Foto Bukti {currentConfig.photoRequired ? '(Wajib)' : '(Opsional)'}
                                        </label>
                                        {!photoPreview ? (
                                            <motion.label
                                                whileHover={{ scale: 1.02 }}
                                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition"
                                            >
                                                <Camera size={28} className="text-slate-400 mb-2" />
                                                <p className="text-xs text-slate-500">
                                                    Klik untuk upload foto kegiatan
                                                </p>
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

                                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                                        <div className="text-sm text-slate-600 flex items-center gap-2">
                                            <ClipboardList size={18} className="text-slate-400" />
                                            XP didapat
                                        </div>
                                        <span className="text-sm font-black text-slate-800">+{calculateXP()} XP</span>
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                        className="w-full mt-4 py-3 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-300 text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
                                    >
                                        <Upload size={18} />
                                        {isSubmitting ? 'Menyimpan...' : 'Simpan Laporan'}
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
                                    <CheckCircle size={28} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-800 mb-2">Laporan tersimpan</h3>
                                <p className="text-sm text-slate-500 mb-4">Terima kasih sudah berkontribusi!</p>
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
