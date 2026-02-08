<script setup lang="ts">
const experiences = [
  {
    role: "Software Developer",
    company: "ZETDC",
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
    class="py-24 relative z-10"
  >
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-text-primary mb-12 text-center tracking-tight">
        Experience
      </h2>
      <div class="max-w-4xl mx-auto grid grid-cols-1 gap-6">
        <div
          v-for="(exp, index) in experiences"
          :key="index"
          class="group bg-surface border border-border rounded-xl p-8 hover:border-text-secondary/30 transition-all duration-300 relative overflow-hidden"
        >
          <!-- Hover Gradient -->
          <div class="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          
          <div class="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4 relative z-10">
            <div>
              <h3 class="text-xl font-semibold text-text-primary mb-1">
                {{ exp.role }}
              </h3>
              <p class="text-text-secondary">
                {{ exp.company }}
              </p>
            </div>
            <span class="inline-flex items-center px-3 py-1 rounded-md bg-white/5 border border-white/5 text-xs text-text-muted font-mono">
              {{ exp.period }}
            </span>
          </div>
          
          <ul class="space-y-3 relative z-10">
            <li
              v-for="(item, i) in exp.description"
              :key="i"
              class="flex items-start gap-3 text-text-secondary text-sm leading-relaxed"
            >
              <span class="mt-1.5 w-1 h-1 rounded-full bg-text-muted flex-shrink-0" />
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>