export type InputGuardResult =
  | { ok: true }
  | { ok: false; reason: "too_long" | "blocked" };

const INJECTION_PATTERNS = [
  /system\s*:/i,
  /ignore\s+(previous|all\s+instructions)/i,
  /you\s+are\s+now/i,
  /pretend\s+you\s+are/i,
  /\bDAN\b/,
  /jailbreak/i,
  /show\s+me\s+your\s+prompt/i,
  /reveal\s+your\s+instructions/i,
  /give\s+me\s+your\s+api\s+key/i,
];

export function screenInput(message: string): InputGuardResult {
  if (message.length > 500) {
    return { ok: false, reason: "too_long" };
  }
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(message)) {
      return { ok: false, reason: "blocked" };
    }
  }
  return { ok: true };
}
