import React from 'react';
import AppLayout from '../Layouts/AppLayout.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Portfolio from './components/Portfolio.jsx';
import Testimonials from './components/Testimonials.jsx';
import Contact from './components/Contact.jsx';

export default function Landing({
    portfolioItems = [],
    featuredWorks = [],
    heroSetting = null,
    aboutSetting = null,
    serviceSetting = null,
}) {
    return (
        <AppLayout heroSetting={heroSetting}>
            <Hero heroSetting={heroSetting} />

            <About
                aboutSetting={aboutSetting}
                featuredWorks={featuredWorks}
            />

            <Services serviceSetting={serviceSetting} />

            <Portfolio portfolioItems={portfolioItems} />

            <Testimonials />

            <Contact />
        </AppLayout>
    );
}