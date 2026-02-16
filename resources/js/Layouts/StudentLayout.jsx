import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Home, User, Trophy, ShoppingBag, LogOut,
    Menu, X
} from 'lucide-react';
import { useState } from 'react';

export default function AuthenticatedLayout({ user, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = [
        { name: 'Beranda', href: 'student.dashboard', icon: Home, current: true },
        { name: 'Profil Saya', href: 'student.profile', icon: User },
        { name: 'Peringkat', href: 'student.leaderboard', icon: Trophy },
        { name: 'Toko Skin', href: 'student.shop', icon: ShoppingBag },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex">
            {/* Sidebar Desktop */}
            <aside className="hidden md:flex w-64 bg-white border-r border-gray-100 flex-col justify-between p-6 z-20 shadow-sm sticky top-0 h-screen">
                <div>
                    {/* Logo */}
                    <Link href={route('student.dashboard')} className="flex items-center gap-2 mb-10 text-green-600 group">
                        <motion.div
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img src="/images/logohebat.svg" alt="SI HEBAT" className="w-8 h-8" />
                        </motion.div>
                        <span className="font-black text-xl tracking-tight">SI HEBAT</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="space-y-2">
                        {navigation.map((item) => {
                            const isActive = route().current(item.href);
                            return (
                                <Link
                                    key={item.name}
                                    href={route(item.href)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-bold ${isActive
                                        ? 'bg-green-50 text-green-600'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                        }`}
                                >
                                    <item.icon size={20} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Logout */}
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition font-medium text-sm"
                >
                    <LogOut size={18} />
                    Keluar
                </Link>
            </aside>

            {/* Mobile Sidebar */}
            {sidebarOpen && (
                <>
                    <div
                        className="md:hidden fixed inset-0 bg-black/50 z-40"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <motion.aside
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        className="md:hidden fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-100 flex flex-col justify-between p-6 z-50 shadow-xl"
                    >
                        <div>
                            {/* Close Button */}
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            >
                                <X size={24} />
                            </button>

                            {/* Logo */}
                            <Link href={route('student.dashboard')} className="flex items-center gap-2 mb-10 text-green-600">
                                <img src="/images/logohebat.svg" alt="SI HEBAT" className="w-8 h-8" />
                                <span className="font-black text-xl tracking-tight">SI HEBAT</span>
                            </Link>

                            {/* Navigation */}
                            <nav className="space-y-2">
                                {navigation.map((item) => {
                                    const isActive = route().current(item.href);
                                    return (
                                        <Link
                                            key={item.name}
                                            href={route(item.href)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-bold ${isActive
                                                ? 'bg-green-50 text-green-600'
                                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                                }`}
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <item.icon size={20} />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Logout */}
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition font-medium text-sm"
                        >
                            <LogOut size={18} />
                            Keluar
                        </Link>
                    </motion.aside>
                </>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Mobile Header */}
                <div className="md:hidden bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        <Menu size={24} />
                    </button>
                    <Link href={route('student.dashboard')} className="flex items-center gap-2 text-green-600">
                        <img src="/images/logohebat.svg" alt="SI HEBAT" className="w-6 h-6" />
                        <span className="font-black text-lg">SI HEBAT</span>
                    </Link>
                    <div className="w-6" /> {/* Spacer */}
                </div>

                {/* Page Content */}
                <main className="flex-1">
                    {children}
                </main>

                {/* Mobile Bottom Navigation */}
                <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-100 flex justify-around py-3 pb-safe z-40 text-gray-400">
                    {navigation.map((item) => {
                        const isActive = route().current(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={route(item.href)}
                                className={`flex flex-col items-center gap-1 transition ${isActive ? 'text-green-600' : 'hover:text-green-500'
                                    }`}
                            >
                                <item.icon size={24} />
                                <span className="text-[10px] font-bold">{item.name.split(' ')[0]}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
