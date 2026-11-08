import type { Metadata } from "next";
import { productEmail, productGuides } from "@/lib/content";
import { productMetadata } from "@/lib/seo";
import { DocIntro, DocSection, ProductBar, Toc } from "@/components/product-ui";

// Published policy supplied by the author. Preserve its material terms.
// Source: the YouScroll repository's docs/public-docs/PRIVACY.md (5 November 2026).
export const metadata: Metadata = productMetadata(
  "youscroll",
  "privacy",
  "YouScroll privacy policy",
  "YouScroll privacy policy: local tools, preview state and configured Live Social accounts, parties, streaming, voice and billing.",
);

const sections = [
  { id: "which-build-you-are-using", label: "Which build you are using" },
  { id: "local-settings-and-files", label: "Local settings and files" },
  { id: "live-social-accounts", label: "Live Social accounts" },
  { id: "parties-presence-and-invitations", label: "Parties, presence and invitations" },
  { id: "streaming-sites", label: "Streaming sites" },
  { id: "voice-calls", label: "Voice calls" },
  { id: "page-content-and-local-visibility", label: "Page content and local visibility" },
  { id: "public-rooms", label: "Public Rooms" },
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
              <dd>5 November 2026</dd>
            </div>
            <div>
              <dt>Applies to</dt>
              <dd>Local preview and configured Live Social builds</dd>
            </div>
            <div>
              <dt>Contact</dt>
              <dd>
                <a className="pp-inline-link" href={`mailto:${productEmail.youscroll}`}>
                  {productEmail.youscroll}
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
              <p>A separately configured <strong>Live Social</strong> build adds opt-in Google sign-in, friends, presence and watch parties with voice calls. Besides YouTube, it runs on Netflix, Prime Video, JioHotstar and Crunchyroll. Social is on by default in that build. When you are signed in, enabled tabs can refresh your account, friends and plan and connect to presence even before you open a panel or join a party. Viewing Rooms requests public listings. The Google sign-in screen is opened only when you choose to sign in. Building these features does not deploy or operate a public backend automatically.</p>
            </DocSection>

            <DocSection id="local-settings-and-files" index={n("local-settings-and-files")} title={title("local-settings-and-files")}>
              <p><code>chrome.storage.sync</code> holds enabled features, the preferred right-column tab and a display-name preference used by the watch-party interface. Browser sync may copy these settings between your own browsers. These settings contain no watch history or credentials, and the developer receives no copy of them. The movable Social and Play bar keeps new position changes in memory for the current page visit and starts centered on each fresh page load. Coordinates saved by older versions in <code>chrome.storage.local</code> are no longer read. The Social preview&#x27;s demo profile, friends, chat and party state reset when the module remounts.</p>
              <p>GIFs you import are saved separately in the extension&#x27;s <code>chrome.storage.local</code> area when the local library has room, so you can reuse them from the Saved GIFs shelf after reloading. The library stores losslessly optimized GIF bytes, or the original bytes when no smaller file is produced, along with byte length, a format version and a content hash used to avoid duplicates. It does not store filenames, video identifiers, screen positions or watch history. GIFs stay on this browser profile, do not sync to other devices and are never uploaded. Delete a saved GIF from the shelf to remove its stored file; uninstalling the extension also removes its local storage. The library checks a limit of twelve files and 6 MiB of encoded GIF data, within Chrome&#x27;s local storage quota. A valid GIF that exceeds this library limit or cannot be saved still plays on the current video; the widget reports that it is available for that video only.</p>
              <p>On-screen artwork, decoded GIF frames, imported face images and selected stickers remain transient tab memory, separate from the saved GIF library. No drawing, captured video frame or face geometry is written to Chrome storage. The current video&#x27;s id is used temporarily to avoid carrying artwork onto another video; no watch history is kept. Artwork survives same-video player-mode changes and is discarded by Clear all, navigation, disabling the feature or closing the tab. Those actions keep the Saved GIFs shelf intact; deleting a saved file does not remove copies already placed on a video.</p>
            </DocSection>

            <DocSection id="live-social-accounts" index={n("live-social-accounts")} title={title("live-social-accounts")}>
              <p>Google sign-in requests the <code>openid</code> scope to confirm the selected account. It does not request email, contacts, YouTube history or access to Google APIs. The extension service worker receives a Google ID token and sends it to the configured backend for signature, issuer, audience, expiry and nonce checks. The backend stores a keyed HMAC of the Google subject identifier, not the raw Google identifier or email address. YouScroll does not receive your password. The Google ID token is not stored as your YouScroll session credential.</p>
              <p>The backend database stores your YouScroll user ID, public ID, chosen display name, permanent party code, visibility setting and account timestamps. It also stores friendships, pending friend requests, blocks, report category and reporter/reported IDs, and hashed refresh-session records with expiry and revocation information. Reports contain the selected category, not a video, chat transcript, screenshot or free-text evidence. No video ID, watch history, chat body, video frame or face geometry is written to that database.</p>
              <p>Free accounts can host four people on YouTube or join a Pro-hosted room on any supported service. A Pro owner can host eight people and offer voice. The database stores the dates of an explicitly started trial and paid entitlement. Joining a room or hosting on Free does not start a trial. Participants receive the room service, owner, capacity and available features to display and enforce room settings. The owner&#x27;s trial and billing dates stay private.</p>
              <p>Paid plans are sold by Dodo Payments as merchant of record. <strong>Upgrade</strong> and <strong>Manage billing</strong> open Dodo&#x27;s own checkout or customer portal in a new tab. You give your card details, email and billing address to Dodo there, under Dodo&#x27;s privacy policy; YouScroll never receives your card details. The backend tells Dodo your YouScroll account ID so a payment reaches the right account, and stores provider customer, checkout, subscription and payment identifiers, purchase status, entitlement dates, and retry/cancellation state. Raw provider notifications, email addresses and card details are not retained. Signed notifications trigger reconciliation with Dodo. After checkout Dodo returns you to the YouScroll website with your subscription status in the address.</p>
              <p>Deletion disables account activity and new purchases, then cancels every known chargeable subscription. If provider confirmation is unavailable, deletion remains pending and can be retried. Minimal opaque purchase and cancellation records remain to catch late activations or unresolved checkouts; unresolved records remain until safely resolved. Settled deletion records are removed after 30 days, completed webhook jobs after seven days. No watching or chat information is included in these records. Live checkout remains unavailable until provider safety checks are verified.</p>
              <p>If you started the free Pro trial, one record survives deletion: a keyed one-way hash of your Google account&#x27;s ID and the date the trial began. It names no one and links to nothing else we keep. Its only purpose is to stop the 40-day trial being restarted by deleting the account and signing in again, so signing in again carries on from the original dates. An account that never started a trial leaves no such record.</p>
              <p>Raw YouScroll access and refresh credentials remain in the extension&#x27;s own IndexedDB, which only the extension&#x27;s service worker and pages can open. Content scripts run with YouTube&#x27;s origin, so they cannot reach it; they receive public account data and bounded party messages, never raw session credentials. Credentials are not placed in page storage, URLs, synced storage or <code>chrome.storage.local</code>. They keep you signed in on this browser until you sign out, or until the refresh session lapses after 30 days without use. Closing the browser does not delete your server account. Server session hashes remain until revoked or expired and removed by scheduled cleanup.</p>
              <p>API requests and native presence/party sockets run in the extension service worker after explicit sign-in and while Social is enabled. Content scripts exchange bounded party frames over extension runtime ports; they cannot choose an arbitrary network destination through that bridge.</p>
              <p>The backend also keeps one hash of a random party authorization value on your account. It prevents an old connection from regaining access after you move or leave a party. It contains no room ID, video ID, activity timestamp or history; it is replaced on transfer, cleared when the matching membership is released, and deleted with your account.</p>
            </DocSection>

            <DocSection id="parties-presence-and-invitations" index={n("parties-presence-and-invitations")} title={title("parties-presence-and-invitations")}>
              <p>When you start or join a live party, the backend and other members receive the actual video ID, playback position, play/pause/seek actions, playback rate, ad/buffering state, display name and chat you send. They also receive the party&#x27;s name, if its owner gives it one, and the videos queued in Up next. A party may follow its controller to another video on the same site. A member who leaves the party&#x27;s video for another one stays there until they choose Sync.</p>
              <p>Any member can suggest a video for Up next by pasting a link. The extension reads the video ID from the link, and only that ID is sent; the link itself stays in your browser. A suggestion goes to the host alone, who can play it, queue it or dismiss it. Up next and pending suggestions live only in the room&#x27;s memory: they are not written to D1 or logs and are gone when the party ends. On YouTube pages, Up next shows each YouTube video&#x27;s title, fetched from YouTube oEmbed into the same kind of bounded in-memory cache Rooms uses; that request reveals the queued video ID to YouTube. Titles never reach the YouScroll backend. This is not an anonymous or end-to-end encrypted relay: the server needs the current video and playback state to coordinate the party. The site you are watching continues to deliver the video and audio.</p>
              <p>Party state, room membership and presence are transient runtime data. A lost room generation ends the party rather than silently creating a replacement. Public room visibility comes from the server. External invitation links require an explicit Join action. Internal video-follow navigation uses a one-use, tab/account/destination-bound handoff in protected session storage, valid for 30 seconds. Durable Object socket attachments retain the limited state needed across hibernation while sockets exist. Chat is broadcast without a stored server transcript; the current interface keeps a bounded in-memory chat timeline. The application does not write party playback, chat or presence history to D1 or application logs.</p>
              <p>One service-worker presence connection serves signed-in tabs with Social enabled across the five supported sites. <strong>Online</strong> lets friends see your availability and eligible party information. <strong>Appear offline</strong> hides your availability and prevents direct friend discovery. Your solo viewing stays private under either setting. Party members can see you and the shared playback state. An explicit invitation, known party code or public listing provides its own path to request admission. Quiet invitations appear as ordinary list items without a popup or automatic join, and expire. Invitation links and codes let their recipients request access; share them only with people you want to invite.</p>
              <p>You can leave a party, sign out, remove friends, block or unblock people, change visibility, and reset your permanent party code. Resetting the code invalidates the old link. Signing out clears local credentials and requests server-session revocation. <strong>Delete account</strong>, available only in the extension popup, asks for confirmation and removes the account and associated social records from the application&#x27;s active database when cancellation completes; it also ends the account&#x27;s hosted party and revokes access. A used free trial&#x27;s record stays, as described above. Uninstalling the extension or closing the browser does not delete the server account. Google sign-in and Cloudflare infrastructure have their own data handling practices, separate from the application&#x27;s records described here.</p>
            </DocSection>

            <DocSection id="streaming-sites" index={n("streaming-sites")} title={title("streaming-sites")}>
              <p>Live builds also run on <code>www.netflix.com</code>, <code>www.primevideo.com</code>, <code>www.hotstar.com</code> and <code>www.crunchyroll.com</code>. Social and ✦ Play float over every page, and only Play&#x27;s drawing layer docks inside the active player. The popup lets you disable each site or turn off Social or Play separately. Turning Social off leaves that tab&#x27;s party and call. Solo Play uses local artwork and requires an active Pro trial or paid plan. Free viewers can use enabled Play tools in a Pro owner&#x27;s room. A disabled site has neither widget and makes no Social requests. A small Netflix page script still loads to answer playback commands from the extension.</p>
              <p>The extension reads the page address and active media element to identify a playable title and its playback state. On Prime Video it checks the active player&#x27;s title identifier or matches its displayed episode and running time to the episode list already on the page. The episode name and running time stay on your device. If it cannot identify the title, chat and voice remain available and playback synchronization is suspended. Doodles, packaged GIFs, reactions and throws draw over the player without capturing video pixels. The streaming widgets have no face tracking or custom file imports. The Social account and presence requests described above can occur while browsing. Solo viewing history and local artwork are never sent to YouScroll.</p>
              <p>A party stays on the site it started on. If you are elsewhere, you are told where it is and offered a button; you are never moved to another site without choosing to. Owners can list parties for identified streaming titles in public Rooms. Netflix, Prime Video, JioHotstar and Crunchyroll are not affiliated with YouScroll and have their own privacy policies.</p>
            </DocSection>

            <DocSection id="voice-calls" index={n("voice-calls")} title={title("voice-calls")}>
              <p>Voice is optional in a Pro-hosted room. <strong>Join voice</strong> connects you as a muted listener. <strong>Unmute</strong> requests microphone access when you first need it. You can keep listening and typing if you decline. Leaving the call or party, removal, closing the tab, or the owner switching voice off releases microphone access for the call.</p>
              <p>The call runs in a hidden extension page, away from the video page, so that page cannot reach your microphone. Your audio travels to the other people in the call, and theirs to you, over encrypted WebRTC connections through Cloudflare Realtime. Connecting also contacts Cloudflare&#x27;s STUN server, which sees your IP address as any network service does. YouScroll does not record or transcribe calls, and neither the backend nor the extension stores audio or a record of who spoke. The backend issues a short-lived voice ticket to current party members only.</p>
              <p>Your browser measures speaking activity and softens loud voices locally. Each listener can choose a voice volume and whether the movie lowers while someone speaks. These preferences are stored on the device. To reconnect muted after a page load, the extension remembers the tab and room that opted into voice in <code>chrome.storage.session</code> until you leave, close the tab or close the browser.</p>
            </DocSection>

            <DocSection id="page-content-and-local-visibility" index={n("page-content-and-local-visibility")} title={title("page-content-and-local-visibility")}>
              <p>YouScroll moves the comments and recommendations containers YouTube already rendered. It does not collect their comment text, titles, channel names or search queries. Live parties use the current video&#x27;s ID and playback state only as described above; face effects sample pixels locally as described below.</p>
              <p>The Social panel, including displayed friend names, IDs, party codes and chat, is part of the ordinary YouTube page DOM. Other scripts with access to that page can inspect visible interface content. Credential isolation protects the service worker&#x27;s session tokens; it does not make the panel&#x27;s content private from the host page. The party panel on a streaming site sits inside that site&#x27;s page in the same way. Imported overlay files, canvases and file inputs also belong to this page context and are not private from scripts in that page. Persistent/destructive controls require genuine input; this does not make their displayed content confidential. Do not put sensitive information in party chat.</p>
            </DocSection>

            <DocSection id="public-rooms" index={n("public-rooms")} title={title("public-rooms")}>
              <p>Hosts explicitly choose whether to list a party publicly. Signed-in users can browse its host name, the party&#x27;s name if its owner set one, current video ID, size and coarse proximity tier, and can report a listed room&#x27;s host. Approximate location supplied by the network edge orders rooms. The application does not store an address or location history. The viewer may see their own coarse location. On YouTube pages, visible YouTube room cards can fetch a title from YouTube oEmbed and a thumbnail from YouTube&#x27;s image service. These requests reveal the listed YouTube video ID to those services. Titles stay in a bounded in-memory cache. Streaming room IDs are never sent to YouTube. On Netflix, Prime Video, JioHotstar and Crunchyroll all room cards use service labels and packaged artwork. Rooms lists only the service you are on. That service name goes with the request, and the backend neither stores nor logs it.</p>
            </DocSection>

            <DocSection id="shared-party-effects" index={n("shared-party-effects")} title={title("shared-party-effects")}>
              <p>In a connected live party, reactions, packaged GIFs, throws and drawing segments are shared as built-in item IDs, normalized coordinates, color, size and bounded timing values. Throws include a random animation seed. The relay adds the sender and expiry, and broadcasts the effect to current party members. It does not receive GIF files, image URLs, filenames, video pixels or face data.</p>
              <p>Effects expire within ten seconds and have no server history or replay for later joiners. Clients display only validated server echoes, with limits on drawing frequency, visible marks and active GIFs. Seeking, changing video, disconnecting or leaving clears the shared overlay. Shared effects need a matching party video. Ad detection on streaming sites remains unverified. Custom GIFs, saved imports, erasing and Undo are unavailable during group watching. Custom files remain on this device.</p>
            </DocSection>

            <DocSection id="video-playground-and-face-stickers" index={n("video-playground-and-face-stickers")} title={title("video-playground-and-face-stickers")}>
              <p>Outside group watching, doodles and splats are drawn on extension-owned canvases over the video. The extension keeps their coordinates and appearance in tab memory so they can be redrawn after resizing and removed with Undo or Clear all. The video element is not replaced, downloaded or recorded.</p>
              <p>In solo use, the GIF tab offers ten GIFs packaged with the extension. Adding one places it on the current video without saving it to the library or contacting any service. On YouTube the tab also imports files you choose from your device and optimizes their encoding locally without changing pixels, dimensions, animation frames, delays or transparency. Optimization keeps the original when it does not produce a smaller lossless file. Playback decodes frames on demand at their original dimensions, using a bounded cache rather than retaining the entire decoded animation. Files may contain more than 160 frames or 30 seconds of animation; the limits are 64 MiB per file, 8 Mi pixels per frame, 20,000 frames and bounded parsing work. Parsing and optimization run in a packaged worker with a deadline and cancellation. They do not run on the YouTube page thread. The Faces tab accepts local PNG, JPEG and still WebP images, checked for dimensions up to 4096 × 4096 before native decoding and resized to a bounded bitmap for a custom sticker. No external image service is contacted, and filenames and images are not logged or uploaded. GIF files that can be saved are kept in the local library described above. Their decoded playback frames and imported face images remain in transient tab memory through same-video layout changes and are released by Clear all, navigation or disabling the feature. Undo releases the on-screen GIF it removes, leaving the saved source file intact.</p>
              <p>Choosing a face sticker starts local detection using bundled MediaPipe face landmarks, with a bundled pico detector as a fallback. Models, JavaScript and WebAssembly ship inside the extension; nothing is downloaded at runtime. A detached canvas samples at most 10 times per second, with a maximum side of 480 pixels. A private message channel transfers temporary pixels to a worker hosted in an extension-owned frame. Sampled and transferred JavaScript pixel buffers are cleared after processing; the detector&#x27;s internal working memory is released when its worker is terminated. Between samples, normalized rectangles, rotation, landmark positions and short-lived continuity ids support stable sticker placement. These ids do not identify a person, and no face recognition, biometric template or identity matching is performed.</p>
              <p>Laser eyes and the pirate patch use temporary eye landmarks. The power-up places a golden aura around an estimated torso below the detected face; it does not scan or segment the person&#x27;s body. Its red eye glow and aura are drawn locally. Face effects and their geometry are not saved with the GIF library.</p>
              <p>Tracking pauses when the tab is hidden or the video is paused, and face positions reset when seeking or changing the source. Removing face stickers, clearing artwork or unmounting the feature stops tracking and releases its buffers. Face effects use no camera or microphone, and there is no image upload, persistent frame storage or transmission of face geometry. If a video forbids pixel reads, face tracking stops with an unavailable message; the extension does not bypass that restriction. Doodles and throws continue to work.</p>
              <p>Face tracking is disabled while group watching is active, including a local party preview. Leaving the party restores solo face controls. YouScroll never requests camera access, and uses the microphone only for voice calls.</p>
            </DocSection>

            <DocSection id="the-pop-out-player" index={n("the-pop-out-player")} title={title("the-pop-out-player")}>
              <p>The pop-out button hands the video you are already watching to your browser&#x27;s built-in Picture-in-Picture window. The video never leaves the browser, no extra permission is involved, and nothing about it is recorded or sent anywhere. YouScroll only asks the browser to open and close that window; the window itself is Chrome&#x27;s, not this extension&#x27;s.</p>
            </DocSection>

            <DocSection id="permissions-and-network-destinations" index={n("permissions-and-network-destinations")} title={title("permissions-and-network-destinations")}>
              <dl className="pp-defs">
                <div><dt><code>storage</code></dt><dd>Local settings, saved GIFs and, in live builds, protected browser-session credentials.</dd></div>
                <div><dt><code>https://www.youtube.com/*</code></dt><dd>Runs the content script on YouTube pages.</dd></div>
                <div><dt>Netflix, Prime Video, JioHotstar and Crunchyroll, live builds only</dt><dd>Run Social and Play on <code>www.netflix.com</code>, <code>www.primevideo.com</code>, <code>www.hotstar.com</code> and <code>www.crunchyroll.com</code>. Each site can be turned off in the popup.</dd></div>
                <div><dt>One configured backend origin</dt><dd>Live Social API requests and sockets after explicit sign-in. This is a CSP/CORS destination, not an optional host permission.</dd></div>
                <div><dt>YouTube oEmbed and <code>i.ytimg.com</code></dt><dd>Titles and thumbnails for public YouTube room cards viewed on YouTube.</dd></div>
                <div><dt><code>identity</code>, live builds only</dt><dd>Opens Google&#x27;s account-selection and sign-in flow through the browser identity API.</dd></div>
                <div><dt><code>offscreen</code>, live builds only</dt><dd>Runs a voice call in a hidden extension page, away from the video page.</dd></div>
                <div><dt>Microphone, on request</dt><dd>Voice calls only. Chrome asks you on an extension page the first time you choose Unmute.</dd></div>
                <div><dt>Cloudflare Realtime and STUN</dt><dd>Carry voice-call audio between the people in a call. Used only during a call.</dd></div>
                <div><dt><code>https://*.dodopayments.com</code> pages</dt><dd>Opened in a new tab only when you choose Upgrade or Manage billing. The extension sends no request to Dodo itself.</dd></div>
              </dl>
              <p>The live backend origin is configured at build time. HTTP is permitted only for local development loopback addresses; deployed origins use HTTPS. Google sign-in runs in a browser-managed authentication window, not as remote code injected into the extension. The extension does not ask for <code>tabs</code>, <code>scripting</code>, <code>webRequest</code>, <code>history</code>, <code>cookies</code> or <code>&lt;all_urls&gt;</code> permission. Disable Social to stop its connections, or sign out to clear local credentials and revoke the session. There is no optional backend host grant to withdraw.</p>
              <p>The application has no advertising SDKs, analytics, click logs or remote executable code. Application logs use operational codes and counts, not chat, video titles, account tokens or invitation URLs. Cloudflare and network providers necessarily process request metadata such as IP addresses; IPs are used for rate limiting but are not stored in the application database. Provider-level retention and operational configuration are separate from application storage. The service uses social information to provide the features described here, not to sell it or target advertising.</p>
            </DocSection>

            <DocSection id="what-youtube-sees" index={n("what-youtube-sees")} title={title("what-youtube-sees")}>
              <p>YouTube continues to load, render and process activity as it would without YouScroll, including loading more comments. Google&#x27;s handling of YouTube and sign-in activity is covered by <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google&#x27;s privacy policy</a>.</p>
            </DocSection>

            <DocSection id="distribution-and-changes" index={n("distribution-and-changes")} title={title("distribution-and-changes")}>
              <p>Store disclosures must match the actual build being distributed. The local preview and a live build have different permissions and data flows; a live build must not reuse a no-account/no-collection store declaration. This policy will be updated when the shipped behavior or its data handling changes.</p>
            </DocSection>

            <DocSection id="contact" index={n("contact")} title={title("contact")} className="pp-contact">
              <p>Email privacy questions and requests to the address below. General questions can also go to an <a href={issuesUrl} target="_blank" rel="noreferrer">issue on the project’s repository</a>; do not post credentials, invitation links or private chat in a public issue.</p>
              <p className="pp-contact-email">
                <a href={`mailto:${productEmail.youscroll}`}>{productEmail.youscroll}</a>
              </p>
            </DocSection>
          </article>
        </div>
      </main>
    </>
  );
}
