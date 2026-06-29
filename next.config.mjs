/** @type {import('next').NextConfig} */

// GitHub Pages serves a project repo from a subpath:
//   https://a-toj.github.io/TB_GameUIPortfolioWebsite/
// The basePath is ONLY applied when building for Pages (the CI workflow sets
// GITHUB_PAGES=true). Local `npm run dev` and local `npm run build` both serve
// from the root, so the exported site works when opened locally too.
const repo = "TB_GameUIPortfolioWebsite";
const basePath = process.env.GITHUB_PAGES === "true" ? `/${repo}` : "";

const nextConfig = {
  reactStrictMode: true,
  output: "export", // static HTML export -> ./out
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true, // emit dir/index.html so GitHub Pages serves routes cleanly
  images: { unoptimized: true }, // no Image Optimization server on Pages
  env: {
    // Exposed to the client so raw asset hrefs (e.g. /resume.pdf) can be prefixed.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
