/**
 * Site-wide settings. Edit values here — every page reads from this file.
 */

/**
 * ⚠️ PLACEHOLDER WHATSAPP NUMBER — REPLACE BEFORE LAUNCH.
 * International format, digits only, no "+" and no leading 0.
 * Example for 024 123 4567 in Ghana → "233241234567".
 */
export const WHATSAPP_NUMBER = "233200000000";

/** Public URL of the site. Set NEXT_PUBLIC_SITE_URL in Vercel once the domain is live. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sharpgents.vercel.app").replace(/\/$/, "");

export const site = {
  name: "Sharp Gents Collections",
  shortName: "Sharp Gents",
  tagline: "Look sharp. Pay fair.",
  description:
    "Men's shirts from Accra. Office and everyday shirts in sizes M to XXL, ordered on WhatsApp. Pay with MoMo or on delivery in Accra & Tema.",
  instagram: "https://www.instagram.com/sharpgentsgh",
  tiktok: "https://www.tiktok.com/@sharpgentsgh",
  handle: "@sharpgentsgh",
  city: "Accra, Ghana",
  currency: "GHS",
  freeDeliveryOver: 600,
  deliveryFee: "GHS 30–50",
  hours: "Mon–Sat, 8am–8pm",
} as const;
