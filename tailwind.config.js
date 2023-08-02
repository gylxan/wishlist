/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in-left': 'fade-in-left 300ms forwards',
        'fade-out-right': 'fade-out-right 300ms forwards',
      },
      keyframes: {
        'fade-in-left': {
          '0%': {
            opacity: 0,
            transform: 'translateX(110%)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
        'fade-out-right': {
          '0%': {
            opacity: 1,
            transform: 'translateX(0)',
          },
          '100%': {
            opacity: 0,
            transform: 'translateX(110%)',
          },
        },
      },
    },
  },
  plugins: [],
};
