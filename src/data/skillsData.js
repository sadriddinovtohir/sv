export const skillCategoryData = [
    {
        labelKey: 'SKILL_CAT_FRONTEND_CORE',
        accent: '#ff2d55',
        skills: [
            { name: 'HTML5',          level: 95 },
            { name: 'CSS / Tailwind', level: 92 },
            { name: 'JavaScript',     level: 90 },
            { name: 'TypeScript',     level: 85 },
        ],
    },
    {
        labelKey: 'SKILL_CAT_FRAMEWORKS',
        accent: '#38bdf8',
        skills: [
            { name: 'React',                level: 93 },
            { name: 'Next.js',              level: 86 },
            { name: 'React Native / Expo',  level: 80 },
            { name: 'Redux / Zustand',      level: 84 },
            { name: 'TanStack Query',       level: 88 },
        ],
    },
    {
        labelKey: 'SKILL_CAT_UI_LIBRARIES',
        accent: '#a855f7',
        skills: [
            { name: 'Shadcn UI',   level: 90 },
            { name: 'Ant Design',  level: 82 },
            { name: 'Material UI', level: 85 },
        ],
    },
    {
        labelKey: 'SKILL_CAT_AI_BACKEND',
        accent: '#06b6d4',
        skills: [
            { name: 'Node.js',               level: 86 },
            { name: 'Express.js',            level: 86 },
            { name: 'PostgreSQL',            level: 80 },
            { name: 'Prisma ORM',            level: 84 },
            { name: 'MongoDB / Mongoose',    level: 80 },
            { name: 'Redis',                 level: 76 },
            { name: 'JWT / Argon2',          level: 84 },
            { name: 'Zod',                   level: 86 },
            { name: 'WebSocket',             level: 76 },
            { name: 'Swagger',               level: 80 },
            { name: 'Rate Limiting / Helmet', level: 82 },
        ],
    },
    {
        labelKey: 'SKILL_CAT_ARCHITECTURE',
        accent: '#f59e0b',
        skills: [
            { name: 'System Design',        level: 80 },
            { name: 'Multi-tenant SaaS',    level: 80 },
            { name: 'Networking / REST',    level: 88 },
            { name: 'RBAC / Security',      level: 82 },
            { name: 'Docker',               level: 78 },
            { name: 'CI/CD',                level: 76 },
            { name: 'Git / GitHub',         level: 90 },
            { name: 'GitLab',               level: 85 },
            { name: 'Vercel / Netlify',     level: 88 },
            { name: 'Render / Hetzner',     level: 80 },
        ],
    },
    {
        labelKey: 'SKILL_CAT_AI_TOOLS',
        accent: '#22c55e',
        skills: [
            { name: 'Claude AI',      level: 90 },
            { name: 'Codex AI',       level: 82 },
            { name: 'GitHub Copilot', level: 84 },
        ],
    },
]

export const totalSkillsCount = skillCategoryData.reduce(
    (sum, cat) => sum + cat.skills.length,
    0
)
