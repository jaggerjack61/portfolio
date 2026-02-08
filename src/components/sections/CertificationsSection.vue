<script setup lang="ts">
const certifications = [
  "AWS Certified Solutions Architect – Associate (SAA-C03)",
  "AWS Certified Cloud Practitioner (CLF-02)",
  "HashiCorp Certified: Terraform Associate",
  "Oracle Cloud Infrastructure Developer Professional",
  "Oracle Cloud Infrastructure Foundations Associate",
  "Oracle Data Platform Foundations Associate"
]
</script>

<template>
  <section
    id="certifications"
    class="py-16 relative z-10"
  >
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-text-primary mb-10 text-center">
        Certifications
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(cert, index) in certifications"
          :key="index"
          class="bg-surface rounded-xl p-6 shadow-card hover:shadow-card-hover border border-gray-100 transition-all duration-300 hover:-translate-y-1 group flex items-start gap-4"
        >
          <div class="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
            <span class="text-2xl text-primary">🏆</span>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors leading-tight">
              {{ cert }}
            </h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>