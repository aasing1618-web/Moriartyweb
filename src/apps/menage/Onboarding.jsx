import { useState } from 'react'
import { CalendarCheck, Truck, ShieldCheck, ArrowRight } from 'lucide-react'
import { Button, Logo } from '../../components/ui'

const SLIDES = [
  {
    icon: CalendarCheck,
    couleur: '#0E7C7B',
    titre: 'Réservez une vidange en 2 minutes',
    texte:
      'Décrivez votre fosse une seule fois, comparez les opérateurs disponibles près de chez vous et confirmez en quelques clics.',
    puces: ['Volume estimé automatiquement', 'Prix affiché avant de réserver'],
  },
  {
    icon: Truck,
    couleur: '#16324A',
    titre: 'Suivez votre camion en temps réel',
    texte:
      "Vous savez où en est l'opérateur, du départ jusqu'au dépotage à la station de traitement agréée.",
    puces: ['Étapes en direct', 'Heure d’arrivée estimée'],
  },
  {
    icon: ShieldCheck,
    couleur: '#E1863B',
    titre: 'Payez par mobile money, en toute confiance',
    texte:
      'Wave, Orange Money ou espèces. Le paiement de l’opérateur est libéré une fois le dépotage certifié conforme.',
    puces: ['Reçu numérique horodaté', 'Traçabilité jusqu’à la station'],
  },
]

export default function Onboarding({ go }) {
  const [index, setIndex] = useState(0)
  const slide = SLIDES[index]
  const Icon = slide.icon
  const dernier = index === SLIDES.length - 1

  return (
    <div className="flex min-h-0 flex-1 flex-col px-6 pb-8">
      <div className="flex items-center justify-between pt-1">
        <Logo size={34} />
        <button
          onClick={() => go('login')}
          className="text-[13px] font-semibold text-slateink transition hover:text-navy"
        >
          Passer
        </button>
      </div>

      <div key={index} className="flex min-h-0 flex-1 animate-fade-up flex-col items-center justify-center">
        <div className="relative mb-10 flex h-52 w-52 items-center justify-center">
          <div
            className="absolute inset-0 rounded-[46%_54%_58%_42%/48%_46%_54%_52%]"
            style={{ background: `${slide.couleur}14` }}
          />
          <div
            className="absolute inset-6 rounded-[52%_48%_44%_56%/56%_50%_50%_44%]"
            style={{ background: `${slide.couleur}1f` }}
          />
          <div
            className="animate-floaty relative flex h-24 w-24 items-center justify-center rounded-[32px] text-white shadow-lift"
            style={{ background: slide.couleur }}
          >
            <Icon size={44} strokeWidth={1.9} />
          </div>
          <span
            className="absolute right-2 top-6 h-3 w-3 rounded-full"
            style={{ background: slide.couleur, opacity: 0.5 }}
          />
          <span
            className="absolute bottom-8 left-1 h-2 w-2 rounded-full"
            style={{ background: slide.couleur, opacity: 0.35 }}
          />
        </div>

        <h1 className="text-balance text-center text-[26px] font-extrabold leading-[1.15] text-navy">
          {slide.titre}
        </h1>
        <p className="mt-3 text-balance text-center text-[14px] leading-relaxed text-slateink">
          {slide.texte}
        </p>

        <div className="mt-6 flex flex-col items-center gap-2">
          {slide.puces.map((p) => (
            <span
              key={p}
              className="rounded-full bg-white px-3.5 py-1.5 text-[12px] font-medium text-navy shadow-card"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-6 flex justify-center gap-2">
        {SLIDES.map((_, i) => (
          <span
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? 'w-7 bg-teal' : 'w-2 bg-navy/15'
            }`}
          />
        ))}
      </div>

      <Button
        size="lg"
        block
        iconRight={ArrowRight}
        onClick={() => (dernier ? go('login') : setIndex(index + 1))}
      >
        {dernier ? 'Commencer' : 'Suivant'}
      </Button>
    </div>
  )
}
