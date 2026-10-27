# Hansani Perera — Portfolio v2

A dark, single-page portfolio built around a **scroll-driven 3D wheel**: each section is a card on the rim of an invisible cylinder. Scrolling turns the wheel. The next card rotates forward and comes into focus, and the previous one recedes and blurs.

**Stack:** Next.js 15 (pages router) · React 19 · TypeScript · Tailwind CSS 3 · Motion (`motion/react`) · CSS 3D transforms

## Editing content

All text, links, publications, projects and images are in **[`data/portfolio.ts`](data/portfolio.ts)**. Components only render what's in that file.

- Items marked `TODO` in that file still need your input (company name, dates, Google Scholar URL, previous degrees, etc.).
- Optional fields that are empty or missing are not shown on the site.
- Add an AI project with `categories: ["ai", ...]`. The "AI" filter tab appears on its own.
- Scrapbook photos: put images in `public/assets/beyond/` and set `image: "/assets/beyond/<file>.jpg"` on an item.
- Contact form messages go to the same Getform endpoint as v1 (`contactForm.endpoint`).

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000 (hot reload)

# production preview
npm run build
npm start            # http://localhost:3000
```

Node 18.18+ is required. Netlify is pinned to Node 20 in `netlify.toml`.

## Deploy on Netlify

`netlify.toml` sets the build command (`npm run build`) and publish directory (`.next`). Netlify detects Next.js and applies its Next.js runtime automatically. No plugin needs to be installed.

**Preview first (recommended):**
1. Push the branch: `git push -u origin portfolio-v2`
2. In Netlify go to **Site configuration → Build & deploy → Branches and deploy contexts**. Enable branch deploys for `portfolio-v2` (or "All").
3. Netlify builds it at `https://portfolio-v2--<your-site>.netlify.app`. Pull requests also get Deploy Previews.

**Go live:** merge `portfolio-v2` into your production branch (`dark-mode`), or change the production branch in Netlify to `portfolio-v2`.

If an old build setting overrides the toml (for example a custom publish directory), clear it in the Netlify UI so `netlify.toml` applies.

## How the wheel works

`components/WheelCarousel.tsx`:

- Page scroll → spring-smoothed → a continuous `pos` (0 … n-1).
- Each section gets a **dwell** segment, where the card is centred. If its content is taller than the card, the dwell scrolls the content inside the card. A **transition** segment follows, where the wheel turns.
- Each card is placed with `translateZ(-R) rotateX(θ) translateZ(R)`, and its scale, blur, opacity and depth come from its distance to `pos`. `R` is chosen so neighbouring cards never intersect.
- Anchor links (`#projects`), deep links, the nav, the section rail and keyboard focus all go through the same position map.

## Accessibility

- **Simple view** toggle in the header (remembered per browser) shows normal stacked sections. It's on by default for `prefers-reduced-motion`.
- Keyboard focus moving into a card turns the wheel to it and scrolls the focused element into view.
- Semantic sections, labelled controls, a focus-trapped citation dialog, and visible focus rings.

## Project structure

```
data/portfolio.ts           ← all content
components/WheelCarousel.tsx← 3D wheel + simple view + navigation context
components/SiteHeader.tsx   ← top nav, progress bar, section rail, mobile menu
components/Backdrop.tsx     ← ambient background
components/sections/*       ← Hero, Experience, Projects, Publications, Research, Education, Beyond, Contact
lib/citation.ts             ← BibTeX / APA generation
```
