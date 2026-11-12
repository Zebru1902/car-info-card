# Concept: Car Info Card

## Goal
A Home Assistant dashboard card for electric cars: a generic SUV silhouette with a battery in the middle, split into 5 segments of 20 % each (red, orange, yellow, yellow-green, light green; all segments dark green when fully charged), with a lightning bolt inside. The bolt is grey while the car is not charging and green while it charges; its strength and animation follow the charging power. Important values (odometer, range, charging power, time to full, charging state, target temperature, …) are shown around the car and can be chosen in the card editor. Distribution through the Marketplace (built into Home Assistant since 2026.11, reads the HACS catalog).

## Guidelines
- Code, comments and documentation in English. The card UI is English by default and translated via `src/localize.js` (currently German).
- Only verified facts in the documentation; mark anything uncertain as "⚠️ NOT VERIFIED".
- No brand names in the repository or card name; no copy of a recognisable car model. Own generic vehicle drawings as SVG (`silhouette`: suv, sedan, hatchback, van, race, tractor, vintage; in `src/silhouettes.js`); option `image` for a custom picture.
- Generic card: entities are assigned in the configuration, no fixed entity IDs in the code. Examples and test data use neutral names (`sensor.my_car_*`).
- No tokens, passwords, keys or personal data in the repository.

## Typical entities of a vehicle integration
The card only needs numeric and state sensors as vehicle integrations usually provide them:

| Purpose | Example entity | Example value |
|---|---|---|
| Battery level | `sensor.my_car_battery_level` | 35 % |
| Charging power | `sensor.my_car_charging_power` | 0.0 kW |
| Charging state | `sensor.my_car_charging_state` | `connect_cable` |
| Odometer | `sensor.my_car_odometer` | km |
| Range | `sensor.my_car_range` | km |
| Time to full | `sensor.my_car_time_to_full` | ⚠️ unit differs between integrations |
| Charging type | `sensor.my_car_charging_type` | `ac`, `dc`, `not_charging` |
| Target temperature | `sensor.my_car_target_temperature` | °C |
| Licence plate | `sensor.my_car_licence_plate` | text |

Charging states used by at least one common integration: `charging`, `connect_cable`, `ready_for_charging`, `conserving`, `discharging`, `charging_interrupted`. By default only `charging` counts as charging (option `charging_states`). Enum sensors list their possible values in the `options` attribute; the editor offers them for selection.

## Marketplace requirements
Checked on 2026-11-11 at https://contributors.home-assistant.io/marketplace/ (repository-structure, hacs-json, validation, guides/dashboard, guides/releases, guides/catalog):
- Public GitHub repository with `hacs.json` and `README.md` in the root; description, topics and issues are required for the catalog. One repository holds exactly one card.
- `hacs.json`: `name` is required; `filename` is optional when the file is named after the repository. Unknown keys are ignored. Optional `homeassistant` sets the minimum version.
- The JavaScript file is looked up on the latest release first, then in the root, then in `dist`. It is installed to `www/community/<repository>/` and added as a resource with the version in the URL.
- Version = tag of the latest published GitHub release (a tag alone is not enough). The release notes are shown as the update notes.
- Validation action `hacs/action@main` with `category: plugin`; the catalog needs a run without `ignore`. The README of a dashboard repository must contain images.
- README parts meant only for GitHub go between `<!-- ha-marketplace:exclude-start -->` and `<!-- ha-marketplace:exclude-end -->`.
- Catalog: pull request to `hacs/default` (file `plugin`, alphabetical order), from a personal account, with the template filled in completely, including links to the release and a passing HACS action run. Reviews take months according to the docs; until then users install via the `marketplace_repository` My link.

## Roadmap
1. Prototype (Lit, single JS file), preview via Playwright screenshots. ✅
2. Card editor (values, entities, charging levels, colors). ✅
3. Test in a real Home Assistant during a charging session.
4. README, `hacs.json`, release, catalog entry. (README, `hacs.json`, workflows ✅; release and catalog open)

## Status (version 0.2.0)
- Open: test in a real Home Assistant while charging (value and unit of the time to full, editor behaviour), first release, catalog entry.
