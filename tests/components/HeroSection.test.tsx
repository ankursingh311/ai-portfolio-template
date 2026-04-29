import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import HeroSection from "@/components/HeroSection";
import type { HeroContent } from "@/types/content";

vi.mock("@/components/ChatInterface", () => ({
  default: () => <div data-testid="chat-interface" />,
}));

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
    render(<HeroSection content={mockHero} linkedinUrl="https://linkedin.com/in/test" />);
    expect(screen.getByRole("heading", { name: "Ankur Singh" })).toBeInTheDocument();
  });

  it("renders headline text", () => {
    render(<HeroSection content={mockHero} linkedinUrl="https://linkedin.com/in/test" />);
    expect(screen.getByText(/Not a data scientist/)).toBeInTheDocument();
  });

  it("renders personality line", () => {
    render(<HeroSection content={mockHero} linkedinUrl="https://linkedin.com/in/test" />);
    expect(screen.getByText("Full of contradictions. The good ones.")).toBeInTheDocument();
  });

  it("renders primary CTA linking to chat", () => {
    render(<HeroSection content={mockHero} linkedinUrl="https://linkedin.com/in/test" />);
    const cta = screen.getByRole("link", { name: /Talk to Ankur/i });
    expect(cta).toHaveAttribute("href", "#chat");
  });

  it("renders ChatInterface", () => {
    render(<HeroSection content={mockHero} linkedinUrl="https://linkedin.com/in/test" />);
    expect(screen.getByTestId("chat-interface")).toBeInTheDocument();
  });
});
