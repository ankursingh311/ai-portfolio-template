import type { ContactContent } from "@/types/content";

interface Props {
  content: ContactContent;
}

export default function ContactSection({ content }: Props) {
  return (
    <section id="contact" className="px-6 sm:px-10 lg:px-16 py-16 bg-navy">
      <p className="text-xs tracking-widest text-terra uppercase font-body mb-4">
        {content.eyebrow}
      </p>
      <h2 className="font-display font-bold text-bg text-4xl leading-tight mb-4 max-w-lg">
        {content.headline}
      </h2>
      <p className="text-sm text-[#a0b0c0] font-body mb-8 leading-relaxed max-w-md">
        {content.subtext}
      </p>

      <div className="flex flex-wrap gap-3 items-center">
        <a
          href="#chat"
          className="bg-bg text-navy px-5 py-3 rounded-md text-xs font-bold font-body tracking-wide hover:opacity-90 transition-opacity"
        >
          ◎ {content.chatCtaLabel} →
        </a>
        <a
          href={content.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-[#a0b0c033] text-[#a0b0c0] px-5 py-3 rounded-md text-xs font-body hover:border-[#a0b0c066] transition-colors"
        >
          LinkedIn
        </a>
        <a
          href={`mailto:${content.email}`}
          className="border border-[#a0b0c033] text-[#a0b0c0] px-5 py-3 rounded-md text-xs font-body hover:border-[#a0b0c066] transition-colors"
        >
          {content.email}
        </a>
      </div>

      <p className="text-xs text-[#4a6070] font-body mt-6 leading-relaxed">
        {content.location}
      </p>
    </section>
  );
}
