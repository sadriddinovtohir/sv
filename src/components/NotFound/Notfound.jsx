import React from 'react';
import { Stack, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Notfound() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      spacing={3}
      marginTop={"35px"}
      sx={{
        color: '#fff',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Typography variant="h1" sx={{ fontSize: { xs: 80, md: 120 }, fontWeight: 'bold' }}>
        {t('NOTFOUND_404')}
      </Typography>
      <Typography variant="h5">{t('NOTFOUND_TITLE')}</Typography>
      <Typography variant="body1" sx={{ maxWidth: 400 }}>
        {t('NOTFOUND_DESC')}
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate('/')}
        sx={{
          background: 'linear-gradient(45deg, #ff416c, #ff4b2b)',
          textTransform: 'none',
          borderRadius: '10px',
          px: 4,
          py: 1.5,
        }}
      >
        {t('NOTFOUND_BUTTON')}
      </Button>
    </Stack>
  );
}