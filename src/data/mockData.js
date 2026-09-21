/**
 * Données fictives centralisées de la maquette AssainiTrack.
 * Aucune donnée réelle, aucun appel réseau : tout est statique et sert uniquement
 * à illustrer les écrans pendant le pitch Govathon.
 */

/* ------------------------------------------------------------------ */
/*  Marque                                                            */
/* ------------------------------------------------------------------ */

export const marque = {
  nom: 'AssainiTrack',
  slogan: 'Chaque fosse suivie, chaque boue tracée, chaque dépotoir contrôlé.',
  baseline:
    "Plateforme sénégalaise de traçabilité et de dispatching de la vidange des boues de fosses septiques. Complémentaire à l'outil public « Ma Vidange » de l'ONAS.",
}

/* ------------------------------------------------------------------ */
/*  Formats                                                           */
/* ------------------------------------------------------------------ */

export const fcfa = (montant) =>
  `${Math.round(montant).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} FCFA`

/* ------------------------------------------------------------------ */
/*  App Ménages — persona                                             */
/* ------------------------------------------------------------------ */

export const menage = {
  prenom: 'Aminata',
  nom: 'Diop',
  nomComplet: 'Aminata Diop',
  initiales: 'AD',
  telephone: '+221 77 123 45 67',
  quartier: 'Parcelles Assainies Unité 24',
  adresse: 'Parcelles Assainies U24, Villa 1187 — Dakar',
  commune: 'Parcelles Assainies',
  ville: 'Dakar',
  membresFoyer: 9,
  typeLogement: 'Maison familiale (R+1)',
  typeFosse: 'Fosse septique maçonnée — 3 m³',
  derniereVidange: 'il y a 7 mois',
  derniereVidangeDate: '12 janvier 2026',
  clientDepuis: 'mars 2024',
  vidangesTotal: 5,
}

export const estimationVidange = {
  volume: '~8 m³',
  volumeNum: 8,
  duree: '45 min',
  prixMin: 20000,
  prixMax: 25000,
  fourchette: '20 000 à 25 000 FCFA',
  urgence: 'Recommandée sous 2 semaines',
  facteurs: [
    { label: 'Personnes au foyer', valeur: '9 personnes' },
    { label: 'Type de fosse', valeur: 'Septique maçonnée · 3 m³' },
    { label: 'Dernière vidange', valeur: '12 janvier 2026 (7 mois)' },
    { label: 'Accès camion', valeur: 'Rue carrossable — accès direct' },
  ],
}

/* ------------------------------------------------------------------ */
/*  Tarification terrain & Grille Configurable                        */
/* ------------------------------------------------------------------ */

export const grilleTarifaireTerrainDefaut = {
  tarifBase: 8000,
  prixParM3: 1500,
  coutKmChauffeur: 400,
  coutKmStation: 300,
  fraisUrgence: 3000,
  fraisHivernage: 2500,
  fraisAccesDifficile: 2000,
  communes: {
    'Parcelles Assainies': 1.0,
    'Grand Yoff': 1.0,
    "Patte d'Oie": 1.0,
    'Pikine': 1.05,
    'Guédiawaye': 1.05,
    'Rufisque': 1.15,
    'Keur Massar': 1.10,
    'Dakar Plateau': 1.20,
  },
}

export function calculerPrixEstimatifTerrain(params, grille = grilleTarifaireTerrainDefaut) {
  const {
    volumeM3 = 8,
    distanceChauffeurKm = 3,
    distanceStationKm = 10,
    estUrgent = false,
    estHivernage = false,
    estAccesDifficile = false,
    commune = 'Parcelles Assainies',
  } = params

  const base = grille.tarifBase
  const volCost = volumeM3 * grille.prixParM3
  const distCost = distanceChauffeurKm * grille.coutKmChauffeur + distanceStationKm * grille.coutKmStation
  const surg = estUrgent ? grille.fraisUrgence : 0
  const shiv = estHivernage ? grille.fraisHivernage : 0
  const sacc = estAccesDifficile ? grille.fraisAccesDifficile : 0

  const subtotal = base + volCost + distCost + surg + shiv + sacc
  const coef = grille.communes[commune] || 1.0
  const total = Math.round((subtotal * coef) / 500) * 500 // Arrondi au 500 FCFA près

  return Math.max(12000, total)
}

/* ------------------------------------------------------------------ */
/*  Workflow officiel des 7 statuts                                    */
/* ------------------------------------------------------------------ */

export const STATUTS_OFFICIELS = [
  { id: 'DEMANDE_CREEE', code: 1, label: 'Demande créée', sublabel: 'Demande enregistrée par le ménage' },
  { id: 'TARIF_CONFIRME', code: 2, label: 'Tarif confirmé', sublabel: 'Prix estimé et confirmé' },
  { id: 'MODE_PAIEMENT_CHOISI', code: 3, label: 'Mode de paiement choisi', sublabel: 'Espèces, Wave ou Orange Money' },
  { id: 'PAIEMENT_VALIDE', code: 4, label: 'Paiement validé', sublabel: 'Code marchand / paiement confirmé' },
  { id: 'CAMION_ENVOYE', code: 5, label: 'Camion envoyé', sublabel: 'Départ du camion autorisé' },
  { id: 'INTERVENTION_EN_COURS', code: 6, label: 'Intervention en cours', sublabel: 'Pompage et vidange sur place' },
  { id: 'VIDANGE_TERMINEE', code: 7, label: 'Vidange terminée', sublabel: 'Dépotage certifié à la station' },
]

