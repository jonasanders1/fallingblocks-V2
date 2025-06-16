import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve('./src')
    }
  },
  server: {
    port: 5173,
    strictPort: true,
    cors: true
  }
})
