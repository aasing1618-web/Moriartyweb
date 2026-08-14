import { Star } from 'lucide-react'

export default function Stars({ note, size = 13, showValue = true, count, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <span className="flex items-center gap-[1px]">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={size}
            className={i <= Math.round(note) ? 'fill-amber text-amber' : 'text-navy/15 fill-navy/10'}
          />
        ))}
      </span>
      {showValue && (
        <span className="text-[12px] font-semibold text-navy">
          {note.toFixed(1).replace('.', ',')}
          {count ? <span className="font-medium text-slateink"> ({count})</span> : null}
        </span>
      )}
    </span>
  )
}
