// Finds the entity that most likely fits a purpose (battery level, odometer, …),
// using device class, unit, enum options and words in the entity ID and name.
// Only a suggestion for the editor; users can always pick another entity.

const FUEL_WORDS = /fuel|tank|kraftstoff|benzin|diesel|petrol|gasoline/;
const isRange = (s) =>
  has(s, /range|reichweite|autonomy|distance.?to.?empty|\bdte\b/) &&
  (dc(s) === "distance" || ["km", "mi"].includes(unit(s)));

const words = (s) => `${s.entity_id} ${s.attributes.friendly_name || ""}`.toLowerCase();
const dc = (s) => s.attributes.device_class;
const unit = (s) => s.attributes.unit_of_measurement;
const has = (s, re) => re.test(words(s));

// Rules per purpose: `match` must be true; candidates with `prefer` true come first.
export const PURPOSES = {
  battery: {
    match: (s) =>
      (dc(s) === "battery" ||
        (unit(s) === "%" && has(s, /batter|akku|soc\b|state_of_charge|charge_level|ladestand/))) &&
      !has(s, /limit|target|ziel|min|max|12.?v|aux|starter/),
    prefer: (s) => dc(s) === "battery",
  },
  charging_power: {
    match: (s) => dc(s) === "power" || ["W", "kW"].includes(unit(s)),
    prefer: (s) => has(s, /charg|lade/),
  },
  charging_state: {
    match: (s) =>
      Array.isArray(s.attributes.options)
        ? s.attributes.options.includes("charging")
        : dc(s) === "battery_charging" ||
          (has(s, /charging_state|charging_status|charge_state|ladezustand|ladestatus/) &&
            dc(s) !== "battery" &&
            !has(s, /batter/)),
    prefer: (s) => Array.isArray(s.attributes.options),
  },
  odometer: {
    match: (s) =>
      has(s, /odometer|mileage|total.?distance|distance.?total|kilometerstand|kilometer_stand|km_stand|gesamtkilometer|tachostand/),
  },
  range: {
    match: (s) =>
      isRange(s) && !has(s, FUEL_WORDS) && !has(s, /total|gesamt|combined|kombiniert/),
    prefer: (s) => has(s, /electric|elektr|\bev\b|ev_|battery|batterie/),
  },
  fuel: {
    match: (s) =>
      (["%", "L", "l", "gal"].includes(unit(s)) || ["volume", "volume_storage"].includes(dc(s))) &&
      has(s, FUEL_WORDS) &&
      !has(s, /range|reichweite|consumption|verbrauch|price|preis|cost|kosten|capacity|kapazit|distance|economy/),
    prefer: (s) => unit(s) === "%",
  },
  fuel_range: {
    match: (s) => isRange(s) && has(s, FUEL_WORDS),
  },
  total_range: {
    match: (s) => isRange(s) && has(s, /total|gesamt|combined|kombiniert/),
  },
  service: {
    match: (s) =>
      has(s, /service|inspection|inspektion|wartung|maintenance|oil.?change|ölwechsel|oelwechsel/) &&
      !has(s, /oil.?level|ölstand|oelstand/),
  },
  oil_level: {
    match: (s) => has(s, /oil.?level|ölstand|oelstand|motoröl|motoroel|engine.?oil/) && !has(s, /change|wechsel|service/),
  },
  outside_temperature: {
    match: (s) =>
      (dc(s) === "temperature" || ["°C", "°F"].includes(unit(s))) &&
      has(s, /outside|outdoor|ambient|exterior|außen|aussen/),
  },
  charging_power_value: {
    match: (s) => (dc(s) === "power" || ["W", "kW"].includes(unit(s))) && has(s, /charg|lade/),
  },
  time_to_full: {
    match: (s) =>
      has(s, /time.?to.?full|time.?until.?full|minutes.?to.?full|remaining.?charg|charg\w*.?time.?remaining|charging.?time|charge.?complete|charging.?end|vollladung|ladedauer|restladezeit|ladeende/),
  },
  charging_type: {
    match: (s) => has(s, /charging.?type|charge.?type|charger.?type|plug.?type|ladetyp|ladeart/),
  },
  target_temperature: {
    match: (s) =>
      (dc(s) === "temperature" || ["°C", "°F"].includes(unit(s))) &&
      has(s, /target|soll|setpoint|set.?temp|desired/),
  },
};

