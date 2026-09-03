/**
 * Flotte (entreprises → camions → chauffeurs) et évaluations des vidangeurs.
 *
 * Ces données constituent la graine de la maquette : elles sont chargées au
 * démarrage dans le contexte de session (voir src/lib/PlateformeContext.jsx),
 * où les nouvelles évaluations viennent s'ajouter pendant la démonstration.
 *
 * Le schéma relationnel correspondant (tables, clés étrangères, contraintes)
 * est documenté dans docs/modele-donnees.md.
 */

/* ------------------------------------------------------------------ */
/*  Entreprises de vidange                                            */
/* ------------------------------------------------------------------ */

export const entreprises = [
  {
    id: 'ent-1',
    raisonSociale: 'Ndiaye Assainissement',
    initiales: 'NA',
    gerant: 'Ibrahima Ndiaye',
    telephone: '+221 77 456 78 90',
    ninea: 'En cours — dossier déposé le 02/07/2026',
    commune: 'Parcelles Assainies',
    statut: 'En formalisation',
    depuis: 'février 2025',
  },
  {
    id: 'ent-2',
    raisonSociale: 'SEN Vidange Express',
    initiales: 'SV',
    gerant: 'Moussa Fall',
    telephone: '+221 77 611 22 08',
    ninea: '004 217 998 1M2',
    commune: 'Pikine',
    statut: 'Formel',
    depuis: 'janvier 2024',
  },
  {
    id: 'ent-3',
    raisonSociale: 'Teranga Sanitation',
    initiales: 'TS',
    gerant: 'Fatou Ba',
    telephone: '+221 78 330 47 15',
    ninea: '003 884 210 4K1',
    commune: 'Dakar Plateau',
    statut: 'Formel',
    depuis: 'mars 2023',
  },
  {
    id: 'ent-4',
    raisonSociale: 'Sow & Frères',
    initiales: 'SF',
    gerant: 'Cheikh Sow',
    telephone: '+221 76 902 55 31',
    ninea: 'En cours — dossier déposé le 18/05/2026',
    commune: 'Guédiawaye',
    statut: 'En formalisation',
    depuis: 'septembre 2025',
  },
  {
    id: 'ent-5',
    raisonSociale: 'ABK Vidange',
    initiales: 'AB',
    gerant: 'Alioune Badara Kane',
    telephone: '+221 77 803 12 66',
    ninea: '005 110 774 3R8',
    commune: 'Rufisque',
    statut: 'Formel',
    depuis: 'octobre 2024',
  },
  {
    id: 'ent-6',
    raisonSociale: 'Sy Assainissement',
    initiales: 'SA',
    gerant: 'Mariama Sy',
    telephone: '+221 78 651 09 43',
    ninea: 'En cours — dossier déposé le 09/06/2026',
    commune: 'Keur Massar',
    statut: 'En formalisation',
    depuis: 'mai 2026',
  },
]

/* ------------------------------------------------------------------ */
/*  Camions                                                           */
/* ------------------------------------------------------------------ */

export const camions = [
  { id: 'cam-1', entrepriseId: 'ent-1', immatriculation: 'DK-4821-A', capacite: 8, annee: 2019, statut: 'En service' },
  { id: 'cam-2', entrepriseId: 'ent-1', immatriculation: 'DK-6120-E', capacite: 6, annee: 2021, statut: 'En service' },
  { id: 'cam-3', entrepriseId: 'ent-2', immatriculation: 'DK-2290-B', capacite: 6, annee: 2018, statut: 'En service' },
  { id: 'cam-4', entrepriseId: 'ent-2', immatriculation: 'DK-3387-F', capacite: 10, annee: 2022, statut: 'En service' },
  { id: 'cam-5', entrepriseId: 'ent-2', immatriculation: 'DK-5514-G', capacite: 8, annee: 2020, statut: 'Maintenance' },
  { id: 'cam-6', entrepriseId: 'ent-3', immatriculation: 'DK-1043-D', capacite: 10, annee: 2023, statut: 'En service' },
  { id: 'cam-7', entrepriseId: 'ent-3', immatriculation: 'DK-8890-H', capacite: 6, annee: 2017, statut: 'En service' },
  { id: 'cam-8', entrepriseId: 'ent-4', immatriculation: 'DK-7715-C', capacite: 6, annee: 2016, statut: 'En service' },
  { id: 'cam-9', entrepriseId: 'ent-5', immatriculation: 'DK-9981-CD', capacite: 8, annee: 2020, statut: 'En service' },
  { id: 'cam-10', entrepriseId: 'ent-6', immatriculation: 'DK-4410-EF', capacite: 6, annee: 2015, statut: 'En service' },
]

