import { useState } from 'react'
import {
  Navigation,
  Clock,
  Droplets,
  ChevronRight,
  Zap,
  MapPin,
  Truck,
  Wallet,
  Plus,
  Lock,
  Banknote,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  ShieldAlert,
} from 'lucide-react'
import { Avatar, Badge, Card, MapCanvas, MapMarker, ScreenBody } from '../../components/ui'
import { operateur, statsOperateur, repartition, fcfa } from '../../data/mockData'
import { volumeDemande } from './OperateurApp.jsx'
import { usePlateforme } from '../../lib/PlateformeContext.jsx'
import { formatNote } from '../../lib/notation.js'

const TON_URGENCE = {
  Urgent: 'danger',
  Standard: 'teal',
  'Planifié demain': 'neutral',
}

export default function Requests({ go, onChoisirDemande, financier }) {
  const [enLigne, setEnLigne] = useState(true)
  const { soldePrepaye, recharger } = financier
  const { noteDe, commandes } = usePlateforme()
  const maNote = noteDe(operateur.chauffeurId)

  /** Une mission en espèces exige de pouvoir couvrir redevance + commission. */
  const bloquee = (d) => {
    if (d.modePaiement !== 'Espèces') return false
    const { redevance, commission } = repartition(d.prix, volumeDemande(d))
    return soldePrepaye < redevance + commission
  }

  const missionsBloquees = commandes.filter(bloquee).length

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
            <span className={`h-2 w-2 rounded-full ${enLigne ? 'bg-white' : 'bg-white/50'}`} />
            {enLigne ? 'En ligne' : 'Hors ligne'}
          </button>
        </div>

        {/* Compte prépayé — visible en permanence */}
        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white/10 px-3.5 py-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
            <Wallet size={17} strokeWidth={2.2} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10.5px] font-medium text-white/60">Compte prépayé (Missions Espèces)</p>
            <p className="text-[16px] font-extrabold leading-tight">{fcfa(soldePrepaye)}</p>
          </div>
          <button
            onClick={recharger}
            className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-[11.5px] font-bold text-navy transition hover:bg-white/90"
          >
            <Plus size={14} strokeWidth={2.6} />
            Recharger
          </button>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2.5">
          {[
            { label: 'Aujourd’hui', valeur: '3 vidanges' },
            { label: 'Net du jour', valeur: '58 500' },
            { label: 'Note', valeur: `${formatNote(maNote.globale)} ★` },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-white/10 px-3 py-2.5">
              <p className="text-[10px] font-medium text-white/60">{s.label}</p>
              <p className="mt-0.5 text-[13px] font-bold">{s.valeur}</p>
            </div>
          ))}
        </div>
      </div>

      <ScreenBody padded={false}>
        {missionsBloquees > 0 && (
          <div className="px-4 pt-3">
            <div className="flex items-start gap-2.5 rounded-2xl border border-danger/25 bg-danger/[0.07] p-3.5">
              <AlertTriangle size={17} className="mt-0.5 shrink-0 text-danger" strokeWidth={2.3} />
              <div className="min-w-0 flex-1">
                <p className="text-[12.5px] font-bold leading-snug text-navy">
                  Solde prépayé insuffisant pour les missions en espèces.
                </p>
                <button
                  onClick={recharger}
                  className="mt-2 flex items-center gap-1.5 rounded-xl bg-navy px-3 py-1.5 text-[11px] font-bold text-white transition"
                >
                  <Plus size={13} /> Recharger maintenant
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="px-5 pt-4">
          <MapCanvas className="h-[140px] rounded-3xl shadow-card">
            <MapMarker x={50} y={52} color="navy" icon={Truck} size={34} pulse />
            <MapMarker x={24} y={30} color="amber" icon={MapPin} size={26} />
            <MapMarker x={74} y={34} color="danger" icon={MapPin} size={26} />
            <MapMarker x={68} y={72} color="teal" icon={MapPin} size={26} />
            <div className="absolute bottom-2.5 left-2.5 rounded-xl bg-white/95 px-2.5 py-1.5 text-[10px] font-semibold text-navy shadow-card">
              Zone : Dakar Nord · {commandes.length} demandes actives
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

          <div className="space-y-3">
            {commandes.map((d) => {
              const part = repartition(d.prix, volumeDemande(d))
              const estEspece = d.modePaiement === 'Espèces'
              const estPaiementValide = d.statutCode >= 4
              const estPrioritaire = d.prioritaire || d.urgence === 'Urgent'
              const estBloquee = bloquee(d)

              return (
                <Card
                  key={d.id}
                  onClick={() => {
                    onChoisirDemande(d)
                    go('detail')
                  }}
                  className={`!p-3.5 transition hover:shadow-card-hover ${estPrioritaire ? 'border-2 border-danger/40 bg-gradient-to-r from-danger/[0.04] to-white' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar initiales={d.initiales || 'AD'} color={estPrioritaire ? 'amber' : 'soft'} />
                    <div className="min-w-0 flex-1">
                      {/* Priority Header Badge */}
                      {estPrioritaire && (
                        <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-full bg-danger px-2.5 py-0.5 text-[10px] font-extrabold text-white uppercase tracking-wider shadow-2xs">
                          <ShieldAlert size={12} />
                          🔴 INTERVENTION PRIORITAIRE
                        </div>
                      )}

                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-[13.5px] font-extrabold leading-tight text-navy">
                            {d.quartier}
                          </p>
                          <p className="truncate text-[11.5px] text-slateink font-medium">{d.client}</p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-[10px] font-medium text-slateink">Net perçu</p>
                          <p className="text-[14px] font-extrabold leading-tight text-teal">
                            {fcfa(part.net)}
                          </p>
                        </div>
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
                          {d.distance}
                        </Badge>
                        <Badge tone="neutral" icon={Droplets} size="sm">
                          {d.volume}
                        </Badge>
                        <Badge
                          tone={estEspece ? 'amber' : 'teal'}
                          icon={estEspece ? Banknote : Smartphone}
                          size="sm"
                        >
                          {d.modePaiement || 'Wave'}
                        </Badge>
                      </div>

                      {/* Autorisation départ du camion */}
                      <div className="mt-2.5 flex items-center justify-between border-t border-navy/5 pt-2">
                        {estPaiementValide ? (
                          <span className="flex items-center gap-1.5 text-[11px] font-bold text-success">
                            <CheckCircle2 size={13} strokeWidth={2.4} />
                            Paiement confirmé · Camion autorisé à partir
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700">
                            <AlertCircle size={13} strokeWidth={2.4} />
                            En attente de paiement (Départ non autorisé)
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight size={16} className="mt-1 shrink-0 text-slateink" />
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </ScreenBody>
    </>
  )
}

