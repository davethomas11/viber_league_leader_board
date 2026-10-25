/**
 * ==========================================================================
 * VIBERS LEAGUE — UNIT & QA REGRESSION TEST SUITE
 * Protects:
 *   1. Official Ranking & Tiebreaker Rules
 *   2. Google Sheets GViz JSON & RFC-4180 CSV Parsing
 *   3. Google Drive Photo Resolution & Initials Fallback (No-Photo Vibers)
 *   4. Twist Card 01 ("THE VIBER CARD") — Modal Open/Close, Story Fields,
 *      7-Stat Full Line, Hash Routing (#viber-dave-thomas / #v011), Print CSS
 *   5. V3 Kinetic Overtake ("DAVE TAKES THE LEAD") & Rank Delta Calculations
 *   6. Brand Design System Integrity (5 Colors, 3 Fonts, Required Assets)
 * ==========================================================================
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const htmlSource = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const cssSource = fs.readFileSync(path.join(ROOT, 'css', 'leaderboard.css'), 'utf8');
const colorsSource = fs.readFileSync(path.join(ROOT, 'css', 'tokens', 'colors.css'), 'utf8');
const jsSource = fs.readFileSync(path.join(ROOT, 'js', 'leaderboard.js'), 'utf8');

/**
 * Create a lightweight isolated DOM & Browser harness in Node's VM
 * so we can test `js/leaderboard.js` end-to-end without external dependencies.
 */
function createLeaderboardHarness(searchQuery = '', initialHash = '') {
  const elementsById = {};

  function makeEl(id, tag = 'div') {
    const classSet = new Set();
    const attrs = {};
    const el = {
      id,
      tagName: tag.toUpperCase(),
      innerHTML: '',
      textContent: '',
      value: '',
      style: {
        setProperty(k, v) { this[k] = v; }
      },
      classList: {
        add(...cls) { cls.forEach(c => classSet.add(c)); },
        remove(...cls) { cls.forEach(c => classSet.delete(c)); },
        toggle(c, force) {
          if (force === undefined) {
            if (classSet.has(c)) { classSet.delete(c); return false; }
            classSet.add(c); return true;
          }
          if (force) classSet.add(c); else classSet.delete(c);
          return !!force;
        },
        contains(c) { return classSet.has(c); }
      },
      setAttribute(k, v) { attrs[k] = String(v); },
      getAttribute(k) { return attrs[k] !== undefined ? attrs[k] : null; },
      hasAttribute(k) { return attrs[k] !== undefined; },
      addEventListener() {},
      getBoundingClientRect() { return { top: 100, bottom: 160, width: 1200, height: 60 }; },
      scrollIntoView() {},
      focus() {},
      querySelector() { return null; },
      querySelectorAll() { return []; },
      parentElement: {
        getBoundingClientRect() { return { width: 1200, height: 400 }; }
      },
      getContext() {
        return {
          clearRect() {},
          fillRect() {},
          save() {},
          restore() {},
          translate() {},
          rotate() {}
        };
      }
    };
    if (id) elementsById[id] = el;
    return el;
  }

  // Register all key DOM IDs from index.html
  [
    'live-ticker-content',
    'kpi-strip',
    'podium-container',
    'lb-tbody',
    'roster-cards-grid',
    'fighter-modal-backdrop',
    'fighter-modal-body',
    'lead-takeover-overlay',
    'lead-takeover-body',
    'lead-takeover-confetti',
    'bell-toast',
    'bell-toast-title',
    'bell-toast-sub',
    'hud-status',
    'hud-status-text',
    'hud-countdown-val',
    'hud-bar-fill',
    'hud-sync-count',
    'hud-last-time',
    'hud-roster-count',
    'hud-feed-log',
    'stack-cloud-bar',
    'versus-arena-body',
    'vs-select-left',
    'vs-select-right',
    'lb-search',
    'btn-toggle-poll',
    'btn-sync-now',
    'btn-dave-overtake',
    'btn-sound-fx',
    'btn-sim-mode',
    'btn-tv-mode',
    'tv-floating-bar',
    'btn-tv-exit',
    'btn-tv-overtake'
  ].forEach(id => makeEl(id));

  const bodyEl = makeEl('body', 'body');
  const locationObj = {
    search: searchQuery,
    hash: initialHash,
    pathname: '/viber_league_leader_board/',
    href: 'https://davethomas11.github.io/viber_league_leader_board/' + searchQuery + initialHash
  };

  const sandbox = {
    window: null,
    document: {
      readyState: 'complete',
      hidden: false,
      body: bodyEl,
      activeElement: null,
      getElementById(id) { return elementsById[id] || null; },
      querySelector(sel) {
        if (sel === '.lb-hero-fx') return makeEl('hero-canvas', 'canvas');
        if (sel.startsWith('#lb-tbody tr.lb-row')) return makeEl('mock-row', 'tr');
        return null;
      },
      querySelectorAll() { return []; },
      addEventListener() {}
    },
    location: locationObj,
    URLSearchParams,
    history: {
      replaceState(_state, _title, url) {
        if (typeof url === 'string' && url.startsWith('#')) {
          locationObj.hash = url;
        } else {
          locationObj.hash = '';
        }
      }
    },
    navigator: {
      clipboard: { writeText: () => Promise.resolve() }
    },
    performance: { now: () => 1000 },
    requestAnimationFrame: () => 1,
    setTimeout: (fn) => { return 1; },
    clearTimeout: () => {},
    matchMedia: () => ({ matches: true }),
    addEventListener: () => {},
    removeEventListener: () => {},
    print: () => {},
    fetch: () => Promise.resolve({
      ok: true,
      text: () => Promise.resolve('/*O_o*/\ngoogle.visualization.Query.setResponse({"version":"0.6","sig":"1","table":{"cols":[{"label":"id"},{"label":"name"},{"label":"points"},{"label":"episodes"},{"label":"wins"}],"rows":[{"c":[{"v":"v011"},{"v":"Dave Thomas"},{"v":31},{"v":3},{"v":2}]}]}});')
    }),
    console,
    module: { exports: {} }
  };
  sandbox.window = sandbox;

  vm.createContext(sandbox);
  vm.runInContext(jsSource, sandbox);

  return {
    api: sandbox.VL_LEADERBOARD,
    elementsById,
    bodyEl,
    locationObj
  };
}

