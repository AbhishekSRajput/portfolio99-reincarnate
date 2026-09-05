# Low-level design

This document describes the implementation contracts behind the architecture in [HLD.md](./HLD.md). The source tree is authoritative when a later change updates a detail; update this document in the same change when that detail affects contributors.

## Module responsibilities

| Module                                     | Responsibility                                                                                         |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `app/layout.tsx`                           | Document language, font variables, default metadata, shared header and footer                          |
| `app/page.tsx`                             | Homepage sections and composition of content with interactive artwork                                  |
| `app/globals.css`                          | Semantic theme tokens, shared primitives, page styles, artwork, breakpoints, motion and print behavior |
| `app/products/[slug]/page.tsx`             | Product lookup, static parameters, route metadata, feature content, store/source actions               |
| `app/products/pixelghost/privacy/page.tsx` | Product-specific privacy content                                                                       |
| `app/products/pixelghost/support/page.tsx` | Product-specific support content and native disclosure questions                                       |
| `app/journal/page.tsx`                     | Notebook introduction and filtered list composition                                                    |
| `app/journal/[slug]/page.tsx`              | Note lookup, static parameters, metadata, excerpt, and draft status                                    |
| `app/not-found.tsx`                        | Branded missing-route page and recovery navigation                                                     |
| `components/site-shell.tsx`                | Header navigation, theme and motion controls, progress indicator, and footer                           |
| `components/hero-cube.tsx`                 | CSS cube markup, assembly toggle, and pointer response                                                 |
| `components/product-demos.tsx`             | PixelGhost overlay concept and You'Scroll scrolling concept                                            |
| `components/notebook.tsx`                  | Tag controls, selected filter, visible notes, and result status                                        |
| `components/icons.tsx`                     | Shared SVG icons                                                                                       |
| `lib/content.ts`                           | Profile, readonly products, readonly notes, and approach traits                                        |
| `next.config.ts`                           | Static export and trailing-slash configuration                                                         |
| `scripts/check-export.mjs`                 | Export validation contract described below                                                             |
| `scripts/serve.mjs`                        | Local HTTP preview of the static output                                                                |

`Notebook` is a client component composed by the notebook page. Keep its filtered list and selected-tag state together; route modules should not duplicate filtering logic.

## Content contracts

`lib/content.ts` exports readonly arrays using `as const`. Derive types from those arrays when a component needs a named contract, for example `(typeof projects)[number]`, rather than maintaining a parallel type that can drift.

| Object          | Fields and meaning                                                                                                                            |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `profile`       | `brand`, `email`, `github`: public identity and destination values                                                                            |
| Product         | `slug`, `name`, `year`, `category`, `description`, `tagline`, `detail`, `tags`, `visualCaption`, `storeUrl`, nullable `sourceUrl`, `features` |
| Product feature | `title`, `description`: plain-language product capability                                                                                     |
| Note            | `slug`, `title`, `date`, `category`, `tags`, `excerpt`: supplied draft metadata and preview                                                   |
| Trait           | `number`, `title`, `symbol`, `description`: ordered approach statements                                                                       |

Slugs are unique within their collection and use lowercase hyphen-separated URL segments. Slugs are public addresses; renaming one is a route migration, not a harmless copy edit. A `null` source URL means no source action is rendered. Never replace it with `#`, an invented repository, or a disabled-looking link that still navigates.

Dates are editorial display strings, not timestamps used for sorting or publication status. Current notes remain drafts regardless of their displayed month. Promoting a draft requires author-approved complete content and an intentional rendering/data-model change; removing its label alone is insufficient.

Product demos contain authored sample UI, comment text, and measurements. Keep the visible concept label. Demo changes must not be described as changes to the installed browser extension.

The current product renderer selects between two known demos and provides navigation to the other known product. Adding a third product also requires extending that selection and navigation logic; adding a content record alone does not create a suitable demo.

## Routing and export contracts

Configure Next.js with:

```ts
const nextConfig = {
  output: "export",
  trailingSlash: true,
};
```

Both dynamic page modules enumerate their collection:

```tsx
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();
  // Render the matched project.
}
```

The notebook route follows the same contract with `notes`. The illustration above omits imports and rendering; it defines the required behavior rather than a second implementation. Route metadata must use the same lookup and await the same promised `params`. Draft detail metadata sets `robots: { index: false, follow: true }`. Unknown content must not produce a successful empty page or silently fall back to the first item.

Current product slugs are `pixelghost` and `youscroll`. Current notebook slugs are:

- `the-case-for-being-a-generalist`
- `reading-an-unfamiliar-codebase`
- `what-pixelghost-taught-me-about-scope`
- `small-tools-beat-big-frameworks`

