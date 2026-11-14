import Link from "next/link";
import type { Product } from "@/data/products";
import { LINE_LABELS } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { ProductImage } from "./ProductImage";

export function ProductCard({
  product,
  sizes = "(min-width: 1024px) 25vw, 50vw",
  aspect = "aspect-[4/5]",
  preload,
}: {
  product: Product;
  sizes?: string;
  aspect?: string;
  preload?: boolean;
}) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <ProductImage src={product.images[0]} name={product.name} sizes={sizes} className={aspect} zoom preload={preload} />
      <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h3 className="text-[15px] leading-snug">{product.name}</h3>
        <p className="shrink-0 text-[14px] text-gold-deep">{formatPrice(product.price)}</p>
      </div>
      <p className="mt-1 text-[12px] text-ink-muted">
        {LINE_LABELS[product.line]} · {product.occasion}
      </p>
    </Link>
  );
}
