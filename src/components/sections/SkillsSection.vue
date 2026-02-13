<script setup lang="ts">
type SkillCard = {
  title: string
  icon: 'code' | 'monitor' | 'layers' | 'database' | 'cloud' | 'spark'
  items?: string[]
  tags?: string[]
}

const cards: SkillCard[] = [
  { title: 'Languages', icon: 'code', items: ['Python', 'PHP', 'JavaScript', 'SQL'] },
  { title: 'Backend', icon: 'monitor', tags: ['Django', 'Django REST', 'Laravel', 'Symfony'] },
  { title: 'Frontend', icon: 'layers', tags: ['React', 'Vue.js', 'HTML5', 'CSS3', 'Tailwind', 'Bootstrap'] },
  { title: 'Databases', icon: 'database', tags: ['MySQL', 'Oracle', 'DynamoDB', 'SQLite'] },
  { title: 'Cloud & DevOps', icon: 'cloud', tags: ['AWS', 'OCI', 'Docker', 'Terraform', 'CI/CD', 'Git'] },
  { title: 'Other', icon: 'spark', tags: ['REST APIs', 'Microservices', 'IoT', 'AI-Assisted Dev'] },
]
</script>

<template>
  <section
    id="skills"
    class="relative z-10 py-24 bg-elevated"
  >
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="reveal section-title text-3xl md:text-4xl font-bold text-center text-text-primary mx-auto">
        Technical Skills
      </h2>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        <div
          v-for="(card, idx) in cards"
          :key="card.title"
          class="reveal card p-6"
          :class="idx === 0 ? '' : `reveal-delay-${Math.min(5, idx)}`"
        >
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center bg-primary-muted text-accent">
              <svg
                v-if="card.icon === 'code'"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="16,18 22,12 16,6" />
                <polyline points="8,6 2,12 8,18" />
              </svg>
              <svg
                v-else-if="card.icon === 'monitor'"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect
                  x="2"
                  y="3"
                  width="20"
                  height="14"
                  rx="2"
                />
                <path d="M8 21h8M12 17v4" />
              </svg>
              <svg
                v-else-if="card.icon === 'layers'"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              <svg
                v-else-if="card.icon === 'database'"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <ellipse
                  cx="12"
                  cy="5"
                  rx="9"
                  ry="3"
                />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              </svg>
              <svg
                v-else-if="card.icon === 'cloud'"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
              </svg>
              <svg
                v-else
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                />
                <path d="M12 1v6m0 6v10" />
                <path d="m4.22 4.22 4.24 4.24m7.08 7.08 4.24 4.24" />
                <path d="M1 12h6m6 0h10" />
                <path d="m4.22 19.78 4.24-4.24m7.08-7.08 4.24-4.24" />
              </svg>
            </div>
            <h3 class="font-semibold text-lg text-text-primary">
              {{ card.title }}
            </h3>
          </div>

          <div
            v-if="card.items?.length"
            class="space-y-4"
          >
            <div
              v-for="item in card.items"
              :key="item"
              class="flex items-center justify-between text-sm"
            >
              <span class="text-text-secondary">{{ item }}</span>
              <span class="text-accent font-medium">{{ card.title === 'Languages' ? 'Advanced' : '' }}</span>
            </div>
          </div>

          <div
            v-else
            class="flex flex-wrap gap-2"
          >
            <span
              v-for="t in card.tags"
              :key="t"
              class="px-3 py-1 rounded text-sm bg-background border border-border text-text-secondary"
            >
              {{ t }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
