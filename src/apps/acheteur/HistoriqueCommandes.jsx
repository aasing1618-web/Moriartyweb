import { useState } from 'react'
import { FileCheck2, Download, X, MapPin, CalendarDays, Truck, Check } from 'lucide-react'
import { Badge, Button, Card, SectionTitle } from '../../components/ui'
import TimelineCommande from './TimelineCommande.jsx'
import { commandesAcheteur, profilAcheteur, commissionCommande, fcfa } from '../../data/mockData'

const TON_STATUT = {
  SOUMISE: 'warning',
  ACCEPTÉE: 'teal',
  PRÊTE: 'teal',
  ENLEVÉE: 'navy',
  PAYÉE: 'success',
}

/**
 * Bordereau de conformité : pendant aval de la preuve de dépotage amont.
 * Affichage seul — aucun fichier n'est réellement généré.
 */
function Bordereau({ commande, onFermer }) {
  const [telecharge, setTelecharge] = useState(false)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/50 p-4 backdrop-blur-sm">
      <div className="max-h-[88vh] w-full max-w-lg animate-fade-up overflow-y-auto rounded-3xl bg-white p-6 shadow-phone">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge tone="success" icon={FileCheck2}>
              Bordereau de conformité
            </Badge>
            <h3 className="mt-2.5 text-[19px] font-bold leading-tight text-navy">
              {commande.id}
            </h3>
          </div>
          <button
            onClick={onFermer}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mist text-navy transition hover:bg-navy-50"
          >
            <X size={17} strokeWidth={2.4} />
          </button>
        </div>

        <div className="mt-5 rounded-2xl border border-navy/[0.07] bg-cream p-1">
          {[
            ['Acheteur', profilAcheteur.raisonSociale],
            ['NINEA', profilAcheteur.ninea],
            ['Origine', 'Boues de vidange collectées en filière tracée'],
            ['Station de traitement', commande.station],
            ['Date de livraison', commande.date],
            ['Traitement appliqué', commande.traitement],
            ['Produit', commande.produit],
            ['Quantité', `${commande.quantite} ${commande.unite}`],
            ['Usage déclaré', commande.usage],
            ['Conformité', 'Norme NS 05-061 — réutilisation autorisée'],
          ].map(([label, valeur]) => (
            <div
              key={label}
              className="flex items-start justify-between gap-4 border-b border-navy/[0.06] px-4 py-3 text-[12.5px] last:border-0"
            >
              <span className="shrink-0 text-slateink">{label}</span>
              <span className="text-right font-semibold text-navy">{valeur}</span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[11.5px] leading-relaxed text-slateink">
          Ce bordereau atteste la traçabilité du sous-produit, de la collecte à la livraison — le
          pendant, côté valorisation, de la preuve de dépotage côté collecte.
        </p>

        <Button
          size="lg"
          block
          className="mt-5"
          icon={telecharge ? Check : Download}
          onClick={() => setTelecharge(true)}
        >
          {telecharge ? 'Bordereau téléchargé (PDF)' : 'Télécharger le bordereau (PDF)'}
        </Button>
      </div>
    </div>
  )
}

export default function HistoriqueCommandes() {
  const [bordereau, setBordereau] = useState(null)

  const totalAchete = commandesAcheteur.reduce((s, c) => s + c.montant, 0)

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {[
          { label: 'Commandes passées', valeur: commandesAcheteur.length, detail: 'depuis avril 2026' },
          { label: 'Total acheté', valeur: fcfa(totalAchete), detail: 'commissions incluses' },
          {
            label: 'Bordereaux disponibles',
            valeur: commandesAcheteur.filter((c) => ['ENLEVÉE', 'PAYÉE'].includes(c.statut)).length,
            detail: 'commandes livrées',
          },
        ].map((s) => (
          <Card key={s.label} className="!p-6">
            <p className="text-[12px] font-medium uppercase tracking-wide text-slateink">
              {s.label}
            </p>
            <p className="mt-2 text-[26px] font-extrabold leading-none text-navy">{s.valeur}</p>
            <p className="mt-2 text-[12px] text-slateink">{s.detail}</p>
          </Card>
        ))}
      </div>

      <SectionTitle>Historique des commandes</SectionTitle>

      <div className="space-y-4">
        {commandesAcheteur.map((c) => {
          const livree = ['ENLEVÉE', 'PAYÉE'].includes(c.statut)
          return (
            <Card key={c.id} className="!p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[15px] font-bold text-navy">{c.id}</span>
                    <Badge tone={TON_STATUT[c.statut]} size="sm">
                      {c.statut}
                    </Badge>
                  </div>
                  <p className="mt-1.5 text-[13.5px] font-semibold text-navy">{c.produit}</p>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-slateink">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} strokeWidth={2.3} /> Station {c.station}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CalendarDays size={13} strokeWidth={2.3} /> {c.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Truck size={13} strokeWidth={2.3} /> {c.retrait}
                    </span>
                    <span>
                      {c.quantite} {c.unite} · {c.paiement}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[19px] font-extrabold leading-none text-navy">
                    {fcfa(c.montant)}
                  </p>
                  <p className="mt-1 text-[11px] text-slateink">
                    dont {fcfa(commissionCommande)} de commission
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-navy/[0.07] pt-5">
                <TimelineCommande statut={c.statut} />
              </div>

              {livree && (
                <div className="mt-5 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={FileCheck2}
                    onClick={() => setBordereau(c)}
                  >
                    Bordereau de conformité
                  </Button>
                </div>
              )}
            </Card>
          )
        })}
      </div>

      {bordereau && <Bordereau commande={bordereau} onFermer={() => setBordereau(null)} />}
    </div>
  )
}
