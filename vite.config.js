import { fileURLToPath, URL } from 'node:url'
import { Readable } from 'node:stream'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import { handleChatRequest } from './server/chat.post.ts'

const telegramProxy = {
  '/telegram': {
    target: 'https://api.telegram.org',
    changeOrigin: true,
    secure: true,
    rewrite: (path) => path.replace(/^\/telegram/, ''),
  },
}

function chatApiPlugin(apiKey) {
  const middleware = (req, res, next) => {
    if (req.url?.split('?')[0] !== '/api/chat') {
      next()
      return
    }

    if (req.method !== 'POST') {
      res.statusCode = 405
      res.setHeader('Allow', 'POST')
      res.end('Method Not Allowed')
      return
    }

    const chunks = []
    req.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
    req.on('end', async () => {
      let body
      try {
        body = JSON.parse(Buffer.concat(chunks).toString('utf8'))
      } catch {
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: 'Request body must be valid JSON.' }))
        return
      }

      try {
        const response = await handleChatRequest(body?.messages, apiKey)
        res.statusCode = response.status
        response.headers.forEach((value, name) => res.setHeader(name, value))
        if (response.body) Readable.fromWeb(response.body).pipe(res)
        else res.end()
      } catch (error) {
        next(error)
      }
    })
  }

  return {
    name: 'portfolio-chat-api',
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue(), vueDevTools(), tailwindcss(), chatApiPlugin(env.GOOGLE_GENERATIVE_AI_API_KEY)],
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
  }
})
