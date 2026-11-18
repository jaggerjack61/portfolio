<script setup lang="ts">
import { awards, certifications, coreStack, focusAreas, profileImage } from '@/data/portfolio'
</script>

<template>
  <section
    id="about"
    class="section"
  >
    <div class="shell rail">
      <div class="rail-side">
        <p class="label">
          About
        </p>
        <div class="profile">
          <img
            :src="profileImage"
            alt="Portrait of Samuel Jarai"
            width="88"
            height="88"
            loading="lazy"
            decoding="async"
          >
          <p>
            <strong>Samuel Jarai</strong>
            <span>AI Engineer · Econet Wireless</span>
            <span>Harare, Zimbabwe</span>
          </p>
        </div>
      </div>

      <div>
        <h2>Intelligent systems on solid foundations.</h2>
        <div class="prose">
          <p>
            I'm Samuel, an AI Engineer at Econet Wireless. I bring full-stack engineering and cloud
            infrastructure experience to building intelligent systems that work beyond the prototype.
          </p>
          <p>
            My work has covered energy trading platforms, municipal ERP systems, WhatsApp commerce bots,
            and developer tools. From database schema to deployment pipeline, I connect the pieces that
            turn an idea into a working product.
          </p>
        </div>

        <div class="detail-grid">
          <div>
            <h3 class="label">
              Focus
            </h3>
            <ol class="rows numbered">
              <li
                v-for="area in focusAreas"
                :key="area"
              >
                {{ area }}
              </li>
            </ol>
          </div>
          <div>
            <h3 class="label">
              Recognition
            </h3>
            <ul class="rows">
              <li
                v-for="award in awards"
                :key="award.title"
              >
                <span>{{ award.title }}</span><span class="meta">{{ award.year }}</span>
              </li>
              <li><span>Member, Computer Society of Zimbabwe</span><span class="meta">Active</span></li>
            </ul>
          </div>
          <div>
            <h3 class="label">
              Certifications
            </h3>
            <ul class="rows certs">
              <li
                v-for="cert in certifications"
                :key="cert.title"
              >
                <img
                  :src="cert.badge"
                  :alt="`${cert.title} badge`"
                  loading="lazy"
                  decoding="async"
                >
                <span>
                  {{ cert.title }}
                  <template v-if="cert.issued">
                    <br><time
                      class="sub"
                      :datetime="cert.issued.month"
                    >Issued {{ cert.issued.label }}</time>
                  </template>
                </span>
                <span class="meta">{{ cert.issuer }}</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="label">
              Education
            </h3>
            <ul class="rows">
              <li>
                <span>B.Tech Software Engineering<br><span class="sub">Harare Institute of Technology</span></span><span class="meta">2023</span>
              </li>
            </ul>
            <h3 class="label stack-label">
              Stack
            </h3>
            <ul class="chips">
              <li
                v-for="technology in coreStack"
                :key="technology"
              >
                {{ technology }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
