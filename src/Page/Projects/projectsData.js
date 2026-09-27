import uzfixcar from "../../assets/img/uzfixcar.webp"
import tomservis from "../../assets/img/tomservis.webp"
import uymakon from "../../assets/img/uymakon.webp"
import gitpodClone from "../../assets/img/gitpodClone.webp"
import karvon from "../../assets/img/karvon.webp"
import RadioatorPro from "../../assets/img/RadioatorPro.webp"
import bizCore from "../../assets/img/bizCore.webp"
import studense from "../../assets/img/studense.webp"
import sun_energy_img from "../../assets/img/sun_energy_img.webp"
import ITPARKIMG from "../../assets/img/ITPARK.webp"
import clubMraa from "../../assets/img/image.webp"

/**
 * Order of the stack groups on the detail page. Each key maps to a
 * `PROJECT_STACK_<KEY>` translation for its heading.
 */
export const STACK_GROUPS = ["web", "mobile", "backend", "services", "testing"]

/**
 * Tech names aren't translated, so big projects keep their stack here, grouped,
 * instead of repeating it in every locale file. Small projects still use their
 * `techKey` translation as a flat list.
 *
 * `highlights` are the few tags shown on the card; the rest collapse into "+N".
 */
export const PROJECTS = [
  {
    id: "uzfixcar",
    img: uzfixcar,
    titleKey: "PROJECT_UZFIXCAR_TITLE",
    descKey: "PROJECT_UZFIXCAR_DESC",
    link: "https://www.uzfixcar.com/login",
    highlights: ["React", "React Native", "Node.js", "MongoDB"],
    stack: {
      web: [
        "React", "React DOM", "Vite", "@vitejs/plugin-react", "React Router DOM",
        "TanStack React Query", "React Hook Form", "Axios", "i18next", "react-i18next",
        "Tailwind CSS", "PostCSS", "Autoprefixer", "tailwind-merge", "tw-animate-css",
        "class-variance-authority", "clsx", "shadcn", "Radix UI", "Vaul",
        "Lucide React", "Remix Icon", "Chart.js", "react-chartjs-2", "react-hot-toast",
        "jwt-decode", "@react-oauth/google", "react-google-recaptcha",
        "Fontsource Geist", "Fontsource Inter", "Yandex Maps JS API",
        "JavaScript", "TypeScript", "CSS", "ESLint", "@eslint/js",
        "eslint-plugin-react", "eslint-plugin-react-hooks", "eslint-plugin-react-refresh",
        "globals", "@types/react", "@types/react-dom",
      ],
      mobile: [
        "React Native", "Expo", "Expo Router", "TypeScript", "Hermes", "Metro",
        "Zustand", "TanStack React Query", "Axios", "Zod", "i18next", "react-i18next",
        "AsyncStorage", "Expo SecureStore", "Expo Location", "Expo Notifications",
        "Expo Image Picker", "Expo Image Manipulator", "Expo Linking", "Expo Constants",
        "Expo Device", "Expo Splash Screen", "Expo Status Bar", "Expo Updates (OTA)",
        "React Native WebView", "React Native SVG", "React Native Safe Area Context",
        "React Native Screens", "React Native Toast Message", "Lucide React Native",
        "Expo Vector Icons", "Yandex Maps JS API", "Google reCAPTCHA", "WebSocket",
        "Firebase Cloud Messaging", "Expo Push", "Payme", "EAS Build", "EAS Update",
        "GitHub Actions",
      ],
      backend: [
        "Node.js", "TypeScript", "Express", "MongoDB", "Mongoose", "Redis", "ioredis",
        "Zod", "jsonwebtoken", "argon2", "Helmet", "cors", "cookie-parser", "compression",
        "express-rate-limit", "rate-limit-redis", "ws (WebSocket)", "multer", "sharp",
        "heic-convert", "pdfkit", "dejavu-fonts-ttf", "exceljs", "nodemailer", "aws4fetch",
        "pino", "pino-http", "pino-pretty", "swagger-jsdoc", "swagger-ui-express",
        "date-fns", "nanoid", "dotenv", "tsx", "ESLint", "typescript-eslint",
        "Docker", "Docker Compose", "Caddy", "GitHub Actions", "Git",
      ],
      services: [
        "MongoDB Atlas", "Hetzner Cloud (VPS)", "Ubuntu", "Cloudflare R2",
        "Payme (Merchant + Subscribe API)", "Eskiz.uz (SMS)", "Telegram Bot API",
        "Expo Push Notifications", "Google reCAPTCHA v2", "Google OAuth", "Gmail SMTP",
        "Yandex Navigator / Maps", "Google Maps",
      ],
      testing: [
        "Vitest", "jsdom", "Testing Library (React)", "Testing Library (jest-dom)",
        "Testing Library (user-event)", "Jest (jest-expo)", "React Test Renderer",
      ],
    },
  },
  {
    id: "tomservis",
    img: tomservis,
    titleKey: "PROJECT_TOMSERVIS_TITLE",
    descKey: "PROJECT_TOMSERVIS_DESC",
    techKey: "PROJECT_TOMSERVIS_TECH",
    link: "https://tom-service.vercel.app/",
  },
  {
    id: "uymakon",
    img: uymakon,
    titleKey: "PROJECT_UYMAKON_TITLE",
    descKey: "PROJECT_UYMAKON_DESC",
    techKey: "PROJECT_UYMAKON_TECH",
    link: "https://uy-makon.vercel.app/",
  },
  {
    id: "karvon",
    img: karvon,
    titleKey: "PROJECT_KARVON_TITLE",
    descKey: "PROJECT_KARVON_DESC",
    techKey: "PROJECT_KARVON_TECH",
    link: "https://karvon-eta.vercel.app/",
  },
  {
    id: "gitpod",
    img: gitpodClone,
    titleKey: "PROJECT_GITPOD_TITLE",
    descKey: "PROJECT_GITPOD_DESC",
    techKey: "PROJECT_GITPOD_TECH",
    link: "https://gitpod-lemon.vercel.app/",
  },
  {
    id: "backend",
    img: bizCore,
    titleKey: "PROJECT_BACKEND_TITLE",
    descKey: "PROJECT_BACKEND_DESC",
    techKey: "PROJECT_BACKEND_TECH",
    link: "https://github.com/sadriddinovtohir",
    giturl: "https://github.com/sadriddinovtohir",
    badge: "AI Built",
  },
  {
    id: "itpark",
    img: ITPARKIMG,
    titleKey: "PROJECT_ITPARK_TITLE",
    descKey: "PROJECT_ITPARK_DESC",
    techKey: "PROJECT_ITPARK_TECH",
    link: "https://www.it-park.uz/",
  },
  {
    id: "ttg",
    img: studense,
    titleKey: "PROJECT_TTG_TITLE",
    descKey: "PROJECT_TTG_DESC",
    techKey: "PROJECT_TTG_TECH",
    link: "https://github.com/MaxmudAxmedov/admin-sun-energy",
    giturl: "https://github.com/MaxmudAxmedov/admin-sun-energy",
  },
  {
    id: "sun-energy",
    img: sun_energy_img,
    titleKey: "PROJECT_SUN_ENERGY_TITLE",
    descKey: "PROJECT_SUN_ENERGY_DESC",
    techKey: "PROJECT_SUN_ENERGY_TECH",
    link: "https://quyosh-panellari-admin.netlify.app/",
    giturl: "https://github.com/MaxmudAxmedov/admin-sun-energy",
  },
  {
    id: "react-native",
    img: clubMraa,
    titleKey: "PROJECT_REACTNATIVE_TITLE",
    descKey: "PROJECT_REACTNATIVE_DESC",
    techKey: "PROJECT_REACTNATIVE_TECH",
    link: "https://github.com/sadriddinovtohir",
    giturl: "https://github.com/sadriddinovtohir",
  },
  {
    id: "radiator-pro",
    img: RadioatorPro,
    titleKey: "RADIATORPRO_TITLE",
    descKey: "RADIATORPRO_DESC",
    techKey: "RADIATORPRO_TECH",
    link: "https://radiator-pro.vercel.app/",
  },
]

/**
 * Resolves a raw project into what the UI renders: translated title/desc, the
 * card tags (`tech`) and the total number of distinct technologies.
 */
export function localizeProject(p, t) {
  if (p.stack) {
    const total = new Set(Object.values(p.stack).flat()).size
    return { ...p, title: t(p.titleKey), desc: t(p.descKey), tech: p.highlights, techTotal: total }
  }
  const tech = t(p.techKey, { returnObjects: true })
  const list = Array.isArray(tech) ? tech : []
  return { ...p, title: t(p.titleKey), desc: t(p.descKey), tech: list, techTotal: list.length }
}
