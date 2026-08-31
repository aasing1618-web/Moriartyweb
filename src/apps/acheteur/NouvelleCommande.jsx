import { useState } from 'react'
import {
  Package,
  MapPin,
  CalendarDays,
  Truck,
  CreditCard,
  Percent,
  Check,
  ArrowRight,
  ChevronDown,
} from 'lucide-react'
import { Badge, Button, Card, SectionTitle } from '../../components/ui'
import TimelineCommande from './TimelineCommande.jsx'
import {
  produitsValorisation,
  modesRetrait,
  moyensPaiement,
  statutsCommande,
  commissionCommande,
  profilAcheteur,
  fcfa,
} from '../../data/mockData'

function Champ({ icon: Icon, label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-wide text-slateink">
        <Icon size={13} strokeWidth={2.4} />
        {label}
      </span>
      {children}
    </label>
  )
}

const classeChamp =
  'w-full appearance-none rounded-2xl border border-navy/10 bg-white px-4 py-3 text-[13.5px] font-semibold text-navy shadow-card outline-none transition focus:border-teal'

export default function NouvelleCommande({ produitInitial, onTerminee }) {
  const [produitId, setProduitId] = useState((produitInitial || produitsValorisation[0]).id)
  const [quantite, setQuantite] = useState(5)
  const [date, setDate] = useState('2026-08-22')
  const [retrait, setRetrait] = useState(modesRetrait[0])
  const [paiement, setPaiement] = useState(moyensPaiement[0].nom)
  const [statut, setStatut] = useState(null)

  const produit = produitsValorisation.find((p) => p.id === produitId) || produitsValorisation[0]
  const sousTotal = produit.prix * quantite
  const total = sousTotal + commissionCommande

  const indexStatut = statutsCommande.indexOf(statut)
  const suivant = indexStatut >= 0 ? statutsCommande[indexStatut + 1] : null

  /* ---------------------------------------------------------------- */
  /*  Commande soumise : suivi du parcours                            */
  /* ---------------------------------------------------------------- */
  if (statut) {
    return (
      <div className="space-y-5">
        <Card className="!p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <Badge tone="success" icon={Check}>
                Commande enregistrée
              </Badge>
              <h2 className="mt-2.5 text-[20px] font-bold text-navy">CMD-2026-0152</h2>
              <p className="mt-1 text-[13px] text-slateink">
                {produit.nom} · {quantite} {produit.unite} · station {produit.station}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11.5px] text-slateink">Total réglé</p>
              <p className="text-[24px] font-extrabold leading-none text-navy">{fcfa(total)}</p>
            </div>
          </div>

          <div className="mt-7">
            <TimelineCommande statut={statut} />
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-navy/[0.07] pt-5">
            <p className="text-[12.5px] text-slateink">
              Statut actuel : <span className="font-bold text-navy">{statut}</span>
              {suivant && ' — la station met à jour le statut à chaque étape.'}
            </p>
            {suivant ? (
              <Button size="sm" iconRight={ArrowRight} onClick={() => setStatut(suivant)}>
                Passer à « {suivant} »
              </Button>
            ) : (
              <Button size="sm" variant="outline" onClick={onTerminee}>
                Voir mon historique
              </Button>
            )}
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Card className="!p-6">
            <SectionTitle>Détail de la commande</SectionTitle>
            {[
              ['Produit', produit.nom],
              ['Quantité', `${quantite} ${produit.unite}`],
              ['Station', produit.station],
              ['Date souhaitée', new Date(date).toLocaleDateString('fr-FR')],
              ['Mode de retrait', retrait],
              ['Paiement', paiement],
              ['Usage déclaré', profilAcheteur.usageDeclare],
            ].map(([label, valeur]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4 border-b border-navy/[0.06] py-2.5 text-[12.5px] last:border-0"
              >
                <span className="text-slateink">{label}</span>
                <span className="text-right font-semibold text-navy">{valeur}</span>
              </div>
            ))}
          </Card>

          <Card className="!p-6">
            <SectionTitle>Répartition du paiement</SectionTitle>
            <div className="space-y-2.5 text-[13px]">
              <div className="flex justify-between">
                <span className="text-slateink">
                  Produit — délégataire (station {produit.station})
                </span>
                <span className="font-semibold text-navy">{fcfa(sousTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slateink">Commission plateforme</span>
                <span className="font-semibold text-navy">{fcfa(commissionCommande)}</span>
              </div>
              <div className="flex items-end justify-between border-t border-navy/[0.07] pt-3">
                <span className="font-semibold text-navy">Total</span>
                <span className="text-[19px] font-extrabold leading-none text-success">
                  {fcfa(total)}
                </span>
              </div>
            </div>
            <p className="mt-4 flex items-start gap-2 rounded-2xl bg-amber/[0.09] p-3.5 text-[11.5px] leading-relaxed text-slateink">
              <Percent size={14} className="mt-0.5 shrink-0 text-amber-600" strokeWidth={2.3} />
              La commission de {fcfa(commissionCommande)} par commande est paramétrable depuis
              l’Espace Régulateur (ONAS), onglet Tarification.
            </p>
          </Card>
        </div>
      </div>
    )
  }

  /* ---------------------------------------------------------------- */
  /*  Formulaire de commande                                          */
  /* ---------------------------------------------------------------- */
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
      <Card className="!p-7 xl:col-span-2">
        <SectionTitle>Passer une commande</SectionTitle>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Champ icon={Package} label="Produit">
              <div className="relative">
                <select
                  value={produitId}
                  onChange={(e) => setProduitId(e.target.value)}
                  className={classeChamp}
                >
                  {produitsValorisation.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nom} — {p.station}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slateink"
                />
              </div>
            </Champ>
          </div>

          <Champ icon={Package} label={`Quantité (${produit.unite})`}>
            <input
              type="number"
              min={1}
              max={produit.quantite}
              value={quantite}
              onChange={(e) => setQuantite(Math.max(1, Number(e.target.value)))}
              className={classeChamp}
            />
          </Champ>

          <Champ icon={MapPin} label="Station">
            <input value={produit.station} readOnly className={`${classeChamp} bg-mist`} />
          </Champ>

          <Champ icon={CalendarDays} label="Date souhaitée">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={classeChamp}
            />
          </Champ>

          <Champ icon={Truck} label="Mode de retrait">
            <div className="relative">
              <select
                value={retrait}
                onChange={(e) => setRetrait(e.target.value)}
                className={classeChamp}
              >
                {modesRetrait.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slateink"
              />
            </div>
          </Champ>

          <div className="md:col-span-2">
            <Champ icon={CreditCard} label="Paiement">
              <div className="flex flex-wrap gap-2">
                {[...moyensPaiement.map((m) => m.nom), 'Virement'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setPaiement(m)}
                    className={`rounded-xl px-4 py-2.5 text-[12.5px] font-semibold transition ${
                      m === paiement
                        ? 'bg-navy text-white shadow-lift'
                        : 'bg-cream text-slateink hover:text-navy'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </Champ>
          </div>
        </div>
      </Card>

      <Card className="!p-7">
        <SectionTitle>Récapitulatif</SectionTitle>
        <div className="space-y-2.5 text-[13px]">
          <div className="flex justify-between gap-3">
            <span className="text-slateink">
              {quantite} {produit.unite} × {fcfa(produit.prix)}
            </span>
            <span className="shrink-0 font-semibold text-navy">{fcfa(sousTotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slateink">Commission plateforme</span>
            <span className="font-semibold text-navy">{fcfa(commissionCommande)}</span>
          </div>
          <div className="flex items-end justify-between border-t border-navy/[0.07] pt-3">
            <span className="font-semibold text-navy">Total</span>
            <span className="text-[20px] font-extrabold leading-none text-success">
              {fcfa(total)}
            </span>
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-cream p-4 text-[11.5px] leading-relaxed text-slateink">
          Commande passée au nom de{' '}
          <span className="font-semibold text-navy">{profilAcheteur.raisonSociale}</span> · usage
          déclaré : {profilAcheteur.usageDeclare}.
        </div>

        <Button
          size="lg"
          block
          className="mt-5"
          icon={Check}
          onClick={() => setStatut(statutsCommande[0])}
        >
          Soumettre la commande
        </Button>
        <p className="mt-2.5 text-center text-[10.5px] italic text-slateink">
          « Paiement sécurisé opéré par un partenaire agréé. »
        </p>
      </Card>
    </div>
  )
}
