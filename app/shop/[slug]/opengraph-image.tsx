import { ImageResponse } from "next/og";
import { getProduct, LINE_LABELS, products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { loadDisplayFont, loadPublicImage, OG_SIZE } from "@/lib/og";

export const alt = "Sharp Gents Collections shirt";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug)!;
  const photo = product.images[0] ? await loadPublicImage(product.images[0]) : null;
  const fonts = await loadDisplayFont();

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#F4EFE6", color: "#0F1E33" }}>
        <div style={{ display: "flex", width: 440, height: 630, background: "#D8D4CC", alignItems: "center", justifyContent: "center" }}>
          {photo ? (
            <img src={photo} width={440} height={630} style={{ objectFit: "cover" }} alt="" />
          ) : (
            <div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "rgba(15,30,51,0.45)" }}>
              Photo coming soon
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, padding: "56px 64px" }}>
          <div style={{ fontSize: 24, letterSpacing: 5, textTransform: "uppercase", color: "#7D6230" }}>
            {LINE_LABELS[product.line]}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: fonts.length ? "Fraunces" : undefined, fontSize: 76, lineHeight: 1, letterSpacing: -2 }}>
              {product.name}
            </div>
            <div style={{ fontSize: 40, marginTop: 28, color: "#7D6230" }}>{formatPrice(product.price)}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
            <span style={{ fontFamily: fonts.length ? "Fraunces" : undefined, fontSize: 32 }}>Sharp Gents.</span>
            <span style={{ color: "rgba(15,30,51,0.6)" }}>Order on WhatsApp · Accra</span>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