With directory-style output, `/products/pixelghost/` is emitted as `out/products/pixelghost/index.html`, and equivalent mappings apply to the notebook routes. The complete page set contains the homepage, two product pages, two PixelGhost information pages, the notebook index, and four note pages, plus the generated error page and assets.

Use `next/link` for internal route navigation. Homepage section navigation can use ordinary anchors. Header section links resolve to `#work` or `#approach` on the homepage and `/#work` or `/#approach` elsewhere. Every route must provide a `main` element with `id="main-content"`. Avoid nesting a button or another link inside a card-wide link.

Static export excludes runtime server actions, request-dependent route handlers, cookies-based rendering, ISR, and unenumerated dynamic paths. Do not add the default image optimization service to a static export; any new image strategy must work without a production Next.js process.

## Shared shell state

`SiteHeader` reads `usePathname()` to generate section destinations and mark notebook navigation. It keeps `menuOpen` in React state and reads theme/motion through `useSyncExternalStore`.

- The menu button exposes `aria-expanded` and `aria-controls="primary-navigation"`. Choosing navigation closes the menu. Escape closes an open menu and returns focus to its trigger.
- Theme changes write `cc99-theme` and set `document.documentElement.dataset.theme` to `light` or `dark`. Dark is the initial CSS and server snapshot default. The button's accessible label describes the next action; `aria-pressed` describes whether light mode is selected.
- Motion changes write `cc99-motion` and set `document.documentElement.dataset.motion` to `paused` or `full`. Full is the server snapshot default. The button exposes its selected state and next action. The system reduced-motion preference remains effective even when the manual pause state is off.
- `writePreference` updates a module-level map, attempts local storage inside `try/catch`, and dispatches `cc99-preferences` so subscribers in the same document update immediately. A failed storage write still leaves the current tab functional.
- `readPreference` uses the in-memory value first, then local storage, then the fallback. Storage exceptions return the fallback. Values are interpreted strictly: only `light` selects light mode and only `paused` selects paused motion.
- `subscribePreferences` listens for the custom event and native `storage` events. A storage event invalidates the corresponding map entry, or clears the map when storage is cleared, before notifying subscribers. Cleanup removes both listeners.
- The server snapshots avoid browser API access during prerender and initial hydration. A guarded inline script in the root layout sets saved theme and motion attributes before paint. The root uses `suppressHydrationWarning` specifically for these attributes; an effect keeps them synchronized with the client store. Saved preferences persist across reloads when storage is available; with blocked storage they last only for the current tab's JavaScript lifetime. If an external CSP disables inline scripts, the effect still restores preferences after hydration, with a possible initial theme flash.

Reading progress calculates `scrollY / (scrollHeight - innerHeight)`, with zero for a non-scrollable page. A passive scroll listener and a resize listener schedule at most one outstanding animation frame. The update writes `--scroll-progress` on the root element; CSS scales the top bar from its left edge. Recalculate on path changes and remove listeners/cancel the outstanding frame during cleanup. The indicator is decorative and hidden from accessibility APIs.

Browser globals are accessed from effects, event handlers, or the external store's browser-only snapshot/subscription functions. Client components also prerender during the build; never read `window`, `document`, storage, or `matchMedia` at module initialization or in a server snapshot. Keep initial server and hydration snapshots consistent.

## Cube interaction

`HeroCube` starts exploded. Three layers each provide six CSS-transformed faces. `--layer` determines vertical position, while `data-exploded` selects assembled or separated offsets. The visible button toggles this state and communicates it through `aria-pressed`.

Mouse pointer movement is normalized against the stage bounds and mapped to a small rotation: approximately plus/minus seven degrees horizontally and five degrees vertically. Coordinates are written to `--pointer-x` and `--pointer-y` through the stage ref, avoiding React updates on each pointer event. Pointer leave resets both values.

Pointer response is skipped for touch and pen input, a manually paused document, or a reduced-motion preference. The cube is decorative and `aria-hidden`; its separate button is the accessible interaction. CSS supplies a stable viewing angle under reduced motion or pause, while the assembly action remains available without animation.

## Product concepts and notebook filtering

`PixelGhostDemo` owns an `overlay` boolean, initially on. The toolbar button changes its `aria-pressed` state and label, and the overlay changes opacity through a class. The measurement layer is decorative and cannot capture pointer events. The concept does not inspect the host page, load a mockup, or call an extension API.

`YouScrollDemo` renders a static video illustration beside a fixed-height comments region with native overflow scrolling. The region has an accessible label and `tabIndex={0}`, so a keyboard user can focus and scroll it. It does not embed or autoplay video. Comments are sample content.

The notebook derives available tags from the note data and starts with all notes visible. Selecting a tag filters by membership in `note.tags`; selecting `All notes` restores the list. Filter controls are buttons with `aria-pressed`, and the visible result count uses `role="status"` for a polite announcement. Filtering changes the current view only; it does not change the URL or claim publication status.

