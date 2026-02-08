<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const heroImgRef = ref(null)

onMounted(() => {
  // Animate the profile picture to fade out and shrink as we scroll
  // We don't move it to the navbar physically, we just crossfade.
  gsap.to(heroImgRef.value, {
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: '300px top',
      scrub: 1,
    },
    opacity: 0,
    scale: 0.5,
    y: -100, // Move up slightly
    ease: 'power1.out'
  })
})
</script>

<template>
  <section
    id="hero"
    class="min-h-screen flex items-center justify-center relative z-10 pointer-events-none"
  >
    <div class="container mx-auto px-4 pointer-events-auto text-center">
      <div
        id="hero-profile-container"
        class="mb-8 relative inline-block"
      >
        <div
          ref="heroImgRef"
          class="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary shadow-2xl mx-auto relative z-10 origin-center"
        >
          <img
            src="/images/profile_pic.png"
            alt="Samuel Jarai"
            class="w-full h-full object-cover"
          >
        </div>
        <!-- Decorative glow behind profile pic -->
        <div class="absolute inset-0 bg-primary/30 blur-3xl -z-10 rounded-full scale-110" />
      </div>
      
      <h1 class="text-5xl md:text-7xl font-bold text-white mb-6">
        Samuel Jarai
      </h1>
      <p class="text-xl md:text-2xl text-gray-300 mb-8">
        Full-Stack Software Engineer
      </p>
      <div class="flex justify-center gap-4">
        <a
          href="#contact"
          class="px-8 py-3 bg-primary hover:bg-blue-700 text-white rounded-full transition-colors"
        >
          Contact Me
        </a>
        <a
          href="#projects"
          class="px-8 py-3 border border-white text-white hover:bg-white/10 rounded-full transition-colors"
        >
          View Work
        </a>
      </div>
    </div>
  </section>
</template>