import type { Metadata } from "next";
import { productGuides } from "@/lib/content";
import { productMetadata } from "@/lib/seo";
import { DocIntro, DocSection, ProductBar, Toc } from "@/components/product-ui";

// Published policy supplied by the author. Preserve its material terms.
// Source: the YouScroll repository's docs/public-docs/PRIVACY.md (24 October 2026).
export const metadata: Metadata = productMetadata(
  "youscroll",
  "privacy",
  "YouScroll privacy policy",
  "YouScroll privacy policy: local settings and saved GIFs, on-device face effects, and, for watch parties, accounts, parties, paid plans and Dodo Payments.",
);

const sections = [
  { id: "which-build-you-are-using", label: "Which build you are using" },
  { id: "local-settings-and-files", label: "Local settings and files" },
  { id: "live-social-accounts", label: "Live Social accounts" },
  { id: "parties-presence-and-invitations", label: "Parties, presence and invitations" },
  { id: "page-content-and-local-visibility", label: "Page content and local visibility" },
  { id: "shared-party-effects", label: "Shared party effects" },
  { id: "video-playground-and-face-stickers", label: "Video playground and face stickers" },
  { id: "the-pop-out-player", label: "The pop-out player" },
  { id: "permissions-and-network-destinations", label: "Permissions and network destinations" },
  { id: "what-youtube-sees", label: "What YouTube sees" },
  { id: "distribution-and-changes", label: "Distribution and changes" },
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
              <dd>24 October 2026</dd>
            </div>
            <div>
              <dt>Applies to</dt>
              <dd>Local preview and configured Live Social builds</dd>
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
            <DocSection id="which-build-you-are-using" index={n("which-build-you-are-using")} title={title("which-build-you-are-using")} className="pp-summary">
              <p>The default build rearranges YouTube and provides local video effects and a Social interface preview. It has no accounts, background service worker or Google identity permission, and makes no Social network requests. Preview parties, friends and chat are temporary demo state, clearly labelled Preview.</p>
              <p>A separately configured <strong>Live Social</strong> build adds opt-in Google sign-in, friends, presence and watch parties. Its badge reads Live. It contacts the configured YouScroll backend only after you grant its optional host permission through <strong>Enable Social</strong> in the extension popup. The Google sign-in screen is opened only when you choose to sign in. Building these features does not deploy or operate a public backend automatically.</p>
            </DocSection>

            <DocSection id="local-settings-and-files" index={n("local-settings-and-files")} title={title("local-settings-and-files")}>
              <p><code>chrome.storage.sync</code> holds enabled features, the preferred right-column tab and a display-name preference used by the watch-party interface. Browser sync may copy these settings between your own browsers. These settings contain no watch history or credentials, and the developer receives no copy of them. Only the on/off setting of the Social preview is persisted; its demo profile, friends, chat and party state reset when the module remounts.</p>
              <p>GIFs you import are saved separately in the extension’s <code>chrome.storage.local</code> area when the local library has room, so you can reuse them from the Saved GIFs shelf after reloading. The library stores losslessly optimized GIF bytes, or the original bytes when no smaller file is produced, along with byte length, a format version and a content hash used to avoid duplicates. It does not store filenames, video identifiers, screen positions or watch history. GIFs stay on this browser profile, do not sync to other devices and are never uploaded. Delete a saved GIF from the shelf to remove its stored file; uninstalling the extension also removes its local storage. The library checks a limit of twelve files and 6 MiB of encoded GIF data, within Chrome’s local storage quota. A valid GIF that exceeds this library limit or cannot be saved still plays on the current video; the widget reports that it is available for that video only.</p>
              <p>On-screen artwork, decoded GIF frames, imported face images and selected stickers remain transient tab memory, separate from the saved GIF library. No drawing, captured video frame or face geometry is written to Chrome storage. The current video’s id is used temporarily to avoid carrying artwork onto another video; no watch history is kept. Artwork survives same-video player-mode changes and is discarded by Clear all, navigation, disabling the feature or closing the tab. Those actions keep the Saved GIFs shelf intact; deleting a saved file does not remove copies already placed on a video.</p>
            </DocSection>

            <DocSection id="live-social-accounts" index={n("live-social-accounts")} title={title("live-social-accounts")}>
              <p>Google sign-in requests the <code>openid</code> scope to confirm the selected account. It does not request email, contacts, YouTube history or access to Google APIs. The extension service worker receives a Google ID token and sends it to the configured backend for signature, issuer, audience, expiry and nonce checks. The backend stores a keyed HMAC of the Google subject identifier, not the raw Google identifier or email address. YouScroll does not receive your password. The Google ID token is not stored as your YouScroll session credential.</p>
              <p>The backend database stores your YouScroll user ID, public ID, chosen display name, permanent party code, visibility setting and account timestamps. It also stores friendships, pending friend requests, blocks, report category and reporter/reported IDs, and hashed refresh-session records with expiry and revocation information. Reports contain the selected category, not a video, chat transcript, screenshot or free-text evidence. No video ID, watch history, chat body, video frame or face geometry is written to that database.</p>
              <p>Hosting a party needs a free trial or paid time; joining one never does. For this the database stores two dates on your account: when your free trial started, which is the first time you hosted, and until when your plan is paid. It records nothing else about when or what you host. Only you can see your plan; someone using your party code is not told whether it has lapsed.</p>
              <p>Paid plans are sold by Dodo Payments as merchant of record. <strong>Upgrade</strong> and <strong>Manage billing</strong> open Dodo’s own checkout or customer portal in a new tab. You give your card details, email and billing address to Dodo there, under Dodo’s privacy policy; YouScroll never receives your card details. The backend tells Dodo your YouScroll account ID so a payment reaches the right account, and stores the customer and subscription IDs Dodo returns. Dodo’s notifications about your subscription are used to update your paid-until date and are not stored. After checkout Dodo returns you to the YouScroll website with your subscription status in the address.</p>
              <p>The plan dates and the Dodo IDs are deleted with your account. Deleting an account first cancels any subscription Dodo could still charge.</p>
              <p>Raw YouScroll access and refresh credentials remain in extension-owned <code>chrome.storage.session</code>, restricted to <code>TRUSTED_CONTEXTS</code>. Content scripts receive public account data and short-lived party tickets, never raw session credentials. Credentials are not placed in page storage, URLs, synced storage or ordinary local storage. Closing the browser clears this browser-session storage; it does not delete your server account. Server session hashes remain until revoked or expired and removed by scheduled cleanup.</p>
              <p>API requests and native presence/party sockets run in the extension service worker after the backend permission is granted. Content scripts exchange bounded party frames over extension runtime ports; they cannot choose an arbitrary network destination through that bridge.</p>
            </DocSection>

            <DocSection id="parties-presence-and-invitations" index={n("parties-presence-and-invitations")} title={title("parties-presence-and-invitations")}>
              <p>When you start or join a live party, the backend and other members receive the actual YouTube video ID, playback position, play/pause/seek actions, playback rate, ad/buffering state, display name and chat you send. A party may follow its controller to another video. This is not an anonymous or end-to-end encrypted relay: the server needs the current video and playback state to coordinate the party. YouTube continues to deliver the video and audio.</p>
              <p>Party state and presence are transient runtime data. Durable Object socket attachments retain the limited state needed across hibernation while sockets exist. Chat is broadcast without a stored server transcript; the current interface keeps a bounded in-memory chat timeline. The application does not write party playback, chat or presence history to D1 or application logs.</p>
              <p>One service-worker presence connection serves signed-in YouTube tabs in the browser. Friends can see the presence and party information permitted by your visibility setting. <strong>Hide activity</strong> limits activity disclosure; <strong>Appear offline</strong> hides your online presence from friends. No solo video title or solo watch history is sent by this client under any visibility setting. People sharing your party can still see you and the shared playback state. Quiet invitations appear as ordinary list items without a popup or automatic join, and expire. Invitation links and codes let their recipients request access; share them only with people you want to invite.</p>
              <p>You can leave a party, sign out, remove friends, block or unblock people, change visibility, and reset your permanent party code. Resetting the code invalidates the old link. Signing out clears local credentials and requests server-session revocation. <strong>Delete account</strong>, available only in the extension popup, asks for confirmation and removes the account and associated social records from the application’s active database; it also ends the account’s hosted party and revokes access. Uninstalling the extension or closing the browser does not delete the server account. Google sign-in and Cloudflare infrastructure have their own data handling practices, separate from the application’s records described here.</p>
            </DocSection>

            <DocSection id="page-content-and-local-visibility" index={n("page-content-and-local-visibility")} title={title("page-content-and-local-visibility")}>
              <p>YouScroll moves the comments and recommendations containers YouTube already rendered. It does not collect their comment text, titles, channel names or search queries. Live parties use the current video’s ID and playback state only as described above; face effects sample pixels locally as described below.</p>
              <p>The Social panel, including displayed friend names, IDs, party codes and chat, is part of the ordinary YouTube page DOM. Other scripts with access to that page can inspect visible interface content. Credential isolation protects the service worker’s session tokens; it does not make the panel’s content private from the host page. Do not put sensitive information in party chat.</p>
            </DocSection>

            <DocSection id="shared-party-effects" index={n("shared-party-effects")} title={title("shared-party-effects")}>
              <p>In a connected live party, reactions, packaged GIFs, throws and drawing segments are shared as built-in item IDs, normalized coordinates, color, size and bounded timing values. Throws include a random animation seed. The relay adds the sender and expiry, and broadcasts the effect to current party members. It does not receive GIF files, image URLs, filenames, video pixels or face data.</p>
              <p>Effects expire within ten seconds and have no server history or replay for later joiners. Clients display only validated server echoes, with limits on drawing frequency, visible marks and active GIFs. Seeking, changing video, disconnecting or leaving clears the shared overlay; effects do not render over ads or a different video. Custom GIFs, saved imports, erasing and Undo are unavailable during group watching. Custom files remain on this device.</p>
            </DocSection>

            <DocSection id="video-playground-and-face-stickers" index={n("video-playground-and-face-stickers")} title={title("video-playground-and-face-stickers")}>
              <p>Outside group watching, doodles and splats are drawn on extension-owned canvases over the video. The extension keeps their coordinates and appearance in tab memory so they can be redrawn after resizing and removed with Undo or Clear all. The video element is not replaced, downloaded or recorded.</p>
              <p>In solo use, the GIF tab offers ten GIFs packaged with the extension; adding one places it on the current video without saving it to the library or contacting any service. The tab also imports files you choose from your device and optimizes their encoding locally without changing pixels, dimensions, animation frames, delays or transparency. Optimization keeps the original when it does not produce a smaller lossless file. Playback decodes frames on demand at their original dimensions, using a bounded cache rather than retaining the entire decoded animation. Files may contain more than 160 frames or 30 seconds of animation; the input limits are 64 MiB per file and 8 Mi pixels per frame. The Faces tab accepts local PNG, JPEG and WebP images, decoded to a bounded bitmap for a custom sticker. No external image service is contacted, and filenames and images are not logged or uploaded. GIF files that can be saved are kept in the local library described above. Their decoded playback frames and imported face images remain in transient tab memory through same-video layout changes and are released by Clear all, navigation or disabling the feature. Undo releases the on-screen GIF it removes, leaving the saved source file intact.</p>
              <p>Choosing a face sticker starts local detection using bundled MediaPipe face landmarks, with a bundled pico detector as a fallback. Models, JavaScript and WebAssembly ship inside the extension; nothing is downloaded at runtime. A detached canvas samples at most 10 times per second, with a maximum side of 480 pixels. A private message channel transfers temporary pixels to a worker hosted in an extension-owned frame. Sampled and transferred JavaScript pixel buffers are cleared after processing; the detector’s internal working memory is released when its worker is terminated. Between samples, normalized rectangles, rotation, landmark positions and short-lived continuity ids support stable sticker placement. These ids do not identify a person, and no face recognition, biometric template or identity matching is performed.</p>
              <p>Laser eyes and the pirate patch use temporary eye landmarks. The power-up places a golden aura around an estimated torso below the detected face; it does not scan or segment the person’s body. Its red eye glow and aura are drawn locally. Face effects and their geometry are not saved with the GIF library.</p>
              <p>Tracking pauses when the tab is hidden or the video is paused, and face positions reset when seeking or changing the source. Removing face stickers, clearing artwork or unmounting the feature stops tracking and releases its buffers. There is no camera or microphone access, image upload, persistent frame storage or transmission of face geometry. If a video forbids pixel reads, face tracking stops with an unavailable message; the extension does not bypass that restriction. Doodles and throws continue to work.</p>
              <p>Face tracking is disabled while group watching is active, including a local party preview. Leaving the party restores solo face controls. Voice calls are not implemented, and YouScroll requests no microphone or camera access.</p>
            </DocSection>

            <DocSection id="the-pop-out-player" index={n("the-pop-out-player")} title={title("the-pop-out-player")}>
              <p>The pop-out button hands the video you are already watching to your browser’s built-in Picture-in-Picture window. The video never leaves the browser, no extra permission is involved, and nothing about it is recorded or sent anywhere. YouScroll only asks the browser to open and close that window; the window itself is Chrome’s, not this extension’s.</p>
            </DocSection>

            <DocSection id="permissions-and-network-destinations" index={n("permissions-and-network-destinations")} title={title("permissions-and-network-destinations")}>
              <dl className="pp-defs">
                <div>
                  <dt><code>storage</code></dt>
                  <dd>Local settings, saved GIFs and, in live builds, protected browser-session credentials.</dd>
                </div>
                <div>
                  <dt><code>https://www.youtube.com/*</code></dt>
                  <dd>Runs the content script on YouTube pages.</dd>
                </div>
                <div>
                  <dt>One optional configured backend origin</dt>
                  <dd>Live Social API requests, presence and party WebSockets after you grant access. The default preview does not use it.</dd>
                </div>
                <div>
                  <dt><code>identity</code>, live builds only</dt>
                  <dd>Opens Google’s account-selection and sign-in flow through the browser identity API.</dd>
                </div>
                <div>
                  <dt><code>https://*.dodopayments.com</code> pages</dt>
                  <dd>Opened in a new tab only when you choose Upgrade or Manage billing. The extension sends no request to Dodo itself.</dd>
                </div>
              </dl>
              <p>The live backend origin is configured at build time. HTTP is permitted only for local development loopback addresses; deployed origins use HTTPS. Google sign-in runs in a browser-managed authentication window, not as remote code injected into the extension. The extension does not ask for <code>tabs</code>, <code>scripting</code>, <code>webRequest</code>, <code>history</code>, <code>cookies</code> or <code>{"<all_urls>"}</code> permission. You can withdraw the optional backend grant through the browser’s extension settings; this stops Social access and clears the local session.</p>
              <p>The application has no advertising SDKs, analytics, click logs or remote executable code. Application logs use operational codes and counts, not chat, video titles, account tokens or invitation URLs. Cloudflare and network providers necessarily process request metadata such as IP addresses; IPs are used for rate limiting but are not stored in the application database. Provider-level retention and operational configuration are separate from application storage. The service uses social information to provide the features described here, not to sell it or target advertising.</p>
            </DocSection>

            <DocSection id="what-youtube-sees" index={n("what-youtube-sees")} title={title("what-youtube-sees")}>
              <p>YouTube continues to load, render and process activity as it would without YouScroll, including loading more comments. Google’s handling of YouTube and sign-in activity is covered by <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google’s privacy policy</a>.</p>
            </DocSection>

            <DocSection id="distribution-and-changes" index={n("distribution-and-changes")} title={title("distribution-and-changes")}>
              <p>Store disclosures must match the actual build being distributed. The local preview and a live build have different permissions and data flows; a live build must not reuse a no-account/no-collection store declaration. This policy will be updated when the shipped behavior or its data handling changes.</p>
            </DocSection>

            <DocSection id="contact" index={n("contact")} title={title("contact")} className="pp-contact">
              <p>Open an issue on the project’s repository for privacy questions. Do not post credentials, invitation links or private chat in a public issue.</p>
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
