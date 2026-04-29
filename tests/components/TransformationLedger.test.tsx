import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TransformationLedger from "@/components/TransformationLedger";
import type { LedgerEntry } from "@/types/content";

const mockEntries: LedgerEntry[] = [
  {
    org: "Acme Corp",
    period: "2024–2025",
    metric: "$5M+",
    impact: "Revenue unlocked",
    detail: "Built a framework that showed which products made money.",
  },
  {
    org: "Beta Ltd",
    period: "2023–2024",
    metric: "60%",
    impact: "Effort reduced",
    detail: "Automated the repetitive work.",
  },
];

describe("TransformationLedger", () => {
  it("renders section heading", () => {
    render(<TransformationLedger entries={mockEntries} />);
    expect(
      screen.getByRole("heading", { name: /What changes when Ankur/i })
    ).toBeInTheDocument();
  });

  it("renders all ledger entries", () => {
    render(<TransformationLedger entries={mockEntries} />);
    expect(screen.getByText("$5M+")).toBeInTheDocument();
    expect(screen.getByText("60%")).toBeInTheDocument();
  });

  it("renders org names", () => {
    render(<TransformationLedger entries={mockEntries} />);
    expect(screen.getByText(/Acme Corp/)).toBeInTheDocument();
    expect(screen.getByText(/Beta Ltd/)).toBeInTheDocument();
  });
});
