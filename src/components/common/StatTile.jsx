import { useEffect, useRef } from "react"
import { GlassPanel } from "./GlassPanel"
import { useReveal } from "@/hooks/useReveal"

const DURATION = 1400

/**
 * Counts the leading number of `value` ("20+", "36") up from 0 the first time
 * the element scrolls into view. Writes straight to the text node React
 * rendered (nodeValue — never textContent, which would swap the node out from
 * under React), so the animation causes no re-renders. Values without a number
 * ("∞") are shown as they are.
 */
function useCountUp(value) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const node = el?.firstChild
    const match = /^(\d+)(.*)$/.exec(String(value))
    if (!el || !node || node.nodeType !== Node.TEXT_NODE || !match) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced || typeof IntersectionObserver === "undefined") return

    const target = Number(match[1])
    const suffix = match[2]
    let frame = 0
    node.nodeValue = `0${suffix}`

    const run = () => {
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min((now - start) / DURATION, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        node.nodeValue = `${Math.round(target * eased)}${suffix}`
        if (p < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        run()
      },
      { threshold: 0.4 }
    )
    io.observe(el)

    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
      node.nodeValue = String(value)
    }
  }, [value])

  return ref
}

/** Stats grid cell — a GlassPanel with a big accent-colored, counting number. */
export function StatTile({ value, label, accent }) {
  const numberRef = useCountUp(value)
  const revealRef = useReveal()

  return (
    <GlassPanel
      ref={revealRef}
      data-reveal=""
      data-reveal-variant="zoom"
      accent={accent}
      hover
      className="tilt beam-border cursor-default border-(--accent)/15 p-4 text-center md:p-5"
    >
      <div
        ref={numberRef}
        className="tone-text mb-1 text-[26px] leading-none font-extrabold text-(--accent) tabular-nums md:text-[34px]"
        style={{ textShadow: `0 0 22px ${accent}70` }}
      >
        {value}
      </div>
      <div className="text-[10px] font-medium tracking-wide text-white/60 md:text-xs">
        {label}
      </div>
    </GlassPanel>
  )
}
