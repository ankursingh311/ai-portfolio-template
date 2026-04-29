import type { HeroContent } from "@/types/content";

interface Props {
  content: HeroContent;
}

export default function HeroSection({ content }: Props) {
  return (
    <section className="px-6 sm:px-10 lg:px-16 pt-16 pb-20">
      <p className="text-xs tracking-widest text-faint uppercase mb-4 font-body">
        {content.eyebrow}
      </p>
      <h1 className="font-display font-bold text-navy text-5xl leading-tight tracking-tight mb-2">
        {content.name}
      </h1>
      <p className="text-xs tracking-widest text-terra uppercase font-semibold font-body mb-5">
        {content.title}
      </p>
      <p className="text-base text-text leading-relaxed mb-2 font-body max-w-lg">
        {content.headline}
      </p>
      <p className="text-base text-muted italic font-display mb-8">
        {content.personalityLine}
      </p>
      <div className="flex gap-4 items-center">
        <a
          href="#chat"
          className="bg-navy text-bg px-5 py-3 rounded-md text-xs font-bold font-body tracking-wide hover:bg-navy-light transition-colors"
        >
          ◎ {content.ctaPrimary}
        </a>
        <a
          href="#work"
          className="text-xs text-faint font-body hover:text-muted transition-colors"
        >
          ↓ {content.ctaSecondary}
        </a>
      </div>
    </section>
  );
}