/* ------------------------------------------------------------------ */
/*  Capteurs de niveau & Surveillance Hivernage                       */
/* ------------------------------------------------------------------ */

export const capteursFosses = [
  {
    id: 'sens-1',
    nom: 'Fosse Parcelles U24',
    commune: 'Parcelles Assainies',
    quartier: 'Parcelles Assainies U24',
    regardId: 'FT-2401',
    niveauActuel: 88,
    seuilCritique: 85,
    statutAlert: 'critique',
    statutLabel: 'Critique',
    couleur: '#D64545',
    risqueInondation: 'eleve',
    derniereMaj: 'Il y a 8 min',
    capaciteM3: 8,
    client: 'Aminata Diop',
    telephone: '+221 77 123 45 67',
    adresse: 'Villa 1187, Parcelles Assainies U24',
    historique7Jours: [42, 48, 55, 64, 72, 81, 88],
  },
  {
    id: 'sens-2',
    nom: 'Regard Keur Massar Nord',
    commune: 'Keur Massar',
    quartier: 'Keur Massar Village',
    regardId: 'RG-0912',
    niveauActuel: 94,
    seuilCritique: 85,
    statutAlert: 'critique',
    statutLabel: 'Critique',
    couleur: '#D64545',
    risqueInondation: 'critique',
    derniereMaj: 'Il y a 3 min',
    capaciteM3: 12,
    client: 'Mamadou Ndiaye',
    telephone: '+221 77 889 00 11',
    adresse: 'Grande Rue Keur Massar, près marché',
    historique7Jours: [50, 58, 67, 75, 83, 90, 94],
  },
  {
    id: 'sens-3',
    nom: 'Fosse Grand Yoff Cité',
    commune: 'Grand Yoff',
    quartier: 'Grand Yoff',
    regardId: 'FT-1044',
    niveauActuel: 78,
    seuilCritique: 85,
    statutAlert: 'surveillance',
    statutLabel: 'Surveillance',
    couleur: '#E0A200',
    risqueInondation: 'moyen',
    derniereMaj: 'Il y a 25 min',
    capaciteM3: 6,
    client: 'Ousmane Sarr',
    telephone: '+221 78 220 11 45',
    adresse: 'Cité Millionnaire, Grand Yoff',
    historique7Jours: [30, 38, 46, 54, 62, 70, 78],
  },
  {
    id: 'sens-4',
    nom: 'Fosse Patte d’Oie Builders',
    commune: "Patte d'Oie",
    quartier: "Patte d'Oie",
    regardId: 'FT-0811',
    niveauActuel: 52,
    seuilCritique: 85,
    statutAlert: 'normal',
    statutLabel: 'Normal',
    couleur: '#1E9E63',
    risqueInondation: 'faible',
    derniereMaj: 'Il y a 1h',
    capaciteM3: 10,
    client: 'Ndèye Gueye',
    telephone: '+221 76 909 33 21',
    adresse: "Patte d'Oie Builders, Villa 42",
    historique7Jours: [20, 25, 30, 35, 40, 46, 52],
  },
  {
    id: 'sens-5',
    nom: 'Regard Rufisque Est',
    commune: 'Rufisque',
    quartier: 'Rufisque Est',
    regardId: 'RG-4402',
    niveauActuel: 89,
    seuilCritique: 85,
    statutAlert: 'critique',
    statutLabel: 'Critique',
    couleur: '#D64545',
    risqueInondation: 'eleve',
    derniereMaj: 'Il y a 12 min',
    capaciteM3: 10,
    client: 'GIE Bassin Rufisque',
    telephone: '+221 77 334 55 66',
    adresse: 'Canal Est Rufisque',
    historique7Jours: [45, 52, 60, 71, 79, 84, 89],
  },
]

export const creneaux = [
  { id: 'asap', label: 'Dès que possible', detail: 'Sous 45 min', recommande: true },
  { id: 'today', label: "Aujourd'hui", detail: '16h — 18h' },
  { id: 'tomorrow', label: 'Demain', detail: '08h — 10h' },
]

export const typesLogement = [
  'Maison familiale (R+1)',
  'Villa individuelle',
  'Appartement',
  'Commerce / atelier',
]

/* ------------------------------------------------------------------ */
/*  Opérateurs proposés au ménage                                     */
/* ------------------------------------------------------------------ */

