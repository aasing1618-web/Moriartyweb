import React from 'react';
import { Phone, Mail, ArrowRight } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-8 md:px-12 bg-primary text-background rounded-t-[4rem] mt-20">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-8 border-2 border-accent/20 shadow-lg shadow-accent/5 hover:-translate-y-1 transition-transform duration-300">
          <img src="/founder.jpg" alt="Abdou Aziz SY" className="w-full h-full object-cover" />
        </div>
        <div className="font-mono text-accent text-sm mb-6 tracking-widest uppercase">Ligne Directe</div>
        <h2 className="text-5xl md:text-7xl font-sans font-bold mb-8">Démarrez votre projet.</h2>
        <p className="text-xl text-background/70 font-sans mb-16 max-w-2xl">
          Que vous ayez un cahier des charges complet ou juste une idée, nous sommes prêts à construire votre solution.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center mb-16">
          <a href="https://wa.me/221778608247" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-4 bg-white/5 hover:bg-white/10 px-8 py-6 rounded-3xl transition-colors font-mono text-lg group border border-white/10">
            <Phone className="text-accent group-hover:scale-110 transition-transform" />
            +221 77 860 82 47
          </a>
          <a href="mailto:aasing1.618@gmail.com" className="flex items-center justify-center gap-4 bg-white/5 hover:bg-white/10 px-8 py-6 rounded-3xl transition-colors font-mono text-lg group border border-white/10">
            <Mail className="text-accent group-hover:scale-110 transition-transform" />
            aasing1.618@gmail.com
          </a>
        </div>
        
        <a href="https://wa.me/221778608247" target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden inline-flex items-center gap-3 bg-accent text-primary px-10 py-5 rounded-full font-sans font-semibold text-lg hover:scale-[1.03] transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
          <span className="relative z-10 flex items-center gap-3">
            Discuter de mon projet
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </a>
      </div>
    </section>
  );
}
