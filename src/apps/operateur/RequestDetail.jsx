import { MapPin, Phone, Droplets, Navigation, DoorOpen, Wallet, Check } from 'lucide-react'
import {
  Avatar,
  Badge,
  Button,
  Card,
  MapCanvas,
  MapMarker,
  ScreenBody,
  ScreenFooter,
  ScreenHeader,
  Stars,
} from '../../components/ui'
import { fcfa } from '../../data/mockData'

function Info({ icon: Icon, label, valeur }) {
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

export default function RequestDetail({ go, demande }) {
  return (
    <>
      <ScreenHeader
        title="Détail de la demande"
        subtitle={demande.quartier}
        onBack={() => go('requests')}
        right={<Badge tone={demande.urgence === 'Urgent' ? 'danger' : 'teal'}>{demande.urgence}</Badge>}
      />

      <ScreenBody padded={false}>
        <div className="px-5">
          <MapCanvas className="h-[160px] rounded-3xl shadow-card">
            <MapMarker x={58} y={46} color="amber" icon={MapPin} size={38} pulse label={demande.quartier} />
          </MapCanvas>
        </div>

        <div className="px-5 pb-6 pt-4">
          <Card>
            <div className="flex items-center gap-3">
              <Avatar initiales={demande.initiales} color="navy" size="lg" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-bold leading-tight text-navy">
                  {demande.client}
                </p>
                <p className="truncate text-[11.5px] text-slateink">{demande.telephone}</p>
                <div className="mt-1.5">
                  <Stars note={demande.note} size={12} />
                </div>
              </div>
              <button className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal text-white transition hover:bg-teal-600">
                <Phone size={17} strokeWidth={2.2} />
              </button>
            </div>
          </Card>

          <Card className="mt-3 !py-2">
            <Info icon={MapPin} label="Adresse" valeur={demande.adresse} />
            <div className="border-t border-navy/[0.06]" />
            <Info icon={Droplets} label="Volume estimé" valeur={`${demande.volume} · ${demande.typeFosse}`} />
            <div className="border-t border-navy/[0.06]" />
            <Info icon={DoorOpen} label="Accès" valeur={demande.acces} />
            <div className="border-t border-navy/[0.06]" />
            <Info
              icon={Navigation}
              label="Distance"
              valeur={`${demande.distance} — ${demande.trajet} de trajet`}
            />
          </Card>

          <Card className="mt-3 border-teal/20 bg-gradient-to-br from-teal/[0.07] to-white">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal text-white">
                <Wallet size={18} strokeWidth={2.2} />
              </span>
              <div className="flex-1">
                <p className="text-[11.5px] font-medium text-slateink">Revenu de la course</p>
                <p className="text-[20px] font-extrabold leading-none text-navy">
                  {fcfa(demande.prix)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-slateink">Libéré après</p>
                <p className="text-[11.5px] font-bold text-teal">scan du dépotage</p>
              </div>
            </div>
          </Card>
        </div>
      </ScreenBody>

      <ScreenFooter>
        <div className="flex gap-2.5">
          <Button variant="outline" size="lg" className="w-[38%]" onClick={() => go('requests')}>
            Refuser
          </Button>
          <Button size="lg" className="flex-1" icon={Check} onClick={() => go('navigation')}>
            Accepter la demande
          </Button>
        </div>
      </ScreenFooter>
    </>
  )
}
