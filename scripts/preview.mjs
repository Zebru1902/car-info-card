// Card preview with Playwright: saves screenshots of several states
// and of the editor to docs/screenshots.
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { createRequire } from "node:module";
import { startServer, root } from "./server.mjs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const shots = [
  { file: "unplugged-light", scenario: "unplugged", theme: "light", width: 560 },
  { file: "charging-ac-light", scenario: "charging_ac", theme: "light", width: 560 },
  { file: "charging-dc-dark", scenario: "charging_dc", theme: "dark", width: 560 },
  { file: "full-light", scenario: "full", theme: "light", width: 560 },
  { file: "slow-narrow-dark", scenario: "slow", theme: "dark", width: 360 },
];

const { server, url } = await startServer();
await mkdir(join(root, "docs/screenshots"), { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1140, height: 900 }, deviceScaleFactor: 2 });
page.on("pageerror", (e) => console.error("Page error:", e.message));
await page.goto(url);
await page.waitForFunction(() => window.ready === true);
for (const s of shots) {
  await page.evaluate((o) => window.render(o), s);
  await page.waitForTimeout(300);
  const out = join(root, "docs/screenshots", `${s.file}.png`);
  await page.locator("#wrap").screenshot({ path: out });
  console.log("saved:", out);
}
await page.evaluate(() => window.renderEditor({ scenario: "charging_ac", theme: "light" }));
await page.waitForTimeout(300);
const out = join(root, "docs/screenshots", "editor-light.png");
await page.locator("#wrap").screenshot({ path: out });
console.log("saved:", out);
await browser.close();
server.close();