/* ------------------------------------------------------------------ */
/*  Chauffeurs — identifiés par leur numéro de téléphone (unique)      */
/* ------------------------------------------------------------------ */

export const chauffeurs = [
  {
    id: 'ch-1',
    entrepriseId: 'ent-1',
    nom: 'Ibrahima Ndiaye',
    initiales: 'IN',
    telephone: '+221 77 456 78 90',
    permis: 'C — valide jusqu’au 12/2028',
    statut: 'Actif',
    depuis: 'février 2025',
  },
  {
    id: 'ch-2',
    entrepriseId: 'ent-1',
    nom: 'Abdou Ndiaye',
    initiales: 'AN',
    telephone: '+221 77 204 61 39',
    permis: 'C — valide jusqu’au 03/2027',
    statut: 'Actif',
    depuis: 'novembre 2025',
  },
  {
    id: 'ch-3',
    entrepriseId: 'ent-2',
    nom: 'Moussa Fall',
    initiales: 'MF',
    telephone: '+221 77 611 22 08',
    permis: 'C — valide jusqu’au 08/2029',
    statut: 'Actif',
    depuis: 'janvier 2024',
  },
  {
    id: 'ch-4',
    entrepriseId: 'ent-2',
    nom: 'Serigne Diop',
    initiales: 'SD',
    telephone: '+221 78 145 90 27',
    permis: 'C — valide jusqu’au 05/2028',
    statut: 'Actif',
    depuis: 'juin 2025',
  },
  {
    id: 'ch-5',
    entrepriseId: 'ent-2',
    nom: 'Pape Gueye',
    initiales: 'PG',
    telephone: '+221 76 558 03 74',
    permis: 'C — valide jusqu’au 11/2026',
    statut: 'Suspendu',
    depuis: 'avril 2024',
  },
  {
    id: 'ch-6',
    entrepriseId: 'ent-3',
    nom: 'Fatou Ba',
    initiales: 'FB',
    telephone: '+221 78 330 47 15',
    permis: 'C — valide jusqu’au 02/2030',
    statut: 'Actif',
    depuis: 'mars 2023',
  },
  {
    id: 'ch-7',
    entrepriseId: 'ent-4',
    nom: 'Cheikh Sow',
    initiales: 'CS',
    telephone: '+221 76 902 55 31',
    permis: 'C — valide jusqu’au 07/2027',
    statut: 'Actif',
    depuis: 'septembre 2025',
  },
  {
    id: 'ch-8',
    entrepriseId: 'ent-5',
    nom: 'Alioune Badara Kane',
    initiales: 'AK',
    telephone: '+221 77 803 12 66',
    permis: 'C — valide jusqu’au 09/2029',
    statut: 'Actif',
    depuis: 'octobre 2024',
  },
  {
    id: 'ch-9',
    entrepriseId: 'ent-6',
    nom: 'Mariama Sy',
    initiales: 'MS',
    telephone: '+221 78 651 09 43',
    permis: 'C — valide jusqu’au 01/2027',
    statut: 'Actif',
    depuis: 'mai 2026',
  },
]

/**
 * Affectations chauffeur ↔ camion dans le temps : un camion change de
 * chauffeur, et l'historique doit rester lisible pour le régulateur.
 * `au: null` = affectation en cours.
 */
