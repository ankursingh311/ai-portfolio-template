import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SiteNav from "@/components/SiteNav";

describe("SiteNav", () => {
  it("renders logo initials", () => {
    render(<SiteNav />);
    expect(screen.getByText("AS")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<SiteNav />);
    expect(screen.getByText("Work")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("renders contact CTA", () => {
    render(<SiteNav />);
    expect(screen.getByRole("link", { name: /contact/i })).toBeInTheDocument();
  });
});
