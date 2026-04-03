<script setup lang="ts">
const scrollTo = (href: string) => {
  const section = document.getElementById(href)
  if (section) {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    section.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  }
}
</script>

<template>
  <section
    id="hero"
    class="relative z-10 min-h-[100dvh] flex items-end pb-20 pt-32 overflow-hidden"
  >
    <div
      class="absolute inset-0 z-0"
      style="background-image: url('/images/generated/hero-datacenter.jpeg'); background-size: cover; background-position: center 30%; filter: brightness(0.3) saturate(0.7);"
    />

    <div
      class="absolute inset-0 z-[1]"
      style="background: linear-gradient(to top, rgba(12,12,14,1) 0%, rgba(12,12,14,0.65) 35%, rgba(12,12,14,0.15) 70%, transparent 100%);"
    />

    <div class="relative z-10 mx-auto max-w-7xl px-6 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div class="lg:col-span-9">
          <span
            class="reveal label-mono"
            style="color: var(--accent-warm);"
          >Full-Stack Engineer · Harare, Zimbabwe</span>

          <h1 class="reveal reveal-delay-1 mt-6 display-heading text-7xl sm:text-8xl md:text-[9rem] lg:text-[11rem] leading-[0.9] tracking-tight">
            Samuel<br>
            <em
              class="italic not-italic opacity-60"
              style="color: var(--text-secondary);"
            >Jarai.</em>
          </h1>

          <p class="reveal reveal-delay-2 mt-8 body-text max-w-md text-base md:text-lg">
            Building cloud-backed systems for infrastructure, commerce, and public platforms — from architecture to polished delivery.
          </p>

          <div class="reveal reveal-delay-3 mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              class="btn-primary"
              @click="scrollTo('contact')"
            >
              Get In Touch
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button
              type="button"
              class="btn-ghost"
              @click="scrollTo('projects')"
            >
              View Projects
            </button>
          </div>
        </div>

        <div class="lg:col-span-3 lg:pb-2">
          <div class="reveal reveal-delay-2 space-y-6">
            <div>
              <p
                class="label-mono mb-3"
                style="color: var(--accent-warm);"
              >
                Stack
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in ['Django', 'Laravel', 'Vue', 'React', 'Terraform', 'AWS', 'OCI']"
                  :key="tech"
                  class="skill-tag"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <div class="divider" />

            <div>
              <p
                class="label-mono mb-2"
                style="color: var(--accent-warm);"
              >
                Current
              </p>
              <p
                class="text-sm"
                style="color: var(--text-secondary);"
              >
                Software Developer at ZETDC — building production systems for energy trading.
              </p>
            </div>

            <div class="divider" />

            <div>
              <p
                class="label-mono mb-2"
                style="color: var(--accent-warm);"
              >
                Education
              </p>
              <p
                class="text-sm"
                style="color: var(--text-secondary);"
              >
                B.Tech Software Engineering<br>
                Harare Institute of Technology, 2023
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="reveal reveal-delay-4 mt-16 flex items-center gap-6">
        <div
          class="h-px w-8"
          style="background: var(--accent-warm);"
        />
        <span class="label-mono">6+ Years · 15+ Projects Delivered</span>
      </div>
    </div>
  </section>
</template>
