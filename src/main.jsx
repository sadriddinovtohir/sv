import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { I18nextProvider } from 'react-i18next';
import i18n, { i18nReady } from './utils/i18n.js';
import '@fontsource-variable/manrope'
import './index.css'

// Wait for the saved language (a tiny chunk for ru/uz, instant for en); the
// boot loader in index.html stays on screen meanwhile.
i18nReady.then(() => {
  createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </BrowserRouter>
  )
})

// Offline support / installability (public/sw.js). Production only: in dev a
// service worker would serve stale modules over Vite's hot reload. Registered
// after load so it never competes with the first paint.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}
