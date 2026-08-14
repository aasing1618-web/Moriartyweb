const COLORS = {
  navy: 'bg-navy text-white',
  teal: 'bg-teal text-white',
  amber: 'bg-amber text-white',
  soft: 'bg-navy-50 text-navy',
  white: 'bg-white text-navy',
}

const SIZES = {
  sm: 'h-9 w-9 text-[12px] rounded-xl',
  md: 'h-11 w-11 text-[14px] rounded-2xl',
  lg: 'h-16 w-16 text-[20px] rounded-3xl',
  xl: 'h-20 w-20 text-[26px] rounded-[28px]',
}

export default function Avatar({ initiales, color = 'navy', size = 'md', className = '' }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center font-bold tracking-wide ${COLORS[color]} ${SIZES[size]} ${className}`}
    >
      {initiales}
    </div>
  )
}
