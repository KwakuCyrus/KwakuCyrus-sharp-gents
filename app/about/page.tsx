import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ProductImage } from "@/components/ProductImage";

export const metadata: Metadata = {
  title: "About",
  description: "Sharp Gents Collections is a men's shirt label from Accra. Good shirts for Monday meetings and Sunday service, at a fair price.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Sharp Gents"
        title={
          <>
            Good shirts, <em>fair prices.</em>
          </>
        }
      />
      <section className="container-x grid gap-12 pb-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <ProductImage src="/products/cantonments-stretch-navy/1.jpg" name="Cantonments Stretch — Navy" sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/5]" />
        </div>
        <div className="prose-sg max-w-xl lg:col-span-5 lg:col-start-7 lg:pt-24">
          <p className="!text-navy text-xl leading-relaxed">
            Sharp Gents started with a simple frustration: a good shirt in Accra was either too expensive or didn&apos;t
            last past the third wash.
          </p>
          <p>
            We pick fabrics that handle the heat, cut them to fit properly through the chest and waist, and keep the
            price where a young professional can buy for the whole week, not just for one occasion.
          </p>
          <p>
            The <Link href="/shop?line=office" className="link-underline">Office Line</Link> is built for the working
            week — the Monday meeting, the presentation, the interview. The{" "}
            <Link href="/shop?line=everyday" className="link-underline">Everyday Line</Link> is for everything after:
            Sunday service, weddings, the weekend, and of course Detty December.
          </p>
          <p>
            We sell directly on WhatsApp so you can ask questions, get honest sizing advice and pay the way that suits
            you — MoMo, bank transfer, or cash when your shirt arrives.
          </p>
          <h2>From Ridge to Osu.</h2>
          <p>
            We deliver across Accra and Tema in 24–48 hours and send nationwide by courier or bus. Follow along on
            Instagram and TikTok at @sharpgentsgh.
          </p>
        </div>
      </section>
    </>
  );
}
