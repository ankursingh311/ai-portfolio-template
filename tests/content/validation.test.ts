import { describe, it, expect } from "vitest";
import type { HeroContent, LedgerEntry, ExpertiseContent, ContactContent } from "@/types/content";
import heroData from "@/content/hero.json";
import ledgerData from "@/content/ledger.json";
import expertiseData from "@/content/expertise.json";
import contactData from "@/content/contact.json";

describe("hero.json", () => {
  it("has required fields", () => {
    const hero = heroData as HeroContent;
    expect(typeof hero.eyebrow).toBe("string");
    expect(typeof hero.name).toBe("string");
    expect(typeof hero.title).toBe("string");
    expect(typeof hero.headline).toBe("string");
    expect(typeof hero.personalityLine).toBe("string");
    expect(typeof hero.ctaPrimary).toBe("string");
    expect(typeof hero.ctaSecondary).toBe("string");
  });
});

describe("ledger.json", () => {
  it("has entries array with required fields", () => {
    const entries = ledgerData as LedgerEntry[];
    expect(Array.isArray(entries)).toBe(true);
    expect(entries.length).toBeGreaterThan(0);
    entries.forEach((e) => {
      expect(typeof e.org).toBe("string");
      expect(typeof e.period).toBe("string");
      expect(typeof e.metric).toBe("string");
      expect(typeof e.impact).toBe("string");
      expect(typeof e.detail).toBe("string");
    });
  });
});

describe("expertise.json", () => {
  it("has columns array with title and skills", () => {
    const data = expertiseData as ExpertiseContent;
    expect(Array.isArray(data.columns)).toBe(true);
    data.columns.forEach((col) => {
      expect(typeof col.title).toBe("string");
      expect(Array.isArray(col.skills)).toBe(true);
    });
  });
});

describe("contact.json", () => {
  it("has required contact fields", () => {
    const contact = contactData as ContactContent;
    expect(typeof contact.eyebrow).toBe("string");
    expect(typeof contact.headline).toBe("string");
    expect(typeof contact.subtext).toBe("string");
    expect(typeof contact.email).toBe("string");
    expect(typeof contact.linkedin).toBe("string");
    expect(typeof contact.location).toBe("string");
  });
});
