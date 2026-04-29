import type { ExpertiseContent } from "@/types/content";

interface Props {
  content: ExpertiseContent;
}

export default function ExpertiseMatrix({ content }: Props) {
  return (
    <section className="px-10 py-16 bg-bg-alt border-b border-grid">
      <p className="text-xs tracking-widest text-faint uppercase font-body mb-2">
        {content.sectionEyebrow}
      </p>
      <h2 className="font-display font-bold text-navy text-3xl mb-10">
        {content.sectionHeading}
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {content.columns.map((col) => (
          <div key={col.title}>
            <h3 className="font-display font-semibold text-navy text-sm mb-3 pb-2 border-b-2 border-terra">
              {col.title}
            </h3>
            <ul className="space-y-2">
              {col.skills.map((skill) => (
                <li
                  key={skill}
                  className="text-xs text-text font-body leading-snug before:content-['—'] before:text-terra before:mr-2 before:text-[10px]"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
