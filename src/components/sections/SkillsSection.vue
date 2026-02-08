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
    class="py-16 relative z-10"
  >
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-text-primary mb-10 text-center">
        Technical Skills
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(items, category) in skills"
          :key="category"
          class="bg-surface rounded-xl p-6 shadow-card hover:shadow-card-hover border border-gray-100 transition-all duration-300"
        >
          <h3 class="text-xl font-bold text-secondary mb-6 border-b border-gray-100 pb-2">
            {{ category }}
          </h3>
          <ul class="space-y-3">
            <li
              v-for="skill in items"
              :key="skill"
              class="text-text-secondary flex items-center gap-3 font-medium"
            >
              <span class="w-2 h-2 rounded-full bg-primary/60" />
              {{ skill }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>