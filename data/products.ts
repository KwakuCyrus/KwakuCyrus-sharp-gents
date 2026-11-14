/**
 * PRODUCT CATALOGUE — the only file you need to edit to add a shirt or change a price.
 *
 * Photos go in /public/products/<slug>/ (e.g. 1.jpg, 2.jpg …) and are listed in `images`.
 * Leave `images` empty to show a grey placeholder with the product name.
 * Portrait photos (4:5, e.g. 1200 × 1500) look best.
 */

export type Line = "office" | "everyday" | "bundle";
export type Pattern = "plain" | "stripe" | "check" | "denim";
export type Sleeve = "long" | "short";
export type Size = "M" | "L" | "XL" | "XXL";

export const SIZES: Size[] = ["M", "L", "XL", "XXL"];

export type Product = {
  slug: string;
  name: string;
  line: Line;
  pattern: Pattern;
  sleeve: Sleeve;
  /** Price in Ghana Cedis, whole number. */
  price: number;
  /** One or two sentences for the product page. */
  description: string;
  /** Short note used on cards, e.g. "Monday meetings". */
  occasion: string;
  colour: string;
  fabric: string;
  care: string[];
  fit: string;
  images: string[];
  sizes: Size[];
  featured?: boolean;
  /** Date added (YYYY-MM-DD), used for "Newest" sorting. */
  added: string;
  /** For bundles: what's inside. */
  includes?: string[];
};

const CARE_COTTON = ["Machine wash cold, like colours", "Hang to dry in the shade", "Warm iron while slightly damp"];
const CARE_LINEN = ["Gentle wash cold", "Hang to dry — it softens with every wash", "Iron on medium, or wear the creases with confidence"];

