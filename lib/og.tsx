import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };

export async function loadPublicImage(src: string) {
  const data = await readFile(join(process.cwd(), "public", src));
  const type = src.endsWith(".png") ? "image/png" : "image/jpeg";
  return `data:${type};base64,${data.toString("base64")}`;
}

/** Fraunces (SIL Open Font License), bundled so OG images build without network access. */
export async function loadDisplayFont() {
  const data = await readFile(join(process.cwd(), "assets/fonts/Fraunces-144pt-Regular.ttf"));
  return [{ name: "Fraunces", data, style: "normal" as const, weight: 400 as const }];
}
