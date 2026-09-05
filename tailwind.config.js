/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
    },
    extend: {
      colors: {
        bg: {
          primary: '#050A12',
          secondary: '#0A1320',
          elevated: '#102132',
        },
        surface: '#0A1320',
        foreground: '#E9F3FA',
        primary: '#E9F3FA',
        border: {
          DEFAULT: '#263C4C',
          subtle: '#1A2C3B',
        },
        text: {
          primary: '#E9F3FA',
          secondary: '#A8BAC8',
          muted: '#92A8B9',
        },
        accent: '#54E5FF',
        'accent-warm': '#54E5FF',
      },
      fontFamily: {
        sans: ['Instrument Sans', 'sans-serif'],
        display: ['Instrument Sans', 'sans-serif'],
        mono: ['DM Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
