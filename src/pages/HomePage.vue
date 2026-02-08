<script setup lang="ts">
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import CertificationsSection from '@/components/sections/CertificationsSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import Navigation from '@/components/ui/Navigation.vue'
</script>

<template>
  <div class="relative w-full bg-background text-text-primary min-h-screen">
    <Navigation />

    <main class="relative z-10 pt-16">
      <HeroSection />
      <div class="container mx-auto px-4 py-8 space-y-8">
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <CertificationsSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </main>
  </div>
</template>