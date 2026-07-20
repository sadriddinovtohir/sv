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
import profileImg from '../../assets/img/homePage.webp'
import { Link } from 'react-router-dom'
import { totalSkillsCount } from '../../data/skillsData'
import { Pill } from '@/components/common/Pill'
import { StatTile } from '@/components/common/StatTile'
import { SocialIconLink } from '@/components/common/SocialIconLink'

const PROJECTS_COUNT = 7

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

const SOCIALS = [
    { icon: <FaGithub size={18} />,    href: "https://github.com/sadriddinovtohir" },
    { icon: <FaTelegram size={18} />,  href: "https://t.me/tohir_sadriddinov" },
    { icon: <FaLinkedin size={18} />,  href: 'https://www.linkedin.com/in/tohirbek-sadriddinov-dev/' },
    { icon: <FaInstagram size={18} />, href: 'https://www.instagram.com/tohirbek_sadriddinov/' },
    { icon: <FaPlay size={18} />,      href: 'https://vercel.com/sadriddinovtohirs-projects' },
]

export default function Home() {
    const { t } = useTranslation()

    const stats = [
        { value: '1+',                    label: t('STAT_YEARS_EXP'),    accent: '#ff2d55' },
        { value: `${PROJECTS_COUNT}`,     label: t('STAT_PROJECTS'),     accent: '#38bdf8' },
        { value: `${totalSkillsCount}`,   label: t('STAT_TECHNOLOGIES'), accent: '#a855f7' },
        { value: '∞',                     label: t('STAT_CURIOSITY'),    accent: '#22c55e' },
    ]

    return (
        <div className='container'>

            {/* === Hero Section === */}
            <div className="mt-12.5 mb-5 flex flex-col flex-wrap items-center justify-between gap-10 md:flex-row">
                {/* LEFT */}
                <div className="w-full min-w-0 flex-1 md:max-w-[530px]">

                    <h1 className="my-3 text-[28px] font-extrabold tracking-tight text-white md:text-[38px]">
                        {t("HI")}
                    </h1>

                    <h2 className="mb-3.5 bg-gradient-to-br from-accent to-[#ff7b7b] bg-clip-text text-[18px] font-extrabold text-transparent md:text-2xl">
                        {t("FRONTEND_DEVELOPER")}
                    </h2>

                    <p className="mb-5.5 text-[13px] leading-[1.75] text-white/60 md:text-[15px]">
                        {t("I")}
                    </p>

                    {/* Location & Available */}
                    <div className="mb-6.5 flex flex-wrap items-center gap-4">
                        <Pill
                            as="a"
                            href="https://www.google.com/maps/place/Najot+Ta'lim+Chilonzor+Filial/@41.2856679,69.199098,1047m/data=!3m1!1e3!4m6!3m5!1s0x38ae8ba578f4f58d:0xd7a2ecf23413b7a0!8m2!3d41.2857626!4d69.2036637!16s%2Fg%2F11nms27h2f?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D"
                            target="_blank"
                            rel="noreferrer"
                            hover
                            icon={<CiLocationOn size={15} />}
                        >
                            {t("Loaction")}
                        </Pill>

                        <Pill accent="#22c55e" dot>
                            {t("Now")}
                        </Pill>

                        <Pill as={Link} to="/offer" accent="#a855f7" hover>
                            {t('SERVICES_TITLE')} <FaArrowRight size={10} />
                        </Pill>
                    </div>

                    {/* Divider */}
                    <div className="mb-4.5 border-t border-white/7" />

                    {/* Social Links */}
                    <div className="flex flex-wrap items-center gap-4">
                        <span className="text-xs font-medium text-white/35">
                            {t("FOLLOW_ME")}
                        </span>

                        {SOCIALS.map((item, i) => (
                            <SocialIconLink key={i} icon={item.icon} href={item.href} size="sm" />
                        ))}
                    </div>
                </div>

                {/* RIGHT — Profile Image */}
                <div className="relative mx-auto shrink-0 md:mx-0">
                    <div className="absolute -inset-5 z-0 rounded-full bg-[radial-gradient(circle,rgba(192,16,58,0.35)_0%,transparent_70%)] blur-[30px]" />
                    <div className="relative z-1 aspect-[467/420] w-[220px] max-w-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur-[4px] sm:w-[280px] md:w-[320px]">
                        <img
                            src={profileImg}
                            alt='Tohirbek Sadriddinov'
                            className="block h-full w-full object-contain"
                        />
                    </div>
                </div>
            </div>

            {/* === Stats Row === */}
            <div className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
                {stats.map((stat) => (
                    <StatTile key={stat.label} value={stat.value} label={stat.label} accent={stat.accent} />
                ))}
            </div>

            {/* === Tech Stack === */}
            <div className="mb-14">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-2.5">
                    <div>
                        <p className="mb-0.5 text-[18px] font-bold text-white md:text-[22px]">
                            {t('SKILLS_TITLE')}
                        </p>
                        <p className="text-[13px] text-white/40">
                            {t('SKILLS_SUBTITLE')}
                        </p>
                    </div>
                    <Pill as={Link} to="/skills" accent="#a855f7" hover>
                        View all <FaArrowRight size={11} />
                    </Pill>
                </div>

                <div className="flex flex-row flex-wrap gap-2.5">
                    {techStack.map((tech) => (
                        <div
                            key={tech.name}
                            style={{ '--accent': tech.color }}
                            className="flex items-center gap-2 rounded-xl border border-(--accent)/25 bg-white/4 px-3.5 py-2 text-[13px] font-medium text-(--accent) transition-all duration-250 hover:-translate-y-0.5 hover:border-(--accent)/55 hover:bg-(--accent)/12 hover:shadow-[0_6px_18px_var(--accent)]"
                        >
                            {tech.icon}
                            <span className="text-[13px] font-medium text-white/75">{tech.name}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}
