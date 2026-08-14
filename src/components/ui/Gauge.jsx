/** Jauge circulaire (SVG pur, valeur statique animée par transition CSS). */
export default function Gauge({
  value = 0,
  size = 120,
  stroke = 11,
  color = '#0E7C7B',
  track = '#EEF2F0',
  label,
  sublabel,
}) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (Math.min(100, Math.max(0, value)) / 100) * c

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(.22,1,.36,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-bold leading-none text-navy" style={{ fontSize: size * 0.24 }}>
          {label ?? `${value} %`}
        </span>
        {sublabel && (
          <span className="mt-1 text-[10px] font-medium uppercase tracking-wide text-slateink">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  )
}
