import { Check } from 'lucide-react'
import { statutsCommande } from '../../data/mockData'

/** Parcours d'une commande : SOUMISE → ACCEPTÉE → PRÊTE → ENLEVÉE → PAYÉE. */
export default function TimelineCommande({ statut, className = '' }) {
  const courant = Math.max(0, statutsCommande.indexOf(statut))

  return (
    <div className={`flex items-start ${className}`}>
      {statutsCommande.map((etape, i) => {
        const fait = i < courant
        const actif = i === courant

        return (
          <div key={etape} className="flex min-w-0 flex-1 flex-col items-center">
            <div className="flex w-full items-center">
              <div
                className={`h-[3px] flex-1 rounded-full ${
                  i === 0 ? 'opacity-0' : fait || actif ? 'bg-success' : 'bg-navy/10'
                }`}
              />
              <div
                className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                  fait
                    ? 'border-success bg-success text-white'
                    : actif
                    ? 'border-success bg-white text-success'
                    : 'border-navy/15 bg-white text-navy/25'
                }`}
              >
                {fait ? (
                  <Check size={14} strokeWidth={3} />
                ) : (
                  <span
                    className={`h-2 w-2 rounded-full ${actif ? 'bg-success' : 'bg-navy/20'}`}
                  />
                )}
              </div>
              <div
                className={`h-[3px] flex-1 rounded-full ${
                  i === statutsCommande.length - 1 ? 'opacity-0' : fait ? 'bg-success' : 'bg-navy/10'
                }`}
              />
            </div>
            <span
              className={`mt-2 text-center text-[10.5px] leading-tight tracking-wide ${
                fait || actif ? 'font-bold text-navy' : 'font-medium text-slateink/70'
              }`}
            >
              {etape}
            </span>
          </div>
        )
      })}
    </div>
  )
}
