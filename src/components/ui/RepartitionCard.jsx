import { useState } from 'react'
import { ChevronDown, Wallet, Lock, CheckCircle2, Banknote } from 'lucide-react'
import { fcfa } from '../../data/mockData'

/**
 * Vue vidangeur d'une mission : le montant NET perçu est mis en avant,
 * le détail (payé par le ménage, redevance, commission) est repliable.
 * Aucune transaction réelle — simple affichage d'un calcul local.
 */
export default function RepartitionCard({
  montantPaye,
  redevance,
  commission,
  net,
  espece = false,
  reparti = false,
  ouvertParDefaut = false,
  className = '',
}) {
  const [ouvert, setOuvert] = useState(ouvertParDefaut)

  return (
    <div
      className={`rounded-2xl border bg-white p-4 shadow-card ${
        reparti ? 'border-success/25' : 'border-navy/[0.07]'
      } ${className}`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white ${
            reparti ? 'bg-success' : espece ? 'bg-slateink' : 'bg-teal'
          }`}
        >
          {reparti ? (
            <CheckCircle2 size={20} strokeWidth={2.3} />
          ) : espece ? (
            <Banknote size={20} strokeWidth={2.2} />
          ) : (
            <Wallet size={20} strokeWidth={2.2} />
          )}
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-[11.5px] font-medium text-slateink">Vous percevez</p>
          <p className="text-[26px] font-extrabold leading-none tracking-[-0.02em] text-navy">
            {fcfa(net)}
          </p>
        </div>

        <button
          onClick={() => setOuvert((v) => !v)}
          className="flex shrink-0 items-center gap-1 rounded-xl bg-navy-50 px-2.5 py-1.5 text-[11.5px] font-semibold text-navy transition hover:bg-navy-100"
        >
          {ouvert ? 'Masquer' : 'Voir le détail'}
          <ChevronDown
            size={14}
            strokeWidth={2.4}
            className={`transition-transform duration-200 ${ouvert ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {ouvert && (
        <div className="mt-3 animate-fade-in rounded-2xl bg-mist p-3.5">
          <div className="space-y-1.5 text-[12.5px]">
            <div className="flex items-center justify-between">
              <span className="text-slateink">
                {espece ? 'Encaissé en espèces' : 'Payé par le ménage'}
              </span>
              <span className="font-semibold text-navy">{fcfa(montantPaye)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slateink">– Redevance de dépotage</span>
              <span className="font-semibold text-navy">– {fcfa(redevance)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slateink">– Commission plateforme</span>
              <span className="font-semibold text-navy">– {fcfa(commission)}</span>
            </div>
          </div>

          <div className="my-2.5 border-t border-dashed border-navy/15" />

          <div className="flex items-center justify-between">
            <span className="text-[12.5px] font-bold text-navy">Net vidangeur</span>
            <span className="text-[14px] font-extrabold text-teal">{fcfa(net)}</span>
          </div>

          <p className="mt-2.5 flex items-start gap-1.5 text-[11px] leading-relaxed text-slateink">
            <Lock size={12} className="mt-0.5 shrink-0" strokeWidth={2.3} />
            {espece
              ? '↳ redevance et commission débitées de votre compte prépayé au scan du QR à la station'
              : '↳ versé après scan du QR à la station'}
          </p>
        </div>
      )}
    </div>
  )
}