Support questions use native `details` and `summary` elements. Keep the summary concise and meaningful when collapsed. Native semantics and keyboard behavior are preferable to a second custom accordion state machine here.

## Tokens and responsive layout

Semantic tokens live at the top of `app/globals.css`:

| Token           | Default theme | Light theme | Use                         |
| --------------- | ------------- | ----------- | --------------------------- |
| `--bg`          | `#111210`     | `#f1f2ed`   | Main page surface           |
| `--fg`          | `#f2f3ed`     | `#20221d`   | Primary text                |
| `--muted`       | `#aaaba3`     | `#63665e`   | Secondary text              |
| `--line`        | `#353630`     | `#c9cdc0`   | Rules and control borders   |
| `--accent`      | `#ff794b`     | `#bc421d`   | Interactive emphasis        |
| `--paper`       | `#f1f2ed`     | `#e4e7dd`   | Contrasting chapter surface |
| `--ink`         | `#20221d`     | `#20221d`   | Text on paper               |
| `--paper-muted` | `#62665d`     | `#5d6256`   | Secondary text on paper     |
| `--paper-line`  | `#cdd0c5`     | `#bfc5b6`   | Rules on paper              |

`--font-sans`, `--font-mono`, and `--font-serif` are set by `next/font`. `--ease` supplies the shared easing curve, and `--focus` supplies the visible focus color with contextual overrides. Reuse semantic tokens for interface elements; artwork colors may remain local when necessary to describe an object. Check accent and focus contrast in both themes when changing a token.

`.section-wrap` has a maximum width of 1360px. Default side gutters are 56px, reducing to 36px at 1100px, 24px at 800px, and 20px at 580px. Headings use `clamp()` alongside deliberate breakpoint overrides.

| Breakpoint      | Main adaptation                                                                               |
| --------------- | --------------------------------------------------------------------------------------------- |
| At least 1600px | More hero breathing room and a larger cube                                                    |
| At most 1100px  | Tighter columns, type, and artwork details                                                    |
| At most 800px   | Product cards and product detail hero stack; footer wraps                                     |
| At most 580px   | Hero and approach stack; navigation becomes a disclosure; features stack; optional dates hide |
| At most 360px   | Compact type, cube scale, and control spacing for the smallest supported layouts              |

Do not patch an overflow by hiding the entire document's horizontal overflow without finding its source. Inspect transformed artwork, long headings, flex children, and fixed widths. Core copy and controls must fit at narrow widths and browser zoom.

## Motion, fallbacks, and print

Entrance animation changes opacity and vertical translation. Below-fold reveals are guarded by `@supports (animation-timeline: view())`; unsupported browsers receive ordinary visible content. The base stylesheet must never leave these elements permanently transparent.

`prefers-reduced-motion: reduce` disables animations and transitions and switches smooth scrolling off. The document's paused state applies equivalent overrides and stabilizes the cube angle. Hover effects must not be the only way to discover an action. Print styles remove navigation controls and decorative artwork, simplify columns, and preserve readable content.

## Validation contract

Run from the repository root:

```powershell
node --version
pnpm --version
pnpm install --frozen-lockfile
pnpm lint
pnpm build
node scripts/check-export.mjs
```

The supported development baseline is Node `24.20.0` and pnpm `12.3.4`. `pnpm check:export` is an alias for `node scripts/check-export.mjs`. The checker uses Node built-ins and inspects exported HTML. It verifies a minimum document count; one `h1`, a title, and the skip target per document; no starter title; existing local anchor, link, script, and image destinations; draft notices and noindex metadata; and both product pages with Chrome Web Store links. Failures exit nonzero.

Local references are resolved against `out/`, traversal outside it is rejected, query strings are excluded from file lookup, and document fragments are checked against destination IDs. HTTP(S), email, data, and telephone destinations are skipped. The check does not validate external availability, parse every possible CSS/HTML asset reference, or establish visual accessibility.

After building, run `pnpm start` or `node scripts/serve.mjs` for a static preview. The script defaults to `127.0.0.1:3000` and reads `HOST` and `PORT` when supplied. It requires `out/index.html`, supports GET and HEAD, redirects directory paths to trailing slashes, serves the exported 404 for missing paths, and rejects a resolved file path outside `out/`. It is a local preview helper, not a production CDN or hardened public server.

Lint, type/build validation, and export validation do not replace visual or interaction checks. Inspect desktop, tablet, and narrow mobile layouts in both themes; direct-load every route family; exercise keyboard navigation, menu Escape behavior, filters, cube states, overlay states, independent comments scrolling, support disclosures, and reduced-motion/manual pause modes. Preference changes also need reload, cross-tab, and blocked-storage checks. Record what was actually checked, and distinguish proposed checks from successful executions.
