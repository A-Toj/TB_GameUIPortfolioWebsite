import type { MetadataRoute } from "next";

// Next emits this as /robots.txt. Allow everything (incl. AI crawlers) and
// point at the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://tanrojbilling.com/sitemap.xml",
    host: "https://tanrojbilling.com",
  };
}
