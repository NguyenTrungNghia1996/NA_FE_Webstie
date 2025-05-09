/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      // animation: {
      //   HeaderAnimation: 'HeaderAnimation 0.3s linear',
      // },
      // keyframes: {
      //   HeaderAnimation: {
      //     '0%': { top: '-100px' },
      //     '100%': { top: '0' },
      //   },
      // },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography')
  ],
}

