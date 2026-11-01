import { useEffect } from "react"

const SITE_NAME = "Tohirbek Sadriddinov"

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector)
  if (el && value) el.setAttribute(attr, value)
}

/**
 * Per-route <title>/description. index.html already ships the defaults, so
 * this updates those same tags in place instead of rendering duplicates
 * (with two <title> elements the browser keeps showing the first one).
 */
export function Seo({ title, description }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Software Engineer`
    document.title = fullTitle
    setMeta('meta[property="og:title"]', "content", fullTitle)
    setMeta('meta[name="twitter:title"]', "content", fullTitle)
    setMeta('meta[name="description"]', "content", description)
    setMeta('meta[property="og:description"]', "content", description)
    setMeta('meta[name="twitter:description"]', "content", description)

    const canonical = document.head.querySelector('link[rel="canonical"]')
    if (canonical) {
      const origin = new URL(canonical.href).origin
      const url = origin + window.location.pathname
      canonical.setAttribute("href", url)
      setMeta('meta[property="og:url"]', "content", url)
    }
  }, [title, description])

  return null
}
