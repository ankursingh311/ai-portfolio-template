"use client";

import { useState, useEffect, useRef } from "react";
import type { LedgerEntry } from "@/types/content";

interface Props {
  entry: LedgerEntry;
}

function parseMetric(
  metric: string
): { prefix: string; num: number; suffix: string } | null {
  const match = metric.match(/^([^0-9]*)(\d+)(.*)$/);
  if (!match) return null;
  return { prefix: match[1], num: parseInt(match[2], 10), suffix: match[3] };
}

export default function LedgerCard({ entry }: Props) {
  const [displayValue, setDisplayValue] = useState(0);
  const [animating, setAnimating] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const parsed = parseMetric(entry.metric);

  useEffect(() => {
    if (!parsed) return;

    const observer = new IntersectionObserver(
      ([obs]) => {
        if (!obs.isIntersecting) return;
        observer.disconnect();
        setAnimating(true);

        const target = parsed.num;
        const duration = 1200;
        const start = performance.now();

        function step(now: number) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const metricDisplay =
    animating && parsed && displayValue > 0
      ? `${parsed.prefix}${displayValue}${parsed.suffix}`
      : entry.metric;

  return (
    <article
      ref={ref}
      className="bg-bg-alt p-5 hover:bg-[#f0ece6] transition-colors"
    >
      <p className="text-xs tracking-widest text-faint uppercase font-body mb-2">
        {entry.org} · {entry.period}
      </p>
      <p className="font-display font-bold text-terra text-4xl leading-none mb-2 tabular-nums">
        {metricDisplay}
      </p>
      <p className="text-sm font-semibold text-text font-body mb-1">
        {entry.impact}
      </p>
      <p className="text-xs text-muted font-body leading-relaxed">
        {entry.detail}
      </p>
    </article>
  );
}
