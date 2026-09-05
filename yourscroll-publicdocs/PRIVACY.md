# YouScroll privacy policy

**Last updated:** 31 July 2026 · **Applies to:** YouScroll 0.4.0

## Summary

YouScroll rearranges the YouTube page you are already looking at. It has no
account, makes no network requests of its own, and does not collect user data.

There is no server. There is nowhere for your data to go.

## Chrome Web Store data-use disclosure

YouScroll declares no collected user-data categories in the Chrome Web Store
Privacy practices form.

- **Website content is not collected.** YouScroll locates and moves YouTube's
  existing comments and recommendations containers without reading, copying,
  storing, logging, or transmitting their contents.
- **User activity is not collected.** Click, keyboard, and scroll events are
  handled only as they occur so the visible controls and independent scrolling
  work. Those interactions are not recorded, measured, profiled, or
  transmitted.
- **Settings are not collected by the developer.** The two preferences
  described below are stored through Chrome's own storage API. The developer
  has no server and receives no copy of them.

## What YouScroll stores

One settings object in `chrome.storage.sync`:

- which features are switched on;
- which tab the right-hand column opens on.

That is the complete list. If you are signed into Chrome, that object syncs
between your own browsers through Google's sync service, as any extension
setting does. It contains no identifiers and nothing about what you watch.

## What YouScroll does not do

- No accounts, sign-in, or user identifiers.
- No analytics, telemetry, crash reporting, or usage measurement.
- No click, keyboard, pointer, or scroll logging.
- No advertising, ad SDKs, or tracking of any kind.
- No network requests. YouScroll contacts no server, including any operated by
  its developer. It contains no remote code.
- No selling, sharing, or transferring of data to anyone, because there is no
  data to transfer.

## Page content

YouScroll moves elements YouTube has already rendered — the comments list and
the recommendations list — from one part of the page to another. It reads
their position in the document in order to move them and to put them back.

It does not read, copy, store, transmit, or log the content of those elements,
and there is no exception to that. No comment text, comment count, video title,
channel name, search query, or watch history is read by this extension, let
alone recorded anywhere. The tab labels it adds say "Comments" and "Up Next"
and are fixed strings, not anything taken off the page.

## The pop-out player

The pop-out button hands the video you are already watching to your browser's
built-in Picture-in-Picture window. The video never leaves the browser, no
extra permission is involved, and nothing about it is recorded or sent
anywhere. YouScroll only asks the browser to open and close that window; the
window itself is Chrome's, not this extension's.

## Permissions and why they exist

| Permission                  | Why                                                                                             |
| --------------------------- | ----------------------------------------------------------------------------------------------- |
| `storage`                   | Saves the settings object described above.                                                      |
| `https://www.youtube.com/*` | Lets the content script run on YouTube watch pages. This is the only site YouScroll can access. |

YouScroll requests no `tabs`, `scripting`, `webRequest`, `history`,
`cookies`, or `<all_urls>` permission, and no optional permissions. The build
fails if any host pattern in the manifest escapes `www.youtube.com`, so the
scope cannot widen by accident.

## What YouTube sees

YouScroll changes nothing about your relationship with YouTube. YouTube
continues to load, render, and log your activity exactly as it would without
the extension — including loading further pages of comments as you scroll,
which is YouTube's own code doing its own thing. Google's handling of that
activity is covered by
[Google's privacy policy](https://policies.google.com/privacy), not this one.

## Local visibility

The elements YouScroll moves stay in the ordinary page DOM, which means other
scripts running on that page can see them — exactly as they could before.
YouScroll adds no isolation and removes none.

## Children

YouScroll is a layout utility with no content of its own, no account, and no
data collection. It is not directed at children and collects nothing from
anyone regardless of age.

## Changes

Material changes to this policy will be published with a new version of the
extension and a new date at the top of this file. Any change that widened data
handling would require a manifest permission change, which is visible to you
at install or update time.

## Contact

Open an issue on the project's repository.
