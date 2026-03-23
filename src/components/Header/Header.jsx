import { Box, Button, Drawer, Stack, Typography, useMediaQuery } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { BsPerson, BsFolder, BsEnvelope } from 'react-icons/bs'
import { BiCode, BiX } from 'react-icons/bi'
import { NavLink } from 'react-router-dom'
import React from 'react'
import { FiMenu } from 'react-icons/fi'
import { COLOR } from '../../config/ui/color'

export default function Header() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const { i18n } = useTranslation()

  const changeLang = (lang) => {
    i18n.changeLanguage(lang)
    localStorage.setItem("lang", lang)
  }

  const currentLang = i18n.language;
  const isMobile = useMediaQuery("(max-width:724px)");
  return (
    <Box >
      <div style={{padding:"5px"}} >
        {!isMobile ? <Stack  padding={"10px"} flexDirection={"row"} maxWidth={"100%"} alignItems={"center"} justifyContent={"space-between"}>
          <Stack style={{ maxWidth: "700px" }}>
            <nav className="navbar">
              <NavLink to="/" className="nav-link"><BsPerson /> Home</NavLink>
              <NavLink to="/about" className="nav-link"><BsPerson /> About</NavLink>
              <NavLink to="/projects" className="nav-link"><BsFolder /> Projects</NavLink>
              <NavLink to="/skills" className="nav-link"><BiCode /> Skills  </NavLink>
              <NavLink to="/contact" className="nav-link"><BsEnvelope /> Contact</NavLink>
            </nav>
          </Stack>
          <Stack flexDirection={"row"} justifyContent={"end"} gap={"6px"}>
            {["uz", "ru", "en"].map((lang) => (
              <button
                key={lang}
                onClick={() => changeLang(lang)}
                style={{
                  padding: "2px 8px",
                  height: "30px",
                  borderRadius: "5px",
                  border: `1px solid ${currentLang === lang ? "#c0103a" : "rgba(255,255,255,0.2)"}`,
                  background: currentLang === lang ? "#c0103a" : "transparent",
                  color: currentLang === lang ? "white" : "rgba(255,255,255,0.5)",
                  fontSize: "9px",
                  fontWeight: 400,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={e => {
                  if (currentLang !== lang) {
                    e.target.style.color = "white"
                    e.target.style.borderColor = "rgba(255,255,255,0.5)"
                    e.target.style.background = "rgba(255,255,255,0.08)"
                  }
                }}
                onMouseLeave={e => {
                  if (currentLang !== lang) {
                    e.target.style.color = "rgba(255,255,255,0.5)"
                    e.target.style.borderColor = "rgba(255,255,255,0.2)"
                    e.target.style.background = "transparent"
                  }
                }}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </Stack>
        </Stack> : <Stack flexDirection={"row"} justifyContent={"space-between"} alignContent={"center"}>
          <Typography variant='h5'>
            T.S
          </Typography>
          <Button onClick={toggleDrawer(true)}>  <FiMenu size={24} />  </Button>
          <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
            <div style={{ padding: "20px", backgroundColor: COLOR.bgcolor, height: "100vh" }}>
              <button onClick={toggleDrawer(false)} className='btn'><BiX size={30} /></button>
              <Stack justifyContent={"center"}>
                <Stack style={{ maxWidth: "700px" }}>
                  <nav className="columNavbar">
                    <NavLink onClick={toggleDrawer(false)}  to="/" className="nav-link"><BsPerson /> Home</NavLink>
                    <NavLink onClick={toggleDrawer(false)}  to="/about" className="nav-link"><BsPerson /> About</NavLink>
                    <NavLink onClick={toggleDrawer(false)}  to="/projects" className="nav-link"><BsFolder /> Projects</NavLink>
                    <NavLink onClick={toggleDrawer(false)}  to="/skills" className="nav-link"><BiCode /> Skills  </NavLink>
                    <NavLink onClick={toggleDrawer(false)}  to="/contact" className="nav-link"><BsEnvelope /> Contact</NavLink>
                  </nav>
                </Stack>

                <Stack flexDirection={"row"} justifyContent={"end"} gap={"6px"} style={{ marginLeft: "auto", marginRight: "auto", marginTop: "15px" }}>
                  {["uz", "ru", "en"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => changeLang(lang)}
                      style={{
                        padding: "2px 8px",
                        height: "30px",
                        borderRadius: "5px",
                        border: `1px solid ${currentLang === lang ? "#c0103a" : "rgba(255,255,255,0.2)"}`,
                        background: currentLang === lang ? "#c0103a" : "transparent",
                        color: currentLang === lang ? "white" : "rgba(255,255,255,0.5)",
                        fontSize: "9px",
                        fontWeight: 400,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={e => {
                        if (currentLang !== lang) {
                          e.target.style.color = "white"
                          e.target.style.borderColor = "rgba(255,255,255,0.5)"
                          e.target.style.background = "rgba(255,255,255,0.08)"
                        }
                      }}
                      onMouseLeave={e => {
                        if (currentLang !== lang) {
                          e.target.style.color = "rgba(255,255,255,0.5)"
                          e.target.style.borderColor = "rgba(255,255,255,0.2)"
                          e.target.style.background = "transparent"
                        }
                      }}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </Stack>
              </Stack>
            </div>
          </Drawer>
        </Stack>}


      </div>
    </Box>
  )
}