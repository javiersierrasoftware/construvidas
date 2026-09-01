/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#002567',
          50: '#e6ebf5',
          100: '#ccd7eb',
          200: '#99afdb',
          300: '#6687cb',
          400: '#335fbb',
          500: '#002567',
          600: '#00215d',
          700: '#001a4d',
          800: '#00133a',
          900: '#000c26',
        },
        secondary: {
          DEFAULT: '#004B9A',
          50: '#e6eef6',
          100: '#ccdde1',
          200: '#99bcda',
          300: '#669bc4',
          400: '#337ab7',
          500: '#004B9A',
          600: '#00438a',
          700: '#00356d',
          800: '#00264d',
          900: '#001933',
        },
        accent: {
          DEFAULT: '#C5C5C5',
          50: '#f9f9f9',
          100: '#f2f2f2',
          200: '#e5e5e5',
          300: '#d8d8d8',
          400: '#cbcbcb',
          500: '#C5C5C5',
          600: '#b1b1b1',
          700: '#9e9e9e',
          800: '#8a8a8a',
          900: '#767676',
        }
      },
      fontFamily: {
        gobold: ['var(--font-gobold)', 'sans-serif'],
        caviar: ['var(--font-caviar)', 'sans-serif'],
      }
    },
  },
  plugins: [],
};