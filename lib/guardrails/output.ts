const UNCERTAINTY_PHRASES = [
  /\bI believe\b/i,
  /\bI think\b/i,
  /\bI'm not sure\b/i,
  /\bprobably\b/i,
];

const OFF_TOPIC_SIGNALS = [
  /\b(BJP|Congress|Modi|Trump|Biden|Putin|politics|election)\b/i,
  /\b(OpenAI|ChatGPT|Gemini|Mistral|Llama|Anthropic's\s+other)\b/i,
];

const DISCLAIMER =
  "\n\nFor anything uncertain, connect with Ankur directly.";
const DEFLECT =
  "I can only speak to Ankur's work and background. Ask me something about that.";

export function validateOutput(text: string): string {
  for (const pattern of OFF_TOPIC_SIGNALS) {
    if (pattern.test(text)) {
      return DEFLECT;
    }
  }

  for (const pattern of UNCERTAINTY_PHRASES) {
    if (pattern.test(text)) {
      return text + DISCLAIMER;
    }
  }

  return text;
}
