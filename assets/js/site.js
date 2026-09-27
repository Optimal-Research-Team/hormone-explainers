/* Hormone Explainers — shared chrome, story engine and interaction helpers.
   Pages set <body data-chapter="N"> (0 = landing) and provide #nav, #end, #foot mounts.
   Chapter pages call HX.story({ onStep }) to wire their .story section. */
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

  var params = new URLSearchParams(window.location.search);
  var still = params.has('still');
  var reduce = still || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var body = document.body;
  var cur = parseInt(body.getAttribute('data-chapter') || '0', 10);
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };

  var I = {
    prev: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3 5 8l5 5"/></svg>',
    next: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m6 3 5 5-5 5"/></svg>',
    arrow: '<svg class="go" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 8h11M9 3.5 13.5 8 9 12.5"/></svg>',
    back: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 8h-11M7 3.5 2.5 8 7 12.5"/></svg>',
    grid: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="5" height="5" rx="1.4"/><rect x="9" y="2" width="5" height="5" rx="1.4"/><rect x="2" y="9" width="5" height="5" rx="1.4"/><rect x="9" y="9" width="5" height="5" rx="1.4"/></svg>',
    present: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1.8" y="2.5" width="12.4" height="8.5" rx="1.6"/><path d="M8 11v2.5M5.5 13.5h5"/><path d="M6.8 5.2v3.1L9.3 6.75z" fill="currentColor"/></svg>',
    close: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg>'
  };

  /* ---------- nav ---------- */
  var navMount = document.getElementById('nav');
  var hasStory = !!document.querySelector('.story');
  if (navMount) {
    var prev = cur > 1 ? CHAPTERS[cur - 2] : null;
    var next = cur && cur < CHAPTERS.length ? CHAPTERS[cur] : null;
    var steps = '';
    if (cur) {
      steps = '<div class="nav-steps"><span class="nav-count num">' + pad(cur) + '<i>/' + pad(CHAPTERS.length) + '</i></span><nav class="steps-nav" aria-label="Chapters">' +
        CHAPTERS.map(function (c) {
          var cls = 'snav' + (c.n < cur ? ' is-done' : '') + (c.n === cur ? ' is-current' : '');
          return '<a class="' + cls + '" href="' + c.file + '"' + (c.n === cur ? ' aria-current="page"' : '') +
            ' aria-label="Chapter ' + pad(c.n) + ': ' + c.title + '"><span class="tip">' + pad(c.n) + ' · ' + c.title + '</span></a>';
        }).join('') + '</nav></div>';
    }
    var actions = cur
      ? '<a class="icon-btn" href="' + (prev ? prev.file : 'index.html') + '" aria-label="Previous chapter">' + I.prev + '</a>' +
        '<a class="icon-btn" href="' + (next ? next.file : 'index.html') + '" aria-label="Next chapter">' + I.next + '</a>' +
        (hasStory ? '<button class="nav-cta nav-ghost" type="button" data-present>' + I.present + '<span>Present</span></button>' : '') +
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

  /* ---------- chapter end + footer ---------- */
  var endMount = document.getElementById('end');
  if (endMount && cur) {
    var nx = CHAPTERS[cur], pv = CHAPTERS[cur - 2];
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
        '<span class="kbd-hint"><kbd>←</kbd><kbd>→</kbd> between chapters</span>' +
      '</div></section>';
  }
  var footMount = document.getElementById('foot');
  if (footMount) {
    var note = body.getAttribute('data-note') || 'Adapted from clinician notes.';
    footMount.innerHTML = '<footer class="foot"><div class="foot-inner">' +
      '<img src="assets/img/optimal-wordmark-green.png" alt="Optimal" width="86" height="20">' +
      '<p>' + note + ' For education only, not a substitute for individual medical advice.</p>' +
      '<span>© Optimal Health</span></div></footer>';
  }

  /* ---------- keyboard: chapters (scroll mode) ---------- */
  window.addEventListener('keydown', function (e) {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
    if (body.classList.contains('present')) return;
    var t = e.target;
    if (t && t.closest && t.closest('input, textarea, select, [role="slider"], [data-keys]')) return;
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
      svg.setAttribute('class', 'scribble'); svg.setAttribute('aria-hidden', 'true');
      svg.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'path'));
      el.appendChild(svg);
    }
    var w = el.offsetWidth + 28, h = el.offsetHeight + 12;
    svg.setAttribute('width', w); svg.setAttribute('height', h); svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    svg.firstChild.setAttribute('d', scribble(w, h)); svg.firstChild.setAttribute('pathLength', '1');
  }
  var marks = [].slice.call(document.querySelectorAll('.mark'));
  marks.forEach(paintMark);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { marks.forEach(paintMark); });
  if ('ResizeObserver' in window) {
    var ro = new ResizeObserver(function (en) { en.forEach(function (e) { paintMark(e.target); }); });
    marks.forEach(function (m) { ro.observe(m); });
  }

  /* ---------- reveal on scroll ---------- */
  function markIn(el) {
    if (el.classList.contains('in')) return;
    el.classList.add('in');
    el.querySelectorAll('.mark').forEach(function (m) { m.classList.add('drawn'); });
    if (el.classList.contains('mark')) el.classList.add('drawn');
    el.dispatchEvent(new CustomEvent('reveal'));
  }
  var revealables = document.querySelectorAll('.reveal, .fig, .stage, [data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { markIn(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(markIn);
  }

  /* ---------- linked highlighting ----------
     Inside a [data-links] scope, data-t="key" elements are triggers and every element whose
     data-k list contains an active key gets .is-on. Active keys = hover || pinned || base,
     where base is set programmatically (for example by the current story step). */
  function links(scope) {
    var targets = [].slice.call(scope.querySelectorAll('[data-k]'));
    var triggers = [].slice.call(scope.querySelectorAll('[data-t]'));
    var base = null, pinned = null, hover = null, sig = null;
    function norm(k) { return k == null ? null : Array.isArray(k) ? (k.length ? k : null) : [k]; }
    function render() {
      var ks = norm(hover || pinned || base), s = ks ? ks.join('|') : '';
      if (s === sig) return;
      sig = s;
      scope.classList.toggle('has-focus', !!ks);
      targets.forEach(function (el) {
        var list = ' ' + el.getAttribute('data-k') + ' ';
        el.classList.toggle('is-on', !!ks && ks.some(function (k) { return list.indexOf(' ' + k + ' ') > -1; }));
      });
      scope.dispatchEvent(new CustomEvent('focuskey', { detail: { keys: ks, source: hover ? 'hover' : pinned ? 'pin' : ks ? 'base' : null } }));
    }
    function setPinned(k) {
      pinned = k;
      triggers.forEach(function (t) { t.classList.toggle('is-pinned', t.getAttribute('data-t') === k); });
      render();
    }
    triggers.forEach(function (t) {
      var k = t.getAttribute('data-t');
      if (!t.matches('a, button, input')) { t.tabIndex = 0; t.setAttribute('role', 'button'); }
      t.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { hover = k; render(); } });
      t.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') { hover = null; render(); } });
      t.addEventListener('focus', function () { if (t.matches(':focus-visible')) { hover = k; render(); } });
      t.addEventListener('blur', function () { hover = null; render(); });
      t.addEventListener('click', function (e) { e.stopPropagation(); setPinned(pinned === k ? null : k); });
      t.addEventListener('keydown', function (e) { if ((e.key === 'Enter' || e.key === ' ') && !t.matches('a, button')) { e.preventDefault(); t.click(); } });
    });
    document.addEventListener('click', function (e) { if (pinned && !scope.contains(e.target)) setPinned(null); });
    return {
      setBase: function (k) { base = norm(k); hover = null; setPinned(null); },
      pin: setPinned,
      refresh: function () { sig = null; render(); }
    };
  }
  document.querySelectorAll('[data-links]').forEach(function (s) { s._links = links(s); });

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
    var from = (el.getAttribute('d') || '').match(NUM) || [], to = toD.match(NUM) || [];
    if (from.length !== to.length) { el.setAttribute('d', toD); return Promise.resolve(); }
    var parts = toD.split(/-?\d*\.?\d+(?:e[-+]?\d+)?/i), a = from.map(Number), b = to.map(Number);
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
  function onReveal(el, cb) { if (el.classList.contains('in')) cb(); else el.addEventListener('reveal', cb, { once: true }); }

  /* ---------- story engine ----------
     .story > .stage-col (sticky dark stage) + .steps > .step. Scroll activates the step crossing
     the trigger line; the stage stepper and Present mode drive the same go(i). */
  var storyApi = null;
  function story(opts) {
    var root = document.querySelector('.story');
    if (!root) return null;
    var steps = [].slice.call(root.querySelectorAll('.step'));
    var n = steps.length, idx = -1, mode = 'scroll', io = null;
    var dotsEl = root.querySelector('.dots');
    var prevBtn = root.querySelector('[data-step-prev]'), nextBtn = root.querySelector('[data-step-next]');
    steps.forEach(function (s, i) {
      var sn = s.querySelector('.step-n');
      if (sn && !sn.textContent.trim()) sn.textContent = 'Step ' + pad(i + 1) + ' of ' + pad(n);
    });
    if (dotsEl) {
      dotsEl.innerHTML = steps.map(function (s, i) { return '<button type="button" aria-label="Step ' + (i + 1) + '"></button>'; }).join('');
      [].slice.call(dotsEl.children).forEach(function (b, i) { b.addEventListener('click', function () { request(i); }); });
    }
    function go(i) {
      i = Math.max(0, Math.min(n - 1, i));
      if (i === idx) return;
      var from = idx;
      idx = i;
      steps.forEach(function (s, k) { s.classList.toggle('is-active', k === i); });
      if (dotsEl) [].slice.call(dotsEl.children).forEach(function (b, k) { if (k === i) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); });
      if (prevBtn) prevBtn.disabled = mode === 'scroll' && i === 0;
      if (nextBtn) nextBtn.disabled = mode === 'scroll' && i === n - 1;
      if (opts.onStep) opts.onStep(i, steps[i], from);
    }
    function scrollToStep(i, instant) {
      var s = steps[Math.max(0, Math.min(n - 1, i))];
      var r = s.getBoundingClientRect(), y;
      if (mobile()) {
        var col = root.querySelector('.stage-col');
        var stageBottom = parseFloat(getComputedStyle(col).top) + col.offsetHeight;
        y = window.scrollY + r.top - stageBottom - 14;
      } else {
        y = window.scrollY + r.top + r.height / 2 - window.innerHeight * 0.5;
      }
      window.scrollTo({ top: y, behavior: instant || reduce ? 'auto' : 'smooth' });
    }
    function request(i) {
      if (mode === 'present') { presentGo(i); return; }
      i = Math.max(0, Math.min(n - 1, i));
      go(i); scrollToStep(i);
    }
    function mobile() { return window.matchMedia('(max-width: 1000px)').matches; }
    function observe() {
      if (io) io.disconnect();
      var m = '-49% 0px -50% 0px';
      if (mobile()) {
        var col = root.querySelector('.stage-col');
        var line = Math.min(0.92, (parseFloat(getComputedStyle(col).top) + col.offsetHeight + 60) / window.innerHeight);
        m = '-' + Math.round(line * 100) + '% 0px -' + (99 - Math.round(line * 100)) + '% 0px';
      }
      io = new IntersectionObserver(function (entries) {
        if (mode !== 'scroll') return;
        entries.forEach(function (e) { if (e.isIntersecting) go(steps.indexOf(e.target)); });
      }, { rootMargin: m, threshold: 0 });
      steps.forEach(function (s) { io.observe(s); });
    }
    steps.forEach(function (s, i) { s.addEventListener('click', function (e) { if (mode === 'scroll' && i !== idx && !e.target.closest('[data-t], button, a')) request(i); }); });
    if (prevBtn) prevBtn.addEventListener('click', function () { request(idx - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { request(idx + 1); });

    /* reading progress in the nav segment */
    var seg = document.querySelector('.snav.is-current');
    function progress() {
      if (!seg) return;
      var r = root.getBoundingClientRect(), total = r.height - window.innerHeight * 0.5;
      var p = Math.max(0, Math.min(1, (window.innerHeight * 0.5 - r.top) / Math.max(1, total)));
      seg.style.setProperty('--p', (p * 100).toFixed(1) + '%');
    }
    window.addEventListener('scroll', progress, { passive: true });

    /* present mode */
    function presentGo(i) {
      if (i < 0) { if (cur > 1) window.location.href = CHAPTERS[cur - 2].file + '?present=last'; return; }
      if (i >= n) { window.location.href = cur < CHAPTERS.length ? CHAPTERS[cur].file + '?present' : 'index.html'; return; }
      go(i);
    }
    function onPresentKey(e) {
      if (mode !== 'present') return;
      var k = e.key;
      if (k === 'ArrowRight' || k === 'PageDown' || k === ' ' || k === 'Enter' && !e.target.closest('button, a')) { e.preventDefault(); presentGo(idx + 1); }
      else if (k === 'ArrowLeft' || k === 'PageUp' || k === 'Backspace') { e.preventDefault(); presentGo(idx - 1); }
      else if (k === 'Escape') { e.preventDefault(); exitPresent(); }
      else if (k === 'Home') { e.preventDefault(); presentGo(0); }
      else if (k === 'End') { e.preventDefault(); presentGo(n - 1); }
      else if ((k === 'f' || k === 'F') && document.documentElement.requestFullscreen) {
        e.preventDefault();
        if (document.fullscreenElement) document.exitFullscreen().catch(function () {});
        else document.documentElement.requestFullscreen().catch(function () {});
      }
    }
    function enterPresent(at) {
      mode = 'present';
      body.classList.add('present');
      if (prevBtn) prevBtn.disabled = false;
      if (nextBtn) nextBtn.disabled = false;
      var u = new URL(window.location.href); u.searchParams.set('present', ''); history.replaceState(null, '', u.toString().replace('present=', 'present'));
      if (typeof at === 'number') { idx = -1; go(at); }
      window.dispatchEvent(new Event('resize'));
    }
    function exitPresent() {
      mode = 'scroll';
      body.classList.remove('present');
      var u = new URL(window.location.href); u.searchParams.delete('present'); history.replaceState(null, '', u.toString());
      if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(function () {});
      window.dispatchEvent(new Event('resize'));
      requestAnimationFrame(function () { scrollToStep(idx, true); });
    }
    window.addEventListener('keydown', onPresentKey);
    document.querySelectorAll('[data-present]').forEach(function (b) { b.addEventListener('click', function () { enterPresent(Math.max(0, idx)); }); });
    root.querySelectorAll('[data-present-exit]').forEach(function (b) { b.addEventListener('click', exitPresent); });

    var mq = window.matchMedia('(max-width: 1000px)');
    if (mq.addEventListener) mq.addEventListener('change', observe);
    observe();

    var startAt = parseInt(params.get('step') || '1', 10) - 1;
    if (params.has('present')) {
      var pv = params.get('present');
      enterPresent(pv === 'last' ? n - 1 : Math.max(0, startAt));
    } else {
      go(Math.max(0, startAt));
      if (params.has('step')) requestAnimationFrame(function () { scrollToStep(startAt, true); });
    }
    progress();
    storyApi = { go: request, get index() { return idx; }, get mode() { return mode; }, present: enterPresent, exit: exitPresent, count: n };
    return storyApi;
  }

  window.HX = { chapters: CHAPTERS, current: cur, reduce: reduce, still: still, tween: tween, morph: morph, sampler: sampler, onReveal: onReveal, pad: pad, icons: I, story: story, links: links };
})();
