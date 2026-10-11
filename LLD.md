# Low-level design

This document describes the implementation contracts behind the architecture in [HLD.md](./HLD.md). The source tree is authoritative when a later change updates a detail; update this document in the same change when that detail affects contributors.

## Module responsibilities

| Module                                     | Responsibility                                                                                         |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `app/layout.tsx`                           | Document language, font variables, default metadata, shared header and footer                          |
| `app/page.tsx`                             | Homepage sections, server-rendered hero content (rendered twice for the lens), and content composition |
| `app/home.css`                             | Homepage-only tokens, layout, artwork, and motion; every selector scoped to `main.home`                 |
| `app/globals.css`                          | Semantic theme tokens, shared primitives, page styles, artwork, breakpoints, motion and print behavior |
| `app/products/layout.tsx`                  | Loads `products.css` for every product route                                                           |
| `app/products/products.css`                | Product template tokens, layout, artwork tints and breakpoints; every class prefixed `pp-`             |
| `app/products/[slug]/page.tsx`             | Product lookup, static parameters, metadata, and composition of the shared product home               |
| `app/products/[slug]/support/page.tsx`     | Shared support page: GitHub Issues flow, checks, report outline, privacy, native disclosure answers    |
| `app/products/[slug]/notices/page.tsx`     | Shared third-party notices: package table and disclosed license texts                                 |
| `app/products/pixelghost/guide/page.tsx`   | Supplied PixelGhost tools guide with section navigation and the complete shortcut table               |
| `app/products/pixelghost/privacy/page.tsx` | Full supplied PixelGhost policy with section navigation                                                |
| `app/products/youscroll/privacy/page.tsx`  | Full supplied YouScroll policy with section navigation                                                   |
| `app/journal/page.tsx`                     | Notebook introduction and filtered list composition                                                    |
| `app/journal/[slug]/page.tsx`              | Note lookup, static parameters, metadata, excerpt, and draft status                                    |
| `app/not-found.tsx`                        | Branded missing-route page and recovery navigation                                                     |
| `app/robots.ts`, `app/sitemap.ts`           | Build-time portfolio crawler rules and canonical URL sitemap                                           |
| `app/products/pixelghost/robots.txt/route.ts`, `app/products/pixelghost/sitemap.ts` | Build-time PixelGhost discovery files selected by host routing                       |
| `app/share/{portfolio,pixelghost,youscroll}.png/route.tsx` | Static GET handlers exporting the three PNG share images                                |
| `components/site-shell.tsx`                | Header navigation and highlight, route-aware theme control, saved motion preference, progress indicator, and footer |
| `components/hero-lens.tsx`                 | Hero surface and inert blueprint layers, measured annotations, lens motion, and readout                |
| `components/work-stack.tsx`                | Sticky product cards that recede as the next card covers them                                          |
| `components/approach.tsx`                  | Scroll-assembled cube and the active approach principle                                                |
| `components/contact.tsx`                   | Contact headline lens and the copy-email button                                                        |
| `components/motion.ts`                     | Shared `clamp` and the reduced-motion/saved-pause check for client motion                              |
| `components/product-demos.tsx`             | PixelGhost overlay concept and You'Scroll scrolling concept                                            |
| `components/product-ui.tsx`                | Product bar (replaces the site header on product routes), headline phrases, keys, action links, documentation intro, sections and section index |
| `components/product-link.tsx`              | Native anchor navigation through the canonical URL helper                                             |
| `components/product-home.tsx`              | Product home sections: hero, facts, feature chapters, drawn capture summary, paper band, closer, docs  |
| `components/product-icons.tsx`             | Stroke icons for product chapters, guide sections and support cards                                    |
| `components/notebook.tsx`                  | Tag controls, selected filter, visible notes, and result status                                        |
| `components/icons.tsx`                     | Shared SVG icons                                                                                       |
| `components/social-image.tsx`              | Build-time 1200 × 630 PNG artwork using `ImageResponse`, shared content, and supplied logos                |
| `components/structured-data.tsx`           | Server-rendered JSON-LD serialization with escaped `<` characters                                       |
| `lib/content.ts`                           | Profile, readonly products, readonly notes, and approach traits                                        |
| `lib/site-urls.ts`                         | Canonical portfolio/PixelGhost origins and navigation URL mapping                                      |
| `lib/site-discovery.ts`                    | Canonical sitemap entries derived from portfolio routes, products, and documentation destinations       |
| `lib/seo.ts`                               | Explicit page/product metadata, canonical share-image URLs, and factual homepage structured data         |
| `next.config.ts`                           | Static export and trailing-slash configuration                                                         |
| `vercel.json`                              | Generic static deployment of `out/` with ordered PixelGhost host routes before filesystem handling      |
| `scripts/check-export.mjs`                 | Export validation contract described below                                                             |
| `scripts/serve.mjs`                        | Local HTTP preview of the static output, including host-specific routing                                |

