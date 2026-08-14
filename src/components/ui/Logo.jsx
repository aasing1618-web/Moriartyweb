export default function Logo({ size = 40, className = '', mono = false }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden shadow-lift ${className}`}
      style={{ width: size, height: size, borderRadius: size * 0.3 }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: mono
            ? '#FFFFFF'
            : 'linear-gradient(140deg, #16324A 0%, #0E7C7B 78%, #14A29E 100%)',
        }}
      />
      <svg viewBox="0 0 48 48" className="relative" width={size * 0.62} height={size * 0.62}>
        <path
          d="M24 6c6.6 8.2 11 14.3 11 19.6C35 32.6 30 38 24 38s-11-5.4-11-12.4C13 20.3 17.4 14.2 24 6Z"
          fill={mono ? '#16324A' : '#FFFFFF'}
          fillOpacity={mono ? 1 : 0.95}
        />
        <path
          d="m19 25.6 3.6 3.6L30 21.8"
          fill="none"
          stroke={mono ? '#FFFFFF' : '#0E7C7B'}
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="42.5" r="2.4" fill={mono ? '#0E7C7B' : '#E1863B'} />
      </svg>
    </div>
  )
}

export function Wordmark({ size = 40, className = '', tone = 'navy' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Logo size={size} />
      <div className="leading-none">
        <div
          className={`font-extrabold tracking-[-0.02em] ${
            tone === 'white' ? 'text-white' : 'text-navy'
          }`}
          style={{ fontSize: size * 0.5 }}
        >
          Assaini<span className="text-teal">Track</span>
        </div>
      </div>
    </div>
  )
}
