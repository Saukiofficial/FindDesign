import React, { useEffect, useMemo, useState } from 'react';

export default function About({ aboutSetting = null }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = document.getElementById('about');
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.15 }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    const about = useMemo(() => {
        const stats =
            Array.isArray(aboutSetting?.stats) && aboutSetting.stats.length > 0
                ? aboutSetting.stats
                : [
                      { number: '500+', label: 'Projects Completed' },
                      { number: '480+', label: 'Happy Clients' },
                      { number: '8+', label: 'Years Experience' },
                      { number: '500+', label: 'Portfolio' },
                  ];

        return {
            badgeText: aboutSetting?.badge_text || 'ABOUT US',
            title: aboutSetting?.title || 'Meet The Founder',
            founderImage:
                aboutSetting?.founder_image_url || '/images/owner/founder.jpg',
            founderName: aboutSetting?.founder_name || 'Afandy',
            founderPosition:
                aboutSetting?.founder_position || 'Founder & Creative Director',
            quote:
                aboutSetting?.quote ||
                'Design is not just what it looks like, it’s how it works and how it makes people feel.',
            description1:
                aboutSetting?.description_1 ||
                'Founded in 2015, FindDesign began with a simple belief: a single line can spark a powerful idea.',
            description2:
                aboutSetting?.description_2 ||
                'What started as a passion for pencil strokes has grown into a creative studio trusted by 500+ clients worldwide.\n\nWith over 8 years of experience in branding, illustration, and digital design, I’m committed to crafting visuals that not only look stunning, but also tell stories that connect.',
            stats,
        };
    }, [aboutSetting]);

    const descriptionParagraphs = useMemo(() => {
        return String(about.description2)
            .split('\n')
            .map((item) => item.trim())
            .filter(Boolean);
    }, [about.description2]);

    const getStatIcon = (index) => {
        const className = 'h-6 w-6';

        if (index === 1) {
            return (
                <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M17 20h5V4H2v16h5m10 0v-2a4 4 0 00-4-4H11a4 4 0 00-4 4v2m10 0H7m10-10a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>
            );
        }

        if (index === 2) {
            return (
                <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M8 7V3m8 4V3m-9 8h10m-12 9h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z"
                    />
                </svg>
            );
        }

        if (index === 3) {
            return (
                <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M3 7a2 2 0 012-2h5l2 2h7a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
                    />
                </svg>
            );
        }

        return (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M20 7L12 3 4 7l8 4 8-4z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M4 12l8 4 8-4"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M4 17l8 4 8-4"
                />
            </svg>
        );
    };

    const titleParts = useMemo(() => {
        const fullTitle = String(about.title || 'Meet The Founder');
        const words = fullTitle.split(' ');

        if (words.length < 2) {
            return {
                start: fullTitle,
                highlight: '',
            };
        }

        return {
            start: words.slice(0, -1).join(' '),
            highlight: words[words.length - 1],
        };
    }, [about.title]);

    return (
        <section
            id="about"
            className="relative overflow-hidden bg-black px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
        >
            <style>{`
                @keyframes aboutGlow {
                    0%, 100% {
                        opacity: 0.45;
                    }
                    50% {
                        opacity: 0.9;
                    }
                }

                @keyframes aboutLinePulse {
                    0%, 100% {
                        transform: scaleX(0.85);
                        opacity: 0.7;
                    }
                    50% {
                        transform: scaleX(1);
                        opacity: 1;
                    }
                }

                .about-glow-animate {
                    animation: aboutGlow 4.5s ease-in-out infinite;
                }

                .about-line-pulse {
                    animation: aboutLinePulse 2.8s ease-in-out infinite;
                    transform-origin: center;
                }

                @media (prefers-reduced-motion: reduce) {
                    .about-glow-animate,
                    .about-line-pulse {
                        animation: none !important;
                    }
                }
            `}</style>

            {/* background */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(220,38,38,0.16),transparent_28%),radial-gradient(circle_at_92%_82%,rgba(220,38,38,0.14),transparent_24%),linear-gradient(180deg,#020202_0%,#030303_50%,#050505_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.04)_1px,transparent_1px)] bg-[size:72px_72px]" />

            <div className="pointer-events-none absolute right-0 top-0 h-full w-[24%] opacity-30">
                <div className="h-full w-full bg-[radial-gradient(circle,rgba(239,68,68,0.4)_1px,transparent_1px)] bg-[size:16px_16px]" />
            </div>

            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-4 top-4 h-6 w-6 rounded-tl-[20px] border-l border-t border-red-500/60 sm:h-8 sm:w-8" />
                <div className="absolute right-4 top-4 h-6 w-6 rounded-tr-[20px] border-r border-t border-red-500/60 sm:h-8 sm:w-8" />
                <div className="absolute bottom-4 right-4 h-6 w-6 rounded-br-[20px] border-b border-r border-red-500/60 sm:h-8 sm:w-8" />
                <div className="absolute bottom-4 left-4 h-6 w-6 rounded-bl-[20px] border-b border-l border-red-500/60 sm:h-8 sm:w-8" />
            </div>

            <div className="relative mx-auto max-w-[1600px] rounded-[28px] border border-red-500/18 bg-[linear-gradient(180deg,rgba(6,6,6,0.92)_0%,rgba(4,4,4,0.96)_100%)] px-5 py-10 shadow-[0_0_80px_rgba(220,38,38,0.08)] sm:px-8 lg:px-12 lg:py-14">
                {/* header */}
                <div
                    className={`mb-12 text-center transition-all duration-1000 ${
                        isVisible
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-8 opacity-0'
                    }`}
                >
                    <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-red-500/40 bg-black/55 px-6 py-3 shadow-[0_0_24px_rgba(220,38,38,0.16)]">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full border border-red-500/60">
                            <span className="h-2 w-2 rounded-full bg-red-500 about-glow-animate" />
                        </span>
                        <span className="text-xs font-bold uppercase tracking-[0.34em] text-red-400 sm:text-sm">
                            {about.badgeText}
                        </span>
                    </div>

                    <h2 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
                        <span>{titleParts.start} </span>
                        {titleParts.highlight && (
                            <span className="bg-gradient-to-b from-red-300 via-red-400 to-red-600 bg-clip-text text-transparent">
                                {titleParts.highlight}
                            </span>
                        )}
                    </h2>

                    <div className="mx-auto mt-7 flex w-44 items-center justify-center">
                        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-red-500/60" />
                        <span className="about-line-pulse mx-4 h-[5px] w-14 rounded-full bg-red-500 shadow-[0_0_18px_rgba(239,68,68,0.9)]" />
                        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-red-500/60" />
                    </div>
                </div>

                {/* content */}
                <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.25fr] lg:gap-14">
                    {/* left card */}
                    <div
                        className={`transition-all duration-1000 delay-100 ${
                            isVisible
                                ? 'translate-x-0 opacity-100'
                                : '-translate-x-10 opacity-0'
                        }`}
                    >
                        <div className="relative rounded-[28px] border border-red-500/22 bg-[linear-gradient(180deg,rgba(18,18,18,0.95)_0%,rgba(8,8,8,0.98)_100%)] p-4 shadow-[0_0_45px_rgba(220,38,38,0.10)]">
                            <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-r from-red-500/0 via-red-500/25 to-red-500/0 opacity-50 blur-xl" />

                            <div className="relative rounded-[20px] border border-red-500/22 bg-black/70 p-4">
                                <div className="relative overflow-hidden rounded-[18px] border border-white/12 bg-[#080808]">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_75%,rgba(220,38,38,0.22),transparent_22%),linear-gradient(135deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.02)_28%,transparent_28%,transparent_100%)]" />

                                    <div className="absolute left-0 top-[62%] h-1 w-[62%] rotate-[-36deg] bg-gradient-to-r from-red-600 via-red-400 to-transparent shadow-[0_0_24px_rgba(239,68,68,0.95)]" />
                                    <div className="absolute bottom-0 left-[56%] top-[12%] w-[3px] bg-gradient-to-b from-transparent via-red-400 to-red-600 shadow-[0_0_26px_rgba(239,68,68,0.9)]" />
                                    <div className="absolute bottom-0 left-0 right-0 h-[22%] bg-gradient-to-t from-red-950/20 via-red-700/6 to-transparent" />

                                    <img
                                        src={about.founderImage}
                                        alt={about.founderName}
                                        loading="lazy"
                                        decoding="async"
                                        className="relative z-10 aspect-[4/4.1] w-full object-cover"
                                        onError={(event) => {
                                            event.currentTarget.src =
                                                'https://placehold.co/800x900/0b0b0b/ef4444?text=Founder';
                                        }}
                                    />
                                </div>

                                <div className="relative mt-5 overflow-hidden rounded-[18px] border border-red-500/20 bg-[linear-gradient(180deg,rgba(14,14,14,0.96)_0%,rgba(8,8,8,0.98)_100%)] px-6 py-6 shadow-[0_0_26px_rgba(220,38,38,0.08)]">
                                    <div className="absolute right-6 top-5 h-16 w-20 opacity-30">
                                        <div className="h-full w-full bg-[radial-gradient(circle,rgba(239,68,68,0.7)_1px,transparent_1px)] bg-[size:10px_10px]" />
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <span className="mt-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-red-500/60">
                                            <span className="h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.95)]" />
                                        </span>

                                        <div>
                                            <h3 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                                                {about.founderName}
                                            </h3>
                                            <p className="mt-2 text-base font-medium text-red-400 sm:text-lg">
                                                {about.founderPosition}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* right content */}
                    <div
                        className={`transition-all duration-1000 delay-200 ${
                            isVisible
                                ? 'translate-x-0 opacity-100'
                                : 'translate-x-10 opacity-0'
                        }`}
                    >
                        <div className="relative">
                            <div className="mb-8 flex items-start gap-5">
                                <div className="mt-1 h-28 w-1.5 rounded-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.95)]" />

                                <div className="relative flex-1">
                                    <div className="absolute -left-1 -top-5 text-6xl font-black leading-none text-red-500">
                                        “
                                    </div>

                                    <p className="pl-8 pr-8 text-2xl font-light italic leading-relaxed text-white/92 sm:text-[2rem] lg:text-[3rem] lg:leading-[1.35]">
                                        {about.quote}
                                    </p>

                                    <div className="absolute -bottom-3 right-0 text-6xl font-black leading-none text-red-500/80 sm:text-7xl">
                                        ”
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-5 text-lg leading-relaxed text-white/72 sm:text-xl">
                                <p>
                                    {about.description1}
                                </p>

                                {descriptionParagraphs.map((paragraph, index) => (
                                    <p key={index}>
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            <div className="mt-10 border-t border-white/10 pt-9">
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                    {about.stats.slice(0, 4).map((stat, index) => (
                                        <div
                                            key={`${stat.label}-${index}`}
                                            className="group relative flex flex-col items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-5 text-center transition-all duration-300 hover:border-red-500/30 hover:bg-white/[0.06]"
                                        >
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-[linear-gradient(180deg,rgba(18,18,18,0.96)_0%,rgba(8,8,8,0.98)_100%)] text-red-500 shadow-[0_0_22px_rgba(220,38,38,0.10)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-red-400/40 group-hover:shadow-[0_0_28px_rgba(220,38,38,0.22)]">
                                                {getStatIcon(index)}
                                            </div>

                                            <div>
                                                <div className="text-3xl font-black leading-none tracking-tight text-red-500 sm:text-4xl">
                                                    {stat.number}
                                                </div>
                                                <div className="mt-1.5 text-xs font-medium leading-tight text-white/70 sm:text-sm">
                                                    {stat.label}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}