import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Moon, Heart, ChevronRight, Cross,
    Star as Lotus, HelpingHand, Sun, ArrowLeft
} from 'lucide-react';
import StudentLayout from '@/Layouts/StudentLayout';

export default function Beribadah({ auth = { user: {} } }) {
    const user = auth?.user || {};

    const religions = [
        { name: 'Islam', icon: Moon, color: 'from-emerald-500 to-green-600', route: 'student.habit.ibadah.islam', desc: 'Jadwal Sholat 5 Waktu' },
        { name: 'Kristen', icon: Cross, color: 'from-blue-500 to-indigo-600', route: 'student.habit.ibadah.kristen', desc: 'Kebaktian & Saat Teduh' },
        { name: 'Katolik', icon: Cross, color: 'from-purple-500 to-violet-600', route: 'student.habit.ibadah.katolik', desc: 'Misa & Doa Harian' },
        { name: 'Hindu', icon: Lotus, color: 'from-orange-500 to-red-600', route: 'student.habit.ibadah.hindu', desc: 'Tri Sandhya & Puja' },
        { name: 'Buddha', icon: Sun, color: 'from-yellow-500 to-amber-600', route: 'student.habit.ibadah.buddha', desc: 'Puja Bakti & Meditasi' },
        { name: 'Konghucu', icon: HelpingHand, color: 'from-rose-500 to-red-700', route: 'student.habit.ibadah.konghucu', desc: 'Penghayatan Ajaran' },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <StudentLayout user={user}>
            <Head title="Pilih Keyakinan - Si Hebat" />

            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-10">
                        <Link
                            href={route('student.dashboard')}
                            className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 hover:text-green-600 hover:shadow-lg transition shadow-sm border border-gray-100"
                        >
                            <ArrowLeft size={24} />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Pilih Keyakinan</h1>
                            <p className="text-gray-500 font-bold">Agar rincian ibadah sesuai denganmu</p>
                        </div>
                    </div>

                    {/* Grid */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        {religions.map((rel, idx) => (
                            <motion.div key={idx} variants={item}>
                                <Link
                                    href={rel.name === 'Islam' ? route(rel.route) : '#'}
                                    className={`group relative overflow-hidden bg-white p-6 rounded-[2.5rem] border-2 border-gray-100 hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-2xl flex flex-col justify-between h-56 ${rel.name !== 'Islam' ? 'opacity-60 grayscale cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    {/* Hover Fill Effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${rel.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                                    <div className="relative z-10">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${rel.color} flex items-center justify-center text-white mb-4 group-hover:bg-white/20 group-hover:from-transparent group-hover:to-transparent transition-all shadow-lg`}>
                                            <rel.icon size={28} />
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-900 group-hover:text-white transition-colors">
                                            {rel.name}
                                        </h3>
                                        <p className="text-sm font-bold text-gray-400 group-hover:text-white/80 transition-colors mt-1">
                                            {rel.desc}
                                        </p>
                                    </div>

                                    <div className="relative z-10 flex items-center justify-between mt-auto">
                                        <span className={`text-xs font-black uppercase tracking-widest ${rel.name === 'Islam' ? 'group-hover:text-white text-green-600' : 'text-gray-400'}`}>
                                            {rel.name === 'Islam' ? 'Pilih Sekarang' : 'Segera Hadir'}
                                        </span>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-all ${rel.name === 'Islam' ? 'bg-green-50 text-green-600 group-hover:bg-white group-hover:text-green-600' : 'bg-gray-100 text-gray-300'}`}>
                                            <ChevronRight size={18} strokeWidth={3} />
                                        </div>
                                    </div>

                                    {/* Abstract Pattern Decoration */}
                                    <div className="absolute top-0 right-0 p-8 text-gray-50 group-hover:text-white/10 transition-colors pointer-events-none">
                                        <rel.icon size={100} strokeWidth={1} />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Footer Info */}
                    <div className="mt-12 p-6 bg-white/50 rounded-3xl border border-white flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <Heart fill="currentColor" size={24} />
                        </div>
                        <p className="text-sm text-gray-600 font-medium italic">
                            "Beribadah adalah wujud syukur kita atas segala nikmat yang diberikan. Jurnal ini membantu kamu tetap istiqomah dalam menjalankan ketaatan."
                        </p>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}
