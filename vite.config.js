import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

const telegramProxy = {
  '/telegram': {
    target: 'https://api.telegram.org',
    changeOrigin: true,
    secure: true,
    rewrite: (path) => path.replace(/^\/telegram/, ''),
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: telegramProxy,
  },
  preview: {
    proxy: telegramProxy,
  },
})
