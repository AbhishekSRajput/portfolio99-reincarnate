# PixelGhost Privacy Policy

- **Effective date:** October 10, 2026
- **Extension operator:** Sagrid, operated by Abhishek Singh
- **Privacy and support contact:** <codecube99@gmail.com>

PixelGhost is a local-first browser extension for reviewing and debugging web
pages, including reference-image comparison, screenshots, element inspection,
device and vision simulation, and page audits. This policy describes
the data the extension handles, why it handles it, where it is stored, and the
choices available to users.

In this policy, “PixelGhost,” “we,” and “us” refer to the extension operator
identified above.

## Summary

- PixelGhost does not require an account.
- PixelGhost has no developer-operated data server, analytics, advertising,
  tracking, or telemetry.
- Workspace data and images are stored locally in the user's Chrome profile.
- Recent screenshots, a Steps walkthrough and SEO deep-scan scores are also
  stored locally; recordings are saved to the user's device.
- PixelGhost handles the current page URL to restore its workspace and run
  the DevTools checks the user starts.
- Clipboard image access is optional and occurs only after a user invokes a
  paste action.
- If a user supplies an HTTPS image URL, the browser requests that image
  directly from the server chosen by the user.
- If a user loads a Google Fonts family in the Inspector, PixelGhost requests
  it from Google by the name the user typed, without cookies or a referrer.
  Editing that loaded family's weight or style can request another variant.
- Page tools read the page the user chooses to inspect. Asset and link
  previews can request the files that page references. The Device simulator
  loads copies of the page with the website's usual cookies.
- PixelGhost renders overlays into the current page. Scripts running on that
  page may be able to inspect or remove the rendered elements and displayed
  image data.

## Data PixelGhost handles

PixelGhost handles the following information to provide its page-review
features:

