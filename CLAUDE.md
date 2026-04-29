# Ankur Singh — Personal Website

## Project goal
Personal portfolio site for Ankur Singh (IIT Gandhinagar + IIM Bangalore, Strategy & AI Transformation).
Primary goal: get noticed by recruiters. Prove AI-nativeness. Site IS the proof.

## Stack
- Next.js 16 App Router, TypeScript strict mode
- Tailwind CSS 4 (CSS-first tokens in app/globals.css)
- Claude API for AI chat agent (Plan 2)
- Pinecone for vector DB / RAG (Plan 2)
- Vercel deployment

## Design tokens (all in app/globals.css @theme)
- bg: #F8F5F1 (Cloud Dancer — warm off-white, NOT pure white or dark)
- navy: #0A2540 (trust, precision, headings, CTAs)
- terra: #C75C4C (terracotta — warmth accent, differentiating)
- text: #1F2937 (charcoal body text)
- Fonts: Playfair Display (headings) + Manrope (body/UI)

## Editable content (NO code changes needed)
- content/hero.json — hero text
- content/ledger.json — transformation entries
- content/expertise.json — skills matrix
- content/contact.json — contact details
- content/agent-system-prompt.txt — AI agent voice + CV (Plan 2)

## Component conventions
- One component per file, one responsibility
- Props typed with TypeScript interfaces
- Content loaded from JSON, never hardcoded in components
- className uses Tailwind tokens: text-navy, bg-bg, text-terra etc.

## DO NOT
- Use dark backgrounds (#0a0a0a, #111) — dark theme was rejected
- Use electric blue (#3b82f6) as accent — use terra (#C75C4C)
- Hardcode text in components — always use content JSON
- Use Inter or Roboto — Playfair Display + Manrope only
- Add parallax, 3D, or decorative animations

## Testing
- Vitest + React Testing Library
- Run: npm test
- Each component has a test in tests/components/

## AI agent (Plan 2)
- Model configured via AI_MODEL env var (default: claude-haiku-4-5-20251001)
- 3-layer guardrails: input screening → RAG grounding → output validation
- System prompt: content/agent-system-prompt.txt
