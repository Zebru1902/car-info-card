export const VERSION = "0.4.3";

// Five segment colors (0–20 % … 80–100 %: red, orange, yellow, yellow-green,
// light green) plus the color of all segments when fully charged (dark green)
export const DEFAULT_COLORS = ["#d32f2f", "#f57c00", "#fbc02d", "#c0ca33", "#7cb342", "#2e7d32"];

// Accepts 5 colors (older configs, default full color) or 6 colors
export const resolveColors = (colors) =>
  !Array.isArray(colors)
    ? DEFAULT_COLORS
    : colors.length === 5
    ? [...colors, DEFAULT_COLORS[5]]
    : colors;

// States of the charging state entity that count as "charging"
export const DEFAULT_CHARGING_STATES = ["charging"];

// Upper limits in kW for charging levels 1–3; level 4 above
export const DEFAULT_POWER_LEVELS = [3.7, 11, 50];

export const fireEvent = (node, type, detail) => {
  node.dispatchEvent(
    new CustomEvent(type, { detail, bubbles: true, composed: true })
  );
};
