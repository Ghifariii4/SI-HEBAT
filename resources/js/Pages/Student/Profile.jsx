import StudentLayout from '@/Layouts/StudentLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import {
    ArrowLeft,
    Camera,
    Crown,
    Flame,
    Mail,
    Pencil,
    Shield,
    Trophy,
    Eye,
    EyeOff,
    Lock,
    Check,
} from 'lucide-react';

export default function Profile({ auth = { user: {} } }) {
    const currentUser = auth?.user || {};
    const [activeTab, setActiveTab] = useState('overview');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [frameStyle, setFrameStyle] = useState('gold');

    const profile = useMemo(() => ({
        fullName: currentUser?.full_name || 'Budi Santoso',
        nis: currentUser?.nis || '882910',
        className: currentUser?.class_id || 'VII A',
        email: currentUser?.email || 'budi.santoso@sekolah.id',
        level: 12,
        xp: 3500,
        xpToNextLevel: 5000,
        coins: 1250,
        streak: 24,
        rank: 'Cendekiawan',
        rankShort: 'Top 5',
        avatar: currentUser?.avatar || `https://ui-avatars.com/api/?name=${currentUser?.full_name || 'Budi'}&background=0ea5e9&color=fff&bold=true&size=160`,
        banner: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974',
    }), [currentUser]);

    const [avatarPreview, setAvatarPreview] = useState(profile.avatar);
    const [bannerPreview, setBannerPreview] = useState(profile.banner);

    const emailForm = useForm({
        email: profile.email,
    });

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const xpPercentage = Math.min((profile.xp / profile.xpToNextLevel) * 100, 100);

    const frameClasses = {
        blue: 'ring-4 ring-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.45)]',
        gold: 'ring-4 ring-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.45)]',
        red: 'ring-4 ring-red-500 shadow-[0_0_20px_rgba(239,68,68,0.45)]',
    };

    const cardGlow = {
        blue: 'shadow-[0_0_35px_rgba(14,165,233,0.25)]',
        gold: 'shadow-[0_0_35px_rgba(234,179,8,0.25)]',
        red: 'shadow-[0_0_35px_rgba(239,68,68,0.25)]',
    };

    const handleImagePreview = (event, setter) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => setter(e.target.result);
        reader.readAsDataURL(file);
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        emailForm.patch(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => {
                setShowSuccessMessage(true);
                setTimeout(() => setShowSuccessMessage(false), 4000);
            },
        });
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        passwordForm.post(route('student.profile.updatePassword'), {
            preserveScroll: true,
            onSuccess: () => {
                passwordForm.reset();
                setShowSuccessMessage(true);
                setTimeout(() => setShowSuccessMessage(false), 4000);
            },
        });
    };

    return (
        <StudentLayout user={currentUser}>
            <Head title="Profil Saya - Si Hebat" />

            <div className="min-h-screen bg-gradient-to-br from-sky-100 via-sky-50 to-white p-4 md:p-8 pb-24">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <Link
                                href={route('student.dashboard')}
                                className="w-10 h-10 rounded-xl bg-white hover:bg-sky-50 border border-sky-100 flex items-center justify-center transition text-sky-600 shadow-sm"
                            >
                                <ArrowLeft size={18} />
                            </Link>
                            <div>
                                <h1 className="text-lg font-black tracking-wide text-slate-800">PROFIL SAYA</h1>
                                <p className="text-xs text-slate-500">Kelola akun dan keamanan</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-sky-200 shadow-sm">
                            <Trophy size={16} className="text-yellow-500" />
                            <span className="font-bold text-slate-700 text-sm">{profile.coins.toLocaleString()}</span>
                        </div>
                    </div>

                    {(showSuccessMessage || emailForm.recentlySuccessful || passwordForm.recentlySuccessful) && (
                        <div className="mb-6 p-4 bg-emerald-100 border border-emerald-300 rounded-xl flex items-center gap-3">
                            <Check size={18} className="text-emerald-600" />
                            <p className="text-emerald-800 font-semibold text-sm">Perubahan berhasil disimpan.</p>
                        </div>
                    )}

                    <div className={`bg-white/80 backdrop-blur-md rounded-[2.5rem] border border-white/70 overflow-hidden ${cardGlow[frameStyle]}`}>
                        <div className="relative h-56 md:h-72 bg-sky-100 group overflow-hidden">
                            <img src={bannerPreview} alt="Banner profil" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-sky-900/20 mix-blend-overlay" />
                            <label className="absolute top-4 right-4 bg-white/85 hover:bg-white text-sky-600 p-2 rounded-xl cursor-pointer backdrop-blur-md transition opacity-0 group-hover:opacity-100 shadow-lg">
                                <Camera size={18} />
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleImagePreview(e, setBannerPreview)}
                                />
                            </label>
                        </div>

                        <div className="px-6 md:px-10 pb-8 relative">
                            <div className="flex flex-col md:flex-row items-center md:items-end -mt-14 mb-8 gap-4 md:gap-8">
                                <div className="relative group z-10">
                                    <div className={`w-32 h-32 md:w-44 md:h-44 rounded-full bg-white shadow-lg flex items-center justify-center ${frameClasses[frameStyle]}`}>
                                        <img
                                            src={avatarPreview}
                                            alt={profile.fullName}
                                            className="w-full h-full object-cover rounded-full border-4 border-white"
                                        />
                                    </div>
                                    <label className="absolute bottom-0 right-0 bg-sky-500 hover:bg-sky-600 text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shadow-lg border-4 border-white transition">
                                        <Camera size={16} />
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => handleImagePreview(e, setAvatarPreview)}
                                        />
                                    </label>
                                    {frameStyle === 'gold' && (
                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-3xl">👑</div>
                                    )}
                                </div>

                                <div className="flex-1 text-center md:text-left pt-2 md:pt-0 md:mb-4">
                                    <div className="flex flex-col md:flex-row items-center gap-2 mb-1">
                                        <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">{profile.fullName}</h2>
                                        <div className="bg-gradient-to-r from-yellow-100 to-white border border-yellow-300 text-yellow-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                                            <Crown size={12} /> {profile.rank}
                                        </div>
                                    </div>
                                    <p className="text-slate-500 text-sm font-medium mb-3">Level {profile.level} • ID: {profile.nis}</p>
                                    <div className="w-full md:w-80 bg-sky-100 h-4 rounded-full overflow-hidden border border-sky-200 relative mx-auto md:mx-0">
                                        <div
                                            className="h-full bg-gradient-to-r from-sky-400 to-sky-600 rounded-full"
                                            style={{ width: `${xpPercentage}%` }}
                                        />
                                        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-sky-900 drop-shadow-sm">
                                            {profile.xp} / {profile.xpToNextLevel} XP
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setActiveTab('edit')}
                                    className="w-full md:w-auto py-2.5 px-6 bg-white border-2 border-sky-100 hover:border-sky-500 hover:text-sky-600 text-slate-600 font-bold rounded-xl text-sm transition shadow-sm md:mb-4 flex items-center justify-center gap-2"
                                >
                                    <Pencil size={16} /> Edit Data
                                </button>
                            </div>

                            <div className="flex border-b border-sky-200 mb-8 bg-sky-50/60 rounded-t-xl overflow-hidden">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('overview')}
                                    className={`flex-1 py-4 text-xs md:text-sm font-bold transition ${activeTab === 'overview' ? 'text-sky-600 border-b-4 border-sky-500 bg-sky-100' : 'text-sky-400 hover:bg-sky-50'}`}
                                >
                                    RINGKASAN
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('inventory')}
                                    className={`flex-1 py-4 text-xs md:text-sm font-bold transition ${activeTab === 'inventory' ? 'text-sky-600 border-b-4 border-sky-500 bg-sky-100' : 'text-sky-400 hover:bg-sky-50'}`}
                                >
                                    INVENTORI
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('edit')}
                                    className={`flex-1 py-4 text-xs md:text-sm font-bold transition ${activeTab === 'edit' ? 'text-sky-600 border-b-4 border-sky-500 bg-sky-100' : 'text-sky-400 hover:bg-sky-50'}`}
                                >
                                    EDIT
                                </button>
                            </div>

                            {activeTab === 'overview' && (
                                <div className="space-y-10">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="bg-gradient-to-br from-white to-sky-50 p-4 rounded-2xl border border-sky-100 text-center shadow-sm">
                                            <h4 className="text-3xl font-black text-sky-600">{profile.level}</h4>
                                            <p className="text-[10px] text-sky-400 uppercase tracking-widest font-bold">Level</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-white to-yellow-50 p-4 rounded-2xl border border-yellow-100 text-center shadow-sm">
                                            <h4 className="text-3xl font-black text-yellow-600">{profile.streak}</h4>
                                            <p className="text-[10px] text-yellow-600 uppercase tracking-widest font-bold">Streak</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-white to-emerald-50 p-4 rounded-2xl border border-emerald-100 text-center shadow-sm">
                                            <h4 className="text-3xl font-black text-emerald-500">{profile.rankShort}</h4>
                                            <p className="text-[10px] text-emerald-600 uppercase tracking-widest font-bold">Rank</p>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="font-bold text-lg text-slate-800 border-l-4 border-sky-500 pl-3">Lencana Pencapaian</h3>
                                            <span className="text-xs font-bold text-sky-500 bg-sky-50 px-2 py-1 rounded-lg">3 / 8 Terbuka</span>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                                            <div className="flex flex-col items-center group cursor-pointer bg-white p-4 rounded-2xl border border-sky-100 hover:shadow-md transition hover:border-sky-300">
                                                <div className="w-16 h-16 mb-3 relative flex items-center justify-center text-4xl">🌞</div>
                                                <span className="text-xs font-bold text-slate-700">Pejuang Subuh</span>
                                                <p className="text-[10px] text-slate-400 text-center mt-1">Bangun pagi 30 hari</p>
                                            </div>
                                            <div className="flex flex-col items-center group cursor-pointer bg-white p-4 rounded-2xl border border-sky-100 hover:shadow-md transition hover:border-sky-300">
                                                <div className="w-16 h-16 mb-3 relative flex items-center justify-center text-4xl">📚</div>
                                                <span className="text-xs font-bold text-slate-700">Kutu Buku</span>
                                                <p className="text-[10px] text-slate-400 text-center mt-1">Membaca 50 buku</p>
                                            </div>
                                            <div className="flex flex-col items-center p-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50/50">
                                                <div className="w-16 h-16 mb-3 relative flex items-center justify-center text-4xl opacity-60">❤️</div>
                                                <span className="text-xs font-bold text-slate-400">Atlet Sekolah</span>
                                                <div className="w-full mt-2">
                                                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                                        <div className="h-full bg-slate-400 w-[30%]" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'inventory' && (
                                <div className="space-y-10">
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-800 border-l-4 border-sky-500 pl-3 mb-6">Bingkai Avatar</h3>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setFrameStyle('blue')}
                                                className={`bg-white p-4 rounded-xl border-2 ${frameStyle === 'blue' ? 'border-sky-500' : 'border-sky-100'} hover:border-sky-400 flex flex-col items-center transition shadow-sm hover:shadow-md`}
                                            >
                                                <div className="w-14 h-14 rounded-full bg-slate-200 border-4 border-white shadow-sm mb-3" />
                                                <span className="text-xs font-bold text-slate-600">Basic</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setFrameStyle('gold')}
                                                className={`bg-white p-4 rounded-xl border-2 ${frameStyle === 'gold' ? 'border-yellow-400' : 'border-yellow-100'} hover:border-yellow-400 flex flex-col items-center transition shadow-sm hover:shadow-md relative overflow-hidden`}
                                            >
                                                <div className="absolute -top-3 text-lg">👑</div>
                                                <div className="w-14 h-14 rounded-full border-4 border-yellow-400 shadow-[0_0_10px_gold] mb-3 mt-1 bg-slate-100" />
                                                <span className="text-xs font-bold text-yellow-600">Cendekiawan</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setFrameStyle('red')}
                                                className={`bg-white p-4 rounded-xl border-2 ${frameStyle === 'red' ? 'border-red-400' : 'border-red-100'} hover:border-red-400 flex flex-col items-center transition shadow-sm hover:shadow-md`}
                                            >
                                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-red-700 p-0.5 mb-3 shadow-[0_0_10px_red]">
                                                    <div className="w-full h-full bg-white rounded-full" />
                                                </div>
                                                <span className="text-xs font-bold text-red-600">Siswa Teladan</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'edit' && (
                                <div className="space-y-8">
                                    <form onSubmit={handleEmailSubmit} className="max-w-lg space-y-5">
                                        <div>
                                            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Nama Lengkap</label>
                                            <input
                                                type="text"
                                                value={profile.fullName}
                                                disabled
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">NIS</label>
                                            <input
                                                type="text"
                                                value={profile.nis}
                                                disabled
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Kelas</label>
                                            <input
                                                type="text"
                                                value={profile.className}
                                                disabled
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Email (Bisa Diubah)</label>
                                            <input
                                                type="email"
                                                value={emailForm.data.email}
                                                onChange={(e) => emailForm.setData('email', e.target.value)}
                                                className="w-full bg-sky-50 border border-sky-200 rounded-xl px-4 py-3 text-slate-800 focus:border-sky-500 outline-none transition"
                                            />
                                            {emailForm.errors.email && (
                                                <p className="text-xs text-red-500 mt-1">{emailForm.errors.email}</p>
                                            )}
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={emailForm.processing}
                                            className="w-full py-3 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-300 text-white font-bold rounded-xl transition shadow-lg flex items-center justify-center gap-2"
                                        >
                                            <Mail size={16} />
                                            {emailForm.processing ? 'Menyimpan...' : 'Simpan Perubahan Email'}
                                        </button>
                                    </form>

                                    <div className="bg-white border border-slate-200 rounded-2xl p-5 max-w-lg">
                                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                            <Shield size={18} className="text-sky-500" /> Ubah Password
                                        </h3>
                                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-600">Password Saat Ini</label>
                                                <div className="relative">
                                                    <input
                                                        type={showCurrentPassword ? 'text' : 'password'}
                                                        value={passwordForm.data.current_password}
                                                        onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                                        className="w-full px-4 py-3 pr-12 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                        className="absolute right-3 top-3 text-slate-500 hover:text-slate-700"
                                                    >
                                                        {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                    </button>
                                                </div>
                                                {passwordForm.errors.current_password && (
                                                    <p className="text-xs text-red-500">{passwordForm.errors.current_password}</p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-600">Password Baru</label>
                                                <div className="relative">
                                                    <input
                                                        type={showNewPassword ? 'text' : 'password'}
                                                        value={passwordForm.data.password}
                                                        onChange={(e) => passwordForm.setData('password', e.target.value)}
                                                        className="w-full px-4 py-3 pr-12 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                                        className="absolute right-3 top-3 text-slate-500 hover:text-slate-700"
                                                    >
                                                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                    </button>
                                                </div>
                                                {passwordForm.errors.password && (
                                                    <p className="text-xs text-red-500">{passwordForm.errors.password}</p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-600">Konfirmasi Password</label>
                                                <div className="relative">
                                                    <input
                                                        type={showConfirmPassword ? 'text' : 'password'}
                                                        value={passwordForm.data.password_confirmation}
                                                        onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                                        className="w-full px-4 py-3 pr-12 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        className="absolute right-3 top-3 text-slate-500 hover:text-slate-700"
                                                    >
                                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                    </button>
                                                </div>
                                                {passwordForm.errors.password_confirmation && (
                                                    <p className="text-xs text-red-500">{passwordForm.errors.password_confirmation}</p>
                                                )}
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={passwordForm.processing}
                                                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 text-white font-bold rounded-xl transition shadow-lg flex items-center justify-center gap-2"
                                            >
                                                <Lock size={16} />
                                                {passwordForm.processing ? 'Menyimpan...' : 'Simpan Password'}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-800">
                        <p className="font-semibold mb-2 flex items-center gap-2"><Flame size={16} /> Informasi Penting</p>
                        <p>Nama lengkap, NIS, dan kelas tidak bisa diubah. Hubungi admin sekolah jika ada perubahan.</p>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}