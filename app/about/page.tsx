import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import contactData from "@/content/contact.json";

export const metadata: Metadata = {
  title: "About — Ankur Singh",
  description:
    "Ankur Singh is a strategy and AI transformation leader. IIT Gandhinagar (Chemical Engineering) and IIM Bangalore (MBA). Manufacturing to consulting to hospitality — turning good ideas into systems that work.",
};

export default function AboutPage() {
  const linkedinUrl = contactData.linkedin;
  return (
    <main className="bg-bg min-h-screen">
      <SiteNav />
      <article className="px-6 sm:px-10 py-16 max-w-2xl mx-auto">
        <p className="text-xs tracking-widest text-faint uppercase font-body mb-4">
          About
        </p>
        <h1 className="font-display font-bold text-navy text-4xl mb-6">
          Ankur Singh
        </h1>

        <p className="text-sm text-text font-body leading-relaxed mb-4">
          I&apos;m a strategy and AI transformation leader based in Gurgaon, India.
          I did my B.Tech in Chemical Engineering from IIT Gandhinagar and my MBA
          from IIM Bangalore. Six years of work later, I&apos;ve learned that the gap
          between a good idea and a working system is where most things break —
          and that closing that gap is what I&apos;m good at.
        </p>

        <p className="text-sm text-text font-body leading-relaxed mb-4">
          My work sits at the intersection of strategy, analytics, and AI.
          I&apos;ve built BI operating models for hotel groups, redesigned financial
          reporting for FMCG companies, automated shop-floor processes, and
          helped define what AI-enabled business systems should actually look
          like in practice — not in slide decks. The through-line is systems
          thinking: understanding how the pieces fit together, where the
          friction is, and what actually needs to change.
        </p>

        <p className="text-sm text-text font-body leading-relaxed mb-4">
          I believe in simplicity over complexity and in doing the work rather
          than describing it. Steve Jobs said the only way to do great work is
          to love what you do. I&apos;ve found that&apos;s true, but incomplete — you
          also have to finish what you start.
        </p>

        <p className="text-sm text-text font-body leading-relaxed mb-8">
          Outside work: table tennis, manga and manhwa, long trips when I can
          get them. Introvert who talks too much once comfortable. Full of
          contradictions — the good ones.
        </p>

        <div className="flex gap-4">
          <a
            href="/"
            className="text-xs text-terra font-semibold font-body hover:text-terra-soft transition-colors"
          >
            ← Back home
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted font-body hover:text-text transition-colors"
          >
            LinkedIn →
          </a>
        </div>
      </article>
    </main>
  );
}
