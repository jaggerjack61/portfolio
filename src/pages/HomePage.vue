<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import Navigation from '@/components/ui/Navigation.vue'
import PortfolioStage from '@/components/PortfolioStage.vue'
import { setupMotion } from '@/composables/useMotion'
let cleanupMotion: (() => void) | undefined
onMounted(() => {
  cleanupMotion = setupMotion()
})
onBeforeUnmount(() => {
  cleanupMotion?.()
})
</script>

<template>
  <div class="relative min-h-screen w-full bg-bg-primary">
    <Navigation />
    <main
      id="main-content"
      tabindex="-1"
      class="relative z-10"
    >
      <h1 class="sr-only">
        Samuel Jarai — AI Engineer portfolio
      </h1>
      <PortfolioStage />
    </main>
  </div>
</template>
