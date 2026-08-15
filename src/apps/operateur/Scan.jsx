import { useEffect, useState } from 'react'
import { ScanLine, Check, Wallet, ShieldCheck, ArrowRight, Fingerprint } from 'lucide-react'
import { Badge, Button, Card, QrCode, ScreenFooter, ScreenHeader } from '../../components/ui'
import { stationRecommandee, demandesProximite, recapitulatif, fcfa } from '../../data/mockData'

const MONTANT = demandesProximite[0].prix

export default function Scan({ go }) {
  const [etat, setEtat] = useState('pret') // pret · scan · ok

  useEffect(() => {
    if (etat !== 'scan') return undefined
    const t = setTimeout(() => setEtat('ok'), 2200)
    return () => clearTimeout(t)
  }, [etat])

  if (etat === 'ok') {
    return (
      <>
        <ScreenHeader title="Dépotage confirmé" subtitle={stationRecommandee.nom} />
        <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-5 pb-6">
          <div className="flex animate-fade-up flex-col items-center pt-6 text-center">
            <div className="relative flex h-24 w-24 items-center justify-center">
              <span className="absolute inset-0 animate-ping-soft rounded-full bg-success/40" />
              <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-success text-white shadow-lift">
                <Check size={46} strokeWidth={3} />
              </span>
            </div>
            <h2 className="mt-5 text-[22px] font-extrabold leading-tight text-navy">
              Dépotage confirmé
            </h2>
            <p className="mt-1.5 text-[13px] text-slateink">
              Station {stationRecommandee.nom} · 8 m³ enregistrés
            </p>
          </div>

          <Card className="mt-6 border-teal/20 bg-gradient-to-br from-teal/[0.08] to-white">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal text-white">
                <Wallet size={20} strokeWidth={2.2} />
              </span>
              <div className="flex-1">
                <p className="text-[11.5px] font-medium text-slateink">Paiement débloqué</p>
                <p className="text-[24px] font-extrabold leading-none text-navy">{fcfa(MONTANT)}</p>
              </div>
              <Badge tone="success" icon={Check} size="sm">
                Versé
              </Badge>
            </div>
          </Card>

          <Card className="mt-3 !py-2">
            {[
              ['Bordereau', 'BD-2026-08-1187'],
              ['Station', `${stationRecommandee.nom} — ${stationRecommandee.commune}`],
              ['Volume dépoté', '8 m³'],
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
        </div>

        <ScreenFooter>
          <Button size="lg" block iconRight={ArrowRight} onClick={() => go('revenus')}>
            Voir mes revenus
          </Button>
        </ScreenFooter>
      </>
    )
  }

  return (
    <>
      <ScreenHeader
        title="Scan de dépotage"
        subtitle={`Station ${stationRecommandee.nom}`}
        onBack={() => go('stations')}
      />

      <div className="min-h-0 flex-1 px-5 pb-2">
        <div className="relative h-full w-full overflow-hidden rounded-3xl bg-[#0F1A24]">
          {/* Vue caméra factice */}
          <div className="absolute inset-0 opacity-[0.16] bg-grid" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal/5 to-navy/40" />

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="relative">
              <QrCode value="BD-2026-08-1187" size={190} className="opacity-90" />
              {etat === 'scan' && (
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <div className="absolute inset-x-0 h-[3px] animate-scanline bg-teal shadow-[0_0_18px_4px_rgba(14,124,123,0.8)]" />
                </div>
              )}
            </div>
            <p className="mt-6 text-center text-[13px] font-semibold text-white">
              {etat === 'scan' ? 'Lecture du bordereau…' : 'Cadrez le QR code de la station'}
            </p>
            <p className="mt-1 text-center text-[11.5px] text-white/60">
              Le paiement se débloque après validation
            </p>
          </div>

          {/* Coins de visée */}
          {[
            'left-6 top-6 border-l-4 border-t-4 rounded-tl-2xl',
            'right-6 top-6 border-r-4 border-t-4 rounded-tr-2xl',
            'left-6 bottom-6 border-l-4 border-b-4 rounded-bl-2xl',
            'right-6 bottom-6 border-r-4 border-b-4 rounded-br-2xl',
          ].map((c) => (
            <span key={c} className={`absolute h-12 w-12 border-teal ${c}`} />
          ))}

          <div className="absolute left-1/2 top-5 -translate-x-1/2">
            <Badge tone="white">{stationRecommandee.commune}</Badge>
          </div>
        </div>
      </div>

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