| Data | How it is used |
| --- | --- |
| Current page URL | Associates an autosaved workspace with the page where the user created it. The URL fragment is removed; the scheme, host, path, and query string remain part of the local workspace key. |
| User-selected overlay images | Displays local files, folder selections, clipboard images, and user-supplied remote images as overlays. Local image bytes and thumbnails may be stored for restoration. |
| Image and project names | Labels layers and user-created named project snapshots. A local file's name may be used as its layer label, and the user may rename a layer to any text they choose. |
| Overlay state | Restores layer order, selected layer, visibility, lock state, deletion protection for a layer or for a whole page, opacity, blend mode, X/Y position, scale, rotation, centered mode, and whether the widget was hidden on that page. Hiding the widget applies only to the page it was hidden on, and remains until the user shows the widget, selects a layer, or adds a layer. |
| Widget and display preferences | Restores widget collapse state, whether the layer list is shown as a grid or a list, light/dark theme, accent color and interface language, and remembers whether a project has been saved, whether the rotating tips are shown, and whether the first-run guide was skipped, so those hints do not reappear. Widget position resets on page load. While the color picker, ruler, Inspector or Screenshot tool is open, a note of that tool and the page's host name (never its full address) is kept for that tab in the browser's in-memory session storage, so the tool stays open on other pages of the same site in that tab; the note is deleted when the user switches back to layers, closes the widget, leaves the site or closes the tab, when privacy consent is withdrawn, and when the browser closes. |
| Colors picked with the color picker | Keeps the last twelve colors sampled with the widget's color picker so they can be reused and copied again. Each entry is a color value such as `#2f6df0` — never an image, a screenshot, or the location it was sampled from. It also remembers the color format the user chose for copying (HEX, RGB, HSL or OKLCH) and whether picked colors are copied automatically. These are stored only on the user's device and are cleared with the extension's other stored data. |
| Screenshots kept in Recent | Keeps the last twelve captures taken with the Screenshot tool so they can be copied or saved again. Each holds the picture, a small preview, the page's host name (never its full address), the picture's size and capture mode, and when it was taken. A capture the user marked up in the editor also holds those marks and notes, and a copy of the picture with them drawn on it (the original is kept unchanged beside it). Kept only in the extension's storage on the user's device and never uploaded. The oldest is removed when a thirteenth arrives; Clear all deletes them, and withdrawing privacy consent deletes them too. |
| A Steps walkthrough in progress | While the user builds a Steps walkthrough with the Screenshot tool — several captures, taken across pages and tabs, that become one image — keeps each step's picture, a small preview, the page's host name (never its full address), its size and capture mode, and their order, plus which tab the last step came from so another tab can ask before joining. If the user marks the steps up in the editor, it also keeps those marks and notes and the title the user gives the finished image. Kept only in the extension's storage on the user's device and never uploaded. Finish turns the steps into one image (which joins Recent) and deletes them; Discard deletes them; a walkthrough with no new step for seven days is deleted; and withdrawing privacy consent deletes it too. |
| Element Selector rules | Keeps the list of CSS selectors used to highlight elements on a page in the DevTools panel's Element Selector — the ready-made ones chosen from a fixed catalogue built into the extension, any selector the user typed or picked, any name the user gives a rule, and whether a rule is switched off — so the same checks can be reused on the next page. While the tool is open it draws a box on each element the rules match, and dashed boxes for a selector the user is still writing, and lists, in the panel, each match's short CSS path (built from the element's tag, id and class), its size, and a short excerpt of what it shows: its text, the address it links to or loads, and its alt text or label. To complete what the user types, it reads the class names, ids and attribute names the page uses. When the user picks an element on the page, it reads that element's tag and identifying attributes to suggest selectors, and keeps that one click from reaching the page. All of this is held in the panel only and is gone when the tool is left or the panel closes. The user may export the matches — their text, addresses, CSS paths or markup — to the clipboard, or as a CSV or JSON file saved where the browser saves downloads; that happens only when the user asks, and PixelGhost keeps no copy. Only the rule list is stored, never its match results or exported page content. It is stored only on the user's device and is cleared with the extension's other stored data. |
| Device simulator | Shows the current page inside drawn phone, tablet and laptop frames when the user starts it from the widget or the popup. To do this PixelGhost loads the page's own address again inside frames on that page, once per device shown (up to six side by side; scrolling and same-site navigation follow each other when Sync is on, which is off by default and remembers the user's choice) — the website receives those loads as ordinary requests from the user's browser, with its usual cookies, as if the page had been opened again — and covers the page with the simulator until the user closes it, then puts the page back as it was. To draw each device's status and address bars it reads the framed page's current address and its theme or background color, on the device, and keeps neither. On devices whose scrollbars take no room it hides the framed copy's scrollbars, and on touch devices it shows a fingertip pointer and scrolls when the user drags; the page underneath is not changed. While it runs, and only in that tab: it removes the X-Frame-Options header from that website's responses loaded into the device frames, so a site that forbids framing can still be previewed; only if the user presses "Allow framing" for a site that still refuses, it also removes that site's Content-Security-Policy header from those frames; and, unless the user turns "Device user agent" off, the tab's requests other than top-level navigation carry the chosen (with several devices, the active) device's user agent and matching client hints, and a small script in the device frames tells the page the same device details. When "High fidelity" is enabled, PixelGhost also attaches Chrome's debugger to that tab to emulate touch input (Chrome shows its "started debugging" bar while it is attached); it reads no page data through it and detaches when the setting is turned off or the simulator closes. The setting is remembered and reapplied when the simulator is reopened or restored after reload. If the user turns on "Stay on after reload", the simulator is opened again when that page reloads. All of this is undone when the simulator closes. Screenshots and recordings taken in the simulator are covered under Screenshots below. It stores, while it runs, a record in the browser's in-memory session storage identifying its tab, session and document, the session start time, the simulated host name, and the temporary network-rule block and debugger attachment it owns, so it can remove them correctly if its background process restarts; in local storage it keeps the simulator's own preferences: the devices shown, their order and orientation, which one is active and whether they move together, zoom, whether browser bars, the device frame, the device user agent and the touch cursor are on, the color scheme, whether screenshots are saved or copied and taken at actual size, whether high fidelity and staying on after reload are on, favorite devices, and up to 20 devices the user built (each one's name, type, system, size, pixel ratio, cutout, frame color and optional user agent). |
| Inspector readings and property edits | Reads an element's size, spacing, computed styles and available CSS states when the user inspects it. Pinned cards can compare elements, check CSS declarations the user pastes into the Spec tab, and copy CSS or other code only when the user asks. The user can temporarily edit the properties the card shows — including typography, colors, spacing, dimensions, layout and borders — or preview a pasted specification and simulate CSS states through a PixelGhost-owned style rule. Edits are removed when the user resets them, unpins the element, clears the Inspector, moves its card to another element or the page changes; leaving the Inspector takes them off the page and returning puts them back. The readings, edits and pasted specifications are held in memory only and never written to storage. |
| Inspector fonts | A font file chosen from the user's device (up to 10 MB) is read on the device and never uploaded. Its file name labels it in the session's loaded-font list. For Google Fonts, the user types a family name and presses Load: PixelGhost requests that family at the weight and style of the element being edited from fonts.googleapis.com, then fetches the font files it names from fonts.gstatic.com only. Editing a Google family already loaded can request another weight or style of that same family. These requests omit cookies and referrers and contain no page text or page address. Loaded fonts are added to the current page under a PixelGhost name while the Inspector is open, are held in memory, and are never written to storage; the page's loaded-font list is gone when the page reloads or closes. The extension's background process also keeps responses in memory for reuse while that process runs. |
| Page Ruler measurements and preferences | Reads element geometry, spacing and box-model styles, or keeps the rectangles the user draws, to measure the current page and compare it with a design. Measurements are held in memory, survive tool switches, and are discarded when the page changes; they are not written to storage. The user can include them in a screenshot. Only the ruler's preferences are stored: units, snapping, box-model highlighting, and its square or column grid settings, including whether the grid is on, cell size, column count, gutters, margins and maximum width. These settings contain no page measurements. |
| DevTools Assets scan | Lists the images, icons, fonts, audio, video and inline SVG the current page references, so the user can review them in the DevTools panel. The scan runs only when the user opens the Assets tool, switches tab, reloads, or presses Rescan — never in the background. It reads the page's markup, the page's own stylesheets, and the timing the page already recorded for its own loads, and from those it records only addresses, dimensions, where on the page each one was found (for one an element shows, the element's tag and a short CSS path to it), and the markup of inline SVG images so they can be previewed; it never records the text of the page. Sizes come from that same timing, so collection issues no network requests of its own. Displaying image thumbnails can request the addresses the page references, without a referrer; these ordinary image requests can carry cookies allowed by the browser. A scan is held in the panel only, is never written to storage, and is gone when the panel closes. The user may save listed assets to their device, either one at a time or as a single zip of the files they have selected: PixelGhost then fetches those files from the addresses the page already uses, without cookies and without a referrer, and hands the result to the browser's normal download. A zip is assembled inside the extension on the user's own device; the files are not sent anywhere to be packed. Saving happens only for the assets the user picks, the file goes only where the browser puts it, and PixelGhost keeps no copy and no record of what was saved. The user may also copy one listed asset to the clipboard: PixelGhost fetches it the same way and puts the picture (converted to PNG on the user's device), the SVG code, or the file's address on the clipboard, and nothing else. Show on page draws an outline around the element that uses an asset, in the current page only, until the user closes the asset's details or leaves the section. |
| DevTools SEO | Checks the current page's search and link-sharing setup, and how ready it is to be found, read and quoted by AI answer engines, so the user can review it in the DevTools panel's SEO section. **Page tab:** The page audit runs only when the user opens the SEO section, switches tab, reloads, or presses Rescan — never in the background. It reads the page's title, description and other head tags, its heading text, the text and addresses of its links, its image addresses and alt attributes, and its structured data, and turns them into a list of findings; text is shortened and lists are capped. Its link-preview card — the page as a Google search result, and as shared links unfold in common apps — loads the share image and icon the page itself declares, from the addresses the page names and without a referrer; the search result is measured and drawn on the device. The audit is held in the panel only, is never written to storage, and is gone when the panel closes. When the user exports a report, it is built on the user's own device and saved wherever the browser saves downloads; to print a PDF, the report is handed to a PixelGhost print page through the browser's in-memory session storage and deleted the moment that page opens it. **Deep scan (the AI answers tab):** It runs only when the user presses Deep scan, Run deep scan or Re-scan — never when the section or one of its tabs is opened, on page load, on navigation, or in the background. It reads the page's structure and text, its head tags and its structured data. It then requests, from the same website the page came from and from nowhere else, that site's `robots.txt`, `llms.txt` and sitemap files and the page's own address once more, without cookies and without a referrer, to see what a crawler that does not run scripts receives; a redirect to another website is not followed. The page text and those responses are held in the panel only and are gone when the panel closes. The Page tab's link-preview card uses that same server HTML, on the device, to show what link previews receive and which share tags only the page's own scripts add. So the user can compare scans over time, PixelGhost keeps up to 20 results per page address on the user's device: the page address, the time, the scores, and each check's result — never page text, headers or file contents. The user can delete all of them from the SEO section's History view. Highlight and Find on page outline an element on the page and scroll it into view until the user clears it or closes the panel. |
| DevTools Site Stack | Identifies the content-management systems, frameworks, libraries and services the current page uses, so the user can review them in the DevTools panel's Stack section. It runs when the user opens the section, switches tab, reloads, or presses Rescan, and reads the page once more a few seconds later so scripts that load late are not missed — never in the background. It looks at signals the page itself exposes: the addresses of the scripts, stylesheets, frames and other files the page loads, its generator tag, marker elements and attributes, fixed strings in its inline scripts, and — through a check run in the page's own script context — whether known libraries are present and which version they report. It also compares the names of the page's cookies with a list of known names inside the page; no cookie name or value leaves the page. What reaches the panel is technology names, version numbers, WordPress theme and plugin folder names taken from asset addresses, a few fixed facts (such as which Next.js router a page uses or a Shopify theme's Theme Store number), how many of the page's scripts come from other sites, and the host names of the other websites the page requested files from, with how many requests went to each — never page text. Versions are checked against a list of known security advisories and end-of-life dates built into the extension; nothing is looked up online. **Check server:** only when the user presses Check server, PixelGhost requests the page's own address once more, without cookies and without a referrer, follows any redirects the website supplies, and reads a fixed list of the final response headers (such as the server, CDN and security headers) to name the host and summarize those security headers; the page itself is not read from that response. All of this is held in the panel only, is never written to storage, and is gone when the panel closes. Find outlines an element a detection matched until the user clears it or closes the details. Exports — a report, a PDF, a JSON file, or Markdown copied to the clipboard — happen only when the user asks, and PixelGhost keeps no copy. |
| DevTools vision simulation | Shows the current page roughly as people with colour blindness, blurred or clouded sight, or loss of part of their field of view might see it — only after the user picks a condition or a profile, and for as long as one is picked. It lays one filter over the page in the page itself; nothing is read from the page or stored. When a field-of-view condition follows the pointer, the pointer's position over the page places the effect and is not kept. Save screenshot, pressed by the user, captures the visible tab and saves it to the user's device as a PNG; PixelGhost keeps no copy and sends it nowhere. The simulation is removed when the user turns it off, leaves the tool, switches tab or closes the panel; a reload or navigation in the same tab keeps it. |
| Privacy-consent record | Records the policy version, acceptance, and acceptance time so the first-use disclosure is not shown on every popup open. |

