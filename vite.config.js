import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: {
      host: 'localhost',
      port: 5173,
    },
  },
  build: {
    outDir: 'public/build',
    emptyOutDir: true,
    manifest: true,
  },
  resolve: {
    alias: {
      '@': '/resources/js',
    },
  },
})
