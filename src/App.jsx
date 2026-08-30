import { useState } from 'react'
import {
  Smartphone,
  Truck,
  LayoutDashboard,
  Factory,
  ArrowRight,
  ArrowLeft,
  MapPin,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { PhoneFrame, Wordmark, Badge } from './components/ui'
import { marque, menage, operateur } from './data/mockData'
import MenageApp from './apps/menage/MenageApp.jsx'
import OperateurApp from './apps/operateur/OperateurApp.jsx'
import DashboardApp from './apps/dashboard/DashboardApp.jsx'
import DelegataireApp from './apps/delegataire/DelegataireApp.jsx'

const EXPERIENCES = [
  {
    id: 'menage',
    titre: 'Application Ménages',
    accroche: 'Réserver, suivre et payer une vidange',
    description:
      'Le parcours complet d’Aminata Diop : de la demande de vidange au reçu numérique avec certificat de dépotage conforme.',
    ecrans: ['Onboarding', 'Réservation', 'Suivi temps réel', 'Paiement mobile money', 'Reçu QR'],
    icon: Smartphone,
    couleur: '#0E7C7B',
    persona: menage.nomComplet,
  },
  {
    id: 'operateur',
    titre: 'Application Opérateurs',
    accroche: 'Recevoir les demandes et certifier le dépotage',
    description:
      'Le quotidien d’Ibrahima Ndiaye, vidangeur en cours de formalisation : demandes à proximité, orientation vers la station et déblocage du paiement.',
    ecrans: ['Demandes', 'Navigation', 'Vidange', 'Scan dépotage', 'Revenus', 'Micro-crédit'],
    icon: Truck,
    couleur: '#16324A',
    persona: operateur.nomComplet,
  },
  {
    id: 'dashboard',
    titre: 'Espace Régulateur',
    accroche: 'Piloter la filière avec des données réelles',
    description:
      'La vue institutionnelle : indicateurs consolidés, carte régionale temps réel, signalements et tarification.',
    ecrans: ['KPI & tendances', 'Carte régionale', 'Signalements', 'Tarification', 'Stations', 'Opérateurs', 'Rapports'],
    icon: LayoutDashboard,
    couleur: '#E1863B',
    persona: 'ONAS · Commune de Rufisque · Police de l’assainissement · Bailleur',
  },
  {
    id: 'delegataire',
    titre: 'Dashboard Délégataire',
    accroche: 'Gérer la station de traitement et valoriser les sous-produits',
    description:
      'La vue exploitant : suivi des arrivées de camions, volumes traités, revenus de redevance et commercialisation du compost et eau traitée.',
    ecrans: ['Dashboard', 'Arrivées camions', 'Volumes traités', 'Revenus', 'Commandes & valorisation', 'Paramètres'],
    icon: Factory,
    couleur: '#2563EB',
    persona: 'Délégataire — Station Tivaouane Peulh (exploité par Delvic)',
  },
]

function Selecteur({ onChoisir }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-cream">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-teal/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-52 h-[420px] w-[420px] rounded-full bg-amber/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-8 py-10">
        <header className="flex items-center justify-between">
          <Wordmark size={46} />
          <div className="flex items-center gap-2">
            <Badge tone="teal" icon={Sparkles}>
              Maquette de démonstration
            </Badge>
            <Badge tone="neutral" icon={MapPin}>
              Govathon 2026 · Dakar
            </Badge>
          </div>
        </header>

        <div className="mt-14 max-w-3xl">
          <h1 className="text-balance text-[46px] font-extrabold leading-[1.08] tracking-[-0.03em] text-navy">
            {marque.slogan}
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-slateink">
            {marque.baseline}
          </p>
        </div>

        <div className="mt-12 grid flex-1 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {EXPERIENCES.map((exp) => {
            const Icon = exp.icon
            return (
              <button
                key={exp.id}
                onClick={() => onChoisir(exp.id)}
                className="group flex flex-col rounded-3xl border border-navy/[0.07] bg-white p-6 text-left shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft"
              >
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lift transition-transform duration-300 group-hover:scale-105"
                  style={{ background: exp.couleur }}
                >
                  <Icon size={26} strokeWidth={2.1} />
                </span>

                <h2 className="mt-6 text-[19px] font-bold leading-tight text-navy">{exp.titre}</h2>
                <p className="mt-1 text-[12.5px] font-semibold" style={{ color: exp.couleur }}>
                  {exp.accroche}
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-slateink">{exp.description}</p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {exp.ecrans.map((e) => (
                    <span
                      key={e}
                      className="rounded-full bg-mist px-2.5 py-1 text-[10.5px] font-medium text-slateink"
                    >
                      {e}
                    </span>
                  ))}
                </div>

                <span className="mt-auto flex items-center gap-2 pt-6 text-[13px] font-bold text-navy">
                  Lancer la démo
                  <ArrowRight
                    size={16}
                    strokeWidth={2.4}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </button>
            )
          })}
        </div>

        <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-navy/[0.08] pt-6 text-[12px] text-slateink">
          <span className="flex items-center gap-2">
            <ShieldCheck size={15} className="text-teal" strokeWidth={2.2} />
            Complémentaire au service public « Ma Vidange » de l’ONAS
          </span>
          <span>Maquette non fonctionnelle — données fictives à but de démonstration</span>
        </footer>
      </div>
    </div>
  )
}

function ScenePhone({ experience, onRetour, children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-cream">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: `${experience.couleur}14` }}
      />

      <div className="relative flex h-[88px] items-center justify-between px-8">
        <button
          onClick={onRetour}
          className="flex items-center gap-2 rounded-2xl border border-navy/[0.08] bg-white px-4 py-2.5 text-[13px] font-semibold text-navy shadow-card transition hover:-translate-x-0.5 hover:shadow-soft"
        >
          <ArrowLeft size={16} strokeWidth={2.4} />
          Retour au sélecteur
        </button>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[14px] font-bold leading-tight text-navy">{experience.titre}</p>
            <p className="text-[11.5px] text-slateink">{experience.persona}</p>
          </div>
          <span
            className="flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-lift"
            style={{ background: experience.couleur }}
          >
            <experience.icon size={20} strokeWidth={2.1} />
          </span>
        </div>
      </div>

      <div className="phone-stage relative">
        <div className="phone-scale">
          <PhoneFrame>{children}</PhoneFrame>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [vue, setVue] = useState('selecteur')

  if (vue === 'dashboard') return <DashboardApp onRetour={() => setVue('selecteur')} />
  if (vue === 'delegataire') return <DelegataireApp onRetour={() => setVue('selecteur')} />

  if (vue === 'menage' || vue === 'operateur') {
    const experience = EXPERIENCES.find((e) => e.id === vue)
    return (
      <ScenePhone experience={experience} onRetour={() => setVue('selecteur')}>
        {vue === 'menage' ? <MenageApp /> : <OperateurApp />}
      </ScenePhone>
    )
  }

  return <Selecteur onChoisir={setVue} />
}

