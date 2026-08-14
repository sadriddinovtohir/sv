import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaTelegram, FaLinkedin, FaPhone, FaEnvelope } from 'react-icons/fa'
import { FiMessageCircle } from 'react-icons/fi'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { SocialIconLink } from '@/components/common/SocialIconLink'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const GMAIL_COMPOSE_URL = 'https://mail.google.com/mail/?view=cm&fs=1&to=toxir4626@gmail.com'

const CHANNELS = [
    { icon: <FaTelegram size={20} />, href: 'https://t.me/tohir_sadriddinov', color: '#38bdf8', label: 'Telegram' },
    { icon: <FaLinkedin size={20} />, href: 'https://www.linkedin.com/in/tohirbek-sadriddinov-dev/', color: '#22c55e', label: 'LinkedIn' },
    { icon: <FaPhone size={17} />, href: 'tel:+998901283307', color: '#a855f7', label: 'Phone' },
    { icon: <FaEnvelope size={18} />, href: GMAIL_COMPOSE_URL, color: '#ff2d55', label: 'Email' },
]

export default function FloatingContact() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [open, setOpen] = useState(false)
    // Touch devices never fire mouseenter/mouseleave, so only wire the
    // hover-reveal on devices that actually have hover — on touch the
    // channel icons just stay collapsed instead of permanently covering
    // page content near the bottom-right corner.
    const hasHover = useMediaQuery('(hover: hover) and (pointer: fine)')
    const showChannels = hasHover && open

    // The Contact page already lists every channel and has its own form,
    // so the floating CTA is redundant there and, on mobile where the
    // channel icons are always shown, it overlaps the page's submit button.
    if (pathname === '/contact') return null

    return (
        <div
            onMouseEnter={hasHover ? () => setOpen(true) : undefined}
            onMouseLeave={hasHover ? () => setOpen(false) : undefined}
            className="fixed right-4 bottom-4 z-1200 flex flex-col items-end gap-3 md:right-7 md:bottom-7"
        >
            {CHANNELS.map((ch, i) => (
                <Tooltip key={ch.label}>
                    <TooltipTrigger asChild>
                        <SocialIconLink
                            icon={ch.icon}
                            href={ch.href}
                            accent={ch.color}
                            tint
                            className={showChannels ? 'flex' : 'hidden'}
                            style={{ animation: `fadeInUp 0.25s ease ${i * 0.05}s both` }}
                        />
                    </TooltipTrigger>
                    <TooltipContent side="left">{ch.label}</TooltipContent>
                </Tooltip>
            ))}

            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={() => navigate('/contact')}
                        aria-label={t('FLOATING_CTA_LABEL')}
                        className="flex h-13 w-13 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-[0_10px_30px_rgba(192,16,58,0.5)] transition-transform duration-250 hover:scale-108 md:h-14.5 md:w-14.5"
                    >
                        <FiMessageCircle size={24} />
                    </button>
                </TooltipTrigger>
                <TooltipContent side="left">{t('FLOATING_CTA_LABEL')}</TooltipContent>
            </Tooltip>
        </div>
    )
}
