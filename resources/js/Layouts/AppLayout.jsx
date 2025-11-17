import React, { useState, useEffect } from 'react';

export default function AppLayout({ title, children }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = ['Home', 'About', 'Services', 'Portfolio', 'Contact'];

    return (
        <div className="bg-gradient-to-br from-slate-950 via-red-950 to-slate-950 text-gray-100 min-h-screen">
            <style>{`
                @keyframes logo-pulse {
                    0%, 100% {
                        filter: drop-shadow(0 0 20px rgba(220, 38, 38, 0.8))
                                drop-shadow(0 0 40px rgba(251, 146, 60, 0.6));
                    }
                    50% {
                        filter: drop-shadow(0 0 35px rgba(220, 38, 38, 1))
                                drop-shadow(0 0 60px rgba(251, 146, 60, 0.9))
                                drop-shadow(0 0 80px rgba(255, 237, 213, 0.4));
                    }
                }

                @keyframes glow-ring {
                    0%, 100% {
                        transform: scale(1) rotate(0deg);
                        opacity: 0.5;
                    }
                    50% {
                        transform: scale(1.3) rotate(180deg);
                        opacity: 0.8;
                    }
                }

                @keyframes slide-in {
                    from {
                        transform: translateY(-100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                @keyframes menu-item-fade {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                .nav-item {
                    position: relative;
                    overflow: hidden;
                }

                .nav-item::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.3), transparent);
                    transition: left 0.5s;
                }

                .nav-item:hover::before {
                    left: 100%;
                }

                .hamburger-line {
                    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }

                .mobile-menu-item {
                    animation: menu-item-fade 0.5s ease-out forwards;
                }

                .navbar-enter {
                    animation: slide-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
            `}</style>

            {/* Premium Navbar */}
            <header
                className={`navbar-enter fixed w-full top-0 z-50 transition-all duration-700 ${
                    scrolled
                        ? 'bg-slate-950/70 backdrop-blur-2xl shadow-2xl shadow-red-500/20 border-b border-red-500/10'
                        : 'bg-gradient-to-b from-slate-950/50 to-transparent backdrop-blur-sm'
                }`}
            >
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-5">
                    <div className="flex items-center justify-between">
                        {/* Logo Section - Enhanced with Premium Effects */}
                        <div className="flex items-center gap-3 sm:gap-4 z-50" style={{ animation: 'float 3s ease-in-out infinite' }}>
                            {/* Logo Container */}
                            <div className="relative group">
                                {/* Animated Ring Background */}
                                <div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        background: 'conic-gradient(from 0deg, #dc2626, #fb923c, #fef3c7, #fb923c, #dc2626)',
                                        animation: 'glow-ring 3s linear infinite',
                                        padding: '3px'
                                    }}
                                >
                                    <div className="w-full h-full bg-slate-950 rounded-full"></div>
                                </div>

                                {/* Logo Image */}
                                <img
                                    src="/images/logo.png"
                                    alt="FindDesign"
                                    className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 cursor-pointer"
                                    style={{
                                        animation: 'logo-pulse 2.5s ease-in-out infinite',
                                    }}
                                />

                                {/* Glow Effect */}
                                <div
                                    className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: 'radial-gradient(circle, rgba(220, 38, 38, 0.8) 0%, rgba(251, 146, 60, 0.5) 50%, transparent 70%)',
                                    }}
                                ></div>
                            </div>

                            {/* Brand Text */}
                            <div className="flex flex-col">
                                <span
                                    className="text-xl sm:text-2xl lg:text-3xl font-black tracking-wider transition-all duration-300 hover:tracking-widest cursor-pointer"
                                    style={{
                                        textShadow: '0 2px 0 #b91c1c, 0 4px 0 #991b1b, 0 6px 0 #7f1d1d, 0 8px 15px rgba(0,0,0,.6), 0 12px 25px rgba(220,38,38,.5)',
                                        background: 'linear-gradient(180deg, #fef3c7 0%, #fca5a5 20%, #dc2626 60%, #7f1d1d 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        filter: 'drop-shadow(0 0 25px rgba(220, 38, 38, 0.6))'
                                    }}
                                >
                                    FindDesign
                                </span>
                                <span className="text-[10px] sm:text-xs text-red-400/80 font-semibold tracking-widest uppercase mt-0.5">
                                    Creative Studio
                                </span>
                            </div>
                        </div>

                        {/* Desktop Navigation - Optimized for Tablet & Desktop */}
                        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
                            {navItems.map((item, i) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={() => setActiveSection(item.toLowerCase())}
                                    className={`nav-item relative px-4 xl:px-6 py-2.5 text-sm xl:text-base font-bold tracking-wider uppercase transition-all duration-300 rounded-lg group ${
                                        activeSection === item.toLowerCase()
                                            ? 'text-white bg-gradient-to-r from-red-600 to-red-500 shadow-lg shadow-red-500/50'
                                            : 'text-white/80 hover:text-white hover:bg-red-500/10'
                                    }`}
                                    style={{
                                        animationDelay: `${i * 100}ms`,
                                        textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                                    }}
                                >
                                    {/* Hover Line Effect */}
                                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-red-500 via-red-400 to-red-500 transition-all duration-300 ${
                                        activeSection === item.toLowerCase() ? 'w-full' : 'w-0 group-hover:w-full'
                                    }`}></span>

                                    {/* Shine Effect */}
                                    <span className="relative z-10">{item}</span>

                                    {/* Active Indicator */}
                                    {activeSection === item.toLowerCase() && (
                                        <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></span>
                                    )}
                                </a>
                            ))}

                            {/* CTA Button */}
                            <button className="ml-2 xl:ml-4 px-5 xl:px-7 py-2.5 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white font-bold rounded-full shadow-lg shadow-red-500/50 hover:shadow-2xl hover:shadow-red-500/70 hover:scale-105 transition-all duration-300 text-sm xl:text-base tracking-wide uppercase relative overflow-hidden group">
                                <span className="relative z-10">Get Started</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </div>

                        {/* Tablet Navigation (md to lg) */}
                        <div className="hidden md:flex lg:hidden items-center gap-1">
                            {navItems.slice(0, 3).map((item, i) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={() => setActiveSection(item.toLowerCase())}
                                    className={`nav-item px-3 py-2 text-xs font-bold tracking-wider uppercase transition-all duration-300 rounded-lg ${
                                        activeSection === item.toLowerCase()
                                            ? 'text-white bg-gradient-to-r from-red-600 to-red-500 shadow-lg shadow-red-500/50'
                                            : 'text-white/80 hover:text-white hover:bg-red-500/10'
                                    }`}
                                >
                                    {item}
                                </a>
                            ))}
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="ml-2 p-2.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-all duration-300"
                            >
                                <div className="w-5 h-4 flex flex-col justify-between">
                                    <span className={`hamburger-line w-full h-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                                    <span className={`hamburger-line w-full h-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full ${menuOpen ? 'opacity-0' : ''}`}></span>
                                    <span className={`hamburger-line w-full h-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                                </div>
                            </button>
                        </div>

                        {/* Mobile Hamburger Menu */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 transition-all duration-300 hover:scale-110 active:scale-95"
                        >
                            <div className="w-6 h-5 flex flex-col justify-between">
                                <span className={`hamburger-line w-full h-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-lg shadow-red-500/50 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                                <span className={`hamburger-line w-full h-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-lg shadow-red-500/50 ${menuOpen ? 'opacity-0 scale-0' : ''}`}></span>
                                <span className={`hamburger-line w-full h-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-lg shadow-red-500/50 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                            </div>
                        </button>
                    </div>
                </nav>

                {/* Premium Mobile/Tablet Menu */}
                <div className={`md:lg:hidden overflow-hidden transition-all duration-700 ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-gradient-to-b from-slate-900/98 to-slate-950/98 backdrop-blur-2xl border-t border-red-500/20 shadow-2xl">
                        <div className="container mx-auto px-6 py-6 space-y-2">
                            {navItems.map((item, i) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={() => {
                                        setActiveSection(item.toLowerCase());
                                        setMenuOpen(false);
                                    }}
                                    className={`mobile-menu-item block px-6 py-4 text-lg font-bold rounded-xl transition-all duration-300 ${
                                        activeSection === item.toLowerCase()
                                            ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/50 scale-105'
                                            : 'text-white/80 hover:text-white hover:bg-red-500/10 hover:translate-x-2'
                                    }`}
                                    style={{
                                        animationDelay: `${i * 100}ms`,
                                        textShadow: '0 2px 8px rgba(0,0,0,0.8)'
                                    }}
                                >
                                    <span className="flex items-center justify-between">
                                        {item}
                                        <span className="text-red-400">→</span>
                                    </span>
                                </a>
                            ))}

                            {/* Mobile CTA */}
                            <button className="w-full mt-4 px-6 py-4 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white font-bold rounded-xl shadow-lg shadow-red-500/50 hover:shadow-2xl hover:shadow-red-500/70 hover:scale-105 transition-all duration-300 text-base tracking-wide uppercase">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Floating Social Media Buttons */}
            <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
                {/* WhatsApp Button */}
                <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-lg shadow-green-500/50 hover:shadow-2xl hover:shadow-green-500/70 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
                    title="Chat on WhatsApp"
                >
                    {/* WhatsApp Icon */}
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>

                    {/* Pulse Animation */}
                    <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>

                    {/* Tooltip */}
                    <span className="absolute right-full mr-3 px-3 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-xl">
                        Chat WhatsApp
                    </span>
                </a>

                {/* Instagram Button */}
                <a
                    href="https://instagram.com/finddesign"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-14 h-14 bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 rounded-full shadow-lg shadow-pink-500/50 hover:shadow-2xl hover:shadow-pink-500/70 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
                    title="Follow on Instagram"
                >
                    {/* Instagram Icon */}
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>

                    {/* Pulse Animation */}
                    <span className="absolute inset-0 rounded-full bg-pink-500 animate-ping opacity-75" style={{ animationDelay: '0.3s' }}></span>

                    {/* Tooltip */}
                    <span className="absolute right-full mr-3 px-3 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-xl">
                        Follow Instagram
                    </span>
                </a>
            </div>

            {/* Main Content */}
            <main className="pt-32">
                {children}
            </main>

            {/* Footer Modern */}
            <footer className="relative bg-gradient-to-t from-slate-950 to-red-950/30 py-12 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-1/4 w-64 h-64 bg-red-600 rounded-full filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-red-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="container mx-auto px-6 relative">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div className="md:col-span-2">
                            <h3 className="text-3xl font-black mb-4"
                                style={{
                                    textShadow: '0 1px 0 #b91c1c, 0 2px 0 #991b1b, 0 3px 0 #7f1d1d, 0 4px 5px rgba(0,0,0,.5)',
                                    background: 'linear-gradient(180deg, #fca5a5 0%, #dc2626 50%, #7f1d1d 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>
                                FindDesign
                            </h3>
                            <p className="text-white/70 max-w-md">
                                Creating stunning illustrations and digital art that bring your vision to life.
                                We transform ideas into visual masterpieces.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4 text-red-400">Quick Links</h4>
                            <div className="space-y-2">
                                {['About', 'Services', 'Portfolio', 'Contact'].map((link) => (
                                    <a
                                        key={link}
                                        href={`#${link.toLowerCase()}`}
                                        className="block text-white/70 hover:text-red-400 hover:translate-x-1 transition-all duration-300"
                                    >
                                        {link}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4 text-red-400">Follow Us</h4>
                            <div className="flex space-x-4">
                                {['Instagram', 'Twitter', 'Behance'].map((social) => (
                                    <a
                                        key={social}
                                        href="#"
                                        className="w-10 h-10 rounded-full bg-slate-800 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
                                        title={social}
                                    >
                                        <span className="text-xs text-white">{social[0]}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-slate-800 pt-8 text-center">
                        <p className="text-white/60 text-sm">
                            &copy; {new Date().getFullYear()} FindDesign. All rights reserved. Crafted with passion.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
