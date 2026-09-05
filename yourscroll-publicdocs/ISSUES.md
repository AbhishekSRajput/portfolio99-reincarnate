# YouScroll Support

Get help with YouScroll, report a bug, or suggest an improvement through
GitHub Issues:

- [Search existing issues](https://github.com/AbhishekSRajput/public-youscroll/issues)
- [Open a new issue](https://github.com/AbhishekSRajput/public-youscroll/issues/new)

You can also contact support at <codecube99@gmail.com>.

## Before opening an issue

YouScroll only runs on `https://www.youtube.com`, and only the watch page has
anything for it to rearrange. It stands down deliberately in three cases, and
each of them looks like the extension has stopped working:

- **Theater mode and fullscreen.** YouTube reflows the page into one wide
  column, which leaves the panel nowhere sensible to live, so it steps aside.
  Press `t` or leave fullscreen and it comes back.
- **Narrow windows.** Below YouTube's own two-column breakpoint, the right
  column moves underneath the video and a full-height panel makes no sense.
  Widen the window past roughly 1020 pixels.
- **Videos with comments disabled**, and live streams, which show a chat panel
  instead of comments.

If none of those apply, reload the page and try again before reporting it.

## If the panel stopped appearing entirely

This is the failure this extension actually has. YouTube ships changes to its
page markup without notice, and when it moves something YouScroll depends on,
the panel silently stops being built.

YouScroll reports this to itself. Open the browser console on the watch page
(F12, then the Console tab) and look for a line beginning `[YouScroll]`. It
names the piece of the page that could not be found. Including that line in
an issue turns a vague report into a one-line fix, so please paste it if you
have it.

## What to include

- The YouScroll version and your Chrome version.
- Clear steps to reproduce the problem.
- What you expected and what happened instead.
- Whether the problem affects the comments panel, the tab bar, the pop-out
  button, or the settings popup.
- Any `[YouScroll]` line from the browser console.
- Your window size, if the problem looks like a layout one.

Please do not include a link to the specific video unless it is genuinely
necessary to reproduce the problem.

## Privacy and security

GitHub issues are public. Do not post personal information, private video
links, screenshots containing your account details, or other confidential
data. Send privacy requests, security reports, or support that requires
private details to <codecube99@gmail.com>.

Console output from YouScroll never contains comment text, video titles, or
channel names by design, so a `[YouScroll]` line is safe to share. Screenshots
of the page are not — check what is in the frame before attaching one.

See the [privacy policy](PRIVACY.md) for details about how YouScroll handles
data.
