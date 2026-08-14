/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#16324A',
          50: '#EEF2F6',
          100: '#D6E0E9',
          600: '#1D4266',
          900: '#0E2133',
        },
        teal: {
          DEFAULT: '#0E7C7B',
          50: '#E6F2F2',
          100: '#C7E4E3',
          600: '#0C6A69',
        },
        amber: {
          DEFAULT: '#E1863B',
          50: '#FDF3EA',
          100: '#F8E2CD',
          600: '#C86F28',
        },
        cream: '#FAF8F4',
        mist: '#F2F4F2',
        slateink: '#5B6B72',
        success: '#1E9E63',
        warning: '#E0A200',
        danger: '#D64545',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 10px -2px rgba(22,50,74,0.08), 0 8px 28px -12px rgba(22,50,74,0.12)',
        card: '0 1px 2px rgba(22,50,74,0.04), 0 12px 32px -16px rgba(22,50,74,0.18)',
        phone: '0 40px 90px -30px rgba(14,33,51,0.55), 0 12px 30px -12px rgba(14,33,51,0.35)',
        lift: '0 18px 40px -18px rgba(22,50,74,0.35)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        scanline: {
          '0%': { top: '4%' },
          '100%': { top: '92%' },
        },
        pingSoft: {
          '0%': { transform: 'scale(0.9)', opacity: 0.55 },
          '80%,100%': { transform: 'scale(2.4)', opacity: 0 },
        },
        dash: {
          to: { strokeDashoffset: -60 },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp .45s cubic-bezier(.22,1,.36,1) both',
        'fade-in': 'fadeIn .4s ease both',
        scanline: 'scanline 2.2s ease-in-out infinite alternate',
        'ping-soft': 'pingSoft 2.2s cubic-bezier(0,0,.2,1) infinite',
        dash: 'dash 1.6s linear infinite',
        floaty: 'floaty 3.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
