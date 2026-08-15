import { useState } from 'react'
import { Route, MessageSquareWarning, Check, X, Clock3, ShieldAlert } from 'lucide-react'
import { Badge, Button, Card, SectionTitle } from '../../components/ui'
import { alertesVerification } from '../../data/mockData'

const TYPES = {
  Déviation: { tone: 'danger', icon: Route },
  'Signalement citoyen': { tone: 'amber', icon: MessageSquareWarning },
}

const STATUTS = {
  'À vérifier': { tone: 'warning', icon: Clock3 },
  Confirmé: { tone: 'success', icon: Check },
  Rejeté: { tone: 'neutral', icon: X },
}

export default function Verification() {
  // Instruction simulée : seul l'état local de la carte change.
  const [statuts, setStatuts] = useState(
    Object.fromEntries(alertesVerification.map((a) => [a.id, a.statut]))
  )

  const trancher = (id, statut) => setStatuts((s) => ({ ...s, [id]: statut }))

  const aVerifier = alertesVerification.filter((a) => statuts[a.id] === 'À vérifier').length

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {[
          { label: 'Alertes à vérifier', valeur: aVerifier, detail: 'en attente d’instruction' },
          { label: 'Déviations de trajet', valeur: 2, detail: 'corridors quittés aujourd’hui' },
          { label: 'Signalements citoyens', valeur: 2, detail: 'reçus dans les dernières 24 h' },
        ].map((s) => (
          <Card key={s.label} className="!p-6">
            <p className="text-[12px] font-medium uppercase tracking-wide text-slateink">
              {s.label}
            </p>
            <p className="mt-2 text-[28px] font-extrabold leading-none text-navy">{s.valeur}</p>
            <p className="mt-2 text-[12px] text-slateink">{s.detail}</p>
          </Card>
        ))}
      </div>

      <Card className="!p-6">
        <SectionTitle
          action={
            <Badge tone="neutral" icon={ShieldAlert}>
              Aucune sanction automatique — vérification humaine requise
            </Badge>
          }
        >
          File d’instruction
        </SectionTitle>

        <div className="space-y-3">
          {alertesVerification.map((a) => {
            const type = TYPES[a.type]
            const statut = statuts[a.id]
            const infoStatut = STATUTS[statut]
            const TypeIcon = type.icon

            return (
              <div
                key={a.id}
                className="flex flex-col gap-4 rounded-2xl border border-navy/[0.07] bg-cream p-5 md:flex-row md:items-center"
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                    a.type === 'Déviation' ? 'bg-danger/10 text-danger' : 'bg-amber/12 text-amber-600'
                  }`}
                >
                  <TypeIcon size={19} strokeWidth={2.2} />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={type.tone} size="sm">
                      {a.type}
                    </Badge>
                    <span className="text-[13.5px] font-bold text-navy">{a.reference}</span>
                    {a.type === 'Déviation' && (
                      <span className="text-[12px] text-slateink">· {a.detail}</span>
                    )}
                  </div>
                  <p className="mt-1.5 text-[13px] text-slateink">{a.description}</p>
                  <p className="mt-1 text-[11.5px] text-slateink/80">{a.temps}</p>
                </div>

                <div className="flex shrink-0 items-center gap-2.5">
                  <Badge tone={infoStatut.tone} icon={infoStatut.icon}>
                    {statut}
                  </Badge>

                  {statut === 'À vérifier' && (
                    <>
                      <Button size="sm" icon={Check} onClick={() => trancher(a.id, 'Confirmé')}>
                        Confirmer
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        icon={X}
                        onClick={() => trancher(a.id, 'Rejeté')}
                      >
                        Rejeter
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
