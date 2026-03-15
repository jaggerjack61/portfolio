<script setup lang="ts">
type Project = {
  title: string
  desc: string
  focus: string
  tech: string[]
  link: string
  imageSrc: string
  imageAlt: string
}

const projects: Project[] = [
  {
    title: "Database Hoarder",
    desc: "Multi-tenant database backup automation platform with retention and replication policies.",
    focus: "Platform Ops",
    tech: ["Django", "Django REST Framework", "React"],
    link: "https://github.com/jaggerjack61/DatabaseHoarder",
    imageSrc: "images/projects/database-hoarder.png",
    imageAlt: "Database Hoarder project preview"
  },
  {
    title: "SchemaField",
    desc: "Schema-driven form builder and data capture platform with analytics.",
    focus: "Product Systems",
    tech: ["React", "Django", "Django REST Framework"],
    link: "https://github.com/jaggerjack61/SchemaField",
    imageSrc: "images/projects/SchemaField.png",
    imageAlt: "SchemaField project preview"
  },
  {
    title: "Track My Gains",
    desc: "Cross-platform fitness tracker with themed dashboards for workouts, weight, diet, and cycles.",
    focus: "Mobile UX",
    tech: ["Expo", "React Native", "SQLite", "Firebase"],
    link: "https://github.com/jaggerjack61/TrackMyGains/",
    imageSrc: "images/projects/TrackMyGains.jpg",
    imageAlt: "Track My Gains project preview"
  },
  {
    title: "Academic Tracker Backend",
    desc: "Comprehensive academic tracking system for managing students, grades, and subjects.",
    focus: "Backend Core",
    tech: ["Laravel", "PHP", "MySQL"],
    link: "https://github.com/jaggerjack61/academic-tracker-back.git",
    imageSrc: "images/projects/academic-tracker-backend.png",
    imageAlt: "Academic Tracker Backend project preview"
  },
  {
    title: "Chatbot Designer API",
    desc: "Django REST API for designing and managing WhatsApp chatbots with bulk messaging.",
    focus: "Automation",
    tech: ["Django", "Python", "WhatsApp API"],
    link: "https://github.com/jaggerjack61/ChatbotDesignerAPI.git",
    imageSrc: "images/projects/chatbot-designer-api.png",
    imageAlt: "Chatbot Designer API project preview"
  },
  {
    title: "NSSA Paynow Bot",
    desc: "WhatsApp bot for NSSA registration and payments via Paynow.",
    focus: "Conversational Commerce",
    tech: ["Laravel", "PHP", "Paynow"],
    link: "https://github.com/jaggerjack61/NSSA_Paynow.git",
    imageSrc: "images/projects/nssa-paynow-bot.jpg",
    imageAlt: "NSSA Paynow Bot project preview"
  },
  {
    title: "Laravel ERD",
    desc: "VS Code extension that parses Laravel migrations and Eloquent models to render interactive ER diagrams with inline editing support.",
    focus: "Developer Tools",
    tech: ["TypeScript", "VS Code API", "Laravel"],
    link: "https://github.com/jaggerjack61/LaravelERD",
    imageSrc: "images/projects/laravel-erd.png",
    imageAlt: "Laravel ERD project preview"
  }
]
</script>

<template>
  <section
    id="projects"
    class="relative z-10 py-16 md:py-24"
  >
    <div class="max-w-6xl mx-auto px-6">
      <div class="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p class="reveal section-kicker">
            Missions / 06
          </p>
          <h2 class="reveal reveal-delay-1 section-title mt-6 text-text-primary">
            Selected builds from the command archive.
          </h2>
        </div>
        <p class="reveal reveal-delay-2 max-w-xl text-base leading-relaxed text-text-muted xl:text-right">
          A cross-section of tools, dashboards, APIs, and mobile experiences designed to solve operational problems cleanly.
        </p>
      </div>

      <div class="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="reveal card group flex flex-col overflow-hidden"
          :class="[
            index === 0 ? 'md:col-span-2' : '',
            index === 0 ? '' : `reveal-delay-${Math.min(5, index)}`,
          ]"
        >
          <div class="relative border-b border-border">
            <div class="absolute left-4 top-4 z-10 inline-flex items-center rounded-full border border-white/10 bg-background/85 px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.28em] text-accent backdrop-blur-sm">
              {{ project.focus }}
            </div>
            <div class="h-52 w-full overflow-hidden bg-background md:h-60">
              <img
                :src="project.imageSrc"
                :alt="project.imageAlt"
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              >
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-[#03050d] via-[#03050d]/25 to-transparent" />
          </div>

          <div class="flex flex-1 flex-col p-6">
            <p class="hud-label">
              {{ project.tech.slice(0, 2).join(' / ') }}
            </p>
            <h3 class="mt-4 text-xl font-semibold text-text-primary">
              {{ project.title }}
            </h3>
            <p class="mt-3 text-sm leading-relaxed text-text-secondary">
              {{ project.desc }}
            </p>

            <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="t in project.tech"
                :key="t"
                class="rounded-full border border-border bg-background/35 px-3 py-2 text-[11px] font-medium text-text-muted"
              >
                {{ t }}
              </span>
            </div>

            <a
              :href="project.link"
              class="mt-6 inline-flex items-center gap-2 text-sm text-text-primary transition-colors hover:text-accent"
              target="_blank"
              rel="noreferrer"
            >
              View Repository
              <span class="transform transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
