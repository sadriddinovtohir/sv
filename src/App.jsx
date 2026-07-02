import { useState, useEffect, Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import SetTime from './components/SetTime/SetTime'

const About = lazy(() => import('./Page/About/About'))
const Projects = lazy(() => import('./Page/Projects/Projects'))
const Skills = lazy(() => import('./Page/Skills/Skills'))
const Contact = lazy(() => import('./Page/Contact/Contact'))
const Home = lazy(() => import('./Page/Home/Home'))
const Notfound = lazy(() => import('./components/NotFound/Notfound'))
const Offer = lazy(() => import('./components/Offer/Offer'))

function App() {
  const [showSetTime, setShowSetTime] = useState(true)

  useEffect(() => {
    import('./Page/Home/Home')
    const timer = setTimeout(() => setShowSetTime(false), 3500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      {showSetTime
        ? (
          <div style={{
            height: "100vh",
            position: "relative",
            zIndex: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <SetTime />
          </div>
        )
        : (
          <Suspense fallback={null}>
            <Routes>
              <Route path='/' element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/projects' element={<Projects />} />
                <Route path='/skills' element={<Skills />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/offer' element={<Offer />} />
                <Route path='*' element={<Notfound />} />
              </Route>
            </Routes>
          </Suspense>
        )
      }
    </div>
  )
}

export default App