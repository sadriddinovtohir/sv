import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'

import { FaHtml5, FaJs, FaReact, FaGithub } from 'react-icons/fa'
import {
    SiTailwindcss, SiNextdotjs, SiTypescript, SiRedux,
    SiReactquery, SiVercel, SiShadcnui, SiAntdesign, SiMui, SiOpenai,
} from 'react-icons/si'
import {
    MdDeveloperMode, MdRocketLaunch, MdAutoAwesome,
    MdHub, MdAccountTree, MdSmartToy, MdSecurity, MdVerifiedUser,
} from 'react-icons/md'
import { SiPostgresql, SiPrisma, SiRedis, SiJsonwebtokens, SiSwagger, SiDocker, SiExpress } from 'react-icons/si'
import { TbBrandNodejs, TbShieldLock } from 'react-icons/tb'

const skillCategoryKeys = [
    {
        labelKey: 'SKILL_CAT_FRONTEND_CORE',
        accent: '#ff2d55',
        skills: [
            { name: 'HTML5',        icon: <FaHtml5 size={28} />,       level: 95 },
            { name: 'CSS / Tailwind', icon: <SiTailwindcss size={28} />, level: 90 },
            { name: 'JavaScript',   icon: <FaJs size={28} />,           level: 87 },
            { name: 'TypeScript',   icon: <SiTypescript size={28} />,   level: 78 },
        ],
    },
    {
        labelKey: 'SKILL_CAT_FRAMEWORKS',
        accent: '#38bdf8',
        skills: [
            { name: 'React',          icon: <FaReact size={28} />,       level: 92 },
            { name: 'Next.js',        icon: <SiNextdotjs size={28} />,   level: 82 },
            { name: 'Redux / Zustand', icon: <SiRedux size={28} />,      level: 80 },
            { name: 'TanStack Query', icon: <SiReactquery size={28} />,  level: 84 },
        ],
    },
    {
        labelKey: 'SKILL_CAT_UI_LIBRARIES',
        accent: '#a855f7',
        skills: [
            { name: 'Shadcn UI',    icon: <SiShadcnui size={28} />,    level: 86 },
            { name: 'Ant Design',   icon: <SiAntdesign size={28} />,   level: 80 },
            { name: 'Material UI',  icon: <SiMui size={28} />,         level: 85 },
        ],
    },
    {
        labelKey: 'SKILL_CAT_AI_TOOLS',
        accent: '#22c55e',
        skills: [
            { name: 'Claude AI',       icon: <MdAutoAwesome size={28} />, level: 86 },
            { name: 'Codex AI',        icon: <SiOpenai size={28} />,      level: 80 },
            { name: 'GitHub Copilot',  icon: <MdSmartToy size={28} />,    level: 82 },
        ],
    },
    {
        labelKey: 'SKILL_CAT_AI_BACKEND',
        accent: '#06b6d4',
        skills: [
            { name: 'Node.js',      icon: <TbBrandNodejs size={28} />,   level: 82 },
            { name: 'Express.js',   icon: <SiExpress size={28} />,       level: 80 },
            { name: 'PostgreSQL',   icon: <SiPostgresql size={28} />,    level: 76 },
            { name: 'Prisma ORM',   icon: <SiPrisma size={28} />,        level: 78 },
            { name: 'Redis',        icon: <SiRedis size={28} />,         level: 74 },
            { name: 'JWT / Argon2', icon: <TbShieldLock size={28} />,    level: 80 },
            { name: 'Zod',          icon: <MdVerifiedUser size={28} />,  level: 82 },
            { name: 'Swagger',      icon: <SiSwagger size={28} />,       level: 78 },
            { name: 'Docker',       icon: <SiDocker size={28} />,        level: 74 },
            { name: 'Rate Limiting / Helmet', icon: <MdSecurity size={28} />, level: 76 },
        ],
    },
    {
        labelKey: 'SKILL_CAT_ARCHITECTURE',
        accent: '#f59e0b',
        skills: [
            { name: 'File Structure',    icon: <MdAccountTree size={28} />,  level: 88 },
            { name: 'Networking / REST', icon: <MdHub size={28} />,          level: 82 },
            { name: 'DOM Manipulation',  icon: <MdDeveloperMode size={28} />, level: 88 },
            { name: 'SaaS Development',  icon: <MdRocketLaunch size={28} />,  level: 76 },
            { name: 'Git / GitHub',      icon: <FaGithub size={28} />,        level: 88 },
            { name: 'Vercel / Netlify',  icon: <SiVercel size={28} />,        level: 85 },
        ],
    },
]

