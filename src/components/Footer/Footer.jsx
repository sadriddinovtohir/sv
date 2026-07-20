import { FaEnvelope, FaFileAlt, FaLinkedin, FaPhone, FaTelegram, FaUser } from "react-icons/fa";
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  const links = [
    { icon: <FaEnvelope />, label: 'toxir4626@gmail.com', href: 'mailto:toxir4626@gmail.com' },
    { icon: <FaPhone />, label: '+998-90-128-33-07', href: 'tel:+998901283307' },
    { icon: <FaFileAlt />, label: t('FOOTER_RESUME'), href: 'https://rezumi.vercel.app/', target: '_blank' },
    { icon: <FaUser />, label: t('FOOTER_CERTIFICATE'), href: 'https://rezumi.vercel.app/sertificat.html', target: '_blank' },
    { icon: <FaLinkedin />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/tohirbek-sadriddinov-dev/', target: '_blank' },
    { icon: <FaTelegram />, label: 'Telegram', href: 'https://t.me/tohir_sadriddinov/', target: '_blank' },
  ]

  return (
    <footer className="mt-10 border-t border-white/7 py-6 pb-4">
      <div className="container">
        <div className="mb-5 flex flex-row flex-wrap justify-center gap-2.5">
          {links.map((item, i) => (
            <a
              key={i}
              href={item.href}
              target={item.target || '_self'}
              rel="noreferrer"
              className="flex items-center gap-2 rounded-[10px] border border-white/8 bg-white/4 px-4 py-2.25 text-[13px] text-white/65 transition-all duration-250 hover:border-primary hover:bg-primary hover:text-white"
            >
              {item.icon}
              {item.label}
            </a>
          ))}
        </div>

        <p className="text-center text-xs text-white/25">
          © {new Date().getFullYear()} Tohirbek Sadriddinov. {t('FOOTER_RIGHTS')}
        </p>
      </div>
    </footer>
  )
}
