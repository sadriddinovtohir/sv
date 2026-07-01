import { useState } from 'react'
import { Box, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FaTelegram, FaLinkedin, FaPhone, FaEnvelope } from 'react-icons/fa'
import { FiMessageCircle, FiX } from 'react-icons/fi'

const GMAIL_COMPOSE_URL = 'https://mail.google.com/mail/?view=cm&fs=1&to=toxir4626@gmail.com'

const CHANNELS = [
    { icon: <FaTelegram size={20} />, href: 'https://t.me/tohir_sadriddinov', color: '#38bdf8', label: 'Telegram' },
    { icon: <FaLinkedin size={20} />, href: 'https://www.linkedin.com/in/tohirbek-sadriddinov-dev/', color: '#22c55e', label: 'LinkedIn' },
    { icon: <FaPhone size={17} />, href: 'tel:+998901283307', color: '#a855f7', label: 'Phone' },
    { icon: <FaEnvelope size={18} />, href: GMAIL_COMPOSE_URL, color: '#ff2d55', label: 'Email' },
]

export default function FloatingContact() {
    const { t } = useTranslation()
    const [open, setOpen] = useState(false)

    return (
        <Box sx={{
            position: 'fixed',
            bottom: { xs: 16, md: 28 },
            right: { xs: 16, md: 28 },
            zIndex: 1200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '12px',
        }}>
            {CHANNELS.map((ch, i) => (
                <Tooltip key={ch.label} title={ch.label} placement="left">
                    <Box
                        component="a"
                        href={ch.href}
                        target={ch.href.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        sx={{
                            display: open ? 'flex' : 'none',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: { xs: 42, md: 46 },
                            height: { xs: 42, md: 46 },
                            borderRadius: '50%',
                            background: 'rgba(18,18,28,0.95)',
                            backdropFilter: 'blur(20px)',
                            border: `1px solid ${ch.color}55`,
                            color: ch.color,
                            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                            animation: `fadeInUp 0.25s ease ${i * 0.05}s both`,
                            transition: 'transform 0.2s ease',
                            '&:hover': { transform: 'scale(1.1)', background: ch.color, color: '#fff' },
                        }}
                    >
                        {ch.icon}
                    </Box>
                </Tooltip>
            ))}

            <Tooltip title={t('FLOATING_CTA_LABEL')} placement="left">
                <Box
                    onClick={() => setOpen(o => !o)}
                    role="button"
                    aria-label={t('FLOATING_CTA_LABEL')}
                    sx={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: { xs: 52, md: 58 },
                        height: { xs: 52, md: 58 },
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #c0103a, #ff2d55)',
                        color: '#fff',
                        cursor: 'pointer',
                        boxShadow: '0 10px 30px rgba(192,16,58,0.5)',
                        transition: 'transform 0.25s ease',
                        '&:hover': { transform: 'scale(1.08)' },
                    }}
                >
                    {open ? <FiX size={24} /> : <FiMessageCircle size={24} />}
                </Box>
            </Tooltip>
        </Box>
    )
}
