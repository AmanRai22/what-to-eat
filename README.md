# What to Eat Today

A single-page meal decision helper. Three modes — **Eat Out**, **Order In**, **Cook** — pick from curated lists with a smart natural-language filter and a Google search fallback.

Built with Next.js (App Router), TypeScript, Tailwind CSS, and the Anthropic SDK.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the env template and add your Anthropic API key:

   ```bash
   cp .env.example .env.local
   ```

   ```
   ANTHROPIC_API_KEY=sk-ant-...
   ```

   Get a key at https://console.anthropic.com/. The key powers the natural-language hint filter; without it the app still runs and uses substring/tag matching as a fallback.

3. Run the dev server:

   ```bash
   npm run dev
   ```

   Open http://localhost:3000.

## How it works

- **Modes** — toggle between *Eat Out*, *Order In*, and *Cook* at the top.
- **Randomize** — every roll runs a 3-second shuffle animation before settling. This is intentional friction.
- **Hint** — type something like *"somewhere with beer"*, *"something light"*, *"no rice"*. When set, the next randomize calls `/api/filter` (Claude) to rank candidates, and picks from the top 3.
- **Search online** — opens a Google search built from the current mode + hint.
- **Spacebar** — triggers the active mode's main randomize when no input is focused.

## Replacing the placeholder data

`lib/data.ts` is the single source of truth for options. Replace the placeholders there — every item needs `name`, an optional `cuisine`, and a generous `tags: string[]`. The tags are what the LLM filter and the local fallback both read.

## Project layout

```
app/
  page.tsx                 # main UI
  api/filter/route.ts      # server route: NL filter via Claude
  layout.tsx
  globals.css
components/
  ModeToggle.tsx
  ResultCard.tsx
  RandomizeButton.tsx
  HintInput.tsx
lib/
  data.ts                  # placeholder options — single source of truth
  randomize.ts             # pure pick/filter helpers
  search.ts                # builds Google search URL
```

## Deploy on Vercel

1. Push this repo to GitHub.
2. Import it at https://vercel.com/new.
3. Add the `ANTHROPIC_API_KEY` environment variable in **Settings → Environment Variables**.
4. Deploy.