`Notebook` is a client component composed by the notebook page. Keep its filtered list and selected-tag state together; route modules should not duplicate filtering logic.

## Content contracts

`lib/content.ts` exports readonly arrays using `as const`. Derive types from those arrays when a component needs a named contract, for example `(typeof projects)[number]`, rather than maintaining a parallel type that can drift.

| Object          | Fields and meaning                                                                                                                            |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `profile`       | `brand`, `displayName`, `tagline`, `description`, `email`, `github`: shared public identity, metadata copy, and destination values               |
| Product         | `slug`, `name`, `year`, `category`, `description`, `tagline`, `detail`, `tags`, `visualCaption`, `storeUrl`, nullable `sourceUrl`, `features` |
| Product feature | `title`, `description`: plain-language product capability                                                                                     |
| Note            | `slug`, `title`, `date`, `category`, `tags`, `excerpt`: supplied draft metadata and preview                                                   |
| Trait           | `number`, `title`, `symbol`, `description`: ordered approach statements                                                                       |

Slugs are unique within their collection and use lowercase hyphen-separated URL segments. Slugs are public addresses; renaming one is a route migration, not a harmless copy edit. A `null` source URL means no source action is rendered. Never replace it with `#`, an invented repository, or a disabled-looking link that still navigates.

Dates are editorial display strings, not timestamps used for sorting or publication status. Current notes remain drafts regardless of their displayed month. Promoting a draft requires author-approved complete content and an intentional rendering/data-model change; removing its label alone is insufficient.

Product demos contain authored sample UI, comment text, and measurements. Keep the visible concept label. Demo changes must not be described as changes to the installed browser extension.

Every product uses one template. `productGuides[product.slug]` is a typed `ProductGuide`: logo and label, hero copy and supplied artwork with its crop position, overview facts, feature chapters, the paper-band summary, a closing section (`keyboard` shortcuts or `cards`), documentation links, the closing call, plus `support` and `notices` data for the shared support and notices routes. Headings are `Headline` lines of `Phrase` runs, where an object phrase adds the serif italic, accent, dimmed or swoosh treatment. A chapter's `visual` is a supplied store image, the drawn Screenshot summary, or absent; chapters without a supplied image render as text-only cards until assets exist, never as placeholders. The next-product link derives from `projects`. The homepage retains its two illustrative demos and reads only `productGuides[slug].logo`; adding another product requires a complete guide entry, a policy page, and a homepage demo. Product pages and policy content remain Server Components. Store images keep their supplied aspect ratios and use `next/image` with `unoptimized` for static export. Policies and the tools guide reproduce supplied author text; tables become labelled lists, and the section index links to stable anchors. Keep claims within the public docs: YouScroll overview copy omits the README's comment-count statement, which its policy contradicts.

`products.css` scopes product tokens (`--raised`, `--hair`, `--body`, artwork `--tint-*` and `--tile-*`) to `.pp`, with `.pp-youscroll` and `[data-theme="light"]` overrides. Paper sections and cards remap `--fg`, `--bg`, `--muted` and `--accent` to the paper palette so shared pills and links stay legible. The section index is sticky from 1026px and flows into columns below; shortcut rows stack at 767px. No client state or extension keyboard bindings are installed by these documentation pages.

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

With directory-style output, `/products/pixelghost/` is emitted as `out/products/pixelghost/index.html`, and equivalent mappings apply to the notebook routes. The complete page set contains the homepage, two product homes, the PixelGhost tools guide, two support pages, two privacy pages, two notices pages, the notebook index, and four note pages, plus the generated error page and assets. Support and notices use `app/products/[slug]/…` with the same `generateStaticParams()` contract; the guide and privacy pages are static per-product folders, which Next.js matches before the dynamic segment.

