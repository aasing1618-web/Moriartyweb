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
import {
  grilleTarifaireTerrainDefaut,
  calculerPrixEstimatifTerrain,
  capteursFosses as capteursSeed,
  demandesProximite as demandesSeed,
  STATUTS_OFFICIELS,
} from '../data/mockData.js'
import { noteChauffeur, tauxConformite } from './notation.js'

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

  // Nouveaux états réactifs
  const [grilleTarifaire, setGrilleTarifaire] = useState(grilleTarifaireTerrainDefaut)
  const [capteurs, setCapteurs] = useState(capteursSeed)
  const [commandes, setCommandes] = useState(() =>
    demandesSeed.map((d) => ({
      ...d,
      statutCode: d.statutCode || 4, // PAIEMENT_VALIDE par défaut pour la démo
      statutId: d.statutId || 'PAIEMENT_VALIDE',
      statutPaiement: d.statutPaiement || 'VALIDE',
      codeMarchand: d.codeMarchand || 'WAVE-NDIAYE-883',
      prixEstimatif: d.prix,
      prixConfirme: d.prix,
      prioritaire: d.urgence === 'Urgent' || d.statutAlert === 'critique',
    }))
  )

  /* -------------------------------------------------------------- */
  /*  Gestion Tarification & Capteurs                               */
  /* -------------------------------------------------------------- */

  const calculerTarif = useCallback(
    (params) => calculerPrixEstimatifTerrain(params, grilleTarifaire),
    [grilleTarifaire]
  )

  const modifierGrilleTarifaire = useCallback((nouvellesValeurs) => {
    setGrilleTarifaire((prev) => ({ ...prev, ...nouvellesValeurs }))
  }, [])

  const simulerBasculeCapteur = useCallback((capteurId) => {
    setCapteurs((liste) =>
      liste.map((s) => {
        if (s.id !== capteurId) return s
        const nouveauNiveau = s.niveauActuel >= 85 ? 45 : 88
        const estCritique = nouveauNiveau >= 85
        return {
          ...s,
          niveauActuel: nouveauNiveau,
          statutAlert: estCritique ? 'critique' : 'normal',
          statutLabel: estCritique ? 'Critique' : 'Normal',
          couleur: estCritique ? '#D64545' : '#1E9E63',
          derniereMaj: 'À l’instant',
        }
      })
    )
  }, [])

  /* -------------------------------------------------------------- */
  /*  Gestion Commandes & Workflow                                  */
  /* -------------------------------------------------------------- */

  const changerStatutCommande = useCallback((commandeId, nouveauStatutId) => {
    const statutObj = STATUTS_OFFICIELS.find((s) => s.id === nouveauStatutId)
    if (!statutObj) return

    setCommandes((liste) =>
      liste.map((c) =>
        c.id === commandeId || c.id === 'dem-1'
          ? {
              ...c,
              statutId: statutObj.id,
              statutCode: statutObj.code,
              horodateurStatut: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            }
          : c
      )
    )
  }, [])

  const validerPaiementCommande = useCallback(({ commandeId, modePaiement, codeMarchand }) => {
    setCommandes((liste) =>
      liste.map((c) =>
        c.id === commandeId || c.id === 'dem-1'
          ? {
              ...c,
              modePaiement: modePaiement || c.modePaiement,
              codeMarchand: codeMarchand || c.codeMarchand || 'WAVE-NDIAYE-883',
              statutPaiement: 'VALIDE',
              statutId: 'PAIEMENT_VALIDE',
              statutCode: 4,
              datePaiementValide: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            }
          : c
      )
    )
  }, [])

  const confirmerPrixCommande = useCallback((commandeId, prixConfirme) => {
    setCommandes((liste) =>
      liste.map((c) =>
        c.id === commandeId || c.id === 'dem-1'
          ? {
              ...c,
              prixConfirme,
              prix: prixConfirme,
              statutId: c.statutCode < 2 ? 'TARIF_CONFIRME' : c.statutId,
              statutCode: c.statutCode < 2 ? 2 : c.statutCode,
            }
          : c
      )
    )
  }, [])

  const ajouterNouvelleDemande = useCallback((nouvelleDemande) => {
    const id = idUnique('dem')
    const commandeComplete = {
      id,
      statutCode: 1, // DEMANDE_CREEE
      statutId: 'DEMANDE_CREEE',
      statutPaiement: 'EN_ATTENTE',
      modePaiement: nouvelleDemande.modePaiement || 'Wave',
      codeMarchand: 'WAVE-NDIAYE-883',
      prixEstimatif: nouvelleDemande.prixEstimatif || 22000,
      prixConfirme: nouvelleDemande.prixEstimatif || 22000,
      prix: nouvelleDemande.prixEstimatif || 22000,
      prioritaire: nouvelleDemande.prioritaire || false,
      client: nouvelleDemande.client || 'Aminata Diop',
      initiales: 'AD',
      quartier: nouvelleDemande.quartier || 'Parcelles Assainies U24',
      adresse: nouvelleDemande.adresse || 'Parcelles Assainies U24, Villa 1187',
      distance: nouvelleDemande.distance || '2,4 km',
      trajet: '12 min',
      volume: nouvelleDemande.volume || '~8 m³',
      urgence: nouvelleDemande.urgence || 'Standard',
      telephone: '+221 77 123 45 67',
      typeFosse: nouvelleDemande.typeFosse || 'Fosse septique maçonnée — 3 m³',
      acces: nouvelleDemande.acces || 'Rue carrossable — accès direct',
      note: 4.9,
      ...nouvelleDemande,
    }
    setCommandes((prev) => [commandeComplete, ...prev])
    return id
  }, [])

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

      // Nouvelles valeurs réactives
      grilleTarifaire,
      capteurs,
      commandes,
      calculerTarif,
      modifierGrilleTarifaire,
      simulerBasculeCapteur,
      changerStatutCommande,
      validerPaiementCommande,
      confirmerPrixCommande,
      ajouterNouvelleDemande,
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
      grilleTarifaire,
      capteurs,
      commandes,
      calculerTarif,
      modifierGrilleTarifaire,
      simulerBasculeCapteur,
      changerStatutCommande,
      validerPaiementCommande,
      confirmerPrixCommande,
      ajouterNouvelleDemande,
    ]
  )

  return <PlateformeContext.Provider value={valeur}>{children}</PlateformeContext.Provider>
}

export function usePlateforme() {
  const contexte = useContext(PlateformeContext)
  if (!contexte) throw new Error('usePlateforme doit être utilisé dans <PlateformeProvider>')
  return contexte
}
