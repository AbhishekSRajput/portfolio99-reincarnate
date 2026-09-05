export const profile = {
  brand: "codecube99",
  email: "codecube99@gmail.com",
  github: "https://github.com/AbhishekSRajput",
} as const;

export const projects = [
  {
    slug: "pixelghost",
    name: "PixelGhost",
    year: "2026",
    category: "DESIGN ENGINEERING",
    description:
      "The gap between your design and your build? Make it visible. A precision overlay and inspection toolkit for any webpage.",
    tagline: "Every pixel. Accounted for.",
    detail:
      "Drop a design mockup over your live page and see exactly where spacing, type, alignment, and color drift. Inspect and adjust without breaking your flow.",
    tags: ["Visual QA", "Design tools"],
    visualCaption: "THE DETAILS MAKE THE DIFFERENCE.",
    storeUrl:
      "https://chromewebstore.google.com/detail/mepnnfhnajemjfmokolghpdmljeakkfg?utm_source=portfolio",
    sourceUrl: null,
    features: [
      {
        title: "See the difference",
        description:
          "Place your mockup directly over the page. Adjust its opacity and position to compare the intended design with the implementation.",
      },
      {
        title: "Inspect in context",
        description:
          "Check spacing, typography, and color without leaving the page you’re working on.",
      },
      {
        title: "Stay in control",
        description:
          "Use the extension without an account or a paid tier. The complete toolkit is free.",
      },
    ],
  },
  {
    slug: "youscroll",
    name: "YouScroll",
    year: "2025",
    category: "EVERYDAY UTILITY",
    description:
      "Watch the video. Wander through the comments. Independent scrolling that makes YouTube feel a little more like an app.",
    tagline: "Keep watching. Keep exploring.",
    detail:
      "Scroll YouTube comments and Up Next independently beside the video, without moving the whole page. A small change that makes the everyday experience feel better.",
    tags: ["YouTube", "Better browsing"],
    visualCaption: "ONE SMALL CHANGE. A BETTER FLOW.",
    storeUrl:
      "https://chromewebstore.google.com/detail/ajdjgkbpinaphnaonpamebhalgohphma?utm_source=portfolio",
    sourceUrl: null,
    features: [
      {
        title: "Keep the video in view",
        description:
          "Explore the surrounding conversation without scrolling the video off the screen.",
      },
      {
        title: "Give comments their own space",
        description:
          "Read the discussion in an independent scroll region while the rest of the page stays put.",
      },
      {
        title: "Browse what’s next",
        description:
          "Move through Up Next independently. Find the next video without losing your place.",
      },
    ],
  },
] as const;

export type FieldGuideChapter = {
  id: string;
  name: string;
  purpose: string;
  steps: readonly string[];
  note?: string;
  topics?: readonly {
    title: string;
    description?: string;
    items: readonly { label: string; text: string }[];
  }[];
  shortcutGroups?: readonly {
    title: string;
    note?: string;
    shortcuts: readonly {
      keys: readonly string[];
      action: string;
      detail?: string;
    }[];
  }[];
};

