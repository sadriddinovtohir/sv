import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { I18nextProvider } from 'react-i18next';
import i18n from './utils/i18n.js';
import '@fontsource-variable/manrope'
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </BrowserRouter>
)
