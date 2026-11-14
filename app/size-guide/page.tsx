import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { HowToMeasure, SizeTable } from "@/components/SizeTable";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Size guide",
  description: "Find your Sharp Gents shirt size. Chest, neck and sleeve measurements for M, L, XL and XXL, plus how to measure.",
  alternates: { canonical: "/size-guide" },
};

export default function SizeGuidePage() {
  return (
    <>
      <PageHeader
        eyebrow="Size guide"
        title={<>Find your <em>size.</em></>}
        intro="All shirts come in M, L, XL and XXL. Measurements below are of the body, not the shirt."
      />
      <section className="container-x grid gap-16 pb-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SizeTable />
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <h2 className="label mb-6">How to measure</h2>
          <HowToMeasure />
          <a
            href={waLink("Hello Sharp Gents, I need help with my size. My chest measurement is: ")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline mt-10"
          >
            Ask us on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
