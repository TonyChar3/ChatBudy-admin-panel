/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    fontFamily:{
      sans: ['Fira sans','sans-serif']
    },
    extend: {
      animation: {
        swing: 'swing 1s ease-in-out',
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'fade-out-up': 'fade-out-up 0.5s ease-out',
        'growAndShrink': 'growAndShrink 2s ease-in-out infinite',
      },
      keyframes: {
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-out-up': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}

