/**
 * Moteur de notation des vidangeurs — logique métier pure, sans dépendance UI.
 *
 * Note finale d'un chauffeur = 60 % note ménage + 40 % note station,
 * la part station étant elle-même partagée entre deux critères distincts :
 * la qualité du service rendu à la station et la conformité du dépotage.
 *
 * Les notes ménage et station restent stockées séparément (voir mockData.js) :
 * ce module ne fait que les agréger, jamais les écraser.
 */

export const PONDERATION = {
  menage: 0.6,
  service: 0.2,
  conformite: 0.2,
}

export const NOTE_MIN = 1
export const NOTE_MAX = 5

const arrondi = (valeur, decimales = 2) => {
  const facteur = 10 ** decimales
  return Math.round(valeur * facteur) / facteur
}

/** Moyenne arithmétique, ou null si aucune valeur. */
export const moyenne = (valeurs = []) =>
  valeurs.length === 0 ? null : valeurs.reduce((somme, v) => somme + v, 0) / valeurs.length

/**
 * Agrège les notes d'un chauffeur en une note globale pondérée.
 *
 * Une catégorie sans aucune note est exclue du calcul et son poids est
 * redistribué au prorata sur les catégories disponibles : un chauffeur noté
 * uniquement par des ménages garde une note lisible, sans être pénalisé par
 * l'absence de note station.
 *
 * @returns {{
 *   globale: number|null, menage: number|null, station: number|null,
 *   service: number|null, conformite: number|null,
 *   nbMenage: number, nbStation: number, poids: Record<string, number>
 * }}
 */
export const noteGlobale = ({ notesMenage = [], notesService = [], notesConformite = [] } = {}) => {
  const composantes = [
    { cle: 'menage', poids: PONDERATION.menage, valeur: moyenne(notesMenage) },
    { cle: 'service', poids: PONDERATION.service, valeur: moyenne(notesService) },
    { cle: 'conformite', poids: PONDERATION.conformite, valeur: moyenne(notesConformite) },
  ]

  const disponibles = composantes.filter((c) => c.valeur !== null)
  const poidsTotal = disponibles.reduce((somme, c) => somme + c.poids, 0)

  const globale =
    poidsTotal === 0
      ? null
      : disponibles.reduce((somme, c) => somme + c.valeur * (c.poids / poidsTotal), 0)

  const service = moyenne(notesService)
  const conformite = moyenne(notesConformite)
  const notesStation = [service, conformite].filter((v) => v !== null)

  return {
    globale: globale === null ? null : arrondi(globale),
    menage: moyenne(notesMenage) === null ? null : arrondi(moyenne(notesMenage)),
    station: notesStation.length === 0 ? null : arrondi(moyenne(notesStation)),
    service: service === null ? null : arrondi(service),
    conformite: conformite === null ? null : arrondi(conformite),
    nbMenage: notesMenage.length,
    nbStation: notesService.length,
    poids: Object.fromEntries(
      disponibles.map((c) => [c.cle, poidsTotal === 0 ? 0 : arrondi(c.poids / poidsTotal, 4)])
    ),
  }
}

/**
 * Note d'un chauffeur calculée à partir des évaluations brutes de la plateforme.
 * Les deux jeux d'évaluations sont conservés distincts en amont : on ne recalcule
 * jamais à partir d'une note déjà pondérée.
 */
export const noteChauffeur = (chauffeurId, { evaluationsMenage = [], evaluationsStation = [] }) => {
  const duMenage = evaluationsMenage.filter((e) => e.chauffeurId === chauffeurId)
  const deLaStation = evaluationsStation.filter((e) => e.chauffeurId === chauffeurId)

  return noteGlobale({
    notesMenage: duMenage.map((e) => e.note),
    notesService: deLaStation.map((e) => e.noteService),
    notesConformite: deLaStation.map((e) => e.noteConformite),
  })
}

/** Taux de dépotages jugés conformes par les stations, en pourcentage entier. */
export const tauxConformite = (chauffeurId, evaluationsStation = []) => {
  const siennes = evaluationsStation.filter((e) => e.chauffeurId === chauffeurId)
  if (siennes.length === 0) return null
  return Math.round((siennes.filter((e) => e.conforme).length / siennes.length) * 100)
}

/** Formatage FR d'une note ("4,25" ; "—" si non notée). */
export const formatNote = (valeur, decimales = 1) =>
  valeur === null || valeur === undefined
    ? '—'
    : valeur.toFixed(decimales).replace('.', ',')
