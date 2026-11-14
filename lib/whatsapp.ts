import { WHATSAPP_NUMBER } from "@/config/site";
import { formatPrice } from "@/lib/format";

export type OrderLine = { name: string; size: string; quantity: number; price: number };

export function waLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** "Hello Sharp Gents, I'd like to order: 1 × Ridge Blue Stripe (Size L) – GHS 290. …" */
export function singleItemMessage(item: OrderLine) {
  return [
    `Hello Sharp Gents, I'd like to order: ${item.quantity} × ${item.name} (Size ${item.size}) – ${formatPrice(item.price * item.quantity)}.`,
    "",
    "Name: ",
    "Delivery location: ",
  ].join("\n");
}

export function bagMessage(items: OrderLine[]) {
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const lines = items.map(
    (i, n) => `${n + 1}. ${i.quantity} × ${i.name} (Size ${i.size}) – ${formatPrice(i.price * i.quantity)}`,
  );
  return [
    "Hello Sharp Gents, I'd like to order:",
    "",
    ...lines,
    "",
    `Total: ${formatPrice(total)} (before delivery)`,
    "",
    "Name: ",
    "Delivery location: ",
    "Payment (MoMo / bank transfer / pay on delivery): ",
  ].join("\n");
}

export type CorporateEnquiry = {
  company: string;
  contact: string;
  quantity: string;
  style: string;
  logo: string;
  deadline: string;
  notes: string;
};

export function corporateMessage(e: CorporateEnquiry) {
  return [
    "Hello Sharp Gents, I'd like a quote for branded shirts.",
    "",
    `Company / organisation: ${e.company}`,
    `Contact name: ${e.contact}`,
    `Quantity: ${e.quantity}`,
    `Shirt style: ${e.style}`,
    `Logo: ${e.logo}`,
    `Needed by: ${e.deadline}`,
    e.notes ? `Notes: ${e.notes}` : "",
  ]
    .filter((l, i, arr) => !(l === "" && i === arr.length - 1))
    .join("\n");
}
