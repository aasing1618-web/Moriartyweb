import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts'
import { TrendingUp, Star, Truck, Wallet, ArrowUpRight } from 'lucide-react'
import { Card, ScreenBody, ScreenHeader, SectionTitle, Badge } from '../../components/ui'
import { revenusSemaine, statsOperateur, historiqueVidanges, fcfa } from '../../data/mockData'

function InfoBulle({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl bg-navy px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-lift">
      {label} · {fcfa(payload[0].value)}
    </div>
  )
}

export default function Revenus() {
  const max = Math.max(...revenusSemaine.map((r) => r.gains))

  return (
    <>
      <ScreenHeader title="Mes revenus" subtitle="Semaine du 10 au 16 août 2026" />
      <ScreenBody>
        <Card className="border-navy/10 bg-gradient-to-br from-navy to-navy-600 !p-5 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11.5px] font-medium text-white/70">Gains de la semaine</p>
              <p className="mt-1.5 text-[30px] font-extrabold leading-none">
                {fcfa(statsOperateur.gainsSemaine)}
              </p>
              <p className="mt-2 flex items-center gap-1 text-[11.5px] font-semibold text-white/80">
                <ArrowUpRight size={14} strokeWidth={2.6} />
                +12 % vs semaine dernière
              </p>
            </div>
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
              <Wallet size={20} strokeWidth={2.2} />
            </span>
          </div>
        </Card>

        <Card className="mt-3">
          <SectionTitle
            action={<span className="text-[11.5px] font-semibold text-teal">7 derniers jours</span>}
          >
            Gains quotidiens
          </SectionTitle>
          <div className="h-[150px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenusSemaine} margin={{ top: 6, right: 0, left: 0, bottom: 0 }}>
                <XAxis
                  dataKey="jour"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10.5, fill: '#5B6B72', fontWeight: 600 }}
                />
                <Tooltip cursor={{ fill: 'rgba(22,50,74,0.05)' }} content={<InfoBulle />} />
                <Bar dataKey="gains" radius={[8, 8, 8, 8]} maxBarSize={22}>
                  {revenusSemaine.map((r) => (
                    <Cell key={r.jour} fill={r.gains === max ? '#0E7C7B' : '#C7E4E3'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="mt-3 grid grid-cols-3 gap-2.5">
          {[
            { icon: Truck, label: 'Vidanges', valeur: statsOperateur.vidangesSemaine, ton: 'bg-navy-50 text-navy' },
            { icon: Star, label: 'Note', valeur: '4,8', ton: 'bg-amber/12 text-amber-600' },
            { icon: TrendingUp, label: 'Conformité', valeur: '100 %', ton: 'bg-success/10 text-success' },
          ].map((s) => (
            <Card key={s.label} className="!p-3">
              <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${s.ton}`}>
                <s.icon size={15} strokeWidth={2.3} />
              </span>
              <p className="mt-2 text-[10.5px] font-medium text-slateink">{s.label}</p>
              <p className="text-[15px] font-extrabold leading-tight text-navy">{s.valeur}</p>
            </Card>
          ))}
        </div>

        <SectionTitle className="mt-5">Dernières courses</SectionTitle>
        <div className="space-y-2.5">
          {historiqueVidanges.slice(0, 4).map((v) => (
            <Card key={v.id} className="!p-3.5">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                  <Truck size={16} strokeWidth={2.2} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-bold text-navy">
                    {v.station} · {v.volume}
                  </p>
                  <p className="text-[11px] text-slateink">{v.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-extrabold text-navy">{fcfa(v.montant)}</p>
                  <Badge tone="success" size="sm">
                    Versé
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <p className="mt-4 text-center text-[11px] text-slateink">
          Mois en cours : {fcfa(statsOperateur.gainsMois)} · {statsOperateur.vidangesMois} vidanges
        </p>
      </ScreenBody>
    </>
  )
}
