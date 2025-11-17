import React, { useState } from 'react';

// Komponen sekarang menerima 'portfolioItems' dari props
export default function Portfolio({ portfolioItems = [] }) {
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedItem, setSelectedItem] = useState(null);

    // Membuat daftar kategori secara dinamis dari data yang ada
    const categories = [
        { id: 'all', name: 'All Works' },
        // Menggunakan Set untuk mendapatkan kategori unik, lalu memetakannya
        ...[...new Set(portfolioItems.map(item => item.category))].map(category => ({
            id: category,
            name: category.charAt(0).toUpperCase() + category.slice(1) // Kapitalisasi huruf pertama
        }))
    ];

    // Logika filter berdasarkan kategori yang aktif
    const filteredItems = activeCategory === 'all'
        ? portfolioItems
        : portfolioItems.filter(item => item.category === activeCategory);

    return (
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

                {/* Filter Kategori */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`group relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                                activeCategory === category.id
                                    ? 'bg-gradient-to-r from-red-600 to-red-500 text-white scale-105 shadow-lg shadow-red-500/50'
                                    : 'bg-slate-800/50 text-white/70 hover:text-white hover:bg-slate-800 border border-slate-700'
                            }`}
                        >
                            <span className="flex items-center gap-2">
                                {category.name}
                            </span>
                            {activeCategory === category.id && (
                                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 rounded-full blur-md opacity-50 -z-10"></div>
                            )}
                        </button>
                    ))}
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
    );
}
