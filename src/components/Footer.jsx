import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#08080C] text-background/60 py-12 px-8 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="font-mono text-xs uppercase tracking-widest text-green-500/80">Système Opérationnel</span>
        </div>
        
        <div className="font-sans text-sm">
          © {new Date().getFullYear()} Moriarty Studio. Tous droits réservés.
        </div>
        
        <div className="font-dramatic italic text-2xl text-background/40">
          Moriarty
        </div>
      </div>
    </footer>
  );
}
