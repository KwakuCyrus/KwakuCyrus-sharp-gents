import { waLink } from "@/lib/whatsapp";
import { WhatsAppGlyph } from "./WhatsAppGlyph";

export function FloatingWhatsApp() {
  return (
    <a
      href={waLink("Hello Sharp Gents, I have a question about a shirt.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Sharp Gents on WhatsApp"
      className="fixed right-4 bottom-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-navy text-paper shadow-[0_6px_20px_rgba(15,30,51,0.25)] md:hidden"
    >
      <WhatsAppGlyph className="h-6 w-6" />
    </a>
  );
}
