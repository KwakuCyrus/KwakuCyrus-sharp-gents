import Link from "next/link";
import { site } from "@/config/site";
import { waLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="mt-auto bg-navy text-paper">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <p className="display text-[44px] sm:text-[56px]">
            Look sharp.
            <br />
            <span className="italic text-gold">Pay fair.</span>
          </p>
          <p className="mt-6 max-w-sm text-sm text-paper/70">
            Men&apos;s shirts from Accra, for Monday meetings, Sunday service and everything in between.
          </p>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-light mt-8">
            Chat on WhatsApp
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm md:col-span-6 md:col-start-7 md:grid-cols-3">
          <div>
            <p className="label mb-4 text-paper/50">Shop</p>
            <ul className="space-y-2.5">
              <li><Link href="/shop?line=office">Office Line</Link></li>
              <li><Link href="/shop?line=everyday">Everyday Line</Link></li>
              <li><Link href="/shop?line=bundle">Bundles</Link></li>
              <li><Link href="/corporate">Corporate orders</Link></li>
            </ul>
          </div>
          <div>
            <p className="label mb-4 text-paper/50">Help</p>
            <ul className="space-y-2.5">
              <li><Link href="/size-guide">Size guide</Link></li>
              <li><Link href="/delivery">Delivery &amp; exchanges</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="label mb-4 text-paper/50">Follow</p>
            <ul className="space-y-2.5">
              <li><a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href={site.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a></li>
              <li><Link href="/about">About us</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="container-x flex flex-col gap-2 py-6 text-[12px] text-paper/50 sm:flex-row sm:justify-between">
          <p>{site.name} · {site.city}</p>
          <p>MoMo · Bank transfer · Pay on delivery (Accra &amp; Tema)</p>
        </div>
      </div>
    </footer>
  );
}
