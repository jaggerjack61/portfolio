<script setup lang="ts">
import { onMounted, ref } from 'vue'

type Stat = {
  label: string
  value: number
  suffix?: string
}

const stats = ref<Stat[]>([
  { label: 'Years Experience', value: 6, suffix: '+' },
  { label: 'Cloud Certifications', value: 5, suffix: '+' },
  { label: 'Industry Awards', value: 3, suffix: '+' },
  { label: 'Projects Delivered', value: 15, suffix: '+' },
])

const displayValues = ref<number[]>(stats.value.map(() => 0))

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const animateCounters = () => {
  if (prefersReducedMotion()) {
    displayValues.value = stats.value.map((s) => s.value)
    return
  }

  const durationMs = 1800
  const start = performance.now()

  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / durationMs)
    const eased = 1 - Math.pow(1 - t, 3)
    displayValues.value = stats.value.map((s) => Math.floor(s.value * eased))
    if (t < 1) requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}

onMounted(() => {
  const el = document.getElementById('stats')
  if (!el) {
    animateCounters()
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        animateCounters()
        observer.disconnect()
      }
    },
    { threshold: 0.2 },
  )

  observer.observe(el)
})
</script>

<template>
  <section
    id="stats"
    class="relative z-10 py-10"
  >
    <div class="max-w-6xl mx-auto px-6">
      <div class="section-shell px-6 py-8 md:px-8 md:py-9">
        <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p class="reveal section-kicker">
              Telemetry / 00
            </p>
            <h2 class="reveal reveal-delay-1 mt-5 font-display text-3xl uppercase tracking-[0.08em] text-text-primary md:text-4xl">
              Active mission metrics
            </h2>
          </div>
          <p class="reveal reveal-delay-2 max-w-xl text-sm leading-relaxed text-text-muted md:text-right">
            A quick scan of experience, credentials, and delivery volume gathered from recent production cycles.
          </p>
        </div>

        <div class="mt-8 grid gap-4 md:grid-cols-4">
          <div
            v-for="(stat, idx) in stats"
            :key="stat.label"
            class="reveal metric-card"
            :class="idx === 0 ? '' : `reveal-delay-${Math.min(5, idx)}`"
          >
            <p class="hud-label">
              {{ stat.label }}
            </p>
            <div class="mt-4 flex items-end gap-1">
              <span class="metric-value">{{ displayValues[idx] }}</span>
              <span class="pb-2 font-mono text-sm uppercase tracking-[0.24em] text-accent">
                {{ stat.suffix ?? '' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
