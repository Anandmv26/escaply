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
        // Travel-inspired color palette
        'misty-cream': '#F8F6F2',
        'sand': '#F5F1E8',
        'sky-blue': '#87CEEB',
        'lagoon': '#48CAE4',
        'terra-coral': '#FF6B6B',
        'teal': '#20B2AA',
        'charcoal': '#2C3E50',
        'deep-slate': '#34495E',
        'soft-green': '#7FB069',
        'stone': '#A8A8A8',
      },
      fontFamily: {
        'geometric': ['Inter', 'Roboto Flex', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'gentle-bounce': 'gentleBounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        gentleBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
} 