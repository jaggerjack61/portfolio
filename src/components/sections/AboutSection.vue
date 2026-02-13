<template>
  <section
    id="about"
    class="relative z-10 py-24"
  >
    <div class="max-w-6xl mx-auto px-6">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 class="reveal section-title text-3xl md:text-4xl font-bold text-text-primary">
            About Me
          </h2>
          <p class="reveal reveal-delay-1 mt-8 text-lg text-text-muted">
            Full-stack software engineer with 6+ years of experience designing, building, and deploying scalable web applications. Strong backend expertise in Python (Django) and PHP (Laravel), paired with modern frontend frameworks (React, Vue).
          </p>
          <p class="reveal reveal-delay-2 mt-4 text-lg text-text-muted">
            Proven experience delivering cloud-hosted systems on AWS and Oracle Cloud, integrating APIs, automating workflows, and working in Agile teams. Comfortable owning features end-to-end from requirements to production.
          </p>
          <div class="reveal reveal-delay-3 flex flex-wrap gap-3 mt-8">
            <span class="px-4 py-2 rounded-full text-sm font-medium bg-primary-muted text-accent border border-border">
              Agile/Scrum
            </span>
            <span class="px-4 py-2 rounded-full text-sm font-medium bg-primary-muted text-accent border border-border">
              API Design
            </span>
            <span class="px-4 py-2 rounded-full text-sm font-medium bg-primary-muted text-accent border border-border">
              Microservices
            </span>
            <span class="px-4 py-2 rounded-full text-sm font-medium bg-primary-muted text-accent border border-border">
              IoT Integration
            </span>
          </div>
        </div>

        <div class="reveal reveal-delay-2">
          <div class="card p-8">
            <h3 class="font-semibold text-lg mb-6 text-text-primary">
              Education
            </h3>
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary-muted">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  class="text-accent"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <div>
                <div class="font-semibold text-text-primary">
                  Bachelor of Technology (B.Tech)
                </div>
                <div class="text-accent">
                  Software Engineering
                </div>
                <div class="text-sm mt-1 text-text-muted">
                  Harare Institute of Technology, 2023
                </div>
              </div>
            </div>

            <div class="mt-8 pt-6 border-t border-border">
              <h3 class="font-semibold text-lg mb-4 text-text-primary">
                Awards
              </h3>
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    class="text-accent"
                  >
                    <circle
                      cx="12"
                      cy="8"
                      r="6"
                    />
                    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                  </svg>
                  <span class="text-sm text-text-secondary">Presidential Innovation Award</span>
                </div>
                <div class="flex items-center gap-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    class="text-accent"
                  >
                    <circle
                      cx="12"
                      cy="8"
                      r="6"
                    />
                    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                  </svg>
                  <span class="text-sm text-text-secondary">ZESA Risk Awards - Innovation in ICT</span>
                </div>
                <div class="flex items-center gap-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    class="text-accent"
                  >
                    <circle
                      cx="12"
                      cy="8"
                      r="6"
                    />
                    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                  </svg>
                  <span class="text-sm text-text-secondary">HIT Book Prize - Best Capstone Design</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
