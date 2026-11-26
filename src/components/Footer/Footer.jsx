import { FaEnvelope, FaFileAlt, FaLinkedin, FaPhone, FaTelegram, FaUser, FaBook } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  const links = [
    { icon: <FaEnvelope />, label: 'toxir4626@gmail.com', href: 'mailto:toxir4626@gmail.com' },
    { icon: <FaPhone />, label: '+998-90-128-33-07', href: 'tel:+998901283307' },
    { icon: <FaFileAlt />, label: t('FOOTER_RESUME'), to: '/resume' },
    { icon: <FaBook />, label: t('NAV_BLOG'), to: '/blog' },
    { icon: <FaUser />, label: t('FOOTER_CERTIFICATE'), href: 'https://rezumi.vercel.app/sertificat.html', target: '_blank' },
    { icon: <FaLinkedin />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/tohirbek-sadriddinov-dev/', target: '_blank' },
    { icon: <FaTelegram />, label: 'Telegram', href: 'https://t.me/tohir_sadriddinov/', target: '_blank' },
  ]

  return (
    <footer className="mt-10 border-t border-white/7 py-6 pb-4">
      <div className="container">
        <div className="mb-5 flex flex-row flex-wrap justify-center gap-2.5">
          {links.map((item) => {
            const className = "flex items-center gap-2 rounded-[10px] border border-white/8 bg-white/4 px-4 py-2.25 text-[13px] text-white/65 transition-all duration-250 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-snow hover:shadow-[0_8px_20px_-6px_rgba(61,107,255,0.7)]"
            // In-site pages use the router (no full reload); the rest are plain links.
            return item.to ? (
              <Link key={item.label} to={item.to} className={className}>
                {item.icon}
                {item.label}
              </Link>
            ) : (
              <a key={item.label} href={item.href} target={item.target || '_self'} rel="noreferrer" className={className}>
                {item.icon}
                {item.label}
              </a>
            )
          })}
        </div>

        <p className="text-center text-xs text-white/50">
          © {new Date().getFullYear()} Tohirbek Sadriddinov. {t('FOOTER_RIGHTS')}
        </p>
      </div>
    </footer>
  )
}
