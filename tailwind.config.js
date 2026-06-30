/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        volt: '#E8FF00',
        amber: '#FFB400',
        plasma: '#00E5FF',
        dark: '#0A0A0F',
        panel: '#0F0F1A',
        grid: '#1A1A2E',
        steel: '#2A2A3E',
      },
    },
  },
  plugins: [],
}
