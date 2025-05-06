import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://localhost:7255', // or http://localhost:5224 if using HTTP
        changeOrigin: true,
        secure: false, // set to true if using HTTPS
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})