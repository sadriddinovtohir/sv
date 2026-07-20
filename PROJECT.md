# Tohir Sadriddinov — Portfolio Website

Frontend muhandis Tohir Sadriddinovning shaxsiy portfolio sayti. React + Vite asosida qurilgan, ko'p tilli (uz/ru/en) interfeys, animatsiyalar va Telegram orqali ishlaydigan kontakt formasi bilan.

## Tech Stack

- **React 19** + **Vite 8** — SPA, lazy-loaded sahifalar (`React.lazy` + `Suspense`)
- **React Router DOM 6** — client-side routing
- **MUI (Material UI) 7** + **Emotion** — UI komponentlar va styling
- **i18next / react-i18next** — uz / ru / en tillari, tanlangan til `localStorage`da saqlanadi
- **React Icons** — ikonkalar
- **Vercel Serverless Functions** — kontakt formasi backend (`/api`)
- **ESLint** — kod sifatini tekshirish

## Loyiha tuzilmasi

```
src/
  App.jsx                 # Route'lar, boot-screen (SetTime) logikasi
  Layout/MainLayout.jsx    # Header/Footer bilan umumiy layout
  Page/
    Home/                  # Bosh sahifa
    About/                 # Men haqimda
    Projects/              # Loyihalar galereyasi
    Skills/                # Ko'nikmalar (progress-bar'li kategoriyalar)
    Contact/               # Aloqa formasi
  components/
    Header, Footer, Offer, FloatingContact,
    CustomCard, CustomButton, WhyChooseMe, Services,
    SetTime (intro/loading animatsiyasi), NotFound
  config/ui/               # theme.js, color.js, style.js — MUI theme sozlamalari
  data/skillsData.js       # Skills sahifasidagi kategoriya/daraja ma'lumotlari
  locales/                 # en.json, ru.json, uz.json + translations.js
  utils/i18n.js            # i18next konfiguratsiyasi

api/
  send-message.js          # POST /api/send-message (Vercel serverless function)
  _lib/sendTelegram.js      # Validatsiya + Telegram Bot API'ga xabar yuborish
```

## Sahifalar / Routing (`src/App.jsx`)

| Route         | Sahifa    |
|---------------|-----------|
| `/`           | Home      |
| `/about`      | About     |
| `/projects`   | Projects  |
| `/skills`     | Skills    |
| `/contact`    | Contact   |
| `/offer`      | Offer     |
| `*`           | Not Found |

Ilova ochilganda ~3.5 soniya `SetTime` intro komponenti ko'rsatiladi, so'ng asosiy route'lar render qilinadi.

## Kontakt formasi (Telegram integratsiyasi)

`Contact` sahifasidagi forma `/api/send-message` ga POST so'rov yuboradi:

1. **Honeypot** — yashirin `company` maydoni to'ldirilsa, bot deb hisoblanib, jim javob qaytariladi.
2. **Validatsiya** — `name`, `phone`, `message` majburiy; telefon formati qat'iy tekshiriladi: `+998-XX-XXX-XX-XX`.
3. **Yuborish** — `TELEGRAM_BOT_TOKEN` va `TELEGRAM_CHAT_ID` orqali Telegram Bot API'ga xabar yuboriladi.

`vite.config.js` ichida `telegramDevApi` plugini shu logikani local dev serverda ham simulyatsiya qiladi (Vercel funksiyalari faqat production'da ishlaydi), shu sababli forma `npm run dev`da ham to'liq ishlaydi.

### Kerakli environment o'zgaruvchilar (`.env`)

```
TELEGRAM_BOT_TOKEN=your_bot_token_from_botfather
TELEGRAM_CHAT_ID=your_telegram_chat_id
```

## Ko'p tillilik (i18n)

- Tillar: **o'zbekcha, ruscha, inglizcha** (`src/locales/uz.json`, `ru.json`, `en.json`)
- Har bir til fayli bir xil kalitlar to'plamiga ega (har birida 121 qator)
- Tanlangan til `localStorage.lang` orqali saqlanadi va sahifa qayta yuklanganda tiklanadi

## Deploy

- **Vercel** ga deploy qilinadi (`vercel.json` — SPA fallback: `/api/` dan boshqa barcha yo'llar `index.html`ga yo'naltiriladi)
- `api/` papkasidagi fayllar Vercel Serverless Functions sifatida avtomatik aniqlanadi

## Ishga tushirish

```bash
npm install
npm run dev       # dev server (Telegram API mock bilan)
npm run build     # production build
npm run preview   # build'ni local ko'rish
npm run lint      # ESLint tekshiruvi
```
