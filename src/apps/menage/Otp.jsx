import { MessageSquare } from 'lucide-react'
import { Button, ScreenHeader } from '../../components/ui'
import { menage } from '../../data/mockData'

const CODE = ['4', '8', '2', '1']

export default function Otp({ go }) {
  return (
    <>
      <ScreenHeader onBack={() => go('login')} />
      <div className="flex min-h-0 flex-1 flex-col px-6 pb-8">
        <div className="flex min-h-0 flex-1 flex-col justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal/10 text-teal">
            <MessageSquare size={24} strokeWidth={2.1} />
          </span>
          <h1 className="mt-6 text-[25px] font-extrabold leading-tight text-navy">
            Vérification du numéro
          </h1>
          <p className="mt-2 text-[14px] leading-relaxed text-slateink">
            Code envoyé au <span className="font-semibold text-navy">{menage.telephone}</span>
          </p>

          <div className="mt-8 flex gap-3">
            {CODE.map((chiffre, i) => (
              <div
                key={i}
                className="flex h-16 flex-1 items-center justify-center rounded-2xl border-2 border-teal/30 bg-white text-[26px] font-bold text-navy shadow-card"
              >
                {chiffre}
              </div>
            ))}
          </div>

          <p className="mt-5 text-center text-[12.5px] text-slateink">
            Vous n’avez rien reçu ?{' '}
            <span className="font-semibold text-teal">Renvoyer dans 0:24</span>
          </p>
        </div>

        <Button size="lg" block onClick={() => go('home')}>
          Vérifier et continuer
        </Button>
      </div>
    </>
  )
}