const CardWrapper = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'accentcolor',
})(({ accentcolor }) => ({
    background: 'rgba(255, 255, 255, 0.04)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.07)',
    borderRadius: '18px',
    padding: '20px 12px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    transition: 'all 0.3s ease',
    cursor: 'default',
    width: '100%',
    animation: 'fadeInUp 0.45s ease forwards',
    '&:hover': {
        transform: 'translateY(-6px)',
        borderColor: accentcolor + '55',
        boxShadow: `0 14px 36px ${accentcolor}20`,
        background: 'rgba(255, 255, 255, 0.07)',
    },
}))

const IconBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'accentcolor',
})(({ accentcolor }) => ({
    width: 56,
    height: 56,
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(135deg, ${accentcolor}28, ${accentcolor}10)`,
    color: accentcolor,
    border: `1px solid ${accentcolor}30`,
    boxShadow: `0 4px 14px ${accentcolor}18`,
    flexShrink: 0,
}))

const ProgressBar = styled(Box)({
    width: '100%',
    height: 3,
    background: 'rgba(255,255,255,0.07)',
    borderRadius: 4,
    overflow: 'hidden',
})

const ProgressFill = styled(Box, {
    shouldForwardProp: (prop) => !['level', 'accentcolor'].includes(prop),
})(({ level, accentcolor }) => ({
    height: '100%',
    width: `${level}%`,
    background: `linear-gradient(90deg, ${accentcolor}, ${accentcolor}70)`,
    borderRadius: 4,
}))

function SkillCard({ skill, accent }) {
    const { t } = useTranslation()
    return (
        <CardWrapper accentcolor={accent}>
            <IconBox accentcolor={accent}>{skill.icon}</IconBox>

            <Typography sx={{
                color: '#e4e4e7',
                fontSize: { xs: '11px', md: '12.5px' },
                fontWeight: 600,
                textAlign: 'center',
                lineHeight: 1.35,
            }}>
                {skill.name}
            </Typography>

            <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography sx={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
                        {t('SKILL_PROFICIENCY')}
                    </Typography>
                    <Typography sx={{ fontSize: '9px', color: accent, fontWeight: 600 }}>
                        {skill.level}%
                    </Typography>
                </Box>
                <ProgressBar>
                    <ProgressFill level={skill.level} accentcolor={accent} />
                </ProgressBar>
            </Box>
        </CardWrapper>
    )
}

export default function Skills() {
    const { t } = useTranslation()

    const skillCategories = skillCategoryKeys.map((cat) => ({
        ...cat,
        label: t(cat.labelKey),
    }))

    return (
        <Box sx={{ px: { xs: '0', md: '0' }, py: { xs: '24px', md: '36px' }, maxWidth: 1160, mx: 'auto' }}>

            {/* Page Title */}
            <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
                <Typography sx={{
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #ff2d55 0%, #ff7b7b 60%, #ffaaaa 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: { xs: '28px', md: '38px' },
                    letterSpacing: '-0.5px',
                    lineHeight: 1.15,
                    mb: 1,
                }}>
                    {t('SKILLS_TITLE')}
                </Typography>
                <Typography sx={{
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: { xs: '13px', md: '15px' },
                    fontWeight: 400,
                }}>
                    {t('SKILLS_SUBTITLE')}
                </Typography>
            </Box>

            {/* Skill Categories */}
            {skillCategories.map((category) => (
                <Box key={category.labelKey} sx={{ mb: { xs: 4, md: 5 } }}>

                    {/* Category Header */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: { xs: 2, md: 2.5 } }}>
                        <Box sx={{
                            width: 3,
                            height: 22,
                            borderRadius: 4,
                            background: category.accent,
                            boxShadow: `0 0 12px ${category.accent}80`,
                            flexShrink: 0,
                        }} />
                        <Typography sx={{
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: { xs: '13px', md: '15px' },
                            letterSpacing: '0.2px',
                        }}>
                            {category.label}
                        </Typography>
                        <Box sx={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
                        <Typography sx={{
                            fontSize: '10px',
                            color: category.accent,
                            fontWeight: 600,
                            opacity: 0.75,
                            flexShrink: 0,
                        }}>
                            {t('SKILL_COUNT', { count: category.skills.length })}
                        </Typography>
                    </Box>

                    {/* Cards Grid */}
                    <Grid container spacing={{ xs: 1.5, md: 2 }} justifyContent="center">
                        {category.skills.map((skill) => (
                            <Grid item xs={6} md={3} key={skill.name}>
                                <SkillCard skill={skill} accent={category.accent} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            ))}
        </Box>
    )
}
