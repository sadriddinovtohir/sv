import { useState } from 'react'
import { Box, Stack, Typography, TextField, Button, CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FaEnvelope, FaPhone, FaTelegram, FaLinkedin } from 'react-icons/fa'
import { FiSend, FiCheckCircle } from 'react-icons/fi'

const GMAIL_COMPOSE_URL = 'https://mail.google.com/mail/?view=cm&fs=1&to=toxir4626@gmail.com'

const CONTACT_INFO = [
  { icon: <FaEnvelope />, label: 'toxir4626@gmail.com', href: GMAIL_COMPOSE_URL, target: '_blank' },
  { icon: <FaPhone />, label: '+998-90-128-33-07', href: 'tel:+998901283307' },
  { icon: <FaTelegram />, label: 'Telegram', href: 'https://t.me/tohir_sadriddinov', target: '_blank' },
  { icon: <FaLinkedin />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/tohirbek-sadriddinov-dev/', target: '_blank' },
]

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '12px',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.12)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.25)' },
    '&.Mui-focused fieldset': { borderColor: '#c0103a' },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#ff4d6d' },
  '& input:-webkit-autofill': {
    WebkitBoxShadow: '0 0 0 100px rgba(30,10,15,0.9) inset',
    WebkitTextFillColor: '#fff',
    caretColor: '#fff',
    borderRadius: '12px',
    transition: 'background-color 9999s ease-in-out 0s',
  },
}

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', phone: '', message: '', company: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('success')
      setForm({ name: '', phone: '', message: '', company: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <Box className="container" sx={{ pt: { xs: 4, md: 6 }, pb: 8, color: '#fff' }}>
      <Stack mb={5} gap={1} sx={{ maxWidth: '640px' }}>
        <Typography variant="h4" fontWeight={800} sx={{ color: '#ff4d6d', letterSpacing: '1px', fontSize: { xs: '26px', md: '34px' } }}>
          {t('CONTACT_TITLE')}
        </Typography>
        <Typography sx={{ color: '#ccc', fontSize: { xs: '14px', md: '15px' } }}>
          {t('CONTACT_SUBTITLE')}
        </Typography>

        <Stack direction="row" gap="10px" flexWrap="wrap" mt={1.5}>
          <Box sx={{
            display: 'flex', alignItems: 'center', gap: '6px',
            color: '#22c55e', fontSize: '13px', fontWeight: 600,
            background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)',
            borderRadius: '20px', px: '12px', py: '6px',
          }}>
            <Box sx={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
            {t('CONTACT_AVAILABILITY')}
          </Box>
          <Box sx={{
            display: 'flex', alignItems: 'center', gap: '6px',
            color: 'rgba(255,255,255,0.55)', fontSize: '13px',
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px', px: '12px', py: '6px',
          }}>
            {t('CONTACT_RESPONSE_TIME')}
          </Box>
        </Stack>
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} gap={4} alignItems="flex-start">
        {/* === Form === */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            flex: { xs: '1 1 auto', md: '1 1 60%' },
            minWidth: 0,
            width: '100%',
            p: { xs: 2.5, md: 4 },
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.07)',
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
          }}
        >
          {/* Honeypot — hidden from real visitors, catches basic bots */}
          <Box
            component="input"
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange('company')}
            tabIndex={-1}
            autoComplete="off"
            sx={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
          />
          <TextField
            label={t('CONTACT_FORM_NAME')}
            value={form.name}
            onChange={handleChange('name')}
            required
            fullWidth
            sx={fieldSx}
          />
          <TextField
            label={t('CONTACT_FORM_PHONE')}
            type="tel"
            value={form.phone}
            onChange={handleChange('phone')}
            required
            fullWidth
            sx={fieldSx}
          />
          <TextField
            label={t('CONTACT_FORM_MESSAGE')}
            placeholder={t('CONTACT_FORM_MESSAGE_PLACEHOLDER')}
            value={form.message}
            onChange={handleChange('message')}
            required
            fullWidth
            multiline
            rows={5}
            sx={fieldSx}
          />
          <Button
            type="submit"
            disabled={status === 'sending'}
            endIcon={status === 'sending' ? <CircularProgress size={15} sx={{ color: '#fff' }} /> : <FiSend size={15} />}
            sx={{
              alignSelf: { xs: 'stretch', sm: 'flex-start' },
              background: 'linear-gradient(135deg, #c0103a, #ff2d55)',
              color: '#fff',
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              py: 1.3,
              boxShadow: '0 4px 14px rgba(192,16,58,0.4)',
              '&:hover': { boxShadow: '0 6px 20px rgba(192,16,58,0.6)' },
              '&.Mui-disabled': { color: '#fff', opacity: 0.7 },
            }}
          >
            {status === 'sending' ? t('CONTACT_FORM_SENDING') : t('CONTACT_FORM_SUBMIT')}
          </Button>

          {status === 'success' && (
            <Stack direction="row" gap={1} alignItems="center" sx={{ color: '#22c55e', fontSize: '13px' }}>
              <FiCheckCircle size={16} /> {t('CONTACT_FORM_SUCCESS')}
            </Stack>
          )}
          {status === 'error' && (
            <Typography sx={{ color: '#ff6b6b', fontSize: '13px' }}>
              {t('CONTACT_FORM_ERROR')}
            </Typography>
          )}
        </Box>

        {/* === Contact Info === */}
        <Stack
          sx={{
            flex: { xs: '1 1 auto', md: '0 1 340px' },
            minWidth: 0,
            width: '100%',
            maxWidth: { xs: '100%', md: '340px' },
            p: { xs: 2.5, md: 3 },
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.07)',
            gap: 1.5,
            height: 'fit-content',
          }}
        >
          <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '15px', mb: 0.5 }}>
            {t('CONTACT_INFO_TITLE')}
          </Typography>
          {CONTACT_INFO.map((item) => (
            <Box
              key={item.label}
              component="a"
              href={item.href}
              target={item.target || '_self'}
              rel="noreferrer"
              sx={{
                display: 'flex', alignItems: 'center', gap: '10px',
                color: 'rgba(255,255,255,0.65)', fontSize: '13.5px',
                textDecoration: 'none',
                px: 1.5, py: 1,
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.06)',
                transition: 'all 0.2s ease',
                overflowWrap: 'anywhere',
                '&:hover': { background: '#c0103a', color: '#fff', borderColor: '#c0103a' },
              }}
            >
              <Box component="span" sx={{ display: 'flex', flexShrink: 0 }}>{item.icon}</Box>
              {item.label}
            </Box>
          ))}
        </Stack>
      </Stack>
    </Box>
  )
}
