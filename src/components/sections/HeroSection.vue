<script setup lang="ts">
const profileImage = 'images/profile_pic.png'
const github = 'https://github.com/jaggerjack61'
const linkedin = 'https://linkedin.com/in/samuel-jarai'

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
            I'm Samuel Jarai, an AI and full-stack engineer in Harare. I build cloud-backed systems for infrastructure, commerce, and public platforms, from architecture to polished delivery.
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
          <div class="reveal reveal-delay-2 relative mx-auto max-w-[24rem]">
            <div class="soft-card relative overflow-hidden p-3 md:p-4">
              <div class="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#e8edff] blur-2xl" />
              <div class="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[#eef7f0] blur-2xl" />

              <div class="relative flex flex-col items-center rounded-[1.15rem] bg-gradient-to-br from-white/70 via-[#f2f5ff] to-[#f0f6f1] px-6 py-10 text-center md:py-12">
                <div class="relative">
                  <img
                    :src="profileImage"
                    alt="Samuel Jarai"
                    class="h-28 w-28 rounded-2xl object-cover shadow-lg ring-4 ring-white md:h-32 md:w-32"
                  >
                  <span class="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-white">
                    <span class="h-2 w-2 animate-ping rounded-full bg-emerald-300" />
                  </span>
                </div>

                <h2 class="mt-6 text-2xl font-semibold tracking-tight text-primary">
                  Samuel Jarai
                </h2>
                <p class="mt-1 text-sm text-text-secondary">
                  AI Engineer at Econet Wireless
                </p>
                <p class="label-mono mt-4 text-[0.58rem]">
                  Harare · Zimbabwe
                </p>

                <div class="mt-6 h-px w-16 bg-border" />

                <div class="mt-6 flex items-center gap-3">
                  <a
                    :href="github"
                    target="_blank"
                    rel="noopener"
                    aria-label="GitHub"
                    class="flex h-10 w-10 items-center justify-center rounded-xl border border-border-subtle bg-white text-text-secondary transition hover:border-accent hover:text-accent"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.85.09-.66.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.25 10.25 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
                    </svg>
                  </a>
                  <a
                    :href="linkedin"
                    target="_blank"
                    rel="noopener"
                    aria-label="LinkedIn"
                    class="flex h-10 w-10 items-center justify-center rounded-xl border border-border-subtle bg-white text-text-secondary transition hover:border-accent hover:text-accent"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
