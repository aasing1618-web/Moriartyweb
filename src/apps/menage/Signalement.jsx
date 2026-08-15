import { useState } from 'react'
import {
  LocateFixed,
  Camera,
  Truck,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  ShieldAlert,
  Home as HomeIcon,
} from 'lucide-react'
import { Badge, Button, Card, ScreenBody, ScreenFooter, ScreenHeader } from '../../components/ui'
import { signalements } from '../../data/mockData'

function Libelle({ icon: Icon, children, optionnel = false }) {
  return (
    <span className="mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wide text-slateink">
      <Icon size={13} strokeWidth={2.4} />
      {children}
      {optionnel && <span className="font-medium normal-case tracking-normal">(optionnel)</span>}
    </span>
  )
}

export default function Signalement({ go, retour = 'home' }) {
  const [preuve, setPreuve] = useState(false)
  const [envoye, setEnvoye] = useState(false)

  if (envoye) {
    return (
      <>
        <ScreenBody className="pt-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative flex h-20 w-20 items-center justify-center">
              <span className="absolute inset-0 animate-ping-soft rounded-full bg-teal/35" />
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-teal text-white shadow-lift">
                <CheckCircle2 size={40} strokeWidth={2.4} />
              </span>
            </div>
            <h1 className="mt-5 text-[23px] font-extrabold leading-tight text-navy">
              {signalements.confirmation.titre}
            </h1>
            <p className="mt-3 text-balance text-[13.5px] leading-relaxed text-slateink">
              {signalements.confirmation.texte}
            </p>
          </div>

          <Card className="mt-6 !py-2">
            {[
              ['Localisation', signalements.localisation],
              ['Heure', signalements.heure],
              ['Pièce jointe', preuve ? signalements.preuve : 'Aucune'],
              ['Statut', 'En attente de vérification'],
            ].map(([label, valeur]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-3 border-b border-navy/[0.06] py-2.5 text-[12.5px] last:border-0"
              >
                <span className="text-slateink">{label}</span>
                <span className="truncate font-semibold text-navy">{valeur}</span>
              </div>
            ))}
          </Card>

          <div className="mt-4 flex items-start gap-2.5 rounded-2xl bg-navy-50 p-3.5">
            <ShieldAlert size={16} className="mt-0.5 shrink-0 text-navy" strokeWidth={2.2} />
            <p className="text-[11.5px] leading-relaxed text-slateink">
              Les signalements sont instruits par les équipes de l’ONAS et des communes avant toute
              suite. Votre identité n’est pas transmise à l’opérateur concerné.
            </p>
          </div>
        </ScreenBody>

        <ScreenFooter>
          <Button size="lg" block icon={HomeIcon} onClick={() => go('home')}>
            Retour à l’accueil
          </Button>
        </ScreenFooter>
      </>
    )
  }

  return (
    <>
      <ScreenHeader
        title="Signaler une vidange clandestine"
        subtitle="Signalement citoyen"
        onBack={() => go(retour)}
      />

      <ScreenBody>
        <div className="flex items-start gap-2.5 rounded-2xl bg-amber/[0.09] p-3.5">
          <ShieldAlert size={17} className="mt-0.5 shrink-0 text-amber-600" strokeWidth={2.2} />
          <p className="text-[11.5px] leading-relaxed text-slateink">
            Un dépotage hors station agréée pollue la nappe et les sols. Votre signalement est
            transmis pour vérification, jamais publié.
          </p>
        </div>

        <div className="mt-5">
          <Libelle icon={LocateFixed}>Localisation</Libelle>
          <div className="flex items-center gap-3 rounded-2xl border border-navy/[0.07] bg-mist px-4 py-3.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
              <LocateFixed size={17} strokeWidth={2.2} />
            </span>
            <span className="min-w-0 flex-1 truncate text-[13.5px] font-semibold text-navy">
              {signalements.localisation}
            </span>
            <Badge tone="teal" size="sm">
              Position détectée
            </Badge>
          </div>
        </div>

        <div className="mt-4">
          <Libelle icon={Camera}>Preuve</Libelle>
          {preuve ? (
            <div className="flex items-center gap-3 rounded-2xl border border-navy/[0.07] bg-white p-3 shadow-card">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-mist text-slateink">
                <Camera size={22} strokeWidth={2} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-navy">{signalements.preuve}</p>
                <p className="text-[11px] text-slateink">Pièce jointe ajoutée</p>
              </div>
              <button
                onClick={() => setPreuve(false)}
                className="text-[11.5px] font-semibold text-danger"
              >
                Retirer
              </button>
            </div>
          ) : (
            <button
              onClick={() => setPreuve(true)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-navy/25 bg-white/60 py-5 text-[13px] font-semibold text-navy transition hover:border-teal hover:bg-white"
            >
              <Camera size={17} strokeWidth={2.2} />
              Ajouter une photo ou vidéo
            </button>
          )}
        </div>

        <div className="mt-4">
          <Libelle icon={Truck} optionnel>
            Numéro du camion
          </Libelle>
          <input
            placeholder={signalements.placeholderCamion}
            className="w-full rounded-2xl border border-navy/10 bg-white px-4 py-3.5 text-[14px] font-semibold text-navy shadow-card outline-none transition placeholder:font-normal placeholder:text-slateink/70 focus:border-teal"
          />
        </div>

        <div className="mt-4">
          <Libelle icon={Clock}>Heure</Libelle>
          <div className="flex items-center gap-3 rounded-2xl border border-navy/[0.07] bg-mist px-4 py-3.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy">
              <Clock size={17} strokeWidth={2.2} />
            </span>
            <span className="text-[13.5px] font-semibold text-navy">{signalements.heure}</span>
          </div>
        </div>

        <div className="mt-4">
          <Libelle icon={MessageSquare}>Commentaire</Libelle>
          <textarea
            rows={4}
            placeholder={signalements.placeholderCommentaire}
            className="w-full resize-none rounded-2xl border border-navy/10 bg-white px-4 py-3.5 text-[13.5px] leading-relaxed text-navy shadow-card outline-none transition placeholder:text-slateink/70 focus:border-teal"
          />
        </div>
      </ScreenBody>

      <ScreenFooter>
        <Button size="lg" block icon={Send} onClick={() => setEnvoye(true)}>
          Envoyer le signalement
        </Button>
      </ScreenFooter>
    </>
  )
}
