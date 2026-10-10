# 👻 How to use PixelGhost tools

PixelGhost has one overlay workspace, page-inspection tools in the on-page
widget, a Device Simulator, and a DevTools side panel. Open a normal `http://`
or `https://` page, then launch a tool from the popup's **TOOLS** section or
the icon rail in the on-page widget. The inspection tools work even when you
have not added an overlay layer.

## 🖼️ Layers

Use **Layers** to compare a reference image with the live page.

- Add images from your computer, a folder, the clipboard, or an HTTPS image
  URL. You can also use the widget's add tile or press `Ctrl/Cmd+V` on the page
  while the widget is visible and you are not editing a text field.
- Select a layer, then drag it or adjust its X/Y position, scale, rotation,
  opacity, visibility, centering, and blend mode.
- **Lock** makes the layer click-through so you can use the page underneath; it
  does not move the layer. Hold `\` to blink the overlay off and on.
- Rename a layer from either the popup or the widget, and switch the layer list
  between grid and list view.
- Type an exact rotation angle next to ORIGIN, or hold the arrows beside it for
  the same smooth sweep as the rotate buttons.
- **Protect** a layer, or every layer on the page, to stop it being deleted. The
  delete buttons in the popup and the widget disable themselves while protection
  is on.

Each page's layers are autosaved for that exact URL. Save a named project when
you want to reuse the full setup on another page.

Deletion protection covers the layer controls, not the two actions that replace
or discard a whole page of layers at once. Removing a page from **Page layer
history**, clearing the whole history, and loading a saved project over the
current layers all go ahead whether the layers are protected or not — each is a
deliberate choice you make about the whole page, not an accidental click on a
delete button.

## 🎨 Color Picker

Use **Color Picker** to sample and compare colors.

- Choose **Pick a color** (or press **Alt+Shift+C** while the tool is open),
  then select any pixel with the browser's eyedropper. The color is copied
  straight away in your chosen format — HEX, RGB, HSL or OKLCH, as ready-to-paste
  CSS. Turn **Auto-copy** off to copy only when you press a copy button.
- If the page defines a CSS variable with exactly that color, it is offered as
  `var(--name)` to copy too.
- **Compare with design** checks the page against your design: click a point on
  the page and PixelGhost shows the page's color beside the design layer's color
  at that spot, with a Match, Close or Off verdict and its ΔE difference.
- The **contrast checker** (the half-filled circle button) shows the WCAG 2
  contrast ratio of a text color on a background color and whether it passes AA
  and AAA, for normal and large text. Fill it from a pick or from any recent or
  palette color.
- Revisit recent picks — remove one with its ×, or clear them all (with Undo) —
  or use the palette PixelGhost extracts from the current page. Hover a palette
  color to see how much of the page uses it, and use **Copy as** to copy the
  whole palette as CSS variables, a Tailwind config or JSON.
- PixelGhost temporarily hides overlay layers while this tool is open so they
  do not affect the color you read.

If the browser does not provide a system eyedropper, the pick button is
disabled and the page palette remains available.

## 📏 Page Ruler

Use **Page Ruler** to measure elements or draw your own measurement box.

- In **Element** mode, point to an element and click to pin its size and
  coordinates. Press and drag to scrub between elements on touch devices.
- In **Draw** mode, drag a rectangle, then move it or resize it from the handles.
- Press `Delete` to remove the selected measurement, or use the clear action to
  remove them all.
- Use the spacing grid to check alignment. Its settings are remembered;
  drawn measurements are temporary.

Measurements are temporary and are not added to saved projects.

## 🔎 Inspector

Use **Inspector** to read an element's design details without opening DevTools.

- Point to an element and click to snap a card to it on the page.
- Review layout, visual, and typography values; copy the computed CSS or a
  selector when you need it in your code.
- Pause inspection to give the page its pointer back while keeping snapped
  cards visible. Element-state controls can preview CSS states the page exposes.
- Edit properties in the card, box model or spec preview to try changes on the
  page, then reset them. These experiments do not edit the site's source files
  and are removed when the tool releases its page effects.
- Try a local font, or type a Google Fonts family and press **Load** to fetch
  it. Loading a web font contacts Google without cookies or a referrer;
  changing a loaded family's weight or style can fetch another variant.

Some state rules in cross-origin stylesheets cannot be read; PixelGhost marks
that limitation instead of guessing.

## 🎯 Element Selector

Use **Element Selector** to find and highlight groups of matching elements. It
lives in the DevTools side panel: open it from the popup's **TOOLS** section.

- Start with a ready-made rule or enter any valid CSS selector.
- Rename rules, switch a rule between include and exclude, and see its match
  count immediately.
- Use the previous/next controls to walk through matches, or pause highlighting
  while keeping the rule list.
- Use **Pick on page** to build a selector from an element. Press `Esc` to
  cancel the pick. Inspect or export matches from the panel.

Rules are saved as a preference. Match results are recalculated for each page
and are not stored. The boxes stay on the page while the section is open, and
go when you leave it, switch tabs, or close the panel.

## 📸 Screenshot, editor and Steps

Use **Screenshot** to capture the visible page, an area, an element, or the full page.

- Choose the capture type and output scale, then select the target when needed.
- Decide whether overlay layers should appear in the image. For full-page
  captures, **Pin fixed headers once** prevents repeated sticky headers.
- Save the result as a PNG or copy it. A full-page capture may scroll the page
  while it works, then restores the starting scroll position.
- Compare **Design vs page** using the visible reference layers.
- Reopen captures from **Recent**, which keeps the last twelve locally.
  Open the screenshot editor to add numbered notes, arrows, boxes, text,
  highlights, blur or a crop, then save or copy the result.
- Add captures across pages and tabs to **Steps**, arrange them, and annotate
  them in the Steps editor. Finish by saving or copying one combined picture.
  An unfinished walkthrough expires after seven days without a new step.

Use Recent's delete/clear controls or discard a Steps walkthrough to remove
those stored pictures. Deleting them does not remove files already downloaded.

PixelGhost hides its own widget and tool chrome before every capture.

## 📱 Device Simulator

Use **Device Simulator** to see the page you are on as a phone, foldable,
tablet, or laptop shows it. Launch it from the widget's rail or the popup's
**TOOLS** section; it covers the page, and **Back to PixelGhost** (or `Esc`)
brings the page back exactly as it was, with the widget where you left it.

- Pick from the device catalog, search by name or size (`393x852`), keep
  favorites, or build your own device with its size, pixel ratio, cutout,
  frame color, and user agent.
- The page gets the viewport a visitor gets: the browser's own bars are taken
  off the screen. Turn **Browser bars** or **Device frame** off in Settings for
  the bare screen.
- Rotate, zoom, switch light and dark (the page's `prefers-color-scheme`), and
  add up to six devices side by side. Sync is off by default; turn on the link
  button to mirror scrolling and same-site navigation between devices. Your
  choice is remembered. The info button beside it explains the behavior and
  notes that it may not work on every website.
- Each frame reports its own device details to the page. The active device's
  user agent is sent on the tab's requests except top-level navigation; this
  includes background requests from the covered page while the simulator runs.
  Sites that refuse framing with `X-Frame-Options` can be previewed; a site
  whose Content-Security-Policy refuses offers **Allow framing**. These header
  exceptions apply only to frame responses from the simulated page's exact
  origin (scheme, host and port) in this tab, until the simulator closes.
- Take a screenshot of a device (with transparent corners), its screen, or all
  devices, or record a video of any of them.
- **High fidelity** uses Chrome's debugger for real touch events and touch
  media queries; Chrome shows its "started debugging" bar while it is on.
  The setting is remembered and reapplied when you reopen the simulator;
  turning it off or closing the simulator detaches the debugger.
  **Stay on after reload** reopens the simulator after a reload or navigation
  to another page of the same origin, restoring High fidelity if enabled.

Each device loads the page again, as the site's own ordinary visit with its
usual cookies. PixelGhost removes its simulation effects when you close it;
actions you perform inside a device, such as submitting a form, remain real
actions on that website.

## 🗂️ Assets

Open **Assets** in the side panel to inventory images, vectors, fonts, video,
audio and other resources exposed by the current page. Search or filter the
results, open details, and use **Show on page** to find an element. Copy or
save selected resources individually or as a ZIP.

Previews and downloads can request the resource addresses the page references.
The inventory is temporary; downloaded files remain on your device.

## 👁️ Vision

Choose a condition or profile to approximate color-vision differences, blurred
or clouded sight, and field-of-view loss. Adjust the effect while reviewing the
live page, or save a screenshot. Turn the simulation off, leave Vision or close
the panel to remove it. A same-tab reload or navigation reapplies an active
selection. These previews support design review; they are not a medical
assessment or an accessibility certification.

## 🔍 SEO

The **Page** tab checks markup such as titles, descriptions, headings, links,
image alternatives and structured data, with search and shared-link previews.
Preview images can load resources referenced by the page.

The **AI answers** tab runs only when you press **Deep scan**. It uses local,
deterministic checks and same-site crawler-file and HTML probes without cookies
or a referrer. No page text is sent to an AI service. Review the Overview,
Passages, Machine and Fixes views, or export findings. History keeps up to
twenty score records per page, without source page text; clear it from History.
Scores do not predict rankings, citations or traffic.

## 🧩 Stack

Inspect frameworks, content-management systems, libraries and services inferred
from signals the page exposes. Review versions and the dated advisory data
bundled with PixelGhost. Press **Check server** to request response headers
from the current page's address without cookies or a referrer. Detection can
be incomplete and is not a vulnerability scan. Results stay in the panel
unless you choose to export them.

## Keyboard shortcuts

Use `Ctrl` on Windows/Linux or `Command` on macOS for Ctrl/Cmd below. Normal
typing and editing keys are preserved in input fields.

| Shortcut | Action | When available |
| --- | --- | --- |
| `Alt+Shift+G` | Show or hide the widget and overlays | Browser command; customize it in extension shortcut settings |
| Hold `\` | Hide overlays until release | Visible widget and overlay |
| Arrows / `Shift+arrows` | Nudge by 1 / 10 pixels | Visible widget and overlay |
| `Ctrl/Cmd+←/→` | Rotate by 90° | Visible widget and overlay, or popup |
| Hold `Ctrl/Cmd+Shift+←/→` | Rotate smoothly | Visible widget and overlay, or popup |
| `Ctrl/Cmd+↑/↓` | Change scale by 0.01; add Shift for 0.1 | Visible widget and overlay, or popup |
| `Ctrl/Cmd+V` | Add a copied image | Popup, or page with visible widget, outside editable fields |
| `Alt+Shift+C` | Pick a screen color | Color Picker open |
| `Alt+Shift+1 / 2 / 3` | Area / visible page / full-page capture | Screenshot open |
| Arrows / `Alt+arrows` | Resize / move the capture area; Shift uses 10 pixels | Area selection active; Enter captures |
| Arrows / `Ctrl/Cmd+arrows` | Move / resize a drawn measurement; Shift uses 10 pixels | Ruler Draw mode, unpaused, with a selected measurement |
| `Delete` / `Backspace` | Remove selected drawn measurement | Ruler Draw mode, unpaused, with a selected measurement |
| `V / M / A / R / T / H / B / C` | Select / marker / arrow / rectangle / text / highlighter / blur / crop | Screenshot editor |
| `Ctrl/Cmd+Z` | Undo; Shift redoes | Screenshot editor |
| `Esc` | Exit device preview | Device Simulator |

Centered overlays cannot rotate or nudge horizontally. The browser's widget
toggle can be unassigned if another extension uses the suggested shortcut.

## 🔒 Good to know

Color Picker and Element Selector temporarily stand overlay layers aside so
they read the page itself. Inspector does the same by default; **Show design**
keeps the reference visible during inspection. Page Ruler keeps the overlay visible for
direct design comparison, and Screenshot lets you choose whether to include it.
Tool readings and captures stay local unless you choose to copy, save, or share
them.

Network requests for selected resources, fonts, previews, audits and device
frames are described in the [privacy policy](PRIVACY.md). Device frames load
the site again with its normal browser session; actions inside them are real
website actions. Scripts on the page may inspect reference content rendered
into it, so use confidential designs only on pages you trust.

[Back to PixelGhost](README.md) · [Get support](ISSUES.md)
