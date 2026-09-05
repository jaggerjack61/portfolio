# Samuel Jarai's — Portfolio

Personal portfolio built with Vue 3, TypeScript, TailwindCSS, and Three.js. A stationary viewport presents the work as a sequence of scenes, with native scrolling, section navigation, and previous/next controls. Deployed to GitHub Pages via CI/CD.

**Live:** https://jaggerjack61.github.io/portfolio/

![Portfolio Preview](public/images/profile_pic.png)

## Run Locally

```bash
git clone https://github.com/jaggerjack61/portfolio.git
cd portfolio
npm install
npm run dev
```


## Interaction and accessibility

Scroll to move between scenes, use the section navigation to jump chapters, or use the previous/next buttons and left/right arrow keys. On smaller screens or with enlarged text, the content panel scrolls internally when needed while navigation stays fixed.

The motion control pauses the 3D scene and transitions. System reduced-motion preferences are respected, and unavailable WebGL or a failed 3D download displays a static fallback. The portrait renders at 112 × 112 pixels.

Portfolio content is maintained in `src/data/portfolio.ts`. Three.js loads in a separate chunk. One persistent WebGL scene renders the neural core and textured project screens, with camera orbits and dolly moves between scenes. GPU resources are released when leaving the portfolio route; the project texture cache is capped at three images.

## Checks

```bash
npm run lint
npm run check
npm run build
```

The production build retains relative asset paths for the `/portfolio/` GitHub Pages subpath.
