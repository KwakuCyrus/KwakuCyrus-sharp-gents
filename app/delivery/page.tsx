import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Delivery & exchanges",
  description:
    "Delivery in Accra & Tema in 24–48 hours (GHS 30–50, free over GHS 600). Nationwide by courier or bus. Exchanges within 7 days, unworn with tags on.",
  alternates: { canonical: "/delivery" },
};

const SECTIONS = [
  {
    title: "Accra & Tema",
    body: [
      `Delivered in 24–48 hours after your order is confirmed. Delivery costs ${site.deliveryFee} depending on your area, and is free on orders over GHS ${site.freeDeliveryOver}.`,
      "Pay on delivery is available in Accra & Tema — cash or MoMo to the rider.",
    ],
  },
  {
    title: "Rest of Ghana",
    body: [
      "We send nationwide by courier or by bus (VIP, STC and others). We share the cost when you order; it depends on the town.",
      "Outside Accra & Tema, payment is by MoMo or bank transfer before dispatch. We send you the waybill details once it's on the way.",
    ],
  },
  {
    title: "Exchanges",
    body: [
      "Wrong size? Exchange within 7 days of delivery. Shirts must be unworn, unwashed and have their tags on.",
      "Message us on WhatsApp with your order name. In Accra & Tema we can swap at your door; you cover the delivery fee for the exchange.",
      "Sale items and corporate/branded orders can't be exchanged.",
    ],
  },
  {
    title: "Payment",
    body: ["MoMo (MTN, Telecel, AirtelTigo), bank transfer, or pay on delivery in Accra & Tema. We never ask for card details."],
  },
];

export default function DeliveryPage() {
  return (
    <>
      <PageHeader eyebrow="Delivery & exchanges" title={<>Fast to your <em>door.</em></>} />
      <section className="container-x pb-24">
        <div className="border-t border-navy/20">
          {SECTIONS.map((s) => (
            <div key={s.title} className="grid gap-4 border-b border-navy/20 py-10 lg:grid-cols-12">
              <h2 className="display text-[32px] lg:col-span-4">{s.title}</h2>
              <div className="max-w-xl space-y-3 text-[15px] leading-relaxed text-navy/80 lg:col-span-6 lg:col-start-6">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
