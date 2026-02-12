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
    class="py-24 relative z-10"
  >
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-text-primary mb-12 text-center tracking-tight">
        Featured Projects
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="group bg-surface border border-border rounded-xl p-6 hover:border-text-secondary/30 transition-all duration-300 flex flex-col relative overflow-hidden"
        >
          <!-- Hover Gradient -->
          <div class="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          
          <div class="mb-6 relative z-10">
            <div class="h-40 w-full rounded-lg overflow-hidden bg-white/5 border border-white/10 mb-4">
              <img
                :src="project.imageSrc"
                :alt="project.imageAlt"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
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
          
          <div class="mt-auto relative z-10">
            <div class="flex flex-wrap gap-2 mb-6">
              <span
                v-for="t in project.tech"
                :key="t"
                class="px-2 py-1 bg-white/5 rounded text-[10px] font-medium text-text-muted border border-white/5"
              >
                {{ t }}
              </span>
            </div>
            <a
              :href="project.link"
              class="inline-flex items-center gap-2 text-sm text-text-primary hover:text-white transition-colors group/link"
            >
              View Project 
              <span class="transform transition-transform group-hover/link:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
