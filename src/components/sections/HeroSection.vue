<script setup lang="ts">
const profileImage = 'images/profile_pic.png'
const contextImage = 'images/projects/hero-datacenter.jpeg'

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
    class="relative min-h-[100dvh] overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40"
  >
    <div class="pointer-events-none absolute -right-32 top-16 h-[32rem] w-[32rem] rounded-full bg-[#e8edff] blur-3xl" />
    <div class="pointer-events-none absolute -left-28 bottom-0 h-72 w-72 rounded-full bg-[#eef7f0] blur-3xl" />

    <div class="section-shell relative z-10">
      <div class="grid min-h-[calc(100dvh-14rem)] grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-12">
        <div class="lg:col-span-7">
          <span class="reveal eyebrow">AI Engineer · Econet Wireless</span>

          <h1 class="reveal reveal-delay-1 mt-7 max-w-4xl text-[clamp(3.6rem,8.5vw,7.8rem)] font-semibold leading-[0.91] tracking-[-0.065em] text-primary">
            Building useful
            <span class="text-accent">intelligence.</span>
          </h1>

          <p class="reveal reveal-delay-2 mt-8 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
            I'm Samuel Jarai, an AI and full-stack engineer in Harare. I build cloud-backed systems for infrastructure, commerce, and public platforms — from architecture to polished delivery.
          </p>

          <div class="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-3">
            <button
              type="button"
              class="btn-primary"
              @click="scrollTo('contact')"
            >
              Get in touch
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button
              type="button"
              class="btn-ghost"
              @click="scrollTo('projects')"
            >
              Explore my work
            </button>
          </div>

          <div class="reveal reveal-delay-4 mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-border-subtle pt-7">
            <div>
              <p class="text-2xl font-semibold tracking-tight text-primary">
                6+
              </p>
              <p class="mt-1 text-xs text-text-muted">
                Years building
              </p>
            </div>
            <div>
              <p class="text-2xl font-semibold tracking-tight text-primary">
                15+
              </p>
              <p class="mt-1 text-xs text-text-muted">
                Projects delivered
              </p>
            </div>
            <div>
              <p class="text-2xl font-semibold tracking-tight text-primary">
                5
              </p>
              <p class="mt-1 text-xs text-text-muted">
                Cloud certifications
              </p>
            </div>
          </div>
        </div>

        <div class="relative lg:col-span-5">
          <div class="reveal reveal-delay-2 relative mx-auto max-w-[31rem]">
            <div class="soft-card relative overflow-hidden p-3 md:p-4">
              <div class="relative min-h-[29rem] overflow-hidden rounded-[1.15rem] bg-[#dde5fb] md:min-h-[34rem]">
                <img
                  :src="contextImage"
                  alt="Modern data centre infrastructure"
                  class="absolute inset-0 h-full w-full object-cover opacity-90"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-[#17213b]/75 via-[#3659e3]/5 to-white/5" />
                <div class="absolute inset-x-5 bottom-5 rounded-2xl border border-white/40 bg-white/90 p-4 shadow-xl backdrop-blur-md">
                  <div class="flex items-center gap-3">
                    <img
                      :src="profileImage"
                      alt="Samuel Jarai"
                      class="h-14 w-14 rounded-xl object-cover ring-2 ring-white"
                    >
                    <div>
                      <p class="font-semibold tracking-tight text-primary">
                        Samuel Jarai
                      </p>
                      <p class="mt-0.5 text-xs text-text-secondary">
                        AI Engineer at Econet Wireless
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="absolute -left-4 top-8 rounded-2xl border border-border-subtle bg-white px-4 py-3 shadow-lg md:-left-10">
              <p class="label-mono text-[0.58rem]">
                Current focus
              </p>
              <p class="mt-1 text-sm font-medium text-primary">
                AI · Cloud · Product
              </p>
            </div>

            <div class="absolute -right-3 top-24 rounded-2xl border border-border-subtle bg-white p-3 shadow-lg md:-right-8">
              <div class="flex items-center gap-2">
                <span class="relative flex h-2.5 w-2.5">
                  <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <span class="text-xs font-medium text-primary">Open to collaborate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
