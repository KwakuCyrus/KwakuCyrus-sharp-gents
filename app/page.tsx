import Image from "next/image";
import Link from "next/link";
import { bundles, featured, getProduct, products, type Line } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { WhatsAppGlyph } from "@/components/WhatsAppGlyph";
import { formatPrice } from "@/lib/format";
import { waLink } from "@/lib/whatsapp";
import { site } from "@/config/site";

function priceRange(line: Line) {
  const prices = products.filter((p) => p.line === line).map((p) => p.price);
  return `${formatPrice(Math.min(...prices))}–${Math.max(...prices)}`;
}

const LOOKBOOK = [
  { src: "/products/labadi-linen-sky/1.jpg", caption: "Labadi Linen-Look, Sky", href: "/shop/labadi-linen-sky" },
  { src: undefined, caption: "Sunday service, Dzorwulu", href: undefined },
  { src: "/products/cantonments-stretch-navy/1.jpg", caption: "Cantonments Stretch, Navy", href: "/shop/cantonments-stretch-navy" },
  { src: undefined, caption: "Friday drinks, Osu", href: undefined },
  { src: "/editorial/hero-sand-linen.jpg", caption: "Detty December, Labadi", href: "/shop/labadi-linen-sand" },
  { src: undefined, caption: "Wedding guest, East Legon", href: undefined },
];

