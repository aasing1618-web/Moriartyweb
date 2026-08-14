import { Award, Check, X, Landmark, FileText, ArrowRight } from 'lucide-react'
import { Badge, Button, Card, ProgressBar, ScreenBody, ScreenHeader, SectionTitle } from '../../components/ui'
import { microCredit, badgesOperateur, operateur, statsOperateur, fcfa } from '../../data/mockData'

export default function Conformite() {
  return (
    <>
      <ScreenHeader title="Conformité & financement" subtitle={operateur.entreprise} />
      <ScreenBody>
        <Card className="border-navy/10 bg-gradient-to-br from-navy to-navy-600 !p-5 text-white">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <Award size={22} strokeWidth={2.2} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-bold leading-tight">Badge de conformité</p>
              <p className="text-[11.5px] text-white/70">
                {statsOperateur.tauxConformite} % de dépotages certifiés
              </p>
            </div>
            <Badge tone="white">{operateur.statut}</Badge>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {badgesOperateur.map((b) => (
              <span
                key={b.id}
                className="rounded-full bg-white/12 px-2.5 py-1 text-[10.5px] font-semibold"
              >
                {b.label}
              </span>
            ))}
          </div>
        </Card>

        <Card className="mt-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[13.5px] font-bold text-navy">Éligibilité micro-crédit</p>
              <p className="text-[11.5px] text-slateink">Financement d’équipement</p>
            </div>
            <span className="text-[26px] font-extrabold leading-none text-teal">
              {microCredit.progression} %
            </span>
          </div>

          <div className="mt-3">
            <ProgressBar value={microCredit.progression} height={10} />
            <p className="mt-2 text-[11.5px] text-slateink">
              <span className="font-semibold text-navy">
                {microCredit.moisValides} / {microCredit.objectifMois} mois
              </span>{' '}
              d’historique requis pour être éligible au micro-crédit équipement.
            </p>
          </div>

          <div className="mt-4 space-y-2 border-t border-navy/[0.07] pt-3">
            {microCredit.criteres.map((c) => (
              <div key={c.label} className="flex items-center gap-2.5">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    c.ok ? 'bg-success text-white' : 'bg-warning/20 text-[#9A6F00]'
                  }`}
                >
                  {c.ok ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}
                </span>
                <span className="flex-1 text-[12px] text-slateink">{c.label}</span>
                <span className="text-[12px] font-semibold text-navy">{c.valeur}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="mt-3 border-amber/25 bg-gradient-to-br from-amber/[0.09] to-white">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber text-white">
              <Landmark size={19} strokeWidth={2.2} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11.5px] font-medium text-slateink">Montant potentiel</p>
              <p className="text-[20px] font-extrabold leading-none text-navy">
                {fcfa(microCredit.montantEligible)}
              </p>
            </div>
          </div>
          <p className="mt-3 text-[11.5px] leading-relaxed text-slateink">
            {microCredit.partenaire}. Votre historique de dépotages tracés sert de garantie
            d’activité auprès du partenaire financier.
          </p>
        </Card>

        <SectionTitle className="mt-5">Formalisation</SectionTitle>
        <Card className="!py-2">
          {[
            ['Dossier NINEA', 'Déposé le 02/07/2026'],
            ['Agrément ONAS', 'En instruction'],
            ['Assurance véhicule', 'À jour'],
          ].map(([label, valeur], i) => (
            <div
              key={label}
              className={`flex items-center gap-3 py-2.5 ${i > 0 ? 'border-t border-navy/[0.06]' : ''}`}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy">
                <FileText size={15} strokeWidth={2.2} />
              </span>
              <span className="flex-1 text-[12.5px] font-semibold text-navy">{label}</span>
              <span className="text-[11.5px] text-slateink">{valeur}</span>
            </div>
          ))}
        </Card>

        <Button variant="outline" size="lg" block className="mt-4" iconRight={ArrowRight}>
          Compléter mon dossier
        </Button>
      </ScreenBody>
    </>
  )
}
