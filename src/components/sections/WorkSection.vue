<script setup lang="ts">
import { categories, github, orderedProjects } from '@/data/portfolio'

const [featured, ...rest] = orderedProjects
</script>

<template>
  <section
    id="work"
    class="section"
  >
    <div class="shell">
      <div class="rail section-head">
        <p class="label">
          Work
        </p>
        <div>
          <h2>Products, tools, and systems I've shipped.</h2>
          <p class="lede">
            AI agents, developer tools, and platforms built for real-world use. Each one links to its
            source on GitHub.
          </p>
        </div>
      </div>

      <article class="project featured">
        <div class="shot shot-featured">
          <img
            :src="featured.imageSrc"
            :alt="featured.imageAlt"
            decoding="async"
          >
        </div>
        <div class="project-body">
          <p class="label">
            Featured · {{ categories[featured.title] }}
          </p>
          <h3>
            <a
              :href="featured.link"
              target="_blank"
              rel="noopener noreferrer"
            >{{ featured.title }} <span aria-hidden="true">↗</span></a>
          </h3>
          <p class="deck">
            A small framework. A capable AI agent.
          </p>
          <p class="project-desc">
            {{ featured.desc }}
          </p>
          <ul class="tech">
            <li
              v-for="technology in featured.tech"
              :key="technology"
            >
              {{ technology }}
            </li>
          </ul>
        </div>
      </article>

      <div class="project-grid">
        <article
          v-for="project in rest"
          :key="project.title"
          class="project"
        >
          <div class="shot shot-card">
            <div>
              <img
                :src="project.imageSrc"
                :alt="project.imageAlt"
                loading="lazy"
                decoding="async"
              >
            </div>
          </div>
          <div class="project-body">
            <p class="label">
              {{ categories[project.title] }}
            </p>
            <h3>
              <a
                :href="project.link"
                target="_blank"
                rel="noopener noreferrer"
              >{{ project.title }} <span aria-hidden="true">↗</span></a>
            </h3>
            <p class="project-desc">
              {{ project.desc }}
            </p>
            <ul class="tech">
              <li
                v-for="technology in project.tech"
                :key="technology"
              >
                {{ technology }}
              </li>
            </ul>
          </div>
        </article>
      </div>

      <p class="more">
        <a
          :href="github"
          target="_blank"
          rel="noopener noreferrer"
          class="text-link"
        >More on GitHub <span aria-hidden="true">↗</span></a>
      </p>
    </div>
  </section>
</template>
