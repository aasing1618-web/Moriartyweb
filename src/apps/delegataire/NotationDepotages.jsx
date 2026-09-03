import { useState } from 'react'
import {
  Star,
  Truck,
  Clock,
  Droplets,
  Check,
  X,
  ShieldCheck,
  ShieldAlert,
  History,
  Info,
} from 'lucide-react'
import { Avatar, Badge, Button, Card, SectionTitle } from '../../components/ui'
import { usePlateforme } from '../../lib/PlateformeContext.jsx'
import { formatNote, PONDERATION } from '../../lib/notation.js'
import { chauffeurParId, camionParId } from '../../data/flotteEtNotation.js'

const AGENT = 'Agent potence 1 — Delvic'

/** Sélecteur d'étoiles 1 → 5. */
function NoteEtoiles({ valeur, onChange, label, aide }) {
  return (
    <div>
      <p className="text-[12.5px] font-bold text-navy">{label}</p>
      <p className="mt-0.5 text-[11.5px] leading-snug text-slateink">{aide}</p>
      <div className="mt-2 flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <button key={i} onClick={() => onChange(i)} className="transition hover:scale-110">
            <Star
              size={26}
              className={i <= valeur ? 'fill-amber text-amber' : 'fill-navy/10 text-navy/20'}
            />
          </button>
        ))}
        <span className="ml-2 text-[13px] font-bold text-navy">{valeur} / 5</span>
      </div>
    </div>
  )
}

function FormulaireNotation({ intervention, onAnnuler }) {
  const { noterParStation } = usePlateforme()
  const [noteService, setNoteService] = useState(4)
  const [noteConformite, setNoteConformite] = useState(5)
  const [conforme, setConforme] = useState(true)
  const [commentaire, setCommentaire] = useState('')

  const chauffeur = chauffeurParId(intervention.chauffeurId)
  const camion = camionParId(intervention.camionId)

  const valider = () => {
    noterParStation({
      interventionId: intervention.id,
      chauffeurId: intervention.chauffeurId,
      stationId: intervention.stationId,
      agent: AGENT,
      noteService,
      noteConformite,
      conforme,
      commentaire,
    })
    onAnnuler()
  }

  return (
    <div className="rounded-2xl border border-teal/30 bg-teal/[0.05] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar initiales={chauffeur.initiales} color="navy" />
          <div>
            <p className="text-[14px] font-bold text-navy">{chauffeur.nom}</p>
            <p className="text-[11.5px] text-slateink">
              {camion.immatriculation} · {intervention.date} à {intervention.heure} ·{' '}
              {intervention.volume} m³ · bordereau {intervention.bordereau}
            </p>
          </div>
        </div>
        <Badge tone="neutral">{AGENT}</Badge>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
        <NoteEtoiles
          label="Qualité du service"
          aide="Ponctualité, manœuvre à la potence, propreté, respect des consignes."
          valeur={noteService}
          onChange={setNoteService}
        />
        <NoteEtoiles
          label="Conformité du dépotage"
          aide="Volume déclaré = volume dépoté, absence de déchets solides, bordereau en règle."
          valeur={noteConformite}
          onChange={setNoteConformite}
        />
      </div>

      <div className="mt-5">
        <p className="text-[12.5px] font-bold text-navy">Dépotage jugé conforme ?</p>
        <div className="mt-2 flex gap-2">
          <button
            onClick={() => setConforme(true)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-[12.5px] font-semibold transition ${
              conforme ? 'bg-success text-white shadow-lift' : 'bg-white text-slateink shadow-card'
            }`}
          >
            <ShieldCheck size={15} strokeWidth={2.3} />
            Conforme
          </button>
          <button
            onClick={() => setConforme(false)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-[12.5px] font-semibold transition ${
              !conforme ? 'bg-danger text-white shadow-lift' : 'bg-white text-slateink shadow-card'
            }`}
          >
            <ShieldAlert size={15} strokeWidth={2.3} />
            Non conforme
          </button>
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-1.5 text-[12.5px] font-bold text-navy">Observation (facultatif)</p>
        <textarea
          rows={2}
          value={commentaire}
          onChange={(e) => setCommentaire(e.target.value)}
          placeholder="Ex : écart de volume constaté, déchets solides dans la cuve…"
          className="w-full resize-none rounded-2xl border border-navy/10 bg-white px-4 py-3 text-[13px] text-navy shadow-card outline-none transition placeholder:text-slateink/70 focus:border-teal"
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button icon={Check} onClick={valider}>
          Enregistrer la note station
        </Button>
        <Button variant="outline" icon={X} onClick={onAnnuler}>
          Annuler
        </Button>
        <p className="text-[11.5px] text-slateink">
          Comptera pour {Math.round((PONDERATION.service + PONDERATION.conformite) * 100)} % de la
          note finale du chauffeur.
        </p>
      </div>
    </div>
  )
}

