import { useEffect, useRef } from 'react'
import Header from '../components/Header/Header'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import FloatingContact from '../components/FloatingContact/FloatingContact'

// Feeds the cursor position to whichever `.spotlight` element is under the
// pointer (see `.spotlight` in index.css). One delegated listener, throttled
// to one write per frame, and only on devices with a real hover pointer.
function useSpotlight() {
    useEffect(() => {
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
        let frame = 0
        let last
        const onMove = (e) => {
            last = e
            if (frame) return
            frame = requestAnimationFrame(() => {
                frame = 0
                const el = last.target instanceof Element && last.target.closest('.spotlight')
                if (!el) return
                const r = el.getBoundingClientRect()
                el.style.setProperty('--mx', `${last.clientX - r.left}px`)
                el.style.setProperty('--my', `${last.clientY - r.top}px`)
            })
        }
        window.addEventListener('pointermove', onMove, { passive: true })
        return () => {
            window.removeEventListener('pointermove', onMove)
            cancelAnimationFrame(frame)
        }
    }, [])
}

export default function MainLayout() {
    const { pathname } = useLocation()
    useSpotlight()

    // Jump back to the top whenever the route changes. Instant rather than
    // smooth: the new page fades in anyway, and a long smooth scroll on top of
    // that animation is what made navigation feel sluggish. Skipped on the
    // first render — the page already starts at the top, and scrollTo would
    // force a synchronous layout right in the middle of the initial load.
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

            {/* Aurora background */}
            <div className="aurora" aria-hidden="true" />
            <div className="grid-overlay" aria-hidden="true" />

            {/* Glass Header */}
            <header className="fixed top-0 right-0 left-0 z-30 border-b border-white/6 bg-background/75 backdrop-blur-md">
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

            <footer className="relative z-1">
                <Footer />
            </footer>

            <FloatingContact />
        </div>
    )
}
