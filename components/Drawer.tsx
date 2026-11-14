"use client";

import { useEffect, useRef } from "react";

/** Slide-over panel from the right. Closes on Escape and backdrop click. */
export function Drawer({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    panel.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-navy/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        inert={!open}
        className={`absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col bg-paper outline-none transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-navy/10 px-5 py-4 sm:px-7">
          <h2 className="label">{title}</h2>
          <button onClick={onClose} className="label -mr-2 p-2 text-navy/70 hover:text-navy">
            Close
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7">{children}</div>
        {footer && <div className="border-t border-navy/10 px-5 py-5 sm:px-7">{footer}</div>}
      </div>
    </div>
  );
}
