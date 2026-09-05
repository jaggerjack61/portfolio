<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { NeuralScene } from './neuralScene'

const props = defineProps<{ motionEnabled: boolean }>()
const host = ref<HTMLDivElement>()
const ready = ref(false)
let scene: NeuralScene | undefined
let disposed = false
let frame = 0

onMounted(() => {
  frame = requestAnimationFrame(async () => {
    try {
      const { createNeuralScene } = await import('./neuralScene')
      if (disposed || !host.value) return
      scene = createNeuralScene(host.value, () => {
        ready.value = false
      })
      scene.setMotion(props.motionEnabled)
      ready.value = true
    } catch {
      ready.value = false
    }
  })
})
watch(
  () => props.motionEnabled,
  (value) => scene?.setMotion(value),
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
    class="neural-core"
    :class="{ 'is-ready': ready }"
    aria-hidden="true"
  >
    <div class="core-fallback">
      <div class="fallback-orbit orbit-one" />
      <div class="fallback-orbit orbit-two" />
      <div class="fallback-orbit orbit-three" />
      <div class="fallback-sphere" />
    </div>
  </div>
</template>
