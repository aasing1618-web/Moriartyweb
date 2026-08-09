import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const container = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".reveal-text span", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: "power3.out"
      });
    }, container);
    return () => ctx.revert();
  }, []);

  const text = "des produits sur mesure, pensés pour votre métier.";
  const words = text.split(" ");

  return (
    <section ref={container} className="py-40 bg-primary text-background relative overflow-hidden rounded-[3rem] mx-4 my-12">
      <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=2560')] bg-cover bg-center bg-fixed parallax-bg"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-8 md:px-12 flex flex-col items-center text-center">
        <p className="font-mono text-accent text-sm mb-12 max-w-xl opacity-80 uppercase tracking-widest leading-relaxed">
          La plupart des studios digitaux livrent des templates génériques.
        </p>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-dramatic italic leading-tight reveal-text overflow-hidden">
          Nous concevons : <br/>
          {words.map((word, i) => (
            <span key={i} className={`inline-block mr-3 ${word.includes('sur') || word.includes('mesure') || word.includes('métier') ? 'text-accent' : ''}`}>
              {word}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
