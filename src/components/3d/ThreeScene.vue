<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Stars } from '@tresjs/cientos'
import { SRGBColorSpace, NoToneMapping } from 'three'
import Hero3D from './Hero3D.vue'

</script>

<template>
  <div class="fixed inset-0 z-0">
    <TresCanvas
      clear-color="#0f172a"
      shadows
      alpha
      window-size
      power-preference="high-performance"
      :output-color-space="SRGBColorSpace"
      :tone-mapping="NoToneMapping"
    >
      <TresPerspectiveCamera
        :position="[0, 0, 10]"
        :fov="45"
        :near="0.1"
        :far="1000"
      />
      
      <Stars
        :radius="100"
        :depth="50"
        :count="5000"
        :size="0.5"
        :fade="true"
      />
      
      <TresAmbientLight :intensity="0.5" />
      <TresDirectionalLight
        :position="[5, 5, 5]"
        :intensity="1"
        cast-shadow
      />
      
      <Hero3D />
      
      <slot />
    </TresCanvas>
  </div>
</template>