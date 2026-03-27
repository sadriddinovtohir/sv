import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { FaHtml5, FaJs, FaReact, FaGithub } from 'react-icons/fa'
import { SiTailwindcss, SiNextdotjs, SiTypescript, SiRedux, SiReactquery, SiVercel, SiShadcnui, SiAntdesign, SiMui } from 'react-icons/si'
import { MdDeveloperMode, MdRocketLaunch } from 'react-icons/md'

const skills = [
    { name: 'HTML5', icon: <FaHtml5 size={36} /> },
    { name: 'CSS / Tailwind', icon: <SiTailwindcss size={36} /> },
    { name: 'JavaScript', icon: <FaJs size={36} /> },
    { name: 'React', icon: <FaReact size={36} /> },
    { name: 'Next.js', icon: <SiNextdotjs size={36} /> },
    { name: 'TypeScript', icon: <SiTypescript size={36} /> },
    { name: 'Redux / Zustand', icon: <SiRedux size={36} /> },
    { name: 'TanStack Query', icon: <SiReactquery size={36} /> },
    { name: 'Git / GitHub', icon: <FaGithub size={36} /> },
    { name: 'Vercel / Netlify', icon: <SiVercel size={36} /> },
    { name: 'Shadcn UI', icon: <SiShadcnui size={36} /> },
    { name: 'Ant Design', icon: <SiAntdesign size={36} /> },
    { name: 'Material UI', icon: <SiMui size={36} /> },
    { name: 'DOM Manipulyatsiyasi', icon: <MdDeveloperMode size={36} /> },
    { name: 'SaaS Ishlab chiqish', icon: <MdRocketLaunch size={36} /> },
]

const CardWrapper = styled(Box)({
    background: '#0b0b0f',
    border: '1px solid #1f1f26',
    borderRadius: '18px',
    padding: '36px 20px 28px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    transition: 'all 0.25s ease',
    cursor: 'pointer',
    width: "200px",

    '&:hover': {
        transform: 'translateY(-6px)',
        borderColor: '#ff2d55',
        boxShadow: '0 10px 30px rgba(255, 45, 85, 0.25)',
    },
})

const IconBox = styled(Box)({
    width: 72,
    height: 72,
    borderRadius: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    background: 'linear-gradient(135deg, #ff2d55, #ff3b3b, #ff6b6b)',
    color: '#fff',

    boxShadow: '0 4px 20px rgba(255, 45, 85, 0.5)',
})

const ProgressBar = styled(Box)({
    width: '100%',
    height: 4,
    background: '#1c1c22',
    borderRadius: 2,
    overflow: 'hidden',
})

const ProgressFill = styled(Box)({
    height: '100%',
    width: '80%',
    background: 'linear-gradient(90deg, #ff2d55, #ff6b6b)',
})

function SkillCard({ skill }) {
    return (
        <CardWrapper>
            <IconBox>{skill.icon}</IconBox>

            <Typography
                sx={{
                    color: '#e4e4e7',
                    fontSize: '14px',
                    fontWeight: 600,
                    textAlign: 'center',
                    lineHeight: 1.4,
                }}
            >
                {skill.name}
            </Typography>

            <ProgressBar>
                <ProgressFill />
            </ProgressBar>
        </CardWrapper>
    )
}

export default function Skills() {
    return (
        <Box
            sx={{
                padding: '50px 24px 5px 24px',

            }}
        >
            <Grid
                container
                spacing={3}
                sx={{
                    maxWidth: 1200,
                    margin: '0 auto',
                    justifyContent: 'center',
                }}
            >
                {skills.map((skill) => (
                    <Grid item xs={6} sm={4} md={2.4} key={skill.name}>
                        <SkillCard skill={skill} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}