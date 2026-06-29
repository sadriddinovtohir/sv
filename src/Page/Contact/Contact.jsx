import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Contact() {
  const { t } = useTranslation()
  return (
    <div>
      <h1>{t('CONTACT_EMPTY')}</h1>
    </div>
  )
}
