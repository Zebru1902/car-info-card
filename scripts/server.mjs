// Kleiner statischer Server für Vorschau und Tests (Wurzel = Repo).
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

export const root = fileURLToPath(new URL("..", import.meta.url));
const types = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript" };

export async function startServer() {
  const server = createServer(async (req, res) => {
    const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname));
    try {
      const body = await readFile(join(root, path === "/" ? "preview/index.html" : path));
      res.writeHead(200, { "content-type": types[extname(path)] || "text/html" });
      res.end(body);
    } catch {
      res.writeHead(404).end();
    }
  });
  await new Promise((r) => server.listen(0, r));
  return { server, url: `http://localhost:${server.address().port}/` };
}
