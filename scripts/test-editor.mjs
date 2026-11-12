// Tests the card editor in the browser (with the ha-form stand-in from preview/).
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./server.mjs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const P = "sensor.my_car_";

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
  // 1. Empty config: the card shows a hint instead of an error
  await step("empty config", async () => {
    await page.evaluate(() =>
      window.renderEditor({ scenario: "unplugged", theme: "light", config: { entities: {} } })
    );
    const hint = await page.locator("car-info-card .hint").textContent();
    assert.match(hint, /battery level/);
  });

  // 2. Select the required entity
  await step("select battery level", async () => {
    await field(2, "battery").selectOption(P + "battery_level");
    assert.equal((await cfg()).entities.battery, P + "battery_level");
    assert.equal(await page.locator("car-info-card .soc").textContent(), "35 %");
  });

  // 3. Set a name, remove an empty name again
  await step("name", async () => {
    await field(0, "name").fill("My car");
    await field(0, "name").dispatchEvent("change");
    assert.equal((await cfg()).name, "My car");
    await field(0, "name").fill("");
    await field(0, "name").dispatchEvent("change");
    assert.equal("name" in (await cfg()), false);
  });

  // 4. Add, move, rename and remove values
  await step("add values", async () => {
    const add = () => editor.locator(".add ha-form label[data-name=entity] select");
    await add().selectOption(P + "odometer");
    await add().selectOption(P + "range");
    await add().selectOption(P + "charging_type");
    assert.deepEqual((await cfg()).values.map((v) => v.entity),
      [P + "odometer", P + "range", P + "charging_type"]);
    assert.equal(await page.locator("car-info-card .value").count(), 3);
  });
  await step("move value", async () => {
    await editor.locator(".value-row").nth(2).locator("button[title='Move up']").click();
    assert.deepEqual((await cfg()).values.map((v) => v.entity),
      [P + "odometer", P + "charging_type", P + "range"]);
  });
  await step("rename value", async () => {
    const name = editor.locator(".value-row").nth(0).locator("label[data-name=name] input");
    await name.fill("km");
    await name.dispatchEvent("change");
    assert.deepEqual((await cfg()).values[0], { entity: P + "odometer", name: "km" });
  });
  await step("remove value", async () => {
    await editor.locator(".value-row").nth(1).locator("button[title='Remove']").click();
    assert.deepEqual((await cfg()).values.map((v) => v.entity), [P + "odometer", P + "range"]);
  });

  // 5. Charging: states and power levels
  await step("charging states", async () => {
    await field(2, "charging_state").selectOption(P + "charging_state");
    assert.equal("charging_states" in (await cfg()), false);
    await forms.nth(3).locator("input[value=conserving]").check();
    assert.deepEqual((await cfg()).charging_states, ["charging", "conserving"]);
    await forms.nth(3).locator("input[value=conserving]").uncheck();
    assert.equal("charging_states" in (await cfg()), false);
  });
  await step("power levels", async () => {
    await field(3, "power_2").fill("22");
    await field(3, "power_2").dispatchEvent("change");
    assert.deepEqual((await cfg()).power_levels, [3.7, 22, 50]);
    await field(3, "power_2").fill("11");
    await field(3, "power_2").dispatchEvent("change");
    assert.equal("power_levels" in (await cfg()), false);
  });

  // 6. Change and reset colors
  await step("colors", async () => {
    const color = editor.locator(".colors input").nth(0);
    await color.evaluate((el) => {
      el.value = "#123456";
      el.dispatchEvent(new Event("change"));
    });
    assert.equal((await cfg()).colors[0], "#123456");
    assert.equal(await page.locator("car-info-card rect.seg").first().getAttribute("fill"), "#123456");
    await editor.locator("button.text-button").click();
    assert.equal("colors" in (await cfg()), false);
  });

  // 6b. Battery colors: dark green only when fully charged
  await step("battery colors", async () => {
    const fills = () =>
      page.locator("car-info-card rect.seg").evaluateAll((rs) => rs.map((r) => r.getAttribute("fill")));
    for (const scenario of ["charging_dc", "nearly_full"]) {
      await page.evaluate((sc) => window.render({ scenario: sc, theme: "dark", width: 560 }), scenario);
      const f = await fills();
      assert.ok(!f.includes("#2e7d32"), `${scenario}: no dark green below 100 %`);
    }
    // 85 %: last segment partly filled in light green
    assert.equal((await fills())[4], "#7cb342");
    await page.evaluate(() => window.render({ scenario: "full", theme: "light", width: 560 }));
    assert.deepEqual(await fills(), Array(5).fill("#2e7d32"));
    // older configs with 5 colors keep working and use the default full color
    await page.evaluate(() => window.render({ scenario: "full", theme: "light", width: 560,
      config: { colors: ["#111111", "#222222", "#333333", "#444444", "#555555"] } }));
    assert.deepEqual(await fills(), Array(5).fill("#2e7d32"));
    await page.evaluate(() => window.render({ scenario: "charging_ac", theme: "light", width: 560,
      config: { colors: ["#111111", "#222222", "#333333", "#444444", "#555555", "#666666"] } }));
    assert.deepEqual(await fills(), ["#111111", "#222222", "#333333", "#444444"]);
    await page.evaluate(() => window.renderEditor({ scenario: "unplugged", theme: "light" }));
  });

  // 7. Show or hide name and licence plate separately
  await step("name and plate", async () => {
    const header = () => page.evaluate(() => {
      const root = document.querySelector("car-info-card").shadowRoot;
      return {
        name: root.querySelector(".name")?.textContent.trim() ?? null,
        plate: root.querySelector(".plate")?.textContent.trim() ?? null,
      };
    });
    assert.deepEqual(await header(), { name: "My car", plate: "AB-CD 123" });

    await field(0, "show_plate").uncheck();
    assert.equal((await cfg()).show_plate, false);
    assert.deepEqual(await header(), { name: "My car", plate: null });

    await field(0, "show_name").uncheck();
    assert.equal((await cfg()).show_name, false);
    assert.equal(await page.locator("car-info-card .header").count(), 0);

    await field(0, "show_plate").check();
    assert.deepEqual(await header(), { name: "", plate: "AB-CD 123" });
    assert.equal("show_plate" in (await cfg()), false);

    await field(0, "show_name").check();
    assert.equal("show_name" in (await cfg()), false);
    assert.deepEqual(await header(), { name: "My car", plate: "AB-CD 123" });
  });

  // 8. Device filter: only entities of the selected device are offered
  await step("device filter", async () => {
    const options = (form, name) =>
      field(form, name).locator("option").evaluateAll((os) => os.map((o) => o.value).filter(Boolean));
    const addOptions = () => editor.locator(".add ha-form label[data-name=entity] select option")
      .evaluateAll((os) => os.map((o) => o.value).filter(Boolean));
    // forms: 0 general, 1 device, 2 entities, 3 charging
    await field(1, "device").selectOption("");
    assert.ok((await options(2, "charging_power")).includes("sensor.wallbox_power"));
    assert.ok((await addOptions()).includes("sensor.outdoor_temperature"));
    assert.equal("device" in (await cfg()), false);

    await field(1, "device").selectOption("dev_car");
    assert.equal((await cfg()).device, "dev_car");
    const power = await options(2, "charging_power");
    assert.ok(power.includes(P + "charging_power"));
    assert.ok(!power.includes("sensor.wallbox_power"));
    const add = await addOptions();
    assert.ok(add.includes(P + "odometer"));
    assert.ok(!add.includes("sensor.outdoor_temperature"));

    await field(1, "device").selectOption("dev_wallbox");
    const battery = await options(2, "battery");
    // the already configured battery entity stays selectable
    assert.ok(battery.includes(P + "battery_level"));
    assert.ok(battery.includes("sensor.wallbox_power"));
    assert.ok(!battery.includes(P + "range"));
  });

  // 9. German UI when Home Assistant is set to German
  await step("German translation", async () => {
    await page.evaluate(() =>
      window.renderEditor({ scenario: "unplugged", theme: "light", language: "de" })
    );
    assert.equal(await editor.locator("h3").first().textContent(), "Allgemein");
    assert.equal(await editor.locator(".value-row button").first().getAttribute("title"), "Nach oben");
  });

  assert.deepEqual(errors, [], "Page errors: " + errors.join("; "));
  console.log("All editor tests passed.");
} finally {
  await browser.close();
  server.close();
}
