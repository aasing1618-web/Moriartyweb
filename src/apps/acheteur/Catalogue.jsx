import { useState } from 'react'
import {
  Sprout,
  Droplets,
  MapPin,
  Package,
  FileCheck2,
  X,
  ShoppingCart,
  Filter,
} from 'lucide-react'
import { Badge, Button, Card, SectionTitle } from '../../components/ui'
import { produitsValorisation, usagesAcheteur, fcfa } from '../../data/mockData'

const LIBELLES_FICHE = {
  traitement: 'Traitement appliqué',
  matiereSeche: 'Matière sèche',
  azote: 'Azote total',
  phosphore: 'Phosphore',
  dbo5: 'DBO₅',
  mes: 'Matières en suspension',
  coliformes: 'Coliformes fécaux',
  normes: 'Conformité',
  conditionnement: 'Conditionnement',
}

function FicheQualite({ produit, onFermer, onCommander }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/50 p-4 backdrop-blur-sm">
      <div className="max-h-[88vh] w-full max-w-lg animate-fade-up overflow-y-auto rounded-3xl bg-white p-6 shadow-phone">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge tone="success" icon={FileCheck2}>
              Fiche qualité
            </Badge>
            <h3 className="mt-2.5 text-[19px] font-bold leading-tight text-navy">{produit.nom}</h3>
            <p className="mt-1 text-[12.5px] text-slateink">
              Station {produit.station} · {produit.quantite} {produit.unite} disponibles
            </p>
          </div>
          <button
            onClick={onFermer}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mist text-navy transition hover:bg-navy-50"
          >
            <X size={17} strokeWidth={2.4} />
          </button>
        </div>

        <div className="mt-5 rounded-2xl border border-navy/[0.07] bg-cream p-1">
          {Object.entries(produit.fiche).map(([cle, valeur]) => (
            <div
              key={cle}
              className="flex items-center justify-between gap-4 border-b border-navy/[0.06] px-4 py-3 text-[12.5px] last:border-0"
            >
              <span className="text-slateink">{LIBELLES_FICHE[cle] || cle}</span>
              <span className="text-right font-semibold text-navy">{valeur}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl bg-success/[0.08] p-4">
          <div>
            <p className="text-[11.5px] text-slateink">Prix</p>
            <p className="text-[20px] font-extrabold leading-none text-navy">
              {fcfa(produit.prix)}
            </p>
            <p className="mt-1 text-[11px] text-slateink">{produit.prixUnite}</p>
          </div>
          <Button icon={ShoppingCart} onClick={() => onCommander(produit)}>
            Commander ce produit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function Catalogue({ onCommander }) {
  const [usage, setUsage] = useState('Tous les usages')
  const [fiche, setFiche] = useState(null)

  const liste =
    usage === 'Tous les usages'
      ? produitsValorisation
      : produitsValorisation.filter((p) => p.usages.includes(usage))

  return (
    <div className="space-y-5">
      <Card className="!p-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-2 text-[12.5px] font-semibold text-slateink">
            <Filter size={15} strokeWidth={2.3} />
            Filtrer par usage
          </span>
          <div className="flex flex-wrap gap-2">
            {['Tous les usages', ...usagesAcheteur].map((u) => (
              <button
                key={u}
                onClick={() => setUsage(u)}
                className={`rounded-xl px-3.5 py-2 text-[12.5px] font-semibold transition ${
                  u === usage
                    ? 'bg-navy text-white shadow-lift'
                    : 'bg-cream text-slateink hover:text-navy'
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <SectionTitle
        action={
          <span className="text-[12px] font-semibold text-slateink">
            {liste.length} produit{liste.length > 1 ? 's' : ''} disponible
            {liste.length > 1 ? 's' : ''}
          </span>
        }
      >
        Sous-produits disponibles en station
      </SectionTitle>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {liste.map((p) => {
          const estEau = p.categorie === 'Eau traitée'
          return (
            <Card key={p.id} className="flex flex-col !p-6">
              <div className="flex items-start justify-between">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl text-white ${
                    estEau ? 'bg-teal' : 'bg-success'
                  }`}
                >
                  {estEau ? (
                    <Droplets size={19} strokeWidth={2.2} />
                  ) : (
                    <Sprout size={19} strokeWidth={2.2} />
                  )}
                </span>
                <Badge tone={estEau ? 'teal' : 'success'} size="sm">
                  {p.categorie}
                </Badge>
              </div>

              <h3 className="mt-4 text-[15.5px] font-bold leading-snug text-navy">{p.nom}</h3>

              <div className="mt-3 space-y-1.5 text-[12.5px]">
                <p className="flex items-center gap-2 text-slateink">
                  <MapPin size={13} strokeWidth={2.3} className="text-teal" />
                  Station {p.station}
                </p>
                <p className="flex items-center gap-2 text-slateink">
                  <Package size={13} strokeWidth={2.3} className="text-teal" />
                  {p.quantite} {p.unite} disponibles
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.usages.map((u) => (
                  <span
                    key={u}
                    className="rounded-full bg-mist px-2.5 py-1 text-[10.5px] font-medium text-slateink"
                  >
                    {u}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-5">
                <p className="text-[20px] font-extrabold leading-none text-navy">
                  {fcfa(p.prix)}
                </p>
                <p className="mt-1 text-[11.5px] text-slateink">{p.prixUnite}</p>

                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    icon={FileCheck2}
                    onClick={() => setFiche(p)}
                  >
                    Fiche qualité
                  </Button>
                  <Button size="sm" className="flex-1" icon={ShoppingCart} onClick={() => onCommander(p)}>
                    Commander
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {fiche && (
        <FicheQualite
          produit={fiche}
          onFermer={() => setFiche(null)}
          onCommander={(p) => {
            setFiche(null)
            onCommander(p)
          }}
        />
      )}
    </div>
  )
}
