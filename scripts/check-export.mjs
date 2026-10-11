import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { once } from "node:events";
import { request } from "node:http";
import { resolve, join, extname, relative, sep } from "node:path";
import { createPreviewServer, resolveExportRequest } from "./serve.mjs";

const root = resolve("out");
const pixelghostHost = "pixelghost.codecube99.com";
const portfolioHost = "www.codecube99.com";
const firstPartyHosts = new Set([
  pixelghostHost,
  portfolioHost,
  "codecube99.com",
  "portfolio99-reincarnate.vercel.app",
]);
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
  htmlFiles.length >= 16,
  "Expected home, product, guide, support, privacy, notices, notebook, and 404 exports",
);
const documents = new Map(
  await Promise.all(
    htmlFiles.map(async (file) => [file, await readFile(file, "utf8")]),
  ),
);
async function resolveDestination(url) {
  for (let redirects = 0; redirects < 5; redirects++) {
    const result = await resolveExportRequest(url.pathname + url.search, url.host, root);
    if (!result.headers?.Location) return result;
    url = new URL(result.headers.Location, url);
  }
  assert.fail("Redirect loop while checking " + url.href);
}

function decodeEntities(value) {
  return value.replace(/&(?:amp|quot|apos|lt|gt|#39|#x27);/g, (entity) => ({
    "&amp;": "&", "&quot;": '"', "&apos;": "'", "&#39;": "'", "&#x27;": "'", "&lt;": "<", "&gt;": ">",
  })[entity]);
}
function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)]
    .map(([, name, value]) => [name.toLowerCase(), decodeEntities(value)]));
}
function metadataValue(html, name, label) {
  const values = [...html.matchAll(/<meta\b[^>]*>/g)]
    .map(([tag]) => attributes(tag))
    .filter((attrs) => attrs.name === name || attrs.property === name)
    .map((attrs) => attrs.content);
  assert.equal(values.length, 1, `${label}: expected one ${name} meta tag`);
  assert(values[0]?.trim(), `${label}: ${name} must not be empty`);
  return values[0];
}
function canonicalUrl(html, label) {
  const canonicals = [...html.matchAll(/<link\b[^>]*>/g)]
    .map(([tag]) => attributes(tag))
    .filter((attrs) => attrs.rel === "canonical");
  assert.equal(canonicals.length, 1, `${label}: expected one canonical link`);
  // Next normalizes external root URLs to their origin when metadataBase is set.
  // URL.href restores only that equivalent root slash; /guide and /guide/ stay distinct.
  return new URL(canonicals[0].href).href;
}
const shareImages = new Set();
const canonicalDocuments = new Map();
let checkedMetadata = 0;

