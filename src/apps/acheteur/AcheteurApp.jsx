import { useState } from 'react'
import {
  ShoppingBag,
  ClipboardList,
  History,
  UserCircle2,
  ArrowLeft,
  Bell,
  CalendarDays,
  Menu,
  X,
} from 'lucide-react'
import { Wordmark } from '../../components/ui'
import { profilAcheteur } from '../../data/mockData'
import Catalogue from './Catalogue.jsx'
import NouvelleCommande from './NouvelleCommande.jsx'
import HistoriqueCommandes from './HistoriqueCommandes.jsx'
import ProfilAcheteur from './ProfilAcheteur.jsx'

const MENU = [
  {
    id: 'catalogue',
    label: 'Catalogue',
    icon: ShoppingBag,
    titre: 'Catalogue des sous-produits',
    sousTitre: 'Amendement organique et eau traitée disponibles en station',
  },
  {
    id: 'commande',
    label: 'Passer commande',
    icon: ClipboardList,
    titre: 'Nouvelle commande',
    sousTitre: 'Produit, quantité, station, date, retrait et paiement',
  },
  {
    id: 'historique',
    label: 'Mes commandes',
    icon: History,
    titre: 'Historique des commandes',
    sousTitre: 'Suivi des statuts et bordereaux de conformité téléchargeables',
  },
  {
    id: 'profil',
    label: 'Profil',
    icon: UserCircle2,
    titre: 'Profil acheteur',
    sousTitre: 'Raison sociale, NINEA, contact, zone et usage déclaré',
  },
]

export default function AcheteurApp({ onRetour }) {
  const [vue, setVue] = useState('catalogue')
  const [menuOuvert, setMenuOuvert] = useState(false)
  const [produitChoisi, setProduitChoisi] = useState(null)

  const actif = MENU.find((m) => m.id === vue)

  const commander = (produit) => {
    setProduitChoisi(produit)
    setVue('commande')
  }

  const vues = {
    catalogue: <Catalogue onCommander={commander} />,
    commande: (
      <NouvelleCommande produitInitial={produitChoisi} onTerminee={() => setVue('historique')} />
    ),
    historique: <HistoriqueCommandes />,
    profil: <ProfilAcheteur />,
  }

  return (
    <div className="flex h-screen overflow-hidden bg-cream">
      {/* Overlay mobile */}
      {menuOuvert && (
        <div
          className="fixed inset-0 z-40 bg-navy/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMenuOuvert(false)}
        />
      )}

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

        <nav className="no-scrollbar mt-8 flex-1 space-y-1.5 overflow-y-auto">
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
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-[11px] font-bold">
              {profilAcheteur.initiales}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[12.5px] font-bold">{profilAcheteur.raisonSociale}</p>
              <p className="truncate text-[10.5px] text-white/60">Acheteur de sous-produits</p>
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

      <main className="min-w-0 flex-1 overflow-y-auto">
        <header className="sticky top-0 z-30 border-b border-navy/[0.07] bg-cream/85 px-4 py-3.5 backdrop-blur sm:px-8 sm:py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <button
                onClick={() => setMenuOuvert(true)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-navy/[0.08] bg-white text-navy shadow-card lg:hidden"
              >
                <Menu size={20} strokeWidth={2.2} />
              </button>
              <div className="min-w-0">
                <h1 className="truncate text-[18px] font-extrabold leading-tight tracking-[-0.02em] text-navy sm:text-[24px]">
                  {actif.titre}
                </h1>
                <p className="mt-0.5 truncate text-[11.5px] text-slateink sm:text-[13px]">
                  {actif.sousTitre}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <span className="hidden items-center gap-2 rounded-2xl border border-navy/[0.08] bg-white px-3.5 py-2.5 text-[12.5px] font-semibold text-navy shadow-card sm:flex">
                <CalendarDays size={15} className="text-teal" strokeWidth={2.2} />
                14 août 2026
              </span>

              <button className="relative flex h-9 w-9 items-center justify-center rounded-2xl border border-navy/[0.08] bg-white text-navy shadow-card transition hover:bg-navy-50 sm:h-11 sm:w-11">
                <Bell size={16} strokeWidth={2.2} />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-success ring-2 ring-white sm:right-3 sm:top-3" />
              </button>

              <span className="flex h-9 items-center gap-2.5 rounded-2xl bg-navy px-3 text-white shadow-lift sm:h-11 sm:px-3.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/15 text-[10px] font-bold sm:h-7 sm:w-7 sm:text-[11px]">
                  {profilAcheteur.initiales}
                </span>
                <span className="max-w-[110px] truncate text-[11.5px] font-semibold sm:max-w-none sm:text-[12.5px]">
                  {profilAcheteur.raisonSociale}
                </span>
              </span>
            </div>
          </div>
        </header>

        <div key={vue} className="animate-fade-in px-4 pb-10 pt-4 sm:px-8 sm:pt-6">
          {vues[vue]}
        </div>
      </main>
    </div>
  )
}
