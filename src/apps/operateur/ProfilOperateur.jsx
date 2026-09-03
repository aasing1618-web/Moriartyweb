import { Truck, MapPin, Phone, Star, FileText, Bell, LogOut, ChevronRight, Pencil } from 'lucide-react'
import { Avatar, Badge, Card, ScreenBody, ScreenHeader, SectionTitle } from '../../components/ui'
import { operateur } from '../../data/mockData'
import { usePlateforme } from '../../lib/PlateformeContext.jsx'
import { formatNote, PONDERATION } from '../../lib/notation.js'

function Ligne({ icon: Icon, label, valeur }) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy">
        <Icon size={16} strokeWidth={2.2} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-medium text-slateink">{label}</span>
        <span className="block truncate text-[13px] font-semibold text-navy">{valeur}</span>
      </span>
    </div>
  )
}

export default function ProfilOperateur() {
  const { noteDe } = usePlateforme()
  const note = noteDe(operateur.chauffeurId)

  return (
    <>
      <ScreenHeader title="Mon profil" />
      <ScreenBody>
        <Card className="mb-4 border-navy/10 bg-gradient-to-br from-navy to-navy-600 !p-5 text-white">
          <div className="flex items-center gap-4">
            <Avatar initiales={operateur.initiales} color="white" size="lg" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[17px] font-bold leading-tight">{operateur.nomComplet}</p>
              <p className="truncate text-[12px] text-white/70">{operateur.entreprise}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Badge tone="white" size="sm">
                  {operateur.statut}
                </Badge>
                <Badge tone="white" size="sm">
                  ★ {formatNote(note.globale)} ({note.nbMenage + note.nbStation} avis)
                </Badge>
              </div>
            </div>
            <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 transition hover:bg-white/25">
              <Pencil size={15} strokeWidth={2.2} />
            </button>
          </div>
        </Card>

        <div className="mb-4 grid grid-cols-2 gap-3">
          <Card className="!p-4">
            <p className="text-[11px] font-medium text-slateink">Vidanges réalisées</p>
            <p className="mt-1 text-[22px] font-extrabold leading-none text-navy">
              {operateur.vidangesTotal}
            </p>
          </Card>
          <Card className="!p-4">
            <p className="text-[11px] font-medium text-slateink">Note globale</p>
            <p className="mt-1 flex items-center gap-1.5 text-[22px] font-extrabold leading-none text-navy">
              {formatNote(note.globale)} <Star size={16} className="fill-amber text-amber" />
            </p>
          </Card>
        </div>

        <SectionTitle>Détail de ma note</SectionTitle>
        <Card className="mb-4 !py-2">
          {[
            ['Note des ménages', note.menage, note.nbMenage, PONDERATION.menage],
            ['Qualité de service (station)', note.service, note.nbStation, PONDERATION.service],
            ['Conformité du dépotage', note.conformite, note.nbStation, PONDERATION.conformite],
          ].map(([label, valeur, nombre, poids]) => (
            <div
              key={label}
              className="flex items-center gap-3 border-b border-navy/[0.06] py-2.5 last:border-0"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] font-semibold text-navy">{label}</span>
                <span className="block text-[10.5px] text-slateink">
                  {nombre} évaluation{nombre > 1 ? 's' : ''} · pèse {Math.round(poids * 100)} %
                </span>
              </span>
              <span className="shrink-0 text-[14px] font-extrabold text-navy">
                {formatNote(valeur)}
              </span>
            </div>
          ))}
        </Card>

        <SectionTitle>Informations professionnelles</SectionTitle>
        <Card className="!py-2">
          <Ligne icon={Phone} label="Téléphone" valeur={operateur.telephone} />
          <div className="border-t border-navy/[0.06]" />
          <Ligne icon={Truck} label="Véhicule" valeur={operateur.camion} />
          <div className="border-t border-navy/[0.06]" />
          <Ligne icon={MapPin} label="Zone d’intervention" valeur={operateur.zone} />
          <div className="border-t border-navy/[0.06]" />
          <Ligne icon={FileText} label="NINEA" valeur={operateur.ninea} />
        </Card>

        <SectionTitle className="mt-5">Préférences</SectionTitle>
        <Card className="!py-1">
          {[
            { icon: Bell, label: 'Alertes de nouvelles demandes' },
            { icon: FileText, label: 'Mes bordereaux de dépotage' },
          ].map((item, i) => (
            <div key={item.label}>
              {i > 0 && <div className="border-t border-navy/[0.06]" />}
              <button className="flex w-full items-center gap-3 py-3 text-left">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-50 text-navy">
                  <item.icon size={16} strokeWidth={2.2} />
                </span>
                <span className="flex-1 text-[13px] font-semibold text-navy">{item.label}</span>
                <ChevronRight size={16} className="text-slateink" />
              </button>
            </div>
          ))}
        </Card>

        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3.5 text-[13px] font-semibold text-danger shadow-card transition hover:bg-danger/5">
          <LogOut size={16} strokeWidth={2.2} />
          Se déconnecter
        </button>

        <p className="mt-4 text-center text-[10.5px] text-slateink/70">
          Membre depuis {operateur.membreDepuis} · démonstration Govathon
        </p>
      </ScreenBody>
    </>
  )
}
