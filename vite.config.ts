import { resolve } from 'path'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
        cookies: resolve(__dirname, 'cookies.html'),
        privacy: resolve(__dirname, 'privacy.html'),
      },
    },
  },
  plugins: [svelte()],
})
