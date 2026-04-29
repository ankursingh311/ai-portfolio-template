import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ExpertiseMatrix from "@/components/ExpertiseMatrix";
import type { ExpertiseContent } from "@/types/content";

const mockData: ExpertiseContent = {
  sectionEyebrow: "How I work",
  sectionHeading: "The toolkit",
  columns: [
    { title: "Strategy", skills: ["Operating model design", "Commercial performance"] },
    { title: "Analytics", skills: ["BI & dashboard strategy", "Root cause analysis"] },
  ],
};

describe("ExpertiseMatrix", () => {
  it("renders section heading", () => {
    render(<ExpertiseMatrix content={mockData} />);
    expect(screen.getByRole("heading", { name: "The toolkit" })).toBeInTheDocument();
  });

  it("renders all column titles", () => {
    render(<ExpertiseMatrix content={mockData} />);
    expect(screen.getByText("Strategy")).toBeInTheDocument();
    expect(screen.getByText("Analytics")).toBeInTheDocument();
  });

  it("renders skills within columns", () => {
    render(<ExpertiseMatrix content={mockData} />);
    expect(screen.getByText("Operating model design")).toBeInTheDocument();
    expect(screen.getByText("Root cause analysis")).toBeInTheDocument();
  });
});
