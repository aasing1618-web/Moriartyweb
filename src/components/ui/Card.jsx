export default function Card({
  children,
  className = '',
  onClick,
  active = false,
  padded = true,
  hover = false,
  glass = false,
}) {
  const interactive = Boolean(onClick)
  return (
    <div
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      className={`rounded-2xl transition-all duration-300 ${
        glass ? 'glass-card shadow-soft' : 'bg-white shadow-card'
      } ${padded ? 'p-4 sm:p-5' : ''} ${
        active
          ? 'ring-2 ring-teal shadow-glow-teal border-transparent'
          : 'border border-navy/[0.08]'
      } ${
        interactive || hover
          ? 'cursor-pointer hover:-translate-y-1 hover:shadow-card-hover hover:border-teal/30 active:scale-[0.99]'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

export function SectionTitle({ children, action, className = '' }) {
  return (
    <div className={`mb-3 flex items-center justify-between ${className}`}>
      <h3 className="text-[15px] sm:text-[16px] font-bold text-navy tracking-tight">{children}</h3>
      {action}
    </div>
  )
}

