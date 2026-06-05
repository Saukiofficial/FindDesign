import React, { useEffect, useMemo, useRef, useState } from 'react';

export default function Hero({ heroSetting = null }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isLightDevice, setIsLightDevice] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 65, y: 45 });
    const requestRef = useRef(null);

    useEffect(() => {
        setIsVisible(true);

        const checkDevice = () => {
            const isSmallScreen = window.innerWidth < 768;
            const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
            const lowCpu = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;

            setIsLightDevice(Boolean(isSmallScreen || isIOS || lowCpu));
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);

        return () => {
            window.removeEventListener('resize', checkDevice);
        };
    }, []);

    useEffect(() => {
        if (isLightDevice) return;

        const handleMouseMove = (event) => {
            if (requestRef.current) return;

            requestRef.current = requestAnimationFrame(() => {
                setMousePosition({
                    x: (event.clientX / window.innerWidth) * 100,
                    y: (event.clientY / window.innerHeight) * 100,
                });

                requestRef.current = null;
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);

            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [isLightDevice]);

    const hero = useMemo(() => {
        return {
            welcomeText: heroSetting?.welcome_text || 'WELCOME TO',
            subtitle: heroSetting?.subtitle || 'CREATIVE STUDIO & DIGITAL ART AGENCY',
            description:
                heroSetting?.description ||
                'We craft bold visuals, powerful brands, and immersive digital art that leave a lasting impact.',
            primaryButtonText: heroSetting?.primary_button_text || 'Explore Portfolio',
            primaryButtonLink: heroSetting?.primary_button_link || '#portfolio',
            secondaryButtonText: heroSetting?.secondary_button_text || 'Start Project',
            secondaryButtonLink: heroSetting?.secondary_button_link || '#contact',

            logoImage: heroSetting?.logo_image_url || '/images/logo-2.webp',
            brandImage: heroSetting?.brand_image_url || null,
            titleImage: heroSetting?.hero_title_image_url || null,

            characterDesktop:
                heroSetting?.hero_character_desktop_url ||
                heroSetting?.hero_character_mobile_url ||
                null,

            characterMobile:
                heroSetting?.hero_character_mobile_url ||
                heroSetting?.hero_character_desktop_url ||
                null,

            backgroundImage: heroSetting?.hero_background_image_url || null,
            signatureImage: heroSetting?.signature_image_url || null,

            stats:
                Array.isArray(heroSetting?.stats) && heroSetting.stats.length > 0
                    ? heroSetting.stats
                    : [
                          {
                              number: '200+',
                              label: 'Projects Completed',
                              icon: 'diamond',
                          },
                          {
                              number: '50+',
                              label: 'Happy Clients',
                              icon: 'star',
                          },
                          {
                              number: '8+',
                              label: 'Years Experience',
                              icon: 'bolt',
                          },
                      ],

            serviceCards:
                Array.isArray(heroSetting?.service_cards) && heroSetting.service_cards.length > 0
                    ? heroSetting.service_cards
                    : [
                          {
                              title: 'Illustration',
                              subtitle: 'Custom Digital Art',
                              icon: 'pen',
                          },
                          {
                              title: 'Branding',
                              subtitle: 'Identity & Logos',
                              icon: 'vector',
                          },
                          {
                              title: 'Graphic Design',
                              subtitle: 'Print & Digital',
                              icon: 'monitor',
                          },
                      ],

            socialLinks:
                Array.isArray(heroSetting?.social_links) && heroSetting.social_links.length > 0
                    ? heroSetting.social_links
                    : [
                          {
                              name: 'Behance',
                              url: '#',
                              icon: 'behance',
                          },
                          {
                              name: 'Instagram',
                              url: '#',
                              icon: 'instagram',
                          },
                          {
                              name: 'Dribbble',
                              url: '#',
                              icon: 'dribbble',
                          },
                          {
                              name: 'Email',
                              url: 'mailto:agusaffandi120@gmail.com',
                              icon: 'mail',
                          },
                      ],
        };
    }, [heroSetting]);

    const scrollToSection = (link) => {
        if (!link) return;

        if (link.startsWith('#')) {
            const target = document.querySelector(link);

            if (target) {
                target.scrollIntoView({
                    behavior: isLightDevice ? 'auto' : 'smooth',
                    block: 'start',
                });
            }

            return;
        }

        window.location.href = link;
    };

    const getStatIcon = (icon) => {
        const className = 'h-8 w-8';

        if (icon === 'star') {
            return (
                <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.364 1.118l1.286 3.958c.3.921-.755 1.688-1.54 1.118l-3.367-2.446a1 1 0 00-1.175 0l-3.367 2.446c-.784.57-1.838-.197-1.539-1.118l1.286-3.958a1 1 0 00-.364-1.118L4.06 9.385c-.783-.57-.38-1.81.588-1.81H8.81a1 1 0 00.95-.69l1.286-3.958z"
                    />
                </svg>
            );
        }

        if (icon === 'bolt') {
            return (
                <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M13 2L4 14h7l-1 8 10-13h-7l0-7z"
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
                    d="M6 3h12l4 6-10 12L2 9l4-6z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M2 9h20M8 3l4 18M16 3l-4 18"
                />
            </svg>
        );
    };

    const getServiceIcon = (icon) => {
        const className = 'h-10 w-10';

        if (icon === 'vector') {
            return (
                <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.6"
                        d="M4 17V7m16 10V7M7 4h10M7 20h10M7 4a3 3 0 110 6 3 3 0 010-6zm10 0a3 3 0 110 6 3 3 0 010-6zM7 14a3 3 0 110 6 3 3 0 010-6zm10 0a3 3 0 110 6 3 3 0 010-6z"
                    />
                </svg>
            );
        }

        if (icon === 'monitor') {
            return (
                <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.6"
                        d="M4 5h16v11H4V5zM9 21h6M12 16v5"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.6"
                        d="M8 10l3 3 5-6"
                    />
                </svg>
            );
        }

        return (
            <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.6"
                    d="M12 3l3 5 5 2-5 2-3 9-3-9-5-2 5-2 3-5z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.6"
                    d="M12 12l7 7M5 19l7-7"
                />
            </svg>
        );
    };

    const getSocialIcon = (icon) => {
        const className = 'h-5 w-5';

        if (icon === 'instagram') {
            return (
                <svg className={className} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.8 2h8.4A5.8 5.8 0 0122 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8A5.8 5.8 0 012 16.2V7.8A5.8 5.8 0 017.8 2zm0 2A3.8 3.8 0 004 7.8v8.4A3.8 3.8 0 007.8 20h8.4a3.8 3.8 0 003.8-3.8V7.8A3.8 3.8 0 0016.2 4H7.8zm8.7 1.75a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z" />
                </svg>
            );
        }

        if (icon === 'dribbble') {
            return (
                <svg className={className} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2a10 10 0 1010 10A10.012 10.012 0 0012 2zm6.82 4.6a8.04 8.04 0 011.84 4.86 16.44 16.44 0 00-5.3-.24c-.22-.53-.45-1.05-.7-1.56a13.88 13.88 0 004.16-3.06zM12 3.94a8.03 8.03 0 015.55 2.23 11.74 11.74 0 01-3.74 2.74 36.12 36.12 0 00-2.64-4.85c.27-.08.55-.12.83-.12zm-2.95.7a33.86 33.86 0 012.71 4.9 29.5 29.5 0 01-7.43.97 8.08 8.08 0 014.72-5.87zM3.93 12v-.08a31.3 31.3 0 008.6-1.18c.18.38.35.76.51 1.15-.22.06-.43.13-.65.2a13.35 13.35 0 00-6.6 5.08A8.03 8.03 0 013.93 12zm8.07 8.07a8.02 8.02 0 01-4.8-1.6 11.4 11.4 0 016.55-4.95c.03-.01.07-.02.1-.03a28.35 28.35 0 011.47 5.88 7.94 7.94 0 01-3.32.7zm5.1-1.77a30.84 30.84 0 00-1.36-5.39 14.47 14.47 0 014.8.35 8.03 8.03 0 01-3.44 5.04z" />
                </svg>
            );
        }

        if (icon === 'mail') {
            return (
                <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M4 6h16v12H4V6zm0 0l8 7 8-7"
                    />
                </svg>
            );
        }

        return (
            <svg className={className} fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 7.2c0 2.8-1.8 4.8-4.4 5.3 1.6.5 2.6 1.8 2.6 3.8 0 3.4-2.7 5.2-6.9 5.2H3V2.5h10.2C17.2 2.5 22 3.2 22 7.2zM8 6.6v4h4.6c1.8 0 3.6-.4 3.6-2.1 0-1.8-1.9-1.9-3.8-1.9H8zm0 7.7v4.1h5.2c2 0 3.4-.6 3.4-2.1 0-1.8-1.7-2-3.7-2H8z" />
            </svg>
        );
    };

    return (
        <section
            id="home"
            className="relative min-h-0 overflow-hidden bg-black text-white sm:min-h-screen"
        >
            <style>{`
                @keyframes heroFloat {
                    0%, 100% {
                        transform: translate3d(0, 0, 0) scale(1);
                    }
                    50% {
                        transform: translate3d(0, -14px, 0) scale(1.015);
                    }
                }

                @keyframes heroGlow {
                    0%, 100% {
                        opacity: 0.55;
                    }
                    50% {
                        opacity: 0.9;
                    }
                }

                @keyframes heroLine {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }

                .hero-character-float {
                    animation: heroFloat 7s ease-in-out infinite;
                    transform: translate3d(0, 0, 0);
                    backface-visibility: hidden;
                }

                .hero-soft-glow {
                    animation: heroGlow 4s ease-in-out infinite;
                }

                .hero-shine::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent);
                    transform: translateX(-100%);
                    animation: heroLine 4s ease-in-out infinite;
                    pointer-events: none;
                }

                @media (max-width: 479px) {
                    .hero-character-float,
                    .hero-soft-glow,
                    .hero-shine::after {
                        animation: none !important;
                    }

                    .hero-mobile-hide {
                        display: none !important;
                    }

                    .hero-mobile-no-blur {
                        filter: none !important;
                        -webkit-backdrop-filter: none !important;
                        backdrop-filter: none !important;
                    }
                }

                @media (min-width: 480px) and (max-width: 768px) {
                    .hero-mobile-hide {
                        display: none !important;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .hero-character-float,
                    .hero-soft-glow,
                    .hero-shine::after {
                        animation: none !important;
                    }
                }
            `}</style>

            {hero.backgroundImage && (
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-70"
                    style={{
                        backgroundImage: `url(${hero.backgroundImage})`,
                    }}
                />
            )}

            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_35%,rgba(220,38,38,0.32),transparent_34%),linear-gradient(120deg,#020202_0%,#050505_35%,#1b0303_70%,#020202_100%)]" />
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-black via-black/80 to-black/40" />

            {!isLightDevice && (
                <div
                    className="hero-mobile-hide pointer-events-none absolute z-0 h-[520px] w-[520px] rounded-full bg-red-600/20 blur-3xl transition-transform duration-700"
                    style={{
                        left: `${mousePosition.x}%`,
                        top: `${mousePosition.y}%`,
                        transform: 'translate3d(-50%, -50%, 0)',
                    }}
                />
            )}

            <div className="hero-mobile-hide pointer-events-none absolute inset-0 z-0 opacity-[0.08]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.6)_1px,transparent_1px)] bg-[size:72px_72px]" />
            </div>

            <div className="hero-mobile-hide absolute left-0 top-1/2 z-0 h-px w-full bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

            <div
                className={`relative z-10 mx-auto flex w-full max-w-[1600px] items-center px-3 pb-4 pt-14 transition-all duration-1000 sm:min-h-screen sm:px-8 sm:pb-10 sm:pt-20 lg:px-12 xl:px-16 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
            >
                <div className="grid w-full grid-cols-2 items-end gap-2 sm:items-center sm:gap-6 lg:gap-10 lg:grid-cols-[0.92fr_1.08fr]">
                    <div className="relative z-20 max-w-3xl pt-2 lg:pt-20">
                        <div className="mb-2 flex items-center gap-1.5 sm:mb-5 sm:gap-3">
                            <span className="h-px w-5 bg-red-500 sm:w-10" />
                            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-red-500 sm:text-xs sm:tracking-[0.45em] lg:text-sm">
                                {hero.welcomeText}
                            </p>
                        </div>

                        <div className="relative mb-3 sm:mb-6">
                            {hero.titleImage ? (
                                <img
                                    src={hero.titleImage}
                                    alt="Find Design"
                                    loading="eager"
                                    decoding="async"
                                    fetchPriority="high"
                                    className="max-h-[80px] w-full max-w-full object-contain object-left drop-shadow-[0_0_32px_rgba(220,38,38,0.38)] sm:max-h-[200px] sm:-ml-1 sm:max-w-[680px] lg:-ml-4 lg:max-h-[360px] xl:-ml-20"
                                    onError={(event) => {
                                        event.currentTarget.style.display = 'none';
                                    }}
                                />
                            ) : (
                                <h1 className="text-3xl font-black uppercase leading-[0.9] tracking-tight sm:text-5xl lg:text-7xl xl:text-8xl">
                                    <span className="block bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                                        Fiind
                                    </span>
                                    <span className="block bg-gradient-to-b from-red-500 to-red-800 bg-clip-text text-transparent">
                                        Design
                                    </span>
                                </h1>
                            )}

                            {hero.signatureImage && (
                                <img
                                    src={hero.signatureImage}
                                    alt="Signature"
                                    loading="lazy"
                                    decoding="async"
                                    className="hero-mobile-hide absolute right-4 top-8 max-h-24 max-w-[190px] opacity-50"
                                    onError={(event) => {
                                        event.currentTarget.style.display = 'none';
                                    }}
                                />
                            )}
                        </div>

                        <div className="mb-2 flex items-center gap-2 sm:mb-5 sm:gap-3">
                            <span className="h-5 w-0.5 rounded-full bg-red-600 shadow-[0_0_22px_rgba(220,38,38,0.9)] sm:h-8 sm:w-1" />
                            <h2 className="text-[8px] font-extrabold uppercase tracking-[0.1em] text-white/90 sm:text-sm sm:tracking-[0.14em] lg:text-xl">
                                {hero.subtitle}
                            </h2>
                        </div>

                        <p className="mb-4 max-w-xl text-[9px] leading-relaxed text-white/62 sm:mb-8 sm:text-base lg:text-lg">
                            {hero.description}
                        </p>

                        <div className="mb-4 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:gap-4">
                            <button
                                type="button"
                                onClick={() => scrollToSection(hero.primaryButtonLink)}
                                className="hero-shine relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg border border-red-400/60 bg-gradient-to-r from-red-600 to-red-500 px-4 py-2.5 text-[10px] font-extrabold text-white shadow-[0_0_32px_rgba(220,38,38,0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_48px_rgba(220,38,38,0.65)] sm:gap-4 sm:rounded-xl sm:px-8 sm:py-4 sm:text-sm lg:text-base"
                            >
                                <span>{hero.primaryButtonText}</span>
                                <svg className="h-3 w-3 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-6-6l6 6-6 6" />
                                </svg>
                            </button>

                            <button
                                type="button"
                                onClick={() => scrollToSection(hero.secondaryButtonLink)}
                                className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-500/45 bg-white/[0.035] px-4 py-2.5 text-[10px] font-extrabold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-red-400 hover:bg-red-500/10 sm:gap-4 sm:rounded-xl sm:px-8 sm:py-4 sm:text-sm lg:text-base"
                            >
                                <span>{hero.secondaryButtonText}</span>
                                <svg className="h-3 w-3 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-6-6l6 6-6 6" />
                                </svg>
                            </button>
                        </div>

                        <div className="grid max-w-2xl grid-cols-3 gap-1 sm:gap-4">
                            {hero.stats.slice(0, 3).map((stat, index) => (
                                <div
                                    key={`${stat.label}-${index}`}
                                    className="group flex items-center gap-1.5 border-red-500/20 sm:gap-4 sm:border-r sm:last:border-r-0"
                                >
                                    <div className="hidden text-red-500 drop-shadow-[0_0_16px_rgba(239,68,68,0.65)] transition-transform duration-300 group-hover:scale-110 sm:block">
                                        {getStatIcon(stat.icon)}
                                    </div>
                                    <div className="text-red-500 drop-shadow-[0_0_16px_rgba(239,68,68,0.65)] sm:hidden">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M6 3h12l4 6-10 12L2 9l4-6z"/></svg>
                                    </div>

                                    <div>
                                        <div className="text-base font-black text-white sm:text-2xl lg:text-3xl">
                                            {stat.number}
                                        </div>
                                        <div className="text-[7px] text-white/55 sm:text-xs lg:text-sm">
                                            {stat.label}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10 flex items-end justify-center sm:min-h-[470px] lg:min-h-[720px]">
                        <div className="hero-mobile-hide hero-soft-glow absolute right-[6%] top-[8%] h-[560px] w-[560px] rounded-full border border-red-500/25 shadow-[0_0_90px_rgba(220,38,38,0.24)]" />
                        <div className="hero-mobile-hide absolute right-[15%] top-[16%] h-[410px] w-[410px] rounded-full border border-red-500/20" />

                        {!isLightDevice && (
                            <>
                                <div className="hero-mobile-hide absolute right-[5%] top-[28%] h-28 w-2 rotate-45 bg-gradient-to-b from-red-400 to-transparent shadow-[0_0_24px_rgba(239,68,68,0.9)]" />
                                <div className="hero-mobile-hide absolute left-[11%] top-[42%] h-36 w-3 -rotate-45 bg-gradient-to-b from-red-600 to-transparent shadow-[0_0_28px_rgba(239,68,68,0.8)]" />
                                <div className="hero-mobile-hide absolute bottom-[22%] right-[10%] h-24 w-2 -rotate-12 bg-gradient-to-b from-red-500 to-transparent shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
                            </>
                        )}

                        <div className="hero-mobile-hide absolute bottom-12 right-[10%] h-[420px] w-[520px] rounded-full bg-red-600/25 blur-3xl" />

                        {hero.characterDesktop && (
                            <picture className="relative z-10 flex w-full justify-center">
                                {hero.characterMobile && (
                                    <source media="(max-width: 767px)" srcSet={hero.characterMobile} />
                                )}

                                <img
                                    src={hero.characterDesktop}
                                    alt="Fiind Design Character"
                                    loading="eager"
                                    decoding="async"
                                    fetchPriority="high"
                                    className={`hero-character-float w-full max-h-[160px] max-w-full object-contain object-bottom drop-shadow-[0_0_38px_rgba(220,38,38,0.45)] sm:max-h-[520px] sm:max-w-[720px] lg:max-h-[760px] lg:max-w-[920px] ${
                                        isLightDevice ? 'hero-mobile-no-blur' : ''
                                    }`}
                                    onError={(event) => {
                                        event.currentTarget.style.display = 'none';
                                    }}
                                />
                            </picture>
                        )}

                        <div className="absolute bottom-0 left-1/2 z-20 hidden w-full max-w-[760px] -translate-x-1/2 grid-cols-3 overflow-hidden rounded-2xl border border-red-500/25 bg-black/55 shadow-[0_0_45px_rgba(220,38,38,0.16)] backdrop-blur-md lg:grid">
                            {hero.serviceCards.slice(0, 3).map((service, index) => (
                                <div
                                    key={`${service.title}-${index}`}
                                    className="group relative flex items-center gap-5 border-r border-red-500/20 px-8 py-7 last:border-r-0 hover:bg-red-500/10"
                                >
                                    <div className="text-red-500 drop-shadow-[0_0_18px_rgba(239,68,68,0.75)] transition-transform duration-300 group-hover:scale-110">
                                        {getServiceIcon(service.icon)}
                                    </div>

                                    <div>
                                        <h3 className="font-extrabold text-white">
                                            {service.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-white/55">
                                            {service.subtitle}
                                        </p>
                                    </div>

                                    <div className="absolute bottom-0 left-1/2 h-1 w-14 -translate-x-1/2 rounded-t-full bg-red-500 shadow-[0_0_22px_rgba(239,68,68,0.95)]" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="hero-mobile-hide absolute right-7 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-4 xl:flex">
                {hero.socialLinks.slice(0, 4).map((social, index) => (
                    <a
                        key={`${social.name}-${index}`}
                        href={social.url || '#'}
                        target={social.url?.startsWith('http') ? '_blank' : undefined}
                        rel={social.url?.startsWith('http') ? 'noopener noreferrer' : undefined}
                        title={social.name}
                        className="group flex h-12 w-12 items-center justify-center rounded-full border border-red-500/35 bg-black/50 text-white shadow-[0_0_24px_rgba(220,38,38,0.22)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-red-400 hover:bg-red-600 hover:shadow-[0_0_34px_rgba(220,38,38,0.5)]"
                    >
                        {getSocialIcon(social.icon)}
                    </a>
                ))}
            </div>

            <div className="relative z-20 mx-auto hidden grid-cols-1 gap-4 px-5 pb-10 sm:grid sm:grid-cols-3 lg:hidden max-w-5xl">
                {hero.serviceCards.slice(0, 3).map((service, index) => (
                    <div
                        key={`${service.title}-mobile-${index}`}
                        className="flex items-center gap-4 rounded-2xl border border-red-500/25 bg-slate-950/90 p-5"
                    >
                        <div className="text-red-500">
                            {getServiceIcon(service.icon)}
                        </div>

                        <div>
                            <h3 className="font-extrabold text-white">
                                {service.title}
                            </h3>
                            <p className="text-sm text-white/55">
                                {service.subtitle}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}