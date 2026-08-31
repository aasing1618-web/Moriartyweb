import { useEffect, useState } from 'react'
import {
  Phone,
  MessageSquare,
  Truck,
  MapPin,
  Timer,
  CreditCard,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react'
import {
  Avatar,
  Badge,
  Button,
  Card,
  MapCanvas,
  MapMarker,
  RouteLine,
  ScreenBody,
  ScreenFooter,
  ScreenHeader,
  Stepper,
} from '../../components/ui'
import { etapesSuivi, etaSuivi, menage, recapitulatif, fcfa } from '../../data/mockData'

/** Position simulée du camion pour chaque étape (en % de la carte). */
const POSITIONS = [
  { x: 18, y: 22 },
  { x: 34, y: 38 },
  { x: 52, y: 52 },
  { x: 70, y: 36 },
  { x: 84, y: 24 },
]

export default function Tracking({ go, operateurChoisi }) {
  const [etape, setEtape] = useState(0)
  const [annulation, setAnnulation] = useState(false)

  // Progression automatique des étapes — pure animation de démonstration.
  useEffect(() => {
    if (etape >= etapesSuivi.length - 1) return undefined
    const t = setTimeout(() => setEtape((e) => e + 1), 2600)
    return () => clearTimeout(t)
  }, [etape])

  const courante = etapesSuivi[etape]
  const termine = etape === etapesSuivi.length - 1
  const pos = POSITIONS[etape]

  return (
    <>
      <ScreenHeader
        title="Suivi de votre vidange"
        subtitle={`Réf. AT-2026-08-4471`}
        onBack={() => go('operators')}
        right={
          <Badge tone={termine ? 'success' : 'teal'} icon={termine ? ShieldCheck : Timer}>
            {termine ? 'Terminé' : etaSuivi[etape]}
          </Badge>
        }
      />

      <ScreenBody padded={false}>
        <div className="px-5">
          <MapCanvas className="h-[230px] rounded-3xl shadow-card">
            <RouteLine from={POSITIONS[0]} to={POSITIONS[2]} curve={-14} />
            <RouteLine from={POSITIONS[2]} to={POSITIONS[4]} color="#16324A" curve={12} />
            <MapMarker x={52} y={52} color="navy" icon={MapPin} size={30} />
            <MapMarker x={84} y={24} color="success" icon={ShieldCheck} size={28} />
            <div
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transition: 'left 1.2s cubic-bezier(.4,0,.2,1), top 1.2s cubic-bezier(.4,0,.2,1)',
              }}
            >
              <span className="absolute -inset-3 animate-ping-soft rounded-full bg-teal/40" />
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-white bg-teal text-white shadow-lift">
                <Truck size={19} strokeWidth={2.3} />
              </span>
            </div>
            <div className="absolute bottom-3 left-3 rounded-xl bg-white/95 px-2.5 py-1.5 text-[10px] font-semibold text-navy shadow-card backdrop-blur">
              {menage.quartier} · Dakar
            </div>
          </MapCanvas>
        </div>

        <div className="px-5 pb-6">
          <Card className="mt-4">
            <Stepper etapes={etapesSuivi} courant={etape} />
            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-mist p-3">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white ${
                  termine ? 'bg-success' : 'bg-teal'
                }`}
              >
                {termine ? <ShieldCheck size={17} strokeWidth={2.3} /> : <Truck size={17} strokeWidth={2.3} />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-bold text-navy">{courante.label}</p>
                <p className="text-[11.5px] text-slateink">{courante.detail}</p>
              </div>
            </div>
          </Card>

          <Card className="mt-3">
            <div className="flex items-center gap-3">
              <Avatar initiales={operateurChoisi.initiales} color={operateurChoisi.couleur} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-bold text-navy">{operateurChoisi.nom}</p>
                <p className="truncate text-[11.5px] text-slateink">{operateurChoisi.camion}</p>
              </div>
              <button className="flex h-10 w-10 items-center justify-center rounded-2xl bg-navy-50 text-navy transition hover:bg-navy-100">
                <MessageSquare size={17} strokeWidth={2.2} />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal text-white transition hover:bg-teal-600">
                <Phone size={17} strokeWidth={2.2} />
              </button>
            </div>
          </Card>

          <div className="mt-3 grid grid-cols-3 gap-2.5">
            {[
              { label: 'Volume', valeur: '8 m³' },
              { label: 'Station', valeur: 'Tivaouane P.' },
              { label: 'Montant', valeur: '25 000' },
            ].map((info) => (
              <div
                key={info.label}
                className="rounded-2xl border border-navy/[0.06] bg-white p-3 text-center shadow-card"
              >
                <p className="text-[10.5px] font-medium text-slateink">{info.label}</p>
                <p className="mt-0.5 text-[13px] font-bold text-navy">{info.valeur}</p>
              </div>
            ))}
          </div>
        </div>
      </ScreenBody>

      <ScreenFooter>
        {termine ? (
          <Button size="lg" block icon={CreditCard} onClick={() => go('payment')}>
            Procéder au paiement
          </Button>
        ) : (
          <>
            <div className="flex items-center justify-center gap-2 rounded-2xl bg-mist py-3.5 text-[13px] font-semibold text-slateink">
              <Timer size={16} strokeWidth={2.2} />
              Paiement disponible après le dépotage certifié
            </div>
            {etape < 2 && (
              <button
                onClick={() => setAnnulation(true)}
                className="mt-2.5 w-full text-center text-[12px] font-semibold text-danger transition hover:underline"
              >
                Annuler la demande
              </button>
            )}
          </>
        )}
      </ScreenFooter>

      {/* Annulation avant intervention : séquestre intégralement remboursé */}
      {annulation && (
        <div className="absolute inset-0 z-50 flex items-end bg-navy/40 backdrop-blur-[2px]">
          <div className="w-full animate-fade-up rounded-t-[28px] bg-white p-5 pb-8 shadow-[0_-16px_40px_-20px_rgba(22,50,74,0.5)]">
            {annulation === 'fait' ? (
              <>
                <div className="flex flex-col items-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success text-white shadow-lift">
                    <RotateCcw size={30} strokeWidth={2.4} />
                  </span>
                  <h3 className="mt-4 text-[18px] font-bold text-navy">Demande annulée</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slateink">
                    Votre séquestre de{' '}
                    <span className="font-semibold text-navy">{fcfa(recapitulatif.total)}</span> est
                    intégralement remboursé. Aucune part n’a été versée.
                  </p>
                </div>
                <Button size="lg" block className="mt-5" onClick={() => go('home')}>
                  Retour à l’accueil
                </Button>
              </>
            ) : (
              <>
                <h3 className="text-[17px] font-bold text-navy">Annuler la demande ?</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slateink">
                  L’intervention n’a pas commencé : votre paiement de{' '}
                  <span className="font-semibold text-navy">{fcfa(recapitulatif.total)}</span>,
                  bloqué en séquestre, vous sera intégralement remboursé.
                </p>
                <div className="mt-5 flex gap-2.5">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={() => setAnnulation(false)}
                  >
                    Retour
                  </Button>
                  <Button
                    variant="danger"
                    size="lg"
                    className="flex-1"
                    onClick={() => setAnnulation('fait')}
                  >
                    Confirmer
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
