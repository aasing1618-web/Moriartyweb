import { useState } from 'react'
import { Sparkles, Navigation, Clock, AlertTriangle, ArrowRight, Factory } from 'lucide-react'
import { Badge, Button, Card, ProgressBar, ScreenBody, ScreenFooter, ScreenHeader } from '../../components/ui'
import { stations, stationRecommandee, fcfa } from '../../data/mockData'

const couleurCharge = (r) => (r >= 90 ? '#D64545' : r >= 80 ? '#E0A200' : '#1E9E63')

export default function Stations({ go }) {
  const [choisie, setChoisie] = useState(stationRecommandee.id)
  const autres = stations.filter((s) => !s.recommandee)

  return (
    <>
      <ScreenHeader
        title="Où dépoter ?"
        subtitle="Orientation automatique AssainiTrack"
        onBack={() => go('collecte')}
      />

      <ScreenBody>
        {/* Station recommandée */}
        <Card
          active={choisie === stationRecommandee.id}
          onClick={() => setChoisie(stationRecommandee.id)}
          className="border-teal/20 bg-gradient-to-br from-teal/[0.08] to-white"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal text-white">
              <Sparkles size={15} strokeWidth={2.3} />
            </span>
            <p className="text-[12.5px] font-bold text-navy">Station recommandée</p>
            <Badge tone="teal" size="sm" className="ml-auto">
              Moins chargée
            </Badge>
          </div>

          <p className="mt-3 text-[20px] font-extrabold leading-tight text-navy">
            {stationRecommandee.nom}
          </p>
          <p className="text-[11.5px] text-slateink">{stationRecommandee.commune}</p>

          <div className="mt-3">
            <div className="mb-1.5 flex items-center justify-between text-[11.5px]">
              <span className="font-semibold text-navy">
                {stationRecommandee.remplissage} % occupée
              </span>
              <span className="font-bold text-success">
                {100 - stationRecommandee.remplissage} % de capacité disponible
              </span>
            </div>
            <ProgressBar
              value={stationRecommandee.remplissage}
              color={couleurCharge(stationRecommandee.remplissage)}
            />
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 border-t border-navy/[0.07] pt-3 text-center">
            <div>
              <p className="text-[10.5px] text-slateink">Distance</p>
              <p className="text-[12.5px] font-bold text-navy">{stationRecommandee.distance}</p>
            </div>
            <div>
              <p className="text-[10.5px] text-slateink">Trajet</p>
              <p className="text-[12.5px] font-bold text-navy">{stationRecommandee.trajet}</p>
            </div>
            <div>
              <p className="text-[10.5px] text-slateink">Attente</p>
              <p className="text-[12.5px] font-bold text-navy">
                {stationRecommandee.attente.replace(' de file', '')}
              </p>
            </div>
          </div>
        </Card>

        <p className="mb-2 mt-5 text-[12px] font-semibold uppercase tracking-wide text-slateink">
          Autres stations
        </p>
        <div className="space-y-2.5">
          {autres.map((s) => {
            const saturee = s.statut === 'saturee'
            return (
              <Card
                key={s.id}
                active={choisie === s.id}
                onClick={() => setChoisie(s.id)}
                className={`!p-3.5 ${saturee ? 'border-danger/30 bg-danger/[0.04]' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
                      saturee ? 'bg-danger/10 text-danger' : 'bg-navy-50 text-navy'
                    }`}
                  >
                    {saturee ? (
                      <AlertTriangle size={18} strokeWidth={2.2} />
                    ) : (
                      <Factory size={18} strokeWidth={2.2} />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-[13.5px] font-bold text-navy">{s.nom}</p>
                      <p
                        className="shrink-0 text-[13px] font-extrabold"
                        style={{ color: couleurCharge(s.remplissage) }}
                      >
                        {s.remplissage} %
                      </p>
                    </div>
                    <p className="truncate text-[11px] text-slateink">
                      {saturee ? 'Quasi saturée — dépotage déconseillé' : `${100 - s.remplissage} % disponible`}
                    </p>
                    <div className="mt-2">
                      <ProgressBar value={s.remplissage} color={couleurCharge(s.remplissage)} height={6} />
                    </div>
                    <div className="mt-2 flex items-center gap-3 text-[10.5px] text-slateink">
                      <span className="flex items-center gap-1">
                        <Navigation size={11} strokeWidth={2.3} /> {s.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} strokeWidth={2.3} /> {s.attente}
                      </span>
                      <span className="ml-auto font-semibold text-navy">{fcfa(s.tarif)}</span>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <p className="mt-4 text-center text-[11px] leading-relaxed text-slateink">
          Le dépotage sauvage expose à des sanctions. Chaque dépotage tracé alimente votre score de
          conformité.
        </p>
      </ScreenBody>

      <ScreenFooter>
        <Button size="lg" block iconRight={ArrowRight} onClick={() => go('scan')}>
          Aller à la station
        </Button>
      </ScreenFooter>
    </>
  )
}