export const operateursDisponibles = [
  {
    id: 'op-1',
    nom: 'Ibrahima Ndiaye',
    initiales: 'IN',
    entreprise: 'Ndiaye Assainissement',
    chauffeurId: 'ch-1',
    delai: 'Disponible dans 45 min',
    distance: '2,4 km',
    prix: 22000,
    camion: 'Camion 8 m³ · DK-4821-A',
    verifie: true,
    vidanges: 342,
    couleur: 'teal',
  },
  {
    id: 'op-2',
    nom: 'Moussa Fall',
    initiales: 'MF',
    entreprise: 'SEN Vidange Express',
    chauffeurId: 'ch-3',
    delai: 'Disponible dans 1 h 10',
    distance: '3,8 km',
    prix: 20000,
    camion: 'Camion 6 m³ · DK-2290-B',
    verifie: true,
    vidanges: 210,
    couleur: 'navy',
  },
  {
    id: 'op-3',
    nom: 'Cheikh Sow',
    initiales: 'CS',
    entreprise: 'Sow & Frères',
    chauffeurId: 'ch-7',
    delai: 'Disponible dans 2 h',
    distance: '5,1 km',
    prix: 19500,
    camion: 'Camion 6 m³ · DK-7715-C',
    verifie: false,
    vidanges: 96,
    couleur: 'amber',
  },
  {
    id: 'op-4',
    nom: 'Fatou Ba',
    initiales: 'FB',
    entreprise: 'Teranga Sanitation',
    chauffeurId: 'ch-6',
    delai: 'Disponible demain 08h',
    distance: '6,7 km',
    prix: 25000,
    camion: 'Camion 10 m³ · DK-1043-D',
    verifie: true,
    vidanges: 401,
    couleur: 'teal',
  },
]

/* ------------------------------------------------------------------ */
/*  Suivi temps réel                                                  */
/* ------------------------------------------------------------------ */

export const etapesSuivi = [
  { id: 'accepte', label: 'Accepté', court: 'Accepté', detail: 'Ibrahima a accepté votre demande', icone: 'check' },
  { id: 'route', label: 'En route', court: 'En route', detail: 'Le camion se dirige vers votre domicile', icone: 'truck' },
  { id: 'collecte', label: 'Collecte en cours', court: 'Collecte', detail: 'Vidange de la fosse en cours', icone: 'droplet' },
  { id: 'depotoir', label: 'Vers le dépotoir', court: 'Dépotoir', detail: 'Direction station Tivaouane Peulh', icone: 'route' },
  { id: 'termine', label: 'Terminé', court: 'Terminé', detail: 'Dépotage certifié conforme', icone: 'flag' },
]

export const etaSuivi = ['12 min', '8 min', '—', '14 min', 'Terminé']

/* ------------------------------------------------------------------ */
/*  Paiement                                                          */
/* ------------------------------------------------------------------ */

export const moyensPaiement = [
  {
    id: 'wave',
    nom: 'Wave',
    detail: '+221 77 123 45 67',
    couleur: '#1DC3F5',
    initiale: 'W',
    recommande: true,
  },
  {
    id: 'om',
    nom: 'Orange Money',
    detail: '+221 77 123 45 67',
    couleur: '#F5821F',
    initiale: 'OM',
  },
  {
    id: 'cash',
    nom: 'Espèces',
    detail: "Paiement à l'opérateur après le dépotage",
    couleur: '#5B6B72',
    initiale: 'FR',
  },
]

export const recapitulatif = {
  operateur: 'Ibrahima Ndiaye',
  chauffeurId: 'ch-1',
  service: 'Vidange fosse septique ~8 m³',
  prestation: 22500,
  redevanceDepotage: 2000,
  fraisPlateforme: 500,
  total: 25000,
  reference: 'AT-2026-08-4471',
  passeport: 'VID-2026-000458',
  station: 'Station Tivaouane Peulh',
}

/* ------------------------------------------------------------------ */
/*  Séquestre & répartition au scan du QR                             */
/*  Le ménage paie une seule fois : les fonds restent bloqués jusqu'au */
/*  scan du bordereau à la station, qui déclenche la répartition.      */
/*  Arithmétique locale uniquement — aucun paiement réel.              */
/* ------------------------------------------------------------------ */

export const parametresFinanciers = {
  /** Redevance de dépotage due au délégataire, au m³ réellement dépoté. */
  redevanceParM3: 250,
  /** Commission plateforme : montant fixe par transaction, paramétrable par l'ONAS. */
  commissionPlateforme: 500,
  /** Prix au m³ servant à ajuster le séquestre si le volume réel diffère. */
  prixParM3: 3000,
  /** Délai au-delà duquel l'absence de scan déclenche une anomalie. */
  delaiScanHeures: 24,
}

/**
 * Répartition du montant payé en 3 parts : vidangeur, délégataire, plateforme.
 * L'ONAS n'apparaît pas ici : sa part remonte du délégataire par contrat de
 * délégation, en dehors de l'application.
 */
export const repartition = (montantPaye, volumeM3, params = parametresFinanciers) => {
  const redevance = Math.round(volumeM3 * params.redevanceParM3)
  const commission = params.commissionPlateforme
  return {
    montantPaye,
    volumeM3,
    redevance,
    commission,
    net: montantPaye - redevance - commission,
  }
}

/**
 * Ajustement du séquestre quand le volume réel constaté au dépotage diffère
 * du volume estimé : remboursement au ménage si inférieur, complément si
 * supérieur. La redevance est toujours recalculée sur le volume réel.
 */
