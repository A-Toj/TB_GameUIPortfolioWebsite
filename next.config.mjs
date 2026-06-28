/** @type {import('next').NextConfig} */

// GitHub Pages serves a project repo from a subpath:
//   https://a-toj.github.io/TB_GameUIPortfolioWebsite/
// In dev we want the site at the root, so basePath is only applied in production.
const isProd = process.env.NODE_ENV === "production";
const repo = "TB_GameUIPortfolioWebsite";
const basePath = isProd ? `/${repo}` : "";

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
