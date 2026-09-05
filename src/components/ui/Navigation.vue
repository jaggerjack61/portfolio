<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { scrollToSection, useMotion } from '@/composables/useMotion'

const links = ['Projects', 'About', 'Experience', 'Contact']
const active = ref('')
const mobileOpen = ref(false)
const toggle = ref<HTMLButtonElement>()
const { paused, reducedMotion, toggleMotion } = useMotion()
let observer: IntersectionObserver | undefined
function sectionChanged(event: Event) {
  active.value = (event as CustomEvent<string>).detail
}

function navigate(id: string) {
  scrollToSection(id)
  mobileOpen.value = false
  document.getElementById(id)?.focus({ preventScroll: true })
}
function closeMenu() {
  mobileOpen.value = false
  toggle.value?.focus()
}
function skipToContent() {
  document.getElementById('main-content')?.focus()
}
onMounted(() => {
  window.addEventListener('portfolio:sectionchange', sectionChanged)
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
})
</script>

<template>
  <a
    href="#main-content"
    class="skip-link"
    @click.prevent="skipToContent"
  >Skip to content</a>
  <header
    class="site-header"
    @keydown.esc="closeMenu"
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
          class="motion-toggle"
          :aria-pressed="paused"
          :disabled="reducedMotion"
          :aria-label="
            reducedMotion
              ? 'Reduced motion enabled by your system'
              : paused
                ? 'Resume motion'
                : 'Pause motion'
          "
          @click="toggleMotion"
        >
          <span aria-hidden="true">{{ paused || reducedMotion ? '▷' : 'Ⅱ' }}</span><span class="motion-label">{{
            reducedMotion ? 'Reduced motion' : paused ? 'Resume motion' : 'Pause motion'
          }}</span>
        </button>
        <button
          ref="toggle"
          class="menu-toggle"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-navigation"
          :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
          @click="mobileOpen = !mobileOpen"
        >
          {{ mobileOpen ? 'Close −' : 'Menu +' }}
        </button>
      </div>
      <div
        v-if="mobileOpen"
        id="mobile-navigation"
        class="mobile-menu"
      >
        <button
          v-for="link in links"
          :key="link"
          @click="navigate(link.toLowerCase())"
        >
          {{ link }} <span aria-hidden="true">↗</span>
        </button>
      </div>
    </nav>
  </header>
</template>
