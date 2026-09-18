/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'cormorant': ['Cormorant Garamond', 'Georgia', 'serif'],
        'script': ['Great Vibes', 'cursive'],
        'jakarta': ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      colors: {
        'luxury-gold': '#DAA520',
        'bright-gold': '#F4D03F',
        'dark-gold': '#B8860B',
        'mid-gold': '#D4AF37',
        'light-gold': '#C9A961',
        'midnight-blue': '#0A1628',
        'royal-navy': '#1A2B4C',
        'pearl-white': '#FDFBF7',
        'cream': '#FFFEF9',
        'warm': '#F7F3EB',
        // POAI ("Power of AI") Buchprojekt — Apple-inspirierte Light-Palette
        // mit lebendigen Magenta-/Türkis-/Gold-Akzenten.
        'poai-bg': '#FBF9F4',          // warmes off-white (Hintergrund)
        'poai-bg-2': '#FFFFFF',         // reine Card-Fläche
        'poai-bg-3': '#F2EEE6',         // sanftes Kontrast-Panel
        'poai-magenta': '#D6388F',      // etwas tiefer für Light-BG (besserer Kontrast)
        'poai-magenta-2': '#A02478',    // dunkler Magenta-Verlauf
        'poai-magenta-soft': '#FDE8F2', // weicher Tint
        'poai-turquoise': '#0FB5A6',    // tiefer für Lesbarkeit auf Light
        'poai-turquoise-2': '#0E8C80',
        'poai-turquoise-soft': '#E6F8F5',
        'poai-gold': '#B98E1F',
        'poai-gold-soft': '#FBF1D8',
        'poai-text': '#0F0A2A',         // deep navy-purple — Hauptschrift
        'poai-text-dim': '#3F3A5F',     // Body-Text
        'poai-text-mute': '#6E6A86',    // Captions / Helfer
        'poai-line': '#E8E4F0',         // dezente Linien
        'poai-violet': '#8B5CF6',       // Akzent-Rand (Apple Liquid Glass)
        'poai-violet-soft': '#C4B5FD',
        'poai-violet-glow': '#A78BFA',
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'shimmer': 'shimmer 2.4s linear infinite',
        'book-spin': 'book-spin 18s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'book-spin': {
          '0%':   { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
