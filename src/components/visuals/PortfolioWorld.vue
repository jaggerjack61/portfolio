<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { NeuralScene, WorldView } from './neuralScene'
const props = defineProps<{ motionEnabled: boolean; view: WorldView; scrollProgress: number }>()
const emit = defineEmits<{ ready: [value: boolean] }>()
const host = ref<HTMLDivElement>()
const ready = ref(false)
let scene: NeuralScene | undefined
let disposed = false
let frame = 0
function updateReady(value: boolean) {
  if (disposed) return
  ready.value = value
  emit('ready', value)
}
onMounted(() => {
  frame = requestAnimationFrame(async () => {
    try {
      const { createNeuralScene } = await import('./neuralScene')
      if (disposed || !host.value) return
      scene = createNeuralScene(host.value, () => updateReady(false), updateReady)
      scene.setMotion(props.motionEnabled)
      scene.setView(props.view)
      scene.setScroll(props.scrollProgress)
    } catch {
      updateReady(false)
    }
  })
})
watch(
  () => props.motionEnabled,
  (value) => scene?.setMotion(value),
)
watch(
  () => props.view,
  (value) => scene?.setView(value),
)
watch(
  () => props.scrollProgress,
  (value) => scene?.setScroll(value),
)
onBeforeUnmount(() => {
  disposed = true
  cancelAnimationFrame(frame)
  scene?.dispose()
})
</script>

<template>
  <div
    ref="host"
    class="portfolio-world neural-core"
    :class="{ 'is-ready': ready }"
    aria-hidden="true"
  >
    <div
      v-if="view.kind === 'hero'"
      class="core-fallback"
    >
      <div class="fallback-orbit orbit-one" />
      <div class="fallback-orbit orbit-two" />
      <div class="fallback-orbit orbit-three" />
      <div class="fallback-sphere" />
    </div>
  </div>
</template>
