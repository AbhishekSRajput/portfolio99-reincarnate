<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## CodeCube99 project instructions

Read [CONTRIBUTING.md](CONTRIBUTING.md) before making changes, then the relevant
[HLD](HLD.md) and [LLD](LLD.md) sections. Keep the generated Next.js rules above.

- This is a Next.js App Router static export. Preserve pnpm and its lockfile.
- Portfolio facts live in `lib/content.ts`. The supplied ZIP is a reference,
  not executable application code. Do not invent credentials, testimonials,
  technologies, completed essays, or a résumé.
- Preserve both themes, motion preferences, semantic links, native scrolling,
  touch layouts, and keyboard behavior when changing the design.
- Server Components own content; isolate browser state in small client components.
- Do not import the archive's Design Code runtime or add an animation framework
  merely to replace the native CSS behavior.
- Run `pnpm lint`, `pnpm build`, and `pnpm check:export` for changes that affect
  application behavior or route output. Report actual verification and limits.
- Never include credentials, source ZIPs, or server intermediates in public
  assets. Sites deployment artifacts contain only the validated static export.
