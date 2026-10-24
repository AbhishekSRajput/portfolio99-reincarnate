import type { Metadata } from "next";
import { profile } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { productHref } from "@/lib/site-urls";
import { ActionLink, DocIntro, ProductBar } from "@/components/product-ui";

// Dodo Payments returns buyers here after checkout and appends the
// subscription status and the buyer's email to the address. This page is
// static and never reads its query string; it is not indexed or listed.
export const metadata: Metadata = pageMetadata({
  title: "Thanks for upgrading — YouScroll",
  description: "Your YouScroll host plan payment is being confirmed.",
  url: productHref("youscroll", "thanks"),
  image: "youscroll",
  index: false,
});

export default function ThanksPage() {
  return (
    <>
      <ProductBar slug="youscroll" current="thanks" />
      <main id="main-content" className="pp pp-youscroll">
        <DocIntro
          slug="youscroll"
          id="thanks-title"
          eyebrow="Payment received"
          title={[["Thanks for"], [{ text: "upgrading.", serif: true, accent: true }]]}
          aside={
            <>
              Dodo Payments is confirming your payment with YouScroll.{" "}
              <span>Go back to YouTube and open Social, then Account: your plan shows as paid within a minute.</span>
            </>
          }
        >
          <div className="pp-actions">
            <ActionLink href="https://www.youtube.com/" variant="accent">
              Back to YouTube
            </ActionLink>
            <ActionLink href="/products/youscroll/support/" variant="ghost">
              Get help
            </ActionLink>
          </div>
        </DocIntro>
        <div className="section-wrap pp-doc-links">
          <p className="pp-lede">
            Still not showing as paid after a few minutes? Email{" "}
            <a className="pp-inline-link" href={`mailto:${profile.email}?subject=${encodeURIComponent("YouScroll payment")}`}>
              {profile.email}
            </a>{" "}
            with the email you used at checkout. Your receipt from Dodo Payments has your order number.
          </p>
        </div>
      </main>
    </>
  );
}
