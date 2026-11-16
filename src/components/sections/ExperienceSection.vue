<script setup lang="ts">
import { experiences } from '@/data/portfolio'
</script>

<template>
  <section
    id="experience"
    class="section"
  >
    <div class="shell rail">
      <p class="label">
        Experience
      </p>
      <div>
        <h2>Experience that compounds.</h2>
        <p class="lede">
          From commerce and public infrastructure to intelligent systems. Each chapter builds on the
          last.
        </p>
        <ol class="timeline">
          <li
            v-for="experience in experiences"
            :key="experience.company"
          >
            <p class="period">
              {{ experience.period }}
            </p>
            <div>
              <h3>
                {{ experience.role }}
                <span
                  v-if="experience.current"
                  class="status current"
                ><i aria-hidden="true" />Current</span>
              </h3>
              <p class="company">
                {{ experience.company }}
              </p>
              <ul>
                <li
                  v-for="item in experience.description"
                  :key="item"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
