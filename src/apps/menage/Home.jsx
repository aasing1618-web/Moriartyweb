import { Bell, MapPin, Clock, ArrowRight, Droplets, ChevronRight, ShieldCheck } from 'lucide-react'
import { Avatar, Badge, Button, Card, MapCanvas, MapMarker, ProgressBar } from '../../components/ui'
import { menage, estimationVidange } from '../../data/mockData'

export default function Home({ go }) {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      {/* Carte stylisée en fond */}
      <MapCanvas className="absolute inset-x-0 top-0 h-[400px]">
        <MapMarker
          x={50}
          y={44}
          color="teal"
          icon={MapPin}
          size={46}
          pulse
          label={`Ma fosse — ${menage.quartier.replace('Unité 24', 'U24')}`}
        />
        <MapMarker x={20} y={22} color="navy" size={26} />
        <MapMarker x={80} y={62} color="amber" size={26} />
      </MapCanvas>

      {/* En-tête */}
      <div className="relative z-10 flex items-center gap-3 px-5 pt-1">
        <Avatar initiales={menage.initiales} color="navy" />
        <div className="min-w-0 flex-1">
          <p className="text-[11.5px] font-medium text-slateink">Bonjour,</p>
          <p className="truncate text-[16px] font-bold leading-tight text-navy">
            {menage.nomComplet}
          </p>
        </div>
        <button className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-card">
          <Bell size={18} strokeWidth={2.1} className="text-navy" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-amber ring-2 ring-white" />
        </button>
      </div>

      <div className="relative z-10 mt-3 px-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 shadow-card backdrop-blur">
          <MapPin size={13} className="text-teal" strokeWidth={2.4} />
          <span className="text-[11.5px] font-semibold text-navy">{menage.quartier}</span>
        </div>
      </div>

      {/* Feuille inférieure */}
      <div className="relative z-10 mt-auto rounded-t-[32px] bg-cream px-5 pb-4 pt-5 shadow-[0_-16px_40px_-24px_rgba(22,50,74,0.45)]">
        <div className="absolute left-1/2 top-2.5 h-1 w-10 -translate-x-1/2 rounded-full bg-navy/15" />

        <Card className="mb-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-medium text-slateink">État estimé de votre fosse</p>
              <p className="mt-1 text-[15px] font-bold text-navy">{menage.typeFosse}</p>
            </div>
            <Badge tone="warning" icon={Clock}>
              {menage.derniereVidange}
            </Badge>
          </div>
          <div className="mt-4">
            <ProgressBar value={82} color="#E0A200" height={9} />
            <div className="mt-2 flex items-center justify-between text-[11.5px]">
              <span className="font-semibold text-navy">Remplissage estimé : 82 %</span>
              <span className="text-slateink">{estimationVidange.urgence}</span>
            </div>
          </div>
        </Card>

        <Button size="lg" block icon={Droplets} onClick={() => go('booking')} className="mb-3">
          Réserver une vidange
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => go('history')}
            className="flex items-center gap-2 rounded-2xl bg-white p-3 text-left shadow-card transition hover:-translate-y-0.5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-50 text-navy">
              <Clock size={16} strokeWidth={2.2} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[12.5px] font-semibold text-navy">Historique</span>
              <span className="block text-[10.5px] text-slateink">
                {menage.vidangesTotal} vidanges
              </span>
            </span>
            <ChevronRight size={15} className="text-slateink" />
          </button>
          <button
            onClick={() => go('profile')}
            className="flex items-center gap-2 rounded-2xl bg-white p-3 text-left shadow-card transition hover:-translate-y-0.5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal/10 text-teal">
              <ShieldCheck size={16} strokeWidth={2.2} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[12.5px] font-semibold text-navy">Ma fosse</span>
              <span className="block text-[10.5px] text-slateink">Fiche enregistrée</span>
            </span>
            <ChevronRight size={15} className="text-slateink" />
          </button>
        </div>

        <button
          onClick={() => go('booking')}
          className="mt-3 flex w-full items-center gap-3 rounded-2xl bg-navy p-3.5 text-left text-white shadow-lift transition hover:-translate-y-0.5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
            <Droplets size={16} strokeWidth={2.2} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[12.5px] font-semibold">
              4 opérateurs vérifiés près de vous
            </span>
            <span className="block text-[10.5px] text-white/70">
              Premier disponible dans 45 min
            </span>
          </span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
