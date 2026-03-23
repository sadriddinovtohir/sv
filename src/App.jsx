import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import Home from './page/Home/Home'
import SetTime from './components/SetTime/SetTime'
import About from './page/About/About'
import Projects from './page/Projects/Projects'
import Skills from './page/Skills/Skills'
import Contact from './page/Contact/Contact'

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