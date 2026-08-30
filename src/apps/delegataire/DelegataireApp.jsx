import { useState } from 'react'
import {
  LayoutDashboard,
  Truck,
  Droplets,
  Coins,
  ShoppingBag,
  Settings,
  Building2,
  ArrowLeft,
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock,
  Package,
  Sparkles,
  TrendingUp,
  BarChart3,
} from 'lucide-react'
import { Wordmark, Card, SectionTitle, Badge, Button } from '../../components/ui'

const MENU = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    titre: 'Tableau de bord — Station Tivaouane Peulh',
    sousTitre: 'Suivi de l’exploitation, des arrivées et de la valorisation des sous-produits (Delvic)',
  },
  {
    id: 'arrivees',
    label: 'Arrivées camions',
    icon: Truck,
    titre: 'Journal des arrivées camions',
    sousTitre: 'Suivi en temps réel des dépotages et camions en route',
  },
  {
    id: 'volumes',
    label: 'Volumes traités',
    icon: Droplets,
    titre: 'Volumes de boues traités',
    sousTitre: 'Historique des volumes reçus et capacité de traitement de la station',
  },
  {
    id: 'revenus',
    label: 'Revenus',
    icon: Coins,
    titre: 'Revenus de la station',
    sousTitre: 'Part délégataire (25%) collectée sur les dépotages tracés',
  },
  {
    id: 'valorisation',
    label: 'Commandes & valorisation',
    icon: ShoppingBag,
    titre: 'Commandes & valorisation des sous-produits',
    sousTitre: 'Gestion des stocks de compost, d’eau traitée et suivi des ventes',
  },
  {
    id: 'parametres',
    label: 'Paramètres',
    icon: Settings,
    titre: 'Paramètres de la station',
    sousTitre: 'Configuration des potences de dépotage et horaires d’ouverture',
  },
]

