import { Check } from 'lucide-react'

/** Frise horizontale d'étapes (index courant piloté par l'écran appelant). */
export default function Stepper({ etapes, courant = 0, className = '' }) {
  return (
    <div className={`flex items-start ${className}`}>
      {etapes.map((etape, i) => {
        const fait = i < courant
        const actif = i === courant
        return (
          <div key={etape.id} className="flex min-w-0 flex-1 flex-col items-center">
            <div className="flex w-full items-center">
              <div
                className={`h-[3px] flex-1 rounded-full ${
                  i === 0 ? 'opacity-0' : fait || actif ? 'bg-teal' : 'bg-navy/10'
                }`}
              />
              <div
                className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                  fait
                    ? 'border-teal bg-teal text-white'
                    : actif
                    ? 'border-teal bg-white text-teal'
                    : 'border-navy/15 bg-white text-navy/25'
                }`}
              >
                {actif && <span className="absolute inset-0 animate-ping-soft rounded-full bg-teal/50" />}
                {fait ? (
                  <Check size={14} strokeWidth={3} />
                ) : (
                  <span className={`h-2 w-2 rounded-full ${actif ? 'bg-teal' : 'bg-navy/20'}`} />
                )}
              </div>
              <div
                className={`h-[3px] flex-1 rounded-full ${
                  i === etapes.length - 1 ? 'opacity-0' : fait ? 'bg-teal' : 'bg-navy/10'
                }`}
              />
            </div>
            <span
              className={`mt-2 text-center text-[9.5px] leading-tight ${
                fait || actif ? 'font-semibold text-navy' : 'font-medium text-slateink/70'
              }`}
            >
              {etape.court || etape.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
