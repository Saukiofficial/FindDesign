import React, { useEffect, useMemo, useState } from 'react';

export default function Services({ serviceSetting = null }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => { entries.forEach((e) => { if (e.isIntersecting) setIsVisible(true); }); },
            { threshold: 0.1 }
        );
        const el = document.getElementById('services');
        if (el) observer.observe(el);
        return () => { if (el) observer.unobserve(el); };
    }, []);

    const serviceData = useMemo(() => {
        const defaultCards = [
            {
                title: 'ILLUSTRATION DESIGN',
                short_description: 'Custom illustrations that bring your stories to life',
                icon_text: '🎨',
                icon_image: null,
                features: [
                    'Character Design & Development',
                    'Book & Editorial Illustrations',
                    'Concept Art & Storyboards',
                    'Fantasy & Sci-Fi Artwork',
                    "Children's Book Illustrations",
                ],
            },
            {
                title: 'DIGITAL ART',
                short_description: 'Stunning digital paintings and visual masterpieces',
                icon_text: '🖼️',
                icon_image: null,
                features: [
                    'Digital Painting & Portraits',
                    'Landscape & Environment Art',
                    'Abstract & Conceptual Art',
                    'Photo Manipulation',
                    'Matte Painting',
                ],
            },
            {
                title: 'ANIMATION',
                short_description: 'Bringing your ideas to life with motion',
                icon_text: '🎬',
                icon_image: null,
                features: [
                    '2D Character Animation',
                    'Motion Graphics & Logo Animation',
                    'Explainer Videos',
                    'UI/UX Micro-interactions',
                    'Social Media Content',
                ],
            },
        ];

        return {
            badgeText: serviceSetting?.badge_text || 'WHAT WE OFFER',
            titleWhite: serviceSetting?.title_white || 'OUR',
            titleRed: serviceSetting?.title_red || 'SERVICES',
            description:
                serviceSetting?.description ||
                'From dark imagination to stunning visuals, we deliver premium creative solutions tailored for you.',
            backgroundImage: serviceSetting?.background_image_url || null,
            characterImage: serviceSetting?.character_image_url || null,
            cards:
                Array.isArray(serviceSetting?.service_cards) && serviceSetting.service_cards.length > 0
                    ? serviceSetting.service_cards
                    : defaultCards,
        };
    }, [serviceSetting]);

    const getIconImageUrl = (path) => {
        if (!path) return null;
        if (String(path).startsWith('http')) return path;
        return `/storage/${String(path).replace(/^\/+/, '')}`;
    };

    return (
        <section
            id="services"
            className="relative overflow-hidden bg-black text-white"
            style={{ padding: 'clamp(3rem, 8vw, 7rem) clamp(0.75rem, 4vw, 4rem)' }}
        >
            <style>{`
                @keyframes serviceFloat {
                    0%, 100% { transform: translate3d(-50%, 0, 0) scale(1); }
                    50%       { transform: translate3d(-50%, -14px, 0) scale(1.015); }
                }
                @keyframes servicePulse {
                    0%, 100% { opacity: 0.5; }
                    50%       { opacity: 0.95; }
                }
                @keyframes serviceSpark {
                    0%   { transform: translate3d(0,0,0) rotate(0deg); opacity: 0; }
                    20%  { opacity: 1; }
                    100% { transform: translate3d(30px,-90px,0) rotate(180deg); opacity: 0; }
                }

                .fd-svc-float  { animation: serviceFloat 7s ease-in-out infinite; }
                .fd-svc-glow   { animation: servicePulse 4s ease-in-out infinite; }
                .fd-svc-spark  { animation: serviceSpark 5s linear infinite; }

                /* clip-path desktop — notch atas tengah */
                .fd-svc-card-frame {
                    clip-path: polygon(
                        0 7%, 7% 0, 39% 0, 43% 6px, 57% 6px, 61% 0,
                        93% 0, 100% 7%, 100% 93%, 93% 100%,
                        61% 100%, 57% calc(100% - 7px), 43% calc(100% - 7px),
                        39% 100%, 7% 100%, 0 93%
                    );
                }
                /* clip-path mobile — sederhana */
                @media (max-width: 1023px) {
                    .fd-svc-card-frame {
                        clip-path: polygon(
                            0 5%, 5% 0, 95% 0, 100% 5%,
                            100% 95%, 95% 100%, 5% 100%, 0 95%
                        );
                    }
                }

                .fd-svc-title-shadow {
                    text-shadow: 0 0 16px rgba(239,68,68,0.22), 0 8px 18px rgba(0,0,0,0.9);
                }

                /* ── Heading fluid ── */
                .fd-svc-h2 {
                    font-size: clamp(2rem, 10vw, 5.5rem);
                    font-weight: 900;
                    text-transform: uppercase;
                    line-height: 1;
                    white-space: nowrap;
                    letter-spacing: -0.02em;
                }

                /* ── Cards grid: 1 col mobile → 3 col desktop ── */
                .fd-svc-grid {
                    display: grid;
                    gap: clamp(2.5rem, 6vw, 2.5rem);
                    grid-template-columns: 1fr;
                }
                @media (min-width: 768px) {
                    .fd-svc-grid {
                        grid-template-columns: repeat(3, 1fr);
                        gap: clamp(1.5rem, 3vw, 2.5rem);
                    }
                }

                /* ── Card min-height fluid ── */
                .fd-svc-card-body {
                    min-height: clamp(380px, 55vw, 560px);
                    padding: clamp(4.5rem, 8vw, 6rem) clamp(1rem, 3vw, 2.5rem) clamp(1.5rem, 4vw, 2.25rem);
                }
                @media (min-width: 768px) {
                    .fd-svc-card-body {
                        min-height: clamp(460px, 38vw, 580px);
                        padding: 6rem clamp(1.5rem, 2.5vw, 2.5rem) 2.25rem;
                    }
                }

                /* ── Icon circle fluid ── */
                .fd-svc-icon {
                    width:  clamp(4.5rem, 10vw, 7rem);
                    height: clamp(4.5rem, 10vw, 7rem);
                    top: clamp(3rem, 6.5vw, 3.5rem);
                }

                /* ── Card title fluid ── */
                .fd-svc-card-title {
                    font-size: clamp(1rem, 3vw, 1.5rem);
                    font-weight: 900;
                    text-transform: uppercase;
                    line-height: 1.2;
                    letter-spacing: -0.01em;
                }

                /* ── Feature list text fluid ── */
                .fd-svc-feature-text {
                    font-size: clamp(0.75rem, 2vw, 0.9rem);
                    line-height: 1.5;
                }

                /* ── Short desc fluid ── */
                .fd-svc-short-desc {
                    font-size: clamp(0.7rem, 2vw, 0.95rem);
                    font-weight: 700;
                }

                /* ── article pt  ── */
                .fd-svc-article {
                    padding-top: clamp(3rem, 7vw, 3.5rem);
                }

                @media (prefers-reduced-motion: reduce) {
                    .fd-svc-float, .fd-svc-glow, .fd-svc-spark { animation: none !important; }
                }
            `}</style>

            {/* BACKGROUNDS */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,#020202_0%,#100101_45%,#020202_100%)]" />

            {serviceData.backgroundImage && (
                <div
                    className="absolute inset-0 z-[1] bg-cover bg-center"
                    style={{ backgroundImage: `url("${serviceData.backgroundImage}")` }}
                />
            )}

            <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/30 via-black/20 to-black/72" />
            <div className="absolute inset-0 z-[3] bg-gradient-to-r from-black/62 via-black/10 to-black/62" />

            <div className="fd-svc-glow pointer-events-none absolute right-[10%] top-8 z-[4] h-64 w-64 rounded-full bg-red-700/18 blur-2xl shadow-[0_0_120px_rgba(220,38,38,0.35)] lg:h-96 lg:w-96" />
            <div className="pointer-events-none absolute left-[-10%] top-[28%] z-[4] h-[420px] w-[620px] rounded-full bg-red-900/18 blur-3xl" />
            <div className="pointer-events-none absolute right-[-12%] bottom-[10%] z-[4] h-[420px] w-[620px] rounded-full bg-red-700/12 blur-3xl" />

            {/* SPARKS */}
            <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
                {Array.from({ length: 18 }).map((_, i) => (
                    <span
                        key={i}
                        className="fd-svc-spark absolute h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_14px_rgba(239,68,68,0.9)]"
                        style={{
                            left: `${8 + ((i * 11) % 88)}%`,
                            top:  `${18 + ((i * 17) % 65)}%`,
                            animationDelay:    `${i * 0.32}s`,
                            animationDuration: `${4.2 + (i % 4)}s`,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 mx-auto max-w-[1600px]">

                {/* ── HEADER ── */}
                <div
                    className={`relative z-40 mx-auto mb-16 max-w-4xl text-center transition-all duration-1000 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
                >
                    <div
                        className="mb-5 inline-flex items-center justify-center rounded-full border border-red-500/50 bg-black/45 px-5 py-2 font-black uppercase tracking-[0.28em] text-red-400 shadow-[0_0_24px_rgba(220,38,38,0.24)] backdrop-blur"
                        style={{ fontSize: 'clamp(0.55rem, 1.2vw, 0.7rem)' }}
                    >
                        {serviceData.badgeText}
                    </div>

                    <h2 className="fd-svc-h2 fd-svc-title-shadow">
                        <span className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
                            {serviceData.titleWhite}
                        </span>
                        <span
                            className="bg-gradient-to-b from-red-500 to-red-900 bg-clip-text text-transparent"
                            style={{ marginLeft: 'clamp(0.3rem, 1.5vw, 1rem)' }}
                        >
                            {serviceData.titleRed}
                        </span>
                    </h2>

                    <p
                        className="mx-auto mt-5 max-w-2xl font-semibold leading-relaxed text-white/88"
                        style={{ fontSize: 'clamp(0.8rem, 1.6vw, 1.1rem)' }}
                    >
                        {serviceData.description}
                    </p>
                </div>

                {/* CHARACTER IMAGE — desktop only */}
                {serviceData.characterImage && (
                    <div className="fd-svc-float pointer-events-none absolute left-1/2 top-[118px] z-20 hidden lg:block">
                        <img
                            src={serviceData.characterImage}
                            alt="Service Character"
                            loading="lazy"
                            decoding="async"
                            className="h-[590px] w-[720px] object-contain drop-shadow-[0_0_95px_rgba(220,38,38,0.75)]"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                    </div>
                )}

                {/* ── SERVICE CARDS ── */}
                <div className="fd-svc-grid relative z-30">
                    {serviceData.cards.slice(0, 3).map((service, index) => {
                        const iconUrl = getIconImageUrl(service.icon_image);

                        return (
                            <article
                                key={`${service.title}-${index}`}
                                className={`fd-svc-article group relative transition-all duration-700 ${
                                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                                }`}
                                style={{ transitionDelay: `${index * 140}ms` }}
                            >
                                {/* ICON CIRCLE */}
                                <div
                                    className="fd-svc-icon absolute left-1/2 z-40 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-red-500/55 bg-black shadow-[0_0_38px_rgba(220,38,38,0.48)]"
                                >
                                    <div className="absolute inset-1 rounded-full bg-gradient-to-b from-red-600/24 to-transparent" />
                                    {iconUrl ? (
                                        <img
                                            src={iconUrl}
                                            alt={service.title || 'Service Icon'}
                                            loading="lazy"
                                            decoding="async"
                                            className="relative z-10 h-[72%] w-[72%] object-contain drop-shadow-[0_0_22px_rgba(239,68,68,0.52)]"
                                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                        />
                                    ) : (
                                        <span
                                            className="relative z-10"
                                            style={{ fontSize: 'clamp(1.4rem, 4vw, 2.2rem)' }}
                                        >
                                            {service.icon_text || '💀'}
                                        </span>
                                    )}
                                </div>

                                {/* BORDER GLOW */}
                                <div
                                    className="absolute inset-x-0 bottom-0 rounded-[2rem] bg-gradient-to-b from-red-500/62 via-red-950/24 to-red-600/62 opacity-90 blur-[1px] transition duration-500 group-hover:opacity-100"
                                    style={{ top: 'clamp(2.5rem, 6vw, 3.5rem)' }}
                                />

                                {/* CARD */}
                                <div className="fd-svc-card-frame fd-svc-card-body relative overflow-hidden border border-red-500/42 bg-[linear-gradient(180deg,rgba(52,8,8,0.78),rgba(4,4,4,0.88)_38%,rgba(2,2,2,0.94))] shadow-[0_0_50px_rgba(220,38,38,0.15)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_0_70px_rgba(220,38,38,0.28)]">

                                    <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-red-500/80 to-transparent" />
                                    <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-red-500/80 to-transparent" />
                                    <div className="absolute left-1/2 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-red-500 to-transparent" style={{ top: 'clamp(8.5rem, 17vw, 9rem)' }} />
                                    <div className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rotate-45 bg-red-500 shadow-[0_0_12px_rgba(239,68,68,1)]" style={{ top: 'clamp(8.35rem, 17vw, 8.75rem)' }} />

                                    <div className="relative z-10 text-center">
                                        <h3 className="fd-svc-card-title fd-svc-title-shadow text-white">
                                            {service.title}
                                        </h3>
                                        <p className="fd-svc-short-desc mt-3 leading-relaxed text-red-500">
                                            {service.short_description}
                                        </p>
                                    </div>

                                    <ul className="relative z-10 mt-8 space-y-3">
                                        {(service.features || []).slice(0, 5).map((feature, fi) => (
                                            <li
                                                key={`${feature}-${fi}`}
                                                className="flex items-start gap-3 text-white/78"
                                            >
                                                <span
                                                    className="mt-0.5 shrink-0 text-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.9)]"
                                                    style={{ fontSize: 'clamp(0.7rem, 2vw, 1rem)' }}
                                                >
                                                    💀
                                                </span>
                                                <span className="fd-svc-feature-text">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* BOTTOM SKULL */}
                                    <div
                                        className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center justify-center rounded-t-[2rem] border border-red-500/45 bg-black shadow-[0_0_35px_rgba(220,38,38,0.42)]"
                                        style={{ width: 'clamp(4rem, 8vw, 6rem)', height: 'clamp(2.5rem, 5vw, 3rem)' }}
                                    >
                                        <span
                                            className="text-red-400 drop-shadow-[0_0_12px_rgba(239,68,68,0.9)]"
                                            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)' }}
                                        >
                                            ☠
                                        </span>
                                    </div>

                                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(239,68,68,0.19),transparent_30%)] opacity-90" />
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}