import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/icons";
export const metadata: Metadata = {
  title: "PixelGhost support",
  description:
    "Get help with PixelGhost overlays, browser permissions, screenshots, and workspace settings.",
};
const faq = [
  [
    "Why doesn’t PixelGhost run on every page?",
    "Chrome restricts extensions on internal browser pages, the Chrome Web Store, and some other protected pages. Try a regular website and make sure the extension has access to that site.",
  ],
  [
    "Is everything free?",
    "Yes. PixelGhost has no paid tier, trial, or account requirement.",
  ],
  [
    "Can I change the keyboard shortcut?",
    "Open chrome://extensions/shortcuts in Chrome to view and configure the extension’s keyboard shortcut.",
  ],
  [
    "Will my workspace survive a reload?",
    "PixelGhost restores its settings per URL. Saved projects and URL history help you return to your work.",
  ],
  [
    "What happens to my screenshots?",
    "Captured screenshots are held while you choose to save or copy them. They are not sent to an operator-owned server.",
  ],
  [
    "Which languages are available?",
    "English, German, Spanish, French, Brazilian Portuguese, Russian, Japanese, and Simplified Chinese.",
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
        Something not working as expected? Include your Chrome version, what you
        tried, and what happened. A small reproducible example helps.
      </p>
      <div className="hero-actions">
        <a
          className="button button-accent"
          href="mailto:codecube99@gmail.com?subject=PixelGhost%20bug%20report"
        >
          Email a bug report <Arrow diagonal />
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
      <h2>Frequently asked questions</h2>
      <div className="faq-list">
        {faq.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </main>
  );
}
