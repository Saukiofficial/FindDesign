import React, { useState, useEffect } from 'react';

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* FIX: Menggunakan tag style standar.
               Jika Anda menggunakan Vite/Inertia biasa, 'jsx' attribute mungkin tidak diproses.
            */}
            <style>{`
                @keyframes glow-pulse {
                    0%, 100% {
                        filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.3))
                                drop-shadow(0 0 20px rgba(239, 68, 68, 0.2))
                                drop-shadow(0 0 30px rgba(239, 68, 68, 0.1));
                        transform: scale(1);
                    }
                    50% {
                        filter: drop-shadow(0 0 20px rgba(239, 68, 68, 0.6))
                                drop-shadow(0 0 40px rgba(239, 68, 68, 0.4))
                                drop-shadow(0 0 60px rgba(239, 68, 68, 0.2));
                        transform: scale(1.02);
                    }
                }

                .hero-image-animated {
                    animation: glow-pulse 3s ease-in-out infinite;
                    /* Hardware acceleration untuk iOS agar animasi mulus */
                    transform: translateZ(0);
                    -webkit-transform: translateZ(0);
                    backface-visibility: hidden;
                }
            `}</style>

            {/* Animated Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-red-950 to-slate-950">
                {/* Floating Orbs */}
                <div
                    className="absolute w-96 h-96 rounded-full bg-red-600/30 filter blur-3xl animate-pulse"
                    style={{
                        top: `${mousePosition.y}%`,
                        left: `${mousePosition.x}%`,
                        transform: 'translate(-50%, -50%)',
                        transition: 'top 0.5s ease-out, left 0.5s ease-out',
                        willChange: 'top, left' /* Optimasi performa render */
                    }}
                ></div>
                <div
                    className="absolute w-96 h-96 rounded-full bg-red-500/30 filter blur-3xl animate-pulse"
                    style={{
                        top: `${100 - mousePosition.y}%`,
                        left: `${100 - mousePosition.x}%`,
                        transform: 'translate(-50%, -50%)',
                        transition: 'top 0.5s ease-out, left 0.5s ease-out',
                        animationDelay: '1s',
                        willChange: 'top, left'
                    }}
                ></div>

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
                                        linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}
                ></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-red-500 rounded-full animate-pulse"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`
                        }}
                    ></div>
                ))}
            </div>

            {/* Content */}
            <div className={`relative z-10 text-center px-6 max-w-5xl transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
                {/* Main Heading - Hero Image with Glow Animation */}
                {/* FIX: Menambahkan min-h-[300px] atau aspect-ratio pada container
                    untuk mencegah layout collapse saat gambar belum muncul.
                */}
                <div className="mb-6 relative min-h-[300px] flex items-center justify-center">
                    {/* FIX UTAMA: Menambahkan width dan height.
                        Ganti 800 dan 800 dengan ukuran ASLI gambar Anda.
                    */}
                    <img
                        src="/images/img-hero-2.webp"
                        alt="Welcome to FindDesign"
                        width="800"
                        height="800"
                        fetchPriority="high" // Prioritas load tinggi untuk Hero image
                        className="hero-image-animated max-w-full h-auto mx-auto object-contain"
                        style={{ maxHeight: '700px' }}
                    />
                </div>

                {/* Description */}
                <div className="inline-block mb-6 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full backdrop-blur-sm">
                    <span className="text-red-400 text-sm font-medium tracking-wider">ILLUSTRATION & DIGITAL ART</span>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-red-400 rounded-full flex items-start justify-center p-2">
                    <div className="w-1 h-2 bg-red-400 rounded-full animate-pulse"></div>
                </div>
            </div>
        </section>
    );
}
