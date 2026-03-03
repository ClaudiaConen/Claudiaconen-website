/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'luxury-gold': '#DAA520',
        'bright-gold': '#F4D03F',
        'midnight-blue': '#0A1628',
        'royal-navy': '#1A2B4C',
        'pearl-white': '#FDFBF7',
        'cream': '#FFFEF9',
        'warm': '#F7F3EB',
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
    },
  },
  plugins: [],
};
