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
const isScrolled = ref(false)

let observer: IntersectionObserver | null = null
const intersectionRatios = new Map<string, number>()

const updateNavigation = () => {
  isScrolled.value = window.scrollY > 12

  if (window.scrollY < 80) {
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

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = (entry.target as HTMLElement).id
        intersectionRatios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0)
      }
      updateNavigation()
    },
    {
      root: null,
      rootMargin: '-80px 0px -60% 0px',
      threshold: [0, 0.2, 0.5],
    },
  )

  for (const link of links) {
    const sectionEl = document.getElementById(link.href)
    if (sectionEl) observer.observe(sectionEl)
  }

  window.addEventListener('scroll', updateNavigation, { passive: true })
  updateNavigation()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateNavigation)
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
  <nav class="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
    <div
      class="mx-auto max-w-6xl rounded-full border px-4 py-3 transition-all duration-300 md:px-5"
      :class="isScrolled
        ? 'border-border-subtle bg-white/95 shadow-[0_10px_35px_rgba(24,32,52,0.08)] backdrop-blur-xl'
        : 'border-transparent bg-white/70 backdrop-blur-md'"
    >
      <div class="flex items-center justify-between">
        <button
          type="button"
          class="flex items-center gap-3"
          aria-label="Back to the top"
          @click="scrollTo('hero')"
        >
          <span class="grid h-9 w-9 place-items-center rounded-full bg-accent text-sm font-semibold text-white">SJ</span>
          <span class="hidden text-sm font-semibold tracking-tight text-primary sm:inline">Samuel Jarai</span>
        </button>

        <div class="hidden items-center gap-7 md:flex">
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

        <button
          type="button"
          class="hidden items-center gap-2 rounded-full border border-border-subtle bg-white px-4 py-2 text-xs font-medium text-primary transition-colors hover:border-accent hover:text-accent md:inline-flex"
          @click="scrollTo('contact')"
        >
          <span class="h-2 w-2 rounded-full bg-emerald-500" />
          Let's talk
        </button>

        <button
          type="button"
          class="inline-grid h-9 w-9 place-items-center rounded-full border border-border-subtle bg-white text-primary md:hidden"
          :aria-expanded="mobileOpen"
          aria-label="Toggle menu"
          @click="mobileOpen = !mobileOpen"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path
              v-if="!mobileOpen"
              d="M4 8h16M4 16h16"
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
      class="mx-auto mt-2 max-w-6xl rounded-3xl border border-border-subtle bg-white p-5 shadow-xl md:hidden"
    >
      <div class="flex flex-col">
        <button
          v-for="link in links"
          :key="link.name"
          type="button"
          class="border-b border-border-subtle py-3 text-left text-sm font-medium text-primary last:border-b-0"
          @click="scrollTo(link.href)"
        >
          {{ link.name }}
        </button>
      </div>
      <p class="label-mono mt-4">
        Harare, Zimbabwe · UTC+2
      </p>
    </div>
  </nav>
</template>