export const affectations = [
  { id: 'aff-1', camionId: 'cam-1', chauffeurId: 'ch-1', du: '2025-02-10', au: null },
  { id: 'aff-2', camionId: 'cam-2', chauffeurId: 'ch-2', du: '2025-11-03', au: null },
  { id: 'aff-3', camionId: 'cam-3', chauffeurId: 'ch-3', du: '2024-01-15', au: null },
  { id: 'aff-4', camionId: 'cam-4', chauffeurId: 'ch-4', du: '2025-06-01', au: null },
  { id: 'aff-5', camionId: 'cam-5', chauffeurId: 'ch-5', du: '2024-04-20', au: '2026-07-31' },
  { id: 'aff-6', camionId: 'cam-6', chauffeurId: 'ch-6', du: '2023-03-05', au: null },
  { id: 'aff-7', camionId: 'cam-8', chauffeurId: 'ch-7', du: '2025-09-12', au: null },
  // Historique : cam-4 était conduit par Moussa Fall avant l'arrivée de Serigne Diop
  { id: 'aff-8', camionId: 'cam-4', chauffeurId: 'ch-3', du: '2022-05-02', au: '2025-05-31' },
  { id: 'aff-9', camionId: 'cam-9', chauffeurId: 'ch-8', du: '2024-10-08', au: null },
  { id: 'aff-10', camionId: 'cam-10', chauffeurId: 'ch-9', du: '2026-05-14', au: null },
]

/* ------------------------------------------------------------------ */
/*  Opérations de dépotage — support des notes station                */
/* ------------------------------------------------------------------ */

export const interventionsDepotage = [
  {
    id: 'int-1',
    bordereau: 'BD-2026-08-1187',
    chauffeurId: 'ch-1',
    camionId: 'cam-1',
    stationId: 'st-tivaouane',
    date: '2026-08-14',
    heure: '11:18',
    volume: 8,
    quartier: 'Parcelles Assainies U24',
  },
  {
    id: 'int-2',
    bordereau: 'BD-2026-08-1186',
    chauffeurId: 'ch-3',
    camionId: 'cam-3',
    stationId: 'st-tivaouane',
    date: '2026-08-14',
    heure: '10:42',
    volume: 5,
    quartier: 'Grand Yoff',
  },
  {
    id: 'int-3',
    bordereau: 'BD-2026-08-1185',
    chauffeurId: 'ch-6',
    camionId: 'cam-6',
    stationId: 'st-tivaouane',
    date: '2026-08-14',
    heure: '10:31',
    volume: 7,
    quartier: 'Liberté 6',
  },
  {
    id: 'int-4',
    bordereau: 'BD-2026-08-1182',
    chauffeurId: 'ch-2',
    camionId: 'cam-2',
    stationId: 'st-tivaouane',
    date: '2026-08-13',
    heure: '16:05',
    volume: 6,
    quartier: 'Patte d’Oie',
  },
  {
    id: 'int-5',
    bordereau: 'BD-2026-08-1178',
    chauffeurId: 'ch-7',
    camionId: 'cam-8',
    stationId: 'st-tivaouane',
    date: '2026-08-13',
    heure: '14:22',
    volume: 6,
    quartier: 'Guédiawaye',
  },
  {
    id: 'int-6',
    bordereau: 'BD-2026-08-1174',
    chauffeurId: 'ch-1',
    camionId: 'cam-1',
    stationId: 'st-tivaouane',
    date: '2026-08-12',
    heure: '09:47',
    volume: 8,
    quartier: 'Parcelles Assainies U17',
  },
  {
    id: 'int-7',
    bordereau: 'BD-2026-08-1169',
    chauffeurId: 'ch-4',
    camionId: 'cam-4',
    stationId: 'st-tivaouane',
    date: '2026-08-12',
    heure: '08:30',
    volume: 10,
    quartier: 'Pikine Nord',
  },
  {
    id: 'int-8',
    bordereau: 'BD-2026-08-1161',
    chauffeurId: 'ch-3',
    camionId: 'cam-3',
    stationId: 'st-tivaouane',
    date: '2026-08-11',
    heure: '15:12',
    volume: 6,
    quartier: 'Thiaroye',
  },
  {
    id: 'int-9',
    bordereau: 'BD-2026-08-1155',
    chauffeurId: 'ch-8',
    camionId: 'cam-9',
    stationId: 'st-rufisque',
    date: '2026-08-10',
    heure: '11:40',
    volume: 8,
    quartier: 'Rufisque Est',
  },
  {
    id: 'int-10',
    bordereau: 'BD-2026-08-1149',
    chauffeurId: 'ch-9',
    camionId: 'cam-10',
    stationId: 'st-niayes',
    date: '2026-08-09',
    heure: '17:05',
    volume: 6,
    quartier: 'Keur Massar',
  },
]

