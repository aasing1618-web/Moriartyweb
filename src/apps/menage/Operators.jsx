import { useState } from 'react'
import { BadgeCheck, Clock, Navigation, Truck, ArrowRight } from 'lucide-react'
import { Avatar, Badge, Button, Card, ScreenBody, ScreenFooter, ScreenHeader, Stars } from '../../components/ui'
import { operateursDisponibles, fcfa } from '../../data/mockData'

const TRIS = ['Recommandés', 'Prix le plus bas', 'Mieux notés', 'Plus proches']

export default function Operators({ go, onChoisir, operateurChoisi }) {
  const [tri, setTri] = useState(TRIS[0])
  const choisiId = operateurChoisi?.id

  return (
    <>
      <ScreenHeader
        title="Opérateurs disponibles"
        subtitle="4 opérateurs autour de Parcelles U24"
        onBack={() => go('booking')}
      />

      <div className="no-scrollbar shrink-0 overflow-x-auto px-5 pb-3">
        <div className="flex gap-2">
          {TRIS.map((t) => (
            <button
              key={t}
              onClick={() => setTri(t)}
              className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition ${
                t === tri
                  ? 'bg-navy text-white shadow-lift'
                  : 'bg-white text-slateink shadow-card hover:text-navy'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <ScreenBody>
        <div className="space-y-3">
          {operateursDisponibles.map((op) => {
            const actif = op.id === choisiId
            return (
              <Card key={op.id} active={actif} onClick={() => onChoisir(op)}>
                <div className="flex gap-3">
                  <Avatar initiales={op.initiales} color={op.couleur} size="lg" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-[14.5px] font-bold leading-tight text-navy">
                          {op.nom}
                        </p>
                        <p className="truncate text-[11.5px] text-slateink">{op.entreprise}</p>
                      </div>
                      <p className="shrink-0 text-[15px] font-extrabold text-teal">
                        {fcfa(op.prix)}
                      </p>
                    </div>

                    <div className="mt-1.5 flex items-center gap-2">
                      <Stars note={op.note} count={op.avis} size={12} />
                    </div>

                    <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                      {op.verifie && (
                        <Badge tone="success" icon={BadgeCheck} size="sm">
                          Vérifié ONAS
                        </Badge>
                      )}
                      <Badge tone="neutral" icon={Clock} size="sm">
                        {op.delai}
                      </Badge>
                      <Badge tone="neutral" icon={Navigation} size="sm">
                        {op.distance}
                      </Badge>
                    </div>

                    <div className="mt-2.5 flex items-center gap-1.5 border-t border-navy/[0.06] pt-2.5 text-[11px] text-slateink">
                      <Truck size={13} strokeWidth={2.2} />
                      <span>{op.camion}</span>
                      <span className="ml-auto font-semibold text-navy">
                        {op.vidanges} vidanges
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <p className="mt-4 text-center text-[11px] leading-relaxed text-slateink">
          Les opérateurs « Vérifié ONAS » dépotent exclusivement en station agréée.
        </p>
      </ScreenBody>

      <ScreenFooter>
        <div className="mb-2.5 flex items-center justify-between text-[12.5px]">
          <span className="text-slateink">Opérateur sélectionné</span>
          <span className="font-bold text-navy">{operateurChoisi?.nom}</span>
        </div>
        <Button size="lg" block iconRight={ArrowRight} onClick={() => go('tracking')}>
          Confirmer la réservation
        </Button>
      </ScreenFooter>
    </>
  )
}
