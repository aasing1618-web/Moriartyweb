const TONES = {
  navy: { bg: 'bg-navy/8', text: 'text-navy' },
  teal: { bg: 'bg-teal/10', text: 'text-teal' },
  amber: { bg: 'bg-amber/12', text: 'text-amber-600' },
  success: { bg: 'bg-success/10', text: 'text-success' },
  danger: { bg: 'bg-danger/10', text: 'text-danger' },
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
      className={`rounded-2xl border border-navy/[0.06] bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[12px] font-medium uppercase tracking-wide text-slateink">{label}</p>
          <p className="mt-2 text-[30px] font-extrabold leading-none tracking-[-0.02em] text-navy">
            {valeur}
          </p>
        </div>
        {Icon && (
          <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tone.bg} ${tone.text}`}>
            <Icon size={20} strokeWidth={2.2} />
          </span>
        )}
      </div>
      {variation && (
        <p className={`mt-3 text-[12px] font-semibold ${tone.text}`}>{variation}</p>
      )}
    </div>
  )
}
