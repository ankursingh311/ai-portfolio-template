import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HeroSection from "@/components/HeroSection";
import type { HeroContent } from "@/types/content";

const mockHero: HeroContent = {
  eyebrow: "IIT Gandhinagar · IIM Bangalore",
  name: "Ankur Singh",
  title: "Strategy & AI Transformation",
  headline: "Not a data scientist. Not a strategy consultant. The person who makes both work — with AI.",
  personalityLine: "Full of contradictions. The good ones.",
  ctaPrimary: "Talk to Ankur",
  ctaSecondary: "See the work",
};

describe("HeroSection", () => {
  it("renders name", () => {
    render(<HeroSection content={mockHero} />);
    expect(screen.getByRole("heading", { name: "Ankur Singh" })).toBeInTheDocument();
  });

  it("renders headline text", () => {
    render(<HeroSection content={mockHero} />);
    expect(screen.getByText(/Not a data scientist/)).toBeInTheDocument();
  });

  it("renders personality line", () => {
    render(<HeroSection content={mockHero} />);
    expect(screen.getByText("Full of contradictions. The good ones.")).toBeInTheDocument();
  });

  it("renders primary CTA linking to chat", () => {
    render(<HeroSection content={mockHero} />);
    const cta = screen.getByRole("link", { name: /Talk to Ankur/i });
    expect(cta).toHaveAttribute("href", "#chat");
  });
});
