import React, { useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';

export default function Portfolio({ portfolioItems = [] }) {
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedItem, setSelectedItem] = useState(null);

    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(portfolioItems.map((item) => item.category).filter(Boolean))];
        return [
            { id: 'all', name: 'All Works' },
            ...uniqueCategories.map((category) => ({ id: category, name: category })),
        ];
    }, [portfolioItems]);

    const filteredItems = activeCategory === 'all'
        ? portfolioItems
        : portfolioItems.filter((item) => item.category === activeCategory);

    const getImageUrl = (item) => {
        if (item?.image_url) return item.image_url;
        if (item?.image) return `/storage/${String(item.image).replace(/^\/+/, '')}`;
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
                <meta name="description" content="Explore premium creative portfolio from Fiind Design." />
            </Head>

            <section
                id="portfolio"
                className="relative overflow-hidden bg-black text-white"
                style={{ padding: 'clamp(3rem, 8vw, 7rem) clamp(0.75rem, 4vw, 4rem)' }}
            >
                <style>{`
                    @keyframes portfolioSpark {
                        0%   { transform: translate3d(0, 0, 0) rotate(0deg); opacity: 0; }
                        20%  { opacity: 1; }
                        100% { transform: translate3d(36px, -110px, 0) rotate(200deg); opacity: 0; }
                    }

                    @keyframes portfolioFloat {
                        0%, 100% { transform: translate3d(0, 0, 0); }
                        50%       { transform: translate3d(0, -10px, 0); }
                    }

                    @keyframes fadeInUp {
                        from { opacity: 0; transform: translateY(30px); }
                        to   { opacity: 1; transform: translateY(0); }
                    }

                    .fd-spark {
                        animation: portfolioSpark 5s linear infinite;
                    }

                    .fd-float {
                        animation: portfolioFloat 7s ease-in-out infinite;
                    }

                    .fd-card-clip {
                        clip-path: polygon(
                            0 5%, 5% 0, 95% 0, 100% 5%,
                            100% 95%, 95% 100%, 5% 100%, 0 95%
                        );
                    }

                    .fd-title-shadow {
                        text-shadow:
                            0 0 16px rgba(239,68,68,0.25),
                            0 8px 18px rgba(0,0,0,0.9);
                    }

                    /* ── Portfolio Grid: SELALU 2 kolom sejajar ── */
                    .fd-portfolio-grid {
                        display: grid;
                        gap: clamp(0.6rem, 2vw, 2rem);
                        grid-template-columns: repeat(2, 1fr);
                    }

                    /* ── Card image height: proporsional untuk 2 col di HP ── */
                    .fd-card-image {
                        height: clamp(100px, 22vw, 400px);
                    }

                    /* ── Filter bar: wrap gracefully ── */
                    .fd-filter-bar {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        gap: clamp(0.4rem, 1.5vw, 0.75rem);
                    }

                    /* ── Modal: stack on mobile, side-by-side on desktop ── */
                    .fd-modal-inner {
                        display: grid;
                        grid-template-columns: 1fr;
                        max-height: 92vh;
                        overflow-y: auto;
                    }
                    @media (min-width: 1024px) {
                        .fd-modal-inner {
                            grid-template-columns: 1.25fr 0.75fr;
                            overflow-y: unset;
                        }
                    }

                    .fd-modal-img-pane {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: #000;
                        min-height: clamp(220px, 40vw, 520px);
                        overflow: hidden;
                    }
                    @media (min-width: 1024px) {
                        .fd-modal-img-pane {
                            max-height: 92vh;
                        }
                    }

                    .fd-modal-info {
                        border-top: 1px solid rgba(239,68,68,0.2);
                        background: linear-gradient(180deg, rgba(52,8,8,0.72), rgba(3,3,3,0.96));
                        padding: clamp(1.5rem, 4vw, 2.5rem);
                        position: relative;
                        overflow: hidden;
                    }
                    @media (min-width: 1024px) {
                        .fd-modal-info {
                            border-top: none;
                            border-left: 1px solid rgba(239,68,68,0.2);
                            overflow-y: auto;
                            max-height: 92vh;
                        }
                    }

                    /* ── Heading: fluid, tidak pernah terpotong ── */
                    .fd-hero-h2 {
                        font-size: clamp(1.3rem, 5.5vw, 5rem);
                        font-weight: 900;
                        text-transform: uppercase;
                        line-height: 1.1;
                        white-space: normal;
                        overflow: visible;
                        max-width: 100%;
                        letter-spacing: -0.02em;
                    }

                    /* ── Filter button: scale down on very small screens ── */
                    .fd-filter-btn {
                        border-radius: 9999px;
                        border-width: 1px;
                        padding: clamp(0.45rem, 1.2vw, 0.75rem) clamp(0.9rem, 2.5vw, 1.25rem);
                        font-size: clamp(0.6rem, 1.1vw, 0.75rem);
                        font-weight: 900;
                        text-transform: uppercase;
                        letter-spacing: 0.18em;
                        transition: all 0.3s;
                        white-space: nowrap;
                    }

                    /* ── Card content padding fluid ── */
                    .fd-card-body {
                        padding: clamp(0.6rem, 2vw, 1.75rem);
                    }

                    /* ── Card title fluid ── */
                    .fd-card-title {
                        font-size: clamp(0.7rem, 2.5vw, 1.5rem);
                        font-weight: 900;
                        text-transform: uppercase;
                        line-height: 1.2;
                    }

                    @media (prefers-reduced-motion: reduce) {
                        .fd-spark, .fd-float { animation: none !important; }
                    }
                `}</style>

                {/* ── BACKGROUND LAYERS ── */}
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
                            className="fd-spark absolute h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_14px_rgba(239,68,68,0.9)]"
                            style={{
                                left: `${6 + ((index * 13) % 90)}%`,
                                top: `${15 + ((index * 17) % 70)}%`,
                                animationDelay: `${index * 0.28}s`,
                                animationDuration: `${4.2 + (index % 5)}s`,
                            }}
                        />
                    ))}
                </div>

                {/* ── CONTENT ── */}
                <div className="relative z-10 mx-auto w-full max-w-[1600px]">

                    {/* HEADER */}
                    <div className="mx-auto mb-10 max-w-4xl text-center lg:mb-16">
                        <div
                            className="mb-5 inline-flex items-center justify-center rounded-full border border-red-500/50 bg-black/45 px-5 py-2 font-black uppercase tracking-[0.28em] text-red-400 shadow-[0_0_24px_rgba(220,38,38,0.24)] backdrop-blur"
                            style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.7rem)' }}
                        >
                            Our Work
                        </div>

                        <h2 className="fd-hero-h2 fd-title-shadow">
                            <span className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
                                Creative
                            </span>
                            <span
                                className="bg-gradient-to-b from-red-500 to-red-900 bg-clip-text text-transparent"
                                style={{ marginLeft: 'clamp(0.4rem, 1.5vw, 1rem)' }}
                            >
                                Portfolio
                            </span>
                        </h2>

                        <p
                            className="mx-auto mt-5 max-w-2xl font-semibold leading-relaxed text-white/78"
                            style={{ fontSize: 'clamp(0.875rem, 1.6vw, 1.125rem)' }}
                        >
                            A collection of premium visual works crafted with bold identity, dark energy, and sharp creative execution.
                        </p>
                    </div>

                    {/* FILTER */}
                    <div className="fd-filter-bar mb-10 lg:mb-14">
                        {categories.map((category) => {
                            const isActive = activeCategory === category.id;
                            return (
                                <button
                                    key={category.id}
                                    type="button"
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`fd-filter-btn group relative overflow-hidden border transition-all duration-300 ${
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

                    {/* GRID — always 2 cols from sm breakpoint */}
                    {filteredItems.length > 0 ? (
                        <div className="fd-portfolio-grid">
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
                                        {/* glow border */}
                                        <div className="absolute inset-x-0 bottom-0 top-8 rounded-[2rem] bg-gradient-to-b from-red-500/55 via-red-950/24 to-red-600/55 opacity-70 blur-[1px] transition duration-500 group-hover:opacity-100" />

                                        <div className="fd-card-clip relative overflow-hidden border border-red-500/35 bg-[linear-gradient(180deg,rgba(52,8,8,0.78),rgba(4,4,4,0.9)_42%,rgba(2,2,2,0.96))] shadow-[0_0_50px_rgba(220,38,38,0.14)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_0_75px_rgba(220,38,38,0.28)]">

                                            {/* IMAGE */}
                                            <div className="fd-card-image relative overflow-hidden bg-black">
                                                {imageUrl ? (
                                                    <img
                                                        src={imageUrl}
                                                        alt={item.title}
                                                        loading="lazy"
                                                        decoding="async"
                                                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                                        onError={(e) => {
                                                            e.currentTarget.src = `https://placehold.co/800x800/020202/ef4444?text=${encodeURIComponent(item.title || 'Portfolio')}`;
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center bg-red-950/20 text-red-400">
                                                        No Image
                                                    </div>
                                                )}

                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                                                <div className="absolute inset-0 bg-red-600/0 transition duration-500 group-hover:bg-red-600/10" />

                                                {/* category badge */}
                                                <div
                                                    className="absolute left-2 top-2 rounded-full border border-red-500/40 bg-black/70 px-2 py-1 font-black uppercase tracking-wider text-red-300 backdrop-blur"
                                                    style={{ fontSize: 'clamp(0.45rem, 1.5vw, 0.7rem)' }}
                                                >
                                                    {item.category}
                                                </div>

                                                {/* view button */}
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedItem(item)}
                                                    className="absolute bottom-2 right-2 flex items-center justify-center rounded-full border border-red-500/50 bg-black/75 text-red-300 shadow-[0_0_24px_rgba(220,38,38,0.35)] transition hover:bg-red-600 hover:text-white"
                                                    style={{ width: 'clamp(1.8rem, 5vw, 3rem)', height: 'clamp(1.8rem, 5vw, 3rem)' }}
                                                    aria-label="View Project"
                                                >
                                                    <svg style={{ width: 'clamp(0.6rem, 1.8vw, 1.25rem)', height: 'clamp(0.6rem, 1.8vw, 1.25rem)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H8M17 7v9" />
                                                    </svg>
                                                </button>
                                            </div>

                                            {/* BODY */}
                                            <div className="fd-card-body relative">
                                                <div className="mb-1 flex items-center gap-1 text-red-400">
                                                    <span style={{ fontSize: 'clamp(0.6rem, 2vw, 1rem)' }}>{getCategoryIcon(item.category)}</span>
                                                    <span
                                                        className="font-black uppercase tracking-wider"
                                                        style={{ fontSize: 'clamp(0.45rem, 1.5vw, 0.65rem)' }}
                                                    >
                                                        Featured Work
                                                    </span>
                                                </div>

                                                <h3 className="fd-card-title fd-title-shadow text-white transition group-hover:text-red-300">
                                                    {item.title}
                                                </h3>

                                                <p
                                                    className="mt-1 line-clamp-2 leading-snug text-white/62"
                                                    style={{ fontSize: 'clamp(0.55rem, 1.8vw, 0.875rem)' }}
                                                >
                                                    {item.description || 'No description available.'}
                                                </p>

                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedItem(item)}
                                                    className="mt-2 inline-flex items-center gap-1 font-black uppercase tracking-wider text-red-400 transition hover:text-red-300"
                                                    style={{ fontSize: 'clamp(0.5rem, 1.5vw, 0.8rem)' }}
                                                >
                                                    View
                                                    <svg className="h-3 w-3 transition group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-6-6l6 6-6 6" />
                                                    </svg>
                                                </button>

                                                <div className="absolute bottom-0 left-1/2 h-[2px] w-10 -translate-x-1/2 rounded-t-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.9)]" />
                                            </div>

                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="rounded-3xl border border-red-500/20 bg-black/45 p-8 text-center sm:p-12">
                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 text-3xl sm:h-16 sm:w-16">
                                ☠
                            </div>
                            <h3 className="text-lg font-bold text-white sm:text-xl">No portfolio found</h3>
                            <p className="mt-2 text-sm text-white/55">Belum ada item portfolio pada kategori ini.</p>
                        </div>
                    )}
                </div>

                {/* ── MODAL ── */}
                {selectedItem && (
                    <div
                        className="fixed inset-0 z-[120] flex items-center justify-center bg-black/92 p-3 backdrop-blur-md sm:p-4"
                        onClick={() => setSelectedItem(null)}
                    >
                        <div
                            className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-red-500/35 bg-black shadow-[0_0_85px_rgba(220,38,38,0.28)] sm:rounded-3xl"
                            style={{ maxHeight: '92vh' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* close button */}
                            <button
                                type="button"
                                onClick={() => setSelectedItem(null)}
                                className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-red-500/40 bg-black/80 text-red-300 transition hover:bg-red-600 hover:text-white sm:right-5 sm:top-5 sm:h-11 sm:w-11"
                                aria-label="Close"
                            >
                                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="fd-modal-inner">
                                {/* image pane */}
                                <div className="fd-modal-img-pane">
                                    <img
                                        src={getImageUrl(selectedItem)}
                                        alt={selectedItem.title}
                                        className="max-h-[60vh] w-full object-contain lg:max-h-[92vh]"
                                    />
                                </div>

                                {/* info pane */}
                                <div className="fd-modal-info">
                                    <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-red-600/15 blur-3xl" />

                                    <div className="relative z-10">
                                        <div
                                            className="mb-4 inline-flex rounded-full border border-red-500/40 bg-black/40 px-4 py-2 font-black uppercase tracking-wider text-red-300"
                                            style={{ fontSize: 'clamp(0.6rem, 1vw, 0.75rem)' }}
                                        >
                                            {selectedItem.category}
                                        </div>

                                        <h3
                                            className="fd-title-shadow font-black uppercase leading-tight text-white"
                                            style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2rem)' }}
                                        >
                                            {selectedItem.title}
                                        </h3>

                                        <p
                                            className="mt-4 leading-relaxed text-white/72"
                                            style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1rem)' }}
                                        >
                                            {selectedItem.description || 'No description available for this project.'}
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() => setSelectedItem(null)}
                                            className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-red-600 to-red-800 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-900/40 transition hover:from-red-700 hover:to-red-900 sm:mt-8 sm:px-6 sm:py-3"
                                        >
                                            Close Preview
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
}