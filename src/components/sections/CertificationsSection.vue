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
    class="min-h-[50vh] py-20 relative z-10 flex items-center"
  >
    <div class="container mx-auto px-4 pointer-events-auto">
      <h2 class="text-4xl font-bold text-white mb-12 text-center">
        Certifications
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(cert, index) in certifications"
          :key="index"
          class="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 group"
        >
          <div class="flex items-start gap-4">
            <div class="p-3 bg-white/10 rounded-lg group-hover:bg-accent/20 transition-colors">
              <span class="text-2xl">🏆</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-white group-hover:text-accent transition-colors leading-tight">
                {{ cert }}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>