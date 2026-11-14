"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { LINE_LABELS, PATTERN_LABELS, products, type Line, type Pattern, type Sleeve } from "@/data/products";
import { ProductCard } from "./ProductCard";

const PRICE_BUCKETS = {
  "under-200": { label: "Under GHS 200", test: (p: number) => p < 200 },
  "200-250": { label: "GHS 200–250", test: (p: number) => p >= 200 && p <= 250 },
  "over-250": { label: "Over GHS 250", test: (p: number) => p > 250 },
} as const;
type PriceKey = keyof typeof PRICE_BUCKETS;

const SORTS = {
  newest: "Newest",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
} as const;
type SortKey = keyof typeof SORTS;

function pick<T extends string>(value: string | null, allowed: readonly T[]): T | undefined {
  return allowed.includes(value as T) ? (value as T) : undefined;
}

export function ShopBrowser() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [showFilters, setShowFilters] = useState(false);

  const line = pick(params.get("line"), Object.keys(LINE_LABELS) as Line[]);
  const pattern = pick(params.get("pattern"), Object.keys(PATTERN_LABELS) as Pattern[]);
  const sleeve = pick(params.get("sleeve"), ["long", "short"] as Sleeve[]);
  const price = pick(params.get("price"), Object.keys(PRICE_BUCKETS) as PriceKey[]);
  const sort = pick(params.get("sort"), Object.keys(SORTS) as SortKey[]) ?? "newest";

  const results = useMemo(() => {
    const list = products.filter(
      (p) =>
        (line ? p.line === line : true) &&
        (pattern ? p.pattern === pattern && p.line !== "bundle" : true) &&
        (sleeve ? p.sleeve === sleeve && p.line !== "bundle" : true) &&
        (price ? PRICE_BUCKETS[price].test(p.price) : true),
    );
    return list.sort((a, b) =>
      sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : b.added.localeCompare(a.added),
    );
  }, [line, pattern, sleeve, price, sort]);

  function set(key: string, value?: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const activeCount = [pattern, sleeve, price].filter(Boolean).length;

  return (
    <>
      <div className="container-x">
        <nav aria-label="Product lines" className="no-scrollbar -mx-5 flex gap-6 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          {([undefined, "office", "everyday", "bundle"] as (Line | undefined)[]).map((l) => (
            <button
              key={l ?? "all"}
              onClick={() => set("line", l)}
              aria-pressed={line === l}
              className={`display shrink-0 pb-1 text-[30px] transition-colors sm:text-[40px] ${
                line === l ? "text-navy" : "text-navy/50 hover:text-navy/75"
              }`}
            >
              {l ? LINE_LABELS[l] : "All"}
            </button>
          ))}
        </nav>

        <div className="mt-8 flex items-center justify-between border-y border-navy/15 py-3">
          <button onClick={() => setShowFilters((v) => !v)} aria-expanded={showFilters} className="label">
            Filter{activeCount ? ` (${activeCount})` : ""} {showFilters ? "−" : "+"}
          </button>
          <p className="text-[12px] text-ink-muted" aria-live="polite">
            {results.length} {results.length === 1 ? "piece" : "pieces"}
          </p>
          <label className="label flex items-center gap-2">
            <span className="sr-only sm:not-sr-only">Sort</span>
            <select
              value={sort}
              onChange={(e) => set("sort", e.target.value === "newest" ? undefined : e.target.value)}
              className="cursor-pointer appearance-none bg-transparent text-right text-[11px] uppercase tracking-[0.18em] text-gold-deep outline-none"
            >
              {Object.entries(SORTS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </label>
        </div>

        {showFilters && (
          <div className="grid gap-6 border-b border-navy/15 py-6 sm:grid-cols-3">
            <FilterGroup
              title="Pattern"
              options={Object.entries(PATTERN_LABELS)}
              value={pattern}
              onChange={(v) => set("pattern", v)}
            />
            <FilterGroup
              title="Sleeve"
              options={[
                ["long", "Long sleeve"],
                ["short", "Short sleeve"],
              ]}
              value={sleeve}
              onChange={(v) => set("sleeve", v)}
            />
            <FilterGroup
              title="Price"
              options={Object.entries(PRICE_BUCKETS).map(([k, v]) => [k, v.label])}
              value={price}
              onChange={(v) => set("price", v)}
            />
            {activeCount > 0 && (
              <button
                onClick={() => router.replace(line ? `${pathname}?line=${line}` : pathname, { scroll: false })}
                className="text-left text-[13px] link-underline sm:col-span-3"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      <ShopGrid items={results} />
    </>
  );
}

function FilterGroup({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: [string, string][];
  value?: string;
  onChange: (v?: string) => void;
}) {
  return (
    <fieldset>
      <legend className="label mb-3 text-ink-muted">{title}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map(([k, label]) => (
          <button
            key={k}
            onClick={() => onChange(value === k ? undefined : k)}
            aria-pressed={value === k}
            className={`min-h-10 border px-4 text-[13px] transition-colors ${
              value === k ? "border-navy bg-navy text-paper" : "border-navy/20 hover:border-navy"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function ShopGrid({ items = products }: { items?: typeof products }) {
  if (items.length === 0) {
    return (
      <div className="container-x py-24">
        <p className="display text-3xl">Nothing matches those filters.</p>
        <p className="mt-3 text-sm text-ink-muted">Try another pattern or price, or ask us on WhatsApp — new stock lands often.</p>
      </div>
    );
  }
  return (
    <>
    <h2 className="sr-only">Products</h2>
    <ul className="container-x mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 lg:gap-y-16">
      {items.map((p, i) => (
        <li key={p.slug} className={i % 4 === 1 || i % 4 === 3 ? "lg:mt-12" : ""}>
          <ProductCard product={p} preload={i < 2} />
        </li>
      ))}
    </ul>
    </>
  );
}
