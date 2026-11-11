export const VERSION = "0.2.0";

// Segmentfarben von 0–20 % bis 80–100 %: rot, orange, gelb, hellgrün, dunkelgrün
export const DEFAULT_COLORS = ["#d32f2f", "#f57c00", "#fbc02d", "#8bc34a", "#2e7d32"];

// Zustände der Ladezustand-Entität, die als "lädt" gelten
export const DEFAULT_CHARGING_STATES = ["charging"];

// Obergrenzen in kW für die Ladestufen 1–3; darüber Stufe 4
export const DEFAULT_POWER_LEVELS = [3.7, 11, 50];

export const fireEvent = (node, type, detail) => {
  node.dispatchEvent(
    new CustomEvent(type, { detail, bubbles: true, composed: true })
  );
};
