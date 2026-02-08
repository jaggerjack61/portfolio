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
        background: '#020202', // Cursor-like deep black
        surface: '#121212', // Lighter, opaque card background
        card: '#121212', // Alias for explicit card usage
        primary: {
          DEFAULT: '#ffffff', // White for primary actions (high contrast)
          muted: '#a1a1aa', // Zinc 400
        },
        border: '#27272a', // Zinc 800
        text: {
          primary: '#fafafa', // Zinc 50
          secondary: '#a1a1aa', // Zinc 400
          muted: '#52525b', // Zinc 600
        },
        accent: '#3b82f6', // Subtle blue for specific highlights
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)',
      },
      boxShadow: {
        'glow': '0 0 20px -5px rgba(255, 255, 255, 0.1)',
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