import { Phone, Truck, ArrowRight, ShieldAlert } from 'lucide-react'
import { Badge, Button, Logo } from '../../components/ui'
import { operateur } from '../../data/mockData'

export default function LoginOperateur({ go }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col px-6 pb-8">
      <div className="flex min-h-0 flex-1 flex-col justify-center">
        <div className="flex items-center gap-3">
          <Logo size={42} />
          <div>
            <p className="text-[20px] font-extrabold leading-none tracking-[-0.02em] text-navy">
              Assaini<span className="text-teal">Track</span>
            </p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-amber-600">
              Espace opérateur
            </p>
          </div>
        </div>

        <h1 className="mt-8 text-[26px] font-extrabold leading-tight text-navy">
          Connexion vidangeur
        </h1>
        <p className="mt-2 text-[14px] leading-relaxed text-slateink">
          Recevez les demandes de votre zone et faites certifier chaque dépotage.
        </p>

        <div className="mt-8">
          <label className="mb-2 block text-[12px] font-semibold uppercase tracking-wide text-slateink">
            Numéro professionnel
          </label>
          <div className="flex items-center gap-3 rounded-2xl border border-navy/10 bg-white px-4 py-3.5 shadow-card focus-within:border-teal">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber/12 text-amber-600">
              <Phone size={17} strokeWidth={2.2} />
            </span>
            <input
              defaultValue={operateur.telephone}
              className="min-w-0 flex-1 bg-transparent text-[16px] font-semibold text-navy outline-none"
              inputMode="tel"
            />
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-warning/25 bg-warning/[0.08] p-4">
          <div className="flex items-center gap-2.5">
            <ShieldAlert size={18} className="shrink-0 text-[#9A6F00]" strokeWidth={2.2} />
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-bold text-navy">{operateur.nomComplet}</p>
              <p className="text-[11.5px] text-slateink">{operateur.entreprise}</p>
            </div>
            <Badge tone="warning" size="sm">
              {operateur.statut}
            </Badge>
          </div>
          <p className="mt-2.5 text-[11.5px] leading-relaxed text-slateink">
            Dossier NINEA : {operateur.ninea}. Vous pouvez travailler pendant l’instruction.
          </p>
        </div>

        <Button size="lg" block className="mt-6" iconRight={ArrowRight} onClick={() => go('requests')}>
          Continuer
        </Button>
      </div>

      <div className="flex items-center justify-center gap-2 text-[11px] text-slateink">
        <Truck size={13} strokeWidth={2.2} />
        {operateur.camion}
      </div>
    </div>
  )
}
