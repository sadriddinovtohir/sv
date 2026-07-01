import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { handleContactSubmission } from './api/_lib/sendTelegram.js'

// Serves /api/send-message during `vite dev`, since Vite doesn't run
// Vercel serverless functions itself — this mirrors api/send-message.js
// so the contact form works both locally and once deployed.
function telegramDevApi() {
  return {
    name: 'telegram-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/send-message', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end()
          return
        }
        let raw = ''
        req.on('data', (chunk) => { raw += chunk })
        req.on('end', async () => {
          let payload = {}
          try { payload = JSON.parse(raw || '{}') } catch { /* ignore malformed body */ }
          const { statusCode, body } = await handleContactSubmission(payload)
          res.statusCode = statusCode
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(body))
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  if (env.TELEGRAM_BOT_TOKEN) process.env.TELEGRAM_BOT_TOKEN = env.TELEGRAM_BOT_TOKEN
  if (env.TELEGRAM_CHAT_ID) process.env.TELEGRAM_CHAT_ID = env.TELEGRAM_CHAT_ID

  return {
    plugins: [react(), telegramDevApi()],
  }
})
