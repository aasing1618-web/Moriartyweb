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
  CheckCircle2,
  Lock,
  Smartphone,
  Banknote,
  Clock,
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
import { menage, recapitulatif, fcfa } from '../../data/mockData'
import { usePlateforme } from '../../lib/PlateformeContext.jsx'

/** Les 7 statuts officiels exigés par le cahier des charges */
const ETAPES_SUIVI_7 = [
  { id: 'demande_creee', label: 'Demande créée', court: 'Créée', detail: 'Demande enregistrée par le ménage', icone: 'check' },
  { id: 'tarif_confirme', label: 'Tarif confirmé', court: 'Tarif', detail: 'Prix estimé et confirmé par le vidangeur', icone: 'check' },
  { id: 'mode_paiement_choisi', label: 'Mode de paiement', court: 'Paiement', detail: 'Mode de paiement choisi (Wave / Espèces)', icone: 'wallet' },
  { id: 'paiement_valide', label: 'Paiement validé', court: 'Validé', detail: 'Paiement confirmé · Camion autorisé à partir', icone: 'shield-check' },
  { id: 'camion_envoye', label: 'Camion envoyé', court: 'Envoyé', detail: 'Le vidangeur se dirige vers votre domicile', icone: 'truck' },
  { id: 'intervention_en_cours', label: 'Vidange en cours', court: 'Vidange', detail: 'Pompage et nettoyage de la fosse septique', icone: 'droplets' },
  { id: 'vidange_terminee', label: 'Vidange terminée', court: 'Terminé', detail: 'Prestation achevée & dépotage certifié', icone: 'flag' },
]

/** Position simulée du camion pour chaque étape (en % de la carte). */
const POSITIONS = [
  { x: 18, y: 22 },
  { x: 26, y: 28 },
  { x: 34, y: 35 },
  { x: 44, y: 44 },
  { x: 54, y: 52 },
  { x: 70, y: 36 },
  { x: 84, y: 24 },
]

export default function Tracking({ go, operateurChoisi }) {
  const { commandes, changerStatutCommande } = usePlateforme()
  const commandeCourante = commandes.find((c) => c.id === 'dem-1') || commandes[0]
  
  // Étape initiale basée sur le statut réactif
  const etapeInitiale = commandeCourante.statutCode ? Math.min(6, commandeCourante.statutCode - 1) : 4
  const [etape, setEtape] = useState(etapeInitiale)
  const [annulation, setAnnulation] = useState(false)

  // Progression fluide de la démonstration
  useEffect(() => {
    if (etape >= ETAPES_SUIVI_7.length - 1) return undefined
    const t = setTimeout(() => {
      setEtape((e) => {
        const next = e + 1
        const statObj = ETAPES_SUIVI_7[next]
        if (statObj) changerStatutCommande('dem-1', statObj.id.toUpperCase())
        return next
      })
    }, 3200)
    return () => clearTimeout(t)
  }, [etape, changerStatutCommande])

  const courante = ETAPES_SUIVI_7[etape]
  const termine = etape === ETAPES_SUIVI_7.length - 1
  const pos = POSITIONS[etape]
  const nomVidangeur = operateurChoisi?.nom || commandeCourante?.client || 'Ibrahima Ndiaye'
  const modePaiement = commandeCourante?.modePaiement || 'Wave'

  return (
    <>
      <ScreenHeader
        title="Suivi de votre vidange"
        subtitle={`Réf. AT-2026-08-4471 · Mis à jour à ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`}
        onBack={() => go('operators')}
        right={
          <Badge tone={termine ? 'success' : etape >= 3 ? 'teal' : 'amber'} icon={termine ? ShieldCheck : Clock}>
            {termine ? 'Vidange terminée' : etape >= 3 ? 'Camion autorisé' : 'Attente paiement'}
          </Badge>
        }
      />

      <ScreenBody padded={false}>
        <div className="px-5 pt-2">
          <MapCanvas className="h-[210px] rounded-3xl shadow-card">
            <RouteLine from={POSITIONS[0]} to={POSITIONS[4]} curve={-14} />
            <RouteLine from={POSITIONS[4]} to={POSITIONS[6]} color="#16324A" curve={12} />
            <MapMarker x={54} y={52} color="navy" icon={MapPin} size={30} />
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
          {/* Stepper avec les 7 statuts */}
          <Card className="mt-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[12px] font-extrabold uppercase tracking-wide text-navy">
                Progression (7 Statuts)
              </span>
              <span className="rounded-full bg-teal/10 px-2.5 py-0.5 text-[11px] font-bold text-teal">
                Étape {etape + 1} / 7
              </span>
            </div>
            <Stepper etapes={ETAPES_SUIVI_7} courant={etape} />
            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-mist p-3">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white ${
                  termine ? 'bg-success' : 'bg-teal'
                }`}
              >
                {termine ? <ShieldCheck size={17} strokeWidth={2.3} /> : <Truck size={17} strokeWidth={2.3} />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-extrabold text-navy">{courante.label}</p>
                <p className="text-[11.5px] text-slateink">{courante.detail}</p>
              </div>
            </div>
          </Card>

          {/* Fiche vidangeur & camion */}
          <Card className="mt-3">
            <div className="flex items-center gap-3">
              <Avatar initiales={operateurChoisi?.initiales || 'IN'} color={operateurChoisi?.couleur || 'teal'} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-bold text-navy">{nomVidangeur}</p>
                <p className="truncate text-[11.5px] text-slateink">
                  {operateurChoisi?.camion || 'Camion 8 m³ · DK-4821-A'}
                </p>
                <div className="mt-1 flex items-center gap-1.5">
                  <Badge tone="teal" size="sm">
                    {modePaiement} — Paiement Validé ✓
                  </Badge>
                </div>
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
              { label: 'Volume', valeur: commandeCourante?.volume || '8 m³' },
              { label: 'Code Marchand', valeur: 'WAVE-NDIAYE-883' },
              { label: 'Prix Confirmé', valeur: fcfa(commandeCourante?.prix || 22500) },
            ].map((info) => (
              <div
                key={info.label}
                className="rounded-2xl border border-navy/[0.06] bg-white p-3 text-center shadow-card"
              >
                <p className="text-[10px] font-medium text-slateink truncate">{info.label}</p>
                <p className="mt-0.5 text-[12px] font-bold text-navy truncate">{info.valeur}</p>
              </div>
            ))}
          </div>
        </div>
      </ScreenBody>

      <ScreenFooter>
        {termine ? (
          <Button size="lg" block icon={ShieldCheck} onClick={() => go('confirmation')}>
            Voir le reçu & certificat QR
          </Button>
        ) : (
          <>
            <div className="flex items-center justify-center gap-2 rounded-2xl bg-success/10 py-3 text-[12.5px] font-bold text-success border border-success/20">
              <CheckCircle2 size={16} strokeWidth={2.2} />
              Paiement validé · Camion en mission de vidange
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

      {/* Annulation si avant départ */}
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
                    Votre séquestre est intégralement remboursé.
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
                  Le camion n'est pas encore arrivé. Votre paiement vous sera intégralement remboursé.
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

