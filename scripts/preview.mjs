// Vorschau der Karte per Playwright: speichert Screenshots verschiedener
// Zustände und des Editors in docs/screenshots.
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { createRequire } from "node:module";
import { startServer, root } from "./server.mjs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const shots = [
  { file: "abgesteckt-hell", scenario: "abgesteckt", theme: "light", width: 560 },
  { file: "laden-ac-hell", scenario: "laden_ac", theme: "light", width: 560 },
  { file: "laden-dc-dunkel", scenario: "laden_dc", theme: "dark", width: 560 },
  { file: "langsam-schmal-dunkel", scenario: "langsam", theme: "dark", width: 360 },
];

const { server, url } = await startServer();
await mkdir(join(root, "docs/screenshots"), { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1140, height: 900 }, deviceScaleFactor: 2 });
page.on("pageerror", (e) => console.error("Seitenfehler:", e.message));
await page.goto(url);
await page.waitForFunction(() => window.ready === true);
for (const s of shots) {
  await page.evaluate((o) => window.render(o), s);
  await page.waitForTimeout(300);
  const out = join(root, "docs/screenshots", `${s.file}.png`);
  await page.locator("#wrap").screenshot({ path: out });
  console.log("gespeichert:", out);
}
await page.evaluate(() => window.renderEditor({ scenario: "laden_ac", theme: "light" }));
await page.waitForTimeout(300);
const out = join(root, "docs/screenshots", "editor-hell.png");
await page.locator("#wrap").screenshot({ path: out });
console.log("gespeichert:", out);
await browser.close();
server.close();
