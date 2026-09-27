/* Hormone Explainers — shared chrome + interaction helpers.
   Pages set <body data-chapter="N"> (0 = landing) and provide #nav, #end, #foot mounts. */
(function () {
  'use strict';

  var CHAPTERS = [
    { n: 1, file: '01-dose-response.html', title: 'Cortisol has a dose-dependent effect', tag: 'The basics',
      blurb: 'Too little and too much both cause harm. The body needs a middle band.' },
    { n: 2, file: '02-hpa-dysfunction.html', title: 'How HPA dysfunction evolves', tag: 'Progression',
      blurb: 'Under chronic stress, the daily cortisol curve flattens in four stages.' },
    { n: 3, file: '03-measuring-cortisol.html', title: 'Three ways to measure cortisol', tag: 'Measurement',
      blurb: 'Awakening response, diurnal slope and total output, all read from one daily curve.' },
    { n: 4, file: '04-cortisol-partners.html', title: "Cortisol's partners", tag: 'Regulation',
      blurb: 'What turns cortisol production down, what buffers its effects, and its see-saw with melatonin.' },
    { n: 5, file: '05-hormone-tree.html', title: 'Foundational vs. top-line hormones', tag: 'Priorities',
      blurb: 'Sex hormones are the canopy. Cortisol and thyroid are the roots.' },
    { n: 6, file: '06-cycle-stop-points.html', title: 'The hormone cycle and its stop points', tag: 'Interventions',
      blurb: 'Hormones feed each other in a loop, with six places to interrupt it.' },
    { n: 7, file: '07-sleep-hormone-web.html', title: 'Sleep, cortisol and the hormone web', tag: 'Connections',
      blurb: 'Twelve links between sleep, melatonin, cortisol, insulin and the sex hormones.' },
    { n: 8, file: '08-pyramid-of-interventions.html', title: 'The pyramid of interventions', tag: 'Where to start',
      blurb: 'Build from the base: sleep and circadian rhythm come before supplements.' }
  ];

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var body = document.body;
  var cur = parseInt(body.getAttribute('data-chapter') || '0', 10);
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };

  var I = {
    prev: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3 5 8l5 5"/></svg>',
    next: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m6 3 5 5-5 5"/></svg>',
    arrow: '<svg class="go" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 8h11M9 3.5 13.5 8 9 12.5"/></svg>',
    back: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 8h-11M7 3.5 2.5 8 7 12.5"/></svg>',
    grid: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="5" height="5" rx="1.4"/><rect x="9" y="2" width="5" height="5" rx="1.4"/><rect x="2" y="9" width="5" height="5" rx="1.4"/><rect x="9" y="9" width="5" height="5" rx="1.4"/></svg>'
  };

  /* ---------- nav ---------- */
  var navMount = document.getElementById('nav');
  if (navMount) {
    var prev = cur > 1 ? CHAPTERS[cur - 2] : null;
    var next = cur && cur < CHAPTERS.length ? CHAPTERS[cur] : null;
    var steps = '';
    if (cur) {
      steps = '<div class="nav-steps"><span class="nav-count num">' + pad(cur) + '<i>/' + pad(CHAPTERS.length) + '</i></span><nav class="steps" aria-label="Chapters">' +
        CHAPTERS.map(function (c) {
          var cls = 'step' + (c.n < cur ? ' is-done' : '') + (c.n === cur ? ' is-current' : '');
          return '<a class="' + cls + '" href="' + c.file + '"' + (c.n === cur ? ' aria-current="page"' : '') +
            ' aria-label="Chapter ' + pad(c.n) + ': ' + c.title + '"><span class="tip">' + pad(c.n) + ' · ' + c.title + '</span></a>';
        }).join('') + '</nav></div>';
    }
    var actions = cur
      ? '<a class="icon-btn" href="' + (prev ? prev.file : 'index.html') + '" aria-label="Previous chapter">' + I.prev + '</a>' +
        '<a class="icon-btn" href="' + (next ? next.file : 'index.html') + '" aria-label="Next chapter">' + I.next + '</a>' +
        '<a class="nav-cta" href="index.html#series">' + I.grid + '<span>All chapters</span></a>'
      : '<a class="nav-cta" href="' + CHAPTERS[0].file + '"><span>Start chapter 01</span>' + I.arrow + '</a>';
    navMount.innerHTML =
      '<div class="nav">' +
        '<a class="nav-brand" href="index.html" aria-label="Hormone explainers — home">' +
          '<img src="assets/img/optimal-wordmark-white.png" alt="Optimal" width="90" height="21">' +
          '<span class="nav-title">Hormone explainers</span>' +
        '</a>' + steps +
        '<div class="nav-actions">' + actions + '</div>' +
      '</div>';
  }

  /* ---------- chapter end ---------- */
  var endMount = document.getElementById('end');
  if (endMount && cur) {
    var nx = CHAPTERS[cur];
    var pv = CHAPTERS[cur - 2];
    var card = nx
      ? '<a class="next-card" href="' + nx.file + '">' +
          '<div class="next-copy"><span class="label">Up next · Chapter ' + pad(nx.n) + ' · ' + nx.tag + '</span>' +
          '<span class="next-title">' + nx.title + '</span><span class="next-blurb">' + nx.blurb + '</span></div>' +
          '<span class="next-go" aria-hidden="true">' + I.arrow + '</span><span class="next-num" aria-hidden="true">' + pad(nx.n) + '</span></a>'
      : '<a class="next-card" href="index.html">' +
          '<div class="next-copy"><span class="label">End of the series</span>' +
          '<span class="next-title">Back to all eight chapters</span><span class="next-blurb">Revisit any chapter, or start again from how cortisol works.</span></div>' +
          '<span class="next-go" aria-hidden="true">' + I.arrow + '</span></a>';
    endMount.innerHTML = '<section class="end">' + card +
      '<div class="end-row">' +
        (pv ? '<a class="end-link" href="' + pv.file + '">' + I.back + 'Previous: ' + pv.title + '</a>'
            : '<a class="end-link" href="index.html">' + I.back + 'All chapters</a>') +
        '<span class="kbd-hint"><kbd>←</kbd><kbd>→</kbd> to move between chapters</span>' +
      '</div></section>';
  }

  /* ---------- footer ---------- */
  var footMount = document.getElementById('foot');
  if (footMount) {
    var note = body.getAttribute('data-note') || 'Adapted from clinician notes.';
    footMount.innerHTML = '<footer class="foot"><div class="foot-inner">' +
      '<img src="assets/img/optimal-wordmark-green.png" alt="Optimal" width="86" height="20">' +
      '<p>' + note + ' For education only, not a substitute for individual medical advice.</p>' +
      '<span>© Optimal Health</span></div></footer>';
  }

  /* ---------- keyboard navigation ---------- */
  window.addEventListener('keydown', function (e) {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
    var t = e.target;
    if (t && t.closest && t.closest('input, textarea, select, [role="slider"], .seg, [data-keys]')) return;
    var to = null;
    if (e.key === 'ArrowRight') to = cur < CHAPTERS.length ? CHAPTERS[cur].file : 'index.html';
    if (e.key === 'ArrowLeft' && cur) to = cur > 1 ? CHAPTERS[cur - 2].file : 'index.html';
    if (to) window.location.href = to;
  });

  /* ---------- hand-drawn ellipse ---------- */
  function scribble(w, h) {
    var cx = w / 2, cy = h / 2, rx = w / 2, ry = h / 2, N = 110, turns = 1.06, a0 = Math.PI * 0.9, d = '';
    for (var i = 0; i <= N; i++) {
      var t = i / N, a = a0 + t * turns * Math.PI * 2;
      var k = 1 + 0.03 * Math.sin(t * Math.PI * 3.2) - 0.045 * t;
      d += (i ? 'L' : 'M') + (cx + Math.cos(a) * rx * k).toFixed(1) + ' ' + (cy + Math.sin(a) * ry * k * (1 + 0.04 * Math.cos(a))).toFixed(1);
    }
    return d;
  }
  function paintMark(el) {
    var svg = el.querySelector('svg.scribble');
    if (!svg) {
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'scribble');
      svg.setAttribute('aria-hidden', 'true');
      svg.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'path'));
      el.appendChild(svg);
    }
    var w = el.offsetWidth + 28, h = el.offsetHeight + 12;
    svg.setAttribute('width', w); svg.setAttribute('height', h);
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    var p = svg.firstChild;
    p.setAttribute('d', scribble(w, h));
    p.setAttribute('pathLength', '1');
  }
  var marks = [].slice.call(document.querySelectorAll('.mark'));
  function paintAll() { marks.forEach(paintMark); }
  paintAll();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(paintAll);
  if ('ResizeObserver' in window) {
    var ro = new ResizeObserver(function (entries) { entries.forEach(function (e) { paintMark(e.target); }); });
    marks.forEach(function (m) { ro.observe(m); });
  } else {
    window.addEventListener('resize', paintAll);
  }

  /* ---------- reveal on scroll ---------- */
  function markIn(el) {
    if (el.classList.contains('in')) return;
    el.classList.add('in');
    el.querySelectorAll('.mark').forEach(function (m) { m.classList.add('drawn'); });
    if (el.classList.contains('mark')) el.classList.add('drawn');
    el.dispatchEvent(new CustomEvent('reveal'));
  }
  var revealables = document.querySelectorAll('.reveal, .fig, [data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { markIn(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.16, rootMargin: '0px 0px -5% 0px' });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(markIn);
  }

  /* ---------- linked highlighting ----------
     Inside a [data-links] scope: elements with data-t="key" are triggers;
     every element whose data-k list contains the active key gets .is-on. */
  function links(scope) {
    var targets = [].slice.call(scope.querySelectorAll('[data-k]'));
    var triggers = [].slice.call(scope.querySelectorAll('[data-t]'));
    var pinned = null, active;
    function apply(k) {
      if (k === active) return;
      active = k;
      scope.classList.toggle('has-focus', !!k);
      targets.forEach(function (el) {
        el.classList.toggle('is-on', !!k && (' ' + el.getAttribute('data-k') + ' ').indexOf(' ' + k + ' ') > -1);
      });
      scope.dispatchEvent(new CustomEvent('focuskey', { detail: k }));
    }
    function pin(k) {
      pinned = k;
      triggers.forEach(function (t) {
        var on = t.getAttribute('data-t') === k;
        t.classList.toggle('is-pinned', on);
        if (t.hasAttribute('aria-pressed')) t.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      apply(k);
    }
    triggers.forEach(function (t) {
      var k = t.getAttribute('data-t');
      if (!t.matches('a, button, input')) { t.tabIndex = 0; t.setAttribute('role', 'button'); }
      if (!t.hasAttribute('aria-pressed')) t.setAttribute('aria-pressed', 'false');
      t.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') apply(k); });
      t.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') apply(pinned); });
      t.addEventListener('focus', function () { if (t.matches(':focus-visible')) apply(k); });
      t.addEventListener('blur', function () { apply(pinned); });
      t.addEventListener('click', function (e) { e.stopPropagation(); pin(pinned === k ? null : k); });
      t.addEventListener('keydown', function (e) {
        if ((e.key === 'Enter' || e.key === ' ') && !t.matches('a, button')) { e.preventDefault(); t.click(); }
      });
    });
    document.addEventListener('click', function (e) { if (pinned && !scope.contains(e.target)) pin(null); });
    return { preview: apply, pin: pin, get pinned() { return pinned; } };
  }
  var linkScopes = [];
  document.querySelectorAll('[data-links]').forEach(function (s) { s._links = links(s); linkScopes.push(s); });

  /* ---------- animation helpers ---------- */
  var easeInOut = function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  function tween(dur, fn, ease) {
    ease = ease || easeInOut;
    return new Promise(function (resolve) {
      if (reduce || dur <= 0) { fn(1); resolve(); return; }
      var t0 = performance.now();
      (function tick(now) {
        var t = Math.min(1, (now - t0) / dur);
        if (fn(ease(t)) === false) { resolve(); return; }
        if (t < 1) requestAnimationFrame(tick); else resolve();
      })(t0);
    });
  }
  var NUM = /-?\d*\.?\d+(?:e[-+]?\d+)?/gi;
  function morph(el, toD, dur) {
    var from = (el.getAttribute('d') || '').match(NUM) || [];
    var to = toD.match(NUM) || [];
    if (from.length !== to.length) { el.setAttribute('d', toD); return Promise.resolve(); }
    var parts = toD.split(/-?\d*\.?\d+(?:e[-+]?\d+)?/i);
    var a = from.map(Number), b = to.map(Number);
    var id = (el._morph = (el._morph || 0) + 1);
    return tween(dur == null ? 900 : dur, function (e) {
      if (el._morph !== id) return false;
      var s = parts[0];
      for (var i = 0; i < b.length; i++) s += (a[i] + (b[i] - a[i]) * e).toFixed(2) + parts[i + 1];
      el.setAttribute('d', s);
    });
  }
  function sampler(path, n) {
    n = n || 400;
    var L = path.getTotalLength(), pts = [];
    for (var i = 0; i <= n; i++) { var p = path.getPointAtLength(L * i / n); pts.push([p.x, p.y]); }
    return function (x) {
      var lo = 0, hi = pts.length - 1;
      while (hi - lo > 1) { var m = (lo + hi) >> 1; if (pts[m][0] < x) lo = m; else hi = m; }
      var p0 = pts[lo], p1 = pts[hi], t = p1[0] === p0[0] ? 0 : (x - p0[0]) / (p1[0] - p0[0]);
      return p0[1] + (p1[1] - p0[1]) * t;
    };
  }
  function onReveal(el, cb) {
    if (el.classList.contains('in')) cb();
    else el.addEventListener('reveal', cb, { once: true });
  }

  window.HX = { chapters: CHAPTERS, current: cur, reduce: reduce, tween: tween, morph: morph, sampler: sampler, onReveal: onReveal, pad: pad, icons: I };
})();
