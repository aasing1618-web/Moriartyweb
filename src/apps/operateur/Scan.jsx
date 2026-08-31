import { useEffect, useState } from 'react'
import {
  ScanLine,
  Check,
  ShieldCheck,
  ArrowRight,
  Fingerprint,
  Minus,
  Plus,
  Truck,
  Factory,
  Percent,
  Banknote,
  RotateCcw,
  Droplets,
} from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  QrCode,
  RepartitionCard,
  ScreenBody,
  ScreenFooter,
  ScreenHeader,
} from '../../components/ui'
import { stationRecommandee, recapitulatif, operateur, fcfa } from '../../data/mockData'

export default function Scan({ go, financier }) {
  const [etat, setEtat] = useState('pret') // pret · scan · ok
  const { volumeEstime, volumeReel, setVolumeReel, partFinale, estEspece, coutPrepaye } = financier

  useEffect(() => {
    if (etat !== 'scan') return undefined
    const t = setTimeout(() => {
      financier.validerDepotage()
      setEtat('ok')
    }, 2200)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [etat])

  const ajuster = (delta) => setVolumeReel(Math.max(1, volumeReel + delta))

  /* ---------------------------------------------------------------- */
  /*  Après scan : la répartition a eu lieu                           */
  /* ---------------------------------------------------------------- */
  if (etat === 'ok') {
    const parts = [
      {
        label: 'Part prestation',
        destinataire: operateur.nomComplet,
        montant: partFinale.net,
        icon: Truck,
        ton: 'bg-teal text-white',
      },
      {
        label: 'Redevance de dépotage',
        destinataire: `Delvic — station ${stationRecommandee.nom}`,
        montant: partFinale.redevance,
        icon: Factory,
        ton: 'bg-navy text-white',
      },
      {
        label: 'Commission plateforme',
        destinataire: 'AssainiTrack',
        montant: partFinale.commission,
        icon: Percent,
        ton: 'bg-amber text-white',
      },
    ]

    return (
      <>
        <ScreenHeader
          title="Dépotage confirmé"
          subtitle={`${stationRecommandee.nom} · ${partFinale.volumeM3} m³`}
        />
        <ScreenBody>
          <div className="flex animate-fade-up flex-col items-center pt-2 text-center">
            <div className="relative flex h-20 w-20 items-center justify-center">
              <span className="absolute inset-0 animate-ping-soft rounded-full bg-success/40" />
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-success text-white shadow-lift">
                <Check size={40} strokeWidth={3} />
              </span>
            </div>
            <h2 className="mt-4 text-[21px] font-extrabold leading-tight text-navy">
              Dépotage confirmé
            </h2>
            <p className="mt-1 text-[12.5px] text-slateink">
              Répartition déclenchée par le scan du bordereau
            </p>
          </div>

          <RepartitionCard
            className="mt-5"
            montantPaye={partFinale.montantPaye}
            redevance={partFinale.redevance}
            commission={partFinale.commission}
            net={partFinale.net}
            espece={estEspece}
            reparti
            ouvertParDefaut
          />

          <p className="mb-2 mt-5 text-[12px] font-semibold uppercase tracking-wide text-slateink">
            Répartition du séquestre
          </p>
          <Card className="!py-2">
            {parts.map((p) => (
              <div
                key={p.label}
                className="flex items-center gap-3 border-b border-navy/[0.06] py-3 last:border-0"
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${p.ton}`}
                >
                  <p.icon size={16} strokeWidth={2.3} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[12.5px] font-bold text-navy">{p.label}</p>
                  <p className="truncate text-[11px] text-slateink">{p.destinataire}</p>
                </div>
                <span className="shrink-0 text-[13.5px] font-extrabold text-navy">
                  {fcfa(p.montant)}
                </span>
              </div>
            ))}
          </Card>

          {partFinale.ajustement !== 0 && (
            <div className="mt-3 flex items-start gap-2.5 rounded-2xl bg-amber/[0.09] p-3.5">
              <RotateCcw size={16} className="mt-0.5 shrink-0 text-amber-600" strokeWidth={2.2} />
              <p className="text-[11.5px] leading-relaxed text-slateink">
                Volume réel {partFinale.volumeM3} m³ au lieu de {volumeEstime} m³ estimés :
                séquestre ajusté —{' '}
                <span className="font-semibold text-navy">
                  {partFinale.sens === 'remboursement'
                    ? `${fcfa(Math.abs(partFinale.ajustement))} remboursés au ménage`
                    : `${fcfa(partFinale.ajustement)} de complément demandés au ménage`}
                </span>
                . Redevance recalculée sur le volume réel.
              </p>
            </div>
          )}

          {estEspece && (
            <div className="mt-3 flex items-start gap-2.5 rounded-2xl bg-navy-50 p-3.5">
              <Banknote size={16} className="mt-0.5 shrink-0 text-navy" strokeWidth={2.2} />
              <p className="text-[11.5px] leading-relaxed text-slateink">
                Mission réglée en espèces :{' '}
                <span className="font-semibold text-navy">{fcfa(coutPrepaye)}</span> débités de
                votre compte prépayé. Nouveau solde :{' '}
                <span className="font-semibold text-navy">{fcfa(financier.soldePrepaye)}</span>.
              </p>
            </div>
          )}

          <Card className="mt-3 !py-2">
            {[
              ['Bordereau', 'BD-2026-08-1187'],
              ['Station', `${stationRecommandee.nom} — ${stationRecommandee.commune}`],
              ['Volume dépoté', `${partFinale.volumeM3} m³`],
              ['Horodatage', '14 août 2026 · 11h18'],
            ].map(([label, valeur]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-3 border-b border-navy/[0.06] py-2.5 text-[12.5px] last:border-0"
              >
                <span className="text-slateink">{label}</span>
                <span className="truncate font-semibold text-navy">{valeur}</span>
              </div>
            ))}
            <div className="flex justify-center py-2.5">
              <Badge tone="navy" icon={Fingerprint}>
                Passeport n° {recapitulatif.passeport}
              </Badge>
            </div>
          </Card>

          <div className="mt-3 flex items-center gap-2.5 rounded-2xl bg-success/[0.08] p-3.5">
            <ShieldCheck size={18} className="shrink-0 text-success" strokeWidth={2.2} />
            <p className="text-[11.5px] leading-relaxed text-slateink">
              Le certificat de conformité a été transmis au ménage et au registre ONAS.
            </p>
          </div>
        </ScreenBody>

        <ScreenFooter>
          <Button size="lg" block iconRight={ArrowRight} onClick={() => go('revenus')}>
            Voir mes revenus
          </Button>
        </ScreenFooter>
      </>
    )
  }

  /* ---------------------------------------------------------------- */
  /*  Avant scan : constat du volume réel                             */
  /* ---------------------------------------------------------------- */
  return (
    <>
      <ScreenHeader
        title="Scan de dépotage"
        subtitle={`Station ${stationRecommandee.nom}`}
        onBack={() => go('stations')}
      />

      <ScreenBody>
        <Card className="!p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal/10 text-teal">
              <Droplets size={15} strokeWidth={2.3} />
            </span>
            <p className="text-[12.5px] font-bold text-navy">Volume réel constaté</p>
            <Badge tone="neutral" size="sm" className="ml-auto">
              Estimé : {volumeEstime} m³
            </Badge>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-2xl bg-mist px-3 py-2.5">
            <button
              onClick={() => ajuster(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-navy shadow-card transition hover:bg-navy-50"
            >
              <Minus size={17} strokeWidth={2.6} />
            </button>
            <div className="text-center">
              <p className="text-[26px] font-extrabold leading-none text-navy">
                {volumeReel} m³
              </p>
              <p className="mt-1 text-[10.5px] text-slateink">mesuré à la potence</p>
            </div>
            <button
              onClick={() => ajuster(1)}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-navy shadow-card transition hover:bg-navy-50"
            >
              <Plus size={17} strokeWidth={2.6} />
            </button>
          </div>

          {partFinale.ajustement !== 0 && (
            <p className="mt-2.5 text-[11px] leading-relaxed text-slateink">
              Écart de {partFinale.ecart > 0 ? '+' : ''}
              {partFinale.ecart} m³ :{' '}
              <span className="font-semibold text-navy">
                {partFinale.sens === 'remboursement'
                  ? `${fcfa(Math.abs(partFinale.ajustement))} seront remboursés au ménage`
                  : `${fcfa(partFinale.ajustement)} de complément seront demandés au ménage`}
              </span>
              . Redevance recalculée : {fcfa(partFinale.redevance)}.
            </p>
          )}
        </Card>

        <RepartitionCard
          className="mt-3"
          montantPaye={partFinale.montantPaye}
          redevance={partFinale.redevance}
          commission={partFinale.commission}
          net={partFinale.net}
          espece={estEspece}
        />

        <div className="relative mt-3 h-[240px] overflow-hidden rounded-3xl bg-[#0F1A24]">
          {/* Vue caméra factice */}
          <div className="absolute inset-0 bg-grid opacity-[0.16]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal/5 to-navy/40" />

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="relative">
              <QrCode value="BD-2026-08-1187" size={130} className="opacity-90" />
              {etat === 'scan' && (
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <div className="absolute inset-x-0 h-[3px] animate-scanline bg-teal shadow-[0_0_18px_4px_rgba(14,124,123,0.8)]" />
                </div>
              )}
            </div>
            <p className="mt-4 text-center text-[12.5px] font-semibold text-white">
              {etat === 'scan' ? 'Lecture du bordereau…' : 'Cadrez le QR code de la station'}
            </p>
            <p className="mt-1 text-center text-[11px] text-white/60">
              Pas de preuve, pas de paiement
            </p>
          </div>

          {/* Coins de visée */}
          {[
            'left-4 top-4 border-l-4 border-t-4 rounded-tl-2xl',
            'right-4 top-4 border-r-4 border-t-4 rounded-tr-2xl',
            'left-4 bottom-4 border-l-4 border-b-4 rounded-bl-2xl',
            'right-4 bottom-4 border-r-4 border-b-4 rounded-br-2xl',
          ].map((c) => (
            <span key={c} className={`absolute h-10 w-10 border-teal ${c}`} />
          ))}
        </div>
      </ScreenBody>

      <ScreenFooter>
        <Button
          size="lg"
          block
          icon={ScanLine}
          onClick={() => setEtat('scan')}
          disabled={etat === 'scan'}
        >
          {etat === 'scan' ? 'Analyse en cours…' : 'Scanner le bordereau'}
        </Button>
      </ScreenFooter>
    </>
  )
}
