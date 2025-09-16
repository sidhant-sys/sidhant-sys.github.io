import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync } from 'fs'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-videos',
      writeBundle() {
        // Copy video files to dist folder
        const videos = ['Dubai_video.mp4', 'Paris_video.mp4']
        videos.forEach(video => {
          const src = resolve(__dirname, 'public', video)
          const dest = resolve(__dirname, 'dist', video)
          if (existsSync(src)) {
            copyFileSync(src, dest)
            console.log(`Copied ${video} to dist folder`)
          }
        })
        
        // Copy webmanifest file to dist folder
        const webmanifestSrc = resolve(__dirname, 'src/assets/site.webmanifest')
        const webmanifestDest = resolve(__dirname, 'dist/site.webmanifest')
        if (existsSync(webmanifestSrc)) {
          copyFileSync(webmanifestSrc, webmanifestDest)
          console.log('Copied site.webmanifest to dist folder')
        }
      }
    }
  ],
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['@elevenlabs/convai-sdk']
    }
  },
  server: {
    historyApiFallback: true
  }
})
