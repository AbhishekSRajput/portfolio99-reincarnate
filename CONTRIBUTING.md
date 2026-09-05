# Contributing to CodeCube99

Keep the portfolio precise, accessible, and honest about the work it represents. This guide applies to humans and coding agents. Read [HLD.md](./HLD.md) for system boundaries and [LLD.md](./LLD.md) for component and route contracts.

## Start with the local framework guidance

Read [AGENTS.md](./AGENTS.md) before editing. Preserve its generated block between `BEGIN:nextjs-agent-rules` and `END:nextjs-agent-rules`; `next dev` maintains that block and recreates it if removed. Put repository-specific instructions outside it.

This project uses Next.js `16.3.4`, which bundles documentation under `node_modules/next/dist/docs/`. Before changing framework code, read the relevant guide from the installed package rather than relying on remembered APIs. Useful paths are:

- `01-app/02-guides/static-exports.md`
- `01-app/03-api-reference/04-functions/generate-static-params.md`
- `01-app/03-api-reference/03-file-conventions/page.md`
- `01-app/01-getting-started/13-fonts.md`
- `01-app/03-api-reference/04-functions/generate-metadata.md`
- `03-architecture/accessibility.md`

For other topics, locate the installed guide with `rg --files node_modules/next/dist/docs`. If dependencies are missing, install them before making assumptions about this version. In particular, route parameters are promises, static dynamic routes require `generateStaticParams()`, and lint is a separate command from the build.

## Local setup

Use Node.js `24.20.0` and the package manager declared in `package.json`, pnpm `12.3.4`. Run commands from the repository root:

```powershell
node --version
pnpm --version
pnpm install --frozen-lockfile
pnpm dev
```

Open the local URL printed by Next.js, normally `http://localhost:3000`. To select an explicit port:

```powershell
pnpm dev --port 3001
```

Keep `pnpm-lock.yaml` as the dependency source of truth. Use pnpm for package changes; avoid introducing npm or Yarn lockfiles. Dependency upgrades should have a task-specific reason and should be reviewed separately from a visual adjustment when practical.

## Make focused changes

1. Inspect `git status --short` and the relevant source before editing. Preserve existing user work and unrelated changes.
2. Identify the route, content entry, component, or token that owns the change. Prefer changing that source once over patching repeated markup.
3. Keep static page composition server-rendered. Add client boundaries only where browser state or events are required.
4. Update the implementation and any affected architecture or workflow documentation together.
5. Run relevant checks, inspect the result, and report the changed behavior with any remaining limitations.

Agents should proceed with authorized, reversible implementation work without repeatedly asking for permission. Do not deploy, publish, send messages, or alter an external product merely because the local portfolio references it. Respect the user's actual authorization and the task's scope. Never revert another contributor's edits to simplify a patch.

On Windows, use literal paths for file operations, especially where the repository path contains spaces. Before a recursive move or deletion, resolve the target and confirm that it is within the intended directory. Keep destructive file operations in one shell rather than forwarding computed paths to another shell.

## Content and route changes

Edit shared profile, product, note, and trait content in `lib/content.ts`. Preserve source provenance from the supplied `claude-design-99.zip`. The archive is a reference artifact and should not be silently rewritten as part of implementation.

For a new product or note, add a unique stable slug, complete its required content, confirm that the corresponding `generateStaticParams()` includes it, and verify its exported detail page. A new product also needs an appropriate demo and updated next-product navigation; the current implementation selects between two known products. Conditional actions should render only when a real destination exists. Direct loading and browser refresh must work on the static output.

Notebook entries are explicitly drafts because the supplied reference does not include completed articles. Do not manufacture bodies, résumé history, performance metrics, testimonials, availability claims, or other professional facts. Keep miniature product UI labelled as illustrative concepts. Changing a privacy or support statement requires evidence from the actual product or author, not an inference from its promotional copy.

The site has no backend or contact form submission. Use the existing email, store, and GitHub paths. Do not add fake submit success states. A real form service, authentication flow, or runtime API would require an explicit architecture change and corresponding documentation.

## Visual and interaction standards

Reuse semantic colors, font variables, spacing conventions, and shared controls. Preserve the editorial hierarchy and the contrast between graphite and paper chapters. A new isolated shade or breakpoint should have a clear visual purpose.

Keep useful text readable, controls reachable by keyboard, and visible focus intact. Use semantic buttons for actions and links for navigation. Label icon-only controls; express selected and expanded states with the appropriate ARIA attributes. New toggles must update both the visible state and the accessible state.

Motion must honor both `prefers-reduced-motion` and the visible pause control. Do not hide core content until JavaScript, a scroll observer, or a timeline has run. Retain visible fallbacks when a CSS feature is unsupported. Use native platform behavior for scrolling and disclosures where it already meets the need.

Do not add an animation library, WebGL runtime, component library, or broad styling dependency for a small effect that the current platform can express. Readability and reliable behavior matter as much as a screenshot. Avoid arbitrary global overflow clipping that disguises broken layout.

## Validation before handoff

Run these checks after implementation:

```powershell
pnpm lint
pnpm build
pnpm check:export
```

The final command runs `node scripts/check-export.mjs`. It verifies emitted documents, local destinations, draft metadata, and product links as described in [LLD.md](./LLD.md). A successful `pnpm build` is not evidence that lint ran. A build can also require network access for the configured Google fonts; report that dependency honestly if it prevents validation.

Preview the production files after the build:

```powershell
pnpm start
```

This runs `node scripts/serve.mjs`, serving `out/` at `http://127.0.0.1:3000` by default. It is a local static preview; `next start` is not compatible with this exported delivery model. Check at least a wide desktop, a tablet, and a narrow phone layout, including a 320px-wide viewport when changing responsive styles. Inspect relevant pages in both themes and with reduced motion enabled.

For interaction changes, exercise the actual affected behavior: keyboard focus, mobile menu and Escape, theme and motion toggles, cube assembly, overlay toggle, native comments scrolling, notebook filtering, and support disclosures. Theme and motion preferences use local storage with an in-memory fallback; when changing that store, check reload persistence, cross-tab updates, and blocked storage. Direct-load representative nested routes and an unknown path. Confirm that core information remains readable without entrance animations.

Add automated tests when a meaningful behavior or regression needs protection. Do not add tests that simply duplicate static copy or mirror a low-impact style change. Do not claim a browser, device, external link, performance score, or accessibility audit was verified unless it was actually checked.

## Security, generated files, and delivery

No secret is needed for the current site. Never hardcode credentials, tokens, private data, or service keys in source, scripts, URLs, browser bundles, or documentation. `NEXT_PUBLIC_*` values are public. Any future integration needs an explicit data-flow decision before adding credentials.

Do not edit `node_modules`, `.next`, or `out` as source files. Keep generated build artifacts out of changes unless the repository deliberately changes its publishing strategy. Preserve the generated Next.js instructions in `AGENTS.md` even if they appear after starting the development server.

A useful handoff or pull request explains the concrete problem, the resulting behavior, and the checks that ran. Include visual evidence when it clarifies a design change. Name known limitations precisely, separate incomplete content from implementation bugs, and leave a reviewable diff. Update this guide when commands or operational assumptions change.
