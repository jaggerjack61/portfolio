<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import PortfolioWorld from './visuals/PortfolioWorld.vue'
import { createDestinations, type DestinationRequest, type WorldUpdate, type TravelPhase } from './visuals/destinations'
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
const menuOpen = ref(false)
const world = ref<InstanceType<typeof PortfolioWorld>>()
const sectionLabels = ['Introduction', 'Projects', 'About', 'Experience', 'Contact']
function setMenu(open: boolean) {
  clearTimeout(revealTimer)
  menuOpen.value = open
  focusOnEnter = false
  contentVisible.value = false
  document.documentElement.classList.toggle('globe-menu-open', open)
  window.dispatchEvent(new CustomEvent('portfolio:menuchange', { detail: open }))
  if (open) void nextTick(() => document.querySelector<HTMLElement>('.globe-menu-close')?.focus())
  if (!open && !worldReady.value) void arrive(destination.value)
}
function closeMenu() {
  setMenu(false)
  void nextTick(() => document.querySelector<HTMLElement>('.globe-menu-toggle')?.focus())
}
function menuEvent(event: Event) { setMenu((event as CustomEvent<boolean>).detail) }
function selectSection(index: number) {
  setMenu(false)
  goTo(sectionCards.value[index])
}
function menuTargetStyle(index: number) {
  const point = projection.value?.panels[destinations[index].id]
  return { left: `${point?.x ?? 0}px`, top: `${point?.y ?? 0}px` }
}
const track = ref<HTMLElement>()
const footer = ref<HTMLElement>()
const footerHeight = ref(window.innerWidth < 768 ? 70 : 80)
let footerObserver: ResizeObserver | undefined
const viewports = ref<HTMLElement[]>([])
const viewport = computed(() => viewports.value[displayedGroup.value])
const activeIndex = ref(0)
const displayedIndex = ref(0)
const revision = ref(0)
const contentVisible = ref(true)
const phase = ref<TravelPhase>('focused')
const projection = ref<WorldUpdate>()
const announcement = ref('')
const sectionIds = [...new Set(scenes.map((scene) => scene.section))]
const destinations = createDestinations(sectionIds)
const sectionCards = ref(sectionIds.map((id) => scenes.findIndex((scene) => scene.section === id)))
const activeGroup = computed(() => sectionIds.indexOf(scenes[activeIndex.value].section))
const displayedGroup = computed(() => sectionIds.indexOf(scenes[displayedIndex.value].section))
const destination = computed(() => ({ id: scenes[activeIndex.value].section, revision: revision.value }))
const worldReady = ref(false)
const height = ref(window.innerHeight)
const stride = computed(() => Math.max(450, height.value * 0.75))
const trackHeight = computed(() => `${height.value + (scenes.length - 1) * stride.value}px`)
const active = computed(() => scenes[displayedIndex.value])
const panels = computed(() => sectionCards.value.map((index) => {
  const scene = scenes[index]
  return { scene, project: orderedProjects[scene.item ?? 0], experience: experiences[scene.item ?? 0] }
}))
function setViewport(el: unknown, index: number) {
  viewports.value[index] = el as HTMLElement
}
function panelStyle(index: number) {
  const update = projection.value
  const panel = update?.panels[destinations[index].id]
  if (!worldReady.value || !update || !panel) return {
    opacity: index === displayedGroup.value ? 1 : 0,
    transform: 'none', zIndex: index === displayedGroup.value ? 10 : 1,
  }
  return {
    opacity: panel.visible ? 1 : 0,
    transform: `translate3d(${panel.x - update.anchor.x}px, ${panel.y - update.anchor.y + 28 * (panel.scale - 1)}px, 0) scale(${panel.scale})`,
    zIndex: index === activeGroup.value ? 10000 : Math.round(1000 / panel.depth),
  }
}
let scrollFrame = 0
let lastStride = stride.value
let focusOnEnter = false
let revealTimer: ReturnType<typeof setTimeout> | undefined
function focusScene() {
  if (!focusOnEnter) return
  viewport.value?.querySelector<HTMLElement>('section')?.focus({ preventScroll: true })
  focusOnEnter = false
}

