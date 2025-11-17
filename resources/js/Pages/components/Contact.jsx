import React, { useState, useEffect } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        service: '',
        message: ''
    });
    const [isVisible, setIsVisible] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

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

        const element = document.getElementById('contact');
        if (element) observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
        setFormData({
            name: '',
            email: '',
            company: '',
            service: '',
            message: ''
        });
    };

    const contactInfo = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: 'Email',
            content: 'contact@finddesign.com',
            link: 'mailto:contact@finddesign.com'
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            title: 'Phone',
            content: '+1 (555) 123-4567',
            link: 'tel:+15551234567'
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: 'Location',
            content: 'San Francisco, CA',
            link: null
        }
    ];

    const socialLinks = [
        { name: 'Behance', gradient: 'from-red-600 to-red-500' },
        { name: 'Dribbble', gradient: 'from-red-500 to-rose-500' },
        { name: 'Instagram', gradient: 'from-rose-600 to-red-500' },
        { name: 'Twitter', gradient: 'from-red-600 to-red-700' }
    ];

    return (
        <section id="contact" className="relative py-24 bg-gradient-to-b from-slate-950 to-red-950/30 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/10 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className={`text-center mb-20 transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <div className="inline-block mb-4 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full backdrop-blur-sm">
                        <span className="text-red-400 text-sm font-medium tracking-wider">GET IN TOUCH</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
                            Let's Work Together
                        </span>
                    </h2>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                        Have a project in mind? We'd love to hear about it. Let's create something amazing together!
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Form */}
                    <div className="relative">
                        <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-10">
                            <div className="absolute -top-4 -left-4 w-24 h-24 border-4 border-red-500/20 rounded-full"></div>
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-4 border-red-400/20 rounded-full"></div>

                            <div className="relative space-y-6">
                                {/* Name Field */}
                                <div className="relative">
                                    <label className="block text-white/70 text-sm font-medium mb-2">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('name')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-all duration-300"
                                        placeholder="John Doe"
                                    />
                                    {focusedField === 'name' && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-lg -z-10 blur-xl"></div>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div className="relative">
                                    <label className="block text-white/70 text-sm font-medium mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-all duration-300"
                                        placeholder="john@example.com"
                                    />
                                    {focusedField === 'email' && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-lg -z-10 blur-xl"></div>
                                    )}
                                </div>

                                {/* Company Field */}
                                <div className="relative">
                                    <label className="block text-white/70 text-sm font-medium mb-2">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('company')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-all duration-300"
                                        placeholder="Your Company"
                                    />
                                    {focusedField === 'company' && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-lg -z-10 blur-xl"></div>
                                    )}
                                </div>

                                {/* Service Selection */}
                                <div className="relative">
                                    <label className="block text-white/70 text-sm font-medium mb-2">
                                        Service Needed *
                                    </label>
                                    <select
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('service')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition-all duration-300"
                                    >
                                        <option value="">Select a service</option>
                                        <option value="illustration">Illustration Design</option>
                                        <option value="digitalart">Digital Art</option>
                                        <option value="animation">Animation</option>
                                        <option value="branding">Brand Identity</option>
                                        <option value="nft">NFT Art</option>
                                        <option value="gameart">Game Art</option>
                                    </select>
                                    {focusedField === 'service' && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-lg -z-10 blur-xl"></div>
                                    )}
                                </div>

                                {/* Message Field */}
                                <div className="relative">
                                    <label className="block text-white/70 text-sm font-medium mb-2">
                                        Project Details *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('message')}
                                        onBlur={() => setFocusedField(null)}
                                        rows="5"
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-all duration-300 resize-none"
                                        placeholder="Tell us about your project..."
                                    ></textarea>
                                    {focusedField === 'message' && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-lg -z-10 blur-xl"></div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    onClick={handleSubmit}
                                    className="group relative w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/50"
                                >
                                    <span className="relative z-10">
                                        {isSubmitted ? 'Message Sent!' : 'Send Message'}
                                    </span>
                                    <svg
                                        className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </button>

                                {isSubmitted && (
                                    <div className="text-center text-green-400 text-sm animate-pulse">
                                        Thank you! We'll get back to you soon.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        {/* Contact Cards */}
                        <div className="space-y-6">
                            {contactInfo.map((info, index) => (
                                <div
                                    key={index}
                                    className="group relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-red-500/50 transition-all duration-500 hover:scale-105"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>

                                    <div className="relative flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                                            {info.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-white/70 text-sm font-medium mb-1">
                                                {info.title}
                                            </h4>
                                            {info.link ? (
                                                <a
                                                    href={info.link}
                                                    className="text-white text-lg font-semibold hover:text-red-400 transition-colors duration-300"
                                                >
                                                    {info.content}
                                                </a>
                                            ) : (
                                                <p className="text-white text-lg font-semibold">
                                                    {info.content}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social Media */}
                        <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8">
                            <h3 className="text-white text-xl font-bold mb-6">Follow Us</h3>
                            <div className="flex flex-wrap gap-4">
                                {socialLinks.map((social, index) => (
                                    <div
                                        key={index}
                                        className={`group relative w-12 h-12 bg-gradient-to-br ${social.gradient} rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer`}
                                    >
                                        <span className="text-sm font-bold">{social.name[0]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="relative bg-gradient-to-br from-red-500/10 to-red-600/10 backdrop-blur-xl border border-slate-800 rounded-2xl p-8">
                            <h3 className="text-white text-xl font-bold mb-6">Business Hours</h3>
                            <div className="space-y-3 text-white/70">
                                <div className="flex justify-between">
                                    <span>Monday - Friday</span>
                                    <span className="text-red-400 font-semibold">9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Saturday</span>
                                    <span className="text-red-400 font-semibold">10:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Sunday</span>
                                    <span className="text-white/50 font-semibold">Closed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 text-center">
                    <div className="inline-block bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 max-w-3xl">
                        <h3 className="text-2xl font-bold text-white mb-3">
                            Prefer to talk directly?
                        </h3>
                        <p className="text-white/70 mb-6">
                            Schedule a free consultation call to discuss your project in detail
                        </p>
                        <button className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-800 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500 text-white font-semibold rounded-lg border border-slate-700 hover:border-transparent transition-all duration-300 hover:scale-105">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Schedule a Call</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
