import {
  Bell,
  MapPin,
  Clock,
  ArrowRight,
  Droplets,
  ChevronRight,
  ShieldCheck,
  ShieldAlert,
  Activity,
  AlertTriangle,
  Zap,
} from 'lucide-react'
import { Avatar, Badge, Button, Card, MapCanvas, MapMarker, ProgressBar } from '../../components/ui'
import { menage, estimationVidange } from '../../data/mockData'
import { usePlateforme } from '../../lib/PlateformeContext.jsx'

export default function Home({ go }) {
  const { capteurs, simulerBasculeCapteur } = usePlateforme()
  const capteurMaison = capteurs.find((c) => c.id === 'sens-1') || capteurs[0]
  const estCritique = capteurMaison.niveauActuel >= capteurMaison.seuilCritique

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      {/* Carte stylisée en fond */}
      <MapCanvas className="absolute inset-x-0 top-0 h-[400px]">
        <MapMarker
          x={50}
          y={44}
          color={estCritique ? 'danger' : 'teal'}
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
        <button
          onClick={() => simulerBasculeCapteur('sens-1')}
          title="Simuler bascule niveau capteur"
          className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-card hover:bg-mist transition"
        >
          <Bell size={18} strokeWidth={2.1} className={estCritique ? 'text-danger' : 'text-navy'} />
          <span className={`absolute right-2.5 top-2.5 h-2 w-2 rounded-full ${estCritique ? 'bg-danger animate-ping' : 'bg-amber'} ring-2 ring-white`} />
        </button>
      </div>

      <div className="relative z-10 mt-3 px-5 flex justify-between items-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 shadow-card backdrop-blur">
          <MapPin size={13} className="text-teal" strokeWidth={2.4} />
          <span className="text-[11.5px] font-semibold text-navy">{menage.quartier}</span>
        </div>
        <button
          onClick={() => simulerBasculeCapteur('sens-1')}
          className="rounded-full bg-navy/80 px-2.5 py-1 text-[10px] font-bold text-white shadow-card backdrop-blur"
        >
          {estCritique ? '⚡ Simuler Retour Normal' : '⚡ Simuler Alerte Critique'}
        </button>
      </div>

      {/* Feuille inférieure */}
      <div className="relative z-10 mt-auto rounded-t-[32px] bg-cream px-5 pb-4 pt-5 shadow-[0_-16px_40px_-24px_rgba(22,50,74,0.45)]">
        <div className="absolute left-1/2 top-2.5 h-1 w-10 -translate-x-1/2 rounded-full bg-navy/15" />

        {/* ALERTE PRÉVENTIVE HIVERNAGE / CAPTEUR */}
        {estCritique ? (
          <div className="mb-4 rounded-2xl border border-danger/30 bg-gradient-to-r from-danger/[0.1] to-amber/[0.1] p-4 shadow-card">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-danger text-white shadow-2xs">
                <AlertTriangle size={20} strokeWidth={2.4} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[12.5px] font-extrabold text-navy">⚠️ Niveau critique détecté</span>
                  <Badge tone="danger" size="sm">Capteur IoT</Badge>
                </div>
                <p className="mt-1 text-[11.5px] leading-relaxed text-slateink font-medium">
                  Remplissage de votre fosse à <strong className="text-danger">{capteurMaison.niveauActuel} %</strong>. Risque d'inondation élevé en période d'hivernage.
                </p>
                <div className="mt-3">
                  <Button
                    size="sm"
                    variant="danger"
                    block
                    iconRight={Zap}
                    onClick={() => go('booking')}
                  >
                    Demander une vidange préventive
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Card className="mb-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[12px] font-medium text-slateink">Capteur IoT & Fosse</p>
                <p className="mt-1 text-[15px] font-bold text-navy">{menage.typeFosse}</p>
              </div>
              <Badge tone="success" icon={Activity}>
                Normal ({capteurMaison.niveauActuel} %)
              </Badge>
            </div>
            <div className="mt-4">
              <ProgressBar value={capteurMaison.niveauActuel} color="#1E9E63" height={9} />
              <div className="mt-2 flex items-center justify-between text-[11.5px]">
                <span className="font-semibold text-navy">Télémesure : {capteurMaison.niveauActuel} %</span>
                <span className="text-slateink">Prochaine vidange préventive</span>
              </div>
            </div>
          </Card>
        )}

        <Button size="lg" block icon={Droplets} onClick={() => go('booking')} className="mb-2.5">
          Réserver une vidange
        </Button>

        <Button
          variant="outline"
          block
          icon={ShieldAlert}
          onClick={() => go('signalement')}
          className="mb-3 !border-amber/40 !text-amber-600 hover:!bg-amber/[0.07]"
        >
          Signaler une vidange clandestine
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

