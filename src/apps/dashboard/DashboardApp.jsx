import { useState } from 'react'
import {
  LayoutDashboard,
  Map,
  Factory,
  Users,
  FileBarChart,
  Building2,
  ArrowLeft,
  Bell,
  CalendarDays,
} from 'lucide-react'
import { Wordmark } from '../../components/ui'
import LoginInstitution from './LoginInstitution.jsx'
import Overview from './Overview.jsx'
import MapRegion from './MapRegion.jsx'
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

  if (!institution) return <LoginInstitution onEntrer={setInstitution} />

  const actif = MENU.find((m) => m.id === vue)
  const vues = {
    overview: <Overview />,
    carte: <MapRegion />,
    stations: <StationsView />,
    operateurs: <OperateursView />,
    rapports: <Rapports />,
  }

  return (
    <div className="flex h-screen bg-cream">
      {/* Barre latérale */}
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

        <div className="rounded-2xl bg-white/10 p-4">
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

      {/* Contenu */}
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
                  {institution.nom.slice(0, 2).toUpperCase()}
                </span>
                <span className="text-[12.5px] font-semibold">{institution.nom}</span>
              </span>
            </div>
          </div>
        </header>

        <div key={vue} className="animate-fade-in px-8 pb-10 pt-6">{vues[vue]}</div>
      </main>
    </div>
  )
}
