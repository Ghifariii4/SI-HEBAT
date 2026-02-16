import StudentLayout from '@/Layouts/StudentLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Construction } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ${religion}({ auth = { user: {} } }) {
    const user = auth?.user || {};
    return (
        <StudentLayout user={user}>
            <Head title="Jurnal Ibadah ${religion} - Si Hebat" />
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 bg-yellow-100 text-yellow-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl"
                >
                    <Construction size={48} />
                </motion.div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">Segera Hadir!</h1>
                <p className="text-gray-500 font-medium max-w-sm mb-8">
                    Halaman Jurnal Ibadah untuk agama ${religion} sedang dalam tahap pengembangan oleh tim kami.
                </p>
                <Link 
                    href={route('student.habit.beribadah')}
                    className="flex items-center gap-2 font-black text-green-600 hover:text-green-700 transition"
                >
                    <ArrowLeft size={20} /> Kembali ke Pilihan
                </Link>
            </div>
        </StudentLayout>
    );
}
