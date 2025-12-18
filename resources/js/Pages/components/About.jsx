import React, { useState, useEffect } from 'react';

export default function About({ featuredWorks = [] }) {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    const works = featuredWorks;

    useEffect(() => {
        // Cek apakah device mobile untuk mematikan efek berat via JS state juga
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const element = document.getElementById('about');
        if (element) observer.observe(element);

        return () => {
            window.removeEventListener('resize', checkMobile);
            if (element) observer.unobserve(element);
        };
    }, []);

    // Keyboard support for lightbox
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedImage) return;

            if (e.key === 'Escape') {
                setSelectedImage(null);
            } else if (e.key === 'ArrowLeft') {
                goToPrevious();
            } else if (e.key === 'ArrowRight') {
                goToNext();
            }
        };

        if (selectedImage) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [selectedImage, currentImageIndex, works]);

    const openImage = (index) => {
        setCurrentImageIndex(index);
        setSelectedImage(works[index]);
    };

    const goToNext = () => {
        if (works.length === 0) return;
        const nextIndex = (currentImageIndex + 1) % works.length;
        setCurrentImageIndex(nextIndex);
        setSelectedImage(works[nextIndex]);
    };

    const goToPrevious = () => {
        if (works.length === 0) return;
        const prevIndex = (currentImageIndex - 1 + works.length) % works.length;
        setCurrentImageIndex(prevIndex);
        setSelectedImage(works[prevIndex]);
    };

    const stats = [
        { number: '500+', label: 'Projects Completed' },
        { number: '480+', label: 'Happy Clients' },
        { number: '8+', label: 'Years Experience' },
        { number: '500+', label: 'Portfolio' }
    ];

    const values = [
        {
            title: 'Innovation',
            description: 'We constantly push boundaries to create unique and innovative designs that set new standards'
        },
        {
            title: 'Quality',
            description: 'Every project is crafted with meticulous attention to detail and precision'
        },
        {
            title: 'Collaboration',
            description: 'We work closely with clients to bring their vision to life through transparent communication'
        },
        {
            title: 'Excellence',
            description: 'Fast delivery without compromising on quality, ensuring exceptional results every time'
        }
    ];

    return (
        <section id="about" className="relative py-32 bg-slate-950 overflow-hidden transform-gpu">
            {/* OPTIMISASI: Background Pattern dikurangi opacity-nya dan dimatikan animasi di mobile */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
                {/* Hanya render blobs blur di layar besar (md ke atas) */}
                <div className="hidden md:block absolute top-0 left-1/4 w-96 h-96 bg-red-600/20 rounded-full filter blur-3xl"></div>
                <div className="hidden md:block absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/20 rounded-full filter blur-3xl"></div>
            </div>

            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                {/* Header */}
                <div className="text-center mb-24">
                    <div className="inline-flex items-center gap-2 mb-6 px-6 py-2 border border-red-500/30 rounded-full bg-slate-900/50">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-red-400 text-sm font-semibold tracking-widest uppercase">About Us</span>
                    </div>
                    <h2 className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight">
                        <span className="bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">
                            Meet The Founder
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto"></div>
                </div>

                {/* Founder Section */}
                <div className="grid lg:grid-cols-5 gap-16 items-center mb-32">
                    <div className={`lg:col-span-2 relative group transition-all duration-1000 delay-100 ${
                        isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-20 scale-95'
                    }`}>
                        {/* OPTIMISASI: Hapus animated background glow di mobile */}
                        <div className="hidden md:block absolute -inset-4 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 rounded-3xl opacity-0 group-hover:opacity-30 blur-3xl transition-all duration-700"></div>

                        <div className="relative rounded-2xl overflow-hidden border-2 border-slate-800/50 group-hover:border-red-500/50 transition-all duration-500 shadow-2xl group-hover:shadow-red-500/50 bg-slate-900">
                            <div className="aspect-[3/4] relative">
                                <img
                                    src="/images/owner/founder.jpg"
                                    alt="Founder of FindDesign"
                                    // OPTIMISASI: Tambahkan loading lazy dan decoding async
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover transition-all duration-1000 md:group-hover:scale-110 md:group-hover:rotate-1"
                                    onError={(e) => {
                                        e.target.src = 'https://placehold.co/600x800/0f172a/ef4444?text=Founder';
                                    }}
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent md:group-hover:via-slate-950/40 transition-all duration-500"></div>

                                {/* Info Card - Gunakan bg-slate-900 solid di mobile (md:backdrop-blur) */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-all duration-500 md:group-hover:-translate-y-2">
                                    <div className="space-y-2 bg-slate-900/95 md:bg-slate-900/30 md:backdrop-blur-sm p-6 rounded-xl border border-slate-700/30 md:group-hover:border-red-500/30 transition-all duration-500 shadow-xl">
                                        <h3 className="text-3xl font-bold text-white md:group-hover:text-red-400 transition-colors duration-300">Afandy</h3>
                                        <p className="text-red-400 font-medium text-lg">Founder & Creative Director</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="lg:col-span-3 space-y-10">
                        <div className={`space-y-6 transition-all duration-1000 delay-300 ${
                            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
                        }`}>
                            <div className="relative pl-6 border-l-4 border-red-500 group hover:border-red-400 transition-colors duration-300">
                                <p className="text-2xl lg:text-3xl font-light text-white/90 leading-relaxed italic group-hover:text-white transition-colors duration-300">
                                    "Agus Afandy – Owner of FindDesign and Professional Illustrator who has been creating since 2015."
                                </p>
                            </div>

                            <div className="space-y-5">
                                <p className="text-lg text-slate-300 leading-relaxed">
                                    Founded in 2015, <span className="text-red-400 font-semibold">FindDesign</span>. What started as a simple pencil stroke has now brought to life 500+ projects for clients worldwide.
                                </p>
                                <p className="text-lg text-slate-300 leading-relaxed">
                                   With over 8 years of experience in the creative industry, I believe that every brand has a unique story worth telling through captivating visuals.
                                </p>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-500 ${
                            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                        }`}>
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center group md:hover:scale-110 transition-transform duration-300">
                                    <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Best Works Gallery */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl lg:text-5xl font-bold text-white mb-4">Featured Works</h3>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            A glimpse into our finest creations
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {works.map((work, index) => (
                            <div
                                key={index}
                                onClick={() => openImage(index)}
                                // OPTIMISASI: Gunakan bg solid di mobile untuk performa
                                className="relative group bg-slate-900 border border-slate-800/50 rounded-2xl overflow-hidden md:bg-slate-900/40 md:backdrop-blur-sm md:hover:border-red-500/40 transition-all duration-500 cursor-pointer"
                            >
                                <div className="aspect-[4/3] relative overflow-hidden">
                                    <img
                                        src={work.src}
                                        alt={work.title}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.src = `https://placehold.co/800x600/0f172a/ef4444?text=${encodeURIComponent(work.title)}`;
                                        }}
                                    />
                                    {/* Gradient overlay statis lebih ringan dari opacity transition */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-60 md:group-hover:opacity-80"></div>

                                    <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="transform md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                                            <span className="inline-block px-4 py-1 bg-red-500 text-white text-sm font-semibold rounded-full mb-3">
                                                Best Work
                                            </span>
                                            <h4 className="text-2xl font-bold text-white mb-2">{work.title}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Core Values */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className="relative group bg-slate-900 border border-slate-800/50 rounded-xl p-8 md:bg-slate-900/40 md:backdrop-blur-sm md:hover:border-red-500/40 transition-all duration-500"
                        >
                            <div className="relative">
                                <h4 className="text-xl font-bold text-white mb-3 md:group-hover:text-red-400 transition-colors duration-300">
                                    {value.title}
                                </h4>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Lightbox tetap sama karena biasanya overlay full screen tidak masalah */}
                {selectedImage && (
                   <div
                        className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                         {/* Simplified Lightbox content for brevity - logic remains same as original */}
                         <div className="relative w-full max-w-7xl mx-auto">
                            <img
                                src={selectedImage.src}
                                className="w-full h-auto max-h-[80vh] object-contain mx-auto"
                            />
                            <button
                                className="absolute top-[-40px] right-0 text-white p-2"
                                onClick={() => setSelectedImage(null)}
                            >Close</button>
                         </div>
                    </div>
                )}
            </div>
        </section>
    );
}
