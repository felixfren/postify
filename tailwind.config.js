/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 25s linear infinite',
        marquee2: 'marquee2 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%) ' },
          '50%': { transform: 'translateX(-20%) '},
          '100%': { transform: 'translateX(0%)'},
        },
        marquee2: {
          '0%': { transform: 'translateX(0%) ' },
          '50%': { transform: 'translateX(5%) '},
          '100%': { transform: 'translateX(0%)'},
        }
      },
    },
  },
  plugins: [
    plugin(({ addBase, theme }) => {
        addBase({
            '.scrollbar': {
                overflowY: 'auto',
            },
            '.scrollbar::-webkit-scrollbar': {
                height: '4px',
                width: '12px',
            },
            '.scrollbar::-webkit-scrollbar-thumb': {
                backgroundColor: theme('colors.neutral.700'),
            },
            '.scrollbar::-webkit-scrollbar-track-piece': {
                backgroundColor: theme('colors.transparent'),
            },
        });
    }),
  ],
};
