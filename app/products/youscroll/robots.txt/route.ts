import { YOUSCROLL_ORIGIN } from "@/lib/site-urls";

export const dynamic = "force-static";

export function GET() {
  return new Response(
    `User-Agent: *\nAllow: /\n\nSitemap: ${YOUSCROLL_ORIGIN}/sitemap.xml\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}
