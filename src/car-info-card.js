import { LitElement, html, svg, css, nothing } from "lit";
import {
  VERSION,
  resolveColors,
  DEFAULT_CHARGING_STATES,
  DEFAULT_POWER_LEVELS,
  fireEvent,
} from "./const.js";
import { localize, browserLanguageString, LANGUAGES } from "./localize.js";
import { SILHOUETTES, SILHOUETTE_NAMES, DEFAULT_SILHOUETTE } from "./silhouettes.js";
import { suggestSetup, PURPOSES } from "./suggest.js";
import { splitValues } from "./layout.js";
import "./car-info-card-editor.js";

const UNAVAILABLE = ["unknown", "unavailable", "none", ""];

// Battery geometry (viewBox 0 0 220 100)
const BAT = { x: 12, y: 12, w: 180, h: 76, gap: 6, segments: 5 };

const DRIVES = ["electric", "combustion", "hybrid"];

// Fuel pump icon (Material Design Icons, "gas-station", Apache 2.0)
const PUMP =
  "M18,10A1,1 0 0,1 17,9A1,1 0 0,1 18,8A1,1 0 0,1 19,9A1,1 0 0,1 18,10M12,10H6V5H12M19.77,7.23L19.78,7.22L16.06,3.5L15,4.56L17.11,6.67C16.17,7 15.5,7.93 15.5,9A2.5,2.5 0 0,0 18,11.5C18.36,11.5 18.69,11.42 19,11.29V18.5A1,1 0 0,1 18,19.5A1,1 0 0,1 17,18.5V14C17,12.89 16.1,12 15,12H14V5C14,3.89 13.1,3 12,3H6C4.89,3 4,3.89 4,5V21H14V13.5H15.5V18.5A2.5,2.5 0 0,0 18,21A2.5,2.5 0 0,0 20.5,18.5V9C20.5,8.31 20.22,7.68 19.77,7.23Z";

