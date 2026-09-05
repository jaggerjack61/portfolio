<script setup lang="ts">
import NeuralCore from '@/components/visuals/NeuralCore.vue'
import { scrollToSection, useMotion } from '@/composables/useMotion'
const { motionEnabled } = useMotion()
</script>

<template>
  <section
    id="hero"
    tabindex="-1"
    class="hero-section"
  >
    <div
      class="hero-grid"
      aria-hidden="true"
    />
    <div class="hero-depth">
      <div class="section-shell hero-layout">
        <div class="hero-copy">
          <p class="eyebrow hero-enter">
            Samuel Jarai <span class="eyebrow-divider">/</span> AI Engineer
          </p>
          <h1 class="hero-title hero-enter enter-1">
            Building<br>useful<br><span>intelligence.</span>
          </h1>
          <p class="hero-description hero-enter enter-2">
            From an idea to an intelligent system.<br>I build AI-powered products, tools, and the
            infrastructure that makes them work.
          </p>
          <div class="hero-actions hero-enter enter-3">
            <button
              class="btn-primary"
              @click="scrollToSection('projects')"
            >
              Explore my work <span aria-hidden="true">↗</span>
            </button>
            <button
              class="btn-ghost"
              @click="scrollToSection('contact')"
            >
              Let's connect <span aria-hidden="true">↗</span>
            </button>
          </div>
          <div class="hero-role hero-enter enter-3">
            <span class="status-dot" /><span>AI Engineer at <strong>Econet Wireless</strong></span>
          </div>
        </div>
        <div class="hero-visual hero-enter enter-2">
          <div class="visual-topline">
            <span class="label-mono">Intelligence, engineered.</span><span
              class="cross-mark"
              aria-hidden="true"
            >+</span>
          </div>
          <NeuralCore :motion-enabled="motionEnabled" />
          <div class="core-caption">
            <span class="core-caption-line" /><span>AI SYSTEMS <b>×</b> HUMAN INTENT</span><span class="core-caption-line" />
          </div>
          <div class="visual-bottomline">
            <span>01 / NEURAL CORE</span><span class="core-interaction">{{ motionEnabled ? 'MOVE TO EXPLORE ↗' : 'STILL VIEW' }}</span>
          </div>
        </div>
      </div>
      <div class="section-shell hero-footer">
        <div class="hero-disciplines">
          <span>AI engineering</span><i /><span>Full-stack systems</span><i /><span>Cloud infrastructure</span>
        </div>
        <button
          class="scroll-cue"
          @click="scrollToSection('projects')"
        >
          Scroll to discover <span aria-hidden="true">↓</span>
        </button>
      </div>
    </div>
  </section>
</template>
