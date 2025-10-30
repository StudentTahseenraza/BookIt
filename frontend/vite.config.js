// frontend/vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: mode === 'development' ? {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        },
      } : undefined,
    },
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
    },
    // Explicitly define env variables for client
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
    }
  }
})