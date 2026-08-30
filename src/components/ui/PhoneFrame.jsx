import { ChevronLeft, Signal, Wifi, BatteryFull } from 'lucide-react'

function StatusBar({ tone = 'dark' }) {
  const color = tone === 'light' ? 'text-white' : 'text-navy'
  return (
    <div className={`relative z-30 flex h-11 shrink-0 items-end justify-between px-7 pb-1 ${color}`}>
      <span className="text-[12px] font-semibold tracking-tight">09:41</span>
      <span className="flex items-center gap-1.5">
        <Signal size={13} strokeWidth={2.6} />
        <Wifi size={13} strokeWidth={2.6} />
        <BatteryFull size={16} strokeWidth={2.2} />
      </span>
    </div>
  )
}

export default function PhoneFrame({ children, statusTone = 'dark', className = '' }) {
  return (
    <div className={`relative flex justify-center max-w-full ${className}`}>
      <div className="absolute -inset-10 -z-10 rounded-[80px] bg-teal/5 blur-2xl" />
      <div className="relative h-[812px] max-h-[calc(100vh-100px)] sm:max-h-[812px] w-[375px] max-w-[calc(100vw-24px)] rounded-[40px] sm:rounded-[52px] bg-[#0F1A24] p-[8px] sm:p-[11px] shadow-phone">
        <div className="pointer-events-none absolute inset-0 rounded-[40px] sm:rounded-[52px] ring-1 ring-white/10" />
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[32px] sm:rounded-[42px] bg-cream">
          <div className="pointer-events-none absolute left-1/2 top-0 z-40 h-[22px] sm:h-[26px] w-[120px] sm:w-[148px] -translate-x-1/2 rounded-b-[14px] sm:rounded-b-[16px] bg-[#0F1A24]" />
          <StatusBar tone={statusTone} />
          <div className="relative flex min-h-0 flex-1 flex-col">{children}</div>
          <div className="pointer-events-none absolute bottom-2 left-1/2 z-40 h-[5px] w-[110px] sm:w-[134px] -translate-x-1/2 rounded-full bg-navy/20" />
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------- */
/*  Briques d'écran mobile                                        */
/* -------------------------------------------------------------- */

export function ScreenHeader({ title, subtitle, onBack, right, tone = 'light', className = '' }) {
  const isLight = tone === 'light'
  return (
    <div
      className={`relative z-20 flex shrink-0 items-center gap-3 px-5 pb-3 pt-1 ${
        isLight ? 'text-navy' : 'text-white'
      } ${className}`}
    >
      {onBack && (
        <button
          onClick={onBack}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${
            isLight ? 'bg-white shadow-card hover:bg-navy-50' : 'bg-white/15 hover:bg-white/25'
          }`}
        >
          <ChevronLeft size={19} strokeWidth={2.4} />
        </button>
      )}
      <div className="min-w-0 flex-1">
        {title && <h2 className="truncate text-[17px] font-bold leading-tight">{title}</h2>}
        {subtitle && (
          <p className={`truncate text-[12px] ${isLight ? 'text-slateink' : 'text-white/70'}`}>
            {subtitle}
          </p>
        )}
      </div>
      {right}
    </div>
  )
}

export function ScreenBody({ children, className = '', padded = true }) {
  return (
    <div
      className={`no-scrollbar min-h-0 flex-1 overflow-y-auto ${
        padded ? 'px-5 pb-6' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

export function ScreenFooter({ children, className = '' }) {
  return (
    <div
      className={`shrink-0 border-t border-navy/[0.06] bg-white/85 px-5 pb-7 pt-3 backdrop-blur ${className}`}
    >
      {children}
    </div>
  )
}

export function BottomNav({ items, active, onChange }) {
  return (
    <div className="shrink-0 border-t border-navy/[0.06] bg-white/95 px-2 pb-6 pt-2 backdrop-blur">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = item.id === active
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`flex w-[74px] flex-col items-center gap-1 rounded-xl py-1.5 transition ${
                isActive ? 'text-teal' : 'text-slateink/70 hover:text-navy'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] ${isActive ? 'font-semibold' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
