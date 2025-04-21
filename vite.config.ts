import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isProduction = command === 'build'
  const base = isProduction ? '/Lathea_FE/' : '/'
  
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
      sourcemap: false, // Set to true only for debugging
      emptyOutDir: true,
    },
  }
})