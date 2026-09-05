<script setup lang="ts">
import { orderedProjects, categories } from '@/data/portfolio'
</script>

<template>
  <section
    id="projects"
    tabindex="-1"
    class="content-section projects-section"
  >
    <div class="section-shell">
      <div class="section-heading reveal">
        <div>
          <span class="section-number">01 / Selected work</span>
          <h2 class="display-heading">
            Ideas, made <span class="muted-heading">operational.</span>
          </h2>
        </div>
        <p class="section-intro">
          AI agents, developer tools, and systems built for real-world use. A selection of things I've
          shipped.
        </p>
      </div>
      <div class="projects-grid">
        <article
          v-for="(project, index) in orderedProjects"
          :key="project.title"
          class="project-card reveal"
          :class="{ 'featured-project': index === 0 }"
        >
          <a
            :href="project.link"
            target="_blank"
            rel="noopener noreferrer"
            class="project-image-link"
            :aria-label="`View ${project.title} repository`"
          >
            <div class="project-image-toolbar">
              <span
                class="window-dots"
                aria-hidden="true"
              ><i /><i /><i /></span><span>{{ project.title === 'Harness' ? 'harness / agent.py' : project.title }}</span><span aria-hidden="true">↗</span>
            </div>
            <div class="project-image-frame">
              <img
                :src="project.imageSrc"
                :alt="project.imageAlt"
                loading="lazy"
                decoding="async"
                class="project-img"
                :class="{ 'image-top': project.title === 'Track My Gains' }"
              >
            </div>
          </a>
          <div class="project-content">
            <div class="project-category">
              <span>{{ index === 0 ? 'Featured project' : categories[project.title] }}</span><span>{{ String(index + 1).padStart(2, '0') }} / 09</span>
            </div>
            <h3>
              <a
                :href="project.link"
                target="_blank"
                rel="noopener noreferrer"
              >{{ project.title }}<span aria-hidden="true">↗</span></a>
            </h3>
            <p
              v-if="index === 0"
              class="featured-deck"
            >
              A small framework.<br>A capable AI agent.
            </p>
            <p class="project-description">
              {{ project.desc }}
            </p>
            <div class="project-tags">
              <span
                v-for="technology in project.tech"
                :key="technology"
                class="skill-tag"
              >{{
                technology
              }}</span>
            </div>
            <a
              v-if="index === 0"
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
              class="text-link"
            >Explore Harness <span aria-hidden="true">↗</span></a>
          </div>
        </article>
      </div>
      <div class="projects-footer reveal">
        <span>Built with curiosity. Shipped with intent.</span><a
          href="https://github.com/jaggerjack61"
          target="_blank"
          rel="noopener noreferrer"
          class="text-link"
        >More on GitHub <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </section>
</template>
