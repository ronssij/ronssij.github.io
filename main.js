(function () {
  var d = document, root = d.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $$ = function (s, el) { return Array.prototype.slice.call((el || d).querySelectorAll(s)); };
  var clamp = function (v) { return Math.max(0, Math.min(1, v)); };

  // Davao clock
  var clock = d.getElementById('nav-clock');
  if (clock) {
    var fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    var tick = function () { clock.textContent = fmt.format(new Date()); };
    tick(); setInterval(tick, 1000);
  }

  // Theme toggle
  var toggle = d.getElementById('theme-toggle');
  if (toggle) toggle.addEventListener('click', function () {
    var light = root.getAttribute('data-theme') === 'light';
    root.classList.add('theme-fade');
    if (light) root.removeAttribute('data-theme'); else root.setAttribute('data-theme', 'light');
    try { localStorage.setItem('theme', light ? 'dark' : 'light'); } catch (e) {}
    setTimeout(function () { root.classList.remove('theme-fade'); }, 650);
  });

  // Reveal on scroll
  var countUp = function (el) {
    var to = +el.dataset.count, suffix = el.dataset.suffix || '', t0 = null;
    if (reduce || el.dataset.counted) return;
    el.dataset.counted = '1';
    var step = function (t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / 1400), eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * eased) + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('is-in');
      $$('[data-count]', en.target).forEach(countUp);
      if (en.target.id === 'finish') snapTape();
      io.unobserve(en.target);
    });
  }, { rootMargin: '0px 0px -12% 0px' });
  $$('[data-reveal]').forEach(function (el) { io.observe(el); });
  $$('.tally [data-count]').forEach(function (el) { setTimeout(function () { countUp(el); }, 800); });

  // Scroll-linked: nav, course gauge, trail route, active link
  var nav = d.getElementById('nav');
  var km = d.getElementById('gauge-km'), label = d.getElementById('gauge-label'), gauge = d.querySelector('.gauge');
  var trail = d.getElementById('trail'), stations = $$('[data-station]');
  var sections = $$('[data-gauge]');
  var links = $$('.nav__links a');
  var update = function () {
    var y = scrollY, vh = innerHeight;
    nav && nav.classList.toggle('is-scrolled', y > 12);
    var p = clamp(y / (root.scrollHeight - vh));
    if (gauge) {
      gauge.style.setProperty('--p', p);
      km.textContent = 'KM ' + (p * 42.2).toFixed(1);
    }
    var current = sections[0];
    sections.forEach(function (s) { if (s.getBoundingClientRect().top < vh * 0.45) current = s; });
    if (current && label && label.textContent !== current.dataset.gauge) label.textContent = current.dataset.gauge;
    links.forEach(function (a) { a.classList.toggle('is-active', current && a.hash === '#' + current.id); });
    if (trail) {
      var r = trail.getBoundingClientRect();
      var prog = reduce ? 1 : clamp((vh * 0.75 - r.top) / (r.height * 0.85));
      trail.style.setProperty('--route', 1 - prog);
      stations.forEach(function (s, i) {
        if (prog >= i / stations.length + 0.02 || reduce) s.classList.add('is-reached');
      });
      // mobile/tablet: stations stack, so mark them as they enter view
      if (innerWidth < 1024) stations.forEach(function (s) { if (s.getBoundingClientRect().top < vh * 0.8) s.classList.add('is-reached'); });
    }
  };
  var ticking = false;
  addEventListener('scroll', function () {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () { update(); ticking = false; });
  }, { passive: true });
  addEventListener('resize', update);
  update();

  // Finish tape + confetti
  var finish = d.getElementById('finish');
  function snapTape() {
    if (!finish || finish.classList.contains('is-snapped')) return;
    setTimeout(function () {
      finish.classList.add('is-snapped');
      if (reduce) return;
      var colors = ['#d6bd98', '#f0e6d4', '#677d6a', '#a8783f', '#7fd08a'];
      for (var i = 0; i < 46; i++) {
        var c = d.createElement('i');
        c.className = 'confetti';
        c.style.left = (40 + Math.random() * 20) + '%';
        c.style.top = '64px';
        c.style.background = colors[i % colors.length];
        c.style.setProperty('--dx', (Math.random() * 700 - 350) + 'px');
        c.style.setProperty('--dy', (Math.random() * 380 + 80) + 'px');
        c.style.setProperty('--r', (Math.random() * 720 - 360) + 'deg');
        c.style.animationDelay = (Math.random() * 0.15) + 's';
        c.addEventListener('animationend', function () { this.remove(); });
        finish.appendChild(c);
      }
    }, 350);
  }
  if (finish) {
    var reset = function () {
      if (!finish.classList.contains('is-snapped')) return;
      finish.classList.remove('is-snapped');
      setTimeout(snapTape, 700);
    };
    finish.addEventListener('click', function (e) { if (!e.target.closest('a')) reset(); });
  }

  if (reduce) {
    $$('svg').forEach(function (s) { s.pauseAnimations && s.pauseAnimations(); });
    return;
  }

  // Tilt (bibs, polaroid)
  if (fine) $$('[data-tilt]').forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.classList.add('is-tilting');
      var k = el.dataset.tilt === 'soft' ? 0.5 : 1;
      el.style.setProperty('--rx', ((0.5 - y) * 10 * k).toFixed(2) + 'deg');
      el.style.setProperty('--ry', ((x - 0.5) * 12 * k).toFixed(2) + 'deg');
      el.style.setProperty('--mx', (x * 100) + '%');
      el.style.setProperty('--my', (y * 100) + '%');
    });
    el.addEventListener('pointerleave', function () {
      el.classList.remove('is-tilting');
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  });

  // Hero: contour parallax + footprints trailing the cursor
  var hero = d.querySelector('.hero');
  if (hero && fine) {
    var layers = $$('[data-depth]', hero), last = null, foot = 0;
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      var nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
      layers.forEach(function (g) {
        var k = +g.dataset.depth;
        g.style.transform = 'translate(' + (-nx * k) + 'px,' + (-ny * k) + 'px)';
      });
      var x = e.clientX - r.left, y = e.clientY - r.top;
      if (last && Math.hypot(x - last.x, y - last.y) < 46) return;
      var ang = last ? Math.atan2(y - last.y, x - last.x) * 180 / Math.PI + 90 : 0;
      var side = (foot++ % 2 ? 1 : -1) * 7;
      var rad = (ang - 90) * Math.PI / 180;
      var fp = d.createElement('span');
      fp.className = 'footprint';
      fp.innerHTML = '<svg viewBox="0 0 14 22" fill="currentColor"><ellipse cx="7" cy="7" rx="5" ry="6.5"/><ellipse cx="7" cy="18" rx="3.6" ry="3.6"/></svg>';
      fp.style.left = (x - 7 - Math.sin(rad) * side) + 'px';
      fp.style.top = (y - 11 + Math.cos(rad) * side) + 'px';
      fp.style.transform = 'rotate(' + ang + 'deg)';
      fp.addEventListener('animationend', function () { fp.remove(); });
      hero.appendChild(fp);
      last = { x: x, y: y };
    });
  }

  // Project filters
  var filters = $$('[data-filter]');
  if (filters.length) {
    var bibs = $$('#results [data-tags]'), empty = d.getElementById('no-results'), count = d.getElementById('results-n');
    var apply = function (key) {
      var shown = 0;
      bibs.forEach(function (b) {
        var on = key === 'all' || b.dataset.tags.split(' ').indexOf(key) > -1;
        b.hidden = !on;
        if (on) { shown++; b.classList.add('is-in'); }
      });
      empty.classList.toggle('hidden', shown > 0);
      if (count) count.textContent = shown;
      filters.forEach(function (f) { f.setAttribute('aria-pressed', String(f.dataset.filter === key)); });
    };
    filters.forEach(function (f) {
      f.addEventListener('click', function () {
        if (d.startViewTransition) d.startViewTransition(function () { apply(f.dataset.filter); });
        else apply(f.dataset.filter);
      });
    });
    bibs.forEach(function (b, i) { b.style.viewTransitionName = 'result-' + i; });
  }
})();