function requestScene(index: number, focus = false) {
  focusOnEnter = focus
  if (index === activeIndex.value) {
    if (contentVisible.value) focusScene()
    return
  }
  clearTimeout(revealTimer)
  const sameSection = scenes[index].section === scenes[activeIndex.value].section
  const stayingFocused = sameSection && phase.value === 'focused'
  activeIndex.value = index
  sectionCards.value[activeGroup.value] = index
  revision.value++
  // Cards within a section change in place; the globe only travels between sections.
  contentVisible.value = stayingFocused
  if (stayingFocused) displayedIndex.value = index
  else if (!sameSection) phase.value = 'retreat'
}
function worldUpdate(update: WorldUpdate) {
  if (update.id !== destination.value.id || update.revision !== revision.value) return
  projection.value = update
  phase.value = update.phase
}
async function arrive(arrival: DestinationRequest) {
  if (menuOpen.value) return
  if (arrival.id !== destination.value.id || arrival.revision !== revision.value) return
  clearTimeout(revealTimer)
  displayedIndex.value = activeIndex.value
  phase.value = 'focused'
  contentVisible.value = true
  await nextTick()
  if (arrival.revision !== revision.value) return
  if (viewport.value) viewport.value.scrollTop = 0
  const complete = () => {
    if (arrival.revision !== revision.value || !contentVisible.value) return
    announcement.value = `${active.value.label}, scene ${displayedIndex.value + 1} of ${scenes.length}.`
    announceSection()
    focusScene()
  }
  if (motionEnabled.value && worldReady.value) revealTimer = setTimeout(complete, 180)
  else complete()
}

