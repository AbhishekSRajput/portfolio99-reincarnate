import type { Metadata } from "next";
import Link from "next/link";

// Published policy supplied by the author. Preserve its material terms.
// Source: yourscroll-publicdocs/PRIVACY.md
export const metadata: Metadata = {
  title: "YouScroll privacy policy",
  description: "YouScroll privacy policy for version 0.4.0: settings storage, YouTube page access, Picture-in-Picture, and data-use disclosures.",
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="inner-page section-wrap prose product-policy">
      <Link href="/products/youscroll" className="breadcrumb">
        ← YouScroll
      </Link>
      <p className="eyebrow">YOUSCROLL / PRIVACY</p>
      <h1 className="page-heading">
        YouScroll
        <br />
        <span className="serif-accent">Privacy policy.</span>
      </h1>
        <p><strong>Last updated:</strong> 31 July 2026 · <strong>Applies to:</strong> YouScroll 0.4.0</p>
      <div className="faq-list policy-toc">
        <details>
          <summary>On this page</summary>
          <nav aria-label="Privacy policy sections">
            <ul>
              <li><a href="#summary">Summary</a></li>
              <li><a href="#chrome-web-store-data-use-disclosure">Chrome Web Store data-use disclosure</a></li>
              <li><a href="#what-youscroll-stores">What YouScroll stores</a></li>
              <li><a href="#what-youscroll-does-not-do">What YouScroll does not do</a></li>
              <li><a href="#page-content">Page content</a></li>
              <li><a href="#the-pop-out-player">The pop-out player</a></li>
              <li><a href="#permissions-and-why-they-exist">Permissions and why they exist</a></li>
              <li><a href="#what-youtube-sees">What YouTube sees</a></li>
              <li><a href="#local-visibility">Local visibility</a></li>
              <li><a href="#children">Children</a></li>
              <li><a href="#changes">Changes</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </details>
      </div>
      <section aria-labelledby="summary">
        <h2 id="summary">Summary</h2>
        <p>YouScroll rearranges the YouTube page you are already looking at. It has no account, makes no network requests of its own, and does not collect user data.</p>
        <p>There is no server. There is nowhere for your data to go.</p>
      </section>
      <section aria-labelledby="chrome-web-store-data-use-disclosure">
        <h2 id="chrome-web-store-data-use-disclosure">Chrome Web Store data-use disclosure</h2>
        <p>YouScroll declares no collected user-data categories in the Chrome Web Store Privacy practices form.</p>
        <ul>
          <li><strong>Website content is not collected.</strong> YouScroll locates and moves YouTube&#x27;s existing comments and recommendations containers without reading, copying, storing, logging, or transmitting their contents.</li>
          <li><strong>User activity is not collected.</strong> Click, keyboard, and scroll events are handled only as they occur so the visible controls and independent scrolling work. Those interactions are not recorded, measured, profiled, or transmitted.</li>
          <li><strong>Settings are not collected by the developer.</strong> The two preferences described below are stored through Chrome&#x27;s own storage API. The developer has no server and receives no copy of them.</li>
        </ul>
      </section>
      <section aria-labelledby="what-youscroll-stores">
        <h2 id="what-youscroll-stores">What YouScroll stores</h2>
        <p>One settings object in <code>chrome.storage.sync</code>:</p>
        <ul>
          <li>which features are switched on;</li>
          <li>which tab the right-hand column opens on.</li>
        </ul>
        <p>That is the complete list. If you are signed into Chrome, that object syncs between your own browsers through Google&#x27;s sync service, as any extension setting does. It contains no identifiers and nothing about what you watch.</p>
      </section>
      <section aria-labelledby="what-youscroll-does-not-do">
        <h2 id="what-youscroll-does-not-do">What YouScroll does not do</h2>
        <ul>
          <li>No accounts, sign-in, or user identifiers.</li>
          <li>No analytics, telemetry, crash reporting, or usage measurement.</li>
          <li>No click, keyboard, pointer, or scroll logging.</li>
          <li>No advertising, ad SDKs, or tracking of any kind.</li>
          <li>No network requests. YouScroll contacts no server, including any operated by its developer. It contains no remote code.</li>
          <li>No selling, sharing, or transferring of data to anyone, because there is no data to transfer.</li>
        </ul>
      </section>
      <section aria-labelledby="page-content">
        <h2 id="page-content">Page content</h2>
        <p>YouScroll moves elements YouTube has already rendered — the comments list and the recommendations list — from one part of the page to another. It reads their position in the document in order to move them and to put them back.</p>
        <p>It does not read, copy, store, transmit, or log the content of those elements, and there is no exception to that. No comment text, comment count, video title, channel name, search query, or watch history is read by this extension, let alone recorded anywhere. The tab labels it adds say &quot;Comments&quot; and &quot;Up Next&quot; and are fixed strings, not anything taken off the page.</p>
      </section>
      <section aria-labelledby="the-pop-out-player">
        <h2 id="the-pop-out-player">The pop-out player</h2>
        <p>The pop-out button hands the video you are already watching to your browser&#x27;s built-in Picture-in-Picture window. The video never leaves the browser, no extra permission is involved, and nothing about it is recorded or sent anywhere. YouScroll only asks the browser to open and close that window; the window itself is Chrome&#x27;s, not this extension&#x27;s.</p>
      </section>
      <section aria-labelledby="permissions-and-why-they-exist">
        <h2 id="permissions-and-why-they-exist">Permissions and why they exist</h2>
        <ul className="policy-data-list">
          <li><strong><code>storage</code>:</strong> Saves the settings object described above.</li>
          <li><strong><code>https://www.youtube.com/*</code>:</strong> Lets the content script run on YouTube watch pages. This is the only site YouScroll can access.</li>
        </ul>
        <p>YouScroll requests no <code>tabs</code>, <code>scripting</code>, <code>webRequest</code>, <code>history</code>, <code>cookies</code>, or <code>&lt;all_urls&gt;</code> permission, and no optional permissions. The build fails if any host pattern in the manifest escapes <code>www.youtube.com</code>, so the scope cannot widen by accident.</p>
      </section>
      <section aria-labelledby="what-youtube-sees">
        <h2 id="what-youtube-sees">What YouTube sees</h2>
        <p>YouScroll changes nothing about your relationship with YouTube. YouTube continues to load, render, and log your activity exactly as it would without the extension — including loading further pages of comments as you scroll, which is YouTube&#x27;s own code doing its own thing. Google&#x27;s handling of that activity is covered by <a href="https://policies.google.com/privacy">Google&#x27;s privacy policy</a>, not this one.</p>
      </section>
      <section aria-labelledby="local-visibility">
        <h2 id="local-visibility">Local visibility</h2>
        <p>The elements YouScroll moves stay in the ordinary page DOM, which means other scripts running on that page can see them — exactly as they could before. YouScroll adds no isolation and removes none.</p>
      </section>
      <section aria-labelledby="children">
        <h2 id="children">Children</h2>
        <p>YouScroll is a layout utility with no content of its own, no account, and no data collection. It is not directed at children and collects nothing from anyone regardless of age.</p>
      </section>
      <section aria-labelledby="changes">
        <h2 id="changes">Changes</h2>
        <p>Material changes to this policy will be published with a new version of the extension and a new date at the top of this file. Any change that widened data handling would require a manifest permission change, which is visible to you at install or update time.</p>
      </section>
      <section aria-labelledby="contact">
        <h2 id="contact">Contact</h2>
        <p>Open an issue on the <a href="https://github.com/AbhishekSRajput/public-youscroll/issues">project&#x27;s repository</a>.</p>
      </section>
      <p className="policy-footer">
        <Link href="/products/youscroll">Explore YouScroll →</Link>
      </p>
    </main>
  );
}
