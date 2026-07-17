# Legal & Accessibility Notes — tanrojbilling.com

> **Not legal advice.** This document is general information compiled by a developer,
> not an attorney. It is meant to help you understand common obligations for a personal
> portfolio site and decide what (if anything) you need. For anything binding — especially
> if you start collecting user data, selling services, or receive a complaint — consult a
> licensed attorney in your jurisdiction (California / USA).

---

## 1. Accessibility (ADA / WCAG) conformance

### What "ADA compliant" means for a website

The Americans with Disabilities Act has no codified technical standard for websites, but
U.S. courts and the DOJ treat **WCAG 2.1 Level AA** as the practical benchmark. This site
was built and audited to that target.

### Conformance summary

- **Target:** WCAG 2.1 Level AA.
- **Automated audit:** `axe-core` (industry standard) run against every dashboard channel
  (home, projects, experience, skills, about, contact). Result: **0 violations** on
  `wcag2a`, `wcag2aa`, `wcag21a`, and `wcag21aa` rule sets.
- **Manual fixes applied for this audit:**
  - Visible keyboard focus indicator on every interactive element (WCAG 2.4.7).
  - "Skip to content" link as the first focusable element (WCAG 2.4.1).
  - Corrected to a single `<main>` landmark; `<nav>`, `<header>`, `<footer>` landmarks present.
  - `aria-live` region announces the active channel to screen readers, since channels
    switch client-side without a page reload (WCAG 4.1.3).
  - Muted text colors darkened so all text meets the 4.5:1 contrast minimum.
  - External links carry `rel="noreferrer"` and an "opens in a new tab" accessible label.
  - `prefers-reduced-motion` is respected — animations are disabled for users who request it.
  - All images have descriptive `alt` text; decorative glyphs are hidden from assistive tech.
- **Keyboard operable:** full site is usable without a mouse (Tab/Enter, plus ←/→ to switch
  channels). Every control is reachable and focus is always visible.

### Known limitations (disclose these honestly)

- Automated tools catch ~30–50% of possible issues. A **manual screen-reader pass**
  (NVDA on Windows, VoiceOver on Mac, TalkBack on Android) is recommended before you rely
  on a formal conformance claim.
- The radial skill tree is a decorative, interactive visualization; its content is also
  available as a plain list in the info panel, but a real-world assistive-tech user test
  would strengthen the claim.

### Recommended: publish an Accessibility Statement

Courts look favorably on a good-faith, published statement. A ready-to-use version is in
[`ACCESSIBILITY.md`](./ACCESSIBILITY.md) — publish its contents on the site (or link to it)
and update the review date periodically.

---

## 2. Privacy — you are in a strong position

This site is **static and collects no personal data**: no forms, no login, no cookies, no
analytics, no trackers, no third-party embeds. Fonts are self-hosted (no Google Fonts call).
That means:

- **No privacy policy is legally required** in most cases today, because you process no
  personal data. (GDPR / CCPA / CalOPPA obligations are triggered by *collecting* data.)
- **The moment you add anything that collects data** — Google Analytics, a contact form,
  Calendly, comments, a newsletter — you will need a privacy policy and likely a cookie
  notice. Re-evaluate then.
- Your email and phone number are published on the Contact channel by choice; expect some
  spam/scraping. That is a personal-exposure decision, not a legal issue.

---

## 3. Copyright & licensing

- **Your content** (bio, project descriptions, photos of yourself, the résumé PDF): you own
  it. Consider adding a footer line like `© 2026 Tanroj Billing. All rights reserved.`
  (a visible copyright notice already renders in the footer).
- **Third-party code** you are shipping — all permissively licensed, no attribution page
  required, but keep the licenses intact in `node_modules`:
  - Next.js, React, Tailwind CSS, framer-motion — **MIT**.
  - Inter & Rajdhani fonts — **SIL Open Font License 1.1** (free for commercial use).
  - axe-core (dev-only, not shipped) — **MPL 2.0**.
- **Client work referenced** (billingtrucking.com, the jewelry storefront): make sure you
  have permission to showcase client projects, especially screenshots or logos. Naming a
  launched public site is generally fine; using a client's logo/branding may need consent.
- **Do not** use third-party images, icons, or logos you do not have a license for. The
  current site uses only your own photos and text glyphs, so you are clean.

---

## 4. Deployment checklist (legal/operational)

- [ ] **Enforce HTTPS** — GitHub → Settings → Pages → check "Enforce HTTPS". (Your deploy
      log shows `http://`, which suggests this is off. This is also a security item.)
- [ ] **Register the domain to you personally** and enable registrar privacy/WHOIS
      protection so your home address isn't public.
- [ ] **Add a Terms of Use** only if you later offer services/sales through the site — a
      pure portfolio generally doesn't need one.
- [ ] **Security contact** is published at `/.well-known/security.txt` (already added).
- [ ] Keep the **résumé PDF** free of data you don't want public (home address, references'
      contact info, etc.).
- [ ] If you ever embed **YouTube, maps, or analytics**, revisit Privacy (Section 2) and the
      site's Content-Security-Policy (currently `default-src 'self'` — it will block them
      until you explicitly allow them).

---

## 5. Risk framing (plain English)

A personal portfolio with no e-commerce and no data collection is **low legal risk**. The
two things that meaningfully reduce what little risk exists are already done or easy:
(1) a good-faith accessibility effort with a published statement, and (2) not collecting
personal data. The single most valuable action from this whole review is a one-click one:
**turn on Enforce HTTPS.**

_Last reviewed: July 16, 2026._
