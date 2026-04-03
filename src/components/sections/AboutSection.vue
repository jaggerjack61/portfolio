<script setup lang="ts">
const abstractImage = 'images/projects/abstract-geo.jpeg'

const focusAreas = [
  'End-to-end product ownership',
  'Scalable APIs and workflow automation',
  'Cloud infrastructure and deployment',
  'Precise, modern interfaces',
]

const awards = [
  { title: 'Presidential Innovation Award', year: '2023' },
  { title: 'ZESA Risk Awards — Innovation in ICT', year: '2024' },
  { title: 'HIT Book Prize — Best Capstone Design', year: '2023' },
]
</script>

<template>
  <section
    id="about"
    class="relative z-10 py-24 md:py-40 overflow-hidden"
  >
    <div
      class="absolute right-0 top-0 bottom-0 w-1/3 opacity-[0.07] z-0"
    >
      <img
        :src="abstractImage"
        alt=""
        class="w-full h-full object-cover"
        aria-hidden="true"
      >
    </div>

    <div class="mx-auto max-w-7xl px-6 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div class="lg:col-span-7">
          <span class="reveal section-number">01 / About</span>

          <div class="reveal reveal-delay-1">
            <p class="display-heading text-4xl md:text-5xl lg:text-6xl leading-tight">
              Six years of building systems that don't break.
            </p>
          </div>

          <div class="mt-12 space-y-8">
            <div class="reveal reveal-delay-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p class="body-text">
                  Full-stack engineer with deep backend expertise in Python and PHP, matched with modern frontend delivery in Vue and React. I work across the entire stack — from database schema to deployment pipeline.
                </p>
              </div>
              <div>
                <p class="body-text">
                  Production experience across AWS and Oracle Cloud. I've shipped energy trading platforms, ERP modules for municipal governments, WhatsApp commerce bots, and developer tools used by Laravel teams.
                </p>
              </div>
            </div>

            <div class="reveal reveal-delay-3">
              <p class="label-mono mb-4">
                What I Focus On
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  v-for="area in focusAreas"
                  :key="area"
                  class="flex items-center gap-3 p-3 border"
                  style="border-color: var(--border-subtle); background: var(--bg-secondary);"
                >
                  <div
                    class="w-1.5 h-1.5 rounded-full shrink-0"
                    style="background: var(--accent-warm);"
                  />
                  <span
                    class="text-sm"
                    style="color: var(--text-secondary);"
                  >{{ area }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5 lg:pt-8">
          <span class="reveal section-number">Recognition</span>

          <div class="reveal reveal-delay-1">
            <div
              v-for="award in awards"
              :key="award.title"
              class="award-row"
            >
              <span
                class="text-sm"
                style="color: var(--text-primary);"
              >{{ award.title }}</span>
              <span class="label-mono shrink-0">{{ award.year }}</span>
            </div>
            <div class="award-row">
              <span
                class="text-sm"
                style="color: var(--text-primary);"
              >Member, Computer Society of Zimbabwe</span>
              <span class="label-mono shrink-0">Active</span>
            </div>
          </div>

          <div class="reveal reveal-delay-2 mt-12">
            <p class="label-mono mb-4">
              Certifications
            </p>
            <div class="flex flex-col gap-2">
              <span
                v-for="cert in ['AWS Solutions Architect Associate', 'HashiCorp Terraform Associate', 'OCI Developer Professional', 'OCI Foundations Associate', 'OCI Data Platform Foundations']"
                :key="cert"
                class="skill-tag"
              >
                {{ cert }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