// User-facing behavior from ghost-layer-reincarnate/CONTRIBUTING.md and
// docs/public-docs/TOOLS.md, checked against the current popup/widget controls.
// Keep private contributor processes and implementation details out of this copy.
export const pixelGhostFieldGuide = [
  {
    id: "launch-widget",
    name: "Launch & widget",
    purpose: "Start from the browser toolbar. Keep working on the page.",
    steps: [
      "Open a normal HTTP or HTTPS webpage, then click PixelGhost in your browser toolbar. On first use, read the privacy disclosure, choose your language if needed, and select Enable PixelGhost.",
      "Add a reference image to open the Layers workspace, or launch any inspection tool from the popup’s TOOLS section. You do not need an image to inspect a page.",
      "Use Alt+Shift+G to show or hide the widget and its overlay. This is the suggested browser shortcut; check Settings → Keyboard shortcut if it is unassigned or you want a different combination.",
    ],
    topics: [
      {
        title: "Choose your way in",
        items: [
          { label: "Browser toolbar", text: "The PixelGhost icon opens the popup, where you import images, choose layers, manage projects, and launch tools. Transform controls live in the on-page widget. The toolbar icon changes from gray to colored when a tab reports an active overlay; a gray icon does not by itself mean the page is unsupported." },
          { label: "Show Widget / Hide Widget", text: "The popup header toggles an existing page workspace. This button needs a supported page and at least one layer. To summon an empty widget, use the browser shortcut or launch an inspection tool instead." },
          { label: "TOOLS launcher", text: "Color, Ruler, Inspector, Element, and Capture open their matching widget panels, even with no layers. Inspector and Capture close the popup so it does not cover your target; the other tools leave it open. Inspection tools are labelled Beta." },
          { label: "Conjure", text: "The widget’s Conjure button reopens the popup. If your browser blocks that action, use the PixelGhost toolbar icon." },
        ],
      },
      {
        title: "Arrange the widget",
        items: [
          { label: "Move it", text: "Drag the header or brand mark to move the widget within the viewport. It snaps flush to nearby viewport edges. Dragging a control changes that control instead of moving the whole panel." },
          { label: "Minimize or expand", text: "Use the minus/plus control to collapse or expand the panel. The tool rail remains available while minimized; Layers also keeps its Show, Lock, and blend controls within reach." },
          { label: "Switch tools", text: "Use the icon rail below the active panel to choose Layers, Color Picker, Page Ruler, Inspector, Element Selector, or Screenshot. The rail has its own collapse control." },
          { label: "Hide and return", text: "The widget’s ×, the popup header, and the assigned browser shortcut hide both the widget and overlay. For a page with saved layers, this dismissal survives reloads. Show the widget again, select a layer, load a project, or successfully add an image to bring it back." },
          { label: "A fresh visit", text: "The widget normally returns to Layers after a reload or when a hidden workspace is revealed; launching a particular tool opens that tool. A widget summoned without any layers is temporary and disappears on reload or a page-route change. Widget position and the selected tool reset on page load." },
        ],
      },
    ],
    note: "The browser shortcut toggles the widget, not the popup. It does nothing before first-use consent or on a browser-restricted page. Unlike page editing shortcuts, it still works while a text field has focus.",
  },
  {
    id: "add-layers",
    name: "Add reference images",
    purpose: "Bring a design in from wherever you keep it.",
    steps: [
      "Choose an import method in the popup, or use the widget’s add tile. You can import several images together and switch between them afterward.",
      "The first newly added image becomes selected. An image wider than the viewport is fitted to its width once; a smaller image starts at its natural size. Each layer then keeps its own position and scale.",
    ],
    topics: [
      {
        title: "Every way to add an image",
        items: [
          { label: "Upload", text: "Choose one or several image files in the file picker. The add tile in either the popup or widget opens a file picker too." },
          { label: "Folder", text: "Choose a folder to add its image files together. Non-image files are skipped." },
          { label: "Drag and drop", text: "Drop one or several image files onto the popup’s layer grid or the widget’s layer grid. Dropping files imports them; it does not reorder existing layers." },
          { label: "HTTPS image URL", text: "Select URL, enter a direct HTTPS image address, then choose Add or press Enter. Escape closes the URL field. Addresses containing a username or password, and non-HTTPS addresses, are rejected." },
          { label: "Paste button", text: "Choose Paste to read an image from the clipboard. The browser may ask for optional clipboard-read permission. You can decline and use ordinary keyboard paste or another import method." },
          { label: "Keyboard paste", text: "Press Ctrl+V in the popup outside a text field, or on the page while the widget is visible. An empty visible widget can receive pasted images too. Pasting an image while another tool is open returns to Layers. On the page, pasting while the widget is hidden or absent does not import a layer; popup paste can import and reveal it." },
        ],
      },
      {
        title: "Before importing",
        items: [
          { label: "Supported images", text: "Local imports accept files the browser identifies as images, such as PNG, JPEG, GIF, WebP, and SVG. Actual rendering depends on browser format support. Large images use your browser’s memory and storage." },
          { label: "Image endpoints", text: "A URL without a familiar image extension can still be valid. PixelGhost warns about it but allows the import, because an image server does not have to end its address in .png or .jpg." },
          { label: "Text stays text", text: "Paste in a page input, an editable page region, or a widget field keeps its ordinary editing behavior. Non-image clipboard content does not become a layer." },
          { label: "Remote and confidential images", text: "An HTTPS reference is requested directly from its chosen host. Displayed overlays can be inspected by scripts on the page, so use confidential references only on pages you trust." },
        ],
      },
    ],
    note: "The initial fit is to the viewport’s width, not its height. A long screenshot can extend below the visible page. Selecting a different layer or reloading does not overwrite a scale you already set.",
  },
  {
    id: "layers",
    name: "Manage layers",
    purpose: "Keep references organized and protect the work you want to keep.",
    steps: [
      "Select a layer’s thumbnail or row in the popup or widget. PixelGhost stores multiple reference layers, but displays the selected reference one at a time.",
      "Use the grid/list button to choose a thumbnail grid or compact list. Rename important references so you can find the right one later.",
    ],
    topics: [
      {
        title: "Selection and names",
        items: [
          { label: "Switch references", text: "Choosing a different tile selects and shows that image while leaving the others available in the list. The chosen reference restores its own X/Y position and scale." },
          { label: "Rename", text: "Use the rename control in either layout. Enter or leaving the field saves the trimmed name; Escape cancels. Renaming does not change the original image." },
          { label: "Show / Hide", text: "The eye control changes whether the selected reference is shown. Hiding an image is separate from deleting it." },
          { label: "Lock / Unlock", text: "Lock makes the overlay click-through, so links, controls, and scrolling on the page underneath work normally. It keeps the image’s position unchanged. Widget controls and keyboard nudges can still adjust a locked overlay." },
        ],
      },
      {
        title: "Deletion protection",
        items: [
          { label: "Protect a layer", text: "Turn on a layer’s shield to disable its delete control and prevent a delete-all operation from discarding it. You can still show, lock, move, and transform protected layers." },
          { label: "Protect all", text: "The page-wide shield disables deletion for every layer. Switching it off preserves any shields you set individually. Individual protection travels with a saved project; page-wide protection belongs to the current page." },
          { label: "Remove one or all", text: "Use a layer’s delete control to remove it, or the widget’s trash control to remove all current layers when none is protected. Deleting every layer from the widget keeps the empty widget and add tile available." },
          { label: "Current-page Clear", text: "The popup’s Clear button removes that page’s layers and dismisses its widget. It leaves other page workspaces alone. If any layer is protected, the delete-all/Clear controls are disabled." },
          { label: "What protection does not cover", text: "Loading a saved project replaces the current page’s layers even when they are protected. Removing a URL from Layers History or clearing that history also bypasses layer protection. Save a named snapshot first if you want to retain the current setup." },
        ],
      },
    ],
    note: "Lock controls whether the page receives pointer input. Protect controls whether layer-delete buttons can remove your work. They are separate controls, and neither creates a backup.",
  },
  {
    id: "transform-layers",
    name: "Position & compare",
    purpose: "Align the reference, then make the differences easier to see.",
    steps: [
      "Open Layers in the widget and select a reference. Drag an unlocked overlay on the page, or enter coordinates in X and Y for precise placement.",
      "Set the scale, rotation, and comparison appearance. Use the keyboard reference below for coarse steps, fine adjustments, and press-and-hold controls.",
    ],
    topics: [
      {
        title: "Position, scale, and reset",
        items: [
          { label: "Document coordinates", text: "An overlay stays with the page content as you scroll. Its X/Y values describe its document position, so scrolling does not change them. Locking and unlocking do not snap the reference back into view." },
          { label: "Move precisely", text: "The directional pad or page-focused arrow keys nudge by 1 px; hold Shift for 10 px. X/Y fields accept signed whole numbers. With a field focused, Up/Down adjusts that field by 1; Shift+Up/Down changes it by 10." },
          { label: "Scale", text: "Use the Scale field to resize the selected reference: 1 is natural size, 0.5 is half size, and 2 is double size. Values range from 0.01 to 20. Ctrl+Up/Down changes scale by 0.01; add Shift for 0.1. There are no corner-resize handles on reference images." },
          { label: "Horizontal centering", text: "The ✦ control centers the layer horizontally at its current scale, resets rotation to 0°, and disables X/left-right movement and rotation. Y and scale remain editable; dragging moves vertically. Turning centering off leaves the image where it is." },
          { label: "RESET", text: "Reset places the selected layer at the current viewport’s top-left and returns its scale to 1. It also restores opacity to 50%, rotation to 0°, and turns centering off. Other layers retain their own positions and scales. Blend mode and interaction lock are not reset." },
        ],
      },
      {
        title: "Rotation",
        items: [
          { label: "Quarter turns", text: "Rotate-left and rotate-right change the current angle by 90°. A quarter turn adds to a fractional angle rather than snapping it to a multiple of 90°. The same actions use Ctrl+Left/Right." },
          { label: "Fine rotation", text: "Tap a fine-rotate button for 0.1°. Hold it for an accelerating sweep, then release to stop. Ctrl+Shift+Left/Right provides the same fine adjustment and hold behavior." },
          { label: "Exact angle", text: "Click the angle badge beside ORIGIN and type a nonnegative decimal angle. Changes appear immediately. Enter or leaving the editor finishes; Escape restores the angle you started with. Values above 360 wrap around; blank or unfinished input keeps the last valid angle. Negative or nonnumeric input is rejected." },
          { label: "Angle-editor arrows", text: "With the angle editor focused, Up/Down or its visible arrow buttons change the angle by 0.1°. Holding accelerates rotation. Release or leaving the editor stops it. Centered mode disables all rotation controls." },
        ],
      },
      {
        title: "Opacity, blink, and blend modes",
        items: [
          { label: "Opacity", text: "Set transparency from 0–100% with the slider. Over an unlocked visible reference, wheel up increases opacity and wheel down decreases it by 5 percentage points. Hold Alt for 1-point steps. Ctrl+wheel keeps browser zoom; scrolling outside the reference or over a locked reference scrolls the page." },
          { label: "Blink comparison", text: "Hold the backslash key (\\) on the page, or press and hold the widget’s blink control, to hide the reference temporarily. Release to restore the same opacity. The on-screen hold control also responds to Space or Enter while focused." },
          { label: "Normal", text: "Displays the reference as supplied, with your chosen opacity. Start here to compare placement, spacing, and typography." },
          { label: "Invert", text: "Reverses the reference’s colors to create a different visual contrast against the page." },
          { label: "Difference", text: "Compares reference and page colors so differences stand out. It is a visual comparison aid, not an automatic pass/fail test." },
          { label: "Multiply", text: "Darkens the combination of the reference and page, which can help compare outlines and overlapping shapes." },
          { label: "Overlay", text: "Blends light and dark areas with the underlying page to emphasize contrast." },
        ],
      },
    ],
    note: "Position and scale belong to each layer. Opacity, blend mode, rotation, horizontal centering, and click-through lock are workspace settings that carry across layer selections. Layer keyboard shortcuts leave editable fields alone and pause when an inspection tool has temporarily hidden the reference.",
  },
  {
    id: "saved-workspaces",
    name: "Projects & page history",
    purpose: "Resume a page automatically. Save a setup to use somewhere else.",
    steps: [
      "Page changes autosave as you work, including edits made with the popup closed. Revisit the same page to restore its references and comparison settings.",
      "For a reusable snapshot, add at least one layer, enter a project name in the popup, and select Save or press Enter in that field.",
    ],
    topics: [
      {
        title: "Save and revisit projects",
        items: [
          { label: "Create a snapshot", text: "Save needs at least one layer and a nonblank name. Each save creates a new snapshot, even if you reuse a name; it does not overwrite an earlier project. The name field clears after saving." },
          { label: "Load a project", text: "Click a saved-project row to load its references and settings onto the current page. This replaces the current layers and reveals the widget. Saved per-layer positions and scales are restored instead of being refitted just because the window size changed." },
          { label: "Search and sort", text: "Open the magnifier to search project names; matching ignores letter case. Closing search clears its filter. Use Newest / Name to change the ordering. Rows show each project’s layer count and date." },
          { label: "Delete a snapshot", text: "The × on a saved-project row deletes that named snapshot only. It does not load it or remove the layers currently shown on the page." },
        ],
      },
      {
        title: "Understand page history",
        items: [
          { label: "Which page is remembered?", text: "The workspace key includes the page address and query parameters but excludes its #fragment. Two different query strings have separate setups; two anchors on the same page share one." },
          { label: "Layers History", text: "The popup lists autosaved page URLs, newest first. These rows identify saved setups; they are not navigation links. Revisit an address normally to restore its workspace." },
          { label: "Remove a page", text: "The × beside a history entry removes that URL’s saved layers. Removing the current page also clears its live layers. Removing another URL deletes its saved record." },
          { label: "Clear history", text: "The history trash control deletes all autosaved page setups and clears the active page. Named projects remain. History deletion leaves the empty widget available; the popup’s current-page Clear additionally dismisses that page’s widget." },
          { label: "Separate lifetimes", text: "A named project is a reusable snapshot, not a continuously updated copy of the page. Clearing page history does not delete named projects, reset every preference, or clear all extension storage." },
        ],
      },
    ],
    note: "Project loading and history deletion are whole-page actions and still work when layers are protected. Stored work lives in this browser profile; PixelGhost does not intentionally synchronize it between devices. Clearing extension data, resetting the profile, or uninstalling can remove it.",
  },
  {
    id: "color-picker",
    name: "Color Picker",
    purpose: "Sample a pixel, reuse a recent pick, or inspect the page palette.",
    steps: [
      "Open Color in the popup or Color Picker in the widget. The reference temporarily steps aside so you can read the page underneath.",
      "Select Pick a color and choose a pixel with the browser’s native eyedropper. Escape cancels the pick without replacing the selected color.",
      "Copy the HEX or RGB row, or select a Recent or Palette swatch to preview it and immediately copy its HEX value.",
    ],
    topics: [
      {
        title: "Read and reuse colors",
        items: [
          { label: "HEX and RGB", text: "The large preview shows your selected color. Use either value row to copy the format you need; Copied confirms a successful clipboard write." },
          { label: "Recent", text: "The last 12 unique colors sampled with the picker are kept newest first, survive reloads, and update across tabs. Selecting an existing swatch does not add it again or reorder this history." },
          { label: "Palette", text: "The tool builds a palette from the page’s rendered styles whenever Color opens. It can show up to 16 sampled colors, with neutral shades ordered dark to light. A sparse or monochrome page may provide fewer. This is not an extraction of every color from photographs." },
          { label: "Refresh the palette", text: "Leave and reopen Color after changing a page’s styling. An in-page route change also refreshes the palette while the tool is open. Opening the palette does not save those colors into Recent." },
          { label: "Keep your comparison", text: "Leaving Color returns the reference with its previous selection, position, and opacity. Layer arrows, wheel-opacity, and blink do not adjust a reference temporarily hidden by this tool. Pasting an image still works and returns to Layers." },
        ],
      },
    ],
    note: "A browser without a native eyedropper disables Pick a color and explains why. The page palette and existing color values remain available.",
  },
  {
    id: "page-ruler",
    name: "Page Ruler",
    purpose: "Measure a real element or draw the space you want to check.",
    steps: [
      "Choose Element or Draw in Page Ruler. The reference stays visible so you can compare the measurement directly with your design.",
      "In Element mode, hover a page element to preview its box, then click to pin it. In Draw mode, drag to create a measuring rectangle.",
      "Pause measuring to use the page normally. Keep several measurements, select one to edit, or use trash to clear them all.",
    ],
    topics: [
      {
        title: "Element measurements",
        items: [
          { label: "Preview and pin", text: "The live readout shows width, height, start/end coordinates, and guides toward the viewport edges. Clicking pins that element and automatically pauses measuring. Select Measuring / Paused, or choose a mode again, to take the next measurement." },
          { label: "Follow the element", text: "Pins update through page and nested-container scrolling and element resizing. Measuring the same element again refreshes its existing pin." },
          { label: "Coordinates", text: "The live hover preview uses viewport coordinates. Pinned measurements use document coordinates, so their position values can differ after the page has scrolled." },
          { label: "Touch input", text: "Press and drag across the page, then release over the element to pin it. While measuring is armed, this gesture measures rather than scrolling the page. Wheel and trackpad scrolling remain available." },
        ],
      },
      {
        title: "Draw, adjust, and clear",
        items: [
          { label: "Free rectangles", text: "Drag empty page space to draw a rectangle. Click inside to select it, drag its body to move it, or use any of its eight handles to resize. Each rectangle keeps its own width × height label." },
          { label: "Edit a pin", text: "Element pins remain when you switch to Draw. Manually moving or resizing a pin converts it into a free rectangle, so it stops following its original element." },
          { label: "Delete", text: "In Draw mode, Delete or Backspace removes the selected measurement. The trash button clears every rectangle and pin." },
          { label: "Escape", text: "Escape first pauses an armed ruler. When already paused, it clears the live selection or gesture without deleting retained measurements." },
        ],
      },
      {
        title: "Use a page grid",
        items: [
          { label: "Grid size", text: "Turn on Grid and choose a cell size from 2 to 200 px. Each eighth cell has a stronger line for orientation. The grid follows page content as you scroll and is displayed while Page Ruler is active." },
          { label: "What is remembered", text: "Grid visibility and cell size are saved and shared across tabs. Measurements survive a temporary tool switch, minimizing, or hiding, but are cleared by reloads and page-route changes. They are not saved into projects." },
        ],
      },
    ],
    note: "An armed ruler uses page clicks for measurements. Pause it to activate links and controls. Ruler gestures do not drag the reference; layer arrow nudges and backslash blink remain available, while the wheel scrolls the page.",
  },
  {
    id: "inspector",
    name: "Inspector",
    purpose: "Read computed styles, pin useful details, and preview CSS states.",
    steps: [
      "Launch Inspector from the popup or widget. The popup closes when you launch it there, and reference layers temporarily step aside.",
      "Hover to see an element’s rendered size and box model. Click to snap a card to the element. Repeat for other elements, or click an already-snapped element to refresh its card.",
      "Use Inspecting / Paused, or Escape with page focus, to interact normally while keeping your snapped cards. Resume when you want another reading.",
    ],
    topics: [
      {
        title: "Find and keep the right element",
        items: [
          { label: "Box model", text: "The hover view distinguishes margin, border, padding, and content. Its rendered border-box dimensions can differ from computed width and height values on the card." },
          { label: "Walk through parents", text: "With an element highlighted and page focus, Up selects its parent and Down walks back toward the original element. Click to snap the highlighted container. Moving the pointer resets this walk." },
          { label: "Touch selection", text: "Press and drag across elements, then release to snap the one you want. Pause inspection when you want ordinary page gestures again." },
          { label: "Arrange cards", text: "Drag a card’s header to reposition it around its element, or use its chevron to collapse it. Cards stay attached to their elements while the page scrolls or reflows." },
          { label: "Copy or remove", text: "Copy selector copies the readable element selector; Copy CSS copies that card’s rule. These selector helpers are not guaranteed unique. Use × or Unpin to remove one card, or the panel trash to remove all. SNAPPED counts retained cards, including those outside the visible area." },
        ],
      },
      {
        title: "Choose exactly which properties you see",
        description: "Open the gear beside Inspector in the popup. Enable properties from the catalogue, pin favorites at the top, and reorder pinned rows by dragging, their Up/Down buttons, or Alt+Up/Down with a row focused. Changes save automatically and update open cards across tabs.",
        items: [
          { label: "Layout", text: "display, position, inset, width, height, padding, margin, gap, flex-direction, justify-content, align-items, overflow, and z-index." },
          { label: "Visual", text: "background-color, border-width, border-color, border-radius, box-shadow, and opacity." },
          { label: "Typography", text: "font-family, font-size, font-weight, line-height, letter-spacing, text-align, text-transform, and color." },
          { label: "Starting selection", text: "The default card shows display, width, height, padding, margin, background-color, border-color, box-shadow, border-radius, font-size, line-height, and color. A pinned property leaves its normal group to avoid appearing twice." },
          { label: "Color values", text: "Opaque colors display as uppercase HEX with a swatch. Translucent colors retain rgba() because their appearance depends on the background underneath." },
        ],
      },
      {
        title: "Preview element states",
        items: [
          { label: "Available states", text: "Expand ELEMENT STATES on a card to review :hover, :active, :focus, :focus-visible, :focus-within, :target, :visited, :checked, :disabled, :required, :invalid, and :placeholder-shown. States with no matching rule are disabled when the page’s stylesheets can be read. If cross-origin restrictions prevent a complete check, the tool reports that uncertainty separately." },
          { label: "Compare appearances", text: "Select an available state to preview the page’s CSS on that element. You can combine states on one card or preview different elements separately. Changed property groups show the state and how many values changed." },
          { label: "Return to rest", text: "Uncheck a state to release it, or clear every checkbox for the resting appearance. Unpinning, switching tools, or hiding the widget also releases those previews." },
          { label: "Preview boundaries", text: "These controls preview CSS appearance. They do not run JavaScript hover handlers, actually focus or disable an input, or expose browsing history. Cross-origin stylesheet restrictions can make available styles incomplete; the tool reports the limitation. Combined states are an approximation of readable rules, not a complete native-state simulation." },
        ],
      },
    ],
    note: "Cards survive temporary tool switches, minimizing, and hiding; reloads and page-route changes clear them. Escape with page focus pauses inspection, but a second Escape does not remove the cards or switch tools. Inside a widget input or dialog, Escape belongs to that control instead.",
  },
  {
    id: "element-selector",
    name: "Element Selector",
    purpose: "Turn a CSS rule into a set of elements you can inspect together.",
    steps: [
      "Open Element Selector and choose a ready-made rule, or enter a valid CSS selector and press Enter or +. Invalid selector syntax is marked and cannot be added.",
      "Use include rules to collect matches, and switch a rule to Exclude to remove its matches from the combined set. Read the per-rule counts and the combined MATCHES total.",
      "Select a result to scroll to it, or use the Previous / Next match buttons to cycle through the set. Copy selector copies the combined selector, including exclusions.",
    ],
    topics: [
      {
        title: "Ready-made rules",
        items: [
          { label: "Structure", text: "Headings, Landmarks, and Lists help you locate the page’s main structural elements." },
          { label: "Media", text: "Images covers img, picture, svg, and video. Embeds covers iframe, embed, and object elements." },
          { label: "Interactive", text: "Links, Buttons, and Form fields collect common controls. Buttons includes common role-based and input buttons." },
          { label: "Checks", text: "Images missing alt, Empty elements, Opens a new tab, and Inline styles provide lists to review. Images missing alt also includes empty alt attributes; decorative images may correctly use an empty value, so a match is not automatically an accessibility failure." },
        ],
      },
      {
        title: "Build and manage a rule set",
        items: [
          { label: "An example", text: "Include button, [role=\"button\"], then add .primary as an Exclude rule. The remaining matches are buttons outside that class. Enter actual CSS in the add field; a descriptive name alone is not converted into a selector." },
          { label: "Rename a rule", text: "Click its label to edit the name. Enter or leaving the field saves; Escape cancels. Saving a blank name restores the default label. For example, add .card and rename it Product cards." },
          { label: "Include or exclude", text: "The rule’s mode button switches between contributing matches and removing them from the entire set. Overlapping include rules are deduplicated; the first matching include supplies the element’s number and color." },
          { label: "Pause highlighting", text: "Use Highlighting / Paused, or Escape with page focus, to hide the outlines while retaining rules and results. Element Selector does not block normal page clicks." },
          { label: "Remove rules", text: "A rule’s × removes it; trash clears all rules. Rules save automatically across pages, tabs, and reloads. Match results are recalculated for each page and are not saved." },
        ],
      },
    ],
    note: "The result list shows its first 60 entries and the page draws up to 300 outlines; Previous/Next can still walk the full result set. Counts reflect matches rather than display caps. Queries stay within the current document and do not cross iframe or Shadow DOM boundaries. The navigation arrows are buttons, not dedicated arrow-key shortcuts.",
  },
  {
    id: "screenshot",
    name: "Screenshot",
    purpose: "Capture a region, an element, or a vertically stitched page.",
    steps: [
      "Open Capture from the popup, or Screenshot in the widget. Launching from the popup closes it so it will not cover the page you capture.",
      "Choose Area, Element, or Full page, then set the output scale and overlay options before capturing.",
      "Save the completed image with Save PNG or Copy before leaving the tool, starting another capture, or changing capture options.",
    ],
    topics: [
      {
        title: "Choose the capture mode",
        items: [
          { label: "Area", text: "Choose Select an area, drag a region in the visible page, adjust its handles, and press Capture. A fresh drag away from a handle replaces the selection. Regions smaller than 8 × 8 px are discarded." },
          { label: "Precise area sizing", text: "While the area picker is active, Left/Right shrinks or grows width by 1 px; Up/Down shrinks or grows height by 1 px. Hold Shift for 10 px. These adjust the bottom-right edge, rather than move the whole selection." },
          { label: "Element", text: "Choose Pick an element, hover the target, and click to capture it immediately. This uses its bounding box in the visible frame; it does not scroll through a tall or offscreen element." },
          { label: "Full page", text: "Choose Whole document and Capture to scroll vertically and stitch screens together. When the page uses an inner main scroller, capture follows that scrolling content. This does not sweep through horizontally overflowing areas." },
          { label: "Viewport only", text: "The alternate full-page scope limits output to one viewport. Capture can move to the top first, so use Area when you need a particular region currently visible on screen." },
        ],
      },
      {
        title: "Options and output",
        items: [
          { label: "Output scale", text: "Choose 1×, 2×, or 3×. The panel previews dimensions and reports the actual output size after capture. Higher scale changes the PNG’s dimensions; it cannot create source detail that was not rendered." },
          { label: "Include overlay layers", text: "Off by default. Turn it on to capture the reference comparison together with the page. PixelGhost hides its widget, measurement marks, and other tool chrome during capture." },
          { label: "Pin fixed headers once", text: "On by default for Full page. This avoids repeating fixed or sticky page chrome down a stitched capture. Capture restores the page’s starting scroll position when it completes or is cancelled." },
          { label: "Progress and cancel", text: "Full-page capture shows tile progress. Cancel remains available while the widget is minimized. Escape cancels a running capture or clears an armed picker/selection without leaving Screenshot." },
          { label: "Save or copy", text: "Save PNG downloads the result; Copy sends it to the clipboard. If browser clipboard restrictions show Copy blocked, use Save PNG." },
          { label: "What is kept", text: "Capture options are saved and shared across tabs. Selections, progress, and image data are temporary. Changing mode, scale, scope, or options retires the previous result, so save it first." },
        ],
      },
    ],
    note: "Very long pages are capped at 40 screen tiles and return the captured portion with a warning. A page that stops scrolling early can also produce a shorter capture with a warning. Browser-restricted pages or browser policies may refuse capture.",
  },
  {
    id: "preferences",
    name: "Preferences & help",
    purpose: "Set up the popup and widget around the way you work.",
    steps: [
      "Use the popup header to change the theme or accent color. Open its menu for language, keyboard shortcut, privacy, support, and release notes.",
    ],
    topics: [
      {
        title: "Appearance and language",
        items: [
          { label: "Light and dark", text: "The sun/moon control switches themes. PixelGhost starts dark, remembers your selection, and applies it to the widget too." },
          { label: "Five accents", text: "Choose Electric Blue, Hot Pink, Ultraviolet, Cyber Teal, or Acid Lime. Electric Blue is the default; your chosen accent persists across the popup and widget." },
          { label: "Eight languages", text: "Choose English, Deutsch, Español, Français, Português (Brasil), Русский, 日本語, or 简体中文. PixelGhost initially detects a supported browser preference; an explicit choice is remembered. Open widgets update their labels without resetting your work." },
          { label: "Keyboard shortcut", text: "The settings row shows the browser’s actual assigned widget shortcut. Not set means it has no binding, often because a shortcut conflicts. Select Change to open the browser’s extension-shortcut settings and assign the combination you want." },
        ],
      },
      {
        title: "Guidance and support",
        items: [
          { label: "First-use tour", text: "The tour highlights importing a reference and then saving a project. Skip tour permanently removes the spotlight while introductory guidance remains. Your first successful project save completes onboarding." },
          { label: "Show tips / Hide tips", text: "Tips are hidden by default after your first project save. Use the tips control to show or hide them again; the choice is remembered. Visible tips normally rotate every ten seconds, and Learn More opens documentation. With reduced motion enabled, tips stay static and decorative motion stops." },
          { label: "What’s new", text: "Open What’s new in the menu to revisit release notes. Close, Dismiss, Escape, or clicking outside closes the dialog." },
          { label: "Privacy and support", text: "The menu links to the privacy policy and support. For a bug report, include the extension and browser versions, steps to reproduce it, and the affected tool. Keep confidential references, sensitive URLs, and personal details out of public issues." },
        ],
      },
    ],
    note: "These are PixelGhost’s extension preferences, separate from the theme controls on this portfolio website. Browser storage is local to your profile; clearing page history does not reset all preferences.",
  },
  {
    id: "keyboard-shortcuts",
    name: "Keyboard & gestures",
    purpose: "The complete reference, with the right context for each key.",
    steps: [
      "Most layer commands require page focus and a visible reference. Editable page regions and widget inputs keep their own editing behavior. The browser-level widget shortcut is the exception: it works while a text field is focused.",
      "The Ctrl transform combinations below work from either the popup or page. The current implementation also accepts Command/Meta for those transforms. A browser-assigned widget shortcut may differ from the suggested Alt+Shift+G.",
    ],
    shortcutGroups: [
      {
        title: "Launch and import",
        shortcuts: [
          { keys: ["Alt + Shift + G"], action: "Show or hide widget and overlay", detail: "Suggested browser binding; customize it in Settings → Keyboard shortcut. Summons an empty widget on a supported page after consent." },
          { keys: ["Ctrl + V"], action: "Paste a reference image", detail: "In the popup outside an input, or on the page with the widget visible. Text fields retain normal paste." },
          { keys: ["Enter"], action: "Add the URL", detail: "With the HTTPS image URL field focused." },
          { keys: ["Escape"], action: "Close URL entry", detail: "With the image URL field focused." },
          { keys: ["Drop image files"], action: "Import one or several references", detail: "Drop onto the popup or widget layer grid; this does not reorder existing layers." },
        ],
      },
      {
        title: "Move, scale, rotate, and compare",
        note: "Page nudges and blink require a displayed reference. Color, Inspector, and Element Selector temporarily hide it, so these layer gestures are suspended. Centering disables horizontal movement and rotation.",
        shortcuts: [
          { keys: ["← ↑ → ↓"], action: "Nudge by 1 px", detail: "Page focus; also works with click-through lock on." },
          { keys: ["Shift + Arrow"], action: "Nudge by 10 px", detail: "Page focus, outside editable controls." },
          { keys: ["Ctrl + ↑", "Ctrl + ↓"], action: "Scale up or down by 0.01", detail: "Popup or page focus. Does not change a layer behind a focused text or numeric input." },
          { keys: ["Ctrl + Shift + ↑", "Ctrl + Shift + ↓"], action: "Scale up or down by 0.1", detail: "Scale remains within 0.01–20." },
          { keys: ["Ctrl + ←", "Ctrl + →"], action: "Rotate left or right by 90°", detail: "Adds a quarter turn to the current angle. Disabled in centered mode." },
          { keys: ["Ctrl + Shift + ←", "Ctrl + Shift + →"], action: "Fine rotation or a smooth sweep", detail: "Tap for 0.1°; hold to accelerate. Release to stop." },
          { keys: ["Hold \\"], action: "Blink the reference off", detail: "Page focus. Releasing restores the original opacity; text inputs still receive backslash normally." },
          { keys: ["Wheel up / down"], action: "Opacity up or down by 5 points", detail: "Over an unlocked visible overlay. Page Ruler leaves wheel scrolling to the page." },
          { keys: ["Alt + wheel"], action: "Adjust opacity by 1 point", detail: "Over an unlocked visible overlay. Ctrl+wheel keeps browser zoom." },
          { keys: ["Hold Space", "Hold Enter"], action: "Activate a focused hold button", detail: "For the widget’s blink or fine-rotate controls. Release or blur ends the hold." },
        ],
      },
      {
        title: "Focused fields and project controls",
        shortcuts: [
          { keys: ["↑ / ↓"], action: "Step the focused X/Y or Scale field", detail: "1 px in X/Y; 0.01 in Scale. Holding repeats." },
          { keys: ["Shift + ↑ / ↓"], action: "Use a larger field step", detail: "10 px in X/Y; 0.1 in Scale." },
          { keys: ["↑ / ↓"], action: "Fine-adjust the angle editor", detail: "0.1° per tap; holding accelerates rotation." },
          { keys: ["Enter", "Leave field"], action: "Finish an angle edit or layer rename", detail: "Angle changes update live; Escape restores the opening angle. Renames save trimmed text." },
          { keys: ["Escape"], action: "Cancel an angle edit or layer rename", detail: "Returns to the value before that edit." },
          { keys: ["Enter"], action: "Save a new named project", detail: "With the project-name input focused, at least one layer, and a nonblank name." },
        ],
      },
      {
        title: "Inspection tools",
        note: "Escape is contextual: it does not universally close a tool. Use the focus context beside each shortcut; Escape’s action depends on the active tool or control.",
        shortcuts: [
          { keys: ["Escape"], action: "Cancel a Color Picker sample", detail: "While the browser eyedropper is open; the selected color is unchanged." },
          { keys: ["Delete", "Backspace"], action: "Delete a selected ruler measurement", detail: "With Page Ruler in Draw mode and page focus." },
          { keys: ["Escape"], action: "Pause Page Ruler", detail: "If already paused, clears the live selection/gesture while keeping measurements." },
          { keys: ["↑", "↓"], action: "Walk Inspector ancestors", detail: "With a highlighted element and page focus: Up goes to its parent, Down walks back. Pointer movement resets the walk." },
          { keys: ["Escape"], action: "Pause Inspector", detail: "Page focus. Cards remain; pressing it again does not clear them." },
          { keys: ["Alt + ↑", "Alt + ↓"], action: "Reorder a pinned Inspector property", detail: "With that row focused in the popup’s property editor." },
          { keys: ["Enter"], action: "Add an Element Selector rule", detail: "With valid CSS in the add field." },
          { keys: ["Enter", "Leave field"], action: "Save a rule name", detail: "While renaming an Element Selector rule. A blank name restores its default label." },
          { keys: ["Escape"], action: "Cancel a rule rename or pause highlighting", detail: "In a rename field it cancels; with page focus it pauses Element Selector’s outlines." },
          { keys: ["← / →", "↑ / ↓"], action: "Resize a screenshot area by 1 px", detail: "While the Area picker is active: Left/Up shrink, Right/Down grow. Adjusts the bottom-right edge." },
          { keys: ["Shift + Arrow"], action: "Resize a screenshot area by 10 px", detail: "Changes width or height; does not move the whole selection." },
          { keys: ["Escape"], action: "Cancel capture or clear the picker", detail: "With Screenshot active; remains in the Screenshot tool." },
        ],
      },
      {
        title: "Menus and dialogs",
        shortcuts: [
          { keys: ["Tab", "Shift + Tab"], action: "Move through focusable controls", detail: "Use the visible buttons and fields, including the controls available during the tour." },
          { keys: ["Escape"], action: "Close the active popup layer", detail: "Closes the language dropdown before the settings menu; also closes release notes and the Inspector property editor. It does not hide the entire widget." },
        ],
      },
    ],
  },
  {
    id: "compatibility",
    name: "Limits & troubleshooting",
    purpose: "Know when to change the page, the mode, or the browser setting.",
    steps: [
      "If a control does nothing, first confirm you are on a normal HTTP or HTTPS page, have accepted the first-use disclosure, and have the right tool active.",
      "For a supported page that stops responding, reload it and try again. Include the affected tool, browser and extension versions, and reproduction steps when contacting support.",
    ],
    topics: [
      {
        title: "Common situations",
        items: [
          { label: "The widget shortcut does nothing", text: "Check its live assignment in the popup’s Keyboard shortcut settings. Not set means there is no binding. The command cannot operate before consent or on protected browser pages." },
          { label: "The reference seems to have disappeared", text: "Color Picker, Inspector, and Element Selector temporarily hide reference layers. Return to Layers to compare again. Page Ruler leaves the reference visible; Screenshot has an explicit Include overlay layers option." },
          { label: "The page will not scroll under a reference", text: "Wheel input over an unlocked reference adjusts opacity. Lock the reference to let scrolling and clicks pass through, or move the pointer outside it." },
          { label: "Arrows are not moving the reference", text: "A focused input, active inspection tool, or screenshot selection has its own keyboard behavior. Focus the page with Layers active. Horizontal movement and rotation are also disabled in centered mode." },
          { label: "A tool cannot reach an element", text: "Browser UI, extension stores, and other protected pages block injection. Inspection cannot freely reach cross-origin iframe internals or closed Shadow DOM. Fullscreen/top-layer content and page scripts that interfere with extension elements can also limit what is visible or selectable." },
          { label: "Picker or copy is unavailable", text: "The native eyedropper depends on browser support, and clipboard access can be restricted. Use the page palette for available colors, ordinary image paste or file import where appropriate, and Save PNG when screenshot copying is blocked." },
        ],
      },
    ],
    note: "This guide describes the supplied Chrome extension controls. Browser restrictions, page behavior, and extension versions can affect availability. It documents the product; it does not install or run PixelGhost inside this website.",
  },
] as const satisfies readonly FieldGuideChapter[];

