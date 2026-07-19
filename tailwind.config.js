/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
    },
    extend: {
      colors: {
        bg: {
          primary: '#F7F8F4',
          secondary: '#FFFFFF',
          elevated: '#EEF2FF',
        },
        surface: '#FFFFFF',
        foreground: '#182034',
        primary: '#182034',
        border: {
          DEFAULT: '#D8DDE8',
          subtle: '#E8EBF1',
        },
        text: {
          primary: '#182034',
          secondary: '#566074',
          muted: '#7C8597',
        },
        accent: '#3659E3',
        'accent-warm': '#3659E3',
      },
      fontFamily: {
        sans: ['Instrument Sans', 'sans-serif'],
        display: ['Instrument Sans', 'sans-serif'],
        mono: ['DM Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
};
