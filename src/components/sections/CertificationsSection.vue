<script setup lang="ts">
type Certification = {
  title: string
  badgeSrc: string
  badgeAlt: string
  skills: string[]
}

const certifications: Certification[] = [
  {
    title: "AWS Certified Solutions Architect – Associate (SAA-C03)",
    badgeSrc: "images/badges/aws-certified-solutions-architect-associate-saa-c03.png",
    badgeAlt: "AWS Certified Solutions Architect – Associate (SAA-C03) badge",
    skills: ["EC2", "VPC", "S3", "IAM", "RDS", "CloudWatch"]
  },
  {
    title: "AWS Certified Cloud Practitioner (CLF-02)",
    badgeSrc: "images/badges/aws-certified-cloud-practitioner-clf-02.png",
    badgeAlt: "AWS Certified Cloud Practitioner (CLF-02) badge",
    skills: ["Cloud Basics", "IAM", "EC2", "S3", "Billing", "Well-Architected"]
  },
  {
    title: "HashiCorp Certified: Terraform Associate",
    badgeSrc: "images/badges/hashicorp-certified-terraform-associate.png",
    badgeAlt: "HashiCorp Certified: Terraform Associate badge",
    skills: ["IaC", "State", "Modules", "Providers", "Workspaces", "HCL"]
  },
  {
    title: "Oracle Cloud Infrastructure Developer Professional",
    badgeSrc: "images/badges/oracle-cloud-infrastructure-developer-professional.png",
    badgeAlt: "Oracle Cloud Infrastructure Developer Professional badge",
    skills: ["Functions", "API Gateway", "Compute", "Object Storage", "IAM", "DevOps"]
  },
  {
    title: "Oracle Cloud Infrastructure Foundations Associate",
    badgeSrc: "images/badges/oracle-cloud-infrastructure-foundations-associate.png",
    badgeAlt: "Oracle Cloud Infrastructure Foundations Associate badge",
    skills: ["Networking", "Compute", "Storage", "IAM", "Compartments", "Pricing"]
  },
  {
    title: "Oracle Data Platform Foundations Associate",
    badgeSrc: "images/badges/oracle-data-platform-foundations-associate.png",
    badgeAlt: "Oracle Data Platform Foundations Associate badge",
    skills: ["Data Lake", "Data Integration", "Autonomous DB", "Analytics", "Object Storage", "Governance"]
  }
]
</script>

<template>
  <section
    id="certifications"
    class="relative z-10 py-24 bg-elevated"
  >
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="reveal section-title text-3xl md:text-4xl font-bold text-center mx-auto text-text-primary">
        Certifications
      </h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
        <div
          v-for="(cert, index) in certifications"
          :key="index"
          class="reveal card p-4 flex items-center gap-4"
          :class="index === 0 ? '' : `reveal-delay-${Math.min(5, index)}`"
        >
          <div class="p-3 bg-primary-muted rounded-lg shrink-0">
            <img
              :src="cert.badgeSrc"
              :alt="cert.badgeAlt"
              class="h-10 w-10 object-contain block"
              loading="lazy"
            >
          </div>
          <div>
            <h3 class="text-sm font-semibold text-text-primary leading-tight">
              {{ cert.title }}
            </h3>
            <div class="flex flex-wrap gap-2 mt-3">
              <span
                v-for="t in cert.skills"
                :key="t"
                class="px-2 py-1 bg-background rounded text-[10px] font-medium text-text-muted border border-border"
              >
                {{ t }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
