---
title: How I keep a heavily animated portfolio fast
description: Lazy routes, idle-time prefetching, a canvas background without blur filters and a theme switch with no flash — the performance decisions behind this site.
date: 2026-11-26
tags: [react, vite, performance]
draft: true
---

This site has a lot going on: an interactive spider-web background, drifting gradient orbs, 3D card tilt, a cursor spotlight, scroll reveals and three languages. None of that is worth anything if the page feels slow on a mid-range phone. Here is what keeps it fast.

## 1. Only the landing page is on the critical path

Every route except the home page is loaded with `React.lazy`. After the first paint, the remaining route chunks are prefetched in `requestIdleCallback`, so a tap on the mobile menu swaps the page instantly instead of waiting on the network:

```js
const prefetch = () => {
  import('./Page/About/About')
  import('./Page/Projects/Projects')
  // ...
}
requestIdleCallback(prefetch, { timeout: 3000 })
```

Rarely-changing dependencies (React, i18next, small UI utilities) are split into their own vendor chunks, so a redeploy doesn't invalidate them in the visitor's cache.

## 2. No `backdrop-filter`, no `filter: blur()`

Glassmorphism usually means `backdrop-filter: blur()`. With a dozen cards on screen that was the main source of scroll jank on phones — and since the only thing behind the cards is a soft gradient, the blur was invisible anyway. The orbs get their softness from `radial-gradient` instead of a blur filter, so each frame the GPU only translates pre-rasterized layers.

## 3. One canvas, typed arrays, one loop

The web background is a single `<canvas>`. Node positions and velocities live in `Float32Array`s, there is one `requestAnimationFrame` loop (which the browser pauses in background tabs), and visitors with `prefers-reduced-motion` get a single static frame.

## 4. One pointer listener for the whole page

The cursor spotlight and the 3D tilt don't attach listeners per card. A single delegated, rAF-throttled `pointermove` listener finds the hovered `.spotlight` / `.tilt` element and writes CSS custom properties; CSS does the rest.

## 5. A theme switch that never flashes

The dark/light choice is resolved by a tiny inline script in `index.html` *before* the first paint. Components use `white/xx` utilities; Tailwind compiles them to `var(--color-white)`, so the light theme only redefines that variable and the entire UI flips with it.

## 6. Third-party scripts wait for the visitor

Google Analytics costs about half a second of main-thread time, so it is only fetched on the visitor's first interaction (or after six seconds), never during load.

---

The takeaway: most "performance work" here was choosing *not* to do something expensive that nobody would have noticed anyway.
