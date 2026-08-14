# AssainiTrack — maquette de démonstration (Govathon 2026)

Maquette visuelle **cliquable** de la plateforme AssainiTrack : traçabilité et dispatching de la
vidange des boues de fosses septiques à Dakar. Trois expériences dans un seul projet.

> Maquette de pitch, **pas un produit** : aucun backend, aucune base de données, aucune clé d’API,
> aucun appel réseau. Toutes les données sont fictives et centralisées dans `src/data/mockData.js`.
> Les animations (camion, scan QR, remplissage de cuve, paiement) sont simulées avec `useState`,
> `setTimeout` et des transitions CSS.

## Lancer la démo

```bash
npm install
npm run dev
```

## Parcours de démonstration

L’écran d’accueil propose trois cartes. Un bouton **« ← Retour au sélecteur »** reste accessible en
permanence dans chaque expérience.

**Application Ménages** — Aminata Diop, Parcelles Assainies U24
Onboarding (3 slides) → Connexion → Code SMS → Accueil → Réservation → Opérateurs disponibles →
Suivi temps réel *(les étapes avancent seules)* → Paiement → Confirmation + reçu QR → Historique →
Profil.

**Application Opérateurs** — Ibrahima Ndiaye, en cours de formalisation
Connexion → Demandes à proximité → Détail demande → Navigation → Vidange en cours *(minuteur)* →
Orientation vers la station → Scan de dépotage → Revenus → Conformité & micro-crédit → Profil.

**Tableau de bord ONAS / Communes** — plein écran desktop
Connexion (ONAS / Commune de Rufisque / Bailleur) → Vue d’ensemble (4 KPI + 12 mois) →
Carte régionale temps réel → Stations de traitement → Opérateurs formalisés → Rapports
*(l’export affiche une confirmation visuelle, aucun fichier n’est généré)*.

## Structure

```
src/
  data/mockData.js      données fictives (personas, opérateurs, stations, KPI…)
  components/ui/        Button, Card, Badge, StatCard, PhoneFrame, MapCanvas, Gauge, QrCode…
  apps/menage/          écrans de l’application ménages
  apps/operateur/       écrans de l’application opérateurs
  apps/dashboard/       écrans du tableau de bord institutionnel
  App.jsx               sélecteur de démo + routage par état
```

Stack : Vite · React 18 · Tailwind CSS · lucide-react · recharts · Poppins (@fontsource).
Les cartes sont dessinées en SVG/CSS — aucun service cartographique n’est utilisé.