let checkedLinks = 0;
for (const [file, html] of documents) {
  const label = relative(root, file);
  const exportPath = "/" + label.split(sep).join("/").replace(/index\.html$/, "");
  const baseUrl = exportPath.startsWith("/products/pixelghost/")
    ? new URL(exportPath.replace("/products/pixelghost/", "/"), `https://${pixelghostHost}`)
    : new URL(exportPath, `https://${portfolioHost}`);
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
    const url = new URL(href, baseUrl);
    if (!/^https?:$/.test(url.protocol) || !firstPartyHosts.has(url.hostname)) continue;
    const result = await resolveDestination(url);
    const target = result.file;
    assert.equal(result.status, 200, label + ": broken first-party link " + href);
    const fragment = decodeURIComponent(url.hash.slice(1));
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

  const isNotFound = ["/404.html", "/404/", "/_not-found/"].includes(exportPath);
  const isDraft = exportPath.startsWith("/journal/") && exportPath !== "/journal/";
  if (isNotFound) {
    assert.match(metadataValue(html, "robots", label), /\bnoindex\b/, `${label}: error pages must not be indexed`);
    continue;
  }
  assert.equal(canonicalUrl(html, label), baseUrl.href, `${label}: canonical must use the page's public URL`);
  canonicalDocuments.set(baseUrl.href, html);
  const title = decodeEntities(html.match(/<title>([^<]+)<\/title>/)[1]);
  const description = metadataValue(html, "description", label);
  assert.equal(new URL(metadataValue(html, "og:url", label)).href, baseUrl.href, `${label}: Open Graph URL must match canonical`);
  assert.equal(metadataValue(html, "og:title", label), title, `${label}: share title must match page title`);
  assert.equal(metadataValue(html, "og:description", label), description);
  assert.equal(metadataValue(html, "og:type", label), "website");
  metadataValue(html, "og:site_name", label);
  assert.equal(metadataValue(html, "twitter:card", label), "summary_large_image");
  assert.equal(metadataValue(html, "twitter:title", label), title);
  assert.equal(metadataValue(html, "twitter:description", label), description);
  const imageName = exportPath.startsWith("/products/pixelghost/") ? "pixelghost"
    : exportPath.startsWith("/products/youscroll/") ? "youscroll" : "portfolio";
  const image = new URL(`/share/${imageName}.png`, baseUrl.origin).href;
  assert.equal(metadataValue(html, "og:image", label), image, `${label}: incorrect product share image`);
  assert.equal(metadataValue(html, "twitter:image", label), image);
  assert.equal(metadataValue(html, "og:image:type", label), "image/png");
  assert.equal(metadataValue(html, "og:image:width", label), "1200");
  assert.equal(metadataValue(html, "og:image:height", label), "630");
  metadataValue(html, "og:image:alt", label);
  metadataValue(html, "twitter:image:alt", label);
  shareImages.add(image);
  for (const name of ["robots", "googlebot"]) {
    const directives = metadataValue(html, name, label).split(/\s*,\s*/);
    assert(directives.includes(isDraft ? "noindex" : "index"), `${label}: ${name} has incorrect indexing policy`);
    assert(!directives.includes(isDraft ? "index" : "noindex"), `${label}: ${name} has conflicting indexing policy`);
    assert(directives.includes("follow"), `${label}: ${name} must allow following links`);
  }
  checkedMetadata++;
}
for (const slug of ["pixelghost", "youscroll"]) {
  const html = documents.get(join(root, "products", slug, "index.html"));
  assert(html, slug + ": product route missing");
  assert.match(
    html,
    /https:\/\/chromewebstore.google.com\/detail\//,
    slug + ": installation link missing",
  );
  assert.match(html, /id="how-it-works"/, slug + ": feature chapters missing");
  const pages = ["privacy", "support", "notices"];
  if (slug === "pixelghost") pages.push("guide");
  for (const page of pages) {
    const pagePath = join(root, "products", slug, page, "index.html");
    assert(documents.has(pagePath), `${slug}: ${page} route missing`);
    const destination = slug === "pixelghost"
      ? `https://${pixelghostHost}/${page}/`
      : `https://${portfolioHost}/products/${slug}/${page}/`;
    assert(html.includes(`href="${destination}"`), `${slug}: ${page} navigation missing`);
  }
  const support = documents.get(
    join(root, "products", slug, "support", "index.html"),
  );
  assert.match(
    support,
    /href="https:\/\/github\.com\/AbhishekSRajput\/[\w-]+\/issues"/,
    slug + ": support must lead to GitHub Issues",
  );
}

for (const [url, productName] of [
  [`https://${portfolioHost}/`, null],
  [`https://${pixelghostHost}/`, "PixelGhost"],
  [`https://${portfolioHost}/products/youscroll/`, "YouScroll"],
]) {
  const html = canonicalDocuments.get(url);
  assert(html, `${url}: homepage metadata missing`);
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)]
    .filter(([, attrs]) => attributes(attrs).type === "application/ld+json");
  assert.equal(scripts.length, 1, `${url}: expected one structured data graph`);
  const data = JSON.parse(scripts[0][2]);
  assert.equal(data["@context"], "https://schema.org");
  assert(Array.isArray(data["@graph"]), `${url}: structured data graph required`);
  const graph = data["@graph"];
  const website = graph.find((node) => node["@type"] === "WebSite");
  const page = graph.find((node) => node["@type"] === "WebPage");
  assert(website && page, `${url}: WebSite and WebPage structured data required`);
  assert.equal(website.url, `https://${productName === "PixelGhost" ? pixelghostHost : portfolioHost}/`);
  assert.equal(page.url, url, `${url}: structured page URL must match canonical`);
  assert.equal(page.isPartOf?.["@id"], website["@id"], `${url}: page must reference its website`);
  assert.equal(page.name, metadataValue(html, "og:title", url));
  assert.equal(page.description, metadataValue(html, "description", url));
  if (productName) {
    const application = graph.find((node) => node["@type"] === "SoftwareApplication");
    assert(application, `${url}: application structured data missing`);
    assert.equal(application.name, productName);
    assert.equal(application.url, url);
    assert.equal(application.image, metadataValue(html, "og:image", url));
    assert.equal(page.mainEntity?.["@id"], application["@id"]);
    assert.match(application.installUrl, /^https:\/\/chromewebstore\.google\.com\/detail\//);
    assert(html.includes(`href="${application.installUrl.replaceAll("&", "&amp;")}"`), `${url}: structured install URL must be an actual page destination`);
    assert.equal(application.softwareHelp?.url, `${url}support/`);
    assert(!("aggregateRating" in application) && !("review" in application), `${url}: unverified ratings or reviews must not be published`);
  }
}