export const ajusterSequestre = (
  montantPaye,
  volumeEstime,
  volumeReel,
  params = parametresFinanciers
) => {
  const ecart = volumeReel - volumeEstime
  const ajustement = Math.round(ecart * params.prixParM3)
  const montantFinal = montantPaye + ajustement
  return {
    ecart,
    ajustement,
    sens: ajustement === 0 ? 'aucun' : ajustement < 0 ? 'remboursement' : 'complement',
    ...repartition(montantFinal, volumeReel, params),
  }
}

export const statutsSequestre = {
  BLOQUE: { label: 'Fonds en séquestre', tone: 'warning' },
  REPARTI: { label: 'Réparti', tone: 'success' },
  ANOMALIE_DEPOTAGE: { label: 'ANOMALIE_DEPOTAGE', tone: 'danger' },
  REMBOURSE: { label: 'Remboursé au ménage', tone: 'neutral' },
}

/** Compte prépayé du vidangeur (cas des missions réglées en espèces). */
export const comptePrepaye = {
  soldeInitial: 1000,
  rechargement: 10000,
  seuilAlerte: 5000,
}

/* ------------------------------------------------------------------ */
/*  Historique ménage                                                 */
/* ------------------------------------------------------------------ */

const VIDANGES_BRUTES = [
  {
    id: 'AT-2026-08-4471',
    modePaiement: 'Wave',
    passeport: 'VID-2026-000458',
    date: "14 août 2026",
    operateur: 'Ibrahima Ndiaye',
    initiales: 'IN',
    montant: 25000,
    volume: '8 m³',
    station: 'Tivaouane Peulh',
    statut: 'Conforme',
  },
  {
    id: 'AT-2026-01-2210',
    modePaiement: 'Espèces',
    passeport: 'VID-2026-000391',
    date: '12 janvier 2026',
    operateur: 'Moussa Fall',
    initiales: 'MF',
    montant: 21000,
    volume: '7 m³',
    station: 'Cambérène',
    statut: 'Conforme',
  },
  {
    id: 'AT-2025-06-8873',
    passeport: 'VID-2025-000276',
    date: '28 juin 2025',
    operateur: 'Ibrahima Ndiaye',
    initiales: 'IN',
    montant: 20000,
    volume: '7 m³',
    station: 'Cambérène',
    statut: 'Conforme',
  },
  {
    id: 'AT-2024-11-5502',
    passeport: 'VID-2024-000164',
    date: '03 novembre 2024',
    operateur: 'Fatou Ba',
    initiales: 'FB',
    montant: 24000,
    volume: '9 m³',
    station: 'Pikine',
    statut: 'Conforme',
  },
  {
    id: 'AT-2024-03-1197',
    passeport: 'VID-2024-000082',
    date: '17 mars 2024',
    operateur: 'Cheikh Sow',
    initiales: 'CS',
    montant: 19500,
    volume: '6 m³',
    station: 'Rufisque',
    statut: 'Conforme',
  },
]

/**
 * Historique enrichi de la répartition réellement appliquée au scan
 * (montant payé par le ménage → net perçu par le vidangeur).
 */
export const historiqueVidanges = VIDANGES_BRUTES.map((v) => ({
  modePaiement: 'Wave',
  ...v,
  ...repartition(v.montant, parseFloat(v.volume)),
}))

export const moyensEnregistres = [
  { id: 'w', nom: 'Wave', detail: '•••• 45 67', couleur: '#1DC3F5', principal: true },
  { id: 'o', nom: 'Orange Money', detail: '•••• 45 67', couleur: '#F5821F', principal: false },
]

/* ------------------------------------------------------------------ */
/*  App Opérateurs — persona                                          */
/* ------------------------------------------------------------------ */

export const operateur = {
  nomComplet: 'Ibrahima Ndiaye',
  initiales: 'IN',
  entreprise: 'Ndiaye Assainissement',
  telephone: '+221 77 456 78 90',
  statut: 'En cours de formalisation',
  camion: 'Camion 8 m³ · DK-4821-A',
  zone: 'Dakar Nord — Parcelles, Grand Yoff, Patte d’Oie',
  chauffeurId: 'ch-1',
  entrepriseId: 'ent-1',
  vidangesTotal: 342,
  membreDepuis: 'février 2025',
  ninea: 'En cours — dossier déposé le 02/07/2026',
}

