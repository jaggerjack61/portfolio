<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import Navigation from '@/components/ui/Navigation.vue'

let revealObserver: IntersectionObserver | null = null

const setupReveal = () => {
  revealObserver?.disconnect()

  revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        ;(entry.target as HTMLElement).classList.add('is-visible')
      }
    },
    { threshold: 0.06, rootMargin: '0px 0px -40px 0px' },
  )

  document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
    revealObserver?.observe(el)
  })
}

onMounted(() => {
  setupReveal()
})

onBeforeUnmount(() => {
  revealObserver?.disconnect()
  revealObserver = null
})
</script>

<template>
  <div
    class="relative w-full min-h-screen"
    style="background: var(--bg-primary);"
  >
    <Navigation />

    <main class="relative z-10">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  </div>
</template>
