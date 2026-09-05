/* Pip Floral Studio — site behaviour
   Navigation toggle, current-page marking and a gentle scroll reveal.
   Everything here is progressive enhancement: the site reads and navigates
   without it. No dependencies. */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  /* ---- Mobile navigation ------------------------------------------------ */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  var mq = window.matchMedia('(min-width: 56em)');

  function isDesktop() { return mq.matches; }

  function openNav() {
    nav.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    var first = nav.querySelector('a, button');
    if (first) first.focus();
    document.addEventListener('keydown', onKeydown);
    document.addEventListener('click', onDocClick);
  }

  function closeNav(returnFocus) {
    if (isDesktop()) return;
    nav.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', onKeydown);
    document.removeEventListener('click', onDocClick);
    if (returnFocus) toggle.focus();
  }

  function onKeydown(e) {
    if (e.key === 'Escape') { closeNav(true); return; }
    if (e.key === 'Tab') {
      // Keep focus in header while the panel is open; close when tabbing out of it.
      var items = nav.querySelectorAll('a, button');
      var last = items[items.length - 1];
      if (!e.shiftKey && document.activeElement === last) { closeNav(false); }
      if (e.shiftKey && document.activeElement === toggle) { closeNav(false); }
    }
  }

  function onDocClick(e) {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) closeNav(false);
  }

  if (toggle && nav) {
    // Collapse on small screens once JS is running (HTML ships expanded so it
    // works without JS).
    if (!isDesktop()) { nav.hidden = true; toggle.setAttribute('aria-expanded', 'false'); }
    toggle.hidden = false;

    toggle.addEventListener('click', function () {
      if (nav.hidden) openNav(); else closeNav(true);
    });

    var onChange = function () {
      if (isDesktop()) {
        nav.hidden = false;
        toggle.setAttribute('aria-expanded', 'false');
        document.removeEventListener('keydown', onKeydown);
        document.removeEventListener('click', onDocClick);
      } else if (toggle.getAttribute('aria-expanded') !== 'true') {
        nav.hidden = true;
      }
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange); else mq.addListener(onChange);
  }

  /* ---- Scroll reveal ---------------------------------------------------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fades = document.querySelectorAll('.fade');
  if (fades.length && !reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    fades.forEach(function (el) { io.observe(el); });
  } else {
    fades.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
