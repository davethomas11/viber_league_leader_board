/* Vibers League motion + interaction layer, shared by every UI kit.
   Mounts the Clock V mark, the cursor-reactive layer, section reveals,
   scroll-linked custom properties, and the live clock. */
(function () {
  var MARK = '<svg class="vl" viewBox="0 0 120 120" aria-hidden="true"><circle class="face" cx="60" cy="60" r="52"/><g class="ticks"><line x1="60" y1="6" x2="60" y2="14"/><line x1="114" y1="60" x2="106" y2="60"/><line x1="60" y1="114" x2="60" y2="106"/><line x1="6" y1="60" x2="14" y2="60"/></g><circle class="arc" cx="60" cy="60" r="52"/><line class="hand a" x1="60" y1="60" x2="60" y2="16"/><line class="hand b" x1="60" y1="60" x2="60" y2="16"/><circle class="dot" cx="60" cy="60" r="6"/></svg>';

  document.querySelectorAll('[data-mark]').forEach(function (el) {
    el.innerHTML = MARK;
    var svg = el.querySelector('.vl');
    if (el.hasAttribute('data-drain')) svg.classList.add('vl-drain');
    if (el.hasAttribute('data-enter')) svg.classList.add('vl-enter');
  });

  // cursor: eased --mx/--my on :root, raw --cx/--cy inside [data-spot]
  if (!matchMedia('(hover:none)').matches) {
    var root = document.documentElement, spots = [].slice.call(document.querySelectorAll('[data-spot]'));
    var tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    addEventListener('pointermove', function (e) {
      tx = (e.clientX / innerWidth - .5) * 2; ty = (e.clientY / innerHeight - .5) * 2;
      spots.forEach(function (el) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--cx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--cy', (e.clientY - r.top) + 'px');
      });
      if (!raf) raf = requestAnimationFrame(ease);
    }, { passive: true });
    function ease() {
      cx += (tx - cx) * .08; cy += (ty - cy) * .08;
      root.style.setProperty('--mx', cx.toFixed(3)); root.style.setProperty('--my', cy.toFixed(3));
      raf = (Math.abs(tx - cx) > .001 || Math.abs(ty - cy) > .001) ? requestAnimationFrame(ease) : 0;
    }
  }

  // stagger indices
  document.querySelectorAll('[data-stagger],.fighters,.round-grid,.corner ul,.form-card').forEach(function (g) {
    [].slice.call(g.children).forEach(function (c, i) { c.style.setProperty('--i', i); });
  });

  // section reveals, replayed when a section fully leaves the viewport
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) e.target.classList.add('in');
      else if (e.intersectionRatio === 0) e.target.classList.remove('in');
    });
  }, { threshold: [0, .18] });
  document.querySelectorAll('[data-reveal]').forEach(function (el) { io.observe(el); });

  // scroll-linked values
  var docEl = document.documentElement;
  var pxEls = [].slice.call(document.querySelectorAll('[data-px]'));
  var ticking = false;
  function onScroll() {
    var vh = innerHeight;
    docEl.style.setProperty('--sy', scrollY);
    docEl.style.setProperty('--p', Math.min(1, scrollY / (docEl.scrollHeight - vh)).toFixed(4));
    pxEls.forEach(function (el) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--sy', Math.round((r.top + r.height / 2) - vh / 2));
    });
    ticking = false;
  }
  addEventListener('scroll', function () { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();

  // live clock: counts down while on screen
  function pad(n) { return String(n).padStart(2, '0'); }
  document.querySelectorAll('.clock').forEach(function (clock) {
    // whole seconds only: a millisecond readout makes the number twitch
    var total = parseInt(clock.getAttribute('data-ms') || '3600000', 10), start = 0, timer = 0;
    function tick() {
      var left = Math.max(0, total - (performance.now() - start));
      clock.textContent = pad(Math.floor(left / 60000)) + ':' + pad(Math.floor(left % 60000 / 1000));
    }
    new IntersectionObserver(function (es) {
      clearInterval(timer);
      if (es[0].isIntersecting) { start = performance.now(); tick(); timer = setInterval(tick, 250); }
    }, { threshold: .2 }).observe(clock);
  });

  // role toggles
  document.querySelectorAll('.role-toggle').forEach(function (group) {
    group.querySelectorAll('.role').forEach(function (r) {
      r.addEventListener('click', function () {
        group.querySelectorAll('.role').forEach(function (x) { x.classList.remove('active'); });
        r.classList.add('active');
        var pill = document.querySelector('[data-role-pill]');
        if (pill && r.dataset.role) pill.textContent = r.dataset.role;
      });
    });
  });
})();
