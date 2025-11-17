import React, { useState, useEffect } from 'react';

export default function About() {
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

        const element = document.getElementById('about');
        if (element) observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, []);

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
        <section id="about" className="relative py-32 bg-slate-950 overflow-hidden">
            {/* Sophisticated Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/20 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/20 rounded-full filter blur-3xl"></div>
            </div>

            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                {/* Refined Section Header */}
                <div className="text-center mb-24">
                    <div className="inline-flex items-center gap-2 mb-6 px-6 py-2 border border-red-500/30 rounded-full backdrop-blur-sm">
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

                {/* Founder Section - Enhanced Layout */}
                <div className={`grid lg:grid-cols-5 gap-16 items-center mb-32 transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    {/* Image Side - More Compact */}
                    <div className="lg:col-span-2 relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700"></div>

                        <div className="relative rounded-2xl overflow-hidden border border-slate-800/50 group-hover:border-red-500/30 transition-all duration-500 shadow-2xl">
                            <div className="aspect-[3/4] relative">
                                <img
                                    src="/images/owner/founder.jpg"
                                    alt="Founder of FindDesign"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    onError={(e) => {
                                        e.target.src = 'https://placehold.co/600x800/0f172a/ef4444?text=Founder';
                                    }}
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>

                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <div className="space-y-2">
                                        <h3 className="text-3xl font-bold text-white">Afandy</h3>
                                        <p className="text-red-400 font-medium text-lg">Founder & Creative Director</p>
                                        <div className="flex gap-3 mt-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-300 cursor-pointer">
                                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                                </svg>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-300 cursor-pointer">
                                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Side - More Space */}
                    <div className="lg:col-span-3 space-y-10">
                        <div className="space-y-6">
                            <div className="relative pl-6 border-l-4 border-red-500">
                                <p className="text-2xl lg:text-3xl font-light text-white/90 leading-relaxed italic">
                                    "Meet Afandy — Owner of FindDesign and Professional Illustrator who has been creating since 2015."
                                </p>
                            </div>

                            <div className="space-y-5">
                                <p className="text-lg text-slate-300 leading-relaxed">
                                    Founded in 2015, <span className="text-red-400 font-semibold">FindDesign</span> What started as a simple pencil stroke has now brought to life 1000+ projects for clients worldwide.
                                </p>
                                <p className="text-lg text-slate-300 leading-relaxed">
                                   With over 8 years of experience in the creative industry, I believe that every brand has a unique story worth telling through captivating visuals. At FindDesign, we don't just create designs — we craft visual experiences that speak directly to your audience's hearts.
                                </p>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center group">
                                    <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                                        {stat.number}
                                    </div>
                                    <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5">
                            <span className="relative z-10">Let's Work Together</span>
                            <svg
                                className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </div>
                </div>

                {/* Vision & Mission - Card Style */}
                <div className="grid lg:grid-cols-2 gap-8 mb-32">
                    <div className="relative group bg-gradient-to-br from-slate-900/90 to-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-10 hover:border-red-500/40 transition-all duration-500 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full filter blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

                        <div className="relative space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-bold text-white">Our Vision</h3>
                            </div>
                            <p className="text-slate-300 text-lg leading-relaxed">
                                To become the world's most innovative digital art studio, where creativity knows no bounds and every project pushes the boundaries of visual storytelling. We envision a future where our art inspires millions and transforms how people experience digital content.
                            </p>
                        </div>
                    </div>

                    <div className="relative group bg-gradient-to-br from-slate-900/90 to-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-10 hover:border-red-500/40 transition-all duration-500 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full filter blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

                        <div className="relative space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-bold text-white">Our Mission</h3>
                            </div>
                            <p className="text-slate-300 text-lg leading-relaxed">
                                To deliver exceptional artistic experiences that exceed client expectations through cutting-edge techniques, passionate creativity, and unwavering commitment to quality. We strive to make every project a masterpiece that tells a unique story.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Core Values - Professional Grid */}
                <div className="text-center mb-16">
                    <h3 className="text-4xl lg:text-5xl font-bold text-white mb-4">Our Core Values</h3>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        The principles that guide everything we do
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className="relative group bg-slate-900/40 backdrop-blur-sm border border-slate-800/50 rounded-xl p-8 hover:border-red-500/40 transition-all duration-500 hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500"></div>

                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-red-600/20 to-red-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-red-500/20">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                </div>

                                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                                    {value.title}
                                </h4>

                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
