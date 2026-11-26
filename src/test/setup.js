import { afterEach } from "vitest"

// Files can opt into the node environment (`// @vitest-environment node`);
// the DOM helpers below only apply under jsdom.
if (typeof window !== "undefined") {
  await import("@testing-library/jest-dom/vitest")
  const { cleanup } = await import("@testing-library/react")

  afterEach(() => {
    cleanup()
    localStorage.clear()
  })

  // jsdom lacks these browser APIs that components touch.
  if (!window.matchMedia) {
    window.matchMedia = (query) => ({
      matches: false,
      media: query,
      addEventListener() {},
      removeEventListener() {},
      addListener() {},
      removeListener() {},
    })
  }
  if (!Element.prototype.scrollIntoView) Element.prototype.scrollIntoView = () => {}
}
