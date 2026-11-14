import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, LINE_LABELS, PATTERN_LABELS, products, related } from "@/data/products";
import { Gallery } from "@/components/Gallery";
import { ProductPurchase } from "@/components/ProductPurchase";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice } from "@/lib/format";
import { SITE_URL, site } from "@/config/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const title = `${product.name} — ${formatPrice(product.price)}`;
  const description = `${product.description} Sizes ${product.sizes.join(", ")}. Order on WhatsApp, delivery across Accra & Tema.`;
  return {
    title,
    description,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: { title, description, url: `/shop/${product.slug}`, type: "website" },
  };
}

export default async function ProductPage({ params }: PageProps<"/shop/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.slug,
    brand: { "@type": "Brand", name: site.name },
    color: product.colour,
    material: product.fabric,
    category: product.line === "bundle" ? "Shirt bundle" : "Men's shirt",
    image: product.images.length
      ? product.images.map((src) => `${SITE_URL}${src}`)
      : [`${SITE_URL}/shop/${product.slug}/opengraph-image`],
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/shop/${product.slug}`,
      priceCurrency: "GHS",
      price: product.price.toFixed(2),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: site.name },
    },
  };

  const lineHref = `/shop?line=${product.line}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="lg:container-x lg:grid lg:grid-cols-12 lg:gap-12 lg:pt-10">
        <div className="lg:col-span-7">
          <Gallery images={product.images} name={product.name} />
        </div>

        <div className="container-x pt-8 lg:col-span-5 lg:px-0 lg:pt-0">
          <div className="lg:sticky lg:top-24">
            <nav aria-label="Breadcrumb" className="label text-ink-muted">
              <Link href="/shop" className="hover:text-navy">Shop</Link> /{" "}
              <Link href={lineHref} className="hover:text-navy">{LINE_LABELS[product.line]}</Link>
            </nav>
            <h1 className="display mt-4 text-[44px] sm:text-[56px]">{product.name}</h1>
            <p className="mt-4 font-display text-[26px] text-gold-deep">{formatPrice(product.price)}</p>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-navy/80">{product.description}</p>

            {product.includes && (
              <ul className="mt-6 space-y-1.5 text-[15px]">
                {product.includes.map((i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-gold">—</span> {i}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8">
              <ProductPurchase product={product} />
            </div>

            <p className="mt-5 text-[13px] leading-relaxed text-ink-muted">
              Delivery in Accra &amp; Tema in 24–48h ({site.deliveryFee}, free over GHS {site.freeDeliveryOver}).
              Nationwide by courier or bus. Exchanges within 7 days, unworn with tags on.
            </p>

            <div className="mt-10 border-t border-navy/15">
              <Detail title="Fabric & fit" open>
                <dl className="grid grid-cols-[110px_1fr] gap-y-2">
                  <dt className="text-ink-muted">Fabric</dt>
                  <dd>{product.fabric}</dd>
                  <dt className="text-ink-muted">Colour</dt>
                  <dd>{product.colour}</dd>
                  {product.line !== "bundle" && (
                    <>
                      <dt className="text-ink-muted">Pattern</dt>
                      <dd>{PATTERN_LABELS[product.pattern]}</dd>
                      <dt className="text-ink-muted">Sleeve</dt>
                      <dd>{product.sleeve === "long" ? "Long sleeve" : "Short sleeve"}</dd>
                    </>
                  )}
                  <dt className="text-ink-muted">Fit</dt>
                  <dd>{product.fit}</dd>
                </dl>
              </Detail>
              <Detail title="Care">
                <ul className="space-y-1.5">
                  {product.care.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </Detail>
              <Detail title="Paying & delivery">
                <p>
                  Send your order on WhatsApp and we confirm stock and the delivery fee. Pay by MoMo or bank transfer,
                  or pay on delivery in Accra &amp; Tema. Outside Accra we send by courier or bus once payment is in.{" "}
                  <Link href="/delivery" className="link-underline">Delivery &amp; exchanges</Link>
                </p>
              </Detail>
            </div>
          </div>
        </div>
      </div>

      <section className="container-x py-20 lg:py-28">
        <h2 className="display text-[36px] sm:text-[44px]">You may also like.</h2>
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {related(product).map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function Detail({ title, children, open }: { title: string; children: React.ReactNode; open?: boolean }) {
  return (
    <details open={open} className="group border-b border-navy/15">
      <summary className="label flex cursor-pointer list-none items-center justify-between py-4 [&::-webkit-details-marker]:hidden">
        {title}
        <span className="text-base font-normal transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="pb-5 text-[14px] leading-relaxed text-navy/80">{children}</div>
    </details>
  );
}
