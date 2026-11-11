export const VERSION = "0.2.0";

// Segment colors from 0–20 % to 80–100 %: red, orange, yellow, light green, dark green
export const DEFAULT_COLORS = ["#d32f2f", "#f57c00", "#fbc02d", "#8bc34a", "#2e7d32"];

// States of the charging state entity that count as "charging"
export const DEFAULT_CHARGING_STATES = ["charging"];

// Upper limits in kW for charging levels 1–3; level 4 above
export const DEFAULT_POWER_LEVELS = [3.7, 11, 50];

export const fireEvent = (node, type, detail) => {
  node.dispatchEvent(
    new CustomEvent(type, { detail, bubbles: true, composed: true })
  );
};
