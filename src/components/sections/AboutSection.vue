<script setup lang="ts">
import { profileImage, focusAreas, coreStack, awards, certifications } from '@/data/portfolio'
</script>

<template>
  <section
    id="about"
    tabindex="-1"
    class="content-section about-section"
  >
    <div class="section-shell">
      <span class="section-number reveal">02 / The engineer</span>
      <div class="about-grid">
        <div class="about-profile reveal">
          <div class="profile-identity">
            <div class="portrait-frame">
              <img
                :src="profileImage"
                alt="Portrait of Samuel Jarai"
                width="112"
                height="112"
                loading="lazy"
                decoding="async"
              >
            </div>
            <div class="profile-name">
              <h3>Samuel Jarai</h3>
              <p>Harare, Zimbabwe</p>
            </div>
          </div>
          <div class="profile-note">
            <span class="status-dot" /><span>AI Engineer · Econet Wireless</span>
          </div>
          <div class="education-card">
            <span class="label-mono">Education</span>
            <h3>B.Tech Software Engineering</h3>
            <p>Harare Institute of Technology, 2023</p>
          </div>
        </div>
        <div class="about-copy">
          <h2 class="display-heading reveal">
            Intelligent systems.<br><span class="muted-heading">Solid foundations.</span>
          </h2>
          <p class="body-text reveal">
            I'm Samuel, an AI Engineer at Econet Wireless. I bring full-stack engineering and cloud
            infrastructure experience to building intelligent systems that work beyond the prototype.
          </p>
          <p class="body-text reveal">
            My work spans energy trading platforms, municipal ERP systems, WhatsApp commerce bots, and
            developer tools. From database schema to deployment pipeline, I connect the pieces that turn an
            idea into a working product.
          </p>
          <div class="focus-grid reveal">
            <div
              v-for="(area, index) in focusAreas"
              :key="area"
            >
              <span>0{{ index + 1 }}</span>
              <p>{{ area }}</p>
            </div>
          </div>
          <div class="toolkit reveal">
            <p class="label-mono">
              Tools of the trade
            </p>
            <div class="project-tags">
              <span
                v-for="technology in coreStack"
                :key="technology"
                class="skill-tag"
              >{{
                technology
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="credentials-grid">
        <div class="recognition-panel reveal">
          <span class="label-mono">Recognition</span>
          <div
            v-for="award in awards"
            :key="award.title"
            class="award-row"
          >
            <span>{{ award.title }}</span><span>{{ award.year }}</span>
          </div>
          <div class="award-row">
            <span>Member, Computer Society of Zimbabwe</span><span>Active</span>
          </div>
        </div>
        <div class="certifications-panel reveal">
          <span class="label-mono">Cloud certifications</span>
          <div
            v-for="(cert, index) in certifications"
            :key="cert"
            class="cert-row"
          >
            <span
              class="cert-check"
              aria-hidden="true"
            >✓</span><span>{{ cert }}</span><span class="cert-index">0{{ index + 1 }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
