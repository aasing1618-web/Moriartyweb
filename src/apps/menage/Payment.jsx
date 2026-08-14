import { useState } from 'react'
import { Banknote, Check, Lock, ShieldCheck, Loader2 } from 'lucide-react'
import { Badge, Button, Card, ScreenBody, ScreenFooter, ScreenHeader } from '../../components/ui'
import { moyensPaiement, recapitulatif, fcfa } from '../../data/mockData'

/** Pastilles de paiement stylisées en CSS/SVG — aucun logo officiel utilisé. */
function Pastille({ moyen }) {
  if (moyen.id === 'wave') {
    return (
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
        style={{ background: moyen.couleur }}
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <path
            d="M2 14c2.6-4 5.2-4 7.8 0s5.2 4 7.8 0M2 9c2.6-4 5.2-4 7.8 0s5.2 4 7.8 0"
            stroke="white"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
        </svg>
      </span>
    )
  }
  if (moyen.id === 'om') {
    return (
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-[13px] font-extrabold text-white"
        style={{ background: moyen.couleur }}
      >
        OM
      </span>
    )
  }
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slateink/15 text-slateink">
      <Banknote size={20} strokeWidth={2.1} />
    </span>
  )
}

export default function Payment({ go, paiement, onChoisirPaiement }) {
  const [enCours, setEnCours] = useState(false)

  const payer = () => {
    setEnCours(true)
    setTimeout(() => go('confirmation'), 1500)
  }

  return (
    <>
      <ScreenHeader title="Paiement" subtitle="Vidange terminée · dépotage confirmé" onBack={() => go('tracking')} />

      <ScreenBody>
        <Card className="border-success/20 bg-gradient-to-br from-success/[0.07] to-white">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-success text-white">
              <ShieldCheck size={19} strokeWidth={2.3} />
            </span>
            <div>
              <p className="text-[13.5px] font-bold text-navy">Dépotage certifié conforme</p>
              <p className="text-[11.5px] text-slateink">{recapitulatif.station}</p>
            </div>
          </div>
        </Card>

        <p className="mb-2 mt-5 text-[12px] font-semibold uppercase tracking-wide text-slateink">
          Moyen de paiement
        </p>
        <div className="space-y-2.5">
          {moyensPaiement.map((m) => {
            const actif = m.id === paiement.id
            return (
              <Card key={m.id} active={actif} onClick={() => onChoisirPaiement(m)} className="!p-3.5">
                <div className="flex items-center gap-3">
                  <Pastille moyen={m} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[14px] font-bold text-navy">{m.nom}</p>
                      {m.recommande && (
                        <Badge tone="teal" size="sm">
                          Recommandé
                        </Badge>
                      )}
                    </div>
                    <p className="truncate text-[11.5px] text-slateink">{m.detail}</p>
                  </div>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${
                      actif ? 'border-teal bg-teal text-white' : 'border-navy/15 text-transparent'
                    }`}
                  >
                    <Check size={13} strokeWidth={3} />
                  </span>
                </div>
              </Card>
            )
          })}
        </div>

        <p className="mb-2 mt-5 text-[12px] font-semibold uppercase tracking-wide text-slateink">
          Récapitulatif
        </p>
        <Card>
          <div className="space-y-2 text-[13px]">
            <div className="flex justify-between">
              <span className="text-slateink">{recapitulatif.service}</span>
              <span className="font-semibold text-navy">{fcfa(recapitulatif.prestation)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slateink">Opérateur</span>
              <span className="font-semibold text-navy">{recapitulatif.operateur}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slateink">Frais de plateforme</span>
              <span className="font-semibold text-navy">{fcfa(recapitulatif.fraisPlateforme)}</span>
            </div>
            <div className="mt-1 flex items-end justify-between border-t border-navy/[0.07] pt-3">
              <span className="text-[13px] font-semibold text-navy">Total à payer</span>
              <span className="text-[20px] font-extrabold leading-none text-teal">
                {fcfa(recapitulatif.total)}
              </span>
            </div>
          </div>
        </Card>

        <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slateink">
          <Lock size={13} strokeWidth={2.2} />
          Paiement sécurisé · reçu numérique généré automatiquement
        </div>
      </ScreenBody>

      <ScreenFooter>
        <Button size="lg" block onClick={payer} disabled={enCours}>
          {enCours ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Paiement en cours…
            </>
          ) : (
            `Payer ${fcfa(recapitulatif.total)}`
          )}
        </Button>
      </ScreenFooter>
    </>
  )
}
