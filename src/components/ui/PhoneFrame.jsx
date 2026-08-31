import { ChevronLeft, Signal, Wifi, BatteryFull } from 'lucide-react'

function StatusBar({ tone = 'dark' }) {
  const color = tone === 'light' ? 'text-white' : 'text-navy'
  return (
    <div className={`relative z-30 flex h-11 shrink-0 items-end justify-between px-7 pb-1 ${color}`}>
      <span className="text-[12px] font-bold tracking-tight">09:41</span>
      <span className="flex items-center gap-1.5 opacity-90">
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
      {/* Outer ambient glow */}
      <div className="absolute -inset-10 -z-10 rounded-[80px] bg-gradient-to-tr from-teal/15 via-amber/10 to-navy/20 blur-3xl opacity-70" />
      
      {/* Phone Body Shell */}
      <div className="relative h-[812px] max-h-[calc(100vh-100px)] sm:max-h-[812px] w-[375px] max-w-[calc(100vw-24px)] rounded-[44px] sm:rounded-[54px] bg-gradient-to-b from-[#1C2C3B] via-[#0F1A24] to-[#0A121A] p-[9px] sm:p-[12px] shadow-phone border border-white/15">
        {/* Metallic Bezel Highlight Ring */}
        <div className="pointer-events-none absolute inset-0 rounded-[44px] sm:rounded-[54px] ring-1 ring-white/20" />
        
        {/* Inner Screen Display */}
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[34px] sm:rounded-[44px] bg-cream shadow-inner">
          {/* Dynamic Island Notch */}
          <div className="pointer-events-none absolute left-1/2 top-2 z-50 flex h-[22px] sm:h-[25px] w-[110px] sm:w-[130px] -translate-x-1/2 items-center justify-between rounded-full bg-[#0A121A] px-3 shadow-md">
            <span className="h-2 w-2 rounded-full bg-navy-800/80 ring-1 ring-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-teal-600 to-navy-900 ring-1 ring-teal/30" />
          </div>

          <StatusBar tone={statusTone} />
          
          <div className="relative flex min-h-0 flex-1 flex-col">{children}</div>
          
          {/* Home Indicator Bar */}
          <div className="pointer-events-none absolute bottom-2 left-1/2 z-40 h-[4px] w-[120px] sm:w-[134px] -translate-x-1/2 rounded-full bg-navy/25 transition-all duration-300" />
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
      className={`relative z-20 flex shrink-0 items-center gap-3 px-5 pb-3 pt-1 transition-colors duration-200 ${
        isLight ? 'text-navy' : 'text-white'
      } ${className}`}
    >
      {onBack && (
        <button
          onClick={onBack}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200 active:scale-95 ${
            isLight
              ? 'bg-white shadow-card hover:bg-navy-50 hover:shadow-soft text-navy border border-navy/10'
              : 'bg-white/15 backdrop-blur hover:bg-white/25 text-white'
          }`}
        >
          <ChevronLeft size={19} strokeWidth={2.4} />
        </button>
      )}
      <div className="min-w-0 flex-1">
        {title && <h2 className="truncate text-[17px] font-bold leading-tight tracking-tight">{title}</h2>}
        {subtitle && (
          <p className={`truncate text-[12px] font-medium ${isLight ? 'text-slateink' : 'text-white/80'}`}>
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
      className={`shrink-0 border-t border-navy/[0.08] bg-white/90 px-5 pb-7 pt-3 backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  )
}

export function BottomNav({ items, active, onChange }) {
  return (
    <div className="shrink-0 border-t border-navy/[0.08] bg-white/95 px-2 pb-6 pt-2 backdrop-blur-md shadow-card">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = item.id === active
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`relative flex w-[72px] flex-col items-center gap-1 rounded-xl py-1.5 transition-all duration-200 ${
                isActive ? 'text-teal font-bold scale-105' : 'text-slateink/70 hover:text-navy'
              }`}
            >
              {isActive && (
                <span className="absolute -top-1 h-1 w-6 rounded-full bg-teal shadow-glow-teal animate-fade-in" />
              )}
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

