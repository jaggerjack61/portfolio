<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import PortfolioWorld from './visuals/PortfolioWorld.vue'
import { useMotion } from '@/composables/useMotion'
import {
  orderedProjects,
  categories,
  profileImage,
  focusAreas,
  coreStack,
  awards,
  certifications,
  experiences,
  contacts,
  email,
} from '@/data/portfolio'

type Scene = {
  kind: 'hero' | 'project' | 'profile' | 'credentials' | 'experience' | 'contact'
  section: string
  label: string
  item?: number
}
const scenes: Scene[] = [
  { kind: 'hero', section: 'hero', label: 'Introduction' },
  ...orderedProjects.map((project, item): Scene => ({
    kind: 'project',
    section: 'projects',
    label: project.title,
    item,
  })),
  { kind: 'profile', section: 'about', label: 'The engineer' },
  { kind: 'credentials', section: 'about', label: 'Recognition & credentials' },
  ...experiences.map((experience, item): Scene => ({
    kind: 'experience',
    section: 'experience',
    label: experience.role,
    item,
  })),
  { kind: 'contact', section: 'contact', label: 'Get in touch' },
]
const { motionEnabled } = useMotion()
const track = ref<HTMLElement>()
const viewport = ref<HTMLElement>()
const activeIndex = ref(0)
const scrollProgress = ref(0)
const worldReady = ref(false)
const height = ref(window.innerHeight)
const narrow = ref(window.innerWidth < 768)
const stride = computed(() => Math.max(450, height.value * 0.75))
const trackHeight = computed(() => `${height.value + (scenes.length - 1) * stride.value}px`)
const active = computed(() => scenes[activeIndex.value])
const project = computed(() => orderedProjects[active.value.item ?? 0])
const experience = computed(() => experiences[active.value.item ?? 0])
const worldView = computed(() => ({
  kind: active.value.kind,
  item: active.value.item,
  imageSrc: active.value.kind === 'project' ? project.value.imageSrc : undefined,
}))
let scrollFrame = 0
let lastStride = stride.value
let focusOnEnter = false
function focusScene() {
  if (!focusOnEnter) return
  viewport.value?.querySelector<HTMLElement>('section')?.focus({ preventScroll: true })
  focusOnEnter = false
}

function updateScene() {
  scrollFrame = 0
  if (!track.value) return
  const start = track.value.getBoundingClientRect().top + window.scrollY
  const position = (window.scrollY - start) / stride.value
  activeIndex.value = Math.max(0, Math.min(scenes.length - 1, Math.round(position)))
  scrollProgress.value = position - activeIndex.value
}
function onScroll() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScene)
}
function goTo(index: number) {
  if (!track.value) return
  const next = Math.max(0, Math.min(scenes.length - 1, index))
  const start = track.value.getBoundingClientRect().top + window.scrollY
  // The viewport is stationary; the scene's dissolve supplies the transition.
  window.scrollTo({ top: start + next * stride.value, behavior: 'instant' })
  activeIndex.value = next
  scrollProgress.value = 0
}
function navigate(event: Event) {
  const id = (event as CustomEvent<string>).detail
  const index = scenes.findIndex((scene) => scene.section === id)
  if (index >= 0) {
    focusOnEnter = true
    if (index === activeIndex.value) focusScene()
    goTo(index)
  }
}
function keydown(event: KeyboardEvent) {
  const target = event.target as HTMLElement
  if (target.closest('button, a, input, textarea, select, [contenteditable]')) return
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault()
    goTo(activeIndex.value + (event.key === 'ArrowRight' ? 1 : -1))
  }
}
async function resize() {
  const current = activeIndex.value
  height.value = window.innerHeight
  narrow.value = window.innerWidth < 768
  if (lastStride !== stride.value) {
    lastStride = stride.value
    await nextTick()
    goTo(current)
  }
}
function announceSection() {
  window.dispatchEvent(new CustomEvent('portfolio:sectionchange', { detail: active.value.section }))
}
watch(activeIndex, async () => {
  announceSection()
  await nextTick()
  if (viewport.value) viewport.value.scrollTop = 0
})
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', resize, { passive: true })
  window.addEventListener('portfolio:navigate', navigate)
  window.addEventListener('keydown', keydown)
  updateScene()
  announceSection()
})
onBeforeUnmount(() => {
  cancelAnimationFrame(scrollFrame)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', resize)
  window.removeEventListener('portfolio:navigate', navigate)
  window.removeEventListener('keydown', keydown)
})
</script>

