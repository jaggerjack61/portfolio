<script setup lang="ts">
const scrollToContact = () => {
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    contactSection.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  }
}
</script>

<template>
  <section
    id="hero"
    class="min-h-screen flex items-center relative z-10 pt-20"
  >
    <div class="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <div class="reveal">
          <span class="font-mono text-sm tracking-wider text-accent">
            FULL-STACK SOFTWARE ENGINEER
          </span>
        </div>
        <h1 class="reveal reveal-delay-1 text-5xl md:text-7xl font-bold mt-4 leading-tight text-text-primary">
          Samuel<br>
          Jarai
        </h1>
        <p class="reveal reveal-delay-2 text-lg mt-6 text-text-muted max-w-[520px]">
          Building scalable web applications with 6+ years of expertise in Python, PHP, React, and cloud infrastructure across Africa's most critical industries.
        </p>

        <div class="reveal reveal-delay-3 flex flex-wrap gap-4 mt-8">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-md bg-accent text-background px-7 py-3 font-semibold transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            @click="scrollToContact"
          >
            Get in Touch
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
          <a
            href="#experience"
            class="inline-flex items-center gap-2 rounded-md border border-border px-7 py-3 font-semibold text-text-primary transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            View Work
          </a>
        </div>

        <div class="reveal reveal-delay-4 flex flex-wrap items-center gap-6 mt-10 text-sm text-text-muted">
          <span class="inline-flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle
                cx="12"
                cy="10"
                r="3"
              />
            </svg>
            Harare, Zimbabwe
          </span>
          <span class="inline-flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
              />
              <polyline points="12,6 12,12 16,14" />
            </svg>
            6+ Years Experience
          </span>
        </div>
      </div>

      <div class="reveal reveal-delay-3">
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
            <span class="font-mono text-xs ml-4 text-text-muted">
              samuel@portfolio ~ %
            </span>
          </div>
          <div class="terminal-body text-text-secondary">
            <div class="text-accent">
              $ whoami
            </div>
            <div class="mt-2 text-text-primary">
              Full-Stack Engineer
            </div>
            <div class="mt-4 text-accent">
              $ cat skills.txt
            </div>
            <div class="mt-2">
              <span class="text-indigo-400">Backend:</span> Django, Laravel
            </div>
            <div class="mt-1">
              <span class="text-indigo-400">Frontend:</span> React, Vue, Tailwind
            </div>
            <div class="mt-1">
              <span class="text-indigo-400">Cloud:</span> AWS, OCI, Docker, Terraform
            </div>
            <div class="mt-4 text-accent">
              $ echo $CERTIFICATIONS
            </div>
            <div class="typing-text mt-2 text-text-primary">
              AWS SA | Terraform | OCI Developer
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
