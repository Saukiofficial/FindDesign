import React, { useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';

export default function Portfolio({ portfolioItems = [] }) {
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedItem, setSelectedItem] = useState(null);

    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(portfolioItems.map((item) => item.category).filter(Boolean))];

        return [
            { id: 'all', name: 'All Works' },
            ...uniqueCategories.map((category) => ({
                id: category,
                name: category,
            })),
        ];
    }, [portfolioItems]);

    const filteredItems = activeCategory === 'all'
        ? portfolioItems
        : portfolioItems.filter((item) => item.category === activeCategory);

    const getImageUrl = (item) => {
        if (item?.image_url) {
            return item.image_url;
        }

        if (item?.image) {
            return `/storage/${String(item.image).replace(/^\/+/, '')}`;
        }

        return null;
    };

    const getCategoryIcon = (category) => {
        const value = String(category || '').toLowerCase();

        if (value.includes('animation')) return '🎬';
        if (value.includes('digital')) return '🖼️';
        if (value.includes('brand')) return '✦';
        if (value.includes('otomotif')) return '🏁';
        if (value.includes('blue')) return '⚙️';

        return '🎨';
    };

    return (
        <>
            <Head>
                <title>Portfolio - Fiind Design</title>
                <meta
                    name="description"
                    content="Explore premium creative portfolio from Fiind Design."
                />
            </Head>

            <section
                id="portfolio"
                className="relative overflow-hidden bg-black px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28"
            >
                <style>{`
                    @keyframes portfolioSpark {
                        0% {
                            transform: translate3d(0, 0, 0) rotate(0deg);
                            opacity: 0;
                        }
                        20% {
                            opacity: 1;
                        }
                        100% {
                            transform: translate3d(36px, -110px, 0) rotate(200deg);
                            opacity: 0;
                        }
                    }

                    @keyframes portfolioFloat {
                        0%, 100% {
                            transform: translate3d(0, 0, 0);
                        }
                        50% {
                            transform: translate3d(0, -10px, 0);
                        }
                    }

                    .fd-portfolio-spark {
                        animation: portfolioSpark 5s linear infinite;
                    }

                    .fd-portfolio-card {
                        clip-path: polygon(
                            0 7%,
                            7% 0,
                            93% 0,
                            100% 7%,
                            100% 93%,
                            93% 100%,
                            7% 100%,
                            0 93%
                        );
                    }

                    .fd-portfolio-title-shadow {
                        text-shadow:
                            0 0 16px rgba(239, 68, 68, 0.25),
                            0 8px 18px rgba(0, 0, 0, 0.9);
                    }

                    .fd-portfolio-float {
                        animation: portfolioFloat 7s ease-in-out infinite;
                    }

                    @media (prefers-reduced-motion: reduce) {
                        .fd-portfolio-spark,
                        .fd-portfolio-float {
                            animation: none !important;
                        }
                    }
                `}</style>

                {/* BACKGROUND */}
                <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,#020202_0%,#100101_42%,#020202_100%)]" />
                <div className="absolute right-[8%] top-12 z-[1] h-72 w-72 rounded-full bg-red-700/18 blur-3xl lg:h-[460px] lg:w-[460px]" />
                <div className="absolute left-[-12%] top-[30%] z-[1] h-[420px] w-[620px] rounded-full bg-red-900/16 blur-3xl" />
                <div className="absolute right-[-15%] bottom-[8%] z-[1] h-[420px] w-[620px] rounded-full bg-red-700/12 blur-3xl" />

                <div className="pointer-events-none absolute inset-0 z-[2] opacity-[0.08]">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.65)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.65)_1px,transparent_1px)] bg-[size:86px_86px]" />
                </div>

                <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden">
                    {Array.from({ length: 20 }).map((_, index) => (
                        <span
                            key={index}
                            className="fd-portfolio-spark absolute h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_14px_rgba(239,68,68,0.9)]"
                            style={{
                                left: `${6 + ((index * 13) % 90)}%`,
                                top: `${15 + ((index * 17) % 70)}%`,
                                animationDelay: `${index * 0.28}s`,
                                animationDuration: `${4.2 + (index % 5)}s`,
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 mx-auto max-w-[1600px]">
                    {/* HEADER */}
                    <div className="mx-auto mb-12 max-w-4xl text-center lg:mb-16">
                        <div className="mb-5 inline-flex items-center justify-center rounded-full border border-red-500/50 bg-black/45 px-5 py-2 text-[0.68rem] font-black uppercase tracking-[0.28em] text-red-400 shadow-[0_0_24px_rgba(220,38,38,0.24)] backdrop-blur">
                            Our Work
                        </div>

                        <h2 className="fd-portfolio-title-shadow text-5xl font-black uppercase leading-none tracking-tight sm:text-6xl lg:text-7xl">
                            <span className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
                                Creative
                            </span>
                            <span className="ml-4 bg-gradient-to-b from-red-500 to-red-900 bg-clip-text text-transparent">
                                Portfolio
                            </span>
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-relaxed text-white/78 sm:text-lg">
                            A collection of premium visual works crafted with bold identity, dark energy, and sharp creative execution.
                        </p>
                    </div>

                    {/* FILTER */}
                    <div className="mb-14 flex flex-wrap justify-center gap-3">
                        {categories.map((category) => {
                            const isActive = activeCategory === category.id;

                            return (
                                <button
                                    key={category.id}
                                    type="button"
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`group relative overflow-hidden rounded-full border px-5 py-3 text-xs font-black uppercase tracking-[0.18em] transition-all duration-300 ${
                                        isActive
                                            ? 'border-red-400 bg-red-600 text-white shadow-[0_0_28px_rgba(220,38,38,0.42)]'
                                            : 'border-red-500/30 bg-black/45 text-white/60 hover:border-red-400 hover:text-white'
                                    }`}
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        <span>{category.id === 'all' ? '☠' : getCategoryIcon(category.id)}</span>
                                        {category.name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* GRID */}
                    {filteredItems.length > 0 ? (
                        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                            {filteredItems.map((item, index) => {
                                const imageUrl = getImageUrl(item);

                                return (
                                    <article
                                        key={item.id}
                                        className="group relative pt-8"
                                        style={{
                                            animation: 'fadeInUp 0.6s ease-out forwards',
                                            animationDelay: `${index * 70}ms`,
                                            opacity: 0,
                                        }}
                                    >
                                        <div className="absolute inset-x-0 bottom-0 top-8 rounded-[2rem] bg-gradient-to-b from-red-500/55 via-red-950/24 to-red-600/55 opacity-70 blur-[1px] transition duration-500 group-hover:opacity-100" />

                                        <div className="fd-portfolio-card relative overflow-hidden border border-red-500/35 bg-[linear-gradient(180deg,rgba(52,8,8,0.78),rgba(4,4,4,0.9)_42%,rgba(2,2,2,0.96))] shadow-[0_0_50px_rgba(220,38,38,0.14)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_0_75px_rgba(220,38,38,0.28)]">
                                            <div className="relative h-[360px] overflow-hidden bg-black">
                                                {imageUrl ? (
                                                    <img
                                                        src={imageUrl}
                                                        alt={item.title}
                                                        loading="lazy"
                                                        decoding="async"
                                                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                                        onError={(event) => {
                                                            event.currentTarget.src = `https://placehold.co/800x800/020202/ef4444?text=${encodeURIComponent(item.title || 'Portfolio')}`;
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center bg-red-950/20 text-red-400">
                                                        No Image
                                                    </div>
                                                )}

                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                                                <div className="absolute inset-0 bg-red-600/0 transition duration-500 group-hover:bg-red-600/10" />

                                                <div className="absolute left-5 top-5 rounded-full border border-red-500/40 bg-black/70 px-4 py-2 text-xs font-black uppercase tracking-wider text-red-300 backdrop-blur">
                                                    {item.category}
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedItem(item)}
                                                    className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full border border-red-500/50 bg-black/75 text-red-300 shadow-[0_0_24px_rgba(220,38,38,0.35)] transition hover:bg-red-600 hover:text-white"
                                                    aria-label="View Project"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H8M17 7v9" />
                                                    </svg>
                                                </button>
                                            </div>

                                            <div className="relative p-7">
                                                <div className="mb-3 flex items-center gap-2 text-red-400">
                                                    <span>{getCategoryIcon(item.category)}</span>
                                                    <span className="text-[0.65rem] font-black uppercase tracking-[0.22em]">
                                                        Featured Work
                                                    </span>
                                                </div>

                                                <h3 className="fd-portfolio-title-shadow text-2xl font-black uppercase leading-tight text-white transition group-hover:text-red-300">
                                                    {item.title}
                                                </h3>

                                                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/62">
                                                    {item.description || 'No description available for this project.'}
                                                </p>

                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedItem(item)}
                                                    className="mt-6 inline-flex items-center gap-3 text-sm font-black uppercase tracking-wider text-red-400 transition hover:text-red-300"
                                                >
                                                    View Project
                                                    <svg className="h-4 w-4 transition group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-6-6l6 6-6 6" />
                                                    </svg>
                                                </button>

                                                <div className="absolute bottom-0 left-1/2 h-[3px] w-16 -translate-x-1/2 rounded-t-full bg-red-500 shadow-[0_0_18px_rgba(239,68,68,0.9)]" />
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="rounded-3xl border border-red-500/20 bg-black/45 p-12 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 text-3xl">
                                ☠
                            </div>
                            <h3 className="text-xl font-bold text-white">
                                No portfolio found
                            </h3>
                            <p className="mt-2 text-sm text-white/55">
                                Belum ada item portfolio pada kategori ini.
                            </p>
                        </div>
                    )}
                </div>

                {/* MODAL */}
                {selectedItem && (
                    <div
                        className="fixed inset-0 z-[120] flex items-center justify-center bg-black/92 p-4 backdrop-blur-md"
                        onClick={() => setSelectedItem(null)}
                    >
                        <div
                            className="relative max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-3xl border border-red-500/35 bg-black shadow-[0_0_85px_rgba(220,38,38,0.28)]"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <button
                                type="button"
                                onClick={() => setSelectedItem(null)}
                                className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-red-500/40 bg-black/80 text-red-300 transition hover:bg-red-600 hover:text-white"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="grid max-h-[92vh] overflow-y-auto lg:grid-cols-[1.25fr_0.75fr]">
                                <div className="flex items-center justify-center bg-black">
                                    <img
                                        src={getImageUrl(selectedItem)}
                                        alt={selectedItem.title}
                                        className="max-h-[72vh] w-full object-contain"
                                    />
                                </div>

                                <div className="relative overflow-hidden border-t border-red-500/20 bg-[linear-gradient(180deg,rgba(52,8,8,0.72),rgba(3,3,3,0.96))] p-8 lg:border-l lg:border-t-0">
                                    <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-red-600/15 blur-3xl" />

                                    <div className="relative z-10">
                                        <div className="mb-4 inline-flex rounded-full border border-red-500/40 bg-black/40 px-4 py-2 text-xs font-black uppercase tracking-wider text-red-300">
                                            {selectedItem.category}
                                        </div>

                                        <h3 className="fd-portfolio-title-shadow text-3xl font-black uppercase leading-tight text-white">
                                            {selectedItem.title}
                                        </h3>

                                        <p className="mt-5 text-base leading-relaxed text-white/72">
                                            {selectedItem.description || 'No description available for this project.'}
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() => setSelectedItem(null)}
                                            className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-red-600 to-red-800 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-900/40 transition hover:from-red-700 hover:to-red-900"
                                        >
                                            Close Preview
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

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