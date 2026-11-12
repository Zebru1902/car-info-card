// Checks src/translations/*.json against en.json (the reference):
// unknown keys and placeholder mismatches fail, missing keys are reported
// (they fall back to English in the card).
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { root } from "./server.mjs";

const dir = join(root, "src/translations");
const read = (f) => JSON.parse(readFileSync(join(dir, f), "utf8"));
const en = read("en.json");
const placeholders = (t) => [...String(t).matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",");
const registered = readFileSync(join(root, "src/localize.js"), "utf8");
let failed = false;

for (const file of readdirSync(dir).filter((f) => f.endsWith(".json")).sort()) {
  const lang = file.replace(".json", "");
  const t = read(file);
  const unknown = Object.keys(t).filter((k) => !(k in en));
  const missing = Object.keys(en).filter((k) => !(k in t));
  const badVars = Object.keys(t).filter((k) => k in en && placeholders(t[k]) !== placeholders(en[k]));
  const empty = Object.keys(t).filter((k) => typeof t[k] !== "string" || !t[k].trim());
  if (!registered.includes(`./translations/${file}`)) {
    console.error(`${file}: not imported in src/localize.js`);
    failed = true;
  }
  if (unknown.length) console.error(`${file}: unknown keys: ${unknown.join(", ")}`);
  if (badVars.length) console.error(`${file}: placeholders differ from en.json: ${badVars.join(", ")}`);
  if (empty.length) console.error(`${file}: empty texts: ${empty.join(", ")}`);
  if (unknown.length || badVars.length || empty.length) failed = true;
  console.log(`${lang}: ${Object.keys(t).length}/${Object.keys(en).length} keys` +
    (missing.length ? `, missing (English is used): ${missing.join(", ")}` : ""));
}
if (failed) process.exit(1);
console.log("Translations ok.");
