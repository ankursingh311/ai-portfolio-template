import { describe, it, expect } from "vitest";
import { validateOutput } from "@/lib/guardrails/output";

describe("validateOutput", () => {
  it("passes clean output unchanged", () => {
    const text = "I led the FY2026-27 AOP exercise across 100+ hotels.";
    expect(validateOutput(text)).toBe(text);
  });

  it("appends disclaimer for 'I believe'", () => {
    const result = validateOutput("I believe this project took 3 months.");
    expect(result).toContain("connect with Ankur directly");
  });

  it("appends disclaimer for 'I think'", () => {
    const result = validateOutput("I think it was around 2020.");
    expect(result).toContain("connect with Ankur directly");
  });

  it("appends disclaimer for 'I'm not sure'", () => {
    const result = validateOutput("I'm not sure about the exact date.");
    expect(result).toContain("connect with Ankur directly");
  });

  it("appends disclaimer for 'probably'", () => {
    const result = validateOutput("That was probably the Q3 review.");
    expect(result).toContain("connect with Ankur directly");
  });

  it("does not double-append disclaimer", () => {
    const result = validateOutput("I think this was the approach. I believe it worked.");
    const count = (result.match(/connect with Ankur directly/g) ?? []).length;
    expect(count).toBe(1);
  });

  it("replaces response containing political content", () => {
    const result = validateOutput("The Modi government has policies on this.");
    expect(result).toBe(
      "I can only speak to Ankur's work and background. Ask me something about that."
    );
  });

  it("replaces response mentioning competitor AI brands", () => {
    const result = validateOutput("OpenAI's ChatGPT handles this differently.");
    expect(result).toBe(
      "I can only speak to Ankur's work and background. Ask me something about that."
    );
  });

  it("off-topic check runs before uncertainty check", () => {
    const result = validateOutput("I think the BJP policy on this is relevant.");
    expect(result).toBe(
      "I can only speak to Ankur's work and background. Ask me something about that."
    );
    expect(result).not.toContain("connect with Ankur directly");
  });
});
