import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import type { IconName } from "@/lib/content";
import { ProductIcon } from "@/components/product-icons";
import { ActionLink, DocIntro, Keys, ProductBar, Toc, pad } from "@/components/product-ui";

export const metadata: Metadata = {
  title: "How to use PixelGhost tools",
  description:
    "A guide to every PixelGhost tool: Layers, Color Picker, Page Ruler, Inspector, Element Selector, Screenshot and Steps, Device Simulator, Assets, Vision, SEO and Stack, with the complete keyboard shortcut table.",
};

// User-facing guide supplied by the author. Source: pixelghost-publicdocs/TOOLS.md
const tools = [
  { id: "layers", label: "Layers", icon: "layers", where: "Overlay workspace" },
  { id: "color-picker", label: "Color Picker", icon: "pipette", where: "On-page widget" },
  { id: "page-ruler", label: "Page Ruler", icon: "ruler", where: "On-page widget" },
  { id: "inspector", label: "Inspector", icon: "inspect", where: "On-page widget" },
  { id: "element-selector", label: "Element Selector", icon: "selector", where: "DevTools side panel" },
  { id: "screenshot", label: "Screenshot, editor and Steps", icon: "camera", where: "On-page widget" },
  { id: "device-simulator", label: "Device Simulator", icon: "devices", where: "Full-page simulator" },
  { id: "assets", label: "Assets", icon: "image", where: "DevTools side panel" },
  { id: "vision", label: "Vision", icon: "eye", where: "DevTools side panel" },
  { id: "seo", label: "SEO", icon: "search", where: "DevTools side panel" },
  { id: "stack", label: "Stack", icon: "stack", where: "DevTools side panel" },
  { id: "keyboard-shortcuts", label: "Keyboard shortcuts", icon: "keyboard", where: "Reference" },
] as const satisfies readonly { id: string; label: string; icon: IconName; where: string }[];
type ToolId = (typeof tools)[number]["id"];

const places = [
  { name: "Overlay workspace", text: "Layers, autosaved for each page." },
  { name: "On-page widget", text: "Color Picker, Page Ruler, Inspector, Screenshot." },
  { name: "Device Simulator", text: "Up to six devices, side by side." },
  { name: "DevTools side panel", text: "Element Selector, Assets, Vision, SEO, Stack." },
];

const shortcuts: readonly { keys: readonly string[]; hold?: boolean; action: string; when: string }[] = [
  { keys: ["Alt+Shift+G"], action: "Show or hide the widget and overlays", when: "Browser command; customize it in extension shortcut settings" },
  { keys: ["\\"], hold: true, action: "Hide overlays until release", when: "Visible widget and overlay" },
  { keys: ["Arrows", "Shift+arrows"], action: "Nudge by 1 / 10 pixels", when: "Visible widget and overlay" },
  { keys: ["Ctrl/Cmd+← / →"], action: "Rotate by 90°", when: "Visible widget and overlay, or popup" },
  { keys: ["Ctrl/Cmd+Shift+← / →"], hold: true, action: "Rotate smoothly", when: "Visible widget and overlay, or popup" },
  { keys: ["Ctrl/Cmd+↑ / ↓"], action: "Change scale by 0.01; add Shift for 0.1", when: "Visible widget and overlay, or popup" },
  { keys: ["Ctrl/Cmd+V"], action: "Add a copied image", when: "Popup, or page with visible widget, outside editable fields" },
  { keys: ["Alt+Shift+C"], action: "Pick a screen color", when: "Color Picker open" },
  { keys: ["Alt+Shift+1 / 2 / 3"], action: "Area / visible page / full-page capture", when: "Screenshot open" },
  { keys: ["Arrows", "Alt+arrows"], action: "Resize / move the capture area; Shift uses 10 pixels", when: "Area selection active; Enter captures" },
  { keys: ["Arrows", "Ctrl/Cmd+arrows"], action: "Move / resize a drawn measurement; Shift uses 10 pixels", when: "Ruler Draw mode, unpaused, with a selected measurement" },
  { keys: ["Delete", "Backspace"], action: "Remove selected drawn measurement", when: "Ruler Draw mode, unpaused, with a selected measurement" },
  { keys: ["V M A R T H B C"], action: "Select / marker / arrow / rectangle / text / highlighter / blur / crop", when: "Screenshot editor" },
  { keys: ["Ctrl/Cmd+Z"], action: "Undo; Shift redoes", when: "Screenshot editor" },
  { keys: ["Esc"], action: "Exit device preview", when: "Device Simulator" },
];