<template>
  <div
    ref="track"
    class="portfolio-track"
    :style="{ height: trackHeight }"
  >
    <div
      class="portfolio-stage"
      :data-scene="activeIndex"
      :data-section="active.section"
      :data-kind="active.kind"
      :class="{ 'world-ready': worldReady }"
    >
      <div
        class="stage-ambient"
        aria-hidden="true"
      />
      <div
        class="stage-world"
        :class="{ 'world-secondary': active.kind !== 'hero' && active.kind !== 'project' }"
      >
        <PortfolioWorld
          :view="worldView"
          :motion-enabled="motionEnabled"
          :scroll-progress="scrollProgress"
          @ready="worldReady = $event"
        />
      </div>
      <div
        ref="viewport"
        class="stage-viewport"
      >
        <Transition
          name="scene"
          mode="out-in"
          @after-enter="focusScene"
        >
          <section
            :id="active.section"
            :key="activeIndex"
            tabindex="-1"
            class="stage-scene section-shell"
            :class="`scene-${active.kind}`"
            :aria-label="active.label"
          >
            <template v-if="active.kind === 'hero'">
              <div class="stage-hero-copy">
                <p class="eyebrow">
                  Samuel Jarai <span class="eyebrow-divider">/</span> AI Engineer
                </p>
                <h2 class="hero-title">
                  Building<br>useful<br><span>intelligence.</span>
                </h2>
                <p class="hero-description">
                  From an idea to an intelligent system. I build AI-powered products, tools, and the
                  infrastructure that makes them work.
                </p>
                <div class="hero-actions">
                  <button
                    class="btn-primary"
                    @click="goTo(1)"
                  >
                    Explore my work <span aria-hidden="true">↗</span>
                  </button><button
                    class="btn-ghost"
                    @click="goTo(scenes.length - 1)"
                  >
                    Let's connect <span aria-hidden="true">↗</span>
                  </button>
                </div>
                <div class="hero-role">
                  <span class="status-dot" /><span>AI Engineer at <strong>Econet Wireless</strong></span>
                </div>
              </div>
              <div class="stage-core">
                <div class="visual-topline">
                  <span class="label-mono">Intelligence, engineered.</span><span
                    class="cross-mark"
                    aria-hidden="true"
                  >+</span>
                </div>
                <div
                  class="stage-world-space"
                  aria-hidden="true"
                />
                <div class="core-caption">
                  <span class="core-caption-line" /><span>AI SYSTEMS <b>×</b> HUMAN INTENT</span><span class="core-caption-line" />
                </div>
              </div>
            </template>
            <template v-else-if="active.kind === 'project'">
              <div class="scene-copy">
                <p class="section-number">
                  01 / Selected work
                  <span class="scene-item-count">{{ String((active.item ?? 0) + 1).padStart(2, '0') }} / 09</span>
                </p>
                <span class="stage-project-category">{{ categories[project.title] }}</span>
                <h2 class="scene-title">
                  {{ project.title }}
                </h2>
                <p
                  v-if="project.title === 'Harness'"
                  class="stage-project-deck"
                >
                  A small framework. A capable AI agent.
                </p>
                <p class="body-text stage-project-description">
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
                  :href="project.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-ghost scene-action"
                >Explore project <span aria-hidden="true">↗</span></a>
              </div>
              <a
                :href="project.link"
                target="_blank"
                rel="noopener noreferrer"
                class="stage-project-image"
                :class="{ 'world-image-fallback': worldReady && !narrow }"
                :aria-hidden="worldReady && !narrow ? true : undefined"
                :tabindex="worldReady && !narrow ? -1 : undefined"
                :aria-label="`View ${project.title} repository`"
              ><div class="project-image-toolbar">
                 <span
                   class="window-dots"
                   aria-hidden="true"
                 ><i /><i /><i /></span><span>{{ project.title }}</span><span aria-hidden="true">↗</span>
               </div>
                <img
                  :src="project.imageSrc"
                  :alt="project.imageAlt"
                  decoding="async"
                ><span
                  class="stage-image-caption"
                >{{ project.tech.join(' / ') }}<span aria-hidden="true">↗</span></span></a>
            </template>
            <template v-else-if="active.kind === 'profile'">
              <div class="scene-copy">
                <span class="section-number">02 / The engineer</span>
                <h2 class="scene-title">
                  Intelligent systems.<br><span class="muted-heading">Solid foundations.</span>
                </h2>
                <div class="profile-identity stage-profile-identity">
                  <div class="portrait-frame">
                    <img
                      :src="profileImage"
                      alt="Portrait of Samuel Jarai"
                      width="112"
                      height="112"
                      decoding="async"
                    >
                  </div>
                  <div class="profile-name">
                    <h3>Samuel Jarai</h3>
                    <p>AI Engineer · Econet Wireless</p>
                    <p>Harare, Zimbabwe</p>
                  </div>
                </div>
              </div>
              <div class="stage-profile-copy">
                <p class="body-text">
                  I'm an AI Engineer at Econet Wireless. I bring full-stack engineering and cloud
                  infrastructure experience to building intelligent systems that work beyond the prototype.
                </p>
                <p class="body-text">
                  My work spans energy trading platforms, municipal ERP systems, WhatsApp commerce bots, and
                  developer tools. From database schema to deployment pipeline, I connect the pieces that turn
                  an idea into a working product.
                </p>
                <div class="focus-grid">
                  <div
                    v-for="(area, index) in focusAreas"
                    :key="area"
                  >
                    <span>0{{ index + 1 }}</span>
                    <p>{{ area }}</p>
                  </div>
                </div>
                <div class="toolkit">
                  <span class="label-mono">Tools of the trade</span>
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
            </template>
            <template v-else-if="active.kind === 'credentials'">
              <div class="scene-copy">
                <span class="section-number">02 / Recognition & credentials</span>
                <h2 class="scene-title">
                  A foundation<br><span class="muted-heading">of practice.</span>
                </h2>
                <div class="education-card">
                  <span class="label-mono">Education</span>
                  <h3>B.Tech Software Engineering</h3>
                  <p>Harare Institute of Technology, 2023</p>
                </div>
                <div class="stage-awards">
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
              </div>
              <div class="stage-credentials">
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
            </template>
            <template v-else-if="active.kind === 'experience'">
              <div class="scene-copy">
                <span class="section-number">03 / The journey
                  <span class="scene-item-count">0{{ (active.item ?? 0) + 1 }} / 04</span></span>
                <p class="stage-project-category">
                  {{ experience.period }}
                </p>
                <h2 class="scene-title">
                  {{ experience.role }}
                </h2>
                <p class="stage-employer">
                  {{ experience.company }}
                </p>
                <span
                  v-if="experience.current"
                  class="current-badge"
                >Current role</span>
              </div>
              <div class="stage-career">
                <ul class="stage-responsibilities">
                  <li
                    v-for="item in experience.description"
                    :key="item"
                  >
                    {{ item }}
                  </li>
                </ul>
                <div class="stage-career-list">
                  <button
                    v-for="(role, index) in experiences"
                    :key="role.company"
                    :class="{ selected: active.item === index }"
                    :aria-current="active.item === index ? 'step' : undefined"
                    @click="goTo(scenes.findIndex((scene) => scene.kind === 'experience') + index)"
                  >
                    <span
                      class="stage-career-dot"
                      aria-hidden="true"
                    /><span>{{ role.role }}<small>{{ role.company }}</small></span><span class="stage-career-period">{{ role.period }}</span>
                  </button>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="scene-copy">
                <span class="section-number">04 / Next connection</span>
                <h2 class="scene-title">
                  Let's build<br>something <span class="accent-text">real.</span>
                </h2>
                <p class="body-text">
                  Have an idea that needs intelligence behind it? Let's talk about AI systems, product builds,
                  and cloud infrastructure.
                </p>
                <a
                  :href="`mailto:${email}`"
                  class="btn-primary scene-action"
                >Start a conversation <span aria-hidden="true">↗</span></a>
              </div>
              <div class="stage-contact">
                <span class="label-mono">A direct line</span><a
                  v-for="contact in contacts"
                  :key="contact.label"
                  :href="contact.href"
                  :target="contact.href.startsWith('https:') ? '_blank' : undefined"
                  :rel="contact.href.startsWith('https:') ? 'noopener noreferrer' : undefined"
                  class="contact-line"
                ><div>
                   <span class="contact-label">{{ contact.label }}</span><span class="contact-value">{{ contact.value }}</span>
                 </div>
                  <span
                    class="contact-arrow"
                    aria-hidden="true"
                  >↗</span></a>
                <div class="contact-location">
                  <span class="status-dot" /><span>Harare, Zimbabwe <span class="location-divider">/</span> UTC+2</span>
                </div>
              </div>
            </template>
          </section>
        </Transition>
      </div>
      <footer class="stage-footer section-shell">
        <div class="stage-position">
          <span class="stage-current">{{ String(activeIndex + 1).padStart(2, '0') }}</span><span class="stage-total">/ {{ String(scenes.length).padStart(2, '0') }}</span><span class="stage-scene-label">{{ active.label }}</span>
        </div>
        <div class="stage-scroll-hint">
          <span>{{ activeIndex === scenes.length - 1 ? 'Thanks for exploring.' : 'Scroll to continue' }}</span><span
            v-if="activeIndex < scenes.length - 1"
            aria-hidden="true"
          >↓</span>
        </div>
        <div class="stage-controls">
          <button
            :disabled="activeIndex === 0"
            aria-label="Previous scene"
            @click="goTo(activeIndex - 1)"
          >
            ←
          </button><button
            :disabled="activeIndex === scenes.length - 1"
            aria-label="Next scene"
            @click="goTo(activeIndex + 1)"
          >
            →
          </button>
        </div>
      </footer>
      <div
        class="stage-progress"
        aria-hidden="true"
      >
        <span :style="{ width: `${((activeIndex + 1) / scenes.length) * 100}%` }" />
      </div>
      <p
        class="sr-only"
        aria-live="polite"
      >
        {{ active.label }}, scene {{ activeIndex + 1 }} of {{ scenes.length }}.
      </p>
    </div>
  </div>
</template>
