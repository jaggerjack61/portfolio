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
      threshold: [0, 0.25, 0.5, 0.75],
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
  <nav class="fixed inset-x-0 top-0 z-50">
    <div class="mx-auto max-w-7xl px-4 pt-4 md:px-6">
      <div
        ref="navEl"
        class="nav-shell"
      >
        <a
          href="#"
          class="nav-brand"
          aria-label="Home"
        >
          <span class="nav-brand-mark">SJ</span>
          <span class="nav-brand-copy">
            <small>Orbital Link</small>
            <strong>Samuel Jarai</strong>
          </span>
        </a>

        <div class="hidden xl:flex items-center">
          <span class="status-chip">Open For Missions</span>
        </div>

        <ul class="hidden md:flex items-center gap-1 lg:gap-2">
          <li
            v-for="link in links"
            :key="link.name"
          >
            <router-link
              :to="{ path: '/', hash: '#' + link.href }"
              :class="['nav-link', activeSectionId === link.href ? 'nav-link-active' : '']"
              @click="mobileOpen = false"
            >
              {{ link.name }}
            </router-link>
          </li>
        </ul>

        <button
          type="button"
          class="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-background/50 text-text-primary"
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
        class="md:hidden mt-3"
        :class="mobileOpen ? 'block' : 'hidden'"
      >
        <div class="section-shell px-4 py-4">
          <div class="flex flex-col gap-3">
            <router-link
              v-for="link in links"
              :key="link.href"
              :to="{ path: '/', hash: '#' + link.href }"
              class="nav-link justify-start"
              :class="activeSectionId === link.href ? 'nav-link-active' : ''"
              @click="mobileOpen = false"
            >
              {{ link.name }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
