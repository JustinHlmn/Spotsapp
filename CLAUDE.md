# Spots – Projektwissen für Claude

Spots ist eine deutsche Web-App (PWA) für Autofahrer und ihre Crew: Spots auf der Karte merken, Fahrten aufzeichnen und auswerten, Navi, Crew mit Live-Standort, Ausfahrten und Bestenlisten.
- Live: https://justinhlmn.github.io/Spotsapp/ (GitHub Pages aus `main`)
- Repo öffentlich. Hauptnutzer: iPhone (Safari/PWA), selten Android und PC.

## Arbeitsweise mit Jamsi (wichtig)
- Antworten kurz, auf Deutsch, Du-Form.
- Direkt pushen, wenn alles grün ist.
- Oberfläche minimal: keine Slogans, kein Füllsatz-Text.
- **Nie Sprachansagen fürs Navi vorschlagen** (ausdrücklich unerwünscht).
- Keine Blitzer-Warnungen. Keine Karten-Dienste mit API-Key. Keine Nachbauten echter Automarken oder Logos.
- Death List, Rangliste („Platz 1“ in Rot), Fahrten-Vergleich mit grünem Sieger und Top-Speed bleiben so: Jamsis bewusste Entscheidung.
- Wall of Almost ist nur eine Warnung.
- Teilbilder und geteilte Fahrten:
  - Kein Höchsttempo.
  - Start und Ziel um 250 m gekürzt.
- Testdaten nur mit neutralen Ortsnamen (Testort, Spot A …), nie Jamsis echte Orte.
- Private Spot-Daten und Import-Dateien nie committen.
- Die E-Mail-Adresse des Nutzers nie irgendwohin senden.
- Spotify-Anbindung erst, wenn Jamsi eine Client-ID gibt.

## Aufbau
- `index.html`: HTML-Gerüst. Lädt `lib/maplibre-gl.*`, `app.css?v=…`, `app.js?v=…`.
- `app.js` (~9k Zeilen): eine IIFE. Abschnitte sind mit `/* ===== Name ===== */` markiert.
- `app.css`: das Design.
- `sw.js`: Service Worker mit drei Caches:
  - `app-vNN` (Shell), versioniert.
  - `lib-1` (MapLibre und Schriften), überlebt Updates.
  - `tiles-rt` (Kartenkacheln).
  - Seitenaufruf: erst Netz, nach 4 s Fallback auf den Cache. `?v=`- und `lib/`-Dateien nur aus dem Cache.
- `lib/three.min.js`: wird erst für das 3D-Auto im Cockpit geladen.
- `manifest.webmanifest`: Name „Spots“, Farbe #06111d, Icons (maskable 512).
- `tools/bump.py`: setzt die Version überall gleichzeitig (`VERSION` in app.js, `?v=` in index.html, `AV` und `V` in sw.js). **Vor jedem Push ausführen.**
- `tests/run.js`: alle Prüfungen in einem Lauf.
  - Syntax, doppelte Funktionsnamen, passende Versionen.
  - Dazu jede `tests/*.test.js` in Playwright mit nachgebauten Netzdiensten.
  - Aufruf: `CHROME_PATH=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell node tests/run.js [name…]`.
  - `node_modules` ist ein Symlink nach `/tmp/claude-0/rt/node_modules` (in .gitignore).
- Ablauf einer Änderung: ändern → `node --check app.js` → `python3 tools/bump.py` → `node tests/run.js` → commit (Trailer siehe unten) → push.
- Commit-Trailer:
  ```
  Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_017tg1FovHL5ubLc7tTaqJuZ
  ```

