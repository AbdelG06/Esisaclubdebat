/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        club: { blue: '#0d3b8e', navy: '#09255c', gold: '#f5b817', cream: '#fffaf0', ink: '#11264d' },
      },
      fontFamily: { sans: ['Inter', 'sans-serif'], display: ['Playfair Display', 'serif'] },
    },
  },
  plugins: [],
}
