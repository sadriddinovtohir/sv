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

// Shown only while a route chunk that wasn't prefetched yet is downloading
// (slow connections) — without this, Suspense renders nothing and a nav
// tap looks like it silently did nothing.
function RouteLoader() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '3px solid rgba(255,255,255,0.15)',
          borderTopColor: '#c0103a',
          animation: 'spin 0.7s linear infinite',
        }}
      />
    </div>
  )
}

function App() {
  useEffect(() => {
    // Prefetch every route's chunk after first paint so mobile nav taps swap
    // pages instantly instead of sitting on a blank screen while the chunk
    // downloads (which reads as "navigation is stuck").
    import('./Page/About/About')
    import('./Page/Projects/Projects')
    import('./Page/Projects/ProjectDetail')
    import('./Page/Skills/Skills')
    import('./Page/Contact/Contact')
    import('./components/Offer/Offer')
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
          <Route path='*' element={<Notfound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App