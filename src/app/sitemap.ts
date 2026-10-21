import type { MetadataRoute } from "next";

// TODO: set your production URL here
const BASE = "https://your-domain.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
  ];
}
