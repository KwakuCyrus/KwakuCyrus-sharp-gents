import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CorporateForm } from "@/components/CorporateForm";

export const metadata: Metadata = {
  title: "Corporate & branded shirts",
  description:
    "Branded and embroidered shirts for companies, churches, schools and events in Ghana. From 50 pieces, ready in 3–5 weeks. Get a quote on WhatsApp.",
  alternates: { canonical: "/corporate" },
};

export default function CorporatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Corporate orders"
        title={
          <>
            Your logo, <em>our shirts.</em>
          </>
        }
        intro="Branded and embroidered shirts for companies, churches, schools and events. Staff uniforms, choir shirts, anniversary programmes, end-of-year parties."
      />
      <section className="container-x grid gap-16 pb-24 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <dl className="divide-y divide-navy/15 border-y border-navy/15">
            {[
              ["Minimum", "50 pieces"],
              ["Turnaround", "3–5 weeks from approved sample"],
              ["Branding", "Embroidered chest logo, sleeve or back"],
              ["Sizes", "M to XXL, mixed in one order"],
              ["Delivery", "Anywhere in Ghana"],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[120px_1fr] gap-4 py-4 text-[15px]">
                <dt className="label pt-1 text-ink-muted">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-[15px] leading-relaxed text-navy/75">
            We send you a sample shirt with your logo before the full run. Once you approve it, production starts. A
            deposit secures your slot; the balance is due on delivery.
          </p>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <h2 className="display mb-10 text-[36px] sm:text-[44px]">Get a quote.</h2>
          <CorporateForm />
        </div>
      </section>
    </>
  );
}
