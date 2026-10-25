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

  // Figma-style comment pins: an image's caption moves into a numbered pin on the image.
  var caps = [].filter.call(document.querySelectorAll('p.cap:not([style])'), function (p) {
    var m = p.previousElementSibling;
    return m && m.querySelector('img') && !m.querySelector('a');
  });
  if (!caps.length) return;
  var css = document.createElement('style');
  css.textContent =
    '.cm-host{position:relative}' +
    '.cm{position:absolute;top:14px;right:14px;z-index:5;display:flex;flex-direction:row-reverse;align-items:flex-start;gap:8px}' +
    '.cm-pin{width:32px;height:32px;border-radius:50% 50% 50% 0;background:#B54329;color:#F9F9EE;border:2px solid #fff;box-shadow:0 2px 8px rgba(45,42,37,.25);font:600 13px Inter,system-ui,sans-serif;display:flex;align-items:center;justify-content:center;padding:0;cursor:inherit;transition:transform .2s cubic-bezier(.22,.8,.3,1)}' +
    '.cm-pin:hover,.cm.open .cm-pin{transform:scale(1.12)}' +
    '.cm-pin:focus-visible{outline:2px solid #2D2A25;outline-offset:2px}' +
    '.cm-card{width:230px;max-width:calc(100vw - 110px);background:#fff;border:1px solid #D5D1C0;border-radius:12px;padding:10px 14px;box-shadow:0 6px 20px rgba(45,42,37,.14);font:13px/1.45 Inter,system-ui,sans-serif;color:#2D2A25;opacity:0;transform:translateY(-4px);pointer-events:none;transition:opacity .18s,transform .18s}' +
    '.cm-card b{display:block;font-weight:600;margin-bottom:2px}' +
    '.cm-card p{margin:0;color:#3E3A34}' +
    '.cm.open .cm-card{opacity:1;transform:none;pointer-events:auto}' +
    '@media (hover:hover){.cm:hover .cm-card{opacity:1;transform:none;pointer-events:auto}}' +
    '@media (prefers-reduced-motion:reduce){.cm-pin,.cm-card{transition:none}}';
  document.head.appendChild(css);
  var all = [];
  caps.forEach(function (p, i) {
    var host = p.previousElementSibling;
    var box = document.createElement('div');
    box.className = 'cm';
    var pin = document.createElement('button');
    pin.type = 'button';
    pin.className = 'cm-pin';
    pin.textContent = i + 1;
    pin.setAttribute('aria-label', 'Comment ' + (i + 1) + ': ' + p.textContent);
    pin.setAttribute('aria-expanded', 'false');
    var card = document.createElement('div');
    card.className = 'cm-card';
    card.innerHTML = '<b>Margaret Alba</b>';
    p.className = '';
    card.appendChild(p);
    box.appendChild(pin);
    box.appendChild(card);
    host.classList.add('cm-host');
    host.appendChild(box);
    all.push(box);
    pin.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !box.classList.contains('open');
      all.forEach(function (b) { b.classList.remove('open'); b.firstChild.setAttribute('aria-expanded', 'false'); });
      box.classList.toggle('open', open);
      pin.setAttribute('aria-expanded', String(open));
    });
  });
  function closeAll() {
    all.forEach(function (b) { b.classList.remove('open'); b.firstChild.setAttribute('aria-expanded', 'false'); });
  }
  document.addEventListener('click', function (e) { if (!e.target.closest('.cm')) closeAll(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });
})();
