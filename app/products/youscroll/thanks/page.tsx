import type { Metadata } from "next";
import Image from "next/image";
import { ThemeToggle } from "@/components/site-shell";
import { pageMetadata } from "@/lib/seo";
import { productHref } from "@/lib/site-urls";
import "./thanks.css";

// Dodo Payments returns buyers here after checkout and appends the
// subscription status and the buyer's email to the address. This page is
// static and never reads its query string; it is not indexed or listed.
export const metadata: Metadata = pageMetadata({
  title: "Thank you — YouScroll",
  description: "Thank you for supporting YouScroll. Return to the extension to check your plan and keep the good times going.",
  url: productHref("youscroll", "thanks"),
  image: "youscroll",
  index: false,
});

export default function ThanksPage() {
  return (
    <main id="main-content" className="ys-page ys-thanks" aria-labelledby="thanks-title">
      <div className="ys-thanks-wrap">
        <header className="ys-thanks-header">
          <div className="ys-brand" aria-label="YouScroll">
            <Image src="/products/youscroll/brand-mark.png" alt="" width={42} height={42} unoptimized />
            <span>YouScroll<span className="ys-brand-dot">.</span></span>
          </div>
          <div className="ys-thanks-header-note">
            <span>Made for good company</span>
            <ThemeToggle isHome={false} />
          </div>
        </header>

        <section className="ys-thanks-hero" aria-labelledby="thanks-title">
          <div className="ys-thanks-copy">
            <p className="ys-eyebrow ys-thanks-eyebrow">
              <span aria-hidden="true">✦</span> A little upgrade. A big thank you.
            </p>
            <h1 id="thanks-title">Thanks for<br />bringing<br /><span>the fun.</span></h1>
            <p className="ys-thanks-lede">
              More shared moments. More &ldquo;one more episode.&rdquo;<br className="ys-thanks-desktop-break" />
              {" "}Thank you for supporting YouScroll and the good times we&apos;re building together.
            </p>
            <div className="ys-thanks-signoff">
              <span className="ys-thanks-heart" aria-hidden="true">♡</span>
              <p>A little more together.<br /><strong>That&apos;s the whole idea.</strong></p>
            </div>
          </div>

          <div className="ys-thanks-art" aria-hidden="true">
            <div className="ys-thanks-orbit ys-thanks-orbit-one" />
            <div className="ys-thanks-orbit ys-thanks-orbit-two" />
            <span className="ys-thanks-spark ys-thanks-spark-one">✦</span>
            <span className="ys-thanks-spark ys-thanks-spark-two">✧</span>
            <span className="ys-thanks-confetti ys-thanks-confetti-one" />
            <span className="ys-thanks-confetti ys-thanks-confetti-two" />
            <span className="ys-thanks-confetti ys-thanks-confetti-three" />
            <span className="ys-thanks-art-note">Better with you in it.</span>
            <Image
              className="ys-thanks-pals"
              src="/products/youscroll/play-pals-1000.webp"
              alt=""
              width={1000}
              height={636}
              sizes="(max-width: 767px) 92vw, 50vw"
              preload
              unoptimized
            />
            <div className="ys-thanks-ticket">
              <span className="ys-thanks-ticket-icon">
                <svg viewBox="0 0 24 24" fill="none"><path d="m9 6 9 6-9 6V6Z" fill="currentColor" /></svg>
              </span>
              <div><span className="ys-eyebrow">The good-times club</span><strong>You bring the company.</strong><p>We&apos;ll bring the Play Pals.</p></div>
              <span className="ys-thanks-ticket-star">✦</span>
            </div>
          </div>
        </section>

        <section className="ys-thanks-next" aria-labelledby="thanks-next-title">
          <span className="ys-thanks-next-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="16" rx="3" />
              <path d="M3 9h18M7 6.5h.01M10 6.5h.01m0 7 2 2 4-4" />
            </svg>
          </span>
          <div className="ys-thanks-next-heading"><p className="ys-eyebrow">Your next scene</p><h2 id="thanks-next-title">Back to YouScroll.</h2></div>
          <p className="ys-thanks-next-copy">Open <strong>Account</strong> in the extension to check your plan. Your upgrade will appear once payment is confirmed. This can take a moment.</p>
        </section>

        <footer className="ys-thanks-footer">
          <p>You can close this tab whenever you&apos;re ready.</p>
          <span>Happy watching <span aria-hidden="true">✦</span></span>
        </footer>
      </div>
    </main>
  );
}
