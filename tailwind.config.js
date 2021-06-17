const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      'alt-black': '#0D1117',
      'alt-black-lighter': '#141920',
      'alt-black-darker': '#06080b',
      'alt-black-100': '#161B22',
      transparent: 'transparent',
      current: 'currentColor',

      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      red: colors.red,
      yellow: colors.amber,
      green: colors.emerald,
      blue: colors.blue,
      indigo: colors.indigo,
      purple: colors.violet,
      pink: colors.pink,
    },
    extend: {
      fontFamily: {
        inter: 'Inter',
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans]
      },
      backgroundImage: (theme) => ({
        'footer-texture': "url('/bubbles.svg')",
      }),
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 6s ease-in-out infinite'
       },
      keyframes: {
        float: {
          '0%': {
            transform: 'translatey(0px)',
            // boxShadow: '0 5px 15px 0px rgba(0,0,0,0.6)'
          },
          '50%': {
            transform: 'translatey(-20px)',
            // boxShadow: '0 25px 15px 0px rgba(0,0,0,0.2)'
          },
          '100%': {
            transform: 'translatey(0px)',
            // boxShadow: '0 5px 15px 0px rgba(0,0,0,0.6)'
          },
        },
      }
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

// @keyframes float {
// 	0% {
// 		box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
// 		transform: translatey(0px);
// 	}
// 	50% {
// 		box-shadow: 0 25px 15px 0px rgba(0,0,0,0.2);
// 		transform: translatey(-20px);
// 	}
// 	100% {
// 		box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
// 		transform: translatey(0px);
// 	}
// }