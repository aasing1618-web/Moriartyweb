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
          200: '#ADC2D5',
          600: '#1D4266',
          800: '#12293D',
          900: '#0E2133',
          950: '#091522',
        },
        teal: {
          DEFAULT: '#0E7C7B',
          50: '#E6F2F2',
          100: '#C7E4E3',
          200: '#94CFCB',
          600: '#0C6A69',
          800: '#094E4D',
        },
        amber: {
          DEFAULT: '#E1863B',
          50: '#FDF3EA',
          100: '#F8E2CD',
          200: '#F1C298',
          600: '#C86F28',
          800: '#954F19',
        },
        cream: '#FAF8F4',
        mist: '#F2F4F2',
        slateink: '#5B6B72',
        success: {
          DEFAULT: '#1E9E63',
          50: '#E8F6EF',
          100: '#C7ECD9',
          600: '#178150',
        },
        warning: {
          DEFAULT: '#E0A200',
          50: '#FEF9E6',
          100: '#FCEFB3',
        },
        danger: {
          DEFAULT: '#D64545',
          50: '#FCEBEB',
          100: '#F7CECE',
          600: '#B83232',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(22,50,74,0.06), 0 12px 32px -8px rgba(22,50,74,0.10)',
        card: '0 2px 8px rgba(22,50,74,0.03), 0 16px 36px -12px rgba(22,50,74,0.12)',
        'card-hover': '0 8px 30px rgba(22,50,74,0.12), 0 24px 48px -12px rgba(22,50,74,0.20)',
        phone: '0 40px 90px -20px rgba(14,33,51,0.65), 0 20px 40px -15px rgba(14,33,51,0.45)',
        lift: '0 12px 28px -10px rgba(22,50,74,0.30)',
        'glow-teal': '0 0 35px -5px rgba(14,124,123,0.45)',
        'glow-amber': '0 0 35px -5px rgba(225,134,59,0.45)',
        'glow-navy': '0 0 40px -5px rgba(22,50,74,0.50)',
        'glow-success': '0 0 35px -5px rgba(30,158,99,0.45)',
        glass: '0 8px 32px 0 rgba(22, 50, 74, 0.15)',
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(14px)' },
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
          '0%': { transform: 'scale(0.9)', opacity: 0.65 },
          '80%,100%': { transform: 'scale(2.6)', opacity: 0 },
        },
        dash: {
          to: { strokeDashoffset: -60 },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.05)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp .45s cubic-bezier(.22,1,.36,1) both',
        'fade-in': 'fadeIn .4s ease both',
        scanline: 'scanline 2.2s ease-in-out infinite alternate',
        'ping-soft': 'pingSoft 2.2s cubic-bezier(0,0,.2,1) infinite',
        dash: 'dash 1.6s linear infinite',
        floaty: 'floaty 4s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