export default function DelegataireApp({ onRetour }) {
  const [vue, setVue] = useState('dashboard')

  const actif = MENU.find((m) => m.id === vue)

  // Arrivées camions
  const arriveesCamions = [
    { id: 'AT-024', heure: '10:42', volume: '5 m³', statut: 'Vérifié', ton: 'success' },
    { id: 'AT-018', heure: '10:31', volume: '7 m³', statut: 'Vérifié', ton: 'success' },
    { id: 'AT-041', heure: 'En route', volume: 'ETA 8 min', statut: 'En route', ton: 'warning' },
  ]

  // Stocks valorisés
  const stocksValorises = [
    {
      produit: 'Compost / urée agricole',
      quantite: '12 tonnes disponibles',
      prix: '45 000 FCFA/tonne',
      badge: 'Stock disponible',
      tone: 'teal',
    },
    {
      produit: 'Eau traitée (usage non potable, travaux routiers)',
      quantite: '340 m³ disponibles',
      prix: '800 FCFA/m³',
      badge: 'Prêt au pompage',
      tone: 'royal',
    },
  ]

  // Commandes
  const commandes = [
    {
      client: 'Coopérative maraîchère des Niayes',
      produit: 'Compost',
      quantite: '5 tonnes',
      statut: 'En attente',
      tone: 'warning',
    },
    {
      client: 'AGEROUTE',
      produit: 'Eau traitée',
      quantite: '120 m³',
      statut: 'Confirmée',
      tone: 'success',
    },
    {
      client: 'Exploitation agricole de Sangalkam',
      produit: 'Compost',
      quantite: '3 tonnes',
      statut: 'Livrée',
      tone: 'teal',
    },
  ]

  return (
    <div className="flex h-screen bg-cream">
      {/* Sidebar Navy */}
      <aside className="flex w-[264px] shrink-0 flex-col bg-navy px-5 py-6 text-white">
        <Wordmark size={36} tone="white" />

        <nav className="mt-9 flex-1 space-y-1.5">
          {MENU.map((m) => {
            const Icon = m.icon
            const estActif = m.id === vue
            return (
              <button
                key={m.id}
                onClick={() => setVue(m.id)}
                className={`flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-left text-[13.5px] font-semibold transition ${
                  estActif
                    ? 'bg-white text-navy shadow-lift'
                    : 'text-white/65 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={18} strokeWidth={2.2} />
                {m.label}
              </button>
            )
          })}
        </nav>

        {/* Persona Délégataire badge */}
        <div className="rounded-2xl bg-white/10 p-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
              <Building2 size={17} strokeWidth={2.2} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[12.5px] font-bold">Station Tivaouane Peulh</p>
              <p className="truncate text-[10.5px] text-white/60">Exploité par Delvic</p>
            </div>
          </div>
        </div>

        <button
          onClick={onRetour}
          className="mt-3 flex items-center justify-center gap-2 rounded-2xl border border-white/15 py-2.5 text-[12.5px] font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft size={15} strokeWidth={2.3} />
          Retour au sélecteur
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="min-w-0 flex-1 overflow-y-auto">
        <header className="sticky top-0 z-30 border-b border-navy/[0.07] bg-cream/85 px-8 py-5 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-[24px] font-extrabold leading-tight tracking-[-0.02em] text-navy">
                {actif.titre}
              </h1>
              <p className="mt-0.5 text-[13px] text-slateink">{actif.sousTitre}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 rounded-2xl border border-navy/[0.08] bg-white px-3.5 py-2.5 text-[12.5px] font-semibold text-navy shadow-card">
                <CalendarDays size={15} className="text-teal" strokeWidth={2.2} />
                14 août 2026
              </span>

              <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-navy/[0.08] bg-white text-navy shadow-card transition hover:bg-navy-50">
                <Bell size={17} strokeWidth={2.2} />
                <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-danger ring-2 ring-white" />
              </button>

              <span className="flex h-11 items-center gap-2.5 rounded-2xl bg-navy px-3.5 text-white shadow-lift">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 text-[11px] font-bold">
                  DE
                </span>
                <span className="text-[12.5px] font-semibold">Délégataire — Delvic</span>
              </span>
            </div>
          </div>
        </header>

        <div key={vue} className="animate-fade-in px-8 pb-10 pt-6 space-y-6">
          {/* Top KPI Cards (visible on Dashboard or across overview) */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="!p-6">
              <p className="text-[12px] font-semibold uppercase tracking-wide text-slateink">
                Camions reçus aujourd'hui
              </p>
              <p className="mt-2 text-[32px] font-extrabold leading-none text-navy">22</p>
              <p className="mt-2 flex items-center gap-1 text-[12px] font-semibold text-teal">
                <TrendingUp size={14} /> +3 par rapport à hier
              </p>
            </Card>

            <Card className="!p-6">
              <p className="text-[12px] font-semibold uppercase tracking-wide text-slateink">
                Volume traité aujourd'hui
              </p>
              <p className="mt-2 text-[32px] font-extrabold leading-none text-navy">96 m³</p>
              <p className="mt-2 text-[12px] text-slateink">Dépotage conforme aux normes</p>
            </Card>

            <Card className="!p-6">
              <p className="text-[12px] font-semibold uppercase tracking-wide text-slateink">
                Revenus du jour (part délégataire)
              </p>
              <p className="mt-2 text-[26px] font-extrabold leading-none text-teal">187 500 FCFA</p>
              <p className="mt-2 text-[12px] text-slateink">25 % de redevance dépotage</p>
            </Card>

            <Card className="!p-6">
              <p className="text-[12px] font-semibold uppercase tracking-wide text-slateink">
                Capacité résiduelle station
              </p>
              <p className="mt-2 text-[32px] font-extrabold leading-none text-royal">58 %</p>
              <p className="mt-2 text-[12px] text-slateink">Station en état de fonctionnement optimal</p>
            </Card>
          </div>

          {/* VUE: DASHBOARD ou ARRIVÉES CAMIONS */}
          {(vue === 'dashboard' || vue === 'arrivees') && (
            <Card className="!p-6">
              <SectionTitle
                action={
                  <Badge tone="teal" icon={Truck}>
                    Mise à jour en temps réel
                  </Badge>
                }
              >
                Arrivées camions
              </SectionTitle>

              <div className="mt-4 space-y-3">
                {arriveesCamions.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-3 rounded-2xl border border-navy/[0.07] bg-cream p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          item.statut === 'Vérifié'
                            ? 'bg-teal/10 text-teal'
                            : 'bg-amber/12 text-amber-600'
                        }`}
                      >
                        <Truck size={18} strokeWidth={2.2} />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[14px] font-extrabold text-navy">{item.id}</span>
                          <span className="text-[12.5px] text-slateink">· {item.heure}</span>
                        </div>
                        <p className="text-[12px] font-medium text-slateink">Volume : {item.volume}</p>
                      </div>
                    </div>

                    <Badge tone={item.ton} icon={item.statut === 'Vérifié' ? CheckCircle2 : Clock}>
                      {item.statut}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* VUE: COMMANDES & VALORISATION (Demande 4) */}
          {(vue === 'dashboard' || vue === 'valorisation') && (
            <div className="space-y-6">
              {/* Bloc 1 : Stock valorisé disponible */}
              <div className="space-y-3">
                <h3 className="text-[17px] font-bold text-navy">Stock valorisé disponible</h3>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {stocksValorises.map((s) => (
                    <Card key={s.produit} className="!p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <Badge tone={s.tone} icon={Package}>
                            {s.badge}
                          </Badge>
                          <span className="text-[15px] font-extrabold text-teal">{s.prix}</span>
                        </div>
                        <h4 className="mt-4 text-[17px] font-bold text-navy">{s.produit}</h4>
                      </div>

                      <div className="mt-6 flex items-center justify-between border-t border-navy/[0.06] pt-4">
                        <span className="text-[13px] font-medium text-slateink">Quantité en réserve</span>
                        <span className="text-[16px] font-extrabold text-navy">{s.quantite}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Bloc 2 : Commandes */}
              <Card className="!p-6">
                <SectionTitle
                  action={
                    <Badge tone="neutral" icon={ShoppingBag}>
                      3 commandes actives
                    </Badge>
                  }
                >
                  Commandes
                </SectionTitle>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-[13.5px]">
                    <thead>
                      <tr className="border-b border-navy/[0.08] bg-mist/70 text-[11.5px] font-bold uppercase tracking-wider text-slateink">
                        <th className="py-3 px-4 rounded-l-xl">Client</th>
                        <th className="py-3 px-4">Produit</th>
                        <th className="py-3 px-4">Quantité</th>
                        <th className="py-3 px-4 rounded-r-xl">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-navy/[0.06]">
                      {commandes.map((cmd) => (
                        <tr key={cmd.client} className="hover:bg-mist/30 transition">
                          <td className="py-4 px-4 font-bold text-navy">{cmd.client}</td>
                          <td className="py-4 px-4 font-medium text-slateink">{cmd.produit}</td>
                          <td className="py-4 px-4 font-semibold text-navy">{cmd.quantite}</td>
                          <td className="py-4 px-4">
                            <Badge tone={cmd.tone} size="sm">
                              {cmd.statut}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* VUE: VOLUMES TRAITÉES */}
          {vue === 'volumes' && (
            <Card className="!p-6 space-y-4">
              <SectionTitle icon={BarChart3}>Analyse des volumes de boues de vidange</SectionTitle>
              <p className="text-[13px] text-slateink">
                Historique quotidien des dépotages à la station de Tivaouane Peulh. La capacité maximale quotidienne est fixée à 165 m³.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="rounded-2xl bg-mist p-4">
                  <p className="text-[11.5px] font-semibold text-slateink uppercase">Capacité max/jour</p>
                  <p className="mt-1 text-[22px] font-extrabold text-navy">165 m³</p>
                </div>
                <div className="rounded-2xl bg-mist p-4">
                  <p className="text-[11.5px] font-semibold text-slateink uppercase">Moyenne 7 jours</p>
                  <p className="mt-1 text-[22px] font-extrabold text-teal">92 m³/j</p>
                </div>
                <div className="rounded-2xl bg-mist p-4">
                  <p className="text-[11.5px] font-semibold text-slateink uppercase">Taux d'utilisation</p>
                  <p className="mt-1 text-[22px] font-extrabold text-royal">58 %</p>
                </div>
              </div>
            </Card>
          )}

          {/* VUE: REVENUS */}
          {vue === 'revenus' && (
            <Card className="!p-6 space-y-4">
              <SectionTitle icon={Coins}>Historique des revenus de redevance</SectionTitle>
              <p className="text-[13px] text-slateink">
                Part délégataire de 25% prélevée automatiquement via l'application sur chaque transaction de vidange tracée.
              </p>
              <div className="rounded-2xl border border-navy/[0.08] bg-white p-5">
                <div className="flex justify-between items-center border-b border-navy/[0.06] pb-3">
                  <span className="text-[13px] font-medium text-slateink">Cumul du mois en cours</span>
                  <span className="text-[18px] font-extrabold text-teal">3 945 000 FCFA</span>
                </div>
                <div className="flex justify-between items-center pt-3">
                  <span className="text-[13px] font-medium text-slateink">Revenus aujourd'hui (22 camions)</span>
                  <span className="text-[18px] font-extrabold text-navy">187 500 FCFA</span>
                </div>
              </div>
            </Card>
          )}

          {/* VUE: PARAMÈTRES */}
          {vue === 'parametres' && (
            <Card className="!p-6 space-y-4">
              <SectionTitle icon={Settings}>Configuration de la station</SectionTitle>
              <div className="space-y-3">
                <div className="flex justify-between items-center rounded-2xl bg-mist p-4 text-[13px]">
                  <span className="font-semibold text-navy">Nombre de potences de dépotage actives</span>
                  <span className="font-bold text-teal">4 potences</span>
                </div>
                <div className="flex justify-between items-center rounded-2xl bg-mist p-4 text-[13px]">
                  <span className="font-semibold text-navy">Horaires d'ouverture</span>
                  <span className="font-bold text-navy">06h00 — 20h00</span>
                </div>
                <div className="flex justify-between items-center rounded-2xl bg-mist p-4 text-[13px]">
                  <span className="font-semibold text-navy">Délégation d'exploitation</span>
                  <span className="font-bold text-royal">Delvic Sanitation Senegal</span>
                </div>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
