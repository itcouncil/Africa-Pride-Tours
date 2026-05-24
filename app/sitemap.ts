import type { MetadataRoute } from "next";
import { pages } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://prideofafricajourneys.com";

  return pages.map((page) => ({
    url: `${base}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: page.slug === "blog" ? "weekly" : "monthly",
    priority: page.slug === "home" ? 1 : 0.8
  }));
}
