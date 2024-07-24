
import {About} from '@/modules/Landing/About';
import {Cta} from '@/modules/Landing/Cta';
import {FAQ} from '@/modules/Landing/FAQ';
import {Features} from '@/modules/Landing/Features';
import {Footer} from '@/modules/Landing/Footer';
import {Hero} from '@/modules/Landing/Hero';
import {HowItWorks} from '@/modules/Landing/HowItWorks';
import {Navbar} from '@/modules/Landing/Navbar';
import {Newsletter} from '@/modules/Landing/Newsletter';
import {Pricing} from '@/modules/Landing/Pricing';
import {ScrollToTop} from '@/modules/Landing/ScrollToTop';
import {Services} from '@/modules/Landing/Services';
import {Sponsors} from '@/modules/Landing/Sponsors';
import {Team} from '@/modules/Landing/Team';
import {Testimonials} from '@/modules/Landing/Testimonials';
import React from 'react';

export default async function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <Sponsors />
      <About />
      <HowItWorks />
      <Features />
      <Services />
      <Cta />
      <Testimonials />
      <Team />
      <Pricing />
      <Newsletter />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}
