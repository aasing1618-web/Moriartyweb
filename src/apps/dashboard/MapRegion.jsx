import { Radio, Truck, ShieldCheck, AlertTriangle } from 'lucide-react'
import { Badge, Card, MapCanvas, MapDot, SectionTitle } from '../../components/ui'
import { marqueursCarte, legendeCarte } from '../../data/mockData'

const COULEURS = {
  encours: '#1D4ED8',
  conforme: '#1E9E63',
  alerte: '#D64545',
}

const FLUX = [
  { heure: '11h24', texte: 'Dépotage confirmé — station Tivaouane Peulh (8 m³)', type: 'conforme' },
  { heure: '11h08', texte: 'Vidange démarrée — Parcelles Assainies U24', type: 'encours' },
  { heure: '10h52', texte: 'Alerte : dépotage non tracé signalé à Malika', type: 'alerte' },
  { heure: '10h40', texte: 'Dépotage confirmé — station Cambérène (6 m³)', type: 'conforme' },
  { heure: '10h21', texte: 'Vidange démarrée — Grand Yoff', type: 'encours' },
  { heure: '09h58', texte: 'Dépotage confirmé — station Rufisque (10 m³)', type: 'conforme' },
]

const ICONES = { conforme: ShieldCheck, encours: Truck, alerte: AlertTriangle }

export default function MapRegion() {
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

        <MapCanvas className="h-[520px] rounded-3xl border border-navy/[0.06]">
          {marqueursCarte.map((m) => (
            <MapDot
              key={m.id}
              x={m.x}
              y={m.y}
              color={COULEURS[m.type]}
              pulse={m.type !== 'conforme'}
              size={m.type === 'alerte' ? 14 : 12}
              title={m.label}
            />
          ))}

          {/* Étiquettes de zones */}
          {[
            { nom: 'Dakar Plateau', x: 12, y: 78 },
            { nom: 'Parcelles Assainies', x: 40, y: 26 },
            { nom: 'Pikine', x: 62, y: 18 },
            { nom: 'Keur Massar', x: 76, y: 68 },
            { nom: 'Rufisque', x: 88, y: 46 },
          ].map((z) => (
            <span
              key={z.nom}
              className="absolute -translate-x-1/2 whitespace-nowrap rounded-lg bg-white/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-navy/70 backdrop-blur"
              style={{ left: `${z.x}%`, top: `${z.y}%` }}
            >
              {z.nom}
            </span>
          ))}

          {/* Légende */}
          <div className="absolute bottom-4 left-4 rounded-2xl border border-navy/[0.06] bg-white/95 p-4 shadow-card backdrop-blur">
            <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wide text-slateink">
              Légende
            </p>
            <div className="space-y-2">
              {legendeCarte.map((l) => (
                <div key={l.type} className="flex items-center gap-2.5">
                  <span
                    className="h-3 w-3 rounded-full border-2 border-white shadow"
                    style={{ background: l.couleur }}
                  />
                  <span className="text-[12px] font-medium text-navy">{l.label}</span>
                  <span className="ml-auto pl-4 text-[12px] font-bold text-navy">{l.valeur}</span>
                </div>
              ))}
            </div>
          </div>
        </MapCanvas>
      </Card>

      <div className="space-y-5">
        <div className="grid grid-cols-3 gap-3">
          {legendeCarte.map((l) => (
            <Card key={l.type} className="!p-4 text-center">
              <span
                className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl text-white"
                style={{ background: l.couleur }}
              >
                {(() => {
                  const Icon = ICONES[l.type]
                  return <Icon size={16} strokeWidth={2.3} />
                })()}
              </span>
              <p className="mt-2 text-[20px] font-extrabold leading-none text-navy">{l.valeur}</p>
              <p className="mt-1 text-[10.5px] leading-tight text-slateink">{l.label}</p>
            </Card>
          ))}
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