Page inspections can read visible text, markup, styles and resource addresses;
screenshots and recordings can include anything visible in the area the user
captures, including sensitive information. These tools operate on the page
the user chooses, and PixelGhost does not separately extract passwords, form
entries, authentication-cookie values or a general browsing-history list.
The content script observes page geometry, scrolling, pointer input and
keyboard input as needed for the tools and overlay controls; it does not
retain an activity log. The website's own requests in simulated device frames
can include that website's cookies under the browser's normal rules.

User-selected images and project labels may themselves contain personal or
sensitive information. PixelGhost processes that content only for the
user-requested overlay and project features.

The widget's color picker samples a single screen pixel, and only while the
user has explicitly started a pick. The sampling interface is the browser's own
color picker; PixelGhost receives the resulting color value and nothing else —
no screenshot, no surrounding image, and no record of where the pixel was.
With automatic copying on, that value is written to the clipboard in the
user's chosen format. To name the CSS variable that holds a picked color, the
picker reads the page's own CSS custom properties on the device and keeps
none of them.

When the user presses **Compare with design** and then clicks a point on the
page, PixelGhost photographs the visible part of the tab once — with its own
panel and the design overlay hidden — reads the single pixel at that point,
and reads the design layer's pixel at the same point to compare the two. The
photograph is discarded as soon as that pixel is read; the point, the
photograph and the design pixel are never stored or sent anywhere.

