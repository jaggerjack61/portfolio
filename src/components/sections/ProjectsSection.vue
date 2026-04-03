<script setup lang="ts">
import { ref } from 'vue'

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

const selectedIndex = ref(0)
</script>

<template>
  <section
    id="projects"
    class="relative z-10 py-24 md:py-40 overflow-hidden"
  >
    <div class="mx-auto max-w-7xl px-6">
      <div class="mb-16">
        <span class="reveal section-number">03 / Projects</span>
        <div class="reveal reveal-delay-1 flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-2">
          <h2 class="display-heading text-4xl md:text-5xl lg:text-6xl">
            Built to last,<br>
            <em class="italic not-italic opacity-60">not just demo.</em>
          </h2>
          <p class="body-text max-w-sm text-sm">
            Each project started as a real problem. Here's what shipping looks like.
          </p>
        </div>
      </div>

      <div class="reveal reveal-delay-2 grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[560px]">
        <div class="lg:col-span-8 relative overflow-hidden">
          <div
            v-for="(project, index) in projects"
            :key="project.title"
            class="absolute inset-0 transition-opacity duration-500"
            :style="{ opacity: selectedIndex === index ? 1 : 0, zIndex: selectedIndex === index ? 1 : 0 }"
          >
            <div class="relative h-full">
              <img
                :src="project.imageSrc"
                :alt="project.imageAlt"
                class="w-full h-full object-cover"
                style="filter: brightness(0.45) saturate(0.8);"
              >
              <div
                class="absolute inset-0"
                style="background: linear-gradient(135deg, rgba(12,12,14,0.85) 0%, rgba(12,12,14,0.3) 50%, rgba(12,12,14,0.6) 100%);"
              />
              <div class="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
                <div class="flex items-center gap-4 mb-4">
                  <span
                    class="font-display text-7xl lg:text-8xl leading-none opacity-20"
                    style="color: var(--text-primary);"
                  >
                    {{ String(index + 1).padStart(2, '0') }}
                  </span>
                  <span
                    v-if="index === 0"
                    class="text-[0.6rem] px-2 py-0.5 border tracking-widest uppercase"
                    style="border-color: var(--accent-warm); color: var(--accent-warm);"
                  >
                    Featured
                  </span>
                </div>
                <h3
                  class="font-display text-3xl lg:text-5xl mb-4 leading-tight"
                  style="color: var(--text-primary);"
                >
                  {{ project.title }}
                </h3>
                <p
                  class="text-sm leading-relaxed mb-6 max-w-lg"
                  style="color: var(--text-secondary);"
                >
                  {{ project.desc }}
                </p>
                <div class="flex items-center gap-4">
                  <a
                    :href="project.link"
                    target="_blank"
                    rel="noreferrer"
                    class="btn-primary"
                  >
                    View Repository
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="t in project.tech"
                      :key="t"
                      class="skill-tag"
                    >
                      {{ t }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="lg:col-span-4 flex flex-col"
          style="background: var(--bg-secondary); border-left: 1px solid var(--border-subtle);"
        >
          <div
            v-for="(project, index) in projects"
            :key="project.title"
            class="flex-1 border-b last:border-b-0 cursor-pointer group transition-all duration-300 relative overflow-hidden"
            :style="{ borderColor: 'var(--border-subtle)' }"
            :class="selectedIndex === index ? '' : 'opacity-50 hover:opacity-75'"
            @click="selectedIndex = index"
          >
            <div class="p-5 relative z-10">
              <div class="flex items-start justify-between gap-3">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <span
                      class="font-mono text-[0.6rem] tracking-widest uppercase"
                      style="color: var(--accent-warm);"
                    >
                      {{ String(index + 1).padStart(2, '0') }}
                    </span>
                    <span
                      v-if="index === 0"
                      class="text-[0.55rem] px-1.5 py-0.5 tracking-wider uppercase"
                      style="background: var(--accent-warm); color: var(--bg-primary);"
                    >
                      Featured
                    </span>
                  </div>
                  <h4
                    class="font-display text-lg leading-tight truncate"
                    :style="{ color: selectedIndex === index ? 'var(--text-primary)' : 'var(--text-secondary)' }"
                  >
                    {{ project.title }}
                  </h4>
                  <p
                    class="text-[0.65rem] mt-1 leading-snug line-clamp-2"
                    style="color: var(--text-muted);"
                  >
                    {{ project.tech.slice(0, 3).join(' · ') }}
                  </p>
                </div>
                <div
                  class="w-12 h-12 shrink-0 overflow-hidden"
                  style="background: var(--border-subtle);"
                >
                  <img
                    :src="project.imageSrc"
                    :alt="project.imageAlt"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  >
                </div>
              </div>
            </div>
            <div
              v-if="selectedIndex === index"
              class="absolute left-0 top-0 bottom-0 w-0.5"
              style="background: var(--accent-warm);"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
