import React, { useEffect, useMemo, useState } from 'react';

export default function Services({ serviceSetting = null }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.12 }
        );

        const element = document.getElementById('services');

        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
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

        if (String(path).startsWith('http')) {
            return path;
        }

        return `/storage/${String(path).replace(/^\/+/, '')}`;
    };

    return (
        <section
            id="services"
            className="relative overflow-hidden bg-black px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28"
        >
            <style>{`
                @keyframes serviceFloat {
                    0%, 100% {
                        transform: translate3d(-50%, 0, 0) scale(1);
                    }
                    50% {
                        transform: translate3d(-50%, -14px, 0) scale(1.015);
                    }
                }

                @keyframes servicePulse {
                    0%, 100% {
                        opacity: 0.5;
                    }
                    50% {
                        opacity: 0.95;
                    }
                }

                @keyframes serviceSpark {
                    0% {
                        transform: translate3d(0, 0, 0) rotate(0deg);
                        opacity: 0;
                    }
                    20% {
                        opacity: 1;
                    }
                    100% {
                        transform: translate3d(30px, -90px, 0) rotate(180deg);
                        opacity: 0;
                    }
                }

                .fd-service-character-wrap {
                    animation: serviceFloat 7s ease-in-out infinite;
                }

                .fd-service-glow {
                    animation: servicePulse 4s ease-in-out infinite;
                }

                .fd-service-spark {
                    animation: serviceSpark 5s linear infinite;
                }

                .fd-service-card-frame {
                    clip-path: polygon(
                        0 7%,
                        7% 0,
                        39% 0,
                        43% 6px,
                        57% 6px,
                        61% 0,
                        93% 0,
                        100% 7%,
                        100% 93%,
                        93% 100%,
                        61% 100%,
                        57% calc(100% - 7px),
                        43% calc(100% - 7px),
                        39% 100%,
                        7% 100%,
                        0 93%
                    );
                }

                .fd-service-title-shadow {
                    text-shadow:
                        0 0 16px rgba(239, 68, 68, 0.22),
                        0 8px 18px rgba(0, 0, 0, 0.9);
                }

                @media (max-width: 640px) {
                    .fd-service-character-wrap {
                        animation: none !important;
                    }

                    .fd-service-card-frame {
                        clip-path: polygon(
                            0 5%,
                            6% 0,
                            94% 0,
                            100% 5%,
                            100% 95%,
                            94% 100%,
                            6% 100%,
                            0 95%
                        );
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .fd-service-character-wrap,
                    .fd-service-glow,
                    .fd-service-spark {
                        animation: none !important;
                    }
                }
            `}</style>

            {/* BACKGROUND FALLBACK */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,#020202_0%,#100101_45%,#020202_100%)]" />

            {/* BACKGROUND IMAGE ADMIN */}
            {serviceData.backgroundImage && (
                <div
                    className="absolute inset-0 z-[1] bg-cover bg-center opacity-100"
                    style={{
                        backgroundImage: `url("${serviceData.backgroundImage}")`,
                    }}
                />
            )}

            {/* SOFT OVERLAY */}
            <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/30 via-black/20 to-black/72" />
            <div className="absolute inset-0 z-[3] bg-gradient-to-r from-black/62 via-black/10 to-black/62" />

            {/* RED GLOW */}
            <div className="fd-service-glow pointer-events-none absolute right-[10%] top-8 z-[4] h-64 w-64 rounded-full bg-red-700/18 blur-2xl shadow-[0_0_120px_rgba(220,38,38,0.35)] lg:h-96 lg:w-96" />
            <div className="pointer-events-none absolute left-[-10%] top-[28%] z-[4] h-[420px] w-[620px] rounded-full bg-red-900/18 blur-3xl" />
            <div className="pointer-events-none absolute right-[-12%] bottom-[10%] z-[4] h-[420px] w-[620px] rounded-full bg-red-700/12 blur-3xl" />

            {/* SPARKS */}
            <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
                {Array.from({ length: 18 }).map((_, index) => (
                    <span
                        key={index}
                        className="fd-service-spark absolute h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_14px_rgba(239,68,68,0.9)]"
                        style={{
                            left: `${8 + ((index * 11) % 88)}%`,
                            top: `${18 + ((index * 17) % 65)}%`,
                            animationDelay: `${index * 0.32}s`,
                            animationDuration: `${4.2 + (index % 4)}s`,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 mx-auto max-w-[1600px]">
                {/* HEADER */}
                <div
                    className={`relative z-40 mx-auto mb-20 max-w-4xl text-center transition-all duration-1000 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
                >
                    <div className="mb-5 inline-flex items-center justify-center rounded-full border border-red-500/50 bg-black/45 px-5 py-2 text-[0.68rem] font-black uppercase tracking-[0.28em] text-red-400 shadow-[0_0_24px_rgba(220,38,38,0.24)] backdrop-blur">
                        {serviceData.badgeText}
                    </div>

                    <h2 className="fd-service-title-shadow text-5xl font-black uppercase leading-none tracking-tight sm:text-6xl lg:text-7xl">
                        <span className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
                            {serviceData.titleWhite}
                        </span>
                        <span className="ml-4 bg-gradient-to-b from-red-500 to-red-900 bg-clip-text text-transparent">
                            {serviceData.titleRed}
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-relaxed text-white/88 sm:text-lg">
                        {serviceData.description}
                    </p>
                </div>

                {/* CHARACTER IMAGE ADMIN */}
                {serviceData.characterImage && (
                    <div className="fd-service-character-wrap pointer-events-none absolute left-1/2 top-[118px] z-20 hidden lg:block">
                        <img
                            src={serviceData.characterImage}
                            alt="Service Character"
                            loading="lazy"
                            decoding="async"
                            className="h-[590px] w-[720px] object-contain object-center opacity-100 drop-shadow-[0_0_95px_rgba(220,38,38,0.75)]"
                            onError={(event) => {
                                event.currentTarget.style.display = 'none';
                            }}
                        />
                    </div>
                )}

                {/* SERVICE CARDS */}
                <div className="relative z-30 grid gap-10 lg:grid-cols-3 lg:gap-8 xl:gap-10">
                    {serviceData.cards.slice(0, 3).map((service, index) => {
                        const iconUrl = getIconImageUrl(service.icon_image);

                        return (
                            <article
                                key={`${service.title}-${index}`}
                                className={`group relative pt-14 transition-all duration-700 ${
                                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                                }`}
                                style={{ transitionDelay: `${index * 140}ms` }}
                            >
                                {/* TOP ICON */}
                                <div className="absolute left-1/2 top-14 z-40 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-red-500/55 bg-black shadow-[0_0_38px_rgba(220,38,38,0.48)] lg:h-28 lg:w-28">
                                    <div className="absolute inset-1 rounded-full bg-gradient-to-b from-red-600/24 to-transparent" />

                                    {iconUrl ? (
                                        <img
                                            src={iconUrl}
                                            alt={service.title || 'Service Icon'}
                                            loading="lazy"
                                            decoding="async"
                                            className="relative z-10 h-[72%] w-[72%] object-contain drop-shadow-[0_0_22px_rgba(239,68,68,0.52)]"
                                            onError={(event) => {
                                                event.currentTarget.style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <span className="relative z-10 text-3xl lg:text-4xl">
                                            {service.icon_text || '💀'}
                                        </span>
                                    )}
                                </div>

                                {/* BORDER GLOW */}
                                <div className="absolute inset-x-0 bottom-0 top-14 rounded-[2rem] bg-gradient-to-b from-red-500/62 via-red-950/24 to-red-600/62 opacity-90 blur-[1px] transition duration-500 group-hover:opacity-100" />

                                {/* CARD */}
                                <div className="fd-service-card-frame relative min-h-[520px] overflow-hidden border border-red-500/42 bg-[linear-gradient(180deg,rgba(52,8,8,0.78),rgba(4,4,4,0.88)_38%,rgba(2,2,2,0.94))] px-7 pb-9 pt-24 shadow-[0_0_50px_rgba(220,38,38,0.15)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_0_70px_rgba(220,38,38,0.28)] sm:px-10 lg:min-h-[560px]">
                                    <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-red-500/80 to-transparent" />
                                    <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-red-500/80 to-transparent" />

                                    <div className="absolute left-1/2 top-[8.7rem] h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
                                    <div className="absolute left-1/2 top-[8.55rem] h-1.5 w-1.5 -translate-x-1/2 rotate-45 bg-red-500 shadow-[0_0_12px_rgba(239,68,68,1)]" />

                                    <div className="relative z-10 text-center">
                                        <h3 className="fd-service-title-shadow text-2xl font-black uppercase leading-tight tracking-tight text-white sm:text-3xl">
                                            {service.title}
                                        </h3>

                                        <p className="mt-4 text-sm font-bold leading-relaxed text-red-500 sm:text-base">
                                            {service.short_description}
                                        </p>
                                    </div>

                                    <ul className="relative z-10 mt-12 space-y-5">
                                        {(service.features || []).slice(0, 5).map((feature, featureIndex) => (
                                            <li
                                                key={`${feature}-${featureIndex}`}
                                                className="flex items-start gap-4 text-sm font-medium leading-relaxed text-white/78 sm:text-base"
                                            >
                                                <span className="mt-0.5 shrink-0 text-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.9)]">
                                                    💀
                                                </span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="absolute bottom-0 left-1/2 flex h-12 w-24 -translate-x-1/2 items-center justify-center rounded-t-[2rem] border border-red-500/45 bg-black shadow-[0_0_35px_rgba(220,38,38,0.42)]">
                                        <span className="text-xl text-red-400 drop-shadow-[0_0_12px_rgba(239,68,68,0.9)]">
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