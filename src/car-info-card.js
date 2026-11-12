import { LitElement, html, svg, css, nothing } from "lit";
import {
  VERSION,
  resolveColors,
  DEFAULT_CHARGING_STATES,
  DEFAULT_POWER_LEVELS,
  fireEvent,
} from "./const.js";
import { localize, browserLanguageString } from "./localize.js";
import "./car-info-card-editor.js";

const UNAVAILABLE = ["unknown", "unavailable", "none", ""];

// Battery geometry (viewBox 0 0 220 100)
const BAT = { x: 12, y: 12, w: 180, h: 76, gap: 6, segments: 5 };

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

  static getStubConfig(hass) {
    const states = hass ? Object.values(hass.states) : [];
    const battery = states.find(
      (s) =>
        s.entity_id.startsWith("sensor.") &&
        s.attributes.device_class === "battery"
    );
    return {
      name: "Auto",
      entities: { battery: battery ? battery.entity_id : "" },
      values: [],
    };
  }

  setConfig(config) {
    if (!config) {
      throw new Error("Invalid configuration.");
    }
    if (config.entities !== undefined && typeof config.entities !== "object") {
      throw new Error("entities must be an object.");
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
      values: [],
      ...config,
      entities: { ...(config.entities || {}) },
      values: (config.values || []).map((v) =>
        typeof v === "string" ? { entity: v } : v
      ),
    };
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
    const s = this._stateObj(this._config.entities.battery);
    if (!this._isAvailable(s)) return undefined;
    const v = parseFloat(s.state);
    return Number.isFinite(v) ? Math.min(100, Math.max(0, v)) : undefined;
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
    const stateEntity = this._config.entities.charging_state;
    if (stateEntity) {
      const s = this._stateObj(stateEntity);
      const states = this._config.charging_states || DEFAULT_CHARGING_STATES;
      return !!s && states.includes(s.state);
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
    if (!cfg.entities.battery) {
      return html`<ha-card>
        <div class="hint">
          ${localize(this.hass, "card.hint")}
        </div>
      </ha-card>`;
    }
    const soc = this._soc();
    const level = this._chargeLevel();
    const values = cfg.values;
    const half = Math.ceil(values.length / 2);
    const left = values.slice(0, half);
    const right = values.slice(half);
    const plate = this._stateObj(cfg.entities.plate);

    return html`
      <ha-card>
        ${cfg.show_name !== false && (cfg.name || plate)
          ? html`<div class="header">
              <span class="name">${cfg.name || ""}</span>
              ${this._isAvailable(plate)
                ? html`<span class="plate">${plate.state}</span>`
                : nothing}
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
                @click=${() => this._moreInfo(cfg.entities.battery)}
              >
                ${this._renderBattery(soc, level)}
              </div>
            </div>
            <div class="soc">${soc === undefined ? "–" : `${Math.round(soc)} %`}</div>
            ${this._renderStatus(level)}
          </div>
          <div class="values right">${right.map((v) => this._renderValue(v))}</div>
        </div>
      </ha-card>
    `;
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

  _renderValue(item) {
    const stateObj = this._stateObj(item.entity);
    const name =
      item.name ||
      (stateObj && stateObj.attributes.friendly_name) ||
      item.entity;
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
          <span class="state">${stateObj ? this._formatState(stateObj) : localize(this.hass, "card.not_found")}</span>
        </div>
      </div>
    `;
  }

  _renderBattery(soc, level) {
    const colors = resolveColors(this._config.colors);
    const full = soc !== undefined && Math.round(soc) >= 100;
    const segW = (BAT.w - BAT.gap * (BAT.segments - 1)) / BAT.segments;
    const step = 100 / BAT.segments;
    const current =
      soc === undefined ? -1 : Math.min(BAT.segments - 1, Math.floor(soc / step));

    const segments = colors.slice(0, BAT.segments).map((segColor, i) => {
      // When fully charged, all segments take the "full" color
      const color = full ? colors[BAT.segments] : segColor;
      const x = BAT.x + i * (segW + BAT.gap);
      const fill = soc === undefined ? 0 : Math.min(1, Math.max(0, (soc - i * step) / step));
      const active = level > 0 && i === current;
      return svg`
        <rect class="track" x=${x} y=${BAT.y} width=${segW} height=${BAT.h} rx="4"></rect>
        ${fill > 0
          ? svg`<rect class="seg ${active ? "active" : ""}" x=${x} y=${BAT.y}
              width=${segW * fill} height=${BAT.h} rx="4" fill=${color}></rect>`
          : nothing}
        ${active && fill < 1
          ? svg`<rect class="seg-next" x=${x + segW * fill} y=${BAT.y}
              width=${segW * (1 - fill)} height=${BAT.h} rx="4" fill=${color}></rect>`
          : nothing}
      `;
    });

    return html`
      <svg
        viewBox="0 0 220 100"
        role="img"
        aria-label=${soc === undefined
          ? localize(this.hass, "card.soc_unknown")
          : localize(this.hass, "card.soc", { soc: Math.round(soc) }) +
            (level > 0 ? `, ${localize(this.hass, "card.charging")}` : "")}
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
      </svg>
    `;
  }

  // Own generic SUV silhouette (side view, front on the right)
  _renderCar() {
    return html`
      <svg class="car-svg" viewBox="0 0 400 150" aria-hidden="true">
        <ellipse class="shadow" cx="200" cy="142" rx="180" ry="5"></ellipse>
        <path
          class="body"
          d="M28 112 V88 Q28 72 44 68 L60 64 L70 36 Q74 26 86 26 H238 Q252 26 262 34
             L300 62 L352 70 Q372 74 374 92 V112 Q374 120 366 120 H338
             A33 33 0 0 0 272 120 H128 A33 33 0 0 0 62 120 H36 Q28 120 28 112 Z"
        ></path>
        <path
          class="window"
          d="M80 34 H164 V62 H70 Z M172 34 H236 Q246 34 254 40 L284 62 H172 Z"
        ></path>
        <path class="line" d="M168 64 V112 M262 66 Q266 90 262 112"></path>
        <path class="line" d="M64 84 H370"></path>
        <rect class="light front" x="356" y="78" width="16" height="7" rx="3"></rect>
        <rect class="light rear" x="29" y="76" width="9" height="10" rx="3"></rect>
        <path class="mirror" d="M286 56 l10 -2 l2 8 l-9 1 Z"></path>
        <circle class="tyre" cx="305" cy="120" r="26"></circle>
        <circle class="rim" cx="305" cy="120" r="14"></circle>
        <circle class="tyre" cx="95" cy="120" r="26"></circle>
        <circle class="rim" cx="95" cy="120" r="14"></circle>
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
        grid-template-columns: minmax(0, 1fr) minmax(0, 2.2fr) minmax(0, 1fr);
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
      .label {
        font-size: 0.75rem;
        color: var(--cic-secondary);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .state {
        font-size: 1rem;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
