import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translations from "../locales/translations";

const resources = {
  en: {
    translation: translations.en,
  },
  ru: {
    translation: translations.ru,
  },
  uz: {
    translation: translations.uz,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng:
    typeof window !== "undefined" ? localStorage.getItem("lang") || "en" : "en",
  keySeparator: false,
  // Resources are bundled, so initialise synchronously. With the default
  // async init the first render suspended (showing the route spinner) and
  // then rendered the whole page a second time once i18next was ready.
  initAsync: false,
  interpolation: {
    escapeValue: false,
  },
});

// Keep <html lang> in sync so search engines and screen readers know which
// language the page is actually showing.
if (typeof document !== "undefined") {
  document.documentElement.lang = i18n.language;
  i18n.on("languageChanged", (lng) => {
    document.documentElement.lang = lng;
  });
}

export default i18n;
export const { t, changeLanguage, language } = i18n;
