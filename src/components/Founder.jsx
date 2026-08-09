import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Founder() {
  const container = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".founder-content", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section id="fondateur" ref={container} className="py-32 px-8 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-1/2 w-full founder-content">
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-[3rem] overflow-hidden group">
            <img 
              src="/founder.jpg" 
              alt="Abdou Aziz SY" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-primary/20"></div>
          </div>
        </div>
        
        <div className="lg:w-1/2 w-full">
          <div className="font-mono text-accent text-sm mb-4 tracking-widest uppercase founder-content">Direction</div>
          <h2 className="text-4xl md:text-5xl font-dramatic italic font-bold mb-8 founder-content">Abdou Aziz SY</h2>
          <p className="text-lg text-textDark/80 font-sans mb-12 leading-relaxed founder-content">
            Un profil hybride unique combinant l'ingénierie de précision et le développement de solutions numériques. Nous comprenons les problèmes techniques réels de votre entreprise, et nous construisons les logiciels pour les résoudre.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="founder-content bg-background p-6 rounded-2xl border border-primary/10 shadow-sm">
              <h3 className="font-mono text-primary font-bold mb-4 uppercase text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full inline-block"></span> Ingénierie
              </h3>
              <ul className="text-sm text-textDark/70 space-y-2 font-sans">
                <li>Master 2 Ingénierie Hydraulique</li>
                <li>Optimisation de réseaux (SNA323 Dakar)</li>
                <li>Modélisation (EPANET, QGIS, AutoCAD)</li>
                <li>Gestion durable des ressources</li>
              </ul>
            </div>
            
            <div className="founder-content bg-primary text-background p-6 rounded-2xl shadow-lg">
              <h3 className="font-mono text-accent font-bold mb-4 uppercase text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full inline-block"></span> Technologie
              </h3>
              <ul className="text-sm text-background/70 space-y-2 font-sans">
                <li>Développement Web Full-stack</li>
                <li>Création de SaaS & Dashboards</li>
                <li>Automatisation de process métier</li>
                <li>Intégration d'Intelligence Artificielle</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
