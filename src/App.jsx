import { useState } from 'react'
import {
  Smartphone,
  Truck,
  LayoutDashboard,
  Factory,
  Sprout,
  ArrowRight,
  ArrowLeft,
  MapPin,
  ShieldCheck,
  Sparkles,
  Activity,
  CheckCircle2,
  Users,
} from 'lucide-react'
import { PhoneFrame, Wordmark, Badge } from './components/ui'
import { marque, menage, operateur } from './data/mockData'
import MenageApp from './apps/menage/MenageApp.jsx'
import OperateurApp from './apps/operateur/OperateurApp.jsx'
import DashboardApp from './apps/dashboard/DashboardApp.jsx'
import DelegataireApp from './apps/delegataire/DelegataireApp.jsx'
import AcheteurApp from './apps/acheteur/AcheteurApp.jsx'

const EXPERIENCES = [
  {
    id: 'menage',
    titre: 'Application Ménages',
    accroche: 'Réserver, suivre et payer une vidange',
    description:
      'Le parcours complet d’Aminata Diop : de la demande de vidange au reçu numérique avec certificat de dépotage conforme.',
    ecrans: ['Onboarding', 'Réservation', 'Suivi GPS', 'Mobile Money', 'Reçu QR'],
    icon: Smartphone,
    couleur: '#0E7C7B',
    accentClass: 'from-teal-500/10 to-teal-600/5 hover:border-teal/40',
    persona: menage.nomComplet,
  },
  {
    id: 'operateur',
    titre: 'Application Opérateurs',
    accroche: 'Recevoir les demandes et certifier le dépotage',
    description:
      'Le quotidien d’Ibrahima Ndiaye, vidangeur en cours de formalisation : demandes à proximité, orientation vers la station et déblocage du paiement.',
    ecrans: ['Demandes', 'Navigation', 'Vidange', 'Scan dépotage', 'Revenus'],
    icon: Truck,
    couleur: '#16324A',
    accentClass: 'from-navy-500/10 to-navy-600/5 hover:border-navy/40',
    persona: operateur.nomComplet,
  },
  {
    id: 'acheteur',
    titre: 'Espace Acheteur',
    accroche: 'Acheter les sous-produits valorisés',
    description:
      'Le côté aval de la filière : catalogue des boues séchées hygiénisées et de l’eau traitée, commande, suivi et bordereau de conformité.',
    ecrans: ['Catalogue', 'Fiche qualité', 'Commande', 'Suivi', 'Bordereau'],
    icon: Sprout,
    couleur: '#1E9E63',
    accentClass: 'from-emerald-500/10 to-emerald-600/5 hover:border-emerald-500/40',
    persona: 'GIE Maraîcher des Niayes · AGEROUTE',
  },
  {
    id: 'delegataire',
    titre: 'Dashboard Délégataire',
    accroche: 'Gérer la station et valoriser les sous-produits',
    description:
      'La vue exploitant : suivi des arrivées de camions, volumes traités, revenus de redevance et commercialisation du compost et eau traitée.',
    ecrans: ['Dashboard', 'Arrivées', 'Volumes', 'Revenus', 'Valorisation'],
    icon: Factory,
    couleur: '#2563EB',
    accentClass: 'from-blue-500/10 to-blue-600/5 hover:border-blue-500/40',
    persona: 'Station Tivaouane Peulh (Delvic)',
  },
  {
    id: 'dashboard',
    titre: 'Espace Régulateur',
    accroche: 'Piloter la filière avec des données réelles',
    description:
      'La vue institutionnelle : indicateurs consolidés, carte régionale temps réel, signalements et tarification.',
    ecrans: ['KPI & tendances', 'Carte SIG', 'Signalements', 'Tarification', 'Rapports'],
    icon: LayoutDashboard,
    couleur: '#E1863B',
    accentClass: 'from-amber-500/10 to-amber-600/5 hover:border-amber/40',
    persona: 'ONAS · Commune de Rufisque · Bailleur',
  },
]

