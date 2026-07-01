import { Box, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FiCheckCircle } from 'react-icons/fi'

const REASONS = ['WHY_1', 'WHY_2', 'WHY_3', 'WHY_4']

export default function WhyChooseMe() {
    const { t } = useTranslation()

    return (
        <Box sx={{
            mb: '56px',
            p: { xs: '20px', md: '32px' },
            borderRadius: '24px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
        }}>
            <Stack mb={'20px'} gap={'4px'}>
                <Typography sx={{ fontWeight: 800, fontSize: { xs: '20px', md: '24px' }, color: '#ff4d6d' }}>
                    {t('WHY_TITLE')}
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>
                    {t('WHY_SUBTITLE')}
                </Typography>
            </Stack>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gap: '18px',
            }}>
                {REASONS.map((key) => (
                    <Stack key={key} direction="row" gap={'12px'} alignItems="flex-start">
                        <Box sx={{ color: '#22c55e', mt: '2px', flexShrink: 0 }}>
                            <FiCheckCircle size={18} />
                        </Box>
                        <Box>
                            <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '14px', mb: '4px' }}>
                                {t(`${key}_TITLE`)}
                            </Typography>
                            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.6 }}>
                                {t(`${key}_DESC`)}
                            </Typography>
                        </Box>
                    </Stack>
                ))}
            </Box>
        </Box>
    )
}
