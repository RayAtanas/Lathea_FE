import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const base = command === 'serve' ? '/' : '/Lathea_FE/'
  
  return {
    plugins: [react()],
    base: base,
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: true,
      // Ensure public path is correctly set
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  }
})