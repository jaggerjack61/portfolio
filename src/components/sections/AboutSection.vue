<script setup lang="ts">
const focusAreas = [
  'End-to-end product ownership',
  'Scalable APIs and workflow automation',
  'Cloud infrastructure and deployment',
  'Precise, modern interfaces',
]

const coreStack = ['Django', 'Laravel', 'Vue', 'React', 'Terraform', 'AWS', 'OCI']

const awards = [
  { title: 'Presidential Innovation Award', year: '2023' },
  { title: 'ZESA Risk Awards — Innovation in ICT', year: '2024' },
  { title: 'HIT Book Prize — Best Capstone Design', year: '2023' },
]

const certifications = [
  'AWS Solutions Architect Associate',
  'HashiCorp Terraform Associate',
  'OCI Developer Professional',
  'OCI Foundations Associate',
  'OCI Data Platform Foundations',
]
</script>

<template>
  <section
    id="about"
    class="relative overflow-hidden bg-white py-24 md:py-36"
  >
    <div class="section-shell">
      <div class="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
        <div class="lg:col-span-7">
          <span class="reveal section-number">01 · About</span>

          <h2 class="reveal reveal-delay-1 display-heading max-w-4xl text-4xl md:text-5xl lg:text-6xl">
            Six years of building systems that don't break.
          </h2>

          <div class="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2">
            <p class="reveal reveal-delay-2 body-text">
              Full-stack engineer with deep backend expertise in Python and PHP, matched with modern frontend delivery in Vue and React. I work across the entire stack — from database schema to deployment pipeline.
            </p>
            <p class="reveal reveal-delay-3 body-text">
              Production experience across AWS and Oracle Cloud. I've shipped energy trading platforms, ERP modules for municipal governments, WhatsApp commerce bots, and developer tools used by Laravel teams.
            </p>
          </div>

          <div class="reveal reveal-delay-4 mt-12">
            <p class="label-mono mb-4">
              What I focus on
            </p>
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div
                v-for="(area, index) in focusAreas"
                :key="area"
                class="flex items-center gap-4 rounded-2xl border border-border-subtle bg-bg-primary p-4"
              >
                <span class="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-bg-elevated text-xs font-semibold text-accent">
                  {{ String(index + 1).padStart(2, '0') }}
                </span>
                <span class="text-sm font-medium text-text-secondary">{{ area }}</span>
              </div>
            </div>
          </div>

          <div class="reveal reveal-delay-4 mt-10">
            <p class="label-mono mb-4">
              Core toolkit
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="technology in coreStack"
                :key="technology"
                class="skill-tag"
              >
                {{ technology }}
              </span>
            </div>
          </div>
        </div>

        <aside class="lg:col-span-5">
          <div class="reveal soft-card p-6 md:p-8">
            <p class="section-number">
              Recognition
            </p>
            <div>
              <div
                v-for="award in awards"
                :key="award.title"
                class="award-row gap-5"
              >
                <span class="text-sm font-medium leading-snug text-primary">{{ award.title }}</span>
                <span class="label-mono shrink-0">{{ award.year }}</span>
              </div>
              <div class="award-row gap-5">
                <span class="text-sm font-medium text-primary">Member, Computer Society of Zimbabwe</span>
                <span class="label-mono shrink-0">Active</span>
              </div>
            </div>

            <div class="mt-10">
              <p class="label-mono mb-4">
                Certifications
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="cert in certifications"
                  :key="cert"
                  class="skill-tag"
                >
                  {{ cert }}
                </span>
              </div>
            </div>
          </div>

          <div class="reveal reveal-delay-2 mt-4 rounded-3xl bg-accent p-7 text-white">
            <p class="font-mono text-[0.64rem] uppercase tracking-[0.15em] text-white/70">
              Education
            </p>
            <p class="mt-4 text-lg font-semibold tracking-tight">
              B.Tech Software Engineering
            </p>
            <p class="mt-1 text-sm leading-relaxed text-white/75">
              Harare Institute of Technology, 2023
            </p>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>
