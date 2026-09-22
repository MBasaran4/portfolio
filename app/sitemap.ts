import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mbasaran.dev";
  const currentDate = new Date();
  const locales = ["tr", "en"];
  const sections = ["", "#about", "#projects", "#experience", "#skills", "#contact"];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const section of sections) {
      entries.push({
        url: `${siteUrl}/${locale}${section ? section : ""}`,
        lastModified: currentDate,
        changeFrequency: section === "#projects" ? "weekly" : "monthly",
        priority: section === "" ? 1.0 : 0.8,
      });
    }
  }

  return entries;
}
