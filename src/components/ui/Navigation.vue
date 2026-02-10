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
      <!-- Logo -->
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-sm font-bold text-white">
          SJ
        </div>
        <span class="font-medium text-sm text-text-secondary tracking-wide">Samuel Jarai</span>
      </div>

      <ul class="hidden md:flex gap-8">
        <li
          v-for="link in links"
          :key="link.name"
        >
          <router-link
            :to="{ path: '/', hash: '#' + link.href }"
            :class="[
              'inline-block text-sm font-medium tracking-wide transition-colors border-b-2 pb-1',
              activeSectionId === link.href
                ? 'text-text-primary border-primary'
                : 'text-text-muted border-transparent hover:text-text-primary hover:border-border',
            ]"
          >
            {{ link.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