### Code-Konventionen und Fallen
- `$()` = querySelector, `esc()` für Text in HTML, `svg(path, size, stroke)` für Icons.
- `UI.*` und `ICONS.*` sind Icon-Pfade, `ICON_DE` die deutschen Namen.
- `setSrc(id, fc)` setzt GeoJSON-Quellen. `FC()` baut eine FeatureCollection.
- `toast()`, `show(view, snap)` wechselt Panel-Ansichten, `setSnap('mini'|'peek'|'half'|'full')` steuert das Sheet.
- Fremddaten (Firestore, Links, Import) laufen immer durch `sanitize()`/`sjson()`, sonst XSS über Farben und IDs. Farben über `okColor()`.
- Wiederkehrende Aufgaben über `every(fn, ms)` anlegen: die pausieren im Hintergrund. Nur Aufnahme (`recTick`) und Cockpit (`ckTick`) laufen weiter.
- Animationsklassen der Ansichten heißen `vpush`/`vpop`. Nie `pop`, das ist die Popover-Klasse.
- CSS-Variablen funktionieren nicht in SVG-Attributen, dafür `style=` nutzen.
- Playwright-Routen: zuletzt registriert gewinnt. Erst abort, dann mocks.
- `page.clock` fakt rAF, das 3D-Auto rendert dann nicht.
- `map` ist im Test-Fenster das DOM-Element, nicht die Karte.

## Daten und Speicher
- localStorage, Schlüssel `meine-spots-*`:
  - `-v1` (Spots und Kategorien), `-prefs` (Einstellungen), `-rec` (laufende Aufnahme), `-garage`.
  - `-courses`, `-runs`, `-efforts` (Rennstrecken und Zeiten), `-ws` (Crew-Cache).
  - `-gem`, `-hz`, `-roads`, `-offline`, `-bk`.
- IndexedDB:
  - `spots-kv`/`kv`: Key `tracks` = alle Fahrten. Alte localStorage-Fahrten werden einmalig übernommen.
  - `meine-spots`/`photos`: Fotos.
- Fahrt: `{id, name, created, dist, dur, maxSpd, segs:[[ [lng,lat,sekOffset], … ]], car?, fav?, cx?, place?, ws?}`.
- Spot: `{id, name, lat, lng, cat, notes, walk, parking:{lat,lng,note}, photos:[ids], created, ws?}`.
- `saveTracks()` sammelt 700 ms und schreibt dann. Beim Verlassen der Seite wird sofort geschrieben (`tracksFlush`).

## Crew (Firebase Firestore, REST)
- Projekt `jamsis-spots`. Die Konfiguration ist absichtlich öffentlich.
- Pfad `groups/<code>/<sammlung>/<doc>`. Felder: `d` (JSON), `t` (Zeit), optional `m` (Kurzfassung für Listen).
- Sammlungen laut Regeln:
  - spots, runs, courses, efforts, members, drives, reactions, live.
  - Neues muss in diese Sammlungen:
    - Ausfahrten und Zusagen als `ev_…`/`rv_…` in `reactions`.
    - Backups als `bk_<dev>_<bkId>_<teil>` in `drives`.
- Gruppencode: 20–40 Zeichen a–z0–9 (`CODE_RE`). Einladung per `#join=<code>&g=<Name>`, geprüft mit `inviteFrom()`.
- Crew-Dokument `members/_crew`:
  - `admin[]`, `ban{}`, `kick{}`, `name`, `moved`.
  - Schreiben nur über `crewSave(fn)`: liest frisch und schreibt mit updateTime-Vorbedingung, damit zwei Admins sich nicht überschreiben.
- Admin:
  - Der Ersteller ist Admin und kann andere über „Zum Admin“ befördern.
  - Hat eine Crew keinen Admin, darf das erste Mitglied „Admin werden“.
  - Kein Passwort mehr. Admin-Rechte werden nur in der App geprüft, nicht vom Server.
- Crew-Name: liegt zentral in `_crew.name` und gilt für alle. Admins können ihn ändern.
- Rauswerfen und Sperren:
  - `crewEnforce()` läuft beim Abgleich und alle 60 s (`crewCheck`), solange Live mitläuft.
  - Sperren gilt für das Gerät und den Namen.
  - Inhalte gesperrter Mitglieder werden ausgeblendet.
- Verlassen, Wechseln oder Verknüpfen: `memberGone()` löscht `members/<dev>` und `live/<dev>`, damit keine Geister-Mitglieder bleiben.
- Link erneuern (`crewRenew`):
  - Kopiert alles in den neuen Code, mit zweitem Durchgang für Neues, das währenddessen geschrieben wurde.
  - Backups (`bk_`) werden nicht kopiert, sondern gelöscht. Jedes Mitglied lädt seins selbst neu hoch (`bk.code`-Wechsel).
  - Der alte `_crew` bekommt `moved`.