class CarInfoCard extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
    };
  }

  static getConfigElement() {
    return document.createElement("car-info-card-editor");
  }

  // New card: picks the device that looks like a car (not just any battery,
  // e.g. of a robot vacuum) and fills in its main entities
  static getStubConfig(hass) {
    return suggestSetup(hass);
  }


  setConfig(config) {
    if (!config) {
      throw new Error("Invalid configuration.");
    }
    if (config.entities !== undefined && typeof config.entities !== "object") {
      throw new Error("entities must be an object.");
    }
    if (config.language && config.language !== "auto" && !LANGUAGES.includes(config.language)) {
      throw new Error(`language must be auto or one of: ${LANGUAGES.join(", ")}.`);
    }
    if (config.drive && config.drive !== "auto" && !DRIVES.includes(config.drive)) {
      throw new Error(`drive must be auto or one of: ${DRIVES.join(", ")}.`);
    }
    if (config.silhouette && !SILHOUETTES[config.silhouette]) {
      throw new Error(`silhouette must be one of: ${SILHOUETTE_NAMES.join(", ")}.`);
    }
    if (config.values && !Array.isArray(config.values)) {
      throw new Error("values must be a list.");
    }
    if (
      config.colors &&
      (!Array.isArray(config.colors) || ![5, 6].includes(config.colors.length))
    ) {
      throw new Error("colors must contain 5 segment colors and optionally a 6th color for fully charged.");
    }
    this._config = {
      show_name: true,
      show_plate: true,
      values: [],
      ...config,
      entities: { ...(config.entities || {}) },
      values: (config.values || []).map((v) =>
        typeof v === "string" ? { entity: v } : v
      ),
    };
  }

  _t(key, vars) {
    return localize(this.hass, key, vars, this._config && this._config.language);
  }

  getCardSize() {
    return 5;
  }

  getGridOptions() {
    return { columns: 12, min_columns: 6 };
  }

  // ---------- Values ----------

  _stateObj(entityId) {
    return entityId && this.hass ? this.hass.states[entityId] : undefined;
  }

  _isAvailable(stateObj) {
    return stateObj && !UNAVAILABLE.includes(String(stateObj.state).toLowerCase());
  }

  _formatState(stateObj) {
    if (!this._isAvailable(stateObj)) return "–";
    if (this.hass.formatEntityState) return this.hass.formatEntityState(stateObj);
    const unit = stateObj.attributes.unit_of_measurement;
    return unit ? `${stateObj.state} ${unit}` : stateObj.state;
  }

  _soc() {
    return this._percent(this._config.entities.battery);
  }

  // Fuel level in %; litres or gallons need the tank size (fuel_capacity)
  _fuel() {
    return this._percent(this._config.entities.fuel, this._config.fuel_capacity);
  }

  _percent(entityId, capacity) {
    const s = this._stateObj(entityId);
    if (!this._isAvailable(s)) return undefined;
    let v = parseFloat(s.state);
    if (!Number.isFinite(v)) return undefined;
    const unit = (s.attributes.unit_of_measurement || "%").trim();
    if (unit !== "%") {
      if (!(capacity > 0)) return undefined;
      v = (v / capacity) * 100;
    }
    return Math.min(100, Math.max(0, v));
  }

  // electric, combustion or hybrid: the option drive, otherwise by the entities
  _drive() {
    const d = this._config.drive;
    if (DRIVES.includes(d)) return d;
    const { battery, fuel } = this._config.entities;
    if (battery && fuel) return "hybrid";
    return fuel ? "combustion" : "electric";
  }

  _powerKw() {
    const s = this._stateObj(this._config.entities.charging_power);
    if (!this._isAvailable(s)) return 0;
    const v = parseFloat(s.state);
    if (!Number.isFinite(v)) return 0;
    const unit = (s.attributes.unit_of_measurement || "kW").trim();
    if (unit === "W") return v / 1000;
    if (unit === "MW") return v * 1000;
    return v;
  }

  _isCharging() {
    if (this._drive() === "combustion") return false;
    const stateEntity = this._config.entities.charging_state;
    if (stateEntity) {
      const s = this._stateObj(stateEntity);
      if (!s) return false;
      // Some integrations only offer an on/off sensor for charging
      if (stateEntity.startsWith("binary_sensor.") && !this._config.charging_states) {
        return s.state === "on";
      }
      const states = this._config.charging_states || DEFAULT_CHARGING_STATES;
      return states.includes(s.state);
    }
    return this._powerKw() > 0;
  }

  // 0 = not charging, 1–4 = level by charging power
  _chargeLevel() {
    if (!this._isCharging()) return 0;
    const kw = this._powerKw();
    const limits = this._config.power_levels || DEFAULT_POWER_LEVELS;
    const idx = limits.findIndex((limit) => kw <= limit);
    return idx === -1 ? limits.length + 1 : idx + 1;
  }

  _moreInfo(entityId) {
    if (entityId) fireEvent(this, "hass-more-info", { entityId });
  }

  // ---------- Rendering ----------

  render() {
    if (!this._config || !this.hass) return nothing;
    const cfg = this._config;
    if (!cfg.entities.battery && !cfg.entities.fuel) {
      return html`<ha-card>
        <div class="hint">
          ${this._t("card.hint")}
        </div>
      </ha-card>`;
    }
    const drive = this._drive();
    const soc = this._soc();
    const fuel = this._fuel();
    const level = this._chargeLevel();
    const main = drive === "combustion" ? fuel : soc;
    const mainEntity = drive === "combustion" ? cfg.entities.fuel : cfg.entities.battery;
    // Rows without an entity are still being set up in the editor
    // The charging state is already shown below the battery; older cards got it
    // as a standard value too, which is skipped here
    const values = cfg.values.filter((v) => v.entity && v.type !== "charging_state_value");
    const { left, right } = splitValues(values);
    const plate = this._stateObj(cfg.entities.plate);
    const showName = cfg.show_name !== false && !!cfg.name;
    const showPlate = cfg.show_plate !== false && this._isAvailable(plate);

    return html`
      <ha-card>
        ${showName || showPlate
          ? html`<div class="header">
              <span class="name">${showName ? cfg.name : ""}</span>
              ${showPlate ? html`<span class="plate">${plate.state}</span>` : nothing}
            </div>`
          : nothing}
        <div class="layout ${values.length ? "" : "no-values"}">
          <div class="values left">${left.map((v) => this._renderValue(v))}</div>
          <div class="center">
            <div class="car">
              ${cfg.image
                ? html`<img src=${cfg.image} alt="" />`
                : this._renderCar()}
              <div
                class="battery level-${level}"
                style=${this._batteryStyle()}
                data-drive=${drive}
                @click=${() => this._moreInfo(mainEntity)}
              >
                ${drive === "combustion"
                  ? this._renderTank(fuel)
                  : this._renderBattery(soc, level, drive === "hybrid" ? fuel : null)}
              </div>
            </div>
            <div class="soc">${main === undefined ? "–" : `${Math.round(main)} %`}</div>
            ${drive === "hybrid" ? this._renderFuelLine(fuel) : nothing}
            ${this._renderBatteryProblem(drive)}
            ${drive === "combustion" ? nothing : this._renderStatus(level)}
          </div>
          <div class="values right">${right.map((v) => this._renderValue(v))}</div>
        </div>
      </ha-card>
    `;
  }

  // Position of the battery: per built-in drawing, default position for own images
  _batteryStyle() {
    const pos = this._config.image ? SILHOUETTES[DEFAULT_SILHOUETTE].battery : this._silhouette().battery;
    return `left:${pos.left}%;top:${pos.top}%;width:${pos.width}%`;
  }

  _renderStatus(level) {
    const ent = this._config.entities;
    const stateObj = this._stateObj(ent.charging_state);
    const parts = [];
    if (stateObj) parts.push(this._formatState(stateObj));
    if (level > 0) {
      const p = this._stateObj(ent.charging_power);
      if (this._isAvailable(p)) parts.push(this._formatState(p));
    }
    if (!parts.length) return nothing;
    return html`<div
      class="status ${level > 0 ? "charging" : ""}"
      @click=${() => this._moreInfo(ent.charging_state || ent.charging_power)}
    >
      ${parts.join(" · ")}
    </div>`;
  }

  // Explains why no battery level is shown: entity missing or not numeric.
  // unknown/unavailable is a normal state and only shows "–".
  _renderBatteryProblem(drive) {
    const texts = [];
    const check = (key, prefix) => {
      const entity = this._config.entities[key];
      const s = this._stateObj(entity);
      if (!s) texts.push(this._t(`card.${prefix}_missing`, { entity }));
      else if (this._isAvailable(s) && !Number.isFinite(parseFloat(s.state))) {
        texts.push(this._t(`card.${prefix}_not_numeric`, { state: this._formatState(s) }));
      } else if (
        key === "fuel" &&
        this._isAvailable(s) &&
        (s.attributes.unit_of_measurement || "%").trim() !== "%" &&
        !(this._config.fuel_capacity > 0)
      ) {
        texts.push(this._t("card.fuel_needs_capacity", { unit: s.attributes.unit_of_measurement }));
      }
    };
    if (drive !== "combustion") check("battery", "battery");
    if (drive !== "electric") check("fuel", "fuel");
    return texts.map((t) => html`<div class="problem">${t}</div>`);
  }

  // Hybrid: fuel level as a small line below the battery level
  _renderFuelLine(fuel) {
    return html`<div class="fuel-line" @click=${() => this._moreInfo(this._config.entities.fuel)}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${PUMP}></path></svg>
      ${fuel === undefined ? "–" : `${Math.round(fuel)} %`}
    </div>`;
  }

  // Friendly name without the device name in front ("My car Odometer" -> "Odometer")
  _entityName(stateObj) {
    const full = stateObj.attributes.friendly_name || stateObj.entity_id;
    const entry = this.hass.entities && this.hass.entities[stateObj.entity_id];
    const device = entry && entry.device_id && this.hass.devices && this.hass.devices[entry.device_id];
    const deviceName = device && (device.name_by_user || device.name);
    if (deviceName && full.startsWith(deviceName + " ") && full.length > deviceName.length + 1) {
      return full.slice(deviceName.length + 1);
    }
    return full;
  }

  // Time to full: remaining time and clock time instead of a date or plain minutes
  _formatValue(item, stateObj) {
    const isTimeToFull =
      item.type === "time_to_full" || PURPOSES.time_to_full.match(stateObj);
    if (isTimeToFull && this._isAvailable(stateObj)) {
      const minutes = this._minutesLeft(stateObj);
      if (minutes !== undefined) return this._formatRemaining(minutes);
    }
    return this._formatState(stateObj);
  }

  // Minutes until full from a timestamp or a duration sensor; undefined if unknown
  _minutesLeft(s) {
    const unit = (s.attributes.unit_of_measurement || "").trim();
    if (s.attributes.device_class === "timestamp" || (!unit && isNaN(Number(s.state)))) {
      const end = Date.parse(s.state);
      if (!Number.isFinite(end)) return undefined;
      return Math.max(0, Math.round((end - Date.now()) / 60000));
    }
    const v = parseFloat(s.state);
    if (!Number.isFinite(v)) return undefined;
    const factor = { s: 1 / 60, min: 1, h: 60, d: 1440 }[unit];
    return factor === undefined ? undefined : Math.max(0, Math.round(v * factor));
  }

  // "2 h 15 min · 16:45"; more than a day ahead also shows the weekday
  _formatRemaining(minutes) {
    if (minutes <= 0) return "0 min";
    const d = Math.floor(minutes / 1440);
    const h = Math.floor((minutes % 1440) / 60);
    const m = minutes % 60;
    const parts = [];
    if (d) parts.push(`${d} d`);
    if (h) parts.push(`${h} h`);
    if (m && !d) parts.push(`${m} min`);
    const lang = (this.hass.locale && this.hass.locale.language) || this.hass.language || undefined;
    const end = new Date(Date.now() + minutes * 60000);
    const opts = { hour: "numeric", minute: "2-digit" };
    if (minutes >= 1440) opts.weekday = "short";
    let clock;
    try {
      clock = end.toLocaleTimeString(lang, opts);
    } catch (e) {
      clock = end.toLocaleTimeString(undefined, opts);
    }
    return `${parts.join(" ")} · ${clock}`;
  }

  _renderValue(item) {
    const stateObj = this._stateObj(item.entity);
    const name = item.name || (stateObj ? this._entityName(stateObj) : item.entity);
    return html`
      <div class="value" @click=${() => this._moreInfo(item.entity)}>
        ${item.icon
          ? html`<ha-icon class="icon" .icon=${item.icon}></ha-icon>`
          : stateObj
          ? html`<ha-state-icon
              class="icon"
              .hass=${this.hass}
              .stateObj=${stateObj}
            ></ha-state-icon>`
          : nothing}
        <div class="text">
          <span class="label">${name}</span>
          <span class="state">${stateObj ? this._formatValue(item, stateObj) : this._t("card.not_found")}</span>
        </div>
      </div>
    `;
  }

  // Five colored segments of 20 % each; all in the "full" color at 100 %
  _segments(value, geo, level = 0) {
    const colors = resolveColors(this._config.colors);
    const full = value !== undefined && Math.round(value) >= 100;
    const n = BAT.segments;
    const segW = (geo.w - geo.gap * (n - 1)) / n;
    const step = 100 / n;
    const current = value === undefined ? -1 : Math.min(n - 1, Math.floor(value / step));
    return colors.slice(0, n).map((segColor, i) => {
      const color = full ? colors[n] : segColor;
      const x = geo.x + i * (segW + geo.gap);
      const fill = value === undefined ? 0 : Math.min(1, Math.max(0, (value - i * step) / step));
      const active = level > 0 && i === current;
      return svg`
        <rect class="track" x=${x} y=${geo.y} width=${segW} height=${geo.h} rx="4"></rect>
        ${fill > 0
          ? svg`<rect class="seg ${active ? "active" : ""}" x=${x} y=${geo.y}
              width=${segW * fill} height=${geo.h} rx="4" fill=${color}></rect>`
          : nothing}
        ${active && fill < 1
          ? svg`<rect class="seg-next" x=${x + segW * fill} y=${geo.y}
              width=${segW * (1 - fill)} height=${geo.h} rx="4" fill=${color}></rect>`
          : nothing}
      `;
    });
  }

  // Combustion car: tank in the battery style, fuel pump instead of the bolt
  _renderTank(fuel) {
    return html`
      <svg
        viewBox="0 0 220 100"
        role="img"
        class="tank"
        aria-label=${fuel === undefined
          ? this._t("card.fuel_unknown")
          : this._t("card.fuel", { level: Math.round(fuel) })}
      >
        <rect class="shell-bg" x="4" y="4" width="212" height="92" rx="14"></rect>
        ${this._segments(fuel, { x: 14, y: 14, w: 192, h: 72, gap: 6 })}
        <rect class="shell" x="4" y="4" width="212" height="92" rx="14"></rect>
        <path class="pump" transform="translate(74 14) scale(3)" d=${PUMP}></path>
      </svg>
    `;
  }

  // Hybrid: slim fuel bar below the battery
  _fuelBar(fuel) {
    const colors = resolveColors(this._config.colors);
    const n = BAT.segments;
    const color =
      fuel === undefined ? "none" : Math.round(fuel) >= 100 ? colors[n] : colors[Math.min(n - 1, Math.floor(fuel / (100 / n)))];
    return svg`
      <rect class="shell-bg fuel-plate" x="0" y="102" width="206" height="36" rx="12"></rect>
      <path class="pump small" transform="translate(6 108) scale(1.2)" d=${PUMP}></path>
      <rect class="track" x="36" y="114" width="164" height="16" rx="8"></rect>
      ${fuel ? svg`<rect class="fuel-fill" x="36" y="114" width=${(164 * fuel) / 100} height="16" rx="8" fill=${color}></rect>` : nothing}
    `;
  }

  _renderBattery(soc, level, fuel = null) {
    const segments = this._segments(soc, BAT, level);

    return html`
      <svg
        viewBox=${fuel === null ? "0 0 220 100" : "0 0 220 140"}
        role="img"
        aria-label=${soc === undefined
          ? this._t("card.soc_unknown")
          : this._t("card.soc", { soc: Math.round(soc) }) +
            (level > 0 ? `, ${this._t("card.charging")}` : "")}
      >
        <rect class="shell-bg" x="4" y="4" width="196" height="92" rx="12"></rect>
        ${segments}
        <rect class="shell" x="4" y="4" width="196" height="92" rx="12"></rect>
        <rect class="cap" x="202" y="34" width="12" height="32" rx="4"></rect>
        <g class="bolt">
          <path
            d="M114 8 L78 56 H100 L90 92 L128 42 H106 Z"
            stroke-linejoin="round"
          ></path>
        </g>
        ${fuel === null ? nothing : this._fuelBar(fuel)}
      </svg>
    `;
  }

  _silhouette() {
    return SILHOUETTES[this._config.silhouette] || SILHOUETTES[DEFAULT_SILHOUETTE];
  }

  // Built-in vehicle drawing (see silhouettes.js)
  _renderCar() {
    const name = SILHOUETTES[this._config.silhouette] ? this._config.silhouette : DEFAULT_SILHOUETTE;
    return html`
      <svg class="car-svg" viewBox="0 0 400 150" aria-hidden="true" data-silhouette=${name}>
        ${SILHOUETTES[name].draw()}
      </svg>
    `;
  }

  static get styles() {
    return css`
      :host {
        --cic-text: var(--primary-text-color, #212121);
        --cic-secondary: var(--secondary-text-color, #727272);
        --cic-bg: var(--ha-card-background, var(--card-background-color, #fff));
        --cic-bolt-off: #9e9e9e;
        --cic-bolt-on: #43a047;
      }
      ha-card {
        display: block;
        container-type: inline-size;
        padding: 16px;
        color: var(--cic-text);
        box-sizing: border-box;
      }
      .hint {
        color: var(--cic-secondary);
        text-align: center;
        padding: 16px 0;
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
      }
      .name {
        font-size: 1.25rem;
        font-weight: 500;
      }
      .plate {
        font-family: var(--code-font-family, monospace);
        font-size: 0.85rem;
        letter-spacing: 0.08em;
        padding: 2px 8px;
        border: 2px solid var(--cic-text);
        border-radius: 4px;
        white-space: nowrap;
      }
      .layout {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1.7fr) minmax(0, 1fr);
        gap: 12px;
        align-items: center;
      }
      .layout.no-values {
        grid-template-columns: minmax(0, 1fr);
      }
      .layout.no-values .values {
        display: none;
      }
      .values {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .values.right {
        text-align: right;
      }
      .value {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        min-width: 0;
      }
      .values.right .value {
        flex-direction: row-reverse;
      }
      .icon {
        color: var(--state-icon-color, var(--cic-secondary));
        --mdc-icon-size: 22px;
        flex: none;
      }
      .text {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      /* Long labels and values wrap onto a second line, then get cut off */
      .label,
      .state {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        overflow: hidden;
        overflow-wrap: break-word;
      }
      .label {
        font-size: 0.75rem;
        line-height: 1.25;
        color: var(--cic-secondary);
      }
      .state {
        font-size: 1rem;
        line-height: 1.25;
        font-weight: 500;
      }
      .center {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 0;
      }
      .car {
        position: relative;
        width: 100%;
      }
      .car img,
      .car-svg {
        display: block;
        width: 100%;
        height: auto;
      }
      .car-svg .body {
        fill: var(--cic-secondary);
        fill-opacity: 0.18;
        stroke: var(--cic-secondary);
        stroke-width: 2;
        stroke-linejoin: round;
      }
      .car-svg .window {
        fill: var(--cic-secondary);
        fill-opacity: 0.35;
      }
      .car-svg .line {
        fill: none;
        stroke: var(--cic-secondary);
        stroke-opacity: 0.4;
        stroke-width: 1.5;
      }
      .car-svg .light.front {
        fill: #fdd835;
        fill-opacity: 0.8;
      }
      .car-svg .light.rear {
        fill: #e53935;
        fill-opacity: 0.8;
      }
      .car-svg .mirror {
        fill: var(--cic-secondary);
        fill-opacity: 0.5;
      }
      .car-svg .tyre {
        fill: var(--cic-secondary);
        fill-opacity: 0.85;
      }
      .car-svg .rim {
        fill: var(--cic-bg);
        stroke: var(--cic-secondary);
        stroke-width: 3;
      }
      .car-svg .spokes {
        fill: none;
        stroke: var(--cic-secondary);
        stroke-width: 2;
      }
      .car-svg .hub {
        fill: var(--cic-secondary);
      }
      .car-svg .strut {
        fill: none;
        stroke: var(--cic-secondary);
        stroke-width: 4;
        stroke-linecap: round;
      }
      .car-svg .helmet {
        fill: var(--cic-secondary);
        fill-opacity: 0.55;
        stroke: var(--cic-secondary);
        stroke-width: 2;
      }
      .car-svg .shadow {
        fill: var(--cic-secondary);
        fill-opacity: 0.15;
      }
      .battery {
        position: absolute;
        left: 50%;
        top: 58%;
        width: 42%;
        transform: translate(-50%, -50%);
        cursor: pointer;
      }
      .battery svg {
        display: block;
        width: 100%;
        height: auto;
        overflow: visible;
      }
      .shell-bg {
        fill: var(--cic-bg);
      }
      .shell,
      .cap {
        fill: none;
        stroke: var(--cic-text);
        stroke-width: 4;
      }
      .cap {
        fill: var(--cic-text);
      }
      /* Empty part of the battery: neutral, so no segment color shows through */
      .track {
        fill: var(--cic-track, #9e9e9e);
        fill-opacity: 0.18;
      }
      .bolt path {
        fill: var(--cic-bolt-off);
        stroke: var(--cic-bg);
        stroke-width: 5;
        paint-order: stroke;
        transform-box: fill-box;
        transform-origin: center;
      }
      .soc {
        font-size: 1.6rem;
        font-weight: 600;
        line-height: 1.2;
        margin-top: 4px;
      }
      .pump {
        fill: var(--cic-bolt-off);
        stroke: var(--cic-bg);
        stroke-width: 1.2;
        paint-order: stroke;
      }
      .fuel-plate {
        stroke: var(--cic-text);
        stroke-width: 2;
        stroke-opacity: 0.35;
      }
      .pump.small {
        fill: var(--cic-secondary);
        stroke: none;
      }
      .fuel-line {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 0.95rem;
        font-weight: 500;
        color: var(--cic-secondary);
        cursor: pointer;
      }
      .fuel-line svg {
        width: 18px;
        height: 18px;
        fill: currentColor;
      }
      .problem {
        font-size: 0.8rem;
        color: var(--error-color, #db4437);
        text-align: center;
        margin-bottom: 2px;
      }
      .status {
        font-size: 0.85rem;
        color: var(--cic-secondary);
        text-align: center;
        cursor: pointer;
      }
      .status.charging {
        color: var(--cic-bolt-on);
        font-weight: 500;
      }

      /* Charging: green bolt, pulse and size by charging power */
      .battery:not(.level-0) .bolt path {
        fill: var(--cic-bolt-on);
        animation: cic-pulse var(--cic-speed) ease-in-out infinite;
      }
      .battery:not(.level-0) .seg.active,
      .battery:not(.level-0) .seg-next {
        animation: cic-blink var(--cic-speed) ease-in-out infinite;
      }
      .seg-next {
        opacity: 0;
      }
      .level-1 {
        --cic-speed: 2.4s;
        --cic-glow: 3px;
        --cic-scale: 0.9;
      }
      .level-2 {
        --cic-speed: 1.6s;
        --cic-glow: 6px;
        --cic-scale: 1;
      }
      .level-3 {
        --cic-speed: 1s;
        --cic-glow: 9px;
        --cic-scale: 1.08;
      }
      .level-4 {
        --cic-speed: 0.6s;
        --cic-glow: 12px;
        --cic-scale: 1.15;
      }
      @keyframes cic-pulse {
        0%,
        100% {
          transform: scale(var(--cic-scale));
          filter: drop-shadow(0 0 1px var(--cic-bolt-on));
        }
        50% {
          transform: scale(calc(var(--cic-scale) * 1.06));
          filter: drop-shadow(0 0 var(--cic-glow) var(--cic-bolt-on));
        }
      }
      @keyframes cic-blink {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.35;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .battery .bolt path,
        .battery .seg.active,
        .battery .seg-next {
          animation: none !important;
          transform: scale(var(--cic-scale, 1));
        }
        .battery .seg-next {
          opacity: 0.5;
        }
      }

      /* Narrow card: car on top, values below in two columns */
      @container (max-width: 440px) {
        .layout {
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        }
        .center {
          grid-column: 1 / -1;
          grid-row: 1;
        }
        .values {
          align-self: start;
        }
        .values.right {
          text-align: left;
        }
        .values.right .value {
          flex-direction: row;
        }
      }
    `;
  }
}

if (!customElements.get("car-info-card")) {
  customElements.define("car-info-card", CarInfoCard);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: "car-info-card",
    name: "Car Info Card",
    description: browserLanguageString("card.description"),
    preview: true,
  });
  console.info(
    `%c CAR-INFO-CARD %c ${VERSION} `,
    "color:#fff;background:#2e7d32;font-weight:600",
    "color:#2e7d32;background:#fff"
  );
}
