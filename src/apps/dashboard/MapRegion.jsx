import { useState } from 'react'
import { Radio, ShieldCheck, AlertTriangle, Eye, Factory } from 'lucide-react'
import { Badge, Card, MapCanvas, SectionTitle } from '../../components/ui'
import { stationsCarte, legendeSIG } from '../../data/mockData'

const COULEURS = Object.fromEntries(legendeSIG.map((l) => [l.type, l.couleur]))

const ICONES = {
  conforme: ShieldCheck,
  surveiller: Eye,
  signalement: AlertTriangle,
  station: Factory,
}

const FLUX = [
  { heure: '11h24', texte: 'Dépotage confirmé — station Tivaouane Peulh (8 m³)', type: 'conforme' },
  { heure: '11h08', texte: 'Vidange démarrée — Parcelles Assainies U24', type: 'conforme' },
  { heure: '10h52', texte: 'Signalement citoyen à vérifier — Thiaroye-sur-Mer', type: 'signalement' },
  { heure: '10h40', texte: 'Dépotage confirmé — station Cambérène (6 m³)', type: 'conforme' },
  { heure: '10h21', texte: 'Corridor quitté par le camion DK-2234-AB — Pikine', type: 'signalement' },
  { heure: '09h58', texte: 'Rotation inhabituelle à surveiller — Grand Yoff', type: 'surveiller' },
]

/** Marqueur cliquable/survolable avec infobulle (positions en % du conteneur). */
function Marqueur({ point, actif, onActiver }) {
  const couleur = COULEURS[point.type]
  const pulse = point.type === 'signalement' || point.alerte

  return (
    <button
      onMouseEnter={() => onActiver(point.id)}
      onMouseLeave={() => onActiver(null)}
      onClick={() => onActiver(actif ? null : point.id)}
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${point.x}%`, top: `${point.y}%` }}
    >
      <span className="relative flex items-center justify-center">
        {pulse && (
          <span
            className="absolute h-4 w-4 animate-ping-soft rounded-full"
            style={{ background: couleur }}
          />
        )}
        <span
          className={`relative block rounded-full border-2 border-white shadow transition-transform ${
            actif ? 'scale-125' : ''
          }`}
          style={{
            background: couleur,
            width: point.type === 'station' ? 15 : 13,
            height: point.type === 'station' ? 15 : 13,
          }}
        />
      </span>

      {actif && (
        <span className="absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-xl bg-navy px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-lift">
          {point.libelle}
        </span>
      )}
    </button>
  )
}

export default function MapRegion() {
  const [actif, setActif] = useState(null)

  const compte = (type) => stationsCarte.filter((p) => p.type === type).length

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
      <Card className="xl:col-span-2 !p-6">
        <SectionTitle
          action={
            <Badge tone="teal" icon={Radio}>
              Mise à jour en continu
            </Badge>
          }
        >
          Région de Dakar — activité en direct
        </SectionTitle>

        {/* Légende SIG */}
        <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl bg-cream px-4 py-3">
          {legendeSIG.map((l) => (
            <span key={l.type} className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full border-2 border-white shadow"
                style={{ background: l.couleur }}
              />
              <span className="text-[12px] font-semibold text-navy">{l.label}</span>
            </span>
          ))}
        </div>

        <MapCanvas className="h-[480px] rounded-3xl border border-navy/[0.06]">
          {stationsCarte.map((p) => (
            <Marqueur key={p.id} point={p} actif={actif === p.id} onActiver={setActif} />
          ))}

          {/* Étiquettes de zones */}
          {[
            { nom: 'Dakar Plateau', x: 12, y: 88 },
            { nom: 'Pikine', x: 62, y: 12 },
            { nom: 'Keur Massar', x: 85, y: 62 },
          ].map((z) => (
            <span
              key={z.nom}
              className="absolute -translate-x-1/2 whitespace-nowrap rounded-lg bg-white/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-navy/70 backdrop-blur"
              style={{ left: `${z.x}%`, top: `${z.y}%` }}
            >
              {z.nom}
            </span>
          ))}
        </MapCanvas>

        <p className="mt-3 text-center text-[11.5px] text-slateink">
          Survolez ou cliquez un marqueur pour afficher le détail de la zone.
        </p>
      </Card>

      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          {legendeSIG.map((l) => {
            const Icon = ICONES[l.type]
            return (
              <Card key={l.type} className="!p-4">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
                  style={{ background: l.couleur }}
                >
                  <Icon size={16} strokeWidth={2.3} />
                </span>
                <p className="mt-2.5 text-[22px] font-extrabold leading-none text-navy">
                  {compte(l.type)}
                </p>
                <p className="mt-1 text-[11px] leading-tight text-slateink">{l.label}</p>
              </Card>
            )
          })}
        </div>

        <Card className="!p-6">
          <SectionTitle>Flux d’événements</SectionTitle>
          <div className="relative space-y-4 pl-1">
            {FLUX.map((f, i) => (
              <div key={i} className="relative flex gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ background: COULEURS[f.type] }}
                  />
                  {i < FLUX.length - 1 && <span className="mt-1 w-px flex-1 bg-navy/10" />}
                </div>
                <div className="pb-1">
                  <p className="text-[12.5px] font-medium leading-snug text-navy">{f.texte}</p>
                  <p className="mt-0.5 text-[11px] text-slateink">{f.heure}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
