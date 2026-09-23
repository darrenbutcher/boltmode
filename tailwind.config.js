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

      // Boltmode Labs palette
      charcoal: '#141618', // page background, not jet black
      panel: '#1b1e21',
      line: '#2b2f33',
      bone: '#ecebe6', // primary text
      muted: '#9ca0a5',
      signal: '#46e39a', // tech green: software
      iris: '#b4a7ff', // accent: consumer brands
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
        sans: ['Satoshi', 'Manrope', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        nav: '15px',
        logo: '1.2rem',
        hero: '2.7rem',
        'hero-lg': '5.25rem',
      },
      letterSpacing: {
        display: '-0.045em',
        heading: '-0.035em',
        title: '-0.03em',
        brand: '-0.02em',
      },
      gridTemplateColumns: {
        hero: '1fr 22rem',
        venture: '1fr 1.15fr',
        business: '1fr 1.4fr',
        service: '13rem 1fr',
        signup: '1fr 26rem',
      },
      minHeight: {
        6: '1.5rem',
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