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
        // Pastel variants
        'sky-blue-pastel': 'rgba(135, 206, 235, 0.18)',
        'lagoon-pastel': 'rgba(72, 202, 228, 0.18)',
        'terra-coral-pastel': 'rgba(255, 107, 107, 0.18)',
        'teal-pastel': 'rgba(32, 178, 170, 0.18)',
        'soft-green-pastel': 'rgba(127, 176, 105, 0.18)',
        'sand-pastel': 'rgba(245, 241, 232, 0.7)',
        'misty-cream-pastel': 'rgba(248, 246, 242, 0.7)',
        // Pastel theme additions
        'pastel-green': '#B8E0D2',
        'pastel-blue': '#BFD7ED',
        'pastel-sand': '#FDF6E3',
        'pastel-sky': '#D6EFFF',
        'pastel-mountain': '#C3E6CB',
        'pastel-beach': '#FFF5E1',
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