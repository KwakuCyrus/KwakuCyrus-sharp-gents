"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, type Size } from "@/data/products";

export type BagItem = { slug: string; size: Size; quantity: number };

type BagContextValue = {
  items: BagItem[];
  /** Items joined with current catalogue data (name, price). Unknown slugs are dropped. */
  lines: { slug: string; size: Size; quantity: number; name: string; price: number; image?: string }[];
  count: number;
  total: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (slug: string, size: Size, quantity?: number) => void;
  setQuantity: (slug: string, size: Size, quantity: number) => void;
  remove: (slug: string, size: Size) => void;
  clear: () => void;
};

const STORAGE_KEY = "sharpgents-bag-v1";
const BagContext = createContext<BagContextValue | null>(null);

export function BagProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BagItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from localStorage once on mount
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore corrupt storage */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, loaded]);

  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const add = useCallback((slug: string, size: Size, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === slug && i.size === size);
      if (existing) {
        return prev.map((i) => (i === existing ? { ...i, quantity: Math.min(i.quantity + quantity, 20) } : i));
      }
      return [...prev, { slug, size, quantity }];
    });
  }, []);

  const setQuantity = useCallback((slug: string, size: Size, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => !(i.slug === slug && i.size === size))
        : prev.map((i) => (i.slug === slug && i.size === size ? { ...i, quantity: Math.min(quantity, 20) } : i)),
    );
  }, []);

  const remove = useCallback((slug: string, size: Size) => {
    setItems((prev) => prev.filter((i) => !(i.slug === slug && i.size === size)));
  }, []);

  const value = useMemo<BagContextValue>(() => {
    const lines = items.flatMap((i) => {
      const p = getProduct(i.slug);
      return p ? [{ ...i, name: p.name, price: p.price, image: p.images[0] }] : [];
    });
    return {
      items,
      lines,
      count: lines.reduce((s, l) => s + l.quantity, 0),
      total: lines.reduce((s, l) => s + l.quantity * l.price, 0),
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add,
      setQuantity,
      remove,
      clear: () => setItems([]),
    };
  }, [items, isOpen, add, setQuantity, remove]);

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}

export function useBag() {
  const ctx = useContext(BagContext);
  if (!ctx) throw new Error("useBag must be used inside <BagProvider>");
  return ctx;
}
