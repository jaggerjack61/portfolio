<script setup lang="ts">
const links = [
  { name: 'About', href: 'about' },
  { name: 'Experience', href: 'experience' },
  { name: 'Skills', href: 'skills' },
  { name: 'Certifications', href: 'certifications' },
  { name: 'Projects', href: 'projects' },
  { name: 'Contact', href: 'contact' },
]
</script>

<template>
  <nav class="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border">
    <div class="container mx-auto flex justify-between items-center px-6 py-4">
      <!-- Logo -->
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-sm font-bold text-white">
          SJ
        </div>
        <span class="font-medium text-sm text-text-secondary tracking-wide">Samuel Jarai</span>
      </div>

      <ul class="hidden md:flex gap-8">
        <li
          v-for="link in links"
          :key="link.name"
        >
          <router-link
            :to="{ path: '/', hash: '#' + link.href }"
            class="text-text-muted hover:text-text-primary transition-colors text-sm font-medium tracking-wide"
          >
            {{ link.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>