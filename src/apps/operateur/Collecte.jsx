import { useEffect, useState } from 'react'
import { Droplets, Check, Gauge as GaugeIcon, MapPin } from 'lucide-react'
import { Avatar, Badge, Button, Card, ScreenBody, ScreenFooter, ScreenHeader } from '../../components/ui'

const format = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

export default function Collecte({ go, demande }) {
  const [secondes, setSecondes] = useState(0)

  // Minuteur purement visuel pour la démonstration.
  useEffect(() => {
    const i = setInterval(() => setSecondes((s) => s + 1), 1000)
    return () => clearInterval(i)
  }, [])

  const remplissage = Math.min(100, 12 + secondes * 6)

  return (
    <>
      <ScreenHeader
        title="Vidange en cours"
        subtitle={demande.adresse}
        right={<Badge tone="teal">En cours</Badge>}
      />

      <ScreenBody>
        <Card className="flex flex-col items-center !py-7">
          <div className="relative flex h-40 w-40 items-center justify-center">
            <span className="absolute inset-0 animate-ping-soft rounded-full bg-teal/25" />
            <div className="relative flex h-40 w-40 flex-col items-center justify-center rounded-full border-[10px] border-teal/15 bg-white">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-slateink">
                Durée
              </span>
              <span className="text-[38px] font-extrabold leading-none tracking-tight text-navy">
                {format(secondes)}
              </span>
              <span className="mt-1 text-[11px] font-medium text-slateink">Aspiration active</span>
            </div>
          </div>

          <div className="mt-6 w-full">
            <div className="mb-2 flex items-center justify-between text-[11.5px]">
              <span className="font-semibold text-navy">Remplissage de la cuve</span>
              <span className="font-bold text-teal">{Math.round(remplissage)} %</span>
            </div>
            <div className="relative h-6 w-full overflow-hidden rounded-full bg-navy/[0.06]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal to-[#14A29E] transition-[width] duration-1000 ease-out"
                style={{ width: `${remplissage}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-[10.5px] font-bold text-white mix-blend-luminosity">
                {(remplissage * 0.08).toFixed(1).replace('.', ',')} m³ / 8 m³
              </span>
            </div>
          </div>
        </Card>

        <Card className="mt-3">
          <div className="flex items-center gap-3">
            <Avatar initiales={demande.initiales} color="soft" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13.5px] font-bold text-navy">{demande.client}</p>
              <p className="truncate text-[11.5px] text-slateink">{demande.quartier}</p>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-50 text-navy">
              <MapPin size={16} strokeWidth={2.2} />
            </span>
          </div>
        </Card>

        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <Card className="!p-3.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal/10 text-teal">
              <Droplets size={17} strokeWidth={2.2} />
            </span>
            <p className="mt-2.5 text-[11px] font-medium text-slateink">Volume estimé</p>
            <p className="text-[15px] font-bold text-navy">{demande.volume}</p>
          </Card>
          <Card className="!p-3.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber/12 text-amber-600">
              <GaugeIcon size={17} strokeWidth={2.2} />
            </span>
            <p className="mt-2.5 text-[11px] font-medium text-slateink">Capacité camion</p>
            <p className="text-[15px] font-bold text-navy">8 m³</p>
          </Card>
        </div>

        <p className="mt-4 text-center text-[11px] leading-relaxed text-slateink">
          À la fin de la collecte, AssainiTrack vous oriente vers la station de traitement la moins
          chargée.
        </p>
      </ScreenBody>

      <ScreenFooter>
        <Button size="lg" block icon={Check} onClick={() => go('stations')}>
          Vidange terminée
        </Button>
      </ScreenFooter>
    </>
  )
}
