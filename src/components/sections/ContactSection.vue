<script setup lang="ts">
import { ref, onMounted } from 'vue'

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
  { type: 'command', text: '' }
])

const cursorVisible = ref(true)

onMounted(() => {
  setInterval(() => {
    cursorVisible.value = !cursorVisible.value
  }, 500)
})
</script>

<template>
  <section
    id="contact"
    class="py-24 relative z-10"
  >
    <div class="container mx-auto px-4 max-w-4xl">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-text-primary mb-4 tracking-tight">
          Let's Connect
        </h2>
        <p class="text-lg text-text-secondary max-w-2xl mx-auto">
          Whether you have a question, a project idea, or just want to say hi, my terminal is always open.
        </p>
      </div>
      
      <!-- Terminal Window -->
      <div class="bg-[#1E1E1E] rounded-xl overflow-hidden shadow-float border border-gray-800 font-mono transform hover:scale-[1.01] transition-transform duration-300">
        <!-- Terminal Header -->
        <div class="bg-[#2D2D2D] px-4 py-3 flex items-center gap-2 border-b border-black/50">
          <div class="flex gap-2">
            <div class="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
            <div class="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
            <div class="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
          </div>
          <div class="ml-4 text-gray-400 text-xs font-medium flex-1 text-center pr-12">
            samuel@portfolio:~/contact
          </div>
        </div>
        
        <!-- Terminal Content -->
        <div class="p-6 md:p-8 text-gray-300 space-y-2 text-sm md:text-base leading-relaxed overflow-x-auto">
          <div
            v-for="(line, index) in terminalLines"
            :key="index"
            class="flex flex-wrap font-medium"
          >
            <span
              v-if="line.type === 'command'"
              class="text-[#5AF78E] mr-3 font-bold"
            >➜  ~</span>
            
            <span
              v-if="line.type === 'comment'"
              class="text-gray-500 mr-2 italic"
            >#</span>
            
            <span v-if="line.link">
              <span class="text-[#9AEDFE] mr-2">"{{ line.text.split('"')[1] }}":</span>
              <a
                :href="line.link"
                target="_blank"
                class="text-[#F1F1F0] hover:text-primary-light hover:underline underline-offset-4 decoration-primary-light/50 transition-all cursor-pointer"
              >
                "{{ line.text.split('"')[3] }}"
              </a>
              <span class="text-gray-400">,</span>
            </span>
            
            <span
              v-else-if="line.type === 'output' && !line.link"
              :class="{'text-[#F2C055]': line.text.includes('{') || line.text.includes('}')}"
            >
              {{ line.text }}
            </span>
            
            <span
              v-else
              :class="{'text-gray-500': line.type === 'comment', 'text-white': line.type === 'command'}"
            >
              {{ line.text }}
            </span>
            
            <span
              v-if="index === terminalLines.length - 1"
              class="ml-2 w-2.5 h-5 bg-gray-400 inline-block align-middle"
              :class="{'opacity-0': !cursorVisible}"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>