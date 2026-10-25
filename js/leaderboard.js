/* ==========================================================================
   VIBERS LEAGUE V3.0 KINETIC OVERTAKE EDITION —
   FLIP ROW SWAP ANIMATIONS, DIRECTIONAL ARROWS, CHAMPIONSHIP CORONATION
   ("DAVE TAKES THE LEAD" ON ?simulate_ranking_change=1), TALE OF THE TAPE,
   5-AXIS RADAR CHARTS, RINGSIDE SOUND FX & LIVE GOOGLE SHEET POLLING
   ========================================================================== */
(function () {
  'use strict';

  var SHEET_ID = '17f1nH3vcuk-pPknxTF1mcL6tn9v_gsexvFAlDhfq_lk';
  var GVIZ_JSON_URL = 'https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?tqx=out:json';
  var GVIZ_CSV_URL  = 'https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?tqx=out:csv';

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

  // Application State
  var state = {
    vibers: [],
    rawSheetRows: [],
    previousMap: {},
    changedIds: {},
    rankDeltaMap: {},
    pointsDeltaMap: {},
    coronatedId: null,
    filter: 'all',
    toolFilter: '',
    search: '',
    sortBy: 'rank',
    sortDir: 'asc',
    expandedIds: {},
    modalId: null,
    vsLeftId: 'v011',
    vsRightId: 'v008',
    pollIntervalMs: 10000,
    isPaused: false,
    isSyncing: false,
    isSimulating: false,
    choreographyRunning: false,
    soundEnabled: false,
    tvMode: false,
    syncCount: 0,
    lastSyncTime: null,
    nextSyncAt: 0,
    feedLog: []
  };

  // ---------- Web Audio API Synthesizer (Ringside Bell, Fanfare & Telemetry Beeps) ----------
  var audioCtx = null;
  function ensureAudio() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      audioCtx = new Ctx();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playRingsideBell(force) {
    if (!state.soundEnabled && !force) return;
    try {
      ensureAudio();
      if (!audioCtx) return;
      var now = audioCtx.currentTime;
      var freqs = [587.33, 1174.66, 1760, 2489.02];
      freqs.forEach(function (f, idx) {
        var osc = audioCtx.createOscillator();
        var gain = audioCtx.createGain();
        osc.type = idx % 2 === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(f, now);
        gain.gain.setValueAtTime(0.18 / (idx + 1), now);
        gain.gain.exponentialRampToValueAtTime(0.0008, now + 1.45);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 1.5);
      });
    } catch (e) {}
  }

  function playSyncPulse() {
    if (!state.soundEnabled) return;
    try {
      ensureAudio();
      if (!audioCtx) return;
      var now = audioCtx.currentTime;
      var osc = audioCtx.createOscillator();
      var gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.08);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {}
  }

  // ---------- Toast Notification ----------
  var toastTimer = 0;
  function showBellToast(title, sub) {
    var toast = document.getElementById('bell-toast');
    var tEl = document.getElementById('bell-toast-title');
    var sEl = document.getElementById('bell-toast-sub');
    if (!toast || !tEl || !sEl) return;
    tEl.textContent = title;
    sEl.textContent = sub;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 4500);
  }

  // ---------- Full-Screen Championship Coronation ("DAVE TAKES THE LEAD") ----------
  var takeoverTimer = 0;
  function triggerLeadTakeoverSplash(viber, ptGain, oldRank) {
    var overlay = document.getElementById('lead-takeover-overlay');
    var cardBody = document.getElementById('lead-takeover-body');
    var canvas = document.getElementById('lead-takeover-confetti');
    if (!overlay || !cardBody || !viber) return;

    var firstName = viber.name.split(' ')[0].toUpperCase();
    cardBody.innerHTML =
      '<div class="lead-takeover-inner">' +
        '<div class="lead-takeover-shot">' +
          renderShot(viber, { win: true }) +
        '</div>' +
        '<div>' +
          '<div class="lead-takeover-kicker">★ NEW #1 LEADER ON THE CARD · UP FROM #' + pad(oldRank || 3) + ' ★</div>' +
          '<div class="lead-takeover-headline">' +
            esc(firstName) + ' TAKES' +
            '<em>THE LEAD!</em>' +
          '</div>' +
          '<div class="lead-takeover-sub">' +
            '<b>' + fmtPts(viber.points) + ' PTS</b>' +
            '<span>' + (ptGain > 0 ? '+' + fmtPts(ptGain) + ' PT NIGHT CALL · ' : '') + viber.wins + ' WINS · ' + esc(viber.city) + '</span>' +
          '</div>' +
        '</div>' +
      '</div>';

    overlay.classList.add('is-active');
    overlay.setAttribute('aria-hidden', 'false');

    // Burst acid/blood confetti sparks on the takeover canvas
    if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var ctx = canvas.getContext('2d');
      var w = canvas.width = window.innerWidth;
      var h = canvas.height = window.innerHeight;
      var particles = [];
      for (var i = 0; i < 95; i++) {
        var angle = Math.random() * Math.PI * 2;
        var speed = 4 + Math.random() * 14;
        particles.push({
          x: w / 2,
          y: h / 2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 3,
          w: 6 + Math.random() * 10,
          h: 4 + Math.random() * 6,
          rot: Math.random() * Math.PI,
          vrot: (Math.random() - 0.5) * 0.25,
          color: i % 3 === 0 ? '#ff2b2b' : (i % 5 === 0 ? '#f3efe6' : '#e8ff2a')
        });
      }
      var start = performance.now();
      function drawBurst(now) {
        if (now - start > 2600) {
          ctx.clearRect(0, 0, w, h);
          return;
        }
        ctx.clearRect(0, 0, w, h);
        particles.forEach(function (p) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.28; // gravity
          p.vx *= 0.985;
          p.rot += p.vrot;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        });
        requestAnimationFrame(drawBurst);
      }
      requestAnimationFrame(drawBurst);
    }

    clearTimeout(takeoverTimer);
    takeoverTimer = setTimeout(function () {
      overlay.classList.remove('is-active');
      overlay.setAttribute('aria-hidden', 'true');
    }, 2650);
  }

  // ---------- Live Event Feed Log ----------
  function pushFeedLog(tag, msg, isSim) {
    var nowStr = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    state.feedLog.unshift({ time: nowStr, tag: tag, msg: msg, isSim: !!isSim });
    if (state.feedLog.length > 16) state.feedLog.pop();
    renderFeedLog();
  }

  function renderFeedLog() {
    var el = document.getElementById('hud-feed-log');
    if (!el) return;
    el.innerHTML = state.feedLog.map(function (item) {
      return '<div class="hud-log-entry' + (item.isSim ? ' is-sim' : '') + '">' +
        '<span class="t">' + esc(item.time) + '</span>' +
        '<span class="tag">[' + esc(item.tag) + ']</span>' +
        '<span class="msg">' + esc(item.msg) + '</span>' +
      '</div>';
    }).join('');
  }

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

  // 5-Axis Combat Radar Polygon SVG Generator
  function buildRadarSvg(v1, v2) {
    var size = 240;
    var cx = size / 2;
    var cy = size / 2;
    var rMax = 78;
    var labels = ['POINTS', 'WINS', 'PEAK NIGHT', 'CROWD ★', 'PACE / EP'];

    function getMetrics(v) {
      if (!v) return [0.1, 0.1, 0.1, 0.1, 0.1];
      return [
        Math.min(1, Math.max(0.12, v.points / 36)),
        Math.min(1, Math.max(0.12, v.wins / 3)),
        Math.min(1, Math.max(0.12, v.best_night / 12)),
        Math.min(1, Math.max(0.12, v.peoples_choice / 2)),
        Math.min(1, Math.max(0.12, (v.ppg / 12) - (v.yellow_cards * 0.08)))
      ];
    }

    function polyPoints(vals) {
      return vals.map(function (val, idx) {
        var angle = (Math.PI * 2 * idx) / 5 - Math.PI / 2;
        var x = cx + Math.cos(angle) * (rMax * val);
        var y = cy + Math.sin(angle) * (rMax * val);
        return x.toFixed(1) + ',' + y.toFixed(1);
      }).join(' ');
    }

    var rings = [0.33, 0.66, 1].map(function (scale) {
      var pts = [0, 1, 2, 3, 4].map(function (idx) {
        var angle = (Math.PI * 2 * idx) / 5 - Math.PI / 2;
        var x = cx + Math.cos(angle) * (rMax * scale);
        var y = cy + Math.sin(angle) * (rMax * scale);
        return x.toFixed(1) + ',' + y.toFixed(1);
      }).join(' ');
      return '<polygon points="' + pts + '" fill="none" stroke="rgba(243,239,230,0.14)" stroke-width="1"/>';
    }).join('');

    var spokes = [0, 1, 2, 3, 4].map(function (idx) {
      var angle = (Math.PI * 2 * idx) / 5 - Math.PI / 2;
      var x = cx + Math.cos(angle) * rMax;
      var y = cy + Math.sin(angle) * rMax;
      var lx = cx + Math.cos(angle) * (rMax + 24);
      var ly = cy + Math.sin(angle) * (rMax + 18);
      return '<line x1="' + cx + '" y1="' + cy + '" x2="' + x.toFixed(1) + '" y2="' + y.toFixed(1) + '" stroke="rgba(243,239,230,0.14)" stroke-width="1"/>' +
        '<text x="' + lx.toFixed(1) + '" y="' + (ly + 3).toFixed(1) + '" text-anchor="middle" fill="rgba(243,239,230,0.7)" font-family="Barlow Condensed, sans-serif" font-weight="800" font-style="italic" font-size="10" letter-spacing="1.5">' + labels[idx] + '</text>';
    }).join('');

    var p1 = polyPoints(getMetrics(v1));
    var p2 = v2 ? polyPoints(getMetrics(v2)) : '';

    return '<svg viewBox="0 0 ' + size + ' ' + size + '" width="100%" height="220" style="overflow:visible">' +
      rings + spokes +
      (v2 ? '<polygon points="' + p2 + '" fill="rgba(255,43,43,0.24)" stroke="#ff2b2b" stroke-width="2"/>' : '') +
      '<polygon points="' + p1 + '" fill="rgba(232,255,42,0.28)" stroke="#e8ff2a" stroke-width="2.5"/>' +
      '</svg>';
  }

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

  // ---------- Parsers ----------
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

  // ---------- FLIP Row Position Measurement & Physical Slide Animation ----------
  function captureRowPositions() {
    var positions = {};
    document.querySelectorAll('#lb-tbody tr.lb-row[data-viber-id]').forEach(function (tr) {
      var id = tr.getAttribute('data-viber-id');
      positions[id] = tr.getBoundingClientRect().top;
    });
    return positions;
  }

  function playFlipRowAnimation(prevTops, deltas) {
    if (!prevTops || Object.keys(prevTops).length === 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var rows = document.querySelectorAll('#lb-tbody tr.lb-row[data-viber-id]');
    rows.forEach(function (tr) {
      var id = tr.getAttribute('data-viber-id');
      var oldTop = prevTops[id];
      if (oldTop === undefined) return;
      var newTop = tr.getBoundingClientRect().top;
      var dy = oldTop - newTop;
      if (Math.abs(dy) < 2) return;

      var rankDelta = (deltas && deltas[id]) || 0;
      var movingUp = dy > 0; // New position is higher on page (smaller top)

      // 1. Invert: snap to old position immediately
      tr.style.transition = 'none';
      tr.style.transform = 'translateY(' + dy + 'px)' + (movingUp ? ' scale(1.025)' : ' scale(0.99)');
      tr.classList.add(movingUp ? 'is-overtaking-up' : 'is-overtaking-down');

      // Force browser layout reflow
      void tr.offsetHeight;

      // 2. Play: glide smoothly to new rank position
      tr.style.transition = 'transform 1.05s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 1.05s ease';
      tr.style.transform = 'translateY(0) scale(1)';

      setTimeout(function () {
        tr.style.transition = '';
        tr.style.transform = '';
        tr.classList.remove('is-overtaking-up', 'is-overtaking-down');
      }, 1150);
    });
  }

  // ---------- Apply Incoming Data, Diff Ranks, Animate FLIP & Coronation ----------
  function applyNormalizedData(normalized, sourceTag, opts) {
    opts = opts || {};
    var prevTops = captureRowPositions();
    var newChanged = {};
    var hasChanges = false;
    var deltas = {};
    var ptDeltas = {};
    var previousLeaderId = state.vibers.length ? state.vibers[0].id : null;
    var newLeaderCoronated = null;
    var oldRankOfNewLeader = 1;

    if (Object.keys(state.previousMap).length > 0) {
      normalized.forEach(function (v) {
        var prev = state.previousMap[v.id];
        if (!prev) {
          newChanged[v.id] = true;
          hasChanges = true;
        } else {
          if (prev.rank !== v.rank) {
            deltas[v.id] = prev.rank - v.rank; // positive = climbed up
          }
          if (prev.points !== v.points) {
            ptDeltas[v.id] = v.points - prev.points;
          }
          if (prev.points !== v.points ||
              prev.rank !== v.rank ||
              prev.wins !== v.wins ||
              prev.episodes !== v.episodes ||
              prev.peoples_choice !== v.peoples_choice ||
              prev.yellow_cards !== v.yellow_cards) {
            newChanged[v.id] = true;
            hasChanges = true;
            var ptDiff = v.points - prev.points;
            var msg = v.name + (ptDiff > 0 ? ' +' + fmtPts(ptDiff) + ' PTS' : ' UPDATED') + ' → RANK #' + pad(v.rank) + ' (' + fmtPts(v.points) + ' PTS)';
            pushFeedLog(sourceTag || 'CALL', msg, sourceTag === 'SIM' || sourceTag === 'OVERTAKE');
            showBellToast(v.name.toUpperCase() + ' ON THE BOARD!', msg);

            if (v.rank === 1 && prev.rank > 1) {
              newLeaderCoronated = v;
              oldRankOfNewLeader = prev.rank;
            }
          }
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
    if (Object.keys(deltas).length > 0) {
      state.rankDeltaMap = deltas;
    }
    if (Object.keys(ptDeltas).length > 0) {
      state.pointsDeltaMap = ptDeltas;
    }
    if (newLeaderCoronated) {
      state.coronatedId = newLeaderCoronated.id;
    }

    if (hasChanges) {
      if (state.syncCount > 1 || sourceTag === 'SIM' || sourceTag === 'OVERTAKE') {
        playRingsideBell(opts.forceBell);
      }
      renderAll();
      playFlipRowAnimation(prevTops, deltas);

      if (newLeaderCoronated && (opts.showTakeoverSplash || sourceTag === 'OVERTAKE' || sourceTag === 'SIM')) {
        triggerLeadTakeoverSplash(
          newLeaderCoronated,
          ptDeltas[newLeaderCoronated.id] || 0,
          oldRankOfNewLeader
        );
      }

      if (Object.keys(newChanged).length > 0) {
        setTimeout(function () {
          state.changedIds = {};
        }, 3200);
      }
    }
  }

  // ---------- Choreographed "DAVE TAKES THE LEAD" Sequence (?simulate_ranking_change=1) ----------
  function runDaveTakesTheLeadChoreography(realRowsInput) {
    if (state.choreographyRunning) return;
    state.choreographyRunning = true;

    var baseList = (realRowsInput && realRowsInput.length ? realRowsInput : (state.rawSheetRows.length ? state.rawSheetRows : FALLBACK_VIBERS)).map(function (r) {
      return Object.assign({}, r);
    });

    // Stage 1 ("BEFORE NIGHT 3 CALL"):
    // Put Dave Thomas at 20 pts (2 episodes, 1 win) so he sits at #3 behind Ollie (27 pts, #1) and Zachary/Raphael (22 pts, #2)
    var preCallRows = baseList.map(function (r) {
      var copy = Object.assign({}, r);
      if (String(copy.id).trim() === 'v011' || /dave/i.test(copy.name)) {
        copy.points = 20;
        copy.episodes = 2;
        copy.wins = 1;
        copy.peoples_choice = 0;
        copy.best_night = 11;
        copy.last_night = 9;
      }
      return copy;
    });

    var preNormalized = normalizeRows(preCallRows);
    state.rankDeltaMap = {};
    state.pointsDeltaMap = {};
    state.coronatedId = null;
    state.vibers = preNormalized;
    state.previousMap = {};
    preNormalized.forEach(function (v) { state.previousMap[v.id] = v; });

    renderAll();
    updateHudStatus('NIGHT 03 · THE CALL INCOMING...', 'is-syncing');
    pushFeedLog('CALL', 'NIGHT 03 SCORECARDS SEALED · OLLIE LEADS AT 27 PTS, DAVE #03 AT 20 PTS', true);
    showBellToast('NIGHT 03 · THE CALL IS IN!', 'READING WHALE, SHARK & CROWD SCORECARDS...');

    // Scroll smoothly so both the Podium & Standings Table are visible for the overtake
    var standingsEl = document.getElementById('standings');
    if (standingsEl && window.scrollY < 120) {
      setTimeout(function () {
        standingsEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 350);
    }

    // Stage 2 (1.6 seconds later): The Call drops! Dave scores an 11-point clean sweep (+11 pts -> 31 pts)
    // and rockets from #3 past Zachary, Raphael, and Ollie to take #1 on the board!
    setTimeout(function () {
      var finalNormalized = normalizeRows(baseList);
      updateHudStatus('★ DAVE TAKES THE LEAD! ★', '');
      applyNormalizedData(finalNormalized, 'OVERTAKE', {
        showTakeoverSplash: true,
        forceBell: false
      });
      state.choreographyRunning = false;
    }, 1750);
  }

  // ---------- Live Polling System ----------
  function fetchSheetData(opts) {
    opts = opts || {};
    if (state.isSyncing || state.choreographyRunning) return Promise.resolve();
    if (state.isSimulating && !opts.initialBoot) {
      simulateFightNightCall();
      return Promise.resolve();
    }
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
        return fetch(GVIZ_CSV_URL + cacheBust, { cache: 'no-store' })
          .then(function (res) {
            if (!res.ok) throw new Error('CSV HTTP ' + res.status);
            return res.text();
          })
          .then(parseCsv);
      })
      .then(function (result) {
        state.rawSheetRows = result.rows;
        var normalized = normalizeRows(result.rows);
        state.syncCount++;
        state.lastSyncTime = new Date();
        state.isSyncing = false;
        state.nextSyncAt = performance.now() + state.pollIntervalMs;

        playSyncPulse();
        if (state.syncCount === 1) {
          pushFeedLog('SYNC', 'LOCKED ONTO GOOGLE SHEET · ' + normalized.length + ' VIBERS LOADED', false);
        } else {
          pushFeedLog('POLL #' + pad(state.syncCount), 'G-SHEET VERIFIED · ALL SCORECARDS FRESH', false);
        }

        updateHudStatus(state.isPaused ? 'POLLING PAUSED' : 'LIVE · FEED LOCKED', '');
        updateTelemetryStats();

        if (opts.runChoreographyOnLoad) {
          runDaveTakesTheLeadChoreography(result.rows);
        } else {
          applyNormalizedData(normalized, 'LIVE');
        }
      })
      .catch(function (err) {
        console.warn('Live sheet poll error:', err);
        state.isSyncing = false;
        state.nextSyncAt = performance.now() + state.pollIntervalMs;
        updateHudStatus('RETRYING FEED...', 'is-error');
        pushFeedLog('WARN', 'NETWORK HICCUP · RETRYING NEXT CYCLE', false);
        if (opts.runChoreographyOnLoad) {
          runDaveTakesTheLeadChoreography(FALLBACK_VIBERS);
        } else if (!state.vibers.length) {
          state.vibers = normalizeRows(FALLBACK_VIBERS);
          renderAll();
        }
      });
  }

  // ---------- Live Fight-Night Simulator ----------
  function simulateFightNightCall() {
    if (!state.vibers.length || state.choreographyRunning) return;
    var cloned = state.vibers.map(function (v) { return Object.assign({}, v); });
    var idx = Math.floor(Math.random() * cloned.length);
    var target = cloned[idx];
    var addedPts = [4, 6, 8, 10, 11, 12][Math.floor(Math.random() * 6)];
    target.points += addedPts;
    target.episodes += 1;
    target.last_night = addedPts;
    if (addedPts > target.best_night) target.best_night = addedPts;
    if (addedPts >= 9) target.wins += 1;
    if (addedPts >= 11) target.peoples_choice += 1;

    state.syncCount++;
    state.lastSyncTime = new Date();
    state.nextSyncAt = performance.now() + state.pollIntervalMs;
    updateTelemetryStats();
    var normalized = normalizeRows(cloned);
    applyNormalizedData(normalized, 'SIM', { showTakeoverSplash: true });
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

  function startPollingLoop() {
    state.nextSyncAt = performance.now() + state.pollIntervalMs;
    var countEl = document.getElementById('hud-countdown-val');
    var barEl = document.getElementById('hud-bar-fill');

    function tick(now) {
      if (!state.isPaused && !document.hidden && !state.choreographyRunning) {
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
      if (!document.hidden && !state.isPaused && !state.choreographyRunning) {
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

    var unit = 'V3.0 LIVE KINETIC FEED <span class="sep">★</span> CURRENT LEADER: <b>' + esc(leader.name.toUpperCase()) + ' (' + fmtPts(leader.points) + ' PTS)</b>' +
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
    var leaderDelta = state.rankDeltaMap[leader.id] || 0;

    var kpiEl = document.getElementById('kpi-strip');
    if (!kpiEl) return;

    kpiEl.innerHTML =
      '<div class="kpi-cell">' +
        '<div class="kpi-label">01 · CURRENT LEADER ' + (leaderDelta > 0 ? '<span class="rank-arrow-badge is-up" style="margin-left:6px;font-size:10px;padding:2px 6px"><i>▲ +' + leaderDelta + '</i></span>' : '') + '</div>' +
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

  function renderStackCloud() {
    var cloudEl = document.getElementById('stack-cloud-bar');
    if (!cloudEl) return;
    var counts = {};
    state.vibers.forEach(function (v) {
      v.tools.forEach(function (t) {
        counts[t] = (counts[t] || 0) + 1;
      });
    });
    var tools = Object.keys(counts).sort(function (a, b) {
      return (counts[b] - counts[a]) || a.localeCompare(b);
    });

    var html = '<span class="stack-cloud-label">AI WEAPONRY FILTER:</span>' +
      '<button type="button" class="stack-filter-pill' + (!state.toolFilter ? ' active' : '') + '" data-tool-filter=""><i>ALL STACKS</i></button>';

    tools.forEach(function (t) {
      var isAct = state.toolFilter.toLowerCase() === t.toLowerCase();
      html += '<button type="button" class="stack-filter-pill' + (isAct ? ' active' : '') + '" data-tool-filter="' + esc(t) + '">' +
        '<i>' + esc(t) + ' <b>×' + counts[t] + '</b></i></button>';
    });
    cloudEl.innerHTML = html;
  }

  function renderPodium() {
    var container = document.getElementById('podium-container');
    if (!container || !state.vibers.length) return;
    var top3 = state.vibers.slice(0, 3);
    var html = '';

    top3.forEach(function (v, idx) {
      var isFirst = idx === 0;
      var delta = state.rankDeltaMap[v.id] || 0;
      var ptDelta = state.pointsDeltaMap[v.id] || 0;
      var isCoronated = isFirst && state.coronatedId === v.id;

      var cornerPills = '';
      if (isFirst) {
        cornerPills += '<span class="vl-pill vl-pill-acid vl-pill-skew"><span>' + (isCoronated ? '👑 NEW #1 LEADER' : '#1 LEADER') + '</span></span>';
      } else {
        cornerPills += '<span class="vl-pill vl-pill-skew"><span>RANK #' + (idx + 1) + '</span></span>';
      }
      if (delta > 0) {
        cornerPills += '<span class="rank-arrow-badge is-up"><i>▲ UP ' + delta + '</i></span>';
      } else if (delta < 0) {
        cornerPills += '<span class="rank-arrow-badge is-down"><i>▼ DOWN ' + Math.abs(delta) + '</i></span>';
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
        '<article class="podium-card rank-' + (idx + 1) + (isCoronated ? ' is-coronated' : '') + '" style="--i:' + idx + '" data-open-modal="' + esc(v.id) + '">' +
          '<div class="podium-visual">' +
            renderShot(v, { win: isFirst }) +
            '<div class="podium-corner-tag">' + cornerPills + '</div>' +
            '<span class="podium-rank-num">' + pad(idx + 1) + '</span>' +
            '<div class="podium-pts-overlay">' +
              '<div class="podium-pts-big">' + fmtPts(v.points) + '<small>PTS</small>' +
                (ptDelta > 0 ? ' <span class="pts-delta-pill" style="vertical-align:middle;margin-left:6px"><i>+' + fmtPts(ptDelta) + '</i></span>' : '') +
              '</div>' +
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

  // ---------- Tale of the Tape: Head-to-Head Matchup Arena ----------
  function renderVersusArena() {
    var arena = document.getElementById('versus-arena-body');
    var selL = document.getElementById('vs-select-left');
    var selR = document.getElementById('vs-select-right');
    if (!arena || !state.vibers.length) return;

    var vLeft = state.previousMap[state.vsLeftId] || state.vibers[0];
    var vRight = state.previousMap[state.vsRightId] || state.vibers[1] || state.vibers[0];
    state.vsLeftId = vLeft.id;
    state.vsRightId = vRight.id;

    if (selL && selR) {
      selL.innerHTML = state.vibers.map(function (v) {
        return '<option value="' + esc(v.id) + '"' + (v.id === vLeft.id ? ' selected' : '') + '>#' + pad(v.rank) + ' · ' + esc(v.name.toUpperCase()) + ' (' + fmtPts(v.points) + ' PTS)</option>';
      }).join('');
      selR.innerHTML = state.vibers.map(function (v) {
        return '<option value="' + esc(v.id) + '"' + (v.id === vRight.id ? ' selected' : '') + '>#' + pad(v.rank) + ' · ' + esc(v.name.toUpperCase()) + ' (' + fmtPts(v.points) + ' PTS)</option>';
      }).join('');
    }

    var metrics = [
      { label: 'TOTAL POINTS', l: vLeft.points, r: vRight.points, max: 36 },
      { label: 'NIGHT WINS', l: vLeft.wins, r: vRight.wins, max: 3 },
      { label: 'PEAK NIGHT', l: vLeft.best_night, r: vRight.best_night, max: 12 },
      { label: 'POINTS / NIGHT', l: vLeft.ppg, r: vRight.ppg, max: 12 },
      { label: 'PEOPLE\'S CHOICE ★', l: vLeft.peoples_choice, r: vRight.peoples_choice, max: 2 }
    ];

    var barsHtml = metrics.map(function (m) {
      var lPct = Math.min(100, Math.max(4, Math.round((m.l / m.max) * 100)));
      var rPct = Math.min(100, Math.max(4, Math.round((m.r / m.max) * 100)));
      var lLead = m.l > m.r;
      var rLead = m.r > m.l;
      return '<div class="vs-metric-row">' +
        '<div class="vs-metric-head">' +
          '<span class="vs-val-l' + (lLead ? ' is-lead' : '') + '">' + fmtPts(m.l) + '</span>' +
          '<span class="vs-metric-label">' + m.label + '</span>' +
          '<span class="vs-val-r' + (rLead ? ' is-lead' : '') + '">' + fmtPts(m.r) + '</span>' +
        '</div>' +
        '<div class="vs-tug-track">' +
          '<div class="vs-tug-left"><div class="vs-tug-fill-l" style="width:' + (m.l > 0 ? lPct : 0) + '%"></div></div>' +
          '<div class="vs-tug-right"><div class="vs-tug-fill-r" style="width:' + (m.r > 0 ? rPct : 0) + '%"></div></div>' +
        '</div>' +
      '</div>';
    }).join('');

    var diffPts = Math.abs(vLeft.points - vRight.points);
    var edgeHolder = vLeft.rank < vRight.rank ? vLeft : vRight;

    arena.innerHTML =
      '<div class="versus-stage">' +
        '<div class="vs-fighter-col is-left" data-open-modal="' + esc(vLeft.id) + '" style="cursor:pointer">' +
          renderShot(vLeft, { win: true }) +
          '<div>' +
            '<div class="vs-f-meta">ACID CORNER · RANK #' + pad(vLeft.rank) + ' · ' + esc(vLeft.city) + '</div>' +
            '<h3 class="vs-f-name">' + esc(vLeft.name) + '</h3>' +
          '</div>' +
          '<div class="vs-f-move">"' + esc(vLeft.signature_move || 'Classified') + '"</div>' +
          '<div class="podium-stack" style="margin-top:4px">' + vLeft.tools.map(function (t) { return '<span class="stack-pill"><i>' + esc(t) + '</i></span>'; }).join('') + '</div>' +
        '</div>' +

        '<div class="vs-metrics-center">' +
          '<div style="display:grid;grid-template-columns:1.15fr 0.85fr;gap:24px;align-items:center">' +
            '<div style="display:flex;flex-direction:column;gap:14px">' + barsHtml + '</div>' +
            '<div style="background:var(--ink);border:1px solid var(--paper-15);padding:16px;text-align:center">' +
              '<div class="dossier-block-k" style="margin-bottom:8px">5-AXIS COMBAT RADAR</div>' +
              buildRadarSvg(vLeft, vRight) +
              '<div style="display:flex;justify-content:center;gap:16px;margin-top:6px;font-family:var(--font-label);font-weight:800;font-size:11px;letter-spacing:.16em">' +
                '<span style="color:var(--acid)">■ ' + esc(vLeft.name.split(' ')[0].toUpperCase()) + '</span>' +
                '<span style="color:var(--blood)">■ ' + esc(vRight.name.split(' ')[0].toUpperCase()) + '</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="vs-verdict-banner">' +
            '<div class="vs-verdict-text">RINGSIDE EDGE: <strong>' + esc(edgeHolder.name.toUpperCase()) + '</strong> (' + (diffPts > 0 ? '+' + fmtPts(diffPts) + ' PTS SPREAD' : 'DEAD EVEN ON POINTS · TIEBREAKER ACTIVE') + ')</div>' +
            '<span class="vl-label" style="font-size:11px">WHALE CARD BREAKS ANY TIE</span>' +
          '</div>' +
        '</div>' +

        '<div class="vs-fighter-col is-right" data-open-modal="' + esc(vRight.id) + '" style="cursor:pointer">' +
          renderShot(vRight, { win: false }) +
          '<div>' +
            '<div class="vs-f-meta" style="color:var(--blood)">BLOOD CORNER · RANK #' + pad(vRight.rank) + ' · ' + esc(vRight.city) + '</div>' +
            '<h3 class="vs-f-name">' + esc(vRight.name) + '</h3>' +
          '</div>' +
          '<div class="vs-f-move">"' + esc(vRight.signature_move || 'Classified') + '"</div>' +
          '<div class="podium-stack" style="margin-top:4px">' + vRight.tools.map(function (t) { return '<span class="stack-pill"><i>' + esc(t) + '</i></span>'; }).join('') + '</div>' +
        '</div>' +
      '</div>';
  }

  function getFilteredAndSortedVibers() {
    var q = state.search.toLowerCase().trim();
    var tf = state.toolFilter.toLowerCase().trim();
    var list = state.vibers.filter(function (v) {
      if (state.filter === 'active' && v.isStandby) return false;
      if (state.filter === 'winners' && v.wins <= 0) return false;
      if (state.filter === 'peoples_choice' && v.peoples_choice <= 0) return false;
      if (state.filter === 'standby' && !v.isStandby) return false;
      if (tf) {
        var hasTool = v.tools.some(function (t) { return t.toLowerCase() === tf; });
        if (!hasTool) return false;
      }
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
      var delta = state.rankDeltaMap[v.id] || 0;
      var ptDelta = state.pointsDeltaMap[v.id] || 0;
      var isNewLeader = isFirst && state.coronatedId === v.id;
      var pct = Math.max(2, Math.round((v.points / maxPts) * 100));

      var rowCls = 'lb-row' +
        (isFirst ? ' first' : '') +
        (v.rank === 2 ? ' rank-2' : '') +
        (v.rank === 3 ? ' rank-3' : '') +
        (v.isStandby ? ' is-standby' : '') +
        (isExpanded ? ' is-expanded' : '') +
        (isNewLeader ? ' is-new-leader' : (isChanged ? ' just-updated' : ''));

      var arrowHtml = '';
      if (delta > 0) {
        arrowHtml = '<span class="rank-arrow-badge is-up" title="Moved up ' + delta + (delta === 1 ? ' place' : ' places') + '"><i>▲ +' + delta + '</i></span>';
      } else if (delta < 0) {
        arrowHtml = '<span class="rank-arrow-badge is-down" title="Moved down ' + Math.abs(delta) + (Math.abs(delta) === 1 ? ' place' : ' places') + '"><i>▼ −' + Math.abs(delta) + '</i></span>';
      }

      var badges = '';
      if (isNewLeader) badges += '<span class="leader-crown-badge"><i>👑 TAKES THE LEAD</i></span>';
      if (v.wins > 0) badges += '<span class="mini-tag win-tag"><i>' + v.wins + 'W</i></span>';
      if (v.peoples_choice > 0) badges += '<span class="mini-tag pc-tag"><i>★ PC</i></span>';
      if (v.isStandby) badges += '<span class="mini-tag standby-tag"><i>STANDBY</i></span>';

      var stackPills = v.tools.slice(0, 3).map(function (t) {
        return '<span class="stack-pill"><i>' + esc(t) + '</i></span>';
      }).join(' ');

      html +=
        '<tr class="' + rowCls + '" id="row-' + esc(v.id) + '" tabindex="0" role="button" aria-label="Open Viber Card for ' + esc(v.name) + '" data-viber-id="' + esc(v.id) + '" data-open-modal="' + esc(v.id) + '">' +
          '<td class="rank-cell td-rank" data-label="Rank"><div class="rank-cell-inner"><span>' + pad(v.rank) + '</span>' + arrowHtml + '</div></td>' +
          '<td class="td-who" data-label="Viber">' +
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
                  (v.signature_move ? '<span class="who-move-inline">· "' + esc(v.signature_move) + '"</span>' : '') +
                '</div>' +
              '</div>' +
            '</div>' +
          '</td>' +
          '<td class="td-stack" data-label="Builds With"><div class="stack-cell-wrap">' + (stackPills || '<span class="num-dim">—</span>') + '</div></td>' +
          '<td class="num td-nights" data-label="Nights"><span class="stat-num-val">' + v.episodes + '</span></td>' +
          '<td class="num td-wins ' + (v.wins > 0 ? 'has-win' : 'is-zero') + '" data-label="Wins"><span class="stat-num-val">' + v.wins + '</span></td>' +
          '<td class="num td-pc ' + (v.peoples_choice > 0 ? 'has-pc' : 'is-zero') + '" data-label="Crowd ★"><span class="stat-num-val">' + v.peoples_choice + '</span></td>' +
          '<td class="center td-yc" data-label="Yellow Cards">' + (v.yellow_cards > 0 ? '<span class="yc-box" title="' + v.yellow_cards + ' Yellow Card (-1 pt)">' + v.yellow_cards + '</span>' : '<span class="yc-none">—</span>') + '</td>' +
          '<td class="num td-best-last" data-label="Best / Last"><span class="best-val">' + fmtPts(v.best_night) + '</span> <span class="last-val">/ ' + fmtPts(v.last_night) + '</span></td>' +
          '<td class="num td-pts" data-label="Points">' +
            '<div class="pts-cell-wrap">' +
              (ptDelta > 0 ? '<span class="pts-delta-pill"><i>+' + fmtPts(ptDelta) + ' PTS</i></span>' : '') +
              '<div class="pts-bar-outer"><div class="pts-bar-inner" style="width:' + (v.points > 0 ? pct : 0) + '%"></div></div>' +
              '<span class="pts-val">' + fmtPts(v.points) + '</span>' +
              '<span class="row-card-cue" aria-hidden="true">CARD →</span>' +
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
                '<div style="display:flex;flex-direction:column;gap:8px;justify-content:center">' +
                  '<button type="button" class="hud-btn" data-open-modal="' + esc(v.id) + '"><span>FULL DOSSIER →</span></button>' +
                  '<button type="button" class="hud-btn hud-btn-ghost" data-send-vs="' + esc(v.id) + '"><span>SEND TO VS ARENA ⚔</span></button>' +
                '</div>' +
              '</div>' +
            '</td>' +
          '</tr>';
      }
    });

    tbody.innerHTML = html;

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
      var delta = state.rankDeltaMap[v.id] || 0;
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
                (delta > 0 ? '<span class="rank-arrow-badge is-up" style="margin-left:6px;font-size:10px;padding:2px 5px"><i>▲+' + delta + '</i></span>' : '') +
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

  // ---------- THE VIBER CARD (TWIST CARD 01: MINUTE 30:00) ----------
  function viberSlug(v) {
    if (!v) return '';
    return 'viber-' + String(v.name || v.id).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function findViberByHash(rawHash) {
    var h = String(rawHash || '').replace(/^#\/?/, '').trim().toLowerCase();
    if (!h) return null;
    // Ignore page section anchors
    if (h === 'podium' || h === 'standings' || h === 'versus' || h === 'dossiers' || h === 'scoring') return null;

    var stripped = h.replace(/^viber[-/]/, '');
    for (var i = 0; i < state.vibers.length; i++) {
      var v = state.vibers[i];
      var idLow = v.id.toLowerCase();
      var slug = viberSlug(v);
      var nameSlug = slug.replace(/^viber-/, '');
      var handleSlug = v.handle.replace(/^@/, '').toLowerCase().trim();
      if (h === idLow || stripped === idLow || h === slug || stripped === nameSlug || (handleSlug && stripped === handleSlug)) {
        return v;
      }
    }
    return null;
  }

  function openFighterModal(id, opts) {
    opts = opts || {};
    var cleanId = String(id || '').trim();
    var v = state.previousMap[cleanId] || state.vibers.filter(function (x) {
      return x.id === cleanId || x.id.toLowerCase() === cleanId.toLowerCase();
    })[0];
    if (!v) return;
    state.modalId = v.id;
    if (opts.triggerEl) {
      state.lastTriggerEl = opts.triggerEl;
    }

    var backdrop = document.getElementById('fighter-modal-backdrop');
    var body = document.getElementById('fighter-modal-body');
    if (!backdrop || !body) return;

    var hashAddr = '#' + viberSlug(v);
    if (!opts.fromHash && window.location.hash !== hashAddr) {
      try {
        history.replaceState(null, '', hashAddr);
      } catch (e) {
        window.location.hash = hashAddr;
      }
    }

    var isFirst = v.rank === 1;
    var toolsHtml = v.tools.length
      ? v.tools.map(function (t) { return '<span class="stack-pill"><i>' + esc(t) + '</i></span>'; }).join(' ')
      : esc(v.builds_with || 'Not yet listed');

    // Find prev and next viber in current standings order for quick keyboard/button stepping
    var idx = state.vibers.findIndex(function (x) { return x.id === v.id; });
    var prevV = idx > 0 ? state.vibers[idx - 1] : state.vibers[state.vibers.length - 1];
    var nextV = idx < state.vibers.length - 1 ? state.vibers[idx + 1] : state.vibers[0];

    var statusBadges = '';
    if (isFirst) statusBadges += '<span class="vl-pill vl-pill-acid vl-pill-skew"><span>#1 LEADER</span></span>';
    if (v.wins > 0) statusBadges += '<span class="vl-pill vl-pill-skew" style="background:var(--ink);color:var(--acid);border:1px solid var(--acid)"><span>' + v.wins + (v.wins === 1 ? ' WIN' : ' WINS') + '</span></span>';
    if (v.peoples_choice > 0) statusBadges += '<span class="vl-pill vl-pill-skew"><span>★ PEOPLE\'S CHOICE</span></span>';

    body.innerHTML =
      '<div class="vc-topbar">' +
        '<div class="vc-topbar-left">' +
          '<span class="vc-twist-tag"><span>THE VIBER CARD · ID ' + esc(v.id.toUpperCase()) + '</span></span>' +
          '<span class="vc-address-pill" title="Direct shareable hash address for this viber card">ADDRESS: <code>' + esc(hashAddr) + '</code></span>' +
        '</div>' +
        '<div class="vc-actions">' +
          '<button type="button" class="vc-btn" id="vc-copy-link" data-copy-hash="' + esc(hashAddr) + '"><span>🔗 COPY CARD LINK</span></button>' +
          '<button type="button" class="vc-btn" id="vc-print-btn"><span>🖨 PRINT CARD</span></button>' +
          '<button type="button" class="vc-btn vc-btn-close" data-close-modal aria-label="Close card and return to table"><span>✕ BACK TO TABLE</span></button>' +
        '</div>' +
      '</div>' +

      '<div class="vc-main">' +
        '<div class="vc-photo-col">' +
          '<div class="vc-photo-frame">' +
            renderShot(v, { win: isFirst }) +
            '<span class="vc-rank-stamp">#' + pad(v.rank) + '</span>' +
            '<div class="vc-status-stamp">' + statusBadges + '</div>' +
          '</div>' +
        '</div>' +

        '<div class="vc-info-col">' +
          '<div class="vc-header-block">' +
            '<div class="vc-city-line">' +
              '<span>CITY: ' + esc(v.city || 'Unlisted') + '</span>' +
              '<span>·</span>' +
              '<span>RANK #' + pad(v.rank) + ' OF ' + pad(state.vibers.length) + '</span>' +
            '</div>' +
            '<h2 class="vc-name' + (isFirst ? ' is-leader' : '') + '">' + esc(v.name) + '</h2>' +
            '<div class="vc-handle">' + esc(v.handle || '@viber') + '</div>' +
          '</div>' +

          '<div class="vc-story-grid">' +
            '<div class="vc-field">' +
              '<div class="vc-field-k">BUILDS WITH</div>' +
              '<div class="vc-field-v"><div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px">' + toolsHtml + '</div></div>' +
            '</div>' +
            '<div class="vc-field is-blood">' +
              '<div class="vc-field-k">SIGNATURE MOVE</div>' +
              '<div class="vc-field-v is-quote">"' + esc(v.signature_move || 'Classified') + '"</div>' +
            '</div>' +
            '<div class="vc-field is-full">' +
              '<div class="vc-field-k">KNOWN FOR</div>' +
              '<div class="vc-field-v">' + esc(v.known_for || 'Named for the next card, has not built on the clock yet.') + '</div>' +
            '</div>' +
            '<div class="vc-field is-full">' +
              '<div class="vc-field-k">FAVOURITE BUILD</div>' +
              '<div class="vc-field-v">' + esc(v.favourite_build || 'Yet to be built on the 60-minute clock.') + '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="vc-full-line-wrap">' +
        '<div class="vc-full-line-head">' +
          '<span class="vc-full-line-title">THE FULL LINE · OFFICIAL SEASON TELEMETRY</span>' +
          '<span class="vl-meta" style="line-height:1">AVG ' + fmtPts(v.ppg) + ' PTS / NIGHT</span>' +
        '</div>' +
        '<div class="vc-full-line-grid">' +
          '<div class="vc-stat-cell is-pts">' +
            '<div class="vc-stat-k">Points</div>' +
            '<div class="vc-stat-v">' + fmtPts(v.points) + '</div>' +
          '</div>' +
          '<div class="vc-stat-cell">' +
            '<div class="vc-stat-k">Nights</div>' +
            '<div class="vc-stat-v">' + v.episodes + '</div>' +
          '</div>' +
          '<div class="vc-stat-cell">' +
            '<div class="vc-stat-k">Wins</div>' +
            '<div class="vc-stat-v' + (v.wins > 0 ? ' is-acid' : '') + '">' + v.wins + '</div>' +
          '</div>' +
          '<div class="vc-stat-cell">' +
            '<div class="vc-stat-k">People\'s Choice</div>' +
            '<div class="vc-stat-v' + (v.peoples_choice > 0 ? ' is-blood' : '') + '">' + v.peoples_choice + '</div>' +
          '</div>' +
          '<div class="vc-stat-cell">' +
            '<div class="vc-stat-k">Yellow Cards</div>' +
            '<div class="vc-stat-v' + (v.yellow_cards > 0 ? ' is-blood' : '') + '">' + v.yellow_cards + '</div>' +
          '</div>' +
          '<div class="vc-stat-cell">' +
            '<div class="vc-stat-k">Best Night</div>' +
            '<div class="vc-stat-v">' + fmtPts(v.best_night) + '</div>' +
          '</div>' +
          '<div class="vc-stat-cell">' +
            '<div class="vc-stat-k">Last Night</div>' +
            '<div class="vc-stat-v">' + fmtPts(v.last_night) + '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="vc-footer-nav">' +
        '<button type="button" class="vc-btn" data-open-modal="' + esc(prevV.id) + '"><span>← #' + pad(prevV.rank) + ' ' + esc(prevV.name) + '</span></button>' +
        '<span>ESC OR CLICK OUTSIDE TO RETURN TO TABLE ROW</span>' +
        '<button type="button" class="vc-btn" data-open-modal="' + esc(nextV.id) + '"><span>#' + pad(nextV.rank) + ' ' + esc(nextV.name) + ' →</span></button>' +
      '</div>';

    document.body.classList.add('has-viber-card-open');
    backdrop.classList.add('is-open');
    backdrop.setAttribute('aria-hidden', 'false');
  }

  function closeFighterModal() {
    var closedId = state.modalId;
    state.modalId = null;
    document.body.classList.remove('has-viber-card-open');
    var backdrop = document.getElementById('fighter-modal-backdrop');
    if (backdrop) {
      backdrop.classList.remove('is-open');
      backdrop.setAttribute('aria-hidden', 'true');
    }

    // Clear the viber hash from the URL cleanly without jumping the page scroll
    if (window.location.hash && findViberByHash(window.location.hash)) {
      try {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      } catch (e) {}
    }

    // Return to the exact table row where the viber left it and highlight briefly
    if (closedId) {
      var targetRow = document.querySelector('#lb-tbody tr.lb-row[data-viber-id="' + closedId + '"]');
      if (targetRow) {
        targetRow.classList.remove('is-returned-spot');
        void targetRow.offsetWidth;
        targetRow.classList.add('is-returned-spot');
        var rect = targetRow.getBoundingClientRect();
        if (rect.top < 70 || rect.bottom > window.innerHeight - 40) {
          targetRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        try {
          targetRow.focus({ preventScroll: true });
        } catch (e) {}
      }
    }
  }

  function renderAll() {
    renderTicker();
    renderKpis();
    renderPodium();
    renderVersusArena();
    renderStackCloud();
    renderTable();
    renderRosterCards();
    if (state.modalId && state.previousMap[state.modalId]) {
      openFighterModal(state.modalId);
    }
  }

  // ---------- Ambient Hero Canvas ----------
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

    for (var i = 0; i < 36; i++) {
      sparks.push({
        x: Math.random() * 1400,
        y: Math.random() * 500,
        vy: -0.25 - Math.random() * 0.65,
        vx: (Math.random() - 0.5) * 0.35,
        s: 1.5 + Math.random() * 2.5,
        acid: Math.random() > 0.32
      });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      sparks.forEach(function (p) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        ctx.fillStyle = p.acid ? 'rgba(232,255,42,0.34)' : 'rgba(255,43,43,0.34)';
        ctx.fillRect(p.x, p.y, p.s, p.s);
      });
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  }

  // ---------- Event Bindings ----------
  function bindEvents() {
    document.querySelectorAll('[data-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('[data-filter]').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        state.filter = btn.getAttribute('data-filter');
        renderTable();
      });
    });

    var searchInput = document.getElementById('lb-search');
    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        state.search = e.target.value;
        renderTable();
      });
    }

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
        updateHudStatus(state.isSimulating ? 'SIMULATION ACTIVE' : 'LIVE · FEED LOCKED', '');
      });
    });

    var syncNowBtn = document.getElementById('btn-sync-now');
    if (syncNowBtn) {
      syncNowBtn.addEventListener('click', function () {
        fetchSheetData();
      });
    }

    var pauseBtn = document.getElementById('btn-toggle-poll');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', function () {
        state.isPaused = !state.isPaused;
        if (state.isPaused) {
          pauseBtn.classList.add('is-paused');
          pauseBtn.innerHTML = '<span>RESUME</span>';
          updateHudStatus('POLLING PAUSED', '');
          pushFeedLog('HOLD', 'POLLING PAUSED BY OPERATOR', false);
        } else {
          pauseBtn.classList.remove('is-paused');
          pauseBtn.innerHTML = '<span>PAUSE</span>';
          state.nextSyncAt = performance.now() + state.pollIntervalMs;
          updateHudStatus('LIVE · FEED LOCKED', '');
          fetchSheetData();
        }
      });
    }

    // V3 Replay "DAVE TAKES THE LEAD" Button
    var daveOvertakeBtn = document.getElementById('btn-dave-overtake');
    if (daveOvertakeBtn) {
      daveOvertakeBtn.addEventListener('click', function () {
        runDaveTakesTheLeadChoreography();
      });
    }

    var soundBtn = document.getElementById('btn-sound-fx');
    if (soundBtn) {
      soundBtn.addEventListener('click', function () {
        state.soundEnabled = !state.soundEnabled;
        soundBtn.classList.toggle('is-active', state.soundEnabled);
        soundBtn.innerHTML = '<span>' + (state.soundEnabled ? '🔔 BELL FX: ON' : '🔕 BELL FX: OFF') + '</span>';
        if (state.soundEnabled) {
          playRingsideBell(true);
          showBellToast('RINGSIDE AUDIO ARMED', 'BELL CHIMES ON EVERY LIVE SCORECARD CALL');
        }
      });
    }

    var simBtn = document.getElementById('btn-sim-mode');
    if (simBtn) {
      simBtn.addEventListener('click', function () {
        state.isSimulating = !state.isSimulating;
        simBtn.classList.toggle('is-blood-active', state.isSimulating);
        simBtn.innerHTML = '<span>' + (state.isSimulating ? '⚡ SIMULATING (STOP)' : '⚡ RANDOM SIM') + '</span>';
        if (state.isSimulating) {
          updateHudStatus('SIMULATION OVERDRIVE', 'is-syncing');
          pushFeedLog('SIM', 'FIGHT-NIGHT SIMULATOR ENGAGED · FIRING CALL', true);
          simulateFightNightCall();
        } else {
          state.rankDeltaMap = {};
          state.pointsDeltaMap = {};
          state.coronatedId = null;
          updateHudStatus('RESTORING G-SHEET...', 'is-syncing');
          pushFeedLog('SYNC', 'SIMULATOR OFF · RESTORING OFFICIAL GOOGLE SHEET', false);
          fetchSheetData();
        }
      });
    }

    var tvBtn = document.getElementById('btn-tv-mode');
    if (tvBtn) {
      tvBtn.addEventListener('click', function () {
        setTvMode(!state.tvMode, { requestFullscreen: true });
      });
    }

    var tvExitBtn = document.getElementById('btn-tv-exit');
    if (tvExitBtn) {
      tvExitBtn.addEventListener('click', function () {
        setTvMode(false, { requestFullscreen: true });
      });
    }

    var tvOvertakeBtn = document.getElementById('btn-tv-overtake');
    if (tvOvertakeBtn) {
      tvOvertakeBtn.addEventListener('click', function () {
        runDaveTakesTheLeadChoreography();
      });
    }

    var selL = document.getElementById('vs-select-left');
    var selR = document.getElementById('vs-select-right');
    if (selL) {
      selL.addEventListener('change', function (e) {
        state.vsLeftId = e.target.value;
        renderVersusArena();
      });
    }
    if (selR) {
      selR.addEventListener('change', function (e) {
        state.vsRightId = e.target.value;
        renderVersusArena();
      });
    }

    document.addEventListener('click', function (e) {
      var toolFilterBtn = e.target.closest('[data-tool-filter]');
      if (toolFilterBtn) {
        state.toolFilter = toolFilterBtn.getAttribute('data-tool-filter') || '';
        renderStackCloud();
        renderTable();
        return;
      }

      var sendVsBtn = e.target.closest('[data-send-vs]');
      if (sendVsBtn) {
        e.stopPropagation();
        var vid = sendVsBtn.getAttribute('data-send-vs');
        if (state.vsLeftId === vid) {
          state.vsRightId = vid;
        } else {
          state.vsRightId = state.vsLeftId;
          state.vsLeftId = vid;
        }
        renderVersusArena();
        var vsSec = document.getElementById('versus');
        if (vsSec) vsSec.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      var copyBtn = e.target.closest('#vc-copy-link');
      if (copyBtn) {
        e.stopPropagation();
        var urlToCopy = window.location.href;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(urlToCopy).catch(function () {});
        }
        copyBtn.classList.add('is-copied');
        copyBtn.innerHTML = '<span>✓ LINK COPIED</span>';
        setTimeout(function () {
          copyBtn.classList.remove('is-copied');
          copyBtn.innerHTML = '<span>🔗 COPY CARD LINK</span>';
        }, 1800);
        return;
      }

      var printBtn = e.target.closest('#vc-print-btn');
      if (printBtn) {
        e.stopPropagation();
        window.print();
        return;
      }

      var modalTrigger = e.target.closest('[data-open-modal]');
      if (modalTrigger) {
        e.stopPropagation();
        openFighterModal(modalTrigger.getAttribute('data-open-modal'), { triggerEl: modalTrigger });
        return;
      }

      var rowTrigger = e.target.closest('[data-toggle-row]');
      if (rowTrigger) {
        var id = rowTrigger.getAttribute('data-toggle-row');
        openFighterModal(id, { triggerEl: rowTrigger });
        return;
      }

      if (e.target.id === 'fighter-modal-backdrop' || e.target.closest('[data-close-modal]')) {
        closeFighterModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (state.modalId) {
          closeFighterModal();
          return;
        }
        if (state.tvMode) {
          setTvMode(false, { requestFullscreen: true });
          return;
        }
      }
      var activeTag = document.activeElement && document.activeElement.tagName ? document.activeElement.tagName.toLowerCase() : '';
      var isTyping = activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select';
      if (!isTyping && (e.key === 't' || e.key === 'T') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setTvMode(!state.tvMode, { requestFullscreen: true });
        return;
      }
      if ((e.key === 'Enter' || e.key === ' ') && document.activeElement && document.activeElement.hasAttribute('data-open-modal') && !state.modalId) {
        e.preventDefault();
        openFighterModal(document.activeElement.getAttribute('data-open-modal'), { triggerEl: document.activeElement });
      }
    });

    window.addEventListener('hashchange', function () {
      var matched = findViberByHash(window.location.hash);
      if (matched) {
        openFighterModal(matched.id, { fromHash: true });
      } else if (state.modalId && !window.location.hash) {
        closeFighterModal();
      }
    });
  }

  function setTvMode(enabled, opts) {
    opts = opts || {};
    state.tvMode = !!enabled;
    if (document.body) {
      document.body.classList.toggle('is-tv-mode', state.tvMode);
    }
    var tvBtn = document.getElementById('btn-tv-mode');
    if (tvBtn) {
      tvBtn.classList.toggle('is-active', state.tvMode);
      tvBtn.innerHTML = '<span>' + (state.tvMode ? '📺 TV MODE: ON [T]' : '📺 JUMBOTRON [T]') + '</span>';
    }
    if (opts.requestFullscreen) {
      if (state.tvMode && document.documentElement && document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(function () {});
      } else if (!state.tvMode && document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(function () {});
      }
    }
  }

  // ---------- Boot ----------
  function init() {
    var params = new URLSearchParams(window.location.search);
    var autoSimulateOvertake = params.get('simulate_ranking_change') === '1' || params.get('simulate_ranking_change') === 'true';
    var autoTvMode = params.get('tv') === '1' || params.get('tv') === 'true' || params.get('jumbotron') === '1' || params.get('jumbotron') === 'true';

    state.rawSheetRows = FALLBACK_VIBERS;
    state.vibers = normalizeRows(FALLBACK_VIBERS);
    state.vibers.forEach(function (v) { state.previousMap[v.id] = v; });
    pushFeedLog('BOOT', 'V5.0 BROADCAST ENGINE INITIALIZED', false);
    renderAll();

    if (autoTvMode) {
      setTvMode(true, { requestFullscreen: false });
    }

    // If URL already has a viber hash (#viber-dave-thomas or #v011), open their card immediately
    if (window.location.hash) {
      var initialMatch = findViberByHash(window.location.hash);
      if (initialMatch) {
        openFighterModal(initialMatch.id, { fromHash: true });
      }
    }

    bindEvents();
    initHeroCanvas();
    fetchSheetData({ initialBoot: true, runChoreographyOnLoad: autoSimulateOvertake }).then(function () {
      if (window.location.hash && !state.modalId) {
        var m = findViberByHash(window.location.hash);
        if (m) openFighterModal(m.id, { fromHash: true });
      }
    });
    startPollingLoop();
  }

  // Expose internal API for Unit & QA Testing Suites (Node.js & Browser)
  window.VL_LEADERBOARD = {
    SHEET_ID: SHEET_ID,
    GVIZ_JSON_URL: GVIZ_JSON_URL,
    GVIZ_CSV_URL: GVIZ_CSV_URL,
    FALLBACK_VIBERS: FALLBACK_VIBERS,
    state: state,
    esc: esc,
    pad: pad,
    num: num,
    fmtPts: fmtPts,
    initials: initials,
    resolvePhotoUrl: resolvePhotoUrl,
    renderShot: renderShot,
    buildRadarSvg: buildRadarSvg,
    compareOfficialRank: compareOfficialRank,
    normalizeRows: normalizeRows,
    parseGvizJson: parseGvizJson,
    parseCsv: parseCsv,
    viberSlug: viberSlug,
    findViberByHash: findViberByHash,
    openFighterModal: openFighterModal,
    closeFighterModal: closeFighterModal,
    setTvMode: setTvMode,
    applyNormalizedData: applyNormalizedData,
    runDaveTakesTheLeadChoreography: runDaveTakesTheLeadChoreography,
    getFilteredAndSortedVibers: getFilteredAndSortedVibers,
    renderAll: renderAll
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.VL_LEADERBOARD;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