export const products: Product[] = [
  // ——— OFFICE LINE ———
  {
    slug: "ridge-blue-stripe",
    name: "Ridge Blue Stripe",
    line: "office",
    pattern: "stripe",
    sleeve: "long",
    price: 290,
    description: "Fine blue stripe on a crisp white ground. The shirt for the Monday meeting where you need to be taken seriously.",
    occasion: "Monday meetings",
    colour: "Blue / white stripe",
    fabric: "100% cotton poplin, 120 gsm",
    care: CARE_COTTON,
    fit: "Tailored fit through the chest and waist. Size up if you prefer room.",
    images: [],
    sizes: SIZES,
    featured: true,
    added: "2026-10-20",
  },
  {
    slug: "cantonments-stretch-navy",
    name: "Cantonments Stretch — Navy",
    line: "office",
    pattern: "plain",
    sleeve: "long",
    price: 260,
    description: "Deep navy with a little stretch, so it moves with you from the desk to the evening event. Holds its shape all day.",
    occasion: "Office to evening",
    colour: "Navy",
    fabric: "Cotton blend with 5% stretch",
    care: CARE_COTTON,
    fit: "Slim fit with stretch. True to size.",
    images: ["/products/cantonments-stretch-navy/1.jpg"],
    sizes: SIZES,
    featured: true,
    added: "2026-11-02",
  },
  {
    slug: "cantonments-stretch-royal",
    name: "Cantonments Stretch — Royal Blue",
    line: "office",
    pattern: "plain",
    sleeve: "long",
    price: 260,
    description: "A confident royal blue that still works with a navy suit. Wrinkle-resistant stretch cotton for long days.",
    occasion: "Sunday service",
    colour: "Royal blue",
    fabric: "Cotton blend with 5% stretch",
    care: CARE_COTTON,
    fit: "Slim fit with stretch. True to size.",
    images: ["/products/cantonments-stretch-royal/1.jpg"],
    sizes: SIZES,
    added: "2026-11-02",
  },
  {
    slug: "ridge-white-textured",
    name: "Ridge White Textured",
    line: "office",
    pattern: "plain",
    sleeve: "long",
    price: 250,
    description: "A white shirt with a subtle dobby texture. Reads clean from across the room, rich up close.",
    occasion: "Interviews & weddings",
    colour: "White",
    fabric: "100% cotton dobby",
    care: CARE_COTTON,
    fit: "Tailored fit. True to size.",
    images: [],
    sizes: SIZES,
    featured: true,
    added: "2026-09-12",
  },
  {
    slug: "airport-navy-pinstripe",
    name: "Airport Navy Pinstripe",
    line: "office",
    pattern: "stripe",
    sleeve: "long",
    price: 280,
    description: "Navy ground, thin white pinstripe. Boardroom energy without the boardroom price.",
    occasion: "Presentations",
    colour: "Navy / white pinstripe",
    fabric: "100% cotton twill",
    care: CARE_COTTON,
    fit: "Tailored fit. True to size.",
    images: [],
    sizes: SIZES,
    added: "2026-08-30",
  },
  {
    slug: "osu-oxford-stripe",
    name: "Osu Oxford Stripe",
    line: "office",
    pattern: "stripe",
    sleeve: "long",
    price: 240,
    description: "Soft oxford weave with a classic university stripe and a button-down collar. Office on Friday, out on Oxford Street after.",
    occasion: "Friday at the office",
    colour: "Light blue stripe",
    fabric: "100% cotton oxford",
    care: CARE_COTTON,
    fit: "Regular fit. True to size.",
    images: [],
    sizes: SIZES,
    added: "2026-07-18",
  },
  {
    slug: "tema-short-sleeve-check",
    name: "Tema Short-Sleeve Check",
    line: "office",
    pattern: "check",
    sleeve: "short",
    price: 180,
    description: "A small, quiet check in a short sleeve for the hottest days. Smart enough to tuck in.",
    occasion: "Hot office days",
    colour: "Blue micro-check",
    fabric: "Cotton blend",
    care: CARE_COTTON,
    fit: "Regular fit. True to size.",
    images: [],
    sizes: SIZES,
    added: "2026-06-05",
  },

  // ——— EVERYDAY LINE ———
  {
    slug: "labadi-linen-sand",
    name: "Labadi Linen-Look — Sand",
    line: "everyday",
    pattern: "plain",
    sleeve: "long",
    price: 220,
    description: "Breathable linen-look weave in a warm sand. Sleeves rolled, top button open, white trousers. Detty December, sorted.",
    occasion: "Detty December",
    colour: "Sand",
    fabric: "Cotton–linen blend",
    care: CARE_LINEN,
    fit: "Relaxed fit. Size down for a closer cut.",
    images: ["/products/labadi-linen-sand/1.jpg"],
    sizes: SIZES,
    featured: true,
    added: "2026-11-10",
  },
  {
    slug: "labadi-linen-sky",
    name: "Labadi Linen-Look — Sky",
    line: "everyday",
    pattern: "plain",
    sleeve: "long",
    price: 220,
    description: "The same easy linen-look shirt in a cool sky blue. Made for beach weddings and long lunches.",
    occasion: "Beach weddings",
    colour: "Sky blue",
    fabric: "Cotton–linen blend",
    care: CARE_LINEN,
    fit: "Relaxed fit. Size down for a closer cut.",
    images: ["/products/labadi-linen-sky/1.jpg"],
    sizes: SIZES,
    featured: true,
    added: "2026-11-10",
  },
  {
    slug: "labadi-linen-stripe",
    name: "Labadi Linen-Look Stripe",
    line: "everyday",
    pattern: "stripe",
    sleeve: "long",
    price: 230,
    description: "A wide, relaxed stripe in our linen-look weave. Weekend shirt, holiday shirt, any-day shirt.",
    occasion: "Weekends",
    colour: "Navy / cream stripe",
    fabric: "Cotton–linen blend",
    care: CARE_LINEN,
    fit: "Relaxed fit. Size down for a closer cut.",
    images: [],
    sizes: SIZES,
    added: "2026-10-01",
  },
  {
    slug: "adabraka-cotton-plaid",
    name: "Adabraka Cotton Plaid",
    line: "everyday",
    pattern: "check",
    sleeve: "long",
    price: 210,
    description: "Soft brushed cotton plaid. Wear it buttoned or open over a tee.",
    occasion: "Casual Friday",
    colour: "Navy / rust plaid",
    fabric: "100% brushed cotton",
    care: CARE_COTTON,
    fit: "Regular fit. True to size.",
    images: [],
    sizes: SIZES,
    added: "2026-09-02",
  },
  {
    slug: "east-legon-washed-denim",
    name: "East Legon Washed Denim",
    line: "everyday",
    pattern: "denim",
    sleeve: "long",
    price: 240,
    description: "Lightweight denim, washed for a soft hand and a lived-in blue. Gets better every time you wear it.",
    occasion: "Weekend plans",
    colour: "Mid-wash blue",
    fabric: "100% cotton chambray denim, 5 oz",
    care: ["Wash inside out, cold", "Hang to dry", "Expect gentle fading — that's the point"],
    fit: "Regular fit. True to size.",
    images: [],
    sizes: SIZES,
    featured: true,
    added: "2026-10-12",
  },
  {
    slug: "jamestown-colour-stripe",
    name: "Jamestown Colour Stripe",
    line: "everyday",
    pattern: "stripe",
    sleeve: "short",
    price: 190,
    description: "Bold multi-colour stripe in a short sleeve. For the hangout, the game, the evening by the sea.",
    occasion: "Hangouts",
    colour: "Multi stripe",
    fabric: "100% cotton",
    care: CARE_COTTON,
    fit: "Relaxed fit. True to size.",
    images: [],
    sizes: SIZES,
    added: "2026-08-08",
  },

  // ——— BUNDLES ———
  {
    slug: "work-week-3-pack",
    name: "Work Week 3-Pack",
    line: "bundle",
    pattern: "plain",
    sleeve: "long",
    price: 690,
    description: "Three Office Line shirts in one size. Tell us your colours on WhatsApp, or let us pick a balanced set for you.",
    occasion: "Monday to Wednesday, sorted",
    colour: "Your choice",
    fabric: "Office Line shirts (mixed)",
    care: CARE_COTTON,
    fit: "One size across all three shirts.",
    images: [],
    sizes: SIZES,
    added: "2026-10-01",
    includes: ["3 Office Line shirts", "Mix plains and stripes", "Free delivery in Accra & Tema"],
  },
  {
    slug: "5-day-pack",
    name: "5-Day Pack",
    line: "bundle",
    pattern: "plain",
    sleeve: "long",
    price: 1100,
    description: "A shirt for every working day. Five Office Line shirts in one size, chosen by you or by us.",
    occasion: "The whole week",
    colour: "Your choice",
    fabric: "Office Line shirts (mixed)",
    care: CARE_COTTON,
    fit: "One size across all five shirts.",
    images: [],
    sizes: SIZES,
    added: "2026-10-01",
    includes: ["5 Office Line shirts", "Mix plains, stripes and checks", "Free delivery in Accra & Tema"],
  },
];

export const LINE_LABELS: Record<Line, string> = {
  office: "Office Line",
  everyday: "Everyday Line",
  bundle: "Bundles",
};

export const PATTERN_LABELS: Record<Pattern, string> = {
  plain: "Plain",
  stripe: "Stripe",
  check: "Check",
  denim: "Denim",
};

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function shirts() {
  return products.filter((p) => p.line !== "bundle");
}

export function bundles() {
  return products.filter((p) => p.line === "bundle");
}

export function featured() {
  return products.filter((p) => p.featured);
}

export function related(product: Product, count = 4) {
  const others = products.filter((p) => p.slug !== product.slug && p.line !== "bundle");
  const sameLine = others.filter((p) => p.line === product.line);
  const rest = others.filter((p) => p.line !== product.line);
  return [...sameLine, ...rest].slice(0, count);
}