// Product guidance comes from the supplied public documentation, not the
// illustrative demos. Keep these facts aligned with each product's policy.
export const productGuides = {
  pixelghost: {
    label: "DESIGN OVERLAY & VISUAL QA",
    promise: "A reference. A live page. Everything in between.",
    summary: "One overlay workspace and five inspection tools, right where you build. Start with a mockup, or inspect the page on its own.",
    logo: "/products/pixelghost/logo.png",
    heroImage: "/products/pixelghost/widget-preview.png",
    heroAlt: "PixelGhost floating widget with layer thumbnails, position and scale controls, Difference blend at 100% opacity, and shortcuts to its five page tools.",
    heroCaption: "YOUR REFERENCE, WITH EVERY ADJUSTMENT IN REACH",
    quickFacts: ["Multiple image layers", "Five inspection tools", "No account required"],
    setup: [
      { title: "Open your page", description: "Visit a normal HTTP or HTTPS page and open PixelGhost from your browser toolbar. Browser-internal pages and extension stores are restricted." },
      { title: "Bring your reference", description: "Add an image from a file, folder, clipboard, or HTTPS URL. Select the layer to position it over your implementation." },
      { title: "Compare and refine", description: "Adjust the overlay, then open a tool from the popup’s TOOLS section or the on-page widget. Inspection tools also work without any layers." },
    ],
    guideTitle: "A closer look. A clearer fix.",
    guideIntro: "From your first widget launch to precise inspection: imports, layers, projects, every tool, and the shortcuts that keep you moving. Jump to any chapter.",
    tools: pixelGhostFieldGuide,
    privacyTitle: "Your workspace lives in your browser.",
    privacySummary: "Page URLs, images, comparison settings, and named projects are stored in your browser profile. An HTTPS image URL is requested directly from its host. Active overlays live in the page DOM, so use confidential designs only on pages you trust.",
    faq: [
      { question: "Can I inspect a page without importing a design?", answer: "Yes. All five inspection tools work without an overlay. Open one from the popup’s TOOLS section or the icon rail in the on-page widget." },
      { question: "Can I use the page underneath a layer?", answer: "Yes. Lock the layer to make it click-through without changing its position. You can also hold the backslash key to blink the overlay off and on." },
      { question: "Where can I use PixelGhost?", answer: "On ordinary HTTP and HTTPS pages. Browser-internal pages, extension stores, and other restricted pages block content-script injection. If a supported page does not respond, reload it and try again." },
    ],
    issuesUrl: "https://github.com/AbhishekSRajput/pixelghost/issues",
  },
  youscroll: {
    label: "PINNED COMMENTS FOR YOUTUBE",
    promise: "The conversation moves. The video stays.",
    summary: "Give comments a space of their own. Browse the discussion, find your next video, or pop the player out while you get on with your day.",
    logo: "/products/youscroll/logo.png",
    heroImage: "/products/youscroll/pinned-comments.png",
    heroAlt: "YouScroll store illustration showing a video on the left and an independent comments panel with Comments and Up Next tabs on the right.",
    heroCaption: "KEEP THE PLAYER. GIVE THE CONVERSATION ITS OWN SPACE.",
    quickFacts: ["Independent comments", "Picture-in-Picture", "YouTube only"],
    setup: [
      { title: "Open a video", description: "Install YouScroll and open a watch page on www.youtube.com. Use the normal desktop view with room for YouTube’s two-column layout." },
      { title: "Choose your setup", description: "Open the toolbar popup to turn the comments panel and Picture-in-Picture control on or off. Choose Comments or Up Next as the panel’s default tab." },
      { title: "Keep watching", description: "Read inside the panel without scrolling the player away. Changes from the popup apply immediately to already-open tabs, without a reload." },
    ],
    guideTitle: "A little room for everything.",
    guideIntro: "A familiar YouTube watch page, with a few useful changes. Here’s how to use each one.",
    tools: [
      {
        id: "pinned-comments", name: "Pinned comments", purpose: "Read the thread without losing the video.",
        steps: ["Turn on the comments panel in the toolbar popup. On a supported watch page, YouTube’s own comments move into a sticky, full-height panel in the right-hand column.", "Scroll inside the panel to browse the conversation independently. Reaching the bottom keeps YouTube’s usual lazy loading working, so more comments load as you read."],
        note: "YouScroll rearranges YouTube’s existing content; it does not replace the discussion with a separate service.",
      },
      {
        id: "comments-up-next", name: "Comments & Up Next", purpose: "Switch context without leaving your place.",
        steps: ["Use the Comments and Up Next tabs above the panel to move between the conversation and recommendations. YouTube’s recommendations are moved into the panel, not replaced.", "Choose your preferred default tab in the popup so the panel opens on the view you want."],
        note: "Tab preference is part of your small settings object, stored through Chrome’s sync storage.",
      },
      {
        id: "picture-in-picture", name: "Picture-in-Picture", purpose: "Let the video come with you.",
        steps: ["Enable the pop-out feature from the toolbar popup. A Picture-in-Picture button appears in YouTube’s own player control bar.", "Select that button to hand the video to your browser’s floating Picture-in-Picture window. It stays above your other applications while you work."],
        note: "The browser provides the floating video window. The popup controls this feature separately from the comments panel.",
      },
      {
        id: "settings", name: "Simple settings", purpose: "Set your preference. Change your mind.",
        steps: ["Use the toolbar popup to toggle either feature and choose the starting panel tab. Changes take effect in existing YouTube tabs immediately.", "Switch a feature off to restore YouTube’s original layout. If you are signed into Chrome, your settings can follow you through Chrome’s own sync."],
        note: "The panel steps aside in theater mode, fullscreen, and windows too narrow for YouTube’s two-column view. Live streams and videos with comments disabled do not show the comments panel.",
      },
    ],
    privacyTitle: "Small changes. A small data footprint.",
    privacySummary: "YouScroll stores feature switches and your preferred tab in Chrome’s sync storage. The extension has no account, analytics, advertising SDK, or developer-operated server, and makes no network requests of its own.",
    faq: [
      { question: "Why did the comments panel disappear?", answer: "The panel deliberately steps aside in theater mode, fullscreen, or windows too narrow for YouTube’s two-column layout. Return to normal view and widen your window. Live streams and videos with comments disabled do not provide a comments panel." },
      { question: "Do I need to reload after changing a setting?", answer: "No. Toggles in the toolbar popup apply to already-open tabs immediately. Switching a feature off puts YouTube’s layout back." },
      { question: "What if it stops working on a normal watch page?", answer: "Reload and try again. YouTube changes its page markup, which can prevent YouScroll from finding the elements it needs. When reporting a bug, include your browser and extension versions, window size, and any console line starting with [YouScroll]. Avoid sharing private video links or account details." },
    ],
    issuesUrl: "https://github.com/AbhishekSRajput/public-youscroll/issues",
  },
} as const;

