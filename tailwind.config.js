/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss';

export default {
  content: [
    "./lib/**/*.{vue,js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#edeeff',
          100: '#dee0ff',
          200: '#c4c5ff',
          300: '#a1a0ff',
          400: '#7e70ff',
          500: '#765bf9',
          600: '#693dee',
          700: '#5b2fd3',
          800: '#4a29aa',
          900: '#3e2986',
          950: '#26184e',
        },
        secondary: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        }
      },
      keyframes: {
        wave: {
          '50%': { transform: 'scale(0.9)' },
        }
      }
    },
  },
  plugins: [
    plugin(function groupPeer({ addVariant }) {
      let pseudoVariants = [
        // ... Any other pseudo variants you want to support. 
        // See https://github.com/tailwindlabs/tailwindcss/blob/6729524185b48c9e25af62fc2372911d66e7d1f0/src/corePlugins.js#L78
        "checked",
      ].map((variant) =>
        Array.isArray(variant) ? variant : [variant, `&:${variant}`],
      );

      for (let [variantName, state] of pseudoVariants) {
        addVariant(`group-peer-${variantName}`, (ctx) => {
          let result = typeof state === "function" ? state(ctx) : state;
          return result.replace(/&(\S+)/, ":merge(.peer)$1 ~ .group &");
        });
      }
    }),
  ],
}

