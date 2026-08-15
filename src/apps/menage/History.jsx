import { ShieldCheck, ChevronRight, Droplets, Fingerprint } from 'lucide-react'
import { Avatar, Badge, Card, ScreenBody, ScreenHeader } from '../../components/ui'
import { historiqueVidanges, fcfa } from '../../data/mockData'

export default function History({ go }) {
  const total = historiqueVidanges.reduce((s, v) => s + v.montant, 0)

  return (
    <>
      <ScreenHeader title="Historique" subtitle="Toutes vos vidanges tracées" />
      <ScreenBody>
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-navy p-4 text-white shadow-lift">
            <p className="text-[11px] font-medium text-white/70">Vidanges</p>
            <p className="mt-1 text-[24px] font-extrabold leading-none">
              {historiqueVidanges.length}
            </p>
            <p className="mt-1.5 text-[10.5px] text-white/60">100 % conformes</p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-card">
            <p className="text-[11px] font-medium text-slateink">Total dépensé</p>
            <p className="mt-1 text-[20px] font-extrabold leading-none text-teal">
              {fcfa(total).replace(' FCFA', '')}
            </p>
            <p className="mt-1.5 text-[10.5px] text-slateink">FCFA depuis 2024</p>
          </div>
        </div>

        <div className="space-y-2.5">
          {historiqueVidanges.map((v) => (
            <Card key={v.id} hover className="!p-3.5">
              <div className="flex items-center gap-3">
                <Avatar initiales={v.initiales} color="soft" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-[13.5px] font-bold text-navy">{v.date}</p>
                    <p className="shrink-0 text-[13.5px] font-extrabold text-navy">
                      {fcfa(v.montant)}
                    </p>
                  </div>
                  <p className="truncate text-[11.5px] text-slateink">
                    {v.operateur} · {v.volume} · {v.station}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                    <Badge tone="success" icon={ShieldCheck} size="sm">
                      {v.statut}
                    </Badge>
                    <span className="text-[10.5px] text-slateink">{v.id}</span>
                    <Badge tone="navy" icon={Fingerprint} size="sm">
                      Passeport n° {v.passeport}
                    </Badge>
                  </div>
                </div>
                <ChevronRight size={16} className="shrink-0 text-slateink" />
              </div>
            </Card>
          ))}
        </div>

        <button
          onClick={() => go('booking')}
          className="mt-4 flex w-full items-center gap-3 rounded-2xl border border-dashed border-teal/40 bg-teal/[0.06] p-4 text-left transition hover:bg-teal/10"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal text-white">
            <Droplets size={18} strokeWidth={2.2} />
          </span>
          <span>
            <span className="block text-[13px] font-bold text-navy">Planifier la prochaine</span>
            <span className="block text-[11.5px] text-slateink">
              Recommandée sous 2 semaines
            </span>
          </span>
        </button>
      </ScreenBody>
    </>
  )
}
