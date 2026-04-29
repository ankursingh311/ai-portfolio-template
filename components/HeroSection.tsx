import type { HeroContent } from "@/types/content";
import ChatInterface from "@/components/ChatInterface";

interface Props {
  content: HeroContent;
  linkedinUrl: string;
}

export default function HeroSection({ content, linkedinUrl }: Props) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
      {/* Left — identity */}
      <div className="px-6 sm:px-10 lg:px-16 pt-16 pb-12 bg-bg flex flex-col justify-center">
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
      </div>

      {/* Right — live chat */}
      <div
        id="chat"
        className="px-6 sm:px-10 lg:px-12 pt-16 pb-12 bg-bg flex flex-col justify-center"
        aria-label="Talk to Ankur"
      >
        <p className="text-xs tracking-widest text-muted uppercase mb-3 font-body">
          AI · Live conversation
        </p>
        <h2 className="font-display font-bold text-navy text-3xl mb-3">
          Talk to Ankur
        </h2>
        <p className="text-sm text-muted font-body mb-6 leading-relaxed max-w-md">
          Ask anything about my work, how I think, or what I&apos;m building
          next. The AI responds from my actual career history — no invented
          answers.
        </p>
        <ChatInterface linkedinUrl={linkedinUrl} />
      </div>
    </section>
  );
}
