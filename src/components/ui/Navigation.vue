<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { scrollToSection } from '@/composables/useMotion'

const links = ['Projects', 'About', 'Experience', 'Contact']
const active = ref('')
const menuOpen = ref(false)
const toggle = ref<HTMLButtonElement>()
let observer: IntersectionObserver | undefined
function sectionChanged(event: Event) {
  active.value = (event as CustomEvent<string>).detail
}

function navigate(id: string) {
  scrollToSection(id)
  if (!document.querySelector('.portfolio-stage')) document.getElementById(id)?.focus({ preventScroll: true })
}
function toggleMenu() {
  window.dispatchEvent(new CustomEvent('portfolio:menu', { detail: !menuOpen.value }))
}
function menuChanged(event: Event) {
  menuOpen.value = (event as CustomEvent<boolean>).detail
}
function skipToContent() {
  document.getElementById('main-content')?.focus()
}
onMounted(() => {
  window.addEventListener('portfolio:sectionchange', sectionChanged)
  window.addEventListener('portfolio:menuchange', menuChanged)
  if (document.querySelector('.portfolio-stage')) return
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) if (entry.isIntersecting) active.value = entry.target.id
    },
    { rootMargin: '-15% 0px -65% 0px', threshold: 0 },
  )
  for (const id of ['hero', ...links.map((link) => link.toLowerCase())]) {
    const section = document.getElementById(id)
    if (section) observer.observe(section)
  }
})
onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('portfolio:sectionchange', sectionChanged)
  window.removeEventListener('portfolio:menuchange', menuChanged)
})
</script>

<template>
  <a
    href="#main-content"
    class="skip-link"
    @click.prevent="skipToContent"
  >Skip to content</a>
  <header
    v-show="!menuOpen"
    class="site-header"
  >
    <nav
      class="section-shell nav-shell"
      aria-label="Main navigation"
    >
      <button
        class="brand"
        aria-label="Samuel Jarai, back to top"
        @click="navigate('hero')"
      >
        <span class="brand-mark">s<span>j</span><b>.</b></span><span class="brand-name">SAMUEL JARAI<span>ENGINEER / BUILDER</span></span>
      </button>
      <div class="desktop-links">
        <button
          v-for="(link, index) in links"
          :key="link"
          class="nav-item"
          :class="{ active: active === link.toLowerCase() }"
          :aria-current="active === link.toLowerCase() ? 'location' : undefined"
          @click="navigate(link.toLowerCase())"
        >
          <span>0{{ index + 1 }}</span>{{ link }}
        </button>
      </div>
      <div class="nav-controls">
        <button
          ref="toggle"
          class="globe-menu-toggle"
          :aria-expanded="menuOpen"
          aria-controls="globe-menu"
          @click="toggleMenu"
        >
          <span aria-hidden="true">{{ menuOpen ? '−' : '⊕' }}</span>
          {{ menuOpen ? 'Close menu' : 'Menu' }}
        </button>
      </div>
    </nav>
  </header>
</template>