## Clipboard access

PixelGhost can receive an image through an ordinary paste event when the user
presses `Ctrl+V` in the popup. If the user selects the **Paste** button,
PixelGhost asks Chrome for the optional `clipboardRead` permission at that
time. If permission is granted, the extension examines the available
clipboard formats and reads image data only. Non-image clipboard content is
not saved.

The user may decline optional clipboard permission and use file upload,
folder selection, an HTTPS image URL, or ordinary `Ctrl+V` paste instead.

## Screenshots

PixelGhost's Screenshot tool photographs the page the user is looking at, at
the moment the user asks it to. A capture is produced inside that browser tab
and offered for saving or copying, and the last twelve are kept on the
user's device in the tool's Recent list, described below. Nothing is
captured in the background or without a
deliberate press; a delay the user sets in the tool only postpones the capture
that press started.

The Inspector's capture button photographs one element the same way, at the
moment the user presses it, and sends the picture straight to the clipboard —
or, if the browser refuses the clipboard, to a file in the user's downloads.

The Device simulator's Screenshot button photographs a device, its screen, or
all the devices on its stage the same way, when the user picks one, and sends
the picture to the user's downloads or clipboard as the user chose. Its Record
button makes a video of the same areas, only between the user pressing Record
and Stop (it also stops after ten minutes, when the simulator closes, or when
the user ends sharing from the browser's own controls). Recordings contain no
audio; PixelGhost does not request microphone or camera access. To see the tab
it uses Chrome's tab capture when the user opened PixelGhost on that tab from
its toolbar button or shortcut; otherwise Chrome itself asks the user which
tab to share. While it
records, the browser shows that the tab is being shared. The video is kept in
the page's memory until the recording stops and is then saved to the user's
downloads; it is never stored by PixelGhost or sent anywhere.

A capture goes only where the user sends it: to a file the user saves, or to
the system clipboard the user copies it to — by pressing Save or Copy, or
automatically after each capture if the user chose that in the tool's options.
PixelGhost never
transmits a capture anywhere, and there is no developer or analytics server to
receive one.

The Screenshot tool keeps the last twelve captures in the extension's own
storage on the user's device, as Recent, so a capture can be copied or saved
again after the panel has moved on. Each holds the picture, a small preview,
the page's host name — never its full address, which can carry session
tokens or customer names — the picture's size and capture mode, and when it
was taken. Recent never holds more than twelve: the oldest is removed when a
new capture arrives, Clear all deletes them, and withdrawing privacy consent
deletes them too.

A capture in Recent can be marked up in the Screenshot editor, a PixelGhost
page that opens in its own browser tab and reads the capture from that same
storage. What the user draws there — numbered markers and their notes,
arrows, boxes, labels, highlights, blurred areas and a crop — is kept with
the capture, together with a copy of the picture with the marks drawn on it,
so Recent can copy or save it again as marked. The original picture is kept
unchanged beside it. Marks and notes are deleted with their capture, and
never leave the device. A blurred area is pixelated in every file the user
saves or copies; the unblurred original stays only in Recent, on the device,
until the capture is cleared.

The Screenshot tool's Steps builds one image from several captures taken across
pages and tabs, such as a bug's reproduction steps. While a walkthrough is in
progress its captures are kept in the extension's own storage on the user's
device, so the walkthrough survives page loads, closed tabs and browser
restarts: each step's picture, a small preview, the page's host name — never
its full address — its size and capture mode, and the steps' order. The
walkthrough also remembers which tab its last step came from, so that another
tab asks before joining it. The Screenshot editor can open the whole
walkthrough; what the user draws and writes there — marks, notes, and a title
for the finished image — is kept with the walkthrough and deleted with it. Finish draws the steps into one image inside the
page, keeps it in Recent and deletes the steps; the user's choice of Finish
either copies the image to the clipboard or saves it to the user's downloads. Discard deletes them. A walkthrough with no new
step for seven days is deleted the next time the Screenshot tool is used, and
the tool says so once. Withdrawing privacy consent deletes it immediately.

The user controls what a capture contains:
**Include overlay layers** decides whether the user's own reference images are
baked into the picture, **Include measurements** draws the ruler's retained
boxes onto it, and **Design vs page** builds a side-by-side or difference image
from the capture and visible design layers on the device, without taking
another screenshot. **Pin fixed headers once** decides whether the
page's fixed elements are shown on every screen of a stitched full-page shot
or only the first. Producing a full-page capture scrolls the page and briefly
adjusts the positioning of those fixed elements; both are undone when the
capture finishes, is cancelled, or is interrupted.

## Browser permissions

Chrome grants API access separately from PixelGhost's first-use privacy
disclosure. PixelGhost uses the following permissions:

| Permission | Why PixelGhost uses it |
| --- | --- |
| `storage` | Keeps local preferences, consent and temporary session records. Images, projects and captures use local IndexedDB. |
| `scripting` | Installs the packaged page tools and restores the overlay controller on supported pages. |
| Access to all websites (`<all_urls>`) | Restores URL workspaces on ordinary web pages, inspects the page the user chooses, and allows screenshots from the on-page tools. The widget can remain available without opening the toolbar popup in each tab. This does not grant access to Chrome's protected pages. |
| `sidePanel` | Opens PixelGhost's Assets, Vision, SEO, Stack and Element Selector interface beside the current page. |
| `declarativeNetRequestWithHostAccess` | Temporarily adjusts framing headers for the simulated page's origin and device request headers in the simulator's tab. Content Security Policy is removed from device-frame responses only after the user allows framing. The rules are removed when the simulator ends. |
| `debugger` | Emulates touch input in the simulator's tab while High fidelity is enabled. PixelGhost uses only touch-emulation commands and does not read page data through the debugger. Chrome requires this permission in the installed extension even though the setting starts off. |
| `tabCapture` | Records the simulator's tab only after the user presses Record, when Chrome permits access following an extension invocation. Otherwise the browser asks which tab to share. |
| Optional `clipboardRead` | Reads an image only when the user invokes Paste and grants clipboard access. Declining leaves other image-import methods available. |

Permission warnings describe what an API can do, which can be broader than
PixelGhost's use of it above. Chrome may ask existing users to approve newly
added access before enabling an update. The user can disable or uninstall
PixelGhost through Chrome's extension controls.

## Remote image URLs

PixelGhost accepts only HTTPS URLs without embedded usernames or passwords
through its remote-image input. When a user adds such a URL, the URL is stored
locally and the browser requests the image from that user-selected server so
it can be displayed. The remote server may
receive information ordinarily associated with an HTTPS request, such as the
user's IP address, request time, browser request headers, and cookies Chrome
sends for that server under applicable browser and site rules. PixelGhost sets
`no-referrer` on every image element that can display a remote image, so it
does not send the viewed page's URL in the HTTP `Referer` header.

That server is selected by the user and is not operated by PixelGhost. Its
handling of request data is governed by its own privacy policy. PixelGhost
does not send local overlay images, project data, or the user's workspace to
that server.

## Visibility to the current page

To provide an on-page comparison, PixelGhost inserts overlay image elements
and a floating-widget host into the page being viewed. Scripts running on that
page may be able to find, inspect, modify, or remove those elements. Depending
on browser behavior, this can expose layer names, image references, comparison
state shown in the widget, the names of fonts loaded in the Inspector, and
displayed local-image data to the page and to third-party scripts the page
includes.

This rendering does not send data to the PixelGhost operator, but it means the
current page is not a confidential boundary for a displayed design. Users
should use private or sensitive reference images only on pages and with page
scripts they trust.

## Where data is stored

PixelGhost stores data within the extension's browser storage on the user's
device:

- IndexedDB stores URL-keyed workspaces, local image blobs, thumbnails, and
  named projects. A workspace also records whether the widget was hidden on
  that page. It also stores SEO deep-scan results: the page address, scan
  time, scores and per-check results, at most 20 per page address, and no page
  text. It also stores the Screenshot tool's Recent captures described
  above, at most twelve, and a Steps walkthrough in progress, at most twenty
  steps.
- `chrome.storage.session` temporarily holds the side-panel selection, print
  report handoffs, each tab's open widget tool and host name, and the Device
  simulator's session records described above. These records are in memory
  and do not survive a browser restart.
- `chrome.storage.local` stores the privacy-consent record, widget, theme, and
  accent-color and interface-language preferences, the Screenshot tool's
  options, the ruler and grid preferences described above, a count of its
  Recent captures, and a summary of a Steps walkthrough in progress (its steps'
  host names, sizes and order, so every open tab can draw them), the last twelve colors picked with the color
  picker and its copy-format and automatic-copy preferences, which CSS
  properties the Inspector shows and in what order, the
  Element Selector's rule list, and the Device simulator's preferences (device,
  orientation, zoom, display and emulation options, color scheme and favorite
  devices, each chosen from fixed lists built into the extension, plus the
  devices the user built in its device builder). The Inspector preference is a list of CSS
  property names chosen from a fixed catalogue built into the extension; it
  records nothing read from any page. The Element Selector's rules are CSS
  selectors — chosen from a fixed catalogue or typed by the user — with any
  name the user gave them, and record nothing about the elements they matched.
- Extension-page `localStorage` stores the popup theme, accent color, the
  interface language if the user explicitly chose one, whether rotating tips
  are shown, the release notice last shown and whether the first-run tour was
  skipped, whether a project has previously been saved for first-save onboarding, and
  whether the user has declared in the SEO deep scan that blocking AI training
  crawlers is intentional, and how the Assets list is laid out (grid or list,
  preview background, sort order, and whether srcset variants are listed), how the SEO
  section's link preview was last set up (Google search or a shared link,
  desktop or phone, and which app it imitates), and how the Vision tool's conditions were last set up (each one's strength,
  astigmatism's direction, hemianopia's side, whether field loss follows the
  pointer, and the open tab) — never which condition is on.

