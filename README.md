# Samuel Jarai - 3D Developer Portfolio

A professional, immersive single-page developer portfolio website built with **Vue.js 3**, **Three.js (TresJS)**, and **TailwindCSS**. This site showcases my full-stack engineering skills, experience, and projects through interactive 3D elements and modern UI design.

![Portfolio Preview](public/images/profile_pic.png)

## 🚀 Features

*   **Immersive 3D Experience**:
    *   Interactive 3D Laptop model in the Hero section.
    *   3D Starfield background with parallax effects.
    *   Smooth, scroll-driven animations using **GSAP ScrollTrigger**.
*   **Modern UI/UX**:
    *   Glassmorphism design language.
    *   Responsive layout for all devices.
    *   **Terminal-style Contact Section** with typing effects and syntax highlighting.
    *   **Floating Profile Picture** that animates from the hero section to the navigation bar on scroll.
*   **Content Sections**:
    *   **Hero**: Introduction with 3D visuals.
    *   **About**: Professional summary and education details.
    *   **Experience**: Timeline of professional history (ZETDC, LADS Africa).
    *   **Skills**: Categorized technical skills (Languages, Backend, Frontend, Cloud).
    *   **Certifications**: Grid display of professional certifications (AWS, Oracle, Terraform).
    *   **Projects**: Showcase of key GitHub repositories with direct links.

## 🛠️ Tech Stack

*   **Framework**: [Vue.js 3](https://vuejs.org/) (Composition API, Script Setup)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Styling**: [TailwindCSS](https://tailwindcss.com/)
*   **3D Rendering**:
    *   [Three.js](https://threejs.org/)
    *   [TresJS](https://tresjs.org/) (Declarative Three.js for Vue)
    *   [@tresjs/cientos](https://cientos.tresjs.org/) (Abstraction library)
*   **Animations**: [GSAP](https://greensock.com/gsap/) (GreenSock Animation Platform)

## 📦 Project Setup

### Prerequisites

*   Node.js (v16.0.0 or higher)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/jaggerjack61/portfolio.git
    cd portfolio
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Build for production:
    ```bash
    npm run build
    ```

## 📂 Project Structure

```
src/
├── assets/          # Static assets
├── components/
│   ├── 3d/          # 3D components (Hero3D, ThreeScene)
│   ├── sections/    # Page sections (Hero, About, Projects, etc.)
│   └── ui/          # UI components (Navigation)
├── pages/           # Main page views
├── App.vue          # Root component
└── main.ts          # Application entry point
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Samuel Jarai** | Full-Stack Software Engineer
[GitHub](https://github.com/jaggerjack61) | [LinkedIn](https://linkedin.com/in/samuel-jarai)
