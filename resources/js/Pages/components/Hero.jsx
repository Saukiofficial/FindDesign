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
                          { number: '200+', label: 'Projects Completed', icon: 'diamond' },
                          { number: '50+', label: 'Happy Clients', icon: 'star' },
                          { number: '8+', label: 'Years Experience', icon: 'bolt' },
                      ],

            serviceCards:
                Array.isArray(heroSetting?.service_cards) && heroSetting.service_cards.length > 0
                    ? heroSetting.service_cards
                    : [
                          { title: 'Illustration', subtitle: 'Custom Digital Art', icon: 'pen' },
                          { title: 'Branding', subtitle: 'Identity & Logos', icon: 'vector' },
                          { title: 'Graphic Design', subtitle: 'Print & Digital', icon: 'monitor' },
                      ],

            socialLinks:
                Array.isArray(heroSetting?.social_links) && heroSetting?.social_links.length > 0
                    ? heroSetting.social_links
                    : [
                          { name: 'Behance', url: '#', icon: 'behance' },
                          { name: 'Instagram', url: '#', icon: 'instagram' },
                          { name: 'Dribbble', url: '#', icon: 'dribbble' },
                          { name: 'Email', url: 'mailto:agusaffandi120@gmail.com', icon: 'mail' },
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

    const getFileExtension = (url = '') => {
        const cleanUrl = String(url).split('?')[0].split('#')[0];
        const parts = cleanUrl.split('.');

        return parts.length > 1 ? parts.pop().toLowerCase() : '';
    };

    const isVideoFile = (url) => ['mp4', 'webm'].includes(getFileExtension(url));

    const getVideoMimeType = (url) => {
        const extension = getFileExtension(url);

        if (extension === 'webm') return 'video/webm';
        if (extension === 'mp4') return 'video/mp4';

        return 'video/mp4';
    };

    const shouldUseScreenBlend = (url) => {
        const extension = getFileExtension(url);

        return ['gif', 'mp4'].includes(extension);
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

    const desktopCharacterUrl = hero.characterDesktop;
    const mobileCharacterUrl = hero.characterMobile || hero.characterDesktop;
    const desktopCharacterIsVideo = isVideoFile(desktopCharacterUrl);
    const mobileCharacterIsVideo = isVideoFile(mobileCharacterUrl);
    const desktopCharacterNeedsBlend = shouldUseScreenBlend(desktopCharacterUrl);
    const mobileCharacterNeedsBlend = shouldUseScreenBlend(mobileCharacterUrl);

    return (
        <section id="home" className="fd-hero-section relative min-h-0 overflow-hidden bg-black text-white sm:min-h-screen">
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

                .fd-character-media {
                    display: block;
                    background: transparent;
                }

                .fd-character-media-video {
                    pointer-events: none;
                    background: transparent;
                }

                .fd-character-media-blend {
                    mix-blend-mode: screen;
                }

                .fd-mobile-stage {
                    height: clamp(246px, 62vw, 292px);
                }

                .fd-mobile-title {
                    width: clamp(178px, 49vw, 232px);
                }

                .fd-mobile-character {
                    width: clamp(245px, 68vw, 318px);
                    right: clamp(-82px, -18vw, -52px);
                    top: clamp(96px, 24vw, 122px);
                }

                .fd-mobile-content {
                    margin-top: clamp(-42px, -9vw, -26px);
                }

                .fd-mobile-text-area {
                    max-width: 55%;
                    padding-top: 0;
                }

                .fd-mobile-subtitle {
                    font-size: clamp(0.58rem, 2.45vw, 0.74rem);
                    line-height: 1.22;
                    letter-spacing: 0.03em;
                }

                .fd-mobile-description {
                    font-size: clamp(0.5rem, 2.12vw, 0.64rem);
                    line-height: 1.55;
                }

                .fd-mobile-actions {
                    width: clamp(148px, 42vw, 190px);
                    max-width: 52%;
                }

                .fd-mobile-button {
                    min-height: clamp(28px, 6.8vw, 34px);
                    padding-inline: clamp(9px, 2.7vw, 13px);
                    padding-block: clamp(5px, 1.55vw, 7px);
                    border-radius: clamp(8px, 2.4vw, 11px);
                    font-size: clamp(0.5rem, 2.1vw, 0.62rem);
                }

                .fd-mobile-stat-card {
                    min-height: clamp(64px, 17vw, 82px);
                    border-radius: clamp(9px, 2.8vw, 13px);
                }

                .fd-mobile-stat-icon svg {
                    height: clamp(14px, 4vw, 19px);
                    width: clamp(14px, 4vw, 19px);
                }

                .fd-mobile-stat-number {
                    font-size: clamp(0.9rem, 4.4vw, 1.16rem);
                }

                .fd-mobile-stat-label {
                    font-size: clamp(0.36rem, 1.65vw, 0.48rem);
                    line-height: 1.12;
                }

                .fd-mobile-service-title {
                    font-size: clamp(1.05rem, 4.8vw, 1.35rem);
                }

                .fd-mobile-service-desc {
                    font-size: clamp(0.52rem, 2.3vw, 0.66rem);
                }

                .fd-mobile-service-card {
                    min-height: clamp(72px, 20vw, 96px);
                    border-radius: clamp(9px, 2.8vw, 13px);
                }

                .fd-mobile-service-icon svg {
                    height: clamp(18px, 5.2vw, 26px);
                    width: clamp(18px, 5.2vw, 26px);
                }

                .fd-mobile-service-card-title {
                    font-size: clamp(0.46rem, 2.15vw, 0.62rem);
                }

                .fd-mobile-service-card-desc {
                    font-size: clamp(0.38rem, 1.75vw, 0.52rem);
                    line-height: 1.12;
                }

                @media (min-width: 640px) and (max-width: 1023px) {
                    .fd-hero-section {
                        min-height: auto !important;
                        padding-bottom: 0 !important;
                    }

                    .fd-hero-shell {
                        min-height: auto !important;
                        padding-top: 132px !important;
                        padding-bottom: 18px !important;
                        align-items: flex-start !important;
                    }

                    .fd-desktop-grid {
                        grid-template-columns: 0.86fr 1.14fr !important;
                        align-items: start !important;
                        gap: 1rem !important;
                    }

                    .fd-desktop-left {
                        padding-top: 34px !important;
                    }

                    .fd-desktop-title {
                        margin-bottom: 14px !important;
                    }

                    .fd-desktop-title img {
                        max-height: 150px !important;
                        max-width: 430px !important;
                    }

                    .fd-desktop-welcome {
                        margin-bottom: 12px !important;
                    }

                    .fd-desktop-subtitle {
                        margin-bottom: 12px !important;
                    }

                    .fd-desktop-description {
                        margin-bottom: 16px !important;
                        max-width: 360px !important;
                        font-size: 0.86rem !important;
                        line-height: 1.55 !important;
                    }

                    .fd-desktop-actions {
                        margin-bottom: 18px !important;
                        gap: 12px !important;
                    }

                    .fd-desktop-actions button {
                        padding: 13px 24px !important;
                        font-size: 0.82rem !important;
                    }

                    .fd-desktop-stats {
                        max-width: 390px !important;
                        gap: 10px !important;
                        position: relative !important;
                        z-index: 30 !important;
                    }

                    .fd-desktop-stats > div {
                        gap: 10px !important;
                    }

                    .fd-desktop-stats svg {
                        width: 26px !important;
                        height: 26px !important;
                    }

                    .fd-desktop-stat-number {
                        font-size: 1.45rem !important;
                    }

                    .fd-desktop-stat-label {
                        font-size: 0.72rem !important;
                        line-height: 1.15 !important;
                    }

                    .fd-desktop-right {
                        min-height: 445px !important;
                        align-items: flex-end !important;
                        overflow: visible !important;
                    }

                    .fd-desktop-character {
                        position: relative !important;
                        z-index: 10 !important;
                    }

                    .fd-desktop-character img {
                        max-height: 440px !important;
                        max-width: 570px !important;
                    }

                    .fd-tablet-services {
                        position: relative !important;
                        z-index: 25 !important;
                        margin-top: 0 !important;
                        padding-top: 0 !important;
                        padding-bottom: 36px !important;
                    }

                    .fd-tablet-service-card {
                        padding: 16px 18px !important;
                        min-height: 76px !important;
                        gap: 12px !important;
                    }

                    .fd-tablet-service-card svg {
                        width: 34px !important;
                        height: 34px !important;
                    }

                    .fd-tablet-service-card h3 {
                        font-size: 0.92rem !important;
                    }

                    .fd-tablet-service-card p {
                        font-size: 0.78rem !important;
                    }
                }

                @media (max-width: 360px) {
                    .fd-mobile-stage {
                        height: 234px;
                    }

                    .fd-mobile-title {
                        width: 172px;
                    }

                    .fd-mobile-character {
                        width: 258px;
                        right: -82px;
                        top: 98px;
                    }

                    .fd-mobile-content {
                        margin-top: -38px;
                    }

                    .fd-mobile-text-area {
                        max-width: 56%;
                    }

                    .fd-mobile-actions {
                        width: 148px;
                        max-width: 52%;
                    }
                }

                @media (min-width: 430px) and (max-width: 767px) {
                    .fd-mobile-stage {
                        height: 286px;
                    }

                    .fd-mobile-title {
                        width: 232px;
                    }

                    .fd-mobile-character {
                        width: 320px;
                        right: -62px;
                        top: 108px;
                    }

                    .fd-mobile-content {
                        margin-top: -38px;
                    }

                    .fd-mobile-text-area {
                        max-width: 54%;
                    }

                    .fd-mobile-actions {
                        width: 190px;
                        max-width: 52%;
                    }
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
                    style={{ backgroundImage: `url(${hero.backgroundImage})` }}
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
                className={`fd-hero-shell relative z-10 mx-auto w-full max-w-[1720px] px-4 pb-6 transition-all duration-1000 sm:flex sm:min-h-screen sm:items-center sm:px-8 sm:pb-10 sm:pt-28 lg:px-12 xl:px-16 2xl:px-20 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
            >
                {/* DESKTOP / TABLET */}
                <div className="fd-desktop-grid hidden w-full sm:grid sm:items-center sm:gap-8 sm:grid-cols-[0.94fr_1.06fr] lg:gap-10 xl:gap-12">
                    <div className="fd-desktop-left relative z-20 max-w-3xl lg:pt-8 xl:pt-10">
                        <div className="fd-desktop-welcome mb-5 flex items-center gap-3">
                            <span className="h-px w-10 bg-red-500" />
                            <p className="text-xs font-bold uppercase tracking-[0.45em] text-red-500 lg:text-sm">
                                {hero.welcomeText}
                            </p>
                        </div>

                        <div className="fd-desktop-title relative mb-5">
                            {hero.titleImage ? (
                                <img
                                    src={hero.titleImage}
                                    alt="Fiind Design"
                                    loading="eager"
                                    decoding="async"
                                    fetchPriority="high"
                                    className="-ml-1 max-h-[210px] w-full max-w-[620px] object-contain object-left drop-shadow-[0_0_34px_rgba(220,38,38,0.42)] lg:-ml-2 lg:max-h-[290px] lg:max-w-[700px] xl:-ml-8 xl:max-h-[330px] xl:max-w-[760px]"
                                    onError={(event) => {
                                        event.currentTarget.style.display = 'none';
                                    }}
                                />
                            ) : (
                                <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-tight lg:text-7xl xl:text-8xl">
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
                                    className="absolute right-6 top-6 max-h-20 max-w-[170px] opacity-50"
                                    onError={(event) => {
                                        event.currentTarget.style.display = 'none';
                                    }}
                                />
                            )}
                        </div>

                        <div className="fd-desktop-subtitle mb-5 flex items-center gap-3">
                            <span className="h-8 w-1 rounded-full bg-red-600 shadow-[0_0_22px_rgba(220,38,38,0.9)]" />
                            <h2 className="text-base font-extrabold uppercase tracking-[0.13em] text-white/90 lg:text-xl xl:text-[1.4rem]">
                                {hero.subtitle}
                            </h2>
                        </div>

                        <p className="fd-desktop-description mb-8 max-w-xl text-base leading-relaxed text-white/66 lg:text-lg">
                            {hero.description}
                        </p>

                        <div className="fd-desktop-actions mb-9 flex flex-row gap-4">
                            <button
                                type="button"
                                onClick={() => scrollToSection(hero.primaryButtonLink)}
                                className="hero-shine relative inline-flex items-center justify-center gap-4 overflow-hidden rounded-xl border border-red-400/60 bg-gradient-to-r from-red-600 to-red-500 px-8 py-4 text-sm font-extrabold text-white shadow-[0_0_34px_rgba(220,38,38,0.48)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_48px_rgba(220,38,38,0.65)] lg:text-base"
                            >
                                <span>{hero.primaryButtonText}</span>
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-6-6l6 6-6 6" />
                                </svg>
                            </button>

                            <button
                                type="button"
                                onClick={() => scrollToSection(hero.secondaryButtonLink)}
                                className="inline-flex items-center justify-center gap-4 rounded-xl border border-red-500/45 bg-white/[0.035] px-8 py-4 text-sm font-extrabold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-red-400 hover:bg-red-500/10 lg:text-base"
                            >
                                <span>{hero.secondaryButtonText}</span>
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-6-6l6 6-6 6" />
                                </svg>
                            </button>
                        </div>

                        <div className="fd-desktop-stats grid max-w-2xl grid-cols-3 gap-4">
                            {hero.stats.slice(0, 3).map((stat, index) => (
                                <div
                                    key={`${stat.label}-${index}`}
                                    className="group flex items-center gap-3 border-r border-red-500/20 last:border-r-0"
                                >
                                    <div className="text-red-500 drop-shadow-[0_0_16px_rgba(239,68,68,0.65)] transition-transform duration-300 group-hover:scale-110">
                                        {getStatIcon(stat.icon)}
                                    </div>

                                    <div>
                                        <div className="fd-desktop-stat-number text-3xl font-black leading-none text-white lg:text-[2rem]">
                                            {stat.number}
                                        </div>
                                        <div className="fd-desktop-stat-label text-sm text-white/55">
                                            {stat.label}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="fd-desktop-right relative z-10 flex min-h-[520px] items-end justify-center lg:min-h-[620px] xl:min-h-[700px]">
                        <div className="hero-soft-glow absolute right-[8%] top-[11%] h-[420px] w-[420px] rounded-full border border-red-500/25 shadow-[0_0_90px_rgba(220,38,38,0.22)] xl:h-[500px] xl:w-[500px]" />
                        <div className="absolute right-[15%] top-[19%] h-[310px] w-[310px] rounded-full border border-red-500/20 xl:h-[390px] xl:w-[390px]" />

                        {!isLightDevice && (
                            <>
                                <div className="absolute right-[8%] top-[34%] h-24 w-2 rotate-45 bg-gradient-to-b from-red-400 to-transparent shadow-[0_0_24px_rgba(239,68,68,0.9)]" />
                                <div className="absolute left-[12%] top-[46%] h-28 w-3 -rotate-45 bg-gradient-to-b from-red-600 to-transparent shadow-[0_0_28px_rgba(239,68,68,0.8)]" />
                                <div className="absolute bottom-[26%] right-[13%] h-20 w-2 -rotate-12 bg-gradient-to-b from-red-500 to-transparent shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
                            </>
                        )}

                        <div className="absolute bottom-14 right-[12%] h-[300px] w-[380px] rounded-full bg-red-600/25 blur-3xl xl:h-[380px] xl:w-[460px]" />

                        {desktopCharacterUrl && (
                            desktopCharacterIsVideo ? (
                                <div className="fd-desktop-character relative z-10 flex w-full justify-center">
                                    <video
                                        className={`fd-character-media fd-character-media-video hero-character-float max-h-[500px] w-full max-w-[650px] object-contain object-bottom drop-shadow-[0_0_40px_rgba(220,38,38,0.5)] lg:max-h-[600px] lg:max-w-[760px] xl:max-h-[700px] xl:max-w-[850px] ${
                                            desktopCharacterNeedsBlend ? 'fd-character-media-blend' : ''
                                        } ${isLightDevice ? 'hero-mobile-no-blur' : ''}`}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="metadata"
                                        aria-label="Fiind Design Character"
                                        onError={(event) => {
                                            event.currentTarget.style.display = 'none';
                                        }}
                                    >
                                        <source src={desktopCharacterUrl} type={getVideoMimeType(desktopCharacterUrl)} />
                                    </video>
                                </div>
                            ) : (
                                <picture className="fd-desktop-character relative z-10 flex w-full justify-center">
                                    <img
                                        src={desktopCharacterUrl}
                                        alt="Fiind Design Character"
                                        loading="eager"
                                        decoding="async"
                                        fetchPriority="high"
                                        className={`fd-character-media hero-character-float max-h-[500px] w-full max-w-[650px] object-contain object-bottom drop-shadow-[0_0_40px_rgba(220,38,38,0.5)] lg:max-h-[600px] lg:max-w-[760px] xl:max-h-[700px] xl:max-w-[850px] ${
                                            desktopCharacterNeedsBlend ? 'fd-character-media-blend' : ''
                                        } ${isLightDevice ? 'hero-mobile-no-blur' : ''}`}
                                        onError={(event) => {
                                            event.currentTarget.style.display = 'none';
                                        }}
                                    />
                                </picture>
                            )
                        )}

                        <div className="absolute bottom-5 left-1/2 z-20 hidden w-full max-w-[760px] -translate-x-1/2 grid-cols-3 overflow-hidden rounded-2xl border border-red-500/25 bg-black/55 shadow-[0_0_45px_rgba(220,38,38,0.16)] backdrop-blur-md lg:grid">
                            {hero.serviceCards.slice(0, 3).map((service, index) => (
                                <div
                                    key={`${service.title}-${index}`}
                                    className="group relative flex items-center gap-4 border-r border-red-500/20 px-7 py-6 last:border-r-0 hover:bg-red-500/10"
                                >
                                    <div className="text-red-500 drop-shadow-[0_0_18px_rgba(239,68,68,0.75)] transition-transform duration-300 group-hover:scale-110">
                                        {getServiceIcon(service.icon)}
                                    </div>

                                    <div>
                                        <h3 className="text-base font-extrabold text-white">
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

                {/* MOBILE */}
                <div className="flex w-full flex-col sm:hidden">
                    <div className="fd-mobile-stage relative w-full overflow-visible pt-[clamp(132px,31vw,152px)]">
                        <div className="pointer-events-none absolute right-[-40%] top-[82px] h-[330px] w-[105%] rounded-full bg-red-700/32 blur-3xl" />
                        <div className="pointer-events-none absolute left-[-30%] top-[100px] h-[250px] w-[75%] rounded-full bg-red-950/35 blur-2xl" />

                        {mobileCharacterUrl && (
                            <div className="fd-mobile-character absolute z-10">
                                {mobileCharacterIsVideo ? (
                                    <video
                                        className={`fd-character-media fd-character-media-video hero-character-float w-full object-contain object-top drop-shadow-[0_0_48px_rgba(220,38,38,0.75)] ${
                                            mobileCharacterNeedsBlend ? 'fd-character-media-blend' : ''
                                        } ${isLightDevice ? 'hero-mobile-no-blur' : ''}`}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="metadata"
                                        aria-label="Fiind Design Character"
                                        onError={(event) => {
                                            event.currentTarget.style.display = 'none';
                                        }}
                                    >
                                        <source src={mobileCharacterUrl} type={getVideoMimeType(mobileCharacterUrl)} />
                                    </video>
                                ) : (
                                    <img
                                        src={mobileCharacterUrl}
                                        alt="Fiind Design Character"
                                        loading="eager"
                                        decoding="async"
                                        fetchPriority="high"
                                        className={`fd-character-media hero-character-float w-full object-contain object-top drop-shadow-[0_0_48px_rgba(220,38,38,0.75)] ${
                                            mobileCharacterNeedsBlend ? 'fd-character-media-blend' : ''
                                        } ${isLightDevice ? 'hero-mobile-no-blur' : ''}`}
                                        onError={(event) => {
                                            event.currentTarget.style.display = 'none';
                                        }}
                                    />
                                )}
                            </div>
                        )}

                        <div className="fd-mobile-title relative z-20 pb-2">
                            <div className="mb-2 flex items-center gap-2">
                                <span className="h-px w-8 bg-red-500" />
                                <p className="text-[clamp(7px,2vw,9px)] font-bold uppercase tracking-[0.32em] text-red-500">
                                    {hero.welcomeText}
                                </p>
                            </div>

                            {hero.titleImage ? (
                                <img
                                    src={hero.titleImage}
                                    alt="Fiind Design"
                                    loading="eager"
                                    decoding="async"
                                    fetchPriority="high"
                                    className="-ml-1 w-full object-contain object-left drop-shadow-[0_0_30px_rgba(220,38,38,0.65)]"
                                    onError={(event) => {
                                        event.currentTarget.style.display = 'none';
                                    }}
                                />
                            ) : (
                                <h1 className="text-[clamp(2.4rem,10vw,3.3rem)] font-black uppercase leading-[0.82] tracking-tight">
                                    <span className="block bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                                        Fiind
                                    </span>
                                    <span className="block bg-gradient-to-b from-red-500 to-red-700 bg-clip-text text-transparent">
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
                                    className="absolute left-[72%] top-[42%] max-h-[70px] w-[90px] object-contain opacity-60"
                                    onError={(event) => {
                                        event.currentTarget.style.display = 'none';
                                    }}
                                />
                            )}
                        </div>
                    </div>

                    <div className="fd-mobile-content relative z-30 w-full">
                        <div className="fd-mobile-text-area">
                            <div className="mb-2 flex items-start gap-2">
                                <span className="mt-1 h-[clamp(28px,7vw,36px)] w-[3px] shrink-0 rounded-full bg-red-600 shadow-[0_0_16px_rgba(220,38,38,0.9)]" />

                                <h2 className="fd-mobile-subtitle font-extrabold uppercase text-white">
                                    {hero.subtitle}
                                </h2>
                            </div>

                            <p className="fd-mobile-description mb-3 text-white/65">
                                {hero.description}
                            </p>
                        </div>

                        <div className="fd-mobile-actions mb-5 flex flex-col gap-2">
                            <button
                                type="button"
                                onClick={() => scrollToSection(hero.primaryButtonLink)}
                                className="fd-mobile-button hero-shine relative flex w-full items-center justify-between overflow-hidden border border-red-400/60 bg-gradient-to-r from-red-600 to-red-500 font-extrabold text-white shadow-[0_0_24px_rgba(220,38,38,0.38)] transition-all duration-300 active:scale-[0.98]"
                            >
                                <span>{hero.primaryButtonText}</span>
                                <svg className="h-[clamp(11px,3vw,14px)] w-[clamp(11px,3vw,14px)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-6-6l6 6-6 6" />
                                </svg>
                            </button>

                            <button
                                type="button"
                                onClick={() => scrollToSection(hero.secondaryButtonLink)}
                                className="fd-mobile-button flex w-full items-center justify-between border border-red-500/45 bg-black/50 font-extrabold text-white shadow-[0_0_16px_rgba(220,38,38,0.12)] transition-all duration-300 active:scale-[0.98]"
                            >
                                <span>{hero.secondaryButtonText}</span>
                                <svg className="h-[clamp(11px,3vw,14px)] w-[clamp(11px,3vw,14px)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-6-6l6 6-6 6" />
                                </svg>
                            </button>
                        </div>

                        <div className="mb-6 grid grid-cols-3 gap-2.5">
                            {hero.stats.slice(0, 3).map((stat, index) => (
                                <div
                                    key={`${stat.label}-${index}`}
                                    className="fd-mobile-stat-card relative flex flex-col items-center justify-center gap-1.5 overflow-hidden border border-red-500/25 bg-black/45 px-2 py-2.5 shadow-[0_0_18px_rgba(220,38,38,0.08)]"
                                >
                                    <div className="fd-mobile-stat-icon text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.75)]">
                                        {getStatIcon(stat.icon)}
                                    </div>

                                    <div className="fd-mobile-stat-number font-black leading-none text-white">
                                        {stat.number}
                                    </div>

                                    <div className="fd-mobile-stat-label px-1 text-center text-white/56">
                                        {stat.label}
                                    </div>

                                    <div className="absolute bottom-0 left-1/2 h-[3px] w-8 -translate-x-1/2 rounded-t-full bg-red-500 shadow-[0_0_16px_rgba(239,68,68,0.9)]" />
                                </div>
                            ))}
                        </div>

                        <div className="pb-10">
                            <div className="mb-3 flex items-end justify-between gap-3">
                                <div className="min-w-0">
                                    <div className="mb-1.5 flex items-center gap-2">
                                        <span className="text-[clamp(6px,1.85vw,8px)] font-black uppercase tracking-[0.34em] text-red-500">
                                            Services
                                        </span>
                                    </div>

                                    <h3 className="fd-mobile-service-title font-black leading-none text-white drop-shadow-[0_0_16px_rgba(255,255,255,0.08)]">
                                        What We Do
                                    </h3>

                                    <p className="fd-mobile-service-desc mt-1.5 text-white/58">
                                        Creative solutions that elevate your brand.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => scrollToSection('#services')}
                                    className="mb-1 flex shrink-0 items-center gap-1.5 rounded-xl border border-red-500/45 bg-black/55 px-[clamp(9px,2.8vw,13px)] py-[clamp(6px,2vw,9px)] text-[clamp(0.52rem,2.25vw,0.66rem)] font-extrabold text-white shadow-[0_0_18px_rgba(220,38,38,0.14)]"
                                >
                                    View All
                                    <svg className="h-[clamp(11px,3.2vw,15px)] w-[clamp(11px,3.2vw,15px)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-6-6l6 6-6 6" />
                                    </svg>
                                </button>
                            </div>

                            <div className="grid grid-cols-3 gap-2.5">
                                {hero.serviceCards.slice(0, 3).map((service, index) => (
                                    <div
                                        key={`${service.title}-mobile-${index}`}
                                        className="fd-mobile-service-card relative flex flex-col items-center justify-center overflow-hidden border border-red-500/25 bg-black/45 px-2 py-2.5 text-center shadow-[0_0_18px_rgba(220,38,38,0.08)]"
                                    >
                                        <div className="fd-mobile-service-icon mb-1.5 text-red-500 drop-shadow-[0_0_14px_rgba(239,68,68,0.75)]">
                                            {getServiceIcon(service.icon)}
                                        </div>

                                        <h4 className="fd-mobile-service-card-title font-black text-white">
                                            {service.title}
                                        </h4>

                                        <p className="fd-mobile-service-card-desc mt-1 text-white/55">
                                            {service.subtitle}
                                        </p>

                                        <div className="absolute bottom-0 left-1/2 h-[3px] w-8 -translate-x-1/2 rounded-t-full bg-red-500 shadow-[0_0_16px_rgba(239,68,68,0.9)]" />
                                    </div>
                                ))}
                            </div>
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

            <div className="fd-tablet-services relative z-20 mx-auto hidden max-w-5xl grid-cols-1 gap-3 px-8 pb-8 sm:grid sm:grid-cols-3 lg:hidden">
                {hero.serviceCards.slice(0, 3).map((service, index) => (
                    <div
                        key={`${service.title}-tablet-${index}`}
                        className="fd-tablet-service-card flex min-h-[76px] items-center gap-3 rounded-2xl border border-red-500/25 bg-slate-950/90 p-4 shadow-[0_0_18px_rgba(220,38,38,0.08)]"
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