function Selecteur({ onChoisir }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-cream selection:bg-teal selection:text-white">
      {/* Background Grids & Ambient Glowing Spheres */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
      <div className="pointer-events-none absolute -left-40 -top-20 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-teal/20 to-teal/0 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-60 h-[550px] w-[550px] rounded-full bg-gradient-to-br from-amber/20 to-amber/0 blur-3xl" />
      <div className="pointer-events-none absolute left-1/3 bottom-10 h-[450px] w-[450px] rounded-full bg-gradient-to-tr from-navy/10 to-blue-500/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-8 py-6 sm:py-10">
        {/* Top Header Navigation */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-white/60 bg-white/70 px-6 py-4 backdrop-blur-md shadow-card">
          <Wordmark size={36} className="sm:text-left" />
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge tone="teal" icon={Sparkles} dot>
              Maquette Pitch Govathon 2026
            </Badge>
            <Badge tone="neutral" icon={MapPin}>
              Région de Dakar · Sénégal
            </Badge>
          </div>
        </header>

        {/* Hero Banner Section */}
        <div className="mt-8 sm:mt-12 max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/5 px-3.5 py-1.5 text-[12px] font-bold text-teal shadow-2xs">
            <ShieldCheck size={16} strokeWidth={2.4} />
            Plateforme Nationale de Traçabilité & Dispatching
          </div>
          <h1 className="mt-4 text-balance text-3xl sm:text-5xl md:text-[50px] font-black leading-[1.08] tracking-tight text-navy">
            {marque.slogan}
          </h1>
          <p className="mt-3 sm:mt-5 max-w-3xl text-[14.5px] sm:text-[16.5px] leading-relaxed text-slateink font-medium">
            {marque.baseline}
          </p>

          {/* Impact Metrics Ticker */}
          <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-navy/10 bg-white/80 p-3.5 backdrop-blur-sm shadow-2xs">
              <p className="text-[11px] font-bold text-slateink uppercase">Vidanges Tracées</p>
              <p className="text-xl font-extrabold text-navy mt-0.5 flex items-center gap-1.5">
                <Activity size={18} className="text-teal" /> 12 400+
              </p>
            </div>
            <div className="rounded-2xl border border-navy/10 bg-white/80 p-3.5 backdrop-blur-sm shadow-2xs">
              <p className="text-[11px] font-bold text-slateink uppercase">Dépotage Conforme</p>
              <p className="text-xl font-extrabold text-navy mt-0.5 flex items-center gap-1.5">
                <CheckCircle2 size={18} className="text-success" /> 87 %
              </p>
            </div>
            <div className="rounded-2xl border border-navy/10 bg-white/80 p-3.5 backdrop-blur-sm shadow-2xs">
              <p className="text-[11px] font-bold text-slateink uppercase">Vidangeurs Actifs</p>
              <p className="text-xl font-extrabold text-navy mt-0.5 flex items-center gap-1.5">
                <Users size={18} className="text-amber-600" /> 156
              </p>
            </div>
            <div className="rounded-2xl border border-navy/10 bg-white/80 p-3.5 backdrop-blur-sm shadow-2xs">
              <p className="text-[11px] font-bold text-slateink uppercase">Ménages Connectés</p>
              <p className="text-xl font-extrabold text-navy mt-0.5 flex items-center gap-1.5">
                <Smartphone size={18} className="text-navy" /> 8 200+
              </p>
            </div>
          </div>
        </div>

        {/* Experience Showcase Cards Matrix */}
        <div className="mt-8 sm:mt-12 grid flex-1 grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {EXPERIENCES.map((exp) => {
            const Icon = exp.icon
            return (
              <button
                key={exp.id}
                onClick={() => onChoisir(exp.id)}
                className={`group relative flex flex-col rounded-3xl border border-navy/10 bg-gradient-to-b ${exp.accentClass} p-5 sm:p-6 text-left shadow-card backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl text-white shadow-lift transition-transform duration-300 group-hover:scale-110"
                    style={{ background: exp.couleur }}
                  >
                    <Icon size={24} strokeWidth={2.2} />
                  </span>
                  <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10.5px] font-bold text-navy shadow-2xs border border-navy/5">
                    Démo
                  </span>
                </div>

                <h2 className="mt-5 sm:mt-6 text-[18px] sm:text-[19px] font-extrabold leading-tight text-navy">{exp.titre}</h2>
                <p className="mt-1 text-[12.5px] font-bold" style={{ color: exp.couleur }}>
                  {exp.accroche}
                </p>
                <p className="mt-2.5 sm:mt-3 text-[13px] leading-relaxed text-slateink font-medium">{exp.description}</p>

                <div className="mt-4 sm:mt-5 flex flex-wrap gap-1.5">
                  {exp.ecrans.map((e) => (
                    <span
                      key={e}
                      className="rounded-full bg-white/80 backdrop-blur-sm px-2.5 py-1 text-[10.5px] font-semibold text-slateink border border-navy/5"
                    >
                      {e}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between pt-5 sm:pt-6 border-t border-navy/5">
                  <span className="text-[11.5px] font-semibold text-slateink truncate max-w-[120px]">
                    {exp.persona}
                  </span>
                  <span className="flex items-center gap-1.5 text-[13px] font-bold text-navy group-hover:text-teal transition-colors">
                    Explorer
                    <ArrowRight
                      size={16}
                      strokeWidth={2.4}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Footer info */}
        <footer className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-navy/[0.08] pt-6 text-[11.5px] sm:text-[12.5px] text-slateink font-medium">
          <span className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-teal" strokeWidth={2.2} />
            Solution d’extension et complément au service public « Ma Vidange » (ONAS)
          </span>
          <span>Maquette cliquable non-fonctionnelle · Hackathon Govathon 2026</span>
        </footer>
      </div>
    </div>
  )
}

function ScenePhone({ experience, onRetour, children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-cream flex flex-col">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-20"
        style={{ background: experience.couleur }}
      />

      {/* Mobile Demo Stage Navigation Header */}
      <div className="relative flex min-h-[64px] sm:h-[88px] items-center justify-between px-4 sm:px-8 py-3 sm:py-0 gap-3 border-b border-navy/[0.08] bg-white/80 backdrop-blur-md">
        <button
          onClick={onRetour}
          className="flex items-center gap-2 rounded-2xl border border-navy/10 bg-white px-3.5 sm:px-4 py-2 sm:py-2.5 text-[12.5px] sm:text-[13px] font-bold text-navy shadow-card transition-all duration-200 hover:-translate-x-0.5 hover:shadow-card-hover active:scale-95"
        >
          <ArrowLeft size={16} strokeWidth={2.4} />
          <span className="hidden xs:inline">← Retour au sélecteur</span>
          <span className="xs:hidden">Sélecteur</span>
        </button>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="text-right">
            <p className="text-[13px] sm:text-[14px] font-extrabold leading-tight text-navy">{experience.titre}</p>
            <p className="text-[10.5px] sm:text-[11.5px] font-semibold text-slateink truncate max-w-[160px] sm:max-w-none">{experience.persona}</p>
          </div>
          <span
            className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl text-white shadow-lift shrink-0"
            style={{ background: experience.couleur }}
          >
            <experience.icon size={18} strokeWidth={2.2} />
          </span>
        </div>
      </div>

      <div className="phone-stage relative flex-1 py-2 sm:py-0">
        <div className="phone-scale flex justify-center items-center w-full">
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
  if (vue === 'acheteur') return <AcheteurApp onRetour={() => setVue('selecteur')} />

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


