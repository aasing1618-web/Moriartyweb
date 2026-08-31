import { MapPin, Phone, Droplets, Navigation, DoorOpen, Check, Lock, Banknote, Plus } from 'lucide-react'
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

          {/* Ce que perçoit réellement le vidangeur */}
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
                  Le ménage a payé par {demande.modePaiement} :{' '}
                  <span className="font-semibold text-navy">
                    {fcfa(part.montantPaye)} sont bloqués en séquestre
                  </span>{' '}
                  et répartis automatiquement au scan du QR à la station.
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
            <p className="mt-1 text-[11px] text-slateink">
              Solde : {fcfa(financier.soldePrepaye)} · requis : {fcfa(coutPrepaye)}
            </p>
            <Button size="md" block className="mt-3" icon={Plus} onClick={financier.recharger}>
              Recharger le compte prépayé
            </Button>
          </div>
        ) : (
          <div className="flex gap-2.5">
            <Button variant="outline" size="lg" className="w-[38%]" onClick={() => go('requests')}>
              Refuser
            </Button>
            <Button size="lg" className="flex-1" icon={Check} onClick={() => go('navigation')}>
              Accepter la demande
            </Button>
          </div>
        )}
      </ScreenFooter>
    </>
  )
}