export default function NotationDepotages() {
  const { interventions, interventionsANoter, evaluationsStation, noteDe } = usePlateforme()
  const [enCours, setEnCours] = useState(null)

  const notees = evaluationsStation
    .map((e) => ({ evaluation: e, intervention: interventions.find((i) => i.id === e.interventionId) }))
    .filter((x) => x.intervention)

  return (
    <div className="space-y-6">
      <Card className="!p-6">
        <SectionTitle
          action={
            <Badge tone="warning" icon={Clock}>
              {interventionsANoter.length} dépotage{interventionsANoter.length > 1 ? 's' : ''} à
              noter
            </Badge>
          }
        >
          Dépotages en attente de notation
        </SectionTitle>

        <div className="flex items-start gap-2.5 rounded-2xl bg-navy-50 p-4">
          <Info size={16} className="mt-0.5 shrink-0 text-navy" strokeWidth={2.2} />
          <p className="text-[12px] leading-relaxed text-slateink">
            La station note chaque dépotage sur deux critères distincts : la{' '}
            <span className="font-semibold text-navy">qualité du service</span> et la{' '}
            <span className="font-semibold text-navy">conformité du dépotage</span>. Chacun pèse{' '}
            {Math.round(PONDERATION.service * 100)} % dans la note finale du chauffeur, les{' '}
            {Math.round(PONDERATION.menage * 100)} % restants venant des ménages.
          </p>
        </div>

        <div className="mt-4 space-y-3">
          {interventionsANoter.length === 0 && (
            <p className="rounded-2xl bg-cream p-5 text-center text-[13px] text-slateink">
              Tous les dépotages enregistrés ont été notés.
            </p>
          )}

          {interventionsANoter.map((i) => {
            const chauffeur = chauffeurParId(i.chauffeurId)
            const camion = camionParId(i.camionId)
            const note = noteDe(i.chauffeurId)

            if (enCours === i.id) {
              return <FormulaireNotation key={i.id} intervention={i} onAnnuler={() => setEnCours(null)} />
            }

            return (
              <div
                key={i.id}
                className="flex flex-col gap-4 rounded-2xl border border-navy/[0.07] bg-cream p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar initiales={chauffeur.initiales} color="soft" />
                  <div className="min-w-0">
                    <p className="truncate text-[13.5px] font-bold text-navy">
                      {chauffeur.nom}
                      <span className="ml-2 font-medium text-slateink">
                        {camion.immatriculation}
                      </span>
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11.5px] text-slateink">
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} strokeWidth={2.3} /> {i.date} à {i.heure}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Droplets size={12} strokeWidth={2.3} /> {i.volume} m³
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Truck size={12} strokeWidth={2.3} /> {i.bordereau}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <div className="text-right">
                    <p className="text-[10.5px] text-slateink">Note actuelle</p>
                    <p className="text-[14px] font-extrabold text-navy">
                      {formatNote(note.globale)} / 5
                    </p>
                  </div>
                  <Button size="sm" icon={Star} onClick={() => setEnCours(i.id)}>
                    Noter
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      <Card className="!p-6">
        <SectionTitle
          action={
            <Badge tone="neutral" icon={History}>
              Historique conservé note par note
            </Badge>
          }
        >
          Notes station déjà émises
        </SectionTitle>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse">
            <thead>
              <tr className="border-b border-navy/[0.08] text-left">
                {['Chauffeur', 'Dépotage', 'Service', 'Conformité', 'Verdict', 'Observation'].map(
                  (h) => (
                    <th
                      key={h}
                      className="pb-3 text-[11px] font-bold uppercase tracking-wide text-slateink"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {notees.map(({ evaluation: e, intervention: i }) => {
                const chauffeur = chauffeurParId(e.chauffeurId)
                return (
                  <tr key={e.id} className="border-b border-navy/[0.05] last:border-0">
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-2.5">
                        <Avatar initiales={chauffeur.initiales} color="soft" size="sm" />
                        <span className="text-[13px] font-semibold text-navy">{chauffeur.nom}</span>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4 text-[12.5px] text-slateink">
                      {i.date} · {i.heure} · {i.volume} m³
                    </td>
                    <td className="py-3.5 pr-4 text-[13px] font-bold text-navy">
                      {formatNote(e.noteService)}
                    </td>
                    <td className="py-3.5 pr-4 text-[13px] font-bold text-navy">
                      {formatNote(e.noteConformite)}
                    </td>
                    <td className="py-3.5 pr-4">
                      <Badge tone={e.conforme ? 'success' : 'danger'} size="sm">
                        {e.conforme ? 'Conforme' : 'Non conforme'}
                      </Badge>
                    </td>
                    <td className="max-w-[260px] py-3.5 pr-2 text-[12px] text-slateink">
                      {e.commentaire || '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
