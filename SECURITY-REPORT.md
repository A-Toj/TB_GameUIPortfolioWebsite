# Security Report — tanrojbilling.com

Audit date: July 16, 2026. Scope: the Xbox-dashboard portfolio (Next.js 14 static
export, deployed to GitHub Pages behind the custom domain `tanrojbilling.com`).

## Attack-surface summary

This site ships as **pure static HTML/CSS/JS**. There is no server, no database,
no authentication, no cookies, no forms, and no user input of any kind. That
eliminates entire vulnerability classes by construction (SQL injection, auth
bypass, session hijacking, CSRF, stored XSS). The remaining realistic risks are
supply-chain (dependencies, CI), content injection via third-party scripts
(none are used), and platform-level concerns (headers, DDoS).

## Vulnerabilities found and fixed

| # | Finding | Severity | Fix |
|---|---------|----------|-----|
| 1 | Next.js 14.2.5 had known CVEs (1 critical incl. cache poisoning, dev-server origin bypass) | Critical | Upgraded to **14.2.35** (patched release, same minor line) |
| 2 | No Content-Security-Policy | Medium | CSP `<meta>` tag injected into every exported HTML page by `scripts/inject-security-meta.mjs` (runs automatically in `npm run build`). Policy: `default-src 'self'`, no external scripts/styles/fonts/connections allowed, `object-src 'none'`, `base-uri 'self'`, `form-action 'none'`, `upgrade-insecure-requests` |
| 3 | No referrer policy (full URL leaked to external sites on link clicks) | Low | `referrer: strict-origin-when-cross-origin` added via Next metadata (renders as `<meta name="referrer">`) |
| 4 | GitHub Actions pinned by mutable version tags (a compromised/moved tag would change what CI runs) | Medium (supply chain) | All four actions in `deploy.yml` pinned to **full commit SHAs** with version comments |
| 5 | No automated dependency patching | Low | `.github/dependabot.yml` added: weekly npm + GitHub Actions update PRs |
| 6 | No vulnerability-disclosure contact | Info | `public/.well-known/security.txt` (RFC 9116) added |

## Reviewed and confirmed safe

- **`dangerouslySetInnerHTML`** (SkillTree icons): input is a hard-coded,
  developer-controlled SVG map in `skillIcons.ts` — no user or remote data ever
  flows into it. Not exploitable.
- **External links**: every `target="_blank"` link carries `rel="noreferrer"`
  (implies `noopener` — no reverse-tabnabbing).
- **Secrets**: no API keys, tokens, or credentials in the repo or build output.
- **No `eval`, `document.write`, or raw `innerHTML` assignments** anywhere.
- **CI permissions**: workflow `GITHUB_TOKEN` is scoped to the minimum
  (`contents: read`, `pages: write`, `id-token: write`).
- **Third-party scripts/CDNs**: none. Fonts are self-hosted by `next/font`.
  The CSP now enforces this permanently.

## Accepted risks (documented deliberately)

- **Remaining `npm audit` advisories against Next 14**: every one requires a
  Next.js *server* at runtime (image-optimization API, middleware, server
  actions/components, rewrites). This deployment has no Next server — GitHub
  Pages serves flat files — so they are **not exploitable in production**.
  Clearing them entirely requires Next 16 (a breaking major upgrade). Recommended
  as future maintenance, not a current exposure.
- **CSP `'unsafe-inline'` for scripts/styles**: required because Next.js static
  export bootstraps hydration with inline scripts. The CSP still blocks all
  external script/style/font/connect origins, which is the main win.
- **Email/phone visible in page content**: intentional for a portfolio;
  scrapers may harvest them. Accepted by design.

## Not possible on GitHub Pages (platform limits)

GitHub Pages provides **no control over HTTP response headers**. Therefore:

- **`X-Frame-Options` / CSP `frame-ancestors`** (clickjacking protection):
  header-only; `frame-ancestors` is ignored in `<meta>` CSPs. Cannot be set.
- **`Strict-Transport-Security` (HSTS)**, **`X-Content-Type-Options`**,
  **`Permissions-Policy`**: header-only. Cannot be set.
- All become available by fronting the site with Cloudflare (below) or moving
  to a host with header control (Netlify, Vercel, Cloudflare Pages).

## Rate limiting

**Server-side rate limiting is not possible on GitHub Pages** — there is no
request-processing layer to configure; Pages is a static CDN. GitHub applies
its own platform-level DDoS protection (Fastly CDN), and with no forms, APIs,
or login, there is nothing for a request-flood to abuse beyond bandwidth.

**How to add it (since the site uses a custom domain, this is practical):**
put **Cloudflare's free tier** in front of `tanrojbilling.com`:

1. Create a free Cloudflare account and add the `tanrojbilling.com` zone.
2. At your domain registrar, switch the nameservers to the two Cloudflare
   assigns you (DNS records are imported automatically — keep the A records
   pointing at GitHub Pages: 185.199.108.153 / .109 / .110 / .111).
3. Leave the DNS records **Proxied** (orange cloud) so traffic flows through
   Cloudflare.
4. Security → WAF → **Rate limiting rules** (free plan includes one rule):
   e.g. block an IP for 10 s after >100 requests in 10 s.
5. Also enable for free: **Bot Fight Mode**, **Always Use HTTPS**, and
   **HSTS** — which also fixes the header gaps listed above.

## Action items for the owner (one-time, in GitHub)

1. **Settings → Pages → check "Enforce HTTPS"** — the deploy log currently
   reports the site URL as `http://tanrojbilling.com/`, which suggests this box
   is unchecked. This is the single most important click in this report.
2. Merge the Dependabot PRs when they appear (weekly).
