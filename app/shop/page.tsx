import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopBrowser, ShopGrid } from "@/components/ShopBrowser";

export const metadata: Metadata = {
  title: "Shop men's shirts",
  description:
    "Office and everyday men's shirts from GHS 180, plus Work Week bundles. Sizes M to XXL. Order on WhatsApp, delivery across Accra & Tema in 24–48h.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <div className="pt-12 pb-24 lg:pt-16">
      <div className="container-x mb-8 grid gap-4 lg:grid-cols-12">
        <p className="label text-gold-deep lg:col-span-12">The shop</p>
        <h1 className="sr-only">Shop men&apos;s shirts</h1>
        <p className="max-w-md text-[15px] leading-relaxed text-navy/75 lg:col-span-5">
          Every shirt comes in M, L, XL and XXL. Not sure of your size? Check the size guide or send us your chest
          measurement on WhatsApp.
        </p>
      </div>
      <Suspense fallback={<ShopGrid />}>
        <ShopBrowser />
      </Suspense>
    </div>
  );
}
