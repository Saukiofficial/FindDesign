import React, { useState, useEffect, useRef } from 'react';

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 }); // Default tengah
    const [isVisible, setIsVisible] = useState(false);

    // Gunakan requestAnimationFrame agar event mouse tidak bikin lag/crash
    const requestRef = useRef();

    useEffect(() => {
        setIsVisible(true);

        const handleMouseMove = (e) => {
            if (requestRef.current) return;

            requestRef.current = requestAnimationFrame(() => {
                setMousePosition({
                    x: (e.clientX / window.innerWidth) * 100,
                    y: (e.clientY / window.innerHeight) * 100
                });
                requestRef.current = null;
            });
        };

        // Hanya jalankan listener mouse di layar besar (Desktop) untuk hemat baterai HP
        if (window.matchMedia("(min-width: 768px)").matches) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (window.matchMedia("(min-width: 768px)").matches) {
                window.removeEventListener('mousemove', handleMouseMove);
            }
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
            <style>{`
                /* PERBAIKAN CRASH IPHONE:
                   Saya menghapus animasi 'filter: drop-shadow' yang berat.
                   Sebagai gantinya, kita gunakan animasi scale & opacity yang ringan.
                */
                @keyframes breathe {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.02); opacity: 0.9; }
                }

                .hero-image-animated {
                    animation: breathe 4s ease-in-out infinite;
                    /* Hardware Acceleration untuk iOS */
                    transform: translateZ(0);
                    -webkit-transform: translateZ(0);
                    will-change: transform;
                }
            `}</style>

            {/* Static Background Gradient (Lebih Ringan) */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-red-950/40 to-slate-950 z-0"></div>

            {/* Floating Orbs - Disederhanakan untuk Mobile */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div
                    className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full bg-red-600/20 blur-3xl transition-transform duration-700 ease-out"
                    style={{
                        top: `${mousePosition.y}%`,
                        left: `${mousePosition.x}%`,
                        transform: 'translate(-50%, -50%)',
                    }}
                ></div>
            </div>

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-10 z-0 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            ></div>

            {/* Content */}
            <div className={`relative z-10 text-center px-4 md:px-6 max-w-5xl transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
                {/* Image Container */}
                <div className="mb-6 relative min-h-[300px] flex items-center justify-center">
                    {/* Efek Glow Statis (Pengganti animasi berat) */}
                    <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full scale-75 md:scale-90 pointer-events-none"></div>

                    <img
                        src="/images/img-hero-2.webp"
                        alt="Welcome to FindDesign"
                        width="800"
                        height="800"
                        fetchPriority="high"
                        className="hero-image-animated relative max-w-full h-auto mx-auto object-contain z-10 drop-shadow-2xl"
                        style={{ maxHeight: '60vh' }}
                    />
                </div>

                {/* Badge */}
                <div className="inline-block mb-6 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full backdrop-blur-md">
                    <span className="text-red-400 text-xs md:text-sm font-medium tracking-wider">ILLUSTRATION & DIGITAL ART</span>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
                <div className="w-5 h-9 border-2 border-red-400/50 rounded-full flex items-start justify-center p-1.5">
                    <div className="w-1 h-1.5 bg-red-400 rounded-full animate-pulse"></div>
                </div>
            </div>
        </section>
    );
}
