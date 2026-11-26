import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import Header from '../components/Header/Header'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import FloatingContact from '../components/FloatingContact/FloatingContact'
import WebField from '../components/Background/WebField'
import { OPEN_PALETTE_EVENT } from '@/lib/events'

const CommandPalette = lazy(() => import('../components/CommandPalette/CommandPalette'))


const MAX_TILT = 7 // degrees

// Ctrl/⌘+K (or "/" outside text fields) and the header's search button open
// the palette. Its chunk is fetched on first use, then cached by the browser.
function useCommandPalette() {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const show = () => setOpen(true)
        const onKey = (e) => {
            const typing = e.target instanceof Element && e.target.closest('input, textarea, select, [contenteditable="true"]')
            if ((e.key === 'k' || e.key === 'K') && (e.ctrlKey || e.metaKey)) {
                e.preventDefault()
                setOpen((o) => !o)
            } else if (e.key === '/' && !typing && !e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault()
                show()
            }
        }
        window.addEventListener('keydown', onKey)
        window.addEventListener(OPEN_PALETTE_EVENT, show)
        return () => {
            window.removeEventListener('keydown', onKey)
            window.removeEventListener(OPEN_PALETTE_EVENT, show)
        }
    }, [])

    return { open, close: () => setOpen(false) }
}

// One delegated, rAF-throttled pointer listener for the whole page (desktop
// pointers only). It drives two effects:
//  - `.spotlight`: writes --mx/--my so the hover glow follows the cursor;
//  - `.tilt`: writes --rx/--ry so the card leans toward the cursor.
function usePointerEffects() {
    useEffect(() => {
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        let frame = 0
        let last
        let tilted = null

        const resetTilt = () => {
            if (!tilted) return
            tilted.style.setProperty('--rx', '0deg')
            tilted.style.setProperty('--ry', '0deg')
            tilted = null
        }

        const onMove = (e) => {
            last = e
            if (frame) return
            frame = requestAnimationFrame(() => {
                frame = 0
                const { clientX: x, clientY: y, target } = last
                if (!(target instanceof Element)) return

                const spot = target.closest('.spotlight')
                if (spot) {
                    const r = spot.getBoundingClientRect()
                    spot.style.setProperty('--mx', `${x - r.left}px`)
                    spot.style.setProperty('--my', `${y - r.top}px`)
                }

                const card = target.closest('.tilt')
                if (card !== tilted) resetTilt()
                if (card) {
                    const r = card.getBoundingClientRect()
                    const px = (x - r.left) / r.width - 0.5
                    const py = (y - r.top) / r.height - 0.5
                    card.style.setProperty('--rx', `${(-py * MAX_TILT).toFixed(2)}deg`)
                    card.style.setProperty('--ry', `${(px * MAX_TILT).toFixed(2)}deg`)
                    tilted = card
                }
            })
        }

        const onLeave = () => resetTilt()

        window.addEventListener('pointermove', onMove, { passive: true })
        document.documentElement.addEventListener('pointerleave', onLeave)
        return () => {
            window.removeEventListener('pointermove', onMove)
            document.documentElement.removeEventListener('pointerleave', onLeave)
            cancelAnimationFrame(frame)
        }
    }, [])
}

// Flags the header as "scrolled" so CSS can switch it to denser glass.
function useScrolledFlag(ref) {
    useEffect(() => {
        let frame = 0
        const update = () => {
            frame = 0
            if (ref.current) ref.current.dataset.scrolled = String(window.scrollY > 12)
        }
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update)
        }
        update()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', onScroll)
            cancelAnimationFrame(frame)
        }
    }, [ref])
}

export default function MainLayout() {
    const { pathname } = useLocation()
    const headerRef = useRef(null)
    const palette = useCommandPalette()
    usePointerEffects()
    useScrolledFlag(headerRef)

    // Jump back to the top whenever the route changes. Instant rather than
    // smooth: the new page animates in anyway. Skipped on the first render —
    // the page already starts at the top.
    const firstRender = useRef(true)
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            return
        }
        window.scrollTo(0, 0)
    }, [pathname])

    return (
        <div className="relative flex min-h-screen w-full flex-col justify-between overflow-x-hidden">

            {/* Animated background */}
            <div className="bg-orb bg-orb--1" aria-hidden="true" />
            <div className="bg-orb bg-orb--2" aria-hidden="true" />
            <div className="bg-orb bg-orb--3" aria-hidden="true" />
            <WebField />

            {/* Glass Header */}
            <header
                ref={headerRef}
                className="site-header fixed top-0 right-0 left-0 z-30 border-b border-white/6 bg-background"
            >
                <div className="container">
                    <Header />
                </div>
            </header>

            <div className="container relative z-1">
                <div className="h-14 md:h-16" />

                {/* Keyed by path so the enter animation replays on every navigation. */}
                <main key={pathname} className="page-enter">
                    <Outlet />
                </main>
            </div>

            <footer className="no-print relative z-1">
                <Footer />
            </footer>

            <div className="no-print">
                <FloatingContact />
            </div>

            {palette.open && (
                <Suspense fallback={null}>
                    <CommandPalette onClose={palette.close} />
                </Suspense>
            )}
        </div>
    )
}
