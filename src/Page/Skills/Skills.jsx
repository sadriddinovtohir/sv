import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { skillCategoryData } from '../../data/skillsData'

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
