<script setup lang="ts">
type Certification = {
  title: string
  issuer: string
  badgeSrc: string
  badgeAlt: string
  skills: string[]
}

const certifications: Certification[] = [
  {
    title: "AWS Certified Solutions Architect – Associate (SAA-C03)",
    issuer: "Amazon Web Services",
    badgeSrc: "images/badges/aws-certified-solutions-architect-associate-saa-c03.png",
    badgeAlt: "AWS Certified Solutions Architect – Associate (SAA-C03) badge",
    skills: ["EC2", "VPC", "S3", "IAM", "RDS", "CloudWatch"]
  },
  {
    title: "AWS Certified Cloud Practitioner (CLF-02)",
    issuer: "Amazon Web Services",
    badgeSrc: "images/badges/aws-certified-cloud-practitioner-clf-02.png",
    badgeAlt: "AWS Certified Cloud Practitioner (CLF-02) badge",
    skills: ["Cloud Basics", "IAM", "EC2", "S3", "Billing", "Well-Architected"]
  },
  {
    title: "HashiCorp Certified: Terraform Associate",
    issuer: "HashiCorp",
    badgeSrc: "images/badges/hashicorp-certified-terraform-associate.png",
    badgeAlt: "HashiCorp Certified: Terraform Associate badge",
    skills: ["IaC", "State", "Modules", "Providers", "Workspaces", "HCL"]
  },
  {
    title: "Oracle Cloud Infrastructure Developer Professional",
    issuer: "Oracle Cloud",
    badgeSrc: "images/badges/oracle-cloud-infrastructure-developer-professional.png",
    badgeAlt: "Oracle Cloud Infrastructure Developer Professional badge",
    skills: ["Functions", "API Gateway", "Compute", "Object Storage", "IAM", "DevOps"]
  },
  {
    title: "Oracle Cloud Infrastructure Foundations Associate",
    issuer: "Oracle Cloud",
    badgeSrc: "images/badges/oracle-cloud-infrastructure-foundations-associate.png",
    badgeAlt: "Oracle Cloud Infrastructure Foundations Associate badge",
    skills: ["Networking", "Compute", "Storage", "IAM", "Compartments", "Pricing"]
  },
  {
    title: "Oracle Data Platform Foundations Associate",
    issuer: "Oracle Cloud",
    badgeSrc: "images/badges/oracle-data-platform-foundations-associate.png",
    badgeAlt: "Oracle Data Platform Foundations Associate badge",
    skills: ["Data Lake", "Data Integration", "Autonomous DB", "Analytics", "Object Storage", "Governance"]
  }
]
</script>

<template>
  <section
    id="certifications"
    class="relative z-10 py-16 md:py-24"
  >
    <div class="max-w-6xl mx-auto px-6">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="reveal section-kicker">
            Credentials / 05
          </p>
          <h2 class="reveal reveal-delay-1 section-title mt-6 text-text-primary">
            Certifications for cloud architecture and delivery.
          </h2>
        </div>
        <p class="reveal reveal-delay-2 max-w-xl text-base leading-relaxed text-text-muted lg:text-right">
          The cert stack reinforces day-to-day delivery work across AWS, Oracle Cloud, and infrastructure automation.
        </p>
      </div>

      <div class="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="(cert, index) in certifications"
          :key="index"
          class="reveal card p-5"
          :class="index === 0 ? '' : `reveal-delay-${Math.min(5, index)}`"
        >
          <div class="flex items-start gap-4">
            <div class="shrink-0 rounded-[1.2rem] border border-border bg-background/40 p-3">
              <img
                :src="cert.badgeSrc"
                :alt="cert.badgeAlt"
                class="block h-14 w-14 object-contain"
                loading="lazy"
                decoding="async"
              >
            </div>
            <div>
              <p class="hud-label">
                {{ cert.issuer }}
              </p>
              <h3 class="mt-3 text-base font-semibold leading-tight text-text-primary">
                {{ cert.title }}
              </h3>
            </div>
          </div>

          <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="t in cert.skills"
                :key="t"
                class="rounded-full border border-border bg-background/35 px-3 py-2 text-[11px] font-medium text-text-muted"
              >
                {{ t }}
              </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
