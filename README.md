# Portfolio (placeholder build)

Single-page portfolio generated in this REA experiment. Structure/features follow
the locked-in feature mix — Ashutosh-heavy UI + Ashish's list-style projects and AI chat.

## Features
- Hero → Projects → Tech Stack → Experience → Contact single page
- **Ctrl+K command palette** (cmdk + Radix Dialog): navigate, copy email, open links, toggle theme
- **Light/dark theme** via `next-themes` (`data-theme` attribute, `theme` storage key, system default) with themed hero art (light/dark SVG variants)
- **Project list** with status badges (Ongoing / Building / Completed), tech chips, GitHub/live links
- **Categorized tech stack** (Frontend / Backend / AI & Tools / Design)
- **Experience timeline**
- **Cal.com + email CTAs**
- **AI Q&A chat** — floating widget answering from the site's own `/md` markdown docs (local retrieval; TODO hook for a real LLM server action)
- **Agent-native**: `/llms.txt` (+ `/llm.txt` alias), `/md/profile|projects|experience|tech-stack|contact.md`, `/robots.txt`, `/sitemap.xml`
- **View counter** `/api/views?path=` (local JSON in `data/views.json`)
- Lenis smooth scroll, framer-motion reveals, motion token system in `globals.css`

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Replace the placeholders

Everything lives in `src/content/site.ts` — every spot is marked `// TODO`:
name, bio, email, Cal.com handle, socials, resume PDF (drop into `public/`),
projects, tech stack, experience. Also set the production URL in
`src/app/sitemap.ts`, `src/app/robots.ts`, and `src/app/layout.tsx` (metadataBase).

## Reference

Analysis dossier: `../analysis/feature-dossier.md` (how each feature was
reverse-engineered from the two reference sites — used as technical reference only).
