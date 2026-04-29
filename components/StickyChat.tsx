// Floats bottom-right. Scrolls to #chat section.
// Plan 2 upgrades this to open the live chat panel.
export default function StickyChat() {
  return (
    <a
      href="#chat"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-navy text-bg px-4 py-3 rounded-full shadow-lg text-xs font-bold font-body hover:bg-navy-light transition-colors"
      aria-label="Talk to Ankur — open chat"
    >
      <span className="w-2 h-2 rounded-full bg-terra" aria-hidden="true" />
      Talk to Ankur
    </a>
  );
}
