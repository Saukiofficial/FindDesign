import React, { useEffect, useMemo, useState } from 'react';

export default function AppLayout({ title, children, heroSetting = null }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    const brand = useMemo(() => {
        return {
            logoImage: heroSetting?.logo_image_url || '/images/logo-2.webp',
            brandImage: heroSetting?.brand_image_url || null,
            name: 'FiindDesign',
            subtitle: 'Creative Studio',
        };
    }, [heroSetting]);

    const navItems = [
        { label: 'Home', href: '#home', id: 'home' },
        { label: 'About', href: '#about', id: 'about' },
        { label: 'Services', href: '#services', id: 'services' },
        { label: 'Portfolio', href: '#portfolio', id: 'portfolio' },
        { label: 'Contact', href: '#contact', id: 'contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 24);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const sections = navItems
            .map((item) => document.getElementById(item.id))
            .filter(Boolean);

        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntry = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (visibleEntry?.target?.id) {
                    setActiveSection(visibleEntry.target.id);
                }
            },
            {
                root: null,
                threshold: [0.25, 0.4, 0.55],
                rootMargin: '-20% 0px -55% 0px',
            }
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const handleNavClick = (event, href, id) => {
        event.preventDefault();

        setActiveSection(id);
        setMenuOpen(false);

        const target = document.querySelector(href);

        if (target) {
            target.scrollIntoView({
                behavior: window.innerWidth < 768 ? 'auto' : 'smooth',
                block: 'start',
            });
        }
    };

    return (
        <div className="min-h-screen bg-black text-gray-100">
            <style>{`
                @keyframes navEntrance {
                    from {
                        opacity: 0;
                        transform: translate3d(0, -22px, 0);
                    }
                    to {
                        opacity: 1;
                        transform: translate3d(0, 0, 0);
                    }
                }

                @keyframes navGlow {
                    0%, 100% {
                        box-shadow:
                            0 0 0 1px rgba(239, 68, 68, 0.22),
                            0 18px 70px rgba(220, 38, 38, 0.14);
                    }
                    50% {
                        box-shadow:
                            0 0 0 1px rgba(239, 68, 68, 0.38),
                            0 20px 90px rgba(220, 38, 38, 0.22);
                    }
                }

                @keyframes navDotPulse {
                    0%, 100% {
                        opacity: 0.65;
                        transform: translateX(-50%) scale(1);
                    }
                    50% {
                        opacity: 1;
                        transform: translateX(-50%) scale(1.25);
                    }
                }

                .fd-navbar {
                    animation: navEntrance 0.7s ease-out both, navGlow 5s ease-in-out infinite;
                }

                .fd-active-dot {
                    animation: navDotPulse 1.8s ease-in-out infinite;
                }

                @media (max-width: 768px) {
                    .fd-navbar {
                        animation: navEntrance 0.45s ease-out both !important;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .fd-navbar,
                    .fd-active-dot {
                        animation: none !important;
                    }
                }
            `}</style>

            {/* NAVBAR */}
            <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8 lg:pt-7">
                <nav
                    className={`fd-navbar mx-auto flex max-w-[1780px] items-center justify-between rounded-[1.6rem] border px-5 py-4 transition-all duration-500 sm:px-7 lg:px-10 ${
                        scrolled
                            ? 'border-red-500/25 bg-black/82 shadow-[0_18px_70px_rgba(220,38,38,0.18)] backdrop-blur-xl'
                            : 'border-red-500/20 bg-black/58 shadow-[0_18px_70px_rgba(220,38,38,0.14)] backdrop-blur-xl'
                    }`}
                >
                    {/* LEFT BRAND */}
                    <a
                        href="#home"
                        onClick={(event) => handleNavClick(event, '#home', 'home')}
                        className="group flex min-w-0 items-center gap-4"
                    >
                        <div className="relative flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full border border-red-500/35 bg-black/60 shadow-[0_0_30px_rgba(220,38,38,0.24)] sm:h-[74px] sm:w-[74px]">
                            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-red-500/20 via-transparent to-orange-500/10" />

                            <img
                                src={brand.logoImage}
                                alt="Fiind Design Logo"
                                loading="eager"
                                decoding="async"
                                className="relative z-10 h-[52px] w-[52px] rounded-full object-contain transition-transform duration-300 group-hover:scale-105 sm:h-[60px] sm:w-[60px]"
                                onError={(event) => {
                                    event.currentTarget.style.display = 'none';
                                }}
                            />
                        </div>

                        <div className="hidden min-w-0 sm:block">
                            {brand.brandImage ? (
                                <img
                                    src={brand.brandImage}
                                    alt="Fiind Design"
                                    loading="eager"
                                    decoding="async"
                                    className="max-h-[42px] max-w-[250px] object-contain object-left"
                                    onError={(event) => {
                                        event.currentTarget.style.display = 'none';
                                    }}
                                />
                            ) : (
                                <>
                                    <div className="flex items-center text-[1.65rem] font-black leading-none tracking-tight lg:text-[2rem]">
                                        <span className="text-white drop-shadow-[0_0_16px_rgba(255,255,255,0.16)]">
                                            Fiind
                                        </span>
                                        <span className="ml-1 bg-gradient-to-b from-red-400 to-red-700 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(220,38,38,0.45)]">
                                            Design
                                        </span>
                                    </div>

                                    <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.44em] text-white/55">
                                        {brand.subtitle}
                                    </p>
                                </>
                            )}
                        </div>
                    </a>

                    {/* DESKTOP MENU */}
                    <div className="hidden items-center gap-10 lg:flex">
                        {navItems.map((item) => {
                            const isActive = activeSection === item.id;

                            return (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    onClick={(event) => handleNavClick(event, item.href, item.id)}
                                    className={`group relative px-1 py-4 text-[0.98rem] font-semibold transition-colors duration-300 ${
                                        isActive ? 'text-red-400' : 'text-white/72 hover:text-white'
                                    }`}
                                >
                                    <span>{item.label}</span>

                                    {isActive && (
                                        <>
                                            <span className="fd-active-dot absolute left-1/2 top-[3.05rem] h-2 w-2 -translate-x-1/2 rounded-full bg-red-500 shadow-[0_0_18px_rgba(239,68,68,0.95)]" />
                                            <span className="absolute -bottom-[1.58rem] left-1/2 h-[4px] w-12 -translate-x-1/2 rounded-t-full bg-red-500 shadow-[0_0_24px_rgba(239,68,68,0.95)]" />
                                        </>
                                    )}
                                </a>
                            );
                        })}
                    </div>

                    {/* CTA DESKTOP */}
                    <button
                        type="button"
                        onClick={(event) => handleNavClick(event, '#contact', 'contact')}
                        className="group relative hidden min-w-[210px] items-center justify-center gap-4 overflow-hidden rounded-xl border border-red-400/50 bg-gradient-to-br from-red-950/80 via-red-900/70 to-red-600/35 px-8 py-4 text-base font-extrabold text-white shadow-[0_0_34px_rgba(220,38,38,0.30)] transition-all duration-300 hover:-translate-y-0.5 hover:border-red-300 hover:shadow-[0_0_45px_rgba(220,38,38,0.48)] lg:inline-flex"
                    >
                        <span className="relative z-10">Get Started</span>

                        <svg
                            className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 17L17 7M17 7H9M17 7v8"
                            />
                        </svg>

                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </button>

                    {/* MOBILE BUTTON */}
                    <button
                        type="button"
                        onClick={() => setMenuOpen((value) => !value)}
                        className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-white shadow-[0_0_22px_rgba(220,38,38,0.16)] transition hover:bg-red-500/20 lg:hidden"
                        aria-label="Toggle menu"
                    >
                        <div className="flex h-5 w-6 flex-col justify-between">
                            <span
                                className={`h-0.5 w-full rounded-full bg-red-400 transition-all duration-300 ${
                                    menuOpen ? 'translate-y-2 rotate-45' : ''
                                }`}
                            />
                            <span
                                className={`h-0.5 w-full rounded-full bg-red-400 transition-all duration-300 ${
                                    menuOpen ? 'opacity-0' : ''
                                }`}
                            />
                            <span
                                className={`h-0.5 w-full rounded-full bg-red-400 transition-all duration-300 ${
                                    menuOpen ? '-translate-y-2 -rotate-45' : ''
                                }`}
                            />
                        </div>
                    </button>
                </nav>

                {/* MOBILE MENU */}
                <div
                    className={`mx-auto mt-3 max-w-[1780px] overflow-hidden rounded-2xl border border-red-500/20 bg-black/90 shadow-[0_20px_70px_rgba(220,38,38,0.18)] backdrop-blur-xl transition-all duration-500 lg:hidden ${
                        menuOpen ? 'max-h-[560px] opacity-100' : 'max-h-0 border-transparent opacity-0'
                    }`}
                >
                    <div className="space-y-2 p-4">
                        {navItems.map((item) => {
                            const isActive = activeSection === item.id;

                            return (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    onClick={(event) => handleNavClick(event, item.href, item.id)}
                                    className={`flex items-center justify-between rounded-xl px-5 py-4 text-sm font-bold uppercase tracking-wider transition-all ${
                                        isActive
                                            ? 'bg-red-600 text-white shadow-[0_0_24px_rgba(220,38,38,0.35)]'
                                            : 'bg-white/[0.035] text-white/72 hover:bg-red-500/12 hover:text-white'
                                    }`}
                                >
                                    <span>{item.label}</span>
                                    <span className="text-red-300">→</span>
                                </a>
                            );
                        })}

                        <button
                            type="button"
                            onClick={(event) => handleNavClick(event, '#contact', 'contact')}
                            className="mt-3 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 px-5 py-4 text-sm font-extrabold uppercase tracking-wider text-white shadow-[0_0_28px_rgba(220,38,38,0.35)]"
                        >
                            Get Started
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7 17L17 7M17 7H9M17 7v8"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* SOCIAL FLOATING BUTTONS */}
            <div className="fixed bottom-6 right-6 z-40 hidden flex-col gap-4 sm:flex">
                <a
                    href="https://wa.me/6285259281373"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/40 transition-all duration-300 hover:scale-110 hover:shadow-green-500/70"
                    title="Chat on WhatsApp"
                >
                    <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                </a>

                <a
                    href="https://instagram.com/Find_designn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 text-white shadow-lg shadow-pink-500/40 transition-all duration-300 hover:scale-110 hover:shadow-pink-500/70"
                    title="Follow on Instagram"
                >
                    <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4z" />
                    </svg>
                </a>
            </div>

            {/* MAIN CONTENT */}
            <main>{children}</main>

            {/* FOOTER */}
            <footer className="relative overflow-hidden bg-gradient-to-t from-slate-950 to-red-950/30 py-12">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-red-600 blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-red-500 blur-3xl" />
                </div>

                <div className="container relative mx-auto px-6">
                    <div className="mb-8 grid gap-8 md:grid-cols-4">
                        <div className="md:col-span-2">
                            <h3 className="mb-4 text-3xl font-black">
                                <span className="text-white">Fiind</span>
                                <span className="text-red-500">Design</span>
                            </h3>
                            <p className="max-w-md text-white/70">
                                Creating stunning illustrations and digital art that bring your vision to life.
                                We transform ideas into visual masterpieces.
                            </p>
                        </div>

                        <div>
                            <h4 className="mb-4 text-lg font-semibold text-red-400">
                                Quick Links
                            </h4>
                            <div className="space-y-2">
                                {navItems.slice(1).map((link) => (
                                    <a
                                        key={link.id}
                                        href={link.href}
                                        onClick={(event) => handleNavClick(event, link.href, link.id)}
                                        className="block text-white/70 transition-all duration-300 hover:translate-x-1 hover:text-red-400"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="mb-4 text-lg font-semibold text-red-400">
                                Follow Us
                            </h4>
                            <div className="flex space-x-4">
                                {['Instagram', 'Twitter', 'Behance'].map((social) => (
                                    <a
                                        key={social}
                                        href="#"
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition-all duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500"
                                        title={social}
                                    >
                                        <span className="text-xs text-white">
                                            {social[0]}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-slate-800 pt-8 text-center">
                        <p className="text-sm text-white/60">
                            &copy; {new Date().getFullYear()} FiindDesign. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}