import type { MetadataRoute } from "next";
import { productGuides, projects } from "@/lib/content";
import { productHref, siteHref } from "@/lib/site-urls";

/** List published destinations only; notebook excerpts remain noindex drafts. */
export function sitemapEntries(origin: string): MetadataRoute.Sitemap {
  const urls = [
    siteHref("/"),
    siteHref("/journal/"),
    ...projects.flatMap(({ slug }) => [
      productHref(slug),
      ...productGuides[slug].docs.items.map(({ href }) => siteHref(href)),
    ]),
  ];

  return [...new Set(urls)]
    .filter((url) => new URL(url).origin === origin)
    .map((url) => ({ url }));
}
