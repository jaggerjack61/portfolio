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
    particle.style.animationDelay = `${Math.random() * 5}s`
    particle.style.animation = `float ${5 + Math.random() * 5}s ease-in-out infinite`
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
  <div class="relative w-full bg-background text-text-primary min-h-screen">
    <div
      class="grid-bg"
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
      id="particles"
      aria-hidden="true"
      class="absolute inset-0 z-0 pointer-events-none"
    />

    <Navigation />

    <main class="relative z-10 pt-16">
      <HeroSection />
      <StatsSection />
      <div class="max-w-6xl mx-auto px-6 space-y-0">
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