- Namen: eindeutig pro Crew. `normName()` faltet Akzente und kyrillische/griechische Doppelgänger. Mindestens ein Buchstabe.
- Live-Standort:
  - Opt-in, Zustimmung pro Crew (`prefs.liveOk = code`).
  - Geht automatisch aus, nur die letzte Position wird gespeichert.
  - Echtzeit über das Firebase-SDK nur, wenn jemand live ist, sonst Abfrage alle 45 s.
- Ausfahrten: Treffpunkt, Zeit und Route. Die Crew sagt zu, beim Treffen geht Live automatisch an. Keine Daten in der Vergangenheit, auch nicht beim Bearbeiten.
- Wochenstatistik teilen: km, Anzahl Fahrten, Fahrzeit, Höchsttempo, Ø Risiko. Standard an.
- Backup:
  - Automatisch, AES-GCM und gzip, im eigenen Crew-Speicher.
  - Wiederherstellungscode `SPOTS-…` (enthält Gruppe, Gerät, Name, Schlüssel).
  - Hinweis zum Sichern des Codes als ruhige Karte im Crew-Tab plus roter Punkt in den Einstellungen (`prefs.bkTodo`). Kein Popup.
- Gerät verknüpfen: Link `#link=<dev>&n=…&join=…&bk=…`, erkannt von `accountFromText()`/`openAccount()`.

## Funktionen (nach Bereich)
**Spots**
- Liste mit Kategorie-Chips: Mehrfachfilter, „Filter zurücksetzen“, Mausrad am PC, senkrecht wischen zieht das Sheet.
- Suche: eigene Spots, Präfix zuerst, dann nach Entfernung, „weitere anzeigen“. Dazu Orte über Photon. Nach dem Öffnen eines Treffers führt „Zurück“ wieder in die Suche.
- Detail:
  - Navigation, Link teilen, In die Crew, Bearbeiten-Stift oben.
  - Sonne und Wetter, Fotospot-Planer (Sonnenrichtung mit Gelände-Horizont), Saison-Hinweise, Parkplatz mit Fußweg.
  - Wetter, Sonne, Fotospot-Planer und Straßenwetter (auch Listen-Hinweise und „Bester Sonnenuntergang“) nur bei Kategorien mit `catWx()`: Schalter „Wetter und Sonne zeigen“ je Kategorie (`cat.wx`); ohne Einstellung nach Name/Symbol (Aussicht, Chill, Foto, Baden, Natur an; Park, Tanken, Treffpunkt, Essen aus).
- Neuer Spot:
  - Fadenkreuz und „Fadenkreuz nehmen“ oder „Mein Standort“.
  - Danach die Bearbeitung halb geöffnet, mit Cursor im Namen.
  - Abbrechen fragt, wenn sich etwas geändert hat.
- Bis zu 12 Fotos (IndexedDB). Kategorien mit Farbe und Symbol, mindestens eine bleibt.
- Spot per Link teilen und empfangen. „Nächster Spot“-Karte oben.
- Zurück-Taste (Android und Browser-Geste) über die History: erst Overlays schließen, dann eine Ansicht zurück. Wischen vom linken Rand geht auch zurück.
- Die Liste merkt sich Sheet-Höhe und Scrollposition.

**Fahrten**
- Aufnahme:
  - Start, Pause, Stopp. Öffnet optional das Cockpit.
  - Wird alle 2 s, beim Verbergen und bei `pagehide` gesichert und nach einem Absturz wiederhergestellt.
  - Im Hintergrund pausiert das GPS: das iPhone erlaubt Web-Apps kein Tracking im Hintergrund.
  - Lücken füllen (`gapFillTrack`): Sprünge in einem Abschnitt (≥ 12 s, ≥ 250 m, ≤ 2 h) werden nach dem Speichern bzw. beim ersten Öffnen (`gapChk`) über OSRM ergänzt. Zeit nach Durchschnittstempo der Lücke. Ergänzte Punkte haben 4 Werte `[lng,lat,s,0]` in eigenem Abschnitt (`isFillSeg`): kein `cleanSeg`, keine G-Kräfte, nicht in „über 130“, auf der Karte blasser (`x:1`), Hinweis `.gapnote`. Abgelehnt bei Umweg (> 2,2× + 1,5 km), > 70 m/s oder Start/Ziel > 300 m von der Straße; offline später nochmal.
  - Nach einem Absturz (`rec.crash`) geht „Fortsetzen“ im selben Abschnitt weiter und zählt die Lücke zur Dauer, damit sie gefüllt wird. Selbst pausiert = neuer Abschnitt, nichts wird ergänzt.
