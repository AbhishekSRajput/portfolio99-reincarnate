import type { Metadata } from "next";
import { profile } from "@/lib/content";
import { productMetadata } from "@/lib/seo";
import { ProductLink } from "@/components/product-link";
import { SectionHead } from "@/components/product-home";
import { ActionLink, DocIntro, Eyebrow, Headline, ProductBar } from "@/components/product-ui";

// Plan rules follow the YouScroll backend's host plans (40-day trial that
// starts on first hosting; joining is free). Prices are the owner's to set.
export const metadata: Metadata = productMetadata(
  "youscroll",
  "pricing",
  "YouScroll pricing",
  "YouScroll is free. Joining watch parties is free; hosting them starts with a 40-day free trial, then $3.99 a month or $29.99 a year.",
);

const faq = [
  {
    question: "When does the free trial start?",
    answer:
      "The first time you host a watch party, not when you install YouScroll or sign in. Joining friends’ parties never starts or uses your trial.",
  },
  {
    question: "Do my friends need to pay to join my party?",
    answer:
      "No. Joining a party is always free, whether your friends sign in or join as a guest with your party code.",
  },
  {
    question: "What happens when the trial ends?",
    answer:
      "You can keep using every free feature and keep joining parties. To host again, choose Upgrade in YouScroll’s Account page or the extension popup. A party already running when your plan ends carries on for the people in it.",
  },
  {
    question: "How do I cancel?",
    answer:
      "Choose Manage billing in YouScroll to open the Dodo Payments customer portal, and cancel there. You keep hosting until the end of the period you have paid for, and you are not charged again.",
  },
  {
    question: "Who processes the payment?",
    answer:
      "Dodo Payments sells the plan as merchant of record. It handles checkout, receipts and any sales tax or VAT, and it keeps your card details. YouScroll never receives them.",
  },
] as const;

export default function PricingPage() {
  const refunds = "/products/youscroll/refunds/";
  return (
    <>
      <ProductBar slug="youscroll" current="pricing" />
      <main id="main-content" className="pp pp-youscroll">
        <DocIntro
          slug="youscroll"
          id="pricing-title"
          eyebrow="Pricing"
          title={[["Free to use."], [{ text: "Pay only to host.", serif: true, accent: true }]]}
          aside={
            <>
              Everything in the store version is free. <span>Watch parties and the host plan are coming soon.</span>
            </>
          }
        />

        <section className="pp-paper light-section" aria-labelledby="plans-title">
          <div className="section-wrap">
            <SectionHead
              index="01"
              eyebrow="Plans"
              id="plans-title"
              title={[["Two plans. ", { text: "One rule.", serif: true }]]}
              lede="Whoever hosts a watch party pays for it."
              ledeStrong="Watching, reading, drawing and joining stay free."
            />
            <div className="pp-paper-grid">
              <div className="pp-paper-card">
                <p className="pp-eyebrow">Free · available now</p>
                <p className="pp-statement">$0, forever.</p>
                <ul className="pp-points">
                  <li>Comments and Up Next panel</li>
                  <li>Video playground: Doodle, GIFs, Throw and Faces</li>
                  <li>Saved GIFs on your device</li>
                  <li>Picture-in-Picture pop-out</li>
                  <li>Joining watch parties, when they launch</li>
                </ul>
              </div>
              <div className="pp-paper-card is-ink">
                <p className="pp-eyebrow">Host plan · coming soon</p>
                <p className="pp-statement">$3.99 a month, or $29.99 a year.</p>
                <ul className="pp-points">
                  <li>Host watch parties for up to eight people</li>
                  <li>40-day free trial, starting the first time you host</li>
                  <li>Synced play, pause and seek, chat and shared reactions</li>
                  <li>Cancel anytime from Manage billing</li>
                </ul>
                <p className="pp-fine">
                  Prices in US dollars. Any sales tax or VAT is calculated at checkout by Dodo Payments,
                  our merchant of record.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pp-section" aria-labelledby="faq-title">
          <div className="section-wrap pp-split">
            <div className="pp-faq-intro">
              <Eyebrow index="02 /">Quick answers</Eyebrow>
              <h2 id="faq-title" className="pp-h2 is-small">
                <Headline lines={[["How the ", { text: "trial works.", serif: true }]]} />
              </h2>
              <p className="pp-lede">
                Changed your mind? Read the{" "}
                <ProductLink className="pp-inline-link" href={refunds}>
                  refund policy
                </ProductLink>
                , or email{" "}
                <a className="pp-inline-link" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
                .
              </p>
            </div>
            <div className="pp-faq">
              {faq.map((item, index) => (
                <details key={item.question} open={index === 0}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <nav className="section-wrap pp-doc-links" aria-label="More YouScroll terms">
          <ActionLink href="/products/youscroll/terms/">Terms of service</ActionLink>
          <ActionLink href={refunds}>Refund policy</ActionLink>
          <ActionLink href="/products/youscroll/privacy/">Privacy policy</ActionLink>
          <ActionLink href="/products/youscroll/" className="pp-push">
            Back to YouScroll
          </ActionLink>
        </nav>
      </main>
    </>
  );
}
