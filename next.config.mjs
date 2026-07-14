/** @type {import('next').NextConfig} */

// The site is served from the ROOT of a custom domain (tanrojbilling.com), so
// there is no basePath — assets live at /_next, /images, etc.
//
// If you ever drop the custom domain and serve from the default GitHub Pages URL
// (https://a-toj.github.io/TB_GameUIPortfolioWebsite/), set basePath and
// assetPrefix to "/TB_GameUIPortfolioWebsite" instead.
const basePath = "";

const nextConfig = {
  reactStrictMode: true,
  output: "export", // static HTML export -> ./out
  basePath,
  trailingSlash: true, // emit dir/index.html so Pages serves routes cleanly
  images: { unoptimized: true }, // no Image Optimization server on Pages
  env: {
    // Exposed to the client so raw asset hrefs (e.g. /resume.pdf) can be prefixed.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
