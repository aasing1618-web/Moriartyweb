export default function ProgressBar({
  value = 0,
  color = '#0E7C7B',
  height = 8,
  track = 'rgba(22,50,74,0.08)',
  className = '',
}) {
  return (
    <div
      className={`w-full overflow-hidden rounded-full ${className}`}
      style={{ height, background: track }}
    >
      <div
        className="h-full rounded-full"
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          background: color,
          transition: 'width 1s cubic-bezier(.22,1,.36,1)',
        }}
      />
    </div>
  )
}
