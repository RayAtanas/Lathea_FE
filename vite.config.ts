import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    base: command === 'serve' ? '/' : '/Lathea_FE/',
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  }
})