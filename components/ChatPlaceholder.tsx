// Plan 2 replaces this with the live AI chat interface.
// This placeholder maintains layout and shows the CTA affordance.
export default function ChatPlaceholder() {
  return (
    <section
      id="chat"
      className="px-6 sm:px-10 py-16 bg-bg-alt border-y border-grid"
      aria-label="Talk to Ankur"
    >
      <div className="max-w-3xl mx-auto">
        <p className="text-xs tracking-widest text-faint uppercase mb-3 font-body">
          AI · Live conversation
        </p>
        <h2 className="font-display font-bold text-navy text-3xl mb-3">
          Talk to Ankur
        </h2>
        <p className="text-sm text-muted font-body mb-8 leading-relaxed max-w-md">
          Ask anything about my work, how I think, or what I'm building next.
          The AI responds from my actual career history — no invented answers.
        </p>

        {/* Chat shell — visually complete, non-functional until Plan 2 */}
        <div className="border border-grid rounded-lg overflow-hidden bg-bg">
          <div className="p-4 border-b border-grid flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center">
              <span className="text-bg text-xs font-bold font-display">AS</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-navy font-body">Ankur Singh</p>
              <p className="text-xs text-faint font-body">Coming soon — AI agent in progress</p>
            </div>
          </div>

          <div className="p-4 min-h-40 flex items-center justify-center">
            <p className="text-sm text-faint font-body italic text-center max-w-sm">
              &quot;Hey — I&apos;m Ankur. Ask me anything about my work,
              how I think, or what I&apos;m building next. No fluff.&quot;
            </p>
          </div>

          <div className="p-3 border-t border-grid flex gap-2">
            <div className="flex-1 border border-grid rounded-md px-3 py-2 text-xs text-faint font-body bg-bg-alt">
              Ask anything about Ankur&apos;s work...
            </div>
            <button
              disabled
              className="bg-navy text-bg px-4 py-2 rounded-md text-xs font-semibold font-body opacity-40 cursor-not-allowed"
            >
              →
            </button>
          </div>
        </div>

        {/* Suggested prompts */}
        <div className="flex flex-wrap gap-2 mt-4">
          {[
            "What did you build at Lemon Tree?",
            "How do you use AI in real work?",
            "What makes you different?",
          ].map((prompt) => (
            <span
              key={prompt}
              className="border border-grid rounded-full px-3 py-1 text-xs text-faint font-body"
            >
              {prompt}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
