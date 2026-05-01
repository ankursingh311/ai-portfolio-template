# AI Portfolio Template

A personal portfolio where the primary experience is **talking to an AI version of you** — grounded on your actual career history, not hallucinations.

Built with Next.js 16, Tailwind CSS 4, and Claude API. Deployed to Vercel in ~15 minutes.

**[Live demo →](https://ankursingh.in)** — the original site this template was built from.

---

## Why this exists

Most portfolio sites are static pages recruiters skim for 30 seconds. This one lets them ask their exact questions and get specific answers. The site itself proves you can build and ship AI-powered products — which is increasingly the thing that gets you hired.

---

## What you get

- Hero section with your name, positioning, and CTAs
- **AI chat agent** — answers questions about your work, grounded on your career history
- Transformation Ledger — before/after metrics from your career (counter-animates on scroll)
- Expertise Matrix — 4-column skills grid
- Recommendations — colleague quotes
- Contact section
- `/about` page (SSR for Google indexing)
- OG image generated from your content (auto-updates when you edit `hero.json`)
- Sitemap + `robots.txt` + `schema.org/Person` JSON-LD
- Rate limiting (Upstash Redis, optional — fails open)
- 3-layer AI guardrails (prompt injection blocking, output validation)
- Mobile-optimised, iOS zoom-safe

---

## Setup

### 1. Clone

```bash
git clone https://github.com/YOUR_USERNAME/ai-portfolio-template.git
cd ai-portfolio-template
npm install
```

### 2. Get a Claude API key

Sign up at [console.anthropic.com](https://console.anthropic.com). Free tier is enough to test.

### 3. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
ANTHROPIC_API_KEY=sk-ant-your-key-here
AI_MODEL=claude-haiku-4-5-20251001
```

Rate limiting is optional. If you skip the Upstash vars, the site works fine — just unprotected.

### 4. Fill in your content

All personal content lives in `content/`. No code changes needed.

| File | What to edit |
|------|-------------|
| `content/hero.json` | Your name, title, headline |
| `content/ledger.json` | Your work impact entries (org + metric + impact + detail) |
| `content/expertise.json` | Your skill domains and skills |
| `content/recommendations.json` | Colleague quotes (use LinkedIn recommendations) |
| `content/contact.json` | Your email, LinkedIn URL, location |
| `content/agent-system-prompt.txt` | Your AI agent's full career context — fill in every `[PLACEHOLDER]` |
| `app/about/page.tsx` | Your bio for the `/about` page (for Google indexing) |

**The agent-system-prompt.txt is the most important file.** The more specific you are, the better the AI responds. Include real metrics, real job descriptions, and real quotes from colleagues.

### 5. Update your domain

In `app/layout.tsx`, replace:

```ts
const BASE_URL = "https://yourname.vercel.app";
```

with your actual domain (or your Vercel deployment URL).

### 6. Add your resume PDF

Drop your CV at `public/your-name-resume.pdf` and update the `href` in:
- `components/HeroSection.tsx` (line with `Download CV`)
- `components/ContactSection.tsx` (line with `Download CV`)

### 7. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Talk to your AI agent — it should answer from your career history.

### 8. Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add your environment variables in the Vercel dashboard under Project → Settings → Environment Variables.

---

## Customisation

### Changing colours

All tokens are in `app/globals.css` under `@theme`. The defaults are:

| Token | Value | Usage |
|-------|-------|-------|
| `bg-bg` | `#F8F5F1` | Page background |
| `text-navy` | `#0A2540` | Headings, CTAs |
| `text-terra` | `#C75C4C` | Accent colour |

### Changing fonts

Swap `Playfair_Display` and `Manrope` in `app/layout.tsx` for any [Google Font](https://fonts.google.com). Update the CSS variables in `globals.css` to match.

### Adding sections

Create a new component in `components/`, add your content to a new JSON file in `content/`, and drop it into `app/page.tsx`.

---

## AI agent cost

Running on Claude Haiku with prompt caching:

| Usage | Estimated monthly cost |
|-------|----------------------|
| 50 conversations | ~$0.05 |
| 200 conversations | ~$0.20 |
| 1,000 conversations | ~$1.00 |

Prompt caching is enabled by default — the system prompt is cached after the first request, reducing cost by ~90% on subsequent messages.

---

## Stack

- [Next.js 16](https://nextjs.org) App Router
- [Tailwind CSS 4](https://tailwindcss.com)
- [Claude API](https://anthropic.com) (`claude-haiku-4-5-20251001` default)
- [Upstash Redis](https://upstash.com) (optional, rate limiting)
- [Vercel](https://vercel.com) (hosting + analytics)
- [Vitest](https://vitest.dev) + React Testing Library

---

## Tests

```bash
npm test                    # run all tests
npm run test:watch          # watch mode
npx vitest run tests/components/HeroSection.test.tsx  # single file
```

---

## License

MIT — use it, fork it, ship your version.
