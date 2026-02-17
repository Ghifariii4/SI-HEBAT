import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowLeft, Heart, Moon,
    BookOpen, Sparkles, ChevronRight
} from 'lucide-react';
import StudentLayout from '@/Layouts/StudentLayout';
import Lottie from 'lottie-react';
import MosqueAnimation from '../../../../../../../public/Habit/Ibadah_Islam_Masjid.json';

export default function Islam({ auth }) {
    const user = auth?.user || {};

    const modules = [
        {
            name: 'Ibadah Sholat',
            desc: 'Catat sholat fardhu 5 waktu dan sunnah',
            icon: Moon,
            color: 'from-emerald-500 to-green-600',
            route: 'student.habit.ibadah.islam.sholat'
        },
        {
            name: 'Ibadah Lainnya',
            desc: 'Tilawah Al-Quran & Puasa Sunnah',
            icon: BookOpen,
            color: 'from-teal-500 to-emerald-600',
            route: 'student.habit.ibadah.islam.lainnya'
        }
    ];

    return (
        <StudentLayout user={user}>
            <Head title="Ibadah Islam - Si Hebat" />

            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6 relative overflow-hidden">
                {/* Titanic Background Decoration Mascot */}
                <div className="absolute inset-0 flex items-end justify-center opacity-100 pointer-events-none z-0 overflow-hidden">
                    <motion.div
                        className="w-full max-w-none scale-[30] md:scale-[25] lg:scale-[40] translate-y-[50%]"
                    >
                        <Lottie animationData={MosqueAnimation} loop={true} />
                    </motion.div>
                </div>

                <div className="max-w-2xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-10">
                        <Link
                            href={route('student.dashboard')}
                            className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 hover:text-green-600 hover:shadow-lg transition shadow-sm border border-gray-100"
                        >
                            <ArrowLeft size={24} />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tight font-outfit">Ibadah Islam</h1>
                            <p className="text-gray-500 font-bold">Pilih aktivitas ibadahmu hari ini</p>
                        </div>
                    </div>

                    {/* Quick Stats / Welcome */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-[2.5rem] p-8 text-white mb-8 shadow-xl shadow-emerald-200 relative overflow-hidden"
                    >
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black mb-2">Assalamu'alaikum, {user.full_name?.split(' ')[0]}!</h2>
                            <p className="text-emerald-50 font-medium opacity-90 max-w-sm">
                                "Sesungguhnya amalan yang paling dicintai Allah adalah yang berkelanjutan meskipun sedikit."
                            </p>
                        </div>
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Sparkles size={120} />
                        </div>
                    </motion.div>

                    {/* Grid Selection */}
                    <div className="grid grid-cols-1 gap-4">
                        {modules.map((mod, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Link
                                    href={route(mod.route)}
                                    className="group relative overflow-hidden bg-white p-6 rounded-[2.5rem] border-2 border-gray-100 hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-2xl flex items-center justify-between"
                                >
                                    {/* Hover Fill Effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${mod.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                                    <div className="relative z-10 flex items-center gap-6">
                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white group-hover:bg-white/20 group-hover:from-transparent group-hover:to-transparent transition-all shadow-lg`}>
                                            <mod.icon size={32} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-gray-900 group-hover:text-white transition-colors">
                                                {mod.name}
                                            </h3>
                                            <p className="text-sm font-bold text-gray-400 group-hover:text-emerald-50 transition-colors mt-0.5">
                                                {mod.desc}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center group-hover:translate-x-2 transition-all bg-emerald-50 text-emerald-600 group-hover:bg-white group-hover:text-emerald-600">
                                        <ChevronRight size={24} strokeWidth={3} />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Footer Info */}
                    <div className="mt-12 p-6 bg-white/50 rounded-3xl border border-white flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <Heart fill="currentColor" size={24} />
                        </div>
                        <p className="text-sm text-gray-600 font-medium italic">
                            "Beribadah bukan hanya ritual, tapi cara kita bersyukur dan menenangkan jiwa."
                        </p>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}