export default function Home() {
  const picks = [...featured()].sort((a, b) => Number(b.images.length > 0) - Number(a.images.length > 0));
  const [lead, ...rest] = picks;
  const office = getProduct("cantonments-stretch-navy")!;
  const everyday = getProduct("labadi-linen-sky")!;

  return (
    <>
      {/* ——— HERO ——— */}
      <section className="bg-navy text-paper lg:grid lg:min-h-[calc(100dvh-6.25rem)] lg:grid-cols-12">
        <div className="relative aspect-square w-full sm:aspect-[4/3] lg:order-2 lg:col-span-7 lg:aspect-auto">
          <Image
            src="/editorial/hero-sand-linen.jpg"
            alt="Man wearing the Labadi Linen-Look shirt in sand with white trousers"
            fill
            preload
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover object-[50%_20%]"
          />
          <Link
            href="/shop/labadi-linen-sand"
            className="label absolute right-4 bottom-4 bg-paper/90 px-3 py-2 text-navy hover:bg-paper lg:right-6 lg:bottom-6"
          >
            Labadi Linen-Look, GHS 220
          </Link>
        </div>

        <div className="px-5 pt-8 pb-12 sm:px-8 lg:order-1 lg:col-span-5 lg:flex lg:flex-col lg:justify-between lg:px-12 lg:py-14">
          <p className="label hidden text-gold lg:block">New season · Accra</p>
          <div>
            <h1 className="display text-[56px] sm:text-[88px] lg:text-[clamp(84px,8vw,132px)]">
              Look sharp.
              <br />
              <em className="text-gold">Pay fair.</em>
            </h1>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-paper/80 lg:mt-8">
              Office and everyday shirts in M to XXL. Order on WhatsApp, pay with MoMo or on delivery.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-10">
              <Link href="/shop" className="btn-light">
                Shop shirts
              </Link>
              <a href={waLink("Hello Sharp Gents, I'd like to see what's in stock.")} target="_blank" rel="noopener noreferrer" className="btn border border-paper/40 text-paper hover:bg-paper hover:text-navy">
                <WhatsAppGlyph /> Order on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ——— FEATURED ——— */}
      <section className="container-x py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="label text-gold-deep">This week</p>
            <h2 className="display mt-3 text-[44px] sm:text-[56px]">The shirts we&apos;re reaching for.</h2>
            <div className="mt-10 hidden lg:block">
              <ProductCard product={lead} sizes="(min-width: 1024px) 38vw, 100vw" />
            </div>
          </div>
          {/* Mobile: swipeable row */}
          <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:hidden">
            {picks.map((p) => (
              <div key={p.slug} className="w-[68vw] max-w-[300px] shrink-0 snap-start">
                <ProductCard product={p} sizes="68vw" />
              </div>
            ))}
          </div>
          <div className="hidden lg:col-span-6 lg:col-start-7 lg:mt-40 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-14">
            {rest.slice(0, 4).map((p, i) => (
              <div key={p.slug} className={i % 2 === 1 ? "lg:mt-20" : ""}>
                <ProductCard product={p} sizes="(min-width: 1024px) 22vw, 50vw" />
              </div>
            ))}
          </div>
        </div>
        <Link href="/shop" className="label link-underline mt-12 inline-block lg:mt-4">
          See all shirts
        </Link>
      </section>

      {/* ——— LINE SPLIT ——— */}
      <section>
        <div className="bg-navy text-paper">
          <div className="container-x grid items-center gap-10 py-16 lg:grid-cols-12 lg:py-0">
            <Link href="/shop?line=office" className="group block lg:col-span-6 lg:-my-px">
              <ProductImage
                src={office.images[0]}
                name={office.name}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-[4/5] lg:aspect-[5/6]"
                zoom
              />
            </Link>
            <div className="lg:col-span-5 lg:col-start-8 lg:py-24">
              <p className="label text-gold">Office Line · {priceRange("office")}</p>
              <h2 className="display mt-4 text-[48px] sm:text-[64px]">
                Monday meetings to <em>Sunday service.</em>
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-paper/75">
                White textures, blue stripes, navy pinstripes and stretch plains. Shirts that hold a crease through a
                full day in Ridge and still look right at the evening programme.
              </p>
              <Link href="/shop?line=office" className="btn-light mt-8">
                Shop Office
              </Link>
            </div>
          </div>
        </div>

        <div className="container-x grid items-center gap-10 py-16 lg:grid-cols-12 lg:py-24">
          <div className="order-2 lg:order-1 lg:col-span-4 lg:col-start-2">
            <p className="label text-gold-deep">Everyday Line · {priceRange("everyday")}</p>
            <h2 className="display mt-4 text-[48px] sm:text-[64px]">
              From Ridge <em>to Osu.</em>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-navy/75">
              Linen-look weaves, cotton plaids, washed denim and bold stripes. For weekends, weddings, long lunches and
              Detty December.
            </p>
            <Link href="/shop?line=everyday" className="btn-dark mt-8">
              Shop Everyday
            </Link>
          </div>
          <Link href="/shop?line=everyday" className="group order-1 block lg:order-2 lg:col-span-5 lg:col-start-7">
            <ProductImage src={everyday.images[0]} name={everyday.name} sizes="(min-width: 1024px) 42vw, 100vw" className="aspect-[4/5]" zoom />
          </Link>
        </div>
      </section>

      {/* ——— BUNDLES ——— */}
      <section className="bg-paper-deep">
        <div className="container-x grid gap-10 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-4">
            <p className="label text-gold-deep">Bundles</p>
            <h2 className="display mt-3 text-[48px] sm:text-[64px]">Buy the week.</h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-navy/75">
              One size, your choice of colours. Tell us what you like on WhatsApp, or let us build the set.
            </p>
          </div>
          <ul className="border-t border-navy/20 lg:col-span-7 lg:col-start-6">
            {bundles().map((b) => (
              <li key={b.slug} className="border-b border-navy/20">
                <Link href={`/shop/${b.slug}`} className="group grid gap-3 py-8 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div>
                    <h3 className="display text-[40px] transition-colors group-hover:text-gold-deep sm:text-[52px]">{b.name}</h3>
                    <p className="mt-2 text-sm text-ink-muted">{b.includes?.join(" · ")}</p>
                  </div>
                  <p className="font-display text-[28px] text-gold-deep">{formatPrice(b.price)}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ——— HOW ORDERING WORKS ——— */}
      <section className="container-x py-20 lg:py-28">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <h2 className="display text-[44px] sm:text-[56px]">How ordering works.</h2>
          <p className="max-w-sm text-sm text-ink-muted">No account, no card. Just a chat with us.</p>
        </div>
        <ol className="mt-12 grid gap-10 border-t border-navy/20 pt-10 md:grid-cols-3 md:gap-8">
          {[
            ["Choose", "Pick your shirt and size here. Add a few to your bag if you're buying for the week."],
            ["WhatsApp", "Tap “Order on WhatsApp”. Your order arrives as one ready-made message. We reply to confirm stock and delivery."],
            ["Pay", "Pay by MoMo or bank transfer, or pay on delivery in Accra & Tema. Nationwide by courier or bus."],
          ].map(([title, body], i) => (
            <li key={title} className="grid grid-cols-[auto_1fr] gap-5">
              <span className="font-display text-[56px] leading-none text-gold">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-lg font-medium">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-navy/70">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ——— LOOKBOOK ——— */}
      <section className="border-t border-navy/10 py-20 lg:py-28">
        <div className="container-x flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="label text-gold-deep">Lookbook</p>
            <h2 className="display mt-3 text-[44px] sm:text-[56px]">Worn in Accra.</h2>
          </div>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="label link-underline">
            Follow {site.handle}
          </a>
        </div>
        <div className="container-x mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6">
          {LOOKBOOK.map((item, i) => {
            const tile = (
              <figure className="group">
                <ProductImage
                  src={item.src}
                  name={item.caption}
                  sizes="(min-width: 1024px) 16vw, 50vw"
                  className={i % 3 === 1 ? "aspect-square" : "aspect-[4/5]"}
                  zoom={!!item.src}
                />
                <figcaption className="mt-2 text-[12px] text-ink-muted">{item.caption}</figcaption>
              </figure>
            );
            return (
              <div key={item.caption} className={i % 2 === 1 ? "lg:mt-16" : ""}>
                {item.href ? <Link href={item.href}>{tile}</Link> : tile}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
