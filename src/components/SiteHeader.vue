<script setup lang="ts">
const links = ['Work', 'About', 'Experience', 'Contact']
</script>

<template>
  <header class="site-header">
    <nav
      class="shell nav"
      aria-label="Main navigation"
    >
      <a
        href="#top"
        class="brand"
      >Samuel Jarai</a>
      <ul class="nav-links">
        <li
          v-for="link in links"
          :key="link"
        >
          <a :href="`#${link.toLowerCase()}`">{{ link }}</a>
        </li>
      </ul>
      <a
        href="#contact"
        class="btn btn-primary btn-small"
      >Get in touch</a>
    </nav>
  </header>
</template>
