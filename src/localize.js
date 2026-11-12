// UI strings. English is the default; other languages follow the
// language set in Home Assistant and fall back to English.
const STRINGS = {
  en: {
    "card.description":
      "Electric car card with a 5-segment battery, charging bolt and configurable values.",
    "card.hint": "Please select the battery level entity (entities.battery) in the editor.",
    "card.not_found": "not found",
    "card.soc_unknown": "Battery level unknown",
    "card.soc": "Battery level {soc} %",
    "card.charging": "charging",
    "editor.general": "General",
    "editor.entities": "Entities",
    "editor.charging": "Charging",
    "editor.charging_note":
      "The bolt is green while the car is charging. Its pulse and glow get stronger with higher charging power (4 levels).",
    "editor.values": "Values around the car",
    "editor.values_note": "The first half is shown on the left, the second half on the right.",
    "editor.left": "left",
    "editor.right": "right",
    "editor.move_up": "Move up",
    "editor.move_down": "Move down",
    "editor.remove": "Remove",
    "editor.add_note": "Select an entity to add a value.",
    "editor.colors": "Battery segment colors",
    "editor.reset_colors": "Default colors",
    "editor.full_color": "Full (100 %)",
    "label.name": "Name",
    "label.show_name": "Show name",
    "label.show_plate": "Show licence plate",
    "label.silhouette": "Vehicle",
    "helper.silhouette": "Built-in drawing. A custom image below replaces it.",
    "silhouette.suv": "SUV",
    "silhouette.sedan": "Sedan",
    "silhouette.hatchback": "Hatchback",
    "silhouette.van": "Van",
    "silhouette.race": "Formula race car",
    "silhouette.tractor": "Tractor",
    "silhouette.vintage": "Vintage car",
    "label.image": "Custom image (URL, e.g. /local/car.png)",
    "label.device": "Device (optional)",
    "helper.device": "Only shows the entities of this device in the pickers below.",
    "label.battery": "Battery level (required)",
    "label.charging_power": "Charging power",
    "label.charging_state": "Charging state",
    "label.plate": "Licence plate",
    "label.charging_states": "States that count as charging",
    "label.power_1": "Level 1 up to",
    "label.power_2": "Level 2 up to",
    "label.power_3": "Level 3 up to (level 4 above)",
    "label.entity": "Entity",
    "label.value_name": "Label (empty = entity name)",
    "label.icon": "Icon (empty = entity icon)",
    "helper.image": "Leave empty to use the vehicle selected above.",
    "helper.charging_state":
      "Without a charging state, the car counts as charging while the charging power is above 0.",
    "helper.charging_states": "Default: charging",
  },
  de: {
    "card.description":
      "Auto-Karte mit Batterie in 5 Segmenten, Lade-Blitz und frei wählbaren Werten.",
    "card.hint": "Bitte im Editor die Entität für den Ladestand (entities.battery) wählen.",
    "card.not_found": "nicht gefunden",
    "card.soc_unknown": "Ladestand unbekannt",
    "card.soc": "Ladestand {soc} %",
    "card.charging": "lädt",
    "editor.general": "Allgemein",
    "editor.entities": "Entitäten",
    "editor.charging": "Laden",
    "editor.charging_note":
      "Der Blitz ist grün, solange das Auto lädt. Puls und Leuchten werden mit steigender Ladeleistung stärker (4 Stufen).",
    "editor.values": "Werte rund um das Auto",
    "editor.values_note": "Die erste Hälfte steht links, die zweite rechts.",
    "editor.left": "links",
    "editor.right": "rechts",
    "editor.move_up": "Nach oben",
    "editor.move_down": "Nach unten",
    "editor.remove": "Entfernen",
    "editor.add_note": "Entität wählen, um einen Wert hinzuzufügen.",
    "editor.colors": "Farben der Batteriesegmente",
    "editor.reset_colors": "Standardfarben",
    "editor.full_color": "Voll (100 %)",
    "label.name": "Name",
    "label.show_name": "Name anzeigen",
    "label.show_plate": "Kennzeichen anzeigen",
    "label.silhouette": "Fahrzeug",
    "helper.silhouette": "Eingebaute Zeichnung. Ein eigenes Bild darunter ersetzt sie.",
    "silhouette.suv": "SUV",
    "silhouette.sedan": "Limousine",
    "silhouette.hatchback": "Kompaktwagen",
    "silhouette.van": "Transporter",
    "silhouette.race": "Formel-Rennwagen",
    "silhouette.tractor": "Traktor",
    "silhouette.vintage": "Oldtimer",
    "label.image": "Eigenes Bild (URL, z. B. /local/auto.png)",
    "label.device": "Gerät (optional)",
    "helper.device": "Zeigt in den Auswahlfeldern unten nur die Entitäten dieses Geräts.",
    "label.battery": "Ladestand (Pflicht)",
    "label.charging_power": "Ladeleistung",
    "label.charging_state": "Ladezustand",
    "label.plate": "Kennzeichen",
    "label.charging_states": "Zustände, die als Laden gelten",
    "label.power_1": "Stufe 1 bis",
    "label.power_2": "Stufe 2 bis",
    "label.power_3": "Stufe 3 bis (darüber Stufe 4)",
    "label.entity": "Entität",
    "label.value_name": "Bezeichnung (leer = Name der Entität)",
    "label.icon": "Symbol (leer = Symbol der Entität)",
    "helper.image": "Leer lassen, um das oben gewählte Fahrzeug zu zeigen.",
    "helper.charging_state":
      "Ohne Ladezustand gilt das Auto als ladend, sobald die Ladeleistung über 0 liegt.",
    "helper.charging_states": "Standard: charging",
  },
};

export const language = (hass) => {
  const lang = (hass && ((hass.locale && hass.locale.language) || hass.language)) || "en";
  return String(lang).split("-")[0].toLowerCase();
};

export function localize(hass, key, vars = {}) {
  const table = STRINGS[language(hass)] || STRINGS.en;
  let text = table[key] ?? STRINGS.en[key];
  if (text === undefined) return undefined;
  for (const [k, v] of Object.entries(vars)) text = text.replace(`{${k}}`, v);
  return text;
}

// Used where no hass object exists yet (card picker description)
export const browserLanguageString = (key) =>
  localize({ language: (navigator.language || "en") }, key);
