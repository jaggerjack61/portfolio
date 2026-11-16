<script setup lang="ts">
import { contacts, email } from '@/data/portfolio'
</script>

<template>
  <section
    id="contact"
    class="section"
  >
    <div class="shell rail">
      <p class="label">
        Contact
      </p>
      <div>
        <h2 class="contact-title">
          Let's build something real.
        </h2>
        <p class="lede">
          Have an idea that needs intelligence behind it? I'm happy to talk about AI systems, product
          builds, and cloud infrastructure.
        </p>
        <div class="actions">
          <a
            :href="`mailto:${email}`"
            class="btn btn-primary"
          >Start a conversation <span aria-hidden="true">↗</span></a>
        </div>
        <ul class="rows contact-rows">
          <li
            v-for="contact in contacts"
            :key="contact.label"
          >
            <span class="meta">{{ contact.label }}</span>
            <a
              :href="contact.href"
              :target="contact.href.startsWith('https:') ? '_blank' : undefined"
              :rel="contact.href.startsWith('https:') ? 'noopener noreferrer' : undefined"
            >{{ contact.value }} <span aria-hidden="true">↗</span></a>
          </li>
          <li>
            <span class="meta">Location</span>
            <span>Harare, Zimbabwe · UTC+2</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
