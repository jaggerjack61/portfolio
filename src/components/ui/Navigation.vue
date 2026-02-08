<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const links = [
  { name: 'About', href: 'about' },
  { name: 'Experience', href: 'experience' },
  { name: 'Skills', href: 'skills' },
  { name: 'Certifications', href: 'certifications' },
  { name: 'Projects', href: 'projects' },
  { name: 'Contact', href: 'contact' },
]

const navProfileRef = ref(null)

onMounted(() => {
  // Initial state: Hidden
  gsap.set(navProfileRef.value, { opacity: 0, scale: 0.5 })

  // Fade in when scroll passes a threshold
  gsap.to(navProfileRef.value, {
    scrollTrigger: {
      trigger: 'body',
      start: '300px top', // After the hero image has "arrived" visually
      end: '400px top',
      scrub: true,
    },
    opacity: 1,
    scale: 1,
    ease: 'power2.out'
  })
})
</script>

<template>
  <nav class="fixed top-0 left-0 w-full z-50 p-6 pointer-events-none">
    <div class="container mx-auto flex justify-between items-center pointer-events-auto bg-white/5 backdrop-blur-md rounded-full px-8 py-3 border border-white/10 max-w-4xl mx-auto mt-4 relative">
      <!-- Profile Pic / Logo Container -->
      <div
        id="nav-logo-target"
        class="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
      >
        <div
          ref="navProfileRef"
          class="w-full h-full rounded-full overflow-hidden border-2 border-primary shadow-lg bg-dark absolute inset-0"
        >
          <img
            src="/images/profile_pic.png"
            alt="SJ"
            class="w-full h-full object-cover"
          >
        </div>
      </div>

      <ul class="hidden md:flex gap-8">
        <li
          v-for="link in links"
          :key="link.name"
        >
          <router-link
            :to="{ path: '/', hash: '#' + link.href }"
            class="text-gray-300 hover:text-white transition-colors text-sm uppercase tracking-wider font-medium"
          >
            {{ link.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>