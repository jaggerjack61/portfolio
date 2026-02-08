<script setup lang="ts">
// Cursor-inspired Hero Section
const scrollToContact = () => {
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <section
    id="hero"
    class="min-h-screen flex items-center justify-center relative z-10 overflow-hidden"
  >
    <!-- Subtle glow effects -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-3xl -z-10" />
    <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent -z-10" />

    <div class="container mx-auto px-4 text-center max-w-4xl">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-xs font-medium text-text-secondary mb-8">
        <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        Available for new projects
      </div>
      
      <h1 class="text-6xl md:text-8xl font-bold text-text-primary mb-8 tracking-tight leading-none">
        Build software <br/>
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50">faster.</span>
      </h1>
      
      <p class="text-xl md:text-2xl text-text-muted mb-12 font-light leading-relaxed max-w-2xl mx-auto">
        Full-Stack Engineer specialized in building robust, scalable systems with modern technologies.
      </p>
      
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <button
          @click="scrollToContact"
          class="px-8 py-3 bg-white text-black hover:bg-gray-200 rounded-md font-medium transition-all text-sm tracking-wide"
        >
          Contact Me
        </button>
        <a
          href="https://github.com/jaggerjack61"
          target="_blank"
          class="px-8 py-3 bg-surface border border-border text-text-primary hover:bg-white/5 rounded-md font-medium transition-all text-sm tracking-wide"
        >
          View Work
        </a>
      </div>
    </div>
  </section>
</template>