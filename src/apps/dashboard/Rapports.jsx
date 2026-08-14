import { useState } from 'react'
import { FileText, FileSpreadsheet, Check, CalendarRange, MapPin, ChevronDown } from 'lucide-react'
import { Badge, Button, Card, SectionTitle } from '../../components/ui'
import { periodesRapport, communesRapport, modelesRapport } from '../../data/mockData'

function Select({ icon: Icon, label, valeur, options, onChange }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11.5px] font-semibold uppercase tracking-wide text-slateink">
        {label}
      </span>
      <div className="relative flex items-center gap-2.5 rounded-2xl border border-navy/[0.08] bg-white px-3.5 py-2.5 shadow-card">
        <Icon size={16} className="shrink-0 text-teal" strokeWidth={2.2} />
        <select
          value={valeur}
          onChange={(e) => onChange(e.target.value)}
          className="min-w-0 flex-1 appearance-none bg-transparent text-[13.5px] font-semibold text-navy outline-none"
        >
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <ChevronDown size={16} className="shrink-0 text-slateink" />
      </div>
    </label>
  )
}

export default function Rapports() {
  const [periode, setPeriode] = useState(periodesRapport[2])
  const [commune, setCommune] = useState(communesRapport[0])
  const [modele, setModele] = useState(modelesRapport[0].id)
  const [confirmation, setConfirmation] = useState(null)

  // Export simulé : aucune génération de fichier réelle.
  const exporter = (format) => {
    setConfirmation(format)
    setTimeout(() => setConfirmation(null), 2600)
  }

  return (
    <div className="relative space-y-5">
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="!p-6 xl:col-span-2">
          <SectionTitle>Générer un rapport</SectionTitle>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Select
              icon={CalendarRange}
              label="Période"
              valeur={periode}
              options={periodesRapport}
              onChange={setPeriode}
            />
            <Select
              icon={MapPin}
              label="Commune"
              valeur={commune}
              options={communesRapport}
              onChange={setCommune}
            />
          </div>

          <p className="mb-2.5 mt-6 text-[11.5px] font-semibold uppercase tracking-wide text-slateink">
            Modèle de rapport
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {modelesRapport.map((m) => (
              <Card
                key={m.id}
                active={m.id === modele}
                onClick={() => setModele(m.id)}
                className="!p-4"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-navy-50 text-navy">
                    <FileText size={18} strokeWidth={2.2} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13.5px] font-bold leading-tight text-navy">{m.titre}</p>
                    <p className="mt-1 text-[11.5px] leading-snug text-slateink">{m.detail}</p>
                    <p className="mt-1.5 text-[11px] font-semibold text-teal">
                      ~{m.pages} pages
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-navy/[0.07] pt-5">
            <Button size="lg" icon={FileText} onClick={() => exporter('PDF')}>
              Exporter en PDF
            </Button>
            <Button size="lg" variant="outline" icon={FileSpreadsheet} onClick={() => exporter('CSV')}>
              Exporter en CSV
            </Button>
            <p className="text-[11.5px] text-slateink">
              Périmètre : {commune} · {periode}
            </p>
          </div>
        </Card>

        <div className="space-y-5">
          <Card className="!p-6">
            <SectionTitle>Aperçu du périmètre</SectionTitle>
            <div className="space-y-3">
              {[
                ['Vidanges incluses', '12 400'],
                ['Dépotages conformes', '10 788'],
                ['Opérateurs concernés', '156'],
                ['Stations couvertes', '5'],
              ].map(([label, valeur]) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-[12.5px] text-slateink">{label}</span>
                  <span className="text-[14px] font-bold text-navy">{valeur}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl bg-teal/[0.07] p-3.5">
              <p className="text-[11.5px] leading-relaxed text-slateink">
                Les rapports sont alignés sur le format de restitution attendu par l’ONAS et les
                bailleurs (indicateur ODD 6.3).
              </p>
            </div>
          </Card>

          <Card className="!p-6">
            <SectionTitle>Derniers exports</SectionTitle>
            <div className="space-y-3">
              {[
                ['Conformité des dépotages', '02 août 2026 · PDF'],
                ['Registre opérateurs', '28 juillet 2026 · CSV'],
                ['Indicateurs bailleurs', '15 juillet 2026 · PDF'],
              ].map(([titre, meta]) => (
                <div key={titre} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy">
                    <FileText size={15} strokeWidth={2.2} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12.5px] font-semibold text-navy">{titre}</p>
                    <p className="text-[11px] text-slateink">{meta}</p>
                  </div>
                  <Badge tone="neutral" size="sm">
                    Archivé
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {confirmation && (
        <div className="fixed bottom-8 right-8 z-50 flex animate-fade-up items-center gap-3 rounded-2xl bg-navy px-5 py-4 text-white shadow-phone">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-success">
            <Check size={18} strokeWidth={3} />
          </span>
          <div>
            <p className="text-[13.5px] font-bold">Export {confirmation} généré</p>
            <p className="text-[11.5px] text-white/70">
              {commune} · {periode}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
