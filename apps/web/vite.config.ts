import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    wasm(),
    topLevelAwait()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'esnext'
  },
  optimizeDeps: {
    exclude: ['protochess-engine-wasm']
  },
  server: {
    fs: {
      // Allow serving files from the packages directory
      allow: ['..', '../../packages']
    },
    proxy: {
      '/ws': {
        target: 'ws://localhost:3030',
        ws: true
      }
    }
  }
})
