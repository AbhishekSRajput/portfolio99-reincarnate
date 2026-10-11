import type { MetadataRoute } from "next";
import { PORTFOLIO_ORIGIN } from "@/lib/site-urls";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${PORTFOLIO_ORIGIN}/sitemap.xml`,
  };
}
