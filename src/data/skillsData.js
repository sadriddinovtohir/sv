export const skillCategoryData = [
    {
        labelKey: 'SKILL_CAT_FRONTEND_CORE',
        accent: '#ff2d55',
        skills: [
            { name: 'HTML5',          level: 95 },
            { name: 'CSS / Tailwind', level: 90 },
            { name: 'JavaScript',     level: 87 },
            { name: 'TypeScript',     level: 78 },
        ],
    },
    {
        labelKey: 'SKILL_CAT_FRAMEWORKS',
        accent: '#38bdf8',
        skills: [
            { name: 'React',           level: 92 },
            { name: 'Next.js',         level: 82 },
            { name: 'Redux / Zustand', level: 80 },
            { name: 'TanStack Query',  level: 84 },
        ],
    },
    {
        labelKey: 'SKILL_CAT_UI_LIBRARIES',
        accent: '#a855f7',
        skills: [
            { name: 'Shadcn UI',   level: 86 },
            { name: 'Ant Design',  level: 80 },
            { name: 'Material UI', level: 85 },
        ],
    },
    {
        labelKey: 'SKILL_CAT_AI_TOOLS',
        accent: '#22c55e',
        skills: [
            { name: 'Claude AI',      level: 86 },
            { name: 'Codex AI',       level: 80 },
            { name: 'GitHub Copilot', level: 82 },
        ],
    },
    {
        labelKey: 'SKILL_CAT_AI_BACKEND',
        accent: '#06b6d4',
        skills: [
            { name: 'Node.js',               level: 82 },
            { name: 'Express.js',            level: 80 },
            { name: 'PostgreSQL',            level: 76 },
            { name: 'Prisma ORM',            level: 78 },
            { name: 'Redis',                 level: 74 },
            { name: 'JWT / Argon2',          level: 80 },
            { name: 'Zod',                   level: 82 },
            { name: 'Swagger',               level: 78 },
            { name: 'Docker',                level: 74 },
            { name: 'Rate Limiting / Helmet', level: 76 },
        ],
    },
    {
        labelKey: 'SKILL_CAT_ARCHITECTURE',
        accent: '#f59e0b',
        skills: [
            { name: 'File Structure',    level: 88 },
            { name: 'Networking / REST', level: 82 },
            { name: 'DOM Manipulation',  level: 88 },
            { name: 'SaaS Development',  level: 76 },
            { name: 'Git / GitHub',      level: 88 },
            { name: 'Vercel / Netlify',  level: 85 },
        ],
    },
]

export const totalSkillsCount = skillCategoryData.reduce(
    (sum, cat) => sum + cat.skills.length,
    0
)
