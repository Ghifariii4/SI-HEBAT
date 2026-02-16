import StudentLayout from '@/Layouts/StudentLayout';
import { Head } from '@inertiajs/react';

export default function Sosial({ auth = { user: {} } }) {
    const user = auth?.user || {};
    return (
        <StudentLayout user={user}>
            <Head title="Sosial - Si Hebat" />
            <div className="p-6">
                <h1 className="text-2xl font-black text-gray-900">Sosial</h1>
                <p className="text-gray-500">Halaman kebiasaan sosial sedang dalam pengembangan.</p>
            </div>
        </StudentLayout>
    );
}
