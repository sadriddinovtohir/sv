import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json";

const LANGS = ["en", "ru", "uz"];

// English ships in the main bundle; Russian and Uzbek are separate chunks
// fetched only when a visitor actually uses them (~2/3 of the locale bytes
// no longer load on every visit).
const lazyLocales = {
  ru: () => import("../locales/ru.json"),
  uz: () => import("../locales/uz.json"),
};

const lazyBackend = {
  type: "backend",
  init() {},
  read(lng, _ns, callback) {
    const load = lazyLocales[lng];
    if (!load) return callback(null, {});
    load()
      .then((m) => callback(null, m.default))
      .catch((err) => callback(err, null));
  },
};

const stored = typeof window !== "undefined" ? localStorage.getItem("lang") : null;

/**
 * Resolves once the visitor's language is loaded. main.jsx renders after it,
 * so the first render is already in the right language (no flash of English,
 * no Suspense spinner). For English it resolves straight away.
 */
export const i18nReady = i18n
  .use(lazyBackend)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en } },
    partialBundledLanguages: true,
    lng: LANGS.includes(stored) ? stored : "en",
    fallbackLng: "en",
    supportedLngs: LANGS,
    keySeparator: false,
    initAsync: false,
    interpolation: {
      escapeValue: false,
    },
  })
  .catch(() => {});

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
