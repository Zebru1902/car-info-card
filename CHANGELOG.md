# Changelog

## 0.3.0 – 2026-11-13

- Editor scans the selected device and activates every standard value it offers (odometer, range, charging power, time to full, charging state, charging type, target temperature); new cards start the same way
- Editor: list "More sensors of this device" to add any other sensor with one tick
- Detection knows more terms used by other vehicle integrations (⚠️ only tested with example data and one real integration)
- Charging state can also be an on/off sensor (`binary_sensor`, "on" = charging)

## 0.2.2 – 2026-11-13

- New cards start with the device that looks like a car (battery level plus odometer or range) and its main entities, instead of the first battery sensor in the system (e.g. of a robot vacuum)
- Selecting a device in the editor also replaces entities of other devices in the main fields and standard values; empty fields are filled as before
- Values are arranged by meaning: general values (odometer, range, target temperature) on the left, charging values on the right; other values fill up the shorter side
- Editor: ⇄ moves a value to the other side (option `position: left | right`)
- Narrow cards: both value columns start at the top

## 0.2.1 – 2026-11-12

- The card explains when the battery level entity is missing or does not report a number (e.g. when the charging state was selected by mistake)
- Value labels without an own name leave out the device name ("Odometer" instead of "My car Odometer")
- Editor: selecting a device fills empty entity fields (battery level, charging power, charging state) automatically
- Editor: standard values (odometer, range, charging power, time to full, charging state, charging type, target temperature) can be added by ticking a box; the matching entity of the device is filled in
- Formula race car: battery centred

## 0.2.0 – 2026-11-11

- First published version
- Battery with 5 segments (red, orange, yellow, yellow-green, light green), all dark green when fully charged; empty part neutral grey
- Charging bolt in 4 levels by charging power
- 7 built-in vehicle drawings (SUV, sedan, hatchback, van, formula race car, tractor, vintage car), optional custom image
- Configurable values left and right of the car
- Card editor (entities, values, charging levels, colors); optional device selection filters the entity pickers
- Name and licence plate can be shown or hidden separately
- User interface in English and German, optional fixed `language`; translation files in `src/translations/` for contributions
