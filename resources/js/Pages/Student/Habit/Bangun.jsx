import React, { useState, useEffect } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Trash, Sun, CheckCircle, BellRinging, Cloud,
    ArrowLeft, Lightning, Coins, WarningCircle, Camera, Image
} from '@phosphor-icons/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import confetti from 'canvas-confetti';
import Lottie from 'lottie-react';
import CountUp from 'react-countup';

// Import Animations
import BangunOnTime from '../../../../../public/Habit/Bangun_1.json';
import BangunLate from '../../../../../public/Habit/Bangun_2.json';
import MedalSuccess from '../../../../../../../public/Success-Animation/MedalSuccess.json';

const MySwal = withReactContent(Swal);

export default function Bangun({ serverTime }) {
    const [currentTime, setCurrentTime] = useState(new Date(serverTime));
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(prev => new Date(prev.getTime() + 1000));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const getPoints = () => {
        const h = currentTime.getHours();
        const m = currentTime.getMinutes();
        const timeVal = h + m / 60;

        if (timeVal >= 3 && timeVal < 5) return 50;        // 03:00 - 05:00
        if (timeVal >= 5 && timeVal < 5.5) return 40;      // 05:00 - 05:30
        if (timeVal >= 5.5 && timeVal < 6) return 30;      // 05:30 - 06:00
        if (timeVal >= 6 && timeVal < 7) return 20;        // 06:00 - 07:00
        if (timeVal >= 7 && timeVal < 8) return 10;        // 07:00 - 08:00 
        if (timeVal >= 8 && timeVal < 9) return 5;         // 08:00 - 09:00
        return 0; // Luar jam target
    };

    const currentPoints = getPoints();
    const isLate = currentTime.getHours() >= 7;

    const getEnvironment = () => {
        const h = currentTime.getHours();
        if (h >= 5 && h < 7) return {
            sky: 'from-sky-400 via-orange-300 to-yellow-200',
            grass: 'bg-green-400/80',
            clockTheme: isLate ? 'border-red-500 shadow-red-500/20' : 'border-slate-800 shadow-black/20'
        };
        if (h >= 7 && h < 18) return {
            sky: 'from-sky-300 via-blue-200 to-brand-50',
            grass: 'bg-green-500/80',
            clockTheme: isLate ? 'border-red-500 shadow-red-500/20' : 'border-slate-800 shadow-black/20'
        };
        return {
            sky: 'from-slate-900 via-indigo-950 to-slate-900',
            grass: 'bg-green-900/80',
            clockTheme: 'border-indigo-500/30 shadow-indigo-500/10'
        };
    };

    const env = getEnvironment();

    const { data, setData, post, processing, errors } = useForm({
        check_in_time: '',
        activities: [],
        image: null,
        total_xp: 0,
    });

    const handleAddActivity = () => {
        if (data.activities.length < 3) setData('activities', [...data.activities, '']);
    };

    const removeActivity = (index) => {
        const newActivities = [...data.activities];
        newActivities.splice(index, 1);
        setData('activities', newActivities);
    };

    const handleActivityChange = (index, value) => {
        const newActivities = [...data.activities];
        newActivities[index] = value;
        setData('activities', newActivities);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();

        const finalTime = currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

        // Send to backend - server will calculate points securely
        router.post(route('student.habit.wakeup.store'), {
            activities: data.activities,
            image: data.image,
        }, {
            onStart: () => {
                Swal.fire({
                    title: 'Menyimpan...',
                    text: 'Tunggu sebentar',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });
            },
            onSuccess: (page) => {
                const flash = page.props.flash || {};
                const xpEarned = flash.xp_earned || 0;
                const koinEarned = flash.koin_earned || 0;
                const checkInTime = flash.check_in_time || finalTime;

                // Fire Confetti!
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#0ea5e9', '#22c55e', '#eab308', '#f43f5e']
                });

                MySwal.fire({
                    html: (
                        <div className="flex flex-col items-center p-4 text-slate-800 font-outfit">
                            <div className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase mb-2">SI HEBAT REWARD</div>
                            <h3 className="text-3xl font-black tracking-tight text-slate-900 leading-tight mb-1 uppercase">
                                {isLate ? 'CHECK-IN BERHASIL' : 'MISI BERHASIL!'}
                            </h3>
                            <p className="text-slate-400 font-bold text-sm mb-8 text-center px-4">
                                {isLate ? 'Walau agak terlambat, tetap semangat!' : 'Luar biasa! Kamu bangun tepat waktu hari ini.'}
                            </p>

                            <div className="relative mb-10 w-64 h-64 flex items-center justify-center">
                                {/* Circular Dashed Border */}
                                <div className="absolute inset-0 border-[3px] border-dashed border-slate-200 rounded-full animate-[spin_20s_linear_infinite]"></div>
                                <div className="w-48 h-48 relative z-10">
                                    <Lottie animationData={MedalSuccess} loop={false} />
                                </div>
                                <div className="absolute top-4 right-4 w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center text-white font-black text-xs shadow-lg shadow-orange-200 border-4 border-white z-20">
                                    I
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
                                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200 transition-all">
                                            <Coins weight="fill" className="text-white" size={18} />
                                        </div>
                                        <span className="text-2xl font-black text-slate-800">
                                            +<CountUp end={koinEarned} duration={2} />
                                        </span>
                                    </div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">FIT COINS</p>
                                </div>
                            </div>

                            <p className="text-xs font-bold text-slate-300 mt-6 italic">
                                Tercatat pada jam {checkInTime} WIB
                            </p>
                        </div>
                    ),
                    showConfirmButton: true,
                    confirmButtonText: 'KLAIM HADIAH!',
                    buttonsStyling: false,
                    customClass: {
                        popup: 'rounded-[3.5rem] border-0 shadow-2xl overflow-hidden',
                        confirmButton: 'w-[calc(100%-4rem)] mx-8 mb-8 py-5 rounded-3xl bg-slate-900 hover:bg-black text-white font-black text-lg transition-all active:scale-95 shadow-xl shadow-slate-200'
                    },
                    allowOutsideClick: false,
                }).then(() => {
                    router.visit(route('student.dashboard'));
                });
            },
            onError: (errors) => {
                const firstError = Object.values(errors)[0];
                MySwal.fire({
                    html: (
                        <div className="flex flex-col items-center p-4 text-slate-800 font-outfit">
                            <div className="text-[10px] font-black tracking-[0.3em] text-red-400 uppercase mb-2">STATUS KEGAGALAN</div>
                            <h3 className="text-3xl font-black tracking-tight text-slate-900 leading-tight mb-1 uppercase text-center">
                                UPS! ADA MASALAH
                            </h3>
                            <p className="text-slate-400 font-bold text-sm mb-8 text-center px-4">
                                {firstError || 'Terjadi kesalahan saat menyimpan.'}
                            </p>

                            <div className="relative mb-10 w-64 h-64 flex items-center justify-center opacity-50 grayscale">
                                <div className="absolute inset-0 border-[3px] border-dashed border-red-100 rounded-full"></div>
                                <div className="w-48 h-48 relative z-10">
                                    <Lottie animationData={MedalSuccess} loop={false} />
                                </div>
                            </div>

                            <div className="bg-red-50 p-4 rounded-2xl border-2 border-red-100 w-full text-center">
                                <p className="text-xs font-black text-red-600 uppercase tracking-widest">Pesan Sistem</p>
                                <p className="text-sm font-bold text-red-500 mt-1">{firstError}</p>
                            </div>
                        </div>
                    ),
                    showConfirmButton: true,
                    confirmButtonText: 'SAYA MENGERTI',
                    buttonsStyling: false,
                    customClass: {
                        popup: 'rounded-[3.5rem] border-0 shadow-2xl',
                        confirmButton: 'w-[calc(100%-4rem)] mx-8 mb-8 py-5 rounded-3xl bg-red-500 hover:bg-red-600 text-white font-black text-lg transition-all active:scale-95 shadow-xl shadow-red-100'
                    }
                });
            }
        });
    };

    return (
        <div className={`min-h-screen relative flex flex-col items-center overflow-hidden transition-all duration-1000 bg-gradient-to-b ${env.sky}`}>
            <Head title="Jurnal Bangun Pagi" />

            {/* TOMBOL KEMBALI KE BERANDA */}
            <Link
                href={route('student.dashboard')}
                className="absolute top-8 left-8 z-50 flex items-center gap-2 bg-white/70 backdrop-blur-md px-5 py-3 rounded-2xl font-black text-xs text-slate-800 hover:bg-white transition-all shadow-md border border-white"
            >
                <ArrowLeft weight="bold" size={18} />
                <span className="leading-none">BERANDA</span>
            </Link>

            {/* DECORATION: Matahari di Kiri */}
            <div className="absolute top-20 left-20 w-48 h-48 bg-yellow-300 rounded-full blur-[60px] opacity-40 animate-pulse"></div>
            <div className="absolute top-24 left-24 w-32 h-32 bg-gradient-to-tr from-orange-400 to-yellow-300 rounded-full shadow-2xl z-0"></div>

            <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-40 right-20 opacity-30">
                <Cloud size={80} weight="fill" className="text-white" />
            </motion.div>

            <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 w-full max-w-lg mx-auto">
                {/* CARD UTAMA */}
                <motion.div
                    animate={isLate ? {
                        boxShadow: ["0 0 0px rgba(239,68,68,0)", "0 0 50px rgba(239,68,68,0.6)", "0 0 0px rgba(239,68,68,0)"],
                        borderColor: ["rgba(239,68,68,0.1)", "rgba(239,68,68,0.6)", "rgba(239,68,68,0.1)"]
                    } : {}}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className={`bg-white/90 backdrop-blur-2xl p-8 rounded-[3rem] shadow-2xl w-full border-4 transition-all duration-500 ${isLate ? 'border-red-500' : 'border-white'}`}
                >
                    <div className="text-center mb-6">
                        <div className="flex justify-center mb-4">
                            <motion.div
                                className="w-32 h-32"
                                animate={isLate ? {
                                    scale: [1, 1.15, 1],
                                    rotate: [-5, 5, -5, 5, 0]
                                } : {}}
                                transition={isLate ? {
                                    duration: 0.4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                } : {}}
                            >
                                <Lottie
                                    animationData={isLate ? BangunLate : BangunOnTime}
                                    loop={true}
                                />
                            </motion.div>
                        </div>
                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-3
                            ${isLate ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                            {isLate ? <BellRinging weight="fill" className="animate-bounce" /> : <Sun weight="fill" />}
                            Status: {isLate ? 'Terlambat' : 'Tepat Waktu'}
                        </div>
                        <h2 className={`text-3xl font-extrabold tracking-tight ${isLate ? 'text-red-600' : 'text-slate-800'}`}>
                            {isLate ? 'AYO BANGUN!' : 'Sudah Bangun?'}
                        </h2>
                    </div>

                    {/* DIGITAL CLOCK (Detik & Tanggal) */}
                    <motion.div
                        animate={isLate ? { rotate: [-1, 1, -1, 1, 0], x: [-2, 2, -2, 2, 0] } : {}}
                        transition={{ repeat: Infinity, duration: 0.1, repeatDelay: 0.5 }}
                        className={`bg-slate-950 rounded-[2.5rem] p-6 mb-8 text-center border-4 transition-all duration-500 ${env.clockTheme}`}
                    >
                        <div className="flex justify-center items-baseline gap-1 font-mono leading-none">
                            <span className={`text-7xl font-black ${isLate ? 'text-red-500' : 'text-green-400'}`}>
                                {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <span className={`text-2xl font-bold ${isLate ? 'text-red-800' : 'text-green-700'}`}>
                                {currentTime.toLocaleTimeString('id-ID', { second: '2-digit' })}
                            </span>
                        </div>
                        <div className={`text-xs mt-3 uppercase tracking-[0.2em] font-black ${isLate ? 'text-red-400' : 'text-slate-400'}`}>
                            {currentTime.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                    </motion.div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Aktivitas Pagi</label>

                            {data.activities.length < 3 && (
                                <button
                                    onClick={handleAddActivity}
                                    className="group flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs font-black hover:bg-blue-600 hover:scale-105 transition-all active:scale-95 shadow-lg shadow-slate-200"
                                >
                                    <Plus weight="bold" size={16} className="group-hover:rotate-90 transition-transform" />
                                    TAMBAH
                                </button>
                            )}
                        </div>

                        <AnimatePresence mode="popLayout">
                            {data.activities.map((activity, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="group relative flex items-center"
                                >
                                    <input
                                        autoFocus
                                        type="text"
                                        value={activity}
                                        onChange={(e) => handleActivityChange(index, e.target.value)}
                                        placeholder={`Apa rencana ke-${index + 1} mu?`}
                                        className="w-full bg-slate-50 border-slate-200 border-2 rounded-2xl px-5 py-4 text-sm text-slate-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                    <button
                                        onClick={() => removeActivity(index)}
                                        className="absolute right-4 text-slate-300 hover:text-red-500"
                                    >
                                        <Trash weight="fill" size={20} />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* FOTO BUKTI */}
                        <div className="space-y-4 pt-4">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Bukti Bangun Pagi (Foto)</label>
                            
                            <div 
                                onClick={() => document.getElementById('photo-upload').click()}
                                className={`relative w-full h-48 rounded-3xl border-4 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden
                                    ${imagePreview ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'}`}
                            >
                                {imagePreview ? (
                                    <>
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                            <p className="text-white font-bold text-xs">GANTI FOTO</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Camera weight="fill" size={48} className="text-slate-300 mb-2" />
                                        <p className="text-slate-400 font-bold text-xs">KETUK UNTUK AMBIL FOTO</p>
                                        <p className="text-[10px] text-slate-300 mt-1 uppercase font-black">Selfie atau bukti suasana pagi</p>
                                    </>
                                )}
                                <input 
                                    id="photo-upload"
                                    type="file" 
                                    accept="image/*" 
                                    capture="user"
                                    onChange={handleImageChange}
                                    className="hidden" 
                                />
                            </div>
                            {errors.image && (
                                <p className="text-red-500 text-[10px] font-black uppercase text-center">{errors.image}</p>
                            )}
                        </div>

                        <button
                            disabled={processing}
                            onClick={submit}
                            className={`w-full py-5 rounded-[2rem] font-black text-white shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 text-lg mt-6
                                ${isLate ? 'bg-red-600 hover:bg-red-700 shadow-red-200' : 'bg-slate-900 hover:bg-black shadow-slate-200'}`}>
                            {isLate ? <WarningCircle weight="fill" size={24} /> : <CheckCircle weight="fill" size={24} />}
                            CATAT SEKARANG
                        </button>
                    </div>
                </motion.div>
            </main>

            <div className={`absolute bottom-0 left-0 right-0 h-[8vh] ${env.grass} rounded-t-[100%] transition-all duration-1000 z-10 border-t border-white/20 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]`}></div>
        </div>
    );
}
