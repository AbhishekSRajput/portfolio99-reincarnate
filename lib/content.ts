export const profile = {
  brand: "codecube99",
  displayName: "CodeCube99",
  tagline: "Big picture. Every little detail.",
  shareDescription: "Software, design & independent products.",
  description:
    "Software generalist and independent builder. Thoughtful software, useful browser extensions, and an obsessive eye for the details.",
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
      "Scroll YouTube comments and Up Next independently beside the video, without moving the whole page. Then doodle, drop GIFs, throw things or add face stickers over the video — all on your device.",
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

/** A run of headline text. Objects add the serif italic, accent, dimmed, or
 *  underlined (swoosh) treatments used across the product pages. */
export type Phrase =
  | string
  | {
      readonly text: string;
      readonly serif?: boolean;
      readonly accent?: boolean;
      readonly dim?: boolean;
      readonly swoosh?: boolean;
    };
/** Each inner array renders as one line of a heading. */
export type Headline = readonly (readonly Phrase[])[];

export type IconName =
  | "layers"
  | "camera"
  | "ruler"
  | "devices"
  | "search"
  | "folder"
  | "shield"
  | "browser"
  | "keyboard"
  | "pipette"
  | "inspect"
  | "selector"
  | "image"
  | "eye"
  | "stack"
  | "panel"
  | "tabs"
  | "pip"
  | "terminal";

type LinkTarget = { readonly label: string; readonly href: string };
type Term = { readonly term: string; readonly text: string };
/** Small print that may include keyboard keys between its two halves. */
export type KeyNote = {
  readonly before?: string;
  readonly keys?: readonly string[];
  readonly after?: string;
};

export type ProductChapter = {
  readonly id: string;
  readonly icon: IconName;
  readonly kicker: string;
  readonly title: string;
  readonly tagline: string;
  readonly description?: string;
  readonly points?: readonly string[];
  readonly terms?: readonly Term[];
  readonly termsLayout?: "stack" | "grid";
  readonly footnote?: KeyNote;
  /** A supplied store image, the drawn capture diagram, or no visual. */
  readonly visual?:
    | {
        readonly kind: "image";
        readonly src: string;
        readonly alt: string;
        readonly width: number;
        readonly height: number;
      }
    | { readonly kind: "capture" };
  readonly wide?: boolean;
};

export type ProductSupport = {
  readonly repo: {
    readonly owner: string;
    readonly name: string;
    readonly issuesUrl: string;
    readonly newIssueUrl: string;
  };
  readonly intro: { readonly strong: string; readonly body: string };
  readonly steps: readonly {
    readonly title: string;
    readonly text: string;
    readonly link?: "issues" | "new";
  }[];
  readonly checks: {
    readonly title: Headline;
    readonly lede: string;
    readonly ledeStrong: string;
    readonly items: readonly {
      readonly icon: IconName;
      readonly title: string;
      readonly text: string;
      readonly link?: LinkTarget;
    }[];
  };
  readonly include: readonly string[];
  /** Lines of a Markdown outline visitors can paste into a new issue. */
  readonly template: readonly string[];
  readonly privacy: {
    readonly keepOut: string;
    readonly emailFor: string;
    readonly note?: string;
  };
  readonly faq: readonly { readonly question: string; readonly answer: string }[];
};

export type ProductNotices = {
  readonly intro: string;
  readonly introStrong: string;
  readonly note?: string;
  readonly groups: readonly {
    readonly title: string;
    readonly note?: string;
    readonly packages: readonly {
      readonly name: string;
      readonly version: string;
      readonly license: string;
      readonly role?: string;
      readonly source: string;
      readonly sourceLabel: string;
    }[];
  }[];
  readonly licenses: readonly {
    readonly name: string;
    readonly appliesTo: string;
    readonly copyrights: readonly string[];
    readonly paragraphs: readonly string[];
  }[];
  readonly own: string;
};

export type ProductGuide = {
  readonly logo: string;
  readonly label: string;
  readonly hasGuide: boolean;
  /** A pricing page exists at `/products/<slug>/pricing/`. */
  readonly hasPricing: boolean;
  readonly nextLine: string;
  readonly hero: {
    readonly meta: { readonly accent: string; readonly text: string };
    readonly eyebrow: string;
    readonly title: Headline;
    readonly lead: string;
    readonly body: string;
    readonly secondary: LinkTarget;
    readonly image: {
      readonly src: string;
      readonly alt: string;
      readonly position: string;
      readonly caption: string;
      readonly credit: string;
    };
    readonly note: KeyNote;
    readonly motto: string;
  };
  readonly overview: {
    readonly eyebrow: string;
    readonly title: Headline;
    readonly lede: string;
    readonly ledeStrong: string;
    readonly facts: readonly {
      readonly value: string;
      readonly label: string;
      readonly detail: string;
      readonly accent?: boolean;
    }[];
  };
  readonly chapters: {
    readonly eyebrow: string;
    readonly title: Headline;
    readonly link?: LinkTarget;
    readonly items: readonly ProductChapter[];
  };
  readonly paper: {
    readonly eyebrow: string;
    readonly title: Headline;
    readonly lede: string;
    readonly ledeStrong: string;
    readonly card: {
      readonly icon: IconName;
      readonly title: string;
      readonly body: string;
      readonly fine: string;
      readonly link: LinkTarget;
    };
    readonly terms: readonly Term[];
  };
  readonly closer:
    | {
        readonly kind: "keyboard";
        readonly eyebrow: string;
        readonly title: Headline;
        readonly lede: string;
        readonly shortcuts: readonly {
          readonly hold?: boolean;
          readonly keys: readonly string[];
          readonly action: string;
          readonly when: string;
        }[];
        readonly link: LinkTarget;
        readonly notesTitle: string;
        readonly notes: readonly { readonly lead: string; readonly text: string }[];
      }
    | {
        readonly kind: "cards";
        readonly eyebrow: string;
        readonly title: Headline;
        readonly lede: string;
        readonly ledeStrong: string;
        readonly cards: readonly { readonly title: string; readonly text: string }[];
      };
  readonly docs: {
    readonly lede: string;
    readonly ledeStrong: string;
    readonly items: readonly {
      readonly label: string;
      readonly title: string;
      readonly text: string;
      readonly href: string;
    }[];
  };
  readonly cta: {
    readonly eyebrow: string;
    readonly title: Headline;
    readonly text: string;
    readonly secondary?: LinkTarget;
  };
  readonly support: ProductSupport;
  readonly notices: ProductNotices;
};

const MIT_TEXT = [
  'Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:',
  "The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.",
  'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.',
] as const;
const ISC_TEXT = [
  "Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.",
  'THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.',
] as const;
const LUCIDE_COPYRIGHT =
  "Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.";

// Product homes, support, and notices. Sources: pixelghost-publicdocs/ and,
// for YouScroll 1.0, the extension repository's docs/public-docs/ (README,
// ISSUES, THIRD_PARTY_NOTICES) and store-assets/ screenshots. Watch parties
// and pricing follow the extension's unreleased changelog and are labelled
// "coming soon". Keep claims within those documents.
export const productGuides: Record<"pixelghost" | "youscroll", ProductGuide> = {
  pixelghost: {
    logo: "/products/pixelghost/logo.png",
    label: "Chrome extension · v3.0",
    hasGuide: true,
    hasPricing: false,
    nextLine: "Small details. Better page reviews.",
    hero: {
      meta: { accent: "Free", text: "No account · No paid tier · No trial" },
      eyebrow: "Pixel-perfect design overlay, screenshots & visual QA",
      title: [
        ["Small details."],
        ["Better ", { text: "page", serif: true }],
        [{ text: "reviews.", accent: true, swoosh: true }],
      ],
      lead: "PixelGhost brings visual comparison, screenshots and page inspection into one free browser toolkit.",
      body: "Place your mockup over the live page to spot differences in spacing, color and alignment.",
      secondary: { label: "Read the tools guide", href: "/products/pixelghost/guide/" },
      image: {
        src: "/products/pixelghost/store-promo.png",
        alt: "The PixelGhost ghost holding a magnifying glass over two overlapping interface cards.",
        position: "84% 50%",
        caption: "Your design. On the real page.",
        credit: "Store artwork",
      },
      note: { before: "Show or hide the widget", keys: ["Alt", "Shift", "G"] },
      motto: "Compare ↔ Capture ↔ Inspect",
    },
    overview: {
      eyebrow: "One toolkit",
      title: [
        ["Everything a review needs."],
        [{ text: "Right where you ", dim: true }, { text: "work.", serif: true, dim: true }],
      ],
      lede: "Compare, capture and inspect without leaving the page. Page tools work even without a reference.",
      ledeStrong: "One extension. Every feature free.",
      facts: [
        { value: "5", label: "On-page tools", detail: "Layers, Screenshot, Color Picker, Page Ruler, Inspector" },
        { value: "5", label: "Side-panel tools", detail: "Assets, Vision, SEO, Stack, Element Selector" },
        { value: "6", label: "Devices side by side", detail: "Rotate, sync scrolling, save screenshots or video" },
        { value: "8", label: "Interface languages", detail: "Light or dark mode, five accent colors" },
        { value: "0", label: "Accounts or paid tiers", detail: "No PixelGhost analytics, ads or tracking", accent: true },
      ],
    },
    chapters: {
      eyebrow: "Inside PixelGhost",
      title: [["Six ways to look"], [{ text: "closer.", serif: true }]],
      link: { label: "How to use every tool", href: "/products/pixelghost/guide/" },
      items: [
        {
          id: "compare",
          icon: "layers",
          kicker: "Layers",
          title: "Compare with precision.",
          tagline: "Your design. On the real page.",
          description:
            "Add reference images from files, folders, your clipboard or an HTTPS link. Work with multiple layers, adjust position, scale and rotation, then use opacity and blend modes to reveal mismatches.",
          points: [
            "Files, folders, clipboard or an HTTPS link",
            "Multiple layers, autosaved for each page",
            "Position, scale and rotation",
            "Opacity and blend modes",
          ],
          footnote: { before: "Hold", keys: ["\\"], after: "to hide the reference · Arrows nudge 1px" },
          visual: {
            kind: "image",
            src: "/products/pixelghost/store-comparison.png",
            alt: "PixelGhost overlay at 55% opacity revealing a call-to-action button 8 pixels out of place.",
            width: 1280,
            height: 800,
          },
        },
        {
          id: "capture",
          icon: "camera",
          kicker: "Screenshot · Editor · Steps",
          title: "Capture the details.",
          tagline: "Mark it up. Walk it through.",
          description:
            "Screenshot a full page, visible area or element. Add arrows, notes, highlights and blur, or crop in the editor. Combine captures into a Steps walkthrough and save or copy the finished picture.",
          points: [
            "Full page, visible area, an area or one element",
            "Numbered notes, arrows, boxes, text, highlights, blur, crop",
            "Steps across pages and tabs, finished as one picture",
            "Recent keeps your last twelve, on your device",
          ],
          footnote: { before: "PixelGhost hides its own widget before every capture" },
          visual: { kind: "capture" },
        },
        {
          id: "on-page",
          icon: "ruler",
          kicker: "Color · Ruler · Inspector",
          title: "Work right on the page.",
          tagline: "No detour through DevTools.",
          terms: [
            { term: "Color Picker", text: "Sample colors, explore page palettes and check contrast." },
            { term: "Page Ruler", text: "Measure elements, spacing and alignment." },
            { term: "Inspector", text: "Read computed styles, inspect the box model and try temporary CSS or font changes." },
          ],
          termsLayout: "stack",
          footnote: { keys: ["Alt", "Shift", "C"], after: "starts the screen eyedropper" },
          visual: {
            kind: "image",
            src: "/products/pixelghost/store-widget-tools.png",
            alt: "The PixelGhost floating widget beside its five on-page tools: Layers, Screenshot, Color Picker, Page Ruler and Inspector.",
            width: 1280,
            height: 800,
          },
        },
        {
          id: "devices",
          icon: "devices",
          kicker: "Device Simulator",
          title: "Preview more screens.",
          tagline: "More screens. One workspace.",
          description:
            "Compare up to six device frames side by side. Rotate, sync scrolling and save screenshots or video. Pick phones, foldables, tablets or laptops — or build your own device.",
          footnote: { before: "Runs in your desktop browser · Not a replacement for real-device testing" },
          visual: {
            kind: "image",
            src: "/products/pixelghost/store-devices.png",
            alt: "The Device Simulator previewing the same page on an iPhone 16 and a Pixel 9 side by side.",
            width: 1280,
            height: 800,
          },
          wide: true,
        },
        {
          id: "beneath",
          icon: "search",
          kicker: "DevTools side panel",
          title: "Look beneath the design.",
          tagline: "Understand the whole page.",
          terms: [
            { term: "Assets", text: "Find and save images, icons, fonts and media." },
            { term: "Vision", text: "Preview color-vision and sight-loss effects." },
            { term: "SEO", text: "Review metadata, headings, links, structured data and search/share previews. Run the separate AI answers Deep scan for answer-engine readiness." },
            { term: "Stack", text: "Detect frameworks, CMS platforms and libraries from page signals." },
            { term: "Element Selector", text: "Find, highlight and export CSS selector matches." },
          ],
          termsLayout: "grid",
          visual: {
            kind: "image",
            src: "/products/pixelghost/store-side-panel.png",
            alt: "The DevTools side panel's SEO audit listing things to fix across meta tags, headings, images and structured data.",
            width: 1280,
            height: 800,
          },
        },
        {
          id: "projects",
          icon: "folder",
          kicker: "Projects & history",
          title: "Pick up where you left off.",
          tagline: "Ready for your next review.",
          description:
            "Save named projects and restore references and settings for each saved page URL. Keep working from the floating widget with the popup closed. Page tools also work without a reference.",
          points: [
            "Named projects you can reuse on another page",
            "Layers remembered for each page URL",
            "Protect a layer, or a whole page, from deletion",
          ],
          visual: {
            kind: "image",
            src: "/products/pixelghost/store-projects.png",
            alt: "Saved PixelGhost projects and the page layer history.",
            width: 1280,
            height: 800,
          },
        },
      ],
    },
    paper: {
      eyebrow: "Free and local",
      title: [
        ["Every feature is ", { text: "free.", serif: true }],
        [{ text: "Your work stays yours.", dim: true }],
      ],
      lede: "No account, paid tier or trial.",
      ledeStrong: "Choose light or dark mode, five accent colors and an interface in eight languages.",
      card: {
        icon: "shield",
        title: "Local-first by design.",
        body: "Workspaces, preferences, captures and score histories stay in your browser profile. No PixelGhost analytics, ads, tracking or uploads to an operator or AI analysis server.",
        fine: "Selected images, fonts, previews and site checks still make web requests. Device frames load the site with its usual browser session. Page scripts may inspect references displayed on that page.",
        link: { label: "Read the privacy policy", href: "/products/pixelghost/privacy/" },
      },
      terms: [
        { term: "IndexedDB", text: "URL-keyed workspaces, images and named projects, the last twelve screenshots, a Steps walkthrough in progress, and up to twenty SEO deep-scan results per page." },
        { term: "Local storage", text: "Consent, display and tool preferences, recent colors, selector rules and custom devices." },
        { term: "Recordings", text: "Saved to your device and not retained in the extension." },
        { term: "Clipboard", text: "Read access is optional and requested only when you select Paste. Ordinary Ctrl+V paste works without it." },
      ],
    },
    closer: {
      kind: "keyboard",
      eyebrow: "Keyboard shortcuts",
      title: [["Hands on ", { text: "the keys.", serif: true }]],
      lede: "Use Ctrl on Windows and Linux, Command on macOS. Change the widget binding in your browser’s extension shortcut settings.",
      shortcuts: [
        { keys: ["Alt", "Shift", "G"], action: "Show or hide the widget and overlays", when: "Browser command" },
        { hold: true, keys: ["\\"], action: "Hide the reference temporarily", when: "Widget and overlay visible" },
        { keys: ["← ↑ → ↓"], action: "Nudge by 1 pixel; add Shift for 10", when: "Widget and overlay visible" },
        { keys: ["Ctrl/Cmd", "V"], action: "Add a copied image", when: "Popup, or page with the widget visible, outside editable fields" },
        { keys: ["Alt", "Shift", "C"], action: "Start the screen eyedropper", when: "Color Picker open" },
        { keys: ["Alt", "Shift", "1 2 3"], action: "Select an area, capture the visible page, capture the full page", when: "Screenshot open" },
      ],
      link: { label: "The complete shortcut table", href: "/products/pixelghost/guide/#keyboard-shortcuts" },
      notesTitle: "Good to know",
      notes: [
        { lead: "Protected browser pages are unsupported;", text: "framing restrictions can limit device previews." },
        { lead: "Vision effects are approximations,", text: "not medical assessments or accessibility certification." },
        { lead: "AI answers uses a local, deterministic rubric", text: "with same-site probes; scores do not predict rankings or citations." },
        { lead: "Stack detection can be incomplete", text: "and is not a vulnerability scan." },
      ],
    },
    docs: {
      lede: "How each tool works, what PixelGhost stores, and where to get help.",
      ledeStrong: "Licensed under Apache 2.0.",
      items: [
        { label: "Guide", title: "How to use the tools", text: "Every tool, step by step, with the complete shortcut table.", href: "/products/pixelghost/guide/" },
        { label: "Support", title: "Support & issues", text: "Search known issues or report a bug on GitHub.", href: "/products/pixelghost/support/" },
        { label: "Policy", title: "Privacy policy", text: "What PixelGhost handles, where it stays and how to delete it.", href: "/products/pixelghost/privacy/" },
        { label: "Open source", title: "Third-party notices", text: "The open-source packages that ship inside the extension.", href: "/products/pixelghost/notices/" },
      ],
    },
    cta: {
      eyebrow: "Get PixelGhost",
      title: [["Ready for your"], ["next ", { text: "review?", serif: true, accent: true }]],
      text: "Add it to Chrome, open the page you are reviewing and press Alt+Shift+G.",
      secondary: { label: "Public docs", href: "https://github.com/AbhishekSRajput/pixelghost" },
    },
    support: {
      repo: {
        owner: "AbhishekSRajput",
        name: "pixelghost",
        issuesUrl: "https://github.com/AbhishekSRajput/pixelghost/issues",
        newIssueUrl: "https://github.com/AbhishekSRajput/pixelghost/issues/new",
      },
      intro: {
        strong: "PixelGhost support happens in the open, on GitHub Issues.",
        body: "Bug reports, questions and suggestions live in the public PixelGhost repository — so a fix or workaround found once can help everyone who runs into the same thing.",
      },
      steps: [
        { title: "Rule out the page", text: "PixelGhost works on ordinary http:// and https:// pages. Reload a supported page and try the action again." },
        { title: "Search existing issues", text: "Someone may have reported it already. If so, add what you are seeing to that issue instead of starting a new one.", link: "issues" },
        { title: "Open a new issue", text: "Describe the problem with the details listed below. Keep private images, URLs and data out — issues are public.", link: "new" },
        { title: "Follow the thread", text: "Questions and fixes are answered on the issue itself. Subscribe on GitHub to be notified when it changes." },
      ],
      checks: {
        title: [["Three quick ", { text: "checks.", serif: true }]],
        lede: "Most surprises come from the page, the shortcut or the site’s framing rules.",
        ledeStrong: "These take a minute.",
        items: [
          { icon: "browser", title: "Supported pages", text: "Browser-internal pages, extension stores and other restricted pages do not allow extensions to inject overlays. If the affected page is supported, reload it and try the action again before reporting." },
          { icon: "keyboard", title: "Keyboard shortcuts", text: "Check the widget toggle in Chrome’s extension shortcut settings: Alt+Shift+G is the suggested default and may be unassigned if it conflicts with another shortcut. Color and capture shortcuts need their tools open.", link: { label: "Shortcut guide", href: "/products/pixelghost/guide/#keyboard-shortcuts" } },
          { icon: "devices", title: "Device previews", text: "Previews load the site in frames and can be limited by its framing rules. Say whether Allow framing, High fidelity or Stay on after reload was on. Previews use your desktop browser’s engine." },
        ],
      },
      include: [
        "The PixelGhost version and Chrome version.",
        "Clear steps to reproduce the problem.",
        "What you expected and what happened instead.",
        "The affected tool: Layers, Color, Ruler, Inspector, Screenshot, its editor or Steps, Devices, Element Selector, Assets, Vision, SEO, or Stack.",
        "Whether the popup or side panel was open, and whether reloading the page changes the result. For keyboard issues, your operating system.",
        "Screenshots or error messages, if they are safe to share.",
      ],
      template: [
        "**PixelGhost version:**",
        "**Chrome version:**",
        "**Tool:** Layers / Screenshot / Devices / …",
        "**Popup or side panel open:** yes / no",
        "",
        "### Steps to reproduce",
        "1.",
        "2.",
        "",
        "### Expected",
        "",
        "### What happened",
      ],
      privacy: {
        keepOut: "Private overlay images, captures or recordings, audit exports, sensitive page URLs, personal information, or other confidential data.",
        emailFor: "Privacy requests, security reports, or support that requires private details.",
      },
      faq: [
        { question: "Why doesn’t PixelGhost run on every page?", answer: "PixelGhost works on ordinary HTTP and HTTPS pages. Browser-internal pages, extension stores and other restricted pages do not allow overlays. On a supported page, reload and try the action again." },
        { question: "Alt+Shift+G doesn’t do anything.", answer: "The shortcut can be unassigned if another extension uses it, so check Chrome’s extension shortcut settings. It also does nothing before first-use consent or on a browser-restricted page." },
        { question: "Do I need an overlay to use the inspection tools?", answer: "No. Open a supported page and launch a tool from the popup’s TOOLS section or the icon rail in the on-page widget. The inspection tools work without an overlay layer." },
        { question: "Why did my overlay disappear when I opened a tool?", answer: "Color Picker and Element Selector temporarily stand overlay layers aside so they read the page itself. Inspector does the same by default; Show design keeps the reference visible. Page Ruler keeps the overlay visible, and Screenshot lets you choose whether to include it." },
        { question: "A site won’t load in the Device Simulator.", answer: "Sites that refuse framing with X-Frame-Options can still be previewed. A site whose Content-Security-Policy refuses offers Allow framing. That exception applies only to the page’s exact origin in this tab, until the simulator closes." },
        { question: "Do I have to allow clipboard access?", answer: "No. The Paste button asks for optional clipboard-read permission when you select it. You can decline and use local files, a folder, an HTTPS image URL, or ordinary Ctrl+V paste instead." },
        { question: "Where do my screenshots go?", answer: "Only where you send them: a file you save or the clipboard you copy to. Recent keeps your last twelve on your device so you can copy or save them again; Clear all deletes them. Captures are never uploaded." },
      ],
    },
    notices: {
      intro: "PixelGhost includes software developed by third parties. This covers the production packages and build-generated runtime and CSS in the distributed extension, built from the committed lockfile.",
      introStrong: "Build-time and test-only tools that emit no distributed code are not listed.",
      groups: [
        {
          title: "Build-generated runtime and CSS",
          packages: [
            { name: "Vite", version: "5.4.21", license: "MIT", role: "Module-preload runtime", source: "https://github.com/vitejs/vite/tree/v5.4.21/packages/vite", sourceLabel: "vitejs/vite" },
            { name: "@crxjs/vite-plugin", version: "2.7.1", license: "MIT", role: "Extension/content loader runtime", source: "https://github.com/crxjs/chrome-extension-tools/tree/v2.7.1/packages/vite-plugin", sourceLabel: "crxjs/chrome-extension-tools" },
            { name: "Tailwind CSS", version: "3.4.19", license: "MIT", role: "Preflight and generated utility CSS", source: "https://github.com/tailwindlabs/tailwindcss/tree/v3.4.19", sourceLabel: "tailwindlabs/tailwindcss" },
            { name: "tailwindcss-animate", version: "1.0.7", license: "MIT", role: "Generated animation CSS", source: "https://github.com/jamiebuilds/tailwindcss-animate/tree/v1.0.7", sourceLabel: "jamiebuilds/tailwindcss-animate" },
          ],
        },
        {
          title: "React and Preact runtimes",
          packages: [
            { name: "React", version: "18.3.1", license: "MIT", source: "https://github.com/facebook/react/tree/v18.3.1/packages/react", sourceLabel: "facebook/react" },
            { name: "React DOM", version: "18.3.1", license: "MIT", source: "https://github.com/facebook/react/tree/v18.3.1/packages/react-dom", sourceLabel: "facebook/react" },
            { name: "Scheduler", version: "0.23.2", license: "MIT", source: "https://github.com/facebook/react/tree/v18.3.1/packages/scheduler", sourceLabel: "facebook/react" },
            { name: "Preact", version: "10.29.8", license: "MIT", source: "https://github.com/preactjs/preact/tree/10.29.8", sourceLabel: "preactjs/preact" },
          ],
        },
        {
          title: "Libraries",
          packages: [
            { name: "Zustand", version: "5.0.14", license: "MIT", source: "https://github.com/pmndrs/zustand/tree/v5.0.14", sourceLabel: "pmndrs/zustand" },
            { name: "idb", version: "8.0.3", license: "ISC", source: "https://github.com/jakearchibald/idb/tree/v8.0.3", sourceLabel: "jakearchibald/idb" },
            { name: "lucide-react", version: "0.462.0", license: "ISC", source: "https://github.com/lucide-icons/lucide/tree/0.462.0/packages/lucide-react", sourceLabel: "lucide-icons/lucide" },
            { name: "thinking-orbs", version: "0.3.2", license: "MIT", role: "One ported animation: the “working” orb at its 20px preset", source: "https://github.com/Jakubantalik/Libraries.dev", sourceLabel: "Jakubantalik/Libraries.dev" },
          ],
        },
      ],
      licenses: [
        {
          name: "MIT License",
          appliesTo: "Vite, @crxjs/vite-plugin, Tailwind CSS, tailwindcss-animate, React, React DOM, Scheduler, Preact, Zustand, thinking-orbs",
          copyrights: [
            "Copyright (c) 2019-present, VoidZero Inc. and Vite contributors",
            "Copyright (c) 2019 jacksteamdev",
            "Copyright (c) Tailwind Labs, Inc.",
            "Copyright (c) 2020 Jamie Kyle",
            "Copyright (c) Facebook, Inc. and its affiliates.",
            "Copyright (c) 2015-present Jason Miller",
            "Copyright (c) 2019 Paul Henschel",
            "Copyright (c) 2026 Jakub Antalik",
          ],
          paragraphs: MIT_TEXT,
        },
        {
          name: "ISC License",
          appliesTo: "idb, lucide-react",
          copyrights: ["Copyright (c) 2016, Jake Archibald <jaffathecake@gmail.com>", LUCIDE_COPYRIGHT],
          paragraphs: ISC_TEXT,
        },
      ],
      own: "The PixelGhost source code is provided under the Apache License 2.0. The third-party licenses above apply to their respective components and are not replaced by PixelGhost’s project license.",
    },
  },
  youscroll: {
    logo: "/products/youscroll/logo.png",
    label: "Chrome extension · YouTube",
    hasGuide: false,
    hasPricing: true,
    nextLine: "Keep watching. Keep exploring.",
    hero: {
      meta: { accent: "Free", text: "No account · No analytics · No remote code" },
      eyebrow: "Comments, doodles & GIFs for YouTube",
      title: [["Keep watching."], ["Keep ", { text: "exploring.", serif: true, accent: true, swoosh: true }]],
      lead: "On YouTube, reading the comments pushes the video off the top of the screen.",
      body: "YouScroll gives Comments and Up Next their own full-height panel beside the player, and adds a Video playground for doodles, GIFs, throws and face effects over the video — all on your device.",
      secondary: { label: "See how it works", href: "#how-it-works" },
      image: {
        src: "/products/youscroll/store-panel.png",
        alt: "YouScroll store illustration: Comments and Up Next in a full-height panel beside the video, with the Play button above it.",
        position: "96% 30%",
        caption: "Read the comments. Keep the video in view.",
        credit: "Supplied preview",
      },
      note: { before: "Runs on youtube.com and nowhere else" },
      motto: "Watch ↔ Read ↔ Play",
    },
    overview: {
      eyebrow: "Deliberately narrow",
      title: [["One page."], [{ text: "A better ", dim: true }, { text: "flow.", serif: true, dim: true }]],
      lede: "YouScroll improves the YouTube watch page and draws on top of the video — nothing else.",
      ledeStrong: "Local-first, with no developer-operated data server.",
      facts: [
        { value: "1", label: "Site it runs on", detail: "www.youtube.com — no other sites, tabs or history" },
        { value: "4", label: "Playground tools", detail: "Doodle, GIFs, Throw and Faces, over the video" },
        { value: "10", label: "Built-in reaction GIFs", detail: "Plus your own, optimized losslessly on the device" },
        { value: "0", label: "Network requests of its own", detail: "No analytics, advertising SDK or remote code", accent: true },
      ],
    },
    chapters: {
      eyebrow: "Inside YouScroll",
      title: [["The video stays."], ["The page ", { text: "moves around it.", serif: true }]],
      link: { label: "See pricing for watch parties", href: "/products/youscroll/pricing/" },
      items: [
        {
          id: "comments",
          icon: "panel",
          kicker: "Comments · Up Next",
          title: "Comments get their own column.",
          tagline: "Read without losing the video.",
          description:
            "Comments and Up Next share a full-height panel beside the player and scroll in separate panes without moving it. Choose which pane opens first, and YouTube’s own comment loading keeps working as you reach the bottom.",
          points: ["Separate panes, no page scroll", "Pick the pane that opens first", "YouTube’s own loading, untouched"],
          visual: {
            kind: "image",
            src: "/products/youscroll/store-panel.png",
            alt: "A watch page with Comments and Up Next in a full-height panel beside the video.",
            width: 1280,
            height: 800,
          },
        },
        {
          id: "doodle",
          icon: "layers",
          kicker: "Video playground · Doodle",
          title: "Draw right on the moment.",
          tagline: "Mark it, then clear it.",
          description:
            "Open the Video playground directly in Doodle, with a pen, eraser, six colors and an adjustable size. Undo with Ctrl+Z or clear everything at once; the video keeps playing underneath.",
          points: ["Pen, eraser and six colors", "Undo (Ctrl+Z) and Clear all"],
          visual: {
            kind: "image",
            src: "/products/youscroll/store-doodle.png",
            alt: "The Video playground's Doodle tab, with a circle, a star and an arrow drawn over the video.",
            width: 1280,
            height: 800,
          },
        },
        {
          id: "gifs",
          icon: "image",
          kicker: "Video playground · GIFs",
          title: "Your GIFs. Original quality.",
          tagline: "Ready next time.",
          description:
            "Add one of ten included reaction GIFs, or import your own and drag and resize them over the video. Up to four play together. Lossless local optimization keeps every pixel, frame, timing and transparency, and Saved GIFs keeps up to 12 files and 6 MiB on this device.",
          points: ["Ten included reaction GIFs", "Import GIFs up to 64 MiB", "Saved on this device, never uploaded"],
          visual: {
            kind: "image",
            src: "/products/youscroll/store-gifs.png",
            alt: "The GIFs tab with an imported GIF placed over the video and a Saved GIFs shelf.",
            width: 1280,
            height: 800,
          },
        },
        {
          id: "throw",
          icon: "stack",
          kicker: "Video playground · Throw",
          title: "A little mischief.",
          tagline: "Eight ways to throw it.",
          description:
            "Throw tomatoes, eggs, slime, confetti, flowers, hearts, stars or snowballs, with flight arcs, squash and particle bursts that respect reduced-motion preferences.",
          points: ["Eight throwables", "Respects reduced motion"],
          visual: {
            kind: "image",
            src: "/products/youscroll/store-throw.png",
            alt: "The Throw tab, with a tomato, slime, confetti, a heart and a star splatted over the video.",
            width: 1280,
            height: 800,
          },
        },
        {
          id: "faces",
          icon: "eye",
          kicker: "Video playground · Faces",
          title: "Try a disguise.",
          tagline: "Or bring your own.",
          description:
            "Add a moustache, horns, hair, a hero mask, a pirate patch, red charging Laser Eyes or a Super Saiyan power-up, or import a PNG, JPEG or WebP as your own sticker. Local face landmarks follow position and rotation. Tracking starts only when you pick a sticker; it does not identify people, upload frames or save face geometry.",
          points: ["Seven built-in effects", "Your own PNG, JPEG or WebP", "Processed on the device only"],
          visual: {
            kind: "image",
            src: "/products/youscroll/store-faces.png",
            alt: "The Faces tab with its sticker choices, including Laser eyes, Super Saiyan and a custom asset.",
            width: 1280,
            height: 800,
          },
        },
        {
          id: "picture-in-picture",
          icon: "pip",
          kicker: "Picture-in-Picture",
          title: "Pop the video out.",
          tagline: "Float it above everything.",
          description:
            "Open the current video in the browser’s own Picture-in-Picture window from a button in the player controls, so it floats above your other applications.",
          points: ["Toggle each feature from the toolbar popup", "Changes apply in open tabs, without a reload"],
        },
        {
          id: "watch-together",
          icon: "devices",
          kicker: "Coming soon · Watch together",
          title: "Watch it together.",
          tagline: "Joining is always free.",
          description:
            "Start a party, share a code, and watch the same YouTube video in sync with friends, with chat and reactions everyone sees. Joining a party is always free. Hosting starts with a 40-day free trial, then a paid plan. Watch parties are not in the store version yet.",
          points: ["Synced play, pause and seek", "Free to join", "40-day free trial for hosts"],
        },
      ],
    },
    paper: {
      eyebrow: "Where it runs",
      title: [["One site."], [{ text: "Your device, ", dim: true }, { text: "your files.", serif: true, dim: true }]],
      lede: "No YouScroll account, analytics service, advertising SDK or developer-operated data server.",
      ledeStrong: "Granted host access is limited to www.youtube.com.",
      card: {
        icon: "shield",
        title: "Local-first, deliberately narrow.",
        body: "Settings use Chrome sync. GIFs you choose to save stay in this browser’s local extension storage and never sync or upload. Doodles, throws, GIF placements, imported face images, sampled frames and face geometry stay in tab memory.",
        fine: "No comment text, video title, channel name, search query or watch history is read, logged, stored or transmitted. Extension controls are ordinary elements in the page, so scripts on that page can see them just as they can see the rest of it.",
        link: { label: "Read the privacy policy", href: "/products/youscroll/privacy/" },
      },
      terms: [
        { term: "Host access", text: "https://www.youtube.com/* only — to rearrange the watch page, add controls and draw extension-owned overlays." },
        { term: "Storage", text: "chrome.storage.sync holds one settings object. chrome.storage.local holds only the GIFs you save: up to 12 files and 6 MiB." },
        { term: "Face tracking", text: "Starts only when you pick a face sticker. A bundled model samples video pixels on the device; nothing is downloaded at runtime or uploaded." },
        { term: "Not used", text: "No tabs, scripting, webRequest, history, cookies or <all_urls> permission, and no background service worker." },
      ],
    },
    closer: {
      kind: "cards",
      eyebrow: "Good manners",
      title: [["It steps aside, ", { text: "on purpose.", serif: true }]],
      lede: "Every borrowed page element returns to its original place.",
      ledeStrong: "Switch a feature off or navigate away and YouTube’s layout comes back exactly as it was.",
      cards: [
        { title: "Theater mode and fullscreen", text: "YouTube reflows into one wide column, so the panel steps aside. Press T or leave fullscreen and it comes back. The Play entry stays in the player controls where supported." },
        { title: "Narrow windows", text: "Below 1025 pixels wide, YouTube moves the right column underneath the video, so YouScroll steps aside completely. Widen the window and it comes back." },
        { title: "Live chat and no comments", text: "Live streams, premieres and chat replays show a chat panel instead of comments, and some videos have comments disabled. Mixes and playlists still get the panel." },
      ],
    },
    docs: {
      lede: "What YouScroll stores, what it costs, and where to get help.",
      ledeStrong: "Licensed under Apache 2.0.",
      items: [
        { label: "Support", title: "Support & issues", text: "Search known issues or report one on GitHub.", href: "/products/youscroll/support/" },
        { label: "Policy", title: "Privacy policy", text: "Settings, saved GIFs, local face tracking and, for watch parties, accounts.", href: "/products/youscroll/privacy/" },
        { label: "Plans", title: "Pricing", text: "Free to use and to join parties. Hosting has a 40-day free trial.", href: "/products/youscroll/pricing/" },
        { label: "Terms", title: "Terms of service", text: "The rules for using YouScroll and its paid plan.", href: "/products/youscroll/terms/" },
        { label: "Refunds", title: "Refund policy", text: "Cancelling, refunds and how to ask for one.", href: "/products/youscroll/refunds/" },
        { label: "Open source", title: "Third-party notices", text: "The open-source packages, model and assets inside the extension.", href: "/products/youscroll/notices/" },
      ],
    },
    cta: {
      eyebrow: "Get YouScroll",
      title: [["Keep the video"], ["in ", { text: "view.", serif: true, accent: true }]],
      text: "Add it to Chrome and open any YouTube video.",
      secondary: { label: "See pricing", href: "/products/youscroll/pricing/" },
    },
    support: {
      repo: {
        owner: "AbhishekSRajput",
        name: "public-youscroll",
        issuesUrl: "https://github.com/AbhishekSRajput/public-youscroll/issues",
        newIssueUrl: "https://github.com/AbhishekSRajput/public-youscroll/issues/new",
      },
      intro: {
        strong: "YouScroll support happens in the open, on GitHub Issues.",
        body: "Bug reports, questions and suggestions live in the public YouScroll repository — so a fix or workaround found once can help everyone who runs into the same thing.",
      },
      steps: [
        { title: "Check it isn’t stepping aside", text: "YouScroll stands down in theater mode, fullscreen, narrow windows, live chat and on videos without comments. If none apply, reload the page and try again." },
        { title: "Search existing issues", text: "Someone may have reported it already. If so, add what you are seeing to that issue instead of starting a new one.", link: "issues" },
        { title: "Open a new issue", text: "Describe the problem with the details listed below. Keep personal information and private video links out — issues are public.", link: "new" },
        { title: "Follow the thread", text: "Questions and fixes are answered on the issue itself. Subscribe on GitHub to be notified when it changes." },
      ],
      checks: {
        title: [["Is it stepping ", { text: "aside?", serif: true }]],
        lede: "YouScroll only runs on www.youtube.com, and only the watch page has anything for it to rearrange.",
        ledeStrong: "Each of these looks like it stopped working.",
        items: [
          { icon: "browser", title: "Theater mode and fullscreen", text: "YouTube reflows the page into one wide column, which leaves the panel nowhere sensible to live, so it steps aside. Press T or leave fullscreen and it comes back." },
          { icon: "panel", title: "Narrow windows", text: "Below 1025 pixels wide, YouTube moves the right column underneath the video and a full-height panel makes no sense, so YouScroll steps aside completely. Widen the window and it comes back." },
          { icon: "pip", title: "Live chat or no comments", text: "Videos with comments disabled, and live streams, premieres and chat replays, which show a chat panel instead of comments. A mix or playlist is not one of these — the panel should appear above YouTube’s own queue." },
          { icon: "terminal", title: "The panel stopped appearing", text: "YouTube changes its page markup without notice. Open the console on the watch page (F12, then Console) and look for a line beginning [YouScroll]. It names the piece of the page that could not be found — paste it into your issue." },
        ],
      },
      include: [
        "The YouScroll version and your Chrome version.",
        "Clear steps to reproduce the problem.",
        "What you expected and what happened instead.",
        "Whether the problem affects the comments panel, the tab bar, the pop-out button, the Video playground, or the settings popup.",
        "Any [YouScroll] line from the browser console.",
        "Your window size, if the problem looks like a layout one.",
      ],
      template: [
        "**YouScroll version:**",
        "**Chrome version:**",
        "**Affects:** comments panel / tab bar / pop-out / Video playground / popup",
        "**Window size:**",
        "**Console line:** [YouScroll] …",
        "",
        "### Steps to reproduce",
        "1.",
        "2.",
        "",
        "### Expected",
        "",
        "### What happened",
      ],
      privacy: {
        keepOut: "Personal information, private video links, screenshots containing your account details, or other confidential data. Link a specific video only when it is genuinely needed to reproduce the problem.",
        emailFor: "Privacy requests, security reports, billing questions, or support that requires private details.",
        note: "Console output from YouScroll never contains comment text, video titles or channel names by design, so a [YouScroll] line is safe to share. Screenshots of the page are not — check what is in the frame before attaching one.",
      },
      faq: [
        { question: "Why did the comments panel disappear?", answer: "The panel deliberately steps aside in theater mode, fullscreen, or windows narrower than 1025 pixels. Return to normal view and widen your window. Live streams, premieres, chat replays and videos with comments disabled do not provide a comments panel." },
        { question: "Do I need to reload after changing a setting?", answer: "No. Toggles in the toolbar popup apply to already-open tabs immediately. Switching a feature off puts YouTube’s layout back." },
        { question: "Are my GIFs or the video uploaded anywhere?", answer: "No. Imported GIFs are optimized on your device and, if they fit, saved only in this browser’s local extension storage. Doodles, throws and face effects stay in tab memory, and face tracking samples pixels locally without uploading them." },
        { question: "What if it stops working on a normal watch page?", answer: "Reload and try again. YouTube changes its page markup, which can prevent YouScroll from finding the elements it needs. When reporting a bug, include your browser and extension versions, window size, and any console line starting with [YouScroll]." },
      ],
    },
    notices: {
      intro: "YouScroll includes software developed by third parties. This covers the production packages and build-generated runtime and CSS in the distributed extension, built from the committed lockfile.",
      introStrong: "Build-time and test-only tools that emit no distributed code are not listed.",
      note: "The settings popup bundles its React UI dependencies. The content script bundles gifenc for local GIF optimization and an adapted pico face-detector fallback. An extension-owned worker bundles MediaPipe with its local model and WebAssembly runtime. Nothing is downloaded at runtime. The ten built-in GIFs were supplied by the project owner.",
      groups: [
        {
          title: "Bundled runtime packages",
          note: "@radix-ui/react-switch brings with it the Radix primitives it is built from — @radix-ui/primitive, react-compose-refs, react-context, react-primitive, react-use-controllable-state, react-use-effect-event, react-use-layout-effect and react-use-size — all published by the same project under the MIT License.",
          packages: [
            { name: "React", version: "18.3.1", license: "MIT", role: "Settings popup UI", source: "https://github.com/facebook/react/tree/v18.3.1/packages/react", sourceLabel: "facebook/react" },
            { name: "React DOM", version: "18.3.1", license: "MIT", role: "Settings popup rendering", source: "https://github.com/facebook/react/tree/v18.3.1/packages/react-dom", sourceLabel: "facebook/react" },
            { name: "@radix-ui/react-slot", version: "1.3.3", license: "MIT", role: "Popup component composition", source: "https://github.com/radix-ui/primitives", sourceLabel: "radix-ui/primitives" },
            { name: "@radix-ui/react-switch", version: "1.3.7", license: "MIT", role: "Accessible toggle in the popup", source: "https://github.com/radix-ui/primitives", sourceLabel: "radix-ui/primitives" },
            { name: "clsx", version: "2.1.1", license: "MIT", role: "Conditional class names", source: "https://github.com/lukeed/clsx/tree/v2.1.1", sourceLabel: "lukeed/clsx" },
            { name: "tailwind-merge", version: "2.6.1", license: "MIT", role: "Tailwind class deduplication", source: "https://github.com/dcastil/tailwind-merge/tree/v2.6.1", sourceLabel: "dcastil/tailwind-merge" },
            { name: "lucide-react", version: "0.462.0", license: "ISC", role: "Popup icon", source: "https://github.com/lucide-icons/lucide", sourceLabel: "lucide-icons/lucide" },
            { name: "gifenc", version: "1.0.3", license: "MIT", role: "Local lossless GIF re-encoding", source: "https://github.com/mattdesl/gifenc", sourceLabel: "mattdesl/gifenc" },
            { name: "@mediapipe/tasks-vision", version: "0.10.32", license: "Apache-2.0", role: "Local face-landmark worker and WASM", source: "https://github.com/google-ai-edge/mediapipe", sourceLabel: "google-ai-edge/mediapipe" },
          ],
        },
        {
          title: "Local face detection",
          note: "The packaged face_landmarker.task has SHA-256 64184e229b263107bc2b804c6625db1341ff2bb731874b0bcc2fe6544e0bc9ff; YouScroll disables its blendshape output. The decoded pico cascade has SHA-256 d8014993e7298c7b1865d1f8b855d6dbf4ec5c808bf879e2091ab6837abf90cd. Reference: N. Markus, M. Frljak, I. S. Pandzic, J. Ahlberg and R. Forchheimer, “Object Detection with Pixel Intensity Comparisons Organized in Decision Trees,” arXiv:1305.4537.",
          packages: [
            { name: "Face Landmarker model", version: "float16, v1", license: "Apache-2.0", role: "Packaged face_landmarker.task", source: "https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker", sourceLabel: "Google AI Edge" },
            { name: "pico.js cascade evaluator", version: "afffa50", license: "MIT", role: "Adapted local JavaScript fallback", source: "https://github.com/nenadmarkus/picojs/tree/afffa50ec4134a47005f2cbf8112eaa69f65f37e", sourceLabel: "nenadmarkus/picojs" },
            { name: "pico facefinder cascade", version: "7d550c7", license: "MIT", role: "Fallback detector cascade", source: "https://github.com/nenadmarkus/pico/tree/7d550c78b2c31a4e1dfc5bcdfe9da013297b5cc8", sourceLabel: "nenadmarkus/pico" },
          ],
        },
        {
          title: "Build-generated runtime and CSS",
          packages: [
            { name: "Vite", version: "8.1.5", license: "MIT", role: "Module-preload runtime", source: "https://github.com/vitejs/vite/tree/v8.1.5/packages/vite", sourceLabel: "vitejs/vite" },
            { name: "@crxjs/vite-plugin", version: "2.7.1", license: "MIT", role: "Content-script loader runtime", source: "https://github.com/crxjs/chrome-extension-tools/tree/v2.7.1/packages/vite-plugin", sourceLabel: "crxjs/chrome-extension-tools" },
            { name: "Tailwind CSS", version: "3.4.19", license: "MIT", role: "Preflight and generated utility CSS", source: "https://github.com/tailwindlabs/tailwindcss/tree/v3.4.19", sourceLabel: "tailwindlabs/tailwindcss" },
            { name: "tailwindcss-animate", version: "1.0.7", license: "MIT", role: "Generated animation CSS", source: "https://github.com/jamiebuilds/tailwindcss-animate/tree/v1.0.7", sourceLabel: "jamiebuilds/tailwindcss-animate" },
          ],
        },
      ],
      licenses: [
        {
          name: "MIT License",
          appliesTo: "React, React DOM, the Radix UI primitives, clsx, tailwind-merge, gifenc, the pico adaptation and cascade, Vite, @crxjs/vite-plugin, Tailwind CSS, tailwindcss-animate",
          copyrights: [
            "Copyright (c) Facebook, Inc. and its affiliates.",
            "Copyright (c) 2022 WorkOS",
            "Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)",
            "Copyright (c) 2021 Dany Castillo",
            "Copyright (c) 2017 Matt DesLauriers",
            "Copyright (c) 2013 Nenad Markus (pico and facefinder)",
            "Copyright (c) Nenad Markus (pico.js)",
            "Copyright (c) 2019-present, VoidZero Inc. and Vite contributors",
            "Copyright (c) 2019 jacksteamdev",
            "Copyright (c) Tailwind Labs, Inc.",
            "Copyright (c) 2020 Jamie Kyle",
          ],
          paragraphs: MIT_TEXT,
        },
        { name: "ISC License", appliesTo: "lucide-react", copyrights: [LUCIDE_COPYRIGHT], paragraphs: ISC_TEXT },
        {
          name: "Apache License 2.0",
          appliesTo: "@mediapipe/tasks-vision, its WASM runtime, and the Face Landmarker model",
          copyrights: ["Copyright Google LLC and the MediaPipe authors"],
          paragraphs: [
            "Licensed under the Apache License, Version 2.0. The complete license text is included as LICENSE in the distributed extension and is available at https://www.apache.org/licenses/LICENSE-2.0.",
          ],
        },
      ],
      own: "YouScroll is licensed under the Apache License 2.0; the complete license is included as LICENSE in the distributed extension. The third-party licenses above apply to their respective components and are not replaced by YouScroll’s project license.",
    },
  },
};

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
