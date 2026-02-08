<script setup lang="ts">
import { ref } from 'vue'

interface TerminalLine {
  type: string
  text: string
  highlight?: boolean
  link?: string
}

const terminalLines = ref<TerminalLine[]>([
  { type: 'comment', text: '# Contact Information' },
  { type: 'command', text: 'cat contact_details.json' },
  { type: 'output', text: '{' },
  { type: 'output', text: '  "email": "jarai.samuel@gmail.com",', highlight: true, link: 'mailto:jarai.samuel@gmail.com' },
  { type: 'output', text: '  "phone": "+263 77 536 1584",', highlight: true, link: 'tel:+263775361584' },
  { type: 'output', text: '  "github": "github.com/jaggerjack61",', highlight: true, link: 'https://github.com/jaggerjack61' },
  { type: 'output', text: '  "linkedin": "linkedin.com/in/samuel-jarai",', highlight: true, link: 'https://linkedin.com/in/samuel-jarai' },
  { type: 'output', text: '  "location": "Harare, Zimbabwe"' },
  { type: 'output', text: '}' },
  { type: 'command', text: '' } // Cursor line
])

// Simple cursor blink effect
const cursorVisible = ref(true)
setInterval(() => {
  cursorVisible.value = !cursorVisible.value
}, 500)
</script>

<template>
  <section
    id="contact"
    class="min-h-screen py-20 relative z-10 flex items-center justify-center"
  >
    <div class="container mx-auto px-4 pointer-events-auto max-w-3xl">
      <h2 class="text-4xl font-bold text-white mb-12 text-center">
        Get In Touch
      </h2>
      
      <div class="bg-black/80 backdrop-blur-md rounded-lg overflow-hidden border border-gray-700 shadow-2xl font-mono text-sm md:text-base">
        <!-- Terminal Header -->
        <div class="bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-gray-700">
          <div class="w-3 h-3 rounded-full bg-red-500" />
          <div class="w-3 h-3 rounded-full bg-yellow-500" />
          <div class="w-3 h-3 rounded-full bg-green-500" />
          <div class="ml-4 text-gray-400 text-xs">
            samuel@portfolio:~/contact
          </div>
        </div>
        
        <!-- Terminal Content -->
        <div class="p-6 text-gray-300 space-y-2">
          <div
            v-for="(line, index) in terminalLines"
            :key="index"
            class="flex flex-wrap"
          >
            <span
              v-if="line.type === 'command'"
              class="text-green-400 mr-2"
            >$</span>
            <span
              v-if="line.type === 'comment'"
              class="text-gray-500 mr-2"
            >#</span>
            
            <span v-if="line.link">
              <span class="text-purple-400 mr-2">"{{ line.text.split('"')[1] }}":</span>
              <a
                :href="line.link"
                target="_blank"
                class="text-blue-400 hover:underline cursor-pointer"
              >
                "{{ line.text.split('"')[3] }}"
              </a>
              <span class="text-gray-300">,</span>
            </span>
            
            <span
              v-else-if="line.type === 'output' && !line.link"
              :class="{'text-yellow-300': line.text.includes('{') || line.text.includes('}')}"
            >
              {{ line.text }}
            </span>
            
            <span
              v-else
              :class="{'text-gray-500': line.type === 'comment'}"
            >
              {{ line.text }}
            </span>
            
            <span
              v-if="index === terminalLines.length - 1"
              class="ml-1 w-2 h-5 bg-gray-400 inline-block align-middle"
              :class="{'opacity-0': !cursorVisible}"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>