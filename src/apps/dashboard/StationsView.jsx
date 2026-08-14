import { AlertTriangle, Clock, MapPin, Factory, TrendingUp } from 'lucide-react'
import { Badge, Card, Gauge, ProgressBar, SectionTitle } from '../../components/ui'
import { stations } from '../../data/mockData'

const couleur = (r) => (r >= 90 ? '#D64545' : r >= 80 ? '#E0A200' : '#1E9E63')

export default function StationsView() {
  const moyenne = Math.round(
    stations.reduce((s, st) => s + st.remplissage, 0) / stations.length
  )

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="!p-6 lg:col-span-2">
          <SectionTitle
            action={<Badge tone="neutral">5 stations suivies · région de Dakar</Badge>}
          >
            Charge des stations de traitement
          </SectionTitle>
          <div className="space-y-4">
            {stations.map((s) => (
              <div key={s.id}>
                <div className="mb-1.5 flex items-center justify-between text-[12.5px]">
                  <span className="font-semibold text-navy">
                    {s.nom}
                    <span className="ml-2 font-normal text-slateink">{s.commune}</span>
                  </span>
                  <span className="font-bold" style={{ color: couleur(s.remplissage) }}>
                    {s.remplissage} %
                  </span>
                </div>
                <ProgressBar value={s.remplissage} color={couleur(s.remplissage)} height={9} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="!p-6">
          <SectionTitle>Remplissage moyen</SectionTitle>
          <div className="flex flex-col items-center">
            <Gauge value={moyenne} size={150} stroke={13} color="#0E7C7B" sublabel="du réseau" />
            <p className="mt-4 text-center text-[12px] leading-relaxed text-slateink">
              Une station au-delà de <span className="font-semibold text-navy">90 %</span> déclenche
              une alerte et une réorientation automatique des camions.
            </p>
            <div className="mt-4 flex w-full items-center gap-2 rounded-2xl bg-danger/[0.07] p-3">
              <AlertTriangle size={17} className="shrink-0 text-danger" strokeWidth={2.3} />
              <p className="text-[11.5px] font-semibold text-navy">
                1 station en alerte de saturation
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        {stations.map((s) => {
          const saturee = s.statut === 'saturee'
          return (
            <Card
              key={s.id}
              className={`!p-6 ${saturee ? 'border-danger/40 ring-1 ring-danger/30' : ''}`}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                    saturee ? 'bg-danger/10 text-danger' : 'bg-navy-50 text-navy'
                  }`}
                >
                  <Factory size={18} strokeWidth={2.2} />
                </span>
                {saturee ? (
                  <Badge tone="danger" icon={AlertTriangle} size="sm">
                    Alerte saturation
                  </Badge>
                ) : s.recommandee ? (
                  <Badge tone="teal" size="sm">
                    Recommandée
                  </Badge>
                ) : (
                  <Badge tone="success" size="sm">
                    Normal
                  </Badge>
                )}
              </div>

              <p className="mt-4 text-[17px] font-bold leading-tight text-navy">{s.nom}</p>
              <p className="text-[11.5px] text-slateink">{s.commune}</p>

              <div className="mt-4 flex justify-center">
                <Gauge
                  value={s.remplissage}
                  size={124}
                  stroke={11}
                  color={couleur(s.remplissage)}
                  sublabel="remplissage"
                />
              </div>

              <div className="mt-4 space-y-1.5 border-t border-navy/[0.07] pt-3 text-[11.5px]">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slateink">
                    <TrendingUp size={13} strokeWidth={2.2} /> Capacité libre
                  </span>
                  <span className="font-semibold text-navy">{100 - s.remplissage} %</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slateink">
                    <Clock size={13} strokeWidth={2.2} /> File d’attente
                  </span>
                  <span className="font-semibold text-navy">{s.attente}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slateink">
                    <MapPin size={13} strokeWidth={2.2} /> Distance moyenne
                  </span>
                  <span className="font-semibold text-navy">{s.distance}</span>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
