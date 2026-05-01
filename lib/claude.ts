import Anthropic from "@anthropic-ai/sdk";
import { readFileSync } from "fs";
import { join } from "path";

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export function loadSystemPrompt(): string {
  return readFileSync(
    join(process.cwd(), "content", "agent-system-prompt.txt"),
    "utf-8"
  );
}

export async function askClaude(
  message: string,
  history: ChatMessage[]
): Promise<string> {
  const systemPrompt = loadSystemPrompt();
  const model = process.env.AI_MODEL ?? "claude-haiku-4-5-20251001";

  const response = await anthropic.messages.create({
    model,
    max_tokens: 800,
    system: [
      {
        type: "text",
        text: systemPrompt,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [
      ...history.map((m) => ({ role: m.role, content: m.content })),
      { role: "user" as const, content: message },
    ],
  });

  const block = response.content[0];
  if (block.type !== "text") {
    throw new Error("Unexpected response type from Claude");
  }
  return block.text;
}
