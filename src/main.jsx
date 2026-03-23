import { BrowserRouter } from 'react-router'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { I18nextProvider } from 'react-i18next';
import i18n from './utils/i18n.js';
import { COLOR } from './config/ui/color.js';
import './index.css'
import { theme } from './config/ui/theme.js';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
  <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <div style={{ color: COLOR.colors, height: "100vh", backgroundColor: COLOR.bgcolor }}>
          <CssBaseline />
          <App />
        </div>
      </ThemeProvider>
  </I18nextProvider>
    </BrowserRouter>
)
