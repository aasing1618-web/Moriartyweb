import { useState } from 'react'
import {
  Home as HomeIcon,
  Users,
  CalendarDays,
  MapPin,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Info,
} from 'lucide-react'
import { Badge, Button, Card, ScreenBody, ScreenFooter, ScreenHeader } from '../../components/ui'
import { menage, estimationVidange, creneaux } from '../../data/mockData'

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

export default function Booking({ go }) {
  const [creneau, setCreneau] = useState(creneaux[0].id)

  return (
    <>
      <ScreenHeader
        title="Réserver une vidange"
        subtitle="Vos informations sont pré-remplies"
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

        <p className="mb-2 mt-5 text-[12px] font-semibold uppercase tracking-wide text-slateink">
          Créneau souhaité
        </p>
        <div className="grid grid-cols-3 gap-2">
          {creneaux.map((c) => {
            const actif = c.id === creneau
            return (
              <button
                key={c.id}
                onClick={() => setCreneau(c.id)}
                className={`rounded-2xl border px-2 py-3 text-center transition ${
                  actif
                    ? 'border-transparent bg-teal text-white shadow-lift'
                    : 'border-navy/10 bg-white text-navy shadow-card hover:border-navy/25'
                }`}
              >
                <span className="block text-[12px] font-semibold leading-tight">{c.label}</span>
                <span
                  className={`mt-1 block text-[10.5px] ${actif ? 'text-white/80' : 'text-slateink'}`}
                >
                  {c.detail}
                </span>
              </button>
            )
          })}
        </div>

        {/* Estimation automatique */}
        <Card className="mt-5 border-teal/20 bg-gradient-to-br from-teal/[0.07] to-white">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal text-white">
              <Sparkles size={15} strokeWidth={2.3} />
            </span>
            <p className="text-[13px] font-bold text-navy">Estimation automatique</p>
            <Badge tone="teal" size="sm" className="ml-auto">
              Calculée
            </Badge>
          </div>

          <div className="mt-4 flex items-end gap-6">
            <div>
              <p className="text-[11px] font-medium text-slateink">Volume estimé</p>
              <p className="text-[22px] font-extrabold leading-none text-navy">
                {estimationVidange.volume}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-medium text-slateink">Prix indicatif</p>
              <p className="text-[22px] font-extrabold leading-none text-teal">20 000</p>
              <p className="text-[11px] font-semibold text-slateink">à 25 000 FCFA</p>
            </div>
          </div>

          <div className="mt-4 space-y-1.5 border-t border-navy/[0.07] pt-3">
            {estimationVidange.facteurs.map((f) => (
              <div key={f.label} className="flex items-center justify-between text-[11.5px]">
                <span className="text-slateink">{f.label}</span>
                <span className="font-semibold text-navy">{f.valeur}</span>
              </div>
            ))}
          </div>
        </Card>

        <div className="mt-4 flex items-start gap-2.5 rounded-2xl bg-navy-50 p-3.5">
          <Info size={15} className="mt-0.5 shrink-0 text-navy" strokeWidth={2.2} />
          <p className="text-[11.5px] leading-relaxed text-slateink">
            Le prix final est confirmé par l’opérateur après constat sur place. Le dépotage se fait
            obligatoirement dans une station agréée.
          </p>
        </div>
      </ScreenBody>

      <ScreenFooter>
        <Button size="lg" block iconRight={ArrowRight} onClick={() => go('operators')}>
          Voir les opérateurs disponibles
        </Button>
      </ScreenFooter>
    </>
  )
}