// Exercise the same config-driven preview used for browser QA with real HTTP
// Host headers. This catches a broad rewrite that would hide assets or 404s.
const server = createPreviewServer({ root });
server.listen(0, "127.0.0.1");
await once(server, "listening");
let checkedRequests = 0;
function get(path, host, method = "GET") {
  return new Promise((resolveRequest, reject) => {
    const req = request({
      hostname: "127.0.0.1",
      port: server.address().port,
      path,
      method,
      headers: { Host: host },
    }, (response) => {
      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () => {
        checkedRequests++;
        resolveRequest({
          status: response.statusCode,
          location: response.headers.location,
          contentType: response.headers["content-type"],
          body: Buffer.concat(chunks),
        });
      });
      response.on("error", reject);
    });
    req.on("error", reject);
    req.end();
  });
}
try {
  const config = JSON.parse(await readFile("vercel.json", "utf8"));
  assert.equal(config.framework, null, "Vercel must serve the validated generic static export");
  assert.equal(config.outputDirectory, "out");
  assert.equal(config.trailingSlash, true);
  assert.match(config.buildCommand, /pnpm check:export/, "Deployment must validate its export");

  const sitemapPaths = new Map([
    [portfolioHost, ["/", "/journal/", "/products/youscroll/", "/products/youscroll/privacy/", "/products/youscroll/support/", "/products/youscroll/notices/"]],
    [pixelghostHost, ["/", "/guide/", "/privacy/", "/support/", "/notices/"]],
  ]);
  for (const [host, paths] of sitemapPaths) {
    const robotsResponse = await get("/robots.txt", host);
    assert.equal(robotsResponse.status, 200, `${host}: robots.txt must be directly accessible`);
    assert.match(robotsResponse.contentType, /^text\/plain\b/);
    const robots = robotsResponse.body.toString();
    assert.match(robots, /User-Agent:\s*\*/i, `${host}: public crawler rules missing`);
    assert.match(robots, /^Allow:\s*\/\s*$/m, `${host}: crawlers must access the public pages`);
    assert(!/^Disallow:\s*\S/m.test(robots), `${host}: crawlers need to read page-level noindex metadata`);
    assert.deepEqual([...robots.matchAll(/^Sitemap:\s*(\S+)/gm)].map((match) => match[1]), [`https://${host}/sitemap.xml`]);
    const sitemapResponse = await get("/sitemap.xml", host);
    assert.equal(sitemapResponse.status, 200, `${host}: sitemap must be directly accessible`);
    assert.match(sitemapResponse.contentType, /^(?:application|text)\/xml\b/);
    const xml = sitemapResponse.body.toString();
    assert.match(xml, /<urlset\b[^>]*xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9"/);
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decodeEntities(match[1]));
    assert.equal(new Set(urls).size, urls.length, `${host}: duplicate sitemap entries`);
    assert.deepEqual(urls.toSorted(), paths.map((path) => `https://${host}${path}`).toSorted(), `${host}: sitemap must contain only its published canonical URLs`);
    for (const url of urls) {
      const html = canonicalDocuments.get(url);
      assert(html, `${url}: sitemap URL must identify an exported canonical page`);
      assert(!metadataValue(html, "robots", url).split(/\s*,\s*/).includes("noindex"), `${url}: sitemap must not contain noindex drafts`);
    }
    const sitemapHead = await get("/sitemap.xml", host, "HEAD");
    assert.equal(sitemapHead.status, 200);
    assert.equal(sitemapHead.body.length, 0);
  }
  assert.equal(shareImages.size, 3, "Expected separate portfolio, PixelGhost, and YouScroll share images");
  for (const href of shareImages) {
    const url = new URL(href);
    const response = await get(url.pathname, url.host);
    assert.equal(response.status, 200, `${href}: share image must be directly accessible`);
    assert.match(response.contentType, /^image\/png\b/, `${href}: image MIME type required`);
    assert.deepEqual(response.body.subarray(0, 8), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), `${href}: response must be a PNG`);
    assert.equal(response.body.toString("ascii", 12, 16), "IHDR", `${href}: PNG header missing`);
    assert.equal(response.body.readUInt32BE(16), 1200, `${href}: share image width`);
    assert.equal(response.body.readUInt32BE(20), 630, `${href}: share image height`);
  }

  for (const page of ["", "guide", "privacy", "support", "notices"]) {
    const path = page ? `/${page}/` : "/";
    const legacyPath = `/products/pixelghost${path}`;
    const file = join(root, "products", "pixelghost", page, "index.html");
    const expectedHtml = documents.get(file);
    assert(expectedHtml, `PixelGhost ${path}: missing exported document`);
    assert.equal(
      canonicalUrl(expectedHtml, `PixelGhost ${path}`), `https://${pixelghostHost}${path}`,
      `PixelGhost ${path}: canonical URL must use the product subdomain`,
    );
    assert(
      !/href="\/products\/pixelghost\/(?:guide\/|privacy\/|support\/|notices\/)?(?:#[^"]*)?"/.test(expectedHtml),
      `PixelGhost ${path}: navigation must use clean subdomain URLs`,
    );
    const pageResponse = await get(path, pixelghostHost);
    assert.equal(pageResponse.status, 200, `PixelGhost ${path}: GET failed`);
    assert.equal(pageResponse.body.toString(), expectedHtml, `PixelGhost ${path}: wrong document`);
    const head = await get(path, pixelghostHost, "HEAD");
    assert.equal(head.status, 200, `PixelGhost ${path}: HEAD failed`);
    assert.equal(head.body.length, 0, "HEAD must not return a body");
    const legacy = await get(legacyPath + "?ref=old", pixelghostHost);
    assert.equal(legacy.status, 308, "Old product paths must redirect on the product host");
    assert.equal(legacy.location, path, "Product redirect must use its configured Location");
    const legacyMain = await get(legacyPath, portfolioHost);
    assert.equal(legacyMain.status, 200, "Main-domain product paths must remain available");
    assert.equal(legacyMain.body.toString(), expectedHtml);
    if (page) {
      const slashless = await get(`/${page}?ref=slash`, pixelghostHost);
      assert.equal(slashless.status, 308, "Product document URL needs a trailing slash");
      assert.equal(slashless.location, path);
    }
  }
  for (const host of [
    portfolioHost,
    "codecube99.com",
    "portfolio99-reincarnate.vercel.app",
    "localhost:3000",
    "pixelghost.codecube99.com.invalid",
    "pixelghostXcodecube99Xcom",
    "",
  ]) {
    const response = await get("/", host);
    assert.equal(response.status, 200, `${host || "missing host"}: portfolio root failed`);
    assert.equal(response.body.toString(), documents.get(join(root, "index.html")), `${host}: wrong homepage`);
  }
  for (const host of [pixelghostHost, portfolioHost]) {
    for (const path of ["/does-not-exist/", "/products/pixelghost/missing/", "/_next/missing.js"]) {
      const response = await get(path, host);
      assert.equal(response.status, 404, `${host}${path}: unknown path must remain a 404`);
      assert.equal(response.body.toString(), documents.get(join(root, "404.html")));
    }
  }
  assert.equal((await get("/guide/", portfolioHost)).status, 404, "Clean product paths must be host-specific");
  const assetFiles = [
    files.find((file) => file.includes(join("products", "pixelghost")) && extname(file) === ".png"),
    files.find((file) => file.includes("_next") && extname(file) === ".js"),
    files.find((file) => file.includes("_next") && extname(file) === ".css"),
  ];
  for (const file of assetFiles) {
    assert(file, "Expected a product image, script, and stylesheet to verify");
    const path = "/" + relative(root, file).split(sep).join("/");
    const response = await get(path, pixelghostHost);
    assert.equal(response.status, 200, `Product host asset failed: ${path}`);
    assert.deepEqual(response.body, await readFile(file), `Product host returned the wrong asset: ${path}`);
  }
} finally {
  await new Promise((resolveClose, reject) => server.close((error) => error ? reject(error) : resolveClose()));
}
console.log(
  `Export verified: ${htmlFiles.length} HTML documents, ${checkedLinks} first-party links/assets, ${checkedMetadata} SEO/share metadata sets, 3 structured data graphs, ${shareImages.size} PNG previews, both robots/sitemaps, ${checkedRequests} HTTP routing checks, draft metadata, canonical URLs, and product destinations.`,
);
