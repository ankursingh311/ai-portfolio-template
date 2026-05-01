import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import contactData from "@/content/contact.json";

export const metadata: Metadata = {
  title: "About — Your Name",
  description:
    "Replace this with a 1–2 sentence bio optimised for search. Include your name, credentials, and what you do. This is what Google shows in search results.",
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
          About Your Name
        </h1>

        <p className="text-sm text-text font-body leading-relaxed mb-4">
          Write your opening paragraph here. This is the version for Google — it
          should be searchable and human at the same time. Include your
          background, education, and what kind of work you do. Be specific.
          Vague bios don&apos;t rank and don&apos;t connect.
        </p>

        <p className="text-sm text-text font-body leading-relaxed mb-4">
          Second paragraph: what you actually do at work. Not your job title —
          the real work. What problems do you solve? What changes when you&apos;re
          involved? This is the paragraph that makes a recruiter think
          &ldquo;this is the person.&rdquo;
        </p>

        <p className="text-sm text-text font-body leading-relaxed mb-4">
          Third paragraph: how you think. Your philosophy, your approach, a
          belief you hold about your field. Something real — not a LinkedIn
          buzzword. This is what makes you memorable rather than qualified.
        </p>

        <p className="text-sm text-text font-body leading-relaxed mb-8">
          Optional: outside work. Keep it brief. One or two genuine interests.
          The goal is to sound like a person, not a CV.
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
