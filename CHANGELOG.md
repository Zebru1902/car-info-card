# Changelog

## 0.2.1 – 2026-11-12

- The card explains when the battery level entity is missing or does not report a number (e.g. when the charging state was selected by mistake)
- Value labels without an own name leave out the device name ("Odometer" instead of "My car Odometer")

## 0.2.0 – 2026-11-11

- First published version
- Battery with 5 segments (red, orange, yellow, yellow-green, light green), all dark green when fully charged; empty part neutral grey
- Charging bolt in 4 levels by charging power
- 7 built-in vehicle drawings (SUV, sedan, hatchback, van, formula race car, tractor, vintage car), optional custom image
- Configurable values left and right of the car
- Card editor (entities, values, charging levels, colors); optional device selection filters the entity pickers
- Name and licence plate can be shown or hidden separately
- User interface in English and German, optional fixed `language`; translation files in `src/translations/` for contributions
