<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { NeuralScene } from './neuralScene'
import type { Destination, DestinationRequest, WorldUpdate } from './destinations'
const props = defineProps<{
  motionEnabled: boolean
  overview: boolean
  destinations: Destination[]
  destination: DestinationRequest
}>()
const emit = defineEmits<{
  ready: [value: boolean]
  update: [value: WorldUpdate]
  arrival: [value: DestinationRequest]
}>()
const host = ref<HTMLDivElement>()
const ready = ref(false)
let scene: NeuralScene | undefined
let disposed = false
let failed = false
const fallbackDots = computed(() => {
  const selected = props.destinations.find((item) => item.id === props.destination.id)
  if (!selected) return []
  // Rotate the same surface descriptors toward the viewer without requiring WebGL.
  const [a, b, c] = selected.position
  return props.destinations.map((item) => {
    const [x, y, z] = item.position
    const dot = a * x + b * y + c * z
    const correction = (a * x + b * y) / (1 + c)
    return { id: item.id, x: x - a * (z + correction), y: y - b * (z + correction), front: dot >= 0 }
  })
})
let frame = 0
function fallback() {
  if (disposed) return
  failed = true
  ready.value = false
  emit('ready', false)
  emit('arrival', props.destination)
}
onMounted(() => {
  frame = requestAnimationFrame(async () => {
    try {
      const { createNeuralScene } = await import('./neuralScene')
      if (disposed || !host.value) return
      scene = createNeuralScene(host.value, fallback, props.destinations,
        (value) => emit('update', value), (value) => emit('arrival', value))
      if (failed) return
      ready.value = true
      emit('ready', true)
      scene.setMotion(props.motionEnabled)
      scene.setDestination(props.destination)
      scene.setOverview(props.overview)
    } catch {
      fallback()
    }
  })
})
watch(() => props.overview, (open) => scene?.setOverview(open))
watch(() => props.motionEnabled, (value) => scene?.setMotion(value))
watch(() => props.destination, (value) => {
  if (ready.value) scene?.setDestination(value)
  else emit('arrival', value)
})
let pointer: { id: number; x: number; y: number } | undefined
function pointerDown(event: PointerEvent) {
  if (!props.overview || !ready.value || event.button !== 0) return
  host.value?.setPointerCapture(event.pointerId)
  pointer = { id: event.pointerId, x: event.clientX, y: event.clientY }
}
function pointerMove(event: PointerEvent) {
  if (!pointer || pointer.id !== event.pointerId || !props.overview) return
  scene?.rotate(event.clientX - pointer.x, event.clientY - pointer.y)
  pointer.x = event.clientX
  pointer.y = event.clientY
}
function pointerEnd() { pointer = undefined }
defineExpose({ rotate: (dx: number, dy: number) => scene?.rotate(dx, dy) })
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
    :class="{ 'is-ready': ready, 'is-interactive': overview }"
    aria-hidden="true"
    @pointerdown="pointerDown"
    @pointermove="pointerMove"
    @pointerup="pointerEnd"
    @pointercancel="pointerEnd"
    @lostpointercapture="pointerEnd"
  >
    <div class="core-fallback">
      <div class="fallback-orbit orbit-one" />
      <div class="fallback-orbit orbit-two" />
      <div class="fallback-orbit orbit-three" />
      <div class="fallback-sphere" />
      <i
        v-for="dot in fallbackDots"
        :key="dot.id"
        class="fallback-destination"
        :class="{ selected: dot.id === destination.id }"
        :style="{ left: `${50 + 25 * dot.x}%`, top: `${50 - 25 * dot.y}%`, opacity: dot.front ? 1 : 0.2 }"
      />
    </div>
  </div>
</template>
