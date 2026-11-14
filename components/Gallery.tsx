"use client";

import { useRef, useState } from "react";
import { ProductImage } from "./ProductImage";

/** Swipeable on mobile (scroll-snap), stacked on desktop. */
export function Gallery({ images, name }: { images: string[]; name: string }) {
  const slides = images.length ? images : [undefined];
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function onScroll() {
    const el = track.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  }

  function goTo(i: number) {
    track.current?.scrollTo({ left: i * track.current.clientWidth, behavior: "smooth" });
  }

  return (
    <div>
      {/* Mobile / tablet */}
      <div className="relative lg:hidden">
        <div
          ref={track}
          onScroll={onScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
          aria-roledescription="carousel"
          aria-label={`${name} photos`}
        >
          {slides.map((src, i) => (
            <div key={i} className="w-full shrink-0 snap-center" aria-label={`${i + 1} of ${slides.length}`}>
              <ProductImage src={src} name={name} sizes="100vw" preload={i === 0} className="aspect-[4/5]" />
            </div>
          ))}
        </div>
        {slides.length > 1 && (
          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Show photo ${i + 1}`}
                className={`h-[3px] w-6 transition-colors ${i === active ? "bg-navy" : "bg-navy/25"}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop */}
      <div className="hidden gap-3 lg:grid">
        {slides.map((src, i) => (
          <ProductImage
            key={i}
            src={src}
            name={name}
            sizes="(min-width: 1024px) 55vw, 100vw"
            preload={i === 0}
            className="aspect-[4/5]"
          />
        ))}
      </div>
    </div>
  );
}
