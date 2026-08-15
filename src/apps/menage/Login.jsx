import { Phone, ShieldCheck, ShieldAlert, ArrowRight } from 'lucide-react'
import { Button, Wordmark } from '../../components/ui'
import { menage } from '../../data/mockData'

export default function Login({ go }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col px-6 pb-8">
      <div className="flex min-h-0 flex-1 flex-col justify-center">
        <Wordmark size={44} />
        <h1 className="mt-8 text-[27px] font-extrabold leading-tight text-navy">Bienvenue</h1>
        <p className="mt-2 text-[14px] leading-relaxed text-slateink">
          Entrez votre numéro pour retrouver votre fosse et vos vidanges enregistrées.
        </p>

        <div className="mt-8">
          <label className="mb-2 block text-[12px] font-semibold uppercase tracking-wide text-slateink">
            Numéro de téléphone
          </label>
          <div className="flex items-center gap-3 rounded-2xl border border-navy/10 bg-white px-4 py-3.5 shadow-card focus-within:border-teal">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal/10 text-teal">
              <Phone size={17} strokeWidth={2.2} />
            </span>
            <input
              defaultValue={menage.telephone}
              className="min-w-0 flex-1 bg-transparent text-[16px] font-semibold text-navy outline-none"
              inputMode="tel"
            />
          </div>
          <p className="mt-2 text-[11.5px] text-slateink">
            Un code à 4 chiffres vous sera envoyé par SMS.
          </p>
        </div>

        <Button size="lg" block className="mt-6" iconRight={ArrowRight} onClick={() => go('otp')}>
          Recevoir un code
        </Button>

        <div className="mt-7 flex items-start gap-3 rounded-2xl bg-navy-50 p-4">
          <ShieldCheck size={18} className="mt-0.5 shrink-0 text-teal" strokeWidth={2.2} />
          <p className="text-[12px] leading-relaxed text-slateink">
            AssainiTrack est <span className="font-semibold text-navy">complémentaire</span> au
            service public « Ma Vidange » de l’ONAS : mêmes stations agréées, suivi numérique en
            plus.
          </p>
        </div>
      </div>

      <button
        onClick={() => go('signalement')}
        className="mb-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-amber/35 bg-amber/[0.07] py-3 text-[13px] font-semibold text-amber-600 transition hover:bg-amber/[0.12]"
      >
        <ShieldAlert size={16} strokeWidth={2.2} />
        Signaler une vidange clandestine — sans compte
      </button>

      <p className="text-center text-[11px] leading-relaxed text-slateink/80">
        En continuant, vous acceptez les conditions d’utilisation et la politique de confidentialité.
      </p>
    </div>
  )
}
