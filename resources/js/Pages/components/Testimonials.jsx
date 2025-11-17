import React, { useState, useEffect } from 'react';

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
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

        const element = document.getElementById('testimonials');
        if (element) observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, []);

    const testimonials = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'CEO, TechStart Inc.',
            image: 'https://placehold.co/100x100/1e293b/ef4444?text=SJ',
            content: 'FindDesign transformed our brand identity completely. Their illustrations brought our vision to life in ways we never imagined. The attention to detail and creativity is unmatched!',
            rating: 5,
            project: 'Brand Identity & Illustration'
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'Creative Director, PixelWave',
            image: 'https://placehold.co/100x100/1e293b/f87171?text=MC',
            content: 'Working with FindDesign was an absolute pleasure. They delivered stunning animations that exceeded our expectations. Professional, creative, and always on time!',
            rating: 5,
            project: 'Motion Graphics & Animation'
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            role: 'Author & Publisher',
            image: 'https://placehold.co/100x100/1e293b/fca5a5?text=ER',
            content: 'The book cover illustrations they created were absolutely breathtaking. Every detail was perfect, and they truly understood the essence of my story. Highly recommended!',
            rating: 5,
            project: 'Book Cover Illustration'
        },
        {
            id: 4,
            name: 'David Park',
            role: 'Founder, GameForge Studio',
            image: 'https://placehold.co/100x100/1e293b/dc2626?text=DP',
            content: 'The concept art and character designs for our game were phenomenal. FindDesign brought our fantasy world to life with incredible artistry and imagination.',
            rating: 5,
            project: 'Game Art & Character Design'
        },
        {
            id: 5,
            name: 'Lisa Anderson',
            role: 'Marketing Director, BrandCo',
            image: 'https://placehold.co/100x100/1e293b/f97316?text=LA',
            content: 'Outstanding digital art that perfectly captured our brand essence. The team is incredibly talented and delivered beyond what we hoped for. Simply amazing work!',
            rating: 5,
            project: 'Digital Art & Marketing'
        },
        {
            id: 6,
            name: 'James Wilson',
            role: 'NFT Collector & Investor',
            image: 'https://placehold.co/100x100/1e293b/b91c1c?text=JW',
            content: 'Their NFT collection design was revolutionary. Each piece was unique, creative, and perfectly executed. The generative art system they built was genius!',
            rating: 5,
            project: 'NFT Collection Design'
        }
    ];

    // Auto-scroll effect
    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % testimonials.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [isPaused, testimonials.length]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    return (
        <section id="testimonials" className="relative py-24 bg-gradient-to-b from-red-950/30 to-slate-950 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-600/10 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-red-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className={`text-center mb-16 transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <div className="inline-block mb-4 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full backdrop-blur-sm">
                        <span className="text-red-400 text-sm font-medium tracking-wider">TESTIMONIALS</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
                            What Our Clients Say
                        </span>
                    </h2>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                        Trusted by creative professionals and brands worldwide
                    </p>
                </div>

                {/* Carousel Container */}
                <div
                    className="relative max-w-6xl mx-auto"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Testimonials Slider */}
                    <div className="relative overflow-hidden">
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={testimonial.id}
                                    className="w-full flex-shrink-0 px-4"
                                >
                                    <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 hover:border-red-500/50 transition-all duration-500">
                                        {/* Decorative Elements */}
                                        <div className="absolute -top-6 -left-6 w-24 h-24 border-4 border-red-500/20 rounded-full"></div>
                                        <div className="absolute -bottom-6 -right-6 w-32 h-32 border-4 border-red-400/20 rounded-full"></div>

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-600/5 rounded-3xl"></div>

                                        {/* Content */}
                                        <div className="relative">
                                            {/* Quote Icon */}
                                            <div className="text-6xl text-red-500/20 mb-6">"</div>

                                            {/* Testimonial Text */}
                                            <p className="text-xl md:text-2xl text-white leading-relaxed mb-8 min-h-[120px]">
                                                {testimonial.content}
                                            </p>

                                            {/* Rating Stars */}
                                            <div className="flex gap-1 mb-6">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        className="w-6 h-6 text-amber-400"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>

                                            {/* Client Info */}
                                            <div className="flex items-center gap-6">
                                                {/* Avatar */}
                                                <div className="relative">
                                                    <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-500 rounded-full blur-sm opacity-50"></div>
                                                    <img
                                                        src={testimonial.image}
                                                        alt={testimonial.name}
                                                        className="relative w-16 h-16 rounded-full border-2 border-slate-700"
                                                    />
                                                </div>

                                                {/* Details */}
                                                <div>
                                                    <h4 className="text-xl font-bold text-white mb-1">
                                                        {testimonial.name}
                                                    </h4>
                                                    <p className="text-red-400 font-medium mb-1">
                                                        {testimonial.role}
                                                    </p>
                                                    <p className="text-white/50 text-sm">
                                                        {testimonial.project}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-slate-800/80 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500 border border-slate-700 hover:border-transparent rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm z-10"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-slate-800/80 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500 border border-slate-700 hover:border-transparent rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm z-10"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Dots Navigation */}
                <div className="flex justify-center gap-3 mt-12">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`transition-all duration-300 rounded-full ${
                                currentIndex === index
                                    ? 'w-12 h-3 bg-gradient-to-r from-red-600 to-red-500'
                                    : 'w-3 h-3 bg-slate-700 hover:bg-slate-600'
                            }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto">
                    {[
                        { number: '500+', label: 'Happy Clients', icon: '😊' },
                        { number: '98%', label: 'Satisfaction Rate', icon: '⭐' },
                        { number: '1000+', label: 'Projects Done', icon: '🎨' },
                        { number: '50+', label: 'Awards Won', icon: '🏆' }
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="relative group bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 text-center hover:border-red-500/50 transition-all duration-500 hover:scale-105"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>
                            <div className="relative">
                                <div className="text-3xl mb-2">{stat.icon}</div>
                                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent mb-2">
                                    {stat.number}
                                </div>
                                <p className="text-white/70 text-sm font-medium">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
