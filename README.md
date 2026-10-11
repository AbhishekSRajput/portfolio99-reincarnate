# CodeCube99

An independent software builder’s portfolio: big picture, every little detail.
Built with Next.js 16.3.4, React 19, TypeScript, and native CSS motion.

## Run locally

Use Node 24 LTS and the pinned pnpm version from package.json.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000. For the production export:

```sh
pnpm lint
pnpm build
pnpm check:export
pnpm start
```

Stop the development server before using the default production preview port.
`pnpm start` serves `out/` using the included dependency-free Node server.
`PORT` and `HOST` can override its local binding; default is 127.0.0.1:3000.
The preview honors the request's `Host` header for PixelGhost routing. For a
quick PixelGhost preview in PowerShell, set
`$env:PREVIEW_HOST='pixelghost.codecube99.com'` before `pnpm start`; clear it
with `Remove-Item Env:PREVIEW_HOST` afterward. Product links use their canonical
domains and leave localhost; map those hostnames to the preview when checking
complete navigation and hostname-dependent theme behavior locally.

## Documentation

- [HLD.md](HLD.md): architecture, boundaries, design direction, and deployment.
- [LLD.md](LLD.md): routes, components, state, animation, and content contracts.
- [CONTRIBUTING.md](CONTRIBUTING.md): workflow and quality standards for people and agents.
- [AGENTS.md](AGENTS.md): repository instructions and installed Next.js documentation requirement.

## What’s included

- Original three-dimensional cube with assemble/explode controls and pointer response.
- Two product pages with interactive concept illustrations, authentic installation links, and the supplied PixelGhost logo.
- A filterable notebook with four clearly marked draft excerpts.
- Product homes built on one template from the public product docs and store assets, a PixelGhost tools guide, and support (via GitHub Issues), privacy, and third-party notice pages for both extensions, plus a custom 404.
- Persistent light/dark and motion settings, reduced-motion support, responsive layouts, and keyboard focus states.
- Static export verification for HTML landmarks, generated routes, local and canonical product links, assets, draft metadata, and host routing.
- Separate robots files and canonical sitemaps for the portfolio and PixelGhost domains; unfinished notebook details stay out of search discovery.
- Page-specific canonical, Open Graph, and Twitter card metadata; separate 1200 × 630 PNG link previews for the portfolio, PixelGhost, and YouScroll; factual structured data on their homepages.

## Content and provenance

`lib/content.ts` is the source of portfolio text. Product facts, contact links,
notebook excerpts, and the PixelGhost mark come from `claude-design-99.zip`.
The archive’s missing résumé and unfinished essay bodies are not presented as
completed content. Product mockups are original interactive illustrations, not
screenshots or embedded extensions. No analytics, contact backend, or runtime
external service is required by the portfolio.

[Scroll Craft](https://github.com/nateherkai/scroll-craft) was a light reference
for layered composition, section rhythm, and motion restraint; its code and
runtime were not imported.

## Deployment

`next.config.ts` exports static, trailing-slash routes into `out/`.
`vercel.json` serves that export as a generic static site (`framework: null`):

- `www.codecube99.com` serves the portfolio.
- `pixelghost.codecube99.com` serves PixelGhost at `/`, with `/guide/`,
  `/privacy/`, `/support/`, and `/notices/` for its documentation.

Vercel runs `pnpm build && pnpm check:export` before publishing `out/`.

Ordered host-specific routes select the existing product HTML before the
filesystem fallback. Original `/products/pixelghost/…` routes remain available
on the portfolio and previews; those paths redirect to the short URLs only on
the PixelGhost subdomain. No middleware or Next.js server is required.

Each host serves its own `/robots.txt` and `/sitemap.xml`. The portfolio sitemap
lists its homepage, notebook directory, and YouScroll pages; PixelGhost's lists
its homepage and four documentation pages. Draft notebook details retain
`noindex, follow` and are omitted from both sitemaps. Crawling remains allowed
so search engines can read those directives and each page's canonical URL.
After deployment, submit the two sitemap URLs in Google Search Console for
the relevant verified property. A sitemap helps discovery; it does not ensure
indexing or a particular search position.

Link previews use static images at `/share/portfolio.png` and
`/share/youscroll.png` on `www.codecube99.com`, and `/share/pixelghost.png` on
`pixelghost.codecube99.com`. They are generated during the build, without a
runtime image service. After deploying metadata or artwork changes, inspect
the public page and image URLs and request a fresh scrape in the sharing
platform's preview tool where available; cached previews may take time to
update. Local validation does not confirm indexing or live platform previews.

After Vercel shows valid DNS for the subdomain, deploy the latest changes to
activate this routing. DNS configuration alone does not select the product page.
Other static hosts can serve `out/` and its `404.html`; they need equivalent
host-routing rules to provide the subdomain URLs. The Sites manifest is
`.openai/hosting.json`; it contains the project ID, never credentials. Publish
only the validated static export, never the repository or original ZIP.

Fonts are downloaded at build time by `next/font` and then served locally.
Visitors do not fetch fonts from Google. No secrets or environment variables
are required to build the site.
