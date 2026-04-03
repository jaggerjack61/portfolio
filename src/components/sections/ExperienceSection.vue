<script setup lang="ts">
const experiences = [
  {
    role: "Software Developer",
    company: "ZETDC — Zimbabwe Electricity Transmission and Distribution Company",
    period: "2024 — Present",
    description: [
      "Converted Excel-based electricity trading and risk management into a production-grade web application.",
      "Designed backend services and REST APIs for data validation, reporting, and auditability.",
      "Integrated AI-driven analytics for historical energy and trading datasets."
    ]
  },
  {
    role: "Software Developer",
    company: "LADS Africa",
    period: "2021 — 2023",
    description: [
      "Developed and maintained modules for a cloud-based ERP system used by multiple City and Rural District Councils.",
      "Built a Laravel-based POS analytics dashboard on AWS for real-time sales and cash-flow monitoring."
    ]
  },
  {
    role: "Full-Stack Developer",
    company: "Freelance / Contract",
    period: "2017 — 2023",
    description: [
      "Built a WhatsApp Cloud API chatbot for the National Social Security Authority (NSSA).",
      "Co-developed Pahukama, one of Zimbabwe's largest online supermarkets."
    ]
  }
]
</script>

<template>
  <section
    id="experience"
    class="relative z-10 py-24 md:py-40"
    style="background: var(--bg-secondary);"
  >
    <div class="mx-auto max-w-7xl px-6">
      <div class="mb-16">
        <span class="reveal section-number">02 / Experience</span>
        <div class="reveal reveal-delay-1 flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-2">
          <h2 class="display-heading text-4xl md:text-5xl lg:text-6xl">
            The work speaks<br>
            <em class="italic not-italic opacity-60">in production.</em>
          </h2>
          <p class="body-text max-w-sm text-sm">
            Energy platforms, civic infrastructure, commerce — systems that handle real load.
          </p>
        </div>
      </div>

      <div class="space-y-0">
        <div
          v-for="(exp, index) in experiences"
          :key="index"
          class="reveal group"
          :class="index === 0 ? '' : `reveal-delay-${index}`"
        >
          <div
            class="exp-entry group-hover:!border-opacity-100"
            style="border-color: var(--border-subtle); transition: border-color 0.3s ease;"
          >
            <div>
              <p
                class="label-mono"
                style="color: var(--accent-warm);"
              >
                {{ exp.period }}
              </p>
              <p
                class="font-display text-xl mt-2 leading-tight"
                style="color: var(--text-primary);"
              >
                {{ exp.role }}
              </p>
              <p
                class="text-sm mt-1"
                style="color: var(--text-muted);"
              >
                {{ exp.company }}
              </p>
            </div>
            <div>
              <ul class="space-y-3">
                <li
                  v-for="(item, i) in exp.description"
                  :key="i"
                  class="flex items-start gap-4 text-sm leading-relaxed"
                  style="color: var(--text-secondary);"
                >
                  <span
                    class="mt-2 w-1 h-1 rounded-full shrink-0"
                    style="background: var(--accent-warm);"
                  />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
