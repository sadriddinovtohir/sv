/**
 * Sends a GA4 event when gtag is configured (index.html loads it lazily and
 * only when VITE_GA_ID is set). Before gtag.js arrives, `window.gtag` just
 * queues into dataLayer, so early events are not lost; without GA it's a no-op.
 */
export function track(event, params = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return
  try {
    window.gtag("event", event, params)
  } catch {
    // Analytics must never break the UI.
  }
}