function Tool({ id, lead, children }: { id: ToolId; lead?: ReactNode; children: ReactNode }) {
  const index = tools.findIndex((tool) => tool.id === id);
  const tool = tools[index];
  return (
    <section id={id} className="pp-tool" aria-labelledby={`${id}-title`}>
      <div className="pp-tool-head">
        <span className="pp-tile">
          <ProductIcon name={tool.icon} size={22} />
        </span>
        <div>
          <p className="pp-eyebrow">
            {pad(index + 1)} · {tool.where}
          </p>
          <h2 id={`${id}-title`}>{tool.label}</h2>
        </div>
      </div>
      {lead && <p className="pp-lead">{lead}</p>}
      {children}
    </section>
  );
}

function Note({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="pp-note">
      <b>{title}</b>
      {children}
    </div>
  );
}

const K = ({ children }: { children: string }) => <kbd>{children}</kbd>;

export default function GuidePage() {
  return (
    <>
      <ProductBar slug="pixelghost" current="guide" />
      <main id="main-content" className="pp pp-pixelghost">
        <DocIntro
          slug="pixelghost"
          id="guide-title"
          eyebrow="Tools guide"
          title={[["How to use"], [{ text: "every tool.", serif: true, accent: true }]]}
          aside={
            <>
              Open a normal <span>http://</span> or <span>https://</span> page, then launch a tool from the
              popup’s <span>TOOLS</span> section or the icon rail in the on-page widget. The inspection
              tools work even when you have not added an overlay layer.
            </>
          }
        >
          <dl className="pp-meta pp-places">
            {places.map((place, index) => (
              <div key={place.name}>
                <dt>
                  <span className="pp-idx">{String.fromCharCode(65 + index)}</span>
                  {place.name}
                </dt>
                <dd>{place.text}</dd>
              </div>
            ))}
          </dl>
        </DocIntro>

        <div className="section-wrap pp-reading">
          <Toc label="Tools" items={tools}>
            <ActionLink href="/products/pixelghost/support/">Something not working?</ActionLink>
          </Toc>
          <article className="pp-prose is-guide" aria-labelledby="guide-title">
            <Tool id="layers" lead="Use Layers to compare a reference image with the live page.">
              <ul>
                <li>Add images from your computer, a folder, the clipboard, or an HTTPS image URL. You can also use the widget’s add tile or press <K>Ctrl/Cmd+V</K> on the page while the widget is visible and you are not editing a text field.</li>
                <li>Select a layer, then drag it or adjust its X/Y position, scale, rotation, opacity, visibility, centering, and blend mode.</li>
                <li><strong>Lock</strong> makes the layer click-through so you can use the page underneath; it does not move the layer. Hold <K>\</K> to blink the overlay off and on.</li>
                <li>Rename a layer from either the popup or the widget, and switch the layer list between grid and list view.</li>
                <li>Type an exact rotation angle next to ORIGIN, or hold the arrows beside it for the same smooth sweep as the rotate buttons.</li>
                <li><strong>Protect</strong> a layer, or every layer on the page, to stop it being deleted. The delete buttons in the popup and the widget disable themselves while protection is on.</li>
              </ul>
              <p>Each page’s layers are autosaved for that exact URL. Save a named project when you want to reuse the full setup on another page.</p>
              <Note title="Protection has limits">
                Deletion protection covers the layer controls, not the two actions that replace or discard a whole page of layers at once. Removing a page from <strong>Page layer history</strong>, clearing the whole history, and loading a saved project over the current layers all go ahead whether the layers are protected or not — each is a deliberate choice you make about the whole page, not an accidental click on a delete button.
              </Note>
            </Tool>

            <Tool id="color-picker" lead="Use Color Picker to sample and compare colors.">
              <ul>
                <li>Choose <strong>Pick a color</strong> (or press <K>Alt+Shift+C</K> while the tool is open), then select any pixel with the browser’s eyedropper. The color is copied straight away in your chosen format — HEX, RGB, HSL or OKLCH, as ready-to-paste CSS. Turn <strong>Auto-copy</strong> off to copy only when you press a copy button.</li>
                <li>If the page defines a CSS variable with exactly that color, it is offered as <code>var(--name)</code> to copy too.</li>
                <li><strong>Compare with design</strong> checks the page against your design: click a point on the page and PixelGhost shows the page’s color beside the design layer’s color at that spot, with a Match, Close or Off verdict and its ΔE difference.</li>
                <li>The <strong>contrast checker</strong> (the half-filled circle button) shows the WCAG 2 contrast ratio of a text color on a background color and whether it passes AA and AAA, for normal and large text. Fill it from a pick or from any recent or palette color.</li>
                <li>Revisit recent picks — remove one with its ×, or clear them all (with Undo) — or use the palette PixelGhost extracts from the current page. Hover a palette color to see how much of the page uses it, and use <strong>Copy as</strong> to copy the whole palette as CSS variables, a Tailwind config or JSON.</li>
                <li>PixelGhost temporarily hides overlay layers while this tool is open so they do not affect the color you read.</li>
              </ul>
              <p>If the browser does not provide a system eyedropper, the pick button is disabled and the page palette remains available.</p>
            </Tool>

            <Tool id="page-ruler" lead="Use Page Ruler to measure elements or draw your own measurement box.">
              <ul>
                <li>In <strong>Element</strong> mode, point to an element and click to pin its size and coordinates. Press and drag to scrub between elements on touch devices.</li>
                <li>In <strong>Draw</strong> mode, drag a rectangle, then move it or resize it from the handles.</li>
                <li>Press <K>Delete</K> to remove the selected measurement, or use the clear action to remove them all.</li>
                <li>Use the spacing grid to check alignment. Its settings are remembered; drawn measurements are temporary.</li>
              </ul>
              <p>Measurements are temporary and are not added to saved projects.</p>
            </Tool>

            <Tool id="inspector" lead="Use Inspector to read an element’s design details without opening DevTools.">
              <ul>
                <li>Point to an element and click to snap a card to it on the page.</li>
                <li>Review layout, visual, and typography values; copy the computed CSS or a selector when you need it in your code.</li>
                <li>Pause inspection to give the page its pointer back while keeping snapped cards visible. Element-state controls can preview CSS states the page exposes.</li>
                <li>Edit properties in the card, box model or spec preview to try changes on the page, then reset them. These experiments do not edit the site’s source files and are removed when the tool releases its page effects.</li>
                <li>Try a local font, or type a Google Fonts family and press <strong>Load</strong> to fetch it. Loading a web font contacts Google without cookies or a referrer; changing a loaded family’s weight or style can fetch another variant.</li>
              </ul>
              <p>Some state rules in cross-origin stylesheets cannot be read; PixelGhost marks that limitation instead of guessing.</p>
            </Tool>

            <Tool
              id="element-selector"
              lead={
                <>
                  Use Element Selector to find and highlight groups of matching elements. It lives in the DevTools side panel: open it from the popup’s <strong>TOOLS</strong> section.
                </>
              }
            >
              <ul>
                <li>Start with a ready-made rule or enter any valid CSS selector.</li>
                <li>Rename rules, switch a rule between include and exclude, and see its match count immediately.</li>
                <li>Use the previous/next controls to walk through matches, or pause highlighting while keeping the rule list.</li>
                <li>Use <strong>Pick on page</strong> to build a selector from an element. Press <K>Esc</K> to cancel the pick. Inspect or export matches from the panel.</li>
              </ul>
              <p>Rules are saved as a preference. Match results are recalculated for each page and are not stored. The boxes stay on the page while the section is open, and go when you leave it, switch tabs, or close the panel.</p>
            </Tool>

            <Tool id="screenshot" lead="Use Screenshot to capture the visible page, an area, an element, or the full page.">
              <ul>
                <li>Choose the capture type and output scale, then select the target when needed.</li>
                <li>Decide whether overlay layers should appear in the image. For full-page captures, <strong>Pin fixed headers once</strong> prevents repeated sticky headers.</li>
                <li>Save the result as a PNG or copy it. A full-page capture may scroll the page while it works, then restores the starting scroll position.</li>
                <li>Compare <strong>Design vs page</strong> using the visible reference layers.</li>
                <li>Reopen captures from <strong>Recent</strong>, which keeps the last twelve locally. Open the screenshot editor to add numbered notes, arrows, boxes, text, highlights, blur or a crop, then save or copy the result.</li>
                <li>Add captures across pages and tabs to <strong>Steps</strong>, arrange them, and annotate them in the Steps editor. Finish by saving or copying one combined picture. An unfinished walkthrough expires after seven days without a new step.</li>
              </ul>
              <p>Use Recent’s delete/clear controls or discard a Steps walkthrough to remove those stored pictures. Deleting them does not remove files already downloaded.</p>
              <p>PixelGhost hides its own widget and tool chrome before every capture.</p>
            </Tool>

            <Tool
              id="device-simulator"
              lead={
                <>
                  Use Device Simulator to see the page you are on as a phone, foldable, tablet, or laptop shows it. Launch it from the widget’s rail or the popup’s <strong>TOOLS</strong> section; it covers the page, and <strong>Back to PixelGhost</strong> (or <K>Esc</K>) brings the page back exactly as it was, with the widget where you left it.
                </>
              }
            >
              <ul>
                <li>Pick from the device catalog, search by name or size (<code>393x852</code>), keep favorites, or build your own device with its size, pixel ratio, cutout, frame color, and user agent.</li>
                <li>The page gets the viewport a visitor gets: the browser’s own bars are taken off the screen. Turn <strong>Browser bars</strong> or <strong>Device frame</strong> off in Settings for the bare screen.</li>
                <li>Rotate, zoom, switch light and dark (the page’s <code>prefers-color-scheme</code>), and add up to six devices side by side. Sync is off by default; turn on the link button to mirror scrolling and same-site navigation between devices. Your choice is remembered. The info button beside it explains the behavior and notes that it may not work on every website.</li>
                <li>Each frame reports its own device details to the page. The active device’s user agent is sent on the tab’s requests except top-level navigation; this includes background requests from the covered page while the simulator runs. Sites that refuse framing with <code>X-Frame-Options</code> can be previewed; a site whose Content-Security-Policy refuses offers <strong>Allow framing</strong>. These header exceptions apply only to frame responses from the simulated page’s exact origin (scheme, host and port) in this tab, until the simulator closes.</li>
                <li>Take a screenshot of a device (with transparent corners), its screen, or all devices, or record a video of any of them.</li>
                <li><strong>High fidelity</strong> uses Chrome’s debugger for real touch events and touch media queries; Chrome shows its “started debugging” bar while it is on. The setting is remembered and reapplied when you reopen the simulator; turning it off or closing the simulator detaches the debugger. <strong>Stay on after reload</strong> reopens the simulator after a reload or navigation to another page of the same origin, restoring High fidelity if enabled.</li>
              </ul>
              <Note title="Real actions stay real">
                Each device loads the page again, as the site’s own ordinary visit with its usual cookies. PixelGhost removes its simulation effects when you close it; actions you perform inside a device, such as submitting a form, remain real actions on that website.
              </Note>
            </Tool>

            <Tool id="assets">
              <p>Open <strong>Assets</strong> in the side panel to inventory images, vectors, fonts, video, audio and other resources exposed by the current page. Search or filter the results, open details, and use <strong>Show on page</strong> to find an element. Copy or save selected resources individually or as a ZIP.</p>
              <p>Previews and downloads can request the resource addresses the page references. The inventory is temporary; downloaded files remain on your device.</p>
            </Tool>

            <Tool id="vision">
              <p>Choose a condition or profile to approximate color-vision differences, blurred or clouded sight, and field-of-view loss. Adjust the effect while reviewing the live page, or save a screenshot. Turn the simulation off, leave Vision or close the panel to remove it. A same-tab reload or navigation reapplies an active selection.</p>
              <Note title="An approximation">
                These previews support design review; they are not a medical assessment or an accessibility certification.
              </Note>
            </Tool>

            <Tool id="seo">
              <p>The <strong>Page</strong> tab checks markup such as titles, descriptions, headings, links, image alternatives and structured data, with search and shared-link previews. Preview images can load resources referenced by the page.</p>
              <p>The <strong>AI answers</strong> tab runs only when you press <strong>Deep scan</strong>. It uses local, deterministic checks and same-site crawler-file and HTML probes without cookies or a referrer. No page text is sent to an AI service. Review the Overview, Passages, Machine and Fixes views, or export findings. History keeps up to twenty score records per page, without source page text; clear it from History. Scores do not predict rankings, citations or traffic.</p>
            </Tool>

            <Tool id="stack">
              <p>Inspect frameworks, content-management systems, libraries and services inferred from signals the page exposes. Review versions and the dated advisory data bundled with PixelGhost. Press <strong>Check server</strong> to request response headers from the current page’s address without cookies or a referrer. Detection can be incomplete and is not a vulnerability scan. Results stay in the panel unless you choose to export them.</p>
            </Tool>

            <Tool id="keyboard-shortcuts">
              <p>Use <K>Ctrl</K> on Windows/Linux or <K>Command</K> on macOS for Ctrl/Cmd below. Normal typing and editing keys are preserved in input fields.</p>
              <div className="pp-table-wrap">
                <table className="pp-table pp-shortcuts">
                  <caption className="pp-sr">Complete PixelGhost keyboard shortcuts</caption>
                  <thead>
                    <tr>
                      <th scope="col">Shortcut</th>
                      <th scope="col">Action</th>
                      <th scope="col">When available</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shortcuts.map((shortcut) => (
                      <tr key={shortcut.action}>
                        <td>
                          {shortcut.hold && <span className="pp-hold">Hold</span>}
                          <Keys keys={shortcut.keys} />
                        </td>
                        <td>{shortcut.action}</td>
                        <td>{shortcut.when}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>Centered overlays cannot rotate or nudge horizontally. The browser’s widget toggle can be unassigned if another extension uses the suggested shortcut.</p>
            </Tool>

            <section id="good-to-know" className="pp-tool" aria-labelledby="good-to-know-title">
              <div className="pp-paper-card pp-know">
                <p className="pp-eyebrow">Good to know</p>
                <h2 id="good-to-know-title">What the tools leave alone.</h2>
                <p>Color Picker and Element Selector temporarily stand overlay layers aside so they read the page itself. Inspector does the same by default; <strong>Show design</strong> keeps the reference visible during inspection. Page Ruler keeps the overlay visible for direct design comparison, and Screenshot lets you choose whether to include it. Tool readings and captures stay local unless you choose to copy, save, or share them.</p>
                <p>Network requests for selected resources, fonts, previews, audits and device frames are described in the <Link href="/products/pixelghost/privacy/">privacy policy</Link>. Device frames load the site again with its normal browser session; actions inside them are real website actions. Scripts on the page may inspect reference content rendered into it, so use confidential designs only on pages you trust.</p>
              </div>
              <div className="pp-doc-links">
                <ActionLink href="/products/pixelghost/">Back to PixelGhost</ActionLink>
                <ActionLink href="/products/pixelghost/support/">Get support</ActionLink>
              </div>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
