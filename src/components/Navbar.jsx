import React, { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-full pl-6 pr-2 py-2 flex items-center gap-8 text-background border ${scrolled ? 'bg-background/[0.07] backdrop-blur-xl border-accent/30 shadow-[0_8px_32px_rgba(0,0,0,0.35)]' : 'bg-background/[0.05] backdrop-blur-md border-background/10'}`}>
      <div className="flex items-center gap-2.5">
        <div className="w-2.5 h-2.5 bg-accent rotate-45"></div>
        <span className="font-sans font-bold text-sm tracking-[0.05em]">MORIARTY</span>
      </div>
      <div className="hidden md:flex items-center gap-6 font-sans text-[13px] text-background/65">
        <a href="#services" className="hover:text-background transition-colors">Services</a>
        <a href="#secteurs" className="hover:text-background transition-colors">Secteurs</a>
        <a href="#fondateur" className="hover:text-background transition-colors">Fondateur</a>
        <a href="#contact" className="hover:text-background transition-colors">Contact</a>
      </div>
      <a href="#contact" className="hidden md:block px-5 py-2.5 bg-accent text-primary rounded-full font-sans font-semibold text-[13px] hover:scale-[1.03] transition-transform duration-300 relative overflow-hidden group shadow-[0_0_20px_rgba(201,168,76,0.35)]">
        <span className="relative z-10">Discuter</span>
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></div>
      </a>
    </nav>
  );
}
