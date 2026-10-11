export const PORTFOLIO_ORIGIN = "https://www.codecube99.com";
export const PIXELGHOST_ORIGIN = "https://pixelghost.codecube99.com";
export const PIXELGHOST_HOST = "pixelghost.codecube99.com";

/** Resolve navigation only. Product images keep their exported asset paths. */
export function siteHref(href: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const url = new URL(href, PORTFOLIO_ORIGIN);
  const prefix = "/products/pixelghost";
  if (url.pathname === prefix || url.pathname.startsWith(`${prefix}/`)) {
    const path = url.pathname.slice(prefix.length).replace(/\/$/, "");
    return `${PIXELGHOST_ORIGIN}${path}/${url.search}${url.hash}`;
  }
  return url.href;
}

export function productHref(slug: string, page = ""): string {
  return siteHref(`/products/${slug}/${page ? `${page}/` : ""}`);
}

export function isExternalHref(href: string): boolean {
  if (!/^https?:/.test(href)) return false;
  const { origin } = new URL(href);
  return origin !== PORTFOLIO_ORIGIN && origin !== PIXELGHOST_ORIGIN;
}
