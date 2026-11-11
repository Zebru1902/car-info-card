import { LitElement, html, css, nothing } from "lit";
import {
  DEFAULT_COLORS,
  DEFAULT_CHARGING_STATES,
  DEFAULT_POWER_LEVELS,
  fireEvent,
} from "./const.js";
import { localize } from "./localize.js";

const COLOR_NAMES = ["0–20 %", "20–40 %", "40–60 %", "60–80 %", "80–100 %"];

// Charging states used by at least one common vehicle integration. More values
// come from the options attribute of the selected entity or can be typed in.
const KNOWN_CHARGING_STATES = [
  "charging",
  "connect_cable",
  "ready_for_charging",
  "conserving",
  "discharging",
  "charging_interrupted",
];

const GENERAL_SCHEMA = [
  { name: "name", selector: { text: {} } },
  { name: "show_name", selector: { boolean: {} } },
  { name: "image", selector: { text: {} } },
];

const ENTITY_SCHEMA = [
  { name: "battery", required: true, selector: { entity: { filter: { domain: "sensor" } } } },
  { name: "charging_power", selector: { entity: { filter: { domain: "sensor" } } } },
  { name: "charging_state", selector: { entity: { filter: { domain: "sensor" } } } },
  { name: "plate", selector: { entity: {} } },
];

const powerField = (name) => ({
  name,
  selector: {
    number: { min: 0, max: 1000, step: 0.1, mode: "box", unit_of_measurement: "kW" },
  },
});

const VALUE_SCHEMA = [
  { name: "entity", required: true, selector: { entity: {} } },
  { name: "name", selector: { text: {} } },
  { name: "icon", selector: { icon: {} } },
];

const PATH_UP = "M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z";
const PATH_DOWN = "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z";
const PATH_DELETE =
  "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";

const sameArray = (a, b) =>
  Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((v, i) => v === b[i]);

const isEmpty = (v) => v === undefined || v === null || v === "";

// Loads ha-form and friends in case the editor opens before any built-in card editor.
// ⚠️ NOT VERIFIED in HA 2026.11: availability of window.loadCardHelpers.
async function loadHaComponents() {
  if (customElements.get("ha-form") && customElements.get("ha-entity-picker")) return;
  if (!window.loadCardHelpers) return;
  try {
    const helpers = await window.loadCardHelpers();
    const card = await helpers.createCardElement({ type: "entities", entities: [] });
    if (card && card.constructor.getConfigElement) {
      await card.constructor.getConfigElement();
    }
  } catch (e) {
    // The editor is limited then; YAML mode still works.
  }
}

class CarInfoCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    loadHaComponents().then(() => this.requestUpdate());
  }

  setConfig(config) {
    this._config = {
      ...config,
      entities: { ...(config.entities || {}) },
      values: (config.values || []).map((v) =>
        typeof v === "string" ? { entity: v } : { ...v }
      ),
    };
  }

  // ---------- Writing the config ----------

  _commit(config) {
    const out = { ...config };
    // Do not write empty or default values to the config
    for (const key of ["name", "image"]) if (isEmpty(out[key])) delete out[key];
    if (out.show_name === true) delete out.show_name;
    const entities = {};
    for (const [k, v] of Object.entries(out.entities || {})) if (!isEmpty(v)) entities[k] = v;
    out.entities = entities;
    if (!out.charging_states || !out.charging_states.length ||
        sameArray(out.charging_states, DEFAULT_CHARGING_STATES)) {
      delete out.charging_states;
    }
    if (!out.power_levels || sameArray(out.power_levels, DEFAULT_POWER_LEVELS)) {
      delete out.power_levels;
    }
    if (!out.colors || sameArray(out.colors.map((c) => c.toLowerCase()), DEFAULT_COLORS)) {
      delete out.colors;
    }
    out.values = (out.values || []).map((v) => {
      const item = { entity: v.entity };
      if (!isEmpty(v.name)) item.name = v.name;
      if (!isEmpty(v.icon)) item.icon = v.icon;
      return item;
    });
    if (!out.values.length) delete out.values;

    this._config = { ...config };
    fireEvent(this, "config-changed", { config: out });
  }

  _generalChanged(ev) {
    ev.stopPropagation();
    const v = ev.detail.value;
    this._commit({ ...this._config, name: v.name, show_name: v.show_name, image: v.image });
  }

  _entitiesChanged(ev) {
    ev.stopPropagation();
    this._commit({ ...this._config, entities: { ...ev.detail.value } });
  }

  _chargingChanged(ev) {
    ev.stopPropagation();
    const v = ev.detail.value;
    const levels = [v.power_1, v.power_2, v.power_3].map((n, i) =>
      Number.isFinite(Number(n)) && !isEmpty(n) ? Number(n) : DEFAULT_POWER_LEVELS[i]
    );
    this._commit({
      ...this._config,
      charging_states: v.charging_states || [],
      power_levels: levels,
    });
  }

  _valueChanged(index, ev) {
    ev.stopPropagation();
    const values = [...this._config.values];
    values[index] = { ...ev.detail.value };
    this._commit({ ...this._config, values });
  }

  _moveValue(index, delta) {
    const values = [...this._config.values];
    const target = index + delta;
    if (target < 0 || target >= values.length) return;
    [values[index], values[target]] = [values[target], values[index]];
    this._commit({ ...this._config, values });
  }

  _removeValue(index) {
    const values = this._config.values.filter((_, i) => i !== index);
    this._commit({ ...this._config, values });
  }

  _addValue(ev) {
    ev.stopPropagation();
    const entity = ev.detail.value && ev.detail.value.entity;
    if (!entity) return;
    this._commit({ ...this._config, values: [...this._config.values, { entity }] });
    // Clear the picker again
    ev.target.data = {};
  }

  _colorChanged(index, ev) {
    const colors = [...(this._config.colors || DEFAULT_COLORS)];
    colors[index] = ev.target.value;
    this._commit({ ...this._config, colors });
  }

  _resetColors() {
    const { colors, ...rest } = this._config;
    this._commit(rest);
  }

  // ---------- Rendering ----------

  _t(key, vars) {
    return localize(this.hass, key, vars);
  }

  _label = (schema) => {
    if (schema.name === "name" && schema._value) return this._t("label.value_name");
    return this._t(`label.${schema.name}`) || schema.name;
  };

  _helper = (schema) => this._t(`helper.${schema.name}`);

  _chargingSchema() {
    const stateObj =
      this.hass && this._config.entities.charging_state
        ? this.hass.states[this._config.entities.charging_state]
        : undefined;
    const fromEntity =
      stateObj && Array.isArray(stateObj.attributes.options) ? stateObj.attributes.options : [];
    const current = this._config.charging_states || DEFAULT_CHARGING_STATES;
    const options = [...new Set([...fromEntity, ...KNOWN_CHARGING_STATES, ...current])];
    return [
      {
        name: "charging_states",
        selector: {
          select: {
            multiple: true,
            custom_value: true,
            mode: "list",
            options: options.map((o) => ({ value: o, label: o })),
          },
        },
      },
      {
        type: "grid",
        name: "",
        schema: [powerField("power_1"), powerField("power_2"), powerField("power_3")],
      },
    ];
  }

  _form(schema, data, handler) {
    return html`<ha-form
      .hass=${this.hass}
      .data=${data}
      .schema=${schema}
      .computeLabel=${this._label}
      .computeHelper=${this._helper}
      @value-changed=${handler}
    ></ha-form>`;
  }

  render() {
    if (!this._config || !this.hass) return nothing;
    const cfg = this._config;
    const levels = cfg.power_levels || DEFAULT_POWER_LEVELS;
    const colors = cfg.colors || DEFAULT_COLORS;
    const valueSchema = VALUE_SCHEMA.map((s) => (s.name === "name" ? { ...s, _value: true } : s));
    const half = Math.ceil(cfg.values.length / 2);

    return html`
      <div class="section">
        <h3>${this._t("editor.general")}</h3>
        ${this._form(
          GENERAL_SCHEMA,
          { name: cfg.name || "", show_name: cfg.show_name !== false, image: cfg.image || "" },
          this._generalChanged
        )}
      </div>

      <div class="section">
        <h3>${this._t("editor.entities")}</h3>
        ${this._form(ENTITY_SCHEMA, cfg.entities, this._entitiesChanged)}
      </div>

      <div class="section">
        <h3>${this._t("editor.charging")}</h3>
        <p class="note">${this._t("editor.charging_note")}</p>
        ${this._form(
          this._chargingSchema(),
          {
            charging_states: cfg.charging_states || DEFAULT_CHARGING_STATES,
            power_1: levels[0],
            power_2: levels[1],
            power_3: levels[2],
          },
          this._chargingChanged
        )}
      </div>

      <div class="section">
        <h3>${this._t("editor.values")}</h3>
        <p class="note">${this._t("editor.values_note")}</p>
        ${cfg.values.map(
          (v, i) => html`
            <div class="value-row">
              <div class="value-head">
                <span class="badge">${this._t(i < half ? "editor.left" : "editor.right")} · ${i + 1}</span>
                <span class="spacer"></span>
                ${this._iconButton(PATH_UP, this._t("editor.move_up"), i === 0, () => this._moveValue(i, -1))}
                ${this._iconButton(PATH_DOWN, this._t("editor.move_down"), i === cfg.values.length - 1, () =>
                  this._moveValue(i, 1)
                )}
                ${this._iconButton(PATH_DELETE, this._t("editor.remove"), false, () => this._removeValue(i))}
              </div>
              ${this._form(valueSchema, v, (ev) => this._valueChanged(i, ev))}
            </div>
          `
        )}
        <div class="add">
          ${this._form(
            [{ name: "entity", selector: { entity: {} } }],
            {},
            this._addValue
          )}
          <span class="note">${this._t("editor.add_note")}</span>
        </div>
      </div>

      <div class="section">
        <h3>${this._t("editor.colors")}</h3>
        <div class="colors">
          ${colors.map(
            (c, i) => html`
              <label class="color">
                <input
                  type="color"
                  .value=${/^#[0-9a-f]{6}$/i.test(c) ? c : "#000000"}
                  @change=${(ev) => this._colorChanged(i, ev)}
                />
                <span>${COLOR_NAMES[i]}</span>
              </label>
            `
          )}
        </div>
        <button class="text-button" @click=${this._resetColors} ?disabled=${!cfg.colors}>
          ${this._t("editor.reset_colors")}
        </button>
      </div>
    `;
  }

  _iconButton(path, label, disabled, handler) {
    return html`<button
      class="icon-button"
      title=${label}
      aria-label=${label}
      ?disabled=${disabled}
      @click=${handler}
    >
      <svg viewBox="0 0 24 24"><path d=${path}></path></svg>
    </button>`;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      .section {
        margin-bottom: 24px;
      }
      h3 {
        font-size: 1rem;
        font-weight: 500;
        margin: 0 0 8px;
      }
      .note {
        color: var(--secondary-text-color);
        font-size: 0.85rem;
        margin: 0 0 8px;
      }
      .value-row {
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 8px;
        padding: 4px 12px 12px;
        margin-bottom: 8px;
      }
      .value-head {
        display: flex;
        align-items: center;
        gap: 2px;
      }
      .spacer {
        flex: 1;
      }
      .badge {
        font-size: 0.75rem;
        color: var(--secondary-text-color);
      }
      .icon-button {
        background: none;
        border: none;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        padding: 6px;
        cursor: pointer;
        color: var(--secondary-text-color);
      }
      .icon-button:hover:not([disabled]) {
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
      }
      .icon-button[disabled] {
        opacity: 0.3;
        cursor: default;
      }
      .icon-button svg {
        width: 24px;
        height: 24px;
        fill: currentColor;
      }
      .add {
        margin-top: 8px;
      }
      .colors {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-bottom: 8px;
      }
      .color {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        font-size: 0.75rem;
        color: var(--secondary-text-color);
      }
      .color input {
        width: 48px;
        height: 32px;
        padding: 0;
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 6px;
        background: none;
        cursor: pointer;
      }
      .text-button {
        background: none;
        border: none;
        color: var(--primary-color, #03a9f4);
        font: inherit;
        font-weight: 500;
        padding: 6px 0;
        cursor: pointer;
      }
      .text-button[disabled] {
        color: var(--disabled-text-color, #bdbdbd);
        cursor: default;
      }
    `;
  }
}

if (!customElements.get("car-info-card-editor")) {
  customElements.define("car-info-card-editor", CarInfoCardEditor);
}
