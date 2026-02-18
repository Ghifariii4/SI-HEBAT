import StudentLayout from '@/Layouts/StudentLayout';
import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import {
    ArrowLeft,
    Coins,
    Image as ImageIcon,
    ShoppingCart,
    Sparkles,
    Square,
    X,
} from 'lucide-react';

const TABS = [
    { key: 'border', label: 'Bingkai', icon: Square },
    { key: 'banner', label: 'Banner', icon: ImageIcon },
    { key: 'effect', label: 'Efek', icon: Sparkles },
];

const SHOP_ITEMS = [
    { id: 'b1', type: 'border', name: 'Neko Pink', price: 300, rarity: 'rare', css: 'skin-neko' },
    { id: 'b2', type: 'border', name: 'Warrior Spike', price: 500, rarity: 'epic', css: 'skin-spike' },
    { id: 'b3', type: 'border', name: 'Angel Wings', price: 800, rarity: 'legend', css: 'skin-angel' },
    { id: 'b4', type: 'border', name: 'King Crown', price: 1000, rarity: 'legend', css: 'skin-king' },
    { id: 'b5', type: 'border', name: 'Cyber Glitch', price: 600, rarity: 'epic', css: 'skin-glitch' },
    { id: 'b6', type: 'border', name: 'Nature Vine', price: 250, rarity: 'common', css: 'skin-nature' },
    { id: 'b7', type: 'border', name: 'Aqua Flow', price: 400, rarity: 'rare', css: 'skin-water' },
    { id: 'b8', type: 'border', name: 'Galaxy Void', price: 1200, rarity: 'mythic', css: 'skin-galaxy' },
    { id: 'ba1', type: 'banner', name: 'Pixel City', price: 350, rarity: 'rare', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800' },
    { id: 'ba2', type: 'banner', name: 'Golden Palace', price: 900, rarity: 'legend', img: 'https://images.unsplash.com/photo-1599940824399-b87987ce0799?q=80&w=800' },
    { id: 'ba3', type: 'banner', name: 'Magical Forest', price: 400, rarity: 'rare', img: 'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=800' },
    { id: 'ba4', type: 'banner', name: 'Cyberpunk', price: 600, rarity: 'epic', img: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=800' },
    { id: 'ba5', type: 'banner', name: 'Blue Sky', price: 100, rarity: 'common', img: 'https://images.unsplash.com/photo-1595878715977-2e8f8df18ea8?q=80&w=800' },
    { id: 'e1', type: 'effect', name: 'Inferno Aura', price: 800, rarity: 'mythic', css: 'effect-inferno' },
    { id: 'e2', type: 'effect', name: 'Zeus Thunder', price: 700, rarity: 'legend', css: 'effect-thunder' },
    { id: 'e3', type: 'effect', name: 'Sakura Fall', price: 400, rarity: 'rare', css: 'effect-sakura' },
    { id: 'e4', type: 'effect', name: 'Cyber Glitch', price: 600, rarity: 'epic', css: 'skin-glitch' },
    { id: 'e5', type: 'effect', name: 'Holy Light', price: 900, rarity: 'legend', css: 'effect-holy' },
    { id: 'e6', type: 'effect', name: 'Toxic Gas', price: 500, rarity: 'epic', css: 'effect-toxic' },
];

const DEFAULT_BANNER = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000';

const rarityStyles = {
    common: { text: 'text-slate-500', card: 'card-common' },
    rare: { text: 'text-blue-500', card: 'card-rare' },
    epic: { text: 'text-purple-500', card: 'card-epic' },
    legend: { text: 'text-yellow-500', card: 'card-legend' },
    mythic: { text: 'text-red-500', card: 'card-mythic' },
};

export default function Shop({ auth = { user: {} } }) {
    const user = auth?.user || {};
    const [activeTab, setActiveTab] = useState('border');
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [previewBanner, setPreviewBanner] = useState(DEFAULT_BANNER);
    const [previewFrameClass, setPreviewFrameClass] = useState('avatar-preview-container');
    const [previewPrice, setPreviewPrice] = useState(null);
    const [coins, setCoins] = useState(user?.coins ?? 1250);
    const [lastPurchase, setLastPurchase] = useState(null);
    const [purchaseError, setPurchaseError] = useState('');

    const filteredItems = useMemo(() => SHOP_ITEMS.filter((item) => item.type === activeTab), [activeTab]);

    const handlePreview = (item) => {
        setPreviewPrice(item.price);
        if (item.type === 'banner') {
            setPreviewBanner(item.img);
        } else {
            setPreviewFrameClass(`avatar-preview-container ${item.css}`);
        }
    };

    const openModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
        setPurchaseError('');
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
        setPurchaseError('');
    };

    const confirmPurchase = () => {
        if (!selectedItem) return;
        if (coins < selectedItem.price) {
            setPurchaseError('Koin kamu belum cukup.');
            return;
        }
        setCoins((prev) => prev - selectedItem.price);
        setLastPurchase(selectedItem);
        setIsModalOpen(false);
        setSelectedItem(null);
        setPurchaseError('');
        if (typeof window !== 'undefined' && window.confetti) {
            window.confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
        }
    };

    const userName = user?.full_name || 'Budi Santoso';
    const userLevel = user?.level || 12;
    const userRank = user?.rank || 'Cendekiawan';
    const userAvatar = user?.avatar || 'https://i.pravatar.cc/300?img=12';

    return (
        <StudentLayout user={user}>
            <Head title="Toko - Si Hebat" />

            <div
                className="min-h-screen bg-sky-50 text-slate-700 pb-28 overflow-x-hidden"
                style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}
            >
                <nav className="glass-panel sticky top-0 z-50 px-4 py-3 flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => window.history.back()}
                            className="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-sky-50 transition"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-emerald-600 leading-none">Toko</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-full border-2 border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.4)]">
                        <Coins className="text-yellow-400" size={18} />
                        <span className="font-black text-lg tracking-wide">{coins.toLocaleString()}</span>
                    </div>
                </nav>

                <section className="relative pt-6 pb-12 px-4 bg-gradient-to-b from-sky-100 to-transparent">
                    <div className="max-w-md mx-auto relative z-10">
                        <div className="bg-white rounded-[2rem] shadow-2xl border-4 border-white overflow-hidden relative transition-all duration-500 hover:scale-[1.02]">
                            <div className="h-32 bg-slate-200 relative overflow-hidden">
                                <img
                                    src={previewBanner}
                                    alt="Preview Banner"
                                    className="w-full h-full object-cover transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            </div>
                            <div className="px-6 pb-6 relative">
                                <div className="flex justify-center -mt-12 mb-3">
                                    <div className={previewFrameClass}>
                                        <img src={userAvatar} alt={userName} className="avatar-img shadow-lg" />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-black text-slate-800">{userName.toUpperCase()}</h3>
                                    <p className="text-xs text-slate-500 font-bold">{userRank} • Lvl {userLevel}</p>
                                </div>
                            </div>
                            <div className={`absolute top-4 right-4 bg-slate-900/80 text-white px-3 py-1 rounded-lg backdrop-blur-md transition-opacity ${previewPrice ? 'opacity-100' : 'opacity-0'}`}>
                                <span className="text-xs font-bold">Harga: </span>
                                <span className="text-yellow-400 font-bold">{previewPrice?.toLocaleString() ?? 0}</span>
                            </div>
                        </div>
                    </div>
                </section>

                <main className="max-w-4xl mx-auto px-4 -mt-4 relative z-20">
                    <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-2">
                        {TABS.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.key;
                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`flex-none px-5 py-3 rounded-xl font-bold transition ${isActive
                                        ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
                                        : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                                        }`}
                                >
                                    <span className="inline-flex items-center gap-2">
                                        <Icon size={16} /> {tab.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredItems.map((item) => {
                            const rarity = rarityStyles[item.rarity] || rarityStyles.common;
                            const previewClass = item.css ? item.css : '';
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handlePreview(item)}
                                    className={`${rarity.card} p-3 rounded-2xl relative group text-left transition transform hover:-translate-y-1 hover:shadow-xl`}
                                >
                                    <div className={`absolute top-2 left-2 bg-white/80 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-bold uppercase ${rarity.text}`}>
                                        {item.rarity}
                                    </div>
                                    {item.type === 'banner' ? (
                                        <div className="h-24 mb-2 rounded-xl overflow-hidden border-2 border-white shadow-sm">
                                            <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="h-24 flex items-center justify-center mb-2 bg-white/60 rounded-xl overflow-hidden">
                                            <div className={`relative w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center ${previewClass}`}>
                                                {item.type === 'border' && (
                                                    <div className="w-full h-full bg-slate-300 rounded-full border-2 border-white" />
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    <h4 className="font-bold text-slate-700 text-sm truncate">{item.name}</h4>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-1 text-yellow-600 font-bold text-sm">
                                            <Coins size={14} /> {item.price}
                                        </div>
                                        <button
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                openModal(item);
                                            }}
                                            className="bg-sky-500 text-white text-xs px-3 py-1.5 rounded-lg font-bold hover:bg-sky-600 transition shadow-md"
                                        >
                                            Beli
                                        </button>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mt-8">
                        <div className="bg-white/90 border border-white rounded-2xl p-4 shadow-sm">
                            <p className="text-xs font-bold text-slate-400 uppercase mb-2">Bonus Harian</p>
                            <p className="text-sm font-semibold text-slate-700">Login 7 hari berturut-turut untuk diskon 15%.</p>
                        </div>
                        <div className="bg-white/90 border border-white rounded-2xl p-4 shadow-sm">
                            <p className="text-xs font-bold text-slate-400 uppercase mb-2">Paket Sultan</p>
                            <p className="text-sm font-semibold text-slate-700">Kombinasikan bingkai + banner untuk efek lengkap.</p>
                        </div>
                        <div className="bg-white/90 border border-white rounded-2xl p-4 shadow-sm">
                            <p className="text-xs font-bold text-slate-400 uppercase mb-2">Tips Koin</p>
                            <p className="text-sm font-semibold text-slate-700">Selesaikan habit harian untuk tambahan koin.</p>
                        </div>
                    </div>
                </main>

                {lastPurchase && (
                    <div className="max-w-4xl mx-auto px-4 mt-8">
                        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
                            <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">
                                <ShoppingCart className="text-sky-500" size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">Terakhir Dibeli</p>
                                <p className="text-sm font-bold text-slate-700">{lastPurchase.name}</p>
                            </div>
                        </div>
                    </div>
                )}

                {isModalOpen && selectedItem && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
                        <div className="bg-white w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-white to-transparent opacity-60 animate-shine" />
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                            >
                                <X size={18} />
                            </button>
                            <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShoppingCart className="text-sky-500" size={28} />
                            </div>
                            <h3 className="text-3xl font-black text-slate-800 mb-1">Konfirmasi</h3>
                            <p className="text-slate-500 text-sm mb-6">
                                Beli item <span className="font-bold text-sky-600">{selectedItem.name}</span>?
                            </p>
                            <div className="bg-slate-100 rounded-xl p-3 mb-4 flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-500">Total Harga</span>
                                <div className="flex items-center gap-1">
                                    <Coins className="text-yellow-500" size={16} />
                                    <span className="font-bold text-slate-800 text-lg">{selectedItem.price}</span>
                                </div>
                            </div>
                            {purchaseError && (
                                <p className="text-xs text-red-500 font-bold mb-4">{purchaseError}</p>
                            )}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={closeModal}
                                    className="py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={confirmPurchase}
                                    disabled={coins < selectedItem.price}
                                    className={`py-3 rounded-xl font-bold text-white transition ${coins < selectedItem.price
                                        ? 'bg-slate-300 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-sky-500 to-blue-600 shadow-lg shadow-sky-500/30 hover:scale-[1.02]'
                                        }`}
                                >
                                    {coins < selectedItem.price ? 'Koin Kurang' : 'Beli'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </StudentLayout>
    );
}
