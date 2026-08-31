const TONES = {
  success: 'bg-success-50 text-success-600 border border-success/20',
  warning: 'bg-warning-50 text-[#9A6F00] border border-warning/25',
  danger: 'bg-danger-50 text-danger border border-danger/20',
  teal: 'bg-teal-50 text-teal border border-teal/20',
  navy: 'bg-navy-50 text-navy border border-navy/15',
  amber: 'bg-amber-50 text-amber-600 border border-amber/20',
  neutral: 'bg-mist/90 text-slateink border border-navy/5',
  white: 'bg-white/20 text-white backdrop-blur-md border border-white/25 shadow-sm',
}

export default function Badge({ children, tone = 'neutral', icon: Icon, dot = false, className = '', size = 'md' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-bold tracking-tight shadow-2xs transition-transform duration-200 hover:scale-[1.02] ${
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-[11.5px]'
      } ${TONES[tone]} ${className}`}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse shrink-0" />}
      {Icon && <Icon size={size === 'sm' ? 11 : 13} strokeWidth={2.4} className="shrink-0" />}
      <span>{children}</span>
    </span>
  )
}

