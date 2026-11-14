"use client";

import Link from "next/link";
import { useBag } from "./BagProvider";
import { Drawer } from "./Drawer";
import { ProductImage } from "./ProductImage";
import { WhatsAppGlyph } from "./WhatsAppGlyph";
import { formatPrice } from "@/lib/format";
import { bagMessage, waLink } from "@/lib/whatsapp";
import { site } from "@/config/site";

export function BagDrawer() {
  const bag = useBag();
  const remaining = site.freeDeliveryOver - bag.total;

  return (
    <Drawer
      open={bag.isOpen}
      onClose={bag.close}
      title={`Your bag (${bag.count})`}
      footer={
        bag.lines.length > 0 ? (
          <div>
            <div className="flex items-baseline justify-between">
              <span className="label">Total</span>
              <span className="font-display text-2xl">{formatPrice(bag.total)}</span>
            </div>
            <p className="mt-1 text-[12px] text-ink-muted">
              {remaining > 0
                ? `Add ${formatPrice(remaining)} more for free delivery in Accra & Tema.`
                : "Free delivery in Accra & Tema."}
            </p>
            <a
              href={waLink(bagMessage(bag.lines))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dark mt-4 w-full"
            >
              <WhatsAppGlyph /> Send order on WhatsApp
            </a>
            <p className="mt-3 text-center text-[12px] text-ink-muted">
              We confirm stock and delivery, then you pay by MoMo, bank transfer or on delivery.
            </p>
          </div>
        ) : null
      }
    >
      {bag.lines.length === 0 ? (
        <div className="pt-10">
          <p className="display text-3xl">Your bag is empty.</p>
          <p className="mt-3 text-sm text-ink-muted">Start with an Office Line shirt for Monday.</p>
          <Link href="/shop" onClick={bag.close} className="btn-outline mt-8">
            Shop shirts
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-navy/10">
          {bag.lines.map((l) => (
            <li key={`${l.slug}-${l.size}`} className="flex gap-4 py-5 first:pt-0">
              <Link href={`/shop/${l.slug}`} onClick={bag.close} className="w-20 shrink-0">
                <ProductImage src={l.image} name={l.name} sizes="80px" className="aspect-[4/5]" />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-3">
                  <Link href={`/shop/${l.slug}`} onClick={bag.close} className="text-[15px] leading-snug">
                    {l.name}
                  </Link>
                  <span className="shrink-0 text-[14px] text-gold-deep">{formatPrice(l.price * l.quantity)}</span>
                </div>
                <p className="mt-1 text-[12px] text-ink-muted">Size {l.size}</p>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center border border-navy/20">
                    <button
                      aria-label={`Decrease quantity of ${l.name}`}
                      onClick={() => bag.setQuantity(l.slug, l.size, l.quantity - 1)}
                      className="h-9 w-9 text-lg leading-none"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm tabular-nums" aria-live="polite">
                      {l.quantity}
                    </span>
                    <button
                      aria-label={`Increase quantity of ${l.name}`}
                      onClick={() => bag.setQuantity(l.slug, l.size, l.quantity + 1)}
                      className="h-9 w-9 text-lg leading-none"
                    >
                      +
                    </button>
                  </div>
                  <button onClick={() => bag.remove(l.slug, l.size)} className="text-[12px] text-ink-muted link-underline">
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  );
}
