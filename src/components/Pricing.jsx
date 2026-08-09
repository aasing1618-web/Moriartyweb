import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Essentiel",
    desc: "Pour lancer votre première solution métier.",
    features: ["Design sur mesure", "Application Web basique", "Hébergement inclus", "Support email"],
    highlighted: false
  },
  {
    name: "Performance",
    desc: "Pour les entreprises en phase d'accélération.",
    features: ["SaaS complet", "Dashboards avancés", "Intégration API tierces", "Automatisation", "Support prioritaire"],
    highlighted: true
  },
  {
    name: "Entreprise",
    desc: "Solutions d'ingénierie logicielle complexes.",
    features: ["Architecture sur mesure", "IA intégrée", "Haute disponibilité", "Formation équipe", "SLA 99.9%"],
    highlighted: false
  }
];

export default function Pricing() {
  return (
    <section className="py-32 px-8 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-dramatic italic font-bold mb-6">Investissement</h2>
          <p className="text-lg text-textDark/70 font-sans max-w-2xl mx-auto">Des solutions tarifaires transparentes, adaptées à la taille et aux ambitions de votre projet.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, i) => (
            <div key={i} className={`rounded-[2.5rem] p-10 transition-transform duration-500 hover:-translate-y-2 ${plan.highlighted ? 'bg-primary text-background shadow-2xl scale-105 py-12' : 'bg-white border border-primary/10 shadow-sm'}`}>
              <div className={`font-mono text-sm tracking-widest uppercase mb-4 ${plan.highlighted ? 'text-accent' : 'text-primary/60'}`}>{plan.name}</div>
              <p className={`font-sans text-sm mb-8 h-10 ${plan.highlighted ? 'text-background/80' : 'text-textDark/70'}`}>{plan.desc}</p>
              
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 font-sans text-sm">
                    <Check className={`w-5 h-5 ${plan.highlighted ? 'text-accent' : 'text-primary'}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a href="#contact" className={`block text-center w-full py-4 rounded-full font-medium transition-all duration-300 hover:scale-[1.03] ${plan.highlighted ? 'bg-accent text-primary' : 'bg-primary/5 text-primary hover:bg-primary/10'}`}>
                Discuter de mon projet
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
