import { computed, ref, watchEffect } from 'vue'

const paused = ref(false)
const reducedMotion = ref(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
const motionEnabled = computed(() => !paused.value && !reducedMotion.value)

export function useMotion() {
  return {
    paused,
    reducedMotion,
    motionEnabled,
    toggleMotion: () => {
      paused.value = !paused.value
    },
  }
}

export function setupMotion() {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)')
  const update = () => {
    reducedMotion.value = media.matches
  }
  update()
  media.addEventListener('change', update)
  const stop = watchEffect(() => {
    document.documentElement.dataset.motion = motionEnabled.value ? 'active' : 'paused'
  })
  return () => {
    media.removeEventListener('change', update)
    stop()
  }
}

export function scrollToSection(id: string) {
  if (document.querySelector('.portfolio-stage')) {
    window.dispatchEvent(new CustomEvent('portfolio:navigate', { detail: id }))
    return
  }
  document.getElementById(id)?.scrollIntoView({ behavior: motionEnabled.value ? 'smooth' : 'auto' })
}
