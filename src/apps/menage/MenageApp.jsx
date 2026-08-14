import { useState } from 'react'
import { Home as HomeIcon, Clock, User } from 'lucide-react'
import { BottomNav } from '../../components/ui'
import { operateursDisponibles, moyensPaiement } from '../../data/mockData'
import Onboarding from './Onboarding.jsx'
import Login from './Login.jsx'
import Otp from './Otp.jsx'
import Home from './Home.jsx'
import Booking from './Booking.jsx'
import Operators from './Operators.jsx'
import Tracking from './Tracking.jsx'
import Payment from './Payment.jsx'
import Confirmation from './Confirmation.jsx'
import History from './History.jsx'
import Profile from './Profile.jsx'

const NAV = [
  { id: 'home', label: 'Accueil', icon: HomeIcon },
  { id: 'history', label: 'Historique', icon: Clock },
  { id: 'profile', label: 'Profil', icon: User },
]

const AVEC_NAV = ['home', 'history', 'profile']

export default function MenageApp() {
  const [ecran, setEcran] = useState('onboarding')
  const [operateurChoisi, setOperateurChoisi] = useState(operateursDisponibles[0])
  const [paiement, setPaiement] = useState(moyensPaiement[0])

  const go = (destination) => setEcran(destination)

  const ecrans = {
    onboarding: <Onboarding go={go} />,
    login: <Login go={go} />,
    otp: <Otp go={go} />,
    home: <Home go={go} />,
    booking: <Booking go={go} />,
    operators: (
      <Operators go={go} operateurChoisi={operateurChoisi} onChoisir={setOperateurChoisi} />
    ),
    tracking: <Tracking go={go} operateurChoisi={operateurChoisi} />,
    payment: <Payment go={go} paiement={paiement} onChoisirPaiement={setPaiement} />,
    confirmation: <Confirmation go={go} />,
    history: <History go={go} />,
    profile: <Profile go={go} />,
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
