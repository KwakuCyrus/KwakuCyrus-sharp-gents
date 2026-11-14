# Sharp Gents Collections — Website Build Brief (for Codex)

## What we are building
A real e-commerce catalogue website for **Sharp Gents Collections**, a men's shirt brand in Accra, Ghana.
Customers browse shirts, pick a size, and order through **WhatsApp** (no online checkout in v1).
It must look like a genuine fashion label's website, NOT a template or AI-generated page.

## Business facts
- Brand: Sharp Gents Collections (short: Sharp Gents). Instagram/TikTok: @sharpgentsgh
- Location: Accra, Ghana. Currency: Ghana Cedis, shown as `GHS 250`.
- Customers: young professionals (office, church, events) and everyday buyers who want to look sharp at a fair price.
- Product lines:
  - **Office Line**: formal and business shirts (white textured, blue stripe, navy pinstripe, oxford stripe, short-sleeve check). GHS 180–290.
  - **Everyday Line**: linen-look stripe, cotton plaid, washed denim, colour stripe. GHS 190–240.
  - **Bundles**: Work Week 3-Pack (GHS 690), 5-Day Pack (GHS 1,100).
- Sizes: M, L, XL, XXL.
- Ordering: WhatsApp. Payment: MoMo, bank transfer, pay on delivery (Accra & Tema).
- Delivery: Accra & Tema in 24–48h (GHS 30–50, free over GHS 600). Nationwide by courier or bus.
- Exchanges: 7 days, unworn, tags on.
- Corporate: branded/embroidered shirts for companies, churches, schools and events. 50+ pieces, 3–5 weeks.

## Tech stack
- Next.js (App Router) + TypeScript + Tailwind CSS.
- Static-first: products live in `data/products.ts` so they can be edited without touching components.
- Images in `public/products/<slug>/` (1–4 photos each) using `next/image`.
- Deploy target: Vercel. Domain to be added later.
- No database or login in v1.

## Pages
1. **Home**: full-bleed photo hero (a real model in a shirt), short headline, two CTAs (Shop / WhatsApp). Then featured shirts, Office vs Everyday line split, bundles, a "how ordering works" strip (Choose → WhatsApp → Pay MoMo or on delivery), and a lookbook/Instagram grid.
2. **Shop** (`/shop`): filter by line, pattern (plain/stripe/check/denim), sleeve and price. Sort by price or newest.
3. **Product page** (`/shop/[slug]`): photo gallery with swipe on mobile, price, size selector, fabric and care notes, size guide in a drawer, "Order on WhatsApp", "Add to bag", and "You may also like".
4. **Bag**: slide-over drawer listing items, quantities and total, with a "Send order on WhatsApp" button that builds one formatted message.
5. **Corporate** (`/corporate`): enquiry form that opens WhatsApp with company, quantity, logo and deadline filled in.
6. **About**, **Size Guide**, **Delivery & Exchanges**, **FAQ**, **Contact**.

## WhatsApp ordering
- Number set once in `config/site.ts` (`WHATSAPP_NUMBER`, international format, no +).
- Links use `https://wa.me/<number>?text=<encoded message>`.
- Single item message:
  `Hello Sharp Gents, I'd like to order: 1 × Ridge Blue Stripe (Size L) – GHS 290. Name: … Delivery location: …`
- The bag message lists every item, size, quantity and the total, then asks for name, location and payment method.
- Keep the bag in localStorage.
- Show a floating WhatsApp button on mobile.

## Design direction (important: avoid the "AI website" look)
- **Photography leads.** Large, real, well-lit product and model photos shot in Accra. The design should frame the photos and get out of the way.
- **Editorial, not template.** Asymmetric layouts, generous white space, big type, image-led sections. No centred stacks of identical cards in every section.
- **Do NOT use:** emoji or generic icon tiles, glowing gradients, glassmorphism, "✦" bullets, stock "feature card" grids, purple/blue AI gradients, or fake stats.
- **Colours:** deep navy `#0F1E33`, warm off-white `#F4EFE6`, muted gold `#C8A25A` used sparingly (prices, small accents, links). Mostly off-white pages with navy text.
- **Type:** one distinctive display face for headings (e.g. "Fraunces", "Cormorant Garamond" or "Canela"-style serif) plus a clean grotesk for body ("Inter Tight" or "Manrope"). Tight letter-spacing on large headings, uppercase small labels.
- **Copy:** short, confident, local. For example: "Look sharp. Pay fair." and "From Ridge to Osu." Mention real places and real occasions (Monday meetings, Sunday service, weddings, Detty December).
- **Motion:** subtle only. Image fade-in and hover zoom on product photos. Nothing bouncy.
- **Mobile first:** most traffic will come from Instagram, TikTok and WhatsApp on Android phones. Test at 360px wide, keep pages fast and images compressed.

## SEO & performance
- Unique page titles and meta descriptions. Open Graph images per product, so links look good when shared on WhatsApp.
- Product JSON-LD schema with price in GHS.
- Lighthouse mobile score of 90+. Lazy-load images below the fold.
- Add `sitemap.xml` and `robots.txt`.

## Placeholders
- Until real photos arrive, use neutral grey image placeholders with the product name. Do not draw fake shirts or use AI-generated people.
- Use a placeholder WhatsApp number and mark it clearly in `config/site.ts`.

## Definition of done
- `npm run build` passes with no type errors.
- All pages work on mobile and desktop.
- WhatsApp messages are correctly encoded and formatted.
- Products, prices and the WhatsApp number can be edited in one place each.
- README explains how to add a product, change prices and deploy to Vercel.
