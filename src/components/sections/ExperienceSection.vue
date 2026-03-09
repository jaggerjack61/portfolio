<script setup lang="ts">
const experiences = [
  {
    role: "Software Developer",
    company: "Zimbabwe Electricity Transmission and Distribution Company (ZETDC)",
    period: "2024 – Present",
    location: "Harare, Zimbabwe",
    description: [
      "Converted Excel-based electricity trading and risk management processes into a secure, production-grade web application.",
      "Designed backend services and REST APIs to support data validation, reporting, and auditability.",
      "Integrated AI-driven analytics to extract insights from historical energy and trading datasets."
    ]
  },
  {
    role: "Software Developer",
    company: "LADS Africa",
    period: "2021 – 2023",
    location: "Harare, Zimbabwe",
    description: [
      "Developed and maintained modules for a cloud-based ERP system used by multiple City and Rural District Councils.",
      "Built a Laravel-based POS analytics dashboard hosted on AWS for real-time sales and cash-flow monitoring."
    ]
  },
  {
    role: "Full-Stack Developer",
    company: "Freelance / Contract",
    period: "2017 – 2023",
    location: "Harare, Zimbabwe",
    description: [
      "Built a WhatsApp Cloud API chatbot for the National Social Security Authority (NSSA).",
      "Co-developed Pahukama, one of Zimbabwe’s largest online supermarkets."
    ]
  }
]
</script>

<template>
  <section
    id="experience"
    class="relative z-10 py-24"
  >
    <div class="max-w-6xl mx-auto px-6">
      <div class="max-w-4xl">
        <p class="reveal section-kicker">
          Flight Log / 03
        </p>
        <div class="reveal reveal-delay-1 mt-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <h2 class="section-title text-text-primary">
            Experience across infrastructure, platforms, and product delivery.
          </h2>
          <p class="max-w-xl text-base leading-relaxed text-text-muted lg:text-right">
            The work spans production web systems, cloud-hosted business platforms, and customer-facing digital products where reliability matters.
          </p>
        </div>
      </div>

      <div class="mt-14 max-w-4xl space-y-8">
        <div
          v-for="(exp, index) in experiences"
          :key="index"
          class="reveal timeline-item"
          :class="index === 0 ? '' : `reveal-delay-${Math.min(5, index)}`"
        >
          <article class="section-shell overflow-hidden p-0">
            <div class="grid gap-0 md:grid-cols-[0.34fr,0.66fr]">
              <div class="border-b border-border bg-background/35 p-6 md:border-b-0 md:border-r">
                <p class="hud-label">
                  Mission {{ index + 1 }}
                </p>
                <h3 class="mt-4 font-display text-2xl uppercase tracking-[0.08em] text-text-primary">
                  {{ exp.role }}
                </h3>
                <p class="mt-3 text-base font-semibold leading-relaxed text-accent">
                  {{ exp.company }}
                </p>
                <p class="mt-5 font-mono text-xs uppercase tracking-[0.24em] text-text-muted">
                  {{ exp.period }}
                </p>
                <p class="mt-2 text-sm text-text-muted">
                  {{ exp.location }}
                </p>
              </div>

              <div class="p-6">
                <p class="hud-label">
                  Key Contributions
                </p>
                <ul class="mt-5 space-y-4 text-sm leading-relaxed text-text-secondary">
                  <li
                    v-for="(item, i) in exp.description"
                    :key="i"
                    class="flex items-start gap-3"
                  >
                    <span class="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-accent shadow-[0_0_18px_rgba(118,247,255,0.9)]" />
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
