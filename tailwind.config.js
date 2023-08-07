/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in-left': 'fade-in-left 300ms forwards',
        'fade-out-right': 'fade-out-right 300ms forwards',
        'fade-out': 'fade-out 500ms forwards',
        'bounce-in': 'bounce-in 500ms forwards',
        'bounce-out': 'bounce-out 500ms forwards',
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
        'fade-out': {
          '0%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
          },
        },
        'bounce-in': {
          '0%': {
            opacity: 0,
            transform: 'scale3d(0.3, 0.3, 0.3)',
          },

          '20%': {
            transform: 'scale3d(1.1, 1.1, 1.1)',
          },

          '40%': {
            transform: 'scale3d(0.9, 0.9, 0.9)',
          },

          '60%': {
            opacity: 1,
            transform: 'scale3d(1.03, 1.03, 1.03)',
          },

          '80%': {
            transform: 'scale3d(0.97, 0.97, 0.97)',
          },

          to: {
            opacity: 1,
            transform: 'scale3d(1, 1, 1)',
          },
        },
        'bounce-out': {
          '20%': {
            transform: 'scale3d(0.9, 0.9, 0.9)',
          },

          '50%,55%': {
            opacity: 1,
            transform: 'scale3d(1.1, 1.1, 1.1)',
          },

          to: {
            opacity: 0,
            transform: 'scale3d(0.3, 0.3, 0.3)',
          },
        },
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      },
      backgroundImage: {
        'light-background': `url(${
          process.env.NEXT_PUBLIC_BACKGROUND_IMAGE_LIGHT ?? ''
        })`,
        'dark-background': `url(${process.env.NEXT_PUBLIC_BACKGROUND_IMAGE_DARK ?? ''})`,
      },
    },
  },
  plugins: [],
};
