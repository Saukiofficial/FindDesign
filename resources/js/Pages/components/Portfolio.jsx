import React, { useState } from 'react';
import { Head } from '@inertiajs/react';

// Komponen sekarang menerima 'portfolioItems' dari props
export default function Portfolio({ portfolioItems = [] }) {
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedItem, setSelectedItem] = useState(null);

    // Dynamic title berdasarkan kategori aktif
    const pageTitle = activeCategory === 'all'
        ? 'Portfolio - All Works'
        : `Portfolio - ${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}`;

    // Membuat daftar kategori secara dinamis dari data yang ada
    const categories = [
        { id: 'all', name: 'All Works' },
        // Menggunakan Set untuk mendapatkan kategori unik, lalu memetakannya
        ...[...new Set(portfolioItems.map(item => item.category))].map(category => ({
            id: category,
            name: category.charAt(0).toUpperCase() + category.slice(1) // Kapitalisasi huruf pertama
        }))
    ];

    // Karakter ilustrator untuk setiap kategori
    const getCharacterIcon = (categoryId) => {
        const characters = {
            'all': {
                svg: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.31-.91-6-4.66-6-8.44V8.3l6-3.25 6 3.25v3.26c0 3.78-2.69 7.53-6 8.44z"/><path d="M9 12l2 2 4-4"/></svg>,
                label: 'All Works'
            },
            'illustration': {
                svg: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>,
                label: 'Illustration'
            },
            'otomotif': {
                svg: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>,
                label: 'Otomotif'
            },
            'blue collar': {
                svg: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>,
                label: 'Blue Collar'
            },
            'illustrations': {
                svg: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.71 4.63l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z"/><path d="M7 14c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H7z"/><path d="M19 17h-1.5v-1.5h-1v1.5H15v1h1.5V19h1v-1.5H19v-1z"/></svg>,
                label: 'Illustrations'
            },
            'digital': {
                svg: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 3H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h3v2h10v-2h3c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 13H4V5h16v11zm-2-1H6V7h12v8z"/></svg>,
                label: 'Digital'
            },
            'animation': {
                svg: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"/></svg>,
                label: 'Animation'
            },
            'character': {
                svg: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>,
                label: 'Character'
            },
            'concept': {
                svg: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>,
                label: 'Concept'
            }
        };
        return characters[categoryId.toLowerCase()] || {
            svg: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm0 14H3V5h18v12z"/></svg>,
            label: 'Portfolio'
        };
    };

    // Logika filter berdasarkan kategori yang aktif
    const filteredItems = activeCategory === 'all'
        ? portfolioItems
        : portfolioItems.filter(item => item.category === activeCategory);

    return (
        <>
            {/* Dynamic Page Title */}
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content="Jelajahi karya kreatif kami di berbagai ilustrasi, seni digital, dan animasi." />
            </Head>

            <section id="portfolio" className="relative py-24 bg-gradient-to-b from-slate-950 to-red-950/30 overflow-hidden">
            {/* Dekorasi Latar Belakang */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/10 rounded-full filter blur-3xl"></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header Bagian */}
                <div className="text-center mb-16">
                    <div className="inline-block mb-4 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full backdrop-blur-sm">
                        <span className="text-red-400 text-sm font-medium tracking-wider">OUR WORK</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
                            Portfolio
                        </span>
                    </h2>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                        Jelajahi karya kreatif kami di berbagai ilustrasi, seni digital, dan animasi.
                    </p>
                </div>

                {/* Filter Kategori - Metal/Edgy Design */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {categories.map((category) => {
                        const character = getCharacterIcon(category.id);
                        const isActive = activeCategory === category.id;

                        return (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`group relative transition-all duration-300 ${
                                    isActive ? 'scale-105' : ''
                                }`}
                            >
                                {/* Edgy Professional Card */}
                                <div className={`relative flex items-center gap-3 px-5 py-3 transition-all duration-300 ${
                                    isActive
                                        ? 'bg-red-600 text-white'
                                        : 'bg-slate-900/80 text-white/70 border border-slate-700/50 hover:border-red-500/70 hover:text-white'
                                }`}
                                style={{
                                    clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)'
                                }}>

                                    {/* Icon - SVG Sharp & Modern */}
                                    <div className={`transition-all duration-300 ${
                                        isActive ? 'text-white' : 'text-red-400 group-hover:text-red-300'
                                    }`}>
                                        {character.svg}
                                    </div>

                                    {/* Nama Kategori - Bold Typography */}
                                    <span className={`text-sm font-bold tracking-wider uppercase transition-colors duration-300`}>
                                        {category.name}
                                    </span>

                                    {/* Corner Accent - Sharp Geometric */}
                                    {isActive && (
                                        <>
                                            <div className="absolute top-0 left-0 w-2 h-2 bg-white" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
                                            <div className="absolute bottom-0 right-0 w-2 h-2 bg-white" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}></div>
                                        </>
                                    )}
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
                            className="group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-800 hover:border-red-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20"
                            style={{
                                animation: `fadeInUp 0.6s ease-out forwards`,
                                animationDelay: `${index * 100}ms`,
                                opacity: 0,
                            }}
                        >
                            {/* Kontainer Gambar */}
                            <div className="relative h-72 overflow-hidden">
                                <img
                                    src={`/storage/${item.image}`} // Path disesuaikan dengan storage Laravel
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    onError={(e) => {
                                        e.target.src = `https://placehold.co/600x400/1e293b/ef4444?text=${item.title}`;
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                                <div className="absolute top-4 right-4 px-3 py-1 bg-slate-950/80 backdrop-blur-sm border border-red-500/30 rounded-full">
                                    <span className="text-red-400 text-xs font-medium uppercase tracking-wider">
                                        {item.category}
                                    </span>
                                </div>
                            </div>

                            {/* Konten */}
                            <div className="relative p-6">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors duration-300">
                                    {item.title}
                                </h3>
                                <p className="text-white/70 text-sm mb-4">
                                    {item.description}
                                </p>
                                <button
                                    onClick={() => setSelectedItem(item)}
                                    className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 font-medium text-sm group-hover:translate-x-2 transition-transform duration-300"
                                >
                                    View Project
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Pojok Dekoratif */}
                            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-red-500/0 group-hover:border-red-500/50 transition-all duration-500 rounded-tl-2xl"></div>
                            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-red-400/0 group-hover:border-red-400/50 transition-all duration-500 rounded-br-2xl"></div>
                        </div>
                    ))}
                </div>

                {/* Tombol Load More */}
                {filteredItems.length === 0 && (
                    <div className="text-center col-span-full mt-12">
                         <p className="text-white/70 text-lg">Belum ada item portofolio di kategori ini.</p>
                    </div>
                )}
            </div>

            {/* Modal Full Screen */}
            {selectedItem && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                    onClick={() => setSelectedItem(null)}
                >
                    <div
                        className="relative max-w-6xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Tombol Close */}
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="absolute top-4 right-4 z-10 p-2 bg-slate-950/80 backdrop-blur-sm rounded-full border border-red-500/30 hover:bg-red-600 hover:border-red-500 transition-all duration-300 group"
                        >
                            <svg className="w-6 h-6 text-red-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Gambar Full */}
                        <div className="relative">
                            <img
                                src={`/storage/${selectedItem.image}`}
                                alt={selectedItem.title}
                                className="w-full max-h-[70vh] object-contain bg-slate-950"
                                onError={(e) => {
                                    e.target.src = `https://placehold.co/1200x800/1e293b/ef4444?text=${selectedItem.title}`;
                                }}
                            />
                            <div className="absolute top-4 left-4 px-3 py-1 bg-slate-950/80 backdrop-blur-sm border border-red-500/30 rounded-full">
                                <span className="text-red-400 text-xs font-medium uppercase tracking-wider">
                                    {selectedItem.category}
                                </span>
                            </div>
                        </div>

                        {/* Detail Konten */}
                        <div className="p-8">
                            <h3 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
                                {selectedItem.title}
                            </h3>
                            <p className="text-white/80 text-lg leading-relaxed">
                                {selectedItem.description}
                            </p>
                        </div>
                    </div>
                </div>
            )}

             {/* Menambahkan keyframes untuk animasi */}
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
        </>
    );
}
