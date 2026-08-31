/**
 * Fond de carte entièrement simulé en SVG (aucun service cartographique,
 * aucune clé d'API). Les marqueurs sont positionnés en absolu par-dessus.
 */

const BLOCS = [
  [8, 14, 66, 44], [82, 10, 74, 48], [166, 16, 58, 40], [236, 8, 82, 50], [330, 14, 62, 44],
  [10, 96, 60, 56], [82, 92, 78, 60], [172, 98, 52, 52], [236, 90, 66, 62], [312, 96, 80, 54],
  [12, 178, 72, 46], [96, 172, 60, 54], [168, 180, 74, 44], [254, 176, 58, 52], [324, 182, 66, 46],
  [8, 250, 58, 60], [78, 256, 70, 52], [160, 248, 62, 58], [232, 254, 74, 50], [318, 250, 70, 56],
  [16, 330, 76, 44], [104, 336, 62, 40], [178, 330, 70, 46], [260, 336, 58, 40], [330, 330, 60, 46],
]

export default function MapCanvas({ children, className = '', tone = 'day' }) {
  const isNight = tone === 'night'
  const palette = isNight
    ? { fond: '#0E1A24', bloc: '#182836', route: '#233748', parc: '#13352B', eau: '#0A242B' }
    : { fond: '#E8ECE6', bloc: '#DCE4D8', route: '#FFFFFF', parc: '#CAE2C2', eau: '#BFE0DF' }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: palette.fond }}>
      <svg
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <rect width="400" height="400" fill={palette.fond} />

        {/* Blocs de quartier */}
        {BLOCS.map(([x, y, w, h], i) => (
          <rect
            key={i}
            x={x}
            y={y}
            width={w}
            height={h}
            rx="8"
            fill={palette.bloc}
            opacity={0.95}
          />
        ))}

        {/* Espaces verts */}
        <rect x="96" y="172" width="60" height="54" rx="12" fill={palette.parc} />
        <circle cx="290" cy="120" r="28" fill={palette.parc} opacity="0.9" />

        {/* Plan d'eau */}
        <path d="M0 370 Q 70 348 140 370 T 290 374 L 400 358 L 400 400 L 0 400 Z" fill={palette.eau} />

        {/* Réseau viaire principal */}
        <g stroke={palette.route} strokeLinecap="round" fill="none">
          <path d="M0 78 H400" strokeWidth="12" />
          <path d="M0 160 H400" strokeWidth="9" />
          <path d="M0 238 H400" strokeWidth="12" />
          <path d="M0 318 H400" strokeWidth="9" />
          <path d="M76 0 V400" strokeWidth="12" />
          <path d="M160 0 V400" strokeWidth="9" />
          <path d="M228 0 V400" strokeWidth="9" />
          <path d="M310 0 V400" strokeWidth="12" />
          <path d="M0 20 L 120 130 L 250 200 L 400 300" strokeWidth="7" opacity="0.8" />
        </g>
        
        {/* Lignes médianes / secondaires */}
        <g stroke={isNight ? '#3A5769' : '#E5E1D7'} strokeWidth="1.5" fill="none" opacity="0.85">
          <path d="M0 118 H400" />
          <path d="M0 278 H400" />
          <path d="M118 0 V400" />
          <path d="M268 0 V400" />
        </g>
      </svg>

      {!isNight && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/40" />
      )}
      {children}
    </div>
  )
}

/* -------------------------------------------------------------- */

const MARKER_COLORS = {
  teal: '#0E7C7B',
  navy: '#16324A',
  amber: '#E1863B',
  success: '#1E9E63',
  danger: '#D64545',
  blue: '#2563EB',
}

export function MapMarker({
  x,
  y,
  color = 'teal',
  icon: Icon,
  label,
  pulse = false,
  size = 42,
  className = '',
}) {
  const hex = MARKER_COLORS[color] || color
  return (
    <div
      className={`absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center group transition-transform duration-300 hover:scale-110 ${className}`}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className="relative flex items-center justify-center">
        {pulse && (
          <span
            className="absolute animate-ping-soft rounded-full opacity-75"
            style={{ background: hex, width: size * 1.5, height: size * 1.5 }}
          />
        )}
        <div
          className="relative flex items-center justify-center rounded-full border-[3px] border-white text-white shadow-lift ring-2 ring-black/10"
          style={{ background: hex, width: size, height: size }}
        >
          {Icon && <Icon size={size * 0.45} strokeWidth={2.4} />}
        </div>
      </div>
      {label && (
        <span className="mt-1.5 whitespace-nowrap rounded-lg bg-white/95 backdrop-blur-md px-2.5 py-1 text-[10.5px] font-bold text-navy shadow-card border border-navy/10">
          {label}
        </span>
      )}
    </div>
  )
}

export function MapDot({ x, y, color = '#1E9E63', pulse = false, size = 12, title }) {
  return (
    <span
      className="absolute -translate-x-1/2 -translate-y-1/2 group"
      style={{ left: `${x}%`, top: `${y}%` }}
      title={title}
    >
      {pulse && (
        <span
          className="absolute -inset-1 animate-ping-soft rounded-full"
          style={{ background: color }}
        />
      )}
      <span
        className="relative block rounded-full border-2 border-white shadow-lift transition-transform duration-200 group-hover:scale-125"
        style={{ background: color, width: size, height: size }}
      />
    </span>
  )
}

/** Itinéraire en pointillés animés entre deux points (en %). */
export function RouteLine({ from, to, color = '#0E7C7B', curve = -18 }) {
  const mx = (from.x + to.x) / 2 + curve
  const my = (from.y + to.y) / 2 + curve / 2
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <path
        d={`M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`}
        fill="none"
        stroke="white"
        strokeWidth="3.2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        opacity="0.9"
      />
      <path
        d={`M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`}
        fill="none"
        stroke={color}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeDasharray="8 8"
        vectorEffect="non-scaling-stroke"
        className="animate-dash"
      />
    </svg>
  )
}

