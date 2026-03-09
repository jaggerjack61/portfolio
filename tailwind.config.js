/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      colors: {
        background: '#050816',
        elevated: '#081222',
        surface: '#0b1730',
        primary: {
          DEFAULT: '#76f7ff',
          muted: '#76f7ff1f',
        },
        border: '#1c335c',
        text: {
          primary: '#f5f7ff',
          secondary: '#c3d1f0',
          muted: '#6f86af',
        },
        accent: '#76f7ff',
        warning: '#ffb86a',
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
        display: ['Oxanium', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #76f7ff 0deg, #79a8ff 180deg, #ffb86a 360deg)',
      },
      boxShadow: {
        'glow': '0 0 30px -12px rgba(118, 247, 255, 0.45)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
};
