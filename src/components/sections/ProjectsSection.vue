<script setup lang="ts">
const projects = [
  {
    title: "Academic Tracker Backend",
    desc: "Comprehensive academic tracking system for managing students, grades, and subjects.",
    tech: ["Laravel", "PHP", "MySQL"],
    link: "https://github.com/jaggerjack61/academic-tracker-back.git"
  },
  {
    title: "Chatbot Designer API",
    desc: "Django REST API for designing and managing WhatsApp chatbots with bulk messaging.",
    tech: ["Django", "Python", "WhatsApp API"],
    link: "https://github.com/jaggerjack61/ChatbotDesignerAPI.git"
  },
  {
    title: "NSSA Paynow Bot",
    desc: "WhatsApp bot for NSSA registration and payments via Paynow.",
    tech: ["Laravel", "PHP", "Paynow"],
    link: "https://github.com/jaggerjack61/NSSA_Paynow.git"
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
            <div class="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
              🚀
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