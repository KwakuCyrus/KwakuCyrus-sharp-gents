import { ImageResponse } from "next/og";
import { loadDisplayFont, loadPublicImage, OG_SIZE } from "@/lib/og";

export const alt = "Sharp Gents Collections — Look sharp. Pay fair.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  const photo = await loadPublicImage("/editorial/hero-sand-linen.jpg");
  const fonts = await loadDisplayFont();
  const ff = fonts.length ? "Fraunces" : undefined;
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#0F1E33", color: "#F4EFE6" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, padding: "56px 64px" }}>
          <div style={{ fontFamily: ff, fontSize: 36 }}>Sharp Gents.</div>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: ff, fontSize: 104, lineHeight: 0.95, letterSpacing: -3 }}>
            <span>Look sharp.</span>
            <span style={{ color: "#C8A25A" }}>Pay fair.</span>
          </div>
          <div style={{ fontSize: 24, color: "rgba(244,239,230,0.7)" }}>Men&apos;s shirts · Accra · Order on WhatsApp</div>
        </div>
        <img src={photo} width={440} height={630} style={{ objectFit: "cover" }} alt="" />
      </div>
    ),
    { ...size, fonts },
  );
}
