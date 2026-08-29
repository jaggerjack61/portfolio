<script setup lang="ts">
const experiences = [
  {
    role: 'AI Engineer',
    company: 'Econet Wireless',
    period: 'Jul 2026 - Present',
    description: [
      'Designing and delivering AI-powered systems for Econet Wireless.',
    ],
    current: true,
  },
  {
    role: 'Senior Software Engineer',
    company: 'ZETDC (Zimbabwe Electricity Transmission and Distribution Company)',
    period: '2024 - Jun 2026',
    description: [
      'Converted Excel-based electricity trading and risk management into a production-grade web application.',
      'Designed backend services and REST APIs for data validation, reporting, and auditability.',
      'Integrated AI-driven analytics for historical energy and trading datasets.',
    ],
  },
  {
    role: 'Software Developer',
    company: 'LADS Africa',
    period: '2021 - 2023',
    description: [
      'Developed and maintained modules for a cloud-based ERP system used by multiple City and Rural District Councils.',
      'Built a Laravel-based POS analytics dashboard on AWS for real-time sales and cash-flow monitoring.',
    ],
  },
  {
    role: 'Full-Stack Developer',
    company: 'Freelance / Contract',
    period: '2017 - 2023',
    description: [
      'Built a WhatsApp Cloud API chatbot for the National Social Security Authority (NSSA).',
      "Co-developed Pahukama, one of Zimbabwe's largest online supermarkets.",
    ],
  },
]
</script>

<template>
  <section
    id="experience"
    class="relative bg-bg-primary py-24 md:py-36"
  >
    <div class="section-shell">
      <div class="mb-14 grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
        <div class="md:col-span-8">
          <span class="reveal section-number">02 · Experience</span>
          <h2 class="reveal reveal-delay-1 display-heading text-4xl md:text-5xl lg:text-6xl">
            Work that lives<br class="hidden sm:block"> in production.
          </h2>
        </div>
        <p class="reveal reveal-delay-2 body-text max-w-md text-sm md:col-span-4">
          AI, energy platforms, civic infrastructure, and commerce: systems built for real people and real load.
        </p>
      </div>

      <div class="overflow-hidden rounded-3xl border border-border-subtle bg-white px-6 md:px-9">
        <article
          v-for="(exp, index) in experiences"
          :key="`${exp.role}-${exp.company}`"
          class="reveal exp-entry relative"
          :class="index > 0 ? `reveal-delay-${Math.min(index, 4)}` : ''"
        >
          <div>
            <div class="flex flex-wrap items-center gap-2">
              <p class="label-mono text-accent">
                {{ exp.period }}
              </p>
              <span
                v-if="exp.current"
                class="rounded-full bg-emerald-50 px-2.5 py-1 font-mono text-[0.56rem] uppercase tracking-wider text-emerald-700"
              >
                Current
              </span>
            </div>
            <h3 class="mt-3 text-xl font-semibold leading-tight tracking-tight text-primary">
              {{ exp.role }}
            </h3>
            <p class="mt-1.5 text-sm leading-relaxed text-text-muted">
              {{ exp.company }}
            </p>
          </div>

          <ul class="space-y-3">
            <li
              v-for="item in exp.description"
              :key="item"
              class="flex items-start gap-4 text-sm leading-relaxed text-text-secondary"
            >
              <span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
