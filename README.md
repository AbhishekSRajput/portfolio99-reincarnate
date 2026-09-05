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

## Documentation

- [HLD.md](HLD.md): architecture, boundaries, design direction, and deployment.
- [LLD.md](LLD.md): routes, components, state, animation, and content contracts.
- [CONTRIBUTING.md](CONTRIBUTING.md): workflow and quality standards for people and agents.
- [AGENTS.md](AGENTS.md): repository instructions and installed Next.js documentation requirement.

## What’s included

- Original three-dimensional cube with assemble/explode controls and pointer response.
- Two product pages with interactive concept illustrations, authentic installation links, and the supplied PixelGhost logo.
- A filterable notebook with four clearly marked draft excerpts.
- PixelGhost privacy and support pages, native FAQ disclosures, and a custom 404.
- Persistent light/dark and motion settings, reduced-motion support, responsive layouts, and keyboard focus states.
- Static export verification for HTML landmarks, generated routes, internal links/assets, draft metadata, and product destinations.

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

`next.config.ts` exports static, trailing-slash routes into `out/`. Any static
host can serve that directory and use `404.html` for missing pages. The Sites
manifest is `.openai/hosting.json`; it contains the project ID, never credentials.
Do not upload the repository or the original ZIP as public site assets.

Fonts are downloaded at build time by `next/font` and then served locally.
Visitors do not fetch fonts from Google. No secrets or environment variables
are required to build the site.
