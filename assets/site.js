// Hover fill on buttons, and smooth scrolling for the left-hand links.
(function () {
  var pos = { left: 'translate(-101%,0)', right: 'translate(101%,0)', top: 'translate(0,-101%)', bottom: 'translate(0,101%)' };
  function side(el, e) {
    var r = el.getBoundingClientRect();
    var d = { left: e.clientX - r.left, right: r.right - e.clientX, top: e.clientY - r.top, bottom: r.bottom - e.clientY };
    return Object.keys(d).reduce(function (a, b) { return d[b] < d[a] ? b : a; });
  }
  document.querySelectorAll('.hv').forEach(function (el) {
    el.addEventListener('mouseenter', function (e) {
      var fl = el.querySelector('.fl');
      if (!fl) return;
      fl.style.transition = 'none';
      fl.style.transform = pos[side(el, e)];
      void fl.offsetWidth;
      fl.style.transition = '';
      fl.style.transform = 'translate(0,0)';
      el.classList.add('is-on');
    });
    el.addEventListener('mouseleave', function (e) {
      var fl = el.querySelector('.fl');
      if (!fl) return;
      fl.style.transform = pos[side(el, e)];
      el.classList.remove('is-on');
    });
  });
  document.querySelectorAll('.ly a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.getElementById(a.getAttribute('href').slice(1));
      if (!t) return;
      e.preventDefault();
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', a.getAttribute('href'));
      a.closest('nav').querySelectorAll('a').forEach(function (x) { x.classList.remove('on'); });
      a.classList.add('on');
    });
  });
})();
