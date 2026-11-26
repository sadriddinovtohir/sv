import { useEffect, Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
// The landing page is imported eagerly so the first paint needs no extra chunk.
import Home from './Page/Home/Home'

const About = lazy(() => import('./Page/About/About'))
const Projects = lazy(() => import('./Page/Projects/Projects'))
const ProjectDetail = lazy(() => import('./Page/Projects/ProjectDetail'))
const Skills = lazy(() => import('./Page/Skills/Skills'))
const Contact = lazy(() => import('./Page/Contact/Contact'))
const Notfound = lazy(() => import('./components/NotFound/Notfound'))
const Offer = lazy(() => import('./components/Offer/Offer'))
const Resume = lazy(() => import('./Page/Resume/Resume'))
const Blog = lazy(() => import('./Page/Blog/Blog'))
const BlogPost = lazy(() => import('./Page/Blog/BlogPost'))

// Shown only while a route chunk that wasn't prefetched yet is downloading
// (slow connections) — without this, Suspense renders nothing and a nav
// tap looks like it silently did nothing.
const LOADER_RINGS = [
  { inset: 0, color: 'var(--color-primary)', duration: '1.1s', reverse: false },
  { inset: 8, color: 'var(--color-accent)', duration: '1.5s', reverse: true },
  { inset: 16, color: 'var(--color-glow)', duration: '0.9s', reverse: false },
]

function RouteLoader() {
  return (
    <div role="status" aria-label="Loading" className="flex h-screen items-center justify-center">
      <div className="relative size-14" aria-hidden="true">
        {LOADER_RINGS.map((r) => (
          <span
            key={r.inset}
            className="absolute rounded-full border-[3px] border-transparent"
            style={{
              inset: r.inset,
              borderTopColor: r.color,
              animation: `spin ${r.duration} cubic-bezier(.5,0,.5,1) infinite${r.reverse ? ' reverse' : ''}`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function App() {
  useEffect(() => {
    // Prefetch every route's chunk after first paint so mobile nav taps swap
    // pages instantly instead of sitting on a blank screen while the chunk
    // downloads (which reads as "navigation is stuck"). Deferred to idle time
    // so these downloads don't compete with the landing page's own loading.
    const prefetch = () => {
      import('./Page/About/About')
      import('./Page/Projects/Projects')
      import('./Page/Projects/ProjectDetail')
      import('./Page/Skills/Skills')
      import('./Page/Contact/Contact')
      import('./components/Offer/Offer')
      import('./Page/Resume/Resume')
      import('./Page/Blog/Blog')
    }
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(prefetch, { timeout: 3000 })
      return () => cancelIdleCallback(id)
    }
    const id = setTimeout(prefetch, 1500)
    return () => clearTimeout(id)
  }, [])

  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/projects/:id' element={<ProjectDetail />} />
          <Route path='/skills' element={<Skills />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/offer' element={<Offer />} />
          <Route path='/resume' element={<Resume />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/blog/:slug' element={<BlogPost />} />
          <Route path='*' element={<Notfound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App