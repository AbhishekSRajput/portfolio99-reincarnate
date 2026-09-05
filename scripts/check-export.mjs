import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import { resolve, join, dirname, extname, relative, sep } from "node:path";

const root = resolve("out");
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? walk(join(directory, entry.name))
          : join(directory, entry.name),
      ),
    )
  ).flat();
}
const files = await walk(root);
const htmlFiles = files.filter((file) => extname(file) === ".html");
assert(
  htmlFiles.length >= 11,
  "Expected home, product, notebook, support, privacy, and 404 exports",
);
const documents = new Map(
  await Promise.all(
    htmlFiles.map(async (file) => [file, await readFile(file, "utf8")]),
  ),
);
const exists = async (file) => (await stat(file).catch(() => null))?.isFile();
let checkedLinks = 0;
for (const [file, html] of documents) {
  const label = relative(root, file);
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) ?? []).length,
    1,
    label + ": exactly one h1",
  );
  assert.match(html, /<title>[^<]+<\/title>/, label + ": title required");
  assert.match(
    html,
    /id="main-content"/,
    label + ": skip-link target required",
  );
  assert(
    !html.includes("Create Next App"),
    label + ": starter metadata leaked",
  );
  for (const match of html.matchAll(
    /<(?:a|link|script|img)\b[^>]*?\b(?:href|src)="([^"]+)"[^>]*>/g,
  )) {
    const href = match[1].replaceAll("&amp;", "&");
    if (/^(?:https?:|mailto:|data:|tel:)/.test(href)) continue;
    const [rawPath, fragment] = href.split("#");
    const path = decodeURIComponent(rawPath.split("?")[0]);
    let target = path
      ? path.startsWith("/")
        ? resolve(root, "." + path)
        : resolve(dirname(file), path)
      : file;
    assert(
      target === root || target.startsWith(root + sep),
      label + ": local link escapes export",
    );
    if ((await stat(target).catch(() => null))?.isDirectory())
      target = join(target, "index.html");
    if (!(await exists(target)) && !extname(target)) target += ".html";
    assert(await exists(target), label + ": broken local link " + href);
    if (fragment && documents.has(target))
      assert(
        documents.get(target).includes('id="' + fragment + '"'),
        label + ": missing anchor " + href,
      );
    checkedLinks++;
  }
  if (
    label.startsWith("journal" + sep) &&
    label !== join("journal", "index.html")
  ) {
    assert.match(
      html,
      /noindex/,
      label + ": incomplete writing must not be indexed",
    );
    assert.match(
      html,
      /A thought in progress/,
      label + ": draft status required",
    );
  }
}
for (const slug of ["pixelghost", "youscroll"]) {
  const html = documents.get(join(root, "products", slug, "index.html"));
  assert(html, slug + ": product route missing");
  assert.match(
    html,
    /https:\/\/chromewebstore.google.com\/detail\//,
    slug + ": installation link missing",
  );
}
console.log(
  `Export verified: ${htmlFiles.length} HTML documents, ${checkedLinks} local links/assets, draft metadata, and product destinations.`,
);
