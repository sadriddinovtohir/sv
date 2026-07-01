import { Box, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FiCode, FiServer, FiZap, FiLayout } from 'react-icons/fi'

const SERVICES = [
    { icon: <FiCode size={22} />,   titleKey: 'SERVICE_FRONTEND_TITLE',  descKey: 'SERVICE_FRONTEND_DESC',  accent: '#ff2d55' },
    { icon: <FiServer size={22} />, titleKey: 'SERVICE_FULLSTACK_TITLE', descKey: 'SERVICE_FULLSTACK_DESC', accent: '#38bdf8' },
    { icon: <FiZap size={22} />,    titleKey: 'SERVICE_AI_TITLE',        descKey: 'SERVICE_AI_DESC',        accent: '#a855f7' },
    { icon: <FiLayout size={22} />,titleKey: 'SERVICE_UIUX_TITLE',      descKey: 'SERVICE_UIUX_DESC',      accent: '#22c55e' },
]

export default function Services() {
    const { t } = useTranslation()

    return (
        <Box sx={{ mb: '56px' }}>
            <Stack mb={'24px'} gap={'4px'}>
                <Typography sx={{ fontWeight: 800, fontSize: { xs: '22px', md: '28px' }, color: '#fff' }}>
                    {t('SERVICES_TITLE')}
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>
                    {t('SERVICES_SUBTITLE')}
                </Typography>
            </Stack>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
                gap: '20px',
            }}>
                {SERVICES.map((item) => (
                    <Box
                        key={item.titleKey}
                        sx={{
                            p: '20px',
                            borderRadius: '18px',
                            background: 'rgba(255,255,255,0.04)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: `1px solid ${item.accent}25`,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                borderColor: `${item.accent}55`,
                                background: 'rgba(255,255,255,0.06)',
                                transform: 'translateY(-4px)',
                            },
                        }}
                    >
                        <Box sx={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            width: 44, height: 44, borderRadius: '12px',
                            background: `${item.accent}18`, color: item.accent,
                            mb: '14px',
                        }}>
                            {item.icon}
                        </Box>
                        <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '15px', mb: '8px' }}>
                            {t(item.titleKey)}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.65 }}>
                            {t(item.descKey)}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}
