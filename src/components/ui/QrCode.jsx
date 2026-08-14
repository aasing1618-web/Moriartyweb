/**
 * QR code purement décoratif : damier déterministe généré à partir d'une chaîne.
 * Il n'encode aucune donnée et n'est pas scannable — usage démonstration seulement.
 */
const GRID = 21

function motif(seed) {
  let h = 0
  for (let i = 0; i < seed.length; i += 1) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  const cells = []
  for (let y = 0; y < GRID; y += 1) {
    for (let x = 0; x < GRID; x += 1) {
      h = (h * 1103515245 + 12345) >>> 0
      cells.push(((h >> 8) & 1) === 1)
    }
  }
  return cells
}

function estRepere(x, y) {
  const zones = [
    [0, 0],
    [GRID - 7, 0],
    [0, GRID - 7],
  ]
  return zones.some(([zx, zy]) => x >= zx && x < zx + 7 && y >= zy && y < zy + 7)
}

export default function QrCode({ value = 'ASSAINITRACK', size = 168, className = '' }) {
  const cells = motif(value)
  const unit = 100 / GRID

  return (
    <div
      className={`rounded-2xl bg-white p-3 shadow-card ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        {cells.map((on, i) => {
          const x = i % GRID
          const y = Math.floor(i / GRID)
          if (estRepere(x, y) || !on) return null
          return (
            <rect
              key={i}
              x={x * unit}
              y={y * unit}
              width={unit * 0.86}
              height={unit * 0.86}
              rx={unit * 0.22}
              fill="#16324A"
            />
          )
        })}
        {[
          [0, 0],
          [GRID - 7, 0],
          [0, GRID - 7],
        ].map(([zx, zy], i) => (
          <g key={i}>
            <rect
              x={zx * unit}
              y={zy * unit}
              width={unit * 6.8}
              height={unit * 6.8}
              rx={unit * 1.6}
              fill="none"
              stroke="#16324A"
              strokeWidth={unit * 1.05}
            />
            <rect
              x={(zx + 2) * unit}
              y={(zy + 2) * unit}
              width={unit * 2.8}
              height={unit * 2.8}
              rx={unit * 0.7}
              fill="#0E7C7B"
            />
          </g>
        ))}
      </svg>
    </div>
  )
}
