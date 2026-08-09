import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const container = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.2
      });
      gsap.from(".hero-btn", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.8
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="hero-grid-bg relative w-full min-h-[100dvh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0 hero-vignette pointer-events-none"></div>
      <div className="absolute -top-36 -right-24 w-[460px] h-[460px] rounded-full hero-glow pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-12 pt-32 pb-24">
        <div className="max-w-2xl">
          <p className="hero-text text-background/60 font-mono text-xs mb-5 tracking-[0.06em] uppercase">Cabinet SaaS sur mesure</p>
          <h1 className="leading-[0.95] mb-8">
            <span className="hero-text block font-sans font-medium text-3xl md:text-4xl text-background">Une ingénierie discrète,</span>
            <span
              className="hero-text block font-dramatic italic text-accent mt-1 text-6xl md:text-8xl lg:text-9xl"
              style={{ textShadow: '0 0 44px rgba(201,168,76,0.4)' }}
            >
              une exécution rare.
            </span>
          </h1>
          <p className="hero-text text-background/65 font-sans text-base md:text-lg max-w-lg mb-10 leading-relaxed">
            Fondé par un ingénieur hydraulique passé au développement SaaS, nous concevons dashboards, automatisations et IA pour les organisations qui n'ont pas droit à l'erreur.
          </p>

          <div className="hero-btn flex items-center gap-6">
            <a href="#contact" className="group relative overflow-hidden inline-flex items-center gap-3 bg-accent text-primary px-8 py-4 rounded-full font-sans font-semibold hover:scale-[1.03] transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] shadow-[0_0_30px_rgba(201,168,76,0.35)]">
              <span className="relative z-10 flex items-center gap-3">
                Discuter de mon projet
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <a href="#services" className="font-sans text-sm text-background/80 border-b border-background/35 pb-1 hover:text-background hover:border-background/60 transition-colors">
              Voir le process
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
