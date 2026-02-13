<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const links = [
  { name: 'About', href: 'about' },
  { name: 'Experience', href: 'experience' },
  { name: 'Skills', href: 'skills' },
  { name: 'Certifications', href: 'certifications' },
  { name: 'Projects', href: 'projects' },
  { name: 'Contact', href: 'contact' },
]

const route = useRoute()
const navEl = ref<HTMLElement | null>(null)
const activeSectionId = ref<string>('')
const mobileOpen = ref(false)

let observer: IntersectionObserver | null = null
const intersectionRatios = new Map<string, number>()

const updateActiveSection = () => {
  if (window.scrollY < 40) {
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

watch(
  () => route.hash,
  (hash) => {
    if (hash) activeSectionId.value = hash.replace('#', '')
  },
  { immediate: true },
)

onMounted(() => {
  const navHeight = navEl.value?.getBoundingClientRect().height ?? 0

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
      rootMargin: `-${Math.ceil(navHeight + 8)}px 0px -55% 0px`,
      threshold: [0, 0.1, 0.25, 0.4, 0.6, 0.75, 0.9, 1],
    },
  )

  for (const link of links) {
    const sectionEl = document.getElementById(link.href)
    if (sectionEl) observer.observe(sectionEl)
  }

  window.addEventListener('scroll', updateActiveSection, { passive: true })
  updateActiveSection()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateActiveSection)
  observer?.disconnect()
  observer = null
  intersectionRatios.clear()
})
</script>

<template>
  <nav
    ref="navEl"
    class="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border"
  >
    <div class="container mx-auto flex justify-between items-center px-6 py-4">
      <a
        href="#"
        class="font-mono text-lg font-medium text-accent"
        aria-label="Home"
      >
        &lt;SJ /&gt;
      </a>

      <ul class="hidden md:flex gap-8">
        <li
          v-for="link in links"
          :key="link.name"
        >
          <router-link
            :to="{ path: '/', hash: '#' + link.href }"
            :class="[
              link.href === 'contact'
                ? 'inline-flex items-center px-4 py-2 rounded-md border border-border text-sm font-semibold transition-colors hover:border-accent hover:text-accent'
                : 'inline-block text-sm font-medium tracking-wide transition-colors border-b-2 pb-1',
              activeSectionId === link.href
                ? link.href === 'contact'
                  ? 'text-text-primary border-accent'
                  : 'text-text-primary border-accent'
                : link.href === 'contact'
                  ? 'text-text-primary'
                  : 'text-text-muted border-transparent hover:text-accent hover:border-border',
            ]"
            @click="mobileOpen = false"
          >
            {{ link.name }}
          </router-link>
        </li>
      </ul>

      <button
        type="button"
        class="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-border bg-background/40 text-text-primary"
        :aria-expanded="mobileOpen"
        aria-label="Toggle menu"
        @click="mobileOpen = !mobileOpen"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>
    </div>

    <div
      class="md:hidden border-t border-border bg-background/95 backdrop-blur-xl"
      :class="mobileOpen ? 'block' : 'hidden'"
    >
      <div class="container mx-auto px-6 py-4 flex flex-col gap-3">
        <router-link
          v-for="link in links"
          :key="link.href"
          :to="{ path: '/', hash: '#' + link.href }"
          class="py-2 text-sm font-medium"
          :class="activeSectionId === link.href ? 'text-accent' : 'text-text-secondary'"
          @click="mobileOpen = false"
        >
          {{ link.name }}
        </router-link>
      </div>
    </div>
  </nav>
</template>
