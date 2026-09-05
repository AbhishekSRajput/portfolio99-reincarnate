# How to use PixelGhost tools

PixelGhost has one overlay workspace and five page-inspection tools. Open a
normal `http://` or `https://` page, then launch a tool from the popup's
**TOOLS** section or the icon rail in the on-page widget. The inspection tools
work even when you have not added an overlay layer.

## Layers

Use **Layers** to compare a reference image with the live page.

- Add images from your computer, a folder, the clipboard, or an HTTPS image
  URL. You can also use the widget's add tile or press `Ctrl+V` on the page.
- Select a layer, then drag it or adjust its X/Y position, scale, rotation,
  opacity, visibility, centering, and blend mode.
- **Lock** makes the layer click-through so you can use the page underneath; it
  does not move the layer. Hold `\` to blink the overlay off and on.

Each page's layers are autosaved for that exact URL. Save a named project when
you want to reuse the full setup on another page.

## Color Picker

Use **Color Picker** to sample and compare colors.

- Choose **Pick a color**, then select any pixel with the browser's eyedropper.
- Copy the HEX or RGB value, revisit recent picks, or use the palette PixelGhost
  extracts from the current page.
- PixelGhost temporarily hides overlay layers while this tool is open so they
  do not affect the color you read.

If the browser does not provide a system eyedropper, the pick button is
disabled and the page palette remains available.

## Page Ruler

Use **Page Ruler** to measure elements or draw your own measurement box.

- In **Element** mode, point to an element and click to pin its size and
  coordinates. Press and drag to scrub between elements on touch devices.
- In **Draw** mode, drag a rectangle, then move it or resize it from the handles.
- Press `Delete` to remove the selected measurement, or use the clear action to
  remove them all.

Measurements are temporary and are not added to saved projects.

## Inspector

Use **Inspector** to read an element's design details without opening DevTools.

- Point to an element and click to snap a card to it on the page.
- Review layout, visual, and typography values; copy the computed CSS or a
  selector when you need it in your code.
- Pause inspection to give the page its pointer back while keeping snapped
  cards visible. Element-state controls can preview CSS states the page exposes.

Some state rules in cross-origin stylesheets cannot be read; PixelGhost marks
that limitation instead of guessing.

## Element Selector

Use **Element Selector** to find and highlight groups of matching elements.

- Start with a ready-made rule or enter any valid CSS selector.
- Rename rules, switch a rule between include and exclude, and see its match
  count immediately.
- Use the previous/next controls to walk through matches, or pause highlighting
  while keeping the rule list.

Rules are saved as a preference. Match results are recalculated for each page
and are not stored.

## Screenshot

Use **Screenshot** to capture an area, an element, or the full page.

- Choose the capture type and output scale, then select the target when needed.
- Decide whether overlay layers should appear in the image. For full-page
  captures, **Pin fixed headers once** prevents repeated sticky headers.
- Save the result as a PNG or copy it. A full-page capture may scroll the page
  while it works, then restores the starting scroll position.

PixelGhost hides its own widget and tool chrome before every capture.

## Good to know

Color Picker, Inspector, and Element Selector temporarily stand overlay layers
aside so they read the page itself. Page Ruler keeps the overlay visible for
direct design comparison, and Screenshot lets you choose whether to include it.
Tool readings and captures stay local unless you choose to copy, save, or share
them.

[Back to PixelGhost](README.md) · [Get support](ISSUES.md)