export const demandesProximite = [
  {
    id: 'dem-1',
    modePaiement: 'Wave',
    client: 'Aminata Diop',
    initiales: 'AD',
    quartier: 'Parcelles Assainies U24',
    adresse: 'Villa 1187, Parcelles Assainies U24',
    distance: '2,4 km',
    trajet: '12 min',
    volume: '~8 m³',
    prix: 22000,
    urgence: 'Standard',
    telephone: '+221 77 123 45 67',
    typeFosse: 'Fosse septique maçonnée — 3 m³',
    acces: 'Rue carrossable — accès direct',
    note: 4.9,
  },
  {
    id: 'dem-2',
    modePaiement: 'Espèces',
    client: 'Ousmane Sarr',
    initiales: 'OS',
    quartier: 'Grand Yoff',
    adresse: 'Cité Millionnaire, Grand Yoff',
    distance: '3,1 km',
    trajet: '15 min',
    volume: '~6 m³',
    prix: 20000,
    urgence: 'Urgent',
    telephone: '+221 78 220 11 45',
    typeFosse: 'Fosse septique — 2,5 m³',
    acces: 'Ruelle étroite — tuyau 20 m',
    note: 4.5,
  },
  {
    id: 'dem-3',
    modePaiement: 'Orange Money',
    client: 'Ndèye Gueye',
    initiales: 'NG',
    quartier: "Patte d'Oie",
    adresse: "Patte d'Oie Builders, Villa 42",
    distance: '4,6 km',
    trajet: '19 min',
    volume: '~10 m³',
    prix: 27000,
    urgence: 'Planifié demain',
    telephone: '+221 76 909 33 21',
    typeFosse: 'Fosse septique double — 5 m³',
    acces: 'Cour intérieure — accès moyen',
    note: 4.7,
  },
  {
    id: 'dem-4',
    modePaiement: 'Espèces',
    client: 'Restaurant Kër Teranga',
    initiales: 'KT',
    quartier: 'Liberté 6',
    adresse: 'Liberté 6 extension, Rue GY-118',
    distance: '5,9 km',
    trajet: '24 min',
    volume: '~12 m³',
    prix: 32000,
    urgence: 'Urgent',
    telephone: '+221 77 640 12 08',
    typeFosse: 'Bac à graisse + fosse — 6 m³',
    acces: 'Parking privé — accès direct',
    note: 4.4,
  },
]

/* ------------------------------------------------------------------ */
/*  Stations de traitement                                            */
/*  `remplissage` = taux d'occupation de la station (100 = saturée).  */
/* ------------------------------------------------------------------ */

export const stations = [
  {
    id: 'st-camberene',
    nom: 'Cambérène',
    commune: 'Cambérène, Dakar',
    remplissage: 74,
    distance: '9,2 km',
    trajet: '21 min',
    attente: '15 min de file',
    tarif: 3000,
    statut: 'normal',
  },
  {
    id: 'st-pikine',
    nom: 'Pikine',
    commune: 'Pikine Nord',
    remplissage: 88,
    distance: '11,4 km',
    trajet: '28 min',
    attente: '35 min de file',
    tarif: 3000,
    statut: 'tendu',
  },
  {
    id: 'st-rufisque',
    nom: 'Rufisque',
    commune: 'Rufisque Est',
    remplissage: 65,
    distance: '24,8 km',
    trajet: '48 min',
    attente: '10 min de file',
    tarif: 2500,
    statut: 'normal',
  },
  {
    id: 'st-tivaouane',
    nom: 'Tivaouane Peulh',
    commune: 'Tivaouane Peulh–Niaga',
    remplissage: 58,
    distance: '13,6 km',
    trajet: '26 min',
    attente: '5 min de file',
    tarif: 2500,
    statut: 'normal',
    recommandee: true,
  },
  {
    id: 'st-niayes',
    nom: 'Niayes',
    commune: 'Keur Massar',
    remplissage: 96,
    distance: '16,1 km',
    trajet: '33 min',
    attente: '1 h 10 de file',
    tarif: 3000,
    statut: 'saturee',
  },
]

export const stationRecommandee = stations.find((s) => s.recommandee)

/* ------------------------------------------------------------------ */
/*  Revenus & conformité opérateur                                    */
/* ------------------------------------------------------------------ */

export const revenusSemaine = [
  { jour: 'Lun', gains: 44000, vidanges: 2 },
  { jour: 'Mar', gains: 66000, vidanges: 3 },
  { jour: 'Mer', gains: 22000, vidanges: 1 },
  { jour: 'Jeu', gains: 88000, vidanges: 4 },
  { jour: 'Ven', gains: 71000, vidanges: 3 },
  { jour: 'Sam', gains: 96000, vidanges: 4 },
  { jour: 'Dim', gains: 24000, vidanges: 1 },
]

export const statsOperateur = {
  gainsSemaine: 411000,
  gainsMois: 1584000,
  vidangesSemaine: 18,
  vidangesMois: 71,
  tauxConformite: 100,
  enAttente: 22000,
}

export const microCredit = {
  progression: 75,
  objectifMois: 12,
  moisValides: 9,
  montantEligible: 3500000,
  partenaire: 'Fonds équipement assainissement — partenaire bancaire',
  criteres: [
    { label: 'Historique de dépotages tracés', valeur: '9 / 12 mois', ok: true },
    { label: 'Taux de dépotage conforme', valeur: '100 %', ok: true },
    { label: 'Note moyenne ≥ 4,0', valeur: '4,8 / 5', ok: true },
    { label: 'Formalisation NINEA', valeur: 'Dossier en cours', ok: false },
  ],
}

export const badgesOperateur = [
  { id: 'b1', label: 'Dépotage 100 % conforme', couleur: 'success' },
  { id: 'b2', label: '300+ vidanges tracées', couleur: 'teal' },
  { id: 'b3', label: 'Formalisation en cours', couleur: 'warning' },
]

/* ------------------------------------------------------------------ */
/*  Dashboard institutionnel                                          */
/* ------------------------------------------------------------------ */

