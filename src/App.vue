<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import WorkSection from '@/components/sections/WorkSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
</script>

<template>
  <a
    href="#main"
    class="skip-link"
  >Skip to content</a>
  <SiteHeader />
  <main id="main">
    <HeroSection />
    <WorkSection />
    <AboutSection />
    <ExperienceSection />
    <ContactSection />
  </main>
  <footer class="shell site-footer">
    <span>Samuel Jarai · AI Engineer</span>
    <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
  </footer>
</template>