While an overlay is displayed, temporary image references and controls are
also rendered in the current page as described above. They are removed when
the overlay/controller is removed; the persisted copy remains in extension
storage until deleted under the retention rules below.

This data is not sent to or made available through a PixelGhost-operated
server. It is not intentionally synchronized between devices by PixelGhost.
Access to local extension data is subject to the security of the user's
browser profile, operating-system account, and device.

## How data is used

PixelGhost uses handled data only to:

1. display and control reference-image overlays;
2. restore the workspace associated with the current page URL;
3. save, list, load, and delete user-created projects;
4. remember extension display preferences, recently picked colors,
   Element Selector rules, and consent;
5. capture, annotate, save and copy screenshots and Steps walkthroughs, and
   save recordings the user starts;
6. inspect the current page and run the audits and simulations the user starts;
   and
7. maintain the security and reliability of those user-facing features.

PixelGhost does not use data for advertising, marketing, analytics,
personal profiling, creditworthiness, lending, or sale. It does not build a browsing
profile.

## Sharing and disclosure

PixelGhost does not sell user data. It does not transfer workspace data,
local images, URLs, settings, or clipboard images to the extension operator,
advertisers, analytics providers, or data brokers.

The limited exceptions are:

- rendering user-selected overlays and controls into the current page, where
  page scripts may be able to inspect them, as described above;
