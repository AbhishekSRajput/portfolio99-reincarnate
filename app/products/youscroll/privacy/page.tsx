import type { Metadata } from "next";
import { productGuides } from "@/lib/content";
import { DocIntro, DocSection, ProductBar, Toc } from "@/components/product-ui";

// Published policy supplied by the author. Preserve its material terms.
// Source: yourscroll-publicdocs/PRIVACY.md
export const metadata: Metadata = {
  title: "YouScroll privacy policy",
  description:
    "YouScroll privacy policy for version 0.4.0: settings storage, YouTube page access, Picture-in-Picture, and data-use disclosures.",
};

const sections = [
  { id: "summary", label: "Summary" },
  { id: "chrome-web-store-data-use-disclosure", label: "Chrome Web Store data-use disclosure" },
  { id: "what-youscroll-stores", label: "What YouScroll stores" },
  { id: "what-youscroll-does-not-do", label: "What YouScroll does not do" },
  { id: "page-content", label: "Page content" },
  { id: "the-pop-out-player", label: "The pop-out player" },
  { id: "permissions-and-why-they-exist", label: "Permissions and why they exist" },
  { id: "what-youtube-sees", label: "What YouTube sees" },
  { id: "local-visibility", label: "Local visibility" },
  { id: "children", label: "Children" },
  { id: "changes", label: "Changes" },
  { id: "contact", label: "Contact" },
] as const;
type SectionId = (typeof sections)[number]["id"];
const n = (id: SectionId) => sections.findIndex((section) => section.id === id) + 1;
const title = (id: SectionId) => sections.find((section) => section.id === id)!.label;
const issuesUrl = productGuides.youscroll.support.repo.issuesUrl;

