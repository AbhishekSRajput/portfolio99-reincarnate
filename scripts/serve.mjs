import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { access, readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { pipeline } from "node:stream/promises";
import { pathToFileURL } from "node:url";

// A local preview for the static export; deployment is served by the CDN.
const config = JSON.parse(
  await readFile(new URL("../vercel.json", import.meta.url), "utf8"),
);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".json": "application/json",
};

// Support precisely the route features used here, and fail loudly if deployment
// config grows beyond the preview's contract instead of silently simulating it.
for (const route of config.routes) {
  const keys = ["src", "has", "status", "headers", "dest"];
  if (
    Object.keys(route).some((key) => !keys.includes(key)) ||
    route.has?.some(
      (condition) => condition.type !== "host" || typeof condition.value !== "string",
    )
  ) {
    throw new Error("Update static preview to support the new Vercel route configuration.");
  }
}

export async function resolveExportRequest(
  requestPath,
  requestHost = "",
  root = resolve("out"),
) {
  const url = new URL(requestPath, "http://localhost");
  const hostname = requestHost.toLowerCase().replace(/:\d+$/, "");
  let pathname = decodeURIComponent(url.pathname);
  let rewritten = false;

  // Ordered Vercel routes run before filesystem lookup, including out/index.html.
  for (const route of config.routes) {
    if (route.has?.some((condition) => !new RegExp(`^(?:${condition.value})$`).test(hostname))) continue;
    const match = new RegExp(route.src, "i").exec(pathname);
    if (!match) continue;
    const substitute = (value) => value.replace(/\$(\d+)/g, (_, index) => match[index] ?? "");
    if (route.status && route.headers?.Location) {
      return {
        status: route.status,
        headers: { Location: substitute(route.headers.Location) },
      };
    }
    if (route.dest) {
      pathname = substitute(route.dest);
      rewritten = true;
      break;
    }
  }

  if (!rewritten && config.trailingSlash && !pathname.endsWith("/") && !extname(pathname)) {
    return { status: 308, headers: { Location: url.pathname + "/" + url.search } };
  }
  let file = resolve(root, "." + pathname);
  if (file !== root && !file.startsWith(root + sep)) return { status: 403 };
  let info = await stat(file).catch(() => null);
  if (info?.isDirectory()) {
    file = resolve(file, "index.html");
    info = await stat(file).catch(() => null);
  }
  const found = info?.isFile();
  return {
    status: found ? 200 : 404,
    file: found ? file : resolve(root, "404.html"),
  };
}

export function createPreviewServer({ root = resolve("out"), previewHost } = {}) {
  return createServer(async (request, response) => {
    if (!["GET", "HEAD"].includes(request.method)) {
      response.writeHead(405, { Allow: "GET, HEAD" });
      response.end();
      return;
    }
    try {
      const result = await resolveExportRequest(
        request.url,
        previewHost ?? request.headers.host,
        root,
      );
      const headers = {
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "no-cache",
        ...result.headers,
      };
      if (result.file) headers["Content-Type"] = mime[extname(result.file)] ?? "application/octet-stream";
      response.writeHead(result.status, headers);
      if (request.method === "HEAD" || !result.file) response.end();
      else await pipeline(createReadStream(result.file), response);
    } catch {
      if (!response.headersSent) response.writeHead(400);
      response.end();
    }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const root = resolve("out");
  const port = Number(process.env.PORT ?? 3000);
  const host = process.env.HOST ?? "127.0.0.1";
  try {
    await access(resolve(root, "index.html"));
  } catch {
    console.error("No static export found. Run pnpm build first.");
    process.exit(1);
  }
  const server = createPreviewServer({ root, previewHost: process.env.PREVIEW_HOST });
  server.listen(port, host, () => {
    const address = server.address();
    console.log(`Static preview: http://${host}:${address.port}`);
    if (process.env.PREVIEW_HOST) console.log(`Preview hostname: ${process.env.PREVIEW_HOST}`);
  });
}