// Standard values the editor offers as checkboxes, per drive, in display order
export const STANDARD_VALUES_BY_DRIVE = {
  electric: [
    "odometer",
    "range",
    "charging_power_value",
    "time_to_full",
    "charging_state_value",
    "charging_type",
    "target_temperature",
  ],
  combustion: [
    "odometer",
    "range",
    "fuel_range",
    "fuel_level_value",
    "service",
    "oil_level",
    "outside_temperature",
    "target_temperature",
  ],
  hybrid: [
    "odometer",
    "range",
    "fuel_range",
    "total_range",
    "charging_power_value",
    "time_to_full",
    "charging_state_value",
    "charging_type",
    "service",
    "target_temperature",
  ],
};

// All standard value types (for older configs and the layout)
export const STANDARD_VALUES = [...new Set(Object.values(STANDARD_VALUES_BY_DRIVE).flat())];

export const standardValues = (drive) =>
  STANDARD_VALUES_BY_DRIVE[drive] || STANDARD_VALUES_BY_DRIVE.electric;

const purposeOf = (type) =>
  ({ charging_state_value: "charging_state", fuel_level_value: "fuel" })[type] || type;

// Drive of a device from its sensors: battery and fuel = hybrid
export function detectDrive(hass, ids) {
  const battery = !!suggestEntity(hass, "battery", ids);
  const fuel = !!suggestEntity(hass, "fuel", ids);
  if (battery && fuel) return "hybrid";
  return fuel ? "combustion" : "electric";
}

// entityIds: entities to search (e.g. of the selected device); undefined = all sensors
export function suggestEntity(hass, type, entityIds, exclude = []) {
  const rule = PURPOSES[purposeOf(type)];
  if (!rule || !hass) return undefined;
  const ids = entityIds || Object.keys(hass.states).filter((id) => id.startsWith("sensor."));
  const candidates = ids
    .map((id) => hass.states[id])
    .filter((s) => s && !exclude.includes(s.entity_id) && rule.match(s));
  if (!candidates.length) return undefined;
  const preferred = rule.prefer ? candidates.filter(rule.prefer) : [];
  return (preferred[0] || candidates[0]).entity_id;
}

// Entity IDs that belong to a device (entity registry), undefined if unknown
export function entitiesOfDevice(hass, device) {
  if (!device || !hass || !hass.entities) return undefined;
  const ids = Object.values(hass.entities)
    .filter((e) => e.device_id === device)
    .map((e) => e.entity_id);
  return ids.length ? ids : undefined;
}

// The device that most likely is the car: it needs a battery level and an
// odometer or a range. A robot vacuum or a phone has a battery and may even
// report "charging", but has neither of the two.
export function findCarDevice(hass) {
  if (!hass || !hass.devices || !hass.entities) return undefined;
  let best;
  let bestScore = 0;
  for (const device of Object.keys(hass.devices)) {
    const ids = entitiesOfDevice(hass, device);
    if (!ids) continue;
    const has = (type) => (suggestEntity(hass, type, ids) ? 1 : 0);
    if (!has("battery") && !has("fuel")) continue;
    if (!has("odometer") && !has("range") && !has("fuel_range")) continue;
    const score =
      2 * has("odometer") + 2 * Math.max(has("range"), has("fuel_range")) +
      has("charging_power_value") + has("charging_state");
    if (score > bestScore) {
      best = device;
      bestScore = score;
    }
  }
  return best;
}

// Starting configuration for a new card: the car device with its main entities
export function suggestSetup(hass) {
  const device = findCarDevice(hass);
  if (!device) return { entities: {}, values: [] };
  const ids = entitiesOfDevice(hass, device);
  const entities = mainEntities(hass, ids);
  const values = scanStandardValues(hass, ids, [], detectDrive(hass, ids));
  const d = hass.devices[device];
  return { name: d.name_by_user || d.name, device, entities, values };
}

// All standard values the device offers, each with its entity
export function scanStandardValues(hass, ids, present = [], drive = "electric") {
  const values = [];
  const used = [];
  for (const type of standardValues(drive)) {
    if (present.includes(type)) continue;
    const entity = suggestEntity(hass, type, ids, used);
    if (entity) {
      values.push({ type, entity });
      used.push(entity);
    }
  }
  return values;
}

// Main entities of a device by its drive: battery and charging for electric
// cars, fuel for combustion cars, both for hybrids
export const MAIN_KEYS = ["battery", "fuel", "charging_power", "charging_state"];

export function mainEntities(hass, ids) {
  const drive = detectDrive(hass, ids);
  const keys =
    drive === "combustion" ? ["fuel"] : drive === "hybrid" ? MAIN_KEYS : ["battery", "charging_power", "charging_state"];
  const entities = {};
  for (const key of keys) {
    const found = suggestEntity(hass, key, ids);
    if (found) entities[key] = found;
  }
  return entities;
}
