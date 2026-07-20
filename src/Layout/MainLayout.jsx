import { useEffect } from 'react'
import Header from '../components/Header/Header'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import FloatingContact from '../components/FloatingContact/FloatingContact'

export default function MainLayout() {
    const { pathname } = useLocation()

    // Smooth scroll back to the top whenever the route changes, instead of
    // keeping the previous page's scroll position (feels jarring otherwise).
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }, [pathname])

    return (
        <div className="relative flex min-h-screen w-full flex-col justify-between overflow-x-hidden">

            {/* Glassmorphism background orbs */}
            <div className="bg-orb bg-orb-1" />
            <div className="bg-orb bg-orb-2" />
            <div className="bg-orb bg-orb-3" />

            <div className="container relative z-1">
                {/* Glass Header */}
                <header className="fixed top-0 right-0 left-0 z-3 border-b border-white/6 bg-[rgba(13,0,7,0.65)] backdrop-blur-2xl">
                    <Header />
                </header>

                <div className="h-13.5 md:h-16" />

                <main>
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
