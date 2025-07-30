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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      // Extend opacity values to ensure all translucent values work properly
      opacity: {
        '15': '0.15',
        '25': '0.25',
        '35': '0.35',
        '45': '0.45',
        '85': '0.85',
      },
      // Add custom backdrop blur values if needed
      backdropBlur: {
        xs: '2px',
      },
      // Ensure proper text shadow utilities
      textShadow: {
        'sm': '1px 1px 2px rgba(0, 0, 0, 0.5)',
        'default': '2px 2px 4px rgba(0, 0, 0, 0.5)',
        'lg': '3px 3px 6px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [
    // Add text shadow plugin if needed
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-sm': {
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-lg': {
          textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}