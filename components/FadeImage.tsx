"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

/** next/image that fades in once the photo has actually loaded. */
export function FadeImage({ className = "", alt, ...props }: ImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Cached images can finish before hydration, so onLoad never fires.
    if (ref.current?.complete) setLoaded(true);
  }, []);

  return (
    <Image
      ref={ref}
      alt={alt}
      {...props}
      onLoad={() => setLoaded(true)}
      className={`${className} transition-opacity duration-700 ease-out ${loaded ? "opacity-100" : "opacity-0"}`}
    />
  );
}
