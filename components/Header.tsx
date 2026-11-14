"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useBag } from "./BagProvider";
import { site } from "@/config/site";

const NAV = [
  { href: "/shop", label: "Shop all" },
  { href: "/shop?line=office", label: "Office" },
  { href: "/shop?line=everyday", label: "Everyday" },
  { href: "/shop?line=bundle", label: "Bundles" },
  { href: "/corporate", label: "Corporate" },
];

const SECONDARY = [
  { href: "/about", label: "About" },
  { href: "/size-guide", label: "Size guide" },
  { href: "/delivery", label: "Delivery & exchanges" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const bag = useBag();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- close the menu after navigation
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <div className="bg-navy text-paper">
        <p className="container-x py-2 text-center text-[11px] tracking-[0.12em] uppercase">
          Free delivery in Accra &amp; Tema over GHS {site.freeDeliveryOver}
        </p>
      </div>
      <header className="sticky top-0 z-30 border-b border-navy/10 bg-paper/95 backdrop-blur-[2px]">
        <div className="container-x flex h-16 items-center justify-between gap-6">
          <button
            className="label -ml-2 p-2 lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>

          <Link href="/" className="font-display text-[22px] tracking-[-0.02em] lg:text-[26px]" aria-label="Sharp Gents home">
            Sharp Gents<span className="text-gold">.</span>
          </Link>

          <nav className="hidden flex-1 lg:block" aria-label="Main">
            <ul className="flex justify-center gap-8">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="label hover:text-gold-deep">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button onClick={bag.open} className="label -mr-2 p-2" aria-label={`Open bag, ${bag.count} items`}>
            Bag <span className="tabular-nums text-gold-deep">({bag.count})</span>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          hidden={!menuOpen}
          className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-navy/10 bg-paper lg:hidden"
        >
          <nav className="container-x py-8" aria-label="Mobile">
            <ul className="space-y-1">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="display block py-2 text-[40px]">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-10 space-y-3 border-t border-navy/10 pt-8">
              {SECONDARY.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-[15px] text-navy/80">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="label mt-10 text-ink-muted">
              <a href={site.instagram} className="hover:text-navy">Instagram</a> ·{" "}
              <a href={site.tiktok} className="hover:text-navy">TikTok</a> · {site.handle}
            </p>
          </nav>
        </div>
      </header>
    </>
  );
}
