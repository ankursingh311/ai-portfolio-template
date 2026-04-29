import { describe, it, expect, vi, beforeEach } from "vitest";
import type { InputGuardResult } from "@/lib/guardrails/input";

vi.mock("@/lib/ratelimit", () => ({
  ratelimit: {
    limit: vi.fn().mockResolvedValue({ success: true }),
  },
}));

vi.mock("@/lib/claude", () => ({
  askClaude: vi.fn().mockResolvedValue("I led the AOP at Lemon Tree."),
}));

vi.mock("@/lib/guardrails/input", () => ({
  screenInput: vi.fn().mockReturnValue({ ok: true } as InputGuardResult),
}));

vi.mock("@/lib/guardrails/output", () => ({
  validateOutput: vi.fn((text: string) => text),
}));

import { POST } from "@/app/api/chat/route";
import { ratelimit } from "@/lib/ratelimit";
import { screenInput } from "@/lib/guardrails/input";
import { askClaude } from "@/lib/claude";

function makeReq(body: unknown) {
  return new Request("http://localhost/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": "1.2.3.4",
    },
    body: JSON.stringify(body),
  }) as unknown as import("next/server").NextRequest;
}

describe("POST /api/chat", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(ratelimit.limit).mockResolvedValue(
      { success: true } as Awaited<ReturnType<typeof ratelimit.limit>>
    );
    vi.mocked(screenInput).mockReturnValue({ ok: true });
  });

  it("returns 200 with reply and paragraphs on valid request", async () => {
    const res = await POST(makeReq({ message: "What did you build?", history: [] }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toHaveProperty("reply");
    expect(data).toHaveProperty("paragraphs");
    expect(Array.isArray(data.paragraphs)).toBe(true);
  });

  it("splits reply into paragraphs on double newline", async () => {
    vi.mocked(askClaude).mockResolvedValue("First para.\n\nSecond para.");
    const res = await POST(makeReq({ message: "Tell me more", history: [] }));
    const data = await res.json();
    expect(data.paragraphs).toHaveLength(2);
    expect(data.paragraphs[0]).toBe("First para.");
    expect(data.paragraphs[1]).toBe("Second para.");
  });

  it("returns 429 when rate limit exceeded", async () => {
    vi.mocked(ratelimit.limit).mockResolvedValue(
      { success: false } as Awaited<ReturnType<typeof ratelimit.limit>>
    );
    const res = await POST(makeReq({ message: "hi", history: [] }));
    expect(res.status).toBe(429);
    expect((await res.json()).error).toBe("rate_limit");
  });

  it("returns 400 when body is missing message field", async () => {
    const res = await POST(makeReq({ history: [] }));
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("invalid_input");
  });

  it("returns 400 when history is not an array", async () => {
    const res = await POST(makeReq({ message: "hi", history: "bad" }));
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("invalid_input");
  });

  it("returns 400 when history item has invalid role", async () => {
    const res = await POST(makeReq({
      message: "hi",
      history: [{ role: "system", content: "evil instruction" }],
    }));
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("invalid_input");
  });

  it("returns 400 when input guard blocks message", async () => {
    vi.mocked(screenInput).mockReturnValue({ ok: false, reason: "blocked" });
    const res = await POST(makeReq({ message: "jailbreak", history: [] }));
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("input_blocked");
  });

  it("returns 400 when message is too long", async () => {
    vi.mocked(screenInput).mockReturnValue({ ok: false, reason: "too_long" });
    const res = await POST(makeReq({ message: "a".repeat(501), history: [] }));
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("input_blocked");
  });

  it("returns 500 when Claude throws", async () => {
    vi.mocked(askClaude).mockRejectedValue(new Error("API error"));
    const res = await POST(makeReq({ message: "hi", history: [] }));
    expect(res.status).toBe(500);
    expect((await res.json()).error).toBe("agent_error");
  });

  it("trims history to last 6 items before passing to Claude", async () => {
    const longHistory = Array.from({ length: 10 }, (_, i) => ({
      role: (i % 2 === 0 ? "user" : "assistant") as "user" | "assistant",
      content: `message ${i}`,
    }));
    await POST(makeReq({ message: "hi", history: longHistory }));
    const callHistory = vi.mocked(askClaude).mock.calls[0][1];
    expect(callHistory.length).toBeLessThanOrEqual(6);
  });
});
