![PixelGhost pixel-perfect design QA with multi-layer overlays](store-assets/large-promo-1400x560.png)

# PixelGhost

Listed in the Chrome Web Store as **PixelGhost - Pixel Perfect Design Overlay, Screenshots & Visual QA**.

👻 Small details. Better page reviews.

PixelGhost brings visual comparison, screenshots and page inspection into one free browser toolkit. Place your mockup over the live page to spot differences in spacing, color and alignment.

⌨️ **Show or hide the widget: `Alt+Shift+G`.**

## 🖼️ Compare with precision

Add reference images from files, folders, your clipboard or an HTTPS link. Work with multiple layers, adjust position, scale and rotation, then use opacity and blend modes to reveal mismatches.

## 📸 Capture the details

Screenshot a full page, visible area or element. Add arrows, notes, highlights and blur, or crop in the editor. Combine captures into a Steps walkthrough and save or copy the finished picture.

## 🛠️ Work right on the page

- 🎨 **Color Picker:** sample colors, explore page palettes and check contrast.
- 📏 **Page Ruler:** measure elements, spacing and alignment.
- 🔎 **Inspector:** read computed styles, inspect the box model and try temporary CSS or font changes.

## 📱 Preview more screens

Compare up to six device frames side by side. Rotate, sync scrolling and save screenshots or video. Previews run in your desktop browser and do not replace real-device testing.

## 🧭 Look beneath the design

- 📦 **Assets:** find and save images, icons, fonts and media.
- 👁️ **Vision:** preview color-vision and sight-loss effects.
- 🔍 **SEO:** review metadata, headings, links, structured data and search/share previews. Run the separate AI answers Deep scan for answer-engine readiness.
- 🧩 **Stack:** detect frameworks, CMS platforms and libraries from page signals.
- 🎯 **Element Selector:** find, highlight and export CSS selector matches.

## 💾 Pick up where you left off

Save named projects and restore references and settings for each saved page URL. Keep working from the floating widget with the popup closed. Page tools also work without a reference.

## 🎁 Every feature is free

No account, paid tier or trial. Choose light or dark mode, five accent colors and an interface in eight languages.

## 🔒 Local-first by design

Workspaces, preferences, captures and score histories stay in your browser profile. No PixelGhost analytics, ads, tracking or uploads to an operator or AI analysis server.

Selected images, fonts, previews and site checks still make web requests. Device frames load the site with its usual browser session. Page scripts may inspect references displayed on that page. See the [privacy policy](PRIVACY.md) for permissions, retention and deletion details.

## ℹ️ Good to know

Protected browser pages are unsupported; framing restrictions can limit device previews. Vision effects are approximations, not medical assessments or accessibility certification. AI answers uses a local, deterministic rubric with same-site probes; scores do not predict rankings or citations. Stack detection can be incomplete and is not a vulnerability scan.

## ⌨️ Keyboard shortcuts

- `Alt+Shift+G` shows or hides the widget and overlays. Change this binding in
  your browser's extension shortcut settings.
- Hold `\` to hide the reference temporarily. Arrows nudge by 1 pixel; add
  `Shift` for 10 pixels.
- `Ctrl/Cmd+V` adds a copied image in the popup or on the page while the widget
  is visible, outside editable fields.
- With Color Picker open, `Alt+Shift+C` starts the screen eyedropper.
- With Screenshot open, `Alt+Shift+1` selects an area, `Alt+Shift+2` captures
  the visible page, and `Alt+Shift+3` captures the full page.

On-page nudge, rotate, scale and blink shortcuts need a visible widget and
overlay. Centered mode disables rotation and horizontal nudges. Use `Ctrl` on
Windows/Linux or `Command` on macOS for the Ctrl/Cmd actions. See the
[tools guide](TOOLS.md#keyboard-shortcuts) for the complete shortcut table.

## 🔒 Storage and permissions

- IndexedDB stores URL-keyed workspaces, images and named projects, the last
  twelve screenshots, a Steps walkthrough in progress, and up to twenty SEO
  deep-scan results per page. Scan history retains scores and check results,
  not page text or fetched files.
- Local extension storage holds consent, display and tool preferences, recent
  colors, selector rules and custom devices. Session storage holds temporary
  tool state and report handoffs. Recordings are saved to your device and are
  not retained in the extension.
- Page access and `scripting` let the tools inspect supported HTTP/HTTPS pages
  and render overlays; `<all_urls>` also enables visible-tab screenshots.
  `storage` saves local state, and `sidePanel` opens the Chromium panel.
- Rendered overlay elements and widget data live in the current page DOM while
  active and may be inspectable by scripts on that page. Use confidential
  designs only on pages you trust.
- Clipboard read access is optional and requested only when the user selects
  the **Paste** action. Ordinary `Ctrl+V` paste remains available without the
  optional permission.
- The Device Simulator uses `declarativeNetRequestWithHostAccess` for session
  rules in its tab. Framing exceptions apply to the simulated page's exact
  origin; removing Content-Security-Policy additionally requires **Allow
  framing**. The active device's user agent applies to the tab's requests
  except top-level navigation while the simulator runs.
- `tabCapture` supplies recordings when Chrome grants access to that tab;
  otherwise Chrome's sharing prompt is used. `debugger` supplies touch
  emulation when **High fidelity** is enabled. That setting is remembered on
  later simulator launches; turning it off or closing the simulator detaches
  the debugger. Closing also removes the simulator's network rules.

## 📚 Documentation

This repository hosts PixelGhost's public tools guide, privacy policy,
third-party notices, and store listing assets. It does not contain the
extension's source code.

- [How to use PixelGhost tools](TOOLS.md)
- [Support and issue reporting](ISSUES.md)
- [Privacy policy](PRIVACY.md)
- [Third-party notices](THIRD_PARTY_NOTICES.md)

## Contact

Questions, privacy requests, and support: <codecube99@gmail.com>

## License

PixelGhost is licensed under the Apache License 2.0. See [LICENSE](LICENSE).
Third-party components retain their own licenses as listed in
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
