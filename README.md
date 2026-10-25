# Vibers League · Official Live Leaderboard

The real-time leaderboard and fighter telemetry system for **[Vibers League](https://www.vibersleague.com/)** (*the competitive league for AI creators*).

## Features

- **Live Google Sheet Polling Engine** (`js/leaderboard.js`):
  - Directly polls the official Google Sheet (`17f1nH3vcuk-pPknxTF1mcL6tn9v_gsexvFAlDhfq_lk`) via Google Visualization JSON (`gviz/tq?tqx=out:json`) with automatic fallback to RFC-4180 CSV (`tqx=out:csv`).
  - Configurable live polling cadence (**5s / 10s / 30s**), pause/resume toggle, manual **Sync Now**, and automatic visibility wake-up sync when returning to the tab.
  - Row diffing and visual highlight flashes whenever a viber's points, wins, or rankings change on the sheet.
  - Automatic resolution of Google Drive photo links (`drive.google.com/file/d/...`) into high-resolution headshots with duotone acid/blood multiply filters and initial fallbacks.
- **Authentic Vibers League Design System** (`css/styles.css`, `css/site.css`, `css/leaderboard.css`):
  - Strictly uses the 5 brand colors (`--ink`, `--paper`, `--acid`, `--blood`, `--steel`), self-hosted `Anton`, `Barlow Condensed`, and `Barlow` webfonts, `-8deg` skews, hard offset shadows, `2px` grid seams, and CRT scanlines.
- **Interactive Ringside Views**:
  - **Top 3 Fight Card Podium** with cursor-reactive radial acid spotlight.
  - **Interactive Standings Table** with multi-column sorting, category filter pills (*All Vibers, On The Board, Night Winners, People's Choice, Standby Pool*), instant search, and expandable inline scouting drawers.
  - **Fighter Spotlight Modal & Full Dossier Grid** showcasing every viber's city, AI stack, signature move, scouting report, and favourite build.

## Running Locally

Serve the root directory with any static HTTP server:

```bash
npx serve .
# or
python -m http.server 8080
```
