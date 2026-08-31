import { useState } from 'react'
import { Building2, Hash, Phone, MapPin, Sprout, Check, ChevronDown } from 'lucide-react'
import { Avatar, Badge, Button, Card, SectionTitle } from '../../components/ui'
import { profilAcheteur, typesProfilAcheteur, usagesAcheteur } from '../../data/mockData'

const classeChamp =
  'w-full appearance-none rounded-2xl border border-navy/10 bg-white px-4 py-3 text-[13.5px] font-semibold text-navy shadow-card outline-none transition focus:border-teal'

function Champ({ icon: Icon, label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-wide text-slateink">
        <Icon size={13} strokeWidth={2.4} />
        {label}
      </span>
      {children}
    </label>
  )
}

export default function ProfilAcheteur() {
  const [profil, setProfil] = useState(profilAcheteur)
  const [enregistre, setEnregistre] = useState(false)

  const modifier = (champ) => (e) => {
    setProfil({ ...profil, [champ]: e.target.value })
    setEnregistre(false)
  }

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
      <Card className="!p-7 xl:col-span-2">
        <SectionTitle>Profil acheteur</SectionTitle>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Champ icon={Building2} label="Type de profil">
              <div className="relative">
                <select value={profil.type} onChange={modifier('type')} className={classeChamp}>
                  {typesProfilAcheteur.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slateink"
                />
              </div>
            </Champ>
          </div>

          <div className="md:col-span-2">
            <Champ icon={Building2} label="Raison sociale">
              <input
                value={profil.raisonSociale}
                onChange={modifier('raisonSociale')}
                className={classeChamp}
              />
            </Champ>
          </div>

          <Champ icon={Hash} label="NINEA">
            <input value={profil.ninea} onChange={modifier('ninea')} className={classeChamp} />
          </Champ>

          <Champ icon={Phone} label="Contact">
            <input value={profil.contact} onChange={modifier('contact')} className={classeChamp} />
          </Champ>

          <Champ icon={MapPin} label="Zone">
            <input value={profil.zone} onChange={modifier('zone')} className={classeChamp} />
          </Champ>

          <Champ icon={Sprout} label="Usage déclaré">
            <div className="relative">
              <select
                value={profil.usageDeclare}
                onChange={modifier('usageDeclare')}
                className={classeChamp}
              >
                {usagesAcheteur.map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slateink"
              />
            </div>
          </Champ>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-navy/[0.07] pt-5">
          <Button icon={enregistre ? Check : undefined} onClick={() => setEnregistre(true)}>
            {enregistre ? 'Profil enregistré' : 'Enregistrer le profil'}
          </Button>
          <p className="text-[11.5px] text-slateink">
            L’usage déclaré conditionne les produits accessibles au catalogue.
          </p>
        </div>
      </Card>

      <div className="space-y-5">
        <Card className="border-navy/10 bg-gradient-to-br from-navy to-navy-600 !p-6 text-white">
          <div className="flex items-center gap-4">
            <Avatar initiales={profil.initiales} color="white" size="lg" />
            <div className="min-w-0">
              <p className="truncate text-[16px] font-bold leading-tight">{profil.raisonSociale}</p>
              <p className="truncate text-[12px] text-white/70">{profil.type}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            <Badge tone="white" size="sm">
              NINEA vérifié
            </Badge>
            <Badge tone="white" size="sm">
              Client depuis {profil.clientDepuis}
            </Badge>
          </div>
        </Card>

        <Card className="!p-6">
          <SectionTitle>Coordonnées</SectionTitle>
          {[
            ['Contact', profil.contact],
            ['Zone', profil.zone],
            ['Usage déclaré', profil.usageDeclare],
            ['NINEA', profil.ninea],
          ].map(([label, valeur]) => (
            <div
              key={label}
              className="flex items-start justify-between gap-4 border-b border-navy/[0.06] py-2.5 text-[12.5px] last:border-0"
            >
              <span className="shrink-0 text-slateink">{label}</span>
              <span className="text-right font-semibold text-navy">{valeur}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}
