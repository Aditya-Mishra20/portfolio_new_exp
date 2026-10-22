import type { MetadataRoute } from "next";
import { SITE_URL, projects, projectSlug } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((p) => ({
      url: `${SITE_URL}/projects/${projectSlug(p.title)}`,
      lastModified: new Date() as Date,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
