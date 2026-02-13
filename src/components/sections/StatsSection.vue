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
    class="relative z-10 py-16 border-y border-border bg-elevated"
  >
    <div class="max-w-6xl mx-auto px-6">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div
          v-for="(stat, idx) in stats"
          :key="stat.label"
          class="reveal"
          :class="idx === 0 ? '' : `reveal-delay-${idx}`"
        >
          <div class="text-4xl md:text-5xl font-bold bg-gradient-to-br from-accent to-indigo-400 bg-clip-text text-transparent">
            {{ displayValues[idx] }}{{ stat.suffix ?? '' }}
          </div>
          <div class="mt-2 text-text-muted">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
