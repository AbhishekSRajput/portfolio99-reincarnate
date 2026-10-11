import type { MetadataRoute } from "next";
import { sitemapEntries } from "@/lib/site-discovery";
import { PORTFOLIO_ORIGIN } from "@/lib/site-urls";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries(PORTFOLIO_ORIGIN);
}
