# Konzept: Car Info Card

## Ziel
Home-Assistant-Dashboard-Karte für ein E-Auto: allgemeine SUV-Silhouette, in der Mitte eine Batterie mit 5 Segmenten zu je 20 % (rot, orange, gelb, hellgrün, dunkelgrün), darin ein Blitz. Blitz grau ohne Laden, grün beim Laden; Stärke und Animation nach Ladeleistung. Rundherum wichtige Werte (Kilometerstand, Reichweite, Ladeleistung, Restzeit, Ladezustand, Klima-Solltemperatur u. a.), per Karten-Editor wählbar. Veröffentlichung über den Marketplace (seit Home Assistant 2026.11 eingebaut, liest den HACS-Katalog).

## Vorgaben
- Sprache: Oberfläche Deutsch; README englisch, zusätzlich README.de.md.
- Nur verifizierte Fakten in der Doku; Unsicheres als "⚠️ NICHT VERIFIZIERT" markieren.
- Keine Marken im Repo- oder Kartennamen; keine Nachzeichnung eines erkennbaren Fahrzeugmodells. Eigene, allgemeine SUV-Silhouette als SVG; Option `image` für ein eigenes Bild.
- Karte generisch: Entitäten werden per Konfiguration zugeordnet, keine festen Entitätsnamen im Code. Beispiele und Testdaten nutzen allgemeine Namen (`sensor.mein_auto_*`, `sensor.my_car_*`).
- Keine Tokens, Passwörter, Schlüssel oder persönlichen Daten im Repo.

## Typische Entitäten einer Fahrzeug-Integration
Die Karte erwartet nur Zahlen- bzw. Zustandssensoren, wie sie Fahrzeug-Integrationen üblicherweise anlegen:

| Zweck | Beispiel-Entität | Beispielwert |
|---|---|---|
| Ladestand | `sensor.mein_auto_ladestand` | 35 % |
| Ladeleistung | `sensor.mein_auto_ladeleistung` | 0.0 kW |
| Ladezustand | `sensor.mein_auto_ladezustand` | `connect_cable` |
| Kilometerstand | `sensor.mein_auto_kilometerstand` | km |
| Reichweite | `sensor.mein_auto_reichweite` | km |
| Zeit bis Vollladung | `sensor.mein_auto_zeit_bis_vollladung` | ⚠️ Einheit je Integration |
| Ladetyp | `sensor.mein_auto_ladetyp` | `ac`, `dc`, `not_charging` |
| Klima-Solltemperatur | `sensor.mein_auto_klima_solltemperatur` | °C |
| Kennzeichen | `sensor.mein_auto_kennzeichen` | Text |

Ladezustände, die mindestens eine verbreitete Integration verwendet: `charging`, `connect_cable`, `ready_for_charging`, `conserving`, `discharging`, `charging_interrupted`. Als "lädt" gilt standardmäßig `charging` (Option `charging_states`). Enum-Sensoren liefern ihre möglichen Werte im Attribut `options`; der Editor bietet sie zur Auswahl an.

## Marketplace-Voraussetzungen
Geprüft am 11.11.2026 unter https://contributors.home-assistant.io/marketplace/ (repository-structure, hacs-json, validation, guides/dashboard, guides/releases, guides/catalog):
- Öffentliches GitHub-Repo mit `hacs.json` und `README.md` im Wurzelverzeichnis; Beschreibung, Topics und Issues sind Pflicht für den Katalog. Ein Repo enthält genau eine Karte.
- `hacs.json`: `name` ist Pflicht; `filename` optional, wenn die Datei wie das Repo heißt. Unbekannte Schlüssel werden ignoriert. Optional `homeassistant` als Mindestversion.
- Die JavaScript-Datei wird zuerst am neuesten Release gesucht, dann im Wurzelverzeichnis, dann in `dist`. Installiert nach `www/community/<repo>/`, Ressource mit Version in der URL.
- Version = Tag des neuesten veröffentlichten GitHub-Release (ein Tag allein reicht nicht). Der Release-Text erscheint als Update-Hinweis.
- Prüf-Action `hacs/action@main` mit `category: plugin`; der Katalog verlangt einen Lauf ohne `ignore`. Die README eines Dashboard-Repos muss Bilder enthalten.
- README-Teile nur für GitHub stehen zwischen `<!-- ha-marketplace:exclude-start -->` und `<!-- ha-marketplace:exclude-end -->`.
- Katalog: Pull Request an `hacs/default` (Datei `plugin`, alphabetisch), vom eigenen Konto, Vorlage vollständig mit Link zum Release und zu einem erfolgreichen HACS-Action-Lauf. Die Prüfung dauert laut Doku Monate; bis dahin Installation per My-Link `marketplace_repository`.

## Reihenfolge
1. Prototyp (Lit, eine JS-Datei), Vorschau per Playwright-Screenshot. ✅
2. Karten-Editor (Werte, Entitäten, Ladestufen, Farben). ✅
3. Test in einem echten Home Assistant während eines Ladevorgangs.
4. README, `hacs.json`, Release, Katalog-Eintrag. (README, `hacs.json`, Workflows ✅; Release und Katalog offen)

## Stand (Version 0.2.0)
- Offen: Test im echten Home Assistant beim Laden (Wert und Einheit der Restzeit, Verhalten des Editors), erstes Release, Katalog-Eintrag.
