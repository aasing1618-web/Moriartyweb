import { useState } from 'react'
import { Check, ShieldCheck, Star, Download, Home as HomeIcon, X } from 'lucide-react'
import { Badge, Button, Card, QrCode, ScreenBody, ScreenFooter } from '../../components/ui'
import { recapitulatif, menage, fcfa } from '../../data/mockData'

function ModaleNote({ onClose }) {
  const [note, setNote] = useState(5)
  const [envoye, setEnvoye] = useState(false)

  return (
    <div className="absolute inset-0 z-50 flex items-end bg-navy/40 backdrop-blur-[2px]">
      <div className="w-full animate-fade-up rounded-t-[28px] bg-white p-5 pb-8 shadow-[0_-16px_40px_-20px_rgba(22,50,74,0.5)]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[16px] font-bold text-navy">
            {envoye ? 'Merci pour votre retour !' : 'Noter le service'}
          </h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-mist text-navy"
          >
            <X size={16} strokeWidth={2.4} />
          </button>
        </div>

        {envoye ? (
          <p className="pb-2 text-[13px] leading-relaxed text-slateink">
            Votre note aide les autres ménages du quartier à choisir un opérateur fiable, et compte
            dans le score de conformité de {recapitulatif.operateur}.
          </p>
        ) : (
          <>
            <p className="text-[13px] text-slateink">
              Comment s’est passée la vidange avec {recapitulatif.operateur} ?
            </p>
            <div className="my-5 flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <button key={i} onClick={() => setNote(i)}>
                  <Star
                    size={34}
                    className={i <= note ? 'fill-amber text-amber' : 'text-navy/15 fill-navy/10'}
                  />
                </button>
              ))}
            </div>
            <Button size="lg" block onClick={() => setEnvoye(true)}>
              Envoyer ma note
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default function Confirmation({ go }) {
  const [modale, setModale] = useState(false)

  return (
    <>
      <ScreenBody className="pt-4">
        <div className="flex flex-col items-center text-center">
          <div className="relative flex h-20 w-20 items-center justify-center">
            <span className="absolute inset-0 animate-ping-soft rounded-full bg-success/40" />
            <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-success text-white shadow-lift">
              <Check size={38} strokeWidth={3} />
            </span>
          </div>
          <h1 className="mt-5 text-[23px] font-extrabold leading-tight text-navy">
            Paiement confirmé
          </h1>
          <p className="mt-1.5 text-[13px] text-slateink">
            Votre reçu numérique est disponible ci-dessous.
          </p>
        </div>

        <Card className="mt-6 !p-0 overflow-hidden">
          <div className="flex flex-col items-center bg-gradient-to-b from-navy-50 to-white px-5 py-6">
            <QrCode value={recapitulatif.reference} size={172} />
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-widest text-slateink">
              Reçu {recapitulatif.reference}
            </p>
          </div>

          <div className="space-y-2.5 px-5 pb-5 pt-4 text-[12.5px]">
            {[
              ['Ménage', menage.nomComplet],
              ['Opérateur', recapitulatif.operateur],
              ['Prestation', recapitulatif.service],
              ['Montant payé', fcfa(recapitulatif.total)],
              ['Date', '14 août 2026 · 11h24'],
            ].map(([label, valeur]) => (
              <div key={label} className="flex items-center justify-between gap-3">
                <span className="text-slateink">{label}</span>
                <span className="truncate font-semibold text-navy">{valeur}</span>
              </div>
            ))}

            <div className="!mt-4 flex items-center gap-2.5 rounded-2xl bg-success/[0.08] p-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-success text-white">
                <ShieldCheck size={17} strokeWidth={2.3} />
              </span>
              <div>
                <p className="text-[12.5px] font-bold text-navy">Dépotage conforme certifié ✓</p>
                <p className="text-[11px] text-slateink">{recapitulatif.station}</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-4 flex items-center justify-center gap-2">
          <Badge tone="teal">Données transmises à l’ONAS</Badge>
          <Badge tone="neutral" icon={Download}>
            Reçu PDF
          </Badge>
        </div>
      </ScreenBody>

      <ScreenFooter>
        <div className="flex gap-2.5">
          <Button variant="outline" size="lg" className="flex-1" icon={Star} onClick={() => setModale(true)}>
            Noter le service
          </Button>
          <Button size="lg" className="flex-1" icon={HomeIcon} onClick={() => go('home')}>
            Accueil
          </Button>
        </div>
      </ScreenFooter>

      {modale && <ModaleNote onClose={() => setModale(false)} />}
    </>
  )
}