- a browser request to a user-selected HTTPS image server, as described
  above;
- asset and link-preview requests to the addresses declared by the page,
  without a referrer; ordinary image-preview requests may include cookies
  allowed by the browser. Saving or copying an asset fetches its file without
  cookies or a referrer;
- page loads inside the Device simulator, which contact the website and its
  resources with the website's usual cookies, as described above;
- the SEO deep scan's requests to the website the user is checking, made only
  when the user presses Deep scan, without cookies or a referrer, as described
  above;
- the Stack section's Check server request for the page the user is viewing,
  made only when the user presses Check server, without cookies or a referrer,
  as described above; it follows redirects, so a destination selected by that
  website can also receive a request;
- requests to Google Fonts (fonts.googleapis.com and fonts.gstatic.com) for a
  font family the user names and loads in the Inspector, including additional
  weights or styles needed for edits to that loaded family, without cookies
  or a referrer, as described above;
- information the user intentionally includes in a support request;
- disclosure required to comply with applicable law; or
- disclosure necessary to protect users, the extension, or others from
  malware, fraud, abuse, or a security threat.

Because PixelGhost has no data backend, its personnel cannot inspect locally
stored user data. Support personnel can see only information a user chooses to
send with a support request.

## Retention and deletion

Workspace data remains in local browser storage until the user removes the
relevant layers or workspace, clears the extension's stored data, resets the
browser profile, or uninstalls the extension. Named projects remain until the
user deletes them or clears extension data. Widget, theme, accent-color,
first-save onboarding, and consent preferences remain until extension storage
is cleared or the extension is uninstalled. SEO deep-scan results remain
until the user deletes them from the SEO section's History view, extension storage is
cleared, or the extension is uninstalled; each page address keeps at most 20,
and the oldest is removed when a newer one is saved. Recent captures
remain until the user clears them, a newer capture replaces the oldest of
twelve, privacy consent is withdrawn, extension storage is cleared, or the
extension is uninstalled. A Steps walkthrough in progress remains until the
user finishes or discards it, seven days pass without a new step, privacy
consent is withdrawn, extension storage is cleared, or the extension is
uninstalled.

