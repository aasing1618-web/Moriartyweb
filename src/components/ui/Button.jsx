const VARIANTS = {
  primary: 'bg-gradient-to-r from-navy to-navy-800 text-white hover:from-navy-600 hover:to-navy shadow-lift hover:shadow-glow-navy border border-white/10',
  accent: 'bg-gradient-to-r from-amber to-amber-600 text-white hover:from-amber-600 hover:to-amber-800 shadow-lift hover:shadow-glow-amber border border-white/15',
  teal: 'bg-gradient-to-r from-teal to-teal-600 text-white hover:from-teal-600 hover:to-teal-800 shadow-lift hover:shadow-glow-teal border border-white/15',
  outline: 'bg-white/80 backdrop-blur-md text-navy border border-navy/15 hover:border-navy/35 hover:bg-navy-50 hover:shadow-soft',
  soft: 'bg-navy-50/80 backdrop-blur-sm text-navy hover:bg-navy-100/90 hover:text-navy-900',
  ghost: 'text-navy hover:bg-navy/5 active:bg-navy/10',
  danger: 'bg-gradient-to-r from-danger to-danger-600 text-white hover:brightness-105 shadow-lift border border-white/10',
  white: 'bg-white text-navy hover:bg-white/95 shadow-lift hover:shadow-card-hover border border-navy/5',
}

const SIZES = {
  sm: 'h-9 px-3.5 text-[13px] gap-1.5 rounded-xl',
  md: 'h-11 px-5 text-sm gap-2 rounded-2xl',
  lg: 'h-14 px-6 text-[15px] gap-2.5 rounded-2xl',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  icon: Icon,
  iconRight: IconRight,
  className = '',
  ...props
}) {
  return (
    <button
      type="button"
      className={`relative inline-flex items-center justify-center font-bold tracking-tight transition-all duration-200 active:scale-[0.97] hover:-translate-y-0.5 disabled:opacity-40 disabled:pointer-events-none disabled:transform-none ${
        VARIANTS[variant]
      } ${SIZES[size]} ${block ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 15 : 18} strokeWidth={2.2} className="shrink-0" />}
      <span>{children}</span>
      {IconRight && <IconRight size={size === 'sm' ? 15 : 18} strokeWidth={2.2} className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />}
    </button>
  )
}

