import { productHref } from "./site-urls";

export type YouScrollReleaseStage = "preview" | "social-live" | "paid-live";

export interface YouScrollRelease {
  socialAvailable: boolean;
  paidAvailable: boolean;
  badge: string;
  notice: string;
  proCtaLabel: string;
  proCtaHref: string;
}

const pricingUrl = productHref("youscroll", "pricing");

/** Release copy is a deliberate publishing decision, not inferred from a build. */
export function getYouScrollRelease(stage: YouScrollReleaseStage): YouScrollRelease {
  const releases: Record<YouScrollReleaseStage, YouScrollRelease> = {
    preview: {
      socialAvailable: false,
      paidAvailable: false,
      badge: "Watch parties are coming soon",
      notice: "The Chrome Web Store version includes the free YouTube tools. Watch parties, streaming services and Pro are coming soon.",
      proCtaLabel: "See how Pro will work",
      proCtaHref: `${pricingUrl}#ys-start`,
    },
    "social-live": {
      socialAvailable: true,
      paidAvailable: false,
      badge: "Watch together. Try Pro free.",
      notice: "Watch parties and the optional Pro trial are available in YouScroll. Paid subscriptions are coming soon.",
      proCtaLabel: "How to start your trial",
      proCtaHref: `${pricingUrl}#ys-start`,
    },
    "paid-live": {
      socialAvailable: true,
      paidAvailable: true,
      badge: "Free to play. More with Pro.",
      notice: "Start your optional Pro trial or upgrade from inside YouScroll. Your friends can join with a Free account.",
      proCtaLabel: "Start in YouScroll",
      proCtaHref: `${pricingUrl}#ys-start`,
    },
  };
  return releases[stage];
}

export interface YouScrollMarketing {
  name: string;
  releaseStage: YouScrollReleaseStage;
  release: YouScrollRelease;
  trialDays: number;
  prices: { monthly: number; yearly: number; annualSavingPercent: number };
  capacity: { free: number; pro: number };
  platforms: readonly { id: string; name: string }[];
  installUrl: string;
  links: { home: string; pricing: string; support: string; privacy: string; terms: string; refunds: string };
}

// The verified public listing is the local YouTube build. Advance this only
// after the matching extension, Social service and billing release checks.
const releaseStage: YouScrollReleaseStage = "preview";
const monthly = 3.99;
const yearly = 29.99;

/** Prices mirror the extension's planCopy.ts; provider prices need release verification. */
export const youScrollMarketing: YouScrollMarketing = {
  name: "YouScroll",
  releaseStage,
  release: getYouScrollRelease(releaseStage),
  trialDays: 40,
  prices: { monthly, yearly, annualSavingPercent: Math.round((1 - yearly / (monthly * 12)) * 100) },
  capacity: { free: 4, pro: 8 },
  platforms: [
    { id: "youtube", name: "YouTube" },
    { id: "netflix", name: "Netflix" },
    { id: "prime", name: "Prime Video" },
    { id: "hotstar", name: "JioHotstar" },
    { id: "crunchyroll", name: "Crunchyroll" },
  ],
  installUrl: "https://chromewebstore.google.com/detail/ajdjgkbpinaphnaonpamebhalgohphma?utm_source=portfolio",
  links: {
    home: productHref("youscroll"),
    pricing: pricingUrl,
    support: productHref("youscroll", "support"),
    privacy: productHref("youscroll", "privacy"),
    terms: productHref("youscroll", "terms"),
    refunds: productHref("youscroll", "refunds"),
  },
};
