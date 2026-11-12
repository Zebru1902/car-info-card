// UI strings live in src/translations/<language>.json (see CONTRIBUTING.md).
// English is the reference and the fallback for missing keys.
import en from "./translations/en.json";
import de from "./translations/de.json";

export const TRANSLATIONS = { en, de };
export const LANGUAGES = Object.keys(TRANSLATIONS);

// Language to use: the card option `language` if set, otherwise the
// language of the Home Assistant user, otherwise English.
export function language(hass, override) {
  if (override && override !== "auto" && TRANSLATIONS[override]) return override;
  const lang = String(
    (hass && ((hass.locale && hass.locale.language) || hass.language)) || "en"
  ).toLowerCase();
  if (TRANSLATIONS[lang]) return lang;
  const base = lang.split("-")[0];
  return TRANSLATIONS[base] ? base : "en";
}

export function localize(hass, key, vars = {}, override) {
  let text = TRANSLATIONS[language(hass, override)][key] ?? en[key];
  if (text === undefined) return undefined;
  for (const [k, v] of Object.entries(vars)) text = text.replace(`{${k}}`, v);
  return text;
}

// Used where no hass object exists yet (card picker description)
export const browserLanguageString = (key) =>
  localize({ language: navigator.language || "en" }, key);
