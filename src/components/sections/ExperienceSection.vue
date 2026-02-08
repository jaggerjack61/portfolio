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
    class="min-h-screen py-20 relative z-10"
  >
    <div class="container mx-auto px-4 pointer-events-auto">
      <h2 class="text-4xl font-bold text-white mb-12 text-center">
        Experience
      </h2>
      <div class="max-w-4xl mx-auto space-y-12">
        <div
          v-for="(exp, index) in experiences"
          :key="index"
          class="relative pl-8 border-l-2 border-primary/50"
        >
          <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/50" />
          <div class="bg-white/5 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 transition-colors">
            <h3 class="text-2xl font-bold text-white">
              {{ exp.role }}
            </h3>
            <p class="text-primary font-semibold">
              {{ exp.company }}
            </p>
            <p class="text-sm text-gray-400 mb-4">
              {{ exp.period }} | {{ exp.location }}
            </p>
            <ul class="list-disc list-inside space-y-2 text-gray-300">
              <li
                v-for="(item, i) in exp.description"
                :key="i"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>