- „Meine“: Liste mit Lieblingen (Stern, Filter, auf der Karte gold) und einer Death List mit Rangliste.
- Death List und Risk-Score (`analyzeTrack`, `trackRisk`):
  - `cleanSeg()` wirft GPS-Ausreißer raus (Tempo ±18 m/s², quer 20 m/s² zwischen zwei Schritten, über Lücken > 5 s kein Urteil).
  - Querkraft aus GPS über ≥ 20 m und ≥ 2 Punkte je Seite, G aus GPS höchstens 1,1. Spitzen und harte Manöver zählen nur, wenn sie über zwei Punkte anliegen.
  - Death List erst ab 2 km (`DL_MIN`). Top-Speed überall = `maxSpd`; Punkt-Tempo wird daran gedeckelt.
- Fahrt-Detail:
  - Beim Öffnen (`tvIntroKey`): Linie zeichnet sich auf der Karte (`tvDraw`, Filter auf Feature-Anteil `f`), Zahlen zählen hoch (`countUp`), Risk-Balken füllt sich, Tempo-Verlauf zeichnet sich (`introAnim`). Nur beim Öffnen, nicht beim Neuzeichnen; bei „Bewegung reduzieren“ aus. Statistik-Kacheln zählen auch hoch.
  - G-Schilder auf der Karte: Punkt + Schild, `gLayout()` sucht eine freie Seite (8 Positionen), meidet Kartenknöpfe, Hinweiskarte und Sheet.
  - Distanz, Dauer, Ø, Max, Fahrbedingungen (Nacht, Regen, Glätte über Open-Meteo-Archiv), Risk-Karte, Wege, Neuland.
  - Vergleich mit gleichen Fahrten, Tempo-Verlauf und Sektoren, Replay.
  - „Nochmal fahren“: Navi folgt der Fahrt über Valhalla-`through`-Punkte (`favGo`).
  - Als Rennstrecke speichern (40 m innen gekürzt, keine Duplikate), Bild teilen, GPX exportieren, In die Crew teilen.
- Rennstrecken: einzeichnen oder aus einer Fahrt, Zeiten automatisch, Geister-Rennen.
- Statistik:
  - Deine Wege (Arbeitsweg, typische Dauer, beste Abfahrt), Fahrbedingungen, Fahrstil-Trend.
  - Straßen-Sammler mit Heatmap, Gemeinden sammeln (Overpass-Grenzen), Wochen-Diagramm.
  - Jahresrückblick als Story-Bilder. Fahrten unter 100 m werden ignoriert.
- Garage mit eigenen Autos. 0–100-Messung. G-Kräfte (Sensor nur im Cockpit oder bei Aufnahme).
  - Autofotos: bis zu 8 je Auto in `photos:[{id, src, crop}]`, das erste ist das Titelbild (`gPhotos()`, `gCoverSync()` spiegelt es in `photo`/`photoSrc`/`crop` für Liste, Profil, Crew). Alte Autos mit nur `photo` werden automatisch übernommen.
  - Jedes Foto geht erst durch den Zuschnitt (`cropOpen`, ziehen, zwei Finger, Regler, Mausrad), Ergebnis immer 16:10 (1280×800); Original in `src`. Im Zuschnitt eines vorhandenen Fotos: „Als Titelbild“, „Foto löschen“ (zweimal tippen).
  - Gelöschte Fotos werden beim Speichern entfernt, neue ohne Speichern beim Zurück verworfen. Backup enthält alle Fotos ohne Originale, Export keine. Crew sieht nur das Titelbild.

