import Image from "next/image";
import { FadeImage } from "./FadeImage";

type Props = {
  src?: string;
  name: string;
  sizes: string;
  preload?: boolean;
  className?: string;
  /** Zoom slightly when a parent with the `group` class is hovered. */
  zoom?: boolean;
};

/**
 * Shows a product photo, or a neutral grey placeholder with the product name
 * until real photography is added in data/products.ts.
 * Preloaded (above-the-fold) photos paint immediately; the rest fade in once loaded.
 */
export function ProductImage({ src, name, sizes, preload, className = "", zoom }: Props) {
  const Img = preload ? Image : FadeImage;
  return (
    <div className={`relative overflow-hidden bg-stone ${className}`}>
      {src ? (
        <Img
          src={src}
          alt={name}
          fill
          sizes={sizes}
          preload={preload}
          loading={preload ? undefined : "lazy"}
          className={`object-cover ${zoom ? "group-hover:scale-[1.04] [transition:opacity_700ms_ease-out,transform_900ms_ease-out]" : ""}`}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
          <span className="label text-navy/70">{name}</span>
        </div>
      )}
    </div>
  );
}
