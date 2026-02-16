import StudentLayout from '@/Layouts/StudentLayout';
import { Head } from '@inertiajs/react';

export default function Tidur({ auth = { user: {} } }) {
    const user = auth?.user || {};
    return (
        <StudentLayout user={user}>
            <Head title="Tidur Cukup - Si Hebat" />
            <div className="p-6">
                <h1 className="text-2xl font-black text-gray-900">Tidur Cukup</h1>
                <p className="text-gray-500">Halaman kebiasaan tidur cukup sedang dalam pengembangan.</p>
            </div>
        </StudentLayout>
    );
}
