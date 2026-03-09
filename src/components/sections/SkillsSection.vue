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
    class="relative z-10 py-24"
  >
    <div class="max-w-6xl mx-auto px-6">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="reveal section-kicker">
            Subsystems / 04
          </p>
          <h2 class="reveal reveal-delay-1 section-title mt-6 text-text-primary">
            Technical skills tuned for production-grade builds.
          </h2>
        </div>
        <p class="reveal reveal-delay-2 max-w-xl text-base leading-relaxed text-text-muted lg:text-right">
          The stack leans pragmatic: stable backends, responsive interfaces, and infrastructure tooling that supports clean deployments.
        </p>
      </div>

      <div class="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="(card, idx) in cards"
          :key="card.title"
          class="reveal card p-6"
          :class="idx === 0 ? '' : `reveal-delay-${Math.min(5, idx)}`"
        >
          <div class="mb-6 flex items-center gap-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-primary-muted text-accent">
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
            <div>
              <p class="hud-label">
                Module
              </p>
              <h3 class="mt-2 font-display text-xl uppercase tracking-[0.08em] text-text-primary">
              {{ card.title }}
              </h3>
            </div>
          </div>

          <div
            v-if="card.items?.length"
            class="space-y-4"
          >
            <div
              v-for="item in card.items"
              :key="item"
              class="flex items-center justify-between rounded-2xl border border-border bg-background/30 px-4 py-3 text-sm"
            >
              <span class="text-text-secondary">{{ item }}</span>
              <span class="font-mono text-xs uppercase tracking-[0.24em] text-accent">{{ card.title === 'Languages' ? 'Advanced' : 'Active' }}</span>
            </div>
          </div>

          <div
            v-else
            class="flex flex-wrap gap-2"
          >
            <span
              v-for="t in card.tags"
              :key="t"
              class="rounded-full border border-border bg-background/35 px-3 py-2 text-sm text-text-secondary"
            >
              {{ t }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
