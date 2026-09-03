import { describe, it, expect } from 'vitest'
import {
  PONDERATION,
  moyenne,
  noteGlobale,
  noteChauffeur,
  tauxConformite,
  formatNote,
} from './notation.js'

describe('pondération 60 / 20 / 20', () => {
  it('somme les trois poids à 100 %', () => {
    const total = PONDERATION.menage + PONDERATION.service + PONDERATION.conformite
    expect(total).toBeCloseTo(1, 10)
  })

  it('applique 60 % ménage + 20 % service + 20 % conformité', () => {
    // 5 × 0,6 + 3 × 0,2 + 3 × 0,2 = 4,2
    const r = noteGlobale({ notesMenage: [5, 5], notesService: [3], notesConformite: [3] })
    expect(r.globale).toBe(4.2)
    expect(r.menage).toBe(5)
    expect(r.station).toBe(3)
  })

  it('distingue la qualité de service de la conformité du dépotage', () => {
    // 4 × 0,6 + 5 × 0,2 + 1 × 0,2 = 3,6
    const r = noteGlobale({ notesMenage: [4], notesService: [5], notesConformite: [1] })
    expect(r.service).toBe(5)
    expect(r.conformite).toBe(1)
    expect(r.globale).toBe(3.6)

    // Les mêmes valeurs inversées donnent la même globale mais un détail différent
    const inverse = noteGlobale({ notesMenage: [4], notesService: [1], notesConformite: [5] })
    expect(inverse.globale).toBe(3.6)
    expect(inverse.service).toBe(1)
    expect(inverse.conformite).toBe(5)
  })

  it('moyenne les notes multiples de chaque catégorie', () => {
    // ménage (4+5)/2 = 4,5 ; service (3+5)/2 = 4 ; conformité (4+4)/2 = 4
    // 4,5 × 0,6 + 4 × 0,2 + 4 × 0,2 = 4,3
    const r = noteGlobale({
      notesMenage: [4, 5],
      notesService: [3, 5],
      notesConformite: [4, 4],
    })
    expect(r.globale).toBe(4.3)
    expect(r.nbMenage).toBe(2)
    expect(r.nbStation).toBe(2)
  })
})

describe('catégories manquantes', () => {
  it('rend la moyenne ménage quand aucune station n’a noté', () => {
    const r = noteGlobale({ notesMenage: [4, 5] })
    expect(r.globale).toBe(4.5)
    expect(r.station).toBeNull()
    expect(r.poids.menage).toBe(1)
  })

  it('rend la moyenne station quand aucun ménage n’a noté', () => {
    const r = noteGlobale({ notesService: [4], notesConformite: [2] })
    expect(r.globale).toBe(3)
    expect(r.menage).toBeNull()
    expect(r.poids.service).toBe(0.5)
    expect(r.poids.conformite).toBe(0.5)
  })

  it('rend null sans aucune note', () => {
    expect(noteGlobale({}).globale).toBeNull()
    expect(noteGlobale().globale).toBeNull()
  })

  it('moyenne une liste vide à null', () => {
    expect(moyenne([])).toBeNull()
    expect(moyenne([2, 4])).toBe(3)
  })
})

describe('agrégation depuis les évaluations brutes', () => {
  const evaluations = {
    evaluationsMenage: [
      { chauffeurId: 'ch-1', note: 5 },
      { chauffeurId: 'ch-1', note: 4 },
      { chauffeurId: 'ch-2', note: 2 },
    ],
    evaluationsStation: [
      { chauffeurId: 'ch-1', noteService: 4, noteConformite: 5, conforme: true },
      { chauffeurId: 'ch-2', noteService: 3, noteConformite: 1, conforme: false },
      { chauffeurId: 'ch-2', noteService: 3, noteConformite: 3, conforme: true },
    ],
  }

  it('n’agrège que les évaluations du chauffeur visé', () => {
    // ménage (5+4)/2 = 4,5 → 4,5 × 0,6 + 4 × 0,2 + 5 × 0,2 = 4,5
    const r = noteChauffeur('ch-1', evaluations)
    expect(r.globale).toBe(4.5)
    expect(r.nbMenage).toBe(2)
    expect(r.nbStation).toBe(1)
  })

  it('conserve les deux notes séparément', () => {
    const r = noteChauffeur('ch-2', evaluations)
    expect(r.menage).toBe(2)
    expect(r.service).toBe(3)
    expect(r.conformite).toBe(2)
    // 2 × 0,6 + 3 × 0,2 + 2 × 0,2 = 2,2
    expect(r.globale).toBe(2.2)
  })

  it('rend une note nulle pour un chauffeur jamais noté', () => {
    expect(noteChauffeur('ch-inconnu', evaluations).globale).toBeNull()
  })

  it('calcule le taux de conformité des dépotages', () => {
    expect(tauxConformite('ch-1', evaluations.evaluationsStation)).toBe(100)
    expect(tauxConformite('ch-2', evaluations.evaluationsStation)).toBe(50)
    expect(tauxConformite('ch-inconnu', evaluations.evaluationsStation)).toBeNull()
  })
})

describe('formatage', () => {
  it('affiche la note à la française', () => {
    expect(formatNote(4.25)).toBe('4,3')
    expect(formatNote(4.25, 2)).toBe('4,25')
    expect(formatNote(null)).toBe('—')
  })
})
