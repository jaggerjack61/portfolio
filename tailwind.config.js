/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        paper: '#F8F7F3',
        panel: '#EFEDE6',
        ink: {
          DEFAULT: '#1F1E1A',
          soft: '#4A4841',
          mute: '#6F6C63',
        },
        rule: '#E3E0D6',
      },
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
