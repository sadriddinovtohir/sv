import { Box, Button, Drawer, Stack, Typography, useMediaQuery } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { BsPerson, BsFolder } from 'react-icons/bs'
import { BiCode, BiX } from 'react-icons/bi'
import { NavLink } from 'react-router-dom'
import React from 'react'
import { FiMenu, FiGlobe, FiChevronDown } from 'react-icons/fi'
import { COLOR } from '../../config/ui/color'

const LANGS = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'uz', flag: '🇺🇿', label: "O'zbek" },
  { code: 'ru', flag: '🇷🇺', label: 'Русский' },
]

function LangDropdown({ currentLang, changeLang }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const ref = React.useRef(null)

  const current = LANGS.find(l => l.code === currentLang) || LANGS[0]

  React.useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative', userSelect: 'none' }}>
      <button
        onClick={() => setIsOpen(o => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          height: '36px',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.15)',
          background: 'rgba(255,255,255,0.05)',
          color: 'rgba(255,255,255,0.85)',
          fontSize: '13px',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          backdropFilter: 'blur(10px)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
          e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
          e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
        }}
      >
        <FiGlobe size={14} style={{ color: '#c0103a' }} />
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <FiChevronDown
          size={12}
          style={{
            color: 'rgba(255,255,255,0.5)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        />
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          right: 0,
          minWidth: '150px',
          maxWidth: 'calc(100vw - 32px)',
          background: 'rgba(18,18,28,0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '10px',
          overflow: 'hidden',
          zIndex: 1000,
          boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
        }}>
          {LANGS.map(lang => (
            <button
              key={lang.code}
              onClick={() => { changeLang(lang.code); setIsOpen(false) }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '10px 14px',
                border: 'none',
                background: currentLang === lang.code ? 'rgba(192,16,58,0.15)' : 'transparent',
                color: currentLang === lang.code ? '#ff4d6d' : 'rgba(255,255,255,0.75)',
                fontSize: '13px',
                fontWeight: currentLang === lang.code ? 600 : 400,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => {
                if (currentLang !== lang.code) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.color = '#fff'
                }
              }}
              onMouseLeave={e => {
                if (currentLang !== lang.code) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.75)'
                }
              }}
            >
              <span style={{ fontSize: '16px' }}>{lang.flag}</span>
              <span>{lang.label}</span>
              {currentLang === lang.code && (
                <span style={{ marginLeft: 'auto', fontSize: '10px', color: '#c0103a' }}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }

  const { i18n, t } = useTranslation()

  const changeLang = (lang) => {
    i18n.changeLanguage(lang)
    localStorage.setItem("lang", lang)
  }

  const currentLang = i18n.language
  const isMobile = useMediaQuery("(max-width:724px)")

  return (
    <Box>
      <div style={{ padding: "5px" }}>
        {!isMobile ? (
          <Stack padding={"10px"} flexDirection={"row"} maxWidth={"100%"} alignItems={"center"} justifyContent={"space-between"}>
            <Stack style={{ maxWidth: "700px" }}>
              <nav className="navbar">
                <NavLink to="/" className="nav-link"><BsPerson /> {t("NAV_HOME")}</NavLink>
                <NavLink to="/about" className="nav-link"><BsPerson /> {t("NAV_ABOUT")}</NavLink>
                <NavLink to="/projects" className="nav-link"><BsFolder /> {t("NAV_PROJECTS")}</NavLink>
                <NavLink to="/skills" className="nav-link"><BiCode /> {t("NAV_SKILLS")}</NavLink>
              </nav>
            </Stack>
            <LangDropdown currentLang={currentLang} changeLang={changeLang} />
          </Stack>
        ) : (
          <Stack flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
            <Typography variant='h5'>T.S</Typography>
            <Button onClick={toggleDrawer(true)}><FiMenu size={24} /></Button>
            <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
              <div style={{ padding: "20px", backgroundColor: COLOR.bgcolor, height: "100vh" }}>
                <button onClick={toggleDrawer(false)} className='btn'><BiX size={30} /></button>
                <Stack justifyContent={"center"} gap={"20px"}>
                  <nav className="columNavbar">
                    <NavLink onClick={toggleDrawer(false)} to="/" className="nav-link"><BsPerson /> {t("NAV_HOME")}</NavLink>
                    <NavLink onClick={toggleDrawer(false)} to="/about" className="nav-link"><BsPerson /> {t("NAV_ABOUT")}</NavLink>
                    <NavLink onClick={toggleDrawer(false)} to="/projects" className="nav-link"><BsFolder /> {t("NAV_PROJECTS")}</NavLink>
                    <NavLink onClick={toggleDrawer(false)} to="/skills" className="nav-link"><BiCode /> {t("NAV_SKILLS")}</NavLink>
                  </nav>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LangDropdown currentLang={currentLang} changeLang={changeLang} />
                  </div>
                </Stack>
              </div>
            </Drawer>
          </Stack>
        )}
      </div>
    </Box>
  )
}
