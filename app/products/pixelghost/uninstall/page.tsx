import type { Metadata } from "next";
import { productEmail } from "@/lib/content";
import type { IconName } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { productHref } from "@/lib/site-urls";
import { ProductLink } from "@/components/product-link";
import { SectionHead } from "@/components/product-home";
import { ProductIcon } from "@/components/product-icons";
import { MascotGaze } from "@/components/mascot-gaze";
import { SadGhost } from "@/components/pixelghost-mascot";
import { ActionLink, DocIntro, getProduct, ProductBar } from "@/components/product-ui";

// The browser opens this address when PixelGhost is removed (the extension's
// `setUninstallURL`). The extension adds nothing to it, and the page reads
// nothing from it; it is not indexed or listed. What it says was removed
// follows "Retention and deletion" in pixelghost-publicdocs/PRIVACY.md.
export const metadata: Metadata = pageMetadata({
  title: "PixelGhost removed",
  description: "PixelGhost has been removed from your browser, with everything it kept in this browser profile.",
  url: productHref("pixelghost", "uninstall"),
  image: "pixelghost",
  index: false,
});

const removed: readonly { icon: IconName; tone: string; title: string; text: string }[] = [
  {
    icon: "layers",
    tone: "is-pink",
    title: "Workspaces and projects",
    text: "Every page’s overlay layers and where they sat, and the projects you saved.",
  },
  {
    icon: "camera",
    tone: "is-violet",
    title: "Screenshots",
    text: "The captures in Recent, and any Steps walkthrough you had in progress.",
  },
  {
    icon: "folder",
    tone: "is-orange",
    title: "Settings and history",
    text: "Your theme, accent and tool preferences, and your SEO deep-scan history.",
  },
];

const reasons = [
  "I only needed it once",
  "Something didn’t work",
  "It was missing something",
  "The permissions worried me",
  "Something else",
];

const mail = (subject: string) => `mailto:${productEmail.pixelghost}?subject=${encodeURIComponent(subject)}`;

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
          title={[["Sorry to see"], [{ text: "you go.", serif: true, accent: true }]]}
          aside={
            <>
              Your browser opened this page as it removed PixelGhost.{" "}
              <span>Nothing about you, your pages or your settings was sent with it.</span>
            </>
          }
          lead={
            <div className="pp-actions">
              <ActionLink href="#why" variant="accent" className="pp-mood-hope">
                Tell us why
              </ActionLink>
              <ActionLink href={product.storeUrl} variant="ghost" className="pp-mood-happy">
                Add it back to Chrome
              </ActionLink>
            </div>
          }
          visual={
            <>
              <MascotGaze className="pp-stage">
                <SadGhost />
              </MascotGaze>
              <figcaption className="pp-stage-caption">It hasn’t given up on you.</figcaption>
            </>
          }
        />

        <section className="pp-section is-tight" aria-labelledby="gone-title">
          <div className="section-wrap pp-ruled">
            <SectionHead
              index="01"
              eyebrow="What went with it"
              id="gone-title"
              title={[["Cleared from "], [{ text: "this browser.", serif: true }]]}
              lede="Removing PixelGhost deleted everything it kept in this browser profile."
              ledeStrong="There is nothing left behind to clean up."
            />
            <div className="pp-cards">
              {removed.map((item) => (
                <div className={`pp-box ${item.tone}`} key={item.title}>
                  <span className="pp-tile">
                    <ProductIcon name={item.icon} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
            <div className="pp-keep">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <p>
                <strong>What stays:</strong> files you saved, such as screenshots, recordings, reports and assets,
                are still in your downloads folder.
              </p>
            </div>
          </div>
        </section>

        <section id="why" className="pp-section is-tight is-flush" aria-labelledby="why-title">
          <div className="section-wrap pp-ruled">
            <SectionHead
              index="02"
              eyebrow="One line helps"
              id="why-title"
              title={[["Why did you "], [{ text: "remove it?", serif: true }]]}
              lede="Pick a reason and your email app opens with it filled in."
              ledeStrong="There is no form here, and nothing is sent until you press send."
            />
            <ul className="pp-chips">
              {reasons.map((reason) => (
                <li key={reason}>
                  <a className="pp-chip" href={mail(`Removed PixelGhost: ${reason}`)}>
                    {reason}
                  </a>
                </li>
              ))}
            </ul>
            <p className="pp-lede">
              Found a bug? An issue from the{" "}
              <ProductLink className="pp-inline-link" href="/products/pixelghost/support/">
                support page
              </ProductLink>{" "}
              helps fix it for everyone, or write to{" "}
              <a className="pp-inline-link" href={`mailto:${productEmail.pixelghost}`}>
                {productEmail.pixelghost}
              </a>
              .
            </p>
          </div>
        </section>

        <section className="pp-paper light-section" aria-labelledby="back-title">
          <div className="section-wrap">
            <SectionHead
              index="03"
              eyebrow="Changed your mind?"
              id="back-title"
              title={[["It’s still "], [{ text: "in the store.", serif: true, accent: true }]]}
              lede="Your old workspaces went with it, so you will start fresh:"
              ledeStrong="layers, projects and settings included."
              action={
                <ActionLink href={product.storeUrl} variant="accent">
                  Add it back to Chrome
                </ActionLink>
              }
            />
          </div>
        </section>
      </main>
    </>
  );
}
