import { useState } from 'react'
import { Calculator, Percent, Truck, Factory, Building2, Sliders, Info } from 'lucide-react'
import { Card, SectionTitle, Badge } from '../../components/ui'

const fcfaFormat = (val) =>
  `${Math.round(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} FCFA`

export default function Tarification() {
  const [volume, setVolume] = useState(8)
  const [distance, setDistance] = useState(12)

  // Calcul du 4e cas personnalisé
  const distSupplement = Math.max(0, distance - 5)
  const prixTotal = volume * 3000 + distSupplement * 500
  const partVidangeur = Math.round(prixTotal * 0.65)
  const partDelegataire = Math.round(prixTotal * 0.25)
  const partOnas = Math.round(prixTotal * 0.10)

  const exemples = [
    {
      cas: 'Petite fosse, proche',
      volume: '4 m³',
      distance: '3 km',
      prix: '12 000 FCFA',
      vidangeur: '7 800 FCFA',
      delegataire: '3 000 FCFA',
      onas: '1 200 FCFA',
    },
    {
      cas: 'Fosse moyenne',
      volume: '6 m³',
      distance: '10 km',
      prix: '20 500 FCFA',
      vidangeur: '13 325 FCFA',
      delegataire: '5 125 FCFA',
      onas: '2 050 FCFA',
    },
    {
      cas: 'Grande fosse, station éloignée',
      volume: '10 m³',
      distance: '18 km',
      prix: '36 500 FCFA',
      vidangeur: '23 725 FCFA',
      delegataire: '9 125 FCFA',
      onas: '3 650 FCFA',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Formule de calcul */}
      <Card className="relative overflow-hidden !p-7">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-3 py-1 text-[12px] font-semibold text-teal">
              <Calculator size={14} strokeWidth={2.2} />
              Formule de tarification réglementée
            </span>
            <h2 className="text-[20px] font-bold text-navy">Structure du tarif unifié</h2>
          </div>
          <Badge tone="teal" icon={Percent}>
            Clé 65 / 25 / 10
          </Badge>
        </div>

        <div className="mt-5 rounded-2xl bg-navy p-5 text-white shadow-lift">
          <p className="font-mono text-[16px] font-bold tracking-wide text-amber md:text-[18px]">
            Prix = (Volume en m³ × 3 000 FCFA) + (max(0, Distance − 5 km) × 500 FCFA)
          </p>
        </div>

        <p className="mt-3 flex items-center gap-1.5 text-[12px] text-slateink">
          <Info size={14} className="shrink-0 text-teal" />
          <span>
            Modèle de tarification indicatif — un seul paiement du ménage, réparti automatiquement entre les trois acteurs de la chaîne.
          </span>
        </p>
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
              
              {/* 4e exemple personnalisé */}
              <tr className="bg-teal/[0.06] border-t-2 border-teal/30">
                <td className="py-4 px-4 font-bold text-navy flex items-center gap-2">
                  <Badge tone="teal" size="sm">4ᵉ exemple (personnalisé)</Badge>
                </td>
                <td className="py-4 px-4 font-bold text-navy">{volume} m³</td>
                <td className="py-4 px-4 font-bold text-navy">{distance} km</td>
                <td className="py-4 px-4 font-extrabold text-[15px] text-navy">{fcfaFormat(prixTotal)}</td>
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
