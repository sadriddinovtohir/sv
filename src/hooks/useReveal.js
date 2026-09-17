import { useCallback } from "react";

const STAGGER_MS = 60;
const MAX_STEPS = 7; // cap the cascade so a big batch never crawls

let observer;

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries, obs) => {
      // Entries that cross the threshold in the same tick arrive together, so
      // numbering them here staggers exactly the cards the user just scrolled
      // to — no dependence on the grid's column count or breakpoint.
      let step = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.style.setProperty(
          "--reveal-delay",
          `${Math.min(step++, MAX_STEPS) * STAGGER_MS}ms`
        );
        entry.target.dataset.reveal = "in";
        obs.unobserve(entry.target); // reveal once, then stop watching
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
  );
  return observer;
}

/**
 * Ref callback that plays an element's entrance animation the first time it
 * scrolls into view. Every caller shares a single IntersectionObserver and each
 * element is unobserved as soon as it is revealed, so nothing keeps ticking
 * once the grid has been seen.
 *
 * Pair with `data-reveal` on the element — see the `[data-reveal]` rules in
 * index.css, which hold it hidden until this flips it to `in`.
 */
export function useReveal() {
  return useCallback((node) => {
    if (!node) return;

    // Without IntersectionObserver there is nothing to trigger the reveal, so
    // show the element straight away rather than leaving it stuck at opacity 0.
    if (typeof IntersectionObserver === "undefined") {
      node.dataset.reveal = "in";
      return;
    }

    const io = getObserver();
    io.observe(node);
    return () => io.unobserve(node);
  }, []);
}
