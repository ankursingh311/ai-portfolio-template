import type { LedgerEntry } from "@/types/content";
import LedgerCard from "./LedgerCard";

interface Props {
  entries: LedgerEntry[];
}

export default function TransformationLedger({ entries }: Props) {
  return (
    <section id="work" className="px-6 sm:px-10 py-16 border-b border-grid">
      <div className="max-w-5xl mx-auto">
      <p className="text-xs tracking-widest text-faint uppercase font-body mb-2">
        The work
      </p>
      <h2 className="font-display font-bold text-navy text-3xl mb-2">
        What changes when Ankur&apos;s involved
      </h2>
      <p className="text-sm text-muted font-body mb-10 max-w-xl leading-relaxed">
        Six years. Three organizations. Every engagement ends with something
        that works better than it did before — and a number to prove it.
      </p>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-x divide-y divide-grid border border-grid rounded-lg overflow-hidden"
        role="list"
      >
        {entries.map((entry, i) => (
          <div key={i} role="listitem">
            <LedgerCard entry={entry} />
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
