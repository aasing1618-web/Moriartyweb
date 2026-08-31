import { useState } from 'react'
import { ListChecks, Wallet, Award, User } from 'lucide-react'
import { BottomNav } from '../../components/ui'
import {
  demandesProximite,
  comptePrepaye,
  parametresFinanciers,
  repartition,
  ajusterSequestre,
} from '../../data/mockData'
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

/** Volume estimé d'une demande ("~8 m³" → 8). */
export const volumeDemande = (demande) => parseFloat(String(demande.volume).replace('~', ''))

export default function OperateurApp() {
  const [ecran, setEcran] = useState('login')
  const [demande, setDemande] = useState(demandesProximite[0])
  const [soldePrepaye, setSoldePrepaye] = useState(comptePrepaye.soldeInitial)
  const [volumeReel, setVolumeReel] = useState(null)
  const [missionsReparties, setMissionsReparties] = useState([])

  const go = (destination) => setEcran(destination)

  const recharger = () => setSoldePrepaye((s) => s + comptePrepaye.rechargement)

  // Répartition de la mission courante, sur le volume estimé par défaut.
  const estEspece = demande.modePaiement === 'Espèces'
  const volumeEstime = volumeDemande(demande)
  const part = repartition(demande.prix, volumeEstime)

  /** Coût à couvrir par le compte prépayé pour une mission réglée en espèces. */
  const coutPrepaye = part.redevance + part.commission
  const soldeInsuffisant = estEspece && soldePrepaye < coutPrepaye

  /** Répartition définitive, recalculée sur le volume réellement dépoté. */
  const partFinale = ajusterSequestre(demande.prix, volumeEstime, volumeReel ?? volumeEstime)

  const validerDepotage = () => {
    setMissionsReparties((m) => [...m, demande.id])
    if (estEspece) setSoldePrepaye((s) => s - (partFinale.redevance + partFinale.commission))
  }

  const financier = {
    soldePrepaye,
    soldeInsuffisant,
    coutPrepaye,
    estEspece,
    volumeEstime,
    volumeReel: volumeReel ?? volumeEstime,
    setVolumeReel,
    part,
    partFinale,
    parametres: parametresFinanciers,
    recharger,
    validerDepotage,
    missionsReparties,
  }

  const ecrans = {
    login: <LoginOperateur go={go} />,
    requests: <Requests go={go} onChoisirDemande={setDemande} financier={financier} />,
    detail: <RequestDetail go={go} demande={demande} financier={financier} />,
    navigation: <NavigationCollecte go={go} demande={demande} />,
    collecte: <Collecte go={go} demande={demande} />,
    stations: <Stations go={go} />,
    scan: <Scan go={go} financier={financier} />,
    revenus: <Revenus go={go} financier={financier} />,
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
