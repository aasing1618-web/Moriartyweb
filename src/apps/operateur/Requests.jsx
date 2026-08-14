import { useState } from 'react'
import { Navigation, Clock, Droplets, ChevronRight, Zap, MapPin, Truck } from 'lucide-react'
import { Avatar, Badge, Card, MapCanvas, MapMarker, ScreenBody } from '../../components/ui'
import { demandesProximite, operateur, statsOperateur, fcfa } from '../../data/mockData'

const TON_URGENCE = {
  Urgent: 'danger',
  Standard: 'teal',
  'Planifié demain': 'neutral',
}

export default function Requests({ go, onChoisirDemande }) {
  const [enLigne, setEnLigne] = useState(true)

  return (
    <>
      {/* En-tête opérateur */}
      <div className="mx-4 mt-1 shrink-0 rounded-3xl bg-navy p-4 text-white shadow-lift">
        <div className="flex items-center gap-3">
          <Avatar initiales={operateur.initiales} color="white" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-bold leading-tight">{operateur.nomComplet}</p>
            <p className="truncate text-[11.5px] text-white/65">{operateur.camion}</p>
          </div>
          <button
            onClick={() => setEnLigne((v) => !v)}
            className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-[11.5px] font-bold transition ${
              enLigne ? 'bg-success text-white' : 'bg-white/15 text-white/70'
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${enLigne ? 'bg-white' : 'bg-white/50'}`}
            />
            {enLigne ? 'En ligne' : 'Hors ligne'}
          </button>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {[
            { label: 'Aujourd’hui', valeur: '3 vidanges' },
            { label: 'Gains du jour', valeur: '66 000' },
            { label: 'Note', valeur: `${operateur.note}`.replace('.', ',') + ' ★' },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-white/10 px-3 py-2.5">
              <p className="text-[10px] font-medium text-white/60">{s.label}</p>
              <p className="mt-0.5 text-[13px] font-bold">{s.valeur}</p>
            </div>
          ))}
        </div>
      </div>

      <ScreenBody padded={false}>
        <div className="px-5 pt-4">
          <MapCanvas className="h-[150px] rounded-3xl shadow-card">
            <MapMarker x={50} y={52} color="navy" icon={Truck} size={34} pulse />
            <MapMarker x={24} y={30} color="amber" icon={MapPin} size={26} />
            <MapMarker x={74} y={34} color="danger" icon={MapPin} size={26} />
            <MapMarker x={68} y={72} color="teal" icon={MapPin} size={26} />
            <div className="absolute bottom-2.5 left-2.5 rounded-xl bg-white/95 px-2.5 py-1.5 text-[10px] font-semibold text-navy shadow-card">
              Zone : Dakar Nord · 4 demandes actives
            </div>
          </MapCanvas>
        </div>

        <div className="px-5 pb-6 pt-4">
          <div className="mb-3 flex items-end justify-between">
            <h3 className="text-[15px] font-bold text-navy">Demandes à proximité</h3>
            <span className="text-[11.5px] font-semibold text-teal">
              {fcfa(statsOperateur.enAttente)} en attente
            </span>
          </div>

          <div className="space-y-2.5">
            {demandesProximite.map((d) => (
              <Card
                key={d.id}
                onClick={() => {
                  onChoisirDemande(d)
                  go('detail')
                }}
                className="!p-3.5"
              >
                <div className="flex items-start gap-3">
                  <Avatar initiales={d.initiales} color="soft" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-[13.5px] font-bold leading-tight text-navy">
                          {d.quartier}
                        </p>
                        <p className="truncate text-[11.5px] text-slateink">{d.client}</p>
                      </div>
                      <p className="shrink-0 text-[14px] font-extrabold text-teal">{fcfa(d.prix)}</p>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <Badge
                        tone={TON_URGENCE[d.urgence] || 'neutral'}
                        icon={d.urgence === 'Urgent' ? Zap : Clock}
                        size="sm"
                      >
                        {d.urgence}
                      </Badge>
                      <Badge tone="neutral" icon={Navigation} size="sm">
                        {d.distance} · {d.trajet}
                      </Badge>
                      <Badge tone="neutral" icon={Droplets} size="sm">
                        {d.volume}
                      </Badge>
                    </div>
                  </div>
                  <ChevronRight size={16} className="mt-1 shrink-0 text-slateink" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </ScreenBody>
    </>
  )
}
