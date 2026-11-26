import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import { clientIp, handleContactSubmission } from './api/_lib/sendTelegram.js'
import { handleGithubStats } from './api/_lib/github.js'

// Serves the /api routes during `vite dev`, since Vite doesn't run Vercel
// serverless functions itself — these mirror the files in api/, so the
// contact form and the GitHub section work locally and once deployed.
function readJson(req) {
  return new Promise((resolve) => {
    let raw = ''
    req.on('data', (chunk) => { raw += chunk })
    req.on('end', () => {
      try { resolve(JSON.parse(raw || '{}')) } catch { resolve({}) }
    })
  })
}

function sendJson(res, { statusCode, headers = {}, body }) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  for (const [k, v] of Object.entries(headers)) res.setHeader(k, v)
  res.end(JSON.stringify(body))
}

function devApi() {
  return {
    name: 'dev-api',
    configureServer(server) {
      server.middlewares.use('/api/send-message', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          return res.end()
        }
        const payload = await readJson(req)
        sendJson(res, await handleContactSubmission(payload, { ip: clientIp(req) }))
      })
      server.middlewares.use('/api/github', async (req, res) => {
        if (req.method !== 'GET') {
          res.statusCode = 405
          return res.end()
        }
        sendJson(res, await handleGithubStats())
      })
    },
  }
}

const STATIC_ROUTES = ['/', '/about', '/projects', '/skills', '/offer', '/resume', '/blog', '/contact']

// Project and blog URLs for the sitemap. projectsData.js imports images, so it
// can't be imported into the Node config — the ids are read from its source.
function dynamicRoutes() {
  const projectSrc = fs.readFileSync(path.resolve(__dirname, 'src/Page/Projects/projectsData.js'), 'utf8')
  const projects = [...projectSrc.matchAll(/^\s+id: "([a-z0-9-]+)"/gm)].map((m) => `/projects/${m[1]}`)
  const blogDir = path.resolve(__dirname, 'src/content/blog')
  const posts = fs.existsSync(blogDir)
    ? fs.readdirSync(blogDir)
        .filter((f) => f.endsWith('.md'))
        .filter((f) => !/^draft:\s*true\s*$/m.test(fs.readFileSync(path.join(blogDir, f), 'utf8').split('---')[1] ?? ''))
        .map((f) => `/blog/${f.replace(/\.md$/, '')}`)
    : []
  return [...projects, ...posts]
}

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
        const urls = [...STATIC_ROUTES, ...dynamicRoutes()].map(
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
  if (env.GITHUB_TOKEN) process.env.GITHUB_TOKEN = env.GITHUB_TOKEN
  if (env.GITHUB_USERNAME) process.env.GITHUB_USERNAME = env.GITHUB_USERNAME
  if (env.GITLAB_TOKEN) process.env.GITLAB_TOKEN = env.GITLAB_TOKEN
  if (env.GITLAB_USERNAME) process.env.GITLAB_USERNAME = env.GITLAB_USERNAME

  return {
    plugins: [react(), tailwindcss(), devApi(), seoPlugin(env.VITE_SITE_URL)],
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.js'],
      include: ['src/**/*.test.{js,jsx}', 'api/**/*.test.js'],
      css: false,
    },
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