**Navi und Cockpit**
- Ziel aus Suche, Spot, Ausfahrt oder Fahrt.
- Routing:
  - Schnellste über OSRM (zwei Server), Landstraße und Rundtour über Valhalla (`use_highways:0`).
  - Beim Neuberechnen wird bei Ausfall der jeweils andere Dienst genutzt.
- Vorschau:
  - Karten „Schnellste/Mit Autobahn“ und „Landstraße“, bis zu 3 Zwischenstopps (Tankstelle, Spot, Freund), immer an der gewählten Route gemessen.
  - „Unterwegs sehenswert“ (Aussichtspunkte, Pässe, Seen), Straßenwetter-Balken.
  - **Sperrungen** (`blockLoad`, Overpass-Tags conditional, seasonal, winter_service, access, construction, nur wenn die Route den Weg wirklich nutzt).
  - **Wildwechsel** (Wald per `is_in` an Messpunkten in Dämmerung oder Nacht, Wildwechsel-Schilder).
  - Höchstens 62 vh hoch, „Los“ bleibt sichtbar. Karte von oben (pitch 0).
- Während der Navi:
  - Route in festem Blau mit weißem Rand.
  - Bei Abweichung neu berechnen. GPS-Lücken werden toleriert, ungenaue Punkte nicht gezählt.
  - Live-Knopf sichtbar.
  - **Aufnahme startet automatisch** (Einstellung `navRec`), Knopf `#navRec`. Beim Ende wird Speichern angeboten.
  - X fragt „Beenden?“ und beendet nur die Navi, das Cockpit bleibt.
- Cockpit:
  - Tempo, Tempolimit (OSM, vorausschauend geladen, mehrere Abschnitte im Speicher, versteht `DE:urban` usw.), Straßenwetter- und Wildwechsel-Chip, Nachtmodus nach Dämmerung, 3D-Auto (three.js).
  - 3D-Gelände ist im Cockpit und in der Navi aus (flach), danach wieder an.
- Kurvige Rundtour: Dauer 30 Min bis 2 h, Richtung, kurvige Straßen aus OSM.

**Karte (Ebenen-Menü)**
- Kartenstile: Schlicht (Vektor, OpenFreeMap), Satellit, Straße, Dunkel, Gelände (ArcGIS-Kacheln, ohne Key).
- Straßen und Orte, 3D-Gelände (Mapzen-Höhen).
- Regenradar:
  - DWD für Deutschland mit Vorhersage, sonst RainViewer.
  - maxzoom 8, das nächste Bild wird über die versteckte Ebene `radar-p` vorgeladen.
- Fahrten-Heatmap.
- **Reichweite**: Valhalla-Isochronen 30/60/90 Min, mit Autobahn oder Landstraße, Zahl der Spots im Bereich. Fallback: einzeln anfragen, sonst grob über eine OSRM-Tabelle (16 Richtungen × 6 Abstände).
- Offline-Karten: Bereich speichern, Fehlschlag wird erkannt. „Hier geparkt“ mit Fußweg zurück. 0–100 messen.

**Allgemein**
- Onboarding mit Zurück-Knopf: Name, Crew beitreten oder erstellen, „Ich nutze Spots schon auf einem anderen Gerät“.
- Design: dunkel, hell oder automatisch, Akzentfarben. Haptik (iOS-Switch-Trick, Android vibrate).
- Dialoge: Fokus wird gesetzt, Tab bleibt im Dialog, Escape schließt.
- Kamera springt sofort bei „Bewegung reduzieren“.
- Begriffe einheitlich: „Crew“ (nicht Gruppe/Workshop), „Fahrt“ (nicht Strecke), „Rennstrecke“.
- Animationen (alle aus bei „Bewegung reduzieren“, `RM`):
  - Start: Startbildschirm zieht sich wie eine Blende auf das Logo zusammen, Sheet und Knöpfe gleiten herein (`body.boot`).
  - Ansichten federn (`viewpush`/`viewpop`), Tabs und Unter-Tabs mit gleitender Markierung (`segPill`), Liste blendet beim Tab-Wechsel (`tabFade`).
  - Death List baut sich von Platz 10 nach Platz 1 auf, Platz 1 mit Herzschlag (`dlIntroRun`, nur beim Öffnen).
  - Neue Bestzeit (0–100, Rennstrecke): Glanz (`bestFx`) + `hapticWin()`. Speichern (Spot, Fahrt, Auto, Rennstrecke) gibt `hapticWin()`.
  - Cockpit: Tacho federt (`ckGaugeTo`, auch im Replay), neues Tempolimit-Schild ploppt (`lpop`, nie `pop`).
  - Schimmernde Platzhalter `.sk` beim Laden (Wetter, Straßenwetter, Crew-Fotos, Sonnenuntergang); Bilder ohne `src` schimmern auch.
