import type { Metadata } from "next";
import { profile } from "@/lib/content";
import { productMetadata } from "@/lib/seo";
import { ProductLink } from "@/components/product-link";
import { DocIntro, DocSection, ProductBar, Toc } from "@/components/product-ui";

// The owner's refund policy for the YouScroll host plan. Payments run through
// Dodo Payments as merchant of record, which issues the refund itself.
export const metadata: Metadata = productMetadata(
  "youscroll",
  "refunds",
  "YouScroll refund policy",
  "YouScroll host plan refunds: a full refund within 14 days of any payment, cancelling at any time, and how to ask.",
);

const sections = [
  { id: "fourteen-days", label: "14 days, no questions" },
  { id: "how-to-ask", label: "How to ask for a refund" },
  { id: "cancelling", label: "Cancelling" },
  { id: "after-fourteen-days", label: "After 14 days" },
  { id: "how-refunds-are-paid", label: "How refunds are paid" },
] as const;
type SectionId = (typeof sections)[number]["id"];
const n = (id: SectionId) => sections.findIndex((section) => section.id === id) + 1;
const title = (id: SectionId) => sections.find((section) => section.id === id)!.label;

export default function RefundsPage() {
  const mail = `mailto:${profile.email}?subject=${encodeURIComponent("YouScroll refund")}`;
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
            <DocSection id="fourteen-days" index={n("fourteen-days")} title={title("fourteen-days")} className="pp-summary">
              <p>If YouScroll’s host plan isn’t right for you, ask within 14 days of a payment — your first one or any renewal — and that payment is refunded in full. You don’t need to give a reason.</p>
              <p>Everything else in YouScroll is free, and the host plan starts with a 40-day free trial, so you can try hosting before you pay anything.</p>
            </DocSection>

            <DocSection id="how-to-ask" index={n("how-to-ask")} title={title("how-to-ask")}>
              <p>Email <a href={mail}>{profile.email}</a> from any address, and include the email you used at checkout or the order number on your Dodo Payments receipt, so the payment can be found. You will get an answer within a few working days.</p>
            </DocSection>

            <DocSection id="cancelling" index={n("cancelling")} title={title("cancelling")}>
              <p>Cancel at any time with <strong>Manage billing</strong> in YouScroll’s Account page or the extension popup, which opens the Dodo Payments customer portal. Cancelling stops future renewals. You keep hosting until the end of the period you have already paid for, and you are not charged again.</p>
              <p>Cancelling on its own does not refund the current period; ask for a refund as described above if you are within 14 days of the payment.</p>
            </DocSection>

            <DocSection id="after-fourteen-days" index={n("after-fourteen-days")} title={title("after-fourteen-days")}>
              <p>After 14 days, a payment is not refunded, except where the law requires it. You can still cancel so the plan does not renew. A refund ends the paid time it covered, and hosting then follows your trial or plan status as it would without that payment.</p>
              <p>Nothing in this policy limits rights you have under the consumer law where you live.</p>
            </DocSection>

            <DocSection id="how-refunds-are-paid" index={n("how-refunds-are-paid")} title={title("how-refunds-are-paid")}>
              <p>Dodo Payments, the merchant of record for YouScroll’s host plan, returns refunds to the payment method you used, in the currency you paid. Your bank may take several business days to show it.</p>
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
