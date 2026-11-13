// Which side of the car a value is shown on.
// An explicit `position` wins. Otherwise standard values go to their usual
// side: general information left, charging, fuel and service right. Other
// values fill up the shorter side, in their order.

export const LEFT_TYPES = ["odometer", "range", "total_range", "target_temperature", "outside_temperature"];
export const RIGHT_TYPES = [
  "charging_power_value",
  "time_to_full",
  "charging_state_value",
  "charging_type",
  "fuel_level_value",
  "fuel_range",
  "service",
  "oil_level",
];

export function defaultSide(value) {
  if (RIGHT_TYPES.includes(value.type)) return "right";
  if (LEFT_TYPES.includes(value.type)) return "left";
  return undefined;
}

// Returns "left" or "right" for every value, in the same order
export function assignSides(values) {
  const sides = values.map((v) =>
    v.position === "left" || v.position === "right" ? v.position : defaultSide(v)
  );
  let left = sides.filter((s) => s === "left").length;
  let right = sides.filter((s) => s === "right").length;
  return sides.map((s) => {
    if (s) return s;
    if (left <= right) {
      left += 1;
      return "left";
    }
    right += 1;
    return "right";
  });
}

export function splitValues(values) {
  const sides = assignSides(values);
  return {
    left: values.filter((_, i) => sides[i] === "left"),
    right: values.filter((_, i) => sides[i] === "right"),
  };
}
