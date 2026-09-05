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

Scroll to move between scenes, use the section navigation to jump chapters, or use the previous/next buttons and arrow keys (Down/Right advance; Up/Left go back). On smaller screens or with enlarged text, the content panel scrolls internally when needed while navigation stays fixed.

Menu zooms out to the globe overview, which rotates once every 60 seconds while motion is enabled. Drag or use the arrow keys to spin it, then select a labeled dot or a section button to enter. Escape or Close menu returns to the current section. System reduced-motion preferences settle travel immediately; direct globe manipulation remains available. Unavailable WebGL or a failed 3D download displays a static fallback with section buttons. The portrait renders at 112 × 112 pixels.

Portfolio content is maintained in `src/data/portfolio.ts`. Three.js loads in a separate chunk. One persistent globe has five deterministic surface destinations: Introduction, Projects, About, Experience, and Contact. The 17 scroll positions preserve the content order; cards within Projects, About, and Experience change in place without camera travel. Travel retreats for 380 ms, rotates for 650 ms, and approaches for 900 ms. All five HTML section panels remain mounted at their dots, shrinking into the globe on retreat and growing into readable content during approach. Small section previews scale continuously into the full panel as the camera narrows from a 40° overview to an 18° arrival view. Each arrival zooms deeply into a different globe region, such as the upper left or lower middle; screenshots remain in the accessible content panel. New requests replace pending travel, and only the latest arrival activates links and keyboard focus. GPU resources are released when leaving the portfolio route.

## Checks

```bash
npm run lint
npm run check
npm run build
```

The production build retains relative asset paths for the `/portfolio/` GitHub Pages subpath.