- Fahrtenliste mit Vorschaubild der Strecke (`trackThumb`). Fahrt-Detail zeigt das gefahrene Auto (`.tv-car`, tippen öffnet es).
- 3D-Flug (`flyStart(t, record)`, Knöpfe „3D-Flug“/„Als Video“ im Fahrt-Detail):
  - Einflug aus der Übersicht, Kamera gleitet mit 3D-Gelände (Pitch 62, träge Drehung) die Fahrt entlang, Linie zeichnet sich mit, am Ende Übersicht. Dauer 16–42 s je nach Länge.
  - Blendet alle Ebenen außer `track-view-line` und Grundkarte aus (`FLY_HIDE` + Radar) und stellt sie danach wieder her, genauso Gelände, Linienbreite, Gesten.
  - Video: Hochkant 720×1280, Kartenbild wird im `render`-Event auf eine Leinwand kopiert (Titel, Datum, km, Quellenangabe, kein Tempo), `MediaRecorder` (mp4, sonst webm). Start und Ziel um 250 m gekürzt, unter 400 m Rest „zu kurz“. Danach Karte mit Video, „Teilen“ (Web Share mit Datei) und „Speichern“.
- Showroom (`srOpen(id)`): Tippen auf ein Auto in der Garage oder auf `.tv-car` öffnet das Auto als 3D-Modell (`buildCar`) in Lackfarbe, drehbar mit Schwung, zwei Finger/Mausrad zoomen, Einflug von oben. Daneben km gesamt, Fahrten, km gefahren, Top-Speed mit dem Auto, TÜV, Fotos (Lightbox), „Als aktives Auto“, „Bearbeiten“ (→ `openGarageCar`). Ohne WebGL das flache Auto-Bild.
- Replay: Einflug hinter das Auto, gefahrener Teil leuchtet (Filter auf `f`), Zeitleiste mit Tempo-Profil (`rpTimeline`), am Ende fährt die Kamera hoch (`rpOutro`).

## Externe Dienste (alle ohne Key)
- Kacheln:
  - server.arcgisonline.com, tiles.openfreemap.org.
  - Höhen: amazonaws elevation-tiles.
- Routing: router.project-osrm.org und routing.openstreetmap.de (OSRM), valhalla1.openstreetmap.de (Route und Isochrone).
- Daten:
  - overpass-api.de und overpass.kumi.systems.
  - photon.komoot.io (Suche), nominatim.openstreetmap.org (Ortsname).
- Wetter: api.open-meteo.com (Wetter, Höhe), archive-api.open-meteo.com, maps.dwd.de (Radar), api.rainviewer.com.
- In der Testumgebung ist das Netz gesperrt. Alles mocken; der Hinweis „Kartenbilder werden nicht geladen“ ist dort normal.

## Bekannte offene Punkte
- Sperren ist nur pro Gerät und Name. Wirklich sicher geht es nur mit Anmeldung und Firebase-Regeln, ein großer Umbau.
- Zoomen ist bewusst gesperrt (`user-scalable=no`).
- Ungetestet:
  - Navi, Cockpit und Statistik am PC.
  - Nachtmodus, Kartenwechsel während der Navi.
  - Reichweite, Wildwechsel und Sperrungen mit den echten Diensten.
- Kleinkram: Emojis im Onboarding, doppelte CSS-Regeln.
- Ideen-Vorrat (nur auf Nachfrage): Tankbuch, Konvoi-Abstand, Fahrt als Video, Spot-Listen, Startkarte „Heute“, Kommentare, Crew-Karte, Icon-Kurzbefehle, GPX-Import (für Tracking im Hintergrund über eine andere App).
