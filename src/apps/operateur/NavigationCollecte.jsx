import { Truck, MapPin, Navigation2, Phone, CornerUpRight, Flag } from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  MapCanvas,
  MapMarker,
  RouteLine,
  ScreenFooter,
  ScreenHeader,
} from '../../components/ui'

const ETAPES_ITINERAIRE = [
  { instruction: 'Prendre la VDN vers le nord', distance: '1,2 km' },
  { instruction: 'Tourner à droite — Route des Niayes', distance: '600 m' },
  { instruction: 'Entrer dans Parcelles U24, 2ᵉ rue', distance: '450 m' },
]

export default function NavigationCollecte({ go, demande }) {
  return (
    <>
      <ScreenHeader
        title="Navigation"
        subtitle={`Vers ${demande.client}`}
        onBack={() => go('detail')}
        right={<Badge tone="teal">{demande.trajet}</Badge>}
      />

      <div className="relative min-h-0 flex-1">
        <MapCanvas className="absolute inset-0">
          <RouteLine from={{ x: 18, y: 78 }} to={{ x: 66, y: 26 }} curve={-16} />
          <MapMarker x={18} y={78} color="navy" icon={Truck} size={40} pulse />
          <MapMarker x={66} y={26} color="amber" icon={MapPin} size={36} label={demande.quartier} />
        </MapCanvas>

        <div className="absolute inset-x-4 top-3">
          <Card className="!p-3.5">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal text-white">
                <CornerUpRight size={20} strokeWidth={2.3} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-bold leading-tight text-navy">
                  {ETAPES_ITINERAIRE[0].instruction}
                </p>
                <p className="text-[11.5px] text-slateink">
                  dans {ETAPES_ITINERAIRE[0].distance}
                </p>
              </div>
              <button className="flex h-10 w-10 items-center justify-center rounded-2xl bg-navy-50 text-navy">
                <Phone size={17} strokeWidth={2.2} />
              </button>
            </div>
          </Card>
        </div>

        <div className="absolute inset-x-4 bottom-3">
          <Card className="!p-3.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-slateink">Arrivée estimée</p>
                <p className="text-[19px] font-extrabold leading-none text-navy">09h53</p>
              </div>
              <div className="text-center">
                <p className="text-[11px] font-medium text-slateink">Trajet</p>
                <p className="text-[15px] font-bold text-navy">{demande.trajet}</p>
              </div>
              <div className="text-center">
                <p className="text-[11px] font-medium text-slateink">Distance</p>
                <p className="text-[15px] font-bold text-navy">{demande.distance}</p>
              </div>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal/10 text-teal">
                <Navigation2 size={19} strokeWidth={2.3} />
              </span>
            </div>
          </Card>
        </div>
      </div>

      <ScreenFooter>
        <Button size="lg" block icon={Flag} onClick={() => go('collecte')}>
          Je suis arrivé sur place
        </Button>
      </ScreenFooter>
    </>
  )
}
