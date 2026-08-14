import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Truck, ShieldCheck, Users, Home, AlertTriangle, ArrowUpRight } from 'lucide-react'
import { Badge, Card, ProgressBar, SectionTitle, StatCard } from '../../components/ui'
import { kpis, vidangesMensuelles, repartitionCommunes, stations } from '../../data/mockData'

const ICONES = { truck: Truck, shield: ShieldCheck, users: Users, home: Home }

function InfoBulle({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-navy/10 bg-white px-3 py-2 shadow-soft">
      <p className="text-[12px] font-bold text-navy">{label} 2026</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-[11.5px] font-medium" style={{ color: p.color }}>
          {p.name} : {p.value.toLocaleString('fr-FR')}
        </p>
      ))}
    </div>
  )
}

export default function Overview() {
  const saturees = stations.filter((s) => s.remplissage >= 88)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <StatCard
            key={k.id}
            label={k.label}
            valeur={k.valeur}
            variation={k.variation}
            icon={ICONES[k.icone]}
            ton={k.ton}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2 !p-6">
          <SectionTitle
            action={
              <div className="flex items-center gap-4 text-[11.5px] font-semibold">
                <span className="flex items-center gap-1.5 text-navy">
                  <span className="h-2.5 w-2.5 rounded-full bg-navy" /> Vidanges tracées
                </span>
                <span className="flex items-center gap-1.5 text-teal">
                  <span className="h-2.5 w-2.5 rounded-full bg-teal" /> Dépotages conformes
                </span>
              </div>
            }
          >
            Évolution mensuelle · 12 derniers mois
          </SectionTitle>

          <div className="h-[290px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={vidangesMensuelles} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradNavy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#16324A" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#16324A" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gradTeal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0E7C7B" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#0E7C7B" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 6" stroke="rgba(22,50,74,0.08)" vertical={false} />
                <XAxis
                  dataKey="mois"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11.5, fill: '#5B6B72', fontWeight: 500 }}
                  dy={6}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11.5, fill: '#5B6B72' }}
                  width={54}
                />
                <Tooltip content={<InfoBulle />} />
                <Area
                  type="monotone"
                  dataKey="vidanges"
                  name="Vidanges tracées"
                  stroke="#16324A"
                  strokeWidth={2.6}
                  fill="url(#gradNavy)"
                />
                <Area
                  type="monotone"
                  dataKey="conformes"
                  name="Dépotages conformes"
                  stroke="#0E7C7B"
                  strokeWidth={2.6}
                  fill="url(#gradTeal)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="space-y-5">
          <Card className="!p-6">
            <SectionTitle>Alertes en cours</SectionTitle>
            <div className="space-y-3">
              {saturees.map((s) => (
                <div
                  key={s.id}
                  className={`flex items-start gap-3 rounded-2xl p-3.5 ${
                    s.remplissage >= 95 ? 'bg-danger/[0.07]' : 'bg-warning/[0.09]'
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                      s.remplissage >= 95 ? 'bg-danger text-white' : 'bg-warning text-white'
                    }`}
                  >
                    <AlertTriangle size={17} strokeWidth={2.3} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-bold text-navy">Station {s.nom}</p>
                    <p className="text-[11.5px] text-slateink">
                      {s.remplissage} % de remplissage ·{' '}
                      {s.remplissage >= 95 ? 'saturation imminente' : 'à surveiller'}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex items-start gap-3 rounded-2xl bg-navy-50 p-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
                  <Truck size={17} strokeWidth={2.3} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-bold text-navy">6 zones à risque identifiées</p>
                  <p className="text-[11.5px] text-slateink">
                    Dépotages non tracés détectés à Médina Gounass et Malika
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="!p-6">
            <SectionTitle>Impact estimé</SectionTitle>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[30px] font-extrabold leading-none text-navy">96 800 m³</p>
                <p className="mt-1.5 text-[12px] text-slateink">
                  boues traitées en filière contrôlée
                </p>
              </div>
              <Badge tone="success" icon={ArrowUpRight}>
                +23 %
              </Badge>
            </div>
          </Card>
        </div>
      </div>

      <Card className="!p-6">
        <SectionTitle
          action={<span className="text-[12px] font-semibold text-teal">6 communes suivies</span>}
        >
          Répartition par commune
        </SectionTitle>
        <div className="grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2">
          {repartitionCommunes.map((c) => (
            <div key={c.commune}>
              <div className="mb-1.5 flex items-center justify-between text-[12.5px]">
                <span className="font-semibold text-navy">{c.commune}</span>
                <span className="text-slateink">
                  {c.vidanges.toLocaleString('fr-FR')} vidanges ·{' '}
                  <span
                    className="font-bold"
                    style={{ color: c.conformite >= 85 ? '#1E9E63' : '#E0A200' }}
                  >
                    {c.conformite} % conformes
                  </span>
                </span>
              </div>
              <ProgressBar
                value={(c.vidanges / 2600) * 100}
                color={c.conformite >= 85 ? '#0E7C7B' : '#E0A200'}
                height={7}
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
