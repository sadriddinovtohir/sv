import { Stack, Typography, Button, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { COLOR } from '../../config/ui/color'
import { CiLocationOn } from 'react-icons/ci'
import { FaArrowRight, FaLaptop, FaPlay, FaTelegram } from 'react-icons/fa'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import profileImg from '../../assets/img/about.jpg'
import { Link } from 'react-router-dom'

const stats = [
    { value: '1+',  label: 'Years Exp.',    accent: '#ff2d55' },
    { value: '5+',  label: 'Projects',      accent: '#38bdf8' },
    { value: '15+', label: 'Technologies',  accent: '#a855f7' },
    { value: '∞',   label: 'Curiosity',     accent: '#22c55e' },
]

export default function Home() {
    const { t } = useTranslation()

    return (
        <div className='container'>

            {/* === Hero Section === */}
            <Stack
                flexDirection={{ xs: 'column', md: 'row' }}
                alignItems={'center'}
                justifyContent={'space-between'}
                mt={'50px'}
                mb={'20px'}
                gap={'40px'}
                flexWrap={'wrap'}
            >
                {/* LEFT */}
                <Stack sx={{ width: '100%', maxWidth: { xs: '100%', md: '530px' }, flex: 1, minWidth: 0 }}>

                    <Typography variant='h3' fontWeight={800} my={'12px'} color={'white'}
                        sx={{ fontSize: { xs: '28px', md: '38px' }, letterSpacing: '-0.5px' }}
                    >
                        {t("HI")}
                    </Typography>

                    <Typography
                        variant='h5'
                        sx={{
                            background: 'linear-gradient(135deg, #ff2d55, #ff7b7b)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            fontWeight: 800,
                            mb: '14px',
                            fontSize: { xs: '18px', md: '24px' },
                        }}
                    >
                        Frontend Developer
                    </Typography>

                    <Typography
                        sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, mb: '22px', fontSize: { xs: '13px', md: '15px' } }}
                    >
                        {t("I")}
                    </Typography>

                    {/* Location & Available */}
                    <Stack flexDirection={'row'} gap={'16px'} alignItems={'center'} mb={'26px'} flexWrap={'wrap'}>
                        <Box sx={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            color: 'rgba(255,255,255,0.55)', fontSize: '13px',
                            background: 'rgba(255,255,255,0.05)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '20px', px: '12px', py: '6px',
                        }}>
                            <CiLocationOn size={15} />
                            {t("Loaction")}
                        </Box>

                        <Box sx={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            color: '#22c55e', fontSize: '13px',
                            background: 'rgba(34,197,94,0.08)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(34,197,94,0.25)',
                            borderRadius: '20px', px: '12px', py: '6px',
                            fontWeight: 600,
                        }}>
                            <Box sx={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e',
                                boxShadow: '0 0 8px #22c55e', animation: 'pulse 2s infinite' }} />
                            {t("Now")}
                        </Box>
                    </Stack>

                    {/* Buttons */}
                    <Stack flexDirection={'row'} gap={'12px'} mb={'30px'} flexWrap={'wrap'}>
                        <Link to={"/contact"}>
                            <Button
                                variant='contained'
                                endIcon={<FaArrowRight size={14} />}
                                sx={{
                                    background: 'linear-gradient(135deg, #c0103a, #ff2d55)',
                                    color: 'white',
                                    borderRadius: '25px',
                                    padding: '10px 24px',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: '14px',
                                    boxShadow: '0 6px 20px rgba(192,16,58,0.4)',
                                    '&:hover': { boxShadow: '0 8px 28px rgba(192,16,58,0.6)' },
                                }}
                            >
                                {t("Hire")}
                            </Button>
                        </Link>

                        <Link target='_blank' to={"https://drive.google.com/file/d/1RFFDrtltvwii3hLzHM4FH4YADf0htNI5/view"}>
                            <Button
                                variant='outlined'
                                startIcon={<FaArrowRight size={14} />}
                                sx={{
                                    borderColor: 'rgba(255,255,255,0.2)',
                                    color: 'rgba(255,255,255,0.8)',
                                    borderRadius: '25px',
                                    padding: '10px 24px',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: '14px',
                                    backdropFilter: 'blur(12px)',
                                    background: 'rgba(255,255,255,0.04)',
                                    '&:hover': {
                                        borderColor: '#ff2d55',
                                        color: '#ff2d55',
                                        background: 'rgba(255,45,85,0.06)',
                                    },
                                }}
                            >
                                {t("CV")}
                            </Button>
                        </Link>
                    </Stack>

                    {/* Divider */}
                    <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.07)', mb: '18px' }} />

                    {/* Social Links */}
                    <Stack flexDirection={'row'} gap={'16px'} alignItems={'center'} flexWrap={'wrap'}>
                        <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', fontWeight: 500 }}>
                            Follow me:
                        </Typography>

                        {[
                            { icon: <FaGithub size={20} />,    href: "https://github.com/sadriddinovtohir" },
                            { icon: <FaTelegram size={20} />,  href: "https://t.me/tohir_sadriddinov" },
                            { icon: <FaLinkedin size={20} />,  href: 'https://www.linkedin.com/in/tohirbek-sadriddinov-dev/' },
                            { icon: <FaInstagram size={20} />, href: 'https://www.instagram.com/tohirbek_sadriddinov/' },
                            { icon: <FaPlay size={20} />,      href: 'https://vercel.com/sadriddinovtohirs-projects' },
                        ].map((item, i) => (
                            <a
                                key={i}
                                href={item.href}
                                target='_blank'
                                rel='noreferrer'
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    width: 38, height: 38,
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: '50%',
                                    color: 'rgba(255,255,255,0.6)',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = '#c0103a'
                                    e.currentTarget.style.color = '#fff'
                                    e.currentTarget.style.borderColor = '#c0103a'
                                    e.currentTarget.style.transform = 'translateY(-3px)'
                                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(192,16,58,0.4)'
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                                    e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                                    e.currentTarget.style.transform = 'translateY(0)'
                                    e.currentTarget.style.boxShadow = 'none'
                                }}
                            >
                                {item.icon}
                            </a>
                        ))}
                    </Stack>
                </Stack>

                {/* RIGHT — Profile Image */}
                <Box sx={{
                    position: 'relative',
                    flexShrink: 0,
                    mx: { xs: 'auto', md: 0 },
                }}>
                    {/* Glow behind image */}
                    <Box sx={{
                        position: 'absolute', inset: -20,
                        background: 'radial-gradient(circle, rgba(192,16,58,0.35) 0%, transparent 70%)',
                        filter: 'blur(30px)',
                        borderRadius: '50%',
                        zIndex: 0,
                    }} />

                    <Box sx={{
                        position: 'relative', zIndex: 1,
                        width: { xs: '220px', sm: '280px', md: '320px' },
                        aspectRatio: '3/4',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(4px)',
                    }}>
                        <img
                            src={profileImg}
                            alt='Tohirbek Sadriddinov'
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                    </Box>
                </Box>
            </Stack>

            {/* === Stats Row === */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
                gap: { xs: 1.5, md: 2 },
                mb: '40px',
            }}>
                {stats.map((stat) => (
                    <Box key={stat.label} sx={{
                        background: 'rgba(255,255,255,0.04)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: `1px solid ${stat.accent}20`,
                        borderRadius: '16px',
                        p: { xs: '16px 12px', md: '20px 16px' },
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        cursor: 'default',
                        '&:hover': {
                            borderColor: stat.accent + '55',
                            background: 'rgba(255,255,255,0.07)',
                            transform: 'translateY(-4px)',
                            boxShadow: `0 12px 30px ${stat.accent}18`,
                        },
                    }}>
                        <Typography sx={{
                            fontSize: { xs: '26px', md: '34px' },
                            fontWeight: 800,
                            color: stat.accent,
                            lineHeight: 1,
                            mb: '4px',
                            textShadow: `0 0 20px ${stat.accent}60`,
                        }}>
                            {stat.value}
                        </Typography>
                        <Typography sx={{
                            fontSize: { xs: '10px', md: '12px' },
                            color: 'rgba(255,255,255,0.45)',
                            fontWeight: 500,
                            letterSpacing: '0.3px',
                        }}>
                            {stat.label}
                        </Typography>
                    </Box>
                ))}
            </Box>

        </div>
    )
}
