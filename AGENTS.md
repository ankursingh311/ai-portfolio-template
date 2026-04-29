# Agent Context — Ankur Singh Personal Website

## What this is
Personal portfolio site. Next.js 16, TypeScript, Tailwind CSS 4, Vercel.

## Key rules
1. Content always comes from content/*.json — never hardcode text in components
2. Design tokens: use CSS variables via Tailwind (bg-bg, text-navy, text-terra)
3. Components are in components/ — one file, one responsibility, <200 lines
4. Types are in types/content.ts — always type JSON content
5. Tests live in tests/components/ — Vitest + React Testing Library

## Running the project
npm run dev       — start dev server
npm test          — run tests
npm run build     — production build

## Design tokens reference
bg-bg = #F8F5F1 (background)
text-navy = #0A2540 (headings, CTAs)
text-terra = #C75C4C (accent)
text-muted = #6B6560 (secondary text)
font-display = Playfair Display
font-body = Manrope