The canonical portfolio host is `www.codecube99.com`; the PixelGhost host is `pixelghost.codecube99.com`. Vercel is configured with `framework: null`, `buildCommand: "pnpm build && pnpm check:export"`, and `outputDirectory: "out"` so it validates and serves the static export directly. Ordered routes in `vercel.json` match the PixelGhost host and serve these existing documents before filesystem handling:

| PixelGhost URL | Exported document |
| -------------- | ----------------- |
| `/` | `products/pixelghost/index.html` |
| `/guide/` | `products/pixelghost/guide/index.html` |
| `/privacy/` | `products/pixelghost/privacy/index.html` |
| `/support/` | `products/pixelghost/support/index.html` |
| `/notices/` | `products/pixelghost/notices/index.html` |
| `/robots.txt` | `products/pixelghost/robots.txt` |
| `/sitemap.xml` | `products/pixelghost/sitemap.xml` |

The routes preserve the visible short URLs and leave asset paths unchanged. Old `/products/pixelghost/…` URLs redirect to their short equivalents only on the PixelGhost host; the original product paths remain available on the portfolio and previews. Slashless documentation URLs redirect to trailing-slash URLs. Unmatched requests use normal filesystem and 404 handling. Do not move these rules into `next.config.ts`: Next.js rewrites and middleware are unsupported by this export model.

`ProductLink` uses a native anchor and `siteHref()` from `lib/site-urls.ts` to target canonical PixelGhost or portfolio destinations. `productHref()` builds product URLs, and `isExternalHref()` distinguishes third-party URLs from both owned origins. Product navigation remains in the same tab; third-party actions such as the store retain their external-link treatment. Native document navigation avoids requesting App Router payloads for the host's short aliases, which are not separate Next.js routes. Portfolio-only navigation can still use `next/link`, and same-document section links use ordinary anchors. Product links in local previews intentionally open the canonical domains unless the browser maps those hostnames to the preview. Every route must provide a `main` element with `id="main-content"`. Avoid nesting a button or another link inside a card-wide link.

Static export excludes runtime server actions, request-dependent route handlers, cookies-based rendering, ISR, and unenumerated dynamic paths. Do not add the default image optimization service to a static export; any new image strategy must work without a production Next.js process.

## Search metadata and discovery

PixelGhost's homepage `generateMetadata()` adds the owner's supplied public Google token through `verification.google`. Next emits it in the exported document's `<head>`, which the PixelGhost host serves at `/`. Keep this tag after verification succeeds. The token is scoped to the PixelGhost homepage metadata; verification against the live domain still requires deployment and Google's Verify action.

The root layout sets `metadataBase` to the portfolio origin. Each content route calls `pageMetadata()` or `productMetadata()` from `lib/seo.ts` to emit an explicit absolute canonical URL, page-specific title and description, complete Open Graph metadata, and a Twitter `summary_large_image` card. Explicit metadata avoids inheriting the portfolio homepage's identity on product or notebook pages. Canonical URLs use the shared origin and navigation helpers, including PixelGhost's short paths. Draft notebook details set `noindex, follow` in both robots and Googlebot metadata; the exported 404 is also `noindex`.

`shareImage()` selects absolute PNG URLs and image metadata (1200 × 630, MIME type, and descriptive alt text). Portfolio and notebook pages use `https://www.codecube99.com/share/portfolio.png`; PixelGhost pages use `https://pixelghost.codecube99.com/share/pixelghost.png`; YouScroll pages use `https://www.codecube99.com/share/youscroll.png`. All three `app/share/…/route.tsx` handlers declare `force-static` and call `createSocialImage()` from `components/social-image.tsx`. That server-only renderer uses `next/og`'s `ImageResponse`, the built-in font, site artwork, and local supplied logos to produce PNG files during the build. It requires no image-generation service or production runtime.

The portfolio and product homes render JSON-LD through the server component `StructuredData`, which escapes `<` after JSON serialization. `lib/seo.ts` supplies WebSite/WebPage objects with canonical identifiers and adds SoftwareApplication for product homes, using existing product descriptions, installation links, and support URLs. Do not add unsupported ratings, reviews, prices, credentials, or publication dates. Structured data describes the content; it does not guarantee a search engine's enhanced result.

`app/robots.ts` and `app/sitemap.ts` emit the portfolio's root discovery files. PixelGhost uses a nested sitemap metadata route and a static `GET` handler for its robots text. All four declare `dynamic = "force-static"`, produce files during `next build`, and read no request state. Vercel maps PixelGhost's root discovery URLs to these product files before filesystem handling. The preview follows that same rule and serves `.xml` as `application/xml`.

