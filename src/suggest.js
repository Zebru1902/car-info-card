// Finds the entity that most likely fits a purpose (battery level, odometer, …),
// using device class, unit, enum options and words in the entity ID and name.
// Only a suggestion for the editor; users can always pick another entity.

const words = (s) => `${s.entity_id} ${s.attributes.friendly_name || ""}`.toLowerCase();
const dc = (s) => s.attributes.device_class;
const unit = (s) => s.attributes.unit_of_measurement;
const has = (s, re) => re.test(words(s));

// Rules per purpose: `match` must be true; candidates with `prefer` true come first.
export const PURPOSES = {
  battery: {
    match: (s) =>
      (dc(s) === "battery" || (unit(s) === "%" && has(s, /batter|soc|state_of_charge|ladestand/))) &&
      !has(s, /limit|target|ziel|min|max/),
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
        : has(s, /charging_state|charging_status|ladezustand|ladestatus/) && dc(s) !== "battery" && !has(s, /batter/),
    prefer: (s) => Array.isArray(s.attributes.options),
  },
  odometer: {
    match: (s) => has(s, /odometer|mileage|kilometerstand|kilometer_stand|km_stand|tachostand/),
  },
  range: {
    match: (s) => has(s, /range|reichweite/) && (dc(s) === "distance" || ["km", "mi"].includes(unit(s))),
    prefer: (s) => has(s, /electric|elektr|ev_/),
  },
  charging_power_value: {
    match: (s) => (dc(s) === "power" || ["W", "kW"].includes(unit(s))) && has(s, /charg|lade/),
  },
  time_to_full: {
    match: (s) => has(s, /time.?to.?full|remaining.?charg|charging.?time|vollladung|ladedauer|restladezeit/),
  },
  charging_type: {
    match: (s) => has(s, /charging.?type|ladetyp|ladeart/),
  },
  target_temperature: {
    match: (s) =>
      (dc(s) === "temperature" || ["°C", "°F"].includes(unit(s))) && has(s, /target|soll|setpoint/),
  },
};

// Standard values the editor offers as checkboxes, in display order
export const STANDARD_VALUES = [
  "odometer",
  "range",
  "charging_power_value",
  "time_to_full",
  "charging_state_value",
  "charging_type",
  "target_temperature",
];

const purposeOf = (type) => (type === "charging_state_value" ? "charging_state" : type);

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
    if (!ids || !suggestEntity(hass, "battery", ids)) continue;
    const has = (type) => (suggestEntity(hass, type, ids) ? 1 : 0);
    if (!has("odometer") && !has("range")) continue;
    const score =
      2 * has("odometer") + 2 * has("range") + has("charging_power_value") + has("charging_state");
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
  const entities = {};
  for (const key of ["battery", "charging_power", "charging_state"]) {
    const found = suggestEntity(hass, key, ids);
    if (found) entities[key] = found;
  }
  const values = [];
  for (const type of ["odometer", "range"]) {
    const entity = suggestEntity(hass, type, ids);
    if (entity) values.push({ type, entity });
  }
  const d = hass.devices[device];
  return { name: d.name_by_user || d.name, device, entities, values };
}
