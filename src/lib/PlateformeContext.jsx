import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import {
  entreprises as entreprisesSeed,
  camions as camionsSeed,
  chauffeurs as chauffeursSeed,
  affectations as affectationsSeed,
  interventionsDepotage as interventionsSeed,
  evaluationsMenage as evaluationsMenageSeed,
  evaluationsStation as evaluationsStationSeed,
} from '../data/flotteEtNotation.js'
import { noteChauffeur, tauxConformite } from './notation.js'

/**
 * État partagé de la plateforme pendant une session de démonstration.
 *
 * Les données de src/data/ servent de graine ; ce qui est saisi dans un espace
 * (une note station côté délégataire, par exemple) est immédiatement visible
 * dans les autres (fiche vidangeur, registre régulateur). Rien n'est persisté :
 * un rechargement de page repart de la graine.
 */
const PlateformeContext = createContext(null)

const idUnique = (prefixe) => `${prefixe}-${Math.random().toString(36).slice(2, 9)}`

export function PlateformeProvider({ children }) {
  const [entreprises] = useState(entreprisesSeed)
  const [camions, setCamions] = useState(camionsSeed)
  const [chauffeurs, setChauffeurs] = useState(chauffeursSeed)
  const [affectations, setAffectations] = useState(affectationsSeed)
  const [interventions] = useState(interventionsSeed)
  const [evaluationsMenage, setEvaluationsMenage] = useState(evaluationsMenageSeed)
  const [evaluationsStation, setEvaluationsStation] = useState(evaluationsStationSeed)

  /* -------------------------------------------------------------- */
  /*  Notation                                                      */
  /* -------------------------------------------------------------- */

  const noterParMenage = useCallback(({ chauffeurId, note, commentaire = '', auteur, quartier }) => {
    setEvaluationsMenage((liste) => [
      {
        id: idUnique('em'),
        chauffeurId,
        auteur,
        quartier,
        note,
        commentaire,
        date: new Date().toISOString().slice(0, 10),
      },
      ...liste,
    ])
  }, [])

  const noterParStation = useCallback(
    ({ interventionId, chauffeurId, stationId, agent, noteService, noteConformite, conforme, commentaire = '' }) => {
      setEvaluationsStation((liste) => [
        {
          id: idUnique('es'),
          interventionId,
          chauffeurId,
          stationId,
          agent,
          noteService,
          noteConformite,
          conforme,
          commentaire,
          date: new Date().toISOString().slice(0, 10),
        },
        ...liste,
      ])
    },
    []
  )

  /** Notes pondérées de tous les chauffeurs, recalculées à chaque évaluation. */
  const notes = useMemo(() => {
    const source = { evaluationsMenage, evaluationsStation }
    return Object.fromEntries(
      chauffeurs.map((c) => [
        c.id,
        {
          ...noteChauffeur(c.id, source),
          tauxConformite: tauxConformite(c.id, evaluationsStation),
        },
      ])
    )
  }, [chauffeurs, evaluationsMenage, evaluationsStation])

  const noteDe = useCallback((chauffeurId) => notes[chauffeurId] ?? noteChauffeur(chauffeurId, {}), [notes])

  /** Interventions de dépotage encore non notées par la station. */
  const interventionsANoter = useMemo(() => {
    const notees = new Set(evaluationsStation.map((e) => e.interventionId))
    return interventions.filter((i) => !notees.has(i.id))
  }, [interventions, evaluationsStation])

  /* -------------------------------------------------------------- */
  /*  Flotte                                                        */
  /* -------------------------------------------------------------- */

  const ajouterCamion = useCallback((camion) => {
    setCamions((liste) => [...liste, { ...camion, id: idUnique('cam') }])
  }, [])

  const retirerCamion = useCallback((camionId) => {
    setCamions((liste) => liste.filter((c) => c.id !== camionId))
    setAffectations((liste) =>
      liste.map((a) =>
        a.camionId === camionId && a.au === null
          ? { ...a, au: new Date().toISOString().slice(0, 10) }
          : a
      )
    )
  }, [])

  const ajouterChauffeur = useCallback((chauffeur) => {
    const id = idUnique('ch')
    setChauffeurs((liste) => [...liste, { ...chauffeur, id }])
    return id
  }, [])

  const retirerChauffeur = useCallback((chauffeurId) => {
    setChauffeurs((liste) =>
      liste.map((c) => (c.id === chauffeurId ? { ...c, statut: 'Retiré' } : c))
    )
    setAffectations((liste) =>
      liste.map((a) =>
        a.chauffeurId === chauffeurId && a.au === null
          ? { ...a, au: new Date().toISOString().slice(0, 10) }
          : a
      )
    )
  }, [])

  /** Affecte un chauffeur à un camion et clôt les affectations ouvertes des deux côtés. */
  const affecter = useCallback((camionId, chauffeurId) => {
    const aujourdhui = new Date().toISOString().slice(0, 10)
    setAffectations((liste) => [
      ...liste.map((a) =>
        a.au === null && (a.camionId === camionId || a.chauffeurId === chauffeurId)
          ? { ...a, au: aujourdhui }
          : a
      ),
      { id: idUnique('aff'), camionId, chauffeurId, du: aujourdhui, au: null },
    ])
  }, [])

  const valeur = useMemo(
    () => ({
      entreprises,
      camions,
      chauffeurs,
      affectations,
      interventions,
      evaluationsMenage,
      evaluationsStation,
      notes,
      noteDe,
      interventionsANoter,
      noterParMenage,
      noterParStation,
      ajouterCamion,
      retirerCamion,
      ajouterChauffeur,
      retirerChauffeur,
      affecter,
    }),
    [
      entreprises,
      camions,
      chauffeurs,
      affectations,
      interventions,
      evaluationsMenage,
      evaluationsStation,
      notes,
      noteDe,
      interventionsANoter,
      noterParMenage,
      noterParStation,
      ajouterCamion,
      retirerCamion,
      ajouterChauffeur,
      retirerChauffeur,
      affecter,
    ]
  )

  return <PlateformeContext.Provider value={valeur}>{children}</PlateformeContext.Provider>
}

export function usePlateforme() {
  const contexte = useContext(PlateformeContext)
  if (!contexte) throw new Error('usePlateforme doit être utilisé dans <PlateformeProvider>')
  return contexte
}