`sitemapEntries(origin)` in `lib/site-discovery.ts` combines the portfolio homepage and notebook directory with each product's homepage and `productGuides[slug].docs.items`, resolves them through `siteHref()`/`productHref()`, deduplicates them, and filters to the supplied canonical origin. The portfolio receives six URLs; PixelGhost receives five. A new product or documentation destination enters its owning host's sitemap from that shared content. Notebook detail routes are deliberately excluded while they are drafts. No `lastModified`, `changeFrequency`, or `priority` values are inferred from builds or editorial display dates.

Both robots files allow crawling and advertise only their own host's absolute sitemap URL. Do not block draft paths in robots.txt: their `noindex, follow` page metadata must be readable by crawlers. Existing alternate-host and prefixed product routes remain available, with canonical metadata identifying their owning URL. Search Console verification, sitemap submission, and search-engine indexing happen outside the static build.

## Shared shell state

`SiteHeader` reads `useSelectedLayoutSegment()` to identify the product shell from the loaded route tree. A rewritten PixelGhost `/` or `/guide/` still has the `products` segment, so server HTML and client hydration both omit the portfolio header. `usePathname()` still drives route-change effects and portfolio navigation where appropriate. The header keeps `menuOpen` in React state and reads theme/motion through `useSyncExternalStore`. Product pages render only the shared skip link and reading progress before `ProductBar` (a `header` placed before `main`), which supplies the canonical portfolio home link, product navigation, and the exported `ThemeToggle` with saved-preference behavior.

- The menu button exposes `aria-expanded` and `aria-controls="primary-navigation"`. Choosing navigation closes the menu. Escape closes an open menu and returns focus to its trigger.
- `ThemeToggle` is keyed by home/non-home context. On each portfolio home visit, local state starts dark and the button permits a temporary light choice without changing `cc99-theme`. Other routes, including PixelGhost's `/`, read and write that saved preference. Browser storage is scoped to the origin, so the two hosts have separate saved preferences. A layout effect synchronizes `document.documentElement.dataset.theme` before paint. Dark is the initial CSS and server snapshot default. The button's accessible label describes the next action; `aria-pressed` describes whether light mode is selected.
- The motion button has been removed. Existing `cc99-motion` values still set `document.documentElement.dataset.motion` to `paused` or `full`. Full is the server snapshot default. The system reduced-motion preference remains effective even when the saved pause state is off.
- `writePreference` updates a module-level map, attempts local storage inside `try/catch`, and dispatches `cc99-preferences` so subscribers in the same document update immediately. A failed storage write still leaves the current tab functional.
- `readPreference` uses the in-memory value first, then local storage, then the fallback. Storage exceptions return the fallback. Values are interpreted strictly: only `light` selects light mode and only `paused` selects paused motion.
- `subscribePreferences` listens for the custom event and native `storage` events. A storage event invalidates the corresponding map entry, or clears the map when storage is cleared, before notifying subscribers. Cleanup removes both listeners.
- The server snapshots avoid browser API access during prerender and initial hydration. A guarded inline script in the root layout sets saved theme and motion attributes before paint, forcing dark when `location.pathname` is `/` unless the hostname is `pixelghost.codecube99.com`. The root uses `suppressHydrationWarning` specifically for these attributes; effects keep them synchronized with the client store. Non-home preferences persist across reloads when storage is available; with blocked storage they last only for the current document's JavaScript lifetime, which ends on native navigation. If an external CSP disables inline scripts, the effect still restores preferences after hydration, with a possible initial theme flash on non-home pages.

Reading progress calculates `scrollY / (scrollHeight - innerHeight)`, with zero for a non-scrollable page. A passive scroll listener and a resize listener schedule at most one outstanding animation frame. The update writes `--scroll-progress` on the root element; CSS scales the top bar from its left edge. Recalculate on path changes and remove listeners/cancel the outstanding frame during cleanup. The indicator is decorative and hidden from accessibility APIs.

Browser globals are accessed from effects, event handlers, or the external store's browser-only snapshot/subscription functions. Client components also prerender during the build; never read `window`, `document`, storage, or `matchMedia` at module initialization or in a server snapshot. Keep initial server and hydration snapshots consistent.

