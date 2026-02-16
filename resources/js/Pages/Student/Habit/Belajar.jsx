import StudentLayout from '@/Layouts/StudentLayout';
import { Head } from '@inertiajs/react';

export default function Belajar({ auth = { user: {} } }) {
    const user = auth?.user || {};
    return (
        <StudentLayout user={user}>
            <Head title="Gemar Belajar - Si Hebat" />
            <div className="p-6">
                <h1 className="text-2xl font-black text-gray-900">Gemar Belajar</h1>
                <p className="text-gray-500">Halaman kebiasaan gemar belajar sedang dalam pengembangan.</p>
            </div>
        </StudentLayout>
    );
}
