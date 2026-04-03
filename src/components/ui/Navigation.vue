<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const links = [
  { name: 'About', href: 'about' },
  { name: 'Experience', href: 'experience' },
  { name: 'Projects', href: 'projects' },
  { name: 'Contact', href: 'contact' },
]

const activeSectionId = ref('')
const mobileOpen = ref(false)

let observer: IntersectionObserver | null = null
const intersectionRatios = new Map<string, number>()

const updateActiveSection = () => {
  if (window.scrollY < 60) {
    activeSectionId.value = ''
    return
  }

  let bestId = ''
  let bestRatio = 0
  for (const [id, ratio] of intersectionRatios.entries()) {
    if (ratio > bestRatio) {
      bestId = id
      bestRatio = ratio
    }
  }
  if (bestId) activeSectionId.value = bestId
}

const initCursor = () => {
  if (window.matchMedia('(max-width: 768px)').matches) return

  const dot = document.querySelector('.cursor-dot') as HTMLElement
  const ring = document.querySelector('.cursor-ring') as HTMLElement
  if (!dot || !ring) return

  let ringX = 0, ringY = 0
  let dotX = 0, dotY = 0

  document.addEventListener('mousemove', (e) => {
    dotX = e.clientX
    dotY = e.clientY
    dot.style.left = `${dotX}px`
    dot.style.top = `${dotY}px`
  })

  const animateRing = () => {
    ringX += (dotX - ringX) * 0.12
    ringY += (dotY - ringY) * 0.12
    ring.style.left = `${ringX}px`
    ring.style.top = `${ringY}px`
    requestAnimationFrame(animateRing)
  }
  requestAnimationFrame(animateRing)

  const addHoverClass = () => {
    ring.classList.add('hovering')
  }
  const removeHoverClass = () => {
    ring.classList.remove('hovering')
  }

  document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
    el.addEventListener('mouseenter', addHoverClass)
    el.addEventListener('mouseleave', removeHoverClass)
  })
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = (entry.target as HTMLElement).id
        intersectionRatios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0)
      }
      updateActiveSection()
    },
    {
      root: null,
      rootMargin: `-80px 0px -60% 0px`,
      threshold: [0, 0.25, 0.5],
    },
  )

  for (const link of links) {
    const sectionEl = document.getElementById(link.href)
    if (sectionEl) observer.observe(sectionEl)
  }

  window.addEventListener('scroll', updateActiveSection, { passive: true })
  updateActiveSection()

  setTimeout(initCursor, 100)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateActiveSection)
  observer?.disconnect()
  observer = null
  intersectionRatios.clear()
})

const scrollTo = (href: string) => {
  const section = document.getElementById(href)
  if (section) {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    section.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  }
  mobileOpen.value = false
}
</script>

<template>
  <nav class="fixed inset-x-0 top-0 z-50 bg-bg/90 backdrop-blur-md">
    <div class="mx-auto max-w-6xl px-6 py-5">
      <div class="flex items-center justify-between">
        <button
          type="button"
          class="flex items-center gap-3 group"
          @click="scrollTo('hero')"
        >
          <span class="font-display text-xl tracking-tight text-primary">Samuel Jarai</span>
        </button>

        <div class="hidden md:flex items-center gap-8">
          <button
            v-for="link in links"
            :key="link.name"
            type="button"
            :class="['nav-item', activeSectionId === link.href ? 'active' : '']"
            @click="scrollTo(link.href)"
          >
            {{ link.name }}
          </button>
        </div>

        <div class="hidden md:block">
          <span class="label-mono">Harare, Zimbabwe</span>
        </div>

        <button
          type="button"
          class="md:hidden inline-flex items-center justify-center w-10 h-10"
          :aria-expanded="mobileOpen"
          aria-label="Toggle menu"
          @click="mobileOpen = !mobileOpen"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              v-if="!mobileOpen"
              d="M3 12h18M3 6h18M3 18h18"
            />
            <path
              v-else
              d="M18 6L6 18M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <div
      v-if="mobileOpen"
      class="md:hidden border-t border-border bg-bg"
    >
      <div class="mx-auto max-w-6xl px-6 py-6 flex flex-col gap-5">
        <button
          v-for="link in links"
          :key="link.name"
          type="button"
          class="text-left nav-item text-base"
          @click="scrollTo(link.href)"
        >
          {{ link.name }}
        </button>
        <div class="pt-4 border-t border-border">
          <span class="label-mono">Harare, Zimbabwe · UTC+2</span>
        </div>
      </div>
    </div>
  </nav>
</template>
