![YouScroll pins the YouTube comments beside the video in a panel that scrolls on its own](store-assets/large-promo-1400x560.png)

# YouScroll

YouScroll (listed in extension stores as **YouScroll: Pinned Comments for
YouTube**) is a Chrome extension that changes the layout of the YouTube watch
page. YouTube puts the comments below the player, in the same scroll as
everything else, so reading them pushes the video off the top of the screen.
YouScroll moves the comments into the right-hand column as a full-height panel
that scrolls on its own, and leaves the player where it is.

It is local-first and deliberately narrow. There is no YouScroll account, no
analytics service, no advertising SDK, and no developer-operated server. The
extension makes no network requests of its own and contains no remote code.
The only thing it stores is a small settings object: which features are
switched on, and which tab the panel opens on. See [PRIVACY.md](PRIVACY.md)
for the complete privacy policy.

This repository hosts YouScroll's public privacy policy, third-party notices,
and store listing assets. It does not contain the extension's source code.

## Features

- Move the comments into the right-hand column as a sticky, full-height pane
  that scrolls independently of the page.
- Switch between Comments and Up Next with a tab bar, so the recommendations
  are moved rather than replaced, and choose which one opens first.
- Keep YouTube's own lazy loading working inside the panel: scrolling to the
  bottom loads the next page of comments exactly as it would normally.
- Pop the video out into your browser's Picture-in-Picture window from a
  button in YouTube's own control bar, so it floats above your other
  applications.
- Toggle either feature from the toolbar popup and have it take effect
  immediately in tabs that are already open, without a reload.

YouScroll steps aside rather than fighting the page. In theater mode, in
fullscreen, and on windows too narrow for YouTube's own two-column layout, the
panel stands down and you get stock YouTube instead of a half-applied layout.

Every change the extension makes to the page carries its own undo, and
switching a feature off restores YouTube's layout exactly as it was.

## Where it runs

YouScroll runs on `https://www.youtube.com` and nowhere else. It requests no
access to any other site, to your other tabs, or to your browsing history. The
build fails if a host pattern in the manifest ever escapes that scope, so it
cannot widen by accident.

## Storage and permissions

- `chrome.storage.sync` stores one settings object: the on/off state of each
  feature and the preferred default tab. Nothing else is stored. If you are
  signed into Chrome, that object syncs between your own browsers through
  Chrome's own sync, the same way any extension setting does.
- Host access to `https://www.youtube.com/*` lets the content script move
  YouTube's own comments and recommendations containers into the panel, and
  put them back when a feature is switched off.
- YouScroll reads one piece of text from the page: the comment count, which it
  shows on the tab label of the panel it just built. It is not stored and does
  not leave the page.
- The panel and the pop-out button are ordinary elements in the page, so
  scripts running on that page can see them, exactly as they can see the rest
  of the page. YouScroll adds no isolation and removes none.
- There is no background service worker, no `tabs` permission, no `scripting`
  permission, and no optional permissions.

## Documentation

- [Support and issue reporting](ISSUES.md)
- [Privacy policy](PRIVACY.md)
- [Third-party notices](THIRD_PARTY_NOTICES.md)
- [License](LICENSE)

## Contact

Questions, privacy requests, and support: <codecube99@gmail.com>

## License

YouScroll is licensed under the Apache License 2.0. See [LICENSE](LICENSE).
Third-party components retain their own licenses as listed in
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
