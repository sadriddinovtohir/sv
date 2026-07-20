import { useTranslation } from 'react-i18next'
import { skillCategoryData } from '../../data/skillsData'
import { GlassPanel } from '@/components/common/GlassPanel'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Progress } from '@/components/ui/progress'

import { FaHtml5, FaJs, FaReact, FaGithub } from 'react-icons/fa'
import {
    SiTailwindcss, SiNextdotjs, SiTypescript, SiRedux,
    SiReactquery, SiVercel, SiShadcnui, SiAntdesign, SiMui, SiOpenai,
} from 'react-icons/si'
import {
    MdDeveloperMode, MdRocketLaunch, MdAutoAwesome,
    MdHub, MdAccountTree, MdSmartToy, MdSecurity, MdVerifiedUser,
} from 'react-icons/md'
import { SiPostgresql, SiPrisma, SiRedis, SiSwagger, SiDocker, SiExpress } from 'react-icons/si'
import { TbBrandNodejs, TbShieldLock } from 'react-icons/tb'

const skillIcons = {
    'HTML5':                   <FaHtml5 size={28} />,
    'CSS / Tailwind':          <SiTailwindcss size={28} />,
    'JavaScript':              <FaJs size={28} />,
    'TypeScript':              <SiTypescript size={28} />,
    'React':                   <FaReact size={28} />,
    'Next.js':                 <SiNextdotjs size={28} />,
    'Redux / Zustand':         <SiRedux size={28} />,
    'TanStack Query':          <SiReactquery size={28} />,
    'Shadcn UI':               <SiShadcnui size={28} />,
    'Ant Design':              <SiAntdesign size={28} />,
    'Material UI':             <SiMui size={28} />,
    'Claude AI':               <MdAutoAwesome size={28} />,
    'Codex AI':                <SiOpenai size={28} />,
    'GitHub Copilot':          <MdSmartToy size={28} />,
    'Node.js':                 <TbBrandNodejs size={28} />,
    'Express.js':              <SiExpress size={28} />,
    'PostgreSQL':              <SiPostgresql size={28} />,
    'Prisma ORM':              <SiPrisma size={28} />,
    'Redis':                   <SiRedis size={28} />,
    'JWT / Argon2':            <TbShieldLock size={28} />,
    'Zod':                     <MdVerifiedUser size={28} />,
    'Swagger':                 <SiSwagger size={28} />,
    'Docker':                  <SiDocker size={28} />,
    'Rate Limiting / Helmet':  <MdSecurity size={28} />,
    'File Structure':          <MdAccountTree size={28} />,
    'Networking / REST':       <MdHub size={28} />,
    'DOM Manipulation':        <MdDeveloperMode size={28} />,
    'SaaS Development':        <MdRocketLaunch size={28} />,
    'Git / GitHub':            <FaGithub size={28} />,
    'Vercel / Netlify':        <SiVercel size={28} />,
}

const skillCategoryKeys = skillCategoryData.map((cat) => ({
    ...cat,
    skills: cat.skills.map((s) => ({ ...s, icon: skillIcons[s.name] })),
}))

function SkillCard({ skill, accent }) {
    const { t } = useTranslation()
    return (
        <GlassPanel
            accent={accent}
            hover
            className="flex w-full animate-[fadeInUp_0.45s_ease_forwards] cursor-default flex-col items-center gap-2.5 rounded-[18px] px-3 pt-5 pb-4"
        >
            <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] border"
                style={{
                    background: `linear-gradient(135deg, ${accent}28, ${accent}10)`,
                    color: accent,
                    borderColor: `${accent}30`,
                    boxShadow: `0 4px 14px ${accent}18`,
                }}
            >
                {skill.icon}
            </div>

            <p className="text-center text-[11px] leading-[1.35] font-semibold text-[#e4e4e7] md:text-[12.5px]">
                {skill.name}
            </p>

            <div className="w-full">
                <div className="mb-1 flex justify-between">
                    <span className="text-[9px] font-medium text-white/30">
                        {t('SKILL_PROFICIENCY')}
                    </span>
                    <span className="text-[9px] font-semibold" style={{ color: accent }}>
                        {skill.level}%
                    </span>
                </div>
                <Progress
                    value={skill.level}
                    className="h-[3px] bg-white/7"
                    indicatorClassName="bg-none"
                    indicatorStyle={{ background: `linear-gradient(90deg, ${accent}, ${accent}70)` }}
                />
            </div>
        </GlassPanel>
    )
}

export default function Skills() {
    const { t } = useTranslation()

    const skillCategories = skillCategoryKeys.map((cat) => ({
        ...cat,
        label: t(cat.labelKey),
    }))

    return (
        <div className="mx-auto max-w-[1160px] px-0 py-6 md:py-9">

            {/* Page Title */}
            <div className="mb-8 text-center md:mb-12">
                <SectionHeading
                    className="mb-1 items-center"
                    title={t('SKILLS_TITLE')}
                    subtitle={t('SKILLS_SUBTITLE')}
                    gradient
                    titleClassName="text-[28px] md:text-[38px] tracking-tight"
                />
            </div>

            {/* Skill Categories */}
            {skillCategories.map((category) => (
                <div key={category.labelKey} className="mb-8 md:mb-10">

                    {/* Category Header */}
                    <div className="mb-4 flex items-center gap-3 md:mb-5">
                        <span
                            className="h-5.5 w-[3px] shrink-0 rounded"
                            style={{ background: category.accent, boxShadow: `0 0 12px ${category.accent}80` }}
                        />
                        <p className="text-[13px] font-bold tracking-wide text-white md:text-[15px]">
                            {category.label}
                        </p>
                        <span className="h-px flex-1 bg-white/6" />
                        <span
                            className="shrink-0 text-[10px] font-semibold opacity-75"
                            style={{ color: category.accent }}
                        >
                            {t('SKILL_COUNT', { count: category.skills.length })}
                        </span>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-2 justify-center gap-3 md:grid-cols-4 md:gap-4">
                        {category.skills.map((skill) => (
                            <SkillCard key={skill.name} skill={skill} accent={category.accent} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
