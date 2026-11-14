import { sizeChart } from "@/data/sizes";

export function SizeTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[320px] text-left text-sm">
        <thead>
          <tr className="border-b border-navy/20">
            {["Size", "Chest (cm)", "Chest (in)", "Neck (cm)", "Sleeve (cm)"].map((h) => (
              <th key={h} scope="col" className="label py-3 pr-3 font-medium text-ink-muted">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sizeChart.map((r) => (
            <tr key={r.size} className="border-b border-navy/10">
              <th scope="row" className="py-3 pr-3 font-display text-lg font-normal">
                {r.size}
              </th>
              <td className="py-3 pr-3 tabular-nums">{r.chestCm}</td>
              <td className="py-3 pr-3 tabular-nums">{r.chestIn}</td>
              <td className="py-3 pr-3 tabular-nums">{r.neckCm}</td>
              <td className="py-3 pr-3 tabular-nums">{r.sleeveCm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function HowToMeasure() {
  return (
    <dl className="space-y-4 text-sm leading-relaxed text-navy/80">
      <div>
        <dt className="font-medium text-navy">Chest</dt>
        <dd>Under the arms, around the fullest part of the chest. Keep the tape level and snug, not tight.</dd>
      </div>
      <div>
        <dt className="font-medium text-navy">Neck</dt>
        <dd>Around the base of the neck where the collar sits. Leave room for one finger.</dd>
      </div>
      <div>
        <dt className="font-medium text-navy">Sleeve</dt>
        <dd>From the centre back of the neck, over the shoulder, down to the wrist bone.</dd>
      </div>
      <div>
        <dt className="font-medium text-navy">Between sizes?</dt>
        <dd>Size up for Office Line shirts you&apos;ll tuck in. Size down for the relaxed Everyday linen-look.</dd>
      </div>
    </dl>
  );
}
