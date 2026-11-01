import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
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

const SITEMAP_ROUTES = ['/', '/about', '/projects', '/skills', '/contact', '/offer']

// Fills the __SITE_URL__ placeholders in index.html (canonical, og:url) and
// emits robots.txt + sitemap.xml. Without VITE_SITE_URL those tags are dropped
// rather than shipped with a bogus URL, and the sitemap is skipped.
function seoPlugin(siteUrl) {
  const base = (siteUrl || '').replace(/\/+$/, '')
  return {
    name: 'seo-files',
    transformIndexHtml(html) {
      if (base) return html.replaceAll('__SITE_URL__', base)
      return html
        .split('\n')
        .filter((line) => !line.includes('__SITE_URL__'))
        .join('\n')
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /', 'Disallow: /api/']
      if (base) {
        robots.push(`Sitemap: ${base}/sitemap.xml`)
        const today = new Date().toISOString().slice(0, 10)
        const urls = SITEMAP_ROUTES.map(
          (r) => `  <url><loc>${base}${r}</loc><lastmod>${today}</lastmod></url>`
        ).join('\n')
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        })
      }
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.join('\n') + '\n' })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  if (env.TELEGRAM_BOT_TOKEN) process.env.TELEGRAM_BOT_TOKEN = env.TELEGRAM_BOT_TOKEN
  if (env.TELEGRAM_CHAT_ID) process.env.TELEGRAM_CHAT_ID = env.TELEGRAM_CHAT_ID

  return {
    plugins: [react(), tailwindcss(), telegramDevApi(), seoPlugin(env.VITE_SITE_URL)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          // Split the rarely-changing dependencies out of the app chunk so a
          // redeploy doesn't invalidate them and the browser can fetch/parse
          // them in parallel. react-icons is left alone — Vite already emits a
          // small per-icon-set chunk, which beats one big icon bundle.
          manualChunks(id) {
            if (!id.includes('node_modules')) return
            const p = id.replace(/\\/g, '/')
            // react-dom and react-router must stay with react: splitting them
            // apart risks module-init ordering problems.
            if (/node_modules\/(react|react-dom|scheduler|react-router|react-router-dom)\//.test(p))
              return 'vendor-react'
            if (/node_modules\/(i18next|react-i18next)/.test(p)) return 'vendor-i18n'
            // Radix is deliberately left out: forcing it into a shared chunk
            // made the first page download every primitive (Dialog, Popper…)
            // even though only lazily-loaded routes and menus use them.
            if (/node_modules\/(class-variance-authority|clsx|tailwind-merge)/.test(p))
              return 'vendor-ui'
          },
        },
      },
    },
  }
})
