# Tanroj Billing — Xbox 360 Dashboard Portfolio

An Xbox 360 (NXE-era) dashboard-inspired personal portfolio, built with Next.js 14,
TypeScript, Tailwind CSS, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Controls

- **← / →** — switch dashboard channels (blades)
- **Click a blade** — jump to a channel
- Home tiles deep-link into their channels, just like the 360 dashboard.

## Structure

```
app/                 # Next.js App Router (layout, page, global styles)
components/
  dashboard/         # BladeNav, GamertagBar, ContentTile, ChannelContent, DashboardShell
  ui/                # GlowBackground
lib/                 # data.ts (resume content) + types.ts
public/              # static assets (drop resume.pdf and gamerpic.png here)
```

## To personalize

All content lives in [`lib/data.ts`](lib/data.ts):

- Replace `github` / `linkedin` placeholder URLs (`your-handle`).
- Drop your resume PDF at `public/resume.pdf` (the "Download Resume" button points there).
- Optional: add a `public/gamerpic.png` and swap the "TB" initials avatar for an image.

## Deploy (GitHub Pages)

The site is configured for static export to GitHub Pages.

1. Push to `main`. The [`Deploy to GitHub Pages`](.github/workflows/deploy.yml) workflow
   builds (`next build` → `out/`) and publishes automatically.
2. One-time setup: in the repo **Settings → Pages → Build and deployment → Source**,
   select **GitHub Actions**.

Live at `https://a-toj.github.io/TB_GameUIPortfolioWebsite/`.

Notes:
- `next.config.mjs` sets `basePath` to `/TB_GameUIPortfolioWebsite` in production (root in dev),
  so update `repo` there if the repository is renamed.
- `next build` produces a static `out/` — no Node server is needed at runtime.
