import { NextRequest, NextResponse } from "next/server";
import { ratelimit } from "@/lib/ratelimit";
import { screenInput } from "@/lib/guardrails/input";
import { validateOutput } from "@/lib/guardrails/output";
import { askClaude } from "@/lib/claude";
import type { ChatMessage } from "@/lib/claude";

export async function POST(req: NextRequest) {
  // Layer 0 — rate limit by IP (fail open if Redis is unavailable)
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "anonymous";
  try {
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return NextResponse.json({ error: "rate_limit" }, { status: 429 });
    }
  } catch {
    // Redis unavailable — allow request through, log for observability
    console.error("[ratelimit] Redis unavailable, skipping rate limit");
  }

  // Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    typeof (body as Record<string, unknown>).message !== "string" ||
    !Array.isArray((body as Record<string, unknown>).history)
  ) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const { message, history } = body as {
    message: string;
    history: unknown[];
  };

  // Validate + sanitise history (last 6 items only)
  const validHistory: ChatMessage[] = [];
  for (const item of history.slice(-6)) {
    if (
      typeof item !== "object" ||
      item === null ||
      !["user", "assistant"].includes(
        (item as Record<string, unknown>).role as string
      ) ||
      typeof (item as Record<string, unknown>).content !== "string"
    ) {
      return NextResponse.json({ error: "invalid_input" }, { status: 400 });
    }
    validHistory.push({
      role: (item as Record<string, unknown>).role as "user" | "assistant",
      content: String((item as Record<string, unknown>).content).slice(0, 1000),
    });
  }

  // Layer 1 — input guard
  const guard = screenInput(message);
  if (!guard.ok) {
    return NextResponse.json({ error: "input_blocked" }, { status: 400 });
  }

  // Layer 2 — Claude (grounded by system prompt)
  let raw: string;
  try {
    raw = await askClaude(message, validHistory);
  } catch {
    return NextResponse.json({ error: "agent_error" }, { status: 500 });
  }

  // Layer 3 — output guard
  const reply = validateOutput(raw);
  const paragraphs = reply
    .split("\n\n")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return NextResponse.json({ reply, paragraphs });
}
