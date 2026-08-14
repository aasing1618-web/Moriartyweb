const TONES = {
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/12 text-[#9A6F00]',
  danger: 'bg-danger/10 text-danger',
  teal: 'bg-teal/10 text-teal',
  navy: 'bg-navy/8 text-navy',
  amber: 'bg-amber/12 text-amber-600',
  neutral: 'bg-mist text-slateink',
  white: 'bg-white/15 text-white backdrop-blur',
}

export default function Badge({ children, tone = 'neutral', icon: Icon, className = '', size = 'md' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-[11px]'
      } ${TONES[tone]} ${className}`}
    >
      {Icon && <Icon size={size === 'sm' ? 11 : 13} strokeWidth={2.4} />}
      {children}
    </span>
  )
}
