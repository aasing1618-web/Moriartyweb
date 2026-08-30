import { useState } from 'react'
import {
  LayoutDashboard,
  Map,
  ShieldAlert,
  Calculator,
  Factory,
  Users,
  FileBarChart,
  Building2,
  ArrowLeft,
  Bell,
  CalendarDays,
  Menu,
  X,
} from 'lucide-react'
import { Wordmark } from '../../components/ui'
import LoginInstitution from './LoginInstitution.jsx'
import Overview from './Overview.jsx'
import MapRegion from './MapRegion.jsx'
import Verification from './Verification.jsx'
import Tarification from './Tarification.jsx'
import StationsView from './StationsView.jsx'
import OperateursView from './OperateursView.jsx'
import Rapports from './Rapports.jsx'

const MENU = [
  {
    id: 'overview',
    label: 'Vue d’ensemble',
    icon: LayoutDashboard,
    titre: 'Vue d’ensemble',
    sousTitre: 'Indicateurs consolidés de la filière boues de vidange',
  },
  {
    id: 'carte',
    label: 'Carte régionale',
    icon: Map,
    titre: 'Carte régionale temps réel',
    sousTitre: 'Vidanges en cours, dépotages confirmés et zones à risque',
  },
  {
    id: 'signalements',
    label: 'Signalements',
    icon: ShieldAlert,
    titre: 'Signalements',
    sousTitre: 'Déviations de trajet et signalements citoyens à instruire',
  },
  {
    id: 'tarification',
    label: 'Tarification',
    icon: Calculator,
    titre: 'Tarification & répartition',
    sousTitre: 'Formule de calcul et clé de répartition de la redevance',
  },
  {
    id: 'stations',
    label: 'Stations',
    icon: Factory,
    titre: 'Stations de traitement',
    sousTitre: 'Capacité, charge et alertes de saturation',
  },
  {
    id: 'operateurs',
    label: 'Opérateurs',
    icon: Users,
    titre: 'Opérateurs formalisés',
    sousTitre: 'Registre des vidangeurs et suivi de la formalisation',
  },
  {
    id: 'rapports',
    label: 'Rapports',
    icon: FileBarChart,
    titre: 'Rapports',
    sousTitre: 'Génération et export des restitutions institutionnelles',
  },
]

export default function DashboardApp({ onRetour }) {
  const [institution, setInstitution] = useState(null)
  const [vue, setVue] = useState('overview')
  const [menuOuvert, setMenuOuvert] = useState(false)

  if (!institution) return <LoginInstitution onEntrer={setInstitution} />

  const actif = MENU.find((m) => m.id === vue)
  const vues = {
    overview: <Overview />,
    carte: <MapRegion />,
    signalements: <Verification />,
    tarification: <Tarification />,
    stations: <StationsView />,
    operateurs: <OperateursView />,
    rapports: <Rapports />,
  }

  return (
    <div className="flex h-screen bg-cream overflow-hidden">
      {/* Overlay Mobile */}
      {menuOuvert && (
        <div
          className="fixed inset-0 z-40 bg-navy/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMenuOuvert(false)}
        />
      )}

      {/* Barre latérale */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[264px] shrink-0 flex-col bg-navy px-5 py-6 text-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          menuOuvert ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between">
          <Wordmark size={36} tone="white" />
          <button
            onClick={() => setMenuOuvert(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="mt-8 flex-1 space-y-1.5 overflow-y-auto no-scrollbar">
          {MENU.map((m) => {
            const Icon = m.icon
            const estActif = m.id === vue
            return (
              <button
                key={m.id}
                onClick={() => {
                  setVue(m.id)
                  setMenuOuvert(false)
                }}
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

        <div className="mt-4 rounded-2xl bg-white/10 p-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
              <Building2 size={17} strokeWidth={2.2} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-bold">{institution.nom}</p>
              <p className="truncate text-[10.5px] text-white/60">Accès institutionnel</p>
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

      {/* Contenu principal */}
      <main className="min-w-0 flex-1 overflow-y-auto">
        <header className="sticky top-0 z-30 border-b border-navy/[0.07] bg-cream/85 px-4 sm:px-8 py-3.5 sm:py-5 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setMenuOuvert(true)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-navy/[0.08] bg-white text-navy shadow-card lg:hidden"
              >
                <Menu size={20} strokeWidth={2.2} />
              </button>
              <div className="min-w-0">
                <h1 className="truncate text-[18px] sm:text-[24px] font-extrabold leading-tight tracking-[-0.02em] text-navy">
                  {actif.titre}
                </h1>
                <p className="truncate mt-0.5 text-[11.5px] sm:text-[13px] text-slateink">{actif.sousTitre}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <span className="hidden sm:flex items-center gap-2 rounded-2xl border border-navy/[0.08] bg-white px-3.5 py-2.5 text-[12.5px] font-semibold text-navy shadow-card">
                <CalendarDays size={15} className="text-teal" strokeWidth={2.2} />
                14 août 2026
              </span>
              <button className="relative flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-2xl border border-navy/[0.08] bg-white text-navy shadow-card transition hover:bg-navy-50">
                <Bell size={16} strokeWidth={2.2} />
                <span className="absolute right-2 top-2 sm:right-3 sm:top-3 h-2 w-2 rounded-full bg-danger ring-2 ring-white" />
              </button>
              <span className="flex h-9 sm:h-11 items-center gap-2.5 rounded-2xl bg-navy px-3 sm:px-3.5 text-white shadow-lift">
                <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-white/15 text-[10px] sm:text-[11px] font-bold">
                  {institution.nom.slice(0, 2).toUpperCase()}
                </span>
                <span className="text-[11.5px] sm:text-[12.5px] font-semibold truncate max-w-[100px] sm:max-w-none">{institution.nom}</span>
              </span>
            </div>
          </div>
        </header>

        <div key={vue} className="animate-fade-in px-4 sm:px-8 pb-10 pt-4 sm:pt-6">{vues[vue]}</div>
      </main>
    </div>
  )
}