export const institutions = [
  { id: 'onas', nom: 'ONAS', detail: 'Office National de l’Assainissement du Sénégal' },
  { id: 'rufisque', nom: 'Commune de Rufisque', detail: 'Collectivité territoriale' },
  { id: 'police', nom: 'Police de l’assainissement', detail: 'Police de l’assainissement' },
  { id: 'bailleur', nom: 'Bailleur', detail: 'Partenaire technique et financier' },
]

export const kpis = [
  { id: 'k1', label: 'Vidanges tracées', valeur: '12 400', variation: '+18 % vs 2025', icone: 'truck', ton: 'navy' },
  { id: 'k2', label: 'Dépotage conforme', valeur: '87 %', variation: '+9 pts vs 2025', icone: 'shield', ton: 'success' },
  { id: 'k3', label: 'Opérateurs actifs', valeur: '156', variation: '+34 cette année', icone: 'users', ton: 'teal' },
  { id: 'k4', label: 'Ménages actifs', valeur: '8 200', variation: '+2 100 cette année', icone: 'home', ton: 'amber' },
]

export const vidangesMensuelles = [
  { mois: 'Sep', vidanges: 720, conformes: 588 },
  { mois: 'Oct', vidanges: 810, conformes: 672 },
  { mois: 'Nov', vidanges: 865, conformes: 735 },
  { mois: 'Déc', vidanges: 940, conformes: 808 },
  { mois: 'Jan', vidanges: 1010, conformes: 878 },
  { mois: 'Fév', vidanges: 985, conformes: 862 },
  { mois: 'Mar', vidanges: 1075, conformes: 946 },
  { mois: 'Avr', vidanges: 1120, conformes: 997 },
  { mois: 'Mai', vidanges: 1065, conformes: 948 },
  { mois: 'Juin', vidanges: 1180, conformes: 1062 },
  { mois: 'Juil', vidanges: 1240, conformes: 1128 },
  { mois: 'Août', vidanges: 1390, conformes: 1279 },
]

export const repartitionCommunes = [
  { commune: 'Parcelles Assainies', vidanges: 2480, conformite: 91 },
  { commune: 'Pikine', vidanges: 2130, conformite: 84 },
  { commune: 'Guédiawaye', vidanges: 1760, conformite: 86 },
  { commune: 'Rufisque', vidanges: 1540, conformite: 88 },
  { commune: 'Keur Massar', vidanges: 1420, conformite: 79 },
  { commune: 'Dakar Plateau', vidanges: 1070, conformite: 94 },
]

/**
 * Couches de la carte SIG du tableau de bord.
 * Positions exprimées en % du conteneur (x = left, y = top) — aucune coordonnée réelle.
 */
export const legendeSIG = [
  { type: 'conforme', label: 'Conforme', couleur: '#1E9E63' },
  { type: 'surveiller', label: 'À surveiller', couleur: '#E0A200' },
  { type: 'signalement', label: 'Signalement à vérifier', couleur: '#D64545' },
  { type: 'station', label: 'Station de traitement', couleur: '#1D4ED8' },
]

export const stationsCarte = [
  { id: 'c1', type: 'conforme', libelle: 'Parcelles Assainies', x: 25, y: 30 },
  { id: 'c2', type: 'conforme', libelle: 'Mermoz', x: 60, y: 55 },
  { id: 'c3', type: 'surveiller', libelle: 'Grand Yoff', x: 45, y: 40 },
  { id: 'c4', type: 'signalement', libelle: 'Pikine', x: 35, y: 60 },
  { id: 'c5', type: 'signalement', libelle: 'Thiaroye-sur-Mer', x: 70, y: 70 },
  { id: 'c6', type: 'station', libelle: 'Cambérène — 74% dispo', x: 55, y: 20 },
  { id: 'c7', type: 'station', libelle: 'Pikine — 88% dispo', x: 30, y: 62 },
  { id: 'c8', type: 'station', libelle: 'Rufisque — 65% dispo', x: 20, y: 80 },
  { id: 'c9', type: 'station', libelle: 'Tivaouane Peulh — 58% dispo', x: 75, y: 45 },
  { id: 'c10', type: 'station', libelle: 'Niayes — 96% dispo (alerte)', x: 40, y: 35, alerte: true },
]

/* ------------------------------------------------------------------ */
/*  Vigilance anti-vidange clandestine                                */
/* ------------------------------------------------------------------ */

/** Pré-remplissage du formulaire de signalement citoyen. */
export const signalements = {
  localisation: 'Thiaroye-sur-Mer, zone non autorisée',
  heure: "Aujourd'hui, 14:32",
  preuve: 'preuve_1.jpg',
  placeholderCamion: 'Ex : DK-2234-AB',
  placeholderCommentaire: 'Décrivez ce que vous avez observé',
  confirmation: {
    titre: 'Signalement transmis',
    texte:
      "Votre signalement est en attente de vérification par l'ONAS. Merci de contribuer à un assainissement plus sûr.",
  },
}

