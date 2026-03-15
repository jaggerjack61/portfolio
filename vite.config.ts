import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs/promises'
import { viteSingleFile } from 'vite-plugin-singlefile'

function optimizeImages(): Plugin {
  return {
    name: 'optimize-images',
    apply: 'build',
    async closeBundle() {
      const sharp = (await import('sharp')).default
      const distImages = path.resolve(__dirname, 'dist/images')

      async function processDir(dir: string, maxWidth: number) {
        let files: string[]
        try {
          files = await fs.readdir(dir)
        } catch {
          return
        }

        for (const file of files) {
          const filePath = path.join(dir, file)
          const ext = path.extname(file).toLowerCase()
          if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue

          const input = await fs.readFile(filePath)
          const originalSize = input.length

          let pipeline = sharp(input).resize({ width: maxWidth, withoutEnlargement: true })

          if (ext === '.jpg' || ext === '.jpeg') {
            pipeline = pipeline.jpeg({ quality: 80 })
          } else {
            pipeline = pipeline.png({ compressionLevel: 9 })
          }

          const output = await pipeline.toBuffer()

          if (output.length < originalSize) {
            await fs.writeFile(filePath, output)
            const saved = ((1 - output.length / originalSize) * 100).toFixed(0)
            console.log(`  ${file}: ${(originalSize / 1024).toFixed(0)}KB → ${(output.length / 1024).toFixed(0)}KB (-${saved}%)`)
          } else {
            console.log(`  ${file}: ${(originalSize / 1024).toFixed(0)}KB (kept original, resize would increase size)`)
          }
        }
      }

      console.log('\n[optimize-images] Optimizing build images...')
      console.log('Project screenshots (max 800px wide):')
      await processDir(path.join(distImages, 'projects'), 800)
      console.log('Badge images (max 128px wide):')
      await processDir(path.join(distImages, 'badges'), 128)
      console.log('[optimize-images] Done!\n')
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  build: {
    sourcemap: 'hidden',
    assetsInlineLimit: 100000000,
  },
  plugins: [
    vue(),
    viteSingleFile(),
    optimizeImages(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
