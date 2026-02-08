<script setup lang="ts">
import ThreeScene from '@/components/3d/ThreeScene.vue'
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
  <div class="relative w-full bg-dark text-white min-h-screen">
    <ThreeScene />
    
    <Navigation />

    <main class="relative z-10">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <CertificationsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  </div>
</template>