/** File d'instruction des alertes côté institution / régulateur. */
export const alertesVerification = [
  {
    id: 'a1',
    type: 'Déviation',
    reference: 'VID-2026-000441',
    detail: 'Camion DK-2234-AB',
    description: 'Sorti du corridor autorisé près de Pikine',
    temps: 'il y a 12 min',
    statut: 'À vérifier',
  },
  {
    id: 'a2',
    type: 'Signalement anonyme',
    categorie: 'Camion en infraction',
    reference: 'Grand Yoff',
    detail: 'Camion en infraction',
    description: 'Photo jointe, camion non identifié',
    temps: 'il y a 47 min',
    statut: 'À vérifier',
  },
  {
    id: 'a3',
    type: 'Signalement anonyme',
    categorie: "Rejet d'eaux usées",
    reference: 'Médina',
    detail: "Rejet d'eaux usées",
    description: 'Écoulement dans le caniveau, photo jointe',
    temps: 'il y a 1h',
    statut: 'À vérifier',
  },
  {
    id: 'a4',
    type: 'Signalement anonyme',
    categorie: 'Vidange non conforme',
    reference: 'Guédiawaye',
    detail: 'Vidange non conforme',
    description: 'Vidange manuelle constatée, localisation jointe',
    temps: 'il y a 2h',
    statut: 'À vérifier',
  },
  {
    id: 'a5',
    type: 'Signalement anonyme',
    categorie: 'Camion en infraction',
    reference: 'Thiaroye-sur-Mer',
    detail: 'Camion en infraction',
    description: 'Vidéo jointe, camion DK-4410-EF',
    temps: 'il y a 2h',
    statut: 'Confirmé',
  },
  {
    id: 'a6',
    type: 'Anomalie de dépotage',
    categorie: 'ANOMALIE_DEPOTAGE',
    reference: 'VID-2026-000452',
    detail: 'Camion DK-7715-C',
    description:
      "Aucun scan de dépotage sous 24 h — 21 000 F gelés en séquestre, aucune répartition n'a eu lieu",
    temps: 'il y a 26h',
    statut: 'À vérifier',
    fondsGeles: 21000,
  },
]

export const operateursFormalises = [
  {
    id: 'f1',
    nom: 'Ibrahima Ndiaye',
    initiales: 'IN',
    chauffeurId: 'ch-1',
    entreprise: 'Ndiaye Assainissement',
    commune: 'Parcelles Assainies',
    statut: 'En formalisation',
    vidanges: 342,
    conformite: 100,
  },
  {
    id: 'f2',
    nom: 'Fatou Ba',
    initiales: 'FB',
    chauffeurId: 'ch-6',
    entreprise: 'Teranga Sanitation',
    commune: 'Dakar Plateau',
    statut: 'Formel',
    vidanges: 401,
    conformite: 98,
  },
  {
    id: 'f3',
    nom: 'Moussa Fall',
    initiales: 'MF',
    chauffeurId: 'ch-3',
    entreprise: 'SEN Vidange Express',
    commune: 'Pikine',
    statut: 'Formel',
    vidanges: 210,
    conformite: 94,
  },
  {
    id: 'f4',
    nom: 'Cheikh Sow',
    initiales: 'CS',
    chauffeurId: 'ch-7',
    entreprise: 'Sow & Frères',
    commune: 'Guédiawaye',
    statut: 'En formalisation',
    vidanges: 96,
    conformite: 82,
  },
  {
    id: 'f5',
    nom: 'Alioune Badara Kane',
    initiales: 'AK',
    chauffeurId: 'ch-8',
    entreprise: 'ABK Vidange',
    commune: 'Rufisque',
    statut: 'Formel',
    vidanges: 188,
    conformite: 96,
  },
  {
    id: 'f6',
    nom: 'Mariama Sy',
    initiales: 'MS',
    chauffeurId: 'ch-9',
    entreprise: 'Sy Assainissement',
    commune: 'Keur Massar',
    statut: 'En formalisation',
    vidanges: 64,
    conformite: 76,
  },
]

export const periodesRapport = [
  '30 derniers jours',
  'Trimestre en cours',
  '12 derniers mois',
  'Année 2026',
]

export const communesRapport = [
  'Toutes les communes',
  'Parcelles Assainies',
  'Pikine',
  'Guédiawaye',
  'Rufisque',
  'Keur Massar',
  'Dakar Plateau',
]

export const modelesRapport = [
  {
    id: 'r1',
    titre: 'Rapport de conformité des dépotages',
    detail: 'Volumes dépotés par station, écarts et alertes de saturation',
    pages: 14,
  },
  {
    id: 'r2',
    titre: 'Suivi de la formalisation des opérateurs',
    detail: 'Statut NINEA, notes clients, volumes traités par opérateur',
    pages: 9,
  },
  {
    id: 'r3',
    titre: 'Couverture territoriale des ménages',
    detail: 'Taux de desserte par commune et zones sous-desservies',
    pages: 11,
  },
  {
    id: 'r4',
    titre: 'Indicateurs bailleurs (ODD 6.3)',
    detail: 'Boues traitées en filière contrôlée, impact sanitaire estimé',
    pages: 18,
  },
]

/* ------------------------------------------------------------------ */
/*  Espace Acheteur — valorisation des sous-produits                  */
/* ------------------------------------------------------------------ */

export const usagesAcheteur = ['Agriculture', 'Travaux routiers/BTP', 'Espaces verts', 'Autre']

export const typesProfilAcheteur = [
  'Agriculteur ou GIE maraîcher',
  'Entreprise BTP (AGEROUTE et attributaires)',
  'Collectivité',
  'Industriel',
]

