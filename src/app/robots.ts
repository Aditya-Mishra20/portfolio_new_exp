import type { MetadataRoute } from "next";

// TODO: set your production URL here
const BASE = "https://your-domain.example.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