function updateScene() {
  scrollFrame = 0
  if (!track.value || menuOpen.value) return
  const start = track.value.getBoundingClientRect().top + window.scrollY
  const position = (window.scrollY - start) / stride.value
  const index = Math.max(0, Math.min(scenes.length - 1, Math.round(position)))
  if (index !== activeIndex.value) requestScene(index)
}
function onScroll() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScene)
}
function goTo(index: number, focus = true) {
  if (menuOpen.value) setMenu(false)
  if (!track.value) return
  const next = Math.max(0, Math.min(scenes.length - 1, index))
  const start = track.value.getBoundingClientRect().top + window.scrollY
  requestScene(next, focus)
  window.scrollTo({ top: start + next * stride.value, behavior: 'instant' })
}
function navigate(event: Event) {
  const id = (event as CustomEvent<string>).detail
  const index = scenes.findIndex((scene) => scene.section === id)
  if (index >= 0) {
    goTo(index)
  }
}
function keydown(event: KeyboardEvent) {
  if (menuOpen.value) {
    if (event.key === 'Escape') {
      event.preventDefault()
      closeMenu()
    } else if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
      event.preventDefault()
      world.value?.rotate(event.key === 'ArrowLeft' ? -35 : event.key === 'ArrowRight' ? 35 : 0,
        event.key === 'ArrowUp' ? -35 : event.key === 'ArrowDown' ? 35 : 0)
    }
    return
  }
  const target = event.target as HTMLElement
  if (target.closest('button, a, input, textarea, select, [contenteditable]')) return
  if (['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(event.key)) {
    event.preventDefault()
    goTo(activeIndex.value + (event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1))
  }
}
async function resize() {
  const current = activeIndex.value
  height.value = window.innerHeight
  if (lastStride !== stride.value) {
    lastStride = stride.value
    await nextTick()
    if (!menuOpen.value) goTo(current, false)
    else if (track.value) {
      const start = track.value.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: start + current * stride.value, behavior: 'instant' })
    }
  }
}
function announceSection() {
  window.dispatchEvent(new CustomEvent('portfolio:sectionchange', { detail: active.value.section }))
}
watch(motionEnabled, (enabled) => {
  if (!enabled && contentVisible.value) {
    clearTimeout(revealTimer)
    void arrive(destination.value)
  }
})
onMounted(() => {
  footerObserver = new ResizeObserver(() => {
    if (footer.value?.offsetHeight) footerHeight.value = footer.value.offsetHeight
  })
  if (footer.value) footerObserver.observe(footer.value)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', resize, { passive: true })
  window.addEventListener('portfolio:navigate', navigate)
  window.addEventListener('portfolio:menu', menuEvent)
  window.addEventListener('keydown', keydown)
  updateScene()
  announceSection()
})
onBeforeUnmount(() => {
  footerObserver?.disconnect()
  document.documentElement.classList.remove('globe-menu-open')
  window.removeEventListener('portfolio:menu', menuEvent)
  clearTimeout(revealTimer)
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
    :style="{ height: trackHeight, '--stage-footer-height': `${footerHeight}px` }"
  >
    <div
      class="portfolio-stage"
      :data-scene="displayedIndex"
      :data-requested-scene="activeIndex"
      :data-phase="phase"
      :data-section="active.section"
      :data-kind="active.kind"
      :class="{ 'world-ready': worldReady, 'is-menu-open': menuOpen }"
    >
      <div
        class="stage-ambient"
        aria-hidden="true"
      />
      <div
        class="stage-world"
      >
        <PortfolioWorld
          ref="world"
          :overview="menuOpen"
          :destinations="destinations"
          :destination="destination"
          :motion-enabled="motionEnabled"
          @ready="worldReady = $event"
          @update="worldUpdate"
          @arrival="arrive"
        />
      </div>
      <div
        v-if="menuOpen"
        id="globe-menu"
        class="globe-menu"
        role="region"
        aria-label="Globe section menu"
      >
        <button
          class="globe-menu-close"
          aria-label="Close menu"
          @click="closeMenu"
        >
          <span aria-hidden="true">×</span>
        </button>
        <div
          v-if="!worldReady"
          class="globe-fallback-menu"
          aria-label="Choose a section"
        >
          <button
            v-for="(label, index) in sectionLabels"
            :key="label"
            @click="selectSection(index)"
          >
            {{ label }}
          </button>
        </div>
        <div class="globe-menu-heading">
          <p class="eyebrow">
            Five places to explore
          </p>
          <h2>Choose your next stop.</h2>
          <p>{{ worldReady ? 'One turn per minute · Drag to spin · Select a section' : 'Choose a section below to explore.' }}</p>
        </div>
        <template
          v-for="(section, index) in destinations"
          :key="section.id"
        >
          <button
            v-if="worldReady && projection?.panels[section.id]?.visible"
            class="globe-destination-button"
            :style="menuTargetStyle(index)"
            :aria-label="`Open ${sectionLabels[index]}`"
            @click="selectSection(index)"
          >
            <span>{{ sectionLabels[index] }}</span><i aria-hidden="true" />
          </button>
        </template>
      </div>
      <div
        v-for="({ scene: panelScene, project, experience }, panelIndex) in panels"
        :key="destinations[panelIndex].id"
        class="destination-panel"
        :class="{ 'is-focused': contentVisible && panelIndex === displayedGroup }"
        :style="panelStyle(panelIndex)"
        :data-destination="destinations[panelIndex].id"
        :inert="!(contentVisible && panelIndex === displayedGroup) || undefined"
        :aria-hidden="!(contentVisible && panelIndex === displayedGroup) || undefined"
      >
        <div
          class="destination-anchor is-visible"
          aria-hidden="true"
        >
          <span />
        </div>
        <div
          :ref="(el) => setViewport(el, panelIndex)"
          class="stage-viewport"
        >
          <section
            :id="panelIndex === displayedGroup ? panelScene.section : undefined"
            tabindex="-1"
            class="stage-scene section-shell"
            :class="`scene-${panelScene.kind}`"
            :aria-label="panelScene.label"
          >
            <template v-if="panelScene.kind === 'hero'">
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
              <aside
                class="intro-profile"
                aria-label="Meet Samuel"
              >
                <div class="intro-identity">
                  <img
                    :src="profileImage"
                    alt="Samuel Jarai"
                    width="112"
                    height="112"
                  >
                  <div>
                    <p class="label-mono">
                      The person behind the systems
                    </p><h3>Samuel Jarai</h3><p>AI Engineer · Harare, Zimbabwe</p>
                  </div>
                </div>
                <div class="intro-statement">
                  From the first idea<br>to <span>something people use.</span>
                </div>
                <p class="body-text">
                  AI products, developer tools, and the cloud infrastructure that connects them. Built with a full-stack engineering mindset.
                </p>
                <div class="intro-facts">
                  <div><strong>{{ orderedProjects.length.toString().padStart(2, '0') }}</strong><span>Selected projects</span></div>
                  <div><strong>AI + Cloud</strong><span>From prototype to production</span></div>
                </div>
                <button
                  class="btn-ghost"
                  @click="goTo(scenes.findIndex((scene) => scene.section === 'about'))"
                >
                  Meet the engineer <span aria-hidden="true">↗</span>
                </button>
              </aside>
            </template>
            <template v-else-if="panelScene.kind === 'project'">
              <div class="scene-copy">
                <p class="section-number">
                  01 / Selected work
                  <span class="scene-item-count">{{ String((panelScene.item ?? 0) + 1).padStart(2, '0') }} / 09</span>
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
            <template v-else-if="panelScene.kind === 'profile'">
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
            <template v-else-if="panelScene.kind === 'credentials'">
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
            <template v-else-if="panelScene.kind === 'experience'">
              <div class="scene-copy">
                <span class="section-number">03 / The journey
                  <span class="scene-item-count">0{{ (panelScene.item ?? 0) + 1 }} / 04</span></span>
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
                    :class="{ selected: panelScene.item === index }"
                    :aria-current="panelScene.item === index ? 'step' : undefined"
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
        </div>
      </div>
      <footer
        v-show="!menuOpen"
        ref="footer"
        class="stage-footer section-shell"
      >
        <div class="stage-position">
          <span class="stage-current">{{ String(activeIndex + 1).padStart(2, '0') }}</span><span class="stage-total">/ {{ String(scenes.length).padStart(2, '0') }}</span><span class="stage-scene-label">{{ scenes[activeIndex].label }}</span>
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
        v-show="!menuOpen"
        class="stage-progress"
        aria-hidden="true"
      >
        <span :style="{ width: `${((activeIndex + 1) / scenes.length) * 100}%` }" />
      </div>
      <p
        class="sr-only"
        aria-live="polite"
      >
        {{ announcement }}
      </p>
    </div>
  </div>
</template>
