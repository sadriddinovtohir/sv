import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import MainLayout from './Layout/MainLayout'
import SetTime from './components/SetTime/SetTime'
import Home from './Page/Home/Home'
import About from './Page/About/About'
import Projects from './Page/Projects/Projects'
import Skills from './Page/Skills/Skills'
import Contact from './Page/contact/contact'

function App() {
  const [showSetTime, setShowSetTime] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowSetTime(false), 4400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='container'>
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
          <Routes>
            <Route path='/' element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/projects' element={<Projects />} />
              <Route path='/skills' element={<Skills />} />
              <Route path='/contact' element={<Contact />} />
            </Route>
          </Routes>
        )
      }
    </div>
  )
}

export default App