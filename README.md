# Sharp Gents Collections — website

Catalogue site for Sharp Gents Collections, a men's shirt brand in Accra. Customers browse shirts, pick a size, and order on **WhatsApp**. There is no online checkout.

Built with Next.js (App Router), TypeScript and Tailwind CSS. The whole site is static and has no database or login.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (must pass before deploying)
```

---

## Where things live

| What | File |
| --- | --- |
| **WhatsApp number**, site URL, social links, delivery threshold | `config/site.ts` |
| **Products and prices** | `data/products.ts` |
| Size chart | `data/sizes.ts` |
| Product photos | `public/products/<slug>/` |
| WhatsApp message wording | `lib/whatsapp.ts` |
| Colours and fonts | `app/globals.css` (colours), `app/layout.tsx` (fonts) |

### ⚠️ Before launch
1. Put the real WhatsApp number in `WHATSAPP_NUMBER` in `config/site.ts`. Use international format with digits only, so `024 123 4567` becomes `233241234567`.
2. Check the measurements in `data/sizes.ts` against your actual shirts.
3. Replace the placeholder and supplier photos with your own photos shot in Accra (see below).

---

## Change a price

Open `data/products.ts`, find the shirt and edit `price`. Write a whole number in cedis, so `price: 290` shows as **GHS 290**. Every page, the bag total, the WhatsApp messages, the Google product data and the share images all update from this one value.

## Add a product

1. Choose a short slug with lowercase words and dashes, for example `ridge-pink-oxford`. It becomes the page address `/shop/ridge-pink-oxford`.
2. Make a folder `public/products/ridge-pink-oxford/` and add 1–4 photos named `1.jpg`, `2.jpg` and so on.
   - Portrait 4:5 photos work best (e.g. 1200 × 1500 px). Keep each file under ~400 KB, because most customers use mobile data.
   - The first photo is used on the shop grid and in the WhatsApp/Instagram link preview.
3. Copy an existing entry in `data/products.ts` and edit it:

```ts
{
  slug: "ridge-pink-oxford",
  name: "Ridge Pink Oxford",
  line: "office",            // "office" | "everyday" | "bundle"
  pattern: "plain",          // "plain" | "stripe" | "check" | "denim"
  sleeve: "long",            // "long" | "short"
  price: 240,
  description: "One or two short sentences.",
  occasion: "Monday meetings",
  colour: "Pink",
  fabric: "100% cotton oxford",
  care: CARE_COTTON,
  fit: "Tailored fit. True to size.",
  images: ["/products/ridge-pink-oxford/1.jpg", "/products/ridge-pink-oxford/2.jpg"],
  sizes: SIZES,              // or e.g. ["L", "XL"] if some sizes are sold out
  featured: true,            // show on the home page (optional)
  added: "2026-12-01",       // used for "Newest" sorting
},
```

If you leave `images: []`, the site shows a grey placeholder with the product name until photos are ready.

To **remove** a product, delete its entry. To show a product as **sold out in a size**, take that size out of `sizes`.

---

## How WhatsApp ordering works

- **Order on WhatsApp** on a product page opens `https://wa.me/<number>?text=…` with:
  `Hello Sharp Gents, I'd like to order: 1 × Ridge Blue Stripe (Size L) – GHS 290.` followed by `Name:` and `Delivery location:` lines for the customer to fill in.
- **The bag** is saved in the customer's browser (localStorage). **Send order on WhatsApp** builds one message with every item, size, quantity and the total, then asks for name, location and payment method.
- **Corporate enquiries** (`/corporate`) open WhatsApp with company, contact, quantity, style, logo and deadline filled in.
- On mobile, a round WhatsApp button stays in the bottom-right corner of every page.

---

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new), import the repository and keep the default settings. Vercel detects Next.js automatically.
3. Under **Settings → Environment Variables**, add `NEXT_PUBLIC_SITE_URL` set to your live address (e.g. `https://sharpgents.com.gh`). This is used for the sitemap, canonical links and share previews.
4. Click **Deploy**. Every later push to the main branch redeploys automatically.

**Adding the domain later:** in Vercel open **Settings → Domains**, add the domain and follow the DNS instructions. Then update `NEXT_PUBLIC_SITE_URL` and redeploy.

---

## What's included

- **Pages:** Home, Shop (filter by line, pattern, sleeve and price; sort by newest or price), product pages (swipeable gallery, sizes, size-guide drawer, WhatsApp order and add to bag, "You may also like"), Corporate, About, Size Guide, Delivery & Exchanges, FAQ, Contact.
- **SEO:** a unique title and description on every page, Product JSON-LD with prices in GHS, a generated share image for every product (`/shop/<slug>/opengraph-image`), plus `sitemap.xml` and `robots.txt`.
- **Performance:** all pages are pre-rendered, images go through `next/image` (resized and served as WebP and lazy-loaded below the fold), and the fonts are self-hosted. Lighthouse mobile scored 92 for performance on the home, shop and product pages during development.

## Photography notes

The four photos in `public/products/` (and the hero in `public/editorial/`) came from the brand's supplier images. Replace them with your own shoots as soon as you can, because the design depends on real photos of real people in Accra. For the hero, a landscape or square photo at least 2000 px wide works best on large screens.
