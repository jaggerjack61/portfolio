<script setup lang="ts">
const skills = {
  Languages: ["Python", "PHP", "JavaScript", "SQL"],
  Backend: ["Django", "Django REST Framework", "Laravel", "Symfony"],
  Frontend: ["React", "Vue.js", "Tailwind", "Bootstrap"],
  Cloud: ["AWS", "Oracle Cloud", "Docker", "Terraform"]
}
</script>

<template>
  <section
    id="skills"
    class="min-h-screen py-20 relative z-10 flex items-center"
  >
    <div class="container mx-auto px-4 pointer-events-auto">
      <h2 class="text-4xl font-bold text-white mb-12 text-center">
        Technical Skills
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(items, category) in skills"
          :key="category"
          class="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-primary/50 transition-colors"
        >
          <h3 class="text-xl font-bold text-secondary mb-4">
            {{ category }}
          </h3>
          <ul class="space-y-2">
            <li
              v-for="skill in items"
              :key="skill"
              class="text-gray-300 flex items-center gap-2"
            >
              <span class="w-2 h-2 rounded-full bg-accent" />
              {{ skill }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>