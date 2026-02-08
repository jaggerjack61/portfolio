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
    class="min-h-screen py-20 relative z-10"
  >
    <div class="container mx-auto px-4 pointer-events-auto">
      <h2 class="text-4xl font-bold text-white mb-12 text-center">
        Featured Projects
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="group relative bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 hover:border-primary transition-all duration-300"
        >
          <div class="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <!-- Placeholder for project image or 3D view -->
            <span class="text-4xl">🚀</span>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-white mb-2">
              {{ project.title }}
            </h3>
            <p class="text-gray-400 mb-4">
              {{ project.desc }}
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="t in project.tech"
                :key="t"
                class="px-3 py-1 bg-white/10 rounded-full text-xs text-secondary"
              >
                {{ t }}
              </span>
            </div>
            <a
              :href="project.link"
              class="text-primary hover:text-white transition-colors flex items-center gap-2"
            >
              View Project <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>