Users can remove individual layers, remove all layers for a page, delete the
saved layers of any listed page URL or of all URLs at once, and delete named
projects from the extension interface. Chrome can remove all remaining
PixelGhost data when the extension is uninstalled. Users may also clear the
extension's site/storage data through Chrome's extension developer or browser
data controls where available.

The extension operator does not hold a server-side copy and therefore cannot
retrieve, export, correct, or delete local extension data on the user's
behalf.

## Security

PixelGhost packages its own executable analysis code with the extension.
User-entered remote image addresses are limited to HTTPS. Persisted data is kept in extension storage, but displayed overlays
are deliberately rendered into the current page and are not isolated from all
page scripts. Local data is also subject to Chrome, browser-profile,
operating-system, and device security controls.

No local storage mechanism can guarantee absolute security. Users should not
add sensitive images on a shared or untrusted browser profile, should display
confidential designs only on pages they trust, and should use remote image
URLs only from servers they trust.

## External services and links

The extension may open its privacy policy, tools guide, or support page in a
normal browser tab when the user selects the relevant link. The operator of
that website may process the visit under its own privacy policy. Chrome Web
Store and the Chrome browser may separately process installation, update,
diagnostic, or store activity under Google's policies; that processing is not
performed by PixelGhost.

When the user loads a Google Fonts family in the Inspector, Google receives
that request — like any web request, it carries the user's IP address and
browser details — and processes it under Google's own privacy policy.

