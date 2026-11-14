import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { WhatsAppGlyph } from "@/components/WhatsAppGlyph";
import { site, WHATSAPP_NUMBER } from "@/config/site";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to Sharp Gents on WhatsApp, Instagram or TikTok. Based in Accra, delivering across Ghana.",
  alternates: { canonical: "/contact" },
};

function prettyNumber(n: string) {
  return n.startsWith("233") ? `+233 ${n.slice(3, 5)} ${n.slice(5, 8)} ${n.slice(8)}` : `+${n}`;
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={<>Say <em>hello.</em></>}
        intro="WhatsApp is the fastest way to reach us. We reply during the day, every day except Sunday."
      />
      <section className="container-x grid gap-12 pb-24 lg:grid-cols-12">
        <dl className="divide-y divide-navy/15 border-y border-navy/15 lg:col-span-7">
          {[
            ["WhatsApp", <a key="wa" href={waLink()} className="link-underline">{prettyNumber(WHATSAPP_NUMBER)}</a>],
            ["Instagram", <a key="ig" href={site.instagram} className="link-underline">{site.handle}</a>],
            ["TikTok", <a key="tt" href={site.tiktok} className="link-underline">{site.handle}</a>],
            ["Hours", site.hours],
            ["Based in", site.city],
          ].map(([k, v]) => (
            <div key={k as string} className="grid gap-2 py-6 sm:grid-cols-[180px_1fr]">
              <dt className="label pt-1.5 text-ink-muted">{k}</dt>
              <dd className="font-display text-2xl">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="lg:col-span-4 lg:col-start-9">
          <a href={waLink("Hello Sharp Gents, ")} target="_blank" rel="noopener noreferrer" className="btn-dark w-full">
            <WhatsAppGlyph /> Start a chat
          </a>
        </div>
      </section>
    </>
  );
}
