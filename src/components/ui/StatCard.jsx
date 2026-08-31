const TONES = {
  navy: { bg: 'bg-gradient-to-br from-navy-50 to-navy-100 text-navy border border-navy/10', text: 'text-navy' },
  teal: { bg: 'bg-gradient-to-br from-teal-50 to-teal-100 text-teal border border-teal/15', text: 'text-teal' },
  amber: { bg: 'bg-gradient-to-br from-amber-50 to-amber-100 text-amber-600 border border-amber/15', text: 'text-amber-600' },
  success: { bg: 'bg-gradient-to-br from-success-50 to-success-100 text-success-600 border border-success/15', text: 'text-success-600' },
  danger: { bg: 'bg-gradient-to-br from-danger-50 to-danger-100 text-danger-600 border border-danger/15', text: 'text-danger-600' },
}

export default function StatCard({
  label,
  valeur,
  variation,
  icon: Icon,
  ton = 'navy',
  className = '',
}) {
  const tone = TONES[ton] || TONES.navy
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-navy/[0.08] bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11.5px] font-bold uppercase tracking-wider text-slateink/80">{label}</p>
          <p className="mt-2.5 text-[28px] sm:text-[32px] font-black leading-none tracking-tight text-navy">
            {valeur}
          </p>
        </div>
        {Icon && (
          <span className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-lift transition-transform duration-300 group-hover:scale-110 ${tone.bg}`}>
            <Icon size={22} strokeWidth={2.2} />
          </span>
        )}
      </div>
      {variation && (
        <div className="mt-3.5 flex items-center gap-1.5">
          <span className={`text-[12px] font-bold ${tone.text}`}>
            {variation}
          </span>
        </div>
      )}
    </div>
  )
}

