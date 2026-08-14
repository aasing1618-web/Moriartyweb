import { useState } from 'react'
import { Building2, ArrowRight, ShieldCheck, Check } from 'lucide-react'
import { Button, Wordmark } from '../../components/ui'
import { institutions, marque } from '../../data/mockData'

export default function LoginInstitution({ onEntrer }) {
  const [choix, setChoix] = useState(institutions[0].id)

  return (
    <div className="flex min-h-screen">
      {/* Colonne visuelle */}
      <div className="relative hidden w-[46%] flex-col justify-between overflow-hidden bg-navy p-12 text-white lg:flex">
        <div className="absolute inset-0 bg-grid opacity-[0.15]" />
        <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-teal/25 blur-3xl" />
        <div className="absolute -bottom-24 -left-10 h-80 w-80 rounded-full bg-amber/15 blur-3xl" />

        <Wordmark size={44} tone="white" className="relative" />

        <div className="relative max-w-md">
          <h1 className="text-[38px] font-extrabold leading-[1.1] tracking-[-0.02em]">
            Piloter la filière boues de vidange, en données réelles.
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-white/70">{marque.baseline}</p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              ['12 400', 'vidanges tracées'],
              ['87 %', 'dépotage conforme'],
              ['5', 'stations suivies'],
            ].map(([v, l]) => (
              <div key={l} className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                <p className="text-[22px] font-extrabold leading-none">{v}</p>
                <p className="mt-1.5 text-[11.5px] text-white/60">{l}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-[12px] text-white/50">
          Maquette de démonstration — Govathon 2026
        </p>
      </div>

      {/* Colonne formulaire */}
      <div className="flex flex-1 items-center justify-center bg-cream px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden">
            <Wordmark size={40} />
          </div>

          <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-teal/10 px-3 py-1.5 text-[12px] font-semibold text-teal lg:mt-0">
            <ShieldCheck size={14} strokeWidth={2.4} />
            Accès institutionnel sécurisé
          </span>

          <h2 className="mt-4 text-[30px] font-extrabold leading-tight text-navy">
            Tableau de bord
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-slateink">
            Sélectionnez votre organisation pour accéder aux indicateurs de suivi de la filière.
          </p>

          <div className="mt-7 space-y-2.5">
            {institutions.map((inst) => {
              const actif = inst.id === choix
              return (
                <button
                  key={inst.id}
                  onClick={() => setChoix(inst.id)}
                  className={`flex w-full items-center gap-3.5 rounded-2xl border bg-white p-4 text-left shadow-card transition ${
                    actif ? 'border-transparent ring-2 ring-teal' : 'border-navy/[0.07] hover:border-navy/20'
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                      actif ? 'bg-teal text-white' : 'bg-navy-50 text-navy'
                    }`}
                  >
                    <Building2 size={19} strokeWidth={2.2} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14.5px] font-bold text-navy">{inst.nom}</span>
                    <span className="block truncate text-[12px] text-slateink">{inst.detail}</span>
                  </span>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${
                      actif ? 'border-teal bg-teal text-white' : 'border-navy/15 text-transparent'
                    }`}
                  >
                    <Check size={13} strokeWidth={3} />
                  </span>
                </button>
              )
            })}
          </div>

          <Button
            size="lg"
            block
            className="mt-6"
            iconRight={ArrowRight}
            onClick={() => onEntrer(institutions.find((i) => i.id === choix))}
          >
            Accéder au tableau de bord
          </Button>

          <p className="mt-6 text-center text-[11.5px] leading-relaxed text-slateink">
            AssainiTrack complète le service public « Ma Vidange » de l’ONAS en apportant la
            traçabilité opérationnelle des dépotages.
          </p>
        </div>
      </div>
    </div>
  )
}
