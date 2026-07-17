import type { MetadataRoute } from "next";

// Single-page app, so one canonical URL. Next emits this as /sitemap.xml.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://tanrojbilling.com/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