// The reference contains titles/excerpts but no completed article bodies.
// These remain explicitly labelled drafts until the author provides full text.
export const notes = [
  {
    slug: "the-case-for-being-a-generalist",
    title: "The case for being a generalist in a specialist market",
    date: "AUG 2026",
    category: "GENERALIST / CAREER",
    tags: ["Generalist", "Career"],
    excerpt:
      "Depth is what gets rewarded on paper. Range is what actually ships a product when the team is one person.",
  },
  {
    slug: "reading-an-unfamiliar-codebase",
    title: "Reading a codebase you’ve never seen in an afternoon",
    date: "JUL 2026",
    category: "CODEBASES",
    tags: ["Codebases"],
    excerpt:
      "A repeatable path from cold repository to first meaningful change, without reading every file.",
  },
  {
    slug: "what-pixelghost-taught-me-about-scope",
    title: "What building PixelGhost taught me about scope",
    date: "JUN 2026",
    category: "PRODUCTS / EXTENSIONS",
    tags: ["Products", "Extensions"],
    excerpt:
      "Every feature I cut made the product easier to explain, and easier to finish.",
  },
  {
    slug: "small-tools-beat-big-frameworks",
    title: "Small tools beat big frameworks",
    date: "MAY 2026",
    category: "TOOLS",
    tags: ["Tools"],
    excerpt:
      "Notes on staying close to the platform and shipping faster because of it.",
  },
] as const;

export const traits = [
  {
    number: "01",
    title: "Stay curious.",
    symbol: "↗",
    description:
      "Read the source. Ask the next question. Understand the problem before reaching for a familiar solution.",
  },
  {
    number: "02",
    title: "Care a little too much.",
    symbol: "✳",
    description:
      "The edge case. The awkward breakpoint. The almost-right interaction. That’s where the real work happens.",
  },
  {
    number: "03",
    title: "Say it straight.",
    symbol: "↔",
    description:
      "Clear thinking, honest trade-offs, and plain language. Good collaboration doesn’t need a layer of jargon.",
  },
  {
    number: "04",
    title: "Make less, better.",
    symbol: "−",
    description:
      "Find the smallest thing that solves the problem. Ship it, learn from it, and keep making it better.",
  },
] as const;
