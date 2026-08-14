import {
  MapPin,
  Droplets,
  Users,
  CreditCard,
  Bell,
  HelpCircle,
  ChevronRight,
  LogOut,
  Pencil,
} from 'lucide-react'
import { Avatar, Badge, Card, ScreenBody, ScreenHeader, SectionTitle } from '../../components/ui'
import { menage, moyensEnregistres } from '../../data/mockData'

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

export default function Profile() {
  return (
    <>
      <ScreenHeader title="Mon profil" />
      <ScreenBody>
        <Card className="mb-4 border-navy/10 bg-gradient-to-br from-navy to-navy-600 !p-5 text-white">
          <div className="flex items-center gap-4">
            <Avatar initiales={menage.initiales} color="white" size="lg" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[17px] font-bold leading-tight">{menage.nomComplet}</p>
              <p className="truncate text-[12px] text-white/70">{menage.telephone}</p>
              <div className="mt-2 flex gap-1.5">
                <Badge tone="white" size="sm">
                  Cliente depuis {menage.clientDepuis}
                </Badge>
              </div>
            </div>
            <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 transition hover:bg-white/25">
              <Pencil size={15} strokeWidth={2.2} />
            </button>
          </div>
        </Card>

        <SectionTitle>Fosse enregistrée</SectionTitle>
        <Card className="!py-2">
          <Ligne icon={MapPin} label="Adresse" valeur={menage.adresse} />
          <div className="border-t border-navy/[0.06]" />
          <Ligne icon={Droplets} label="Type de fosse" valeur={menage.typeFosse} />
          <div className="border-t border-navy/[0.06]" />
          <Ligne icon={Users} label="Personnes au foyer" valeur={`${menage.membresFoyer} personnes`} />
        </Card>

        <SectionTitle className="mt-5">Moyens de paiement</SectionTitle>
        <div className="space-y-2.5">
          {moyensEnregistres.map((m) => (
            <Card key={m.id} className="!p-3.5" hover>
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-2xl text-[12px] font-extrabold text-white"
                  style={{ background: m.couleur }}
                >
                  {m.nom === 'Wave' ? 'W' : 'OM'}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13.5px] font-semibold text-navy">{m.nom}</span>
                  <span className="block text-[11.5px] text-slateink">{m.detail}</span>
                </span>
                {m.principal && (
                  <Badge tone="teal" size="sm">
                    Principal
                  </Badge>
                )}
              </div>
            </Card>
          ))}
          <button className="flex w-full items-center gap-3 rounded-2xl border border-dashed border-navy/20 p-3.5 text-left transition hover:bg-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-mist text-navy">
              <CreditCard size={17} strokeWidth={2.2} />
            </span>
            <span className="text-[13px] font-semibold text-navy">Ajouter un moyen de paiement</span>
          </button>
        </div>

        <SectionTitle className="mt-5">Préférences</SectionTitle>
        <Card className="!py-1">
          {[
            { icon: Bell, label: 'Notifications' },
            { icon: HelpCircle, label: 'Aide et assistance' },
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
          AssainiTrack · version démonstration Govathon
        </p>
      </ScreenBody>
    </>
  )
}
