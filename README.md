# Med-Tech (BerlinMed) — Frontend

BerlinMed tibbiy uskunalar eksporti kompaniyasi uchun Next.js (App Router) asosida yozilgan frontend ilova. Loyiha ikki qismdan iborat:

- **Client (mijozlar) qismi** — mahsulotlar katalogi, mahsulot/buyurtma sahifalari, aloqa formasi. Ko'p tilli (ru/en/ar).
- **Admin panel** — mahsulotlar, kategoriyalar, buyurtmalar, tillar va murojaatlarni boshqarish.

Ilova backend REST API bilan ishlaydi: `https://api.berlinmed-export.com` (bazaviy URL [src/lib/axios.ts](src/lib/axios.ts) faylida qattiq yozilgan).

## Texnologiyalar

- [Next.js 15](https://nextjs.org) (App Router, React 19)
- [next-intl](https://next-intl.dev) — ko'p tillilik (i18n) va routing
- [Tailwind CSS 4](https://tailwindcss.com)
- [Axios](https://axios-http.com) — API so'rovlari
- [react-slick](https://react-slick.neostack.com) — slayderlar
- [react-paginate](https://www.npmjs.com/package/react-paginate) — sahifalash
- TypeScript

## Loyihani ishga tushirish

Talablar: Node.js va npm (`package-lock.json` mavjud, shuning uchun npm tavsiya etiladi).

```bash
npm install
npm run dev
```

Brauzerda [http://localhost:3000](http://localhost:3000) ni oching.

Boshqa foydali skriptlar ([package.json](package.json)):

```bash
npm run build   # production build
npm run start   # production serverni ishga tushirish (avval build kerak)
npm run lint    # ESLint tekshiruvi
```

> **Eslatma:** hozircha `.env` fayl ishlatilmaydi — API manzili kodda qattiq belgilangan. Agar backend manzili o'zgarsa yoki muhitlarga (dev/prod) qarab ajratish kerak bo'lsa, `src/lib/axios.ts` faylidagi `baseURL` ni `NEXT_PUBLIC_API_URL` kabi environment o'zgaruvchisiga o'tkazish tavsiya qilinadi.

## Loyiha tuzilishi

```
src/
├── app/
│   └── [locale]/                  # next-intl orqali til prefiksi (ru/en/ar)
│       ├── (client)/              # Mijozlarga ko'rinadigan sahifalar (route group)
│       │   ├── page.tsx           # Bosh sahifa
│       │   ├── products/          # Mahsulotlar katalogi va bitta mahsulot sahifasi
│       │   ├── orders/[id]/       # Buyurtma sahifasi
│       │   └── contact/           # Aloqa sahifasi
│       ├── admin/                 # Admin panel
│       │   ├── login/             # Admin login
│       │   └── user/              # Admin: mahsulotlar, kategoriyalar, buyurtmalar,
│       │                          # tillar (lang), murojaatlar (contact)
│       ├── components/
│       │   ├── client/            # Mijoz qismi komponentlari (header, footer, hero, ...)
│       │   ├── admin/             # Admin panel komponentlari (sidebar, modallar, ...)
│       │   └── ui/                # Umumiy/qayta ishlatiluvchi UI komponentlari
│       └── globals.css
├── i18n/                          # next-intl konfiguratsiyasi (routing, request)
├── lib/                           # API bilan ishlash funksiyalari (axios instansi,
│                                  # product.ts, category.ts)
├── types/                         # TypeScript tiplari (product, category, order, lang)
└── middleware.ts                  # next-intl locale middleware

messages/                          # Tarjima fayllari: ru.json, en.json, ar.json, uz.json
public/                            # Statik fayllar (rasmlar, ikonkalar)
```

## Ko'p tillilik (i18n)

Tillar [src/i18n/routing.ts](src/i18n/routing.ts) faylida sozlangan:

- Faol locale'lar: `ru`, `en`, `ar` (standart — `ru`)
- URL formati: `localePrefix: "as-needed"` — standart locale uchun prefiks qo'shilmaydi (masalan `/products`), boshqa tillar uchun prefiks bilan (masalan `/en/products`)
- Tarjima matnlari `messages/*.json` fayllarida saqlanadi. `messages/uz.json` fayli mavjud, lekin hozircha `routing.ts` da faollashtirilmagan — yangi til qo'shish uchun uni `locales` ro'yxatiga kiritish kifoya.

Yangi tarjima kaliti qo'shish uchun barcha `messages/*.json` fayllarni bir xilda yangilang.

## Admin panel

Admin panelga kirish [src/app/[locale]/admin/layout.tsx](<src/app/[locale]/admin/layout.tsx>) da tekshiriladi: `localStorage` dagi `dmin_uth` kaliti bo'lmasa, foydalanuvchi `/admin/login` sahifasiga yo'naltiriladi. API so'rovlari uchun token (`access_token`) ham `localStorage` da saqlanadi va [src/lib/axios.ts](src/lib/axios.ts) orqali har bir so'rovga `Authorization: Bearer <token>` sifatida qo'shiladi. `401` javobida foydalanuvchi avtomatik login sahifasiga chiqariladi.

Admin bo'limlari (`src/app/[locale]/admin/user/`):

- `products` — mahsulotlarni yaratish/tahrirlash/o'chirish
- `category` — kategoriyalarni boshqarish
- `orders` — tushgan buyurtmalar
- `contact` — mijozlardan kelgan murojaatlar
- `lang` — tillar bo'yicha sozlamalar

## API integratsiyasi

Barcha backend so'rovlari `src/lib/` papkasidagi funksiyalar orqali amalga oshiriladi (masalan [src/lib/product.ts](src/lib/product.ts), [src/lib/category.ts](src/lib/category.ts)). Yangi API chaqiruvi qo'shish kerak bo'lsa:

1. `src/types/` da mos TypeScript tipini aniqlang (yoki mavjudidan foydalaning).
2. `src/lib/` ichida shu resurs uchun funksiya yozing va umumiy `axiosInstance` dan foydalaning ([src/lib/axios.ts](src/lib/axios.ts)).
3. Fayl yuklash kerak bo'lgan so'rovlarda (`images`, `logo` kabi) `FormData` ishlatiladi — mavjud funksiyalardagi namunaga amal qiling.

## Kod uslubi

- Yo'l alias: `@/*` → `src/*` ([tsconfig.json](tsconfig.json))
- Komponentlar `client`, `admin` va `ui` bo'yicha ajratilgan — yangi komponent qo'shishda shu tasnifga rioya qiling
- Linting: `npm run lint` (Next.js ESLint konfiguratsiyasi)

## Deploy

Ilova [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) platformasida deploy qilish uchun mos. Batafsil: [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