/* ------------------------------------------------------------------ */
/*  Évaluations — conservées séparément (ménage vs station)           */
/* ------------------------------------------------------------------ */

/** Notes émises par les ménages après une vidange (1 à 5). */
export const evaluationsMenage = [
  { id: 'em-1', chauffeurId: 'ch-1', auteur: 'Aminata Diop', quartier: 'Parcelles Assainies U24', note: 5, commentaire: 'Ponctuel et soigneux.', date: '2026-08-14' },
  { id: 'em-2', chauffeurId: 'ch-1', auteur: 'Ousmane Sarr', quartier: 'Parcelles Assainies U17', note: 5, commentaire: 'Rien à redire.', date: '2026-08-12' },
  { id: 'em-3', chauffeurId: 'ch-1', auteur: 'Ndèye Gueye', quartier: 'Grand Yoff', note: 4, commentaire: 'Un peu en retard mais travail propre.', date: '2026-08-05' },
  { id: 'em-4', chauffeurId: 'ch-2', auteur: 'Modou Faye', quartier: 'Patte d’Oie', note: 4, commentaire: '', date: '2026-08-13' },
  { id: 'em-5', chauffeurId: 'ch-2', auteur: 'Awa Diallo', quartier: 'Patte d’Oie', note: 5, commentaire: 'Très bon contact.', date: '2026-08-02' },
  { id: 'em-6', chauffeurId: 'ch-3', auteur: 'Restaurant Kër Teranga', quartier: 'Liberté 6', note: 4, commentaire: 'Intervention rapide.', date: '2026-08-14' },
  { id: 'em-7', chauffeurId: 'ch-3', auteur: 'Ibrahima Diagne', quartier: 'Thiaroye', note: 5, commentaire: '', date: '2026-08-11' },
  { id: 'em-8', chauffeurId: 'ch-3', auteur: 'Sokhna Mbaye', quartier: 'Pikine Nord', note: 4, commentaire: 'Correct.', date: '2026-07-29' },
  { id: 'em-9', chauffeurId: 'ch-4', auteur: 'Mairie de Pikine', quartier: 'Pikine Nord', note: 5, commentaire: 'Équipe professionnelle.', date: '2026-08-12' },
  { id: 'em-10', chauffeurId: 'ch-4', auteur: 'Cheikh Ba', quartier: 'Pikine Est', note: 4, commentaire: '', date: '2026-08-01' },
  { id: 'em-11', chauffeurId: 'ch-5', auteur: 'Adama Sy', quartier: 'Keur Massar', note: 3, commentaire: 'Odeurs laissées dans la cour.', date: '2026-07-22' },
  { id: 'em-12', chauffeurId: 'ch-5', auteur: 'Bineta Ndour', quartier: 'Keur Massar', note: 2, commentaire: 'Retard de 3 heures.', date: '2026-07-18' },
  { id: 'em-13', chauffeurId: 'ch-6', auteur: 'Résidence Les Almadies', quartier: 'Almadies', note: 5, commentaire: 'Impeccable.', date: '2026-08-14' },
  { id: 'em-14', chauffeurId: 'ch-6', auteur: 'Ecole Serigne Fallou', quartier: 'Dakar Plateau', note: 5, commentaire: 'Très pro.', date: '2026-08-06' },
  { id: 'em-15', chauffeurId: 'ch-7', auteur: 'Mamadou Kane', quartier: 'Guédiawaye', note: 4, commentaire: '', date: '2026-08-13' },
  { id: 'em-16', chauffeurId: 'ch-7', auteur: 'Astou Diouf', quartier: 'Guédiawaye', note: 4, commentaire: 'Bon rapport qualité-prix.', date: '2026-07-30' },
  { id: 'em-17', chauffeurId: 'ch-8', auteur: 'Commune de Rufisque', quartier: 'Rufisque Est', note: 5, commentaire: 'Marché communal respecté.', date: '2026-08-10' },
  { id: 'em-18', chauffeurId: 'ch-8', auteur: 'Ndiaga Thiam', quartier: 'Rufisque', note: 4, commentaire: '', date: '2026-07-28' },
  { id: 'em-19', chauffeurId: 'ch-9', auteur: 'Khady Camara', quartier: 'Keur Massar', note: 4, commentaire: 'Correct pour le prix.', date: '2026-08-09' },
  { id: 'em-20', chauffeurId: 'ch-9', auteur: 'Ibou Sarr', quartier: 'Malika', note: 4, commentaire: '', date: '2026-07-25' },
]

