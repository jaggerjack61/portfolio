import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteSingleFile } from 'vite-plugin-singlefile' // 1. Import the plugin

// https://vite.dev/config/
export default defineConfig({
  // 2. Add this to handle relative paths inside the single file
  base: './', 
  build: {
    sourcemap: 'hidden',
    // 3. Optional: increasing the limit ensures even large assets (images) get inlined
    assetsInlineLimit: 100000000, 
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('Tres') && tag !== 'TresCanvas',
        },
      },
    }),
    viteSingleFile(), // 4. Add the plugin to the array
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})