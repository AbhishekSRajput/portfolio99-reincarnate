import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/icons";

export const metadata: Metadata = {
  title: "PixelGhost support",
  description:
    "Get help with PixelGhost overlays, browser permissions, screenshots, and workspace settings.",
};

// Source: pixelghost-publicdocs/ISSUES.md, README.md, TOOLS.md, and PRIVACY.md.
const faq = [
  [
    "Why doesn’t PixelGhost run on every page?",
    "PixelGhost works on ordinary HTTP and HTTPS pages. Browser-internal pages, extension stores, and other restricted pages do not allow overlays. On a supported page, reload and try the action again.",
  ],
  [
    "Do I need an overlay to use the inspection tools?",
    "No. Open a supported page and launch a tool from the popup’s TOOLS section or the icon rail in the on-page widget. Color Picker, Page Ruler, Inspector, Element Selector, and Screenshot also work without an overlay layer.",
  ],
  [
    "Do I have to allow clipboard access?",
    "No. The Paste button asks for optional clipboard-read permission when you select it. You can decline and use local files, a folder, an HTTPS image URL, or ordinary Ctrl+V paste instead.",
  ],
  [
    "Will my workspace survive a reload?",
    "PixelGhost autosaves layers for each page URL and offers named projects for setups you want to reuse. The URL fragment is removed from the saved workspace key; the scheme, host, path, and query string remain. Widget position and the selected tool reset on page load.",
  ],
  [
    "Why did my overlay disappear when I opened a tool?",
    "Color Picker, Inspector, and Element Selector temporarily stand overlay layers aside so they read the page itself. Page Ruler keeps the overlay visible, and Screenshot lets you decide whether to include it.",
  ],
  [
    "What happens to my screenshots?",
    "Captures stay in memory only while the panel offers to save or copy them, then are discarded. They go only to the file you save or clipboard you copy to. There is no capture history and no developer or analytics server receives them.",
  ],
] as const;

export default function SupportPage() {
  return (
    <main id="main-content" className="inner-page section-wrap prose">
      <Link href="/products/pixelghost" className="breadcrumb">
        ← PixelGhost
      </Link>
      <p className="eyebrow">PIXELGHOST / SUPPORT</p>
      <h1 className="page-heading">
        Let’s sort
        <br />
        <span className="serif-accent">it out.</span>
      </h1>
      <p className="page-intro">
        Something not working as expected? Search the existing issues, report a
        reproducible bug, or email support with a question.
      </p>
      <div className="hero-actions">
        <a
          className="button button-accent"
          href="mailto:codecube99@gmail.com?subject=PixelGhost%20support"
        >
          Email support <Arrow diagonal />
        </a>
        <a
          className="text-link"
          href="https://github.com/AbhishekSRajput/pixelghost/issues"
          target="_blank"
          rel="noreferrer"
        >
          GitHub issues <Arrow diagonal />
        </a>
      </div>
      <h2>What to include in a bug report</h2>
      <ul>
        <li>Your PixelGhost version and Chrome version.</li>
        <li>The steps to reproduce the problem, what you expected, and what happened.</li>
        <li>Whether it affects overlays, the popup, the floating widget, or saved projects.</li>
        <li>Screenshots or error messages, if they are safe to share.</li>
      </ul>
      <p>
        GitHub issues are public. Keep private overlay images, sensitive page
        URLs, personal information, and other confidential data out of public
        reports. Send privacy requests, security reports, or support that needs
        private details to <a href="mailto:codecube99@gmail.com">codecube99@gmail.com</a>.
      </p>
      <h2>Frequently asked questions</h2>
      <div className="faq-list">
        {faq.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
      <p>
        <Link href="/products/pixelghost/privacy">Read the complete privacy policy →</Link>
      </p>
    </main>
  );
}
