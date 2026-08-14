const VARIANTS = {
  primary: 'bg-navy text-white hover:bg-navy-600 shadow-lift',
  accent: 'bg-amber text-white hover:bg-amber-600 shadow-lift',
  teal: 'bg-teal text-white hover:bg-teal-600 shadow-lift',
  outline: 'bg-white text-navy border border-navy/15 hover:border-navy/35 hover:bg-navy-50',
  soft: 'bg-navy-50 text-navy hover:bg-navy-100',
  ghost: 'text-navy hover:bg-navy/5',
  danger: 'bg-danger text-white hover:brightness-95',
  white: 'bg-white text-navy hover:bg-white/90 shadow-lift',
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
      className={`inline-flex items-center justify-center font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-40 ${
        VARIANTS[variant]
      } ${SIZES[size]} ${block ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 15 : 18} strokeWidth={2.2} />}
      {children}
      {IconRight && <IconRight size={size === 'sm' ? 15 : 18} strokeWidth={2.2} />}
    </button>
  )
}
