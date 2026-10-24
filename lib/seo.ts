import type { Metadata } from "next";
import { profile, projects } from "@/lib/content";
import { PORTFOLIO_ORIGIN, productHref, productOrigin, siteHref } from "@/lib/site-urls";

type ProductSlug = (typeof projects)[number]["slug"];
type ImageKind = "portfolio" | ProductSlug;

export function shareImage(kind: ImageKind = "portfolio") {
  const product = projects.find(({ slug }) => slug === kind);
  const origin = productOrigin(kind) ?? PORTFOLIO_ORIGIN;
  return {
    url: `${origin}/share/${kind}.png`,
    width: 1200,
    height: 630,
    type: "image/png",
    alt: product
      ? `${product.name} — ${product.tagline}`
      : `${profile.displayName} — ${profile.tagline}`,
  };
}

/** Explicit page metadata prevents inherited canonicals and social-card drift. */
export function pageMetadata({
  title,
  description,
  url,
  image = "portfolio",
  index = true,
}: {
  title: string;
  description: string;
  url: string;
  image?: ImageKind;
  index?: boolean;
}): Metadata {
  const preview = shareImage(image);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName:
        productOrigin(image) !== null
          ? (projects.find(({ slug }) => slug === image)?.name ?? profile.displayName)
          : profile.displayName,
      title,
      description,
      url,
      images: [preview],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: preview.url, alt: preview.alt }],
    },
    robots: {
      index,
      follow: true,
      googleBot: { index, follow: true, "max-image-preview": "large" },
    },
  };
}

export function productMetadata(slug: ProductSlug, page: string, title: string, description: string) {
  return pageMetadata({ title, description, url: productHref(slug, page), image: slug });
}

const portfolioWebsite = {
  "@type": "WebSite",
  "@id": `${PORTFOLIO_ORIGIN}/#website`,
  url: siteHref("/"),
  name: profile.displayName,
  alternateName: profile.brand,
  description: profile.description,
  inLanguage: "en",
};

export function portfolioStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      portfolioWebsite,
      {
        "@type": "WebPage",
        "@id": `${PORTFOLIO_ORIGIN}/#webpage`,
        url: siteHref("/"),
        name: `${profile.displayName} — ${profile.tagline}`,
        description: profile.description,
        isPartOf: { "@id": portfolioWebsite["@id"] },
        primaryImageOfPage: {
          "@type": "ImageObject",
          contentUrl: shareImage().url,
          width: 1200,
          height: 630,
          caption: shareImage().alt,
        },
      },
    ],
  };
}

export function productStructuredData(product: (typeof projects)[number]) {
  const url = productHref(product.slug);
  // A product on its own host is its own website; others belong to the portfolio.
  const website = productOrigin(product.slug) !== null
    ? {
        "@type": "WebSite",
        "@id": `${url}#website`,
        url,
        name: product.name,
        description: product.description,
        inLanguage: "en",
      }
    : portfolioWebsite;
  return {
    "@context": "https://schema.org",
    "@graph": [
      website,
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${product.name} — ${product.tagline}`,
        description: product.description,
        isPartOf: { "@id": website["@id"] },
        mainEntity: { "@id": `${url}#software` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${url}#software`,
        name: product.name,
        description: product.description,
        url,
        image: shareImage(product.slug).url,
        applicationCategory: "BrowserApplication",
        installUrl: product.storeUrl,
        softwareHelp: { "@type": "WebPage", url: productHref(product.slug, "support") },
      },
    ],
  };
}
