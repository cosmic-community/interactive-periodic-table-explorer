/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors for element categories
        'alkali-metal': '#ff9ff3',
        'alkaline-earth-metal': '#4ecdc4',
        'transition-metal': '#45b7d1',
        'post-transition-metal': '#96ceb4',
        'metalloid': '#feca57',
        'reactive-nonmetal': '#ff6b6b',
        'noble-gas': '#5f27cd',
        'halogen': '#54a0ff',
        'lanthanide': '#00d2d3',
        'actinide': '#ff9f43',
        'unknown-synthetic': '#6c5ce7',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      gridTemplateColumns: {
        '18': 'repeat(18, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        '7': 'repeat(7, minmax(0, 1fr))',
        '2': 'repeat(2, minmax(0, 1fr))',
      },
      aspectRatio: {
        'square': '1 / 1',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      }
    },
  },
  plugins: [],
}