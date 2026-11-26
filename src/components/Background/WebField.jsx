import { useEffect, useRef } from 'react'

const LINK = 150          // max distance for two nodes to be joined by a thread, px
const RADIUS = 170        // cursor influence radius, px
const FORCE = 1.1         // how hard the cursor pushes nodes away
const DRIFT = 0.25        // resting drift speed, px/frame
const DENSITY = 5500      // one node per this many px² of screen
const MAX_NODES = 280

/**
 * Spider-web background: slowly drifting nodes, joined by threads whenever
 * two are close. When the cursor approaches, nearby nodes flee from it and
 * the web stretches around the pointer, then settles back to its calm drift.
 *
 * One canvas, typed arrays and a single rAF loop (the browser pauses it in
 * background tabs). Reduced-motion visitors get one static frame; touch
 * devices get the drifting web without cursor interaction.
 */
export default function WebField() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (!ctx) return

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches

        let w = 0, h = 0, n = 0
        let px, py, vx, vy, bx, by // position, velocity, own drift direction
        let mouseX = -9999, mouseY = -9999
        let frame = 0

        const build = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            const prevW = w, prevH = h
            w = window.innerWidth
            h = window.innerHeight
            canvas.width = Math.round(w * dpr)
            canvas.height = Math.round(h * dpr)
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

            // Mobile browsers fire resize when the URL bar slides; keep the
            // existing web then and only rescale it, instead of reshuffling.
            if (n && prevW === w) {
                for (let i = 0; i < n; i++) py[i] *= h / prevH
                return
            }

            n = Math.min(MAX_NODES, Math.round((w * h) / DENSITY))
            px = new Float32Array(n); py = new Float32Array(n)
            vx = new Float32Array(n); vy = new Float32Array(n)
            bx = new Float32Array(n); by = new Float32Array(n)
            for (let i = 0; i < n; i++) {
                px[i] = Math.random() * w
                py[i] = Math.random() * h
                const a = Math.random() * Math.PI * 2
                const s = DRIFT * (0.4 + Math.random() * 0.8)
                bx[i] = vx[i] = Math.cos(a) * s
                by[i] = vy[i] = Math.sin(a) * s
            }
        }

        const update = () => {
            for (let i = 0; i < n; i++) {
                // Flee from the cursor.
                const dx = px[i] - mouseX
                const dy = py[i] - mouseY
                const d = Math.hypot(dx, dy)
                if (d < RADIUS && d > 0.01) {
                    const f = (1 - d / RADIUS) * FORCE
                    vx[i] += (dx / d) * f
                    vy[i] += (dy / d) * f
                }
                // Ease back to the node's own calm drift.
                vx[i] += (bx[i] - vx[i]) * 0.05
                vy[i] += (by[i] - vy[i]) * 0.05

                px[i] += vx[i]
                py[i] += vy[i]

                // Bounce off the edges.
                if (px[i] < 0) { px[i] = 0; vx[i] = Math.abs(vx[i]); bx[i] = Math.abs(bx[i]) }
                else if (px[i] > w) { px[i] = w; vx[i] = -Math.abs(vx[i]); bx[i] = -Math.abs(bx[i]) }
                if (py[i] < 0) { py[i] = 0; vy[i] = Math.abs(vy[i]); by[i] = Math.abs(by[i]) }
                else if (py[i] > h) { py[i] = h; vy[i] = -Math.abs(vy[i]); by[i] = -Math.abs(by[i]) }
            }
        }

        // Thread/knot colors per theme; read every frame (one attribute read)
        // so a theme toggle repaints the web straight away.
        const PALETTE = {
            dark: { thread: '120, 150, 255', near: '46, 230, 166', knot: 'rgba(170, 195, 255, 0.75)', boost: 1 },
            light: { thread: '61, 107, 255', near: '5, 150, 105', knot: 'rgba(61, 107, 255, 0.45)', boost: 0.9 },
        }

        const draw = () => {
            const pal = PALETTE[document.documentElement.dataset.theme === 'light' ? 'light' : 'dark']
            ctx.clearRect(0, 0, w, h)
            ctx.lineWidth = 1

            // Threads
            for (let i = 0; i < n; i++) {
                for (let j = i + 1; j < n; j++) {
                    const dx = px[i] - px[j]
                    const dy = py[i] - py[j]
                    const d2 = dx * dx + dy * dy
                    if (d2 > LINK * LINK) continue
                    const a = (1 - Math.sqrt(d2) / LINK) * 0.3 * pal.boost

                    // Threads near the cursor light up in the accent color.
                    const mx = (px[i] + px[j]) / 2 - mouseX
                    const my = (py[i] + py[j]) / 2 - mouseY
                    const near = mx * mx + my * my < RADIUS * RADIUS * 1.6
                    ctx.strokeStyle = near
                        ? `rgba(${pal.near}, ${Math.min(a * 1.8, 0.75)})`
                        : `rgba(${pal.thread}, ${a})`
                    ctx.beginPath()
                    ctx.moveTo(px[i], py[i])
                    ctx.lineTo(px[j], py[j])
                    ctx.stroke()
                }
            }

            // Knots
            ctx.fillStyle = pal.knot
            for (let i = 0; i < n; i++) {
                ctx.beginPath()
                ctx.arc(px[i], py[i], 1.6, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        const loop = () => {
            update()
            draw()
            frame = requestAnimationFrame(loop)
        }

        build()
        if (reduced) draw()
        else frame = requestAnimationFrame(loop)

        const onResize = () => {
            build()
            if (reduced) draw()
        }
        const onMove = (e) => {
            mouseX = e.clientX
            mouseY = e.clientY
        }
        const onLeave = () => {
            mouseX = mouseY = -9999
        }

        window.addEventListener('resize', onResize)
        // The animated loop picks up a theme change on its next frame; the
        // static (reduced-motion) frame has to be repainted by hand.
        const onTheme = () => { if (reduced) draw() }
        window.addEventListener('themechange', onTheme)
        if (finePointer && !reduced) {
            window.addEventListener('pointermove', onMove, { passive: true })
            document.documentElement.addEventListener('pointerleave', onLeave)
        }
        return () => {
            cancelAnimationFrame(frame)
            window.removeEventListener('resize', onResize)
            window.removeEventListener('themechange', onTheme)
            window.removeEventListener('pointermove', onMove)
            document.documentElement.removeEventListener('pointerleave', onLeave)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="web-field pointer-events-none fixed inset-0 z-0 h-full w-full"
        />
    )
}
