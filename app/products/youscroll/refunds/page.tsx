import type { Metadata } from "next";
import { profile } from "@/lib/content";
import { productMetadata } from "@/lib/seo";
import { ProductLink } from "@/components/product-link";
import { DocIntro, DocSection, ProductBar, Toc } from "@/components/product-ui";

// The owner's refund policy for the YouScroll host plan: no refunds, because
// hosting starts with a 40-day trial that is never charged. Payments run
// through Dodo Payments as merchant of record.
export const metadata: Metadata = productMetadata(
  "youscroll",
  "refunds",
  "YouScroll refund policy",
  "YouScroll's host plan starts with a 40-day free trial that is never charged. Cancel any time; payments are not refunded.",
);

const sections = [
  { id: "try-first", label: "Try first, pay later" },
  { id: "no-refunds", label: "No refunds" },
  { id: "cancelling", label: "Cancelling" },
  { id: "billing-mistakes", label: "Billing mistakes" },
  { id: "your-rights", label: "Your rights" },
] as const;
type SectionId = (typeof sections)[number]["id"];
const n = (id: SectionId) => sections.findIndex((section) => section.id === id) + 1;
const title = (id: SectionId) => sections.find((section) => section.id === id)!.label;

export default function RefundsPage() {
  const mail = `mailto:${profile.email}?subject=${encodeURIComponent("YouScroll billing")}`;
  return (
    <>
      <ProductBar slug="youscroll" current="refunds" />
      <main id="main-content" className="pp pp-youscroll">
        <DocIntro
          slug="youscroll"
          id="refunds-title"
          eyebrow="Refund policy"
          title={[["Refund"], [{ text: "policy.", serif: true, accent: true }]]}
        >
          <dl className="pp-meta">
            <div>
              <dt>Last updated</dt>
              <dd>24 October 2026</dd>
            </div>
            <div>
              <dt>Applies to</dt>
              <dd>The YouScroll host plan</dd>
            </div>
            <div>
              <dt>Contact</dt>
              <dd>
                <a className="pp-inline-link" href={mail}>
                  {profile.email}
                </a>
              </dd>
            </div>
          </dl>
        </DocIntro>

        <div className="section-wrap pp-reading">
          <Toc label="On this page" items={sections} />
          <article className="pp-prose" aria-labelledby="refunds-title">
            <DocSection id="try-first" index={n("try-first")} title={title("try-first")} className="pp-summary">
              <p>Hosting watch parties starts with a 40-day free trial, and you are not charged anything during it. Billing starts only when the trial ends — even if you choose Upgrade earlier, your card is saved and first charged on the day the trial ends.</p>
              <p>Everything else in YouScroll, including joining parties, is free.</p>
            </DocSection>

            <DocSection id="no-refunds" index={n("no-refunds")} title={title("no-refunds")}>
              <p>Because you can try hosting fully before you pay, payments for the host plan are not refunded — neither the first payment nor any renewal, and not for a partly used period — except for billing mistakes or where the law requires it.</p>
            </DocSection>

            <DocSection id="cancelling" index={n("cancelling")} title={title("cancelling")}>
              <p>Cancel at any time with <strong>Manage billing</strong> in YouScroll’s Account page or the extension popup, which opens the Dodo Payments customer portal. Cancel before your trial ends and you are never charged. After that, cancelling stops future renewals: you keep hosting until the end of the period you have paid for, and you are not charged again.</p>
            </DocSection>

            <DocSection id="billing-mistakes" index={n("billing-mistakes")} title={title("billing-mistakes")}>
              <p>If you are charged twice, charged after cancelling, or charged the wrong amount, email <a href={mail}>{profile.email}</a> with the order number on your Dodo Payments receipt. A mistaken charge is refunded to the payment method you used.</p>
            </DocSection>

            <DocSection id="your-rights" index={n("your-rights")} title={title("your-rights")}>
              <p>Nothing in this policy limits rights you have under the consumer law where you live.</p>
              <p>
                See also the <ProductLink href="/products/youscroll/terms/">terms of service</ProductLink> and{" "}
                <ProductLink href="/products/youscroll/pricing/">pricing</ProductLink>.
              </p>
            </DocSection>
          </article>
        </div>
      </main>
    </>
  );
}
