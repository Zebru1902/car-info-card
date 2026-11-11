// Prüft den Karten-Editor im Browser (mit ha-form-Ersatz aus preview/).
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./server.mjs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const P = "sensor.mein_auto_";

const { server, url } = await startServer();
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1140, height: 1400 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto(url);
await page.waitForFunction(() => window.ready === true);

const cfg = () => page.evaluate(() => window.lastConfig);
const editor = page.locator("car-info-card-editor");
const forms = editor.locator("ha-form");
const field = (formIndex, name) =>
  forms.nth(formIndex).locator(`label[data-name="${name}"] :is(select, input)`).first();
const step = async (name, fn) => {
  await fn();
  console.log("ok:", name);
};

try {
  // 1. Leere Konfiguration: Karte zeigt Hinweis statt Fehler
  await step("leere Konfiguration", async () => {
    await page.evaluate(() => window.renderEditor({ scenario: "abgesteckt", theme: "light", config: { entities: {} } }));
    const hint = await page.locator("car-info-card .hint").textContent();
    assert.match(hint, /Ladestand/);
  });

  // 2. Pflicht-Entität wählen
  await step("Ladestand wählen", async () => {
    await field(1, "battery").selectOption(P + "ladestand");
    assert.equal((await cfg()).entities.battery, P + "ladestand");
    assert.equal(await page.locator("car-info-card .soc").textContent(), "35 %");
  });

  // 3. Name setzen, leeren Namen wieder entfernen
  await step("Name", async () => {
    await field(0, "name").fill("Mein Auto");
    await field(0, "name").dispatchEvent("change");
    assert.equal((await cfg()).name, "Mein Auto");
    await field(0, "name").fill("");
    await field(0, "name").dispatchEvent("change");
    assert.equal("name" in (await cfg()), false);
  });

  // 4. Werte hinzufügen, verschieben, entfernen
  await step("Werte hinzufügen", async () => {
    const add = () => editor.locator(".add ha-form label[data-name=entity] select");
    await add().selectOption(P + "kilometerstand");
    await add().selectOption(P + "reichweite");
    await add().selectOption(P + "ladetyp");
    assert.deepEqual((await cfg()).values.map((v) => v.entity),
      [P + "kilometerstand", P + "reichweite", P + "ladetyp"]);
    assert.equal(await page.locator("car-info-card .value").count(), 3);
  });
  await step("Wert verschieben", async () => {
    await editor.locator(".value-row").nth(2).locator("button[title='Nach oben']").click();
    assert.deepEqual((await cfg()).values.map((v) => v.entity),
      [P + "kilometerstand", P + "ladetyp", P + "reichweite"]);
  });
  await step("Wert benennen", async () => {
    const name = editor.locator(".value-row").nth(0).locator("label[data-name=name] input");
    await name.fill("km");
    await name.dispatchEvent("change");
    assert.deepEqual((await cfg()).values[0], { entity: P + "kilometerstand", name: "km" });
  });
  await step("Wert entfernen", async () => {
    await editor.locator(".value-row").nth(1).locator("button[title='Entfernen']").click();
    assert.deepEqual((await cfg()).values.map((v) => v.entity),
      [P + "kilometerstand", P + "reichweite"]);
  });

  // 5. Laden: Zustände und Leistungsstufen
  await step("Ladezustände", async () => {
    await field(1, "charging_state").selectOption(P + "ladezustand");
    assert.equal("charging_states" in (await cfg()), false);
    await forms.nth(2).locator("input[value=conserving]").check();
    assert.deepEqual((await cfg()).charging_states, ["charging", "conserving"]);
    await forms.nth(2).locator("input[value=conserving]").uncheck();
    assert.equal("charging_states" in (await cfg()), false);
  });
  await step("Leistungsstufen", async () => {
    await field(2, "power_2").fill("22");
    await field(2, "power_2").dispatchEvent("change");
    assert.deepEqual((await cfg()).power_levels, [3.7, 22, 50]);
    await field(2, "power_2").fill("11");
    await field(2, "power_2").dispatchEvent("change");
    assert.equal("power_levels" in (await cfg()), false);
  });

  // 6. Farben ändern und zurücksetzen
  await step("Farben", async () => {
    const color = editor.locator(".colors input").nth(0);
    await color.evaluate((el) => {
      el.value = "#123456";
      el.dispatchEvent(new Event("change"));
    });
    assert.equal((await cfg()).colors[0], "#123456");
    assert.equal(await page.locator("car-info-card rect.track").first().getAttribute("fill"), "#123456");
    await editor.locator("button.text-button").click();
    assert.equal("colors" in (await cfg()), false);
  });

  // 7. Kopfzeile ausblenden
  await step("Kopfzeile", async () => {
    await field(0, "show_name").uncheck();
    assert.equal((await cfg()).show_name, false);
    await field(0, "show_name").check();
    assert.equal("show_name" in (await cfg()), false);
  });

  assert.deepEqual(errors, [], "Seitenfehler: " + errors.join("; "));
  console.log("Alle Editor-Tests bestanden.");
} finally {
  await browser.close();
  server.close();
}