/**
 * Notes émises par les agents de station après un dépotage.
 * Deux critères distincts, conservés séparément :
 *  - noteService     : qualité du service rendu à la station (ponctualité,
 *                      manœuvre à la potence, propreté, respect des consignes) ;
 *  - noteConformite  : conformité du dépotage (volume déclaré = volume dépoté,
 *                      absence de déchets solides, bordereau en règle).
 */
export const evaluationsStation = [
  {
    id: 'es-1',
    interventionId: 'int-2',
    chauffeurId: 'ch-3',
    stationId: 'st-tivaouane',
    agent: 'Agent potence 2 — Delvic',
    noteService: 4,
    noteConformite: 5,
    conforme: true,
    commentaire: 'Manœuvre propre, bordereau complet.',
    date: '2026-08-14',
  },
  {
    id: 'es-2',
    interventionId: 'int-3',
    chauffeurId: 'ch-6',
    stationId: 'st-tivaouane',
    agent: 'Agent potence 1 — Delvic',
    noteService: 5,
    noteConformite: 5,
    conforme: true,
    commentaire: 'Rien à signaler.',
    date: '2026-08-14',
  },
  {
    id: 'es-3',
    interventionId: 'int-5',
    chauffeurId: 'ch-7',
    stationId: 'st-tivaouane',
    agent: 'Agent potence 1 — Delvic',
    noteService: 3,
    noteConformite: 4,
    conforme: true,
    commentaire: 'Retard sur le créneau réservé.',
    date: '2026-08-13',
  },
  {
    id: 'es-4',
    interventionId: 'int-6',
    chauffeurId: 'ch-1',
    stationId: 'st-tivaouane',
    agent: 'Agent potence 2 — Delvic',
    noteService: 5,
    noteConformite: 5,
    conforme: true,
    commentaire: 'Volume déclaré conforme au dépotage.',
    date: '2026-08-12',
  },
  {
    id: 'es-5',
    interventionId: 'int-7',
    chauffeurId: 'ch-4',
    stationId: 'st-tivaouane',
    agent: 'Agent potence 1 — Delvic',
    noteService: 4,
    noteConformite: 4,
    conforme: true,
    commentaire: '',
    date: '2026-08-12',
  },
  {
    id: 'es-6',
    interventionId: 'int-8',
    chauffeurId: 'ch-3',
    stationId: 'st-tivaouane',
    agent: 'Agent potence 2 — Delvic',
    noteService: 4,
    noteConformite: 2,
    conforme: false,
    commentaire: 'Déchets solides dans la cuve, écart de volume de 1,5 m³.',
    date: '2026-08-11',
  },
  {
    id: 'es-7',
    interventionId: 'int-9',
    chauffeurId: 'ch-8',
    stationId: 'st-rufisque',
    agent: 'Agent potence — Rufisque',
    noteService: 5,
    noteConformite: 4,
    conforme: true,
    commentaire: '',
    date: '2026-08-10',
  },
  {
    id: 'es-8',
    interventionId: 'int-10',
    chauffeurId: 'ch-9',
    stationId: 'st-niayes',
    agent: 'Agent potence — Niayes',
    noteService: 5,
    noteConformite: 3,
    conforme: true,
    commentaire: 'Bordereau incomplet à l’arrivée, régularisé sur place.',
    date: '2026-08-09',
  },
]

/* ------------------------------------------------------------------ */
/*  Aides de lecture                                                  */
/* ------------------------------------------------------------------ */

export const chauffeurParId = (id) => chauffeurs.find((c) => c.id === id)
export const camionParId = (id) => camions.find((c) => c.id === id)
export const entrepriseParId = (id) => entreprises.find((e) => e.id === id)

/** Camion affecté à un chauffeur à l'instant présent (affectation ouverte). */
export const camionCourant = (chauffeurId, listeAffectations = affectations) =>
  camionParId(
    listeAffectations.find((a) => a.chauffeurId === chauffeurId && a.au === null)?.camionId
  )