The header navigation highlight is a `.site-nav::before` pill positioned from `--pill-x`, `--pill-w`, and `--pill-o` on the nav element. Pointer-over and focus move it to that link; pointer leave, blur, and route changes return it to the `aria-current` link or hide it. It is written through the DOM rather than React state and is hidden in the mobile disclosure.

## Home interactions

Client motion reads `motionAllowed()` from `components/motion.ts` at frame time, so both `prefers-reduced-motion` and the saved `data-motion="paused"` preference stop it. Each loop runs only while its section is visible and cleans up its listeners, observers, and outstanding frame on unmount.

**Hero lens.** `app/page.tsx` renders `HeroContent` twice and passes both copies to `HeroLens`: the readable surface (with the page's only `h1` and real links) and a blueprint copy that uses a `div`, spans instead of links, and baseline probes. The blueprint layer is `aria-hidden` and `inert`, and starts fully clipped, so without JavaScript the hero is the ordinary surface. After fonts load, the component measures word boxes from the live layout (canvas text metrics give ink ascent and descent), draws baseline/cap/x-height guides, margin and cap measurements, and builds readout targets with computed family, weight, size, and colour. A `ResizeObserver` and a `data-theme` observer re-measure. The lens follows a mouse or pen with eased motion, drifts on its own when idle, and moves to a tap on touch screens (taps, not scroll gestures). Scrolling out of the hero widens the clip until the blueprint covers it. With motion off, the lens rests over “little” without drift or scroll widening.

**Work stack.** On viewports at least 1026px wide and 700px tall, product cards are `position: sticky`. `WorkStack` scales and dims the card being covered in proportion to how far the next card has travelled. Narrower layouts and paused motion keep ordinary flow.

**Approach.** `ApproachCube` renders 26 pieces with a seeded scatter, so the exploded layout is identical on every visit. CSS places every piece in its assembled position, which is the server, no-JavaScript, and reduced-motion state. Scroll progress through `#approach-traits` (or the stage's own position on mobile) moves pieces into place, layer by layer, with the orange “99” piece landing last. The cube is decorative and `aria-hidden`. `ApproachTraits` marks the principle nearest the viewport middle; inactive principles stay readable in the muted colour rather than fading out.

**Contact.** `ContactLens` renders its children twice, once as the link text and once as an `aria-hidden` accent fill clipped to a circle under a mouse pointer; keyboard focus fills the whole headline. `CopyEmail` writes to the clipboard and announces the result through a polite status region. When the clipboard is unavailable, it selects the address text and says how to copy it.

## Product concepts and notebook filtering

`PixelGhostDemo` owns an `overlay` boolean, initially on. The widget's Show button (`aria-label="Show overlay"`) changes its `aria-pressed` state and hides or shows the pink reference layer. While the overlay is on, the concept is visible, and motion is allowed, a 7.2-second loop shows a 12 px/8 px drift, nudges the layer into place, and swaps layers, updating the widget's sample values. Otherwise it shows the static drift state. The browser mock and widget readouts are decorative and `aria-hidden`. The concept does not inspect the host page, load a mockup, or call an extension API.

`YouScrollDemo` renders a static video illustration beside a comments region with native overflow scrolling and `overscroll-behavior: contain`. The region has an accessible label and `tabIndex={0}`, so a keyboard user can focus and scroll it. It does not embed or autoplay video. Comments are sample content. Both mocks size their type in container query units so they scale with their frame.

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

`app/home.css` defines homepage-only tokens on `.home` with light-theme overrides on `[data-theme="light"] .home`: raised surfaces, hairlines, a faint text tone for large type, the lens surface, cube shading, and the fixed product-artwork palette. The notebook preview is the home's paper chapter; it remaps `--fg`, `--muted`, `--hair`, and `--accent` to the paper tokens and `--paper-accent` (`#bc421d`) for contrast on paper. Next.js keeps page stylesheets loaded after client navigation, so every home selector stays scoped to `.home`.

`.section-wrap` has a maximum width of 1360px. Default side gutters are 56px, reducing to 24px at 1025px and 20px at 767px. Headings use `clamp()` alongside deliberate breakpoint overrides. Product layouts use zero-minimum grid tracks and wrapping actions; policy text permits long URLs and permission identifiers to wrap.

| Breakpoint      | Main adaptation                                                                               |
| --------------- | --------------------------------------------------------------------------------------------- |
| At most 1025px  | Tablet: tighter type and artwork; home hero copy drops below the headline; product cards and product heroes stack; footer wraps |
| At most 900px   | The header hides its contact button and tightens navigation                                   |
| At most 767px   | Mobile: four-column hero grid, approach, steps, and tool guide stack; menu disclosure; optional dates hide |
| At most 360px   | Compact type and control spacing for the smallest supported layouts                           |

Do not patch an overflow by hiding the entire document's horizontal overflow without finding its source. Inspect transformed artwork, long headings, flex children, and fixed widths. Core copy and controls must fit at narrow widths and browser zoom.

## Motion, fallbacks, and print

Entrance animation changes opacity and vertical translation. The home headline lines rise with a `clip-path` that travels with each line, so nothing is clipped once a line lands or when animation is off. Below-fold reveals are guarded by `@supports (animation-timeline: view())`; unsupported browsers receive ordinary visible content. Home heading and row reveals finish by `entry 100%`, so anything fully in view is fully shown. The base stylesheet must never leave these elements permanently transparent.

`prefers-reduced-motion: reduce` disables animations and transitions and switches smooth scrolling off. The document's paused state applies equivalent overrides; the home cube then shows its assembled CSS state and the hero lens rests in place. Hover effects must not be the only way to discover an action. Print styles remove navigation controls and decorative artwork, simplify columns, and preserve readable content.

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

The supported development baseline is Node `24.20.0` and pnpm `12.3.4`. `pnpm check:export` is an alias for `node scripts/check-export.mjs`. The checker uses Node built-ins and inspects exported HTML. It verifies at least 16 documents; one `h1`, a title, and the skip target per document; no starter title; existing local anchor, link, script, and image destinations; draft notices and noindex metadata; both product pages with Chrome Web Store links and feature chapters (`#how-it-works`); privacy, support and notices routes for both products (and PixelGhost's guide) with links from the product home; and support pages that lead to a GitHub Issues URL. Failures exit nonzero.

Local references and first-party canonical URLs are resolved against `out/`; PixelGhost's short URLs map to their exported product documents. Traversal outside the export is rejected, query strings are excluded from file lookup, and document fragments are checked against destination IDs. Third-party HTTP(S), email, data, and telephone destinations are skipped. The checker also verifies the five PixelGhost canonical URLs and exercises local HTTP host routing: both roots, documentation, legacy and trailing-slash redirects, query strings, unknown hosts and paths, GET/HEAD, and shared assets. These checks do not validate external availability, parse every possible CSS/HTML asset reference, or establish visual accessibility.

SEO validation checks page canonicals, matching Open Graph/Twitter metadata, robots directives, homepage JSON-LD, host-specific robots/sitemap responses, and exclusion of drafts from sitemap URLs. It fetches all three share images through the local host routing and checks their PNG signature, MIME type, and 1200 × 630 dimensions. Inspect the image artwork visually as well. After deployment, verify the public URLs, submit the sitemaps for the verified search property, and request recrawls or social-preview cache refreshes where supported. Local checks cannot verify live indexing, search rankings, or a sharing platform's cached card.

After building, run `pnpm start` or `node scripts/serve.mjs` for a static preview. The script defaults to `127.0.0.1:3000` and reads `HOST` and `PORT` when supplied. It requires `out/index.html`, supports GET and HEAD, applies the actual `vercel.json` host conditions, redirects directory paths to trailing slashes, serves the exported 404 for missing paths, and rejects a resolved file path outside `out/`. The binding variable `HOST` is separate from the request's `Host` header, which selects PixelGhost's routes. Optional `PREVIEW_HOST` overrides that header for a quick page preview, but does not change the browser's origin or hostname. It is a local preview helper, not a production CDN or hardened public server.

For domain changes, check both host roots, every short PixelGhost URL, old prefixed aliases, assets, and missing paths through the preview. Browser checks must map canonical hostnames to the preview because product links use their production URLs. Check native navigation, history, the product shell during hydration, and saved theme reload at the PixelGhost root. Local validation does not verify DNS or a production deployment: attach the domains with valid DNS and deploy the latest source to activate the Vercel routing.

Lint, type/build validation, and export validation do not replace visual or interaction checks. Inspect desktop, tablet, and narrow mobile layouts in both themes; direct-load every route family; exercise keyboard navigation, menu Escape behavior, filters, cube states, overlay states, independent comments scrolling, support disclosures, and reduced-motion/manual pause modes. Preference changes also need reload, cross-tab, and blocked-storage checks. Record what was actually checked, and distinguish proposed checks from successful executions.
