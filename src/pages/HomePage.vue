<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import StatsSection from '@/components/sections/StatsSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import CertificationsSection from '@/components/sections/CertificationsSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import Navigation from '@/components/ui/Navigation.vue'

let revealObserver: IntersectionObserver | null = null

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const createParticles = () => {
  if (prefersReducedMotion()) return

  const particlesContainer = document.getElementById('particles')
  if (!particlesContainer) return

  particlesContainer.innerHTML = ''

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div')
    particle.className = 'particle'
    particle.style.left = `${Math.random() * 100}%`
    particle.style.top = `${Math.random() * 100}%`
    particle.style.width = `${1.5 + Math.random() * 3}px`
    particle.style.height = particle.style.width
    particle.style.opacity = `${0.25 + Math.random() * 0.55}`
    particle.style.animationDelay = `${Math.random() * 6}s`
    particle.style.setProperty('--drift-x', `${(Math.random() - 0.5) * 42}px`)
    particle.style.setProperty('--drift-duration', `${8 + Math.random() * 8}s`)
    particlesContainer.appendChild(particle)
  }
}

const setupReveal = () => {
  revealObserver?.disconnect()

  revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        ;(entry.target as HTMLElement).classList.add('is-visible')
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
  )

  document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
    revealObserver?.observe(el)
  })
}

onMounted(() => {
  createParticles()
  setupReveal()
})

onBeforeUnmount(() => {
  revealObserver?.disconnect()
  revealObserver = null
})
</script>

<template>
  <div class="app-shell relative w-full min-h-screen bg-background text-text-primary">
    <div
      class="grid-bg"
      aria-hidden="true"
    />
    <div
      class="starfield"
      aria-hidden="true"
    />
    <div
      class="orb orb-1"
      aria-hidden="true"
    />
    <div
      class="orb orb-2"
      aria-hidden="true"
    />
    <div
      class="signal-ring signal-ring-1"
      aria-hidden="true"
    />
    <div
      class="signal-ring signal-ring-2"
      aria-hidden="true"
    />
    <div
      id="particles"
      aria-hidden="true"
      class="absolute inset-0 z-0 pointer-events-none"
    />

    <Navigation />

    <main class="relative z-10 overflow-hidden pt-20 md:pt-24">
      <HeroSection />
      <StatsSection />
      <div class="max-w-6xl mx-auto px-4 sm:px-6 space-y-0">
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <CertificationsSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </main>
  </div>
</template>
