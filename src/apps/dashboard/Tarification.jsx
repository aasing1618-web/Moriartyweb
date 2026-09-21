import { useState } from 'react'
import { Calculator, Percent, Truck, Factory, Building2, Sliders, Info, Save, CheckCircle2, ShieldAlert, CloudRain } from 'lucide-react'
import { Card, SectionTitle, Badge, Button } from '../../components/ui'
import {
  parametresFinanciers,
  commissionCommande as commissionCommandeDefaut,
} from '../../data/mockData'
import { usePlateforme } from '../../lib/PlateformeContext.jsx'

const fcfaFormat = (val) =>
  `${Math.round(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} FCFA`

export default function Tarification() {
  const { grilleTarifaire, modifierGrilleTarifaire } = usePlateforme()
  const [volume, setVolume] = useState(8)
  const [distance, setDistance] = useState(12)
  const [sauvegardeOk, setSauvegardeOk] = useState(false)

  // Paramètres de commission pilotés par le régulateur
  const [commissionVidange, setCommissionVidange] = useState(
    parametresFinanciers.commissionPlateforme
  )
  const [commissionCommande, setCommissionCommande] = useState(commissionCommandeDefaut)
  const [redevanceM3, setRedevanceM3] = useState(parametresFinanciers.redevanceParM3)

  // État des paramètres tarifaires terrain
  const [formGrille, setFormGrille] = useState(grilleTarifaire)

  const enregistrerParametres = () => {
    modifierGrilleTarifaire(formGrille)
    setSauvegardeOk(true)
    setTimeout(() => setSauvegardeOk(false), 3000)
  }

  // Calcul dynamique selon les paramètres terrain enregistrés
  const baseCost = formGrille.tarifBase
  const volumeCost = volume * formGrille.prixParM3
  const distanceCost = Math.max(0, distance - 5) * formGrille.coutKmChauffeur
  const prixTotalCalcul = baseCost + volumeCost + distanceCost
  const partVidangeur = Math.round(prixTotalCalcul * 0.65)
  const partDelegataire = Math.round(prixTotalCalcul * 0.25)
  const partOnas = Math.round(prixTotalCalcul * 0.10)

  const exemples = [
    {
      cas: 'Petite fosse (3 m³), proche (3 km)',
      volume: '3 m³',
      distance: '3 km',
      prix: fcfaFormat(formGrille.tarifBase + 3 * formGrille.prixParM3),
      vidangeur: fcfaFormat((formGrille.tarifBase + 3 * formGrille.prixParM3) * 0.65),
      delegataire: fcfaFormat((formGrille.tarifBase + 3 * formGrille.prixParM3) * 0.25),
      onas: fcfaFormat((formGrille.tarifBase + 3 * formGrille.prixParM3) * 0.1),
    },
    {
      cas: 'Fosse moyenne (6 m³), 10 km',
      volume: '6 m³',
      distance: '10 km',
      prix: fcfaFormat(formGrille.tarifBase + 6 * formGrille.prixParM3 + 5 * formGrille.coutKmChauffeur),
      vidangeur: fcfaFormat((formGrille.tarifBase + 6 * formGrille.prixParM3 + 5 * formGrille.coutKmChauffeur) * 0.65),
      delegataire: fcfaFormat((formGrille.tarifBase + 6 * formGrille.prixParM3 + 5 * formGrille.coutKmChauffeur) * 0.25),
      onas: fcfaFormat((formGrille.tarifBase + 6 * formGrille.prixParM3 + 5 * formGrille.coutKmChauffeur) * 0.1),
    },
    {
      cas: 'Grande fosse (10 m³), station éloignée (18 km)',
      volume: '10 m³',
      distance: '18 km',
      prix: fcfaFormat(formGrille.tarifBase + 10 * formGrille.prixParM3 + 13 * formGrille.coutKmChauffeur),
      vidangeur: fcfaFormat((formGrille.tarifBase + 10 * formGrille.prixParM3 + 13 * formGrille.coutKmChauffeur) * 0.65),
      delegataire: fcfaFormat((formGrille.tarifBase + 10 * formGrille.prixParM3 + 13 * formGrille.coutKmChauffeur) * 0.25),
      onas: fcfaFormat((formGrille.tarifBase + 10 * formGrille.prixParM3 + 13 * formGrille.coutKmChauffeur) * 0.1),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Notifications de confirmation */}
      {sauvegardeOk && (
        <div className="flex items-center gap-3 rounded-2xl bg-success/10 border border-success/30 p-4 text-success font-bold text-[13px]">
          <CheckCircle2 size={20} />
          <span>
            Paramètres de tarification terrain enregistrés ! L'estimation automatique des prix est mise à jour sur l'application Ménage et Opérateur en temps réel.
          </span>
        </div>
      )}

      {/* Formule de calcul */}
      <Card className="relative overflow-hidden !p-7">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-3 py-1 text-[12px] font-semibold text-teal">
              <Calculator size={14} strokeWidth={2.2} />
              Formule de tarification terrain réglementée
            </span>
            <h2 className="text-[20px] font-bold text-navy">Structure du tarif unifié (Données du Terrain)</h2>
          </div>
          <Badge tone="teal" icon={Percent}>
            Clé 65 / 25 / 10
          </Badge>
        </div>

        <div className="mt-5 rounded-2xl bg-navy p-5 text-white shadow-lift">
          <p className="font-mono text-[15px] sm:text-[17px] font-bold tracking-wide text-amber">
            Tarif estimatif = Base ({fcfaFormat(formGrille.tarifBase)}) + (Vol × {fcfaFormat(formGrille.prixParM3)}) + (Dist × {fcfaFormat(formGrille.coutKmChauffeur)}) + Suppléments
          </p>
        </div>

        <p className="mt-3 flex items-center gap-1.5 text-[12px] text-slateink">
          <Info size={14} className="shrink-0 text-teal" />
          <span>
            Modèle de tarification basé sur le terrain — calcul automatique du tarif estimatif, suivi de la confirmation du vidangeur.
          </span>
        </p>
      </Card>

      {/* SECTION ADMINISTRATION DES PARAMÈTRES TARIFS TERRAIN */}
      <Card className="!p-7 border-2 border-teal/20 bg-gradient-to-br from-white to-teal/[0.03]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-navy/10 pb-5">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-3 py-1 text-[12px] font-bold text-teal mb-2">
              <Sliders size={14} /> Administration des Données de Terrain
            </span>
            <h2 className="text-[20px] font-bold text-navy">Paramètres Tarifaires Configurbles (Sans modification de code)</h2>
            <p className="text-[12.5px] text-slateink mt-1">
              Ces données alimentent directement la logique de calcul du « Prix Estimatif » ménage.
            </p>
          </div>
          <Button size="md" icon={Save} onClick={enregistrerParametres}>
            Enregistrer les paramètres
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <label className="block bg-white p-4 rounded-2xl border border-navy/10 shadow-card">
            <span className="block text-[11.5px] font-extrabold uppercase text-slateink mb-1.5">
              Tarif de Base (FCFA)
            </span>
            <input
              type="number"
              value={formGrille.tarifBase}
              onChange={(e) => setFormGrille({ ...formGrille, tarifBase: Number(e.target.value) })}
              className="w-full rounded-xl border border-navy/15 px-3 py-2 text-[16px] font-bold text-navy outline-none focus:border-teal"
            />
          </label>

          <label className="block bg-white p-4 rounded-2xl border border-navy/10 shadow-card">
            <span className="block text-[11.5px] font-extrabold uppercase text-slateink mb-1.5">
              Prix par m³ de fosse (FCFA / m³)
            </span>
            <input
              type="number"
              value={formGrille.prixParM3}
              onChange={(e) => setFormGrille({ ...formGrille, prixParM3: Number(e.target.value) })}
              className="w-full rounded-xl border border-navy/15 px-3 py-2 text-[16px] font-bold text-navy outline-none focus:border-teal"
            />
          </label>

          <label className="block bg-white p-4 rounded-2xl border border-navy/10 shadow-card">
            <span className="block text-[11.5px] font-extrabold uppercase text-slateink mb-1.5">
              Coût kilométrique (FCFA / km)
            </span>
            <input
              type="number"
              value={formGrille.coutKmChauffeur}
              onChange={(e) => setFormGrille({ ...formGrille, coutKmChauffeur: Number(e.target.value) })}
              className="w-full rounded-xl border border-navy/15 px-3 py-2 text-[16px] font-bold text-navy outline-none focus:border-teal"
            />
          </label>

          <label className="block bg-white p-4 rounded-2xl border border-navy/10 shadow-card">
            <span className="block text-[11.5px] font-extrabold uppercase text-slateink mb-1.5">
              Supplément Urgence (FCFA)
            </span>
            <input
              type="number"
              value={formGrille.fraisUrgence}
              onChange={(e) => setFormGrille({ ...formGrille, fraisUrgence: Number(e.target.value) })}
              className="w-full rounded-xl border border-navy/15 px-3 py-2 text-[16px] font-bold text-navy outline-none focus:border-teal"
            />
          </label>

          <label className="block bg-white p-4 rounded-2xl border border-navy/10 shadow-card">
            <span className="block text-[11.5px] font-extrabold uppercase text-slateink mb-1.5">
              Supplément Hivernage (FCFA)
            </span>
            <input
              type="number"
              value={formGrille.fraisHivernage}
              onChange={(e) => setFormGrille({ ...formGrille, fraisHivernage: Number(e.target.value) })}
              className="w-full rounded-xl border border-navy/15 px-3 py-2 text-[16px] font-bold text-navy outline-none focus:border-teal"
            />
          </label>

          <label className="block bg-white p-4 rounded-2xl border border-navy/10 shadow-card">
            <span className="block text-[11.5px] font-extrabold uppercase text-slateink mb-1.5">
              Supplément Accès Difficile (FCFA)
            </span>
            <input
              type="number"
              value={formGrille.fraisAccesDifficile}
              onChange={(e) => setFormGrille({ ...formGrille, fraisAccesDifficile: Number(e.target.value) })}
              className="w-full rounded-xl border border-navy/15 px-3 py-2 text-[16px] font-bold text-navy outline-none focus:border-teal"
            />
          </label>
        </div>
      </Card>

      {/* Clé de répartition (3 cartes + barre empilée) */}
      <div className="space-y-3">
        <h3 className="text-[16px] font-bold text-navy">Clé de répartition automatique</h3>
        
        {/* Barre empilée visualisant le 100% */}
        <div className="h-4 w-full overflow-hidden rounded-full bg-mist flex shadow-inner">
          <div className="h-full bg-teal transition-all duration-300" style={{ width: '65%' }} title="Vidangeur (65%)" />
          <div className="h-full bg-royal transition-all duration-300" style={{ width: '25%' }} title="Délégataire (25%)" />
          <div className="h-full bg-amber transition-all duration-300" style={{ width: '10%' }} title="ONAS (10%)" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="!p-5 border-l-4 border-l-teal">
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal">
                <Truck size={20} strokeWidth={2.2} />
              </span>
              <span className="text-[26px] font-extrabold text-teal">65 %</span>
            </div>
            <h4 className="mt-3 text-[15px] font-bold text-navy">Vidangeur</h4>
            <p className="mt-1 text-[12px] text-slateink">
              Rémunération du transport, carburant, amortissement et prestation de vidange.
            </p>
          </Card>

          <Card className="!p-5 border-l-4 border-l-royal">
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal/10 text-royal">
                <Factory size={20} strokeWidth={2.2} />
              </span>
              <span className="text-[26px] font-extrabold text-royal">25 %</span>
            </div>
            <h4 className="mt-3 text-[15px] font-bold text-navy">Délégataire (station)</h4>
            <p className="mt-1 text-[12px] text-slateink">
              Frais de potence, dépotage et exploitation de la station de traitement.
            </p>
          </Card>

          <Card className="!p-5 border-l-4 border-l-amber">
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber/10 text-amber-600">
                <Building2 size={20} strokeWidth={2.2} />
              </span>
              <span className="text-[26px] font-extrabold text-amber-600">10 %</span>
            </div>
            <h4 className="mt-3 text-[15px] font-bold text-navy">ONAS (redevance)</h4>
            <p className="mt-1 text-[12px] text-slateink">
              Redevance d'assainissement, régulation sectorielle et contrôle environnemental.
            </p>
          </Card>
        </div>
      </div>

      {/* Simulateur interactif (Curseurs) */}
      <Card className="!p-6 bg-gradient-to-br from-white to-mist/60">
        <SectionTitle
          action={
            <Badge tone="teal" icon={Sliders}>
              JS local en direct
            </Badge>
          }
        >
          Simulateur de tarif personnalisé
        </SectionTitle>

        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Curseur Volume */}
          <div className="rounded-2xl border border-navy/[0.07] bg-white p-4 shadow-card">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-bold text-navy">Volume à vidanger</label>
              <span className="rounded-lg bg-teal/10 px-2.5 py-1 text-[13px] font-extrabold text-teal">
                {volume} m³
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="mt-3 w-full accent-teal cursor-pointer"
            />
            <div className="mt-1 flex justify-between text-[10.5px] text-slateink font-medium">
              <span>1 m³</span>
              <span>15 m³</span>
            </div>
          </div>

          {/* Curseur Distance */}
          <div className="rounded-2xl border border-navy/[0.07] bg-white p-4 shadow-card">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-bold text-navy">Distance à la station</label>
              <span className="rounded-lg bg-royal/10 px-2.5 py-1 text-[13px] font-extrabold text-royal">
                {distance} km
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={30}
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="mt-3 w-full accent-royal cursor-pointer"
            />
            <div className="mt-1 flex justify-between text-[10.5px] text-slateink font-medium">
              <span>0 km (franchise 5 km)</span>
              <span>30 km</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Tableau des exemples pré-calculés + cas personnalisé */}
      <Card className="!p-6 overflow-hidden">
        <SectionTitle>Exemples de calcul & simulation</SectionTitle>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-navy/[0.08] bg-mist/70 text-[11.5px] font-bold uppercase tracking-wider text-slateink">
                <th className="py-3 px-4 rounded-l-xl">Cas</th>
                <th className="py-3 px-4">Volume</th>
                <th className="py-3 px-4">Distance</th>
                <th className="py-3 px-4 text-navy">Prix total</th>
                <th className="py-3 px-4 text-teal">Vidangeur (65 %)</th>
                <th className="py-3 px-4 text-royal">Délégataire (25 %)</th>
                <th className="py-3 px-4 text-amber-600 rounded-r-xl">ONAS (10 %)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/[0.06]">
              {exemples.map((ex) => (
                <tr key={ex.cas} className="hover:bg-mist/30 transition">
                  <td className="py-3.5 px-4 font-semibold text-navy">{ex.cas}</td>
                  <td className="py-3.5 px-4 font-medium text-slateink">{ex.volume}</td>
                  <td className="py-3.5 px-4 font-medium text-slateink">{ex.distance}</td>
                  <td className="py-3.5 px-4 font-extrabold text-navy">{ex.prix}</td>
                  <td className="py-3.5 px-4 font-bold text-teal">{ex.vidangeur}</td>
                  <td className="py-3.5 px-4 font-bold text-royal">{ex.delegataire}</td>
                  <td className="py-3.5 px-4 font-bold text-amber-600">{ex.onas}</td>
                </tr>
              ))}
              
              {/* exemple personnalisé */}
              <tr className="bg-teal/[0.06] border-t-2 border-teal/30">
                <td className="py-4 px-4 font-bold text-navy flex items-center gap-2">
                  <Badge tone="teal" size="sm">Simulation actuelle</Badge>
                </td>
                <td className="py-4 px-4 font-bold text-navy">{volume} m³</td>
                <td className="py-4 px-4 font-bold text-navy">{distance} km</td>
                <td className="py-4 px-4 font-extrabold text-[15px] text-navy">{fcfaFormat(prixTotalCalcul)}</td>
                <td className="py-4 px-4 font-extrabold text-[14px] text-teal">{fcfaFormat(partVidangeur)}</td>
                <td className="py-4 px-4 font-extrabold text-[14px] text-royal">{fcfaFormat(partDelegataire)}</td>
                <td className="py-4 px-4 font-extrabold text-[14px] text-amber-600">{fcfaFormat(partOnas)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

