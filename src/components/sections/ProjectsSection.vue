<script setup lang="ts">

type Project = {
  title: string
  desc: string
  tech: string[]
  link: string
  imageSrc: string
  imageAlt: string
  featured?: boolean
}

const projects: Project[] = [
  {
    title: "AreYouStillThere",
    desc: "Full-stack service monitoring application. Register services, run HTTP/content checks, track incidents and uptime, and send email notifications for outages and recoveries. Uses JWT auth, Django REST backend with Celery for background checks, and a React dashboard.",
    tech: ["Django", "React", "Celery", "Redis"],
    link: "https://github.com/jaggerjack61/AreYouStillThere",
    imageSrc: "images/projects/AreYouStillThere.png",
    imageAlt: "AreYouStillThere service monitoring",
    featured: true
  },
  {
    title: "Harness",
    desc: "Lightweight AI agent framework that connects to any OpenAI-compatible chat model with built-in tools for reading, writing, editing files, and executing shell commands. Features streaming responses, markdown rendering, chain-of-thought reasoning, and real-time token tracking.",
    tech: ["Python", "OpenAI API", "CLI"],
    link: "https://github.com/jaggerjack61/Harness.git",
    imageSrc: "images/projects/Harness.png",
    imageAlt: "Harness AI agent framework"
  },
  {
    title: "Laravel ERD",
    desc: "VS Code extension that parses Laravel migrations and Eloquent models to render interactive ER diagrams with inline editing support. Built for Laravel developers who need to visualize database schemas without leaving their editor.",
    tech: ["TypeScript", "VS Code API", "Laravel"],
    link: "https://github.com/jaggerjack61/LaravelERD",
    imageSrc: "images/projects/laravel-erd.png",
    imageAlt: "Laravel ERD VS Code extension"
  },
  {
    title: "SchemaField",
    desc: "Schema-driven form builder and data capture platform with analytics dashboard. Enables teams to create dynamic forms without writing code, with real-time analytics on submissions.",
    tech: ["React", "Django REST", "MySQL"],
    link: "https://github.com/jaggerjack61/SchemaField",
    imageSrc: "images/projects/SchemaField.png",
    imageAlt: "SchemaField platform"
  },
  {
    title: "Database Hoarder",
    desc: "Multi-tenant database backup automation platform with retention and replication policies. Manages backup schedules, cross-region replication, and point-in-time recovery for PostgreSQL and MySQL.",
    tech: ["Django", "React", "AWS"],
    link: "https://github.com/jaggerjack61/DatabaseHoarder",
    imageSrc: "images/projects/database-hoarder.png",
    imageAlt: "Database Hoarder dashboard"
  },
  {
    title: "Track My Gains",
    desc: "Cross-platform fitness tracker with themed dashboards for workouts, weight, diet, and cycles. Built with Expo and React Native for a consistent experience across iOS and Android.",
    tech: ["Expo", "React Native", "Firebase"],
    link: "https://github.com/jaggerjack61/TrackMyGains/",
    imageSrc: "images/projects/TrackMyGains.jpg",
    imageAlt: "Track My Gains app"
  },
  {
    title: "Chatbot Designer API",
    desc: "Django REST API for designing and managing WhatsApp chatbots with bulk messaging capabilities. A visual flow builder backed by a robust webhook-driven messaging system.",
    tech: ["Django", "Python", "WhatsApp API"],
    link: "https://github.com/jaggerjack61/ChatbotDesignerAPI.git",
    imageSrc: "images/projects/chatbot-designer-api.png",
    imageAlt: "Chatbot Designer API"
  },
  {
    title: "Academic Tracker",
    desc: "Comprehensive academic tracking system for managing students, grades, and subjects. Handles attendance, examination records, and generates report cards for institutions.",
    tech: ["Laravel", "PHP", "MySQL"],
    link: "https://github.com/jaggerjack61/academic-tracker-back.git",
    imageSrc: "images/projects/academic-tracker-backend.png",
    imageAlt: "Academic Tracker backend"
  },
  {
    title: "NSSA Paynow Bot",
    desc: "WhatsApp bot for NSSA registration and payments via Paynow integration. Citizens can check contributions, register dependents, and initiate payments without visiting an office.",
    tech: ["Laravel", "PHP", "Paynow"],
    link: "https://github.com/jaggerjack61/NSSA_Paynow.git",
    imageSrc: "images/projects/nssa-paynow-bot.jpg",
    imageAlt: "NSSA Paynow Bot"
  }
]

</script>

<template>
  <section
    id="projects"
    class="relative overflow-hidden bg-white py-24 md:py-36"
  >
    <div class="section-shell">
      <div class="mb-14 grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
        <div class="md:col-span-8">
          <span class="reveal section-number">03 · Projects</span>
          <h2 class="reveal reveal-delay-1 display-heading text-4xl md:text-5xl lg:text-6xl">
            Built to last,<br class="hidden sm:block"> not just demo.
          </h2>
        </div>
        <p class="reveal reveal-delay-2 body-text max-w-md text-sm md:col-span-4">
          Each project started as a real problem. Here's what thoughtful, practical shipping looks like.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(project, index) in projects"
          :key="project.title"
          class="reveal project-card group flex flex-col"
          :class="[
            project.featured ? 'md:col-span-2 lg:col-span-2 lg:grid lg:grid-cols-2' : '',
            index > 0 ? `reveal-delay-${Math.min((index % 3) + 1, 4)}` : '',
          ]"
        >
          <a
            :href="project.link"
            target="_blank"
            rel="noreferrer"
            class="relative block min-h-52 overflow-hidden bg-bg-elevated"
            :class="project.featured ? 'lg:min-h-full' : ''"
            :aria-label="`View ${project.title} repository`"
          >
            <img
              :src="project.imageSrc"
              :alt="project.imageAlt"
              class="project-img absolute inset-0 h-full w-full object-cover"
              :class="project.title === 'Track My Gains' ? 'object-top' : ''"
            >
            <span
              v-if="project.featured"
              class="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 font-mono text-[0.58rem] uppercase tracking-wider text-accent shadow-sm"
            >
              Featured project
            </span>
          </a>

          <div class="flex flex-1 flex-col p-6 md:p-7">
            <div class="mb-5 flex items-start justify-between gap-4">
              <div>
                <p class="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-accent">
                  Project {{ String(index + 1).padStart(2, '0') }}
                </p>
                <h3 class="mt-2 text-xl font-semibold tracking-tight text-primary md:text-2xl">
                  {{ project.title }}
                </h3>
              </div>
              <a
                :href="project.link"
                target="_blank"
                rel="noreferrer"
                class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border-subtle text-primary transition-colors hover:border-accent hover:bg-accent hover:text-white"
                :aria-label="`Open ${project.title} on GitHub`"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>

            <p class="text-sm leading-relaxed text-text-secondary">
              {{ project.desc }}
            </p>

            <div class="mt-auto flex flex-wrap gap-2 pt-6">
              <span
                v-for="technology in project.tech"
                :key="technology"
                class="skill-tag"
              >
                {{ technology }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
