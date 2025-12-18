import React, { useState } from 'react';
import { Head } from '@inertiajs/react';

export default function Portfolio({ portfolioItems = [] }) {
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedItem, setSelectedItem] = useState(null);

    const pageTitle = activeCategory === 'all'
        ? 'Portfolio - All Works'
        : `Portfolio - ${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}`;

    const categories = [
        { id: 'all', name: 'All Works' },
        ...[...new Set(portfolioItems.map(item => item.category))].map(category => ({
            id: category,
            name: category.charAt(0).toUpperCase() + category.slice(1)
        }))
    ];

    // SVG Icons (Disingkat untuk keterbacaan, konten sama seperti asli)
    const getCharacterIcon = (categoryId) => {
        // ... (Logika icon sama seperti file asli)
         return {
            svg: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.31-.91-6-4.66-6-8.44V8.3l6-3.25 6 3.25v3.26c0 3.78-2.69 7.53-6 8.44z"/><path d="M9 12l2 2 4-4"/></svg>,
            label: 'Works'
        };
    };

    const filteredItems = activeCategory === 'all'
        ? portfolioItems
        : portfolioItems.filter(item => item.category === activeCategory);

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content="Jelajahi karya kreatif kami di berbagai ilustrasi, seni digital, dan animasi." />
            </Head>

            {/* OPTIMISASI: Hapus overflow-hidden jika tidak perlu, dan gunakan transform-gpu */}
            <section id="portfolio" className="relative py-24 bg-gradient-to-b from-slate-950 to-red-950/30 transform-gpu">

            {/* OPTIMISASI: Blobs hanya muncul di layar besar (md:block) */}
            <div className="hidden md:block absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full filter blur-3xl"></div>
            <div className="hidden md:block absolute bottom-0 left-0 w-96 h-96 bg-red-500/10 rounded-full filter blur-3xl"></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header Bagian */}
                <div className="text-center mb-16">
                    <div className="inline-block mb-4 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full">
                        <span className="text-red-400 text-sm font-medium tracking-wider">OUR WORK</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
                            Portfolio
                        </span>
                    </h2>
                </div>

                {/* Filter Kategori */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {categories.map((category) => {
                        const character = getCharacterIcon(category.id);
                        const isActive = activeCategory === category.id;

                        return (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`group relative transition-all duration-300 ${isActive ? 'scale-105' : ''}`}
                            >
                                <div className={`relative flex items-center gap-3 px-5 py-3 transition-all duration-300 ${
                                    isActive
                                        ? 'bg-red-600 text-white'
                                        : 'bg-slate-900 text-white/70 border border-slate-700/50 hover:border-red-500/70 hover:text-white'
                                }`}
                                style={{
                                    clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)'
                                }}>
                                    <div className={`transition-all duration-300 ${isActive ? 'text-white' : 'text-red-400 group-hover:text-red-300'}`}>
                                        {character.svg}
                                    </div>
                                    <span className="text-sm font-bold tracking-wider uppercase">
                                        {category.name}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Grid Portfolio */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItems.map((item, index) => (
                        <div
                            key={item.id}
                            // OPTIMISASI: Ganti backdrop-blur-sm dengan bg-slate-900 solid di mobile
                            // backdrop-blur hanya aktif di md: (tablet/desktop)
                            className="group relative bg-slate-900 md:bg-slate-900/50 md:backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-800 hover:border-red-500/50 transition-all duration-500 md:hover:scale-105"
                            style={{
                                animation: `fadeInUp 0.6s ease-out forwards`,
                                animationDelay: `${index * 50}ms`, // Kurangi delay agar lebih responsif
                                opacity: 0,
                                contentVisibility: 'auto', // CSS Optimization untuk rendering
                                containIntrinsicSize: '0 400px' // Estimasi tinggi
                            }}
                        >
                            {/* Kontainer Gambar */}
                            <div className="relative h-72 overflow-hidden bg-slate-800">
                                <img
                                    src={`/storage/${item.image}`}
                                    alt={item.title}
                                    // OPTIMISASI PENTING: Lazy loading & decoding
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110"
                                    onError={(e) => {
                                        e.target.src = `https://placehold.co/600x400/1e293b/ef4444?text=${item.title}`;
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-60 md:group-hover:opacity-80 transition-opacity duration-300"></div>
                                <div className="absolute top-4 right-4 px-3 py-1 bg-slate-950/90 rounded-full border border-red-500/30">
                                    <span className="text-red-400 text-xs font-medium uppercase tracking-wider">
                                        {item.category}
                                    </span>
                                </div>
                            </div>

                            {/* Konten */}
                            <div className="relative p-6">
                                <h3 className="text-xl font-bold text-white mb-2 md:group-hover:text-red-400 transition-colors duration-300">
                                    {item.title}
                                </h3>
                                <p className="text-white/70 text-sm mb-4 line-clamp-2">
                                    {item.description}
                                </p>
                                <button
                                    onClick={() => setSelectedItem(item)}
                                    className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 font-medium text-sm md:group-hover:translate-x-2 transition-transform duration-300"
                                >
                                    View Project
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Full Screen - Gunakan z-index tinggi dan posisi fixed yang aman */}
            {selectedItem && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-4"
                    onClick={() => setSelectedItem(null)}
                >
                    <div
                        className="relative max-w-6xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Tombol Close */}
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="absolute top-4 right-4 z-10 p-2 bg-slate-950 rounded-full border border-red-500/30 text-red-400"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Gambar Full - Scrollable jika terlalu tinggi */}
                        <div className="overflow-y-auto">
                            <div className="relative">
                                <img
                                    src={`/storage/${selectedItem.image}`}
                                    alt={selectedItem.title}
                                    className="w-full object-contain bg-slate-950 max-h-[60vh]"
                                />
                            </div>

                            <div className="p-8">
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 text-red-400">
                                    {selectedItem.title}
                                </h3>
                                <p className="text-white/80 text-lg leading-relaxed">
                                    {selectedItem.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
        </>
    );
}
