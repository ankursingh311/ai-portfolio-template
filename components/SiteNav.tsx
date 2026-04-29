export default function SiteNav() {
  return (
    <nav className="px-6 sm:px-10 pt-6 pb-0">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
      <span
        className="font-display font-bold text-navy text-sm tracking-tight"
        aria-label="Ankur Singh"
      >
        AS
      </span>
      <div className="flex gap-6 items-center">
        <a href="#work" className="text-xs text-muted hover:text-text transition-colors">
          Work
        </a>
        <a href="/about" className="text-xs text-muted hover:text-text transition-colors">
          About
        </a>
        <a
          href="#contact"
          className="text-xs text-terra font-semibold hover:text-terra-soft transition-colors"
        >
          Contact →
        </a>
      </div>
      </div>
    </nav>
  );
}
