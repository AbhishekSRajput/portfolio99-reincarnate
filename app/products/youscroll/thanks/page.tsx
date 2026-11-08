import type { Metadata } from "next";
import { productEmail } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { productHref } from "@/lib/site-urls";
import { ActionLink, DocIntro, ProductBar } from "@/components/product-ui";

// Dodo Payments returns buyers here after checkout and appends the
// subscription status and the buyer's email to the address. This page is
// static and never reads its query string; it is not indexed or listed.
export const metadata: Metadata = pageMetadata({
  title: "Checking your upgrade — YouScroll",
  description: "Return to YouScroll to check your plan. This page does not confirm a payment or activate Pro.",
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
          eyebrow="After checkout"
          title={[["Checking your"], [{ text: "upgrade.", serif: true, accent: true }]]}
          aside={
            <>
              This page does not confirm payment or activate Pro.{" "}
              <span>After checkout, return to YouScroll and open Account to check your plan. Activation follows confirmation from the payment provider.</span>
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
            If you completed checkout and your plan has not updated, email{" "}
            <a className="pp-inline-link" href={`mailto:${productEmail.youscroll}?subject=${encodeURIComponent("YouScroll payment")}`}>
              {productEmail.youscroll}
            </a>{" "}
            with the email you used at checkout. Your receipt from Dodo Payments has your order number.
          </p>
        </div>
      </main>
    </>
  );
}
