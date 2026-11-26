import { useSyncExternalStore } from "react"

/**
 * Dark / light theme. The choice lives on <html data-theme> (CSS keys off it)
 * and in localStorage. index.html runs the same resolution inline before the
 * first paint, so the page never flashes the wrong theme while JS loads.
 */
export const THEME_KEY = "theme"
const META_COLORS = { dark: "#05080f", light: "#f4f6fb" }
const listeners = new Set()

export function resolveTheme(stored, prefersLight) {
  if (stored === "light" || stored === "dark") return stored
  return prefersLight ? "light" : "dark"
}

export function getTheme() {
  if (typeof document === "undefined") return "dark"
  return document.documentElement.dataset.theme === "light" ? "light" : "dark"
}

export function setTheme(theme) {
  const next = theme === "light" ? "light" : "dark"
  document.documentElement.dataset.theme = next
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", META_COLORS[next])
  try {
    localStorage.setItem(THEME_KEY, next)
  } catch {
    // Private mode / storage disabled: the theme still applies for this visit.
  }
  listeners.forEach((fn) => fn())
  window.dispatchEvent(new Event("themechange"))
}

export function toggleTheme() {
  setTheme(getTheme() === "light" ? "dark" : "light")
}

function subscribe(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function useTheme() {
  return useSyncExternalStore(subscribe, getTheme, () => "dark")
}
