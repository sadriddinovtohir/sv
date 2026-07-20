import { BsPerson, BsFolder } from "react-icons/bs"
import { BiCode } from "react-icons/bi"
import { FiMail } from "react-icons/fi"

// Single source of truth for the main nav — rendered by both the desktop
// nav bar and the mobile Sheet in Header.jsx.
export const NAV_ITEMS = [
  { to: "/", labelKey: "NAV_HOME", icon: BsPerson, end: true },
  { to: "/about", labelKey: "NAV_ABOUT", icon: BsPerson },
  { to: "/projects", labelKey: "NAV_PROJECTS", icon: BsFolder },
  { to: "/skills", labelKey: "NAV_SKILLS", icon: BiCode },
  { to: "/contact", labelKey: "NAV_CONTACT", icon: FiMail },
]
