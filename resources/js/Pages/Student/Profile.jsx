import StudentLayout from '@/Layouts/StudentLayout';
import { Head } from '@inertiajs/react';

export default function Profile({ auth = { user: {} } }) {
    const user = auth?.user || {};
    return (
        <StudentLayout user={user}>
            <Head title="Profil Saya - Si Hebat" />
            <div className="p-6">
                <h1 className="text-2xl font-black text-gray-900">Profil Saya</h1>
                <p className="text-gray-500">Halaman profil siswa sedang dalam pengembangan.</p>
            </div>
        </StudentLayout>
    );
}
