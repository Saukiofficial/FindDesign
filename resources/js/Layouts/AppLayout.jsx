import React, { useState, useEffect } from 'react';

export default function AppLayout({ title, children }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-gradient-to-br from-slate-950 via-red-950 to-slate-950 text-gray-100 min-h-screen">
            <style>{`
                @keyframes pulse-glow {
                    0%, 100% {
                        filter: drop-shadow(0 0 30px rgba(220, 38, 38, 0.9)) drop-shadow(0 0 15px rgba(251, 146, 60, 0.8)) drop-shadow(0 4px 8px rgba(0,0,0,0.5));
                    }
                    50% {
                        filter: drop-shadow(0 0 45px rgba(220, 38, 38, 1)) drop-shadow(0 0 25px rgba(251, 146, 60, 1)) drop-shadow(0 0 15px rgba(255, 237, 213, 0.6)) drop-shadow(0 4px 8px rgba(0,0,0,0.5));
                    }
                }
                @keyframes pulse-bg {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 0.6;
                    }
                    50% {
                        transform: scale(1.2);
                        opacity: 0.8;
                    }
                }
            `}</style>

            {/* Navbar dengan Glassmorphism */}
            <header
                className={`fixed w-full top-0 z-50 transition-all duration-500 ${
                    scrolled
                        ? 'bg-slate-950/80 backdrop-blur-xl shadow-2xl shadow-red-500/10'
                        : 'bg-transparent'
                }`}
            >
                <nav className="container mx-auto px-6 py-6 flex items-center justify-between relative">
                    {/* Logo & Brand - Left Side */}
                    <div className="flex items-center gap-4">
                        {/* Logo dengan efek menyala */}
                        <div className="relative">
                            <img
                                src="/images/logo.png"
                                alt="FindDesign Logo"
                                className="w-16 h-16 md:w-20 md:h-20 object-contain transition-all duration-500 hover:scale-110 hover:rotate-6 relative z-10"
                                style={{
                                    filter: 'drop-shadow(0 0 30px rgba(220, 38, 38, 0.9)) drop-shadow(0 0 15px rgba(251, 146, 60, 0.8)) drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
                                    animation: 'pulse-glow 2s ease-in-out infinite'
                                }}
                            />
                            {/* Efek cahaya background */}
                            <div
                                className="absolute inset-0 rounded-full blur-2xl opacity-60"
                                style={{
                                    background: 'radial-gradient(circle, rgba(220, 38, 38, 0.6) 0%, rgba(251, 146, 60, 0.4) 50%, transparent 70%)',
                                    animation: 'pulse-bg 2s ease-in-out infinite'
                                }}
                            ></div>
                        </div>

                        {/* Brand Text */}
                        <div className="text-2xl md:text-3xl font-black tracking-wider"
                             style={{
                                 textShadow: '0 1px 0 #b91c1c, 0 2px 0 #991b1b, 0 3px 0 #7f1d1d, 0 4px 0 #5f1515, 0 5px 0 #4a1010, 0 6px 10px rgba(0,0,0,.5), 0 10px 20px rgba(220,38,38,.4)',
                                 background: 'linear-gradient(180deg, #fca5a5 0%, #dc2626 50%, #7f1d1d 100%)',
                                 WebkitBackgroundClip: 'text',
                                 WebkitTextFillColor: 'transparent',
                                 backgroundClip: 'text',
                                 filter: 'drop-shadow(0 0 20px rgba(220, 38, 38, 0.5))'
                             }}>
                            FindDesign
                        </div>
                    </div>

                    {/* Desktop Menu - Centered */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 space-x-10">
                        {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item, i) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="relative group text-base font-bold tracking-widest uppercase text-white/90 hover:text-red-400 transition-all duration-300 transform hover:scale-110"
                                style={{
                                    animationDelay: `${i * 100}ms`,
                                    textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 1px 0 rgba(220,38,38,0.4), 0 4px 8px rgba(0,0,0,0.3)'
                                }}
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-red-500 to-red-600 group-hover:w-full transition-all duration-300 shadow-lg shadow-red-500/50"></span>
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button - Right Side */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-2 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                        <div className="w-6 h-5 flex flex-col justify-between">
                            <span className={`w-full h-0.5 bg-red-500 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                            <span className={`w-full h-0.5 bg-red-500 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`w-full h-0.5 bg-red-500 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                        </div>
                    </button>
                </nav>

                {/* Mobile Menu */}
                <div className={`md:hidden overflow-hidden transition-all duration-500 ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-slate-900/95 backdrop-blur-xl px-6 py-4 space-y-4">
                        {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="block text-xl font-bold text-white/90 hover:text-red-400 hover:translate-x-2 transition-all duration-300"
                                style={{
                                    textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 1px 0 rgba(220,38,38,0.3)'
                                }}
                                onClick={() => setMenuOpen(false)}
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-32">
                {children}
            </main>

            {/* Footer Modern */}
            <footer className="relative bg-gradient-to-t from-slate-950 to-red-950/30 py-12 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-1/4 w-64 h-64 bg-red-600 rounded-full filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-red-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="container mx-auto px-6 relative">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        {/* Brand */}
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

                        {/* Quick Links */}
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

                        {/* Social */}
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

                    {/* Copyright */}
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
