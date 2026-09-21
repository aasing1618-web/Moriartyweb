import { useState, useMemo } from 'react'
import {
  Home as HomeIcon,
  Users,
  CalendarDays,
  MapPin,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Info,
  Banknote,
  Smartphone,
  ShieldAlert,
  Sliders,
  Check,
} from 'lucide-react'
import { Badge, Button, Card, ScreenBody, ScreenFooter, ScreenHeader } from '../../components/ui'
import { menage, creneaux, fcfa } from '../../data/mockData'
import { usePlateforme } from '../../lib/PlateformeContext.jsx'

function Champ({ icon: Icon, label, valeur, chevron = true }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-navy/[0.07] bg-white px-4 py-3 shadow-card">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy">
        <Icon size={16} strokeWidth={2.2} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-medium text-slateink">{label}</span>
        <span className="block truncate text-[13.5px] font-semibold text-navy">{valeur}</span>
      </span>
      {chevron && <ChevronDown size={16} className="shrink-0 text-slateink" />}
    </div>
  )
}

export default function Booking({ go, onValiderDemande }) {
  const { calculerTarif, ajouterNouvelleDemande } = usePlateforme()
  const [creneau, setCreneau] = useState(creneaux[0].id)
  const [volume, setVolume] = useState(8)
  const [estUrgent, setEstUrgent] = useState(false)
  const [estHivernage, setEstHivernage] = useState(true)
  const [estAccesDifficile, setEstAccesDifficile] = useState(false)
  const [modePaiement, setModePaiement] = useState('Wave')

  // Calcul dynamique du prix estimatif terrain
  const prixEstimatif = useMemo(() => {
    return calculerTarif({
      volumeM3: volume,
      distanceChauffeurKm: 2.4,
      distanceStationKm: 13.6,
      estUrgent,
      estHivernage,
      estAccesDifficile,
      commune: menage.commune,
    })
  }, [calculerTarif, volume, estUrgent, estHivernage, estAccesDifficile])

  const valider = () => {
    if (onValiderDemande) {
      onValiderDemande({
        volume: `~${volume} m³`,
        prixEstimatif,
        modePaiement,
        estUrgent,
        estHivernage,
      })
    } else {
      ajouterNouvelleDemande({
        client: menage.nomComplet,
        quartier: menage.quartier,
        adresse: menage.adresse,
        volume: `~${volume} m³`,
        prixEstimatif,
        modePaiement,
        urgence: estUrgent ? 'Urgent' : 'Standard',
      })
    }
    go('operators')
  }

  return (
    <>
      <ScreenHeader
        title="Étape 1 : Réserver une vidange"
        subtitle="Renseignez vos critères & obtenez un prix estimatif"
        onBack={() => go('home')}
      />
      <ScreenBody>
        <div className="space-y-2.5">
          <Champ icon={HomeIcon} label="Type de logement" valeur={menage.typeLogement} />
          <Champ icon={Users} label="Personnes au foyer" valeur={`${menage.membresFoyer} personnes`} />
          <Champ
            icon={CalendarDays}
            label="Dernière vidange"
            valeur={`${menage.derniereVidangeDate} (${menage.derniereVidange})`}
          />
          <Champ icon={MapPin} label="Adresse de la fosse" valeur={menage.adresse} />
        </div>

        {/* Paramètres de terrain personnalisables */}
        <p className="mb-2 mt-5 text-[12px] font-semibold uppercase tracking-wide text-slateink flex items-center gap-1.5">
          <Sliders size={14} className="text-teal" />
          Paramètres de l'intervention
        </p>

        <div className="space-y-3 rounded-2xl border border-navy/10 bg-white p-4 shadow-card">
          <div>
            <div className="flex justify-between items-center text-[12.5px] font-bold text-navy mb-1">
              <span>Volume estimé de la fosse :</span>
              <span className="text-teal font-extrabold">{volume} m³</span>
            </div>
            <input
              type="range"
              min={3}
              max={15}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full accent-teal cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-navy/5">
            <button
              onClick={() => setEstUrgent((v) => !v)}
              className={`flex items-center gap-2 rounded-xl border p-2.5 text-[11.5px] font-bold transition ${
                estUrgent ? 'border-danger bg-danger/10 text-danger' : 'border-navy/10 bg-mist/50 text-slateink'
              }`}
            >
              <ShieldAlert size={15} />
              Intervention urgente (+3 000 F)
            </button>
            <button
              onClick={() => setEstAccesDifficile((v) => !v)}
              className={`flex items-center gap-2 rounded-xl border p-2.5 text-[11.5px] font-bold transition ${
                estAccesDifficile ? 'border-amber bg-amber/10 text-amber-700' : 'border-navy/10 bg-mist/50 text-slateink'
              }`}
            >
              Ruelle étroite (+2 000 F)
            </button>
          </div>
        </div>

        <p className="mb-2 mt-4 text-[12px] font-semibold uppercase tracking-wide text-slateink">
          Mode de paiement obligatoire (Étape 2)
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'Wave', label: 'Wave', detail: 'Code marchand', icon: Smartphone, color: '#1DC3F5' },
            { id: 'Orange Money', label: 'Orange Money', detail: 'Mobile money', icon: Smartphone, color: '#F5821F' },
            { id: 'Espèces', label: 'Espèces', detail: 'Au vidangeur', icon: Banknote, color: '#5B6B72' },
          ].map((m) => {
            const actif = modePaiement === m.id
            return (
              <button
                key={m.id}
                onClick={() => setModePaiement(m.id)}
                className={`rounded-2xl border px-2 py-3 text-center transition flex flex-col items-center justify-center ${
                  actif
                    ? 'border-transparent bg-navy text-white shadow-lift'
                    : 'border-navy/10 bg-white text-navy shadow-card hover:border-navy/25'
                }`}
              >
                <span className="text-[12px] font-bold">{m.label}</span>
                <span className={`text-[10px] mt-0.5 ${actif ? 'text-white/80' : 'text-slateink'}`}>{m.detail}</span>
              </button>
            )
          })}
        </div>

        {/* Estimation automatique terrain */}
        <Card className="mt-5 border-teal/30 bg-gradient-to-br from-teal/[0.09] via-white to-amber/[0.04] shadow-card">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal text-white shadow-2xs">
              <Sparkles size={16} strokeWidth={2.3} />
            </span>
            <div>
              <p className="text-[13px] font-extrabold text-navy">Prix Estimatif Automatique</p>
              <p className="text-[10.5px] text-slateink">Basé sur les données terrain configurables</p>
            </div>
            <Badge tone="teal" size="sm" className="ml-auto">
              Calculé
            </Badge>
          </div>

          <div className="mt-4 flex items-end justify-between border-t border-navy/[0.07] pt-3">
            <div>
              <p className="text-[11px] font-medium text-slateink">Prix estimatif :</p>
              <p className="text-[26px] font-black leading-none text-teal">{fcfa(prixEstimatif)}</p>
            </div>
            <div className="text-right">
              <span className="inline-block rounded-full bg-teal/10 px-2.5 py-1 text-[11px] font-bold text-teal">
                Volume {volume} m³
              </span>
            </div>
          </div>
        </Card>

        <div className="mt-4 flex items-start gap-2.5 rounded-2xl bg-amber/10 border border-amber/20 p-3.5">
          <Info size={16} className="mt-0.5 shrink-0 text-amber-600" strokeWidth={2.2} />
          <p className="text-[11.5px] leading-relaxed text-navy font-medium">
            <strong className="text-amber-700">Information importante :</strong> Ce tarif est un{' '}
            <strong>Prix estimatif</strong>. Le prix définitif peut être confirmé ou réajusté par le vidangeur selon les conditions réelles constatées sur place.
          </p>
        </div>
      </ScreenBody>

      <ScreenFooter>
        <Button size="lg" block iconRight={ArrowRight} onClick={valider}>
          Confirmer la demande ({fcfa(prixEstimatif)})
        </Button>
      </ScreenFooter>
    </>
  )
}

