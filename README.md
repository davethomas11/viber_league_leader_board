# Vibers League · Official Live Leaderboard (`v4.2.0`)

The real-time leaderboard, kinetic overtake broadcast, and fighter telemetry system for **[Vibers League](https://www.vibersleague.com/)** (*the competitive league for AI creators*).

- **Live Deployment**: [https://davethomas11.github.io/viber_league_leader_board/](https://davethomas11.github.io/viber_league_leader_board/)
- **Live Overtake Demo**: [https://davethomas11.github.io/viber_league_leader_board/?simulate_ranking_change=1](https://davethomas11.github.io/viber_league_leader_board/?simulate_ranking_change=1)
- **Direct Viber Card Deep Link**: [https://davethomas11.github.io/viber_league_leader_board/#viber-dave-thomas](https://davethomas11.github.io/viber_league_leader_board/#viber-dave-thomas)

---

## Features

### 1. Twist Card 01 — THE VIBER CARD (`v4.x`)
- **Tap Any Viber**: Clicking any row, photo, or name in the standings table, podium, or dossier grid opens **The Viber Card** (`#fighter-modal-backdrop`) and closes cleanly back to the exact table row where the viber left off (smooth scroll + focus restoration + acid row highlight).
- **8 Required Story Fields**: Large high-contrast photo (or identical full-bleed monogram card for no-photo vibers like Zachary), `name`, `handle`, `city`, `builds_with`, `signature_move`, `known_for`, and `favourite_build`.
- **Full 7-Stat Line**: `Points`, `Nights`, `Wins`, `People's Choice`, `Yellow Cards`, `Best Night`, and `Last Night`.
- **Bonus — Dedicated Hash Address & Print View**:
  - Every card has its own shareable URL hash (`#viber-dave-thomas`, `#viber-zachary`, `#v011`, or `#@ollie`).
  - Clean `@media print` stylesheet (`window.print()`) prints a sharp, high-contrast physical trading card without background chrome.

### 2. V3 Kinetic Overtake Engine (`v3.x`)
- **FLIP Row Position-Swap Animations**: Smooth `cubic-bezier(0.22, 1, 0.36, 1)` DOM row transitions whenever vibers trade places.
- **Directional Rank Arrows & Point Pills**: Shows `▲ +3` / `▼ -1` rank movement badges and `+11 PTS` surge pills on updated rows.
- **Championship Coronation (`?simulate_ranking_change=1`)**: Multi-stage ringside choreography culminating in a full-screen **"DAVE TAKES THE LEAD!"** broadcast splash and particle confetti burst.

### 3. V2 Broadcast Arena (`v2.x`)
- **Tale of the Tape — Head-to-Head VS Arena**: Select any two vibers to compare stats side-by-side with a live **5-Axis Combat Radar SVG** (`Points`, `Wins`, `Peak Night`, `Crowd ★`, `Pace / Ep`).
- **Web Audio API Ringside Bell Synth**: Synthesizes metallic ringside bell strikes and championship fanfare with zero external audio assets.
- **Ringside Jumbotron Mode**: Fullscreen high-contrast arena display mode (`[T]` shortcut).

### 4. V1 Live Google Sheet Polling & Brand Design System (`v1.x`)
- Directly polls the official Google Sheet (`17f1nH3vcuk-pPknxTF1mcL6tn9v_gsexvFAlDhfq_lk`) via Google Visualization JSON (`gviz/tq?tqx=out:json`) with automatic fallback to RFC-4180 CSV (`tqx=out:csv`).
- Strictly uses the 5 Vibers League brand colors (`--ink`, `--paper`, `--acid`, `--blood`, `--steel`), self-hosted `Anton`, `Barlow Condensed`, and `Barlow` webfonts, `-8deg` skews, and hard offset shadows.

---

## QA & Unit Test Suite (`tests/leaderboard.test.js`)

Zero-dependency unit and QA regression tests built on Node's native test runner (`node:test`, `node:assert/strict`, `node:vm`) and enforced on every push/PR via GitHub Actions (`.github/workflows/qa.yml`).

```bash
npm test
# or
npm run qa
```

### Protected Invariants (11 Automated Suites):
1. **QA 01 · Brand Design System**: Verifies `css/tokens/colors.css` strictly defines the 5 Vibers League colors (`#0B0A08`, `#F3EFE6`, `#E8FF2A`, `#FF2B2B`, `#1A1916`).
2. **QA 02 · Brand Assets**: Verifies all self-hosted `.woff2` fonts (`Anton`, `Barlow Condensed`, `Barlow`) exist and are non-empty.
3. **QA 03 · HTML Structure**: Protects required ringside sections, Twist Card modal markup, and cache-busted asset links.
4. **Unit 01 · Official Ranking & Tiebreaker Order**: Verifies deterministic sorting across `Points > Wins > Best Night > People's Choice > Last Night > Episodes`.
5. **Unit 02 · Google Drive Photo URL Resolver & No-Photo Fallback**: Verifies conversion of `drive.google.com/file/d/<ID>/view` links into `drive.google.com/thumbnail?id=<ID>&sz=w800` and monogram fallback for vibers without photos.
6. **Unit 03 · Google Visualization JSON Parser**: Verifies column label normalization and row extraction from `google.visualization.Query.setResponse(...)`.
7. **Unit 04 · RFC-4180 CSV Fallback Parser**: Verifies parsing of quoted commas, escaped quotes, and multi-column rows.
8. **QA 04 · Twist Card 01 (The Viber Card)**: Verifies opening/closing any viber card (with photo or without photo), all 8 story fields, and the 7-stat full line.
9. **QA 05 · Twist Card Bonus**: Verifies deep-link hash resolution (`#viber-dave-thomas`, `#viber-zachary`, `#v008`, `#@ollie`) and `@media print` rules.
10. **QA 06 · Kinetic Rank Overtake & Coronation**: Verifies rank delta calculation (`▲ +3` / `▼ -1`), points gain tracking (`+11 PTS`), and `"DAVE TAKES THE LEAD!"` coronation splash.
11. **QA 07 · Regression Guard (Card Click & Modal Visibility)**: Verifies `.viber-card-backdrop.is-open` and `.vl-modal-backdrop.is-open` rules and clickable `data-open-modal` attributes across table rows, podium cards, and dossiers.

---

## Running Locally

Serve the root directory with any static HTTP server:

```bash
npx serve .
# or
python -m http.server 8080
```
