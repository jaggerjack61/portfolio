/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
    },
    extend: {
      colors: {
        bg: {
          primary: '#0C0C0E',
          secondary: '#141416',
          elevated: '#1C1C1F',
        },
        surface: '#232326',
        foreground: '#F5F5F3',
        primary: '#F5F5F3',
        border: {
          DEFAULT: '#2E2E31',
          subtle: '#252528',
        },
        text: {
          primary: '#F5F5F3',
          secondary: '#A8A8A5',
          muted: '#6E6E6B',
        },
        accent: '#E8E4DD',
        'accent-warm': '#C4956A',
      },
      fontFamily: {
        sans: ['Instrument Sans', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        mono: ['DM Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
};
