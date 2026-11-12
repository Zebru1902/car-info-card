# Contributing

## Add or improve a translation

The card's own texts (editor labels, hints, status) live in one JSON file per language in [`src/translations/`](src/translations/). Entity values and units are formatted by Home Assistant itself and need no translation here.

1. Copy `src/translations/en.json` to `src/translations/<code>.json`, using the two-letter language code Home Assistant uses (e.g. `fr`, `nl`, `pt`; regional codes like `pt-br` also work).
2. Translate the values, keep the keys. Keep placeholders such as `{soc}` unchanged.
3. Set `language.name` to the name of the language in that language (e.g. `Français`).
4. Register the file in [`src/localize.js`](src/localize.js): add an `import` line and the code to `TRANSLATIONS`.
5. Run the checks:

   ```bash
   npm install
   npm run build
   node scripts/check-translations.mjs
   ```

   The check fails on unknown keys, changed placeholders and empty texts. Missing keys are listed and fall back to English.
6. Open a pull request. You do not need to commit `dist/car-info-card.js`; it is rebuilt before a release.

If you prefer not to work with Git, open an issue with the "Translation" template and attach your JSON file.

## Code changes

```bash
npm install
npm run build     # builds dist/car-info-card.js
npm test          # build, translation check and editor test (Playwright)
npm run preview   # screenshots in docs/screenshots
```

Please keep the card generic: no brand names, no fixed entity IDs, and no drawings of recognisable car models.
