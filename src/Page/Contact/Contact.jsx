import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaEnvelope, FaPhone, FaTelegram, FaLinkedin } from 'react-icons/fa'
import { FiSend, FiCheckCircle, FiLoader } from 'react-icons/fi'
import { GlassPanel } from '@/components/common/GlassPanel'
import { Pill } from '@/components/common/Pill'
import { FormField } from '@/components/common/FormField'
import { Button } from '@/components/ui/button'

const GMAIL_COMPOSE_URL = 'https://mail.google.com/mail/?view=cm&fs=1&to=toxir4626@gmail.com'
const PHONE_REGEX = /^\+998-\d{2}-\d{3}-\d{2}-\d{2}$/

function formatPhone(raw) {
  let digits = raw.replace(/\D/g, '')
  if (digits.startsWith('998')) {
    digits = digits.slice(3)
  }
  digits = digits.slice(0, 9)

  let out = '+998'
  if (digits.length > 0) out += '-' + digits.slice(0, 2)
  if (digits.length > 2) out += '-' + digits.slice(2, 5)
  if (digits.length > 5) out += '-' + digits.slice(5, 7)
  if (digits.length > 7) out += '-' + digits.slice(7, 9)
  return out
}

const CONTACT_INFO = [
  { icon: <FaEnvelope />, label: 'toxir4626@gmail.com', href: GMAIL_COMPOSE_URL, target: '_blank' },
  { icon: <FaPhone />, label: '+998-90-128-33-07', href: 'tel:+998901283307' },
  { icon: <FaTelegram />, label: 'Telegram', href: 'https://t.me/tohir_sadriddinov', target: '_blank' },
  { icon: <FaLinkedin />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/tohirbek-sadriddinov-dev/', target: '_blank' },
]

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', phone: '+998', message: '', company: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [phoneError, setPhoneError] = useState(false)

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handlePhoneChange = (e) => {
    setForm((f) => ({ ...f, phone: formatPhone(e.target.value) }))
    if (phoneError) setPhoneError(false)
  }

  const handlePhoneBlur = () => {
    setPhoneError(!PHONE_REGEX.test(form.phone))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!PHONE_REGEX.test(form.phone)) {
      setPhoneError(true)
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('success')
      setForm({ name: '', phone: '+998', message: '', company: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="container pt-8 pb-16 text-white md:pt-12">
      <div className="mb-10 flex max-w-[640px] flex-col gap-1">
        <h1 className="text-[26px] font-extrabold tracking-wide text-[#ff4d6d] md:text-[34px]">
          {t('CONTACT_TITLE')}
        </h1>
        <p className="text-[14px] text-[#ccc] md:text-[15px]">
          {t('CONTACT_SUBTITLE')}
        </p>

        <div className="mt-3 flex flex-row flex-wrap gap-2.5">
          <Pill accent="#22c55e" dot>
            {t('CONTACT_AVAILABILITY')}
          </Pill>
          <Pill>
            {t('CONTACT_RESPONSE_TIME')}
          </Pill>
        </div>
      </div>

      <div className="flex w-full flex-col items-stretch gap-8">
        {/* === Form === */}
        <GlassPanel
          as="form"
          onSubmit={handleSubmit}
          className="relative flex w-full min-w-0 flex-col gap-6 p-5 md:p-8"
        >
          {/* Honeypot — hidden from real visitors, catches basic bots */}
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange('company')}
            tabIndex={-1}
            autoComplete="off"
            className="absolute left-[-9999px] h-px w-px opacity-0"
          />
          <FormField
            id="contact-name"
            label={t('CONTACT_FORM_NAME')}
            value={form.name}
            onChange={handleChange('name')}
            required
          />
          <FormField
            id="contact-phone"
            label={t('CONTACT_FORM_PHONE')}
            type="tel"
            inputMode="numeric"
            value={form.phone}
            onChange={handlePhoneChange}
            onBlur={handlePhoneBlur}
            error={phoneError ? t('CONTACT_FORM_PHONE_INVALID') : ''}
            required
            maxLength={18}
          />
          <FormField
            id="contact-message"
            as="textarea"
            label={t('CONTACT_FORM_MESSAGE')}
            placeholder={t('CONTACT_FORM_MESSAGE_PLACEHOLDER')}
            value={form.message}
            onChange={handleChange('message')}
            required
            rows={5}
          />
          <Button
            type="submit"
            variant="brand"
            disabled={status === 'sending'}
            className="h-11 self-stretch rounded-xl px-6 sm:self-start"
          >
            {status === 'sending' ? t('CONTACT_FORM_SENDING') : t('CONTACT_FORM_SUBMIT')}
            {status === 'sending' ? <FiLoader size={15} className="animate-spin" /> : <FiSend size={15} />}
          </Button>

          {status === 'success' && (
            <div className="flex items-center gap-2 text-[13px] text-[#22c55e]">
              <FiCheckCircle size={16} /> {t('CONTACT_FORM_SUCCESS')}
            </div>
          )}
          {status === 'error' && (
            <p className="text-[13px] text-[#ff6b6b]">
              {t('CONTACT_FORM_ERROR')}
            </p>
          )}
        </GlassPanel>

        {/* === Contact Info === */}
        <GlassPanel className="flex h-fit w-full min-w-0 flex-col gap-3 p-5 md:p-6">
          <p className="mb-1 text-[15px] font-bold text-white">
            {t('CONTACT_INFO_TITLE')}
          </p>
          {CONTACT_INFO.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.target || '_self'}
              rel="noreferrer"
              className="flex items-center gap-2.5 overflow-hidden rounded-[10px] border border-white/6 px-3 py-2 text-[13.5px] text-white/65 break-words transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white"
            >
              <span className="flex shrink-0">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </GlassPanel>
      </div>
    </div>
  )
}
