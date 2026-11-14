import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "FAQ",
  description: "How to order Sharp Gents shirts on WhatsApp, payment with MoMo or on delivery, sizes, delivery times and exchanges.",
  alternates: { canonical: "/faq" },
};

const FAQS: [string, React.ReactNode][] = [
  [
    "How do I order?",
    "Choose your shirt and size, then tap “Order on WhatsApp”, or add a few shirts to your bag and send the whole order at once. We reply to confirm stock, delivery fee and time.",
  ],
  ["Do I need an account?", "No. There&apos;s no sign-up and no card payment on the site. Everything happens in WhatsApp."],
  [
    "How do I pay?",
    "MoMo, bank transfer, or pay on delivery in Accra & Tema. For orders outside Accra & Tema we take payment before dispatch.",
  ],
  [
    "How long does delivery take?",
    <>
      24–48 hours in Accra & Tema. Other regions usually 1–3 days by courier or bus. See{" "}
      <Link href="/delivery" className="link-underline">delivery & exchanges</Link>.
    </>,
  ],
  [
    "What if it doesn't fit?",
    "Exchange within 7 days, as long as the shirt is unworn with tags on. Message us on WhatsApp and we'll arrange the swap.",
  ],
  [
    "Which size should I get?",
    <>
      Check the <Link href="/size-guide" className="link-underline">size guide</Link>. If you&apos;re between sizes, send us your chest
      measurement and how you like your shirts to fit — we&apos;ll advise.
    </>,
  ],
  [
    "Do you make shirts for companies and churches?",
    <>
      Yes — branded and embroidered shirts from 50 pieces, ready in 3–5 weeks. Start on the{" "}
      <Link href="/corporate" className="link-underline">corporate page</Link>.
    </>,
  ],
  ["Do you have a shop I can visit?", "We're online-first. Message us on WhatsApp to arrange a fitting or pickup in Accra."],
];

export default function FaqPage() {
  return (
    <>
      <PageHeader eyebrow="FAQ" title={<>Questions, <em>answered.</em></>} />
      <section className="container-x pb-24">
        <div className="border-t border-navy/20 lg:ml-[41.66%]">
          {FAQS.map(([q, a]) => (
            <details key={q} className="group border-b border-navy/20">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-lg [&::-webkit-details-marker]:hidden">
                {q}
                <span className="mt-0.5 text-xl transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-xl pb-6 text-[15px] leading-relaxed text-navy/75">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
