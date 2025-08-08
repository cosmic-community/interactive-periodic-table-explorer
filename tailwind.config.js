import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        gold: {
          400: 'var(--gold-400)',
          500: 'var(--gold-500)'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gold-gradient': 'linear-gradient(135deg, var(--gold-400), var(--gold-500))'
      },
      animation: {
        'achievement-unlock': 'achievement-unlock 0.6s ease-out',
        'score-popup': 'score-popup 1s ease-out',
        'bounce-in': 'bounce-in 0.6s ease-out'
      },
      keyframes: {
        'achievement-unlock': {
          '0%': { 
            transform: 'scale(0) rotate(-180deg)', 
            opacity: '0' 
          },
          '50%': { 
            transform: 'scale(1.2) rotate(0deg)', 
            opacity: '1' 
          },
          '100%': { 
            transform: 'scale(1) rotate(0deg)', 
            opacity: '1' 
          }
        },
        'score-popup': {
          '0%': {
            transform: 'translateY(0) scale(1)',
            opacity: '1'
          },
          '50%': {
            transform: 'translateY(-20px) scale(1.2)',
            opacity: '1'
          },
          '100%': {
            transform: 'translateY(-40px) scale(1)',
            opacity: '0'
          }
        },
        'bounce-in': {
          '0%': {
            transform: 'scale(0)',
            opacity: '0'
          },
          '50%': {
            transform: 'scale(1.1)',
            opacity: '1'
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1'
          }
        }
      },
      aspectRatio: {
        'card': '1 / 1'
      }
    },
  },
  plugins: [],
}

export default config