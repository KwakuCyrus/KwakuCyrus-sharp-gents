"use client";

import { useState } from "react";
import { corporateMessage, waLink, type CorporateEnquiry } from "@/lib/whatsapp";
import { WhatsAppGlyph } from "./WhatsAppGlyph";

const STYLES = ["Office shirts (long sleeve)", "Short-sleeve shirts", "Mix of styles", "Not sure yet"];
const LOGO = ["Yes — I'll send the file on WhatsApp", "Yes — embroidery-ready (vector)", "No — we need help with a logo", "No logo, plain shirts"];

export function CorporateForm() {
  const [form, setForm] = useState<CorporateEnquiry>({
    company: "",
    contact: "",
    quantity: "",
    style: STYLES[0],
    logo: LOGO[0],
    deadline: "",
    notes: "",
  });

  const update = (key: keyof CorporateEnquiry) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const deadline = form.deadline
      ? new Date(`${form.deadline}T12:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
      : "Flexible";
    window.open(waLink(corporateMessage({ ...form, deadline })), "_blank", "noopener,noreferrer");
  }

  const field = "mt-2 block w-full border-0 border-b border-navy/30 bg-transparent px-0 py-3 text-[16px] outline-none focus:border-navy";

  return (
    <form onSubmit={submit} className="grid gap-8 sm:grid-cols-2">
      <label className="label sm:col-span-2">
        Company, church, school or event
        <input required value={form.company} onChange={update("company")} className={field} autoComplete="organization" />
      </label>
      <label className="label">
        Your name
        <input required value={form.contact} onChange={update("contact")} className={field} autoComplete="name" />
      </label>
      <label className="label">
        Quantity (50+)
        <input
          required
          type="number"
          inputMode="numeric"
          min={50}
          value={form.quantity}
          onChange={update("quantity")}
          className={field}
          placeholder="e.g. 120"
        />
      </label>
      <label className="label">
        Shirt style
        <select value={form.style} onChange={update("style")} className={field}>
          {STYLES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <label className="label">
        Logo
        <select value={form.logo} onChange={update("logo")} className={field}>
          {LOGO.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <label className="label">
        Needed by
        <input type="date" value={form.deadline} onChange={update("deadline")} className={field} />
      </label>
      <label className="label sm:col-span-2">
        Anything else? (colours, sizes, embroidery position)
        <textarea rows={3} value={form.notes} onChange={update("notes")} className={`${field} resize-none`} />
      </label>
      <div className="sm:col-span-2">
        <button type="submit" className="btn-dark w-full sm:w-auto">
          <WhatsAppGlyph /> Send enquiry on WhatsApp
        </button>
        <p className="mt-3 text-[12px] text-ink-muted">
          This opens WhatsApp with your details filled in. Attach your logo file in the chat.
        </p>
      </div>
    </form>
  );
}
