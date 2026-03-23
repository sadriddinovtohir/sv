import { Stack, Box, Typography } from '@mui/material'
import { FaEnvelope, FaFileAlt, FaLinkedin, FaPhone, FaTelegram, FaUser } from "react-icons/fa";

const links = [
  { icon: <FaEnvelope />, label: 'toxir4626@gmail.com', href: 'mailto:toxir4626@gmail.com' },
  { icon: <FaPhone />, label: '+998-90-128-33-07', href: 'tel:+998901283307' },
  { icon: <FaFileAlt />, label: 'Rezyume', href: 'https://rezumi.vercel.app/', target: '_blank' },
  { icon: <FaUser />, label: 'Sertifikat', href: 'https://rezumi.vercel.app/sertificat.html', target: '_blank' },
  { icon: <FaLinkedin />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/tohirbek-sadriddinov-dev/', target: '_blank' },
  { icon: <FaTelegram />, label: 'Telegram', href: 'https://t.me/tohir_sadriddinov/', target: '_blank' },
]

export default function Footer() {
  return (
    <Box
      component="footer"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: '24px 0 16px',
        marginTop: '40px',
      }}
    >
      <div className='container'>
        {/* Links row */}
        <Stack
          flexDirection="row"
          flexWrap="wrap"
          gap="10px"
          justifyContent="center"
          mb="20px"
        >
          {links.map((item, i) => (
            <a
              key={i}
              href={item.href}
              target={item.target || '_self'}
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "9px 16px",
                background: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.65)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "13px",
                textDecoration: "none",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#c0103a"
                e.currentTarget.style.color = "#fff"
                e.currentTarget.style.borderColor = "#c0103a"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)"
                e.currentTarget.style.color = "rgba(255,255,255,0.65)"
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"
              }}
            >
              {item.icon}
              {item.label}
            </a>
          ))}
        </Stack>

        {/* Bottom line */}
        <Typography
          style={{
            textAlign: "center",
            color: "rgba(255,255,255,0.25)",
            fontSize: "12px",
          }}
        >
          © {new Date().getFullYear()} Tohirbek Sadriddinov. All rights reserved.
        </Typography>
      </div>
    </Box>
  )
}