# Samuel Jarai — Portfolio

Single-page developer portfolio built with Vue 3 + TypeScript and TailwindCSS. Includes smooth hash navigation, scrollspy highlighting in the navbar, and a terminal-style contact section.

![Portfolio Preview](public/images/profile_pic.png)

## Features

- Responsive single-page layout
- Smooth scrolling to sections (hash navigation)
- Navbar highlights the active section while scrolling
- Terminal-style contact panel with clickable links
- Sections: Hero, About, Experience, Skills, Certifications, Projects, Contact

## Tech Stack

- Vue 3 (Composition API, script setup) + TypeScript
- Vite (includes single-file output via vite-plugin-singlefile)
- Vue Router (hash history)
- TailwindCSS

## Getting Started

### Prerequisites

- Node.js 18+ recommended

### Setup

```bash
npm install
npm run dev
```

### Useful Scripts

```bash
npm run dev
npm run build
npm run preview
npm run check
npm run lint
```

## Customizing Content

- Sections live under `src/components/sections/`
- Navbar links live in `src/components/ui/Navigation.vue`

## Project Structure

```
src/
├── assets/          # Static assets
├── components/
│   ├── sections/    # Page sections (Hero, About, Projects, etc.)
│   └── ui/          # UI components (Navigation)
├── pages/           # Main page views
├── App.vue          # Root component
└── main.ts          # Application entry point
```

## Links

- GitHub: https://github.com/jaggerjack61
- LinkedIn: https://linkedin.com/in/samuel-jarai
