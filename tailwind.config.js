/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Inter Tight"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Pulled from the actual JD Premier logo. Silver/red-deep retained
        // for the footer + dispatcher card + CTA hover state.
        brand: {
          red:   '#D72027',
          'red-deep': '#A6151B',
          blue:  '#0E2D70',
          'blue-deep': '#091E50',
          ink:   '#0B0E14',
        },
      },
    },
  },
  plugins: [],
};
