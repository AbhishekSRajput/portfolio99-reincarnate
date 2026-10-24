export const PORTFOLIO_ORIGIN = "https://www.codecube99.com";

/**
 * Products with a host of their own. Each host serves the product's exported
 * `/products/<slug>/…` documents at its root (see vercel.json); the portfolio
 * keeps the original prefixed paths.
 */
export const PRODUCT_HOSTS = {
  pixelghost: "pixelghost.codecube99.com",
  youscroll: "youscroll.codecube99.com",
} as const;
export type HostedProduct = keyof typeof PRODUCT_HOSTS;

export const PIXELGHOST_HOST = PRODUCT_HOSTS.pixelghost;
export const PIXELGHOST_ORIGIN = `https://${PIXELGHOST_HOST}`;
export const YOUSCROLL_HOST = PRODUCT_HOSTS.youscroll;
export const YOUSCROLL_ORIGIN = `https://${YOUSCROLL_HOST}`;

/** Every host that serves a product page, rather than the portfolio, at `/`. */
export const PRODUCT_HOST_NAMES: readonly string[] = Object.values(PRODUCT_HOSTS);

const OWNED_ORIGINS = new Set([
  PORTFOLIO_ORIGIN,
  ...PRODUCT_HOST_NAMES.map((host) => `https://${host}`),
]);

/** A product's canonical origin, or null when it lives on the portfolio. */
export function productOrigin(slug: string): string | null {
  return slug in PRODUCT_HOSTS ? `https://${PRODUCT_HOSTS[slug as HostedProduct]}` : null;
}

/** Resolve navigation only. Product images keep their exported asset paths. */
export function siteHref(href: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const url = new URL(href, PORTFOLIO_ORIGIN);
  for (const [slug, host] of Object.entries(PRODUCT_HOSTS)) {
    const prefix = `/products/${slug}`;
    if (url.pathname === prefix || url.pathname.startsWith(`${prefix}/`)) {
      const path = url.pathname.slice(prefix.length).replace(/\/$/, "");
      return `https://${host}${path}/${url.search}${url.hash}`;
    }
  }
  return url.href;
}

export function productHref(slug: string, page = ""): string {
  return siteHref(`/products/${slug}/${page ? `${page}/` : ""}`);
}

export function isExternalHref(href: string): boolean {
  if (!/^https?:/.test(href)) return false;
  return !OWNED_ORIGINS.has(new URL(href).origin);
}
