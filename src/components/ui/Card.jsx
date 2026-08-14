export default function Card({
  children,
  className = '',
  onClick,
  active = false,
  padded = true,
  hover = false,
}) {
  const interactive = Boolean(onClick)
  return (
    <div
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      className={`rounded-2xl bg-white shadow-card transition-all duration-200 ${
        padded ? 'p-4' : ''
      } ${
        active
          ? 'ring-2 ring-teal border border-transparent'
          : 'border border-navy/[0.06]'
      } ${
        interactive || hover
          ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-soft active:scale-[0.99]'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

export function SectionTitle({ children, action, className = '' }) {
  return (
    <div className={`mb-3 flex items-end justify-between ${className}`}>
      <h3 className="text-[15px] font-semibold text-navy">{children}</h3>
      {action}
    </div>
  )
}
