import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "PixelGhost privacy",
  description:
    "How PixelGhost handles local design references, extension permissions, and screenshots.",
};
export default function PrivacyPage() {
  return (
    <main id="main-content" className="inner-page section-wrap prose">
      <Link href="/products/pixelghost" className="breadcrumb">
        ← PixelGhost
      </Link>
      <p className="eyebrow">PIXELGHOST / PRIVACY</p>
      <h1 className="page-heading">
        Your work.
        <br />
        <span className="serif-accent">Your space.</span>
      </h1>
      <p>
        PixelGhost works on the page you’re viewing. It does not require an
        account and does not send your design workspace to an operator-owned
        server.
      </p>
      <h2>What stays on your device</h2>
      <p>
        Design references, layer settings, saved projects, and URL workspace
        history are stored locally using browser extension storage. PixelGhost
        does not use analytics, tracking, or advertising.
      </p>
      <h2>Images and screenshots</h2>
      <p>
        References you choose are used for your overlays. If you load an image
        from an HTTPS URL, your browser requests that image from its host.
        Screenshots are held while the extension offers them for saving or
        copying.
      </p>
      <p>
        Overlays are inserted into the webpage you are inspecting. Scripts on
        that page may be able to inspect the overlay content, so use trusted
        pages when working with sensitive designs.
      </p>
      <h2>Why permissions are needed</h2>
      <ul>
        <li>
          <strong>Storage:</strong> remembers your workspace and preferences.
        </li>
        <li>
          <strong>Scripting and page access:</strong> render overlays and
          inspection tools on the pages where you use PixelGhost.
        </li>
        <li>
          <strong>Optional clipboard access:</strong> lets you paste an image as
          a reference when you choose to.
        </li>
      </ul>
      <h2>Questions or removal</h2>
      <p>
        You can remove PixelGhost through Chrome’s extension settings. For
        questions about the extension and its data handling, email{" "}
        <a href="mailto:codecube99@gmail.com?subject=PixelGhost%20privacy">
          codecube99@gmail.com
        </a>
        .
      </p>
      <p>
        <Link href="/products/pixelghost/support">
          Read support and frequently asked questions →
        </Link>
      </p>
    </main>
  );
}
