/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0D0D12',
        primarySoft: '#14141C',
        accent: '#C9A84C',
        background: '#FAF8F5',
        textDark: '#2A2A35',
        card: '#2A2A35',
        terminal: '#0A0A0D',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        dramatic: ['Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        '2xl': '2rem',
        '3xl': '3rem',
      },
      transitionTimingFunction: {
        'magnetic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
}
