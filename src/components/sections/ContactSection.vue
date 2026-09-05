<script setup lang="ts">
import { scrollToSection } from '@/composables/useMotion'
import { email, contacts } from '@/data/portfolio'
</script>

<template>
  <section
    id="contact"
    tabindex="-1"
    class="contact-section"
  >
    <div class="section-shell">
      <div class="contact-panel reveal">
        <div class="contact-heading">
          <span class="section-number">04 / Next connection</span>
          <h2>Let's build<br>something <span>real.</span></h2>
          <p>
            Have an idea that needs intelligence behind it? Let's talk about AI systems, product builds, and
            cloud infrastructure.
          </p>
          <a
            :href="`mailto:${email}`"
            class="btn-primary"
          >Start a conversation <span aria-hidden="true">↗</span></a>
        </div>
        <div class="contact-details">
          <span class="label-mono">A direct line</span><a
            v-for="contact in contacts"
            :key="contact.label"
            :href="contact.href"
            :target="contact.href.startsWith('https:') ? '_blank' : undefined"
            :rel="contact.href.startsWith('https:') ? 'noopener noreferrer' : undefined"
            class="contact-line"
          ><div>
             <span class="contact-label">{{ contact.label }}</span><span class="contact-value">{{ contact.value }}</span>
           </div>
            <span
              class="contact-arrow"
              aria-hidden="true"
            >↗</span></a>
          <div class="contact-location">
            <span class="status-dot" /><span>Harare, Zimbabwe <span class="location-divider">/</span> UTC+2</span>
          </div>
        </div>
      </div>
      <footer class="site-footer">
        <a
          href="#hero"
          class="footer-signature"
          @click.prevent="scrollToSection('hero')"
        >sj<span>.</span></a><span>Samuel Jarai · AI Engineer</span><span class="footer-note">Thoughtfully engineered.</span><button
          class="back-top"
          @click="scrollToSection('hero')"
        >
          Back to top <span aria-hidden="true">↑</span>
        </button>
      </footer>
    </div>
  </section>
</template>
