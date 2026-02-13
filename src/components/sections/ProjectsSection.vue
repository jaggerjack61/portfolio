<script setup lang="ts">
type Project = {
  title: string
  desc: string
  tech: string[]
  link: string
  imageSrc: string
  imageAlt: string
}

const projects: Project[] = [
  {
    title: "SchemaField",
    desc: "Schema-driven form builder and data capture platform with analytics.",
    tech: ["React", "Django", "Django REST Framework"],
    link: "https://github.com/jaggerjack61/SchemaField",
    imageSrc: "images/projects/SchemaField.png",
    imageAlt: "SchemaField project preview"
  },
  {
    title: "Academic Tracker Backend",
    desc: "Comprehensive academic tracking system for managing students, grades, and subjects.",
    tech: ["Laravel", "PHP", "MySQL"],
    link: "https://github.com/jaggerjack61/academic-tracker-back.git",
    imageSrc: "images/projects/academic-tracker-backend.png",
    imageAlt: "Academic Tracker Backend project preview"
  },
  {
    title: "Chatbot Designer API",
    desc: "Django REST API for designing and managing WhatsApp chatbots with bulk messaging.",
    tech: ["Django", "Python", "WhatsApp API"],
    link: "https://github.com/jaggerjack61/ChatbotDesignerAPI.git",
    imageSrc: "images/projects/chatbot-designer-api.png",
    imageAlt: "Chatbot Designer API project preview"
  },
  {
    title: "NSSA Paynow Bot",
    desc: "WhatsApp bot for NSSA registration and payments via Paynow.",
    tech: ["Laravel", "PHP", "Paynow"],
    link: "https://github.com/jaggerjack61/NSSA_Paynow.git",
    imageSrc: "images/projects/nssa-paynow-bot.jpg",
    imageAlt: "NSSA Paynow Bot project preview"
  }
]
</script>

<template>
  <section
    id="projects"
    class="relative z-10 py-24"
  >
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="reveal section-title text-3xl md:text-4xl font-bold text-center text-text-primary mx-auto">
        Featured Projects
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="reveal card p-6 flex flex-col group"
          :class="index === 0 ? '' : `reveal-delay-${Math.min(5, index)}`"
        >
          <div class="mb-6">
            <div class="h-44 w-full rounded-lg overflow-hidden bg-background border border-border mb-4">
              <img
                :src="project.imageSrc"
                :alt="project.imageAlt"
                class="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                loading="lazy"
              >
            </div>
            <h3 class="text-lg font-semibold text-text-primary mb-2">
              {{ project.title }}
            </h3>
            <p class="text-text-secondary text-sm leading-relaxed">
              {{ project.desc }}
            </p>
          </div>
          
          <div class="mt-auto">
            <div class="flex flex-wrap gap-2 mb-6">
              <span
                v-for="t in project.tech"
                :key="t"
                class="px-2 py-1 bg-background rounded text-[10px] font-medium text-text-muted border border-border"
              >
                {{ t }}
              </span>
            </div>
            <a
              :href="project.link"
              class="inline-flex items-center gap-2 text-sm text-text-primary hover:text-accent transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              View Project 
              <span class="transform transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
