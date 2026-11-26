/* Service worker: makes the portfolio installable and usable offline.
 *
 *  - Page navigations: network first, so a new deploy shows up immediately;
 *    offline, the cached app shell (index.html) is served instead.
 *  - /assets/*: cache first. Vite fingerprints these file names, so a cached
 *    copy can never be stale.
 *  - Other same-origin GETs (fonts, icons, images in public/): stale while
 *    revalidate.
 *  - /api/* and cross-origin requests: not touched.
 *
 * Bump VERSION to drop every old cache on the next visit.
 */
const VERSION = "v1"
const SHELL = `shell-${VERSION}`
const ASSETS = `assets-${VERSION}`
const STATIC = `static-${VERSION}`
const MAX_ASSET_ENTRIES = 120

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL).then((c) => c.addAll(["/", "/favicon.svg", "/manifest.webmanifest"])).then(() => self.skipWaiting())
  )
})

self.addEventListener("activate", (event) => {
  const keep = new Set([SHELL, ASSETS, STATIC])
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => !keep.has(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

async function trim(cacheName, max) {
  const cache = await caches.open(cacheName)
  const keys = await cache.keys()
  for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i])
}

self.addEventListener("fetch", (event) => {
  const { request } = event
  if (request.method !== "GET") return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin || url.pathname.startsWith("/api/")) return

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone()
            caches.open(SHELL).then((c) => c.put("/", copy))
          }
          return res
        })
        .catch(() => caches.match("/", { cacheName: SHELL }))
    )
    return
  }

  if (url.pathname.startsWith("/assets/")) {
    event.respondWith(
      caches.match(request).then(
        (hit) =>
          hit ||
          fetch(request).then((res) => {
            if (res.ok) {
              const copy = res.clone()
              caches.open(ASSETS).then((c) => c.put(request, copy)).then(() => trim(ASSETS, MAX_ASSET_ENTRIES))
            }
            return res
          })
      )
    )
    return
  }

  event.respondWith(
    caches.open(STATIC).then((cache) =>
      cache.match(request).then((hit) => {
        const network = fetch(request)
          .then((res) => {
            if (res.ok) cache.put(request, res.clone())
            return res
          })
          .catch(() => hit)
        return hit || network
      })
    )
  )
})
