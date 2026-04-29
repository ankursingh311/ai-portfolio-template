import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ContactSection from "@/components/ContactSection";
import type { ContactContent } from "@/types/content";

const mockContact: ContactContent = {
  eyebrow: "Let's talk",
  headline: "Ideas without execution are just plans.",
  subtext: "If you're working on something...",
  email: "test@example.com",
  linkedin: "https://linkedin.com/in/test",
  location: "Gurgaon, India.",
  chatCtaLabel: "Talk to Ankur",
};

describe("ContactSection", () => {
  it("renders headline", () => {
    render(<ContactSection content={mockContact} />);
    expect(
      screen.getByRole("heading", { name: "Ideas without execution are just plans." })
    ).toBeInTheDocument();
  });

  it("renders email link", () => {
    render(<ContactSection content={mockContact} />);
    expect(screen.getByRole("link", { name: /test@example.com/ })).toHaveAttribute(
      "href",
      "mailto:test@example.com"
    );
  });

  it("renders LinkedIn link", () => {
    render(<ContactSection content={mockContact} />);
    expect(screen.getByRole("link", { name: /LinkedIn/i })).toHaveAttribute(
      "href",
      "https://linkedin.com/in/test"
    );
  });

  it("renders location text", () => {
    render(<ContactSection content={mockContact} />);
    expect(screen.getByText(/Gurgaon, India/)).toBeInTheDocument();
  });
});
