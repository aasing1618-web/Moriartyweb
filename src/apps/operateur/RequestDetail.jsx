import { MapPin, Phone, Droplets, Navigation, DoorOpen, Check, Lock, Banknote, Plus, Smartphone, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react'
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
  RepartitionCard,
} from '../../components/ui'
import { fcfa } from '../../data/mockData'
import { usePlateforme } from '../../lib/PlateformeContext.jsx'

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

export default function RequestDetail({ go, demande, financier }) {
  const { part, estEspece, coutPrepaye, soldeInsuffisant: bloquee } = financier
  const { changerStatutCommande, confirmerPrixCommande } = usePlateforme()
  const estPaiementValide = demande.statutCode >= 4
  const modePaiement = demande.modePaiement || 'Wave'

  const accepterEtPartir = () => {
    confirmerPrixCommande(demande.id, demande.prix)
    changerStatutCommande(demande.id, 'CAMION_ENVOYE')
    go('navigation')
  }

  return (
    <>
      <ScreenHeader
        title="Détail de la demande"
        subtitle={demande.quartier}
        onBack={() => go('requests')}
        right={
          <Badge tone={demande.urgence === 'Urgent' ? 'danger' : 'teal'}>
            {demande.prioritaire ? '🔴 PRIORITAIRE' : demande.urgence}
          </Badge>
        }
      />

      <ScreenBody padded={false}>
        <div className="px-5">
          <MapCanvas className="h-[150px] rounded-3xl shadow-card">
            <MapMarker x={58} y={46} color="amber" icon={MapPin} size={38} pulse label={demande.quartier} />
          </MapCanvas>
        </div>

        <div className="px-5 pb-6 pt-4">
          {/* Card statut autorisation départ camion */}
          <div className={`mb-3 flex items-center justify-between rounded-2xl border p-3.5 shadow-2xs ${
            estPaiementValide ? 'border-success/30 bg-success/10 text-success' : 'border-amber/30 bg-amber/10 text-amber-800'
          }`}>
            <div className="flex items-center gap-2.5">
              {estPaiementValide ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              <div>
                <p className="text-[12.5px] font-extrabold">
                  {estPaiementValide ? 'Paiement Confirmé — Départ Autorisé' : 'Paiement en attente par le ménage'}
                </p>
                <p className="text-[11px] text-slateink">
                  {estPaiementValide ? 'Le camion peut partir vers le client' : 'Le camion ne doit pas se déplacer avant validation'}
                </p>
              </div>
            </div>
          </div>

          <Card>
            <div className="flex items-center gap-3">
              <Avatar initiales={demande.initiales || 'AD'} color="navy" size="lg" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-bold leading-tight text-navy">
                  {demande.client}
                </p>
                <p className="truncate text-[11.5px] text-slateink">{demande.telephone}</p>
                <div className="mt-1.5">
                  <Stars note={demande.note || 4.8} size={12} />
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
              icon={Smartphone}
              label="Mode de paiement & Code Marchand"
              valeur={`${modePaiement} · Code : ${demande.codeMarchand || 'WAVE-NDIAYE-883'}`}
            />
          </Card>

          {/* Répartition financière */}
          <RepartitionCard
            className="mt-3"
            montantPaye={part.montantPaye}
            redevance={part.redevance}
            commission={part.commission}
            net={part.net}
            espece={estEspece}
          />

          <div
            className={`mt-3 flex items-start gap-2.5 rounded-2xl p-3.5 ${
              estEspece ? 'bg-amber/[0.09]' : 'bg-teal/[0.07]'
            }`}
          >
            {estEspece ? (
              <Banknote size={17} className="mt-0.5 shrink-0 text-amber-600" strokeWidth={2.2} />
            ) : (
              <Lock size={17} className="mt-0.5 shrink-0 text-teal" strokeWidth={2.2} />
            )}
            <p className="text-[11.5px] leading-relaxed text-slateink">
              {estEspece ? (
                <>
                  Le ménage règle <span className="font-semibold text-navy">en espèces</span> :
                  vous encaissez {fcfa(part.montantPaye)} et{' '}
                  <span className="font-semibold text-navy">{fcfa(coutPrepaye)}</span> seront
                  débités de votre compte prépayé au scan du dépotage.
                </>
              ) : (
                <>
                  Paiement via {modePaiement} :{' '}
                  <span className="font-semibold text-navy">
                    Code Marchand WAVE-NDIAYE-883 validé.
                  </span>{' '}
                  Les fonds sont bloqués en séquestre et libérés après dépotage.
                </>
              )}
            </p>
          </div>
        </div>
      </ScreenBody>

      <ScreenFooter>
        {bloquee ? (
          <div className="rounded-2xl border border-danger/25 bg-danger/[0.07] p-3.5 text-center">
            <p className="text-[12.5px] font-bold text-navy">
              Solde insuffisant — rechargez pour accepter de nouvelles missions.
            </p>
            <Button size="md" block className="mt-3" icon={Plus} onClick={financier.recharger}>
              Recharger le compte prépayé
            </Button>
          </div>
        ) : (
          <div className="flex gap-2.5">
            <Button variant="outline" size="lg" className="w-[35%]" onClick={() => go('requests')}>
              Refuser
            </Button>
            <Button size="lg" className="flex-1" icon={Check} onClick={accepterEtPartir}>
              Accepter & Démarrer (Camion Envoyé)
            </Button>
          </div>
        )}
      </ScreenFooter>
    </>
  )
}

