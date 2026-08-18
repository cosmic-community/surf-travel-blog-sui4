/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#f0f7fa',
          100: '#dcedf3',
          200: '#bcdce9',
          300: '#8bc3d8',
          400: '#54a3c0',
          500: '#3487a6',
          600: '#276c8b',
          700: '#235772',
          800: '#22495f',
          900: '#213e51',
          950: '#11212b',
        },
        teal: {
          50: '#effcf9',
          100: '#d3f5ee',
          200: '#a9eadf',
          300: '#74d8ca',
          400: '#41beb0',
          500: '#279e94',
          600: '#1c7f78',
          700: '#1b6662',
          800: '#1b5250',
          900: '#1a4544',
          950: '#092827',
        },
        sand: {
          50: '#fdf9f1',
          100: '#f9f0dc',
          200: '#f2ddb2',
          300: '#eac37e',
          400: '#e2a850',
          500: '#d8902f',
          600: '#c37624',
          700: '#a15c20',
          800: '#824a21',
          900: '#6b3e1e',
        },
        coral: {
          500: '#f4633f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}