// ============================================================================
// 1. STATIC QA & DESIGN SYSTEM INTEGRITY TESTS
// ============================================================================
test('QA 01 · Brand Design System: colors.css strictly defines the 5 Vibers League colors', () => {
  assert.match(colorsSource, /--ink:\s*#0b0a08/i);
  assert.match(colorsSource, /--paper:\s*#f3efe6/i);
  assert.match(colorsSource, /--acid:\s*#e8ff2a/i);
  assert.match(colorsSource, /--blood:\s*#ff2b2b/i);
  assert.match(colorsSource, /--steel:\s*#1a1916/i);
});

test('QA 02 · Brand Assets: self-hosted Anton, Barlow Condensed, and Barlow woff2 fonts exist on disk', () => {
  const requiredFonts = [
    'anton-400-latin-v1.woff2',
    'barlow-400-latin-v1.woff2',
    'barlow-condensed-700-latin-v1.woff2',
    'barlow-condensed-800-italic-latin-v1.woff2'
  ];
  requiredFonts.forEach(fontFile => {
    const fullPath = path.join(ROOT, 'assets', 'fonts', fontFile);
    assert.ok(fs.existsSync(fullPath), `Missing font asset: ${fontFile}`);
    assert.ok(fs.statSync(fullPath).size > 1000, `Font asset appears empty: ${fontFile}`);
  });
});

test('QA 03 · HTML Structure: index.html contains all required ringside sections, Twist Card modal, and cache-busted assets', () => {
  assert.match(htmlSource, /id="live-ticker-content"/);
  assert.match(htmlSource, /id="podium-container"/);
  assert.match(htmlSource, /id="lb-tbody"/);
  assert.match(htmlSource, /id="versus-arena-body"/);
  assert.match(htmlSource, /id="roster-cards-grid"/);
  assert.match(htmlSource, /id="fighter-modal-backdrop"/);
  assert.match(htmlSource, /id="fighter-modal-body"/);
  assert.match(htmlSource, /id="lead-takeover-overlay"/);
});

// ============================================================================
// 2. UNIT TESTS: DATA NORMALIZATION, RANKING & TIEBREAKERS
// ============================================================================
test('Unit 01 · Official Ranking & Tiebreaker Order: sorts by Points > Wins > Best Night > Peoples Choice > Last Night > Episodes', () => {
  const { api } = createLeaderboardHarness();
  const normalized = api.normalizeRows(api.FALLBACK_VIBERS);

  assert.equal(normalized.length, 10, 'Should normalize all 10 vibers from the sheet');
  assert.equal(normalized[0].id, 'v011', 'Dave Thomas (31 pts) must be Rank #1');
  assert.equal(normalized[0].rank, 1);

  assert.equal(normalized[1].id, 'v008', 'Ollie (27 pts) must be Rank #2');
  assert.equal(normalized[1].rank, 2);

  // Tiebreaker check between Zachary (22 pts, 1 win) and Raphael (22 pts, 0 wins)
  assert.equal(normalized[2].id, 'v004', 'Zachary (22 pts, 1 win) must win tiebreaker over Raphael (22 pts, 0 wins) for Rank #3');
  assert.equal(normalized[2].rank, 3);
  assert.equal(normalized[3].id, 'v003', 'Raphael (22 pts, 0 wins) must be Rank #4');
  assert.equal(normalized[3].rank, 4);

  // Standby vibers (0 episodes, 0 points)
  const jason = normalized.find(v => v.id === 'v009');
  const ashish = normalized.find(v => v.id === 'v002');
  assert.equal(jason.isStandby, true);
  assert.equal(ashish.isStandby, true);
  assert.equal(ashish.points, 0, 'Null/blank points in sheet must normalize cleanly to 0');
});

test('Unit 02 · Google Drive Photo URL Resolver & No-Photo Initials Fallback', () => {
  const { api } = createLeaderboardHarness();

  // Drive view URL -> high-res thumbnail endpoint
  const driveUrl = 'https://drive.google.com/file/d/1Ejlo5-nOoxuPGjLlWcE0r0n2-jFM-ami/view?usp=drive_link';
  assert.equal(
    api.resolvePhotoUrl(driveUrl),
    'https://drive.google.com/thumbnail?id=1Ejlo5-nOoxuPGjLlWcE0r0n2-jFM-ami&sz=w800'
  );

  // Empty URL -> empty string
  assert.equal(api.resolvePhotoUrl(''), '');
  assert.equal(api.resolvePhotoUrl(null), '');

  // Initials generator
  assert.equal(api.initials('Dave Thomas'), 'DT');
  assert.equal(api.initials('Zachary'), 'Z');
  assert.equal(api.initials('Mikhail Sergeivich Krasnoyodospar'), 'MK');

  // RenderShot for viber WITH photo vs viber WITHOUT photo (Zachary)
  const dave = api.state.previousMap['v011'];
  const zachary = api.state.previousMap['v004'];

  const daveShot = api.renderShot(dave, { win: true });
  assert.match(daveShot, /<img src="https:\/\/drive\.google\.com\/thumbnail\?id=1Ejlo5-nOoxuPGjLlWcE0r0n2-jFM-ami&amp;sz=w800"/);

  const zacharyShot = api.renderShot(zachary);
  assert.match(zacharyShot, /class="vl-shot is-ini"/);
  assert.match(zacharyShot, /<span class="ini">Z<\/span>/);
});

// ============================================================================
// 3. UNIT TESTS: GOOGLE SHEETS GVIZ JSON & CSV PARSERS
// ============================================================================
test('Unit 03 · Google Visualization JSON Parser: extracts columns and rows accurately', () => {
  const { api } = createLeaderboardHarness();
  const sampleGviz = `/*O_o*/
google.visualization.Query.setResponse({
  "version":"0.6",
  "sig":"998877",
  "table":{
    "cols":[
      {"id":"A","label":"id"},
      {"id":"B","label":"name"},
      {"id":"C","label":"points"},
      {"id":"D","label":"city"}
    ],
    "rows":[
      {"c":[{"v":"v011"},{"v":"Dave Thomas"},{"v":31},{"v":"Burnaby"}]},
      {"c":[{"v":"v004"},{"v":"Zachary"},{"v":22},{"v":"Coquitlam"}]}
    ]
  }
});`;

  const parsed = api.parseGvizJson(sampleGviz);
  assert.equal(parsed.sig, '998877');
  assert.equal(parsed.rows.length, 2);
  assert.equal(parsed.rows[0].id, 'v011');
  assert.equal(parsed.rows[0].name, 'Dave Thomas');
  assert.equal(parsed.rows[0].points, 31);
  assert.equal(parsed.rows[1].city, 'Coquitlam');
});

test('Unit 04 · RFC-4180 CSV Fallback Parser: handles quoted commas and escaped quotes', () => {
  const { api } = createLeaderboardHarness();
  const sampleCsv = [
    '"id","name","builds_with","known_for","points"',
    '"v011","Dave Thomas","Claude Code, Vercel","Two wins, ""clean sweep"" so far","31"',
    '"v004","Zachary","ChatGPT, GitHub Pages","Win and People\'s Choice","22"'
  ].join('\r\n');

  const parsed = api.parseCsv(sampleCsv);
  assert.equal(parsed.rows.length, 2);
  assert.equal(parsed.rows[0].id, 'v011');
  assert.equal(parsed.rows[0].builds_with, 'Claude Code, Vercel');
  assert.equal(parsed.rows[0].known_for, 'Two wins, "clean sweep" so far');
  assert.equal(parsed.rows[0].points, '31');
});

// ============================================================================
// 4. TWIST CARD 01 ("THE VIBER CARD") QA TESTS
// ============================================================================
test('QA 04 · Twist Card 01 (The Viber Card): opens for any viber, renders all 8 story fields + full 7-stat line, and closes cleanly', () => {
  const { api, elementsById, bodyEl, locationObj } = createLeaderboardHarness();

  // Open Dave Thomas's Viber Card
  api.openFighterModal('v011');
  assert.equal(api.state.modalId, 'v011');
  assert.equal(elementsById['fighter-modal-backdrop'].classList.contains('is-open'), true);
  assert.equal(bodyEl.classList.contains('has-viber-card-open'), true);
  assert.equal(locationObj.hash, '#viber-dave-thomas');

  const modalHtml = elementsById['fighter-modal-body'].innerHTML;
  // Story fields required by Twist Card 01
  assert.match(modalHtml, /Dave Thomas/);
  assert.match(modalHtml, /@name1/);
  assert.match(modalHtml, /Burnaby/);
  assert.match(modalHtml, /Claude Code/);
  assert.match(modalHtml, /Vercel/);
  assert.match(modalHtml, /Deploys at minute 20/);
  assert.match(modalHtml, /Two wins from three nights, and the only clean sweep so far/);
  assert.match(modalHtml, /A quoting tool for a roofing crew/);

  // Full 7-stat line required by Twist Card 01
  const requiredStatLabels = ['Points', 'Nights', 'Wins', "People's Choice", 'Yellow Cards', 'Best Night', 'Last Night'];
  requiredStatLabels.forEach(lbl => {
    assert.ok(modalHtml.includes(lbl), `The Viber Card is missing required full-line label: ${lbl}`);
  });

  // Test Zachary (viber with NO photo in the sheet) gets the exact same card structure
  api.openFighterModal('v004');
  assert.equal(api.state.modalId, 'v004');
  assert.equal(locationObj.hash, '#viber-zachary');
  const zacharyHtml = elementsById['fighter-modal-body'].innerHTML;
  assert.match(zacharyHtml, /Zachary/);
  assert.match(zacharyHtml, /Coquitlam/);
  assert.match(zacharyHtml, /Pure HTML, no framework/);
  assert.match(zacharyHtml, /A tip calculator for a barber/);
  assert.match(zacharyHtml, /class="vl-shot is-ini"/, 'No-photo viber must render the .vl-shot.is-ini monogram inside the photo frame');

  // Close card back to table
  api.closeFighterModal();
  assert.equal(api.state.modalId, null);
  assert.equal(elementsById['fighter-modal-backdrop'].classList.contains('is-open'), false);
  assert.equal(bodyEl.classList.contains('has-viber-card-open'), false);
  assert.equal(locationObj.hash, '', 'Closing the card must clean up the URL hash');
});

test('QA 05 · Twist Card Bonus: Hash Address Resolution (#viber-dave-thomas, #v008, #@ollie) & Print Stylesheet', () => {
  const { api } = createLeaderboardHarness();

  assert.equal(api.findViberByHash('#viber-dave-thomas').id, 'v011');
  assert.equal(api.findViberByHash('#viber-zachary').id, 'v004');
  assert.equal(api.findViberByHash('#v008').id, 'v008');
  assert.equal(api.findViberByHash('#ollie').id, 'v008');
  assert.equal(api.findViberByHash('#standings'), null, 'Page section hashes must not be mistaken for a viber card');

  // Verify print CSS rules exist in css/leaderboard.css
  assert.match(cssSource, /@media print/);
  assert.match(cssSource, /body\.has-viber-card-open \.viber-card-modal/);
});

// ============================================================================
// 5. V3 KINETIC OVERTAKE & RANK DELTA QA TESTS
// ============================================================================
test('QA 06 · Kinetic Rank Overtake & Coronation: detects rank changes, computes ▲/▼ deltas, and crowns new #1 leader', () => {
  const { api, elementsById } = createLeaderboardHarness();

  // Stage 1: Set Dave at 20 pts (#3) behind Ollie (27 pts, #1) and Zachary (22 pts, #2)
  const stage1Rows = api.FALLBACK_VIBERS.map(r => {
    if (r.id === 'v011') return { ...r, points: 20, episodes: 2, wins: 1 };
    return { ...r };
  });
  const stage1Norm = api.normalizeRows(stage1Rows);
  api.state.vibers = stage1Norm;
  api.state.previousMap = {};
  stage1Norm.forEach(v => { api.state.previousMap[v.id] = v; });

  assert.equal(stage1Norm[0].id, 'v008', 'Ollie starts at #1 in Stage 1');
  assert.equal(api.state.previousMap['v011'].rank, 4, 'Dave starts at #4 in Stage 1 (behind Ollie 27, Zachary 22, Raphael 22)');

  // Stage 2: Apply final scores where Dave hits 31 pts (+11 pts) and jumps from #4 -> #1
  const stage2Norm = api.normalizeRows(api.FALLBACK_VIBERS);
  api.applyNormalizedData(stage2Norm, 'OVERTAKE', { showTakeoverSplash: true });

  assert.equal(api.state.vibers[0].id, 'v011', 'Dave must now be Rank #1');
  assert.equal(api.state.rankDeltaMap['v011'], 3, 'Dave climbed +3 spots (#4 -> #1)');
  assert.equal(api.state.pointsDeltaMap['v011'], 11, 'Dave gained +11 points');
  assert.equal(api.state.rankDeltaMap['v008'], -1, 'Ollie moved down -1 spot (#1 -> #2)');
  assert.equal(api.state.coronatedId, 'v011', 'Dave must be marked as the newly coronated leader');

  // Verify the takeover splash rendered "DAVE TAKES THE LEAD!"
  assert.match(elementsById['lead-takeover-body'].innerHTML, /DAVE TAKES/);
  assert.match(elementsById['lead-takeover-body'].innerHTML, /THE LEAD!/);
});

test('QA 07 · Regression Guard: Card Click & Modal CSS Visibility Protection', () => {
  // Protects against CSS cache mismatch or missing modal open classes
  assert.match(cssSource, /\.viber-card-backdrop\.is-open/i, 'leaderboard.css must style .viber-card-backdrop.is-open');
  assert.match(cssSource, /\.vl-modal-backdrop\.is-open/i, 'leaderboard.css must style .vl-modal-backdrop.is-open for backwards cache safety');
  assert.match(htmlSource, /class="viber-card-backdrop vl-modal-backdrop"\s+id="fighter-modal-backdrop"/i, 'index.html modal backdrop must carry both classes');

  // Verify rendered table rows, podium cards, and dossiers all carry clickable data-open-modal attributes
  const { elementsById } = createLeaderboardHarness();
  const tbodyHtml = elementsById['lb-tbody'].innerHTML;
  const podiumHtml = elementsById['podium-container'].innerHTML;
  const dossiersHtml = elementsById['roster-cards-grid'].innerHTML;
  assert.match(tbodyHtml, /tr class="lb-row[^"]*"[^>]*data-open-modal="v011"/i, 'Table row itself must carry data-open-modal="v011"');
  assert.match(tbodyHtml, /<span class="who-name">Dave Thomas<\/span>/i, 'Table row must render viber name inside the clickable row');
  assert.match(podiumHtml, /data-open-modal="v011"/i, 'Podium card must carry data-open-modal="v011"');
  assert.match(dossiersHtml, /data-open-modal="v011"/i, 'Dossier card must carry data-open-modal="v011"');
});

test('QA 08 · V5 Readability, Mobile Fight-Card Layout & Jumbotron TV Mode Protection', () => {
  // 1. Verify Readability & Mobile CSS rules exist in css/leaderboard.css
  assert.match(cssSource, /--paper-readable:/i, 'V5 high-contrast readability token must be defined');
  assert.match(cssSource, /grid-template-areas:\s*"rank who pts"/i, 'V5 zero-scroll mobile fight-card grid must be defined');
  assert.match(cssSource, /body\.is-tv-mode\s+\.season-wrap/i, 'V5 16:9 Jumbotron split-stage TV layout must be defined');

  // 2. Verify mobile data-label attributes & CARD -> cue in rendered standings rows
  const { api, elementsById, bodyEl } = createLeaderboardHarness();
  const tbodyHtml = elementsById['lb-tbody'].innerHTML;
  assert.match(tbodyHtml, /data-label="Nights"/i);
  assert.match(tbodyHtml, /data-label="Wins"/i);
  assert.match(tbodyHtml, /data-label="Crowd ★"/i);
  assert.match(tbodyHtml, /data-label="Yellow Cards"/i);
  assert.match(tbodyHtml, /data-label="Best \/ Last"/i);
  assert.match(tbodyHtml, /data-label="Points"/i);
  assert.match(tbodyHtml, /class="row-card-cue"[^>]*>CARD →<\/span>/i);

  // 3. Verify programmatic Jumbotron TV mode toggle
  assert.equal(api.state.tvMode, false);
  api.setTvMode(true);
  assert.equal(api.state.tvMode, true);
  assert.equal(bodyEl.classList.contains('is-tv-mode'), true, 'body.is-tv-mode must be active when TV mode is enabled');
  api.setTvMode(false);
  assert.equal(api.state.tvMode, false);
  assert.equal(bodyEl.classList.contains('is-tv-mode'), false);

  // 4. Verify ?tv=1 URL parameter auto-activates Jumbotron TV mode on boot
  const tvBoot = createLeaderboardHarness('?tv=1');
  assert.equal(tvBoot.api.state.tvMode, true, '?tv=1 must auto-enable TV mode on boot');
  assert.equal(tvBoot.bodyEl.classList.contains('is-tv-mode'), true);
});


