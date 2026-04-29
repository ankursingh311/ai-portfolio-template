interface Recommendation {
  name: string;
  title: string;
  context: string;
  date: string;
  quote: string;
  highlight: string;
}

interface Props {
  entries: Recommendation[];
}

export default function Recommendations({ entries }: Props) {
  return (
    <section className="px-6 sm:px-10 lg:px-16 py-16 bg-bg border-b border-grid">
      <p className="text-xs tracking-widest text-faint uppercase font-body mb-2">
        Recommendations
      </p>
      <h2 className="font-display font-bold text-navy text-3xl mb-10">
        What colleagues say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {entries.map((rec) => (
          <div
            key={rec.name}
            className="bg-bg-alt border border-grid rounded-xl p-6 flex flex-col gap-4"
          >
            {/* Quote mark */}
            <span className="font-display text-terra text-4xl leading-none select-none">
              &ldquo;
            </span>

            {/* Main quote */}
            <p className="text-sm text-text font-body leading-relaxed flex-1">
              {rec.quote}
            </p>

            {/* Highlight */}
            <p className="text-xs text-muted font-body leading-relaxed italic border-l-2 border-terra pl-3">
              {rec.highlight}
            </p>

            {/* Attribution */}
            <div className="pt-2 border-t border-grid">
              <p className="text-sm font-semibold text-navy font-body">
                {rec.name}
              </p>
              <p className="text-xs text-muted font-body mt-0.5">{rec.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-faint font-body">
                  {rec.context}
                </span>
                <span className="text-faint text-[10px]">·</span>
                <span className="text-[10px] text-faint font-body">
                  {rec.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
