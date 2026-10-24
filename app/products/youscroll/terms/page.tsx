import type { Metadata } from "next";
import { profile } from "@/lib/content";
import { productMetadata } from "@/lib/seo";
import { ProductLink } from "@/components/product-link";
import { DocIntro, DocSection, ProductBar, Toc } from "@/components/product-ui";

// The owner's terms for YouScroll and its host plan. Behaviour described here
// must match the extension and its backend (trial, hosting, Dodo checkout).
export const metadata: Metadata = productMetadata(
  "youscroll",
  "terms",
  "YouScroll terms of service",
  "The terms for using YouScroll, its watch parties and the paid host plan sold through Dodo Payments.",
);

const sections = [
  { id: "about-these-terms", label: "About these terms" },
  { id: "the-extension", label: "The extension" },
  { id: "accounts", label: "Accounts" },
  { id: "acceptable-use", label: "Acceptable use" },
  { id: "trial-and-paid-plans", label: "Free trial and paid plans" },
  { id: "refunds", label: "Refunds" },
  { id: "changes-to-the-service", label: "Changes to the service" },
  { id: "disclaimers", label: "Disclaimers" },
  { id: "liability", label: "Limitation of liability" },
  { id: "ending", label: "Ending your use" },
  { id: "changes-to-these-terms", label: "Changes to these terms" },
  { id: "governing-law", label: "Governing law" },
  { id: "contact", label: "Contact" },
] as const;
type SectionId = (typeof sections)[number]["id"];
const n = (id: SectionId) => sections.findIndex((section) => section.id === id) + 1;
const title = (id: SectionId) => sections.find((section) => section.id === id)!.label;

export default function TermsPage() {
  return (
    <>
      <ProductBar slug="youscroll" current="terms" />
      <main id="main-content" className="pp pp-youscroll">
        <DocIntro
          slug="youscroll"
          id="terms-title"
          eyebrow="Terms of service"
          title={[["Terms of"], [{ text: "service.", serif: true, accent: true }]]}
        >
          <dl className="pp-meta">
            <div>
              <dt>Last updated</dt>
              <dd>24 October 2026</dd>
            </div>
            <div>
              <dt>Applies to</dt>
              <dd>YouScroll, its watch parties and the host plan</dd>
            </div>
            <div>
              <dt>Contact</dt>
              <dd>
                <a className="pp-inline-link" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </dd>
            </div>
          </dl>
        </DocIntro>

        <div className="section-wrap pp-reading">
          <Toc label="On this page" items={sections} />
          <article className="pp-prose" aria-labelledby="terms-title">
            <DocSection id="about-these-terms" index={n("about-these-terms")} title={title("about-these-terms")} className="pp-summary">
              <p>YouScroll is a browser extension made by {profile.displayName} (“we”). These terms apply when you install or use YouScroll, sign in to its watch parties, or buy its host plan. By doing any of those, you agree to them.</p>
              <p>How YouScroll handles data is explained in the <ProductLink href="/products/youscroll/privacy/">privacy policy</ProductLink>, which is part of these terms.</p>
            </DocSection>

            <DocSection id="the-extension" index={n("the-extension")} title={title("the-extension")}>
              <p>YouScroll changes the layout of YouTube’s watch page and draws effects over the video in your browser. It is free to install and use. YouScroll is not made, endorsed or sponsored by YouTube or Google. Videos always play from YouTube itself, under YouTube’s own terms, which continue to apply to your use of YouTube.</p>
              <p>We license the extension under the Apache License 2.0. Third-party components keep their own licenses, listed in the <ProductLink href="/products/youscroll/notices/">third-party notices</ProductLink>.</p>
            </DocSection>

            <DocSection id="accounts" index={n("accounts")} title={title("accounts")}>
              <p>Watch parties use an optional YouScroll account, created when you sign in with Google. Each account is for one person. You are responsible for what happens in your browser while you are signed in, so sign out on shared computers. You can delete your account at any time from the extension popup.</p>
            </DocSection>

            <DocSection id="acceptable-use" index={n("acceptable-use")} title={title("acceptable-use")}>
              <p>Don’t use YouScroll to harass, threaten or spam people, to share anything illegal or that you have no right to share, or to get around YouTube’s restrictions. Don’t try to break, overload or gain unauthorized access to YouScroll’s service, or to reuse someone else’s party code against their wishes. Only invite people you want in your party.</p>
              <p>We may remove you from a party, suspend or close an account, or block access when these terms are broken, and we may report illegal activity where the law requires it.</p>
            </DocSection>

            <DocSection id="trial-and-paid-plans" index={n("trial-and-paid-plans")} title={title("trial-and-paid-plans")}>
              <p>Joining a watch party is always free. Hosting one needs the host plan. Each account gets one 40-day free trial, which starts the first time it hosts a party, not when it signs up.</p>
              <p>After the trial, the host plan is a subscription billed monthly or yearly at the price shown at checkout. It renews automatically at the end of each period until you cancel. Cancel at any time with <strong>Manage billing</strong>; you keep hosting until the end of the period you have paid for and are not charged again.</p>
              <p>Payments are processed by Dodo Payments, which sells the plan as merchant of record. Dodo’s own buyer terms apply to the purchase, and Dodo collects any sales tax or VAT. If we change the price, we will tell you before your next renewal at the new price, so you can cancel first.</p>
            </DocSection>

            <DocSection id="refunds" index={n("refunds")} title={title("refunds")}>
              <p>You can get a full refund of any payment within 14 days of it. The <ProductLink href="/products/youscroll/refunds/">refund policy</ProductLink> explains how.</p>
            </DocSection>

            <DocSection id="changes-to-the-service" index={n("changes-to-the-service")} title={title("changes-to-the-service")}>
              <p>We may add, change or remove features. YouScroll depends on YouTube’s page, and YouTube changes it without notice, so a feature can stop working until we update the extension. If we stop offering the host plan, we will refund the unused part of any period you have paid for.</p>
            </DocSection>

            <DocSection id="disclaimers" index={n("disclaimers")} title={title("disclaimers")}>
              <p>YouScroll is provided “as is” and “as available”. To the extent the law allows, we make no promise that it will be uninterrupted, error-free or suitable for a particular purpose, or that watch parties will always stay in sync.</p>
            </DocSection>

            <DocSection id="liability" index={n("liability")} title={title("liability")}>
              <p>To the extent the law allows, we are not liable for indirect or consequential losses, and our total liability to you for any claim is limited to the amount you paid us for YouScroll in the 12 months before the claim. Nothing in these terms limits liability that cannot be limited by law.</p>
            </DocSection>

            <DocSection id="ending" index={n("ending")} title={title("ending")}>
              <p>You can stop using YouScroll at any time by uninstalling it, and delete your account from the extension popup. Deleting an account cancels any subscription that could still be charged. We may end access as described in Acceptable use.</p>
            </DocSection>

            <DocSection id="changes-to-these-terms" index={n("changes-to-these-terms")} title={title("changes-to-these-terms")}>
              <p>We may update these terms. The date at the top shows the latest version. If a change affects paying subscribers materially, we will give notice before it applies to your next renewal.</p>
            </DocSection>

            <DocSection id="governing-law" index={n("governing-law")} title={title("governing-law")}>
              <p>These terms are governed by the laws of India. This does not take away any protection you have under the mandatory consumer laws of the country where you live.</p>
            </DocSection>

            <DocSection id="contact" index={n("contact")} title={title("contact")} className="pp-contact">
              <p>Questions about these terms, billing or your account:</p>
              <p className="pp-contact-email">
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </p>
            </DocSection>
          </article>
        </div>
      </main>
    </>
  );
}
