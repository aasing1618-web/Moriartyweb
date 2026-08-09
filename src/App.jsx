import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Philosophy from './components/Philosophy';
import Sectors from './components/Sectors';
import Founder from './components/Founder';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <div className="noise-overlay"></div>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Philosophy />
        <Sectors />
        <Founder />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
