# Samuel Jarai's — Portfolio

Personal portfolio built with Vue 3, TypeScript, and TailwindCSS. A light, minimal single page: introduction, selected work, about, experience, and contact. Deployed to GitHub Pages via CI/CD.

**Live:** https://jaggerjack61.github.io/portfolio/

![Portfolio Preview](public/images/profile_pic.png)

## Run Locally

```bash
git clone https://github.com/jaggerjack61/portfolio.git
cd portfolio
npm install
npm run dev
```


## Structure

Portfolio content is maintained in `src/data/portfolio.ts`; each section is a component in `src/components/sections`, and all styling lives in `src/style.css` (design tokens at the top). Navigation uses plain in-page anchors (`#work`, `#about`, `#experience`, `#contact`), with smooth scrolling disabled for visitors who prefer reduced motion. There is no client-side router and no runtime dependency beyond Vue.

## Checks

```bash
npm run lint
npm run check
npm run build
```

The production build retains relative asset paths for the `/portfolio/` GitHub Pages subpath.
