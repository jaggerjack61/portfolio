<script setup lang="ts">
import { experiences } from '@/data/portfolio'
</script>

<template>
  <section
    id="experience"
    tabindex="-1"
    class="content-section experience-section"
  >
    <div class="section-shell experience-grid">
      <div class="experience-heading reveal">
        <span class="section-number">03 / The journey</span>
        <h2 class="display-heading">
          Experience<br>that <span class="muted-heading">compounds.</span>
        </h2>
        <p class="section-intro">
          From commerce and public infrastructure to intelligent systems. Each chapter builds on the last.
        </p>
        <span class="timeline-caption label-mono">2017 → Present</span>
      </div>
      <div class="experience-timeline">
        <article
          v-for="exp in experiences"
          :key="exp.company"
          class="exp-entry reveal"
          :class="{ 'current-entry': exp.current }"
        >
          <span
            class="timeline-node"
            aria-hidden="true"
          />
          <div class="experience-period">
            <span>{{ exp.period }}</span><span
              v-if="exp.current"
              class="current-badge"
            >Current</span>
          </div>
          <h3>{{ exp.role }}</h3>
          <p class="experience-company">
            {{ exp.company }}
          </p>
          <ul>
            <li
              v-for="item in exp.description"
              :key="item"
            >
              {{ item }}
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