export default function PrivacyPage() {
  return (
    <>
      <ProductBar slug="youscroll" current="privacy" />
      <main id="main-content" className="pp pp-youscroll">
        <DocIntro
          slug="youscroll"
          id="policy-title"
          eyebrow="Privacy policy"
          title={[["Privacy"], [{ text: "policy.", serif: true, accent: true }]]}
        >
          <dl className="pp-meta">
            <div>
              <dt>Last updated</dt>
              <dd>31 July 2026</dd>
            </div>
            <div>
              <dt>Applies to</dt>
              <dd>YouScroll 0.4.0</dd>
            </div>
            <div>
              <dt>Contact</dt>
              <dd>
                <a className="pp-inline-link" href={issuesUrl} target="_blank" rel="noreferrer">
                  Project issues on GitHub
                </a>
              </dd>
            </div>
          </dl>
        </DocIntro>

        <div className="section-wrap pp-reading">
          <Toc label="On this page" items={sections} />
          <article className="pp-prose" aria-labelledby="policy-title">
            <DocSection id="summary" index={n("summary")} title={title("summary")} className="pp-summary">
              <p>YouScroll rearranges the YouTube page you are already looking at. It has no account, makes no network requests of its own, and does not collect user data.</p>
              <p>There is no server. There is nowhere for your data to go.</p>
            </DocSection>

            <DocSection id="chrome-web-store-data-use-disclosure" index={n("chrome-web-store-data-use-disclosure")} title={title("chrome-web-store-data-use-disclosure")}>
              <p>YouScroll declares no collected user-data categories in the Chrome Web Store Privacy practices form.</p>
              <ul>
                <li><strong>Website content is not collected.</strong> YouScroll locates and moves YouTube’s existing comments and recommendations containers without reading, copying, storing, logging, or transmitting their contents.</li>
                <li><strong>User activity is not collected.</strong> Click, keyboard, and scroll events are handled only as they occur so the visible controls and independent scrolling work. Those interactions are not recorded, measured, profiled, or transmitted.</li>
                <li><strong>Settings are not collected by the developer.</strong> The two preferences described below are stored through Chrome’s own storage API. The developer has no server and receives no copy of them.</li>
              </ul>
            </DocSection>

            <DocSection id="what-youscroll-stores" index={n("what-youscroll-stores")} title={title("what-youscroll-stores")}>
              <p>One settings object in <code>chrome.storage.sync</code>:</p>
              <ul>
                <li>which features are switched on;</li>
                <li>which tab the right-hand column opens on.</li>
              </ul>
              <p>That is the complete list. If you are signed into Chrome, that object syncs between your own browsers through Google’s sync service, as any extension setting does. It contains no identifiers and nothing about what you watch.</p>
            </DocSection>

            <DocSection id="what-youscroll-does-not-do" index={n("what-youscroll-does-not-do")} title={title("what-youscroll-does-not-do")}>
              <ul>
                <li>No accounts, sign-in, or user identifiers.</li>
                <li>No analytics, telemetry, crash reporting, or usage measurement.</li>
                <li>No click, keyboard, pointer, or scroll logging.</li>
                <li>No advertising, ad SDKs, or tracking of any kind.</li>
                <li>No network requests. YouScroll contacts no server, including any operated by its developer. It contains no remote code.</li>
                <li>No selling, sharing, or transferring of data to anyone, because there is no data to transfer.</li>
              </ul>
            </DocSection>

            <DocSection id="page-content" index={n("page-content")} title={title("page-content")}>
              <p>YouScroll moves elements YouTube has already rendered — the comments list and the recommendations list — from one part of the page to another. It reads their position in the document in order to move them and to put them back.</p>
              <p>It does not read, copy, store, transmit, or log the content of those elements, and there is no exception to that. No comment text, comment count, video title, channel name, search query, or watch history is read by this extension, let alone recorded anywhere. The tab labels it adds say “Comments” and “Up Next” and are fixed strings, not anything taken off the page.</p>
            </DocSection>

            <DocSection id="the-pop-out-player" index={n("the-pop-out-player")} title={title("the-pop-out-player")}>
              <p>The pop-out button hands the video you are already watching to your browser’s built-in Picture-in-Picture window. The video never leaves the browser, no extra permission is involved, and nothing about it is recorded or sent anywhere. YouScroll only asks the browser to open and close that window; the window itself is Chrome’s, not this extension’s.</p>
            </DocSection>

            <DocSection id="permissions-and-why-they-exist" index={n("permissions-and-why-they-exist")} title={title("permissions-and-why-they-exist")}>
              <dl className="pp-defs">
                <div>
                  <dt><code>storage</code></dt>
                  <dd>Saves the settings object described above.</dd>
                </div>
                <div>
                  <dt><code>https://www.youtube.com/*</code></dt>
                  <dd>Lets the content script run on YouTube watch pages. This is the only site YouScroll can access.</dd>
                </div>
              </dl>
              <p>YouScroll requests no <code>tabs</code>, <code>scripting</code>, <code>webRequest</code>, <code>history</code>, <code>cookies</code>, or <code>{"<all_urls>"}</code> permission, and no optional permissions. The build fails if any host pattern in the manifest escapes <code>www.youtube.com</code>, so the scope cannot widen by accident.</p>
            </DocSection>

            <DocSection id="what-youtube-sees" index={n("what-youtube-sees")} title={title("what-youtube-sees")}>
              <p>YouScroll changes nothing about your relationship with YouTube. YouTube continues to load, render, and log your activity exactly as it would without the extension — including loading further pages of comments as you scroll, which is YouTube’s own code doing its own thing. Google’s handling of that activity is covered by <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google’s privacy policy</a>, not this one.</p>
            </DocSection>

            <DocSection id="local-visibility" index={n("local-visibility")} title={title("local-visibility")}>
              <p>The elements YouScroll moves stay in the ordinary page DOM, which means other scripts running on that page can see them — exactly as they could before. YouScroll adds no isolation and removes none.</p>
            </DocSection>

            <DocSection id="children" index={n("children")} title={title("children")}>
              <p>YouScroll is a layout utility with no content of its own, no account, and no data collection. It is not directed at children and collects nothing from anyone regardless of age.</p>
            </DocSection>

            <DocSection id="changes" index={n("changes")} title={title("changes")}>
              <p>Material changes to this policy will be published with a new version of the extension and a new date at the top of this file. Any change that widened data handling would require a manifest permission change, which is visible to you at install or update time.</p>
            </DocSection>

            <DocSection id="contact" index={n("contact")} title={title("contact")} className="pp-contact">
              <p>Open an issue on the project’s repository.</p>
              <p className="pp-contact-email">
                <a href={issuesUrl} target="_blank" rel="noreferrer">
                  {issuesUrl.replace("https://", "")}
                </a>
              </p>
            </DocSection>
          </article>
        </div>
      </main>
    </>
  );
}
