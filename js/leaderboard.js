/* ==========================================================================
   VIBERS LEAGUE — LIVE LEADERBOARD ENGINE & POLLING TELEMETRY
   Data Source: Google Sheets (17f1nH3vcuk-pPknxTF1mcL6tn9v_gsexvFAlDhfq_lk)
   ========================================================================== */
(function () {
  'use strict';

  var SHEET_ID = '17f1nH3vcuk-pPknxTF1mcL6tn9v_gsexvFAlDhfq_lk';
  var GVIZ_JSON_URL = 'https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?tqx=out:json';
  var GVIZ_CSV_URL  = 'https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?tqx=out:csv';
  var SHEET_EDIT_URL = 'https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/edit?pli=1';

  // Fallback snapshot in case user is temporarily offline on first paint
  var FALLBACK_VIBERS = [
    { id: 'v011', name: 'Dave Thomas', handle: '@name1', photo_url: 'https://drive.google.com/file/d/1Ejlo5-nOoxuPGjLlWcE0r0n2-jFM-ami/view?usp=drive_link', points: 31, episodes: 3, wins: 2, peoples_choice: 1, yellow_cards: 0, best_night: 12, last_night: 11, city: 'Burnaby', builds_with: 'Claude Code, Vercel', signature_move: 'Deploys at minute 20', known_for: 'Two wins from three nights, and the only clean sweep so far', favourite_build: 'A quoting tool for a roofing crew' },
    { id: 'v008', name: 'Ollie', handle: '@ollie', photo_url: 'https://drive.google.com/file/d/1oMC4HO-X3lxkJHcG5MiIXB19tmVoA3rk/view?usp=drive_link', points: 27, episodes: 3, wins: 1, peoples_choice: 1, yellow_cards: 0, best_night: 10, last_night: 9, city: 'Vancouver', builds_with: 'Claude Code, Railway, Postgres', signature_move: 'Reads the brief twice before typing', known_for: "One win, one People's Choice, never below second on the whale card", favourite_build: 'A shift planner for a cafe' },
    { id: 'v004', name: 'Zachary', handle: '@name4', photo_url: '', points: 22, episodes: 2, wins: 1, peoples_choice: 1, yellow_cards: 0, best_night: 11, last_night: 11, city: 'Coquitlam', builds_with: 'ChatGPT, GitHub Pages', signature_move: 'Pure HTML, no framework', known_for: "A win and People's Choice in one night, two nights above 10", favourite_build: 'A tip calculator for a barber' },
    { id: 'v003', name: 'Raphael', handle: '@name3', photo_url: 'https://drive.google.com/file/d/19VCYfHc9xnF9_kDU7Wdl1xe1tYnioFQe/view?usp=drive_link', points: 22, episodes: 3, wins: 0, peoples_choice: 0, yellow_cards: 1, best_night: 9, last_night: 7, city: 'Vancouver', builds_with: 'Cursor, Supabase', signature_move: 'Ships the ugly version first', known_for: 'Three nights in, never missed a bell, one yellow card for a phone face up', favourite_build: 'A booking page for a dog groomer' },
    { id: 'v005', name: 'Balram', handle: '@name5', photo_url: 'https://drive.google.com/file/d/1oMC4HO-X3lxkJHcG5MiIXB19tmVoA3rk/view?usp=drive_link', points: 18, episodes: 2, wins: 0, peoples_choice: 0, yellow_cards: 0, best_night: 10, last_night: 8, city: 'North Vancouver', builds_with: 'Bolt, Firebase', signature_move: 'Builds the twist before it lands', known_for: 'Two nights, two fourth places on the crowd card, both judges rate the craft', favourite_build: 'A waitlist for a climbing gym' },
    { id: 'v001', name: 'Ash', handle: '@ash', photo_url: 'https://drive.google.com/file/d/1FV8ZElHtpURNqWlkewJE-FtrbL8ijImN/view?usp=drive_link', points: 15, episodes: 2, wins: 1, peoples_choice: 1, yellow_cards: 0, best_night: 7, last_night: 0, city: 'Parts Unknown', builds_with: 'MS Paint', signature_move: 'Paintbrush', known_for: 'Artistic chops', favourite_build: 'A picture of a cabin by the river' },
    { id: 'v006', name: 'Saurav Dj Gupta', handle: '@name6', photo_url: 'https://drive.google.com/file/d/1hxqKRyIpTy_21SAX6MWV2dtzPtLTtyvw/view?usp=drive_link', points: 14, episodes: 2, wins: 0, peoples_choice: 1, yellow_cards: 0, best_night: 8, last_night: 6, city: 'Surrey', builds_with: 'Lovable', signature_move: 'Wins the room, not the judges', known_for: "People's Choice on debut, bottom of both judge cards the same night", favourite_build: 'A menu board for a food truck' },
    { id: 'v007', name: 'Mikhail Sergeivich Krasnoyodospar', handle: '@name7', photo_url: 'https://drive.google.com/file/d/1MpOubuHxdcoU_OVUl4AYIURiTM0PDK2O/view?usp=drive_link', points: 9, episodes: 1, wins: 0, peoples_choice: 0, yellow_cards: 1, best_night: 9, last_night: 9, city: 'Richmond', builds_with: 'Windsurf, Netlify', signature_move: 'Deletes more than builds', known_for: 'One night, one yellow card, still on the card', favourite_build: 'A sign-up page for a trivia night' },
    { id: 'v009', name: 'Jason', handle: '@name8', photo_url: 'https://drive.google.com/file/d/17IDUoRe27uIQMEDs7qkOK8sVr_FivdxN/view?usp=drive_link', points: 0, episodes: 0, wins: 0, peoples_choice: 0, yellow_cards: 0, best_night: 0, last_night: 0, city: 'Victoria', builds_with: 'Replit, Claude', signature_move: 'Unknown', known_for: 'Named for the next card, has not built on the clock yet', favourite_build: '' },
    { id: 'v002', name: 'Ashish', handle: '@ashish', photo_url: 'https://drive.google.com/file/d/1GhNQxCMNw1Y-dAKlyA-olGKZ8xtcr6Nl/view?usp=sharing', points: 0, episodes: 0, wins: 0, peoples_choice: 0, yellow_cards: 0, best_night: 0, last_night: 0, city: 'Mision', builds_with: 'Notepad', signature_move: 'Text Wrapping', known_for: 'Writing succinct product requirements', favourite_build: 'His quarterly epics for work' }
  ];

  // State
  var state = {
    vibers: [],
    previousMap: {},
    changedIds: {},
    filter: 'all', // 'all', 'active', 'winners', 'peoples_choice', 'standby'
    search: '',
    sortBy: 'rank',
    sortDir: 'asc',
    expandedIds: {},
    modalId: null,
    pollIntervalMs: 10000,
    isPaused: false,
    isSyncing: false,
    syncCount: 0,
    lastSyncTime: null,
    lastDataSig: '',
    nextSyncAt: 0
  };

  // ---------- Utilities ----------
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function pad(n) {
    return (n < 10 ? '0' : '') + n;
  }

  function num(v) {
    if (v === null || v === undefined || v === '') return 0;
    var n = parseFloat(v);
    return isNaN(n) ? 0 : n;
  }

  function fmtPts(n) {
    if (n == null) return '0';
    return (Math.round(n * 10) / 10).toString();
  }

  function initials(name) {
    var p = String(name || '').replace(/[^A-Za-zÀ-ɏ ]/g, ' ').trim().split(/\s+/);
    return ((p[0] || '?').charAt(0) + (p.length > 1 ? p[p.length - 1].charAt(0) : '')).toUpperCase();
  }

  // Transform Google Drive file view URLs into direct fast-loading thumbnail image URLs
  function resolvePhotoUrl(rawUrl) {
    if (!rawUrl) return '';
    var s = String(rawUrl).trim();
    if (!s) return '';
    var m = s.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || s.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (m && m[1]) {
      return 'https://drive.google.com/thumbnail?id=' + m[1] + '&sz=w800';
    }
    return s;
  }

  // Render authentic Vibers League .vl-shot headshot component with automatic initials fallback
  function renderShot(v, opts) {
    opts = opts || {};
    var cls = 'vl-shot' + (opts.round ? ' is-round' : '') + (opts.win ? ' is-win' : '');
    var ini = esc(initials(v ? v.name : '?'));
    var photo = v ? resolvePhotoUrl(v.photo_url) : '';
    if (!photo) {
      return '<span class="' + cls + ' is-ini" role="img" aria-label="' + esc(v ? v.name : '') + '"><span class="ini">' + ini + '</span></span>';
    }
    return '<span class="' + cls + '" data-ini="' + ini + '">' +
      '<img src="' + esc(photo) + '" alt="' + (opts.decor ? '' : esc(v.name)) + '" loading="lazy" decoding="async" referrerpolicy="no-referrer" ' +
      'onerror="var p=this.parentNode;if(p){p.classList.add(\'is-ini\');p.innerHTML=\'<span class=\\\'ini\\\'>\'+p.getAttribute(\'data-ini\')+\'</span>\';}">' +
      '</span>';
  }

  // Official ranking comparator:
  // 1. Points DESC
  // 2. Wins DESC
  // 3. Best Night DESC
  // 4. People's Choice DESC
  // 5. Last Night DESC
  // 6. Episodes DESC
  function compareOfficialRank(a, b) {
    return (b.points - a.points) ||
           (b.wins - a.wins) ||
           (b.best_night - a.best_night) ||
           (b.peoples_choice - a.peoples_choice) ||
           (b.last_night - a.last_night) ||
           (b.episodes - a.episodes) ||
           a.name.localeCompare(b.name);
  }

  function normalizeRows(rawList) {
    var cleaned = rawList.filter(function (r) {
      return r && (r.id || r.name);
    }).map(function (r) {
      var pts = num(r.points);
      var eps = num(r.episodes);
      var wins = num(r.wins);
      var pc = num(r.peoples_choice);
      var yc = num(r.yellow_cards);
      var best = num(r.best_night);
      var last = num(r.last_night);
      var ppg = eps > 0 ? Math.round((pts / eps) * 10) / 10 : 0;
      var tools = String(r.builds_with || '').split(',').map(function (t) { return t.trim(); }).filter(Boolean);
      return {
        id: String(r.id || '').trim(),
        name: String(r.name || 'Unknown Viber').trim(),
        handle: String(r.handle || '').trim(),
        photo_url: String(r.photo_url || '').trim(),
        points: pts,
        episodes: eps,
        wins: wins,
        peoples_choice: pc,
        yellow_cards: yc,
        best_night: best,
        last_night: last,
        ppg: ppg,
        city: String(r.city || 'Vancouver').trim(),
        builds_with: String(r.builds_with || '').trim(),
        tools: tools,
        signature_move: String(r.signature_move || '').trim(),
        known_for: String(r.known_for || '').trim(),
        favourite_build: String(r.favourite_build || '').trim(),
        isStandby: eps === 0 && pts === 0
      };
    });

    cleaned.sort(compareOfficialRank);
    cleaned.forEach(function (v, idx) {
      v.rank = idx + 1;
    });
    return cleaned;
  }

  // ---------- Parsers (GViz JSON + RFC-4180 CSV Fallback) ----------
  function parseGvizJson(text) {
    var start = text.indexOf('{');
    var end = text.lastIndexOf('}');
    if (start === -1 || end === -1) throw new Error('Invalid GViz JSON payload');
    var json = JSON.parse(text.slice(start, end + 1));
    var table = json.table;
    var cols = table.cols.map(function (c) {
      return String(c.label || c.id || '').trim().toLowerCase();
    });
    var rows = (table.rows || []).map(function (rowObj) {
      var item = {};
      cols.forEach(function (colName, idx) {
        if (!colName) return;
        var cell = rowObj.c && rowObj.c[idx];
        item[colName] = cell && cell.v !== null && cell.v !== undefined ? cell.v : '';
      });
      return item;
    });
    return { sig: json.sig || '', rows: rows };
  }

  function parseCsv(text) {
    var rows = [];
    var row = [];
    var cur = '';
    var inQuotes = false;
    for (var i = 0; i < text.length; i++) {
      var ch = text[i];
      var next = text[i + 1];
      if (inQuotes) {
        if (ch === '"' && next === '"') {
          cur += '"';
          i++;
        } else if (ch === '"') {
          inQuotes = false;
        } else {
          cur += ch;
        }
      } else {
        if (ch === '"') {
          inQuotes = true;
        } else if (ch === ',') {
          row.push(cur);
          cur = '';
        } else if (ch === '\n' || (ch === '\r' && next === '\n')) {
          if (ch === '\r') i++;
          row.push(cur);
          rows.push(row);
          row = [];
          cur = '';
        } else {
          cur += ch;
        }
      }
    }
    if (cur.length > 0 || row.length > 0) {
      row.push(cur);
      rows.push(row);
    }
    if (!rows.length) return { sig: '', rows: [] };
    var headers = rows[0].map(function (h) { return String(h || '').trim().toLowerCase(); });
    var items = rows.slice(1).map(function (r) {
      var obj = {};
      headers.forEach(function (h, idx) {
        if (h) obj[h] = r[idx] !== undefined ? r[idx] : '';
      });
      return obj;
    });
    return { sig: String(text.length), rows: items };
  }

  // ---------- Live Polling System ----------
  function fetchSheetData() {
    if (state.isSyncing) return Promise.resolve();
    state.isSyncing = true;
    updateHudStatus('SYNCING SHEET...', 'is-syncing');

    var cacheBust = '&_cb=' + Date.now();
    return fetch(GVIZ_JSON_URL + cacheBust, { cache: 'no-store' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.text();
      })
      .then(parseGvizJson)
      .catch(function () {
        // Fallback to CSV endpoint if JSON wrapper ever hiccups
        return fetch(GVIZ_CSV_URL + cacheBust, { cache: 'no-store' })
          .then(function (res) {
            if (!res.ok) throw new Error('CSV HTTP ' + res.status);
            return res.text();
          })
          .then(parseCsv);
      })
      .then(function (result) {
        var normalized = normalizeRows(result.rows);
        var newChanged = {};
        var hasChanges = false;

        if (Object.keys(state.previousMap).length > 0) {
          normalized.forEach(function (v) {
            var prev = state.previousMap[v.id];
            if (!prev ||
                prev.points !== v.points ||
                prev.rank !== v.rank ||
                prev.wins !== v.wins ||
                prev.episodes !== v.episodes ||
                prev.peoples_choice !== v.peoples_choice ||
                prev.yellow_cards !== v.yellow_cards ||
                prev.name !== v.name) {
              newChanged[v.id] = true;
              hasChanges = true;
            }
          });
        } else {
          hasChanges = true;
        }

        var nextMap = {};
        normalized.forEach(function (v) { nextMap[v.id] = v; });

        state.vibers = normalized;
        state.previousMap = nextMap;
        state.changedIds = newChanged;
        state.syncCount++;
        state.lastSyncTime = new Date();
        state.isSyncing = false;
        state.nextSyncAt = performance.now() + state.pollIntervalMs;

        updateHudStatus(state.isPaused ? 'POLLING PAUSED' : 'LIVE · FEED LOCKED', '');
        updateTelemetryStats();

        if (hasChanges || state.syncCount === 1) {
          renderAll();
          if (Object.keys(newChanged).length > 0) {
            setTimeout(function () {
              state.changedIds = {};
            }, 2000);
          }
        }
      })
      .catch(function (err) {
        console.warn('Live sheet poll error:', err);
        state.isSyncing = false;
        state.nextSyncAt = performance.now() + state.pollIntervalMs;
        updateHudStatus('RETRYING FEED...', 'is-error');
        if (!state.vibers.length) {
          state.vibers = normalizeRows(FALLBACK_VIBERS);
          renderAll();
        }
      });
  }

  function updateHudStatus(text, modClass) {
    var el = document.getElementById('hud-status');
    var label = document.getElementById('hud-status-text');
    if (!el || !label) return;
    el.className = 'hud-status' + (modClass ? ' ' + modClass : '');
    label.textContent = text;
  }

  function updateTelemetryStats() {
    var syncEl = document.getElementById('hud-sync-count');
    var timeEl = document.getElementById('hud-last-time');
    var rosterEl = document.getElementById('hud-roster-count');
    if (syncEl) syncEl.textContent = '#' + pad(state.syncCount);
    if (timeEl && state.lastSyncTime) {
      timeEl.textContent = state.lastSyncTime.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
    if (rosterEl) rosterEl.textContent = state.vibers.length + ' VIBERS';
  }

  // Smooth RAF loop for telemetry countdown and drain bar
  function startPollingLoop() {
    state.nextSyncAt = performance.now() + state.pollIntervalMs;
    var countEl = document.getElementById('hud-countdown-val');
    var barEl = document.getElementById('hud-bar-fill');

    function tick(now) {
      if (!state.isPaused && !document.hidden) {
        var remaining = Math.max(0, state.nextSyncAt - now);
        var secs = (remaining / 1000).toFixed(1);
        if (countEl) countEl.textContent = secs + 's';
        if (barEl) {
          var ratio = Math.max(0, Math.min(1, remaining / state.pollIntervalMs));
          barEl.style.setProperty('--poll-p', ratio.toFixed(4));
        }
        if (remaining <= 0 && !state.isSyncing) {
          fetchSheetData();
        }
      } else if (state.isPaused) {
        if (countEl) countEl.textContent = 'HOLD';
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    document.addEventListener('visibilitychange', function () {
      if (!document.hidden && !state.isPaused) {
        fetchSheetData();
      }
    });
  }

  // ---------- Rendering Components ----------
  function renderTicker() {
    var el = document.getElementById('live-ticker-content');
    if (!el || !state.vibers.length) return;
    var leader = state.vibers[0];
    var totalPts = state.vibers.reduce(function (s, v) { return s + v.points; }, 0);
    var activeCount = state.vibers.filter(function (v) { return !v.isStandby; }).length;
    var topThree = state.vibers.slice(0, 3).map(function (v, idx) {
      return '#' + (idx + 1) + ' ' + esc(v.name.toUpperCase()) + ' <b>' + fmtPts(v.points) + ' PTS</b>';
    }).join('<span class="sep">★</span>');

    var unit = 'LIVE STANDINGS FEED <span class="sep">★</span> CURRENT LEADER: <b>' + esc(leader.name.toUpperCase()) + ' (' + fmtPts(leader.points) + ' PTS)</b>' +
      '<span class="sep">★</span>' + topThree +
      '<span class="sep">★</span>' + activeCount + ' RANKED VIBERS · ' + fmtPts(totalPts) + ' TOTAL LEAGUE POINTS ON THE BOARD' +
      '<span class="sep">★</span> 60:00 ON THE CLOCK · VANCOUVER, BC <span class="sep">★</span> ';

    el.innerHTML = unit + unit;
  }

  function renderKpis() {
    var v = state.vibers;
    if (!v.length) return;
    var totalPts = v.reduce(function (s, x) { return s + x.points; }, 0);
    var maxNight = v.reduce(function (m, x) { return x.best_night > m ? x.best_night : m; }, 0);
    var bestHolder = v.filter(function (x) { return x.best_night === maxNight && maxNight > 0; }).map(function (x) { return x.name.split(' ')[0]; }).join(', ');
    var activeCount = v.filter(function (x) { return !x.isStandby; }).length;
    var standbyCount = v.length - activeCount;
    var leader = v[0];

    var kpiEl = document.getElementById('kpi-strip');
    if (!kpiEl) return;

    kpiEl.innerHTML =
      '<div class="kpi-cell">' +
        '<div class="kpi-label">01 · CURRENT LEADER</div>' +
        '<div class="kpi-val"><em>' + esc(leader.name.split(' ')[0]) + '</em></div>' +
        '<div class="kpi-sub">' + fmtPts(leader.points) + ' PTS · ' + leader.wins + ' WINS · ' + esc(leader.city) + '</div>' +
      '</div>' +
      '<div class="kpi-cell">' +
        '<div class="kpi-label">02 · LEAGUE POINTS</div>' +
        '<div class="kpi-val">' + fmtPts(totalPts) + '</div>' +
        '<div class="kpi-sub">ACROSS ' + activeCount + ' ACTIVE VIBERS</div>' +
      '</div>' +
      '<div class="kpi-cell is-blood">' +
        '<div class="kpi-label">03 · HIGHEST SINGLE NIGHT</div>' +
        '<div class="kpi-val">' + fmtPts(maxNight) + ' <em>PTS</em></div>' +
        '<div class="kpi-sub">HELD BY ' + esc(bestHolder || 'TBD') + ' (OF 12 MAX)</div>' +
      '</div>' +
      '<div class="kpi-cell">' +
        '<div class="kpi-label">04 · ACTIVE ROSTER</div>' +
        '<div class="kpi-val">' + pad(v.length) + '</div>' +
        '<div class="kpi-sub">' + activeCount + ' ON THE BOARD · ' + standbyCount + ' ON STANDBY</div>' +
      '</div>' +
      '<div class="kpi-cell is-blood">' +
        '<div class="kpi-label">05 · PEOPLE\'S CHOICE</div>' +
        '<div class="kpi-val">' + v.reduce(function (s, x) { return s + x.peoples_choice; }, 0) + '</div>' +
        '<div class="kpi-sub">CROWD CROWNS AWARDED</div>' +
      '</div>';

    // Update filter counts
    var counts = {
      all: v.length,
      active: activeCount,
      winners: v.filter(function (x) { return x.wins > 0; }).length,
      peoples_choice: v.filter(function (x) { return x.peoples_choice > 0; }).length,
      standby: standbyCount
    };
    Object.keys(counts).forEach(function (k) {
      var badge = document.querySelector('[data-filter-count="' + k + '"]');
      if (badge) badge.textContent = '(' + counts[k] + ')';
    });
  }

  function renderPodium() {
    var container = document.getElementById('podium-container');
    if (!container || !state.vibers.length) return;
    var top3 = state.vibers.slice(0, 3);
    var html = '';

    top3.forEach(function (v, idx) {
      var isFirst = idx === 0;
      var cornerPills = '';
      if (isFirst) {
        cornerPills += '<span class="vl-pill vl-pill-acid vl-pill-skew"><span>#1 LEADER</span></span>';
      } else {
        cornerPills += '<span class="vl-pill vl-pill-skew"><span>RANK #' + (idx + 1) + '</span></span>';
      }
      if (v.wins > 0) {
        cornerPills += '<span class="vl-pill vl-pill-skew" style="background:var(--ink);color:var(--acid);border:1px solid var(--acid)"><span>' + v.wins + (v.wins === 1 ? ' WIN' : ' WINS') + '</span></span>';
      }
      if (v.peoples_choice > 0) {
        cornerPills += '<span class="vl-pill vl-pill-skew"><span>★ PEOPLE\'S CHOICE</span></span>';
      }

      var toolsHtml = v.tools.map(function (t) {
        return '<span class="stack-pill"><i>' + esc(t) + '</i></span>';
      }).join('');

      html +=
        '<article class="podium-card rank-' + (idx + 1) + '" style="--i:' + idx + '" data-open-modal="' + esc(v.id) + '">' +
          '<div class="podium-visual">' +
            renderShot(v, { win: isFirst }) +
            '<div class="podium-corner-tag">' + cornerPills + '</div>' +
            '<span class="podium-rank-num">' + pad(idx + 1) + '</span>' +
            '<div class="podium-pts-overlay">' +
              '<div class="podium-pts-big">' + fmtPts(v.points) + '<small>PTS</small></div>' +
              '<span class="vl-label">' + v.episodes + (v.episodes === 1 ? ' NIGHT' : ' NIGHTS') + '</span>' +
            '</div>' +
          '</div>' +
          '<div class="podium-body">' +
            '<div class="podium-identity">' +
              '<h3 class="podium-name">' + esc(v.name) + '</h3>' +
              '<span class="podium-handle">' + esc(v.handle) + '</span>' +
            '</div>' +
            '<div class="podium-city">' + esc(v.city) + ' · SIGNATURE: "' + esc(v.signature_move || 'CLASSIFIED') + '"</div>' +
            '<p class="podium-known">' + esc(v.known_for || 'Ready for the clock.') + '</p>' +
            '<div class="podium-stack">' + toolsHtml + '</div>' +
            '<div class="podium-stats-row">' +
              '<div class="p-stat"><div class="p-stat-k">WINS</div><div class="p-stat-v is-acid">' + v.wins + '</div></div>' +
              '<div class="p-stat"><div class="p-stat-k">BEST NIGHT</div><div class="p-stat-v">' + fmtPts(v.best_night) + '</div></div>' +
              '<div class="p-stat"><div class="p-stat-k">LAST NIGHT</div><div class="p-stat-v">' + fmtPts(v.last_night) + '</div></div>' +
              '<div class="p-stat"><div class="p-stat-k">AVG / EP</div><div class="p-stat-v">' + fmtPts(v.ppg) + '</div></div>' +
            '</div>' +
          '</div>' +
        '</article>';
    });

    container.innerHTML = html;
  }

  function getFilteredAndSortedVibers() {
    var q = state.search.toLowerCase().trim();
    var list = state.vibers.filter(function (v) {
      if (state.filter === 'active' && v.isStandby) return false;
      if (state.filter === 'winners' && v.wins <= 0) return false;
      if (state.filter === 'peoples_choice' && v.peoples_choice <= 0) return false;
      if (state.filter === 'standby' && !v.isStandby) return false;
      if (q) {
        var hay = [v.name, v.handle, v.city, v.builds_with, v.signature_move, v.known_for, v.favourite_build, v.id].join(' ').toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });

    var dir = state.sortDir === 'asc' ? 1 : -1;
    list.sort(function (a, b) {
      var k = state.sortBy;
      if (k === 'rank') return (a.rank - b.rank) * dir;
      if (k === 'name') return a.name.localeCompare(b.name) * dir;
      if (k === 'city') return a.city.localeCompare(b.city) * dir;
      var diff = (a[k] - b[k]) * dir;
      return diff !== 0 ? diff : (a.rank - b.rank);
    });
    return list;
  }

  function renderTable() {
    var tbody = document.getElementById('lb-tbody');
    if (!tbody) return;
    var maxPts = state.vibers.reduce(function (m, x) { return x.points > m ? x.points : m; }, 1);
    var rows = getFilteredAndSortedVibers();

    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:48px 20px;color:var(--paper-40);font-family:var(--font-label);letter-spacing:.2em;font-size:15px">NO VIBERS MATCH YOUR FILTER CRITERIA.</td></tr>';
      return;
    }

    var html = '';
    rows.forEach(function (v) {
      var isFirst = v.rank === 1;
      var isExpanded = !!state.expandedIds[v.id];
      var isChanged = !!state.changedIds[v.id];
      var pct = Math.max(2, Math.round((v.points / maxPts) * 100));

      var rowCls = 'lb-row' +
        (isFirst ? ' first' : '') +
        (v.rank === 2 ? ' rank-2' : '') +
        (v.rank === 3 ? ' rank-3' : '') +
        (v.isStandby ? ' is-standby' : '') +
        (isExpanded ? ' is-expanded' : '') +
        (isChanged ? ' just-updated' : '');

      var badges = '';
      if (v.wins > 0) badges += '<span class="mini-tag win-tag"><i>' + v.wins + 'W</i></span>';
      if (v.peoples_choice > 0) badges += '<span class="mini-tag pc-tag"><i>★ PC</i></span>';
      if (v.isStandby) badges += '<span class="mini-tag standby-tag"><i>STANDBY</i></span>';

      var stackPills = v.tools.slice(0, 3).map(function (t) {
        return '<span class="stack-pill"><i>' + esc(t) + '</i></span>';
      }).join(' ');

      html +=
        '<tr class="' + rowCls + '" data-toggle-row="' + esc(v.id) + '">' +
          '<td class="rank-cell">' + pad(v.rank) + '</td>' +
          '<td>' +
            '<div class="who-cell">' +
              renderShot(v, { round: true, decor: true, win: isFirst }) +
              '<div class="who-info">' +
                '<div class="who-name-row">' +
                  '<span class="who-name">' + esc(v.name) + '</span>' +
                  '<span class="who-handle">' + esc(v.handle) + '</span>' +
                  '<span class="badge-row">' + badges + '</span>' +
                '</div>' +
                '<div class="who-sub">' +
                  '<span class="who-city">' + esc(v.city) + '</span>' +
                  (v.signature_move ? '<span>· "' + esc(v.signature_move) + '"</span>' : '') +
                '</div>' +
              '</div>' +
            '</div>' +
          '</td>' +
          '<td><div style="display:flex;gap:5px;flex-wrap:wrap">' + stackPills + '</div></td>' +
          '<td class="num">' + v.episodes + '</td>' +
          '<td class="num" style="color:' + (v.wins > 0 ? 'var(--acid);font-weight:700' : 'var(--paper-40)') + '">' + v.wins + '</td>' +
          '<td class="num" style="color:' + (v.peoples_choice > 0 ? 'var(--blood);font-weight:700' : 'var(--paper-40)') + '">' + v.peoples_choice + '</td>' +
          '<td class="center">' + (v.yellow_cards > 0 ? '<span class="yc-box" title="' + v.yellow_cards + ' Yellow Card (-1 pt)">' + v.yellow_cards + '</span>' : '<span class="yc-none">—</span>') + '</td>' +
          '<td class="num">' + fmtPts(v.best_night) + ' <span style="color:var(--paper-40);font-size:12px">/ ' + fmtPts(v.last_night) + '</span></td>' +
          '<td class="num">' +
            '<div class="pts-cell-wrap">' +
              '<div class="pts-bar-outer"><div class="pts-bar-inner" style="width:' + (v.points > 0 ? pct : 0) + '%"></div></div>' +
              '<span class="pts-val">' + fmtPts(v.points) + '</span>' +
            '</div>' +
          '</td>' +
        '</tr>';

      if (isExpanded) {
        html +=
          '<tr class="dossier-row">' +
            '<td colspan="9">' +
              '<div class="dossier-drawer">' +
                '<div>' +
                  '<div class="dossier-block-k">KNOWN ON THE CARD FOR</div>' +
                  '<div class="dossier-block-v">' + esc(v.known_for || 'Awaiting debut night on the clock.') + '</div>' +
                '</div>' +
                '<div>' +
                  '<div class="dossier-block-k">SIGNATURE MOVE</div>' +
                  '<div class="dossier-quote">"' + esc(v.signature_move || 'Unrevealed') + '"</div>' +
                  '<div class="dossier-block-k" style="margin-top:12px">BUILDS WITH</div>' +
                  '<div class="dossier-block-v">' + esc(v.builds_with || 'Classified') + '</div>' +
                '</div>' +
                '<div>' +
                  '<div class="dossier-block-k">FAVOURITE BUILD</div>' +
                  '<div class="dossier-block-v">' + esc(v.favourite_build || 'Yet to be built on the clock') + '</div>' +
                  '<div class="dossier-block-k" style="margin-top:12px">PERFORMANCE TELEMETRY</div>' +
                  '<div class="dossier-block-v">Avg <strong>' + fmtPts(v.ppg) + ' pts/night</strong> · Best <strong>' + fmtPts(v.best_night) + '</strong> · Last <strong>' + fmtPts(v.last_night) + '</strong></div>' +
                '</div>' +
                '<div style="display:flex;align-items:center">' +
                  '<button type="button" class="hud-btn" data-open-modal="' + esc(v.id) + '"><span>FULL DOSSIER →</span></button>' +
                '</div>' +
              '</div>' +
            '</td>' +
          '</tr>';
      }
    });

    tbody.innerHTML = html;

    // Update sort headers UI
    document.querySelectorAll('table.pts-live thead th.sortable').forEach(function (th) {
      var key = th.getAttribute('data-sort');
      var arrow = th.querySelector('.sort-arrow');
      if (key === state.sortBy) {
        th.classList.add('is-sorted');
        if (arrow) arrow.textContent = state.sortDir === 'asc' ? '▲' : '▼';
      } else {
        th.classList.remove('is-sorted');
        if (arrow) arrow.textContent = '';
      }
    });
  }

  function renderRosterCards() {
    var grid = document.getElementById('roster-cards-grid');
    if (!grid) return;
    var html = '';
    state.vibers.forEach(function (v) {
      var isFirst = v.rank === 1;
      var toolsHtml = v.tools.map(function (t) {
        return '<span class="stack-pill"><i>' + esc(t) + '</i></span>';
      }).join('');

      html +=
        '<article class="fighter-card' + (isFirst ? ' is-leader' : '') + '" data-open-modal="' + esc(v.id) + '">' +
          '<div class="fighter-top">' +
            '<div class="fighter-shot-wrap">' +
              renderShot(v, { win: isFirst }) +
              '<span class="fighter-rk">#' + pad(v.rank) + '</span>' +
            '</div>' +
            '<div class="fighter-head-meta">' +
              '<div class="f-tag">' + esc(v.city) + ' · ' + (v.isStandby ? 'STANDBY' : v.episodes + (v.episodes === 1 ? ' NIGHT' : ' NIGHTS')) + '</div>' +
              '<h3 class="f-name">' + esc(v.name) + '</h3>' +
              '<div class="f-handle">' + esc(v.handle) + ' · ID ' + esc(v.id.toUpperCase()) + '</div>' +
              '<div class="f-pts"><b>' + fmtPts(v.points) + '</b><span>PTS</span>' +
                (v.wins > 0 ? '<span style="color:var(--acid);margin-left:6px">· ' + v.wins + 'W</span>' : '') +
                (v.peoples_choice > 0 ? '<span style="color:var(--blood);margin-left:4px">· ★ PC</span>' : '') +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="fighter-body">' +
            '<div>' +
              '<div class="f-field-k">SIGNATURE MOVE</div>' +
              '<div class="f-field-v"><strong>"' + esc(v.signature_move || 'Unknown') + '"</strong></div>' +
            '</div>' +
            '<div>' +
              '<div class="f-field-k">THE BOOK ON THEM</div>' +
              '<div class="f-field-v">' + esc(v.known_for || 'Named for the card.') + '</div>' +
            '</div>' +
            (v.favourite_build ? (
              '<div>' +
                '<div class="f-field-k">FAVOURITE BUILD</div>' +
                '<div class="f-field-v">' + esc(v.favourite_build) + '</div>' +
              '</div>'
            ) : '') +
            '<div class="fighter-foot">' +
              '<div style="display:flex;gap:5px;flex-wrap:wrap">' + toolsHtml + '</div>' +
              '<span class="vl-label" style="font-size:11px;white-space:nowrap">INSPECT →</span>' +
            '</div>' +
          '</div>' +
        '</article>';
    });
    grid.innerHTML = html;
  }

  function openFighterModal(id) {
    var v = state.previousMap[id];
    if (!v) return;
    state.modalId = id;
    var backdrop = document.getElementById('fighter-modal-backdrop');
    var body = document.getElementById('fighter-modal-body');
    if (!backdrop || !body) return;

    var toolsHtml = v.tools.map(function (t) {
      return '<span class="stack-pill"><i>' + esc(t) + '</i></span>';
    }).join('');

    body.innerHTML =
      '<div class="vl-modal-grid">' +
        '<div class="vl-modal-visual">' +
          renderShot(v, { win: v.rank === 1 }) +
        '</div>' +
        '<div class="vl-modal-content">' +
          '<div>' +
            '<div class="modal-kicker">RANK #' + pad(v.rank) + ' · ' + esc(v.city) + ' · ID ' + esc(v.id.toUpperCase()) + '</div>' +
            '<h2 class="modal-name">' + esc(v.name) + '</h2>' +
            '<div class="podium-handle" style="margin-top:4px">' + esc(v.handle) + '</div>' +
          '</div>' +
          '<div class="modal-stats-strip">' +
            '<div><div class="p-stat-k">POINTS</div><div class="p-stat-v is-acid">' + fmtPts(v.points) + '</div></div>' +
            '<div><div class="p-stat-k">NIGHTS</div><div class="p-stat-v">' + v.episodes + '</div></div>' +
            '<div><div class="p-stat-k">WINS</div><div class="p-stat-v is-acid">' + v.wins + '</div></div>' +
            '<div><div class="p-stat-k">CROWD ★</div><div class="p-stat-v is-blood">' + v.peoples_choice + '</div></div>' +
            '<div><div class="p-stat-k">BEST / LAST</div><div class="p-stat-v">' + fmtPts(v.best_night) + '/' + fmtPts(v.last_night) + '</div></div>' +
          '</div>' +
          '<div class="modal-detail-grid">' +
            '<div>' +
              '<div class="dossier-block-k">SIGNATURE MOVE</div>' +
              '<div class="dossier-quote">"' + esc(v.signature_move || 'Unknown') + '"</div>' +
            '</div>' +
            '<div>' +
              '<div class="dossier-block-k">FAVOURITE BUILD</div>' +
              '<div class="dossier-block-v">' + esc(v.favourite_build || 'Not yet recorded on the clock') + '</div>' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<div class="dossier-block-k">SCOUTING REPORT / KNOWN FOR</div>' +
            '<div class="dossier-block-v">' + esc(v.known_for || 'Standby contender.') + '</div>' +
          '</div>' +
          '<div>' +
            '<div class="dossier-block-k">AI WEAPONRY & STACK</div>' +
            '<div class="podium-stack" style="margin-top:6px">' + toolsHtml + '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    backdrop.classList.add('is-open');
    backdrop.setAttribute('aria-hidden', 'false');
  }

  function closeFighterModal() {
    state.modalId = null;
    var backdrop = document.getElementById('fighter-modal-backdrop');
    if (backdrop) {
      backdrop.classList.remove('is-open');
      backdrop.setAttribute('aria-hidden', 'true');
    }
  }

  function renderAll() {
    renderTicker();
    renderKpis();
    renderPodium();
    renderTable();
    renderRosterCards();
    if (state.modalId && state.previousMap[state.modalId]) {
      openFighterModal(state.modalId);
    }
  }

  // ---------- Ambient Hero Canvas (Sparks + Turning 60-Tick Clock Ring) ----------
  function initHeroCanvas() {
    var canvas = document.querySelector('.lb-hero-fx');
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var ctx = canvas.getContext('2d');
    var w = 0, h = 0;
    var sparks = [];

    function resize() {
      var rect = canvas.parentElement.getBoundingClientRect();
      w = canvas.width = rect.width;
      h = canvas.height = rect.height;
    }
    resize();
    window.addEventListener('resize', resize);

    for (var i = 0; i < 32; i++) {
      sparks.push({
        x: Math.random() * 1400,
        y: Math.random() * 500,
        vy: -0.25 - Math.random() * 0.65,
        vx: (Math.random() - 0.5) * 0.35,
        s: 1.5 + Math.random() * 2.5,
        acid: Math.random() > 0.32
      });
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      sparks.forEach(function (p) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        ctx.fillStyle = p.acid ? 'rgba(232,255,42,0.32)' : 'rgba(255,43,43,0.32)';
        ctx.fillRect(p.x, p.y, p.s, p.s);
      });
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  }

  // ---------- Event Bindings ----------
  function bindEvents() {
    // Filter buttons
    document.querySelectorAll('[data-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('[data-filter]').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        state.filter = btn.getAttribute('data-filter');
        renderTable();
      });
    });

    // Search input
    var searchInput = document.getElementById('lb-search');
    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        state.search = e.target.value;
        renderTable();
      });
    }

    // Table column sorting
    document.querySelectorAll('table.pts-live thead th.sortable').forEach(function (th) {
      th.addEventListener('click', function () {
        var key = th.getAttribute('data-sort');
        if (state.sortBy === key) {
          state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
        } else {
          state.sortBy = key;
          state.sortDir = (key === 'rank' || key === 'name' || key === 'city') ? 'asc' : 'desc';
        }
        renderTable();
      });
    });

    // Polling interval chips
    document.querySelectorAll('[data-poll-ms]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        document.querySelectorAll('[data-poll-ms]').forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        state.pollIntervalMs = parseInt(chip.getAttribute('data-poll-ms'), 10) || 10000;
        state.isPaused = false;
        var pauseBtn = document.getElementById('btn-toggle-poll');
        if (pauseBtn) {
          pauseBtn.classList.remove('is-paused');
          pauseBtn.innerHTML = '<span>PAUSE</span>';
        }
        state.nextSyncAt = performance.now() + state.pollIntervalMs;
        updateHudStatus('LIVE · FEED LOCKED', '');
      });
    });

    // Force Sync Now button
    var syncNowBtn = document.getElementById('btn-sync-now');
    if (syncNowBtn) {
      syncNowBtn.addEventListener('click', function () {
        fetchSheetData();
      });
    }

    // Pause / Resume Polling button
    var pauseBtn = document.getElementById('btn-toggle-poll');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', function () {
        state.isPaused = !state.isPaused;
        if (state.isPaused) {
          pauseBtn.classList.add('is-paused');
          pauseBtn.innerHTML = '<span>RESUME</span>';
          updateHudStatus('POLLING PAUSED', '');
        } else {
          pauseBtn.classList.remove('is-paused');
          pauseBtn.innerHTML = '<span>PAUSE</span>';
          state.nextSyncAt = performance.now() + state.pollIntervalMs;
          updateHudStatus('LIVE · FEED LOCKED', '');
          fetchSheetData();
        }
      });
    }

    // Delegated clicks for table row expand & modal triggers
    document.addEventListener('click', function (e) {
      var modalTrigger = e.target.closest('[data-open-modal]');
      if (modalTrigger) {
        e.stopPropagation();
        openFighterModal(modalTrigger.getAttribute('data-open-modal'));
        return;
      }

      var rowTrigger = e.target.closest('[data-toggle-row]');
      if (rowTrigger) {
        var id = rowTrigger.getAttribute('data-toggle-row');
        state.expandedIds[id] = !state.expandedIds[id];
        renderTable();
        return;
      }

      if (e.target.id === 'fighter-modal-backdrop' || e.target.closest('[data-close-modal]')) {
        closeFighterModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && state.modalId) {
        closeFighterModal();
      }
    });
  }

  // ---------- Boot ----------
  function init() {
    // Paint immediately with fallback data so there is zero layout shift while first fetch resolves
    state.vibers = normalizeRows(FALLBACK_VIBERS);
    state.vibers.forEach(function (v) { state.previousMap[v.id] = v; });
    renderAll();

    bindEvents();
    initHeroCanvas();
    fetchSheetData();
    startPollingLoop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
