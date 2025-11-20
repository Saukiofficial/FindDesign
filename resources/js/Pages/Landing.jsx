import React from 'react';
import AppLayout from '../Layouts/AppLayout.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Portfolio from './components/Portfolio.jsx';
import Testimonials from './components/Testimonials.jsx';
import Contact from './components/Contact.jsx';


export default function Landing({ portfolioItems, featuredWorks }) {
    return (
        <AppLayout>
            <Hero />

            {/* 2. PENTING: Oper data ke komponen About di sini */}
            <About featuredWorks={featuredWorks} />

            <Services />
            <Portfolio portfolioItems={portfolioItems} />
            <Testimonials />
            <Contact />
        </AppLayout>
    );
}
