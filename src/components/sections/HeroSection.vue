<script setup lang="ts">
const commandLines = [
  {
    command: '$ init mission-profile',
    response: 'Samuel Jarai / full-stack systems engineer',
  },
  {
    command: '$ scan sectors',
    response: 'Energy, civic platforms, commerce, cloud operations',
  },
  {
    command: '$ load toolkit',
    response: 'Django | Laravel | Vue | React | Terraform | AWS | OCI',
  },
]

const telemetryCards = [
  {
    label: 'Orbit',
    value: 'Harare',
    meta: 'Zimbabwe / UTC+2',
  },
  {
    label: 'Status',
    value: 'Shipping',
    meta: 'Critical systems and polished product work',
  },
]

const scrollToContact = () => {
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    contactSection.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  }
}

const scrollToProjects = () => {
  const projectsSection = document.getElementById('projects')
  if (projectsSection) {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    projectsSection.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  }
}
</script>

<template>
  <section
    id="hero"
    class="relative z-10 flex min-h-screen items-center overflow-hidden pb-16 pt-28 md:pt-32"
  >
    <div class="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 xl:grid-cols-[1.08fr,0.92fr]">
      <div>
        <div class="reveal flex flex-wrap items-center gap-4">
          <span class="section-kicker">Cosmic Systems Engineer</span>
          <span class="status-chip">Systems Nominal</span>
        </div>

        <div class="reveal reveal-delay-1 mt-8">
          <p class="hud-label">Command Node 01</p>
          <h1 class="mt-4 font-display text-5xl uppercase leading-[0.92] tracking-[0.08em] text-text-primary md:text-7xl">
            Engineering solutions for the future today.
          </h1>
          <p class="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
            Samuel Jarai builds cloud-backed products for infrastructure, commerce, and public systems, combining backend rigor with polished frontend delivery and deployment discipline.
          </p>
        </div>

        <div class="reveal reveal-delay-2 mt-8 flex flex-wrap gap-3">
          <span class="data-chip">Backend architecture</span>
          <span class="data-chip">Interactive web interfaces</span>
          <span class="data-chip">Cloud delivery pipelines</span>
        </div>

        <div class="reveal reveal-delay-3 mt-10 flex flex-wrap gap-4">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 font-semibold text-background transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            @click="scrollToContact"
          >
            Transmit Signal
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full border border-border bg-background/35 px-7 py-3 font-semibold text-text-primary transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            @click="scrollToProjects"
          >
            Browse Missions
          </button>
        </div>

        <div class="reveal reveal-delay-4 mt-10 grid gap-4 sm:grid-cols-2">
          <div
            v-for="card in telemetryCards"
            :key="card.label"
            class="metric-card"
          >
            <p class="hud-label">{{ card.label }}</p>
            <div class="mt-3 text-2xl font-display uppercase tracking-[0.08em] text-text-primary">
              {{ card.value }}
            </div>
            <p class="mt-2 text-sm text-text-muted">
              {{ card.meta }}
            </p>
          </div>
        </div>
      </div>

      <div class="reveal reveal-delay-3 relative">
        <div class="floating-badge">
          Live Console
        </div>
        <div class="terminal">
          <div class="terminal-header">
            <div
              class="terminal-dot"
              style="background: #ff5f57;"
            />
            <div
              class="terminal-dot"
              style="background: #ffbd2e;"
            />
            <div
              class="terminal-dot"
              style="background: #28c840;"
            />
            <span class="ml-4 font-mono text-xs uppercase tracking-[0.28em] text-text-muted">
              orbital-console / samuel.jarai
            </span>
          </div>
          <div class="terminal-body text-text-secondary">
            <div class="flex items-center justify-between border-b border-border/60 pb-4 text-[0.72rem] uppercase tracking-[0.26em] text-text-muted">
              <span>session: command deck</span>
              <span>uptime: 06+ years</span>
            </div>

            <div class="mt-5 space-y-5">
              <div
                v-for="line in commandLines"
                :key="line.command"
              >
                <div class="text-accent">
                  {{ line.command }}
                </div>
                <div class="pl-4 text-text-secondary">
                  {{ line.response }}
                </div>
              </div>

              <div>
                <div class="text-warning">
                  $ echo $CERT_MATRIX
                </div>
                <div class="typing-text mt-2 text-text-primary">
                  AWS SA | Terraform | OCI Developer Professional
                </div>
              </div>
            </div>

            <div class="mt-8 grid gap-3 sm:grid-cols-2">
              <div class="metric-card">
                <p class="hud-label">Deployment range</p>
                <div class="mt-2 text-lg font-semibold text-text-primary">
                  API platforms, dashboards, automation
                </div>
              </div>
              <div class="metric-card">
                <p class="hud-label">Current vector</p>
                <div class="mt-2 text-lg font-semibold text-text-primary">
                  Cloud-ready, product-minded engineering
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
