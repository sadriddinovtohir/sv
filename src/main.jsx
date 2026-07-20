import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { I18nextProvider } from 'react-i18next';
import i18n from './utils/i18n.js';
import { TooltipProvider } from './components/ui/tooltip.jsx';
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <TooltipProvider delayDuration={200}>
        <App />
      </TooltipProvider>
    </I18nextProvider>
  </BrowserRouter>
)
