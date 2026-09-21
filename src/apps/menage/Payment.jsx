import { useState } from 'react'
import { Banknote, Check, Lock, ShieldCheck, Loader2, QrCode, Smartphone, Truck, ArrowRight } from 'lucide-react'
import { Badge, Button, Card, ScreenBody, ScreenFooter, ScreenHeader } from '../../components/ui'
import { moyensPaiement, recapitulatif, fcfa } from '../../data/mockData'
import { usePlateforme } from '../../lib/PlateformeContext.jsx'

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

export default function Payment({ go, paiement, onChoisirPaiement, operateurChoisi }) {
  const { validerPaiementCommande, changerStatutCommande } = usePlateforme()
  const [enCours, setEnCours] = useState(false)
  const [codeMarchandSaisi, setCodeMarchandSaisi] = useState('WAVE-NDIAYE-883')
  const [codeValide, setCodeValide] = useState(false)

  const nomVidangeur = operateurChoisi?.nom || recapitulatif.operateur
  const montantTotal = operateurChoisi?.prix || recapitulatif.total

  const payerEtAutoriserDepart = () => {
    setEnCours(true)
    setTimeout(() => {
      validerPaiementCommande({
        commandeId: 'dem-1',
        modePaiement: paiement.nom,
        codeMarchand: codeMarchandSaisi,
      })
      changerStatutCommande('dem-1', 'CAMION_ENVOYE')
      setEnCours(false)
      setCodeValide(true)
      setTimeout(() => {
        go('tracking')
      }, 1000)
    }, 1200)
  }

  return (
    <>
      <ScreenHeader
        title="Étape 4 : Validation du Paiement"
        subtitle="Le camion est en attente d'autorisation de départ"
        onBack={() => go('operators')}
      />

      <ScreenBody>
        <Card className="border-amber/30 bg-gradient-to-br from-amber/[0.08] via-white to-teal/[0.04]">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-navy text-white shadow-2xs">
              <Truck size={19} strokeWidth={2.3} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13.5px] font-extrabold text-navy">Départ du camion conditionné au paiement</p>
              <p className="text-[11.5px] text-slateink">
                Vidangeur : <strong>{nomVidangeur}</strong>
              </p>
            </div>
            <Badge tone="amber" size="sm">
              En attente
            </Badge>
          </div>
        </Card>

        <p className="mb-2 mt-5 text-[12px] font-semibold uppercase tracking-wide text-slateink">
          Étape 3 : Mode de paiement choisi
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
                          Paiement rapide
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

        {/* Section Code Marchand si Wave ou Orange Money */}
        {paiement.id === 'wave' && (
          <div className="mt-4 rounded-2xl border border-teal/30 bg-teal/[0.05] p-4 shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <Smartphone className="text-teal" size={18} />
              <p className="text-[13px] font-bold text-navy">Code Marchand Wave du vidangeur</p>
            </div>
            <p className="text-[11.5px] text-slateink leading-relaxed mb-3">
              Confirmez le code marchand attribué à <strong>{nomVidangeur}</strong> pour déclencher la confirmation automatique de paiement.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={codeMarchandSaisi}
                onChange={(e) => setCodeMarchandSaisi(e.target.value)}
                placeholder="Ex : WAVE-NDIAYE-883"
                className="w-full rounded-xl border border-navy/15 bg-white px-3.5 py-2.5 text-[14px] font-bold text-navy shadow-2xs outline-none focus:border-teal"
              />
              <span className="flex shrink-0 items-center justify-center rounded-xl bg-teal px-3 py-2.5 text-[11.5px] font-bold text-white">
                Vérifié
              </span>
            </div>
          </div>
        )}

        <p className="mb-2 mt-5 text-[12px] font-semibold uppercase tracking-wide text-slateink">
          Récapitulatif financier
        </p>
        <Card>
          <div className="space-y-2 text-[13px]">
            <div className="flex justify-between">
              <span className="text-slateink">
                Prestation vidange ~8 m³ — {nomVidangeur}
              </span>
              <span className="font-semibold text-navy">{fcfa(montantTotal - 2500)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slateink">Redevance dépotage station</span>
              <span className="font-semibold text-navy">{fcfa(2000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slateink">Commission plateforme</span>
              <span className="font-semibold text-navy">{fcfa(500)}</span>
            </div>
            <div className="mt-1 flex items-end justify-between border-t border-navy/[0.07] pt-3">
              <span className="text-[13px] font-extrabold text-navy">Montant total</span>
              <span className="text-[22px] font-black leading-none text-teal">
                {fcfa(montantTotal)}
              </span>
            </div>
          </div>
        </Card>

        <div className="mt-3 flex items-start gap-2.5 rounded-2xl bg-teal/[0.07] p-3.5">
          <Lock size={16} className="mt-0.5 shrink-0 text-teal" strokeWidth={2.2} />
          <p className="text-[11.5px] leading-relaxed text-slateink">
            Une fois le paiement validé, la commande passe automatiquement au statut{' '}
            <span className="font-bold text-navy">« Paiement confirmé »</span> et le camion est immédiatement autorisé à partir vers votre domicile.
          </p>
        </div>
      </ScreenBody>

      <ScreenFooter>
        <Button size="lg" block onClick={payerEtAutoriserDepart} disabled={enCours || codeValide}>
          {enCours ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Validation du paiement en cours…
            </>
          ) : codeValide ? (
            <>
              <Check size={18} />
              Paiement Confirmé ! Camion en route…
            </>
          ) : (
            `Valider le paiement (${fcfa(montantTotal)})`
          )}
        </Button>
        <p className="mt-2 text-center text-[10.5px] italic text-slateink">
          « Simulation de validation sécurisée — prêt pour intégration API Wave / Orange Money »
        </p>
      </ScreenFooter>
    </>
  )
}

