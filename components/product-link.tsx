import type { ComponentProps } from "react";
import { siteHref } from "@/lib/site-urls";

/** A full document navigation keeps host-rewritten static pages independent
 * of Next's client router and its source-path RSC payloads. */
export function ProductLink({ href, ...props }: ComponentProps<"a"> & { href: string }) {
  return <a {...props} href={siteHref(href)} />;
}
