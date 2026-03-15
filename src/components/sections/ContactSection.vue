<script setup lang="ts">
const email = 'jarai.samuel@gmail.com'
const phone = '+263 77 536 1584'
const github = 'https://github.com/jaggerjack61'
const linkedin = 'https://linkedin.com/in/samuel-jarai'
</script>

<template>
  <section
    id="contact"
    class="relative z-10 pb-16 pt-14 md:pb-24 md:pt-20"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="section-shell px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
        <div class="grid gap-8 xl:grid-cols-[0.95fr,1.05fr] xl:items-start">
          <div>
            <p class="reveal section-kicker">
              Transmission / 07
            </p>
            <h2 class="reveal reveal-delay-1 section-title mt-6 text-text-primary">
              Launch the next mission.
            </h2>
            <p class="reveal reveal-delay-2 mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
              If you need an engineer who can move from backend systems to frontend delivery to cloud deployment without losing precision, send the brief.
            </p>

            <div class="reveal reveal-delay-3 mt-8 flex flex-wrap gap-3">
              <span class="data-chip">Full-stack applications</span>
              <span class="data-chip">Cloud infrastructure</span>
              <span class="data-chip">Digital transformation work</span>
            </div>

            <footer class="reveal reveal-delay-4 mt-12 border-t border-border pt-6 text-sm text-text-muted">
              <p>Member, Computer Society of Zimbabwe (CSZ)</p>
              <p class="mt-2">Samuel Jarai / Full-Stack Software Engineer</p>
            </footer>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <a
              :href="`mailto:${email}`"
              class="card p-4 sm:p-6"
            >
              <p class="hud-label">Email</p>
              <div class="mt-4 flex items-center gap-4">
                <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-border bg-primary-muted text-accent">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div class="min-w-0 break-all text-sm font-semibold leading-relaxed text-text-primary sm:text-base sm:break-normal">
                  {{ email }}
                </div>
              </div>
            </a>

            <a
              :href="`tel:${phone.replace(/\s+/g, '')}`"
              class="card p-4 sm:p-6"
            >
              <p class="hud-label">Phone</p>
              <div class="mt-4 flex items-center gap-4">
                <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-border bg-primary-muted text-accent">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div class="min-w-0 text-sm font-semibold leading-relaxed text-text-primary sm:text-base">
                  {{ phone }}
                </div>
              </div>
            </a>

            <a
              :href="github"
              target="_blank"
              rel="noreferrer"
              class="card p-4 sm:p-6"
              aria-label="GitHub Profile"
            >
              <p class="hud-label">GitHub</p>
              <div class="mt-4 flex items-center gap-4">
                <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-border bg-primary-muted text-text-primary">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div class="min-w-0 truncate text-sm font-semibold leading-relaxed text-text-primary sm:text-base">
                  github.com/jaggerjack61
                </div>
              </div>
            </a>

            <a
              :href="linkedin"
              target="_blank"
              rel="noreferrer"
              class="card p-4 sm:p-6"
              aria-label="LinkedIn Profile"
            >
              <p class="hud-label">LinkedIn</p>
              <div class="mt-4 flex items-center gap-4">
                <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-border bg-primary-muted text-text-primary">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <div class="min-w-0 truncate text-sm font-semibold leading-relaxed text-text-primary sm:text-base">
                  linkedin.com/in/samuel-jarai
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