## Children

PixelGhost is a professional design and development utility and is not
directed to children under 13 or the minimum age required by local law. The
extension does not knowingly request personal information from children.

## Chrome Web Store Limited Use

PixelGhost's use of information received from Google APIs adheres to the
Chrome Web Store User Data Policy, including the Limited Use requirements.
PixelGhost limits its use of user data to providing or improving its disclosed
single purpose and does not use or transfer user data for personalized
advertising, unrelated purposes, or creditworthiness or lending decisions.

## Changes to this policy

If PixelGhost's data practices change, this policy, the Chrome Web Store
privacy disclosures, and any required in-product disclosure will be updated
before the changed practice begins. The effective date at the top identifies
the current version.

The 3.0 update adds a notice in the popup's What's new window describing page
checks, local capture storage and the Device simulator's permissions, with a
link to this policy. Existing workspaces and the original enablement decision
are preserved. Browser approval for newly requested permissions is separate:
Chrome may pause the extension until the user approves the updated access.
If a future change needs additional informed consent, PixelGhost will request
it before starting that changed data use.

## Contact

Questions, privacy requests, and security reports should be sent to:

<codecube99@gmail.com>

Because user workspaces are stored only on the user's device, do not attach
private overlay images or sensitive page URLs to a support request unless they
are necessary and the user intends to share them.
