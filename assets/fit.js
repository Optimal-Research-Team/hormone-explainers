// Scales the 1920x1080 stage to fit the viewport, and wires arrow-key navigation
// between explainers via data-prev / data-next on <body>.
(function () {
  var fit = function () {
    var s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    document.documentElement.style.setProperty('--s', s);
  };
  window.addEventListener('resize', fit);
  fit();

  window.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var to = null;
    if (e.key === 'ArrowRight' || e.key === 'Right') to = document.body.dataset.next;
    if (e.key === 'ArrowLeft' || e.key === 'Left') to = document.body.dataset.prev;
    if (to) window.location.href = to;
  });
})();
