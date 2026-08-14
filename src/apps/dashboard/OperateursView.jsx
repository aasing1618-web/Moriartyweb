import { useState } from 'react'
import { Search, BadgeCheck, Clock3, Star, Download } from 'lucide-react'
import { Avatar, Badge, Card, ProgressBar, SectionTitle } from '../../components/ui'
import { operateursFormalises } from '../../data/mockData'

const FILTRES = ['Tous', 'Formel', 'En formalisation']

export default function OperateursView() {
  const [filtre, setFiltre] = useState('Tous')

  const liste =
    filtre === 'Tous'
      ? operateursFormalises
      : operateursFormalises.filter((o) => o.statut === filtre)

  const formels = operateursFormalises.filter((o) => o.statut === 'Formel').length

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {[
          { label: 'Opérateurs actifs', valeur: '156', detail: '+34 cette année' },
          { label: 'Entièrement formalisés', valeur: '98', detail: '63 % du parc' },
          { label: 'En cours de formalisation', valeur: '58', detail: 'accompagnement en cours' },
        ].map((s) => (
          <Card key={s.label} className="!p-6">
            <p className="text-[12px] font-medium uppercase tracking-wide text-slateink">
              {s.label}
            </p>
            <p className="mt-2 text-[28px] font-extrabold leading-none text-navy">{s.valeur}</p>
            <p className="mt-2 text-[12px] text-teal">{s.detail}</p>
          </Card>
        ))}
      </div>

      <Card className="!p-6">
        <SectionTitle
          action={
            <button className="flex items-center gap-2 rounded-xl bg-navy-50 px-3 py-2 text-[12px] font-semibold text-navy transition hover:bg-navy-100">
              <Download size={14} strokeWidth={2.3} />
              Exporter la liste
            </button>
          }
        >
          Registre des opérateurs · {formels} formalisés sur {operateursFormalises.length} affichés
        </SectionTitle>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="flex flex-1 items-center gap-2.5 rounded-2xl border border-navy/[0.08] bg-cream px-3.5 py-2.5">
            <Search size={16} className="text-slateink" strokeWidth={2.2} />
            <input
              placeholder="Rechercher un opérateur, une commune…"
              className="min-w-0 flex-1 bg-transparent text-[13px] text-navy outline-none placeholder:text-slateink/70"
            />
          </div>
          <div className="flex gap-2">
            {FILTRES.map((f) => (
              <button
                key={f}
                onClick={() => setFiltre(f)}
                className={`rounded-xl px-3.5 py-2 text-[12.5px] font-semibold transition ${
                  f === filtre
                    ? 'bg-navy text-white shadow-lift'
                    : 'bg-cream text-slateink hover:text-navy'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse">
            <thead>
              <tr className="border-b border-navy/[0.08] text-left">
                {['Opérateur', 'Commune', 'Statut', 'Note', 'Vidanges', 'Conformité'].map((h) => (
                  <th
                    key={h}
                    className="pb-3 text-[11px] font-bold uppercase tracking-wide text-slateink"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {liste.map((o) => (
                <tr
                  key={o.id}
                  className="border-b border-navy/[0.05] transition hover:bg-cream/70 last:border-0"
                >
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-3">
                      <Avatar initiales={o.initiales} color="soft" size="sm" />
                      <div className="min-w-0">
                        <p className="truncate text-[13.5px] font-semibold text-navy">{o.nom}</p>
                        <p className="truncate text-[11.5px] text-slateink">{o.entreprise}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 pr-4 text-[13px] text-slateink">{o.commune}</td>
                  <td className="py-3.5 pr-4">
                    {o.statut === 'Formel' ? (
                      <Badge tone="success" icon={BadgeCheck} size="sm">
                        Formel
                      </Badge>
                    ) : (
                      <Badge tone="warning" icon={Clock3} size="sm">
                        En formalisation
                      </Badge>
                    )}
                  </td>
                  <td className="py-3.5 pr-4">
                    <span className="flex items-center gap-1.5 text-[13px] font-semibold text-navy">
                      <Star size={14} className="fill-amber text-amber" />
                      {String(o.note).replace('.', ',')}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 text-[13px] font-semibold text-navy">{o.vidanges}</td>
                  <td className="py-3.5 pr-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-24">
                        <ProgressBar
                          value={o.conformite}
                          height={6}
                          color={o.conformite >= 90 ? '#1E9E63' : o.conformite >= 80 ? '#E0A200' : '#D64545'}
                        />
                      </div>
                      <span className="text-[12.5px] font-semibold text-navy">{o.conformite} %</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
