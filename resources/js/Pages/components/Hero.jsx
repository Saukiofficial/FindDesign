import React, { useState, useEffect, useRef } from 'react';

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [isVisible, setIsVisible] = useState(false);
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

        // Hanya jalankan listener mouse di layar besar (Desktop)
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
                /* OPTIMASI KHUSUS iOS/iPad - Anti Glitch */
                @keyframes breathe {
                    0%, 100% {
                        transform: translate3d(0, 0, 0) scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: translate3d(0, 0, 0) scale(1.01);
                        opacity: 0.96;
                    }
                }

                .hero-image-animated {
                    animation: breathe 6s ease-in-out infinite;
                    /* Force Hardware Acceleration - iOS Specific */
                    transform: translate3d(0, 0, 0);
                    -webkit-transform: translate3d(0, 0, 0);
                    -webkit-backface-visibility: hidden;
                    backface-visibility: hidden;
                    -webkit-perspective: 1000px;
                    perspective: 1000px;
                    /* Hindari repainting */
                    will-change: transform, opacity;
                }

                /* Disable animasi untuk perangkat dengan reduced motion */
                @media (prefers-reduced-motion: reduce) {
                    .hero-image-animated,
                    .animate-bounce,
                    .animate-pulse {
                        animation: none !important;
                    }
                }

                /* iOS Safari Smooth Scrolling Fix */
                @supports (-webkit-overflow-scrolling: touch) {
                    .hero-image-animated {
                        -webkit-transform: translate3d(0, 0, 0);
                    }
                }
            `}</style>

            {/* Static Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-red-950/40 to-slate-950 z-0"></div>

            {/* Floating Orbs - iOS Optimized (Tanpa Blur di Mobile) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div
                    className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full bg-red-600/12 md:bg-red-600/20 md:blur-3xl transition-transform duration-700 ease-out"
                    style={{
                        top: `${mousePosition.y}%`,
                        left: `${mousePosition.x}%`,
                        transform: 'translate3d(-50%, -50%, 0)',
                        WebkitTransform: 'translate3d(-50%, -50%, 0)',
                    }}
                ></div>
            </div>

            {/* Grid Pattern - Lebih Ringan */}
            <div
                className="absolute inset-0 opacity-5 md:opacity-10 z-0 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    transform: 'translate3d(0, 0, 0)',
                }}
            ></div>

            {/* Content */}
            <div className={`relative z-10 text-center px-4 md:px-6 max-w-5xl transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
                {/* Image Container */}
                <div className="mb-6 relative min-h-[300px] flex items-center justify-center">
                    {/* Efek Glow - Tanpa Blur di Mobile */}
                    <div className="absolute inset-0 bg-red-500/8 md:bg-red-500/20 md:blur-3xl rounded-full scale-75 md:scale-90 pointer-events-none"></div>

                    <img
                        src="/images/img-hero-2.webp"
                        alt="Welcome to FindDesign"
                        width="800"
                        height="800"
                        fetchPriority="high"
                        loading="eager"
                        className="hero-image-animated relative max-w-full h-auto mx-auto object-contain z-10 drop-shadow-2xl"
                        style={{
                            maxHeight: '60vh',
                            transform: 'translate3d(0, 0, 0)',
                            WebkitTransform: 'translate3d(0, 0, 0)',
                        }}
                    />
                </div>

                {/* Badge - Tanpa Backdrop Blur di Mobile */}
                <div className="inline-block mb-6 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full md:backdrop-blur-md">
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
