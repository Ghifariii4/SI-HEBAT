import StudentLayout from '@/Layouts/StudentLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Crown, Sparkles, Trophy } from 'lucide-react';
import { useState } from 'react';

export default function Leaderboard({ auth = { user: {} } }) {
    const user = auth?.user || {};

    // Top 3 Data - dari dashboard "top hari ini"
    const topThree = [
        {
            rank: 2,
            name: 'Jackson',
            xp: 1547,
            avatar: 'https://ui-avatars.com/api/?name=Jackson&background=3B82F6&color=fff&bold=true',
            medal: '🥈'
        },
        {
            rank: 1,
            name: 'Elder',
            xp: 2430,
            avatar: 'https://ui-avatars.com/api/?name=Elder&background=FBBF24&color=fff&bold=true',
            medal: '👑'
        },
        {
            rank: 3,
            name: 'Emma Asia',
            xp: 1874,
            avatar: 'https://ui-avatars.com/api/?name=Emma+Asia&background=34D399&color=fff&bold=true',
            medal: '🥉'
        }
    ];

    // Full ranking list - dummy data rank 4-10
    const fullRanking = [
        { rank: 1, name: 'Elder', level: 12, xp: 2430, reward: 100, avatar: 'https://ui-avatars.com/api/?name=Elder&background=FBBF24&color=fff' },
        { rank: 2, name: 'Jackson', level: 10, xp: 1547, reward: 75, avatar: 'https://ui-avatars.com/api/?name=Jackson&background=3B82F6&color=fff' },
        { rank: 3, name: 'Emma Asia', level: 11, xp: 1874, reward: 50, avatar: 'https://ui-avatars.com/api/?name=Emma+Asia&background=34D399&color=fff' },
        { rank: 4, name: 'Sebastian', level: 9, xp: 1324, reward: 40, avatar: 'https://ui-avatars.com/api/?name=Sebastian&background=8B5CF6&color=fff' },
        { rank: 5, name: 'Josiah', level: 8, xp: 876, reward: 30, avatar: 'https://ui-avatars.com/api/?name=Josiah&background=EC4899&color=fff' },
        { rank: 6, name: 'Natalie', level: 8, xp: 774, reward: 25, avatar: 'https://ui-avatars.com/api/?name=Natalie&background=06B6D4&color=fff' },
        { rank: 7, name: 'Serenity', level: 7, xp: 723, reward: 20, avatar: 'https://ui-avatars.com/api/?name=Serenity&background=F59E0B&color=fff' },
        { rank: 8, name: 'Hannah', level: 7, xp: 559, reward: 15, avatar: 'https://ui-avatars.com/api/?name=Hannah&background=EF4444&color=fff' },
        { rank: 9, name: 'Lucas', level: 6, xp: 482, reward: 12, avatar: 'https://ui-avatars.com/api/?name=Lucas&background=10B981&color=fff' },
        { rank: 10, name: 'Olivia', level: 6, xp: 421, reward: 10, avatar: 'https://ui-avatars.com/api/?name=Olivia&background=6366F1&color=fff' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <StudentLayout user={user}>
            <Head title="Peringkat - Si Hebat" />

            <div className="min-h-screen bg-gradient-to-b from-gradient1 via-gradient2 to-gradient3 p-4 md:p-8 pb-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #f0f4ff 50%, #fff9f0 100%)' }}>
                {/* Background Decorations */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-300/20 to-indigo-300/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-300/15 to-pink-300/10 rounded-full blur-3xl -ml-40 -mb-40"></div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="max-w-5xl mx-auto relative z-10"
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="mb-8 md:mb-10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl md:rounded-2xl flex items-center justify-center">
                                <Trophy size={24} className="text-white md:hidden" />
                                <Trophy size={28} className="text-white hidden md:block" />
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">Peringkat</h1>
                        </div>
                        <p className="text-gray-500 md:text-gray-600 text-sm md:text-lg">Kompetisi Mingguan - Siapa yang Terbaik?</p>
                    </motion.div>



                    {/* Top 3 Podium */}
                    <motion.div variants={itemVariants} className="mb-12">
                        <div className="flex flex-col md:grid md:grid-cols-3 gap-6 mb-8">
                            {/* 1st Place - Center (Larger) - Order 1 on mobile, 2 on desktop */}
                            <motion.div
                                whileHover={{ y: -12 }}
                                className="order-1 md:order-2 md:col-span-1 flex flex-col items-center mb-8 md:mb-0"
                            >
                                <motion.div
                                    className="relative mb-6 w-32 h-32 md:w-40 md:h-40"
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{ duration: 2.5, repeat: Infinity }}
                                >
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-5xl md:text-6xl z-10">👑</div>
                                    <div className="w-full h-full rounded-full border-4 border-yellow-400 overflow-hidden shadow-2xl shadow-yellow-500/50">
                                        <img src={topThree[1].avatar} alt={topThree[1].name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute -bottom-2 -left-2 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                                        <span className="text-lg md:text-xl font-black">🏆</span>
                                    </div>
                                </motion.div>
                                <h3 className="text-xl md:text-2xl font-black text-gray-900 text-center">{topThree[1].name}</h3>
                                <p className="text-sm text-yellow-600 font-bold">1st Place</p>
                                <div className="mt-4 bg-gradient-to-r from-yellow-100 to-orange-100 px-5 md:px-6 py-2 md:py-3 rounded-xl border border-yellow-300 shadow-lg shadow-yellow-400/20">
                                    <p className="text-2xl md:text-3xl font-black text-yellow-600">{topThree[1].xp}</p>
                                    <p className="text-[10px] md:text-xs text-yellow-700 uppercase tracking-wider text-center">XP Points</p>
                                </div>
                            </motion.div>

                            {/* 2nd Place - Left - Order 2 on mobile, 1 on desktop */}
                            <motion.div
                                whileHover={{ y: -8 }}
                                className="order-2 md:order-1 md:col-span-1 flex flex-col items-center"
                            >
                                <motion.div
                                    className="relative mb-4 w-24 h-24 md:w-28 md:h-28"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                                >
                                    <div className="absolute -top-2 -right-2 text-3xl md:text-4xl">🥈</div>
                                    <div className="w-full h-full rounded-full border-4 border-gray-400 overflow-hidden shadow-xl">
                                        <img src={topThree[0].avatar} alt={topThree[0].name} className="w-full h-full object-cover" />
                                    </div>
                                </motion.div>
                                <h3 className="text-lg md:text-xl font-black text-gray-900 text-center">{topThree[0].name}</h3>
                                <p className="text-sm text-gray-600">2nd Place</p>
                                <div className="mt-4 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                                    <p className="text-xl md:text-2xl font-black text-blue-600">{topThree[0].xp}</p>
                                    <p className="text-[10px] md:text-xs text-blue-600 uppercase tracking-wider text-center">XP</p>
                                </div>
                            </motion.div>

                            {/* 3rd Place - Right - Order 3 on mobile, 3 on desktop */}
                            <motion.div
                                whileHover={{ y: -8 }}
                                className="order-3 md:order-3 md:col-span-1 flex flex-col items-center mt-8 md:mt-0"
                            >
                                <motion.div
                                    className="relative mb-4 w-24 h-24 md:w-28 md:h-28"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                                >
                                    <div className="absolute -top-2 -left-2 text-3xl md:text-4xl">🥉</div>
                                    <div className="w-full h-full rounded-full border-4 border-orange-600 overflow-hidden shadow-xl">
                                        <img src={topThree[2].avatar} alt={topThree[2].name} className="w-full h-full object-cover" />
                                    </div>
                                </motion.div>
                                <h3 className="text-lg md:text-xl font-black text-gray-900 text-center">{topThree[2].name}</h3>
                                <p className="text-sm text-gray-600">3rd Place</p>
                                <div className="mt-4 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                                    <p className="text-xl md:text-2xl font-black text-green-600">{topThree[2].xp}</p>
                                    <p className="text-[10px] md:text-xs text-green-600 uppercase tracking-wider text-center">XP</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Full Ranking Table */}
                    <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-gray-200 overflow-hidden shadow-xl">
                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-2 md:gap-4 px-4 md:px-6 py-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-200">
                            <div className="col-span-2 md:col-span-1 flex items-center">
                                <p className="text-[10px] md:text-xs font-black text-indigo-700 uppercase tracking-wider">Rank</p>
                            </div>
                            <div className="col-span-6 md:col-span-4 flex items-center">
                                <p className="text-[10px] md:text-xs font-black text-indigo-700 uppercase tracking-wider">Player</p>
                            </div>
                            <div className="hidden md:flex col-span-2 items-center justify-end">
                                <p className="text-[10px] md:text-xs font-black text-indigo-700 uppercase tracking-wider">Level</p>
                            </div>
                            <div className="col-span-4 md:col-span-3 flex items-center justify-end">
                                <p className="text-[10px] md:text-xs font-black text-indigo-700 uppercase tracking-wider">XP</p>
                            </div>
                            <div className="hidden md:flex col-span-2 items-center justify-end">
                                <p className="text-[10px] md:text-xs font-black text-indigo-700 uppercase tracking-wider">Reward</p>
                            </div>
                        </div>

                        {/* Table Rows */}
                        <div className="divide-y divide-gray-200">
                            {fullRanking.map((player, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={itemVariants}
                                    whileHover={{ backgroundColor: 'rgba(99, 102, 241, 0.05)' }}
                                    className="grid grid-cols-12 gap-2 md:gap-4 px-4 md:px-6 py-4 transition-colors items-center"
                                >
                                    {/* Rank */}
                                    <div className="col-span-2 md:col-span-1 flex items-center">
                                        <motion.div
                                            className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-black text-xs md:text-sm ${player.rank === 1
                                                ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg shadow-yellow-400/50'
                                                : player.rank === 2
                                                    ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-900 shadow-lg'
                                                    : player.rank === 3
                                                        ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg'
                                                        : 'bg-indigo-100 text-indigo-700'
                                                }`}
                                        >
                                            {player.rank}
                                        </motion.div>
                                    </div>

                                    {/* Player Info */}
                                    <div className="col-span-6 md:col-span-4 flex items-center gap-2 md:gap-3">
                                        <img
                                            src={player.avatar}
                                            alt={player.name}
                                            className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-indigo-300"
                                        />
                                        <div className="min-w-0">
                                            <p className="font-black text-gray-900 text-xs md:text-sm truncate">{player.name}</p>
                                            <p className="text-[10px] md:text-xs text-gray-500 truncate">@{player.name.toLowerCase()}</p>
                                        </div>
                                    </div>

                                    {/* Level - hidden on mobile */}
                                    <div className="hidden md:flex col-span-2 items-center justify-end">
                                        <div className="px-3 py-1 bg-purple-100 rounded-lg border border-purple-300">
                                            <p className="text-purple-700 font-bold text-sm">Lvl {player.level}</p>
                                        </div>
                                    </div>

                                    {/* XP */}
                                    <div className="col-span-4 md:col-span-3 flex items-center justify-end">
                                        <div className="text-right">
                                            <p className="text-gray-900 font-black text-sm md:text-lg">{player.xp.toLocaleString()}</p>
                                            <p className="text-[10px] md:text-xs text-gray-500 uppercase">XP</p>
                                        </div>
                                    </div>

                                    {/* Reward - hidden on mobile */}
                                    <div className="hidden md:flex col-span-2 items-center justify-end">
                                        <div className="flex items-center gap-1 bg-cyan-100 px-3 py-1.5 rounded-lg border border-cyan-300">
                                            <span>💎</span>
                                            <span className="font-bold text-cyan-700 text-sm">{player.reward}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Info Footer */}
                    <motion.div variants={itemVariants} className="mt-8 p-4 bg-blue-100 border border-blue-300 rounded-2xl text-center">
                        <p className="text-blue-900 text-xs md:text-sm">
                            <TrendingUp className="inline mr-2" size={16} />
                            Data peringkat diupdate setiap minggu. Terus tingkatkan prestasi kamu!
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </StudentLayout>
    );
}