export const profilAcheteur = {
  raisonSociale: 'GIE Maraîcher des Niayes',
  type: 'Agriculteur ou GIE maraîcher',
  ninea: '005 812 347 2V2',
  contact: 'Awa Sarr — +221 77 845 12 30',
  zone: 'Niayes — Sangalkam / Keur Massar',
  usageDeclare: 'Agriculture',
  initiales: 'GN',
  clientDepuis: 'avril 2026',
}

export const produitsValorisation = [
  {
    id: 'p1',
    nom: 'Amendement organique — boues séchées hygiénisées',
    categorie: 'Amendement organique',
    station: 'Tivaouane Peulh',
    quantite: 12,
    unite: 'tonnes',
    prix: 45000,
    prixUnite: 'FCFA / tonne',
    usages: ['Agriculture', 'Espaces verts'],
    fiche: {
      traitement: 'Séchage sur lits plantés puis hygiénisation (60 jours)',
      matiereSeche: '78 %',
      azote: '1,9 % N',
      phosphore: '1,2 % P₂O₅',
      coliformes: 'Conforme — < 1 000 UFC/g',
      normes: 'Conforme norme NS 05-061 (réutilisation agricole)',
      conditionnement: 'Vrac ou sacs de 50 kg',
    },
  },
  {
    id: 'p2',
    nom: 'Amendement organique — compost affiné',
    categorie: 'Amendement organique',
    station: 'Cambérène',
    quantite: 6,
    unite: 'tonnes',
    prix: 52000,
    prixUnite: 'FCFA / tonne',
    usages: ['Agriculture', 'Espaces verts'],
    fiche: {
      traitement: 'Compostage en andains, criblage 10 mm',
      matiereSeche: '82 %',
      azote: '2,3 % N',
      phosphore: '1,5 % P₂O₅',
      coliformes: 'Conforme — < 1 000 UFC/g',
      normes: 'Conforme norme NS 05-061 (réutilisation agricole)',
      conditionnement: 'Sacs de 50 kg',
    },
  },
  {
    id: 'p3',
    nom: 'Eau traitée non potable',
    categorie: 'Eau traitée',
    station: 'Tivaouane Peulh',
    quantite: 340,
    unite: 'm³',
    prix: 800,
    prixUnite: 'FCFA / m³',
    usages: ['Travaux routiers/BTP', 'Espaces verts'],
    fiche: {
      traitement: 'Lagunage + filtration — usage non potable',
      dbo5: '< 25 mg/L',
      mes: '< 30 mg/L',
      coliformes: 'Conforme — < 1 000 UFC/100 mL',
      normes: 'Conforme norme NS 05-061 (réutilisation non potable)',
      conditionnement: 'Pompage citerne sur site',
    },
  },
  {
    id: 'p4',
    nom: 'Eau traitée non potable — compactage de chaussée',
    categorie: 'Eau traitée',
    station: 'Rufisque',
    quantite: 180,
    unite: 'm³',
    prix: 750,
    prixUnite: 'FCFA / m³',
    usages: ['Travaux routiers/BTP', 'Autre'],
    fiche: {
      traitement: 'Lagunage — usage travaux publics uniquement',
      dbo5: '< 30 mg/L',
      mes: '< 35 mg/L',
      coliformes: 'Conforme — < 1 000 UFC/100 mL',
      normes: 'Usage BTP — arrosage et compactage',
      conditionnement: 'Pompage citerne sur site',
    },
  },
]

/** Commission plateforme prélevée sur chaque commande de sous-produits. */
export const commissionCommande = 500

export const statutsCommande = ['SOUMISE', 'ACCEPTÉE', 'PRÊTE', 'ENLEVÉE', 'PAYÉE']

export const modesRetrait = ['Enlèvement', 'Livraison']

export const commandesAcheteur = [
  {
    id: 'CMD-2026-0148',
    produit: 'Amendement organique — boues séchées hygiénisées',
    station: 'Tivaouane Peulh',
    quantite: 5,
    unite: 'tonnes',
    montant: 225000,
    date: '12 août 2026',
    retrait: 'Enlèvement',
    paiement: 'Wave',
    statut: 'ENLEVÉE',
    usage: 'Agriculture',
    traitement: 'Séchage sur lits plantés puis hygiénisation (60 jours)',
  },
  {
    id: 'CMD-2026-0131',
    produit: 'Eau traitée non potable',
    station: 'Tivaouane Peulh',
    quantite: 120,
    unite: 'm³',
    montant: 96000,
    date: '28 juillet 2026',
    retrait: 'Livraison',
    paiement: 'Virement',
    statut: 'PAYÉE',
    usage: 'Travaux routiers/BTP',
    traitement: 'Lagunage + filtration — usage non potable',
  },
  {
    id: 'CMD-2026-0119',
    produit: 'Amendement organique — compost affiné',
    station: 'Cambérène',
    quantite: 3,
    unite: 'tonnes',
    montant: 156000,
    date: '09 juillet 2026',
    retrait: 'Enlèvement',
    paiement: 'Orange Money',
    statut: 'PAYÉE',
    usage: 'Agriculture',
    traitement: 'Compostage en andains, criblage 10 mm',
  },
]
