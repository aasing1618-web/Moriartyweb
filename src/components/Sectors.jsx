import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Droplets, Rocket, Gamepad2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const sectorsData = [
  {
    title: "Eau & Environnement",
    desc: "Solutions de télémétrie, gestion de réseau et monitoring environnemental.",
    icon: <Droplets className="w-16 h-16 text-accent mb-6" />,
    color: "bg-[#111116]"
  },
  {
    title: "PME & Startups",
    desc: "Portails clients, automatisation des process et ERP légers sur mesure.",
    icon: <Rocket className="w-16 h-16 text-accent mb-6" />,
    color: "bg-[#15151C]"
  },
  {
    title: "Gaming & Divertissement",
    desc: "Dashboards communautaires, économie in-game et plateformes d'engagement.",
    icon: <Gamepad2 className="w-16 h-16 text-accent mb-6" />,
    color: "bg-[#1A1A24]"
  }
];

export default function Sectors() {
  const container = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.sector-card');
      
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
        });
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section id="secteurs" ref={container} className="relative pb-32 mt-20">
      {sectorsData.map((sector, i) => (
        <div key={i} className={`sector-card sticky top-0 h-[100dvh] w-full flex items-center justify-center ${sector.color} text-background rounded-b-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)]`}>
          <div className="max-w-4xl mx-auto px-8 md:px-12 text-center flex flex-col items-center">
            {sector.icon}
            <div className="font-mono text-accent text-sm mb-4 tracking-widest uppercase">Secteur d'Intervention 0{i+1}</div>
            <h2 className="text-5xl md:text-7xl font-sans font-bold mb-8">{sector.title}</h2>
            <p className="text-xl text-background/70 font-sans max-w-2xl leading-relaxed">{sector.desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
