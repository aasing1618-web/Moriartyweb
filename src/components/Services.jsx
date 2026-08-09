import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ServiceCard({ number, label, children }) {
  return (
    <div className="relative flex-1 bg-card border border-accent/[0.14] rounded-[2rem] p-6 flex flex-col gap-4">
      <span className="absolute top-[22px] right-6 font-mono text-xs text-background/40">{number}</span>
      <div className="font-sans font-bold text-[13px] tracking-[0.05em] uppercase text-background">{label}</div>
      {children}
    </div>
  );
}

function DiagnosticMixer() {
  const [items, setItems] = useState(["Sites vitrines", "Plateformes SaaS", "Dashboards data", "Automatisations IA"]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const next = [...prev];
        next.push(next.shift());
        return next;
      });
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const looped = [...items, ...items];

  return (
    <div
      className="h-[150px] overflow-hidden relative"
      style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent)', maskImage: 'linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent)' }}
    >
      <div className="flex flex-col gap-2.5 transition-transform duration-700 ease-in-out">
        {looped.map((item, i) => (
          <div
            key={i}
            className={`px-3.5 py-2.5 rounded-2xl font-sans text-sm ${i % 4 === 1 ? 'bg-accent/10 text-background' : 'text-background/55'}`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function TelemetryWriter() {
  const lines = ["analyse_besoins()", "conception_produit()", "deploiement_continu()"];

  return (
    <div className="bg-terminal border border-white/10 rounded-[1.25rem] p-4 flex-1 flex flex-col gap-2.5">
      <div className="flex gap-1.5 mb-1">
        <div className="w-2 h-2 rounded-full bg-[#E0645A]"></div>
        <div className="w-2 h-2 rounded-full bg-[#E0C25A]"></div>
        <div className="w-2 h-2 rounded-full bg-[#5EBE7A]"></div>
      </div>
      {lines.map((line, i) => (
        <div key={line} className="font-mono text-[13px] text-background/80">
          <span className="text-accent">$</span> {line}
          {i === lines.length - 1 && (
            <span className="inline-block w-[7px] h-[13px] bg-background/80 ml-1 align-middle" style={{ animation: 'terminalBlink 1.1s step-end infinite' }}></span>
          )}
        </div>
      ))}
    </div>
  );
}

function CursorPlanner() {
  const days = [
    { label: 'Lu', num: 3 },
    { label: 'Ma', num: 4 },
    { label: 'Me', num: 5 },
    { label: 'Je', num: 6 },
    { label: 'Ve', num: 7 },
    { label: 'Sa', num: 8 },
    { label: 'Di', num: 9 },
  ];
  const activeIndex = 3;

  return (
    <div className="flex flex-col flex-1">
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((d, i) => (
          <div
            key={d.label}
            className={`flex flex-col items-center gap-1 py-2 rounded-2xl ${i === activeIndex ? 'bg-accent' : ''} ${i >= 5 ? 'opacity-40' : ''}`}
          >
            <span className={`font-mono text-[11px] ${i === activeIndex ? 'text-primary' : 'text-background/55'}`}>{d.label}</span>
            <span className={`font-sans font-semibold text-[13px] ${i === activeIndex ? 'text-primary' : 'text-background'}`}>{d.num}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-4">
        <div className="px-3.5 py-3 rounded-2xl bg-accent/[0.16] border border-dashed border-accent/50 font-sans text-[13px] text-background">
          10:00 — Appel découverte
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const container = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".service-card", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={container} className="bg-primarySoft py-24 px-8 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="font-mono text-xs text-accent tracking-[0.06em] uppercase mb-3">Nos livrables</div>
        <h2 className="font-sans font-semibold text-3xl md:text-4xl text-background mb-16">Ce que nous livrons</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="service-card flex flex-col gap-6">
            <ServiceCard number="01" label="Ce que nous livrons">
              <DiagnosticMixer />
            </ServiceCard>
            <div>
              <h3 className="text-xl font-dramatic font-bold text-background mb-3">SaaS sur mesure pour tout secteur</h3>
              <p className="text-background/60 font-sans text-sm leading-relaxed">Nous développons des outils numériques qui s'adaptent à vos besoins précis. Des solutions scalables pour toutes les industries.</p>
            </div>
          </div>
          <div className="service-card flex flex-col gap-6">
            <ServiceCard number="02" label="Le process">
              <TelemetryWriter />
            </ServiceCard>
            <div>
              <h3 className="text-xl font-dramatic font-bold text-background mb-3">De l'idée au produit en quelques semaines</h3>
              <p className="text-background/60 font-sans text-sm leading-relaxed">Un cycle de développement optimisé. Votre vision transformée en une application fonctionnelle et déployée rapidement.</p>
            </div>
          </div>
          <div className="service-card flex flex-col gap-6">
            <ServiceCard number="03" label="Prochain créneau">
              <CursorPlanner />
            </ServiceCard>
            <div>
              <h3 className="text-xl font-dramatic font-bold text-background mb-3">Dashboards, automatisation et IA</h3>
              <p className="text-background/60 font-sans text-sm leading-relaxed">Intégrez la puissance de l'IA et de l'automatisation pour optimiser vos processus et analyser vos données en temps réel.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
