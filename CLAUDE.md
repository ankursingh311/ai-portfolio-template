# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

AI-powered personal portfolio template. The primary experience is an AI agent that answers questions about you — grounded entirely on your career history. The site proves AI fluency by existing.

All commands run from the repo root (where package.json lives).

## Commands

```bash
npm run dev        # dev server (localhost:3000)
npm run build      # production build
npm run lint       # ESLint
npm test           # Vitest (run once)
npm run test:watch # Vitest watch mode
npx vitest run tests/components/HeroSection.test.tsx  # single test file
```

## Stack

- Next.js 16 App Router, React 19, TypeScript strict
- Tailwind CSS 4 — tokens in `app/globals.css` via `@theme`, not tailwind.config
- Claude API (`@anthropic-ai/sdk`) for AI chat agent
- Upstash Redis for rate limiting (optional — fails open)
- Vercel deployment + Analytics

## Architecture

### Page structure
Single-page portfolio (`app/page.tsx`). Sections top-to-bottom: `SiteNav → HeroSection → TransformationLedger → ExpertiseMatrix → Recommendations → ContactSection → StickyChat`.

### Chat request pipeline (`app/api/chat/route.ts`)
```
POST /api/chat
  → Layer 0: Rate limit by IP (Upstash Redis, fail open if Redis unavailable)
  → Layer 1: Input screen (lib/guardrails/input.ts) — blocks injection, 500-char max
  → Layer 2: Claude API (lib/claude.ts) — grounded by content/agent-system-prompt.txt
  → Layer 3: Output validation (lib/guardrails/output.ts)
  → Response: { reply, paragraphs }
```

### Content model — edit these files, no code changes needed
| File | What it controls |
|------|-----------------|
| `content/hero.json` | Name, title, headline, CTAs |
| `content/ledger.json` | Work impact entries (org, metric, impact, detail) |
| `content/expertise.json` | Skills matrix columns |
| `content/recommendations.json` | Colleague quotes |
| `content/contact.json` | Email, LinkedIn, location |
| `content/agent-system-prompt.txt` | AI agent voice + career context |

### Metadata auto-wired from content
`layout.tsx`, `opengraph-image.tsx`, and `sitemap.ts` all read from `hero.json` and `contact.json`. Update those files once — everything updates.

## Design tokens (Tailwind CSS 4, `app/globals.css`)

| Token | Value | Usage |
|-------|-------|-------|
| `bg-bg` | `#F8F5F1` | Page background (warm off-white) |
| `text-navy` | `#0A2540` | Headings, CTAs |
| `text-terra` | `#C75C4C` | Accent (terracotta) |
| `text-text` | `#1F2937` | Body copy |
| `font-display` | Playfair Display | Headings |
| `font-body` | Manrope | UI, body |

## DO NOT

- Use dark backgrounds — light editorial theme is intentional
- Use `#3b82f6` (electric blue) — use `text-terra` / `#C75C4C`
- Hardcode text in components — always source from `content/*.json`
- Use Inter or Roboto fonts
- Add parallax, 3D, or decorative animations

## Environment variables (`env.example` → `.env.local`)

```
ANTHROPIC_API_KEY      # Required — get from console.anthropic.com
AI_MODEL               # Default: claude-haiku-4-5-20251001
UPSTASH_REDIS_REST_URL # Optional — rate limiting
UPSTASH_REDIS_REST_TOKEN
```
