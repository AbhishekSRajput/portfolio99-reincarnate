import type { Metadata } from "next";
import { productEmail } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { productHref } from "@/lib/site-urls";
import { ProductLink } from "@/components/product-link";
import { ActionLink, DocIntro, getProduct, ProductBar } from "@/components/product-ui";

// Chrome opens this address when PixelGhost is removed (the extension's
// `setUninstallURL`). The extension adds nothing to it, and the page reads
// nothing from it; it is not indexed or listed. What it says was removed
// follows "Retention and deletion" in pixelghost-publicdocs/PRIVACY.md.
export const metadata: Metadata = pageMetadata({
  title: "PixelGhost removed",
  description: "PixelGhost has been removed from Chrome, with everything it kept in your browser.",
  url: productHref("pixelghost", "uninstall"),
  image: "pixelghost",
  index: false,
});

const removed = [
  "Your page workspaces, their layers and your saved projects",
  "Recent screenshots and any Steps walkthrough in progress",
  "Your SEO deep-scan history and your PixelGhost settings",
];

export default function UninstallPage() {
  const product = getProduct("pixelghost")!;
  return (
    <>
      <ProductBar slug="pixelghost" current="uninstall" />
      <main id="main-content" className="pp pp-pixelghost">
        <DocIntro
          slug="pixelghost"
          id="uninstall-title"
          eyebrow="Uninstalled"
          title={[["PixelGhost"], [{ text: "is removed.", serif: true, accent: true }]]}
          aside={
            <>
              Chrome opened this page as it removed PixelGhost.{" "}
              <span>Nothing about you, your pages or your settings was sent with it.</span>
            </>
          }
        >
          <div className="pp-actions">
            <ActionLink
              href={`mailto:${productEmail.pixelghost}?subject=${encodeURIComponent("Why I removed PixelGhost")}`}
              variant="accent"
            >
              Tell us why
            </ActionLink>
            <ActionLink href={product.storeUrl} variant="ghost">
              Add it back to Chrome
            </ActionLink>
          </div>
        </DocIntro>
        <div className="section-wrap pp-doc-links">
          <div>
            <p className="pp-lede">Removing PixelGhost deleted everything it kept in this Chrome profile:</p>
            <ul className="pp-points">
              {removed.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="pp-lede">
              Files you saved — screenshots, recordings, reports and assets — stay in your downloads folder. If
              something didn&rsquo;t work, a line to{" "}
              <a
                className="pp-inline-link"
                href={`mailto:${productEmail.pixelghost}?subject=${encodeURIComponent("Why I removed PixelGhost")}`}
              >
                {productEmail.pixelghost}
              </a>{" "}
              or an issue from the{" "}
              <ProductLink className="pp-inline-link" href="/products/pixelghost/support/">
                support page
              </ProductLink>{" "}
              helps fix it for everyone else.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
