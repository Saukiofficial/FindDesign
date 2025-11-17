import React, { useState, useEffect } from 'react';

export default function Services() {
    const [activeService, setActiveService] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

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

        const element = document.getElementById('services');
        if (element) observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, []);

    const services = [
        {
            id: 1,
            icon: '🎨',
            title: 'Illustration Design',
            shortDesc: 'Custom illustrations that bring your stories to life',
            features: [
                'Character Design & Development',
                'Book & Editorial Illustrations',
                'Concept Art & Storyboards',
                'Fantasy & Sci-Fi Artwork',
                'Children\'s Book Illustrations'
            ],
            gradient: 'from-red-600 to-red-500',
            borderGlow: 'red-500'
        },
        {
            id: 2,
            icon: '🖼️',
            title: 'Digital Art',
            shortDesc: 'Stunning digital paintings and visual masterpieces',
            features: [
                'Digital Painting & Portraits',
                'Landscape & Environment Art',
                'Abstract & Conceptual Art',
                'Photo Manipulation',
                'Matte Painting'
            ],
            gradient: 'from-red-500 to-red-400',
            borderGlow: 'red-400'
        },
        {
            id: 3,
            icon: '🎬',
            title: 'Animation',
            shortDesc: 'Bringing your ideas to life with motion',
            features: [
                '2D Character Animation',
                'Motion Graphics & Logo Animation',
                'Explainer Videos',
                'UI/UX Micro-interactions',
                'Social Media Content'
            ],
            gradient: 'from-red-600 to-rose-500',
            borderGlow: 'red-500'
        },
        {
            id: 4,
            icon: '🎯',
            title: 'Brand Identity',
            shortDesc: 'Complete visual identity for your brand',
            features: [
                'Logo Design & Branding',
                'Brand Guidelines',
                'Marketing Materials',
                'Social Media Assets',
                'Packaging Design'
            ],
            gradient: 'from-rose-600 to-red-500',
            borderGlow: 'rose-500'
        },
        {
            id: 5,
            icon: '✨',
            title: 'NFT Art',
            shortDesc: 'Unique digital collectibles for the metaverse',
            features: [
                'NFT Collection Design',
                'Generative Art Systems',
                'Avatar & PFP Collections',
                'Smart Contract Art',
                'Metadata & Rarity Design'
            ],
            gradient: 'from-red-500 to-red-600',
            borderGlow: 'red-500'
        },
        {
            id: 6,
            icon: '🎮',
            title: 'Game Art',
            shortDesc: 'Immersive visuals for gaming experiences',
            features: [
                'Character & Creature Design',
                'Environment & Props',
                'UI/UX Design',
                'Sprite Animation',
                'Concept Art & Assets'
            ],
            gradient: 'from-red-600 to-red-700',
            borderGlow: 'red-600'
        }
    ];

    const processes = [
        {
            step: '01',
            title: 'Discovery',
            description: 'We dive deep into your vision, goals, and requirements',
            icon: '🔍'
        },
        {
            step: '02',
            title: 'Concept',
            description: 'Creating initial concepts and mood boards for your approval',
            icon: '💡'
        },
        {
            step: '03',
            title: 'Creation',
            description: 'Bringing the approved concept to life with our expertise',
            icon: '🎨'
        },
        {
            step: '04',
            title: 'Delivery',
            description: 'Final touches and delivery in all required formats',
            icon: '🚀'
        }
    ];

    return (
        <section id="services" className="relative py-24 bg-gradient-to-b from-slate-950 to-red-950/30 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-rose-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className={`text-center mb-20 transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <div className="inline-block mb-4 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full backdrop-blur-sm">
                        <span className="text-red-400 text-sm font-medium tracking-wider">WHAT WE OFFER</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-red-500 via-red-400 to-rose-400 bg-clip-text text-transparent">
                            Our Services
                        </span>
                    </h2>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                        From illustrations to animations, we provide comprehensive creative solutions tailored to your needs
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className="group relative"
                            style={{ animationDelay: `${index * 100}ms` }}
                            onMouseEnter={() => setActiveService(index)}
                        >
                            {/* Glow Effect */}
                            <div className={`absolute -inset-1 bg-gradient-to-r ${service.gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}></div>

                            {/* Card */}
                            <div className={`relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 h-full transition-all duration-500 group-hover:border-${service.borderGlow}/50 group-hover:scale-105 group-hover:shadow-2xl`}>
                                {/* Icon */}
                                <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                                    <span className="text-4xl">{service.icon}</span>
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-red-400 group-hover:bg-clip-text transition-all duration-300">
                                    {service.title}
                                </h3>

                                <p className="text-white/70 mb-6 leading-relaxed">
                                    {service.shortDesc}
                                </p>

                                {/* Features List */}
                                <ul className="space-y-3 mb-6">
                                    {service.features.map((feature, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-start gap-3 text-white/60 text-sm group-hover:text-white/80 transition-colors duration-300"
                                        >
                                            <span className={`text-${service.borderGlow} mt-1 group-hover:scale-125 transition-transform duration-300`}>
                                                ✓
                                            </span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Learn More Button */}
                                <button className={`group/btn relative inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors duration-300`}>
                                    <span>Learn More</span>
                                    <svg
                                        className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                                {/* Corner Decorations */}
                                <div className={`absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-${service.borderGlow}/0 group-hover:border-${service.borderGlow}/50 rounded-tr-2xl transition-all duration-500`}></div>
                                <div className={`absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-${service.borderGlow}/0 group-hover:border-${service.borderGlow}/50 rounded-bl-2xl transition-all duration-500`}></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Process Section */}
                <div className="mb-20">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Our Creative Process
                        </h3>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto">
                            A seamless workflow designed to bring your vision to life
                        </p>
                    </div>

                    {/* Process Steps */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {processes.map((process, index) => (
                            <div
                                key={index}
                                className="relative group"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                {/* Connector Line */}
                                {index < processes.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/4 left-full w-full h-0.5 bg-gradient-to-r from-red-500/50 to-transparent -translate-y-1/2 z-0"></div>
                                )}

                                {/* Step Card */}
                                <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 text-center hover:border-red-500/50 transition-all duration-500 hover:scale-105 z-10">
                                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>

                                    <div className="relative">
                                        {/* Step Number */}
                                        <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-full text-sm">
                                            {process.step}
                                        </div>

                                        {/* Icon */}
                                        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                            {process.icon}
                                        </div>

                                        {/* Title */}
                                        <h4 className="text-xl font-bold text-white mb-3">
                                            {process.title}
                                        </h4>

                                        {/* Description */}
                                        <p className="text-white/70 text-sm leading-relaxed">
                                            {process.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="relative bg-gradient-to-r from-red-500/10 via-red-600/10 to-rose-500/10 backdrop-blur-sm border border-slate-800 rounded-3xl p-12 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-red-600/5 animate-pulse"></div>

                    <div className="relative z-10">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to Start Your Project?
                        </h3>
                        <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                            Let's collaborate and create something amazing together. Get in touch with us today!
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/50">
                                <span className="relative z-10">Get Started</span>
                                <svg
                                    className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>

                            <button className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-700 hover:border-red-500/50 transition-all duration-300 hover:scale-105">
                                <span>View Portfolio</span>
                                <svg
                                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .group {
                    animation: fadeInUp 0.6s ease-out forwards;
                }
            `}</style>
        </section>
    );
}
