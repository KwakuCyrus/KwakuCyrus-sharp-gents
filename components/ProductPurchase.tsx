"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product, Size } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { singleItemMessage, waLink } from "@/lib/whatsapp";
import { useBag } from "./BagProvider";
import { Drawer } from "./Drawer";
import { SizeTable, HowToMeasure } from "./SizeTable";
import { WhatsAppGlyph } from "./WhatsAppGlyph";

export function ProductPurchase({ product }: { product: Product }) {
  const bag = useBag();
  const [size, setSize] = useState<Size | null>(null);
  const [needSize, setNeedSize] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);

  const href = size ? waLink(singleItemMessage({ name: product.name, size, quantity: 1, price: product.price })) : undefined;

  function requireSize(e: React.MouseEvent) {
    if (!size) {
      e.preventDefault();
      setNeedSize(true);
    }
  }

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="label" id="size-label">
          Size{size ? `: ${size}` : ""}
        </span>
        <button onClick={() => setGuideOpen(true)} className="text-[13px] link-underline">
          Size guide
        </button>
      </div>
      <div role="radiogroup" aria-labelledby="size-label" className="mt-3 grid grid-cols-4 gap-2">
        {product.sizes.map((s) => (
          <button
            key={s}
            role="radio"
            aria-checked={size === s}
            onClick={() => {
              setSize(s);
              setNeedSize(false);
            }}
            className={`h-12 border text-sm transition-colors ${
              size === s ? "border-navy bg-navy text-paper" : "border-navy/25 hover:border-navy"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <p className={`mt-2 h-5 text-[13px] text-[#9b2c2c] ${needSize ? "" : "invisible"}`} role="alert">
        {needSize ? "Choose a size first." : ""}
      </p>

      <div className="mt-2 grid gap-3">
        <a
          href={href ?? "#"}
          onClick={requireSize}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-dark w-full"
        >
          <WhatsAppGlyph /> Order on WhatsApp
        </a>
        <button
          onClick={(e) => {
            requireSize(e);
            if (size) {
              bag.add(product.slug, size);
              bag.open();
            }
          }}
          className="btn-outline w-full"
        >
          Add to bag — {formatPrice(product.price)}
        </button>
      </div>

      <Drawer open={guideOpen} onClose={() => setGuideOpen(false)} title="Size guide">
        <p className="display text-3xl">Find your size.</p>
        <p className="mt-3 text-sm text-ink-muted">Body measurements. {product.fit}</p>
        <div className="mt-6">
          <SizeTable />
        </div>
        <div className="mt-8">
          <HowToMeasure />
        </div>
        <Link href="/size-guide" className="mt-8 inline-block text-[13px] link-underline">
          Full size guide
        </Link>
      </Drawer>
    </div>
  );
}
