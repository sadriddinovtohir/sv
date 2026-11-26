import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { CiLocationOn } from 'react-icons/ci'
import { FaArrowRight, FaPlay, FaTelegram } from 'react-icons/fa'
import { FaGithub, FaGitlab, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { FaJs, FaReact } from 'react-icons/fa'
import {
    SiTailwindcss, SiNextdotjs, SiTypescript, SiExpress, SiPrisma, SiMongodb,
    SiReactquery, SiDocker, SiPostgresql, SiRedis,
} from 'react-icons/si'
import { TbBrandNodejs, TbBrandReactNative } from 'react-icons/tb'
import profileImg from '../../assets/img/homePage.webp'
import { Link } from 'react-router-dom'
import { totalSkillsCount } from '../../data/skillsData'
import { PROJECTS } from '../Projects/projectsData'
import { Pill } from '@/components/common/Pill'
import { StatTile } from '@/components/common/StatTile'
import { SocialIconLink } from '@/components/common/SocialIconLink'
import { Seo } from '@/components/common/Seo'
import { useReveal } from '@/hooks/useReveal'
// Below the fold, so it is split out of the landing page's critical chunk.
const GitHubStats = lazy(() => import('@/components/GitHubStats/GitHubStats'))

const techStack = [
    { icon: <FaJs size={22} />,               name: 'JavaScript',   color: '#f7df1e' },
    { icon: <SiTypescript size={22} />,       name: 'TypeScript',   color: '#3178c6' },
    { icon: <FaReact size={22} />,            name: 'React',        color: '#61dafb' },
    { icon: <SiNextdotjs size={22} />,        name: 'Next.js',      color: 'var(--color-white)' },
    { icon: <TbBrandReactNative size={22} />, name: 'React Native', color: '#61dafb' },
    { icon: <SiReactquery size={22} />,       name: 'TanStack',     color: '#ff4154' },
    { icon: <SiTailwindcss size={22} />,      name: 'Tailwind',     color: '#38bdf8' },
    { icon: <TbBrandNodejs size={22} />,      name: 'Node.js',      color: '#68a063' },
    { icon: <SiExpress size={22} />,          name: 'Express',      color: 'var(--color-white)' },
    { icon: <SiPostgresql size={22} />,       name: 'PostgreSQL',   color: '#336791' },
    { icon: <SiPrisma size={22} />,           name: 'Prisma',       color: '#5a67d8' },
    { icon: <SiMongodb size={22} />,          name: 'MongoDB',      color: '#47a248' },
    { icon: <SiRedis size={22} />,            name: 'Redis',        color: '#dc382d' },
    { icon: <SiDocker size={22} />,           name: 'Docker',       color: '#2496ed' },
    { icon: <FaGitlab size={22} />,           name: 'GitLab',       color: '#fc6d26' },
]

// Chips placed on the orbit ring (top / right / bottom / left).
const ORBIT = [
    { icon: <FaReact size={18} />,       color: '#61dafb', pos: 'top-0 left-1/2' },
    { icon: <TbBrandNodejs size={18} />, color: '#68a063', pos: 'top-1/2 left-full' },
    { icon: <SiTypescript size={16} />,  color: '#3178c6', pos: 'top-full left-1/2' },
    { icon: <SiPostgresql size={17} />,  color: '#ffb547', pos: 'top-1/2 left-0' },
]

const SOCIALS = [
    { icon: <FaGithub size={18} />,    href: 'https://github.com/sadriddinovtohir',                     label: 'GitHub' },
    { icon: <FaGitlab size={18} />,    href: 'https://gitlab.com/sadriddinovtohir',                     label: 'GitLab' },
    { icon: <FaTelegram size={18} />,  href: 'https://t.me/tohir_sadriddinov',                          label: 'Telegram' },
    { icon: <FaLinkedin size={18} />,  href: 'https://www.linkedin.com/in/tohirbek-sadriddinov-dev/',    label: 'LinkedIn' },
    { icon: <FaInstagram size={18} />, href: 'https://www.instagram.com/tohirbek_sadriddinov/',         label: 'Instagram' },
    { icon: <FaPlay size={18} />,      href: 'https://vercel.com/sadriddinovtohirs-projects',           label: 'Vercel' },
]

// Infinite marquee: the list is rendered twice and the track slides by exactly
// half its width, so the loop is seamless. Only `transform` animates.
// `hidden` hides the whole row from screen readers (it repeats row one).
function MarqueeRow({ items, reverse = false, hidden = false }) {
    return (
        <div className="marquee -mx-3 overflow-hidden py-1.5" aria-hidden={hidden || undefined}>
            <ul className={`marquee-track flex w-max gap-3 px-3 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
                {[...items, ...items].map((tech, i) => (
                    <li
                        key={`${tech.name}-${i}`}
                        aria-hidden={i >= items.length || undefined}
                        style={{ '--accent': tech.color }}
                        className="flex shrink-0 items-center gap-2 rounded-xl border border-(--accent)/25 bg-white/4 px-4 py-2.5 text-(--accent) tone-text transition-[translate,background-color,border-color,box-shadow] duration-250 hover:-translate-y-0.5 hover:border-(--accent)/60 hover:bg-(--accent)/12 hover:shadow-[0_0_18px_-4px_var(--accent)]"
                    >
                        <span aria-hidden="true" className="flex">{tech.icon}</span>
                        <span className="text-[13px] font-semibold text-white/80">{tech.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default function Home() {
    const { t } = useTranslation()
    const marqueeRef = useReveal()
    const headRef = useReveal()

    const stats = [
        { value: '2+',                  label: t('STAT_YEARS_EXP'),    accent: '#5b85ff' },
        { value: `${PROJECTS.length}+`,   label: t('STAT_PROJECTS'),     accent: '#2ee6a6' },
        { value: `${totalSkillsCount}`,   label: t('STAT_TECHNOLOGIES'), accent: '#ffb547' },
        { value: '∞',                     label: t('STAT_CURIOSITY'),    accent: '#a3e635' },
    ]

    return (
        <div>
            <Seo description={t('I')} />

            {/* === Hero Section === */}
            <section className="mt-12 mb-14 flex flex-col-reverse items-center justify-between gap-10 md:mt-14 md:flex-row md:gap-12">
                {/* LEFT */}
                <div className="stagger w-full min-w-0 flex-1 md:max-w-[560px]">

                    <Pill accent="#2ee6a6" dot className="mb-4">
                        {t("Now")}
                    </Pill>

                    {/* Name and role share the h1 so the page's main heading
                        carries both — that's what search engines key on. */}
                    <h1 className="mb-4 font-extrabold tracking-tight">
                        <span className="block text-[clamp(1.75rem,1.2rem+2.6vw,3rem)] leading-[1.1] text-white">
                            {t("HI")}
                        </span>
                        <span className="text-aurora text-flow mt-1 block text-[clamp(1.35rem,1rem+1.8vw,2.25rem)] leading-tight">
                            {t("ROLE_TITLE")}
                        </span>
                    </h1>

                    <p className="mb-6 text-[clamp(0.85rem,0.8rem+0.3vw,1rem)] leading-[1.75] text-white/60">
                        {t("I")}
                    </p>

                    {/* CTAs */}
                    <div className="mb-6 flex flex-wrap gap-3">
                        <Link
                            to="/projects"
                            className="shine group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-primary to-accent px-5 py-2.5 text-sm font-bold text-ink shadow-[0_8px_24px_-6px_rgba(61,107,255,0.7)] transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-6px_rgba(46,230,166,0.7)]"
                        >
                            {t('NAV_PROJECTS')}
                            <FaArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition-colors duration-300 hover:border-accent/60 hover:text-white"
                        >
                            {t('NAV_CONTACT')}
                        </Link>
                    </div>

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

                        <Pill as={Link} to="/offer" accent="#ffb547" hover>
                            {t('SERVICES_TITLE')} <FaArrowRight size={10} />
                        </Pill>
                    </div>

                    {/* Divider */}
                    <div className="mb-4.5 border-t border-white/7" />

                    {/* Social Links */}
                    <div className="flex flex-wrap items-center gap-4">
                        <span className="text-xs font-medium text-white/60">
                            {t("FOLLOW_ME")}
                        </span>

                        {SOCIALS.map((item) => (
                            <SocialIconLink key={item.label} icon={item.icon} href={item.href} aria-label={item.label} size="sm" />
                        ))}
                    </div>
                </div>

                {/* RIGHT — Profile Image */}
                <div className="float relative mx-auto shrink-0 md:mx-0">
                    {/* Soft glow — a plain radial gradient, no blur filter needed. */}
                    <div className="absolute -inset-10 z-0 rounded-full bg-[radial-gradient(circle,rgba(61,107,255,0.38)_0%,rgba(46,230,166,0.12)_45%,transparent_70%)]" />

                    {/* Orbiting tech chips */}
                    <div aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 z-0 aspect-square w-[calc(100%+48px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/12 sm:w-[calc(100%+64px)]" />
                    <div aria-hidden="true" className="orbit pointer-events-none absolute top-1/2 left-1/2 z-2 aspect-square w-[calc(100%+48px)] -translate-x-1/2 -translate-y-1/2 rounded-full sm:w-[calc(100%+64px)]">
                        {ORBIT.map(({ icon, color, pos }) => (
                            <span key={color + pos} className={`absolute ${pos} -translate-x-1/2 -translate-y-1/2`}>
                                <span
                                    className="orbit-counter flex size-9 items-center justify-center rounded-full border bg-popover/90 shadow-[0_6px_18px_rgba(0,0,0,0.45)] sm:size-10"
                                    style={{ color, borderColor: `${color}55`, boxShadow: `0 0 16px ${color}40` }}
                                >
                                    {icon}
                                </span>
                            </span>
                        ))}
                    </div>
                    {/* Rotating gradient border: a spinning conic layer clipped to a 2px frame. */}
                    <div className="relative z-1 overflow-hidden rounded-[28px] p-[2px]">
                        <div className="ring-spin absolute top-1/2 left-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2" />
                        <div className="relative aspect-[467/420] w-[230px] max-w-full overflow-hidden rounded-[26px] bg-background sm:w-[290px] md:w-[340px]">
                            <img
                                src={profileImg}
                                alt='Tohirbek Sadriddinov'
                                width="467"
                                height="420"
                                fetchPriority="high"
                                decoding="async"
                                className="block h-full w-full object-contain"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* === Stats Row === */}
            <div className="mb-14 grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
                {stats.map((stat) => (
                    <StatTile key={stat.label} value={stat.value} label={stat.label} accent={stat.accent} />
                ))}
            </div>

            {/* === Tech Stack === */}
            <div className="mb-14">
                <div ref={headRef} data-reveal="" data-reveal-variant="left" className="mb-5 flex flex-wrap items-center justify-between gap-2.5">
                    <div>
                        <p className="mb-0.5 text-[18px] font-bold text-white md:text-[22px]">
                            {t('SKILLS_TITLE')}
                        </p>
                        <span aria-hidden="true" className="heading-bar mb-1.5" />
                        <p className="text-[13px] text-white/60">
                            {t('SKILLS_SUBTITLE')}
                        </p>
                    </div>
                    <Pill as={Link} to="/skills" accent="#2ee6a6" hover>
                        View all <FaArrowRight size={11} />
                    </Pill>
                </div>

                {/* Infinite marquee: the list is rendered twice and the track
                    slides by exactly half its width, so the loop is seamless.
                    Only `transform` animates, which stays on the compositor. */}
                <div ref={marqueeRef} data-reveal="" data-reveal-variant="blur" className="flex flex-col gap-3">
                    <MarqueeRow items={techStack} />
                    {/* Second row runs the other way, starting from the middle of the list. */}
                    <MarqueeRow items={[...techStack.slice(7), ...techStack.slice(0, 7)]} reverse hidden />
                </div>
            </div>

            {/* === Live GitHub activity === */}
            <Suspense fallback={<div className="mb-14 min-h-[320px]" />}>
                <GitHubStats />
            </Suspense>

        </div>
    )
}
