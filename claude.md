# CLAUDE.md

Instructions persistantes pour ce projet. Lues automatiquement par Claude Code au
début de chaque session — ne pas dupliquer ce contenu dans le chat.

## Contexte du projet

- **AssainiTrack** : plateforme sénégalaise de traçabilité et de dispatching de la
  vidange des boues de fosses septiques (Dakar). Trois interfaces : ménages,
  opérateurs/vidangeurs, tableau de bord institutionnel (ONAS / communes).
- Ce dépôt contient une **maquette de pitch pour un hackathon (Govathon)**, pas le
  produit réel. Public : un jury, présentation sur ordinateur portable.
- Positionnement produit réel (pour toute copy/texte que tu écris) : AssainiTrack se
  présente comme complémentaire à l'outil public existant de l'ONAS ("Ma Vidange"),
  pas comme un concurrent — garde ce ton dans tous les textes générés.

## Contrainte absolue — ne jamais l'oublier

**Ceci est une maquette cliquable, pas un produit.** Aucune logique fonctionnelle réelle.

- Pas de backend, pas de base de données, pas de `.env`, pas de clé d'API.
- Pas de vraie authentification : un clic sur "Continuer" avance toujours à l'écran
  suivant, quel que soit le contenu du champ.
- Pas de vraie carte (pas de Mapbox/Google Maps, pas de clé requise) : fond de carte
  simulé en CSS/SVG, marqueurs en `absolute`.
- Pas de vrai paiement, pas de vrai scan QR : tout est simulé avec `useState` +
  `setTimeout`/transitions CSS.
- Pas de tests, pas de CI/CD, pas de configuration de déploiement.
- Si une fonctionnalité manque de contenu, invente la donnée la plus simple et
  continue — ne t'arrête jamais pour demander une précision mineure.

## Stack technique

- Vite + React + Tailwind CSS. Un seul projet, lancé avec `npm run dev`.
- Icônes : `lucide-react`. Graphiques (dashboard uniquement) : `recharts`.
- Police : Poppins, installée via `@fontsource/poppins` (poids 400/500/600/700/800) —
  cohérence avec le dossier de présentation déjà produit pour ce projet.
- N'ajoute pas d'autre dépendance sans raison forte. Pas de react-router : la
  navigation entre écrans se fait par `useState("nomEcran")`.

## Structure du projet

```
src/
  data/mockData.js      # toute donnée fictive centralisée ici, jamais dupliquée
  components/ui/         # Button, Card, Badge, StatCard, PhoneFrame, etc.
  apps/menage/            # écrans app ménages
  apps/operateur/         # écrans app opérateurs
  apps/dashboard/         # écrans tableau de bord institutionnel
  App.jsx                 # sélecteur de démo (3 cartes) + routage par état
```

## Charte graphique

Identique au dossier de présentation PDF déjà livré — toujours réutiliser ces valeurs,
ne jamais en improviser d'autres :

| Rôle | Couleur |
|---|---|
| Navy (primaire, texte titres) | `#16324A` |
| Teal (accent) | `#0E7C7B` |
| Amber (accent chaud, CTA, badges) | `#E1863B` |
| Fond clair | `#FAF8F4` |
| Carte / bloc gris clair | `#F2F4F2` |
| Texte secondaire | `#5B6B72` |
| Succès | `#1E9E63` · Alerte | `#E0A200` · Danger | `#D64545` |

- Cartes arrondies (`rounded-2xl`), ombres douces, beaucoup d'espace blanc.
- Icônes plutôt que photos. Pas de photos à télécharger.
- Français partout. FCFA au format `20 000 FCFA`. Téléphone `+221 77 XXX XX XX`.
- Les apps Ménages et Opérateurs s'affichent dans un **cadre de téléphone**
  (~375×812px, coins arrondis, encoche) centré sur fond clair. Le dashboard
  institutionnel est en plein écran desktop.

## Les trois expériences à construire

Écran d'accueil (`App.jsx`) : logo + slogan, 3 cartes cliquables vers chaque app,
bouton "← Retour au sélecteur" toujours visible dans chaque app.

**App Ménages** (persona : Aminata Diop, Parcelles Assainies U24) : Onboarding (3
slides) → Connexion → Accueil → Configurateur de réservation → Liste opérateurs →
Suivi temps réel (étapes animées) → Paiement (Wave/Orange Money/Espèces) →
Confirmation (QR factice) → Historique → Profil.

**App Opérateurs** (persona : Ibrahima Ndiaye, en cours de formalisation) : Connexion
→ Demandes à proximité → Détail demande → Navigation collecte → Vidange en cours →
Orientation vers station recommandée → Scan dépotage (caméra factice) → Revenus &
historique → Badge conformité / micro-crédit → Profil.

**Dashboard institutionnel** : Connexion (ONAS / Commune de Rufisque / Bailleur) →
Vue d'ensemble (4 KPI + graphique 12 mois) → Carte régionale temps réel → 5 stations
de traitement avec jauges → Opérateurs formalisés (tableau) → Rapports (filtre +
export factice).

## Données de démonstration (à mettre dans `src/data/mockData.js`)

- KPI dashboard : 12 400 vidanges tracées · 87 % de dépotage conforme · 156 opérateurs
  actifs · 8 200 ménages actifs.
- Stations (nom → % de capacité résiduelle) : Cambérène 74 % · Pikine 88 % ·
  Rufisque 65 % · Tivaouane Peulh 58 % · **Niayes 96 % — afficher en alerte rouge**.
- Prix indicatif d'une vidange : 20 000 à 25 000 FCFA.

## Définition de "terminé"

- Les 3 expériences sont accessibles depuis l'écran de sélection ; tous les écrans
  listés ci-dessus sont atteignables par clics, sans écran vide ni erreur.
- `npm install && npm run dev` suffit, sans variable d'environnement.
- Rendu visuellement cohérent (couleurs, espacements, typographie) sur les 3 apps.

## Ne jamais faire

Ajouter un backend · écrire des tests · configurer un déploiement · demander une
clé d'API · appeler un vrai service réseau · casser la contrainte "non-fonctionnel"
même si une demande future semble impliquer une vraie logique — dans ce cas, simule
toujours le résultat plutôt que de l'implémenter.