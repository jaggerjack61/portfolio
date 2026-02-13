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
      <h2 class="reveal section-title text-3xl md:text-4xl font-bold text-center text-text-primary mx-auto">
        Professional Experience
      </h2>

      <div class="mt-16 max-w-3xl mx-auto space-y-12">
        <div
          v-for="(exp, index) in experiences"
          :key="index"
          class="reveal timeline-item"
          :class="index === 0 ? '' : `reveal-delay-${Math.min(5, index)}`"
        >
          <div class="card p-6">
            <div class="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <h3 class="font-semibold text-xl text-text-primary">
                  {{ exp.role }}
                </h3>
                <p class="text-accent">
                  {{ exp.company }}
                </p>
              </div>
              <span class="px-3 py-1 rounded-full text-sm font-medium bg-primary-muted text-accent">
                {{ exp.period }}
              </span>
            </div>

            <ul class="space-y-3 text-sm text-text-muted">
              <li
                v-for="(item, i) in exp.description"
                :key="i"
                class="flex items-start gap-2"
              >
                <svg
                  class="flex-shrink-0 mt-1 text-accent"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="20,6 9,17 4,12" />
                </svg>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
