import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { SITE_URL } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/shop", "/corporate", "/about", "/size-guide", "/delivery", "/faq", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
  const items = products.map((p) => ({
    url: `${SITE_URL}/shop/${p.slug}`,
    lastModified: new Date(`${p.added}T00:00:00Z`),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  return [...pages, ...items];
}
