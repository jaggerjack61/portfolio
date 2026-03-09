<script setup lang="ts">
const focusAreas = [
  'End-to-end product ownership',
  'Scalable APIs and workflow automation',
  'Cloud infrastructure and deployment strategy',
  'Interfaces that feel precise and modern',
]

const awards = [
  'Presidential Innovation Award',
  'ZESA Risk Awards - Innovation in ICT',
  'HIT Book Prize - Best Capstone Design',
]
</script>

<template>
  <section
    id="about"
    class="relative z-10 py-24"
  >
    <div class="max-w-6xl mx-auto px-6">
      <div class="grid gap-8 xl:grid-cols-[0.92fr,1.08fr] xl:items-start">
        <div>
          <div class="reveal">
            <p class="section-kicker">
              Dossier / 02
            </p>
            <h2 class="section-title mt-6 text-text-primary">
              Engineering for signal, scale, and reliability.
            </h2>
            <p class="mt-6 text-lg leading-relaxed text-text-secondary">
              Full-stack software engineer with 6+ years of experience designing, building, and deploying scalable web applications. Strong backend expertise in Python and PHP is matched with modern frontend execution in Vue and React.
            </p>
            <p class="mt-4 text-lg leading-relaxed text-text-muted">
              I work comfortably across architecture, APIs, infrastructure, and interface delivery, with production exposure in AWS and Oracle Cloud and a track record of shipping systems that need to be dependable under real operational pressure.
            </p>
          </div>

          <div class="reveal reveal-delay-2 mt-8 grid gap-3 sm:grid-cols-2">
            <div
              v-for="item in focusAreas"
              :key="item"
              class="data-chip"
            >
              {{ item }}
            </div>
          </div>
        </div>

        <div class="reveal reveal-delay-2">
          <div class="section-shell p-8">
            <div class="grid gap-8 md:grid-cols-[0.9fr,1.1fr]">
              <div>
                <p class="hud-label">
                  Education
                </p>
                <div class="mt-6 flex items-start gap-4 rounded-[1.25rem] border border-border bg-background/30 p-5">
                  <div class="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-border bg-primary-muted text-accent">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  </div>
                  <div>
                    <div class="font-display text-xl uppercase tracking-[0.08em] text-text-primary">
                      B.Tech
                    </div>
                    <div class="mt-2 text-base font-semibold text-accent">
                      Software Engineering
                    </div>
                    <div class="mt-2 text-sm leading-relaxed text-text-muted">
                      Harare Institute of Technology, 2023
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p class="hud-label">
                  Awards Log
                </p>
                <div class="mt-6 space-y-4">
                  <div
                    v-for="award in awards"
                    :key="award"
                    class="rounded-[1.25rem] border border-border bg-background/30 p-5"
                  >
                    <div class="flex items-center gap-3 text-accent">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <circle
                          cx="12"
                          cy="8"
                          r="6"
                        />
                        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                      </svg>
                      <span class="font-mono text-xs uppercase tracking-[0.24em] text-text-muted">
                        Recognition
                      </span>
                    </div>
                    <p class="mt-3 text-base font-semibold leading-relaxed text-text-secondary">
                      {{ award }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
