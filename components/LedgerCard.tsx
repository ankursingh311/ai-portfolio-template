import type { LedgerEntry } from "@/types/content";

interface Props {
  entry: LedgerEntry;
}

export default function LedgerCard({ entry }: Props) {
  return (
    <article className="bg-bg-alt p-5 hover:bg-[#f0ece6] transition-colors">
      <p className="text-xs tracking-widest text-faint uppercase font-body mb-2">
        {entry.org} · {entry.period}
      </p>
      <p className="font-display font-bold text-terra text-4xl leading-none mb-2">
        {entry.metric}
      </p>
      <p className="text-sm font-semibold text-text font-body mb-1">
        {entry.impact}
      </p>
      <p className="text-xs text-muted font-body leading-relaxed">
        {entry.detail}
      </p>
    </article>
  );
}
