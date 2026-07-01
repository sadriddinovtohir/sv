import { Stack, Typography, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { CiLocationOn } from 'react-icons/ci'
import { FaArrowRight, FaPlay, FaTelegram } from 'react-icons/fa'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { FaHtml5, FaJs, FaReact } from 'react-icons/fa'
import {
    SiTailwindcss, SiNextdotjs, SiTypescript, SiRedux,
    SiReactquery, SiDocker, SiPostgresql,
} from 'react-icons/si'
import { TbBrandNodejs } from 'react-icons/tb'
import profileImg from '../../assets/img/homePage.jpg'
import { Link } from 'react-router-dom'
import CustomCard from '../../components/CustomCard/CustomCard'
import RadioatorPro from '../../assets/img/RadioatorPro.png'
import bizCore from '../../assets/img/bizCore.png'
import parthubLogo from '../../assets/img/parthub.png'
import studense from '../../assets/img/studense.png'
import sun_energy_img from '../../assets/img/sun_energy_img.jpg'
import ITPARKIMG from '../../assets/img/ITPARK.png'
import clubMraa from '../../assets/img/image.png'
import { totalSkillsCount } from '../../data/skillsData'

const techStack = [
    { icon: <FaHtml5 size={22} />,       name: 'HTML5',        color: '#e34f26' },
    { icon: <SiTailwindcss size={22} />, name: 'Tailwind',     color: '#38bdf8' },
    { icon: <FaJs size={22} />,          name: 'JavaScript',   color: '#f7df1e' },
    { icon: <SiTypescript size={22} />,  name: 'TypeScript',   color: '#3178c6' },
    { icon: <FaReact size={22} />,       name: 'React',        color: '#61dafb' },
    { icon: <SiNextdotjs size={22} />,   name: 'Next.js',      color: '#ffffff' },
    { icon: <SiRedux size={22} />,       name: 'Redux',        color: '#764abc' },
    { icon: <SiReactquery size={22} />,  name: 'TanStack',     color: '#ff4154' },
    { icon: <TbBrandNodejs size={22} />, name: 'Node.js',      color: '#68a063' },
    { icon: <SiPostgresql size={22} />,  name: 'PostgreSQL',   color: '#336791' },
    { icon: <SiDocker size={22} />,      name: 'Docker',       color: '#2496ed' },
]

const projectsData = [
    { img: bizCore,       titleKey: 'PROJECT_BACKEND_TITLE',    descKey: 'PROJECT_BACKEND_DESC',    techKey: 'PROJECT_BACKEND_TECH',    link: 'https://github.com/sadriddinovtohir',              giturl: 'https://github.com/sadriddinovtohir',                       badge: 'AI Built' },
    { img: ITPARKIMG,     titleKey: 'PROJECT_ITPARK_TITLE',     descKey: 'PROJECT_ITPARK_DESC',     techKey: 'PROJECT_ITPARK_TECH',     link: 'https://www.it-park.uz/' },
    { img: studense,      titleKey: 'PROJECT_TTG_TITLE',        descKey: 'PROJECT_TTG_DESC',        techKey: 'PROJECT_TTG_TECH',        link: 'https://github.com/MaxmudAxmedov/admin-sun-energy', giturl: 'https://github.com/MaxmudAxmedov/admin-sun-energy' },
    { img: sun_energy_img,titleKey: 'PROJECT_SUN_ENERGY_TITLE', descKey: 'PROJECT_SUN_ENERGY_DESC', techKey: 'PROJECT_SUN_ENERGY_TECH', link: 'https://quyosh-panellari-admin.netlify.app/',      giturl: 'https://github.com/MaxmudAxmedov/admin-sun-energy' },
    { img: parthubLogo,   titleKey: 'PARTHUB',                  descKey: 'PROJECT_BIZCORE_DESC',    techKey: 'PROJECT_BIZCORE_TECH',    link: 'https://parthub-gamma.vercel.app/',               giturl: 'https://github.com/sadriddinovtohir/PARTHUB_FRONTEND' },
    { img: clubMraa,      titleKey: 'PROJECT_REACTNATIVE_TITLE',descKey: 'PROJECT_REACTNATIVE_DESC',techKey: 'PROJECT_REACTNATIVE_TECH',link: 'https://github.com/sadriddinovtohir',              giturl: 'https://github.com/sadriddinovtohir' },
    { img: RadioatorPro,  titleKey: 'RADIATORPRO_TITLE',        descKey: 'RADIATORPRO_DESC',        techKey: 'RADIATORPRO_TECH',        link: 'https://radiator-pro.vercel.app/' },
]

export default function Home() {
    const { t } = useTranslation()

    const stats = [
        { value: '1+',                    label: t('STAT_YEARS_EXP'),    accent: '#ff2d55' },
        { value: `${projectsData.length}`,label: t('STAT_PROJECTS'),     accent: '#38bdf8' },
        { value: `${totalSkillsCount}`,   label: t('STAT_TECHNOLOGIES'), accent: '#a855f7' },
        { value: '∞',                     label: t('STAT_CURIOSITY'),    accent: '#22c55e' },
    ]

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
                        {t("FRONTEND_DEVELOPER")}
                    </Typography>

                    <Typography
                        sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, mb: '22px', fontSize: { xs: '13px', md: '15px' } }}
                    >
                        {t("I")}
                    </Typography>

                    {/* Location & Available */}
                    <Stack flexDirection={'row'} gap={'16px'} alignItems={'center'} mb={'26px'} flexWrap={'wrap'}>
                        <a
                            href="https://www.google.com/maps/place/Najot+Ta'lim+Chilonzor+Filial/@41.2856679,69.199098,1047m/data=!3m1!1e3!4m6!3m5!1s0x38ae8ba578f4f58d:0xd7a2ecf23413b7a0!8m2!3d41.2857626!4d69.2036637!16s%2Fg%2F11nms27h2f?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D"
                            target="_blank"
                            rel="noreferrer"
                            style={{ textDecoration: 'none' }}
                        >
                            <Box sx={{
                                display: 'flex', alignItems: 'center', gap: '6px',
                                color: 'rgba(255,255,255,0.55)', fontSize: '13px',
                                background: 'rgba(255,255,255,0.05)',
                                backdropFilter: 'blur(12px)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: '20px', px: '12px', py: '6px',
                                cursor: 'pointer',
                                transition: 'all 0.25s ease',
                                '&:hover': {
                                    color: 'rgba(255,255,255,0.9)',
                                    background: 'rgba(255,255,255,0.1)',
                                    borderColor: 'rgba(255,255,255,0.25)',
                                },
                            }}>
                                <CiLocationOn size={15} />
                                {t("Loaction")}
                            </Box>
                        </a>

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

                        <Link to="/offer" style={{ textDecoration: 'none' }}>
                            <Box sx={{
                                display: 'flex', alignItems: 'center', gap: '6px',
                                color: '#a855f7', fontSize: '13px', fontWeight: 600,
                                background: 'rgba(168,85,247,0.08)',
                                backdropFilter: 'blur(12px)',
                                border: '1px solid rgba(168,85,247,0.3)',
                                borderRadius: '20px', px: '12px', py: '6px',
                                cursor: 'pointer',
                                transition: 'all 0.25s ease',
                                '&:hover': {
                                    background: 'rgba(168,85,247,0.16)',
                                    borderColor: '#a855f7',
                                },
                            }}>
                                {t('SERVICES_TITLE')} <FaArrowRight size={10} />
                            </Box>
                        </Link>
                    </Stack>

                    {/* Divider */}
                    <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.07)', mb: '18px' }} />

                    {/* Social Links */}
                    <Stack flexDirection={'row'} gap={'16px'} alignItems={'center'} flexWrap={'wrap'}>
                        <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', fontWeight: 500 }}>
                            {t("FOLLOW_ME")}
                        </Typography>

                        {[
                            { icon: <FaGithub size={18} />,    href: "https://github.com/sadriddinovtohir" },
                            { icon: <FaTelegram size={18} />,  href: "https://t.me/tohir_sadriddinov" },
                            { icon: <FaLinkedin size={18} />,  href: 'https://www.linkedin.com/in/tohirbek-sadriddinov-dev/' },
                            { icon: <FaInstagram size={18} />, href: 'https://www.instagram.com/tohirbek_sadriddinov/' },
                            { icon: <FaPlay size={18} />,      href: 'https://vercel.com/sadriddinovtohirs-projects' },
                        ].map((item, i) => (
                            <Box
                                key={i}
                                component="a"
                                href={item.href}
                                target='_blank'
                                rel='noreferrer'
                                sx={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    width: { xs: 34, md: 38 }, height: { xs: 34, md: 38 },
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
                            </Box>
                        ))}
                    </Stack>
                </Stack>

                {/* RIGHT — Profile Image */}
                <Box sx={{
                    position: 'relative',
                    flexShrink: 0,
                    mx: { xs: 'auto', md: 0 },
                }}>
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
                        maxWidth: '100%',
                        aspectRatio: '467/420',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(4px)',
                    }}>
                        <img
                            src={profileImg}
                            alt='Tohirbek Sadriddinov'
                            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                        />
                    </Box>
                </Box>
            </Stack>

            {/* === Stats Row === */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
                gap: { xs: 1.5, md: 2 },
                mb: '48px',
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

            {/* === Tech Stack === */}
            <Box sx={{ mb: '56px' }}>
                <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} mb={'20px'} flexWrap={'wrap'} gap={'10px'}>
                    <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: { xs: '18px', md: '22px' }, color: '#fff', mb: '2px' }}>
                            {t('SKILLS_TITLE')}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
                            {t('SKILLS_SUBTITLE')}
                        </Typography>
                    </Box>
                    <Link to="/skills" style={{ textDecoration: 'none' }}>
                        <Box sx={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            color: '#a855f7', fontSize: '13px', fontWeight: 600,
                            border: '1px solid rgba(168,85,247,0.3)',
                            borderRadius: '20px', px: '14px', py: '6px',
                            cursor: 'pointer', transition: 'all 0.25s ease',
                            '&:hover': { background: 'rgba(168,85,247,0.08)', borderColor: '#a855f7' },
                        }}>
                            View all <FaArrowRight size={11} />
                        </Box>
                    </Link>
                </Stack>

                <Stack flexDirection={'row'} flexWrap={'wrap'} gap={'10px'}>
                    {techStack.map((tech) => (
                        <Box
                            key={tech.name}
                            sx={{
                                display: 'flex', alignItems: 'center', gap: '8px',
                                px: '14px', py: '8px',
                                background: 'rgba(255,255,255,0.04)',
                                border: `1px solid ${tech.color}25`,
                                borderRadius: '12px',
                                color: tech.color,
                                fontSize: '13px', fontWeight: 500,
                                transition: 'all 0.25s ease',
                                cursor: 'default',
                                '&:hover': {
                                    background: `${tech.color}12`,
                                    borderColor: `${tech.color}55`,
                                    transform: 'translateY(-2px)',
                                    boxShadow: `0 6px 18px ${tech.color}18`,
                                },
                            }}
                        >
                            {tech.icon}
                            <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', fontWeight: 500 }}>
                                {tech.name}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            </Box>

            {/* === Projects Section === */}
            <Box sx={{ mb: '60px' }}>
                <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} mb={'24px'} flexWrap={'wrap'} gap={'12px'}>
                    <Box>
                        <Typography sx={{
                            fontWeight: 800,
                            fontSize: { xs: '22px', md: '28px' },
                            color: '#ff4d6d',
                            letterSpacing: '1px',
                            mb: '4px',
                        }}>
                            {t('PROJECTS_TITLE')}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>
                            {t('PROJECTS_SUBTITLE')}
                        </Typography>
                    </Box>
                    <Link to="/projects" style={{ textDecoration: 'none' }}>
                        <Box sx={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            color: '#ff4d6d', fontSize: '13px', fontWeight: 600,
                            border: '1px solid rgba(255,77,109,0.3)',
                            borderRadius: '20px', px: '14px', py: '6px',
                            cursor: 'pointer', transition: 'all 0.25s ease',
                            '&:hover': { background: 'rgba(255,77,109,0.08)', borderColor: '#ff4d6d' },
                        }}>
                            View all <FaArrowRight size={11} />
                        </Box>
                    </Link>
                </Stack>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
                    gap: '24px',
                    justifyItems: 'center',
                }}>
                    {projectsData.map((item, index) => (
                        <CustomCard
                            key={index}
                            img={item.img}
                            title={t(item.titleKey)}
                            desc={t(item.descKey)}
                            tech={t(item.techKey, { returnObjects: true })}
                            link={item.link}
                            giturl={item.giturl}
                            badge={item.badge}
                        />
                    ))}
                </Box>
            </Box>

        </div>
    )
}
