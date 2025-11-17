import React from 'react';
import AppLayout from '../Layouts/AppLayout.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Portfolio from './components/Portfolio.jsx';
import Testimonials from './components/Testimonials.jsx';
import Contact from './components/Contact.jsx';

// Terima 'portfolioItems' dari props yang dikirim oleh controller
export default function Landing({ portfolioItems }) {
    return (
        <AppLayout>
            <Hero />
            <About />
            <Services />
            {/* Kirim props ke komponen Portfolio */}
            <Portfolio portfolioItems={portfolioItems} />
            <Testimonials />
            <Contact />
        </AppLayout>
    );
}

