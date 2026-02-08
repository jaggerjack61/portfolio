<script setup lang="ts">
import { useRenderLoop } from '@tresjs/core'
import { shallowRef, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const groupRef = shallowRef()
const laptopRef = shallowRef()

const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {
  if (laptopRef.value) {
    // Floating animation
    laptopRef.value.position.y = Math.sin(elapsed) * 0.2
    // Gentle rotation
    laptopRef.value.rotation.y = Math.sin(elapsed * 0.5) * 0.1
    laptopRef.value.rotation.z = Math.sin(elapsed * 0.3) * 0.05
  }
})

let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    if (groupRef.value) {
      gsap.to(groupRef.value.position, {
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        },
        x: 5,
        y: -2,
        z: -10
      })
      
      gsap.to(groupRef.value.rotation, {
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        },
        y: Math.PI * 0.5
      })
    }
  })
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <TresGroup
    ref="groupRef"
    :position="[2, 0, 0]"
  >
    <TresGroup ref="laptopRef">
      <!-- Laptop Base -->
      <TresMesh :position="[0, -0.1, 0]">
        <TresBoxGeometry :args="[3, 0.2, 2]" />
        <TresMeshStandardMaterial
          color="#334155"
          :roughness="0.3"
          :metalness="0.8"
        />
      </TresMesh>
      
      <!-- Laptop Screen Group (for hinge rotation) -->
      <TresGroup
        :position="[0, 0, -1]"
        :rotation-x="-0.2"
      >
        <!-- Screen Back -->
        <TresMesh :position="[0, 1, 0]">
          <TresBoxGeometry :args="[3, 2, 0.1]" />
          <TresMeshStandardMaterial
            color="#334155"
            :roughness="0.3"
            :metalness="0.8"
          />
        </TresMesh>
        
        <!-- Screen Display -->
        <TresMesh :position="[0, 1, 0.06]">
          <TresPlaneGeometry :args="[2.8, 1.8]" />
          <TresMeshStandardMaterial 
            color="#000000" 
            emissive="#1e3a8a" 
            :emissive-intensity="2" 
            :roughness="0.2" 
          />
        </TresMesh>
        
        <!-- Code lines on screen -->
        <TresMesh :position="[-0.5, 1.2, 0.07]">
          <TresPlaneGeometry :args="[1.5, 0.1]" />
          <TresMeshBasicMaterial color="#10b981" />
        </TresMesh>
        <TresMesh :position="[-0.5, 1.0, 0.07]">
          <TresPlaneGeometry :args="[1.0, 0.1]" />
          <TresMeshBasicMaterial color="#3b82f6" />
        </TresMesh>
        <TresMesh :position="[-0.5, 0.8, 0.07]">
          <TresPlaneGeometry :args="[1.2, 0.1]" />
          <TresMeshBasicMaterial color="#f59e0b" />
        </TresMesh>
      </TresGroup>
    </TresGroup>
  </TresGroup>
</template>