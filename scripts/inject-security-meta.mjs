// Injects a Content-Security-Policy <meta> tag into every exported HTML file.
// GitHub Pages cannot set HTTP response headers, so a meta tag is the only way
// to ship a CSP. Runs automatically after `next build` (see package.json).
//
// Policy notes:
// - script-src/style-src need 'unsafe-inline' because Next.js static export
//   bootstraps hydration with inline <script> tags and inline styles.
// - frame-ancestors / report-uri are ignored in meta CSPs (header-only), so
//   clickjacking protection is not possible on GitHub Pages. Documented in
//   SECURITY-REPORT.md.
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT = new URL("../out", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
  "upgrade-insecure-requests",
].join("; ");

const META = `<meta http-equiv="Content-Security-Policy" content="${CSP}"/>`;

function walk(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) files.push(...walk(p));
    else if (name.endsWith(".html")) files.push(p);
  }
  return files;
}

let count = 0;
for (const file of walk(OUT)) {
  const html = readFileSync(file, "utf8");
  if (html.includes("Content-Security-Policy")) continue; // already injected
  writeFileSync(file, html.replace("<head>", `<head>${META}`));
  count++;
}
console.log(`CSP meta injected into ${count} HTML file(s).`);
