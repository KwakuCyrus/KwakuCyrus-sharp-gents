export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: React.ReactNode; intro?: React.ReactNode }) {
  return (
    <header className="container-x grid gap-6 pt-14 pb-12 lg:grid-cols-12 lg:pt-20 lg:pb-16">
      <p className="label text-gold-deep lg:col-span-12">{eyebrow}</p>
      <h1 className="display text-[52px] sm:text-[72px] lg:col-span-7 lg:text-[96px]">{title}</h1>
      {intro && (
        <div className="max-w-md self-end text-[15px] leading-relaxed text-navy/75 lg:col-span-4 lg:col-start-9">{intro}</div>
      )}
    </header>
  );
}
