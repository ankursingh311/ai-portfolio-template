export interface HeroContent {
  eyebrow: string;
  name: string;
  title: string;
  headline: string;
  personalityLine: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface LedgerEntry {
  org: string;
  period: string;
  metric: string;
  impact: string;
  detail: string;
}

export interface ExpertiseColumn {
  title: string;
  skills: string[];
}

export interface ExpertiseContent {
  sectionEyebrow: string;
  sectionHeading: string;
  columns: ExpertiseColumn[];
}

export interface ContactContent {
  eyebrow: string;
  headline: string;
  subtext: string;
  email: string;
  linkedin: string;
  location: string;
  chatCtaLabel: string;
}
