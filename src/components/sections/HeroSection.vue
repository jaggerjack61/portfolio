<script setup lang="ts">
import { certifications, profileImage, projects } from '@/data/portfolio'

const facts = [
  ['role', 'AI Engineer'],
  ['company', 'Econet Wireless'],
  ['based', 'Harare, UTC+2'],
  ['building since', '2017'],
  ['projects', String(projects.length)],
  ['certifications', String(certifications.length)],
]
</script>

<template>
  <section
    id="top"
    class="hero"
  >
    <div class="shell hero-grid">
      <div>
        <div class="hero-id">
          <img
            :src="profileImage"
            alt="Portrait of Samuel Jarai"
            width="44"
            height="44"
          >
          <p>
            <strong>Samuel Jarai</strong>
            <span class="status"><i aria-hidden="true" />AI Engineer at Econet Wireless</span>
          </p>
        </div>
        <h1>Building useful intelligence, from first idea to production.</h1>
        <p class="hero-lede">
          I build AI-powered products, developer tools, and the infrastructure that makes them work.
        </p>
        <div class="actions">
          <a
            href="#work"
            class="btn btn-primary"
          >See the work <span aria-hidden="true">↓</span></a>
          <a
            href="#contact"
            class="btn btn-quiet"
          >Get in touch</a>
        </div>
      </div>
      <dl class="facts">
        <div
          v-for="[key, value] in facts"
          :key="key"
        >
          <dt>{{ key }}</dt>
          <dd>{{ value }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
