import { useState } from 'react'
import { ListChecks, Wallet, Award, User } from 'lucide-react'
import { BottomNav } from '../../components/ui'
import { demandesProximite } from '../../data/mockData'
import LoginOperateur from './LoginOperateur.jsx'
import Requests from './Requests.jsx'
import RequestDetail from './RequestDetail.jsx'
import NavigationCollecte from './NavigationCollecte.jsx'
import Collecte from './Collecte.jsx'
import Stations from './Stations.jsx'
import Scan from './Scan.jsx'
import Revenus from './Revenus.jsx'
import Conformite from './Conformite.jsx'
import ProfilOperateur from './ProfilOperateur.jsx'

const NAV = [
  { id: 'requests', label: 'Demandes', icon: ListChecks },
  { id: 'revenus', label: 'Revenus', icon: Wallet },
  { id: 'conformite', label: 'Conformité', icon: Award },
  { id: 'profil', label: 'Profil', icon: User },
]

const AVEC_NAV = ['requests', 'revenus', 'conformite', 'profil']

export default function OperateurApp() {
  const [ecran, setEcran] = useState('login')
  const [demande, setDemande] = useState(demandesProximite[0])

  const go = (destination) => setEcran(destination)

  const ecrans = {
    login: <LoginOperateur go={go} />,
    requests: <Requests go={go} onChoisirDemande={setDemande} />,
    detail: <RequestDetail go={go} demande={demande} />,
    navigation: <NavigationCollecte go={go} demande={demande} />,
    collecte: <Collecte go={go} demande={demande} />,
    stations: <Stations go={go} />,
    scan: <Scan go={go} />,
    revenus: <Revenus go={go} />,
    conformite: <Conformite go={go} />,
    profil: <ProfilOperateur go={go} />,
  }

  return (
    <>
      <div key={ecran} className="flex min-h-0 flex-1 animate-fade-in flex-col">
        {ecrans[ecran]}
      </div>
      {AVEC_NAV.includes(ecran) && <BottomNav items={NAV} active={ecran} onChange={go} />}
    </>
  )
}
