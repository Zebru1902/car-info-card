// Tests the card editor in the browser (with the ha-form stand-in from preview/).
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./server.mjs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const P = "sensor.my_car_";
// What the device scan finds on the example car, in the editor's order
const ALL_STANDARD = [
  { type: "odometer", entity: P + "odometer" },
  { type: "range", entity: P + "range" },
  { type: "charging_power_value", entity: P + "charging_power" },
  { type: "time_to_full", entity: P + "time_to_full" },
  { type: "charging_state_value", entity: P + "charging_state" },
  { type: "charging_type", entity: P + "charging_type" },
  { type: "target_temperature", entity: P + "target_temperature" },
];

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
    // without an own label, the device name is left out of the entity name
    // values without a type fill up the shorter side: left, right, left
    assert.deepEqual(await page.locator("car-info-card .values.left .label").allTextContents(),
      ["Odometer", "Charging type"]);
    assert.deepEqual(await page.locator("car-info-card .values.right .label").allTextContents(), ["Range"]);
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

  // 6c. Wrong or missing battery entity: the card explains the problem
  await step("battery entity problems", async () => {
    const problem = () => page.locator("car-info-card .problem");
    await page.evaluate(() => window.render({ scenario: "unplugged", theme: "light", width: 560,
      config: { entities: { battery: "sensor.my_car_charging_state" } } }));
    assert.equal(await page.locator("car-info-card .soc").textContent(), "–");
    assert.match(await problem().textContent(), /does not report a number \(Connect cable\)/);
    await page.evaluate(() => window.render({ scenario: "unplugged", theme: "light", width: 560,
      config: { entities: { battery: "sensor.does_not_exist" } } }));
    assert.match(await problem().textContent(), /sensor\.does_not_exist not found/);
    // unknown is a normal state: only "–", no problem text
    await page.evaluate(() => window.render({ scenario: "unplugged", theme: "light", width: 560,
      config: { entities: { battery: "sensor.my_car_time_to_full" } } }));
    assert.equal(await problem().count(), 0);
    await page.evaluate(() => window.render({ scenario: "unplugged", theme: "light", width: 560 }));
    assert.equal(await problem().count(), 0);
    await page.evaluate(() => window.renderEditor({ scenario: "unplugged", theme: "light" }));
  });

  // 6d. On/off charging sensor (binary_sensor): "on" means charging
  await step("binary charging sensor", async () => {
    const level = (state) => page.evaluate(async (st) => {
      const card = document.querySelector("car-info-card");
      const id = "binary_sensor.my_car_charging";
      card.setConfig({ entities: { battery: "sensor.my_car_battery_level",
        charging_power: "sensor.my_car_charging_power", charging_state: id } });
      card.hass = { ...card.hass, states: { ...card.hass.states,
        [id]: { entity_id: id, state: st, attributes: { device_class: "battery_charging" } } } };
      await card.updateComplete;
      return card.shadowRoot.querySelector(".battery").className;
    }, state);
    await page.evaluate(() => window.render({ scenario: "charging_ac", theme: "light", width: 560 }));
    assert.match(await level("on"), /level-2/);
    assert.match(await level("off"), /level-0/);
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

  // 7b. Built-in vehicle drawings
  await step("vehicle", async () => {
    const shown = () => page.locator("car-info-card svg.car-svg").getAttribute("data-silhouette");
    assert.equal(await shown(), "suv");
    const labels = await field(0, "silhouette").locator("option")
      .evaluateAll((os) => os.map((o) => o.textContent));
    assert.deepEqual(labels, ["SUV", "Sedan", "Hatchback", "Van", "Formula race car", "Tractor", "Vintage car"]);
    await field(0, "silhouette").selectOption("tractor");
    assert.equal((await cfg()).silhouette, "tractor");
    assert.equal(await shown(), "tractor");
    await field(0, "silhouette").selectOption("suv");
    assert.equal("silhouette" in (await cfg()), false);
    // a custom image replaces the drawing
    await field(0, "image").fill("/local/car.png");
    await field(0, "image").dispatchEvent("change");
    assert.equal(await page.locator("car-info-card .car img").getAttribute("src"), "/local/car.png");
    await field(0, "image").fill("");
    await field(0, "image").dispatchEvent("change");
    assert.equal("image" in (await cfg()), false);
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

  // 8a. Selecting a device fills empty entity fields; standard values by ticking
  await step("device auto-fill and standard values", async () => {
    await page.evaluate(() => window.renderEditor({ scenario: "unplugged", theme: "light",
      config: { entities: {} } }));
    await field(1, "device").selectOption("dev_car");
    assert.deepEqual((await cfg()).entities, {
      battery: P + "battery_level",
      charging_power: P + "charging_power",
      charging_state: P + "charging_state",
    });
    assert.equal(await page.locator("car-info-card .soc").textContent(), "35 %");

    // the device scan activates every standard value the device offers
    const tick = (type) => editor.locator(`.quick input[data-type=${type}]`);
    assert.deepEqual((await cfg()).values, [
      { type: "odometer", entity: P + "odometer" },
      { type: "range", entity: P + "range" },
      { type: "charging_power_value", entity: P + "charging_power" },
      { type: "time_to_full", entity: P + "time_to_full" },
      { type: "charging_state_value", entity: P + "charging_state" },
      { type: "charging_type", entity: P + "charging_type" },
      { type: "target_temperature", entity: P + "target_temperature" },
    ]);
    for (const type of ["odometer", "range", "charging_power_value", "time_to_full"]) {
      assert.equal(await tick(type).isChecked(), true);
    }
    // general values left, charging values right
    const side = (cls) => page.locator(`car-info-card .values.${cls} .label`).allTextContents();
    assert.deepEqual(await side("left"), ["Odometer", "Range", "Target temperature"]);
    assert.deepEqual(await side("right"), ["Charging power", "Time to full", "Charging state", "Charging type"]);
    assert.deepEqual(await editor.locator(".value-row .badge").allTextContents(),
      ["left · 1", "left · 2", "right · 3", "right · 4", "right · 5", "right · 6", "left · 7"]);

    // more sensors of the device, not shown yet, can be ticked
    const other = (id) => editor.locator(`.other input[data-entity="${id}"]`);
    assert.deepEqual(await editor.locator(".other input").evaluateAll((es) => es.map((e) => e.dataset.entity)),
      [P + "climate_time_left", P + "licence_plate"]);
    await other(P + "climate_time_left").check();
    assert.deepEqual((await cfg()).values.at(-1), { entity: P + "climate_time_left" });
    assert.equal(await other(P + "climate_time_left").isChecked(), true);
    await other(P + "climate_time_left").uncheck();
    assert.ok(!(await cfg()).values.some((v) => v.entity === P + "climate_time_left"));

    // ⇄ moves a value to the other side and back
    const swap = (i) => editor.locator(".value-row").nth(i).locator("button[title='Other side']").click();
    await swap(0);
    assert.equal((await cfg()).values[0].position, "right");
    assert.deepEqual(await side("right"), ["Odometer", "Charging power", "Time to full", "Charging state", "Charging type"]);
    await swap(0);
    assert.equal("position" in (await cfg()).values[0], false);
    assert.deepEqual(await side("left"), ["Odometer", "Range", "Target temperature"]);

    await tick("range").uncheck();
    assert.ok(!(await cfg()).values.some((v) => v.type === "range"));
    assert.equal(await tick("range").isChecked(), false);

    // no matching entity: an empty row to fill in, not shown on the card yet
    await field(1, "device").selectOption("dev_wallbox");
    await tick("odometer").uncheck();
    await tick("odometer").check();
    const odo = (await cfg()).values.find((v) => v.type === "odometer");
    assert.deepEqual(odo, { type: "odometer", entity: "" });
    assert.equal(await page.locator("car-info-card .value").count(), 5);
  });

  // 8c. New card and device change never keep a battery of another device
  await step("car detection", async () => {
    assert.deepEqual(await page.evaluate(() => window.stubConfig()), {
      name: "My car",
      device: "dev_car",
      entities: {
        battery: P + "battery_level",
        charging_power: P + "charging_power",
        charging_state: P + "charging_state",
      },
      values: ALL_STANDARD,
    });
    // the case from the real test: a robot vacuum battery was preselected
    await page.evaluate(() => window.renderEditor({ scenario: "unplugged", theme: "light",
      config: { entities: { battery: "sensor.robot_vacuum_battery", charging_power: "sensor.wallbox_power" },
        values: [{ type: "odometer", entity: "sensor.robot_vacuum_battery" }, { entity: "sensor.outdoor_temperature" }] } }));
    await field(1, "device").selectOption("dev_car");
    const c = await cfg();
    assert.equal(c.entities.battery, P + "battery_level");
    assert.equal(c.entities.charging_power, P + "charging_power");
    assert.equal(c.entities.charging_state, P + "charging_state");
    // standard values follow the device, own values stay
    assert.deepEqual(c.values, [
      { type: "odometer", entity: P + "odometer" },
      { entity: "sensor.outdoor_temperature" },
      ...ALL_STANDARD.slice(1),
    ]);
  });

  // 8b. Language option overrides the Home Assistant language
  await step("language option", async () => {
    const options = await field(0, "language").locator("option")
      .evaluateAll((os) => os.map((o) => [o.value, o.textContent]));
    assert.deepEqual(options, [["auto", "Automatic (Home Assistant language)"], ["en", "English"], ["de", "Deutsch"]]);
    await field(0, "language").selectOption("de");
    assert.equal((await cfg()).language, "de");
    assert.equal(await editor.locator("h3").first().textContent(), "Allgemein");
    await field(0, "language").selectOption("auto");
    assert.equal("language" in (await cfg()), false);
    assert.equal(await editor.locator("h3").first().textContent(), "General");
  });

  // 9. German UI when Home Assistant is set to German
  await step("German translation", async () => {
    await page.evaluate(() =>
      window.renderEditor({ scenario: "unplugged", theme: "light", language: "de" })
    );
    assert.equal(await editor.locator("h3").first().textContent(), "Allgemein");
    assert.equal(await editor.locator(".value-row button").first().getAttribute("title"), "Nach oben");
    // a fixed language wins over the Home Assistant language
    await page.evaluate(() => window.renderEditor({ scenario: "unplugged", theme: "light", language: "de",
      config: { entities: {}, language: "en" } }));
    assert.equal(await editor.locator("h3").first().textContent(), "General");
    assert.match(await page.locator("car-info-card .hint").textContent(), /battery level/);
    // regional variants use the base language, unknown languages fall back to English
    for (const [lang, heading] of [["de-AT", "Allgemein"], ["fr", "General"]]) {
      await page.evaluate((l) => window.renderEditor({ scenario: "unplugged", theme: "light", language: l }), lang);
      assert.equal(await editor.locator("h3").first().textContent(), heading);
    }
  });

  assert.deepEqual(errors, [], "Page errors: " + errors.join("; "));
  console.log("All editor tests passed.");
} finally {
  await browser.close();
  server.close();
}
